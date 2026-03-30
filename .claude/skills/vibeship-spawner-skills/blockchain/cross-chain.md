# Cross-Chain Engineer

> Comprehensive expertise in cross-chain infrastructure, including
LayerZero, Wormhole, Axelar, and custom bridge implementations.
Covers omnichain token standards, message passing, bridge security,
and cross-chain application architecture.


**Category:** blockchain | **Version:** 1.0.0

---

## Patterns

### LayerZero OFT Implementation
Omnichain Fungible Token using LayerZero for seamless
cross-chain token transfers

```
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@layerzerolabs/lz-evm-oapp-v2/contracts/oft/OFT.sol";

contract MyToken is OFT {
    constructor(
        string memory _name,
        string memory _symbol,
        address _lzEndpoint,
        address _delegate
    ) OFT(_name, _symbol, _lzEndpoint, _delegate) {
        // Mint initial supply on home chain
        _mint(msg.sender, 1_000_000_000 * 1e18);
    }

    // Override for custom logic
    function _debit(
        uint256 _amountLD,
        uint256 _minAmountLD,
        uint32 _dstEid
    ) internal override returns (uint256 amountSentLD, uint256 amountReceivedLD) {
        // Custom debit logic if needed
        return super._debit(_amountLD, _minAmountLD, _dstEid);
    }
}

Deployment Flow:
1. Deploy OFT on each chain
2. Set trusted peers (setPeer)
3. Configure DVN (Decentralized Verifier Network)
4. Test cross-chain transfer

// Set peer addresses
function configurePeers() external onlyOwner {
    // Ethereum <-> Arbitrum
    setPeer(30101, bytes32(uint256(uint160(ethereumOFT))));
    setPeer(30110, bytes32(uint256(uint160(arbitrumOFT))));
}

// Send tokens cross-chain
function bridgeTokens(uint32 dstEid, uint256 amount) external payable {
    bytes memory options = OptionsBuilder.newOptions()
        .addExecutorLzReceiveOption(200000, 0);

    SendParam memory sendParam = SendParam({
        dstEid: dstEid,
        to: bytes32(uint256(uint160(msg.sender))),
        amountLD: amount,
        minAmountLD: amount * 995 / 1000, // 0.5% slippage
        extraOptions: options,
        composeMsg: "",
        oftCmd: ""
    });

    MessagingFee memory fee = quoteSend(sendParam, false);
    send{value: fee.nativeFee}(sendParam, fee, msg.sender);
}

```

### Lock and Mint Bridge Pattern
Traditional bridge pattern: lock tokens on source chain,
mint wrapped tokens on destination

```
// Source Chain: Lock tokens
contract TokenLocker {
    IERC20 public token;
    mapping(uint256 => bool) public processedNonces;
    uint256 public nonce;

    event TokensLocked(
        address indexed sender,
        uint256 amount,
        uint256 destinationChain,
        uint256 nonce
    );

    function lock(uint256 amount, uint256 destinationChain) external {
        token.safeTransferFrom(msg.sender, address(this), amount);
        emit TokensLocked(msg.sender, amount, destinationChain, nonce++);
    }

    function unlock(
        address recipient,
        uint256 amount,
        uint256 bridgeNonce,
        bytes calldata proof
    ) external onlyRelayer {
        require(!processedNonces[bridgeNonce], "Already processed");
        require(_verifyProof(proof), "Invalid proof");

        processedNonces[bridgeNonce] = true;
        token.safeTransfer(recipient, amount);
    }
}

// Destination Chain: Mint wrapped tokens
contract WrappedToken is ERC20, Ownable {
    address public bridge;

    function mint(address to, uint256 amount) external {
        require(msg.sender == bridge, "Only bridge");
        _mint(to, amount);
    }

    function burn(address from, uint256 amount) external {
        require(msg.sender == bridge, "Only bridge");
        _burn(from, amount);
    }
}

Security Requirements:
- Multi-sig or decentralized relayer set
- Merkle proof or signature verification
- Rate limiting on unlocks
- Pause functionality
- Monitoring and alerts

```


## Anti-Patterns

### Single relayer bridge
One entity controls all cross-chain message verification.
If compromised, can steal all bridged assets.


### Accepting messages before finality
Processing cross-chain messages before source chain
finality allows reorg attacks


### Wrapped token minting without verification
Wrapped token mint function doesn't verify corresponding
lock on source chain



## Sharp Edges (Gotchas)

*Real production issues that cause outages and bugs.*

## Collaboration

### When to Hand Off

| Trigger | Delegate To | Context |
|---------|-------------|--------|
| `` | smart-contract-auditor | Focus on replay, reentrancy, finality |

---

## Get the Full Version

This skill has **automated validations**, **detection patterns**, and **structured handoff triggers** that work with the Spawner orchestrator.

```bash
npx vibeship-spawner-skills install
```

Full skill path: `~/.spawner/skills/blockchain/cross-chain/`

**Includes:**
- `skill.yaml` - Structured skill definition
- `sharp-edges.yaml` - Machine-parseable gotchas with detection patterns
- `validations.yaml` - Automated code checks
- `collaboration.yaml` - Handoff triggers for skill orchestration

---

*Generated by [VibeShip Spawner](https://github.com/vibeforge1111/vibeship-spawner-skills)*
