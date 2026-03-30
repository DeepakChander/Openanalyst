# Web3 Gaming Engineer

> Comprehensive expertise in blockchain game development, including
play-to-earn (P2E) mechanics, play-to-own (P2O) models, in-game
economies, NFT integration, dual token systems, and sustainable
game tokenomics. Covers Unity/Unreal blockchain integration,
anti-cheat considerations, and DeFi-gaming fusion.


**Category:** blockchain | **Version:** 1.0.0

---

## Patterns

### Dual Token Game Economy
Two-token model separating in-game utility from governance
to balance inflation and provide sustainable rewards

```
Dual Token Architecture:

┌──────────────────────────────────────────────────────────────┐
│                     GOVERNANCE TOKEN (GOV)                    │
│  - Fixed supply (e.g., 1 billion)                            │
│  - Voting on game parameters                                  │
│  - Staking for rewards                                        │
│  - Treasury access                                            │
│  - NOT earned through gameplay                                │
└──────────────────────────────────────────────────────────────┘
                              │
                              ▼ Staking rewards
┌──────────────────────────────────────────────────────────────┐
│                     UTILITY TOKEN (UTIL)                      │
│  - Inflationary (minted as rewards)                          │
│  - Earned through gameplay                                    │
│  - Spent on in-game items                                     │
│  - Burned on crafting/upgrades                                │
│  - Exchange rate floats vs GOV                                │
└──────────────────────────────────────────────────────────────┘

Example: Axie Infinity
- AXS = Governance token (fixed supply)
- SLP = Utility token (infinite, earn/burn)

Solidity Implementation:

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract UtilityToken is ERC20, AccessControl {
    bytes32 public constant GAME_ROLE = keccak256("GAME_ROLE");

    uint256 public dailyEmissionCap;
    uint256 public todayMinted;
    uint256 public lastResetDay;

    constructor() ERC20("GameUtil", "UTIL") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        dailyEmissionCap = 1_000_000 ether; // Adjustable
    }

    function mint(address player, uint256 amount) external onlyRole(GAME_ROLE) {
        _resetDailyIfNeeded();
        require(todayMinted + amount <= dailyEmissionCap, "Daily cap reached");
        todayMinted += amount;
        _mint(player, amount);
    }

    function burn(uint256 amount) external {
        _burn(msg.sender, amount);
    }

    function _resetDailyIfNeeded() internal {
        uint256 today = block.timestamp / 1 days;
        if (today > lastResetDay) {
            lastResetDay = today;
            todayMinted = 0;
        }
    }
}

```

### NFT Game Items with On-Chain Attributes
ERC-1155 game items with upgradeable on-chain attributes
and cross-game compatibility standards

```
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract GameItems is ERC1155, AccessControl {
    bytes32 public constant GAME_ROLE = keccak256("GAME_ROLE");

    struct ItemStats {
        uint16 level;
        uint16 power;
        uint16 durability;
        uint64 experience;
        uint64 lastUpgrade;
    }

    // tokenId => owner => stats
    mapping(uint256 => mapping(address => ItemStats)) public itemStats;

    // Item type definitions
    mapping(uint256 => string) public itemTypes;
    mapping(uint256 => uint256) public maxSupply;
    mapping(uint256 => uint256) public currentSupply;

    event ItemUpgraded(address indexed player, uint256 indexed tokenId, uint16 newLevel);
    event ItemUsed(address indexed player, uint256 indexed tokenId, uint16 durabilityLost);

    constructor(string memory uri) ERC1155(uri) {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    function mintItem(
        address player,
        uint256 itemId,
        uint256 amount,
        ItemStats calldata initialStats
    ) external onlyRole(GAME_ROLE) {
        require(currentSupply[itemId] + amount <= maxSupply[itemId], "Max supply");
        currentSupply[itemId] += amount;
        _mint(player, itemId, amount, "");
        itemStats[itemId][player] = initialStats;
    }

    function upgradeItem(address player, uint256 itemId) external onlyRole(GAME_ROLE) {
        ItemStats storage stats = itemStats[itemId][player];
        require(balanceOf(player, itemId) > 0, "Not owner");
        require(block.timestamp >= stats.lastUpgrade + 1 days, "Cooldown");

        stats.level += 1;
        stats.power += 10;
        stats.lastUpgrade = uint64(block.timestamp);

        emit ItemUpgraded(player, itemId, stats.level);
    }

    function useItem(address player, uint256 itemId, uint16 durabilityUsed)
        external onlyRole(GAME_ROLE)
    {
        ItemStats storage stats = itemStats[itemId][player];
        require(stats.durability >= durabilityUsed, "Broken");
        stats.durability -= durabilityUsed;

        if (stats.durability == 0) {
            _burn(player, itemId, 1);
        }

        emit ItemUsed(player, itemId, durabilityUsed);
    }

    function supportsInterface(bytes4 interfaceId)
        public view override(ERC1155, AccessControl) returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}

```

### Anti-Exploit Reward System
Server-authoritative reward signing to prevent client-side
manipulation of earnings

```
// Server-side (Node.js)
import { ethers } from 'ethers';

class RewardSigner {
  private signer: ethers.Wallet;

  constructor(privateKey: string) {
    this.signer = new ethers.Wallet(privateKey);
  }

  async signReward(
    player: string,
    amount: bigint,
    nonce: number,
    expiry: number
  ): Promise<string> {
    const hash = ethers.solidityPackedKeccak256(
      ['address', 'uint256', 'uint256', 'uint256'],
      [player, amount, nonce, expiry]
    );
    return this.signer.signMessage(ethers.getBytes(hash));
  }
}

// Contract-side (Solidity)
contract SecureRewards {
    address public rewardSigner;
    mapping(address => uint256) public nonces;

    function claimReward(
        uint256 amount,
        uint256 expiry,
        bytes calldata signature
    ) external {
        require(block.timestamp < expiry, "Expired");

        bytes32 hash = keccak256(abi.encodePacked(
            msg.sender,
            amount,
            nonces[msg.sender],
            expiry
        ));

        bytes32 ethHash = keccak256(abi.encodePacked(
            "\x19Ethereum Signed Message:\n32",
            hash
        ));

        require(ECDSA.recover(ethHash, signature) == rewardSigner, "Invalid sig");

        nonces[msg.sender]++;
        // Distribute reward...
    }
}

```

### Guild and Scholarship System
NFT lending system allowing guilds to onboard scholars
who play with borrowed assets for revenue share

```
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract ScholarshipManager {
    struct Scholarship {
        address scholar;
        uint256[] nftIds;
        uint256 revenueShareBps;  // Scholar's share (e.g., 7000 = 70%)
        uint256 startTime;
        uint256 endTime;
        bool active;
    }

    mapping(address => Scholarship[]) public guildScholarships;
    mapping(uint256 => address) public nftToGuild;

    event ScholarshipCreated(address guild, address scholar, uint256[] nfts);
    event RevenueDistributed(address guild, address scholar, uint256 total);

    function createScholarship(
        address scholar,
        uint256[] calldata nftIds,
        uint256 revenueShareBps,
        uint256 duration
    ) external {
        require(revenueShareBps <= 10000, "Invalid share");

        for (uint i = 0; i < nftIds.length; i++) {
            // Transfer NFTs to this contract (escrow)
            require(nftToGuild[nftIds[i]] == address(0), "Already lent");
            nftToGuild[nftIds[i]] = msg.sender;
            // IERC721(nftContract).transferFrom(msg.sender, address(this), nftIds[i]);
        }

        guildScholarships[msg.sender].push(Scholarship({
            scholar: scholar,
            nftIds: nftIds,
            revenueShareBps: revenueShareBps,
            startTime: block.timestamp,
            endTime: block.timestamp + duration,
            active: true
        }));

        emit ScholarshipCreated(msg.sender, scholar, nftIds);
    }

    function distributeRevenue(
        address guild,
        uint256 scholarshipIndex,
        uint256 totalReward
    ) external {
        Scholarship storage s = guildScholarships[guild][scholarshipIndex];
        require(s.active, "Not active");

        uint256 scholarShare = (totalReward * s.revenueShareBps) / 10000;
        uint256 guildShare = totalReward - scholarShare;

        // Transfer scholarShare to s.scholar
        // Transfer guildShare to guild

        emit RevenueDistributed(guild, s.scholar, totalReward);
    }
}

```


## Anti-Patterns

### Uncapped Token Emission
Allowing unlimited token minting through gameplay leads to
hyperinflation and death spiral


### Client-Authoritative Rewards
Trusting client-reported game results for token rewards


### Single Token for Everything
Using one token for both in-game utility and governance
creates speculation-utility conflict


### Pure Pay-to-Win NFT Design
NFTs that provide direct competitive advantage proportional
to price create toxic gameplay


### Missing Anti-Cheat for Rewards
Web3 games are high-value targets for cheating due to
real monetary rewards



## Sharp Edges (Gotchas)

*Real production issues that cause outages and bugs.*

## Collaboration

### When to Hand Off

| Trigger | Delegate To | Context |
|---------|-------------|--------|
| `` | token-launch | Pass tokenomics model and distribution plan |
| `` | nft-engineer | Share item types and trading requirements |
| `` | smart-contract-auditor | Include economic attack vectors in scope |
| `` | onchain-analytics | Define key metrics (DAU, earn/burn, retention) |
| `` | cross-chain | Specify asset bridging requirements |
| `` | wallet-integration | Support required chains and wallets |

---

## Get the Full Version

This skill has **automated validations**, **detection patterns**, and **structured handoff triggers** that work with the Spawner orchestrator.

```bash
npx vibeship-spawner-skills install
```

Full skill path: `~/.spawner/skills/blockchain/web3-gaming/`

**Includes:**
- `skill.yaml` - Structured skill definition
- `sharp-edges.yaml` - Machine-parseable gotchas with detection patterns
- `validations.yaml` - Automated code checks
- `collaboration.yaml` - Handoff triggers for skill orchestration

---

*Generated by [VibeShip Spawner](https://github.com/vibeforge1111/vibeship-spawner-skills)*
