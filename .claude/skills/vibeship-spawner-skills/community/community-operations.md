# Community Operations

> Expert in running the day-to-day operations of thriving communities. Covers
moderation systems, onboarding flows, crisis management, scaling operations,
and team management. The engine room that keeps communities healthy and safe.


**Category:** community | **Version:** 1.0.0

---

## Identity

[object Object]

## Expertise Areas

- Day-to-day community management
- Moderation systems and policies
- Member onboarding flows
- Crisis and incident response
- Community team management
- Scaling operations
- Trust and safety

## Patterns

### Moderation Framework
Comprehensive moderation system design
```
## Moderation System Design

### Moderation Tiers
| Level | Action | Who | Response Time |
|-------|--------|-----|---------------|
| 1 | Spam, obvious violations | Automod/bots | Instant |
| 2 | Minor violations | Junior mods | < 1 hour |
| 3 | Serious violations | Senior mods | < 4 hours |
| 4 | Bans, legal issues | Lead/Admin | < 24 hours |

### Escalation Path
```
Automod → Junior Mod → Senior Mod → Lead → Admin → Legal
```

### Moderation Actions
| Severity | First Offense | Second | Third |
|----------|---------------|--------|-------|
| Minor | Warning | 24h mute | 7d mute |
| Moderate | 24h mute | 7d ban | Permanent |
| Severe | 7d ban | Permanent | Report to platform |
| Critical | Immediate ban | N/A | N/A |

### Documentation Required
- Screenshot of violation
- Rule violated
- Action taken
- Mod who took action
- Appeals process communicated

```

### Onboarding Flow Design
First-time member experience
```
## Member Onboarding

### The First 5 Minutes
```
JOIN → WELCOME → RULES → INTRO → FIRST VALUE → FIRST CONNECTION
```

### Onboarding Checklist
- [ ] Automated welcome message (immediate)
- [ ] Rules acknowledgment (before access)
- [ ] Self-introduction prompt (guided)
- [ ] Channel orientation (where to go)
- [ ] First quick win (value in < 5 min)
- [ ] Human connection (staff or member reply)

### Welcome Message Template
```
Hey [name]! Welcome to [community]!

Quick start:
1. Introduce yourself in #introductions
2. Check out #start-here for orientation
3. Ask questions in #help

Our values: [brief values]

Need anything? Ping @community-team
```

### Tracking Onboarding Success
| Metric | Target | How to Measure |
|--------|--------|----------------|
| Intro completion | 60%+ | Posted in intros |
| First message | 40%+ | Any message in 48h |
| First week return | 50%+ | Active day 7 |
| First value | < 5 min | Time to first reply |

```

### Crisis Response Protocol
Handling community incidents and crises
```
## Crisis Response Framework

### Crisis Levels
| Level | Example | Response |
|-------|---------|----------|
| 1 | Heated argument | Mod intervention |
| 2 | Harassment report | Senior mod, documentation |
| 3 | Coordinated attack | All hands, lockdown option |
| 4 | Legal/safety threat | Leadership, legal, platform |

### Immediate Actions (First 15 Minutes)
1. Assess severity level
2. Document everything (screenshots)
3. Contain if possible (mute, slow mode)
4. Alert appropriate team members
5. Do NOT engage emotionally

### Communication Template
```
Team - we have a Level [X] situation:

What happened: [brief factual summary]
Current status: [contained/ongoing]
Immediate needs: [what help needed]
Next steps: [planned actions]

Thread for updates: [link]
```

### Post-Crisis
- Incident report within 24h
- Team debrief within 48h
- Process improvements identified
- Community update if needed
- Support for affected members

```

### Scaling Operations
Growing ops without burning out
```
## Scaling Framework

### Team Structure by Size
| Community Size | Team Structure |
|----------------|----------------|
| 0-500 | 1 community manager |
| 500-2K | CM + 2-3 volunteer mods |
| 2K-10K | CM + mod lead + 5-10 mods |
| 10K-50K | Community team + regional mods |
| 50K+ | Full community org |

### Automation Priorities
| Automate First | Keep Human |
|----------------|------------|
| Spam filtering | Appeals |
| Welcome messages | Introductions |
| FAQ responses | Complex questions |
| Role assignment | Culture enforcement |
| Metrics collection | Relationship building |

### Mod Team Management
- Clear roles and responsibilities
- Regular syncs (weekly minimum)
- Recognition and appreciation
- Burnout monitoring
- Growth paths (mod → senior → lead)

```


## Anti-Patterns

### Mod Burnout Factory
Overworking volunteer moderators
**Why it's bad:** Volunteers have limits. Burned out mods quit or become toxic.
No recognition leads to resentment. Inconsistent coverage hurts community.


### Rule Lawyer Moderation
Applying rules without context or empathy
**Why it's bad:** Communities are human, not courtrooms.
Technically correct but emotionally wrong damages trust.
Members feel policed, not supported.


### Invisible Until Crisis
Mods only visible when enforcing rules
**Why it's bad:** Members see mods as police, not community members.
No relationship built before conflict.
Enforcement feels punitive, not protective.



## Sharp Edges (Gotchas)

*Real production issues that cause outages and bugs.*

### [HIGH] Moderator burnout from overwork

**Situation:** Volunteer mods working too many hours, becoming exhausted

**Why it happens:**
No shift limits or rotation.
Same people handling all crises.
No recognition or appreciation.
Emotional toll of moderation.


**Solution:**
```
## Preventing Mod Burnout

### Shift System
| Role | Max Hours/Week | Shift Length |
|------|----------------|--------------|
| Volunteer mod | 10 hours | 2-4 hour blocks |
| Senior mod | 15 hours | Flexible |
| Lead mod | 20 hours | Or paid |

### Rotation Practices
- No one handles all crises
- Rotate difficult channels
- Mandatory breaks after incidents
- Coverage calendar visible to all

### Recognition Program
- Monthly mod appreciation
- Public thank-yous
- Exclusive perks/access
- Growth opportunities

### Mental Health
- Check-ins after hard incidents
- Permission to step back
- Peer support channels
- Resources available

```

**Symptoms:**
- Mods going quiet
- Inconsistent coverage
- Irritable responses
- High mod turnover

---

### [MEDIUM] Different mods enforce rules differently

**Situation:** Members confused by inconsistent rule enforcement

**Why it happens:**
No mod handbook.
Rules open to interpretation.
No calibration between mods.
New mods not trained.


**Solution:**
```
## Moderation Consistency

### Create Mod Handbook
- Every rule with examples
- Clear escalation paths
- Decision trees for common situations
- Edge case documentation

### Calibration Sessions
- Monthly case reviews
- "What would you do?" exercises
- Share reasoning, not just decisions
- Update handbook from learnings

### Decision Logging
- Log all significant decisions
- Include reasoning
- Review for patterns
- Use for training

```

**Symptoms:**
- But [mod] let someone else do that
- Member confusion
- Mod disagreements
- Appeals citing inconsistency

---

### [MEDIUM] New members disappear after joining

**Situation:** High join rate but low retention in first week

**Why it happens:**
No immediate value delivery.
Overwhelming or confusing experience.
No human connection made.
Didn't find their place.


**Solution:**
```
## Fixing Onboarding Drop-off

### First Hour Checklist
- [ ] Welcome within 5 minutes
- [ ] Clear next step provided
- [ ] Quick win available
- [ ] Human replied to intro

### Onboarding Tracking
| Cohort | Day 1 | Day 7 | Day 30 |
|--------|-------|-------|--------|
| Target | 100%  | 50%   | 30%    |
| Actual | Track | Track | Track  |

### Recovery Tactics
- Day 3 check-in if no activity
- "We noticed you joined..." DM
- Ask what they're looking for
- Personal invitation to specific channel

```

**Symptoms:**
- High join, low activity
- Empty introductions
- I don't know where to start
- Week 1 churn

---

### [HIGH] Small issues become community-wide crises

**Situation:** Minor conflict escalates into major drama

**Why it happens:**
No early intervention.
Public arguments not moved private.
Slow mod response.
Fuel added by engagement.


**Solution:**
```
## Crisis Prevention

### Early Warning Signs
- Heated tone in messages
- Personal attacks starting
- Multiple people piling on
- Cross-channel drama

### Intervention Ladder
1. Gentle redirect in channel
2. Move to private/ticket
3. Temporary cool-down (mute)
4. Formal mediation
5. Escalate to leadership

### Containment Tactics
- Slow mode on affected channels
- Lock thread if needed
- Move discussion to private
- Clear statement if public needed

### Post-Incident
- Address root cause
- Check on affected parties
- Document and learn
- Process improvements

```

**Symptoms:**
- Drama spreading to multiple channels
- Members taking sides
- External attention (Twitter, etc.)
- Mass exits

---

## Collaboration

### When to Hand Off

| Trigger | Delegate To | Context |
|---------|-------------|--------|
| `strategy|vision|culture` | community-strategy | Strategic decisions needed |
| `growth|engagement|acquisition` | community-growth | Growth tactics |
| `discord|server|channels` | discord-mastery | Discord-specific operations |
| `telegram|group` | telegram-mastery | Telegram-specific operations |
| `bots|automation|tools` | community-tooling | Tooling for operations |
| `metrics|analytics|data` | community-analytics | Measurement needs |

### Receives Work From

- **community-strategy**: Strategic direction for operations
- **community-analytics**: Data to inform operations

### Works Well With

- community-strategy
- community-growth
- community-analytics
- community-tooling

---

## Get the Full Version

This skill has **automated validations**, **detection patterns**, and **structured handoff triggers** that work with the Spawner orchestrator.

```bash
npx vibeship-spawner-skills install
```

Full skill path: `~/.spawner/skills/community/community-operations/`

**Includes:**
- `skill.yaml` - Structured skill definition
- `sharp-edges.yaml` - Machine-parseable gotchas with detection patterns
- `validations.yaml` - Automated code checks
- `collaboration.yaml` - Handoff triggers for skill orchestration

---

*Generated by [VibeShip Spawner](https://github.com/vibeforge1111/vibeship-spawner-skills)*
