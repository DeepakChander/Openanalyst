# Decision Frameworks

> Expert in decision-making frameworks - systematic approaches to making better decisions
under uncertainty. Covers decision criteria, reversibility assessment, stakeholder alignment,
and decision documentation. Knows when to decide fast and when to deliberate.


**Category:** strategy | **Version:** 1.0.0

---

## Identity

[object Object]

## Expertise Areas

- Decision criteria
- Decision matrices
- Reversibility assessment
- Stakeholder alignment
- Decision documentation
- Risk assessment
- Tradeoff analysis
- Decision speed optimization

## Patterns

### Decision Classification
Categorizing decisions by type
```
## Decision Types

### 1. Reversibility Matrix

| Type | Reversible? | Speed | Process |
|------|-------------|-------|---------|
| Type 1 | No/Hard | Slow | Full analysis |
| Type 2 | Yes/Easy | Fast | Decide and learn |

```
Type 1 (One-way doors):
- Hard to reverse
- High cost to undo
- Examples: M&A, key hires, architecture

Type 2 (Two-way doors):
- Easy to reverse
- Low cost to undo
- Examples: Features, pricing, messaging

Default: Treat as Type 2 unless proven Type 1.
```

### 2. Impact Assessment

| Impact | Criteria |
|--------|----------|
| High | Affects strategy, customers, or >10% of resources |
| Medium | Affects team, quarter goals, or 2-10% of resources |
| Low | Affects day-to-day, individual work, <2% of resources |

### 3. Decision Framework Selection

| Reversibility | Impact | Framework |
|---------------|--------|-----------|
| Hard | High | Full deliberation |
| Hard | Medium | Structured analysis |
| Easy | High | Quick deliberation |
| Easy | Medium | Owner decides |
| Easy | Low | Just decide |

### 4. Time Box by Type

```
Decision time limits:

Type 1 + High impact: 1-2 weeks max
Type 1 + Medium impact: 3-5 days
Type 2 + High impact: 1-3 days
Type 2 + Medium impact: Same day
Type 2 + Low impact: Now

If taking longer, you're overthinking.
```

```

### Decision Criteria Framework
Defining what matters
```
## Defining Criteria

### 1. Criteria Identification

```
Ask:
- What would make this a success?
- What would make this a failure?
- What constraints must we honor?
- What would we regret?

List all factors, then prioritize.
```

### 2. Criteria Weighting

| Category | Weight Range | Examples |
|----------|--------------|----------|
| Must-have | Pass/Fail | Legal compliance, safety |
| Critical | 40-60% | Core business impact |
| Important | 20-40% | Secondary benefits |
| Nice-to-have | 0-20% | Marginal improvements |

### 3. Weighted Matrix

```
Option Comparison:

| Criteria | Weight | Option A | Option B | Option C |
|----------|--------|----------|----------|----------|
| Speed | 30% | 4 (1.2) | 3 (0.9) | 5 (1.5) |
| Cost | 25% | 3 (0.75) | 5 (1.25) | 2 (0.5) |
| Quality | 25% | 5 (1.25) | 3 (0.75) | 4 (1.0) |
| Risk | 20% | 4 (0.8) | 4 (0.8) | 3 (0.6) |
| Total | 100% | 4.0 | 3.7 | 3.6 |

Note: Matrix informs, doesn't decide.
```

### 4. Criteria Validation

```
Check your criteria:

1. Are they independent? (Not double-counting)
2. Are they measurable? (Can you score them?)
3. Are they complete? (Covering what matters)
4. Are they weighted honestly? (Not gamed)
5. Would you accept the result?
```

```

### Tradeoff Analysis
Understanding what you're giving up
```
## Analyzing Tradeoffs

### 1. Tradeoff Mapping

```
For each option:

What you GET:
- [Benefit 1]
- [Benefit 2]
- [Benefit 3]

What you GIVE UP:
- [Cost 1]
- [Cost 2]
- [Cost 3]

What you RISK:
- [Risk 1]
- [Risk 2]
```

### 2. Common Tradeoffs

| Tradeoff | Dimension A | Dimension B |
|----------|-------------|-------------|
| Speed vs Quality | Launch faster | Launch better |
| Control vs Scale | Manage tightly | Grow faster |
| Simple vs Flexible | Easy to use | Handles edge cases |
| Now vs Later | Immediate value | Future optionality |
| Risk vs Reward | Safe bet | Big upside |

### 3. Regret Minimization

```
Project forward:

In 1 year, will I regret:
- Not trying this?
- Trying this?
- Going slow?
- Going fast?
- The risk taken?
- The risk not taken?

Minimize regret, not risk.
```

### 4. Reversibility Check

```
For each tradeoff:

1. If wrong, can we reverse?
2. How long until we know?
3. What's the cost to reverse?
4. What's the learning value?

Reversible tradeoffs → bias toward action.
Irreversible tradeoffs → bias toward caution.
```

```

### Stakeholder Alignment
Getting buy-in efficiently
```
## Stakeholder Alignment

### 1. RACI for Decisions

| Role | Definition |
|------|------------|
| Responsible | Does the work, makes recommendation |
| Accountable | Makes final decision (ONE person) |
| Consulted | Input required before decision |
| Informed | Notified after decision |

```
Rules:
- Only ONE Accountable person
- Minimize Consulted (slows decisions)
- Be clear who's Responsible
- Don't skip Informed
```

### 2. Alignment Process

| Step | Action |
|------|--------|
| 1. Frame | Define decision and criteria |
| 2. Consult | Gather input from C stakeholders |
| 3. Propose | R makes recommendation |
| 4. Decide | A makes decision |
| 5. Communicate | Inform I stakeholders |

### 3. Handling Disagreement

```
If stakeholders disagree:

1. Clarify: Same facts?
2. Explore: Different values?
3. Surface: Hidden concerns?
4. Decide: A makes call
5. Commit: Everyone supports

"Disagree and commit" > endless debate.
```

### 4. Decision Documentation

```
Decision Record:

Decision: [What was decided]
Date: [When]
Decider: [Who was Accountable]
Context: [Why this decision was needed]
Options: [What was considered]
Rationale: [Why this option]
Tradeoffs: [What was given up]
Review: [When to revisit]
```

```

### Decision Velocity
Making decisions faster
```
## Increasing Decision Speed

### 1. Speed Blockers

| Blocker | Solution |
|---------|----------|
| Unclear owner | Assign one Accountable |
| Too many opinions | Reduce Consulted |
| Analysis paralysis | Time-box research |
| Fear of wrong | Embrace reversibility |
| Waiting for certainty | Accept uncertainty |

### 2. Decision Deadlines

```
Set explicit deadlines:

"We will decide by [date]"
"If no decision by [date], default is [X]"
"We have [time] to gather input"

Deadlines force decisions.
```

### 3. Default Options

```
Pre-set defaults:

If we can't decide → do nothing (or)
If we can't decide → do X
If we can't decide → flip coin

Having a default prevents stalling.
```

### 4. Good Enough Standard

| Situation | Good Enough Threshold |
|-----------|----------------------|
| Reversible decision | 60% confidence |
| High-learning decision | 50% confidence |
| Irreversible decision | 80% confidence |
| Low-stakes decision | Any preference |

```
Perfectionism kills speed.
Good enough now > perfect later.
Learn from doing, not analyzing.
```

```


## Anti-Patterns

### Analysis Paralysis
Over-analyzing instead of deciding
**Why it's bad:** Decisions stall.
Opportunities pass.
Team frustrated.


### Consensus Seeking
Waiting for everyone to agree
**Why it's bad:** Slowest person sets pace.
Decisions diluted.
Accountability unclear.


### Reversibility Blindness
Treating reversible decisions as permanent
**Why it's bad:** Over-caution.
Missed learning.
Slow iteration.



## Sharp Edges (Gotchas)

*Real production issues that cause outages and bugs.*

### [MEDIUM] Following frameworks blindly instead of thinking

**Situation:** Using frameworks without judgment

**Why it happens:**
Frameworks are tools.
Context matters.
Judgment still required.


**Solution:**
```
## Frameworks as Tools

### When Frameworks Help

| Situation | Framework Value |
|-----------|-----------------|
| Complex decision | Structures thinking |
| Multiple stakeholders | Creates shared language |
| Emotional decision | Adds objectivity |
| Recurring decision | Ensures consistency |

### When Frameworks Hurt

| Situation | Problem |
|-----------|---------|
| Simple decision | Overhead |
| Obvious answer | Delay |
| Unique context | Doesn't fit |
| Gaming risk | False precision |

### Using Frameworks Wisely

```
1. Choose framework that fits
2. Adapt to your context
3. Use as input, not answer
4. Override when judgment says to
5. Document the override

Framework output is recommendation, not verdict.
```

### Judgment Checkpoints

```
After framework analysis:

- Does this feel right?
- What's the framework missing?
- Would I bet my job on this?
- What would I tell a friend?

If gut and framework conflict → investigate why.
```

```

**Symptoms:**
- Following scores despite doubt
- The matrix says...
- Can't explain why

---

### [MEDIUM] Fake accuracy in uncertain decisions

**Situation:** Precise numbers for imprecise inputs

**Why it happens:**
Numbers feel objective.
Precision feels rigorous.
Uncertainty is uncomfortable.


**Solution:**
```
## Honest Precision

### Precision vs Accuracy

```
"This option scores 4.2 vs 4.1"
→ Implies knowable difference
→ Reality: They're effectively tied

"This option is roughly 2x better"
→ Honest about uncertainty
→ Useful for decision
```

### Right Level of Precision

| Input Quality | Output Precision |
|---------------|------------------|
| Hard data | Precise numbers |
| Estimates | Ranges |
| Guesses | Categories (High/Med/Low) |
| Unknown | Acknowledge uncertainty |

### Avoiding False Precision

```
Instead of:
- "This scores 3.7"

Say:
- "This is in the middle range"
- "These two are effectively tied"
- "Option A is clearly ahead"

Match precision to confidence.
```

### When Precise, When Not

| Precise | Imprecise |
|---------|-----------|
| Costs | Customer value |
| Timeline | Market timing |
| Revenue | Strategic importance |
| Effort | Risk probability |

```

**Symptoms:**
- Decimal points on subjective scores
- Debating small differences
- Confidence beyond evidence

---

### [HIGH] Weighing past investment in future decisions

**Situation:** We've already invested so much...

**Why it happens:**
Investment feels wasted.
Ego attached.
Commitment bias.


**Solution:**
```
## Sunk Cost Discipline

### The Rule

```
Past investment is IRRELEVANT to future decisions.

Only consider:
- Future costs
- Future benefits
- Future alternatives

What you've spent is spent.
```

### Reframing Questions

| Instead of | Ask |
|------------|-----|
| "We've invested $1M" | "What's the best use of the next $1?" |
| "We've spent 6 months" | "What's the best use of the next month?" |
| "We've already built X" | "Is X the best path forward?" |

### The Clean Slate Test

```
Imagine you're starting fresh:

"If we had to make this decision today,
 knowing what we know,
 ignoring what we've spent,
 what would we do?"

If answer differs → you're in the sunk cost trap.
```

### Permission to Pivot

```
Pivoting is not failure:
- You learned something
- Conditions changed
- Better option emerged

Continuing on wrong path IS failure.
```

```

**Symptoms:**
- We've already...
- It would be a waste to...
- Reluctance to change direction

---

### [HIGH] Deferring decisions indefinitely

**Situation:** Decision keeps getting postponed

**Why it happens:**
Uncertainty is uncomfortable.
Being wrong is scary.
More data feels safer.


**Solution:**
```
## Forcing Decisions

### Cost of Delay

```
Every deferred decision costs:

- Opportunity cost
- Team uncertainty
- Resource limbo
- Momentum loss
- Competitor advantage

Not deciding IS deciding (to wait).
```

### Decision Forcing Functions

| Mechanism | How |
|-----------|-----|
| Hard deadline | "We decide by Friday" |
| Default option | "If no decision, we do X" |
| Escalation | "If we can't decide, Y decides" |
| Burning platform | "We must decide because Z" |

### Minimum Viable Decision

```
What's the smallest decision that moves us forward?

Instead of:
- Decide everything now

Try:
- Decide enough to take next step
- Learn from that step
- Decide next thing

Incremental > comprehensive.
```

### Accountability

```
Assign decision owner:

"Who is responsible for this decision?"
"By when will you decide?"
"What do you need to decide?"

No owner = no decision.
```

```

**Symptoms:**
- Let's revisit this
- We need more data
- Same decision in multiple meetings

---

## Collaboration

### When to Hand Off

| Trigger | Delegate To | Context |
|---------|-------------|--------|
| `feature priority|roadmap priority` | feature-prioritization | Need prioritization framework |
| `negotiate|deal structure` | negotiation-playbook | Need negotiation strategy |
| `product direction|product strategy` | product-strategy | Need product strategy |
| `partnership|alliance` | strategic-partnerships | Need partnership strategy |

### Receives Work From

- **product-strategy**: Product decisions requiring framework
- **feature-prioritization**: Prioritization decisions
- **strategic-partnerships**: Partnership decisions

### Works Well With

- feature-prioritization
- product-strategy
- negotiation-playbook
- strategic-partnerships

---

## Get the Full Version

This skill has **automated validations**, **detection patterns**, and **structured handoff triggers** that work with the Spawner orchestrator.

```bash
npx vibeship-spawner-skills install
```

Full skill path: `~/.spawner/skills/strategy/decision-frameworks/`

**Includes:**
- `skill.yaml` - Structured skill definition
- `sharp-edges.yaml` - Machine-parseable gotchas with detection patterns
- `validations.yaml` - Automated code checks
- `collaboration.yaml` - Handoff triggers for skill orchestration

---

*Generated by [VibeShip Spawner](https://github.com/vibeforge1111/vibeship-spawner-skills)*
