# Crypto Trading Bot Engineer

> Comprehensive expertise in automated crypto trading systems,
including DEX sniping bots, arbitrage strategies, MEV protection,
Telegram trading bots, and anti-rug protection.


**Category:** blockchain | **Version:** 1.0.0

---

## Patterns

### DEX Token Sniper
Fast execution bot for buying tokens immediately
after liquidity is added

```
// TypeScript sniper structure
import { ethers } from 'ethers';
import { FlashbotsBundleProvider } from '@flashbots/ethers-provider-bundle';

class TokenSniper {
    private provider: ethers.Provider;
    private wallet: ethers.Wallet;
    private router: ethers.Contract;

    async snipeOnLiquidity(
        tokenAddress: string,
        wethAmount: bigint,
        slippageBps: number = 5000 // 50% for new tokens
    ) {
        // 1. Calculate minimum output with slippage
        const path = [WETH_ADDRESS, tokenAddress];
        const amounts = await this.router.getAmountsOut(wethAmount, path);
        const minOut = amounts[1] * BigInt(10000 - slippageBps) / 10000n;

        // 2. Build swap transaction
        const deadline = Math.floor(Date.now() / 1000) + 60;
        const swapData = this.router.interface.encodeFunctionData(
            'swapExactETHForTokensSupportingFeeOnTransferTokens',
            [minOut, path, this.wallet.address, deadline]
        );

        // 3. Use Flashbots for private submission
        const flashbotsProvider = await FlashbotsBundleProvider.create(
            this.provider,
            this.wallet
        );

        const bundle = [{
            transaction: {
                to: ROUTER_ADDRESS,
                value: wethAmount,
                data: swapData,
                gasLimit: 300000n,
                maxFeePerGas: ethers.parseUnits('100', 'gwei'),
                maxPriorityFeePerGas: ethers.parseUnits('50', 'gwei'),
            },
            signer: this.wallet
        }];

        const blockNumber = await this.provider.getBlockNumber();
        const result = await flashbotsProvider.sendBundle(bundle, blockNumber + 1);

        return result;
    }
}

Safety Checks Before Snipe:
- Verify contract is not honeypot
- Check for malicious functions (mint, pause, blacklist)
- Verify liquidity lock
- Check tax percentages
- Simulate sell transaction

```

### DEX Arbitrage Detection
Monitor price discrepancies across DEXs for
profitable arbitrage opportunities

```
class ArbitrageScanner {
    private dexes: DEXInterface[] = [];

    async findOpportunities(tokenA: string, tokenB: string) {
        const opportunities: ArbitrageOp[] = [];

        // Get prices from all DEXs
        const prices = await Promise.all(
            this.dexes.map(async dex => ({
                dex: dex.name,
                price: await dex.getPrice(tokenA, tokenB),
                liquidity: await dex.getLiquidity(tokenA, tokenB)
            }))
        );

        // Find profitable pairs
        for (let i = 0; i < prices.length; i++) {
            for (let j = i + 1; j < prices.length; j++) {
                const spread = Math.abs(prices[i].price - prices[j].price);
                const spreadPct = spread / Math.min(prices[i].price, prices[j].price);

                // Account for gas and slippage
                const minSpread = 0.005; // 0.5% minimum
                if (spreadPct > minSpread) {
                    const buyDex = prices[i].price < prices[j].price ? i : j;
                    const sellDex = buyDex === i ? j : i;

                    opportunities.push({
                        buyOn: prices[buyDex].dex,
                        sellOn: prices[sellDex].dex,
                        spread: spreadPct,
                        maxSize: Math.min(prices[buyDex].liquidity, prices[sellDex].liquidity) * 0.1
                    });
                }
            }
        }

        return opportunities;
    }
}

// Flash loan arbitrage
contract FlashLoanArbitrage {
    function executeArbitrage(
        address token,
        uint256 amount,
        address buyDex,
        address sellDex
    ) external {
        // 1. Flash borrow
        IERC20(token).flashLoan(amount);

        // 2. Buy on cheaper DEX
        IDex(buyDex).swap(token, amount);

        // 3. Sell on expensive DEX
        IDex(sellDex).swap(token, receivedAmount);

        // 4. Repay flash loan + fee
        // Keep profit
    }
}

```

### Anti-Rug Detection
Automated checks to detect potential rug pulls
before buying tokens

```
interface TokenSafetyCheck {
    isHoneypot: boolean;
    sellTax: number;
    buyTax: number;
    hasBlacklist: boolean;
    hasPausable: boolean;
    hasMintFunction: boolean;
    liquidityLocked: boolean;
    ownerBalance: number;
    topHolderPct: number;
}

async function checkTokenSafety(tokenAddress: string): Promise<TokenSafetyCheck> {
    const checks: TokenSafetyCheck = {
        isHoneypot: false,
        sellTax: 0,
        buyTax: 0,
        hasBlacklist: false,
        hasPausable: false,
        hasMintFunction: false,
        liquidityLocked: false,
        ownerBalance: 0,
        topHolderPct: 0
    };

    // 1. Simulate buy and sell
    try {
        const buyResult = await simulateBuy(tokenAddress, ETH_AMOUNT);
        const sellResult = await simulateSell(tokenAddress, buyResult.tokensReceived);

        checks.buyTax = 100 - (buyResult.tokensReceived / expectedTokens * 100);
        checks.sellTax = 100 - (sellResult.ethReceived / expectedEth * 100);

        if (sellResult.reverted) {
            checks.isHoneypot = true;
        }
    } catch {
        checks.isHoneypot = true;
    }

    // 2. Check contract for dangerous functions
    const code = await provider.getCode(tokenAddress);
    checks.hasBlacklist = code.includes(BLACKLIST_SELECTOR);
    checks.hasPausable = code.includes(PAUSE_SELECTOR);
    checks.hasMintFunction = code.includes(MINT_SELECTOR);

    // 3. Check liquidity lock
    const lpToken = await getPairAddress(tokenAddress, WETH);
    checks.liquidityLocked = await isLiquidityLocked(lpToken);

    // 4. Check holder distribution
    const holders = await getTopHolders(tokenAddress);
    checks.topHolderPct = holders[0].percentage;
    checks.ownerBalance = await getOwnerBalance(tokenAddress);

    return checks;
}

Red Flags:
- Sell tax > 10%
- Honeypot (can't sell)
- Mint function accessible
- No liquidity lock
- Owner holds > 10%
- Top holder > 20%

```


## Anti-Patterns

### Private keys in bot code
Hardcoding private keys in bot source code


### No maximum spend per trade
Bot can spend unlimited funds on single trade



## Sharp Edges (Gotchas)

*Real production issues that cause outages and bugs.*

### [HIGH] Your bot gets sandwiched by MEV bots

**Situation:** You submit trade to public mempool. MEV bot sees it, front-runs
your buy, and back-runs your sell. You get worse price.


**Solution:**
```
// Use private mempool (Flashbots)
const flashbots = await FlashbotsBundleProvider.create(provider, wallet);
await flashbots.sendPrivateTransaction(signedTx);

// Or use MEV-protected RPC
// - Flashbots Protect
// - MEV Blocker
// - Private RPCs

```

---

### [MEDIUM] Transaction reverts due to token transfer tax

**Situation:** You use swapExactTokensForTokens. Token has 5% tax. Expected
output doesn't match, transaction reverts.


**Solution:**
```
// Use fee-on-transfer variant
router.swapExactETHForTokensSupportingFeeOnTransferTokens(
    minOut,
    path,
    recipient,
    deadline
);
// This tolerates tokens with transfer taxes

```

---

### [MEDIUM] Running multiple bots that compete with each other

**Situation:** You run multiple sniper instances. They detect same opportunity
and compete, driving up gas costs and reducing profit.


**Solution:**
```
// Coordinate via shared state or leader election
// Use nonce management to prevent conflicts
const nonce = await nonceManager.getNextNonce(wallet.address);

```

---

## Collaboration

---

## Get the Full Version

This skill has **automated validations**, **detection patterns**, and **structured handoff triggers** that work with the Spawner orchestrator.

```bash
npx vibeship-spawner-skills install
```

Full skill path: `~/.spawner/skills/blockchain/crypto-trading-bots/`

**Includes:**
- `skill.yaml` - Structured skill definition
- `sharp-edges.yaml` - Machine-parseable gotchas with detection patterns
- `validations.yaml` - Automated code checks
- `collaboration.yaml` - Handoff triggers for skill orchestration

---

*Generated by [VibeShip Spawner](https://github.com/vibeforge1111/vibeship-spawner-skills)*
