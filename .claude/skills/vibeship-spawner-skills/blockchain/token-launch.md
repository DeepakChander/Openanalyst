# Token Launch Engineer

> Comprehensive expertise in launching tokens through IDOs, implementing secure
vesting contracts, designing sustainable tokenomics, and ensuring fair launch
mechanics. Covers launchpad integrations, cliff/unlock schedules, anti-bot
protection, and regulatory considerations.


**Category:** blockchain | **Version:** 1.0.0

---

## Patterns

### Linear Vesting with Cliff
Industry-standard vesting pattern with initial cliff period followed
by linear token release

```
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TokenVesting is ReentrancyGuard, Ownable {
    using SafeERC20 for IERC20;

    struct VestingSchedule {
        uint256 totalAmount;
        uint256 released;
        uint256 startTime;
        uint256 cliffDuration;
        uint256 vestingDuration;
        bool revocable;
        bool revoked;
    }

    IERC20 public immutable token;
    mapping(address => VestingSchedule) public vestingSchedules;

    event TokensReleased(address indexed beneficiary, uint256 amount);
    event VestingRevoked(address indexed beneficiary, uint256 returnedAmount);

    constructor(address _token) Ownable(msg.sender) {
        require(_token != address(0), "Invalid token address");
        token = IERC20(_token);
    }

    function createVestingSchedule(
        address beneficiary,
        uint256 totalAmount,
        uint256 startTime,
        uint256 cliffDuration,
        uint256 vestingDuration,
        bool revocable
    ) external onlyOwner {
        require(vestingSchedules[beneficiary].totalAmount == 0, "Schedule exists");
        require(totalAmount > 0, "Amount must be > 0");
        require(vestingDuration > cliffDuration, "Vesting must exceed cliff");

        token.safeTransferFrom(msg.sender, address(this), totalAmount);

        vestingSchedules[beneficiary] = VestingSchedule({
            totalAmount: totalAmount,
            released: 0,
            startTime: startTime,
            cliffDuration: cliffDuration,
            vestingDuration: vestingDuration,
            revocable: revocable,
            revoked: false
        });
    }

    function release() external nonReentrant {
        VestingSchedule storage schedule = vestingSchedules[msg.sender];
        require(schedule.totalAmount > 0, "No vesting schedule");
        require(!schedule.revoked, "Vesting revoked");

        uint256 releasable = _computeReleasableAmount(schedule);
        require(releasable > 0, "No tokens to release");

        schedule.released += releasable;
        token.safeTransfer(msg.sender, releasable);

        emit TokensReleased(msg.sender, releasable);
    }

    function _computeReleasableAmount(VestingSchedule memory schedule)
        internal view returns (uint256)
    {
        if (block.timestamp < schedule.startTime + schedule.cliffDuration) {
            return 0;
        }

        uint256 elapsed = block.timestamp - schedule.startTime;
        if (elapsed >= schedule.vestingDuration) {
            return schedule.totalAmount - schedule.released;
        }

        uint256 vested = (schedule.totalAmount * elapsed) / schedule.vestingDuration;
        return vested - schedule.released;
    }
}

```

### Fair Launch with Anti-Bot Protection
Launch mechanism that prevents bot frontrunning and ensures fair
distribution to real participants

```
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract FairLaunch {
    uint256 public constant MAX_TX_AMOUNT = 1 ether; // Per-tx limit
    uint256 public constant COOLDOWN_BLOCKS = 3;
    uint256 public launchBlock;
    bool public tradingEnabled;

    mapping(address => uint256) public lastBuyBlock;
    mapping(address => bool) public isWhitelisted;
    mapping(address => bool) public isBlacklisted;

    modifier antiBot(address from, address to, uint256 amount) {
        if (!isWhitelisted[from] && !isWhitelisted[to]) {
            require(!isBlacklisted[from] && !isBlacklisted[to], "Blacklisted");

            // Block 0-2: Only whitelisted (prevents sandwich attacks at launch)
            if (block.number <= launchBlock + 2) {
                revert("Trading not yet enabled");
            }

            // Block 3-10: Per-transaction limits
            if (block.number <= launchBlock + 10) {
                require(amount <= MAX_TX_AMOUNT, "Exceeds max tx");
            }

            // Cooldown between buys (prevents rapid accumulation)
            require(
                block.number >= lastBuyBlock[to] + COOLDOWN_BLOCKS,
                "Cooldown active"
            );
            lastBuyBlock[to] = block.number;
        }
        _;
    }

    function enableTrading() external onlyOwner {
        require(!tradingEnabled, "Already enabled");
        tradingEnabled = true;
        launchBlock = block.number;
    }
}

```

### Sustainable Tokenomics Template
Battle-tested token allocation framework based on successful launches

```
Recommended Token Allocation (1B total supply):

┌─────────────────────────┬─────────┬────────────────────────────────┐
│ Category                │ %       │ Vesting                        │
├─────────────────────────┼─────────┼────────────────────────────────┤
│ Community/Ecosystem     │ 35-45%  │ Ongoing distribution           │
│ Treasury/DAO            │ 20-25%  │ Governance controlled          │
│ Team                    │ 15-20%  │ 4yr vest, 1yr cliff            │
│ Investors (Seed+Private)│ 12-18%  │ 2-3yr vest, 6-12mo cliff       │
│ Public Sale             │ 5-10%   │ 0-25% TGE, rest 6-12mo vest    │
│ Advisors                │ 2-5%    │ 2yr vest, 6mo cliff            │
│ Liquidity               │ 5-10%   │ Locked in DEX                  │
└─────────────────────────┴─────────┴────────────────────────────────┘

TGE Unlock Best Practices:
- Public sale: 10-25% at TGE (higher for smaller allocations)
- Private investors: 0-10% at TGE
- Team: 0% at TGE (never unlock team tokens at launch)
- Ecosystem: Release as needed for growth

Red Flags to Avoid:
❌ Team allocation > 25%
❌ No cliff for investors/team
❌ > 50% TGE unlock for any group
❌ Concentrated whale wallets > 5% each
❌ Unlocks creating > 10% supply increase at once

```

### Liquidity Bootstrapping Pool (LBP)
Fair price discovery mechanism using Balancer-style weighted pools
that shift weights over time

```
LBP Configuration (Balancer V2):

// Initial weights: 96% PROJECT / 4% USDC
// Final weights: 50% PROJECT / 50% USDC
// Duration: 24-72 hours

Key Parameters:
- Start weight: 90-96% project token
- End weight: 50% project token
- Duration: 24-72 hours (longer = more gradual)
- Swap fee: 0.5-2%

Price Dynamics:
- Price starts HIGH (discourages immediate dumps)
- Price decreases as weights shift
- Buyers wait for acceptable entry
- Natural price discovery occurs

Anti-Gaming Measures:
- No withdrawals during LBP
- Swap fee accumulates to project
- Random end time (not publicized)
- Rate limiting on swaps

```


## Anti-Patterns

### Insufficient Vesting Cliff
Team or investor tokens with cliffs under 6 months create immediate
sell pressure and signal lack of commitment


### Excessive Wallet Concentration
Single wallets holding > 5% of supply create manipulation risk
and governance centralization


### Unlocked DEX Liquidity
DEX liquidity not locked can be pulled, rugging all holders



## Sharp Edges (Gotchas)

*Real production issues that cause outages and bugs.*

### [MEDIUM] Block timestamp can be manipulated by miners

**Situation:** You use block.timestamp for vesting calculations. Miners can
manipulate timestamps within ~15 second range, potentially
allowing early claims.


**Why it happens:**
Ethereum allows miners to set block timestamps within a window.
For long vesting periods this is negligible, but for short cliffs
or frequent claims, it can be exploited.


**Solution:**
```
# USE BLOCK NUMBERS FOR PRECISION

// WRONG: Timestamp-based (manipulable)
function claimable() public view returns (uint256) {
    uint256 elapsed = block.timestamp - startTime;
    return (totalAmount * elapsed) / vestingDuration;
}

// RIGHT: Block-based for critical timing
uint256 public startBlock;
uint256 public constant BLOCKS_PER_DAY = 7200; // ~12s blocks

function claimable() public view returns (uint256) {
    uint256 elapsedBlocks = block.number - startBlock;
    uint256 vestingBlocks = vestingDays * BLOCKS_PER_DAY;
    return (totalAmount * elapsedBlocks) / vestingBlocks;
}

// For most vesting, timestamp is fine - block numbers
// are overkill for 1-year cliffs. Use judgment.

```

**Symptoms:**
- Users claim slightly before expected
- Edge cases in vesting math
- Inconsistent claim amounts

---

### [HIGH] Token approval race condition in vesting deposits

**Situation:** Your vesting contract requires users to approve, then deposit.
Between approval and deposit, tokens can be front-run.


**Why it happens:**
The standard approve-then-transfer pattern has a known race
condition. Attacker can front-run the second transaction.


**Solution:**
```
# USE PERMIT OR INCREASE ALLOWANCE

// WRONG: Standard approve pattern
token.approve(vestingContract, amount);
vestingContract.deposit(amount);

// RIGHT: Use permit (ERC-2612)
function depositWithPermit(
    uint256 amount,
    uint256 deadline,
    uint8 v, bytes32 r, bytes32 s
) external {
    IERC20Permit(address(token)).permit(
        msg.sender, address(this), amount, deadline, v, r, s
    );
    _deposit(msg.sender, amount);
}

// Alternative: Use increaseAllowance
token.increaseAllowance(vestingContract, amount);

```

**Symptoms:**
- Failed deposits after approval
- Missing token transfers
- Users reporting stolen tokens

---

### [MEDIUM] Off-by-one error at cliff boundary

**Situation:** Your vesting math allows claims exactly at cliff end, but you
use > instead of >= (or vice versa), causing 1-block errors.


**Why it happens:**
Boundary conditions in vesting are common bugs. Users should
be able to claim at cliff end, not cliff end + 1.


**Solution:**
```
# GET BOUNDARY CONDITIONS RIGHT

// WRONG: Off-by-one (misses exact cliff moment)
function isCliffPassed() public view returns (bool) {
    return block.timestamp > startTime + cliffDuration;
}

// RIGHT: Include exact boundary
function isCliffPassed() public view returns (bool) {
    return block.timestamp >= startTime + cliffDuration;
}

// Write explicit tests for boundaries
function test_cliffBoundary() public {
    vm.warp(startTime + cliffDuration - 1);
    assertEq(vesting.claimable(user), 0);

    vm.warp(startTime + cliffDuration);
    assertGt(vesting.claimable(user), 0); // Should be claimable
}

```

**Symptoms:**
- Users can't claim at expected time
- Claims work "a second later"
- Test failures at exact boundaries

---

### [HIGH] TGE unlock calculation loses precision

**Situation:** You calculate TGE unlock as percentage of total. Using integer
division, you lose tokens or allow overclaiming.


**Why it happens:**
Solidity integer division truncates. 25% of 1000 tokens = 250,
but 25% of 999 = 249 (loses 0.75 tokens worth of value).


**Solution:**
```
# USE PROPER PRECISION MATH

// WRONG: Precision loss
uint256 public constant TGE_PERCENT = 25;
uint256 tgeUnlock = totalAmount * TGE_PERCENT / 100;

// RIGHT: Higher precision constants
uint256 public constant TGE_BPS = 2500; // 25% in basis points
uint256 public constant BPS_DENOMINATOR = 10000;

uint256 tgeUnlock = (totalAmount * TGE_BPS) / BPS_DENOMINATOR;

// Store remaining for vesting to avoid accumulation errors
uint256 vestingAmount = totalAmount - tgeUnlock;

// BEST: Pre-compute exact amounts, not percentages
struct Allocation {
    uint256 tgeAmount;      // Exact TGE tokens
    uint256 vestingAmount;  // Exact vesting tokens
    // Sum should equal totalAmount
}

```

**Symptoms:**
- Total claimed != total allocated
- Dust amounts left in contract
- Last claimer gets slightly more/less

---

### [CRITICAL] Launchpad callback reentrancy vulnerability

**Situation:** Your token sale contract has a callback to the launchpad.
The callback can be exploited to re-enter before state updates.


**Why it happens:**
Launchpads often require callbacks for integration. If you
update user balances after the callback, an attacker can
re-enter and claim multiple times.


**Solution:**
```
# CHECKS-EFFECTS-INTERACTIONS PATTERN

// WRONG: State update after external call
function claim() external {
    uint256 amount = pendingClaims[msg.sender];
    token.safeTransfer(msg.sender, amount);  // External call
    pendingClaims[msg.sender] = 0;  // State update AFTER
    launchpad.notifyClaim(msg.sender, amount);  // Another external
}

// RIGHT: Update state first
function claim() external nonReentrant {
    uint256 amount = pendingClaims[msg.sender];
    require(amount > 0, "Nothing to claim");

    // Effects BEFORE interactions
    pendingClaims[msg.sender] = 0;

    // Then external calls
    token.safeTransfer(msg.sender, amount);
    launchpad.notifyClaim(msg.sender, amount);
}

```

**Symptoms:**
- Users claim more than allocated
- Contract drains unexpectedly
- Transaction traces show recursive calls

---

### [HIGH] Private and public round allocations conflict

**Situation:** Same wallet participates in private and public rounds. Your
contract tracks only one allocation per address, overwriting
the first.


**Why it happens:**
Many early investors also participate in public sales. Naive
mapping(address => uint256) overwrites their private allocation.


**Solution:**
```
# SEPARATE ALLOCATIONS PER ROUND

// WRONG: Single allocation mapping
mapping(address => uint256) public allocations;

function allocatePrivate(address user, uint256 amount) external {
    allocations[user] = amount;  // Overwrites!
}

// RIGHT: Per-round allocations
enum Round { Seed, Private, Public }

mapping(address => mapping(Round => uint256)) public allocations;

function allocate(address user, Round round, uint256 amount) external {
    allocations[user][round] = amount;
}

function totalAllocation(address user) public view returns (uint256) {
    return allocations[user][Round.Seed]
         + allocations[user][Round.Private]
         + allocations[user][Round.Public];
}

```

**Symptoms:**
- Investors report missing allocations
- Total distributed != expected
- Allocation proofs don't match contract

---

### [CRITICAL] Token decimal mismatch causes wrong amounts

**Situation:** You assume 18 decimals for all tokens. A 6-decimal stablecoin
(USDC) causes calculations to be off by 10^12.


**Why it happens:**
ERC20 has no standard decimals. USDC/USDT are 6 decimals,
WBTC is 8 decimals. Hardcoding 18 decimals causes major errors.


**Solution:**
```
# ALWAYS QUERY DECIMALS

// WRONG: Hardcoded decimals
uint256 public constant DECIMALS = 18;
uint256 price = amount * tokenPrice / (10 ** DECIMALS);

// RIGHT: Query from token contract
function _getDecimals(address token) internal view returns (uint8) {
    return IERC20Metadata(token).decimals();
}

function calculateTokens(uint256 paymentAmount) public view returns (uint256) {
    uint8 paymentDecimals = _getDecimals(paymentToken);
    uint8 saleDecimals = _getDecimals(saleToken);

    // Normalize to 18 decimals for calculation
    uint256 normalizedPayment = paymentAmount * 10**(18 - paymentDecimals);
    uint256 tokensNormalized = normalizedPayment * tokensPerUnit / 1e18;

    // Convert back to sale token decimals
    return tokensNormalized / 10**(18 - saleDecimals);
}

```

**Symptoms:**
- Users receive 10^12x more/fewer tokens
- Sale ends immediately or never fills
- Price displays incorrectly

---

### [MEDIUM] Whitelist removal during active vesting

**Situation:** Admin removes user from whitelist mid-vesting. User loses
access to unvested tokens they legitimately own.


**Why it happens:**
Whitelists should only control initial eligibility, not
ongoing vesting rights. Once allocated, tokens belong to user.


**Solution:**
```
# SEPARATE ELIGIBILITY FROM VESTING

// WRONG: Whitelist gates claiming
function claim() external {
    require(isWhitelisted[msg.sender], "Not whitelisted");
    _claim(msg.sender);
}

// RIGHT: Whitelist only for initial allocation
function allocate(address user, uint256 amount) external onlyOwner {
    require(isWhitelisted[user], "Not whitelisted");
    vestingSchedules[user] = VestingSchedule(...);
    // Whitelist no longer relevant after allocation
}

function claim() external {
    require(vestingSchedules[msg.sender].totalAmount > 0, "No allocation");
    _claim(msg.sender);
}

```

**Symptoms:**
- Users locked out of earned tokens
- Support tickets about missing claims
- Legal disputes over vested amounts

---

### [LOW] Launch time timezone confusion

**Situation:** You announce launch at "12:00 PM" without timezone. Half your
community misses the launch, others arrive 12 hours early.


**Why it happens:**
Crypto is global. UTC is the only timezone that works for
everyone. Local times cause confusion and missed opportunities.


**Solution:**
```
# ALWAYS USE UTC

// In announcements
❌ "Launch: December 15, 12:00 PM"
✅ "Launch: December 15, 12:00 UTC"
✅ "Launch: December 15, 12:00 UTC (convert to local time)"

// In contracts, store unix timestamp
uint256 public launchTime = 1702641600; // Fixed point in time

// Provide timezone conversion tool in UI
function formatLaunchTime() external view returns (string memory) {
    // Frontend should handle timezone conversion
    return "See contract for UTC timestamp";
}

// Frontend
const launchDate = new Date(launchTime * 1000);
const localTime = launchDate.toLocaleString();
const utcTime = launchDate.toUTCString();

```

**Symptoms:**
- Community confusion about times
- Some users miss launch entirely
- Support overload pre-launch

---

### [HIGH] Gas price spikes during launch block liquidity

**Situation:** Your launch coincides with high network activity. Gas prices
10x, and small buyers get priced out or fail transactions.


**Why it happens:**
Popular launches create gas wars. Bots pay extreme gas to
get priority. Regular users can't compete and waste gas on
failed transactions.


**Solution:**
```
# DESIGN FOR GAS SPIKES

// Prevent gas wars with max gas price
uint256 public maxGasPrice = 100 gwei;

modifier reasonableGas() {
    require(tx.gasprice <= maxGasPrice, "Gas price too high");
    _;
}

function buy() external payable reasonableGas {
    // Regular users have a chance
}

// Better: Use commit-reveal or queue system
mapping(address => bytes32) public commitments;
mapping(address => uint256) public revealWindow;

function commit(bytes32 hash) external {
    commitments[msg.sender] = hash;
    revealWindow[msg.sender] = block.number + 10;
}

function reveal(uint256 amount, bytes32 salt) external {
    require(block.number >= revealWindow[msg.sender], "Too early");
    require(keccak256(abi.encode(amount, salt)) == commitments[msg.sender]);
    _processBuy(msg.sender, amount);
}

```

**Symptoms:**
- Failed transactions during launch
- Only bots get allocations
- Gas costs exceed purchase value

---

## Collaboration

### When to Hand Off

| Trigger | Delegate To | Context |
|---------|-------------|--------|
| `` | defi-architect | Pass tokenomics requirements and liquidity needs |
| `` | smart-contract-auditor | Provide contract code and threat model |
| `` | dao-governance | Share token allocation and governance requirements |
| `` | cross-chain | Provide token standards and bridge requirements |
| `` | onchain-analytics | Share token addresses and metrics to track |

---

## Get the Full Version

This skill has **automated validations**, **detection patterns**, and **structured handoff triggers** that work with the Spawner orchestrator.

```bash
npx vibeship-spawner-skills install
```

Full skill path: `~/.spawner/skills/blockchain/token-launch/`

**Includes:**
- `skill.yaml` - Structured skill definition
- `sharp-edges.yaml` - Machine-parseable gotchas with detection patterns
- `validations.yaml` - Automated code checks
- `collaboration.yaml` - Handoff triggers for skill orchestration

---

*Generated by [VibeShip Spawner](https://github.com/vibeforge1111/vibeship-spawner-skills)*
