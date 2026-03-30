# Technical Analysis

> Master of price action, chart patterns, and technical indicators - combining classical Wyckoff/Dow theory with modern quantitative validation for edge identification

**Category:** trading | **Version:** 1.0

**Tags:** trading, technical-analysis, charts, indicators, price-action, patterns, support-resistance, trend-following

---

## Identity

[object Object]

## Patterns

### Wyckoff Accumulation
Institutional accumulation pattern before markup phase
**When:** Looking for major trend reversals at lows after extended decline

### Volume Profile Value Area
Using volume distribution to identify high-probability support/resistance
**When:** Identifying where price is likely to find acceptance or rejection

### RSI Divergence with Structure
RSI divergence confirmed by price structure break
**When:** Looking for trend exhaustion and reversal setups

### Fibonacci Confluence Zones
Multiple Fibonacci levels from different swings creating high-probability zones
**When:** Identifying optimal entry points in trending markets

### Market Structure Break (MSB)
Identifying trend changes through structural breaks
**When:** Determining if a trend has ended and new direction beginning

### VWAP Mean Reversion
Trading deviations from volume-weighted average price
**When:** Intraday trading, identifying overextended moves


## Anti-Patterns

### Indicator Stacking
Using multiple indicators that measure the same thing
**Instead:** # Bad: Redundant indicators
- RSI + Stochastics + CCI (all momentum)
- MACD + Moving Averages (MACD is derived from MAs)

# Good: Complementary indicators
- Trend: One moving average or price structure
- Momentum: One oscillator (RSI or MACD)
- Volume: Volume profile or OBV
- Volatility: ATR or Bollinger Width

# Rule: One indicator per category, max 3-4 total


### Curve Fitting Backtests
Optimizing indicators until backtest looks perfect
**Instead:** # Bad: Optimized parameters
"RSI 7 with 23/77 levels on 4H BTC gave 87% win rate!"

# Why it's bad:
- Specific to that asset, timeframe, period
- Won't generalize to future data
- You found noise, not signal

# Good: Robust parameters
- Use default or well-researched parameters
- Test across multiple assets and timeframes
- Use walk-forward optimization
- Out-of-sample testing mandatory

# If edge disappears with standard parameters, there is no edge


### Cherry-Picked Chart Examples
Showing only times pattern worked, ignoring failures
**Instead:** # Bad: "Look at this perfect head and shoulders!"
- Shows 3 examples where it worked
- Ignores 7 times it failed

# Good: Statistical approach
- "Head and shoulders breaks down 63% of time (Bulkowski)"
- "Average decline is 16%"
- "Failed patterns reverse 45%+ when neckline holds"

# Always ask:
1. What's the sample size?
2. What's the failure rate?
3. What defines failure/success?


### Ignoring Higher Timeframe
Taking signals against the prevailing trend
**Instead:** # Bad: Buying 15m oversold in daily downtrend
"RSI is at 20, time to buy!"

# Why it fails:
- Oversold can get more oversold
- You're buying into selling pressure
- Higher timeframe dominates

# Good: Timeframe alignment
1. Weekly: Determine major trend
2. Daily: Identify setup zone
3. 4H/1H: Time entry

# Only trade when all timeframes agree or neutral


### Moving Average Crossover Systems
Blindly trading golden/death crosses
**Instead:** # Bad: Buy golden cross, sell death cross
- 50 MA crosses above 200 MA = buy
- In range-bound markets: whipsaw city
- In trends: enters late, exits late

# Why it persists:
- Looks great on strongly trending backtests
- Survivorship bias (we remember when it worked)

# Better uses for MAs:
- Dynamic support/resistance (not signals)
- Trend filter (only long above 200, short below)
- Mean reversion anchor (trade pullbacks to MA)

# If you must use crossovers, add filters:
- ADX > 25 (confirm trend)
- Volume increase on cross
- Price structure confirmation


### Predicting with Patterns
Treating patterns as guaranteed predictions
**Instead:** # Bad thinking:
"This is a cup and handle, it WILL go up"

# Good thinking:
"This is a cup and handle formation. Historically, these break up 65% of the time
 with average move of 20%. My entry is the breakout, stop is below the handle,
 target is the cup depth projected up. If it fails, I lose 1R."

# Pattern = setup with edge
# Not pattern = prediction of future

# Always have:
- Defined entry
- Defined stop
- Defined target
- Acceptance that it might fail



## Sharp Edges (Gotchas)

*Real production issues that cause outages and bugs.*

## Collaboration

### When to Hand Off

| Trigger | Delegate To | Context |
|---------|-------------|--------|
| `` | quantitative-research | Need statistical validation of technical pattern |
| `` | risk-management-trading | Risk management for technical setup |
| `` | sentiment-analysis-trading | Sentiment analysis to complement technicals |
| `` | trading-psychology | Psychological aspects of technical trading |
| `` | execution-algorithms | Execution optimization for technical signals |

### Receives Work From

- **quantitative-research**: 
- **sentiment-analysis-trading**: 
- **risk-management-trading**: 
- **trading-psychology**: 

---

## Get the Full Version

This skill has **automated validations**, **detection patterns**, and **structured handoff triggers** that work with the Spawner orchestrator.

```bash
npx vibeship-spawner-skills install
```

Full skill path: `~/.spawner/skills/trading/technical-analysis/`

**Includes:**
- `skill.yaml` - Structured skill definition
- `sharp-edges.yaml` - Machine-parseable gotchas with detection patterns
- `validations.yaml` - Automated code checks
- `collaboration.yaml` - Handoff triggers for skill orchestration

---

*Generated by [VibeShip Spawner](https://github.com/vibeforge1111/vibeship-spawner-skills)*
