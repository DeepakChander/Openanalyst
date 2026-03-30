# Prediction Markets Engineer

> Comprehensive expertise in decentralized prediction markets, including
Polymarket-style platforms, UMA Optimistic Oracle integration, Conditional
Tokens Framework (CTF), market making, resolution mechanisms, and
regulatory considerations.


**Category:** blockchain | **Version:** 1.0.0

---

## Patterns

### Conditional Tokens Framework
Gnosis CTF for creating outcome tokens that represent positions
in prediction markets

```
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@gnosis.pm/conditional-tokens-contracts/contracts/ConditionalTokens.sol";

contract PredictionMarket {
    ConditionalTokens public ctf;
    IERC20 public collateral;

    struct Market {
        bytes32 conditionId;
        bytes32 questionId;
        address oracle;
        uint256 outcomeCount;
        uint256 resolutionTime;
        bool resolved;
    }

    mapping(bytes32 => Market) public markets;

    constructor(address _ctf, address _collateral) {
        ctf = ConditionalTokens(_ctf);
        collateral = IERC20(_collateral);
    }

    function createMarket(
        bytes32 questionId,
        address oracle,
        uint256 outcomeCount,
        uint256 resolutionTime
    ) external returns (bytes32 marketId) {
        // Prepare condition in CTF
        ctf.prepareCondition(oracle, questionId, outcomeCount);
        bytes32 conditionId = ctf.getConditionId(oracle, questionId, outcomeCount);

        marketId = keccak256(abi.encode(conditionId, block.timestamp));
        markets[marketId] = Market({
            conditionId: conditionId,
            questionId: questionId,
            oracle: oracle,
            outcomeCount: outcomeCount,
            resolutionTime: resolutionTime,
            resolved: false
        });

        return marketId;
    }

    function buyOutcome(
        bytes32 marketId,
        uint256 outcomeIndex,
        uint256 amount
    ) external {
        Market storage market = markets[marketId];
        require(!market.resolved, "Market resolved");

        // Transfer collateral
        collateral.transferFrom(msg.sender, address(this), amount);
        collateral.approve(address(ctf), amount);

        // Create index set for desired outcome
        uint256 indexSet = 1 << outcomeIndex;
        uint256[] memory partition = new uint256[](1);
        partition[0] = indexSet;

        // Split position to get outcome tokens
        bytes32 parentCollectionId = bytes32(0);
        ctf.splitPosition(
            collateral,
            parentCollectionId,
            market.conditionId,
            partition,
            amount
        );

        // Transfer outcome tokens to user
        bytes32 collectionId = ctf.getCollectionId(
            parentCollectionId,
            market.conditionId,
            indexSet
        );
        uint256 positionId = ctf.getPositionId(collateral, collectionId);
        // User now holds outcome tokens
    }
}

CTF Position Structure:
┌─────────────────────────────────────────────────────────┐
│ Market: "Will ETH reach $5000 by Dec 2025?"             │
├─────────────────────────────────────────────────────────┤
│ Condition ID: 0x123...                                  │
│ Outcomes: [YES, NO]                                     │
├─────────────────────────────────────────────────────────┤
│ YES Token: ERC1155 position, pays $1 if YES             │
│ NO Token: ERC1155 position, pays $1 if NO               │
│                                                         │
│ $1 collateral = 1 YES token + 1 NO token                │
│ After resolution, winning token redeemable for $1       │
└─────────────────────────────────────────────────────────┘

```

### UMA Optimistic Oracle Integration
Dispute-based oracle for real-world event resolution with
economic guarantees

```
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@uma/core/contracts/optimistic-oracle-v3/interfaces/OptimisticOracleV3Interface.sol";

contract UMAMarketResolver {
    OptimisticOracleV3Interface public oracle;
    IERC20 public bondToken;
    uint256 public constant BOND_AMOUNT = 5000e18; // 5000 USDC
    uint64 public constant LIVENESS = 7200; // 2 hours

    struct Resolution {
        bytes32 assertionId;
        bytes32 marketId;
        bool outcome;
        bool resolved;
    }

    mapping(bytes32 => Resolution) public resolutions;

    function proposeResolution(
        bytes32 marketId,
        bool outcome,
        string calldata explanation
    ) external returns (bytes32 assertionId) {
        // Build claim
        bytes memory claim = abi.encodePacked(
            "Market ", marketId,
            " resolved to ", outcome ? "YES" : "NO",
            ". ", explanation
        );

        // Approve bond
        bondToken.transferFrom(msg.sender, address(this), BOND_AMOUNT);
        bondToken.approve(address(oracle), BOND_AMOUNT);

        // Submit assertion
        assertionId = oracle.assertTruth(
            claim,
            msg.sender,      // asserter
            address(this),   // callback recipient
            address(0),      // escalation manager (none)
            LIVENESS,
            bondToken,
            BOND_AMOUNT,
            bytes32(0),      // identifier
            bytes32(0)       // domain
        );

        resolutions[assertionId] = Resolution({
            assertionId: assertionId,
            marketId: marketId,
            outcome: outcome,
            resolved: false
        });

        return assertionId;
    }

    // UMA callback when assertion settles
    function assertionResolvedCallback(
        bytes32 assertionId,
        bool assertedTruthfully
    ) external {
        require(msg.sender == address(oracle), "Only oracle");

        Resolution storage res = resolutions[assertionId];
        if (assertedTruthfully) {
            // Resolution accepted - finalize market
            res.resolved = true;
            _resolveMarket(res.marketId, res.outcome);
        } else {
            // Disputed and overturned - proposer loses bond
            delete resolutions[assertionId];
        }
    }
}

UMA Resolution Flow:
1. Proposer asserts outcome with bond
2. 2-hour dispute window
3. If disputed:
   - Goes to UMA DVM (decentralized voting)
   - UMA token holders vote on truth
   - Wrong party loses bond
4. If undisputed: assertion accepted

```

### CPMM for Prediction Markets
Constant Product Market Maker adapted for binary outcome
token trading

```
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract PredictionAMM {
    IERC1155 public outcomeTokens;
    uint256 public yesTokenId;
    uint256 public noTokenId;

    uint256 public yesReserve;
    uint256 public noReserve;
    uint256 public constant FEE_BPS = 20; // 0.2%

    function addLiquidity(uint256 amount) external {
        // Add equal amounts of both outcomes
        outcomeTokens.safeTransferFrom(msg.sender, address(this), yesTokenId, amount, "");
        outcomeTokens.safeTransferFrom(msg.sender, address(this), noTokenId, amount, "");

        yesReserve += amount;
        noReserve += amount;

        // Mint LP tokens
        _mintLP(msg.sender, amount);
    }

    function buyYes(uint256 noIn) external returns (uint256 yesOut) {
        // Constant product: (yesReserve - yesOut) * (noReserve + noIn) = k
        uint256 noInWithFee = noIn * (10000 - FEE_BPS) / 10000;
        yesOut = (yesReserve * noInWithFee) / (noReserve + noInWithFee);

        outcomeTokens.safeTransferFrom(msg.sender, address(this), noTokenId, noIn, "");
        outcomeTokens.safeTransfer(msg.sender, yesTokenId, yesOut);

        yesReserve -= yesOut;
        noReserve += noIn;
    }

    function getYesPrice() public view returns (uint256) {
        // Price of YES token in terms of NO token
        // price = noReserve / (yesReserve + noReserve)
        return (noReserve * 1e18) / (yesReserve + noReserve);
    }

    function getImpliedProbability() public view returns (uint256) {
        // YES price = implied probability of YES outcome
        return getYesPrice();
    }
}

Price Interpretation:
┌─────────────────────────────────────────────────────────┐
│ YES Price = $0.65                                       │
│ → Market implies 65% probability of YES outcome         │
│                                                         │
│ If you think YES probability > 65%, buy YES             │
│ If you think YES probability < 65%, buy NO (sell YES)   │
└─────────────────────────────────────────────────────────┘

```


## Anti-Patterns

### Single entity resolves markets
One address has sole authority to resolve markets.
They can resolve incorrectly for profit.


### Instant resolution without dispute
Markets resolve immediately without opportunity
to challenge incorrect resolution


### Outcome tokens don't sum to collateral
Creating outcome tokens that don't properly back
1:1 with collateral creates insolvency



## Sharp Edges (Gotchas)

*Real production issues that cause outages and bugs.*

### [HIGH] Ambiguous market question leads to disputes

**Situation:** Market asks "Will Bitcoin hit $100k in 2025?" Bitcoin briefly
touches $100k for 1 second on one exchange. Disputes erupt
over whether this counts.


**Why it happens:**
Real-world events are nuanced. Without precise resolution
criteria, edge cases create disputes and undermine trust.


**Solution:**
```
# DEFINE PRECISE RESOLUTION CRITERIA

Good Question Format:
┌─────────────────────────────────────────────────────────┐
│ Question: Will Bitcoin's price exceed $100,000?         │
│                                                         │
│ Resolution Source: CoinGecko BTC/USD price              │
│ Resolution Time: 2025-12-31 23:59:59 UTC                │
│ Resolution Criteria:                                    │
│   - YES if CoinGecko shows BTC >= $100,000 at           │
│     resolution time                                      │
│   - NO otherwise                                        │
│   - Uses 5-minute TWAP to prevent manipulation          │
└─────────────────────────────────────────────────────────┘

struct MarketMetadata {
    string question;
    string resolutionSource;     // Primary data source
    string backupSource;         // If primary unavailable
    uint256 resolutionTime;
    string resolutionCriteria;   // Detailed rules
    string edgeCases;            // How to handle ambiguity
}

Edge Case Documentation:
- What if source is unavailable?
- What if data is delayed?
- What counts as "reaching" a price?
- Time zone and daylight savings?
- Market close vs 24/7 trading?

```

**Symptoms:**
- Multiple valid interpretations
- Oracle disputes
- Community disagreement on outcome

---

### [HIGH] Resolution data leaked before on-chain settlement

**Situation:** Market resolves based on API data. Someone sees the result
off-chain before the oracle posts on-chain. They front-run
the resolution transaction, buying winning tokens cheap.


**Why it happens:**
There's always latency between real-world events and on-chain
resolution. This window enables profitable front-running.


**Solution:**
```
# COMMIT-REVEAL OR TRADING PAUSE

// Option 1: Pause trading before resolution
uint256 public tradingCutoff;
uint256 public resolutionTime;

modifier tradingOpen() {
    require(block.timestamp < tradingCutoff, "Trading closed");
    _;
}

function trade(...) external tradingOpen {
    // ... trading logic
}

constructor() {
    resolutionTime = 1735689599;  // When event happens
    tradingCutoff = resolutionTime - 1 hours;  // Stop 1hr before
}

// Option 2: Commit-reveal resolution
bytes32 public resolutionCommit;
bytes32 public resolutionReveal;

function commitResolution(bytes32 commitment) external onlyOracle {
    require(block.timestamp >= resolutionTime);
    resolutionCommit = commitment;
    // Trading pauses when commit is made
}

function revealResolution(bool outcome, bytes32 salt) external onlyOracle {
    require(resolutionCommit != bytes32(0));
    require(
        keccak256(abi.encode(outcome, salt)) == resolutionCommit,
        "Invalid reveal"
    );
    _resolve(outcome);
}

```

**Symptoms:**
- Suspicious trades just before resolution
- Large volume as event approaches
- MEV bots targeting resolution txs

---

### [HIGH] LPs drained when outcome becomes certain

**Situation:** Market has $1M liquidity. Outcome becomes obvious (e.g.,
election called). Everyone buys winning tokens from pool.
LPs left holding only losing tokens worth $0.


**Why it happens:**
AMM liquidity providers take the other side of trades.
When outcome is certain, everyone trades one direction,
leaving LPs with the worthless losing tokens.


**Solution:**
```
# LP PROTECTION MECHANISMS

// Option 1: Dynamic fees based on probability
function getSwapFee(uint256 yesReserve, uint256 noReserve)
    public pure returns (uint256)
{
    uint256 imbalance = yesReserve > noReserve
        ? (yesReserve - noReserve) * 1e18 / (yesReserve + noReserve)
        : (noReserve - yesReserve) * 1e18 / (yesReserve + noReserve);

    // Fee increases as imbalance grows
    // Base 0.5%, up to 5% at max imbalance
    return 50 + (imbalance * 450) / 1e18; // basis points
}

// Option 2: Trading halt at extreme probabilities
uint256 public constant MAX_PROBABILITY = 0.95e18;
uint256 public constant MIN_PROBABILITY = 0.05e18;

function trade(...) external {
    uint256 impliedProb = getYesPrice();
    require(
        impliedProb >= MIN_PROBABILITY && impliedProb <= MAX_PROBABILITY,
        "Market too imbalanced"
    );
    // ...
}

// Option 3: LP withdraw restrictions near resolution
function withdrawLiquidity() external {
    require(
        block.timestamp < resolutionTime - 24 hours,
        "Withdrawals locked"
    );
    // ...
}

```

**Symptoms:**
- LPs lose significantly more than expected
- One-sided trading volume
- Pool heavily imbalanced

---

### [MEDIUM] Fake volume to manipulate implied probability

**Situation:** Attacker repeatedly buys and sells to themselves, creating
false volume. Other traders use volume as signal and follow.
Attacker profits on their real position.


**Why it happens:**
Volume is often seen as information signal. Fake volume
can create momentum that real traders follow.


**Solution:**
```
# DETECT AND DISCOURAGE WASH TRADING

// Fee structure that makes wash trading costly
uint256 public constant SWAP_FEE = 30; // 0.3%
// Round-trip costs 0.6%, making wash trading expensive

// Time-weighted average price for large impacts
function getExecutionPrice(
    uint256 amount,
    bool buying
) public view returns (uint256) {
    // TWAP over last N blocks for large orders
    if (amount > TWAP_THRESHOLD) {
        return _calculateTWAP(buying);
    }
    return _spotPrice(buying);
}

// Track trading patterns (off-chain)
// - Same address on both sides
// - Addresses that always trade together
// - Unnatural volume patterns

```

**Symptoms:**
- High volume with little price movement
- Same addresses trading repeatedly
- Volume spikes before news

---

### [CRITICAL] Oracle waits until favorable price to resolve

**Situation:** Oracle can resolve market anytime after deadline. They wait
until their preferred outcome is true (even temporarily)
and resolve at that moment.


**Why it happens:**
If resolution can happen anytime in a window, the oracle
can choose the most favorable moment.


**Solution:**
```
# FIX RESOLUTION TO SPECIFIC TIME

uint256 public immutable exactResolutionTime;

function resolve(bool outcome, bytes calldata proof) external {
    require(block.timestamp >= exactResolutionTime);
    require(block.timestamp <= exactResolutionTime + 1 hours);

    // Proof must show state at EXACTLY resolution time
    // Not "within the window"
    require(
        _verifyProofTimestamp(proof, exactResolutionTime),
        "Proof not at resolution time"
    );

    _resolve(outcome);
}

// Use Chainlink Automation for trustless resolution timing
// Keepers trigger resolution at exact time, not oracle choice

```

**Symptoms:**
- Resolution delayed until favorable
- Oracle has position in market
- Timing correlates with price

---

### [HIGH] Market resolved before expected, trapping traders

**Situation:** Market supposed to run until December 31. Event happens
November 1. Market resolves immediately. Traders expecting
time value are caught off guard.


**Why it happens:**
Some events can occur early. If market resolves on event
occurrence rather than end date, traders may be trapped.


**Solution:**
```
# CLEAR EARLY RESOLUTION POLICY

enum ResolutionType {
    AtDeadline,     // Resolves only at deadline, even if known early
    OnOccurrence,   // Resolves when event occurs
    Hybrid          // Resolves on occurrence OR deadline
}

struct Market {
    uint256 deadline;
    ResolutionType resType;
    bool canResolveEarly;
}

function resolve(bytes32 marketId, bool outcome) external {
    Market storage m = markets[marketId];

    if (m.resType == ResolutionType.AtDeadline) {
        require(block.timestamp >= m.deadline, "Not at deadline");
    } else if (m.resType == ResolutionType.OnOccurrence) {
        // Can resolve anytime with valid proof
    }
    // ...
}

// Document clearly in market description:
// "This market resolves YES immediately upon the candidate
//  winning, or NO at 2025-01-20 if no winner declared."

```

**Symptoms:**
- Unexpected early resolution
- Traders couldn't exit positions
- Time value assumptions broken

---

## Collaboration

### When to Hand Off

| Trigger | Delegate To | Context |
|---------|-------------|--------|
| `` | smart-contract-engineer | Share market specs and resolution criteria |
| `` | wallet-integration | CTF token handling and approvals |
| `` | onchain-analytics | Query trading patterns and volume |

---

## Get the Full Version

This skill has **automated validations**, **detection patterns**, and **structured handoff triggers** that work with the Spawner orchestrator.

```bash
npx vibeship-spawner-skills install
```

Full skill path: `~/.spawner/skills/blockchain/prediction-markets/`

**Includes:**
- `skill.yaml` - Structured skill definition
- `sharp-edges.yaml` - Machine-parseable gotchas with detection patterns
- `validations.yaml` - Automated code checks
- `collaboration.yaml` - Handoff triggers for skill orchestration

---

*Generated by [VibeShip Spawner](https://github.com/vibeforge1111/vibeship-spawner-skills)*
