# Scope Creep Defense

> Expert in protecting projects from scope creep. Covers requirement management,
stakeholder negotiation, saying no diplomatically, and keeping projects
focused. Understands that scope creep kills more projects than technical debt.


**Category:** creative | **Version:** 1.0.0

---

## Identity

[object Object]

## Expertise Areas

- Scope management
- Requirement filtering
- Stakeholder negotiation
- Feature prioritization
- Project boundaries
- Change control
- MVP definition

## Patterns

### The Scope Lock
Defining and protecting project boundaries
```
## Scope Lock Framework

### 1. The Scope Document

```markdown
# Project Scope: [Name]

## In Scope
- [Specific deliverable 1]
- [Specific deliverable 2]
- [Specific deliverable 3]

## Out of Scope
- [Explicitly excluded 1]
- [Explicitly excluded 2]
- [Explicitly excluded 3]

## Success Criteria
- [How we know we're done]

## Change Process
- All scope changes require [approval]
- Trade-offs must be identified
```

### 2. Boundary Markers

| Include | Exclude |
|---------|---------|
| Core value prop | Nice-to-haves |
| Must-have for MVP | Can wait |
| Unblocks users | Delights users |
| This release | Future release |

### 3. Scope Audit

```
For each requirement:

□ Is this in the scope doc?
□ Does this enable core value?
□ Could we ship without it?
□ What gets pushed if we add it?
```

### 4. Lock Maintenance

| Trigger | Action |
|---------|--------|
| New request | Check against scope |
| "Small addition" | Apply same rigor |
| Pressure | Reference scope doc |
| Real need found | Formal change request |

```

### The Diplomatic No
Declining requests without burning bridges
```
## Saying No Gracefully

### 1. The No Template

```
"I understand why you want [X], it would [benefit].

Right now, we're focused on [current scope] because
[reason]. Adding [X] would mean [trade-off].

Could we [alternative]?"
```

### 2. No Variations

| Type | Response |
|------|----------|
| Not now | "Let's add it to the backlog for after [milestone]" |
| Not this | "What if we solved [underlying need] with [simpler solution]?" |
| Not ever | "This conflicts with [principle]. Here's what we could do instead." |
| Not us | "This might be better handled by [other team/tool]" |

### 3. The Trade-Off Frame

```
INSTEAD OF:
"No, we can't add that"

SAY:
"We can add that. What should we remove to make room?"
"If we add X, Y will slip by two weeks. Is that OK?"
```

### 4. Request Reframing

| What they say | What they need |
|---------------|----------------|
| "Add export to Excel" | Get data out somehow |
| "Build mobile app" | Access on the go |
| "Add user roles" | Some access control |
| "Integrate with X" | Data in one place |

```

### Priority Triage
Ruthlessly prioritizing requirements
```
## Priority Triage

### 1. The MoSCoW Method

| Priority | Meaning |
|----------|---------|
| Must | Ship fails without it |
| Should | Important but survivable |
| Could | Nice to have |
| Won't | Not this release |

### 2. The Value/Effort Matrix

```
          HIGH VALUE
              │
  QUICK WINS  │  BIG BETS
  (Do first)  │  (Plan carefully)
──────────────┼──────────────
  FILL-INS    │  MONEY PITS
  (If time)   │  (Avoid)
              │
          LOW VALUE
    LOW EFFORT ───── HIGH EFFORT
```

### 3. The Stack Rank

```
Force rank ALL requirements:

1. [Most important]
2. [Second most]
3. [Third most]
...
n. [Least important]

Draw the line: "Above = in, Below = out"

NO TIES ALLOWED.
```

### 4. The Cut Test

| Question | If No |
|----------|-------|
| Does this enable core value? | Cut it |
| Would users notice if missing? | Cut it |
| Is this blocking other work? | Cut it |
| Is this commitment (legal, etc.)? | Keep it |

```

### Change Control
Managing scope changes formally
```
## Change Control Process

### 1. Change Request Form

```markdown
## Change Request

**Requested by:** [Name]
**Date:** [Date]

**Change Description:**
[What specifically is being requested]

**Justification:**
[Why this is needed NOW]

**Impact if NOT done:**
[What happens without it]

**Trade-off Accepted:**
[What will slip/be cut]

**Approval:** [ ] Approved [ ] Denied
```

### 2. Impact Assessment

| Factor | Assessment |
|--------|------------|
| Timeline impact | + [X] days/weeks |
| Resource impact | [Who] diverted from [what] |
| Quality impact | [What gets less attention] |
| Scope trade-off | [What gets cut] |

### 3. Approval Levels

| Change Size | Approver |
|-------------|----------|
| Tiny (< 1 day) | Tech lead |
| Small (1-3 days) | PM + Tech lead |
| Medium (1-2 weeks) | Director |
| Large (> 2 weeks) | Stakeholder committee |

### 4. Communication

```
WHEN APPROVED:

"We're adding [X]. This means:
 - [Y] will be delayed by [Z]
 - Or [A] will be cut from this release

 This is documented in [link]."
```

```


## Anti-Patterns

### The Yes Man
Agreeing to everything
**Why it's bad:** Nothing gets done well.
Team burns out.
Project never ships.


### The Kitchen Sink
Trying to include everything
**Why it's bad:** Scope becomes unmanageable.
Quality suffers.
Nothing is great.


### The Moving Target
Constantly shifting requirements
**Why it's bad:** Team can't make progress.
Rework wastes effort.
Morale tanks.



## Sharp Edges (Gotchas)

*Real production issues that cause outages and bugs.*

*Sharp edges documented in full version.*

## Collaboration

### When to Hand Off

| Trigger | Delegate To | Context |
|---------|-------------|--------|
| `ship|launch|mvp` | side-project-shipping | Need shipping focus |
| `tech debt|engineering capacity` | tech-debt-negotiation | Technical constraints discussion |
| `demo|present|show` | demo-day-theater | Demo preparation |

### Receives Work From

- **side-project-shipping**: MVP scope definition
- **tech-debt-negotiation**: Technical capacity constraints
- **demo-day-theater**: Demo requirements

### Works Well With

- side-project-shipping
- tech-debt-negotiation
- demo-day-theater

---

## Get the Full Version

This skill has **automated validations**, **detection patterns**, and **structured handoff triggers** that work with the Spawner orchestrator.

```bash
npx vibeship-spawner-skills install
```

Full skill path: `~/.spawner/skills/creative/scope-creep-defense/`

**Includes:**
- `skill.yaml` - Structured skill definition
- `sharp-edges.yaml` - Machine-parseable gotchas with detection patterns
- `validations.yaml` - Automated code checks
- `collaboration.yaml` - Handoff triggers for skill orchestration

---

*Generated by [VibeShip Spawner](https://github.com/vibeforge1111/vibeship-spawner-skills)*
