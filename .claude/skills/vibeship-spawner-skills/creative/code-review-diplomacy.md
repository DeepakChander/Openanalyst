# Code Review Diplomacy

> Expert in the human side of code review. Covers giving feedback that lands,
receiving criticism gracefully, navigating disagreements, and building a
healthy review culture. Understands that code review is as much about
relationships as it is about code quality.


**Category:** creative | **Version:** 1.0.0

---

## Identity

[object Object]

## Expertise Areas

- Feedback delivery
- Criticism reception
- Review conflict resolution
- Review culture building
- Comment tone
- PR etiquette
- Reviewer-author dynamics

## Patterns

### The Feedback Sandwich (Evolved)
Structuring review comments effectively
```
## Feedback That Lands

### 1. The Classic Sandwich (And Why It's Weak)

```
OLD WAY:
Positive → Negative → Positive

WHY IT FAILS:
- Transparent
- Positive feels fake
- Message gets lost
```

### 2. The Better Framework

| Element | Example |
|---------|---------|
| Observation | "I see this function handles X" |
| Impact | "This could cause Y under Z conditions" |
| Suggestion | "Consider A, or alternatively B" |
| Context | "I've seen this pattern cause issues in..." |

### 3. Comment Types

| Type | Prefix | Meaning |
|------|--------|---------|
| Blocking | `[blocking]` | Must fix before merge |
| Suggestion | `[suggestion]` | Better but not required |
| Question | `[question]` | Curious, not critical |
| Nitpick | `[nit]` | Trivial, take or leave |
| Praise | `:+1:` | Genuinely good work |

### 4. Language Patterns

```
INSTEAD OF:                     SAY:
"This is wrong"                 "I think this might..."
"You should"                    "Consider..."
"Why did you"                   "What was the thinking behind..."
"This doesn't work"             "I noticed that in X case..."
"Obviously"                     [delete this word]
```

```

### Receiving Reviews
Taking feedback without getting defensive
```
## Receiving Feedback Gracefully

### 1. The Emotional Response

```
NORMAL TO FEEL:
- Defensive
- Annoyed
- Attacked

WHAT TO DO:
1. Wait 5 minutes before responding
2. Assume good intent
3. Separate code from self
```

### 2. Response Framework

| Feedback Type | Response |
|---------------|----------|
| Valid point | "Good catch, fixed" |
| Disagreement | "I see it differently because X, thoughts?" |
| Unclear | "Can you clarify what you mean by X?" |
| Wrong | "Actually X because Y, but I see how it looks" |

### 3. Ego Management

```
REMEMBER:

- Code is not you
- Feedback is about code, not character
- Everyone gets feedback
- Getting feedback = opportunity to improve
- Reviewer spent time to help
```

### 4. Productive Disagreement

| Approach | Example |
|----------|---------|
| Understand first | "Let me make sure I understand your concern..." |
| Explain reasoning | "I went with X because..." |
| Propose compromise | "What if we did X now and Y as follow-up?" |
| Escalate kindly | "Want to sync on a call? Might be faster." |

```

### Conflict Resolution
Handling heated review disagreements
```
## De-Escalating Review Conflicts

### 1. Warning Signs

| Signal | Meaning |
|--------|---------|
| Multiple replies | Escalating |
| Longer comments | Getting heated |
| "Actually" | Defensive mode |
| All caps | Emotions high |
| Third parties tagged | Going public |

### 2. De-Escalation Moves

```
STEP 1: Change medium
"This is getting complex. Quick call?"

STEP 2: Acknowledge their view
"I see why you'd prefer X, it does solve Y..."

STEP 3: Find common ground
"We both want Z, right? Let's work backwards."

STEP 4: Propose options
"What about A? Or we could try B?"
```

### 3. The Tie-Breaker

| Situation | Resolution |
|-----------|------------|
| Style preference | Go with author's choice |
| Performance concern | Benchmark it |
| Architecture question | Tech lead decides |
| Deadlocked | Ship it, revisit later |

### 4. Post-Conflict Recovery

```
AFTER RESOLUTION:

1. Don't hold grudges
2. Thank them for the discussion
3. Apply learnings to future reviews
4. Document if it reveals a process gap
```

```

### Building Review Culture
Creating a healthy team review environment
```
## Healthy Review Culture

### 1. Culture Signals

| Healthy | Unhealthy |
|---------|-----------|
| Everyone reviews | Only seniors review |
| Questions welcomed | Questions judged |
| Praise given | Only criticism |
| Fast turnaround | PRs rot for days |
| Author learns | Author just fixes |

### 2. Team Agreements

```markdown
## Review Norms

- Respond within [X hours]
- Use prefixes: [blocking], [nit], [question]
- Approve with suggestions OK
- Discuss, don't dictate
- Praise genuinely
```

### 3. Review Training

| For | Teach |
|-----|-------|
| New reviewers | What to look for |
| New authors | How to prepare PRs |
| Everyone | Giving/receiving feedback |

### 4. Process Improvements

| Problem | Solution |
|---------|----------|
| PRs too big | Size limits, stacked PRs |
| Review bottleneck | Spread reviewers |
| Inconsistent standards | Written guidelines |
| Slow reviews | Review SLA |
| Harsh reviews | Feedback training |

```


## Anti-Patterns

### The Nitpicker
Blocking on minor style issues
**Why it's bad:** Demoralizes authors.
Slows down shipping.
Creates resentment.


### The Drive-By
Dropping critical comments without context
**Why it's bad:** No explanation.
Leaves author confused.
Feels like attack.


### The Rubber Stamp
Approving without actually reviewing
**Why it's bad:** Defeats the purpose.
Misses real issues.
False confidence.



## Sharp Edges (Gotchas)

*Real production issues that cause outages and bugs.*

### [HIGH] Review behavior that damages team trust

**Situation:** Reviewer consistently demoralizing others

**Why it happens:**
Ego-driven feedback.
Power dynamics abused.
No empathy for author.


**Solution:**
```
## Addressing Toxic Review Behavior

### Warning Signs

| Behavior | Impact |
|----------|--------|
| "Obviously wrong" | Shames author |
| Public corrections | Humiliates |
| Personal attacks | Destroys trust |
| Blocking without reason | Power play |
| Never approves | Gatekeeping |

### If You're the Reviewer

```
ASK YOURSELF:

- Would I say this in person?
- Am I helping or judging?
- Is this about the code or the person?
- Would I want this comment on my PR?
```

### If You're the Author

| Situation | Response |
|-----------|----------|
| Harsh comment | "Can you help me understand what you'd suggest?" |
| Personal attack | "Let's focus on the code" |
| Pattern behavior | Talk to manager privately |
| Blocking unfairly | Escalate to tech lead |

### If You're a Manager

```
INTERVENTION STEPS:

1. Review the review history
2. Private conversation
3. Specific examples
4. Clear expectations
5. Follow up on changes
```

### Team-Level Fixes

| Fix | How |
|-----|-----|
| Review training | Teach empathetic feedback |
| Comment templates | Provide good examples |
| Anonymized reviews | Where appropriate |
| Feedback on feedback | Review the reviews |

```

**Symptoms:**
- People avoid asking for reviews
- PRs sit waiting
- Low morale after reviews
- Fear of opening PRs

---

### [HIGH] Team avoiding code review entirely

**Situation:** Reviews seen as obstacle, not value

**Why it happens:**
Reviews too slow.
Process too painful.
Value not understood.


**Solution:**
```
## Reviving Review Culture

### Diagnosis

| Symptom | Root Cause |
|---------|------------|
| PRs merged unreviewed | Pressure > process |
| Minimal comments | Nobody cares |
| Days to review | No SLA, not prioritized |
| Rubber stamps | Going through motions |

### Quick Wins

```
1. REVIEW SLA
   "All PRs get first look in 4 hours"

2. SMALLER PRs
   "Max 400 lines changed"

3. PR ROULETTE
   Automate reviewer assignment

4. REVIEW TIME
   Block calendar for reviews
```

### Making Review Valuable

| Show Value By | How |
|---------------|-----|
| Catching bugs | Track bugs caught in review |
| Teaching | Juniors learn from feedback |
| Sharing knowledge | Spread context |
| Improving quality | Metric improvements |

### Culture Shift

```
OLD MINDSET:
"Review is a gate to pass"

NEW MINDSET:
"Review is where we learn together"

REINFORCE BY:
- Praising good reviews
- Celebrating catches
- Rotating reviewers
- Making it fast
```

```

**Symptoms:**
- Self-merging
- Can you just approve
- Reviews seen as waste
- LGTM without looking

---

### [MEDIUM] Spending review time on trivial issues

**Situation:** Big issues ignored while style debated

**Why it happens:**
Easy to have opinions on style.
Hard to catch real bugs.
No priority guidance.


**Solution:**
```
## Focusing Review on What Matters

### The Bikeshed Problem

```
WHAT HAPPENS:
20 comments on variable names
0 comments on the race condition

WHY:
- Style is easy to see
- Bugs are hard to find
- Opinions on style are cheap
```

### Review Priority Ladder

| Priority | Focus Area |
|----------|------------|
| 1. Critical | Security, data loss, crashes |
| 2. Important | Logic errors, edge cases |
| 3. Moderate | Performance, maintainability |
| 4. Minor | Style, naming, formatting |

### Process Fixes

| Problem | Solution |
|---------|----------|
| Style debates | Auto-formatter (Prettier, etc.) |
| Naming debates | Conventions doc |
| Trivial comments | Use [nit] prefix |
| Missing priorities | Review checklist |

### The Checklist Approach

```markdown
## Review Checklist

Before commenting on style, verify:

- [ ] No security issues
- [ ] No data corruption risk
- [ ] Error handling exists
- [ ] Tests cover new code
- [ ] No obvious bugs

THEN worry about naming.
```

### Comment Quota

```
RULE OF THUMB:

For every [nit], require yourself to:
- Look for one actual bug
- Or leave one genuine praise

Keeps focus on what matters.
```

```

**Symptoms:**
- 50 comments, all style
- Production bugs post-merge
- Reviews take forever on trivial
- Author frustration

---

### [HIGH] Using reviews to assert dominance

**Situation:** Senior devs weaponizing review

**Why it happens:**
Ego protection.
Power dynamics.
Fear of being replaced.


**Solution:**
```
## Inclusive Review Culture

### Gatekeeping Signs

| Behavior | Translation |
|----------|-------------|
| "You should know this" | Making you feel small |
| "Just do it my way" | Refusing to explain |
| Always finding issues | Perfectionism as control |
| Rejecting new patterns | Resisting change |

### Healthy Senior Behavior

```
INSTEAD OF:             DO:
"Wrong"                 "Have you considered X?"
"Always do it this way" "We typically do X because Y"
"Should know this"      "Here's a good resource"
Blocking                Explaining, teaching
```

### For Authors

| When facing... | Try |
|----------------|-----|
| No explanation | "Can you help me understand why?" |
| "Just do it" | "I'd like to learn the reasoning" |
| Consistent blocks | Document and escalate |

### For Teams

| Fix | How |
|-----|-----|
| Rotate reviewers | No single gatekeeper |
| Junior reviewers | Everyone's feedback valued |
| Written standards | Not in one person's head |
| Anonymous feedback | On review quality |

```

**Symptoms:**
- One person always blocks
- Fear of certain reviewers
- Knowledge hoarding
- Only X understands this

---

## Collaboration

### When to Hand Off

| Trigger | Delegate To | Context |
|---------|-------------|--------|
| `tech debt|refactor|cleanup` | tech-debt-negotiation | Debt discussion in review |
| `documentation|readme|docs` | documentation-that-slaps | Need doc guidance |
| `incident|broke|postmortem` | incident-postmortem | Need incident analysis |

### Receives Work From

- **tech-debt-negotiation**: Debt identified in reviews
- **documentation-that-slaps**: Doc improvements in reviews
- **incident-postmortem**: Review of incident-causing code

### Works Well With

- tech-debt-negotiation
- documentation-that-slaps
- incident-postmortem

---

## Get the Full Version

This skill has **automated validations**, **detection patterns**, and **structured handoff triggers** that work with the Spawner orchestrator.

```bash
npx vibeship-spawner-skills install
```

Full skill path: `~/.spawner/skills/creative/code-review-diplomacy/`

**Includes:**
- `skill.yaml` - Structured skill definition
- `sharp-edges.yaml` - Machine-parseable gotchas with detection patterns
- `validations.yaml` - Automated code checks
- `collaboration.yaml` - Handoff triggers for skill orchestration

---

*Generated by [VibeShip Spawner](https://github.com/vibeforge1111/vibeship-spawner-skills)*
