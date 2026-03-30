# Tokenomics Design

> Expert in token economics - distribution models, vesting schedules, incentive mechanisms, emission curves, and sustainable protocol design

**Category:** blockchain | **Version:** 1.0

**Tags:** tokenomics, token-economics, vesting, emission, incentives, governance, defi, crypto

---

## Identity

[object Object]

## Patterns

### Progressive Decentralization Vesting
Longer vesting for insiders, faster for community
**When:** VC-backed projects seeking decentralization

### ve-Token Model
Vote-escrowed tokens for governance and rewards
**When:** Need strong holder alignment and reduced sell pressure

### Dual Token Model
Separate governance and utility tokens
**When:** Need stable utility pricing with speculative governance

### Bonding Curve Distribution
Price increases with supply for fair launch
**When:** No VC, community-first distribution

### Emissions Halving Schedule
Bitcoin-style periodic emission reduction
**When:** Long-term sustainability with predictable supply

### Protocol-Owned Liquidity
Protocol owns LP positions instead of renting
**When:** Reducing dependency on mercenary LPs


## Anti-Patterns

### High TGE Unlock
Large percentage unlocked at token generation
**Instead:** // Bad: 25% TGE unlock
TGE: 25% unlocked
Result: Immediate dump, -80% from launch

// Good: Minimal TGE
TGE: 5% or less for investors
Community airdrop: Can be higher if broad distribution
Vesting: Start immediately after TGE


### Linear Vesting Without Cliff
Tokens unlock from day 1 linearly
**Instead:** // Bad: No cliff
Month 1: 2.5% unlocked
Month 2: 5% unlocked
// Allows selling from day 1

// Good: 1 year cliff
Month 1-12: 0% unlocked (cliff)
Month 13: 25% unlocked (12 months accrued)
Month 14-48: Linear vest remaining 75%


### Unsustainable APY
Promising 1000%+ APY through emissions
**Instead:** // Bad: 10,000% APY
- Requires massive emissions
- Dilutes non-stakers
- Mercenary capital leaves when APY drops

// Good: Sustainable yields
- Real yield from protocol fees: 5-15%
- Token emissions add 10-20%
- Total: 15-35% APY
- Emissions decrease over time


### Complex Utility Without Demand
Designing elaborate token utility without real usage
**Instead:** // Bad: Complex utility
- Stake to boost
- Lock for governance
- Burn for premium
- Pay for features
// But no users actually doing any of this

// Good: Simple, essential utility
- Token required to use protocol (fees)
- Start with one clear use case
- Add utility as demand grows


### No Value Accrual Mechanism
Token captures no value from protocol success
**Instead:** // Bad: Governance only
- Token only votes on proposals
- No fees to holders
- Value is pure speculation

// Good: Value accrual
Option 1: Fee sharing
- 50% of fees to stakers
Option 2: Buyback
- Protocol buys tokens with revenue
Option 3: Burn
- Fees partially burned
Option 4: Treasury growth
- Revenue grows DAO treasury


### Short Team Vesting
Team fully vested before protocol matures
**Instead:** // Bad: 2 year vest
- Team fully liquid after 2 years
- Protocol still developing
- Team incentives misaligned

// Good: 4+ year vest with extensions
- 1 year cliff
- 4 year linear vest
- Option to extend for additional allocation
- Performance-based unlocks



## Sharp Edges (Gotchas)

*Real production issues that cause outages and bugs.*

### [CRITICAL] undefined

**Solution:**
```
Howey Test - Investment Contract:
1. Investment of money
2. In a common enterprise
3. With expectation of profits
4. Derived from efforts of others

Risk Reduction:
- Emphasize utility over investment
- Decentralize before token launch
- No promises of returns or appreciation
- Governance, not profit sharing
- Utility discounts, not dividends

Documentation:
- Clear utility purpose
- No investment language in marketing
- Legal opinion before launch

```

**Symptoms:**
- SEC enforcement action
- Exchange delistings
- Legal liability for founders

---

### [CRITICAL] undefined

**Solution:**
```
Calculate Unlock Impact:

Current State:
- Float: 100M tokens ($100M market cap)
- FDV: 1B tokens ($1B FDV)
- Ratio: 10x

At Full Unlock (worst case):
- If all new supply sells
- Price impact: -90% (10x dilution)

Mitigation:
1. Gradual unlocks (not cliff dumps)
2. Lock-up extensions for large holders
3. Staking incentives for unlocked tokens
4. Communicate unlock schedule clearly

Healthy Ratio: FDV < 3x Market Cap

```

**Symptoms:**
- Price crashes at unlock events
- Retail holders diluted
- Token never recovers to ATH

---

### [CRITICAL] undefined

**Solution:**
```
Emission Sustainability Check:

Weekly Emissions: 1,000,000 tokens
Token Price: $1
Weekly Emission Value: $1,000,000

Required Weekly Buy Pressure:
- Protocol Revenue: $200,000
- New Investment: $500,000
- Organic Demand: $300,000
- Total: $1,000,000 minimum

If buy pressure < emissions:
- Price declines
- APY drops in dollar terms
- Farmers leave
- TVL drops
- Repeat (death spiral)

Solution:
- Emission = f(protocol revenue)
- Dynamic rate reduction
- Burn mechanisms

```

**Symptoms:**
- Constant price decline
- Decreasing TVL despite emissions
- Death spiral

---

### [HIGH] undefined

**Solution:**
```
Problematic:
- 25% unlock after 1 year cliff
- All investors unlock same date
- Predictable dump

Better:
- Staggered cliffs (3, 6, 9, 12 months)
- Different unlock dates per round
- Linear vest after cliff (no lump sum)
- Weekly/monthly unlocks, not quarterly

Code Example:
function vestedAmount(address beneficiary) public view returns (uint256) {
    uint256 elapsed = block.timestamp - vestingStart;
    if (elapsed < CLIFF) return 0;

    // Weekly unlocks after cliff
    uint256 weeksVested = (elapsed - CLIFF) / 1 weeks;
    uint256 totalWeeks = (VESTING_DURATION - CLIFF) / 1 weeks;

    return allocation[beneficiary] * weeksVested / totalWeeks;
}

```

**Symptoms:**
- Sharp price decline on unlock date
- Predictable selling opportunity
- Community loses trust

---

### [HIGH] undefined

**Solution:**
```
Governance Safeguards:

1. Snapshot Voting
- Voting power from past block
- Prevents flash loan attacks

2. Time Locks
- Proposal delay: 2-7 days
- Execution delay: 24-48 hours
- Allows community response

3. Vote Escrow (veToken)
- Must lock tokens to vote
- Longer lock = more power
- Can't quickly accumulate

4. Multi-sig Override
- Security council can veto
- Emergency actions without vote

5. Quorum Requirements
- Minimum participation
- Supermajority for critical changes

```

**Symptoms:**
- Treasury drained via governance
- Protocol parameters manipulated
- Minority holders overruled

---

### [HIGH] undefined

**Solution:**
```
Liquidity Sustainability:

Phase 1: Bootstrap (Month 1-6)
- High emissions: 500K tokens/month
- Goal: Attract initial liquidity

Phase 2: Transition (Month 7-12)
- Reduce emissions: 250K/month
- Introduce POL (protocol-owned liquidity)
- Start fee sharing to LPs

Phase 3: Sustainable (Year 2+)
- Minimal emissions: 50K/month
- POL provides base liquidity
- Trading fees incentivize remaining LPs

Never go from high to zero emissions.
Always have a sustainability plan.

```

**Symptoms:**
- TVL cliff when incentives end
- Slippage increases dramatically
- Protocol becomes unusable

---

### [HIGH] undefined

**Solution:**
```
Anti-Dump Airdrop Design:

1. Vested Airdrop
- 10% immediate
- 90% over 6-12 months

2. Lock Boost
- Claim now: 100 tokens
- Lock 3 months: 150 tokens
- Lock 6 months: 200 tokens

3. Usage Requirements
- Must use protocol to claim
- Partial claim per transaction
- Ongoing engagement rewards

4. Smaller Allocations
- Cap per address
- Wider distribution
- Reduces whale dumps

```

**Symptoms:**
- Price drops 50%+ at airdrop claim
- Farmers claim and sell
- Real users get worse price

---

### [MEDIUM] undefined

**Solution:**
```
Reduce Velocity:

1. Staking Requirements
- Lock to access features
- Higher lock = better rates

2. Fee Discounts
- Pay in token: 50% off
- Hold threshold for discount

3. Time-Weighted Benefits
- Longer hold = more rewards
- Loyalty multipliers

4. Utility Sinks
- Burn for premium features
- Consume for upgrades

Equation:
Token Value = Transaction Volume / Velocity
Lower velocity = higher value

```

**Symptoms:**
- Buy pressure doesn't sustain price
- Constant sell pressure from users
- Token acts as pass-through

---

### [MEDIUM] undefined

**Solution:**
```
Healthy Distribution Targets:

Top 10 holders: < 40% of supply
Top 100 holders: < 70% of supply
Gini coefficient: < 0.8

Achieving Distribution:
1. Broad airdrop (many small recipients)
2. Cap per-address allocations
3. Community sale with limits
4. Liquidity mining (gradual distribution)

Monitoring:
- Track concentration metrics
- Etherscan/Solscan holder analysis
- Dune dashboard for distribution

```

**Symptoms:**
- Single wallet can crash price
- Governance centralized
- Retail hesitant to buy

---

### [MEDIUM] undefined

**Solution:**
```
Oracle Security:

1. Use TWAP (Time-Weighted Average Price)
- 30 minute minimum window
- Resists single-block manipulation

2. Multiple Sources
- Aggregate Chainlink, Uniswap, etc.
- Median or weighted average

3. Liquidity Requirements
- Minimum liquidity depth
- Circuit breakers on low liquidity

4. Price Deviation Checks
- Compare to external sources
- Pause on large deviations

Code:
require(
    deviation(oraclePrice, backupPrice) < 5%,
    "Price deviation too high"
);

```

**Symptoms:**
- Flash loan attacks on DeFi integrations
- Incorrect liquidations
- Arbitrage exploits

---

## Collaboration

### When to Hand Off

| Trigger | Delegate To | Context |
|---------|-------------|--------|
| `` | evm-deep-dive | Token contract implementation |
| `` | solana-development | Solana token implementation |
| `` | token-launch | Token launch execution |
| `` | compliance-automation | Regulatory compliance review |
| `` | dao-governance | Governance mechanism design |

### Receives Work From

- **blockchain-defi**: 
- **token-launch**: 
- **dao-governance**: 
- **compliance-automation**: 

---

## Get the Full Version

This skill has **automated validations**, **detection patterns**, and **structured handoff triggers** that work with the Spawner orchestrator.

```bash
npx vibeship-spawner-skills install
```

Full skill path: `~/.spawner/skills/blockchain/tokenomics-design/`

**Includes:**
- `skill.yaml` - Structured skill definition
- `sharp-edges.yaml` - Machine-parseable gotchas with detection patterns
- `validations.yaml` - Automated code checks
- `collaboration.yaml` - Handoff triggers for skill orchestration

---

*Generated by [VibeShip Spawner](https://github.com/vibeforge1111/vibeship-spawner-skills)*
