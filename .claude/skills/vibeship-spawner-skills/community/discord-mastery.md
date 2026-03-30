# Discord Mastery

> Expert in building and managing thriving Discord communities. Covers server
architecture, role systems, bot ecosystems, engagement features, and
moderation at scale. Understands Discord-specific culture and patterns.


**Category:** community | **Version:** 1.0.0

---

## Identity

[object Object]

## Expertise Areas

- Discord server architecture
- Channel and category design
- Role and permission systems
- Discord bot strategy
- Discord-specific engagement
- Discord moderation
- Server growth and discovery

## Patterns

### Server Architecture
Designing organized, scalable server structure
```
## Discord Server Architecture

### Category Structure
```
WELCOME
├── #rules
├── #introductions
├── #start-here
└── #announcements

COMMUNITY
├── #general
├── #off-topic
├── #wins
└── #help

TOPIC SPECIFIC (varies)
├── #topic-1
├── #topic-2
└── #topic-3

RESOURCES
├── #resources
├── #links
└── #faq

VOICE
├── General VC
├── Focus Room
└── Events Stage

MOD ONLY
├── #mod-chat
├── #mod-logs
└── #escalations
```

### Channel Count Guidelines
| Server Size | Max Channels | Categories |
|-------------|--------------|------------|
| < 500 | 10-15 | 3-4 |
| 500-2K | 15-25 | 4-6 |
| 2K-10K | 25-40 | 6-8 |
| 10K+ | 40-60 | 8-12 |

### Common Mistakes
- Too many channels (cognitive overload)
- No clear purpose per channel
- Buried important channels
- Inconsistent naming

```

### Role System Design
Permission-based role hierarchy
```
## Role Hierarchy

### Standard Roles (Top to Bottom)
```
ADMIN (Full perms)
├── Lead Moderator
├── Senior Moderator
├── Moderator
├── Trial Moderator
├── VIP/OG
├── Active Member
├── Verified
└── New Member
```

### Role Assignment
| Role | How Earned | Perks |
|------|------------|-------|
| Verified | Complete onboarding | Basic access |
| Active | Time + activity | More channels |
| VIP | Contribution | Special access |
| Mod | Application/invite | Mod tools |

### Permission Best Practices
- Start restrictive, grant permissions up
- Use role hierarchy properly
- Avoid @everyone permissions
- Regular permission audits

```

### Bot Ecosystem
Strategic bot deployment
```
## Bot Strategy

### Essential Bots
| Purpose | Options | Notes |
|---------|---------|-------|
| Moderation | Carl-bot, Wick, Dyno | Pick one main |
| Welcome/Roles | Carl-bot, MEE6 | Reaction roles |
| Leveling | MEE6, Tatsu, Arcane | Optional |
| Tickets | Ticket Tool, Carl-bot | For support |
| Custom | Custom bot | For unique needs |

### Configuration Principles
- One primary moderation bot
- Avoid duplicate functionality
- Test before deploying
- Document all bot settings
- Regular bot audits

### Automod Setup
| Rule | Action | Notes |
|------|--------|-------|
| Spam | Delete + warn | Link cooldown |
| Slurs | Delete + timeout | Use blocklist |
| Raids | Lockdown | Mention spam |
| Scams | Delete + ban | Crypto scams |

```


## Anti-Patterns

### Channel Sprawl
Too many channels killing activity
**Why it's bad:** Activity diluted across channels.
Members don't know where to post.
Dead channels look bad.


### Bot Overload
Too many bots cluttering server
**Why it's bad:** Confusing for members.
Overlapping functionality.
Bot spam in channels.
Maintenance nightmare.


### Over-Gamification
Excessive XP/leveling focus
**Why it's bad:** Members game the system.
Quantity over quality.
XP farming behavior.
Loses meaning.



## Sharp Edges (Gotchas)

*Real production issues that cause outages and bugs.*

### [HIGH] Coordinated attack on server

**Situation:** Multiple accounts joining and spamming/causing chaos

**Why it happens:**
Server linked publicly.
No verification gate.
Slow mod response.


**Solution:**
```
## Raid Prevention & Response

### Prevention
- Enable verification level (Medium+)
- Use verification bot/captcha
- Limit new member permissions
- Hide sensitive channels from new members

### Detection
- Unusual join spike
- New accounts posting immediately
- Same/similar messages
- Mention spam

### Response Protocol
1. IMMEDIATE: Enable slowmode (all channels)
2. IF SEVERE: Lock server (disable join)
3. Ban raid accounts
4. Review logs for patterns
5. Report to Discord Trust & Safety

### Automod Settings for Raids
```
- Block mass mentions (5+ in message)
- Block new account spam (< 1 day old)
- Enable anti-raid mode in modbot
```

```

**Symptoms:**
- Spam flood
- Mass joins
- Chaos in channels
- Members panicking

---

### [MEDIUM] Permissions granted carelessly over time

**Situation:** Too many people with too many permissions

**Why it happens:**
Giving perms to fix quick issues.
Not revoking when roles change.
No regular audits.


**Solution:**
```
## Permission Hygiene

### Audit Checklist
- [ ] Who has admin? (Should be 2-3 max)
- [ ] Who can ban? (Mods only)
- [ ] Who can manage channels? (Leads only)
- [ ] Who can @everyone? (Admins only)

### Cleanup Process
1. Export current role/perm list
2. Review each elevated role
3. Remove unnecessary permissions
4. Document who has what and why

### Prevention
- Grant minimum necessary
- Document permission grants
- Quarterly permission audits
- Revoke on role change

```

**Symptoms:**
- Who gave them perms?
- Accidental @everyone
- Unauthorized changes
- Security concerns

---

### [MEDIUM] Many channels with no activity

**Situation:** Server looks abandoned with empty channels

**Why it happens:**
Created too many channels upfront.
Topics that didn't pan out.
No archive strategy.


**Solution:**
```
## Channel Health

### Activity Audit
| Last Message | Action |
|--------------|--------|
| < 7 days | Healthy |
| 7-30 days | Monitor |
| 30-90 days | Consider archiving |
| > 90 days | Archive or delete |

### Archive Process
1. Create "Archive" category (hidden from most)
2. Move dead channels there
3. Or export and delete
4. Announce consolidation

### Prevention
- Start with fewer channels
- Earn channels through demand
- Use threads for temp topics
- Regular channel reviews

```

**Symptoms:**
- Empty channels
- Where is everyone?
- Activity in 2-3 channels only
- New members confused

---

### [HIGH] Scammers getting through verification

**Situation:** Bad actors passing verification and scamming members

**Why it happens:**
Verification too simple.
No ongoing monitoring.
Scam patterns evolve.


**Solution:**
```
## Anti-Scam Measures

### Verification Layers
1. Discord's built-in level (phone/email)
2. Bot captcha (Wick, Captcha.bot)
3. Manual review for suspicious
4. Probation period for new members

### Scam Detection
| Pattern | Action |
|---------|--------|
| DM about crypto | Warn members, ban scammer |
| "Admin" impersonation | Immediate ban |
| Fake giveaway links | Delete, ban, report |
| NFT mint links from new accounts | Delete, ban |

### Member Education
- Pin scam warnings
- Regular reminders
- Reporting mechanism
- Staff never DM first policy

```

**Symptoms:**
- Members getting scammed
- Fake admin DMs
- Crypto/NFT scam messages
- Phishing links

---

## Collaboration

### When to Hand Off

| Trigger | Delegate To | Context |
|---------|-------------|--------|
| `telegram|telegram group` | telegram-mastery | Telegram platform |
| `twitter|reddit|social` | social-community | Other social platforms |
| `strategy|vision|overall` | community-strategy | Strategic decisions |
| `moderation policy|operations` | community-operations | Operational framework |
| `web3|token|nft|dao` | web3-community | Web3 patterns |
| `bots|tools|automation` | community-tooling | Bot and tool selection |

### Receives Work From

- **community-strategy**: Strategic direction for Discord
- **community-operations**: Operational requirements
- **web3-community**: Web3 Discord patterns

### Works Well With

- community-strategy
- community-operations
- community-tooling
- web3-community

---

## Get the Full Version

This skill has **automated validations**, **detection patterns**, and **structured handoff triggers** that work with the Spawner orchestrator.

```bash
npx vibeship-spawner-skills install
```

Full skill path: `~/.spawner/skills/community/discord-mastery/`

**Includes:**
- `skill.yaml` - Structured skill definition
- `sharp-edges.yaml` - Machine-parseable gotchas with detection patterns
- `validations.yaml` - Automated code checks
- `collaboration.yaml` - Handoff triggers for skill orchestration

---

*Generated by [VibeShip Spawner](https://github.com/vibeforge1111/vibeship-spawner-skills)*
