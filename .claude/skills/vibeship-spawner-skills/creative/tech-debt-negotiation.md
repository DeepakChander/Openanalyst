# Tech Debt Negotiation

> Expert in making the business case for technical debt reduction. Covers
quantifying debt costs, getting stakeholder buy-in, prioritizing what to fix,
and negotiating engineering time for maintenance. Understands how to translate
tech problems into business impact.


**Category:** creative | **Version:** 1.0.0

---

## Identity

[object Object]

## Expertise Areas

- Tech debt quantification
- Stakeholder communication
- Maintenance negotiation
- Debt prioritization
- Engineering time allocation
- Refactoring business cases
- Technical health metrics

## Patterns

### The Debt Inventory
Cataloging and quantifying technical debt
```
## Tech Debt Inventory

### 1. Debt Categories

| Category | Description | Impact Type |
|----------|-------------|-------------|
| Architecture | System design issues | Velocity |
| Code Quality | Messy, hard-to-read code | Velocity |
| Dependencies | Outdated libraries | Security/Velocity |
| Testing | Missing or flaky tests | Quality/Velocity |
| Documentation | Missing or wrong docs | Onboarding/Velocity |
| Infrastructure | Manual processes, old tools | Operations |

### 2. The Debt Card

```
For each debt item:

NAME: [What it is]
CATEGORY: [From above]
AGE: [How long has this existed?]
PAIN FREQUENCY: [How often does it hurt?]
PAIN SEVERITY: [1-5 how much?]
BLAST RADIUS: [Who/what does it affect?]
ESTIMATED FIX: [Time to resolve]
```

### 3. Quick Quantification

| Metric | Question |
|--------|----------|
| Time tax | Hours/week spent on this? |
| Incident rate | Outages caused? |
| Onboarding cost | Days added for new hires? |
| Change risk | Deployments delayed? |
| Team morale | Engineer complaints? |

### 4. Priority Matrix

```
          HIGH PAIN
              │
   FIX NOW    │   FIX SOON
   (Quick win)│   (Plan it)
──────────────┼──────────────
   CONSIDER   │   IGNORE
   (If cheap) │   (Not worth it)
              │
          LOW PAIN
     LOW EFFORT ───── HIGH EFFORT
```

```

### The Business Translation
Converting tech debt to business impact
```
## Speaking Business Language

### 1. Translation Table

| Tech Speak | Business Speak |
|------------|----------------|
| "Bad code" | "Slower feature delivery" |
| "Technical debt" | "Accumulated shortcuts" |
| "Refactoring needed" | "Investment for faster delivery" |
| "Legacy system" | "Aging infrastructure" |
| "Code smell" | "Maintenance overhead" |
| "Spaghetti code" | "Tightly coupled system" |

### 2. The Money Frame

```
Calculate the tax:

MONTHLY DEBT TAX:
- Engineers affected × hours lost × hourly cost
- Incidents × average resolution cost
- Delayed features × opportunity cost

Example:
"This system costs us ~$15K/month in
lost velocity and incident response."
```

### 3. The Risk Frame

| Debt Type | Risk Language |
|-----------|---------------|
| Security debt | "Vulnerability exposure" |
| Scaling debt | "Growth constraints" |
| Quality debt | "Customer-facing defects" |
| Knowledge debt | "Bus factor risk" |

### 4. Before/After Framing

```
DON'T SAY:
"We need to refactor the auth system."

DO SAY:
"Currently: 3 days to add any auth feature
After: 3 hours for same features
Investment: 2 weeks
Payback: 2 months"
```

```

### The Negotiation Playbook
Getting time allocated for debt reduction
```
## Getting Buy-In

### 1. The 20% Principle

```
ASK FOR:
20% of engineering capacity for maintenance

WHY IT WORKS:
- Industry standard (credible)
- Not too scary (negotiable)
- Sustainable (not a "project")
```

### 2. Negotiation Strategies

| Strategy | How |
|----------|-----|
| Bundle it | Include debt work in feature work |
| Tax it | "2 weeks feature + 3 days cleanup" |
| Make it visible | Track "debt time" separately |
| Show the trend | "Velocity dropping, here's why" |
| Pick your battles | Fix high-impact items only |

### 3. Stakeholder Mapping

| Stakeholder | Care About | Frame As |
|-------------|------------|----------|
| CEO | Revenue, costs | ROI, risk reduction |
| Product | Features, speed | Faster delivery |
| CTO | Quality, team | Sustainability |
| Engineering | Morale, craft | Better DX |

### 4. The Velocity Graph Argument

```
      VELOCITY
         │╲
         │ ╲ ← Without maintenance
         │  ╲
         │   ╲___
         │        ╲____
         │              ╲___
         │
─────────┴──────────────────── TIME

      VELOCITY
         │    _______________
         │   /
         │  /  ← With 20% maintenance
         │ /
         │/
         │
─────────┴──────────────────── TIME
```

```

### Strategic Debt Management
Intentionally taking and paying off debt
```
## Debt as Strategy

### 1. Good Debt vs Bad Debt

| Good Debt | Bad Debt |
|-----------|----------|
| Intentional | Accidental |
| Time-boxed | Open-ended |
| Documented | Hidden |
| Has payoff plan | Ignored |
| Enables learning | Just lazy |

### 2. Debt Decision Framework

```
TAKE DEBT IF:
□ Time-sensitive opportunity
□ Learning what to build
□ Know we'll replace it
□ Have payoff plan
□ Team understands trade-off

AVOID DEBT IF:
□ Core system we'll keep
□ Already high debt area
□ No plan to address
□ Team doesn't know
```

### 3. Debt Documentation

| Document | Content |
|----------|---------|
| ADR | "We're taking this shortcut because..." |
| TODO | "DEBT: [reason] - payoff by [date]" |
| Ticket | Create follow-up immediately |
| Tech Radar | Track debt items quarterly |

### 4. Payoff Triggers

| Trigger | Action |
|---------|--------|
| Touching this code | Include cleanup |
| Onboarding new dev | If blocking, prioritize |
| Incident caused by debt | Fast-track fix |
| Quarterly review | Reassess priority |

```


## Anti-Patterns

### The Invisible Burden
Suffering silently without quantifying
**Why it's bad:** What you can't measure, you can't argue for.
Management sees "engineering wants to play."
Never gets prioritized.


### The Big Rewrite Pitch
Asking for months to "fix everything"
**Why it's bad:** Sounds expensive.
Sounds risky.
Usually fails anyway.


### Tech-Only Framing
Explaining debt in pure technical terms
**Why it's bad:** Business doesn't understand.
Sounds like engineer whining.
No urgency created.



## Sharp Edges (Gotchas)

*Real production issues that cause outages and bugs.*

*Sharp edges documented in full version.*

## Collaboration

### When to Hand Off

| Trigger | Delegate To | Context |
|---------|-------------|--------|
| `legacy|old system|archaeology` | legacy-archaeology | Need to understand legacy code |
| `incident|outage|postmortem` | incident-postmortem | Need incident analysis |
| `scope|capacity|planning` | scope-creep-defense | Need scope management |
| `code review|feedback` | code-review-diplomacy | Need review approach |

### Receives Work From

- **legacy-archaeology**: Legacy system analysis for debt assessment
- **incident-postmortem**: Incidents caused by tech debt
- **code-review-diplomacy**: Debt identified in code reviews

### Works Well With

- legacy-archaeology
- scope-creep-defense
- incident-postmortem
- code-review-diplomacy

---

## Get the Full Version

This skill has **automated validations**, **detection patterns**, and **structured handoff triggers** that work with the Spawner orchestrator.

```bash
npx vibeship-spawner-skills install
```

Full skill path: `~/.spawner/skills/creative/tech-debt-negotiation/`

**Includes:**
- `skill.yaml` - Structured skill definition
- `sharp-edges.yaml` - Machine-parseable gotchas with detection patterns
- `validations.yaml` - Automated code checks
- `collaboration.yaml` - Handoff triggers for skill orchestration

---

*Generated by [VibeShip Spawner](https://github.com/vibeforge1111/vibeship-spawner-skills)*
