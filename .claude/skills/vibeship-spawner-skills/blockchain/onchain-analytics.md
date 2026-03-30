# Onchain Analytics Engineer

> Comprehensive expertise in blockchain data analysis using Dune Analytics,
custom indexers, and on-chain data querying. Covers SQL for blockchain,
dashboard creation, protocol metrics, and alpha discovery.


**Category:** blockchain | **Version:** 1.0.0

---

## Patterns

### Using Dune Decoded Tables
Query decoded smart contract events and function calls
for human-readable blockchain data

```
-- Dune SQL (Trino-based)

-- Find all Uniswap V3 swaps for a token
SELECT
  block_time,
  tx_hash,
  "from" as swapper,
  amount0 / 1e18 as token0_amount,
  amount1 / 1e6 as token1_amount,
  sqrt_price_x96
FROM uniswap_v3_ethereum.Pair_evt_Swap
WHERE contract_address = 0x... -- Pool address
  AND block_time >= NOW() - INTERVAL '7' DAY
ORDER BY block_time DESC
LIMIT 100

-- Track protocol TVL over time
SELECT
  date_trunc('day', block_time) as day,
  SUM(amount_usd) as daily_deposits,
  SUM(SUM(amount_usd)) OVER (ORDER BY date_trunc('day', block_time)) as cumulative_tvl
FROM protocol_ethereum.Pool_evt_Deposit
WHERE block_time >= NOW() - INTERVAL '30' DAY
GROUP BY 1
ORDER BY 1

-- Cross-chain analysis
SELECT
  blockchain,
  COUNT(*) as tx_count,
  SUM(amount_usd) as volume_usd
FROM (
  SELECT 'ethereum' as blockchain, amount_usd FROM protocol_ethereum.swaps
  UNION ALL
  SELECT 'arbitrum' as blockchain, amount_usd FROM protocol_arbitrum.swaps
  UNION ALL
  SELECT 'polygon' as blockchain, amount_usd FROM protocol_polygon.swaps
)
GROUP BY 1
ORDER BY 3 DESC

Key Dune Tables:
- tokens.erc20: Token metadata
- prices.usd: Historical token prices
- ethereum.transactions: Raw transactions
- ethereum.logs: Raw event logs
- [protocol]_[chain].[Contract]_evt_[Event]: Decoded events
- [protocol]_[chain].[Contract]_call_[Function]: Decoded calls

```

### Wallet Behavior Analysis
Analyze wallet activity patterns to identify traders,
smart money, or protocol users

```
-- Wallet PnL analysis
WITH wallet_trades AS (
  SELECT
    trader as wallet,
    token_bought_address,
    token_bought_amount_raw / POWER(10, decimals) as amount_bought,
    amount_usd
  FROM dex.trades
  WHERE trader = 0x... -- Target wallet
    AND block_time >= NOW() - INTERVAL '90' DAY
),
token_performance AS (
  SELECT
    wallet,
    token_bought_address,
    SUM(amount_bought) as total_bought,
    SUM(amount_usd) as total_cost,
    -- Get current value
    SUM(amount_bought) * (
      SELECT price FROM prices.usd
      WHERE contract_address = token_bought_address
      ORDER BY minute DESC LIMIT 1
    ) as current_value
  FROM wallet_trades
  GROUP BY 1, 2
)
SELECT
  wallet,
  SUM(current_value - total_cost) as total_pnl,
  SUM(current_value) / SUM(total_cost) - 1 as pnl_pct
FROM token_performance
GROUP BY 1

-- Smart money identification
SELECT
  trader,
  COUNT(DISTINCT token_bought_address) as tokens_traded,
  AVG(CASE
    WHEN current_value > amount_usd * 2 THEN 1
    ELSE 0
  END) as win_rate_2x,
  SUM(current_value - amount_usd) as total_pnl
FROM dex.trades t
JOIN token_metrics m ON t.token_bought_address = m.token
WHERE block_time >= NOW() - INTERVAL '30' DAY
GROUP BY 1
HAVING COUNT(*) >= 10
ORDER BY win_rate_2x DESC
LIMIT 100

```

### Protocol Health Dashboard
Key metrics for monitoring DeFi protocol health

```
Protocol Health Metrics:

-- 1. TVL and TVL Growth
SELECT
  date_trunc('day', block_time) as day,
  SUM(amount_usd) FILTER (WHERE type = 'deposit') as deposits,
  SUM(amount_usd) FILTER (WHERE type = 'withdraw') as withdrawals,
  SUM(amount_usd) FILTER (WHERE type = 'deposit') -
    SUM(amount_usd) FILTER (WHERE type = 'withdraw') as net_flow
FROM protocol_events
GROUP BY 1

-- 2. User Retention (DAU/MAU ratio)
WITH daily_users AS (
  SELECT date_trunc('day', block_time) as day, "from" as user
  FROM protocol_transactions
  GROUP BY 1, 2
),
monthly_users AS (
  SELECT date_trunc('month', day) as month, COUNT(DISTINCT user) as mau
  FROM daily_users
  GROUP BY 1
),
avg_daily AS (
  SELECT
    date_trunc('month', day) as month,
    AVG(daily_count) as avg_dau
  FROM (
    SELECT day, COUNT(DISTINCT user) as daily_count FROM daily_users GROUP BY 1
  )
  GROUP BY 1
)
SELECT
  m.month,
  avg_dau,
  mau,
  avg_dau / mau as stickiness
FROM monthly_users m
JOIN avg_daily d ON m.month = d.month

-- 3. Revenue and Fee Generation
SELECT
  date_trunc('week', block_time) as week,
  SUM(fee_amount_usd) as protocol_fees,
  SUM(volume_usd) * 0.003 as lp_fees, -- 0.3% fee example
  COUNT(DISTINCT tx_hash) as transactions
FROM protocol_trades
GROUP BY 1

-- 4. Concentration Risk (top holder %)
SELECT
  holder,
  balance / total_supply as pct_ownership
FROM token_balances
CROSS JOIN (SELECT SUM(balance) as total_supply FROM token_balances)
ORDER BY balance DESC
LIMIT 10

```


## Sharp Edges (Gotchas)

*Real production issues that cause outages and bugs.*

### [HIGH] Token decimals vary and cause calculation errors

**Situation:** You divide raw token amounts by 1e18 assuming all tokens have
18 decimals. USDC (6 decimals) values are off by 10^12.


**Why it happens:**
ERC20 tokens have varying decimals: USDC/USDT (6), WBTC (8),
most others (18). Using wrong decimals completely breaks analysis.


**Solution:**
```
-- Always join to get correct decimals
SELECT
  t.token_bought_amount_raw / POWER(10, tk.decimals) as amount,
  t.amount_usd
FROM dex.trades t
LEFT JOIN tokens.erc20 tk
  ON t.token_bought_address = tk.contract_address
  AND t.blockchain = tk.blockchain

```

---

### [MEDIUM] Price data timing mismatch with transactions

**Situation:** You join transaction data with prices.usd. Transaction is at
10:31:45, nearest price is 10:30:00. For volatile tokens,
price may be 5% different.


**Why it happens:**
Price oracles update periodically (usually every minute).
High volatility means significant gaps between actual and
recorded prices.


**Solution:**
```
-- Use closest price, not exact match
SELECT t.*, p.price
FROM transactions t
ASOF JOIN prices.usd p
  ON t.token_address = p.contract_address
  AND t.block_time >= p.minute
-- ASOF join gets most recent price before transaction

```

---

### [HIGH] Missing internal transactions in analysis

**Situation:** You track ETH transfers using ethereum.transactions. Contract
interactions that move ETH internally are invisible, missing
significant value flow.


**Why it happens:**
Internal transactions (contract-to-contract ETH transfers)
aren't in the main transactions table. They require traces.


**Solution:**
```
-- Include internal transactions
SELECT * FROM ethereum.transactions WHERE value > 0
UNION ALL
SELECT * FROM ethereum.traces
WHERE type = 'call' AND value > 0

```

---

## Collaboration

### When to Hand Off

| Trigger | Delegate To | Context |
|---------|-------------|--------|
| `` | smart-contract-engineer | Get ABI and contract addresses for submission |

---

## Get the Full Version

This skill has **automated validations**, **detection patterns**, and **structured handoff triggers** that work with the Spawner orchestrator.

```bash
npx vibeship-spawner-skills install
```

Full skill path: `~/.spawner/skills/blockchain/onchain-analytics/`

**Includes:**
- `skill.yaml` - Structured skill definition
- `sharp-edges.yaml` - Machine-parseable gotchas with detection patterns
- `validations.yaml` - Automated code checks
- `collaboration.yaml` - Handoff triggers for skill orchestration

---

*Generated by [VibeShip Spawner](https://github.com/vibeforge1111/vibeship-spawner-skills)*
