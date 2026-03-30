# Risk Management for Trading

> Master of capital preservation and position sizing - combining Kelly Criterion, volatility targeting, correlation analysis, and drawdown management to survive and thrive in markets

**Category:** trading | **Version:** 1.0

**Tags:** trading, risk-management, position-sizing, kelly-criterion, drawdown, volatility, stop-loss, portfolio-risk

---

## Identity

[object Object]

## Patterns

### Fixed Fractional Position Sizing
Risk a fixed percentage of account per trade
**When:** Standard approach for most traders, simple and effective

### Kelly Criterion with Fractional Kelly
Mathematically optimal bet sizing based on edge and odds
**When:** You have reliable win rate and average win/loss statistics

### Volatility-Adjusted Position Sizing
Size positions inversely to their volatility
**When:** Trading multiple assets with different volatility profiles

### Maximum Drawdown Limits
Reduce or stop trading when drawdown exceeds thresholds
**When:** Protecting capital during losing streaks

### Correlation-Adjusted Portfolio Risk
Account for correlated positions in total portfolio risk
**When:** Holding multiple positions that might move together

### Stop Loss Optimization
Setting stops based on volatility, not arbitrary percentages
**When:** Determining where to place stop losses


## Anti-Patterns

### Martingale and Averaging Down
Doubling position size after losses to recover
**Instead:** Martingale Logic:
- Lose $100, bet $200
- Lose $200, bet $400
- Eventually win and recover all losses!

Reality:
- 10 losses in a row: $102,400 bet to recover $100
- This WILL happen given enough trades
- Account cannot survive the sequence

Anti-Martingale (Correct):
- Win: Increase size slightly
- Lose: Decrease size
- Protect capital, let winners run


### No Stop Loss ("Diamond Hands")
Holding losing positions indefinitely hoping for recovery
**Instead:** "Diamond Hands" Reality:
- -10%: "I'll wait for recovery"
- -30%: "It'll come back"
- -50%: "I can't sell now"
- -70%: "Might as well hold"
- -90%: Account destroyed

Every position needs:
1. Pre-defined stop before entry
2. Automatic execution (set and forget)
3. Acceptance that some stops will be wrong

Being stopped out is not failure.
Account destruction is failure.


### Risk of Ruin Ignorance
Not calculating probability of account destruction
**Instead:** Risk of Ruin Formula (simplified):

RoR = ((1 - Edge) / (1 + Edge)) ^ Units

With 55% win rate, 1:1 R:R (10% edge):
- Risk 10% per trade: 13% ruin probability
- Risk 5% per trade: 1.7% ruin probability
- Risk 2% per trade: 0.02% ruin probability

Rule: Risk of ruin should be < 1%

Calculate before trading:
- What's my edge? (Be conservative)
- What's my max consecutive losses?
- What risk per trade keeps ruin near 0%?


### Leverage Without Understanding
Using high leverage without understanding implications
**Instead:** Leverage Illusion:
"10x leverage = 10x returns!"

Leverage Reality:
- 10% move against you = 100% loss (margin call)
- Funding costs eat returns
- Liquidation cascades cause extreme moves
- You're first to get liquidated in volatility

Safe Leverage Rules:
- Spot > 3x leverage for most traders
- Account for volatility (lower leverage for crypto)
- Position size as if no leverage, then add leverage
- Stop loss BEFORE liquidation price


### Ignoring Correlation in Portfolio
Treating correlated assets as independent bets
**Instead:** False Diversification:
- Long BTC
- Long ETH
- Long SOL
"I'm diversified across 3 assets!"

Reality: Correlation > 0.9
- All drop together in crypto winter
- Portfolio drawdown = worst asset drawdown
- No diversification benefit

True Diversification:
- Uncorrelated return streams
- Assets that zig when others zag
- Negative correlation in crises (hard to find)


### Sizing Up After Wins
Increasing position size after winning streak
**Instead:** Emotional Sizing:
- 5 wins: "I'm hot, let's go bigger!"
- Big size trade: Lose
- Give back all 5 wins in one trade

Correct Approach:
- Fixed position size rules
- Same % risk whether winning or losing
- Let account growth naturally increase $ risk
- Never manually increase after hot streak



## Sharp Edges (Gotchas)

*Real production issues that cause outages and bugs.*

## Collaboration

### When to Hand Off

| Trigger | Delegate To | Context |
|---------|-------------|--------|
| `` | quantitative-research | Need statistics for risk calculations |
| `` | technical-analysis | Need technical levels for stop placement |
| `` | execution-algorithms | Need execution analysis for risk assessment |
| `` | portfolio-optimization | Portfolio-level risk analysis needed |
| `` | trading-psychology | Psychological aspects of following risk rules |
| `` | risk-modeling | Advanced risk modeling scenarios |
| `` | compliance-automation | Regulatory risk requirements |

### Receives Work From

- **technical-analysis**: 
- **quantitative-research**: 
- **execution-algorithms**: 
- **portfolio-optimization**: 
- **algorithmic-trading**: 

---

## Get the Full Version

This skill has **automated validations**, **detection patterns**, and **structured handoff triggers** that work with the Spawner orchestrator.

```bash
npx vibeship-spawner-skills install
```

Full skill path: `~/.spawner/skills/trading/risk-management-trading/`

**Includes:**
- `skill.yaml` - Structured skill definition
- `sharp-edges.yaml` - Machine-parseable gotchas with detection patterns
- `validations.yaml` - Automated code checks
- `collaboration.yaml` - Handoff triggers for skill orchestration

---

*Generated by [VibeShip Spawner](https://github.com/vibeforge1111/vibeship-spawner-skills)*
