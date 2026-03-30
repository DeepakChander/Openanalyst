# Sales AI Tools

> Master the AI tools that supercharge your sales process.
From prospecting to closing, automate the grind and focus
on building relationships that convert.


**Category:** ai-tools | **Version:** 1.0.0

**Tags:** sales, crm, outreach, prospecting, leads, automation

---

## Patterns

### Waterfall enrichment
Use multiple data sources in sequence for best coverage

### Multi-channel sequences
Combine email, LinkedIn, calls in one sequence

### Signal-based outreach
Trigger outreach on buying signals

### Account-based campaigns
Coordinate outreach across account stakeholders

### CRM as single source of truth
All activity, data, and insights flow to CRM


## Anti-Patterns

### Spray and pray
Blasting generic emails to huge lists

### Too many tools
Different tool for every function

### Ignoring deliverability
Sending cold email without warmup

### No activity tracking
Failing to log calls, emails, meetings

### Buying data without process
Purchasing ZoomInfo without knowing how to use it


## Sharp Edges (Gotchas)

*Real production issues that cause outages and bugs.*

### [CRITICAL] Cold email can destroy your domain reputation permanently

**Situation:** Sending cold emails from main company domain

**Why it happens:**
If your main domain gets blacklisted:
- All company email goes to spam
- Very hard to recover (months)
- Affects customer communication too
- Some blacklists are permanent

This is the #1 cold email mistake.


**Solution:**
```
1. NEVER use main domain for cold outreach
2. Buy separate domains (variant names)
3. Warm up domains for 2-3 weeks before sending
4. Monitor deliverability metrics
5. Use dedicated cold email infrastructure

```
# Bad:
john@company.com sending cold

# Good:
john@trycompany.io (separate, warmed domain)
```

```

**Symptoms:**
- Reply rates suddenly drop
- Emails bouncing
- Marketing emails going to spam

---

### [HIGH] Purchased lists often contain spam traps

**Situation:** Buying or scraping email lists and blasting them

**Why it happens:**
ESP providers and anti-spam companies plant fake emails:
- Spam traps look like real addresses
- Hitting them = instant blacklist
- No legit person would email these
- Even big data providers have some

One spam trap can end your outreach program.


**Solution:**
```
1. Always verify emails before sending
2. Use verification tools (NeverBounce, ZeroBounce)
3. Start with small test sends
4. Remove bounces immediately
5. Don't email anyone who hasn't engaged in 6+ months

```

**Symptoms:**
- Sudden blacklisting
- ESP account suspended
- Deliverability crashes overnight

---

### [HIGH] LinkedIn aggressively bans automation

**Situation:** Using LinkedIn automation at scale

**Why it happens:**
LinkedIn detects and bans automation:
- Browser fingerprinting
- Activity pattern detection
- API monitoring
- Connection request limits

Losing your LinkedIn profile = losing your network.


**Solution:**
```
1. Stay under daily limits (20-30 connections/day)
2. Use tools that mimic human behavior
3. Randomize activity patterns
4. Don't run automation 24/7
5. Use Sales Navigator for higher limits
6. Consider LinkedIn premium accounts

```

**Symptoms:**
- Connection requests restricted
- Account temporarily suspended
- Profile banned permanently

---

### [HIGH] B2B data decays 30-40% per year

**Situation:** Treating data as accurate without verification

**Why it happens:**
People change jobs constantly:
- 30-40% of B2B data stale within a year
- Direct dials change even faster
- Company data (size, tech) changes
- Even "fresh" data can be months old

Sending to bad data = bounces = reputation damage.


**Solution:**
```
1. Verify emails before major campaigns
2. Look for job change signals
3. Re-verify data older than 3-6 months
4. Use waterfall enrichment (multiple sources)
5. Remove bounces immediately

```

**Symptoms:**
- High bounce rates (>3%)
- Wrong person replies
- Job titles don't match

---

### [MEDIUM] Enrichment credits can burn faster than expected

**Situation:** Running enrichment on large lists without budgeting

**Why it happens:**
Credits add up quickly:
- Each enrichment field = credits
- Waterfall tries multiple sources
- Re-enrichment doubles cost
- "Just checking" burns credits too

Easy to 10x your expected spend.


**Solution:**
```
1. Budget credits per campaign upfront
2. Pre-filter lists before enrichment
3. Only enrich fields you actually use
4. Set up credit alerts at 50%, 75%
5. Audit credit usage weekly

```

**Symptoms:**
- Hit credit limit mid-month
- Unexpected overage charges
- Can't enrich at end of month

---

### [HIGH] Bad CRM data makes AI useless

**Situation:** Expecting AI insights from messy CRM

**Why it happens:**
AI tools rely on CRM data:
- Forecasting needs accurate stages
- Scoring needs consistent properties
- Analytics needs complete records
- Garbage in = garbage out

AI can't fix fundamental data problems.


**Solution:**
```
1. Establish data entry standards
2. Use required fields at stage changes
3. Audit data quality monthly
4. Auto-populate from reliable sources
5. Clean duplicates regularly
6. Train team on data hygiene

```

**Symptoms:**
- AI predictions wildly wrong
- Can't trust dashboards
- Duplicate records everywhere

---

### [HIGH] Salesforce becomes a black box without admin

**Situation:** Implementing Salesforce without dedicated admin

**Why it happens:**
Salesforce is infinitely configurable:
- Custom objects, fields, automations
- Complex permission structures
- Integrations break without maintenance
- Tribal knowledge accumulates

When your "Salesforce person" leaves, chaos ensues.


**Solution:**
```
1. Document all customizations
2. Have backup admin knowledge
3. Consider managed services
4. Keep customization minimal
5. Use standard objects when possible
6. Regular admin training

```

**Symptoms:**
- Nobody knows how it works
- Integrations randomly break
- Can't change workflows

---

### [HIGH] Call recording raises privacy and legal issues

**Situation:** Recording calls without proper consent

**Why it happens:**
Recording laws vary:
- Two-party consent states (California, etc.)
- GDPR requirements in EU
- Some countries prohibit entirely
- Customer pushback

Violations can mean lawsuits and fines.


**Solution:**
```
1. Know laws for every jurisdiction you sell into
2. Get explicit consent on every call
3. Add to meeting invites/scripts
4. Allow opt-out gracefully
5. Consult legal before rollout

```

**Symptoms:**
- Customer complaints
- Legal threats
- Deals killed by recording

---

### [MEDIUM] AI-generated emails all sound the same

**Situation:** Using AI email suggestions without editing

**Why it happens:**
AI email tools train on similar data:
- Same patterns, phrases, structures
- Prospects see same AI emails daily
- Detection skills improving
- "AI voice" becoming recognizable

If everyone uses same AI, no one stands out.


**Solution:**
```
1. Use AI for drafts, not final copy
2. Inject specific research/personalization
3. Develop your own voice
4. Customize AI suggestions heavily
5. A/B test AI vs human-written

```

**Symptoms:**
- Low reply rates
- Prospects mention 'AI email'
- Sound like every other SDR

---

### [MEDIUM] Too much call data, not enough action

**Situation:** Having all the insights but not changing behavior

**Why it happens:**
Gong shows everything:
- Every call recorded
- Hundreds of metrics
- Dozens of talk tracks
- Weekly report emails

Information overload leads to paralysis.


**Solution:**
```
1. Pick 2-3 metrics to focus on
2. Create clear coaching workflows
3. Schedule regular review sessions
4. Connect insights to specific actions
5. Don't try to boil the ocean

```

**Symptoms:**
- Gong mostly unused
- No behavior change
- Expensive shelfware

---

## Collaboration

---

## Get the Full Version

This skill has **automated validations**, **detection patterns**, and **structured handoff triggers** that work with the Spawner orchestrator.

```bash
npx vibeship-spawner-skills install
```

Full skill path: `~/.spawner/skills/ai-tools/sales/`

**Includes:**
- `skill.yaml` - Structured skill definition
- `sharp-edges.yaml` - Machine-parseable gotchas with detection patterns
- `validations.yaml` - Automated code checks
- `collaboration.yaml` - Handoff triggers for skill orchestration

---

*Generated by [VibeShip Spawner](https://github.com/vibeforge1111/vibeship-spawner-skills)*
