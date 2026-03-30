# Gamification Loops

> Expert in gamification mechanics - points, badges, streaks, progress bars, and the psychology
that makes them work. Covers variable reward systems, progress mechanics, social competition,
and ethical considerations. Knows how to create engagement without manipulation.


**Category:** creative | **Version:** 1.0.0

---

## Identity

[object Object]

## Expertise Areas

- Points systems
- Badge design
- Streak mechanics
- Progress bars
- Leaderboards
- Achievement systems
- Variable rewards
- Engagement loops

## Patterns

### Core Loop Design
The fundamental engagement cycle
```
## Core Loop Framework

### 1. The Engagement Loop

```
     ┌─────────────┐
     │   TRIGGER   │ (Internal or external)
     └──────┬──────┘
            │
            ▼
     ┌─────────────┐
     │   ACTION    │ (User does something)
     └──────┬──────┘
            │
            ▼
     ┌─────────────┐
     │   REWARD    │ (Variable is best)
     └──────┬──────┘
            │
            ▼
     ┌─────────────┐
     │ INVESTMENT  │ (User puts in effort)
     └──────┬──────┘
            │
            └──────────────────────┐
                                   │
                   ┌───────────────▼───────────────┐
                   │ Creates value, loads trigger  │
                   └───────────────────────────────┘
```

### 2. Loop Types

| Loop Type | Frequency | Example |
|-----------|-----------|---------|
| Session | Minutes | Complete level |
| Daily | Daily | Login bonus, streaks |
| Weekly | Weekly | Weekly challenge |
| Long-term | Months | Mastery progression |

### 3. Trigger Design

| Trigger Type | Description | Example |
|--------------|-------------|---------|
| External | Push/notification | "You have 3 new rewards" |
| Internal | User's own thought | "I wonder if I leveled up" |
| Scheduled | Time-based | Daily reset |
| Social | Friend activity | "Alex just passed you" |

### 4. Healthy Loop Criteria

```
Check each loop:

□ Does action have intrinsic value?
□ Does user benefit beyond the reward?
□ Can user disengage without penalty?
□ Is frequency sustainable?
□ Does it respect user's time?
```

```

### Progress Systems
Making advancement visible and satisfying
```
## Progress Design

### 1. Progress Types

| Type | Best For | Pitfall |
|------|----------|---------|
| Linear | Clear skill building | Can feel grinding |
| Branching | Multiple paths | Overwhelming |
| Emergent | Skill discovery | Hard to track |
| Social | Competition | Demotivating |

### 2. Progress Bar Psychology

```
Progress bar principles:

1. ENDOWED PROGRESS
   Start at 20%, not 0%
   "You're already on your way!"

2. NEAR-COMPLETION
   Last 10% feels longest
   Add encouragement

3. VARIABLE PACING
   Early wins = fast progress
   Later = meaningful progress

4. VISUAL SATISFACTION
   Filling animation
   Celebratory completion
```

### 3. Level System Design

| Curve Type | Experience | Use Case |
|------------|------------|----------|
| Linear | Same per level | Short progression |
| Exponential | Increasing | Long progression |
| S-curve | Slow-fast-slow | Natural mastery |

### 4. Milestone Moments

```
Design milestones that:

- Mark meaningful progress
- Unlock new capabilities
- Celebrate achievement
- Create share moments
- Set new goals
```

```

### Reward Systems
What users get and when
```
## Reward Design

### 1. Reward Types

| Type | Motivation | Sustainability |
|------|------------|----------------|
| Intrinsic | Internal satisfaction | High |
| Extrinsic | External validation | Lower |
| Social | Status/recognition | Medium |
| Tangible | Real-world value | Low |

### 2. Variable Reward Schedule

```
Fixed rewards get boring.
Variable rewards create anticipation.

VARIABLE RATIO
Reward after variable # of actions
Most engaging, most addictive

VARIABLE INTERVAL
Reward after variable time
Keeps checking behavior

FIXED RATIO
Reward after X actions
Predictable, less engaging

FIXED INTERVAL
Reward at set times
Least engaging
```

### 3. Reward Calibration

| Effort Required | Reward Size |
|-----------------|-------------|
| Low | Small, frequent |
| Medium | Medium, regular |
| High | Large, rare |
| Very high | Unique, legendary |

### 4. The Reward Decay Problem

```
Rewards lose impact over time.

Solutions:
- Evolving rewards (new types)
- Increasing stakes (rarity)
- Social layer (showing off)
- Real utility (actual value)
```

```

### Streak Mechanics
Building habits through consistency
```
## Streak Design

### 1. Streak Psychology

```
Why streaks work:

LOSS AVERSION
- Losing streak hurts more than gaining
- Creates commitment

SUNK COST
- "I've come this far"
- Increases investment

IDENTITY
- "I'm a person who..."
- Self-image reinforcement
```

### 2. Streak Protection

| Protection Type | When | Trade-off |
|-----------------|------|-----------|
| Freeze | User requests | Preserves value |
| Grace period | Auto-applied | Forgiveness |
| Repair | After break | Second chance |
| Weekend pause | Scheduled | Life-friendly |

### 3. Healthy Streak Design

```
Ethical streak patterns:

DO:
- Allow freezes
- Weekend flexibility
- Reasonable daily ask
- Clear value to user

DON'T:
- Punish harshly
- Require excessive time
- Make life suffer
- Create anxiety
```

### 4. Beyond Daily Streaks

| Streak Type | Use Case |
|-------------|----------|
| Daily | Habit building |
| Weekly | Sustainable goals |
| Monthly | Long-term tracking |
| Action-based | Behavior chains |

```


## Anti-Patterns

### Dark Pattern Gamification
Manipulation disguised as engagement
**Why it's bad:** Erodes trust.
Regulatory risk.
User resentment.


### Overjustification
External rewards killing intrinsic motivation
**Why it's bad:** Users stop enjoying activity.
Only do for reward.
Engagement drops when rewards stop.


### Demotivating Leaderboards
Competition that discourages majority
**Why it's bad:** Top 10% motivated.
Bottom 90% demotivated.
Many give up entirely.



## Sharp Edges (Gotchas)

*Real production issues that cause outages and bugs.*

### [HIGH] Creating harmful addiction instead of healthy engagement

**Situation:** Gamification that users can't put down even when they want to

**Why it happens:**
Metrics look great.
Users feel trapped.
Long-term backlash.


**Solution:**
```
## Ethical Engagement Design

### Addiction vs Engagement

| Addiction | Healthy Engagement |
|-----------|-------------------|
| Feel trapped | Feel empowered |
| Guilt when stopping | Satisfaction when done |
| Compulsive | Intentional |
| Escape reality | Enhance reality |
| Regret after | Pride after |

### Design Checks

```
For each mechanic, ask:

1. Can user stop without penalty?
2. Does user feel good after using?
3. Does this respect user's time?
4. Would I want my family using this?
5. Are we transparent about mechanics?
```

### Healthy Design Patterns

| Pattern | Implementation |
|---------|----------------|
| Session limits | "Take a break?" |
| Completion points | Natural stopping points |
| Time transparency | "You've been here X min" |
| Goal completion | Finite daily goals |
| Off-ramps | Easy to disengage |

### Red Line Mechanics

```
Never use:

- Punishment for not engaging
- FOMO for basic features
- Hidden addiction mechanics
- Infinite scrolling rewards
- Guilt-based retention
```

```

**Symptoms:**
- Users complain about time spent
- Usage patterns show compulsion
- Negative user reviews about "addiction"

---

### [MEDIUM] Users gaming the system instead of engaging genuinely

**Situation:** Gamification rewards wrong behaviors

**Why it happens:**
Reward what you measure.
Users optimize for rewards.
Intended behavior ignored.


**Solution:**
```
## Anti-Gaming Design

### Common Gaming Patterns

| Mechanic | Gaming Behavior |
|----------|-----------------|
| Points for posts | Spam posts |
| Badge for comments | Low-effort comments |
| Streak for login | Login without engaging |
| Leaderboard | Bot/alt accounts |

### Prevention Strategies

```
1. MEASURE OUTCOMES, NOT ACTIONS
   - Quality, not quantity
   - Impact, not activity
   - Completion, not starts

2. DELAYED REWARDS
   - Time before counting
   - Verification period
   - Quality checks

3. SOCIAL VALIDATION
   - Peer-dependent rewards
   - Community moderation
   - Reputation weighting
```

### Reward Design Principles

| Instead of | Try |
|------------|-----|
| Points per action | Points for value created |
| Badge for doing | Badge for achieving |
| Streak for showing up | Streak for meaningful engagement |

### Detection and Response

```
Monitor for:
- Sudden behavior changes
- Minimum viable actions
- Bot-like patterns
- Reward-only engagement

Response:
- Adjust mechanics
- Add quality gates
- Remove gameable elements
```

```

**Symptoms:**
- Low quality increases
- Obvious gaming patterns
- Engagement without value

---

### [HIGH] External rewards destroying internal motivation

**Situation:** Users who loved activity now only do it for rewards

**Why it happens:**
Psychology is real.
Overjustification effect.
Can't easily reverse.


**Solution:**
```
## Protecting Intrinsic Motivation

### The Overjustification Effect

```
What happens:

Before rewards: "I do this because I enjoy it"
After rewards: "I do this for the points"
Remove rewards: "Why would I do this?"

External rewards can PERMANENTLY
reduce intrinsic motivation.
```

### When Rewards Help vs Hurt

| Situation | Reward Impact |
|-----------|---------------|
| Boring task | Helps |
| Already enjoyed | Hurts |
| Building habit | Helps initially |
| Creative work | Usually hurts |
| Social good | Mixed |

### Safe Reward Patterns

```
Rewards that don't crowd out:

INFORMATIONAL
- Feedback on performance
- Skill indication
- Progress visibility

UNEXPECTED
- Surprise bonuses
- Random appreciation
- Not contingent on action

SOCIAL
- Recognition from peers
- Community status
- Shared achievements
```

### Recovery Strategies

| If motivation crowded | Response |
|-----------------------|----------|
| Early detection | Reduce reward salience |
| Moderate | Shift to informational |
| Severe | Remove rewards entirely |

```

**Symptoms:**
- Only engage for rewards
- Stop when rewards stop
- Why should I if no points?

---

### [MEDIUM] Competition that discourages instead of motivates

**Situation:** Leaderboard demotivates majority of users

**Why it happens:**
Only top benefits.
Rest feels hopeless.
Creates two classes.


**Solution:**
```
## Healthy Competition Design

### The Leaderboard Problem

```
Standard leaderboard:

Top 10%: Motivated (winners)
Next 20%: Somewhat motivated
Middle 40%: Indifferent
Bottom 30%: Demotivated (give up)

Net effect often NEGATIVE.
```

### Alternative Competition Models

| Model | How It Works |
|-------|--------------|
| Personal best | Compete with yourself |
| Cohort | Compete with similar skill |
| Team | Compete as groups |
| Time-limited | Fresh starts regularly |
| Opt-in | Only those who want |

### Healthy Competition Patterns

```
1. TIERED LEAGUES
   - Compete with equals
   - Promotion/relegation
   - Everyone can "win"

2. RELATIVE PROGRESS
   - "You improved X%"
   - "Better than last week"
   - Personal focus

3. COLLABORATIVE COMPETITION
   - Team achievements
   - Community goals
   - Shared wins
```

### Implementation

| Feature | Purpose |
|---------|---------|
| Hide full rankings | Reduce comparison |
| Show nearby | Achievable goals |
| Regular resets | Fresh chances |
| Opt-out option | Respect preference |

```

**Symptoms:**
- Low-ranked users disengage
- Same people always win
- Complaints about fairness

---

## Collaboration

### When to Hand Off

| Trigger | Delegate To | Context |
|---------|-------------|--------|
| `easter egg|hidden|secret` | easter-egg-design | Need easter egg design |
| `community|social|together` | community-led-growth | Need community strategy |
| `viral|sharing|spread` | viral-hooks | Need viral strategy |
| `retention|habit|daily` | product-led-growth | Need PLG strategy |

### Receives Work From

- **product-led-growth**: PLG context for gamification
- **community-led-growth**: Community context for gamification
- **easter-egg-design**: Surprise elements for gamification

### Works Well With

- easter-egg-design
- dopamine-design
- community-led-growth
- product-led-growth

---

## Get the Full Version

This skill has **automated validations**, **detection patterns**, and **structured handoff triggers** that work with the Spawner orchestrator.

```bash
npx vibeship-spawner-skills install
```

Full skill path: `~/.spawner/skills/creative/gamification-loops/`

**Includes:**
- `skill.yaml` - Structured skill definition
- `sharp-edges.yaml` - Machine-parseable gotchas with detection patterns
- `validations.yaml` - Automated code checks
- `collaboration.yaml` - Handoff triggers for skill orchestration

---

*Generated by [VibeShip Spawner](https://github.com/vibeforge1111/vibeship-spawner-skills)*
