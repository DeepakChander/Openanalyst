# Demo Day Theater

> Expert in presenting technical work to non-technical audiences. Covers
demo preparation, storytelling for demos, handling failures gracefully,
and making work visible and impressive. Understands that perception is
reality and great work undemoed is invisible work.


**Category:** creative | **Version:** 1.0.0

---

## Identity

[object Object]

## Expertise Areas

- Demo preparation
- Technical storytelling
- Failure recovery
- Stakeholder demos
- Progress visualization
- Work visibility
- Presentation flow

## Patterns

### The Demo Arc
Structuring demos for maximum impact
```
## Demo Story Arc

### 1. The Structure

```
SETUP (30 seconds)
"Before, users had to..."
[Show the pain]

TENSION (30 seconds)
"We solved this by..."
[Brief explanation]

PAYOFF (60 seconds)
"Now watch..."
[The magic moment]

IMPACT (30 seconds)
"This means..."
[Business value]
```

### 2. Timing Guide

| Segment | Time | Purpose |
|---------|------|---------|
| Hook | 10 sec | Grab attention |
| Problem | 20 sec | Create empathy |
| Solution | 20 sec | Build anticipation |
| Demo | 60 sec | Deliver payoff |
| Impact | 20 sec | Cement value |
| Q&A | Variable | Address concerns |

### 3. The Golden Rule

```
TOTAL DEMO TIME: 3-5 minutes max

Attention drops after 5 minutes.
Say less, show more.
Leave them wanting more.
```

### 4. Multiple Features

| Number | Approach |
|--------|----------|
| 1-2 | Full arc each |
| 3-5 | Brief setup, focus on payoff |
| 5+ | Pick top 3, mention rest |

```

### The Safety Net
Preparing for demo failures
```
## Demo Insurance

### 1. The Demo Environment

```
NEVER demo on:
- Production (can break)
- Shared dev (others' changes)
- Your local (machine issues)

ALWAYS demo on:
- Dedicated demo environment
- Known good state
- Pre-tested data
```

### 2. Backup Layers

| Layer | Backup |
|-------|--------|
| Live demo | Recorded video |
| Network calls | Cached responses |
| Database | Pre-seeded data |
| Environment | Screenshots |

### 3. Pre-Demo Checklist

```
□ Run full demo twice successfully
□ Test on presentation machine
□ Check network/VPN
□ Clear notifications
□ Close unrelated tabs
□ Have backup ready
□ Know the failure pivot
```

### 4. The Failure Pivot

| When... | Say... | Do... |
|---------|--------|-------|
| Loading slow | "While this loads, let me explain..." | Talk through the value |
| Error appears | "Interesting! Let me show you another way..." | Switch to backup |
| Complete fail | "Here's a recording from earlier..." | Play video backup |

```

### Audience Translation
Adapting demos for different audiences
```
## Speaking Their Language

### 1. Audience Types

| Audience | Care About | Avoid |
|----------|------------|-------|
| Executives | Business impact | Technical details |
| Product | User experience | Code complexity |
| Sales | Demo-ability | Edge cases |
| Engineers | How it works | Simplification |

### 2. Translation Table

| Technical | Executive Version |
|-----------|-------------------|
| "Reduced latency by 200ms" | "Feels instant now" |
| "Refactored the auth system" | "Login is now reliable" |
| "Implemented caching layer" | "Pages load in half the time" |
| "Fixed race condition" | "No more weird errors" |

### 3. The "So What" Test

```
For every feature:

"We built X"
"So what?"
"It means Y for users"
"So what?"
"It saves/makes/enables Z"

Present Z, mention X.
```

### 4. Visual Emphasis

| Show | Don't Show |
|------|------------|
| Before/after | Code diffs |
| User flow | Architecture |
| Metrics improved | Technical logs |
| Happy path | Edge cases |

```

### Making Work Visible
Showing progress when nothing is demoable
```
## Invisible Work Made Visible

### 1. The Iceberg Problem

```
What stakeholders see:
┌───────────────────┐
│ Features (10%)    │  ← "What did you do?"
├───────────────────┤
│ Infrastructure    │
│ Testing           │
│ Security          │  ← 90% of work
│ Performance       │
│ Refactoring       │
└───────────────────┘
```

### 2. Visualization Techniques

| Invisible Work | Make Visible |
|----------------|--------------|
| Performance | Before/after graphs |
| Reliability | Uptime metrics |
| Technical debt | Deployment frequency |
| Refactoring | Code coverage change |
| Security | Vulnerability count |

### 3. The Proxy Demo

```
CAN'T DEMO THE WORK?
Demo the EFFECT:

"We refactored auth"
→ Demo: "Adding login took 1 day instead of 2 weeks"

"We improved infrastructure"
→ Demo: "Deploy went from 30min to 3min"
```

### 4. Progress Artifacts

| Artifact | Shows |
|----------|-------|
| Dashboard | Health metrics |
| Diagram | Architecture improvement |
| Timeline | Delivery velocity |
| Comparison | Before/after |

```


## Anti-Patterns

### The Feature Dump
Showing everything without narrative
**Why it's bad:** Overwhelming.
Nothing stands out.
Forgotten immediately.


### The Technical Deep Dive
Explaining implementation to executives
**Why it's bad:** Wrong audience.
Loses attention.
Misses impact.


### The Live Coding Demo
Writing code during a demo
**Why it's bad:** High risk.
Slow for audience.
Typos = embarrassment.



## Sharp Edges (Gotchas)

*Real production issues that cause outages and bugs.*

### [HIGH] Demo fails catastrophically in front of stakeholders

**Situation:** Everything breaks during the presentation

**Why it happens:**
No backup prepared.
Demoed on unstable environment.
Didn't test the demo itself.


**Solution:**
```
## Recovering From Demo Disasters

### Prevention (Before)

```
THE DEMO REHEARSAL:

1. Run full demo 3 times
2. On actual presentation machine
3. In actual demo environment
4. With actual network conditions
5. Time it

If it fails in rehearsal, it WILL fail live.
```

### Layered Backups

| Layer | What | When to use |
|-------|------|-------------|
| 1 | Second try | Quick network glitch |
| 2 | Recorded video | Persistent issue |
| 3 | Screenshots | Video won't play |
| 4 | Verbal walkthrough | All tech fails |

### In-the-Moment Recovery

```
WHEN IT FAILS:

1. Don't panic (they're watching your reaction)
2. Acknowledge briefly: "Let me try something"
3. Pivot within 10 seconds
4. "Let me show you a recording of this working"
5. Continue with confidence
```

### The Pivot Lines

| Situation | Say |
|-----------|-----|
| Loading forever | "While this is being slow, let me explain what you'd see..." |
| Error message | "Interesting! Here's a backup view..." |
| Complete crash | "Technology, right? Let me show you this video instead." |
| Nothing works | "Let me walk you through what this does..." |

```

**Symptoms:**
- Error messages on screen
- Audience watching you struggle
- Losing credibility
- Demo derailed

---

### [MEDIUM] Demo pitched at wrong level for audience

**Situation:** Executives glazed over, or engineers bored

**Why it happens:**
One-size-fits-all demo.
Didn't research audience.
Presented what's interesting to you.


**Solution:**
```
## Audience Calibration

### Know Your Audience

| Question | Why |
|----------|-----|
| Who's in the room? | Titles, roles |
| What do they care about? | Goals, pressures |
| What's their context? | What they know already |
| What will they do after? | Decision they'll make |

### Audience Profiles

| Type | Focus On | Avoid |
|------|----------|-------|
| CEO | Bottom line, strategic impact | Technical details |
| VP Product | User value, market fit | Implementation |
| Engineering Lead | Architecture, quality | Business metrics |
| Sales | Can they sell it | Complexity |

### Real-Time Calibration

```
READ THE ROOM:

Glazed eyes → Go higher level
Nodding, leaning in → You're landing
Checking phones → Speed up, get to payoff
Questions → Engage, adjust
```

### The Escape Hatch

| If... | Then... |
|-------|---------|
| Too technical | "The bottom line is..." |
| Too high-level | "Under the hood, this means..." |
| Losing them | "The key takeaway is..." |
| Confused looks | "Let me show you what I mean..." |

```

**Symptoms:**
- Blank stares
- Wrong questions
- Can you dumb it down
- Can you go deeper

---

### [MEDIUM] Good work doesn't get recognized

**Situation:** Doing great work but nobody knows

**Why it happens:**
Work isn't demoable.
No visibility strategy.
"Work speaks for itself" myth.


**Solution:**
```
## Making Work Visible

### The Visibility Problem

```
REALITY:
- 90% of engineering is invisible
- Stakeholders see features, not foundations
- Undemoable ≠ unimportant

BUT:
- Invisible work gets no credit
- No credit = no support
- No support = no resources
```

### Visibility Strategies

| Work Type | Make Visible |
|-----------|--------------|
| Performance | Graphs before/after |
| Reliability | Uptime dashboard |
| Security | Risk reduction metrics |
| Tech debt | Velocity improvement |
| Refactoring | Time-to-feature change |

### The Proxy Demo

```
CAN'T SHOW THE THING?
Show the IMPACT:

"We rebuilt the deploy pipeline"
DEMO: "Watch: I push code and it's live in 2 minutes"
       "Before: This took 30 minutes"

"We improved database performance"
DEMO: Graph showing response time drop
      "Users now wait 100ms, not 3 seconds"
```

### Regular Visibility

| Cadence | What |
|---------|------|
| Weekly | Slack update with metrics |
| Sprint | Demo anything visual |
| Monthly | Impact report |
| Quarterly | Before/after presentation |

```

**Symptoms:**
- What has your team been doing?
- Skepticism about progress
- Undervalued work
- Resource cuts

---

### [MEDIUM] Demo grows to show everything

**Situation:** 5-minute demo becomes 30-minute tour

**Why it happens:**
Want to show all the work.
Fear of leaving things out.
No editing discipline.


**Solution:**
```
## Demo Scope Control

### The Editing Rule

```
RULE:
Cut your demo in half.
Then cut it in half again.

What's left is your demo.
```

### Time Limits

| Audience | Max Time |
|----------|----------|
| Executives | 5 minutes |
| Stakeholders | 10 minutes |
| Team | 15 minutes |
| Deep dive | 30 minutes (rare) |

### Feature Prioritization

| Show | Mention | Skip |
|------|---------|------|
| New + impactful | New + minor | Maintenance |
| Visual + exciting | Behind-scenes | Edge cases |
| Requested | Supporting | Technical debt |

### The "One More Thing" Trap

```
RESIST:
"And also we did..."
"Oh and I should mention..."
"Let me quickly show..."

INSTEAD:
End on a high note.
Leave them wanting more.
"I'll share more details in follow-up"
```

```

**Symptoms:**
- Demo running long
- Audience checking time
- Rushed ending
- No time for Q&A

---

## Collaboration

### When to Hand Off

| Trigger | Delegate To | Context |
|---------|-------------|--------|
| `ship|build|implement` | side-project-shipping | Need to ship something |
| `scope|features|what to build` | scope-creep-defense | Need scope decisions |
| `pitch|investors|funding` | pitch-narrative | Need pitch approach |

### Receives Work From

- **side-project-shipping**: Shipped features to demo
- **scope-creep-defense**: Demo-able scope
- **pitch-narrative**: Pitch structure for demos

### Works Well With

- side-project-shipping
- scope-creep-defense
- pitch-narrative

---

## Get the Full Version

This skill has **automated validations**, **detection patterns**, and **structured handoff triggers** that work with the Spawner orchestrator.

```bash
npx vibeship-spawner-skills install
```

Full skill path: `~/.spawner/skills/creative/demo-day-theater/`

**Includes:**
- `skill.yaml` - Structured skill definition
- `sharp-edges.yaml` - Machine-parseable gotchas with detection patterns
- `validations.yaml` - Automated code checks
- `collaboration.yaml` - Handoff triggers for skill orchestration

---

*Generated by [VibeShip Spawner](https://github.com/vibeforge1111/vibeship-spawner-skills)*
