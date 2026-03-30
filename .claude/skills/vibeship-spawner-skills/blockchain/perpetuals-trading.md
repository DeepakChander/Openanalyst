# Perpetuals Trading Engineer

> Comprehensive expertise in decentralized perpetual futures protocols,
including GMX, dYdX, Hyperliquid, and similar platforms. Covers
funding rate mechanics, liquidation engines, position management,
oracle integration, and protocol risk management.


**Category:** blockchain | **Version:** 1.0.0

---

## Patterns

### Funding Rate Calculation
Mechanism to keep perpetual price aligned with spot price
by transferring payments between longs and shorts

```
Funding Rate Components:

┌─────────────────────────────────────────────────────────────┐
│ FUNDING RATE = Interest Rate + Premium Index                │
├─────────────────────────────────────────────────────────────┤
│ Interest Rate: Cost of holding position (typically ~0.03%) │
│ Premium Index: (Mark Price - Index Price) / Index Price     │
└─────────────────────────────────────────────────────────────┘

// Simplified funding rate calculation
contract FundingRate {
    int256 public constant FUNDING_INTERVAL = 8 hours;
    int256 public constant MAX_FUNDING_RATE = 0.01e18; // 1% per interval

    struct Market {
        int256 longOpenInterest;
        int256 shortOpenInterest;
        int256 lastFundingRate;
        uint256 lastFundingTime;
    }

    function calculateFundingRate(
        int256 markPrice,
        int256 indexPrice,
        Market memory market
    ) public pure returns (int256) {
        // Premium = (Mark - Index) / Index
        int256 premium = ((markPrice - indexPrice) * 1e18) / indexPrice;

        // Clamp to max funding rate
        if (premium > MAX_FUNDING_RATE) {
            return MAX_FUNDING_RATE;
        } else if (premium < -MAX_FUNDING_RATE) {
            return -MAX_FUNDING_RATE;
        }

        // Adjust for open interest imbalance
        int256 imbalance = market.longOpenInterest - market.shortOpenInterest;
        int256 totalOI = market.longOpenInterest + market.shortOpenInterest;

        if (totalOI > 0) {
            int256 imbalanceFactor = (imbalance * 1e18) / totalOI;
            premium = (premium + imbalanceFactor) / 2;
        }

        return premium;
    }
}

Funding Payment:
- If rate positive: Longs pay shorts
- If rate negative: Shorts pay longs
- Payment = Position Size × Funding Rate
- Typically every 8 hours

```

### Liquidation Engine Design
System to close undercollateralized positions before
protocol takes losses from bad debt

```
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract LiquidationEngine {
    uint256 public constant MAINTENANCE_MARGIN = 0.05e18; // 5%
    uint256 public constant LIQUIDATION_FEE = 0.005e18;   // 0.5%
    uint256 public constant LIQUIDATOR_REWARD = 0.0025e18; // 0.25%

    struct Position {
        int256 size;       // Positive = long, negative = short
        uint256 collateral;
        uint256 entryPrice;
        uint256 lastFundingIndex;
    }

    mapping(address => mapping(bytes32 => Position)) public positions;

    function isLiquidatable(
        address trader,
        bytes32 market,
        uint256 markPrice
    ) public view returns (bool) {
        Position memory pos = positions[trader][market];
        if (pos.size == 0) return false;

        int256 pnl = calculatePnL(pos, markPrice);
        int256 equity = int256(pos.collateral) + pnl;
        uint256 positionValue = abs(pos.size) * markPrice / 1e18;
        uint256 maintenanceRequired = positionValue * MAINTENANCE_MARGIN / 1e18;

        return equity < int256(maintenanceRequired);
    }

    function liquidate(
        address trader,
        bytes32 market,
        uint256 markPrice
    ) external {
        require(isLiquidatable(trader, market, markPrice), "Not liquidatable");

        Position storage pos = positions[trader][market];
        uint256 positionValue = abs(pos.size) * markPrice / 1e18;

        // Calculate fees
        uint256 liquidationFee = positionValue * LIQUIDATION_FEE / 1e18;
        uint256 liquidatorReward = positionValue * LIQUIDATOR_REWARD / 1e18;

        // Close position
        int256 pnl = calculatePnL(pos, markPrice);
        int256 remainingCollateral = int256(pos.collateral) + pnl
            - int256(liquidationFee);

        // Pay liquidator
        if (remainingCollateral > int256(liquidatorReward)) {
            _transferReward(msg.sender, liquidatorReward);
            remainingCollateral -= int256(liquidatorReward);
        }

        // Handle any remaining collateral or bad debt
        if (remainingCollateral > 0) {
            _transferCollateral(trader, uint256(remainingCollateral));
        } else {
            // Bad debt absorbed by insurance fund
            _absorbBadDebt(uint256(-remainingCollateral));
        }

        delete positions[trader][market];
    }

    function calculatePnL(Position memory pos, uint256 markPrice)
        internal pure returns (int256)
    {
        int256 priceDelta = int256(markPrice) - int256(pos.entryPrice);
        return (pos.size * priceDelta) / int256(pos.entryPrice);
    }

    function abs(int256 x) internal pure returns (uint256) {
        return x >= 0 ? uint256(x) : uint256(-x);
    }
}

Liquidation Parameters by Market:
┌─────────────────┬──────────────────┬──────────────────┐
│ Market          │ Maint. Margin    │ Liq. Threshold   │
├─────────────────┼──────────────────┼──────────────────┤
│ BTC/USD         │ 0.5%             │ 0.4%             │
│ ETH/USD         │ 0.5%             │ 0.4%             │
│ Altcoins        │ 2.5%             │ 2.0%             │
│ Memecoins       │ 5.0%             │ 4.0%             │
└─────────────────┴──────────────────┴──────────────────┘

```

### GMX-Style Liquidity Pool
Zero-slippage perpetuals AMM using liquidity pool as
counterparty to all trades

```
GMX Architecture:

┌─────────────────────────────────────────────────────────────┐
│                      GLP/GM Pool                            │
│  ┌─────────────────────────────────────────────────────────┐│
│  │ Assets: ETH, BTC, USDC, USDT, DAI, etc.                ││
│  │ Value: ~$500M+ (varies by chain)                       ││
│  └─────────────────────────────────────────────────────────┘│
│                          │                                  │
│              ┌───────────┴───────────┐                      │
│              ▼                       ▼                      │
│    [Traders open positions]    [LPs earn fees]              │
│    - Zero slippage at oracle   - 70% of trading fees       │
│    - Pool is counterparty      - Bear PnL risk             │
│    - Funding to LPs            - Funding payments          │
└─────────────────────────────────────────────────────────────┘

Key Components:
- Oracle-based pricing (Chainlink + secondary)
- Position fees: 0.1% open/close
- Borrow fee: Hourly rate based on utilization
- Funding: Paid to LPs when open interest imbalanced

// Simplified position opening
function openPosition(
    address collateralToken,
    uint256 collateralAmount,
    address indexToken,    // Token being traded
    uint256 sizeDelta,     // Position size increase
    bool isLong
) external {
    // Oracle price for execution
    uint256 price = oracle.getPrice(indexToken, isLong);

    // Validate leverage
    uint256 leverage = (sizeDelta * 1e18) / collateralAmount;
    require(leverage <= MAX_LEVERAGE, "Leverage too high");

    // Update pool reserved amounts
    if (isLong) {
        reservedAmounts[indexToken] += sizeDelta;
    } else {
        reservedAmounts[collateralToken] += sizeDelta;
    }

    // Collect fees
    uint256 fee = (sizeDelta * POSITION_FEE) / 1e18;
    _collectFees(fee);

    // Create/update position
    positions[msg.sender].size += sizeDelta;
    // ...
}

```


## Anti-Patterns

### Single Oracle Dependency
Relying on single oracle for mark price allows manipulation
leading to unfair liquidations or exploits


### No Open Interest Caps
Unlimited open interest relative to liquidity creates
situations where pool cannot cover payouts


### Immediate Liquidation Without Buffer
Liquidating at exact maintenance margin allows
MEV bots to sandwich-attack near-threshold positions



## Sharp Edges (Gotchas)

*Real production issues that cause outages and bugs.*

### [CRITICAL] Small oracle deviations enable profitable exploits

**Situation:** Your perp uses Chainlink for pricing. Chainlink updates on
0.5% deviation. An attacker exploits the 0.5% gap between
Chainlink and actual market price repeatedly.


**Why it happens:**
Chainlink and similar oracles update on threshold deviations
to save gas. This creates small windows where the oracle
price doesn't match the market, enabling MEV extraction.


**Solution:**
```
# MULTI-ORACLE WITH DEVIATION CHECKS

contract PerpOracle {
    IChainlinkAggregator public primaryOracle;
    IChainlinkAggregator public secondaryOracle;
    uint256 public constant MAX_DEVIATION = 0.005e18; // 0.5%

    function getPrice() public view returns (uint256) {
        uint256 primary = _getChainlinkPrice(primaryOracle);
        uint256 secondary = _getChainlinkPrice(secondaryOracle);

        // Check deviation between oracles
        uint256 deviation = _calculateDeviation(primary, secondary);
        require(deviation <= MAX_DEVIATION, "Price deviation too high");

        // Use median or average
        return (primary + secondary) / 2;
    }

    // Additional protections
    function validatePriceMovement(
        uint256 oldPrice,
        uint256 newPrice,
        uint256 maxMovementBps
    ) internal pure {
        uint256 movement = _calculateDeviation(oldPrice, newPrice);
        require(movement <= maxMovementBps, "Price moved too fast");
    }
}

GMX V2 Approach:
- Primary: Chainlink price feeds
- Secondary: Signed prices from off-chain oracles
- Real-time signed prices for execution
- Chainlink as fallback/validation

```

**Symptoms:**
- Consistent small profits by sophisticated traders
- Price differences vs CEX at trade time
- MEV bots extracting value

---

### [HIGH] Open interest manipulation to farm funding

**Situation:** Large trader opens massive long position, pushing funding
rate negative. They hold offsetting short on another platform,
collecting funding as the "minority side."


**Why it happens:**
Funding rates are designed to balance longs and shorts.
But if one party can dominate open interest, they control
the funding rate and can farm it from the other side.


**Solution:**
```
# CAP POSITION SIZE AND RATE

contract FundingProtection {
    uint256 public constant MAX_POSITION_SHARE = 0.1e18; // 10% of OI

    function openPosition(int256 size) external {
        int256 totalOI = longOI + shortOI;
        int256 newPositionShare = (abs(size) * 1e18) / totalOI;

        require(
            newPositionShare <= MAX_POSITION_SHARE,
            "Position too large"
        );

        // Also cap funding rate
        require(
            abs(currentFundingRate) <= MAX_FUNDING_RATE,
            "Funding rate capped"
        );
    }

    // Time-weighted funding to prevent gaming
    function calculateFunding() public view returns (int256) {
        // Use TWAP of OI imbalance, not instant
        return fundingRateTWAP;
    }
}

Additional Measures:
- Delay funding rate changes
- Use time-weighted average OI
- Cap maximum funding rate
- Monitor for correlated positions across platforms

```

**Symptoms:**
- Extreme funding rates (>0.5% per 8h)
- Single address dominating one side
- Coordinated positions across venues

---

### [CRITICAL] Mass liquidations cause cascading price impact

**Situation:** Price drops 10%. Leveraged longs get liquidated. Liquidations
push price down further. More liquidations trigger. Cascade
continues until pool is drained.


**Why it happens:**
Liquidations sell into the market. In thin liquidity or AMM
pools, this creates price impact. Price impact triggers more
liquidations. This feedback loop is the "cascade."


**Solution:**
```
# GRADUAL LIQUIDATION AND BACKSTOPS

contract GradualLiquidation {
    uint256 public constant PARTIAL_LIQ_RATIO = 0.25e18; // 25%
    uint256 public constant CIRCUIT_BREAKER = 0.05e18;   // 5% drop
    uint256 public priceAtIntervalStart;
    bool public circuitBreakerActive;

    function liquidate(address trader) external {
        require(!circuitBreakerActive, "Market halted");

        Position storage pos = positions[trader];

        // Partial liquidation - only close 25%
        uint256 closeSize = (pos.size * PARTIAL_LIQ_RATIO) / 1e18;

        // Check price impact
        uint256 impact = calculatePriceImpact(closeSize);
        require(impact <= MAX_IMPACT, "Impact too high");

        // Close partial position
        _closePosition(trader, closeSize);

        // If still underwater, schedule next partial
        if (isLiquidatable(trader)) {
            scheduledLiquidations[trader] = block.timestamp + 1 minutes;
        }
    }

    // Circuit breaker for extreme moves
    function checkCircuitBreaker() internal {
        if (block.timestamp >= intervalEnd) {
            priceAtIntervalStart = currentPrice;
            intervalEnd = block.timestamp + 1 hours;
        }

        uint256 movement = _deviation(currentPrice, priceAtIntervalStart);
        if (movement >= CIRCUIT_BREAKER) {
            circuitBreakerActive = true;
            emit CircuitBreaker(currentPrice, movement);
        }
    }
}

Additional Protections:
- ADL (Auto-Deleveraging) before insurance fund
- Reduce max leverage during high volatility
- Dynamic maintenance margin
- Cross-margin to share collateral

```

**Symptoms:**
- Price drops much further than spot
- Cascade of liquidation events
- Insurance fund depleted

---

### [HIGH] Bad debt distributed to winning traders

**Situation:** Large position gets liquidated underwater. Insurance fund
is empty. Protocol socializes losses by reducing winning
traders' profits proportionally.


**Why it happens:**
When a position is liquidated with negative equity (bad debt),
someone must absorb the loss. If insurance fund is depleted,
protocols often socialize losses to remain solvent.


**Solution:**
```
# TIERED LOSS ABSORPTION

Loss Absorption Waterfall:
1. Trader's remaining collateral
2. Liquidation penalty (paid to liquidator)
3. Insurance fund
4. ADL (Auto-Deleveraging) most profitable positions
5. Socialization (last resort)

contract InsuranceFund {
    uint256 public fundBalance;
    uint256 public constant MIN_FUND_RATIO = 0.02e18; // 2% of OI

    function absorbBadDebt(uint256 debt) external onlyLiquidationEngine {
        if (fundBalance >= debt) {
            fundBalance -= debt;
            return;
        }

        // Partial coverage
        uint256 covered = fundBalance;
        fundBalance = 0;
        uint256 uncovered = debt - covered;

        // ADL before socialization
        _autoDeleverage(uncovered);
    }

    function _autoDeleverage(uint256 amount) internal {
        // Find most profitable positions on opposite side
        // Force-close them at current price
        // They take the loss instead of everyone
    }
}

ADL Ranking:
- Profit ratio = PnL / Position Size
- Higher profit ratio = first to be ADL'd
- Fairer than random socialization

```

**Symptoms:**
- Winning trades receive less than expected
- Unexpected position closures
- Insurance fund at zero

---

### [MEDIUM] Abandoned positions accumulate unbounded fees

**Situation:** Trader opens small position and forgets about it. Borrow fees
accumulate for months. When finally liquidated, the position
owes more than the entire protocol's insurance fund.


**Why it happens:**
Borrow fees compound over time. A position can technically
owe infinite fees if never closed or liquidated. This creates
accounting problems and bad debt risk.


**Solution:**
```
# CAP ACCUMULATED FEES

contract FeeManagement {
    uint256 public constant MAX_FEE_RATIO = 0.95e18; // 95% of collateral

    function updatePosition(address trader) public {
        Position storage pos = positions[trader];

        uint256 accumulatedFees = calculateAccumulatedFees(pos);

        // Cap fees at percentage of collateral
        uint256 maxFees = (pos.collateral * MAX_FEE_RATIO) / 1e18;
        if (accumulatedFees > maxFees) {
            accumulatedFees = maxFees;
            // Auto-liquidate when fees hit cap
            _liquidate(trader);
        }

        pos.accruedFees = accumulatedFees;
    }

    // Also implement position expiry
    uint256 public constant MAX_POSITION_AGE = 365 days;

    function checkPositionAge(address trader) internal {
        Position storage pos = positions[trader];
        if (block.timestamp > pos.openTime + MAX_POSITION_AGE) {
            _forceClose(trader);
        }
    }
}

```

**Symptoms:**
- Ancient positions in system
- Fees exceeding collateral on paper
- Accounting discrepancies

---

### [HIGH] One bad position drains all cross-margin collateral

**Situation:** Trader has 10 positions in cross-margin mode. One position
goes heavily underwater. The system uses collateral from
other profitable positions, liquidating everything.


**Why it happens:**
Cross-margin shares collateral across positions. A single
large loss can consume collateral meant for other positions,
triggering cascading liquidations of the entire account.


**Solution:**
```
# ISOLATED MARGIN OPTION + RISK LIMITS

contract MarginModes {
    enum MarginMode { Isolated, Cross }

    struct Account {
        MarginMode mode;
        uint256 totalCollateral;
        mapping(bytes32 => Position) positions;
    }

    function openPositionIsolated(
        bytes32 market,
        uint256 collateral,
        int256 size
    ) external {
        // Collateral locked to this position only
        positions[market].isolatedCollateral = collateral;
        positions[market].size = size;

        // Max loss = this collateral, not entire account
    }

    function openPositionCross(
        bytes32 market,
        int256 size
    ) external {
        require(account.mode == MarginMode.Cross);

        // Uses shared collateral
        // But set individual position loss limits
        positions[market].maxLoss = account.totalCollateral / 4;
    }

    // Force close before one position drains everything
    function checkPositionLimit(address trader, bytes32 market) internal {
        int256 pnl = calculatePnL(trader, market);
        if (pnl < -int256(positions[market].maxLoss)) {
            _forceClose(trader, market);
        }
    }
}

```

**Symptoms:**
- Entire account liquidated from one position
- Profitable positions closed unexpectedly
- Rapid account value decline

---

## Collaboration

### When to Hand Off

| Trigger | Delegate To | Context |
|---------|-------------|--------|
| `` | smart-contract-auditor | Include oracle manipulation and liquidation scenarios |
| `` | crypto-trading-bots | Share position monitoring and MEV requirements |
| `` | onchain-analytics | Track OI, funding, liquidations, PnL |
| `` | cross-chain | Handle collateral and position bridging |

---

## Get the Full Version

This skill has **automated validations**, **detection patterns**, and **structured handoff triggers** that work with the Spawner orchestrator.

```bash
npx vibeship-spawner-skills install
```

Full skill path: `~/.spawner/skills/blockchain/perpetuals-trading/`

**Includes:**
- `skill.yaml` - Structured skill definition
- `sharp-edges.yaml` - Machine-parseable gotchas with detection patterns
- `validations.yaml` - Automated code checks
- `collaboration.yaml` - Handoff triggers for skill orchestration

---

*Generated by [VibeShip Spawner](https://github.com/vibeforge1111/vibeship-spawner-skills)*
