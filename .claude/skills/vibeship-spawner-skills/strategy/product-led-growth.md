# Product-Led Growth

> Expert in product-led growth (PLG) - the go-to-market strategy where the product itself drives
customer acquisition, activation, conversion, and expansion. Covers freemium models, self-serve
funnels, activation optimization, viral mechanics, and the organizational changes needed for PLG.
Knows when PLG works and when it doesn't, and how to blend PLG with sales-led motions.


**Category:** strategy | **Version:** 1.0.0

---

## Identity

[object Object]

## Expertise Areas

- Freemium model design
- Self-serve funnel optimization
- Activation flow design
- Time-to-value reduction
- Product-qualified leads (PQLs)
- Usage-based pricing
- PLG metrics and analytics
- Expansion revenue mechanics

## Patterns

### Self-Serve Funnel Design
Optimizing the path from visitor to activated user
```
## PLG Funnel Architecture

### 1. The PLG Funnel Stages

```
Visitor → Signup → Setup → Aha Moment → Habit → Paid → Expand
            ↓        ↓        ↓            ↓       ↓       ↓
        [Friction] [Friction] [Value]   [Retention] [Convert] [Grow]
```

### 2. Key Metrics by Stage

| Stage | Metric | Target | Optimization |
|-------|--------|--------|--------------|
| Visit→Signup | Conversion Rate | 2-5% | Landing page, social proof |
| Signup→Setup | Completion Rate | 70-90% | Onboarding flow, progressive |
| Setup→Aha | Activation Rate | 40-60% | Time-to-value, guidance |
| Aha→Habit | Week 1 Retention | 30-50% | Engagement hooks, notifications |
| Habit→Paid | Free→Paid Conv | 2-5% | Paywall placement, value gates |
| Paid→Expand | Net Revenue Ret | 100-120% | Usage growth, seat expansion |

### 3. Signup Optimization

**Remove Friction**
- SSO/OAuth options (Google, GitHub, etc.)
- Minimal required fields
- No email verification before value
- No credit card for free tier

**Add Motivation**
- Clear value proposition above fold
- Social proof (logos, numbers)
- Specific use case messaging
- Immediate value preview

### 4. Setup Optimization

**Progressive Disclosure**
- Only ask what's needed NOW
- Defer optional setup
- Show progress (1 of 3)
- Allow skipping

**Template/Import Magic**
- Pre-built templates
- Import from competitors
- AI-assisted setup
- Clone from team

### 5. Activation Optimization

**Define Your Aha Moment**
- What action correlates with retention?
- When do users "get it"?
- Can you measure it?

Examples:
- Slack: Send 2000 messages as team
- Dropbox: Upload 1 file, access from 2 devices
- Zoom: Complete first meeting

**Reduce Time to Aha**
- Guided tours with real actions
- Pre-populated data/content
- Contextual help
- Success celebrations

```

### Freemium Model Design
Designing the free tier for conversion
```
## Freemium Strategy

### 1. Freemium Types

| Type | What's Limited | Best For |
|------|----------------|----------|
| Feature-limited | Advanced features locked | Clear feature tiers |
| Usage-limited | Volume/quantity caps | Usage-based products |
| Time-limited | Trial period | High-value, complex products |
| Capacity-limited | Seats/users limited | Collaboration tools |
| Hybrid | Combination | Most PLG products |

### 2. What to Include in Free

**MUST Include**
- Core aha moment experience
- Enough to demonstrate value
- Shareable/viral features
- Enough to create habit

**MUST Exclude**
- Features only valuable at scale
- Team/admin features
- Advanced integrations
- SLA/support

### 3. Free-to-Paid Triggers

**Natural Limits**
```
User hits limit → Sees value → Willing to pay

Examples:
- Slack: Message history limit
- Zoom: 40-min meeting limit
- Notion: Guest collaborator limit
```

**Team Expansion**
```
Individual → Invites team → Team needs paid

Examples:
- Figma: Free for individuals, paid for teams
- Linear: Free for small, paid for larger
```

**Enterprise Requirements**
```
Free works → Need SSO/security → Must upgrade

Examples:
- Every PLG tool with Enterprise tier
```

### 4. Paywall Placement

**When to Show Upgrade Prompt**
- At natural friction points
- When user hits limits
- After aha moment achieved
- When team features needed

**How to Show**
- Clear what they get
- Show value already received
- Social proof from upgraders
- Easy path to paid

```

### PQL (Product Qualified Lead) System
Identifying sales-ready users from product usage
```
## PQL Architecture

### 1. What Makes a PQL

```
PQL = Usage Signals + Fit Signals + Intent Signals
```

**Usage Signals (Product Behavior)**
- Activation complete
- High engagement frequency
- Using advanced features
- Growing usage over time

**Fit Signals (Company Match)**
- Company size matches ICP
- Industry/vertical fit
- Tech stack compatibility
- Budget indicators

**Intent Signals (Buying Behavior)**
- Viewed pricing page
- Clicked "Contact Sales"
- Added team members
- Approaching limits

### 2. PQL Scoring Model

| Signal Category | Weight | Example Signals |
|----------------|--------|-----------------|
| Activation | 25% | Completed onboarding, hit aha moment |
| Engagement | 25% | DAU/WAU ratio, feature breadth |
| Growth | 20% | Adding users, increasing usage |
| Fit | 15% | Company size, industry match |
| Intent | 15% | Pricing views, upgrade attempts |

### 3. PQL Tiers

**Tier 1: High-Touch PQLs**
- Score > 80
- Enterprise fit
- Immediate sales outreach
- Personalized demo offer

**Tier 2: Mid-Touch PQLs**
- Score 50-80
- Growth potential
- Automated + human touch
- Self-serve upgrade path

**Tier 3: Low-Touch PQLs**
- Score 30-50
- SMB/individual
- Fully automated nurture
- In-app upgrade prompts

### 4. Sales Handoff

**Context to Provide Sales**
- Specific product usage
- Features used/not used
- Team size and growth
- Engagement trends
- Potential use cases

**Outreach Best Practices**
- Reference actual usage
- Offer value (not just "check in")
- Suggest next steps in product
- Time based on activity

```

### Activation Metric Design
Defining and measuring activation
```
## Activation Metrics

### 1. Finding Your Aha Moment

**Data Analysis Method**
1. Export cohort of retained users (Week 4+)
2. Export cohort of churned users
3. Compare actions taken in Week 1
4. Find actions with highest correlation to retention

**Interview Method**
1. Ask retained users: "When did you know this was for you?"
2. Look for common patterns
3. Translate to measurable action

### 2. Activation Metric Criteria

**Good Activation Metrics**
- Strongly correlated with retention
- Achievable in first session/day
- Measurable automatically
- Something user controls

**Bad Activation Metrics**
- Vanity (just signed up)
- Too easy (no value delivered)
- Too hard (takes weeks)
- Outside user control

### 3. Example Activation Metrics

| Product | Activation Metric | Rationale |
|---------|-------------------|-----------|
| Slack | 2000 team messages | Indicates team adoption |
| Dropbox | File on 2+ devices | Core value demonstrated |
| HubSpot | 1 form submission | Lead capture proven |
| Calendly | 1 meeting booked | Scheduling value shown |
| Notion | 5 pages created | Personal wiki started |

### 4. Activation Funnel Dashboard

```
Activation Funnel (Cohort: Last 7 Days)

Signed Up:        1,000   100%
Completed Setup:    750    75%  ← Onboarding friction
Core Action #1:     500    50%  ← Value confusion
Core Action #2:     300    30%  ← Complexity barrier
Aha Moment:         200    20%  ← TARGET: 40%+

Time to Aha:
- P50: 2.3 days
- P75: 5.1 days
- P90: 11 days
```

```

### PLG Organizational Design
Structuring teams for product-led growth
```
## PLG Organization

### 1. Key PLG Roles

| Role | Focus | Metrics |
|------|-------|---------|
| Growth PM | Acquisition + Activation | Signup→Activated |
| Growth Engineer | Experiments + Instrumentation | Velocity + Impact |
| PLG Marketing | Demand + Content | Signups + MQLs |
| PLG Sales (PLS) | PQL conversion | PQL→Paid, Expansion |
| Rev Ops | Metrics + Tools | Data quality, Automation |

### 2. Team Structures

**Embedded Model**
```
Product Team
└── Growth PM
└── Growth Engineer
└── Designer

Marketing Team
└── PLG Marketing

Sales Team
└── PLS Reps
```

**Growth Pod Model**
```
Growth Pod (cross-functional)
├── Growth PM
├── Growth Engineer
├── PLG Marketing
├── Data Analyst
└── Designer
```

### 3. Metrics Ownership

**Growth Team Owns**
- Visitor → Signup
- Signup → Activated
- Activation Rate
- Time to Value

**Product Team Owns**
- Core product experience
- Feature development
- Retention (post-activation)

**Sales Team Owns**
- PQL conversion
- Enterprise deals
- Expansion revenue

### 4. Common Org Tensions

**Sales vs Self-Serve**
Problem: Sales comp on deals self-serve would win
Solution: Segment by deal size, adjust comp

**Product vs Growth**
Problem: Growth "hacks" vs product quality
Solution: Growth team in product org, shared metrics

**Marketing vs Product**
Problem: Who owns in-product messaging?
Solution: Clear ownership by funnel stage

```


## Anti-Patterns

### Premature PLG
Forcing PLG before product-market fit
**Why it's bad:** PLG amplifies whatever you have.
No PMF = amplifying confusion.
Users churn faster than you can acquire.


### Free-for-Free's Sake
Giving away too much in free tier
**Why it's bad:** Users never need to pay.
Attracts wrong customers.
Revenue suffers.


### Ignoring Activation
Measuring signups but not activation
**Why it's bad:** Signups are vanity metric.
Unactivated users churn.
CAC wasted on churned users.


### PLG Without Data
Doing PLG without instrumentation
**Why it's bad:** Can't find friction points.
Can't identify PQLs.
Can't measure improvements.


### Sales-Led Org Doing PLG
Keeping sales-led comp/process with PLG product
**Why it's bad:** Sales intercepts self-serve deals.
Poor handoff to product.
Metrics conflict.



## Sharp Edges (Gotchas)

*Real production issues that cause outages and bugs.*

### [HIGH] Optimizing for activation metric, not actual value

**Situation:** Activation rate improves but retention doesn't

**Why it happens:**
Teams optimize the metric, not the outcome.
Users complete "activation" without getting value.
Metric becomes vanity, not signal.


**Solution:**
```
## Keeping Activation Meaningful

### Signs Your Metric is Gamed

- Activation up, but Week 4 retention flat
- Users complete activation in < 1 minute
- Activation actions are single-click
- Users don't return after "activating"

### How to Fix

**1. Validate Against Retention**
```
Monthly check:
- Do activated users still retain better?
- Has correlation weakened?
- Time to revisit metric?
```

**2. Use Composite Metrics**
```
Activation Score = (
  Core action completed × 0.3 +
  Returned Day 2 × 0.3 +
  Used 2+ features × 0.2 +
  Time spent > X min × 0.2
)
```

**3. Segment Activation Quality**
- Fast activators vs slow activators
- Compare retention by activation speed
- Sometimes slow = better understanding

### Activation Metric Hygiene

| Check | Frequency | Action |
|-------|-----------|--------|
| Correlation to retention | Monthly | Recalibrate if drifting |
| Time to activate | Weekly | Flag if too fast |
| Post-activation behavior | Weekly | Look for true engagement |

```

**Symptoms:**
- Our activation rate is 80% but retention is 20%
- Users "activate" but don't return
- Activation feels like checkbox completion

---

### [HIGH] Free tier that never converts

**Situation:** Lots of free users, very few paid

**Why it happens:**
Free tier satisfies all needs.
No natural upgrade trigger.
Wrong users attracted (never pay).


**Solution:**
```
## Fixing Overly Generous Free

### Diagnosis

**Calculate Free Economics**
```
Cost to serve free users: $X/month
Free-to-paid conversion: Y%
LTV of converted users: $Z

Payoff: Z × Y% > X ?

Example:
- Cost: $2/user/month × 10,000 users = $20,000
- Conversion: 2% = 200 users
- LTV: $500/user = $100,000
- ROI: $100K / $20K = 5× ✓

If ratio < 3×, free is too generous
```

### Tightening Strategies

**1. Add Usage Limits**
- Cap storage, messages, API calls
- Limit to trigger when value proven
- Example: Slack's 90-day message history

**2. Lock Team Features**
- Free = individual only
- Team features require paid
- Example: Linear's team pricing

**3. Remove Time-Sensitive Features**
- No real-time in free
- Delayed updates/notifications
- Example: Mixpanel's data freshness

**4. Limit Integrations**
- Core product free
- Integrations require upgrade
- Example: Zapier's app limits

### Warning Signs by Stage

| Stage | Healthy | Concerning |
|-------|---------|------------|
| Month 1-3 | High free users | N/A (expected) |
| Month 4-6 | 1-2% converting | < 0.5% converting |
| Month 7+ | Stable 2-5% | Conversion declining |

```

**Symptoms:**
- High free user count, low revenue
- Free users say "this is all I need"
- Paid features unused by converted users

---

### [HIGH] Sales team working against PLG motion

**Situation:** Sales intercepts self-serve deals, damages experience

**Why it happens:**
Sales comp based on any closed deal.
Self-serve would close without sales cost.
Sales outreach annoys self-serve buyers.


**Solution:**
```
## Resolving PLG-Sales Tension

### Root Causes

1. **Comp Misalignment**
   - Sales paid on deals that self-serve would win
   - No incentive to let product sell

2. **Territory Confusion**
   - Who owns which accounts?
   - When does sales engage?

3. **Tool Gaps**
   - Can't see product usage
   - Outreach not informed by behavior

### Solutions by Cause

**1. Comp Redesign**
```
Segment by deal value:
- <$X ARR: Self-serve only (no sales credit)
- $X-$Y ARR: Sales assist (reduced commission)
- >$Y ARR: Sales-led (full commission)

Add bonuses for:
- PQL conversion (not just deals)
- Expansion revenue
- Account health
```

**2. Clear Engagement Rules**
```
Sales engages when:
- User requests contact
- PQL score > threshold
- Enterprise domain detected
- Usage indicates high value

Sales does NOT engage when:
- User happily self-serving
- Small team/individual
- Early in journey
```

**3. Arm Sales with Context**
```
Before outreach, sales sees:
- Features used
- Usage frequency
- Team size
- Specific actions taken

Enables: "I see you've been using X..."
Instead of: "Checking in..."
```

### Metrics to Track

| Metric | Target |
|--------|--------|
| Self-serve % of revenue | Track trend, not specific % |
| Sales-assisted LTV vs self-serve LTV | Sales should be higher |
| PQL → Paid conversion by sales | Should beat self-serve |
| User complaints about sales | Near zero |

```

**Symptoms:**
- Users complain about sales outreach
- Self-serve conversion drops when sales team grows
- Sales taking credit for would-be self-serve deals

---

### [MEDIUM] Product complexity increasing time to value

**Situation:** New features make getting started harder

**Why it happens:**
Features added for power users.
Onboarding not updated.
New user experience degrades.


**Solution:**
```
## Protecting Time to Value

### Measuring TTV

```
Time to Value = Time from signup to aha moment

Track by cohort weekly:
- P50 TTV (median)
- P75 TTV (slower users)
- P90 TTV (struggling users)

Alert if any increases >20%
```

### Common TTV Killers

| Killer | Example | Fix |
|--------|---------|-----|
| Feature bloat | Too many options shown | Progressive disclosure |
| Setup creep | More required config | Defaults + defer |
| Integration deps | "Connect X first" | Work without integration |
| Learning curve | Complex concepts | Templates + guides |

### Protection Strategies

**1. New User Mode**
- Simplified UI for first X days
- Gradually reveal features
- "Advanced" toggle

**2. Template-First**
- Start from template
- Blank slate = advanced
- Pre-populated examples

**3. Feature Gates**
- Power features hidden initially
- Unlocked after activation
- Prevents overwhelm

**4. Continuous Testing**
```
Monthly new user test:
- Fresh account
- Complete activation flow
- Time and count clicks
- Compare to baseline
```

### TTV Dashboard

```
Time to Value Trend

Week    P50     P75     P90
-28     2.1 hr  5.2 hr  24 hr
-21     2.3 hr  5.5 hr  26 hr
-14     2.8 hr  6.1 hr  30 hr  ← Alert
-7      3.2 hr  7.0 hr  35 hr  ← Investigate
Now     3.5 hr  7.5 hr  40 hr  ← Fix needed
```

```

**Symptoms:**
- Activation rate declining
- Users abandoning during setup
- Support tickets about getting started

---

### [MEDIUM] PQL model degrading over time

**Situation:** Sales complains PQLs aren't qualified

**Why it happens:**
Product changes, signals change.
Customer base evolves.
Model not recalibrated.


**Solution:**
```
## Maintaining PQL Model

### Drift Indicators

- PQL → Paid conversion declining
- Sales ignoring PQLs
- False positive rate increasing
- Top PQLs not closing

### Recalibration Process

**Quarterly Review**
```
1. Pull last quarter's PQLs
2. Split: Converted vs Not Converted
3. Analyze signal differences
4. Identify new signals
5. Update model weights
6. Backtest on historical data
```

**Signal Audit**

| Signal | Original Weight | Current Conversion | New Weight |
|--------|-----------------|-------------------|------------|
| Pricing page view | 15% | 8% → 12% | 18% |
| Team invite | 20% | 15% → 10% | 12% |
| Feature X usage | 10% | 5% → 18% | 20% |

### Adding New Signals

**Product Changes**
- New features = new signals
- Removed features = remove signals
- Changed flows = revalidate

**Market Changes**
- New customer segments
- Competitive dynamics
- Pricing changes

### Model Governance

| Cadence | Action |
|---------|--------|
| Weekly | Monitor conversion rate |
| Monthly | Review signal performance |
| Quarterly | Full recalibration |
| Major release | Immediate review |

```

**Symptoms:**
- Sales complaining about lead quality
- PQL conversion rate dropping
- Model hasn't been updated in 6+ months

---

## Collaboration

### When to Hand Off

| Trigger | Delegate To | Context |
|---------|-------------|--------|
| `overall strategy|high-level growth` | growth-strategy | Need strategic growth planning |
| `growth loop|viral mechanics|referral` | growth-loops | Need loop design for PLG amplification |
| `pricing|packaging|monetization` | pricing-strategy | Need pricing aligned with PLG |
| `community|champion|user group` | community-led-growth | Need community layer on PLG |
| `retention|churn|engagement` | product-market-fit | Need retention foundation |

### Receives Work From

- **growth-strategy**: Implementing PLG as growth motion
- **product-market-fit**: Building PLG on PMF foundation
- **pricing-strategy**: Pricing to support PLG

### Works Well With

- growth-loops
- growth-strategy
- pricing-strategy
- onboarding-flows
- product-market-fit

---

## Get the Full Version

This skill has **automated validations**, **detection patterns**, and **structured handoff triggers** that work with the Spawner orchestrator.

```bash
npx vibeship-spawner-skills install
```

Full skill path: `~/.spawner/skills/strategy/product-led-growth/`

**Includes:**
- `skill.yaml` - Structured skill definition
- `sharp-edges.yaml` - Machine-parseable gotchas with detection patterns
- `validations.yaml` - Automated code checks
- `collaboration.yaml` - Handoff triggers for skill orchestration

---

*Generated by [VibeShip Spawner](https://github.com/vibeforge1111/vibeship-spawner-skills)*
