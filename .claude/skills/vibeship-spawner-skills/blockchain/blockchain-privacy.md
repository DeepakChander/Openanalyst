# Blockchain Privacy

> Expert in on-chain privacy technologies - ZK-SNARKs, ZK-STARKs, mixers, stealth addresses, ring signatures, and confidential transactions for building privacy-preserving blockchain applications

**Category:** blockchain | **Version:** 1.0

**Tags:** privacy, zero-knowledge, zk-snarks, zk-starks, mixers, stealth-addresses, tornado-cash, zcash, confidential

---

## Identity

[object Object]

## Patterns

### Commitment-Nullifier Pattern
Core pattern for private asset transfers without double-spend
**When:** Building any mixer, shielded pool, or private transfer system

### Stealth Address Protocol (EIP-5564)
Generate one-time addresses for receiving without linking to identity
**When:** Need private receiving addresses without mixer complexity

### Merkle Tree Membership Proof
Prove asset exists in set without revealing which one
**When:** Core primitive for any pool-based privacy system

### Confidential Transactions (Amount Hiding)
Hide transaction amounts while proving no inflation
**When:** Need to hide values while proving range validity

### Private Relayer Pattern
Submit transactions without revealing sender's address
**When:** Need to break link between wallet and on-chain activity

### Encrypted Mempool Submission
Hide transaction contents from MEV searchers until execution
**When:** Transaction contents would leak trading intent or identity


## Anti-Patterns

### Fixed Denomination Bypass
Depositing and withdrawing the same amount identifies you
**Instead:** // Bad: User deposits 1.234 ETH, withdraws 1.234 ETH
// This is trivially linkable

// Good: Use fixed denominations
uint256[] public DENOMINATIONS = [0.1 ether, 1 ether, 10 ether, 100 ether];

function deposit(uint256 denominationIndex) external payable {
    require(msg.value == DENOMINATIONS[denominationIndex]);
    // All 1 ETH deposits are indistinguishable
}

// Better: Add random delays and use multiple withdrawals
// Deposit 10 ETH as one tx
// Withdraw 1 ETH ten times over 10 days


### Timing Correlation
Depositing and withdrawing in predictable time patterns
**Instead:** // Bad: Deposit at 10:00, withdraw at 10:05
// Time proximity makes linking trivial

// Good: Enforce minimum time delays
mapping(bytes32 => uint256) public commitmentTime;

function withdraw(...) external {
    require(
        block.timestamp > commitmentTime[commitment] + 24 hours,
        "Wait longer"
    );
}

// Better: Use randomized delays, withdraw over multiple sessions
// Ideal: Integrate with Chainlink VRF for random delay suggestions


### Small Anonymity Set
Using a privacy pool with very few participants
**Instead:** // Bad: Deploy private mixer for your project's 50 users
// Anonymity set of 50 = easily deanonymizable

// Good: Use established pools with thousands of users
// Check anonymity metrics before using:

function getAnonymityMetrics(address pool) external view returns (
    uint256 totalDeposits,
    uint256 uniqueDepositors,
    uint256 averageWaitTime
) {
    // Pool with 10,000+ deposits is meaningfully private
    // Pool with 50 deposits is pseudonymous at best
}

// Display warnings to users:
// "Current anonymity set: 234 deposits. Recommended: 1000+"


### Unique Gas Patterns
Contract interactions with distinctive gas usage
**Instead:** // Bad: Each user's transactions have unique gas patterns
// Researchers can cluster transactions by gas usage

// Good: Normalize gas usage
function withdraw(...) external {
    // Use fixed gas for internal calls
    (bool success,) = recipient.call{gas: 50000}("");

    // Pad execution to fixed gas consumption
    uint256 gasUsed = startGas - gasleft();
    while (gasUsed < TARGET_GAS) {
        // Burn gas consistently
        assembly { pop(keccak256(0, 32)) }
        gasUsed = startGas - gasleft();
    }
}


### RPC Endpoint Logging
Using public RPC that logs all requests
**Instead:** // Bad: Using Infura/Alchemy public endpoints for private transactions
// They see: your IP, the addresses you query, the txs you submit

// Good: Use privacy-focused RPC or run your own node
const privateRPCs = [
    "https://rpc.flashbots.net",      // Flashbots Protect
    "https://rpc.mevblocker.io",      // MEV Blocker
    "http://localhost:8545",           // Local node
];

// Better: Use Tor or VPN for RPC connections
// Best: Run your own Ethereum node over Tor


### ENS/Address Reuse
Linking stealth addresses to known identities
**Instead:** // Bad: Register ENS for your stealth address
// Bad: Fund stealth address from known wallet
// Bad: Interact with same contracts as known identity

// Good: Complete separation
// 1. Fund through mixer first
// 2. Never reuse addresses
// 3. Don't interact with protocols that require KYC
// 4. Use different browser/device for private activities


### Weak Trusted Setup
Using ZK-SNARKs with untrusted or small ceremony
**Instead:** // Bad: "We did a trusted setup with our team"
// If ANY participant kept their toxic waste, they can forge proofs

// Good: Massive MPC ceremonies
// - Zcash Powers of Tau: 87 participants
// - Hermez ceremony: 1000+ participants

// Better: Use transparent systems (no trusted setup)
// - STARKs (Cairo, Polygon Miden)
// - Halo2 (Zcash, recursive without trusted setup)
// - Bulletproofs (for range proofs)

// Verification in contract:
function verifyProof(bytes calldata proof) external view {
    // Use well-audited verifier contracts
    // Verify ceremony had sufficient participants
    // Consider using STARK-based systems for critical applications
}


### Nullifier Collision
Weak nullifier derivation allowing double-spend
**Instead:** // Bad: nullifier = hash(secret)
// Same secret in different commitments = collision

// Good: nullifier = hash(secret, pathIndex)
// Each commitment has unique position in tree

// Circom example:
template SecureNullifier() {
    signal input secret;
    signal input pathIndices[20];  // Position in tree
    signal output nullifier;

    // Include position to make nullifier unique per commitment
    component hasher = Poseidon(21);
    hasher.inputs[0] <== secret;
    for (var i = 0; i < 20; i++) {
        hasher.inputs[i + 1] <== pathIndices[i];
    }
    nullifier <== hasher.out;
}



## Sharp Edges (Gotchas)

*Real production issues that cause outages and bugs.*

### [CRITICAL] undefined

**Solution:**
```
// Risk assessment for trusted setups:

// 1. Check ceremony participation
const MINIMUM_SAFE_PARTICIPANTS = 100;
// If ceremony had fewer, consider the system potentially compromised

// 2. Verify ceremony transcripts exist and are verifiable
// Good: Zcash ceremony has verifiable transcripts
// Bad: "Trust us, we did a ceremony"

// 3. Prefer transparent alternatives
// STARKs - No trusted setup, larger proofs
// Halo2 - Recursive proofs, no trusted setup
// Bulletproofs - For range proofs, no setup

// 4. If using Groth16, use established ceremonies:
// - Hermez/Polygon: 1000+ participants
// - Tornado Cash: 1100+ participants
// - Semaphore: Well-audited

// 5. For new circuits, run massive public ceremony
import { Phase2 } from "snarkjs";
// Require 1000+ independent participants
// Publish all transcripts
// Allow independent verification

```

**Symptoms:**
- Setup ceremony with few participants (<100)
- Team-only ceremony without external participants
- Missing ceremony transcripts or verification
- No audit of ceremony process

---

### [CRITICAL] undefined

**Solution:**
```
// Problem: Deposit at 10:00, withdraw at 10:05 = trivially linkable

contract PrivacyPool {
    uint256 public constant MIN_DELAY = 24 hours;
    uint256 public constant RECOMMENDED_DELAY = 7 days;

    mapping(bytes32 => uint256) public depositTime;

    function deposit(bytes32 commitment) external payable {
        depositTime[commitment] = block.timestamp;
        // ... normal deposit logic
    }

    function withdraw(
        bytes calldata proof,
        bytes32 commitment,
        // ... other params
    ) external {
        // Enforce minimum delay
        require(
            block.timestamp >= depositTime[commitment] + MIN_DELAY,
            "Wait at least 24 hours"
        );

        // Warn if below recommended (UI should enforce)
        // In UI: "Waiting 7+ days significantly improves privacy"
    }
}

// Client-side recommendations:
// 1. Random delay: 1-14 days (uniform distribution)
// 2. Withdraw at random time of day
// 3. Use multiple smaller withdrawals over weeks
// 4. Don't withdraw right before you need funds

```

**Symptoms:**
- Deposit followed by withdrawal within minutes
- Consistent time patterns (e.g., always withdraw at same time of day)
- Transaction timing correlated with user timezone
- Low latency between mixer interactions

---

### [CRITICAL] undefined

**Solution:**
```
// Metadata that leaks identity:
// 1. Gas price - unique values fingerprint users
// 2. Gas limit - custom limits are distinctive
// 3. RPC provider - they log your IP + addresses
// 4. Relayer - using same relayer links transactions

// Mitigations:

// 1. Normalize gas parameters
async function getStandardGas() {
    const baseFee = await provider.getGasPrice();
    // Use rounded values everyone uses
    return {
        maxFeePerGas: roundToGwei(baseFee * 1.2),
        maxPriorityFeePerGas: ethers.parseGwei("1"), // Standard tip
        gasLimit: 300000 // Standard limit for privacy txs
    };
}

// 2. Use privacy-preserving RPC
const PRIVATE_RPCS = [
    "https://rpc.mevblocker.io",
    "https://rpc.flashbots.net",
    // Or run your own node over Tor
];

// 3. Rotate relayers
async function selectRelayer() {
    const relayers = await fetchActiveRelayers();
    // Random selection, weighted by reputation
    return relayers[Math.floor(Math.random() * relayers.length)];
}

// 4. Use Tor/VPN for network requests
// Different IP for each privacy operation

```

**Symptoms:**
- Unique gas prices or limits
- Consistent relayer usage
- RPC endpoint logging
- Predictable nonce sequences

---

### [HIGH] undefined

**Solution:**
```
// Anonymity set size directly determines privacy level

// Quick math:
// 10 users = 10% chance of correct identification
// 100 users = 1% chance
// 1000 users = 0.1% chance
// 10000 users = 0.01% chance

// Before using any privacy pool:
async function assessPool(poolAddress) {
    const pool = new ethers.Contract(poolAddress, ABI, provider);

    const totalDeposits = await pool.totalDeposits();
    const uniqueDepositors = await pool.uniqueDepositors();

    // Minimum thresholds
    const MINIMUM_DEPOSITS = 1000;
    const MINIMUM_DEPOSITORS = 500;

    if (totalDeposits < MINIMUM_DEPOSITS) {
        console.warn(`PRIVACY WARNING: Only ${totalDeposits} deposits`);
        console.warn("Anonymity set too small for meaningful privacy");
    }

    // Check activity
    const recentDeposits = await getDepositsLast30Days(pool);
    if (recentDeposits < 100) {
        console.warn("Low activity - timing attacks easier");
    }

    return {
        totalDeposits,
        uniqueDepositors,
        isPrivate: totalDeposits >= MINIMUM_DEPOSITS
    };
}

// UI should show clear warnings:
// "Current anonymity set: 234 deposits"
// "RECOMMENDED: Wait for 1000+ deposits before withdrawing"

```

**Symptoms:**
- New or niche privacy pool
- Low total deposits
- Few active users
- Custom denomination amounts

---

### [HIGH] undefined

**Solution:**
```
// Problem: Deposit 7.5 ETH, withdraw 7.5 ETH = trivially linked
// Even: Deposit 7.5 ETH, withdraw 5 ETH + 2.5 ETH = linked

// Solution 1: Fixed denominations
contract FixedDenominationPool {
    uint256 public immutable DENOMINATION;

    constructor(uint256 _denomination) {
        // Only allow: 0.1, 1, 10, 100 ETH
        require(
            _denomination == 0.1 ether ||
            _denomination == 1 ether ||
            _denomination == 10 ether ||
            _denomination == 100 ether
        );
        DENOMINATION = _denomination;
    }

    function deposit(bytes32 commitment) external payable {
        require(msg.value == DENOMINATION, "Exact denomination only");
        // ...
    }
}

// Solution 2: Shielded pools with hidden amounts
// (Confidential transactions - more complex)

// User guidance:
// 1. Only use fixed denomination pools
// 2. Don't deposit unique amounts
// 3. Wait between multiple deposits
// 4. Withdraw to multiple addresses over time

```

**Symptoms:**
- Non-standard denomination deposits
- Withdrawal amounts matching deposits exactly
- Split transactions totaling original amount

---

### [HIGH] undefined

**Solution:**
```
// Problem: Even with privacy tools, graph analysis can link addresses

// Attack vector:
// 1. Analyze all addresses that withdrew from mixer
// 2. Find common patterns (same contracts, tokens, timing)
// 3. Cluster addresses by behavior
// 4. Link to known identities

// Defense strategies:

// 1. Complete behavior separation
// - Never interact with same contracts
// - Use different tokens
// - Different transaction patterns

// 2. Break the graph
// - Use multiple privacy pools
// - Chain through different protocols
// - Allow time between hops

// 3. Avoid consolidation
// Bad:
// Address A -> Mixer -> Address B
// Address C -> Mixer -> Address B  (LINKED!)

// Good:
// Address A -> Mixer -> Address B
// Address C -> Mixer -> Address D  (separate)

// 4. Use fresh receiving addresses
async function generateReceivingAddress() {
    // New address for each withdrawal
    const wallet = ethers.Wallet.createRandom();
    // Fund through privacy pool
    // Use for single purpose, then abandon
    return wallet.address;
}

```

**Symptoms:**
- Direct transfers between related addresses
- Common contract interactions
- Shared token holdings
- Similar transaction patterns

---

### [HIGH] undefined

**Solution:**
```
// Problem: Relayer sees your IP and the withdrawal address
// Single relayer = complete transaction linkage

contract PrivacyPoolWithRelayer {
    mapping(address => bool) public registeredRelayers;
    mapping(address => uint256) public relayerReputation;

    // Decentralized relayer network
    function registerRelayer() external payable {
        require(msg.value >= 1 ether, "Stake required");
        registeredRelayers[msg.sender] = true;
    }

    function withdraw(
        bytes calldata proof,
        address relayer,
        uint256 fee,
        // ...
    ) external {
        require(registeredRelayers[relayer], "Unknown relayer");
        // ... verify proof includes relayer and fee ...

        // Pay relayer
        payable(relayer).transfer(fee);
    }
}

// Client-side relayer selection:
async function selectRelayer(relayers) {
    // 1. Never use same relayer twice in a row
    const lastRelayer = getLastUsedRelayer();
    const available = relayers.filter(r => r !== lastRelayer);

    // 2. Random selection weighted by reputation
    const totalRep = available.reduce((s, r) => s + r.reputation, 0);
    let random = Math.random() * totalRep;

    for (const relayer of available) {
        random -= relayer.reputation;
        if (random <= 0) return relayer;
    }

    // 3. Rotate across different relayers
    // 4. Use Tor to hide IP from relayer
}

```

**Symptoms:**
- Using same relayer repeatedly
- Self-hosting single relayer
- Relayer requiring KYC
- Limited relayer selection

---

### [CRITICAL] undefined

**Solution:**
```
// Circuit bugs are catastrophic - can steal ALL funds

// Common vulnerability patterns:

// 1. Field overflow
// Circom uses finite field arithmetic
// Values wrap around at the field prime
template Dangerous() {
    signal input a;
    signal input b;
    signal output c;

    // BUG: If a + b > field_prime, wraps around!
    c <== a + b;

    // FIX: Add range checks
    component rangeA = Num2Bits(64);
    rangeA.in <== a;
    component rangeB = Num2Bits(64);
    rangeB.in <== b;
    // Now both are < 2^64, sum can't overflow
}

// 2. Under-constrained circuits
template Underconstrained() {
    signal input secret;
    signal output hash;

    component hasher = Poseidon(1);
    hasher.inputs[0] <== secret;
    hash <== hasher.out;

    // BUG: Nothing constrains relationship
    // Prover can use any secret, any hash

    // FIX: Public inputs must be constrained
    signal input publicHash;
    publicHash === hash;
}

// 3. Missing nullifier uniqueness
// See nullifier-collision edge case

// Mandatory practices:
// - Multiple independent audits
// - Formal verification where possible
// - Extensive test coverage including edge cases
// - Bug bounty program before mainnet

```

**Symptoms:**
- Unaudited circuits
- Complex constraint systems
- Edge cases in field arithmetic
- Missing range checks

---

### [HIGH] undefined

**Solution:**
```
// Reality check: Privacy != Illegal, but regulators disagree

// The Tornado Cash situation:
// - OFAC sanctioned the protocol (not just addresses)
// - Core developer arrested
// - Users who interacted may face scrutiny

// For protocol developers:

// 1. Consider optional compliance features
contract ComplianceAwarePool {
    // Opt-in compliance proof
    function depositWithCompliance(
        bytes32 commitment,
        bytes calldata complianceProof // KYC attestation
    ) external payable {
        require(verifyComplianceAttestation(complianceProof));
        // ... normal deposit
    }

    // Allow withdrawal with audit trail
    function withdrawWithDisclosure(
        bytes calldata proof,
        bytes calldata disclosureCert // Proves source of funds
    ) external {
        // User voluntarily discloses for compliance
    }
}

// 2. Implement view keys for auditors
// User can prove transaction history to regulators

// 3. Build in geographic restrictions
// Sadly necessary for legal operation

// For users:
// - Understand legal status in your jurisdiction
// - Don't use sanctioned protocols
// - Keep records you can disclose if needed
// - Consider privacy for legitimate reasons only

```

**Symptoms:**
- Using sanctioned protocols
- Interacting with blacklisted addresses
- No compliance mechanisms
- Operating in strict jurisdictions

---

### [MEDIUM] undefined

**Solution:**
```
// Proof verification gas costs:
// - Groth16: ~200k gas (fixed, small proof)
// - PLONK: ~300-500k gas (proof size varies)
// - STARKs: ~1M+ gas (large proofs)

contract EfficientVerifier {
    // Gas limits for verification
    uint256 constant MAX_VERIFICATION_GAS = 500000;

    function withdrawWithLimit(
        bytes calldata proof,
        // ...
    ) external {
        uint256 gasBefore = gasleft();

        bool valid = verifyProof(proof);

        require(gasBefore - gasleft() < MAX_VERIFICATION_GAS, "DoS protection");
        require(valid, "Invalid proof");
    }

    // Batch verification for multiple proofs (cheaper per proof)
    function batchWithdraw(
        bytes[] calldata proofs,
        // ...
    ) external {
        // Aggregate verification where possible
        // Groth16 supports batch verification
    }
}

// Off-chain verification first:
async function submitWithdrawal(proof) {
    // Verify locally before spending gas
    const isValid = await verifyOffChain(proof);
    if (!isValid) throw "Invalid proof - won't submit";

    return contract.withdraw(proof);
}

```

**Symptoms:**
- High gas costs for verification
- Transaction size limits exceeded
- Slow proof verification
- Block gas limit issues

---

## Collaboration

### When to Hand Off

| Trigger | Delegate To | Context |
|---------|-------------|--------|
| `` | smart-contract-auditor | Security audit of privacy implementation |
| `` | layer2-scaling | Privacy deployment on L2 |
| `` | evm-deep-dive | Optimize verifier contract gas costs |
| `` | blockchain-defi | Privacy in DeFi protocols |
| `` | gdpr-privacy | Regulatory compliance for privacy protocol |
| `` | frontend | Privacy-aware frontend development |

### Receives Work From

- **smart-contract-auditor**: 
- **layer2-scaling**: 
- **evm-deep-dive**: 
- **blockchain-defi**: 
- **gdpr-privacy**: 

---

## Get the Full Version

This skill has **automated validations**, **detection patterns**, and **structured handoff triggers** that work with the Spawner orchestrator.

```bash
npx vibeship-spawner-skills install
```

Full skill path: `~/.spawner/skills/blockchain/blockchain-privacy/`

**Includes:**
- `skill.yaml` - Structured skill definition
- `sharp-edges.yaml` - Machine-parseable gotchas with detection patterns
- `validations.yaml` - Automated code checks
- `collaboration.yaml` - Handoff triggers for skill orchestration

---

*Generated by [VibeShip Spawner](https://github.com/vibeforge1111/vibeship-spawner-skills)*
