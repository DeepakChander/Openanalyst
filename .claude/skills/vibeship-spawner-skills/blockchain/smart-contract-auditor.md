# Smart Contract Auditor

> Elite security researcher who hunts vulnerabilities in smart contracts. Has found critical bugs worth millions in TVL. Specializes in reentrancy, access control, oracle manipulation, and economic exploits across EVM and Solana.

**Category:** blockchain | **Version:** 1.0

**Tags:** security, audit, smart-contracts, solidity, vulnerabilities, defi, exploits, reentrancy, access-control, oracle-manipulation

---

## Identity

[object Object]

## Patterns

### Reentrancy Guard Pattern
Protect against all reentrancy variants with proper mutex
**When:** Any function with external calls or state changes

### Checks-Effects-Interactions (CEI)
Order operations to minimize attack surface
**When:** Any function that modifies state and makes external calls

### Pull Over Push
Let users withdraw rather than pushing funds to them
**When:** Distributing funds to multiple parties

### Oracle Price Validation
Validate oracle data freshness and sanity
**When:** Using any external price feed

### Access Control Hierarchy
Implement granular role-based access with separation of concerns
**When:** Contract requires privileged operations

### Signature Replay Protection
Prevent signature reuse across transactions, chains, and contracts
**When:** Implementing meta-transactions or permit functionality

### Invariant Testing Pattern
Define and test critical system invariants
**When:** Any DeFi protocol or system with economic guarantees


## Anti-Patterns

### External Call Before State Update
Making external calls before updating contract state
**Instead:** // VULNERABLE - state updated after external call
function withdraw(uint256 amount) external {
    require(balances[msg.sender] >= amount);
    (bool success, ) = msg.sender.call{value: amount}("");
    require(success);
    balances[msg.sender] -= amount;  // TOO LATE!
}

// SECURE - state updated before external call
function withdraw(uint256 amount) external nonReentrant {
    require(balances[msg.sender] >= amount);
    balances[msg.sender] -= amount;  // Update first
    (bool success, ) = msg.sender.call{value: amount}("");
    require(success);
}


### Unchecked Return Values
Ignoring return values from external calls
**Instead:** // VULNERABLE - ignoring return value
IERC20(token).transfer(recipient, amount);

// SECURE - check return value
require(IERC20(token).transfer(recipient, amount), "Transfer failed");

// BEST - use SafeERC20 for weird tokens (USDT, etc.)
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
using SafeERC20 for IERC20;
IERC20(token).safeTransfer(recipient, amount);


### tx.origin Authentication
Using tx.origin for access control
**Instead:** // VULNERABLE - can be phished
function withdraw() external {
    require(tx.origin == owner, "Not owner");  // BAD
    // ...
}

// SECURE - use msg.sender
function withdraw() external {
    require(msg.sender == owner, "Not owner");  // GOOD
    // ...
}


### Unbounded Loops
Loops that iterate over unbounded arrays
**Instead:** // VULNERABLE - unbounded loop
function distributeRewards() external {
    for (uint i = 0; i < stakers.length; i++) {  // Can be 10000+ users
        // ... expensive operation
    }
}

// SECURE - paginated processing
function distributeRewards(uint256 start, uint256 end) external {
    require(end <= stakers.length && end > start);
    for (uint i = start; i < end; i++) {
        // Process batch
    }
}


### Block Timestamp Manipulation
Relying on block.timestamp for critical logic
**Instead:** // VULNERABLE - tight time window
function claim() external {
    require(block.timestamp == deadline, "Wrong time");  // Miner can manipulate
}

// SECURE - reasonable time ranges
function claim() external {
    require(block.timestamp >= startTime, "Too early");
    require(block.timestamp <= endTime, "Too late");
    // Use ranges that exceed manipulation window
}


### Single Oracle Dependency
Relying on a single price oracle without fallbacks
**Instead:** // VULNERABLE - single point of failure
function getPrice() public view returns (uint256) {
    return chainlinkOracle.latestAnswer();
}

// SECURE - multiple oracles with fallback
function getPrice() public view returns (uint256) {
    (uint256 chainlinkPrice, bool chainlinkValid) = getChainlinkPrice();
    if (chainlinkValid) return chainlinkPrice;

    (uint256 uniswapPrice, bool uniswapValid) = getUniswapTWAP();
    if (uniswapValid) return uniswapPrice;

    revert("No valid oracle");
}


### Missing Slippage Protection
Swaps without minimum output or deadline
**Instead:** // VULNERABLE - no protection
function swap(uint256 amountIn) external {
    router.swapExactTokensForTokens(amountIn, 0, path, msg.sender, type(uint256).max);
}

// SECURE - slippage and deadline
function swap(
    uint256 amountIn,
    uint256 minAmountOut,  // User specifies minimum
    uint256 deadline       // Transaction expires
) external {
    require(block.timestamp <= deadline, "Expired");
    uint256 amountOut = router.swapExactTokensForTokens(
        amountIn,
        minAmountOut,
        path,
        msg.sender,
        deadline
    );
    require(amountOut >= minAmountOut, "Slippage");
}


### Hardcoded Addresses
Hardcoding external contract addresses
**Instead:** // VULNERABLE - hardcoded
address constant UNISWAP_ROUTER = 0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D;

// SECURE - configurable with access control
address public router;
address public immutable INITIAL_ROUTER;

constructor(address _router) {
    INITIAL_ROUTER = _router;
    router = _router;
}

function setRouter(address _router) external onlyOwner {
    require(_router != address(0), "Zero address");
    emit RouterUpdated(router, _router);
    router = _router;
}


### Insufficient Input Validation
Missing validation on function parameters
**Instead:** // VULNERABLE - no validation
function setFee(uint256 newFee) external onlyOwner {
    fee = newFee;  // Could be 100% or more!
}

// SECURE - comprehensive validation
function setFee(uint256 newFee) external onlyOwner {
    require(newFee <= MAX_FEE, "Fee too high");
    require(newFee >= MIN_FEE, "Fee too low");
    require(newFee != fee, "Same fee");
    emit FeeUpdated(fee, newFee);
    fee = newFee;
}



## Sharp Edges (Gotchas)

*Real production issues that cause outages and bugs.*

### [CRITICAL] undefined

**Solution:**
```
// The attacker contract:
contract Attacker {
    Vault victim;
    uint256 count;

    receive() external payable {
        if (count < 10 && address(victim).balance >= 1 ether) {
            count++;
            victim.withdraw(1 ether);  // Re-enters!
        }
    }
}

// FIX 1: Checks-Effects-Interactions
function withdraw(uint256 amount) external {
    require(balances[msg.sender] >= amount);
    balances[msg.sender] -= amount;  // Update BEFORE call
    (bool success, ) = msg.sender.call{value: amount}("");
    require(success);
}

// FIX 2: Reentrancy Guard (preferred)
bool private locked;
modifier nonReentrant() {
    require(!locked, "Reentrant");
    locked = true;
    _;
    locked = false;
}

// FIX 3: Transient storage guard (Solidity 0.8.24+)
modifier nonReentrantTransient() {
    assembly {
        if tload(0) { revert(0, 0) }
        tstore(0, 1)
    }
    _;
    assembly { tstore(0, 0) }
}

```

**Symptoms:**
- Funds drained in single transaction
- Balance checks pass multiple times
- State unchanged after multiple withdrawals

---

### [CRITICAL] undefined

**Solution:**
```
// VULNERABLE: Curve pool read-only reentrancy
// During remove_liquidity, callback happens BEFORE state update
// Other protocols reading balances get stale values

// FIX 1: Use reentrancy guard on view functions too
function getVirtualPrice() external view nonReentrant returns (uint256) {
    return _calculateVirtualPrice();
}

// FIX 2: Check for reentrancy in consuming protocols
contract SafeConsumer {
    function getPrice(address pool) external returns (uint256) {
        // Call a mutative function to trigger reentrancy guard
        ICurve(pool).claim_admin_fees();  // Will revert if mid-reentrancy
        return ICurve(pool).get_virtual_price();
    }
}

// FIX 3: Use time-weighted average prices
// TWAP resists single-block manipulation including reentrancy

```

**Symptoms:**
- Price oracles return incorrect values during callbacks
- Other protocols get wrong balances mid-transaction
- LP token pricing exploited during deposits/withdrawals

---

### [CRITICAL] undefined

**Solution:**
```
// VULNERABLE: Guard on withdraw but not transfer
function withdraw(uint256 amount) external nonReentrant {
    require(balances[msg.sender] >= amount);
    (bool success, ) = msg.sender.call{value: amount}("");  // Callback here
    require(success);
    balances[msg.sender] -= amount;
}

function transfer(address to, uint256 amount) external {  // NO GUARD!
    require(balances[msg.sender] >= amount);
    balances[msg.sender] -= amount;
    balances[to] += amount;
}

// Attacker receives callback, calls transfer() to move funds

// FIX: Apply guard to ALL state-modifying functions
// Or use a contract-wide guard that covers all entries
uint256 private constant NOT_ENTERED = 1;
uint256 private constant ENTERED = 2;
uint256 private _status = NOT_ENTERED;

modifier globalNonReentrant() {
    require(_status != ENTERED, "Reentrant");
    _status = ENTERED;
    _;
    _status = NOT_ENTERED;
}

// Apply to ALL external functions that touch shared state

```

**Symptoms:**
- Reentrancy guard on one function bypassed via another
- State corruption across related functions
- Invariants broken mid-transaction

---

### [CRITICAL] undefined

**Solution:**
```
// VULNERABLE: Different storage layouts
contract ProxyV1 {
    address public implementation;  // slot 0
    address public admin;           // slot 1
}

contract ImplementationV1 {
    uint256 public value;  // slot 0 - COLLIDES with implementation!
    address public owner;  // slot 1 - COLLIDES with admin!
}

// FIX 1: Use EIP-1967 random slots
contract SafeProxy {
    // Random slot: keccak256("eip1967.proxy.implementation") - 1
    bytes32 constant IMPL_SLOT = 0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc;

    function _getImplementation() internal view returns (address impl) {
        assembly { impl := sload(IMPL_SLOT) }
    }

    function _setImplementation(address newImpl) internal {
        assembly { sstore(IMPL_SLOT, newImpl) }
    }
}

// FIX 2: Inherit storage layout from proxy in implementation
abstract contract ProxyStorage {
    address internal _implementation;
    address internal _admin;
}

contract Implementation is ProxyStorage {
    // Add new storage AFTER inherited slots
    uint256 public value;  // Now at slot 2
}

// FIX 3: Use unstructured storage for all proxy state

```

**Symptoms:**
- Admin address overwritten after upgrade
- Random state corruption
- Implementation address changed unexpectedly
- Proxy becomes unusable

---

### [CRITICAL] undefined

**Solution:**
```
// VULNERABLE: Spot price from AMM
function getPrice() public view returns (uint256) {
    (uint112 reserve0, uint112 reserve1, ) = pair.getReserves();
    return reserve1 * 1e18 / reserve0;  // Manipulable!
}

// ATTACK FLOW:
// 1. Flash loan huge amount of token0
// 2. Swap into pair, skewing reserves
// 3. Call victim contract (uses manipulated price)
// 4. Swap back
// 5. Repay flash loan with profit

// FIX 1: Time-Weighted Average Price (TWAP)
function getTWAP(address pair, uint32 period) public view returns (uint256) {
    (uint256 price0Cumulative, uint256 price1Cumulative, uint32 blockTimestamp) =
        UniswapV2OracleLibrary.currentCumulativePrices(pair);

    uint32 timeElapsed = blockTimestamp - lastUpdateTime;
    require(timeElapsed >= period, "TWAP period not elapsed");

    return (price0Cumulative - price0CumulativeLast) / timeElapsed;
}

// FIX 2: Multiple oracle sources
function getPrice() public view returns (uint256) {
    uint256 chainlinkPrice = getChainlinkPrice();
    uint256 twapPrice = getTWAP();

    // Require prices within tolerance
    uint256 deviation = chainlinkPrice > twapPrice
        ? (chainlinkPrice - twapPrice) * 100 / chainlinkPrice
        : (twapPrice - chainlinkPrice) * 100 / twapPrice;

    require(deviation <= MAX_DEVIATION, "Price mismatch");
    return (chainlinkPrice + twapPrice) / 2;
}

// FIX 3: Validate against historical bounds
require(price >= lastPrice * 95 / 100, "Price dropped too fast");
require(price <= lastPrice * 105 / 100, "Price rose too fast");

```

**Symptoms:**
- Abnormal trades during price spikes
- Liquidations at manipulated prices
- Arbitrage profits from artificial spreads

---

### [CRITICAL] undefined

**Solution:**
```
// VULNERABLE: Missing nonce
function executeWithSig(address to, uint256 amount, bytes calldata sig) external {
    bytes32 hash = keccak256(abi.encode(to, amount));
    address signer = ECDSA.recover(hash, sig);
    require(signer == authorizedSigner);
    // Execute... but sig can be replayed!
}

// VULNERABLE: Missing chain ID (cross-chain replay)
// Same signature works on Mainnet AND Arbitrum

// COMPREHENSIVE FIX:
contract SecureSignature {
    mapping(address => uint256) public nonces;
    bytes32 public immutable DOMAIN_SEPARATOR;

    bytes32 constant EXECUTE_TYPEHASH = keccak256(
        "Execute(address to,uint256 amount,uint256 nonce,uint256 deadline)"
    );

    constructor() {
        DOMAIN_SEPARATOR = keccak256(abi.encode(
            keccak256("EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)"),
            keccak256(bytes("SecureContract")),
            keccak256(bytes("1")),
            block.chainid,      // Chain-specific
            address(this)       // Contract-specific
        ));
    }

    function executeWithSig(
        address to,
        uint256 amount,
        uint256 deadline,
        uint8 v, bytes32 r, bytes32 s
    ) external {
        require(block.timestamp <= deadline, "Expired");

        bytes32 structHash = keccak256(abi.encode(
            EXECUTE_TYPEHASH,
            to,
            amount,
            nonces[msg.sender]++,  // Nonce prevents replay
            deadline
        ));

        bytes32 digest = keccak256(abi.encodePacked(
            "\x19\x01",
            DOMAIN_SEPARATOR,
            structHash
        ));

        address signer = ecrecover(digest, v, r, s);
        require(signer != address(0) && signer == msg.sender, "Invalid sig");

        // Execute...
    }
}

```

**Symptoms:**
- Transaction replayed after completion
- Signature works on multiple chains
- Same permit used multiple times

---

### [HIGH] undefined

**Solution:**
```
// VULNERABLE: No slippage protection
function swap(uint256 amountIn) external {
    router.swap(amountIn, 0, path, msg.sender, block.timestamp + 1000);
    // Bot sees this, front-runs with own swap, sandwiches victim
}

// FIX 1: User-specified slippage
function swap(uint256 amountIn, uint256 minAmountOut, uint256 deadline) external {
    require(block.timestamp <= deadline, "Expired");
    uint256 out = router.swap(amountIn, minAmountOut, path, msg.sender, deadline);
    require(out >= minAmountOut, "Slippage");
}

// FIX 2: Private mempool (Flashbots Protect)
// Submit transactions directly to block builders

// FIX 3: Commit-reveal scheme for sensitive operations
mapping(bytes32 => uint256) public commits;

function commitTrade(bytes32 commitment) external {
    commits[commitment] = block.number;
}

function revealAndExecute(
    uint256 amountIn,
    uint256 minOut,
    bytes32 salt
) external {
    bytes32 commitment = keccak256(abi.encode(msg.sender, amountIn, minOut, salt));
    require(commits[commitment] != 0, "No commit");
    require(block.number > commits[commitment] + 1, "Too soon");
    delete commits[commitment];
    // Execute trade
}

// FIX 4: Use batch auctions (CoW Protocol style)
// Trades settled at uniform clearing price, no ordering advantage

```

**Symptoms:**
- Worse-than-expected swap rates
- Transactions fail with slippage errors
- Unusual activity before large trades

---

### [HIGH] undefined

**Solution:**
```
// VULNERABLE: Snapshot at proposal time
function propose(uint256 proposalId) external {
    uint256 votes = token.balanceOf(msg.sender);  // Can be flash loaned!
    require(votes >= proposalThreshold);
    // Create proposal...
}

// ATTACK:
// 1. Flash loan governance tokens
// 2. Delegate to self
// 3. Create proposal to drain treasury
// 4. Vote immediately
// 5. Return flash loan

// FIX 1: Time-locked voting power
function getVotes(address account) public view returns (uint256) {
    // Use checkpoint from previous block
    return token.getPastVotes(account, block.number - 1);
}

// FIX 2: Voting delay + snapshot at proposal creation
function propose() external returns (uint256) {
    uint256 proposalId = proposalCount++;
    Proposal storage p = proposals[proposalId];
    p.startBlock = block.number + votingDelay;  // Delay before voting
    p.snapshotBlock = block.number;             // Votes locked at creation
    p.endBlock = p.startBlock + votingPeriod;
    return proposalId;
}

function castVote(uint256 proposalId) external {
    Proposal storage p = proposals[proposalId];
    require(block.number >= p.startBlock, "Too early");
    require(block.number <= p.endBlock, "Too late");

    // Use historical votes from snapshot
    uint256 votes = token.getPastVotes(msg.sender, p.snapshotBlock);
    // Record vote...
}

// FIX 3: Require token lock during voting period
// FIX 4: Use vote escrow (veToken) model

```

**Symptoms:**
- Proposals pass with sudden vote spike
- Whale-level votes from empty wallets
- Treasury drained via governance

---

### [HIGH] undefined

**Solution:**
```
// VULNERABLE: Ignoring return values
payable(user).send(amount);  // Returns false on failure
token.transfer(user, amount);  // Some tokens don't revert

// VULNERABLE: Low-level call without check
(bool success, ) = target.call(data);
// success ignored!

// FIX 1: Check return values
bool sent = payable(user).send(amount);
require(sent, "Send failed");

// FIX 2: Use transfer() for ETH (but has 2300 gas limit issues)
// Better: Use call with check
(bool success, ) = payable(user).call{value: amount}("");
require(success, "ETH transfer failed");

// FIX 3: SafeERC20 for tokens
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
using SafeERC20 for IERC20;

token.safeTransfer(user, amount);  // Reverts on failure
token.safeTransferFrom(from, to, amount);
token.safeApprove(spender, amount);  // Handles weird approval tokens

```

**Symptoms:**
- Balance discrepancies
- State updated but funds not moved
- Silent failures in batch operations

---

### [HIGH] undefined

**Solution:**
```
// Solidity 0.8+ has automatic overflow checks
// BUT unchecked blocks disable them!

// VULNERABLE: Unchecked with user input
function addReward(uint256 amount) external {
    unchecked {
        // If totalRewards is near max, this wraps to small number!
        totalRewards += amount;
    }
}

// SAFE: Unchecked only for loop counters
for (uint256 i = 0; i < length; ) {
    // Process item
    unchecked { ++i; }  // Safe: i < length guarantees no overflow
}

// VULNERABLE: Casting down
uint256 bigNumber = type(uint256).max;
uint128 smallNumber = uint128(bigNumber);  // Silent truncation!

// SAFE: Check before casting
require(bigNumber <= type(uint128).max, "Value too large");
uint128 smallNumber = uint128(bigNumber);

// Pre-0.8.0: Use SafeMath everywhere
using SafeMath for uint256;
totalRewards = totalRewards.add(amount);  // Reverts on overflow

```

**Symptoms:**
- Huge balances appearing from small operations
- Negative values becoming max uint256
- Unexpected calculation results

---

## Collaboration

### When to Hand Off

| Trigger | Delegate To | Context |
|---------|-------------|--------|
| `` | evm-deep-dive | Pass vulnerability fixes that may need gas optimization review |
| `` | solana-development | Provide Rust program code and specific concern areas |
| `` | blockchain-defi | Share protocol mechanics and potential attack vectors to validate |
| `` | token-launch | Provide audit report and remediation status |
| `` | dao-governance | Share governance attack analysis and recommended mitigations |
| `` | cross-chain | Provide message handling analysis and trust assumptions |
| `` | onchain-analytics | Share critical invariants and event patterns to monitor |

### Receives Work From

- **token-launch**: 
- **blockchain-defi**: 
- **evm-deep-dive**: 
- **dao-governance**: 
- **nft-systems**: 

---

## Get the Full Version

This skill has **automated validations**, **detection patterns**, and **structured handoff triggers** that work with the Spawner orchestrator.

```bash
npx vibeship-spawner-skills install
```

Full skill path: `~/.spawner/skills/blockchain/smart-contract-auditor/`

**Includes:**
- `skill.yaml` - Structured skill definition
- `sharp-edges.yaml` - Machine-parseable gotchas with detection patterns
- `validations.yaml` - Automated code checks
- `collaboration.yaml` - Handoff triggers for skill orchestration

---

*Generated by [VibeShip Spawner](https://github.com/vibeforge1111/vibeship-spawner-skills)*
