# Account Abstraction Engineer

> Comprehensive expertise in ERC-4337 account abstraction, smart contract
wallets, paymasters, bundlers, and user operation handling. Covers
social recovery, session keys, gas sponsorship, and wallet SDKs.


**Category:** blockchain | **Version:** 1.0.0

---

## Patterns

### ERC-4337 Smart Account
Standard smart contract wallet compatible with ERC-4337
bundler infrastructure

```
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@account-abstraction/contracts/core/BaseAccount.sol";
import "@account-abstraction/contracts/samples/callback/TokenCallbackHandler.sol";

contract SmartAccount is BaseAccount, TokenCallbackHandler {
    address public owner;
    IEntryPoint private immutable _entryPoint;

    constructor(IEntryPoint anEntryPoint, address _owner) {
        _entryPoint = anEntryPoint;
        owner = _owner;
    }

    function entryPoint() public view override returns (IEntryPoint) {
        return _entryPoint;
    }

    function _validateSignature(
        UserOperation calldata userOp,
        bytes32 userOpHash
    ) internal view override returns (uint256 validationData) {
        bytes32 hash = MessageHashUtils.toEthSignedMessageHash(userOpHash);
        address signer = ECDSA.recover(hash, userOp.signature);

        if (signer != owner) {
            return SIG_VALIDATION_FAILED;
        }
        return 0; // Valid
    }

    function execute(
        address dest,
        uint256 value,
        bytes calldata data
    ) external {
        _requireFromEntryPoint();
        (bool success, bytes memory result) = dest.call{value: value}(data);
        if (!success) {
            assembly {
                revert(add(result, 32), mload(result))
            }
        }
    }

    function executeBatch(
        address[] calldata dests,
        uint256[] calldata values,
        bytes[] calldata datas
    ) external {
        _requireFromEntryPoint();
        require(dests.length == values.length && values.length == datas.length);
        for (uint i = 0; i < dests.length; i++) {
            (bool success,) = dests[i].call{value: values[i]}(datas[i]);
            require(success);
        }
    }

    receive() external payable {}
}

User Operation Flow:
1. User creates UserOperation (calldata, gas limits, signature)
2. Sends to Bundler (via RPC or API)
3. Bundler validates and bundles with others
4. Bundler calls EntryPoint.handleOps()
5. EntryPoint validates and executes each UserOp
6. Gas paid from account or Paymaster

```

### Gas Sponsorship Paymaster
Contract that pays gas fees on behalf of users for
gasless transaction experience

```
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@account-abstraction/contracts/core/BasePaymaster.sol";

contract SponsorPaymaster is BasePaymaster {
    mapping(address => bool) public sponsoredAccounts;
    uint256 public maxGasCost = 0.01 ether;

    constructor(IEntryPoint _entryPoint) BasePaymaster(_entryPoint) {}

    function addSponsoredAccount(address account) external onlyOwner {
        sponsoredAccounts[account] = true;
    }

    function _validatePaymasterUserOp(
        UserOperation calldata userOp,
        bytes32 /*userOpHash*/,
        uint256 maxCost
    ) internal view override returns (bytes memory context, uint256 validationData) {
        // Check if account is sponsored
        require(sponsoredAccounts[userOp.sender], "Not sponsored");

        // Check gas limit
        require(maxCost <= maxGasCost, "Gas too high");

        // Return context for postOp (if needed)
        return (abi.encode(userOp.sender), 0);
    }

    function _postOp(
        PostOpMode mode,
        bytes calldata context,
        uint256 actualGasCost
    ) internal override {
        // Optional: Track gas usage per user
        address sender = abi.decode(context, (address));
        emit GasSponsored(sender, actualGasCost);
    }

    // Deposit ETH for gas sponsorship
    function deposit() external payable {
        entryPoint().depositTo{value: msg.value}(address(this));
    }
}

Paymaster Types:
- Verifying Paymaster: Requires off-chain signature
- Deposit Paymaster: Users pre-deposit tokens
- Sponsor Paymaster: Free gas for approved accounts
- Token Paymaster: Pay gas in ERC20 tokens

```

### Session Keys for Delegated Access
Temporary keys with limited permissions for improved UX
without compromising security

```
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract SessionKeyAccount is SmartAccount {
    struct SessionKey {
        address key;
        uint256 validAfter;
        uint256 validUntil;
        address[] allowedTargets;
        uint256 spendLimit;
        uint256 spent;
    }

    mapping(bytes32 => SessionKey) public sessionKeys;

    function createSessionKey(
        address key,
        uint256 duration,
        address[] calldata targets,
        uint256 spendLimit
    ) external onlyOwner returns (bytes32 keyId) {
        keyId = keccak256(abi.encode(key, block.timestamp));
        sessionKeys[keyId] = SessionKey({
            key: key,
            validAfter: block.timestamp,
            validUntil: block.timestamp + duration,
            allowedTargets: targets,
            spendLimit: spendLimit,
            spent: 0
        });
    }

    function _validateSignature(
        UserOperation calldata userOp,
        bytes32 userOpHash
    ) internal view override returns (uint256 validationData) {
        // Try owner signature first
        bytes32 hash = MessageHashUtils.toEthSignedMessageHash(userOpHash);
        address signer = ECDSA.recover(hash, userOp.signature);

        if (signer == owner) {
            return 0;
        }

        // Check session keys
        bytes32 keyId = _extractKeyId(userOp.signature);
        SessionKey storage sk = sessionKeys[keyId];

        if (signer != sk.key) return SIG_VALIDATION_FAILED;
        if (!_isValidTarget(userOp.callData, sk.allowedTargets)) {
            return SIG_VALIDATION_FAILED;
        }

        // Return validity window
        return _packValidationData(
            false,
            uint48(sk.validUntil),
            uint48(sk.validAfter)
        );
    }
}

```


## Anti-Patterns

### Missing UserOperation nonce validation
Not properly validating nonces allows replay attacks
where the same UserOperation is executed multiple times


### Paymaster without spending limits
Paymaster that sponsors unlimited gas is vulnerable
to draining attacks



## Sharp Edges (Gotchas)

*Real production issues that cause outages and bugs.*

### [HIGH] UserOperation rejected by bundler for subtle reasons

**Situation:** Your UserOperation is valid but bundlers reject it. Reasons
range from insufficient prefund to banned opcodes.


**Why it happens:**
Bundlers run simulation before including UserOps. Any reason
for potential failure or MEV extraction causes rejection.


**Solution:**
```
Common Rejection Reasons:
1. Insufficient prefund (need gas * gasPrice + extra)
2. Account not deployed and no initCode
3. Banned opcodes in validation
4. Storage access violations
5. Paymaster validation failed

// Proper gas estimation
const gasEstimate = await bundler.estimateUserOperationGas(userOp);
userOp.callGasLimit = gasEstimate.callGasLimit;
userOp.verificationGasLimit = gasEstimate.verificationGasLimit;
userOp.preVerificationGas = gasEstimate.preVerificationGas;

```

---

### [MEDIUM] First transaction fails due to deployment cost

**Situation:** User's first transaction includes initCode for account
deployment. You underestimate gas, transaction fails.


**Why it happens:**
Account deployment costs 200k-500k gas extra. First UserOp
must cover both deployment and execution.


**Solution:**
```
// Add deployment overhead for first transaction
if (isFirstTransaction) {
    userOp.verificationGasLimit += 500000n;
    userOp.preVerificationGas += 100000n;
}

```

---

### [HIGH] Paymaster approval can be front-run

**Situation:** Verifying paymaster signs approval off-chain. Attacker
intercepts signature and uses it for their own UserOp.


**Why it happens:**
If paymaster signature doesn't bind to specific UserOp,
it can be extracted and reused.


**Solution:**
```
// Include UserOp hash in paymaster signature
bytes32 hash = keccak256(abi.encode(
    userOp.sender,
    userOp.nonce,
    keccak256(userOp.callData),
    userOpHash // Bind to this specific UserOp
));

```

---

## Collaboration

### When to Hand Off

| Trigger | Delegate To | Context |
|---------|-------------|--------|
| `` | wallet-integration | Provide bundler and paymaster configs |

---

## Get the Full Version

This skill has **automated validations**, **detection patterns**, and **structured handoff triggers** that work with the Spawner orchestrator.

```bash
npx vibeship-spawner-skills install
```

Full skill path: `~/.spawner/skills/blockchain/account-abstraction/`

**Includes:**
- `skill.yaml` - Structured skill definition
- `sharp-edges.yaml` - Machine-parseable gotchas with detection patterns
- `validations.yaml` - Automated code checks
- `collaboration.yaml` - Handoff triggers for skill orchestration

---

*Generated by [VibeShip Spawner](https://github.com/vibeforge1111/vibeship-spawner-skills)*
