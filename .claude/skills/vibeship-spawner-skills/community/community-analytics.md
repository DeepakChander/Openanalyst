# Community Analytics

> Expert in measuring what matters in communities. Covers health metrics,
engagement analytics, sentiment analysis, cohort tracking, and reporting.
Knows that good data drives good decisions, and bad metrics drive bad behavior.


**Category:** community | **Version:** 1.0.0

---

## Identity

[object Object]

## Expertise Areas

- Community health metrics
- Engagement analytics
- Sentiment analysis
- Cohort and retention tracking
- Member journey analytics
- Reporting and dashboards
- Tool integration for data

## Patterns

### Community Health Score
Composite metric for overall community health
```
## Community Health Score (0-100)

### Components
| Metric | Weight | What It Measures |
|--------|--------|------------------|
| Activity | 25% | DAU/MAU ratio |
| Engagement | 25% | Depth of participation |
| Retention | 25% | Members coming back |
| Sentiment | 25% | How members feel |

### Scoring
```
Activity Score (0-25):
- < 10% DAU/MAU = 5
- 10-20% = 10
- 20-30% = 15
- 30-40% = 20
- > 40% = 25

Engagement Score (0-25):
- Based on posts per active member
- Conversation depth (replies)
- Contribution diversity

Retention Score (0-25):
- Week 1: 50%+ = 10
- Month 1: 30%+ = 10
- Month 3: 20%+ = 5

Sentiment Score (0-25):
- Survey/NPS based
- Sentiment analysis of messages
- Support ticket trends
```

### Interpretation
| Score | Status | Action |
|-------|--------|--------|
| 80+ | Thriving | Maintain, scale |
| 60-80 | Healthy | Optimize weak areas |
| 40-60 | At risk | Intervention needed |
| < 40 | Critical | Major changes required |

```

### Engagement Metrics Framework
Comprehensive engagement measurement
```
## Engagement Metrics

### Core Metrics
| Metric | Definition | Target |
|--------|------------|--------|
| DAU | Unique active/day | Track trend |
| WAU | Unique active/week | Track trend |
| MAU | Unique active/month | Track trend |
| DAU/MAU | Stickiness ratio | 20-40% |
| Messages/DAU | Activity depth | 3-10 |

### Engagement Levels
```
LURKER → REACTOR → COMMENTER → CONTRIBUTOR → CREATOR
```

Track distribution across levels:
- Lurkers: View only (target: < 60%)
- Reactors: Likes/emoji (target: > 20%)
- Commenters: Reply to others (target: > 10%)
- Contributors: Start discussions (target: > 5%)
- Creators: Create value content (target: > 2%)

### Engagement Quality
- Thread depth (avg replies per post)
- Cross-pollination (members in multiple channels)
- Return conversations (member replied back)

```

### Retention Analysis
Tracking member retention by cohort
```
## Cohort Retention Analysis

### Retention Table
```
Cohort    | D1   | D7   | D14  | D30  | D60  | D90
Jan W1    | 80%  | 50%  | 40%  | 30%  | 25%  | 20%
Jan W2    | 75%  | 45%  | 35%  | 28%  | ...  | ...
Jan W3    | 82%  | 52%  | 42%  | ...  | ...  | ...
```

### Benchmarks
| Period | Good | Great | World Class |
|--------|------|-------|-------------|
| D1 | 60% | 75% | 85% |
| D7 | 40% | 50% | 60% |
| D30 | 25% | 35% | 45% |
| D90 | 15% | 25% | 35% |

### Churn Analysis
- When do members leave? (day X cliff)
- Why do they leave? (exit surveys)
- Who leaves? (segment analysis)
- What predicts churn? (behavioral signals)

```


## Anti-Patterns

### Vanity Dashboard
Tracking metrics that look good but don't matter
**Why it's bad:** Big numbers feel good, hide problems.
Wrong metrics drive wrong behavior.
Miss actual issues.


### Data Without Action
Collecting data but not using it
**Why it's bad:** Wasted effort collecting.
False sense of being data-driven.
Data grows stale and irrelevant.



## Sharp Edges (Gotchas)

*Real production issues that cause outages and bugs.*

### [HIGH] Optimizing for wrong metrics

**Situation:** Growing member count while health declines

**Why it happens:**
Easy metrics are often wrong metrics.
Leadership asks for simple numbers.
Growth is visible, health is not.


**Solution:**
```
## Avoiding Vanity Metrics

### Vanity vs Value
| Vanity | Value |
|--------|-------|
| Total members | Active members |
| Total messages | Conversations |
| Page views | Time engaged |
| Followers | Engagement rate |

### Reporting Balance
Always pair growth with health:
- "500 new members, 45% week-1 retention"
- "10K messages, 3.2 avg thread depth"
- "20K followers, 5% engagement rate"

### Executive Dashboard
- Lead with health, not just growth
- Show trends, not just snapshots
- Include qualitative alongside quantitative

```

**Symptoms:**
- Big numbers, declining engagement
- Leadership happy, team worried
- Can't explain business value

---

### [MEDIUM] Too much data, no decisions

**Situation:** Drowning in dashboards but not acting

**Why it happens:**
Collecting everything possible.
No clear questions driving analysis.
Fear of missing something.


**Solution:**
```
## From Data to Decision

### Question-First Analytics
1. What decision are we making?
2. What data would inform it?
3. Collect only that data
4. Make the decision

### Metrics Hierarchy
- North Star: 1 metric (health score)
- Primary: 3-5 metrics (activity, retention, sentiment)
- Secondary: 10-15 supporting metrics
- Diagnostic: As needed for investigation

### Regular Pruning
- Quarterly: What metrics did we not use?
- Delete unused dashboards
- Simplify reports

```

**Symptoms:**
- 20+ dashboards
- Reports nobody reads
- What should we look at?
- No action from data

---

### [MEDIUM] Ignoring qualitative sentiment

**Situation:** Metrics look good but members unhappy

**Why it happens:**
Quantitative is easier to track.
Sentiment requires interpretation.
Numbers feel more objective.


**Solution:**
```
## Capturing Sentiment

### Sentiment Sources
| Source | Frequency | Method |
|--------|-----------|--------|
| NPS survey | Quarterly | Scale 1-10 |
| Pulse checks | Monthly | Quick emoji vote |
| Exit interviews | On churn | 1:1 or form |
| Message analysis | Continuous | AI sentiment |

### Warning Signs
- Negative tone increasing
- Complaints in messages
- Less enthusiasm over time
- "It's not like it used to be"

### Integrating Sentiment
- Include in health score
- Qualitative in reports
- Regular member conversations

```

**Symptoms:**
- Surprise churn
- Everything seemed fine
- Negative feedback blindsides
- Community feels off

---

## Collaboration

### When to Hand Off

| Trigger | Delegate To | Context |
|---------|-------------|--------|
| `strategy|goals|planning` | community-strategy | What should we measure? |
| `operations|action|improve` | community-operations | Acting on analytics |
| `growth|acquisition|engagement` | community-growth | Growth optimization from data |
| `tools|dashboard|integration` | community-tooling | Analytics tooling |

### Receives Work From

- **community-strategy**: Strategic goals to measure
- **community-tooling**: Data from community tools

### Works Well With

- community-strategy
- community-operations
- community-growth
- community-tooling

---

## Get the Full Version

This skill has **automated validations**, **detection patterns**, and **structured handoff triggers** that work with the Spawner orchestrator.

```bash
npx vibeship-spawner-skills install
```

Full skill path: `~/.spawner/skills/community/community-analytics/`

**Includes:**
- `skill.yaml` - Structured skill definition
- `sharp-edges.yaml` - Machine-parseable gotchas with detection patterns
- `validations.yaml` - Automated code checks
- `collaboration.yaml` - Handoff triggers for skill orchestration

---

*Generated by [VibeShip Spawner](https://github.com/vibeforge1111/vibeship-spawner-skills)*
