# Layer 2 Scaling

> Expert in Ethereum L2 solutions - Optimism, Arbitrum, zkSync, Base, and rollup architecture for scalable dApp development

**Category:** blockchain | **Version:** 1.0

**Tags:** layer2, optimism, arbitrum, zksync, base, rollup, scaling, ethereum

---

## Identity

[object Object]

## Patterns

### Calldata Packing
Minimize calldata to reduce L2 transaction costs
**When:** Any L2 deployment where gas optimization matters

### Cross-L2 Messaging
Communicate between L2s through canonical bridges or protocols
**When:** Multi-chain application requiring state sync

### Sequencer Uptime Monitoring
Check sequencer status before critical operations
**When:** Operations that need guaranteed inclusion

### EIP-4844 Blob Optimization
Leverage blob data for cheaper L1 data availability
**When:** Post-Dencun upgrade L2 deployments

### Forced Transaction Inclusion
Submit transactions directly to L1 if sequencer censors
**When:** Decentralization-critical applications

### L2-Aware Gas Estimation
Calculate gas including L1 data posting costs
**When:** Any transaction cost estimation on L2


## Anti-Patterns

### Ignoring L1 Data Costs
Only considering L2 execution gas in estimates
**Instead:** // Bad: Only L2 gas
uint256 cost = gasLimit * tx.gasprice;

// Good: Include L1 data fee
uint256 l1Fee = GasPriceOracle(L1_ORACLE).getL1Fee(txData);
uint256 l2Fee = gasLimit * tx.gasprice;
uint256 totalCost = l1Fee + l2Fee;


### Hardcoded L1 Gas Prices
Assuming static L1 gas prices in contracts
**Instead:** // Bad
uint256 constant L1_GAS_PRICE = 30 gwei;

// Good: Query oracle
function getL1GasPrice() public view returns (uint256) {
    return GasPriceOracle(oracle).l1BaseFee();
}


### Assuming Instant Finality
Treating L2 transactions as final immediately
**Instead:** // Understand finality levels:
// 1. Sequencer confirmation: ~2 seconds (can reorg)
// 2. L1 inclusion: ~12 minutes (safer)
// 3. L1 finality: ~15 minutes (final)
// 4. Challenge period: 7 days (optimistic rollups)

// For high-value operations, wait for appropriate finality
mapping(bytes32 => uint256) public confirmationTime;

function confirmWithDelay(bytes32 txHash) external {
    require(
        block.timestamp >= confirmationTime[txHash] + DELAY,
        "Not yet final"
    );
    // Proceed
}


### Single Sequencer Dependency
No handling for sequencer downtime
**Instead:** // Implement fallback paths
// 1. Use sequencer uptime feed
// 2. Implement forced inclusion path
// 3. Add circuit breakers for critical functions

function safeOperation() external {
    if (isSequencerDown()) {
        // Switch to fallback mode or pause
        _pauseUntilSequencerRecovery();
    }
    // Normal operation
}


### Ignoring L2-Specific Opcodes
Assuming all EVM opcodes work identically on L2
**Instead:** // L2-specific considerations:
// - TIMESTAMP: May batch blocks differently
// - BASEFEE: L2 has separate fee market
// - DIFFICULTY/PREVRANDAO: May not be available
// - BLOCKHASH: Limited history on some L2s

// Test on target L2, don't assume L1 behavior


### Unprotected Bridge Receivers
Bridge message receivers without authentication
**Instead:** // Bad
function receiveMessage(bytes memory data) external {
    _process(data);
}

// Good
function receiveMessage(bytes memory data) external {
    require(
        msg.sender == address(messenger),
        "Not messenger"
    );
    require(
        messenger.xDomainMessageSender() == trustedL1Contract,
        "Wrong sender"
    );
    _process(data);
}



## Sharp Edges (Gotchas)

*Real production issues that cause outages and bugs.*

### [CRITICAL] undefined

**Solution:**
```
// 1. Use Chainlink sequencer uptime feed
AggregatorV2V3Interface sequencerFeed = AggregatorV2V3Interface(
    // Arbitrum: 0xFdB631F5EE196F0ed6FAa767959853A9F217697D
    // Optimism: 0x371EAD81c9102C9BF4874A9075FFFf170F2Ee389
    SEQUENCER_FEED
);

function isSequencerUp() public view returns (bool) {
    (, int256 answer, , , ) = sequencerFeed.latestRoundData();
    return answer == 0;
}

// 2. Implement graceful degradation
// 3. Show users clear status messages
// 4. Document forced inclusion path

```

**Symptoms:**
- Transactions not being included
- dApp appears frozen
- Users panic about stuck funds

---

### [CRITICAL] undefined

**Solution:**
```
// Dynamic fee handling
async function safeTransaction(tx) {
    // Get current L1 fee
    const l1Fee = await oracle.getL1Fee(tx.data);
    const l2Fee = tx.gasLimit * await provider.getGasPrice();

    // Check against max acceptable
    const totalFee = l1Fee.add(l2Fee);
    if (totalFee.gt(maxAcceptableFee)) {
        // Option 1: Wait for lower fees
        // Option 2: Use fee estimator with buffer
        // Option 3: Alert user to high fees
        throw new Error(`Fee too high: ${formatEther(totalFee)}`);
    }

    // Add 20% buffer for L1 volatility
    tx.gasPrice = tx.gasPrice.mul(120).div(100);
    return sendTransaction(tx);
}

```

**Symptoms:**
- Sudden 10-100x cost increase
- Transactions failing due to insufficient gas
- User complaints about fees

---

### [HIGH] undefined

**Solution:**
```
// Educate users upfront
function initiateWithdrawal(uint256 amount) external {
    // Show warning in UI
    emit WithdrawalInitiated(
        msg.sender,
        amount,
        block.timestamp + 7 days // Estimated finalization
    );

    // Alternative: Use fast bridge (Across, Hop)
    // Trade-off: Fee vs speed
}

// Fast bridge integration
async function fastWithdraw(amount) {
    // Across/Hop take 2-10 minutes
    // Fee: 0.1-0.3%
    const quote = await acrossProtocol.getQuote(amount);
    return acrossProtocol.deposit(amount, quote);
}

```

**Symptoms:**
- Users expecting instant withdrawals
- Liquidity issues
- Support tickets about "stuck" funds

---

### [HIGH] undefined

**Solution:**
```
// zkSync gas = L2 execution + L1 pubdata

// Pubdata cost factors:
// 1. Storage slot changes (not reads)
// 2. Contract bytecode
// 3. Event logs

// Optimization strategies:
// 1. Batch storage writes
// 2. Use smaller data types
// 3. Minimize events

// Test on zkSync specifically
const zkSyncProvider = new Provider("https://mainnet.era.zksync.io");
const gasEstimate = await zkSyncProvider.estimateGas(tx);
// This includes pubdata costs

```

**Symptoms:**
- Gas estimates wildly different from actual
- Contract deployments much more expensive
- Storage-heavy operations cost more than expected

---

### [HIGH] undefined

**Solution:**
```
// Block times by L2:
// Arbitrum: ~250ms
// Optimism: 2 seconds
// Base: 2 seconds
// zkSync: Variable

// Don't assume consistent block times
// Use timestamps, not block numbers

// Bad
require(block.number > lastBlock + 100, "Too soon");

// Good
require(block.timestamp > lastTimestamp + 1 hours, "Too soon");

// For cross-L2 apps, use oracle timestamps

```

**Symptoms:**
- Timing-based logic fails
- Rate limiting doesn't work as expected
- Time-locked operations behave unexpectedly

---

### [HIGH] undefined

**Solution:**
```
// zkSync uses different hash for CREATE2
// address = keccak256(
//   0xff ++ deployer ++ salt ++ keccak256(bytecode_hash ++ constructor_args)
// )

// Use zkSync SDK for address calculation
import { utils } from "zksync-web3";

const address = utils.create2Address(
    deployerAddress,
    bytecodeHash,
    salt,
    constructorArgs
);

// For cross-chain deployments, deploy separately
// and register addresses in a registry

```

**Symptoms:**
- Contracts deploy to unexpected addresses
- Cross-chain address matching fails
- Factory patterns break

---

### [MEDIUM] undefined

**Solution:**
```
// Finality levels:
// 1. Sequencer confirm: ~2s (CAN REORG)
// 2. L1 batch submission: ~5-15 min (safer)
// 3. L1 finality: ~15 min (very safe)
// 4. Challenge complete: 7 days (final)

// For high-value operations
async function waitForSafeConfirmation(txHash) {
    const receipt = await provider.waitForTransaction(txHash);

    // Wait for L1 batch inclusion
    const l1BatchNumber = await getL1BatchNumber(receipt.blockNumber);
    await waitForL1Finality(l1BatchNumber);

    return receipt;
}

```

**Symptoms:**
- Confirmed transactions disappear
- State reverts unexpectedly
- Double-spend in edge cases

---

### [MEDIUM] undefined

**Solution:**
```
// Check precompile support per L2:
// - ecrecover: Supported everywhere
// - sha256: Supported everywhere
// - ripemd160: May not be supported
// - modexp: May have different gas costs
// - bn128: Varies by L2

// For ZK rollups, some precompiles need ZK circuits
// which may not be implemented

// Test all cryptographic operations on target L2
function testPrecompiles() public view {
    // Test each precompile you use
    bytes32 hash = sha256("test");
    require(hash != bytes32(0), "sha256 failed");
}

```

**Symptoms:**
- Cryptographic operations fail
- Gas costs different than expected
- Contract reverts on specific L2

---

### [MEDIUM] undefined

**Solution:**
```
// Optimism L1 Block predeploy
import {L1Block} from "@eth-optimism/contracts/L2/L1Block.sol";

contract L1Aware {
    L1Block constant l1Block = L1Block(
        0x4200000000000000000000000000000000000015
    );

    function getL1Info() public view returns (
        uint64 number,
        uint64 timestamp,
        uint256 basefee,
        bytes32 hash
    ) {
        return (
            l1Block.number(),
            l1Block.timestamp(),
            l1Block.basefee(),
            l1Block.hash()
        );
    }
}

// Note: L1 info may be delayed by seconds/minutes

```

**Symptoms:**
- L1 blockhash unavailable
- L1 timestamp stale
- Cross-layer timing issues

---

### [MEDIUM] undefined

**Solution:**
```
// L2 gas tokens:
// Optimism/Arbitrum/Base: ETH
// zkSync Era: ETH
// Mantle: MNT
// Metis: METIS

// For non-ETH gas L2s:
// 1. Users need gas token, not just ETH
// 2. Fee estimation uses gas token price
// 3. msg.value is still in ETH

// Check chain and adapt
function getGasToken() public view returns (address) {
    if (block.chainid == 5000) return MANTLE_TOKEN;
    if (block.chainid == 1088) return METIS_TOKEN;
    return address(0); // ETH
}

```

**Symptoms:**
- Transaction fee calculation wrong
- Wallet shows incorrect balance
- Bridge calculations off

---

## Collaboration

### When to Hand Off

| Trigger | Delegate To | Context |
|---------|-------------|--------|
| `` | evm-deep-dive | Low-level optimization for L2 |
| `` | cross-chain | Cross-chain bridging infrastructure |
| `` | blockchain-defi | DeFi protocol on L2 |
| `` | devops | L2 infrastructure setup |
| `` | solana-development | Non-EVM chain required |

### Receives Work From

- **evm-deep-dive**: 
- **blockchain-defi**: 
- **cross-chain**: 
- **devops**: 

---

## Get the Full Version

This skill has **automated validations**, **detection patterns**, and **structured handoff triggers** that work with the Spawner orchestrator.

```bash
npx vibeship-spawner-skills install
```

Full skill path: `~/.spawner/skills/blockchain/layer2-scaling/`

**Includes:**
- `skill.yaml` - Structured skill definition
- `sharp-edges.yaml` - Machine-parseable gotchas with detection patterns
- `validations.yaml` - Automated code checks
- `collaboration.yaml` - Handoff triggers for skill orchestration

---

*Generated by [VibeShip Spawner](https://github.com/vibeforge1111/vibeship-spawner-skills)*
