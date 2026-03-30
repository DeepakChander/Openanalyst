# Automation AI Tools

> Master the AI tools that automate repetitive work and connect
your tools. From simple Zapier integrations to complex AI-powered
workflows, reclaim hours every week.


**Category:** ai-tools | **Version:** 1.0.0

**Tags:** automation, workflow, integration, no-code, zapier, make, rpa

---

## Patterns

### Start small, expand
Begin with simple 2-step zaps before complex flows

### Error handling first
Plan for failures before building

### Centralize triggers
One source of truth triggers multiple actions

### Version your automations
Document and version control complex workflows

### Monitor task usage
Track tasks/operations to manage costs


## Anti-Patterns

### Over-automation
Automating everything without considering value

### No error handling
Assuming automations will always work

### Hardcoded values
Putting specific values in automations

### Single point of failure
Critical business process on one automation

### Task explosion
Triggering automations too frequently


## Sharp Edges (Gotchas)

*Real production issues that cause outages and bugs.*

### [CRITICAL] Automation costs can explode unexpectedly

**Situation:** Per-task pricing meets high-volume triggers

**Why it happens:**
Per-task pricing seems cheap until:
- Trigger fires more often than expected
- Loop creates thousands of tasks
- Retry logic multiplies tasks
- Webhook receives spam

One bad automation can burn your monthly quota in hours.


**Solution:**
```
1. Understand exactly what counts as a "task"
2. Add filters BEFORE actions (Zapier) to reduce tasks
3. Set up usage alerts at 50%, 75%, 90%
4. Review task-heavy automations weekly
5. Use n8n or Activepieces for unlimited execution
6. Batch operations where possible

```

**Symptoms:**
- Hit monthly limit mid-month
- Unexpected billing spike
- Automations paused due to quota

---

### [MEDIUM] Each step in Make costs operations

**Situation:** Complex scenarios use more operations than expected

**Why it happens:**
In Make, every module = operations:
- A 10-step scenario = 10 operations per run
- Iterators multiply operations
- Routers add operations
- Error handlers add operations

What looks like 1 automation can be 50+ operations.


**Solution:**
```
1. Count operations before deploying
2. Use aggregators to batch
3. Minimize modules where possible
4. Consider operation limits per scenario
5. Monitor operations dashboard

```

**Symptoms:**
- Operations run out faster than expected
- Simple automation uses many operations

---

### [HIGH] Automations fail silently without notification

**Situation:** Automation breaks but nobody knows

**Why it happens:**
Common failure scenarios:
- API changes without notice
- Auth tokens expire
- Rate limits hit
- Data format changes
- Service downtime

Without monitoring, business processes just stop.


**Solution:**
```
1. Set up error notifications (Slack, email)
2. Monitor key automations dashboard
3. Test regularly (monthly health checks)
4. Have manual fallback processes
5. Use error handling paths

```

**Symptoms:**
- Discover failure days later
- Missing data nobody noticed
- Customer complaints reveal broken automation

---

### [HIGH] Webhook automations break when source changes

**Situation:** Third-party changes webhook format

**Why it happens:**
Webhooks break when:
- Sender updates their API
- Field names change
- Data types change
- New required fields added
- IP addresses change

You don't control the source, so you can't prevent changes.


**Solution:**
```
1. Use official integrations when possible
2. Add validation on incoming data
3. Handle missing fields gracefully
4. Monitor webhook-triggered automations closely
5. Have fallback data sources

```

**Symptoms:**
- Automation suddenly errors
- Fields missing in output
- Wrong data processing

---

### [HIGH] API rate limits break automations at scale

**Situation:** Automation hits API limits during batch operations

**Why it happens:**
Most APIs have rate limits:
- Salesforce: 100K/day
- HubSpot: 100/10 seconds
- Slack: varies by endpoint
- Google: quotas everywhere

Batch processing hits limits fast.


**Solution:**
```
1. Know rate limits for every API you use
2. Add delays between calls
3. Batch during off-peak hours
4. Use bulk APIs when available
5. Implement retry with exponential backoff
6. Consider upgrading API tier

```

**Symptoms:**
- 429 Too Many Requests errors
- Partial batch processing
- Automation pauses unexpectedly

---

### [CRITICAL] Failed automations can lose data

**Situation:** Automation fails mid-process, data is lost

**Why it happens:**
When automation fails:
- Data from webhook is lost
- Partial updates create inconsistency
- No automatic recovery
- No transaction rollback

Lost data = lost business.


**Solution:**
```
1. Log incoming data before processing
2. Use queues for critical data
3. Implement idempotency
4. Store raw data, process separately
5. Regular backups of critical systems

```

**Symptoms:**
- Missing records
- Partially updated data
- Can't recover failed items

---

### [HIGH] Automations create duplicates on retry

**Situation:** Retry logic creates duplicate records

**Why it happens:**
When automations retry:
- Record was created but confirmation failed
- Retry creates second record
- No deduplication logic
- Each retry = another duplicate

Duplicates corrupt your data.


**Solution:**
```
1. Check if record exists before creating
2. Use unique identifiers
3. Implement upsert logic
4. Add deduplication step
5. Regular duplicate cleanup process

```

**Symptoms:**
- Duplicate contacts in CRM
- Double charges
- Duplicate messages sent

---

### [HIGH] Automation connections have too many permissions

**Situation:** OAuth connections request admin access

**Why it happens:**
When connecting apps:
- Often requests full access
- "Just in case" permissions
- Hard to scope down later
- Security risk if compromised

Over-permissioned = over-exposed.


**Solution:**
```
1. Use minimum necessary permissions
2. Create dedicated automation accounts
3. Review permissions regularly
4. Remove unused connections
5. Use API keys with limited scope when possible

```

**Symptoms:**
- Automation account is admin
- Connection can do more than needed
- Security audit flags permissions

---

### [HIGH] Secrets exposed in automation logs

**Situation:** API keys, passwords visible in run history

**Why it happens:**
Automation platforms log everything:
- Input data logged
- Output data logged
- Error messages include data
- Shared team access

Secrets in data = secrets exposed.


**Solution:**
```
1. Never pass secrets as data
2. Use built-in secret management
3. Mask sensitive fields
4. Limit run history access
5. Audit logs for exposed secrets

```

**Symptoms:**
- API keys visible in run history
- Passwords in error messages

---

### [MEDIUM] Too many automations become unmanageable

**Situation:** Hundreds of automations, nobody knows what's running

**Why it happens:**
Automation sprawl happens:
- Easy to create, hard to maintain
- People leave, automations stay
- No documentation
- Overlapping/conflicting automations
- "Shadow IT" automations

Unmaintained automations are liability.


**Solution:**
```
1. Automation inventory and ownership
2. Naming conventions
3. Regular audit (quarterly)
4. Document critical automations
5. Centralize in team/folder structure
6. Sunset unused automations

```

**Symptoms:**
- Don't know what automations exist
- Conflicting automations
- Automations nobody owns

---

## Collaboration

---

## Get the Full Version

This skill has **automated validations**, **detection patterns**, and **structured handoff triggers** that work with the Spawner orchestrator.

```bash
npx vibeship-spawner-skills install
```

Full skill path: `~/.spawner/skills/ai-tools/automation/`

**Includes:**
- `skill.yaml` - Structured skill definition
- `sharp-edges.yaml` - Machine-parseable gotchas with detection patterns
- `validations.yaml` - Automated code checks
- `collaboration.yaml` - Handoff triggers for skill orchestration

---

*Generated by [VibeShip Spawner](https://github.com/vibeforge1111/vibeship-spawner-skills)*
