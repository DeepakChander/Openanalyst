# DAO Governance Engineer

> Comprehensive expertise in decentralized autonomous organization
governance systems, including Snapshot off-chain voting, OpenZeppelin
Governor on-chain execution, treasury multi-sigs, proposal lifecycles,
delegation, and governance attack prevention.


**Category:** blockchain | **Version:** 1.0.0

---

## Patterns

### OpenZeppelin Governor Implementation
Standard on-chain governance using OpenZeppelin's modular
Governor contract system

```
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/governance/Governor.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorSettings.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorCountingSimple.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorVotes.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorVotesQuorumFraction.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorTimelockControl.sol";

contract ProtocolGovernor is
    Governor,
    GovernorSettings,
    GovernorCountingSimple,
    GovernorVotes,
    GovernorVotesQuorumFraction,
    GovernorTimelockControl
{
    constructor(
        IVotes _token,
        TimelockController _timelock
    )
        Governor("Protocol Governor")
        GovernorSettings(
            7200,      // votingDelay: ~1 day in blocks
            50400,     // votingPeriod: ~1 week in blocks
            100000e18  // proposalThreshold: 100k tokens to propose
        )
        GovernorVotes(_token)
        GovernorVotesQuorumFraction(4) // 4% quorum
        GovernorTimelockControl(_timelock)
    {}

    // Required overrides for multiple inheritance
    function votingDelay() public view override(Governor, GovernorSettings)
        returns (uint256)
    {
        return super.votingDelay();
    }

    function votingPeriod() public view override(Governor, GovernorSettings)
        returns (uint256)
    {
        return super.votingPeriod();
    }

    function quorum(uint256 blockNumber)
        public view override(Governor, GovernorVotesQuorumFraction)
        returns (uint256)
    {
        return super.quorum(blockNumber);
    }

    function state(uint256 proposalId)
        public view override(Governor, GovernorTimelockControl)
        returns (ProposalState)
    {
        return super.state(proposalId);
    }

    function proposalThreshold()
        public view override(Governor, GovernorSettings)
        returns (uint256)
    {
        return super.proposalThreshold();
    }

    function _queueOperations(
        uint256 proposalId,
        address[] memory targets,
        uint256[] memory values,
        bytes[] memory calldatas,
        bytes32 descriptionHash
    ) internal override(Governor, GovernorTimelockControl) returns (uint48) {
        return super._queueOperations(proposalId, targets, values, calldatas, descriptionHash);
    }

    function _executeOperations(
        uint256 proposalId,
        address[] memory targets,
        uint256[] memory values,
        bytes[] memory calldatas,
        bytes32 descriptionHash
    ) internal override(Governor, GovernorTimelockControl) {
        super._executeOperations(proposalId, targets, values, calldatas, descriptionHash);
    }

    function _cancel(
        address[] memory targets,
        uint256[] memory values,
        bytes[] memory calldatas,
        bytes32 descriptionHash
    ) internal override(Governor, GovernorTimelockControl) returns (uint256) {
        return super._cancel(targets, values, calldatas, descriptionHash);
    }

    function _executor()
        internal view override(Governor, GovernorTimelockControl)
        returns (address)
    {
        return super._executor();
    }
}

```

### Snapshot Off-Chain Voting
Gas-free off-chain voting using Snapshot with optional
on-chain execution via SafeSnap

```
Snapshot Space Configuration (space.json):
{
  "name": "Protocol DAO",
  "network": "1",
  "symbol": "PROTO",
  "strategies": [
    {
      "name": "erc20-balance-of",
      "params": {
        "address": "0x...",
        "decimals": 18
      }
    },
    {
      "name": "delegation",
      "params": {
        "strategies": [
          {
            "name": "erc20-balance-of",
            "params": { "address": "0x..." }
          }
        ]
      }
    }
  ],
  "members": [],
  "admins": ["0xAdmin1", "0xAdmin2"],
  "filters": {
    "minScore": 100,
    "onlyMembers": false
  },
  "validation": {
    "name": "basic",
    "params": {
      "minScore": 100
    }
  },
  "voting": {
    "delay": 86400,
    "period": 604800,
    "type": "single-choice",
    "quorum": 1000000
  },
  "plugins": {
    "safeSnap": {
      "safes": {
        "1": { "address": "0xGnosisSafe..." }
      }
    }
  }
}

Proposal Lifecycle:
1. Draft proposal in forum
2. Community discussion (3-7 days)
3. Create Snapshot vote
4. Voting period (5-7 days)
5. If passed + SafeSnap: queue transactions
6. Execute via Gnosis Safe

```

### Vote-Escrowed Token (veToken) Model
Curve-style voting power based on lock duration,
aligning long-term incentives with governance

```
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract VotingEscrow {
    using SafeERC20 for IERC20;

    struct LockedBalance {
        uint256 amount;
        uint256 end;
    }

    IERC20 public immutable token;
    uint256 public constant MAXTIME = 4 * 365 days;
    uint256 public constant WEEK = 7 days;

    mapping(address => LockedBalance) public locked;
    uint256 public totalLocked;

    event Deposit(address indexed user, uint256 amount, uint256 lockTime);
    event Withdraw(address indexed user, uint256 amount);

    constructor(address _token) {
        token = IERC20(_token);
    }

    function createLock(uint256 amount, uint256 unlockTime) external {
        require(amount > 0, "Amount must be > 0");
        require(locked[msg.sender].amount == 0, "Existing lock");

        uint256 roundedUnlock = (unlockTime / WEEK) * WEEK;
        require(roundedUnlock > block.timestamp, "Must be future");
        require(roundedUnlock <= block.timestamp + MAXTIME, "Max 4 years");

        token.safeTransferFrom(msg.sender, address(this), amount);

        locked[msg.sender] = LockedBalance({
            amount: amount,
            end: roundedUnlock
        });
        totalLocked += amount;

        emit Deposit(msg.sender, amount, roundedUnlock);
    }

    function withdraw() external {
        LockedBalance memory lock = locked[msg.sender];
        require(lock.amount > 0, "No lock");
        require(block.timestamp >= lock.end, "Lock not expired");

        uint256 amount = lock.amount;
        delete locked[msg.sender];
        totalLocked -= amount;

        token.safeTransfer(msg.sender, amount);
        emit Withdraw(msg.sender, amount);
    }

    function votingPower(address user) public view returns (uint256) {
        LockedBalance memory lock = locked[user];
        if (lock.end <= block.timestamp) return 0;

        // Linear decay: power = amount * (timeLeft / maxTime)
        uint256 timeLeft = lock.end - block.timestamp;
        return (lock.amount * timeLeft) / MAXTIME;
    }

    function totalVotingPower() external view returns (uint256) {
        // Simplified - production needs checkpoint system
        return totalLocked / 2; // Rough average
    }
}

veToken Benefits:
- Longer lock = more voting power
- Power decays as unlock approaches
- Discourages short-term speculation
- Enables gauge voting and bribes

```

### Timelock for Governance Execution
Mandatory delay between proposal passage and execution,
allowing community to exit if they disagree

```
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/governance/TimelockController.sol";

// Deployment
address[] memory proposers = new address[](1);
proposers[0] = address(governor);

address[] memory executors = new address[](1);
executors[0] = address(0); // Anyone can execute after delay

TimelockController timelock = new TimelockController(
    2 days,    // minDelay
    proposers,
    executors,
    address(0) // No admin (renounced)
);

Timelock Parameters:
┌──────────────────┬────────────────────────────────────┐
│ Parameter        │ Recommendation                     │
├──────────────────┼────────────────────────────────────┤
│ minDelay         │ 2-7 days for major protocols       │
│ Proposers        │ Only Governor contract             │
│ Executors        │ Anyone (after delay) or Governor   │
│ Admin            │ Renounced (address(0))             │
└──────────────────┴────────────────────────────────────┘

Emergency Exceptions:
- Separate Guardian role for critical security
- Guardian can pause, NOT execute arbitrary code
- Guardian is multi-sig with security council

```


## Anti-Patterns

### Voting vulnerable to flash loans
Voting power based on current balance allows flash loan
attackers to borrow massive amounts, vote, then repay


### Direct execution without timelock
Proposals execute immediately after passing, giving no
time for community to respond to malicious proposals


### Quorum too low for security
Quorum below 2-4% allows small groups to pass proposals
when participation is low


### Anyone can create proposals
No minimum token holding to propose leads to spam
and governance fatigue



## Sharp Edges (Gotchas)

*Real production issues that cause outages and bugs.*

### [CRITICAL] Flash loans can borrow voting power for single block

**Situation:** Your governance uses current token balance for voting power.
An attacker flash loans millions of tokens, votes, and repays
in the same transaction, passing any proposal.


**Why it happens:**
Flash loans provide unlimited capital for single transactions.
If voting power is balance-based without snapshots, attacker
can temporarily own majority voting power for free.


**Solution:**
```
# USE VOTE SNAPSHOTS

// WRONG: Current balance for voting
function getVotes(address account) public view returns (uint256) {
    return token.balanceOf(account); // Flashloanable!
}

// RIGHT: OpenZeppelin ERC20Votes with checkpoints
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";

contract GovernanceToken is ERC20, ERC20Votes {
    // Snapshots voting power at each block
    // getPastVotes(account, blockNumber) returns historical power
}

// Governor uses snapshot at proposal creation
function _castVote(uint256 proposalId, address account, uint8 support)
    internal override returns (uint256)
{
    uint256 proposalSnapshot = proposalSnapshot(proposalId);
    // Uses voting power from PAST block, not current
    uint256 weight = getVotes(account, proposalSnapshot);
    // ...
}

Additional Protections:
- Require tokens held for N blocks before voting
- Implement voting escrow (lock tokens during vote)
- Add vote cooldown after large transfers

```

**Symptoms:**
- Proposal passed with suspicious single voter
- Large token movements same block as vote
- Voting power appeared and disappeared instantly

---

### [MEDIUM] Attackers spam proposals to cause governance fatigue

**Situation:** Anyone can create proposals with no cost. Malicious actors
flood governance with garbage proposals, exhausting voters.


**Why it happens:**
Without proposal thresholds, creating proposals is free.
Spam proposals waste voter attention and reduce participation
on legitimate proposals.


**Solution:**
```
# REQUIRE STAKE TO PROPOSE

// Minimum tokens to create proposal
uint256 public constant PROPOSAL_THRESHOLD = 100_000 * 1e18;

function propose(...) public override returns (uint256) {
    require(
        getVotes(msg.sender, block.number - 1) >= PROPOSAL_THRESHOLD,
        "Below proposal threshold"
    );
    return super.propose(...);
}

// Alternative: Proposal deposit (slashed if rejected)
mapping(uint256 => uint256) public proposalDeposits;
uint256 public constant PROPOSAL_DEPOSIT = 1000 * 1e18;

function proposeWithDeposit(...) external returns (uint256) {
    token.safeTransferFrom(msg.sender, address(this), PROPOSAL_DEPOSIT);
    uint256 proposalId = _propose(...);
    proposalDeposits[proposalId] = PROPOSAL_DEPOSIT;
    return proposalId;
}

function finalizeProposal(uint256 proposalId) external {
    ProposalState state = state(proposalId);
    if (state == ProposalState.Succeeded || state == ProposalState.Executed) {
        // Return deposit
        token.safeTransfer(proposer[proposalId], proposalDeposits[proposalId]);
    } else if (state == ProposalState.Defeated) {
        // Slash deposit to treasury
        token.safeTransfer(treasury, proposalDeposits[proposalId]);
    }
}

```

**Symptoms:**
- Many low-quality proposals
- Declining voter participation
- Governance fatigue complaints

---

### [HIGH] Proposals pass with minimal votes during low activity

**Situation:** Your DAO has 4% quorum. During holidays or market downturn,
participation drops. A coordinated group passes controversial
proposal with 4.1% of tokens.


**Why it happens:**
Fixed quorum doesn't adjust to participation levels.
Low-activity periods enable minority takeover.


**Solution:**
```
# DYNAMIC OR RELATIVE QUORUM

// Option 1: Quorum based on recent participation
uint256 public constant MIN_QUORUM_BPS = 400; // 4%
uint256 public participationMovingAverage;

function quorum(uint256 blockNumber) public view returns (uint256) {
    // At least 4%, but scales with recent participation
    uint256 baseQuorum = (token.totalSupply() * MIN_QUORUM_BPS) / 10000;
    uint256 participationQuorum = participationMovingAverage / 2;
    return baseQuorum > participationQuorum ? baseQuorum : participationQuorum;
}

// Option 2: Require super-majority for major changes
enum ProposalType { Standard, Constitutional }

mapping(uint256 => ProposalType) public proposalTypes;

function quorum(uint256 proposalId) public view returns (uint256) {
    if (proposalTypes[proposalId] == ProposalType.Constitutional) {
        return (token.totalSupply() * 1000) / 10000; // 10%
    }
    return (token.totalSupply() * 400) / 10000; // 4%
}

// Option 3: Against votes count toward quorum
// Prevents apathy from enabling passage
function _quorumReached(uint256 proposalId) internal view returns (bool) {
    ProposalVote storage vote = _proposalVotes[proposalId];
    // Include For + Against (not Abstain) in quorum calc
    uint256 participation = vote.forVotes + vote.againstVotes;
    return participation >= quorum(proposalSnapshot(proposalId));
}

```

**Symptoms:**
- Proposals passing with <5% participation
- Complaints about "governance capture"
- Controversial decisions with low turnout

---

### [CRITICAL] Emergency functions bypass governance timelock

**Situation:** Your protocol has emergency admin functions for security.
Those same functions allow bypassing governance to make
arbitrary changes.


**Why it happens:**
Emergency powers are necessary for security, but overly
broad emergency functions become governance backdoors.


**Solution:**
```
# SCOPE EMERGENCY POWERS NARROWLY

// WRONG: Emergency admin can do anything
function emergencyAction(bytes calldata data) external onlyEmergency {
    (bool success,) = protocolCore.call(data);
    require(success);
}

// RIGHT: Emergency limited to specific actions
contract EmergencyModule {
    function emergencyPause() external onlyGuardian {
        protocol.pause();
        emit EmergencyPause(msg.sender);
    }

    function emergencyUnpause() external onlyGuardian {
        // Cannot unpause - only governance can
        revert("Use governance to unpause");
    }

    function emergencyWithdraw(address token, uint256 amount) external {
        revert("Not allowed - use governance");
    }

    // Guardian CANNOT:
    // - Change protocol parameters
    // - Upgrade contracts
    // - Access treasury
    // - Modify governance itself
}

// Sunset emergency powers
uint256 public immutable emergencyExpiry;

constructor() {
    emergencyExpiry = block.timestamp + 365 days;
}

modifier onlyGuardian() {
    require(msg.sender == guardian);
    require(block.timestamp < emergencyExpiry, "Emergency powers expired");
    _;
}

```

**Symptoms:**
- Emergency functions with broad capabilities
- Single EOA can bypass governance
- No sunset on emergency powers

---

### [LOW] Self-delegation required but not documented

**Situation:** Users hold governance tokens but can't vote. They don't know
they need to delegate to themselves first.


**Why it happens:**
ERC20Votes requires explicit delegation (including self)
before voting power activates. This is unintuitive for users.


**Solution:**
```
# AUTO-DELEGATE OR CLEAR UX

// Option 1: Auto-delegate on transfer
function _afterTokenTransfer(
    address from,
    address to,
    uint256 amount
) internal override {
    super._afterTokenTransfer(from, to, amount);

    // Auto self-delegate for new holders
    if (delegates(to) == address(0) && to != address(0)) {
        _delegate(to, to);
    }
}

// Option 2: Mint with delegation
function mint(address to, uint256 amount) external onlyMinter {
    _mint(to, amount);
    if (delegates(to) == address(0)) {
        _delegate(to, to);
    }
}

// Frontend: Always show delegation status
const votingPower = await token.getVotes(address);
const balance = await token.balanceOf(address);
const delegate = await token.delegates(address);

if (votingPower === 0n && balance > 0n) {
    if (delegate === ethers.ZeroAddress) {
        showWarning("Delegate to yourself to activate voting power!");
    }
}

```

**Symptoms:**
- Users complain they can't vote
- Voting power shows zero despite balance
- Low governance participation

---

### [HIGH] Bribes and vote markets undermine governance

**Situation:** External platforms offer token bribes for voting specific ways.
Governance becomes "highest bidder wins" rather than
stakeholder consensus.


**Why it happens:**
Token voting assumes voters are stakeholders who benefit from
good decisions. Bribes decouple voting from stakeholder interest,
allowing wealthy attackers to buy outcomes.


**Solution:**
```
# MITIGATE VOTE BUYING

// veToken model reduces vote buying
// - Must lock tokens, not just hold for vote
// - Longer lock = more power
// - Bribes must outweigh lock opportunity cost

// Vote commit-reveal (hides votes until reveal)
mapping(uint256 => mapping(address => bytes32)) public voteCommits;
mapping(uint256 => uint256) public revealDeadline;

function commitVote(uint256 proposalId, bytes32 commitment) external {
    voteCommits[proposalId][msg.sender] = commitment;
}

function revealVote(
    uint256 proposalId,
    uint8 support,
    bytes32 salt
) external {
    require(block.timestamp >= revealDeadline[proposalId]);
    bytes32 commit = keccak256(abi.encode(proposalId, support, salt));
    require(voteCommits[proposalId][msg.sender] == commit);
    _castVote(proposalId, msg.sender, support);
}

// Conviction voting (time-weighted)
// - Votes gain power over time of commitment
// - Selling tokens resets conviction
// - Makes last-minute vote buying ineffective

// Quadratic voting (diminishing returns)
// - 1 token = 1 vote, 4 tokens = 2 votes, etc.
// - Makes buying majority expensive

```

**Symptoms:**
- Bribe platforms targeting your DAO
- Suspicious voting patterns
- Votes correlate with external payments

---

### [MEDIUM] Attackers front-run profitable proposals

**Situation:** A proposal to buy tokens or change incentives is public.
Attackers buy tokens before execution, profit from the change.


**Why it happens:**
Proposals are public during voting. Timelock delay is known.
Sophisticated actors position ahead of profitable changes.


**Solution:**
```
# DESIGN PROPOSALS TO MINIMIZE MEV

// Use time-weighted average prices (TWAP)
function executeTokenPurchase(address token, uint256 usdAmount) external {
    // WRONG: Market buy at current price
    // router.swap(usdc, token, usdAmount);

    // RIGHT: TWAP over period
    uint256 twap = oracle.getTwap(token, 1 hours);
    uint256 maxTokens = (usdAmount * 1e18) / twap;
    uint256 minReceived = (maxTokens * 95) / 100; // 5% slippage max

    router.swapWithMinOutput(usdc, token, usdAmount, minReceived);
}

// Batch operations to hide specifics
// Commit-reveal for sensitive proposals
// Use private mempools for execution

```

**Symptoms:**
- Large trades before proposal execution
- MEV bots targeting governance transactions
- Poor execution prices on treasury ops

---

## Collaboration

### When to Hand Off

| Trigger | Delegate To | Context |
|---------|-------------|--------|
| `` | token-launch | Ensure ERC20Votes compatibility |
| `` | smart-contract-auditor | Include governance attack vectors in scope |
| `` | wallet-integration | Configure Gnosis Safe with appropriate signers |
| `` | onchain-analytics | Monitor voting, delegation, proposal success rates |

---

## Get the Full Version

This skill has **automated validations**, **detection patterns**, and **structured handoff triggers** that work with the Spawner orchestrator.

```bash
npx vibeship-spawner-skills install
```

Full skill path: `~/.spawner/skills/blockchain/dao-governance/`

**Includes:**
- `skill.yaml` - Structured skill definition
- `sharp-edges.yaml` - Machine-parseable gotchas with detection patterns
- `validations.yaml` - Automated code checks
- `collaboration.yaml` - Handoff triggers for skill orchestration

---

*Generated by [VibeShip Spawner](https://github.com/vibeforge1111/vibeship-spawner-skills)*
