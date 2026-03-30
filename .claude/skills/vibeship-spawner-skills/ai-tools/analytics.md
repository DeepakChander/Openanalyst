# Analytics AI Tools

> Master the AI-powered analytics tools that help you understand users,
make data-driven decisions, and grow your business intelligently.
From product analytics to natural language data analysis.


**Category:** ai-tools | **Version:** 1.0.0

**Tags:** analytics, product, data, metrics, dashboards, business-intelligence

---

## Patterns

### Event naming taxonomy
Use Object_Action pattern consistently

### Track properties, not events
Use event properties for variants

### Define metrics before building
Know your north star and supporting metrics first

### Use cohorts for comparison
Always compare segments, not just totals

### Set up anomaly alerts
Get notified when metrics deviate


## Anti-Patterns

### Tracking everything
Adding every possible event

### No naming convention
Random event names across team

### Vanity metrics focus
Celebrating page views and signups

### Ignoring funnels
Only looking at end conversion

### No user identity
Not connecting anonymous to logged-in users


## Sharp Edges (Gotchas)

*Real production issues that cause outages and bugs.*

### [HIGH] Event volume can explode and burn your budget

**Situation:** Tracking events in loops, high-frequency actions, or client-side spam

**Why it happens:**
Every event counts against your quota. Common traps:
- Tracking scroll events without throttling
- Events firing in loops (forEach with tracking)
- Bots and scrapers triggering events
- Duplicate tracking from multiple SDKs

A single bug can 10x your volume overnight.


**Solution:**
```
1. Throttle high-frequency events (scroll, resize, mousemove)
2. Use server-side tracking for critical events
3. Set up volume alerts at 70% of quota
4. Review tracking weekly for anomalies
5. Filter bot traffic (use user-agent filtering)

```javascript
// Bad: Fires on every scroll
window.onscroll = () => track('Scrolled');

// Good: Throttled scroll tracking
const throttledTrack = throttle(() => track('Scrolled'), 5000);
window.onscroll = throttledTrack;
```

```

**Symptoms:**
- Hit monthly limit mid-month
- Unexpected billing spike
- Event volume 10x overnight

---

### [HIGH] Same user appears as multiple users

**Situation:** Users tracked before and after login aren't connected

**Why it happens:**
Anonymous visitors get a device ID. After login, they get a user ID.
If you don't properly merge these, one person = two users.

This inflates user counts, breaks funnels, and makes retention
metrics meaningless.


**Solution:**
```
1. Call identify() IMMEDIATELY on login
2. Call identify() before any post-login events
3. Test identity merge in staging environment
4. Audit user counts vs auth system counts

```javascript
// On successful login
async function onLogin(user) {
  // FIRST: Identify the user (merges anonymous)
  analytics.identify(user.id, {
    email: user.email,
    name: user.name
  });

  // THEN: Track the login event
  analytics.track('User_Logged_In');
}
```

```

**Symptoms:**
- User count >> actual registered users
- Funnels show impossible drop-offs
- Same person appears multiple times

---

### [MEDIUM] Can't analyze events you didn't track

**Situation:** Need to analyze something from 3 months ago that wasn't tracked

**Why it happens:**
Unlike Heap (which auto-captures), most tools only have data for
events you explicitly track. If you didn't track "Feature_Used"
from launch, you have no historical data.


**Solution:**
```
1. Start tracking early, even if imperfect
2. Use Heap if you're unsure what to track
3. Plan tracking spec BEFORE feature launches
4. Track generic events with properties for flexibility

```javascript
// Flexible: Can filter by feature later
track('Feature_Used', {
  feature_name: 'dark_mode',
  feature_version: '2.0'
});

// Inflexible: Stuck with this specific event
track('Dark_Mode_Used');
```

```

**Symptoms:**
- No data for important features
- Can't answer exec questions about history
- Feature launched without tracking

---

### [HIGH] Making decisions on statistically insignificant data

**Situation:** A/B test shows 15% lift... with 50 users per variant

**Why it happens:**
Small sample sizes produce random noise that looks like signal.
A "15% improvement" might just be chance if n=50.

Most analytics tools don't warn you about significance.


**Solution:**
```
1. Wait for statistical significance (p < 0.05)
2. Use sample size calculators before tests
3. Run experiments for minimum 1-2 weeks
4. Don't peek at results daily (peeking bias)
5. Use tools with built-in significance (Amplitude Experiment)

Rule of thumb: Need ~1,000 conversions per variant for
reliable results on conversion rate changes.

```

**Symptoms:**
- Test results flip-flop daily
- Launched 'winning' variant that didn't perform
- Can't reproduce experiment results

---

### [MEDIUM] Amplitude MTU pricing is confusing

**Situation:** Bill higher than expected on Amplitude

**Why it happens:**
Amplitude charges by Monthly Tracked Users (MTU), not events.
But understanding what counts as a "user" is tricky:
- Anonymous visitors count
- Each device = separate user until identified
- Test/dev traffic counts too


**Solution:**
```
1. Filter out dev/test environments
2. Identify users early to reduce anonymous MTU
3. Monitor MTU in Amplitude dashboard
4. Consider server-side tracking for known users only

```

**Symptoms:**
- MTU count >> actual users
- Unexpected billing

---

### [LOW] Mixpanel real-time isn't always real-time

**Situation:** Events not showing up immediately

**Why it happens:**
Mixpanel batches events and processes them. During high volume,
there can be 5-30 minute delays. Not ideal for real-time debugging.


**Solution:**
```
1. Use Live View for debugging (separate real-time stream)
2. Don't panic if events are delayed
3. For real-time needs, consider PostHog

```

**Symptoms:**
- Just triggered event, not in dashboard
- Counts don't match between views

---

### [MEDIUM] Self-hosted PostHog requires DevOps commitment

**Situation:** Chose self-hosted for privacy, now it's a maintenance burden

**Why it happens:**
Self-hosting PostHog means:
- You manage upgrades
- You handle scaling
- You're responsible for backups
- ClickHouse can be resource-hungry


**Solution:**
```
1. Use PostHog Cloud unless you MUST self-host
2. If self-hosting, use their Helm charts
3. Plan for 16GB+ RAM minimum
4. Set up monitoring and alerts

```

**Symptoms:**
- PostHog slow or crashing
- Missed important upgrades
- Data loss from failed backups

---

### [MEDIUM] Heap auto-capture creates overwhelming noise

**Situation:** So much data that useful insights are buried

**Why it happens:**
Heap captures EVERYTHING by default. Every click, every input,
every page view. Great for retroactive analysis, terrible for
finding signal in noise.


**Solution:**
```
1. Create Virtual Events for important actions
2. Use Heap's event visualizer to define key events
3. Build dashboards with curated metrics
4. Don't try to analyze raw auto-captured data

```

**Symptoms:**
- Analysis takes forever
- Can't find relevant events
- Dashboards are cluttered

---

### [MEDIUM] Julius AI can misinterpret your data

**Situation:** AI gives confident but wrong analysis

**Why it happens:**
Julius uses LLMs to interpret queries. It can:
- Misunderstand column meanings
- Apply wrong calculations
- Give confident wrong answers
- Miss context humans would catch


**Solution:**
```
1. Always verify key numbers manually
2. Be specific in your queries
3. Check the generated code/SQL
4. Don't use for financial reporting without verification

```

**Symptoms:**
- Numbers don't match other sources
- Analysis seems off but AI is confident

---

### [MEDIUM] Same event tracked multiple times

**Situation:** Using Segment + direct SDK = double counting

**Why it happens:**
Common setup mistakes:
- Segment AND direct Amplitude SDK both tracking
- Multiple GTM tags firing same event
- Server-side AND client-side both sending


**Solution:**
```
1. Audit all tracking sources
2. Use ONE source of truth (Segment recommended)
3. Disable direct SDKs if using Segment
4. Document your tracking architecture

```

**Symptoms:**
- Event counts 2x expected
- Funnels show >100% conversion

---

## Collaboration

---

## Get the Full Version

This skill has **automated validations**, **detection patterns**, and **structured handoff triggers** that work with the Spawner orchestrator.

```bash
npx vibeship-spawner-skills install
```

Full skill path: `~/.spawner/skills/ai-tools/analytics/`

**Includes:**
- `skill.yaml` - Structured skill definition
- `sharp-edges.yaml` - Machine-parseable gotchas with detection patterns
- `validations.yaml` - Automated code checks
- `collaboration.yaml` - Handoff triggers for skill orchestration

---

*Generated by [VibeShip Spawner](https://github.com/vibeforge1111/vibeship-spawner-skills)*
