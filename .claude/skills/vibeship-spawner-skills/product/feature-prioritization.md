# Feature Prioritization

> Expert in feature prioritization - the art and science of deciding what to build and in what
order. Covers prioritization frameworks, roadmap planning, stakeholder management, and the
trade-offs between different approaches. Knows that prioritization is about saying no, and
how to make those decisions defensible.


**Category:** product | **Version:** 1.0.0

---

## Identity

[object Object]

## Expertise Areas

- Prioritization frameworks
- Roadmap planning
- Backlog management
- Stakeholder alignment
- Trade-off decisions
- Scope management
- Feature request handling
- Resource allocation

## Patterns

### Prioritization Framework Selection
Choosing the right framework for the decision
```
## Framework Selection Guide

### 1. Framework Overview

| Framework | Best For | Key Factors |
|-----------|----------|-------------|
| RICE | Feature prioritization | Reach, Impact, Confidence, Effort |
| ICE | Experiments | Impact, Confidence, Ease |
| Value/Effort | Quick decisions | 2x2 matrix |
| MoSCoW | Scope decisions | Must, Should, Could, Won't |
| Kano | Customer satisfaction | Delighters, Performers, Basics |
| Weighted Scoring | Complex decisions | Custom criteria |
| Cost of Delay | Time-sensitive | Urgency and value decay |

### 2. RICE Framework

```
Score = (Reach × Impact × Confidence) / Effort

Reach: # of customers affected per quarter
Impact: 3 = massive, 2 = high, 1 = medium, 0.5 = low
Confidence: 100% = high, 80% = medium, 50% = low
Effort: Person-months of work
```

**Example**
| Feature | Reach | Impact | Conf | Effort | Score |
|---------|-------|--------|------|--------|-------|
| Feature A | 5000 | 2 | 80% | 3 | 2667 |
| Feature B | 2000 | 3 | 100% | 1 | 6000 |

### 3. Impact/Effort Matrix

```
           High Impact
               │
   ┌───────────┼───────────┐
   │ Quick     │ Major     │
   │ Wins      │ Projects  │
   │ (Do now)  │ (Plan)    │
 Low──────────────────────High Effort
   │ Fill-ins  │ Avoid     │
   │ (Maybe)   │ (No)      │
   └───────────┼───────────┘
           Low Impact
```

### 4. Cost of Delay

```
CD3 = Cost of Delay / Duration

Cost of Delay includes:
- Revenue lost per week
- Customer churn risk
- Competitive risk
- Compliance deadlines

Prioritize highest CD3 first.
```

### 5. Kano Model

| Category | Effect on Satisfaction |
|----------|------------------------|
| Basic | Expected; absence causes dissatisfaction |
| Performance | More is better, linear |
| Delighter | Unexpected positive surprise |

**Prioritization Rule**
Basic > Performance > Delighter (usually)

### 6. When to Use What

| Situation | Framework |
|-----------|-----------|
| Quarterly planning | RICE |
| Sprint decisions | Value/Effort |
| Release scoping | MoSCoW |
| Growth experiments | ICE |
| Time-sensitive | Cost of Delay |
| Complex trade-offs | Weighted Scoring |

```

### Roadmap Communication
Creating and communicating roadmaps
```
## Roadmap Best Practices

### 1. Roadmap Types

| Type | Audience | Timeframe | Detail |
|------|----------|-----------|--------|
| Now/Next/Later | Internal | 3-6 months | Low |
| Theme-based | Leadership | 6-12 months | Themes, not features |
| Feature-based | Delivery team | 1-3 months | High |
| Portfolio | C-suite | 12+ months | Strategic bets |

### 2. Now/Next/Later Framework

```
NOW (Committed)
- Currently building
- High confidence
- Specific scope

NEXT (Planned)
- Coming soon
- Medium confidence
- May change

LATER (Exploring)
- Under consideration
- Low confidence
- Will change
```

### 3. Roadmap Content

**Include**
- Outcomes/goals, not just features
- Strategic context (why)
- Dependencies if critical
- Confidence levels

**Exclude**
- Fixed dates (use timeframes)
- Everything (be selective)
- Implementation details
- Commitments beyond capacity

### 4. Roadmap Presentation

```
For each initiative:

[Theme Name]
Goal: What outcome we're driving
Why now: Why this is prioritized
Approach: High-level how
Success: How we'll measure
Confidence: High/Medium/Low
```

### 5. Roadmap Cadence

| Activity | Frequency |
|----------|-----------|
| Internal review | Weekly |
| Team update | Every sprint |
| Stakeholder share | Monthly |
| Major revision | Quarterly |

### 6. Managing Roadmap Requests

```
When stakeholder requests addition:

1. Understand the problem
2. Assess against criteria
3. Show trade-offs ("What would we deprioritize?")
4. Decide transparently
5. Document decision
```

```

### Stakeholder Alignment
Getting buy-in on priorities
```
## Stakeholder Management

### 1. Stakeholder Mapping

```
           High Influence
               │
   ┌───────────┼───────────┐
   │ Keep      │ Manage    │
   │ Satisfied │ Closely   │
   │           │           │
 Low──────────────────────High Interest
   │ Monitor   │ Keep      │
   │           │ Informed  │
   └───────────┼───────────┘
           Low Influence
```

### 2. Input Collection

**Before Planning**
- 1:1 conversations with key stakeholders
- Input request form for structured feedback
- Review business metrics and goals

**During Planning**
- Draft prioritization (PM-led)
- Review with key stakeholders
- Incorporate feedback
- Finalize and share

### 3. Priority Disagreement

```
When stakeholders disagree:

1. Ensure shared understanding of goals
2. Make criteria explicit
3. Show data/evidence
4. Clarify trade-offs
5. Escalate if needed (with recommendation)
```

### 4. Saying No

**The "No" Framework**
```
"I understand [their goal].
 Here's why [alternative/no]:
 [Evidence/reasoning].
 What I'd suggest instead:
 [Alternative approach]."
```

**Types of No**
- Not now (prioritize later)
- Not this way (different solution)
- Not at all (doesn't fit strategy)

### 5. Communication Plan

| Stakeholder | What They Need | Frequency |
|-------------|----------------|-----------|
| Executives | Strategic alignment | Monthly |
| Sales | What's coming for customers | Monthly |
| Support | Upcoming changes | Every release |
| Engineering | Clear priorities | Weekly |

```

### Backlog Management
Keeping backlog healthy and useful
```
## Backlog Best Practices

### 1. Backlog Structure

```
Backlog Tiers:

Tier 1: Now (This sprint)
- Fully refined
- Ready to build
- Clear acceptance criteria

Tier 2: Next (Next 1-2 sprints)
- Mostly refined
- Scope understood
- Needs detail

Tier 3: Later (3+ sprints)
- Rough idea
- Needs discovery
- May not happen
```

### 2. Backlog Grooming

**Weekly Grooming**
- Review Tier 1 readiness
- Refine Tier 2 items
- Promote/demote between tiers

**Monthly Cleanup**
- Archive stale items (6+ months untouched)
- Re-prioritize Tier 3
- Remove duplicates

**Quarterly Purge**
- Aggressive cleanup
- Challenge everything in Tier 3
- Align with roadmap

### 3. Backlog Size

```
Healthy backlog size:
- Tier 1: 2-3 sprints of work
- Tier 2: 3-6 sprints of work
- Tier 3: Minimal (ideas, not items)

Total refined items: < 8-10 sprints

Bigger = unmaintainable and demoralizing
```

### 4. Feature Request Handling

```
Request comes in:

1. Capture (don't lose it)
2. Categorize (problem, feature, bug)
3. Initial assess (quick value/effort)
4. Merge if duplicate
5. Decide: Tier 1/2/3 or Archive
6. Communicate decision to requestor
```

### 5. Backlog Health Metrics

| Metric | Healthy |
|--------|---------|
| Items added/week | Stable, not growing |
| Items completed/week | ≥ Items added |
| Avg age of Tier 3 | < 6 months |
| % items refined | Tier 1: 100%, Tier 2: 70% |

```

### Trade-off Analysis
Making difficult prioritization decisions
```
## Trade-off Decision Framework

### 1. Trade-off Types

| Trade-off | Example |
|-----------|---------|
| Speed vs Quality | Ship fast with debt vs wait for solid |
| Breadth vs Depth | More features vs better features |
| Short vs Long term | Quick win vs strategic investment |
| Revenue vs Retention | New sales vs existing customers |

### 2. Trade-off Analysis Template

```
Decision: [Feature A vs Feature B]

Option A:
- Benefits: [list]
- Risks: [list]
- Opportunity cost: [what we give up]

Option B:
- Benefits: [list]
- Risks: [list]
- Opportunity cost: [what we give up]

Recommendation: [choice]
Reasoning: [why]
Reversibility: [how hard to change later]
```

### 3. Reversibility Principle

```
Easy to reverse (type 2 decisions):
- Decide quickly
- Bias toward action
- Learn and adjust

Hard to reverse (type 1 decisions):
- Take more time
- Gather more input
- Be more deliberate
```

### 4. Opportunity Cost Thinking

Every yes is a no to something else.

Ask: "What are we not doing by doing this?"

Make trade-offs explicit, not hidden.

### 5. Decision Documentation

```
Decision Log Entry:

Date:
Decision:
Options considered:
Evidence used:
Trade-offs accepted:
Decision maker:
Review date:
```

```


## Anti-Patterns

### Priority Everything
Everything is high priority
**Why it's bad:** If everything is priority, nothing is.
Team overwhelmed.
Nothing gets done well.


### HIPPO Prioritization
Highest Paid Person's Opinion wins
**Why it's bad:** Not evidence-based.
Team disempowered.
Often wrong.


### Feature Factory
Shipping features without measuring outcomes
**Why it's bad:** No learning.
Backlog never shrinks.
Value not validated.


### Infinite Backlog
Backlog that only grows
**Why it's bad:** Demoralizing.
Unmaintainable.
Full of stale items.


### Roadmap Promises
Treating roadmap as commitments
**Why it's bad:** Reduces agility.
Sets false expectations.
Punishes learning.



## Sharp Edges (Gotchas)

*Real production issues that cause outages and bugs.*

### [MEDIUM] Over-relying on prioritization formulas

**Situation:** Prioritization score doesn't match intuition

**Why it happens:**
Frameworks are tools, not truth.
Garbage in, garbage out.
Strategic context matters.


**Solution:**
```
## Balanced Framework Use

### Framework Limitations

```
RICE score is only as good as:
- Your reach estimates
- Your impact guesses
- Your confidence calibration
- Your effort predictions

All of these are uncertain.
```

### Framework + Judgment

| Framework Says | But Consider |
|----------------|--------------|
| High score | Strategic fit? Timing? Dependencies? |
| Low score | Hidden strategic value? Customer signal? |
| Tie | What does gut say? Why? |

### When to Override

```
Override framework when:
- Strategic importance not captured
- Market timing critical
- Customer relationship at stake
- Clear blocker to other priorities
- Intuition strongly disagrees (investigate why)
```

### Calibration Practice

| Check | Frequency |
|-------|-----------|
| Estimates vs actuals | Every quarter |
| Framework results vs outcomes | Every quarter |
| Where overrides happened | Monthly |

### Framework as Discussion Tool

Best use of frameworks:
- Structure the discussion
- Surface assumptions
- Enable comparison
- NOT: auto-generate priority list

```

**Symptoms:**
- But the score says...
- Strategic items deprioritized
- Framework gaming

---

### [HIGH] Priorities changing constantly

**Situation:** Team can't finish anything due to shifting priorities

**Why it happens:**
No clear decision process.
Everyone can reprioritize.
Leadership changes mind.


**Solution:**
```
## Priority Stability

### Stability Rules

```
Commitment Windows:
- Sprint: Locked (no changes except emergency)
- Month: Stable (rare changes)
- Quarter: Mostly stable (roadmap items)

Changes require:
- Clear business reason
- Trade-off acknowledged
- Team informed properly
```

### Change Request Process

```
Priority change request:

1. Requestor fills out form:
   - What's changing
   - Why (business impact)
   - What to deprioritize
   - Urgency

2. Review against criteria
3. Decide with trade-off explicit
4. Communicate to team
5. Document in decision log
```

### Change Thresholds

| Impact | Can Be Done By | Process |
|--------|----------------|---------|
| Minor (within sprint) | PM | Inform team |
| Medium (roadmap item) | PM + stakeholders | Review meeting |
| Major (strategy shift) | Leadership | Planning revision |

### Tracking Churn

```
Measure:
- # of priority changes per sprint
- # of interrupted initiatives
- Scope added mid-sprint

Target: < 2 priority changes per quarter
```

### Push Back Template

"I understand the urgency of [new request].
 If we do this now, we'd need to stop [current work].
 The trade-off is [consequences].
 Are you comfortable with that trade-off?"

```

**Symptoms:**
- Multiple pivots per sprint
- Nothing gets completed
- Team frustration

---

### [HIGH] Prioritizing based on who asks loudest

**Situation:** Squeaky wheel gets the grease

**Why it happens:**
Path of least resistance.
Avoiding conflict.
No objective criteria.


**Solution:**
```
## Objective Prioritization

### Make Criteria Explicit

```
Published prioritization criteria:

1. Strategic alignment (weight: 30%)
2. Customer impact (weight: 25%)
3. Revenue impact (weight: 20%)
4. Effort required (weight: 15%)
5. Urgency (weight: 10%)

Anyone can understand how decisions are made.
```

### Request vs Priority

| What They Say | What to Assess |
|---------------|----------------|
| "Urgent!" | What's the actual deadline? |
| "Critical customer!" | Revenue at stake? Evidence? |
| "Everyone wants this!" | How many? How badly? |
| "Competitors have it!" | Do customers care? |

### Evidence Requirements

```
To prioritize, requestor provides:

- Problem statement
- Affected customers (how many)
- Business impact (quantified)
- Current workaround
- Urgency reason

No evidence = no prioritization change
```

### Fairness Perception

Even if you can't make everyone happy:
- Process is transparent
- Criteria are published
- Decisions are explained
- Anyone can see reasoning

### Pushing Back on Loud Voices

"I hear the urgency. Help me understand:
 - How many customers affected?
 - What's the business impact?
 - What happens if we wait?"

```

**Symptoms:**
- Same stakeholders always win
- Quiet teams never get priority
- Decisions feel political

---

### [MEDIUM] Prioritizing only by immediate value

**Situation:** Roadmap is all quick wins, no strategic investment

**Why it happens:**
Short-term bias.
Easier to justify.
Pressure for immediate results.


**Solution:**
```
## Strategic Balance

### Investment Allocation

```
Typical healthy balance:

70% - Sustaining (current product/customers)
20% - Strategic (future bets)
10% - Exploration (learning, experiments)

Adjust based on company stage.
```

### Strategic Project Protection

```
Strategic initiatives get:
- Protected time allocation
- Longer measurement window
- Different success criteria
- Leadership sponsorship

Don't compete with tactical on same criteria.
```

### Portfolio View

| Category | This Quarter | Next Quarter |
|----------|--------------|--------------|
| Sustaining | [list] | [list] |
| Strategic | [list] | [list] |
| Exploration | [list] | [list] |

Check: Is strategic getting attention?

### Avoiding Strategic Drift

Monthly check:
- Are strategic initiatives progressing?
- Have they been deprioritized?
- Is the balance right?

### Long-term vs Short-term Framing

| Decision | Short-term | Long-term |
|----------|------------|-----------|
| [Feature X] | Low impact | Platform value |
| [Feature Y] | High impact | Dead end |

Include long-term view in evaluation.

```

**Symptoms:**
- All tactical, no strategic
- Strategic initiatives keep slipping
- No progress on big bets

---

### [MEDIUM] Features growing beyond original scope

**Situation:** Simple feature becomes complex project

**Why it happens:**
Good ideas added.
Edge cases discovered.
Stakeholders add requirements.


**Solution:**
```
## Scope Control

### Scope Definition Upfront

```
Feature Brief includes:

IN SCOPE:
- [Specific functionality]
- [Specific functionality]

OUT OF SCOPE:
- [Explicitly excluded]
- [Explicitly excluded]

SUCCESS CRITERIA:
- [Measurable outcome]
```

### Scope Change Process

```
When scope addition requested:

1. Assess size (trivial, small, significant)
2. Trivial: PM decides, informs
3. Small: Team discusses impact
4. Significant: Separate initiative or trade-off

Never just add without considering impact.
```

### MVP Discipline

```
For each feature, ask:
- What's the smallest thing that delivers value?
- What can we learn before building more?
- What can we add later if successful?

Version 1 < Version 2 < Version 3
```

### Scope Creep Signals

| Signal | Response |
|--------|----------|
| "While we're here..." | "Separate item, prioritize later" |
| "Just one more thing..." | "What do we cut instead?" |
| "Edge case X..." | "Handle separately if significant" |

### Time-Boxing

Alternative to scope control:
- Fix time (2 weeks)
- Flex scope (build what fits)
- Ship, then iterate

```

**Symptoms:**
- Estimates keep growing
- Just one more thing
- Features never ship

---

## Collaboration

### When to Hand Off

| Trigger | Delegate To | Context |
|---------|-------------|--------|
| `customer research|discovery|interviews` | product-discovery | Need discovery for prioritization |
| `product-market fit|retention` | product-market-fit | Need PMF assessment |
| `product strategy|vision` | product-strategy | Need strategic direction |
| `sprint planning|agile|scrum` | agile-practices | Need agile execution |

### Receives Work From

- **product-discovery**: Evidence for prioritization
- **product-strategy**: Strategic direction
- **product-market-fit**: PMF focus

### Works Well With

- product-discovery
- product-strategy
- product-market-fit
- agile-practices

---

## Get the Full Version

This skill has **automated validations**, **detection patterns**, and **structured handoff triggers** that work with the Spawner orchestrator.

```bash
npx vibeship-spawner-skills install
```

Full skill path: `~/.spawner/skills/product/feature-prioritization/`

**Includes:**
- `skill.yaml` - Structured skill definition
- `sharp-edges.yaml` - Machine-parseable gotchas with detection patterns
- `validations.yaml` - Automated code checks
- `collaboration.yaml` - Handoff triggers for skill orchestration

---

*Generated by [VibeShip Spawner](https://github.com/vibeforge1111/vibeship-spawner-skills)*
