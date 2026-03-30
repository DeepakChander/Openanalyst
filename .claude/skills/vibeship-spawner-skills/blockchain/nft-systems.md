# NFT Systems

> Expert in NFT development - minting infrastructure, metadata standards, marketplaces, royalties, and collection management across EVM and Solana

**Category:** blockchain | **Version:** 1.0

**Tags:** nft, erc721, erc1155, metaplex, opensea, royalties, metadata, ipfs

---

## Identity

[object Object]

## Patterns

### Lazy Minting
Generate token IDs and metadata on-demand at mint time
**When:** Large collections where pre-generating all metadata is expensive

### Merkle Tree Allowlist
Gas-efficient allowlist verification using merkle proofs
**When:** Private/early access mints with large allowlists

### Commit-Reveal for Fair Mint
Prevent sniping by committing to randomness before reveal
**When:** Rare traits or sequential mint with varying rarity

### ERC-2981 Royalty Standard
On-chain royalty information for marketplace compliance
**When:** Need to specify royalty percentage and recipient

### Soulbound Token (SBT)
Non-transferable NFTs for credentials, achievements, identity
**When:** Tokens should be permanently bound to original recipient

### On-Chain Metadata
Store metadata directly in contract for permanence
**When:** Simple metadata, gas budget allows, no external dependencies


## Anti-Patterns

### Centralized Metadata Hosting
Hosting metadata on a server you control
**Instead:** // Use decentralized storage
// IPFS with pinning service (Pinata, nft.storage)
// Arweave for permanent storage
// On-chain for small data

function setBaseURI(string calldata _uri) external onlyOwner {
    require(
        bytes(_uri).length > 7 &&
        (keccak256(abi.encodePacked(_uri[:7])) == keccak256("ipfs://") ||
         keccak256(abi.encodePacked(_uri[:5])) == keccak256("ar://")),
        "Must use decentralized storage"
    );
    baseURI = _uri;
}


### Sequential Token ID Reveals
Revealing metadata in token ID order
**Instead:** // Use random offset or batch reveals
uint256 public revealOffset;

function reveal(uint256 randomSeed) external onlyOwner {
    revealOffset = randomSeed % totalSupply;
}

function tokenURI(uint256 tokenId) public view returns (string memory) {
    uint256 metadataId = (tokenId + revealOffset) % totalSupply;
    return string(abi.encodePacked(baseURI, metadataId.toString(), ".json"));
}


### Unbounded Batch Mints
Allowing unlimited tokens per transaction
**Instead:** uint256 public constant MAX_BATCH_SIZE = 20;

function mint(uint256 quantity) external payable {
    require(quantity <= MAX_BATCH_SIZE, "Batch too large");
    require(quantity > 0, "Quantity must be positive");
    // ...
}


### Missing Token Existence Checks
tokenURI doesn't verify token exists
**Instead:** function tokenURI(uint256 tokenId) public view override returns (string memory) {
    require(_exists(tokenId), "ERC721: URI query for nonexistent token");
    return string(abi.encodePacked(baseURI, tokenId.toString(), ".json"));
}


### Hardcoded Royalty Recipient
Royalty address can't be changed
**Instead:** address public royaltyRecipient;

function setRoyaltyRecipient(address _recipient) external onlyOwner {
    require(_recipient != address(0), "Invalid recipient");
    royaltyRecipient = _recipient;
}


### No Metadata Freeze Mechanism
Metadata can be changed forever
**Instead:** bool public metadataFrozen;

function freezeMetadata() external onlyOwner {
    metadataFrozen = true;
    emit MetadataFrozen();
}

function setBaseURI(string calldata _uri) external onlyOwner {
    require(!metadataFrozen, "Metadata frozen");
    baseURI = _uri;
}



## Sharp Edges (Gotchas)

*Real production issues that cause outages and bugs.*

### [CRITICAL] undefined

**Solution:**
```
// 1. Upload ALL metadata before contract deployment
// 2. Verify every tokenURI returns valid JSON
// 3. Use IPFS directory uploads (CID stays same)

// Verification script:
async function verifyMetadata(baseURI, totalSupply) {
    for (let i = 0; i < totalSupply; i++) {
        const response = await fetch(`${baseURI}${i}.json`);
        if (!response.ok) {
            throw new Error(`Token ${i} metadata not found`);
        }
        const metadata = await response.json();
        // Verify required fields
        if (!metadata.name || !metadata.image) {
            throw new Error(`Token ${i} missing required fields`);
        }
    }
}

```

**Symptoms:**
- NFTs show as "content not available"
- Images don't load on marketplaces
- Collection delisted or flagged

---

### [CRITICAL] undefined

**Solution:**
```
// Bad: Gateway-specific URL
"image": "https://gateway.pinata.cloud/ipfs/Qm..."

// Good: Protocol URL (marketplaces resolve)
"image": "ipfs://Qm..."

// Best: Multiple pinning services
// - Pin to Pinata
// - Pin to nft.storage
// - Pin to Filebase
// Use same CID, multiple providers for redundancy

```

**Symptoms:**
- Images break when gateway goes down
- Pinata/Infura outages break collection
- Different gateways show different content

---

### [CRITICAL] undefined

**Solution:**
```
// Bad: State update after safeMint
function mint(uint256 quantity) external {
    require(minted[msg.sender] + quantity <= maxPerWallet);
    for (uint i = 0; i < quantity; i++) {
        _safeMint(msg.sender, tokenIdCounter++);  // Callback here!
    }
    minted[msg.sender] += quantity;  // Too late!
}

// Good: Update state first
function mint(uint256 quantity) external {
    require(minted[msg.sender] + quantity <= maxPerWallet);
    minted[msg.sender] += quantity;  // Update first
    for (uint i = 0; i < quantity; i++) {
        _safeMint(msg.sender, tokenIdCounter++);
    }
}

// Best: Use reentrancy guard
function mint(uint256 quantity) external nonReentrant {
    // ...
}

```

**Symptoms:**
- Users mint more than allowed
- Supply exceeded
- Max per wallet bypassed

---

### [HIGH] undefined

**Solution:**
```
// Royalties are NOT enforceable on-chain
// Options:

// 1. Operator filter (blocks known bypasses)
import {DefaultOperatorFilterer} from "operator-filter-registry/DefaultOperatorFilterer.sol";

contract NFT is ERC721, DefaultOperatorFilterer {
    function setApprovalForAll(address operator, bool approved)
        public override onlyAllowedOperatorApproval(operator)
    {
        super.setApprovalForAll(operator, approved);
    }
}

// 2. Accept reality: treat royalties as voluntary
// 3. Build utility that requires holding (staking, access)

```

**Symptoms:**
- Royalties not paid on secondary sales
- Revenue drops after launch hype
- Wrapper contracts created

---

### [HIGH] undefined

**Solution:**
```
// Bad: Predictable randomness
function reveal() external {
    offset = uint256(blockhash(block.number - 1)) % totalSupply;
}

// Good: Commit-reveal with future block
function commitReveal(bytes32 commitment) external onlyOwner {
    require(revealBlock == 0, "Already committed");
    _commitment = commitment;
    revealBlock = block.number + 100;  // 100 blocks in future
}

function reveal(uint256 seed) external {
    require(block.number > revealBlock, "Too early");
    require(block.number < revealBlock + 256, "Blockhash expired");
    require(keccak256(abi.encodePacked(seed)) == _commitment, "Bad seed");

    offset = uint256(keccak256(abi.encodePacked(
        seed, blockhash(revealBlock)
    ))) % totalSupply;
}

// Best: Use Chainlink VRF

```

**Symptoms:**
- Rares concentrated in few wallets
- Sniper bots profit
- Community loses trust

---

### [HIGH] undefined

**Solution:**
```
uint256 public constant MAX_BATCH = 20;

function mint(uint256 quantity) external payable {
    require(quantity > 0 && quantity <= MAX_BATCH, "Invalid quantity");
    require(totalSupply() + quantity <= MAX_SUPPLY, "Exceeds supply");

    // Use ERC721A for gas-efficient batch mints
    _mint(msg.sender, quantity);
}

// Gas estimates per batch size (ERC721 vs ERC721A):
// 1 token:  ~80k vs ~50k gas
// 5 tokens: ~400k vs ~55k gas
// 10 tokens: ~800k vs ~60k gas

```

**Symptoms:**
- Transactions fail after paying gas
- Users lose ETH on failed mints
- Frustrated community

---

### [MEDIUM] undefined

**Solution:**
```
bool public metadataFrozen;

event MetadataFrozen(string finalBaseURI);
event BatchMetadataUpdate(uint256 fromTokenId, uint256 toTokenId);

function freezeMetadata() external onlyOwner {
    require(!metadataFrozen, "Already frozen");
    metadataFrozen = true;
    emit MetadataFrozen(baseURI);
    // EIP-4906 refresh signal
    emit BatchMetadataUpdate(0, type(uint256).max);
}

function setBaseURI(string calldata _uri) external onlyOwner {
    require(!metadataFrozen, "Metadata is frozen");
    baseURI = _uri;
}

```

**Symptoms:**
- Rug pull concerns
- Collectors don't trust collection
- Legal liability for changes

---

### [MEDIUM] undefined

**Solution:**
```
// Required OpenSea metadata format:
{
    "name": "Token #1",
    "description": "Description here",
    "image": "ipfs://...",
    "attributes": [
        {
            "trait_type": "Background",
            "value": "Blue"
        },
        {
            "trait_type": "Power Level",
            "value": 95,
            "display_type": "number"
        },
        {
            "trait_type": "Birthday",
            "value": 1609459200,
            "display_type": "date"
        }
    ],
    "external_url": "https://yoursite.com/token/1",
    "animation_url": "ipfs://..." // For video/audio
}

```

**Symptoms:**
- Traits don't display
- Rarity tools can't parse
- Collection looks broken

---

### [MEDIUM] undefined

**Solution:**
```
// Use ERC1155Supply extension
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";

contract MyNFT is ERC1155Supply {
    function mint(address to, uint256 id, uint256 amount) external {
        _mint(to, id, amount, "");
    }

    // Now available:
    // totalSupply(id) - tokens minted for this ID
    // exists(id) - whether any tokens exist for ID
}

```

**Symptoms:**
- Can't verify scarcity
- Marketplaces show "?" for supply
- Rarity calculation impossible

---

### [MEDIUM] undefined

**Solution:**
```
// In Metaplex metadata, creators must be verified
{
    "creators": [
        {
            "address": "YOUR_WALLET",
            "verified": true,  // Must be true!
            "share": 100
        }
    ]
}

// Verify using Metaplex SDK:
const { nft } = await metaplex.nfts().create({
    // ...
    creators: [
        {
            address: metaplex.identity().publicKey,
            share: 100,
            // Automatically verified when using identity
        }
    ]
});

```

**Symptoms:**
- Collection not indexed by Magic Eden
- Can't prove authenticity
- Royalties not enforced

---

## Collaboration

### When to Hand Off

| Trigger | Delegate To | Context |
|---------|-------------|--------|
| `` | ai-image-generation | Generative art creation for NFT collection |
| `` | tokenomics-design | NFT utility and token economics |
| `` | frontend | NFT minting and display UI |
| `` | evm-deep-dive | Contract optimization for minting gas |
| `` | web3-security-audit | NFT contract security review |

### Receives Work From

- **ai-image-generation**: 
- **tokenomics-design**: 
- **frontend**: 
- **solana-development**: 

---

## Get the Full Version

This skill has **automated validations**, **detection patterns**, and **structured handoff triggers** that work with the Spawner orchestrator.

```bash
npx vibeship-spawner-skills install
```

Full skill path: `~/.spawner/skills/blockchain/nft-systems/`

**Includes:**
- `skill.yaml` - Structured skill definition
- `sharp-edges.yaml` - Machine-parseable gotchas with detection patterns
- `validations.yaml` - Automated code checks
- `collaboration.yaml` - Handoff triggers for skill orchestration

---

*Generated by [VibeShip Spawner](https://github.com/vibeforge1111/vibeship-spawner-skills)*
