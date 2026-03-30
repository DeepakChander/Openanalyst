# Incident Postmortem

> Expert in running effective incident postmortems. Covers blameless
analysis, root cause investigation, action item prioritization, and
building a learning culture. Understands that incidents are opportunities
to improve systems, not punish people.


**Category:** creative | **Version:** 1.0.0

---

## Identity

[object Object]

## Expertise Areas

- Incident analysis
- Root cause investigation
- Blameless postmortems
- Action item tracking
- Learning culture
- System improvement
- Incident documentation

## Patterns

### The Blameless Postmortem
Investigating without assigning blame
```
## Blameless Postmortem Process

### 1. The Core Principle

```
BLAMELESS ≠ ACCOUNTABLE-LESS

We hold the SYSTEM accountable.
We don't blame the PERSON.

Because:
- People make mistakes in bad systems
- Blame hides information
- Fear prevents learning
- Systems can be improved, people can't be "fixed"
```

### 2. The Timeline

| Phase | Timing | Focus |
|-------|--------|-------|
| Immediate | During/after | Fix the problem |
| Documentation | 24-48 hours | Capture while fresh |
| Analysis | 2-5 days | Deep investigation |
| Review | 1 week | Share learnings |
| Follow-up | 30 days | Verify actions done |

### 3. The Document Structure

```markdown
# Incident Postmortem: [Title]

**Date:** [When it happened]
**Duration:** [How long]
**Severity:** [Impact level]
**Author:** [Who wrote this]

## Summary
[2-3 sentences: What happened, impact]

## Timeline
[Minute-by-minute during incident]

## Root Cause
[What actually caused this]

## Contributing Factors
[What made it worse/possible]

## What Went Well
[Response successes]

## What Could Be Improved
[Process/system gaps]

## Action Items
[Specific improvements with owners]

## Lessons Learned
[What we learned]
```

### 4. Language Guide

| Instead of... | Say... |
|---------------|--------|
| "John broke production" | "The deploy included a bug that..." |
| "Should have known" | "The system didn't surface..." |
| "Human error" | "Process allowed incorrect..." |
| "Careless mistake" | "Under time pressure..." |

```

### The Five Whys
Getting to root cause, not symptoms
```
## Five Whys Analysis

### 1. The Technique

```
PROBLEM: Production went down

Why? → Server ran out of memory
Why? → Log files grew too large
Why? → Log rotation wasn't configured
Why? → No checklist for new services
Why? → No standard service template

ROOT CAUSE: No standard service template
```

### 2. Rules for Good Whys

| Rule | Why |
|------|-----|
| Stay on one thread | Don't branch too early |
| Ask "why" not "who" | Keeps it blameless |
| Stop at system | People aren't root causes |
| Verify each step | Confirm causation |
| 5 is a guideline | Sometimes 3, sometimes 7 |

### 3. Common Traps

| Trap | Problem | Fix |
|------|---------|-----|
| Stopping too early | "Human error" | Ask why error was possible |
| Too many branches | Analysis paralysis | Focus on main thread |
| Blame creeping in | Hides real causes | Reframe to system |
| Guessing | Wrong conclusions | Verify with evidence |

### 4. Finding Multiple Roots

```
Most incidents have multiple causes:

CONTRIBUTING FACTORS:
- Direct cause (the trigger)
- Enabling factors (why trigger was possible)
- System factors (why not caught earlier)

Address all levels.
```

```

### Effective Action Items
Creating actions that actually prevent recurrence
```
## Action Items That Work

### 1. The SMART Action

```
BAD: "Improve monitoring"
GOOD: "Add memory usage alert at 80%
       threshold for all production
       services by [date], owned by [name]"

SPECIFIC: What exactly
MEASURABLE: How to verify
ASSIGNED: Who owns it
RELEVANT: Prevents recurrence
TIME-BOUND: When by
```

### 2. Action Priority Matrix

| Priority | Criteria |
|----------|----------|
| P1 - Now | Would prevent this exact incident |
| P2 - Soon | Reduces likelihood significantly |
| P3 - Later | General improvement |
| P4 - Backlog | Nice to have |

### 3. Types of Actions

| Type | Example |
|------|---------|
| Detection | Add alert for X condition |
| Prevention | Validate Y before deploy |
| Mitigation | Auto-scale when Z happens |
| Process | Add checklist step for A |
| Documentation | Document how B works |

### 4. Follow-Through

| Check | When |
|-------|------|
| Actions assigned | End of postmortem |
| Progress update | Weekly |
| Completion verification | At deadline |
| Effectiveness review | 30 days later |

```

### The Learning Review
Sharing incident learnings broadly
```
## Spreading the Learning

### 1. The Review Meeting

```
AGENDA (30 min):

1. Context (5 min)
   - What happened, briefly

2. Timeline walkthrough (10 min)
   - Key moments
   - Decision points

3. Root cause discussion (10 min)
   - What we found
   - How it applies elsewhere

4. Actions and questions (5 min)
   - What we're doing
   - Open discussion
```

### 2. Who Should Attend

| Definitely | Maybe | Skip |
|------------|-------|------|
| Responders | Related teams | Unrelated teams |
| System owners | On-call | Executives (unless major) |
| Relevant leads | New team members | |

### 3. Making It Safe

```
MEETING NORMS:

- No blame, only curiosity
- "What" not "who"
- All perspectives valued
- Focus on system improvement
- OK to say "I don't know"
```

### 4. Institutional Learning

| Action | Purpose |
|--------|---------|
| Postmortem database | Learn from history |
| Pattern analysis | Find systemic issues |
| Cross-team sharing | Prevent similar elsewhere |
| Onboarding reading | Teach new members |

```


## Anti-Patterns

### The Blame Game
Focusing on who instead of what
**Why it's bad:** People hide information.
Fear replaces learning.
Same problems recur.


### The Action Item Graveyard
Creating actions that never get done
**Why it's bad:** Same incidents recur.
Postmortems feel pointless.
Trust erodes.


### The Shallow Analysis
Stopping at the first cause found
**Why it's bad:** Misses real issues.
Fixes symptoms, not causes.
Incidents repeat.



## Sharp Edges (Gotchas)

*Real production issues that cause outages and bugs.*

### [HIGH] Postmortems become punishment sessions

**Situation:** People fear postmortems, hide information

**Why it happens:**
Leadership wants accountability.
"Someone must be responsible."
Fear drives hiding.


**Solution:**
```
## Building Blameless Culture

### Signs of Blame Culture

| Sign | Impact |
|------|--------|
| People defensive | Hide information |
| Naming names | Fear of error |
| "Who did this" | Avoid responsibility |
| Consequences for errors | Under-reporting |
| Shame in meetings | Silence |

### Shifting the Culture

```
LEADERSHIP ACTIONS:

1. Model blamelessness
   - Leaders admit their mistakes first
   - Thank people for sharing failures

2. Reward transparency
   - Celebrate finding problems
   - Promote people who surface issues

3. Change the language
   - "What happened" not "who"
   - "System allowed" not "person caused"
```

### The Just Culture Model

| Behavior | Response |
|----------|----------|
| Human error | Console, learn |
| At-risk behavior | Coach, fix system |
| Reckless behavior | Rare, address directly |

### Meeting Facilitation

| If you hear... | Redirect with... |
|----------------|------------------|
| "John broke it" | "What allowed this to happen?" |
| "Should have known" | "What could have surfaced this?" |
| "Careless" | "What pressure led to this?" |
| "Obviously wrong" | "What made it seem right at the time?" |

```

**Symptoms:**
- Quiet postmortem meetings
- Defensive responses
- Under-reporting incidents
- Fear of admitting error

---

### [MEDIUM] Too many postmortems, no action

**Situation:** Team burned out on incident review

**Why it happens:**
Every small thing gets postmortem.
Actions don't get done.
Feels like bureaucracy.


**Solution:**
```
## Sustainable Postmortem Practice

### When to Postmortem

| Criteria | Postmortem? |
|----------|-------------|
| Customer impact | Yes |
| Data loss risk | Yes |
| Near miss (could have been bad) | Yes |
| Novel failure mode | Yes |
| Minor, known issue | No |
| Quick recovery, no impact | Maybe light |

### Tiered Response

| Tier | Criteria | Response |
|------|----------|----------|
| Major | Significant impact | Full postmortem, review meeting |
| Minor | Limited impact | Quick doc, async review |
| Near miss | Caught before impact | Brief analysis, shared learning |

### Completing the Loop

```
THE COMPLETION PROBLEM:

- 100 postmortems written
- 1000 action items created
- 50 action items done
- Same incidents keep happening

FIX:
- Fewer, better actions
- Track completion rate
- Review monthly
- Block next postmortem if actions undone
```

### Keeping It Fresh

| Tactic | Why |
|--------|-----|
| Rotate facilitators | Different perspectives |
| Vary formats | Prevent staleness |
| Celebrate learnings | Positive association |
| Share wins | Show value of process |

```

**Symptoms:**
- Not another postmortem
- Actions never done
- Copy-paste documents
- Going through motions

---

### [HIGH] Analysis stops at obvious cause

**Situation:** Same types of incidents keep recurring

**Why it happens:**
Time pressure.
Obvious answer feels sufficient.
Deeper analysis is hard.


**Solution:**
```
## Getting to Real Root Causes

### The Layers of Cause

```
SURFACE:
"Someone deployed bad code"

DEEPER:
"Tests didn't catch the bug"

DEEPER:
"This code path isn't tested"

DEEPER:
"No requirement for test coverage"

ROOT:
"Culture doesn't prioritize testing"
```

### Signs You Stopped Too Early

| Sign | What to do |
|------|------------|
| "Human error" is the cause | Ask why error was possible |
| One-word cause | Expand to system level |
| Could recur easily | Dig deeper |
| No systemic change | Find the pattern |

### The "Why" Continuation

```
KEEP ASKING:

"Why was that possible?"
"What would have caught that?"
"What pressure led to that?"
"What system allowed that?"
"What would prevent next time?"
```

### Systemic Root Causes

| Surface Cause | System Cause |
|---------------|--------------|
| Wrong config | No validation |
| Missed step | No checklist |
| Slow response | No alerting |
| Wrong decision | Missing context |
| Time pressure | Understaffed |

```

**Symptoms:**
- Recurring incident types
- We fixed this before
- Quick postmortems
- Actions are band-aids

---

### [MEDIUM] Actions look good but don't prevent recurrence

**Situation:** Actions completed but incidents continue

**Why it happens:**
Actions are easy not effective.
No verification of effectiveness.
Box-checking mentality.


**Solution:**
```
## Effective Action Items

### Action Quality Check

| Question | If No |
|----------|-------|
| Does this prevent exact recurrence? | Strengthen it |
| Is this measurable? | Make it specific |
| Can we verify it worked? | Add success criteria |
| Will it actually get done? | Simplify |

### Types of Weak Actions

| Weak | Strong |
|------|--------|
| "Improve monitoring" | "Add X alert with Y threshold" |
| "Be more careful" | "Add validation step that catches X" |
| "Review process" | "Add checklist with specific items" |
| "Train team" | "Runbook for X scenario" |

### Verification Process

```
30 DAYS AFTER COMPLETION:

1. Did the action get done?
2. Is it still in place?
3. Has the problem recurred?
4. Did it create new issues?
5. Is it actually effective?
```

### The Recurrence Test

| If same incident happens | Then |
|--------------------------|------|
| Actions not done | Accountability issue |
| Actions done but failed | Actions were wrong |
| New variation | Pattern to address |

```

**Symptoms:**
- Actions done, incidents continue
- We did everything
- Band-aid solutions
- Checkbox mentality

---

## Collaboration

### When to Hand Off

| Trigger | Delegate To | Context |
|---------|-------------|--------|
| `legacy|old system|archaeology` | legacy-archaeology | Understand failed system |
| `tech debt|should have fixed|known issue` | tech-debt-negotiation | Debt discussion from incident |
| `code change|deploy|pr` | code-review-diplomacy | Review related changes |

### Receives Work From

- **legacy-archaeology**: Understanding systems that failed
- **tech-debt-negotiation**: Debt causing incidents
- **code-review-diplomacy**: Code changes causing incidents

### Works Well With

- legacy-archaeology
- tech-debt-negotiation
- code-review-diplomacy

---

## Get the Full Version

This skill has **automated validations**, **detection patterns**, and **structured handoff triggers** that work with the Spawner orchestrator.

```bash
npx vibeship-spawner-skills install
```

Full skill path: `~/.spawner/skills/creative/incident-postmortem/`

**Includes:**
- `skill.yaml` - Structured skill definition
- `sharp-edges.yaml` - Machine-parseable gotchas with detection patterns
- `validations.yaml` - Automated code checks
- `collaboration.yaml` - Handoff triggers for skill orchestration

---

*Generated by [VibeShip Spawner](https://github.com/vibeforge1111/vibeship-spawner-skills)*
