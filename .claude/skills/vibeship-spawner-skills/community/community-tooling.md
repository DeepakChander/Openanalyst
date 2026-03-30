# Community Tooling

> Expert in community tool selection and implementation - Discord bots,
community platforms, analytics tools, CRMs, moderation systems, and
automation. Knows the tool landscape, integration patterns, and how to
build a cohesive community tech stack.


**Category:** community | **Version:** 1.0.0

---

## Identity

[object Object]

## Expertise Areas

- Community tool selection
- Discord bot configuration
- Community platform evaluation
- Analytics tool implementation
- CRM for community
- Automation and workflows
- Integration architecture
- Tool migration

## Patterns

### Community Tool Stack
Building a cohesive community tech stack
```
## Community Tool Stack Framework

### Core Stack Layers
| Layer | Purpose | Examples |
|-------|---------|----------|
| Platform | Where community lives | Discord, Slack, Circle |
| Moderation | Keep community safe | Wick, MEE6, Carl-bot |
| Analytics | Measure community | Orbit, Common Room |
| CRM | Track relationships | Orbit, Notion, Airtable |
| Automation | Streamline workflows | Zapier, n8n, custom |

### Stack by Community Size
| Size | Stack Complexity |
|------|------------------|
| <100 | Platform + basic mod |
| 100-1K | + Analytics + Zapier |
| 1K-10K | + CRM + advanced mods |
| 10K+ | Full stack + custom tools |

### Integration Philosophy
- Data should flow between tools
- Single source of truth
- Avoid duplicate data entry
- Central member database

### Tool Selection Criteria
| Factor | Weight |
|--------|--------|
| Solves real problem | Critical |
| Integration capability | High |
| Team can use it | High |
| Cost appropriate | Medium |
| Scalability | Medium |

```

### Discord Bot Stack
Recommended Discord bot configurations
```
## Discord Bot Stack

### Essential Bots
| Bot | Purpose | When to Add |
|-----|---------|-------------|
| Carl-bot | Roles, welcome, logging | Day 1 |
| MEE6 | Levels, moderation | Day 1 |
| Wick | Anti-raid, security | Day 1 for Web3 |
| Collab.Land | Token gating | Web3 communities |

### Specialized Bots
| Bot | Purpose |
|-----|---------|
| Ticket Tool | Support tickets |
| Statbot | Server analytics |
| Dyno | Moderation, custom commands |
| Zira | Reaction roles |
| Suggester | Feature requests |

### Bot Best Practices
- Don't add bots "just in case"
- Test in staging server first
- Document configuration
- Regular permission audit
- Have backup alternatives

### Custom Bots
- Consider when: Unique needs, branding, data ownership
- Build vs buy decision matrix
- Maintenance overhead
- Security considerations

```

### Community Platform Comparison
Evaluating community platforms
```
## Community Platform Comparison

### Platform Matrix
| Platform | Best For | Limitations |
|----------|----------|-------------|
| Discord | Gaming, Web3, dev | Discovery, SEO |
| Slack | Professional, paid | Cost at scale |
| Circle | Courses, membership | Less real-time |
| Discourse | Long-form, support | Less chat-like |
| Mighty Networks | Creators, courses | Limited integrations |

### Decision Criteria
- Where is your audience already?
- Real-time vs async needs
- Content discoverability
- Monetization needs
- Scale expectations

### Migration Considerations
- Can you export member data?
- How to move active discussions?
- Communication plan
- Transition period
- What gets left behind

```

### Community Analytics Stack
Tools for measuring community health
```
## Community Analytics Stack

### Analytics Platforms
| Platform | Strength | Best For |
|----------|----------|----------|
| Orbit | Developer communities | OSS, DevRel |
| Common Room | Multi-platform | Enterprise |
| Commsor | Team attribution | Sales-driven |
| Statbot | Discord-specific | Discord focus |

### DIY Analytics
- Notion/Airtable for manual tracking
- Platform native analytics
- Spreadsheet dashboards
- Custom bot logging

### What to Track
| Metric | Tool Source |
|--------|-------------|
| Active members | Platform + Orbit |
| Engagement | Statbot + Platform |
| Growth | Platform + analytics |
| Support volume | Ticket tool |
| Sentiment | Manual + keywords |

### Data Integration
- Connect platforms to analytics
- Unified member view
- Activity across channels
- Export capabilities

```


## Anti-Patterns

### Tool Sprawl
Too many tools, no coherent stack
**Why it's bad:** Data fragmented.
Team overwhelmed.
Nothing integrated.
Expensive and confusing.


### Bot Overload
Too many bots in Discord
**Why it's bad:** Confusing for members.
Conflicting commands.
Performance issues.
Security risks.


### Tool Before Process
Buying tool before defining workflow
**Why it's bad:** Tool doesn't fit process.
Forces bad workflows.
Wasted money and time.



## Sharp Edges (Gotchas)

*Real production issues that cause outages and bugs.*

### [MEDIUM] Locked into tool that no longer fits

**Situation:** Can't switch tools because data is trapped

**Why it happens:**
No export capability.
Workflows built around tool.
Team too invested to switch.
Historical data would be lost.


**Solution:**
```
## Avoiding Vendor Lock-in

### Prevention
- Evaluate export capabilities before adopting
- Keep data in portable formats
- Document workflows independently
- Regular export backups
- Negotiate data portability in contracts

### Mitigation
| Scenario | Approach |
|----------|----------|
| API available | Build export scripts |
| Limited export | Manual documentation |
| No export | Screenshot/record key data |

### Switching Checklist
- [ ] Export all member data
- [ ] Document current workflows
- [ ] Parallel run period
- [ ] Communicate to community
- [ ] Archive old platform access

```

**Symptoms:**
- We can't leave because...
- Tool pricing increases
- Features removed
- Better options available but stuck

---

### [CRITICAL] Discord bot token compromised

**Situation:** Malicious actor gains control of bot

**Why it happens:**
Token exposed in code.
Shared with wrong person.
Compromised team member.


**Solution:**
```
## Bot Security

### Prevention
- Never commit tokens to git
- Use environment variables
- Rotate tokens regularly
- Limit who has access
- Minimum required permissions

### If Compromised
1. Immediately regenerate token in Discord
2. Kick bot from server temporarily
3. Audit what happened
4. Check for damage
5. Re-add with new token
6. Inform community if needed

### Token Security Checklist
- [ ] Token in env vars, not code
- [ ] .gitignore includes .env
- [ ] Limited team access
- [ ] Rotation schedule
- [ ] Audit log monitoring

```

**Symptoms:**
- Bot sending strange messages
- Bot mass-DMing members
- Bot deleting channels
- Unknown bot actions

---

### [MEDIUM] Too much data, no actionable insights

**Situation:** Dashboard overload, no clear actions

**Why it happens:**
Tracking everything possible.
No focus on what matters.
Data without context.


**Solution:**
```
## Analytics Focus

### Hierarchy of Metrics
| Level | Focus | Action Frequency |
|-------|-------|------------------|
| North Star | 1 metric | Quarterly review |
| Primary | 3-5 metrics | Monthly review |
| Secondary | 5-10 metrics | Weekly review |
| Diagnostic | As needed | When investigating |

### From Data to Action
1. Define the question first
2. Find relevant metric
3. Set baseline
4. Monitor change
5. Correlate with actions

### Dashboard Design
- One-page summary
- Clear trends (not just numbers)
- Compared to goals
- Actionable insights highlighted
- Easy drill-down

```

**Symptoms:**
- Multiple dashboards
- We track everything
- No one looks at dashboards
- Can't answer basic questions

---

### [MEDIUM] Automated workflows break silently

**Situation:** Automation stops working, no one notices

**Why it happens:**
No monitoring.
Platform changes break integration.
API changes.
Token expiration.


**Solution:**
```
## Robust Automation

### Monitoring
- Error notifications
- Regular test runs
- Success logging
- Human-in-loop for critical flows

### Design Principles
- Fail loudly, not silently
- Idempotent where possible
- Retry with backoff
- Fallback procedures
- Document manual alternative

### Maintenance Schedule
| Frequency | Check |
|-----------|-------|
| Daily | Critical flows running |
| Weekly | Review error logs |
| Monthly | Test all automations |
| Quarterly | Full audit |

```

**Symptoms:**
- That automation hasn't run in weeks
- Members not getting onboarded
- Notifications not sending
- Data not syncing

---

## Collaboration

### When to Hand Off

| Trigger | Delegate To | Context |
|---------|-------------|--------|
| `discord|server` | discord-mastery | Discord-specific implementation |
| `telegram|group` | telegram-mastery | Telegram-specific implementation |
| `metrics|analytics` | community-analytics | Analytics strategy |
| `operations|workflow` | community-operations | Process before tools |
| `web3|token|crypto` | web3-community | Web3-specific tools |

### Receives Work From

- **community-operations**: Operational tool needs
- **community-analytics**: Analytics tool implementation
- **discord-mastery**: Discord bot needs
- **telegram-mastery**: Telegram bot needs

### Works Well With

- community-operations
- community-analytics
- discord-mastery
- telegram-mastery

---

## Get the Full Version

This skill has **automated validations**, **detection patterns**, and **structured handoff triggers** that work with the Spawner orchestrator.

```bash
npx vibeship-spawner-skills install
```

Full skill path: `~/.spawner/skills/community/community-tooling/`

**Includes:**
- `skill.yaml` - Structured skill definition
- `sharp-edges.yaml` - Machine-parseable gotchas with detection patterns
- `validations.yaml` - Automated code checks
- `collaboration.yaml` - Handoff triggers for skill orchestration

---

*Generated by [VibeShip Spawner](https://github.com/vibeforge1111/vibeship-spawner-skills)*
