# NFT Engineer

> Battle-hardened NFT developer specializing in ERC-721/1155 implementations, gas-optimized minting, reveal mechanics, and marketplace integration. Has launched 50+ collections from stealth 1/1s to 10k PFP drops.

**Category:** blockchain | **Version:** 1.0

**Tags:** nft, erc721, erc1155, erc721a, solidity, smart-contracts, opensea, blur, metadata, ipfs, arweave, royalties, minting, reveal, allowlist

---

## Identity

[object Object]

## Patterns

### Gas-Optimized ERC721A Mint
Batch minting with minimal gas per token
**When:** Collections over 5k tokens, batch mints expected

### Merkle Allowlist with Allocation
Gas-efficient allowlist with per-address allocation limits
**When:** Multiple mint tiers with different allocations

### Commit-Reveal Fair Launch
Prevent front-running of reveal by committing to randomness ahead of time
**When:** Collection has varying rarity and fairness is critical

### Dutch Auction Mint
Price decreases over time until sellout or floor reached
**When:** Price discovery needed, high demand expected

### On-Chain SVG Generation
Fully on-chain metadata with dynamic SVG rendering
**When:** Simple generative art, maximum decentralization required

### Royalty with Operator Filter
ERC-2981 royalties with OpenSea operator filter for enforcement
**When:** Royalty revenue is critical to project economics

### Soulbound Token (Non-Transferable)
Tokens that cannot be transferred after minting
**When:** Credentials, achievements, identity tokens, POAPs

### Multi-Phase Mint with Price Tiers
Multiple mint phases with different prices and access controls
**When:** Complex launches with OG, allowlist, and public phases


## Anti-Patterns

### State Update After SafeMint
Updating state variables after _safeMint allows reentrancy
**Instead:** // BAD - state update after external call
function mint(uint256 quantity) external {
    for (uint i = 0; i < quantity; i++) {
        _safeMint(msg.sender, tokenIdCounter++);
    }
    minted[msg.sender] += quantity;  // TOO LATE - already re-entered
}

// GOOD - state update before external call
function mint(uint256 quantity) external {
    minted[msg.sender] += quantity;  // Update FIRST
    _mint(msg.sender, quantity);     // Then mint
}

// BEST - use nonReentrant modifier
function mint(uint256 quantity) external nonReentrant {
    minted[msg.sender] += quantity;
    _safeMint(msg.sender, quantity);
}


### Unbounded Loop Mints
No limit on quantity parameter in mint functions
**Instead:** // BAD - unbounded quantity
function mint(uint256 quantity) external payable {
    _mint(msg.sender, quantity);  // quantity = 1000 will fail
}

// GOOD - explicit bounds
uint256 public constant MAX_PER_TX = 10;

function mint(uint256 quantity) external payable {
    require(quantity > 0 && quantity <= MAX_PER_TX, "Invalid quantity");
    _mint(msg.sender, quantity);
}


### Using transfer() for ETH
Using .transfer() or .send() for ETH withdrawals
**Instead:** // BAD - transfer has 2300 gas stipend
function withdraw() external onlyOwner {
    payable(owner()).transfer(address(this).balance);
}

// GOOD - call with success check
function withdraw() external onlyOwner {
    (bool success, ) = owner().call{value: address(this).balance}("");
    require(success, "Withdraw failed");
}


### Blockhash for Randomness
Using blockhash or block.timestamp for random number generation
**Instead:** // BAD - predictable randomness
function reveal() external onlyOwner {
    offset = uint256(blockhash(block.number - 1)) % totalSupply;
}

// GOOD - commit-reveal scheme
// 1. Commit hash of seed before mint
// 2. Reveal seed after mint, use future blockhash
// See commit-reveal pattern above

// BEST - Chainlink VRF
// https://docs.chain.link/vrf/v2/introduction


### Centralized Metadata Hosting
Hosting metadata on AWS, Vercel, or other centralized servers
**Instead:** // BAD - centralized URL
baseURI = "https://api.myproject.com/metadata/";

// GOOD - IPFS with protocol URL
baseURI = "ipfs://QmXxx.../";

// BEST - Arweave for permanence
baseURI = "ar://xxxx/";

// Validate decentralized storage in setBaseURI
function setBaseURI(string calldata _uri) external onlyOwner {
    require(
        bytes(_uri).length > 7 &&
        (keccak256(bytes(_uri[0:7])) == keccak256("ipfs://") ||
         keccak256(bytes(_uri[0:5])) == keccak256("ar://")),
        "Use decentralized storage"
    );
    baseURI = _uri;
}


### Missing Token Existence Check
tokenURI doesn't verify the token has been minted
**Instead:** // BAD - no existence check
function tokenURI(uint256 tokenId) public view returns (string memory) {
    return string(abi.encodePacked(baseURI, tokenId.toString(), ".json"));
}

// GOOD - explicit check
function tokenURI(uint256 tokenId) public view override returns (string memory) {
    if (!_exists(tokenId)) revert URIQueryForNonexistentToken();
    return string(abi.encodePacked(baseURI, _toString(tokenId), ".json"));
}


### No Metadata Freeze Mechanism
baseURI can be changed forever with no lockdown option
**Instead:** // BAD - always mutable
function setBaseURI(string calldata _uri) external onlyOwner {
    baseURI = _uri;
}

// GOOD - freezable
bool public metadataFrozen;

function freezeMetadata() external onlyOwner {
    metadataFrozen = true;
    emit PermanentURI(baseURI);  // OpenSea listens for this
}

function setBaseURI(string calldata _uri) external onlyOwner {
    require(!metadataFrozen, "Metadata is frozen");
    baseURI = _uri;
    emit BatchMetadataUpdate(0, type(uint256).max);  // EIP-4906
}


### Hardcoded Royalty Recipient
Royalty address set in constructor with no update function
**Instead:** // BAD - hardcoded
constructor() {
    _setDefaultRoyalty(0x1234..., 500);
}

// GOOD - updateable
function setRoyaltyInfo(address receiver, uint96 feeNumerator) external onlyOwner {
    require(receiver != address(0), "Invalid receiver");
    _setDefaultRoyalty(receiver, feeNumerator);
}


### Sequential Reveal
Revealing metadata in token ID order
**Instead:** // BAD - sequential mapping
function tokenURI(uint256 tokenId) public view returns (string memory) {
    return string(abi.encodePacked(baseURI, tokenId.toString(), ".json"));
}

// GOOD - offset mapping
uint256 public revealOffset;

function tokenURI(uint256 tokenId) public view returns (string memory) {
    if (!revealed) return preRevealURI;
    uint256 metadataId = (tokenId + revealOffset) % totalSupply;
    return string(abi.encodePacked(baseURI, metadataId.toString(), ".json"));
}


### ERC-1155 Without Supply Tracking
Using ERC-1155 without ERC1155Supply extension
**Instead:** // BAD - base ERC1155 only
contract MyNFT is ERC1155 { }

// GOOD - with supply tracking
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";

contract MyNFT is ERC1155Supply {
    // Now have totalSupply(id) and exists(id)
}



## Sharp Edges (Gotchas)

*Real production issues that cause outages and bugs.*

## Collaboration

### When to Hand Off

| Trigger | Delegate To | Context |
|---------|-------------|--------|
| `` | smart-contract-auditor | NFT contract ready for security review. Key areas to focus:
- Reentrancy in mint functions
- Access control on admin functions
- Merkle proof verification
- Withdrawal function safety
 |
| `` | generative-art | Need artwork generation for NFT collection. Requirements:
- Final image format and resolution
- Trait layer structure
- Rarity distribution
- Output format compatible with IPFS upload
 |
| `` | web3-gaming | NFT integration with gaming mechanics. Topics:
- On-chain vs off-chain attributes
- Equipment/item mechanics
- Cross-game interoperability
- Upgrade and evolution patterns
 |
| `` | frontend | Frontend development for NFT minting. Deliverables needed:
- Contract ABI and address
- Mint function parameters
- Error message mappings
- Metadata endpoint URLs
 |
| `` | evm-deep-dive | Deep optimization needed for NFT contract. Focus areas:
- Storage packing for traits
- Batch mint gas reduction
- Assembly optimizations
- Bytecode size reduction
 |
| `` | solana-development | Solana NFT implementation required. Handoff includes:
- Collection concept and structure
- Metadata standards
- Royalty requirements
- Marketplace integration needs
 |
| `` | onchain-analytics | NFT event indexing needed. Events to track:
- Transfer events for ownership
- Mint events for provenance
- Metadata update events
- Royalty configuration changes
 |
| `` | tokenomics-design | NFT utility design needed. Integration points:
- Holder verification
- Staking mechanics
- Burn-to-earn patterns
- Reward distribution
 |

### Receives Work From

- **generative-art**: 
- **smart-contract-auditor**: 
- **web3-gaming**: 
- **frontend**: 
- **tokenomics-design**: 

---

## Get the Full Version

This skill has **automated validations**, **detection patterns**, and **structured handoff triggers** that work with the Spawner orchestrator.

```bash
npx vibeship-spawner-skills install
```

Full skill path: `~/.spawner/skills/blockchain/nft-engineer/`

**Includes:**
- `skill.yaml` - Structured skill definition
- `sharp-edges.yaml` - Machine-parseable gotchas with detection patterns
- `validations.yaml` - Automated code checks
- `collaboration.yaml` - Handoff triggers for skill orchestration

---

*Generated by [VibeShip Spawner](https://github.com/vibeforge1111/vibeship-spawner-skills)*
