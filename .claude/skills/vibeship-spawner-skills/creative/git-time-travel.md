# Git Time Travel

> Expert in navigating and manipulating git history. Covers finding bugs with
bisect, understanding code evolution, recovering lost work, and rewriting
history safely. Understands that git history is your time machine.


**Category:** creative | **Version:** 1.0.0

---

## Identity

[object Object]

## Expertise Areas

- Git history navigation
- Bisect debugging
- History rewriting
- Lost work recovery
- Commit archaeology
- Branch surgery
- Reflog diving

## Patterns

### Git Bisect Mastery
Finding exactly when bugs were introduced
```
## Finding Bugs with Bisect

### 1. Basic Bisect

```bash
# Start bisecting
git bisect start

# Mark current (broken) as bad
git bisect bad

# Mark known good commit
git bisect good abc1234  # or: git bisect good v1.0.0

# Git checks out middle commit
# Test it, then:
git bisect good  # or: git bisect bad

# Repeat until found
# When done:
git bisect reset
```

### 2. Automated Bisect

```bash
# Write a test script that exits 0 for good, 1 for bad
git bisect start HEAD v1.0.0
git bisect run npm test

# Or with a custom script:
git bisect run ./test-for-bug.sh
```

### 3. Bisect Tips

| Situation | Solution |
|-----------|----------|
| Can't test this commit | `git bisect skip` |
| Made a mistake | `git bisect log` → edit → `git bisect replay` |
| Need to see progress | `git bisect visualize` |
| Wrong starting points | `git bisect reset` and start over |

### 4. The Binary Search Math

```
Number of commits: N
Maximum steps: log2(N)

1000 commits → ~10 tests
10000 commits → ~14 tests
100000 commits → ~17 tests

MUCH faster than linear search!
```

```

### Commit Archaeology
Understanding why code exists
```
## Reading History

### 1. Essential Commands

```bash
# Who changed this line and when?
git blame -w -C -C -C path/to/file

# When was this function changed?
git log -p -S "functionName" -- path/

# What files changed together with this one?
git log --stat -- path/to/file

# Show commit with context
git show abc1234 --stat
```

### 2. Blame Options

| Option | Purpose |
|--------|---------|
| `-w` | Ignore whitespace |
| `-C` | Detect moved lines |
| `-C -C` | Detect copies too |
| `-C -C -C` | Detect across files |
| `-L 10,20` | Specific lines only |

### 3. Log Archaeology

```bash
# Search commit messages
git log --grep="bug fix"

# Search code changes
git log -S "functionName"  # When added/removed
git log -G "pattern"        # When changed

# By author
git log --author="name"

# By date range
git log --since="2024-01-01" --until="2024-02-01"
```

### 4. Finding Context

| Question | Command |
|----------|---------|
| Why does this exist? | `git blame` → `git show <commit>` |
| What PR added this? | Check commit message for PR # |
| What else changed? | `git show <commit> --stat` |
| Was this reverted? | `git log --grep="Revert.*<message>"` |

```

### Recovery Operations
Recovering lost work and commits
```
## Recovering Lost Work

### 1. The Reflog (Your Safety Net)

```bash
# See all recent HEAD positions
git reflog

# Output like:
# abc1234 HEAD@{0}: commit: Current work
# def5678 HEAD@{1}: reset: moving to HEAD~5
# ghi9012 HEAD@{2}: commit: Lost commit!

# Recover by:
git checkout ghi9012       # Just look
git cherry-pick ghi9012    # Copy commit
git reset --hard ghi9012   # Restore completely
```

### 2. Recovery Scenarios

| Lost | Recovery |
|------|----------|
| Uncommitted changes | Check stash, IDE history |
| Committed then reset | `git reflog` → cherry-pick |
| Deleted branch | `git reflog` → create branch |
| Force pushed over | `git reflog` on local |
| Amended away | `git reflog` → ORIG_HEAD |

### 3. Stash Recovery

```bash
# List all stashes
git stash list

# Show stash contents
git stash show -p stash@{0}

# Apply without removing
git stash apply stash@{0}

# Recover dropped stash (if recent)
git fsck --no-reflog | grep commit
# Then cherry-pick the orphan commit
```

### 4. Nuclear Recovery

```bash
# If truly desperate, look for dangling commits
git fsck --lost-found

# Check .git/lost-found/other/
# Contains blobs of lost content
```

```

### Safe History Rewriting
Modifying history without disaster
```
## Rewriting History Safely

### 1. The Golden Rules

```
RULE 1: Never rewrite shared history
        (unless coordinated)

RULE 2: Always have a backup branch

RULE 3: Communicate before force push

RULE 4: Use --force-with-lease not --force
```

### 2. Safe Rebase

```bash
# Create backup first!
git branch backup-before-rebase

# Interactive rebase
git rebase -i HEAD~5

# In editor:
# pick abc1234 Good commit
# squash def5678 Squash into above
# reword ghi9012 Change message
# drop jkl3456 Remove this commit

# If things go wrong:
git rebase --abort
# Or restore from backup
```

### 3. Amending Safely

```bash
# Only amend unpushed commits!
git commit --amend

# Add forgotten file
git add forgotten.js
git commit --amend --no-edit

# Change last commit message
git commit --amend -m "Better message"
```

### 4. Force Push Protocol

```bash
# NEVER: git push --force
# ALWAYS: git push --force-with-lease

# This fails if remote changed
# (Someone else pushed)

# Before force pushing to shared branch:
# 1. Announce in Slack/team chat
# 2. Wait for acknowledgment
# 3. Use --force-with-lease
# 4. Confirm with team
```

```


## Anti-Patterns

### The Force Push Surprise
Force pushing without warning
**Why it's bad:** Destroys teammates' work.
Creates confusion.
Can lose production code.


### The Giant Commit
Huge commits that can't be bisected
**Why it's bad:** Can't find bugs with bisect.
Blame is useless.
Review is impossible.


### The Lost in History
Not checking git for context
**Why it's bad:** Reinvent solutions.
Miss important context.
Repeat mistakes.



## Sharp Edges (Gotchas)

*Real production issues that cause outages and bugs.*

### [HIGH] Force push destroys team's work

**Situation:** Teammate loses hours of work to force push

**Why it happens:**
No warning given.
Used --force instead of --force-with-lease.
Didn't check if others pushed.


**Solution:**
```
## Safe Force Pushing

### The Disaster

```
WHAT HAPPENED:

1. You rebased locally
2. Teammate pushed to same branch
3. You force pushed
4. Their work is gone (from remote)
5. They pull and lose their history
```

### Prevention Protocol

| Step | Why |
|------|-----|
| 1. Announce | Slack: "Force pushing to X in 5 min" |
| 2. Wait | Let people save their work |
| 3. --force-with-lease | Fails if remote changed |
| 4. Confirm | "Done, please re-pull" |

### Recovery (If It Happens)

```bash
# Teammate's machine (if they had the commits):
git reflog
# Find their lost work

# Or from backup branch:
git checkout backup-branch
```

### Force-with-lease vs Force

```bash
# DANGEROUS - ignores remote state
git push --force

# SAFE - fails if remote has new commits
git push --force-with-lease

# EVEN SAFER - specify expected ref
git push --force-with-lease=branch:abc1234
```

### When Force Push is OK

| Situation | Proceed? |
|-----------|----------|
| Personal feature branch | Yes |
| Shared branch, coordinated | Yes, with protocol |
| Main/master | Almost never |
| Secrets leaked | Yes, with coordination |

```

**Symptoms:**
- Where's my work?
- Angry teammates
- Lost commits
- Broken builds

---

### [MEDIUM] Reflog entries expire before recovery

**Situation:** Needed to recover but reflog already pruned

**Why it happens:**
Waited too long.
Ran aggressive gc.
Didn't know about expiry.


**Solution:**
```
## Reflog Expiry

### Default Expiration

```
REFLOG EXPIRES:
- Reachable commits: 90 days
- Unreachable commits: 30 days

After this, git gc removes them!
```

### Checking Your Settings

```bash
# See current settings
git config --get gc.reflogExpire
git config --get gc.reflogExpireUnreachable

# Extend if needed
git config --global gc.reflogExpire "180 days"
git config --global gc.reflogExpireUnreachable "90 days"
```

### Before It's Too Late

| Action | When |
|--------|------|
| Tag important states | Before risky operations |
| Backup branch | Before rebase |
| Push to remote | Remote has own reflog |
| Check reflog | After any "oops" moment |

### Emergency Recovery

```bash
# If reflog is empty, try fsck
git fsck --lost-found

# This finds ALL unreachable objects
# Including those not in reflog

# Check .git/lost-found/commit/
```

### Creating Safety Points

```bash
# Before dangerous operation:
git tag BACKUP-before-rebase

# Tags don't expire like reflog!
# Delete after you're safe:
git tag -d BACKUP-before-rebase
```

```

**Symptoms:**
- Reflog empty
- Where's my commit?
- Can't recover old work
- Ran git gc

---

### [MEDIUM] Bisect gives wrong result

**Situation:** Bisect points to wrong commit as cause

**Why it happens:**
Tests inconsistent.
Build was broken at some points.
Wrong good/bad marking.


**Solution:**
```
## Bisect Troubleshooting

### Common Failures

| Issue | Cause | Fix |
|-------|-------|-----|
| Wrong commit found | Flaky test | Use deterministic test |
| Bisect endless | Broken commits | Use skip |
| False result | Build broken mid-range | Check build first |

### The Reproducibility Problem

```bash
# BEFORE bisecting:

1. Make sure your test is deterministic
2. Run it 3 times at "good" point
3. Run it 3 times at "bad" point
4. If any inconsistency, fix test first
```

### Using Skip Correctly

```bash
# Can't test this commit (won't build, etc)
git bisect skip

# Multiple skips at once
git bisect skip v1.0.0..v1.0.5

# Warning: Too many skips = unreliable result
```

### The Build Check Pattern

```bash
#!/bin/bash
# test-for-bisect.sh

# First, make sure it builds
if ! npm run build; then
  exit 125  # Skip this commit
fi

# Then run the actual test
if npm run test:specific; then
  exit 0  # Good
else
  exit 1  # Bad
fi
```

### Verification

```bash
# After bisect finds the commit:

1. Read the commit
2. Does it make sense as the cause?
3. Verify: checkout commit before, test good
4. Verify: checkout bisect result, test bad
5. If doesn't make sense, re-run bisect
```

```

**Symptoms:**
- This commit doesn't make sense
- Wrong commit identified
- Bug still exists after "fix"
- Bisect result surprising

---

### [MEDIUM] Endless conflict resolution during rebase

**Situation:** Same conflicts keep appearing during rebase

**Why it happens:**
Many commits touch same area.
No rerere enabled.
Semantic conflicts.


**Solution:**
```
## Managing Rebase Conflicts

### Enable Rerere

```bash
# "Reuse Recorded Resolution"
git config --global rerere.enabled true

# Now git remembers how you resolved conflicts
# And automatically applies same resolution
```

### The Conflict Loop

```
WHY IT HAPPENS:

Commit 1: Change line 10
Commit 2: Also change line 10
Commit 3: Also change line 10

Rebasing requires resolving each separately!
```

### Solutions

| Strategy | When |
|----------|------|
| Squash first | If commits can combine |
| Merge instead | Preserve history, one resolution |
| Abort and rethink | If too painful |

### Step-by-Step Conflict Resolution

```bash
# 1. See what conflicts
git status

# 2. For each conflicted file:
#    - Edit to resolve
#    - git add <file>

# 3. Continue rebase
git rebase --continue

# 4. If stuck
git rebase --abort  # Start over

# 5. If want to skip this commit
git rebase --skip
```

### When to Give Up

| Sign | Alternative |
|------|-------------|
| > 10 conflicts | Consider merge |
| Same conflict 3x | Squash first |
| Conflicts you don't understand | Get help |
| Hours of work | Maybe not worth it |

```

**Symptoms:**
- Same conflict repeatedly
- Hours in rebase
- Confused about state
- Ready to give up

---

## Collaboration

### When to Hand Off

| Trigger | Delegate To | Context |
|---------|-------------|--------|
| `legacy|understand code|why does this exist` | legacy-archaeology | Need deeper code understanding |
| `incident|bug analysis|postmortem` | incident-postmortem | Need incident analysis |

### Receives Work From

- **legacy-archaeology**: Understanding code history
- **incident-postmortem**: Finding when bugs were introduced

### Works Well With

- legacy-archaeology
- incident-postmortem

---

## Get the Full Version

This skill has **automated validations**, **detection patterns**, and **structured handoff triggers** that work with the Spawner orchestrator.

```bash
npx vibeship-spawner-skills install
```

Full skill path: `~/.spawner/skills/creative/git-time-travel/`

**Includes:**
- `skill.yaml` - Structured skill definition
- `sharp-edges.yaml` - Machine-parseable gotchas with detection patterns
- `validations.yaml` - Automated code checks
- `collaboration.yaml` - Handoff triggers for skill orchestration

---

*Generated by [VibeShip Spawner](https://github.com/vibeforge1111/vibeship-spawner-skills)*
