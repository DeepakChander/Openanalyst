# Telegram Mastery

> Expert in building and managing Telegram communities. Covers group vs channel
strategy, bot automation, anti-spam, and managing large groups. Understands
Telegram's unique culture, especially in crypto/web3 communities.


**Category:** community | **Version:** 1.0.0

---

## Identity

[object Object]

## Expertise Areas

- Telegram group management
- Channel strategy
- Telegram bot automation
- Anti-spam and moderation
- Large group management
- Telegram-specific engagement

## Patterns

### Group vs Channel Strategy
When to use groups vs channels
```
## Groups vs Channels

### Telegram Channels
- One-way broadcast
- Unlimited subscribers
- No member list visible
- Best for: Announcements, content

### Telegram Groups
- Two-way conversation
- Up to 200K members
- Member interaction
- Best for: Community, support

### Recommended Setup
```
MAIN CHANNEL (announcements)
├── Linked Discussion Group
└── (Optional) Comments enabled

COMMUNITY GROUP (conversation)
├── Main chat
└── (Optional) Topic threads

SUPPORT GROUP (help)
└── Separate from main chat
```

### When to Split
| Situation | Action |
|-----------|--------|
| > 5K members, noisy | Consider topic threads |
| Different languages | Language-specific groups |
| Different purposes | Separate groups |
| Too many support Qs | Dedicated support group |

```

### Bot Automation
Essential bot setup for Telegram
```
## Telegram Bot Stack

### Essential Bots
| Purpose | Bot | Setup |
|---------|-----|-------|
| Anti-spam | Combot, Rose, Group Help | Add as admin |
| Welcome | Rose, Shieldy | Configure messages |
| Captcha | Shieldy, Captcha Bot | Verify humans |
| Moderation | Combot, Rose | Ban/warn system |
| Analytics | Combot, TGStat | Track metrics |

### Anti-Spam Configuration
```
Must-have rules:
- No forwarded messages from non-members
- No links from new members (first 24h)
- Captcha on join
- Ban crypto scam patterns
- Rate limit messages
```

### Moderation Commands
| Command | Action |
|---------|--------|
| /ban | Ban user |
| /warn | Issue warning |
| /mute | Mute user |
| /kick | Remove without ban |
| /report | Report to mods |

```

### Large Group Management
Managing groups with 10K+ members
```
## Scaling Telegram Groups

### Challenges at Scale
- Message flood (hundreds/hour)
- Spam and scam attempts
- Signal vs noise
- Moderation coverage

### Solutions
| Problem | Solution |
|---------|----------|
| Too fast | Slow mode (30s-5min) |
| Spam | Aggressive automod |
| Noise | Topic threads |
| Coverage | Global mod team |

### Topic Threads (New Feature)
- Organize conversations by topic
- Members choose their topics
- Reduces main chat noise
- Works for 10K+ groups

### Moderation at Scale
- 1 mod per 2-5K members
- 24/7 coverage across timezones
- Clear escalation path
- Bot handles 90% of spam

```


## Anti-Patterns

### No Captcha = Spam Hell
Running open group without verification
**Why it's bad:** Bots flood the group.
Scammers DM members.
Real members leave.


### Admin Permission Sprawl
Too many people with admin rights
**Why it's bad:** Security risk.
Inconsistent moderation.
Accidental damage.


### Mixing Announcements and Chat
Using same group for announcements and discussion
**Why it's bad:** Important announcements lost in chat.
Can't have read-only announcements.
Members miss key info.



## Sharp Edges (Gotchas)

*Real production issues that cause outages and bugs.*

### [HIGH] Scammers DMing members pretending to be admins

**Situation:** Members getting scammed via fake admin DMs

**Why it happens:**
Anyone can DM anyone on Telegram.
Easy to impersonate admin name/photo.
New members don't know real admins.


**Solution:**
```
## Preventing Admin Impersonation

### Education
- Pin warning: "Admins NEVER DM first"
- Regular reminders in chat
- Onboarding includes scam warning
- List real admin usernames

### Technical Measures
- Admins use unique, hard-to-copy usernames
- Link to official admin list
- Report impersonators to Telegram
- Ban and warn about known scam accounts

### Response to Reports
1. Take screenshot of scam DM
2. Report to Telegram
3. Ban scammer from group
4. Alert community
5. Support scammed member

```

**Symptoms:**
- Admin DMed me asking for...
- Members losing funds
- Fake admin accounts
- Phishing links in DMs

---

### [HIGH] Bot with admin rights gets compromised

**Situation:** Malicious bot or compromised bot wreaks havoc

**Why it happens:**
Bot given full admin rights.
Bot token leaked or service compromised.
No backup admin access.


**Solution:**
```
## Bot Security

### Permission Principle
- Only grant permissions bot needs
- Never give "Add Admins" to bots
- Avoid "Delete Messages" unless needed
- Review bot permissions quarterly

### Essential Permissions Only
| Bot Type | Needs |
|----------|-------|
| Anti-spam | Delete messages, ban users |
| Welcome | Post messages |
| Analytics | Read messages only |

### Recovery Plan
- Multiple human admins (not just bot)
- Know how to remove bot quickly
- Backup admin on standby
- Regular permission audits

```

**Symptoms:**
- Bot misbehaving
- Unexpected bans
- Spam from bot
- Group settings changed

---

### [MEDIUM] Slow mode too aggressive or too lenient

**Situation:** Chat either too slow or too spammy

**Why it happens:**
One-size-fits-all approach.
Not adjusting to activity.
Member complaints ignored.


**Solution:**
```
## Slow Mode Strategy

### Guidelines
| Group Size | Activity | Slow Mode |
|------------|----------|-----------|
| < 1K | Low | None |
| < 1K | High | 30s |
| 1K-10K | Normal | 30s-1min |
| 1K-10K | Busy | 1-5min |
| 10K+ | Normal | 1-5min |
| Any | During raid | Max |

### Dynamic Adjustment
- Increase during high activity
- Decrease during quiet times
- Temporary increase for events
- Communicate changes

### Alternatives to Slow Mode
- Topic threads (separates conversations)
- Dedicated Q&A times
- Announcement channel (low volume)

```

**Symptoms:**
- Why can't I send messages?
- Chat moving too fast
- Important messages lost
- Member frustration

---

### [HIGH] Member phone numbers or info exposed

**Situation:** Privacy settings expose member information

**Why it happens:**
Default Telegram settings show phone to contacts.
Admins can see joiner phone numbers.
Members unaware of privacy settings.


**Solution:**
```
## Privacy Protection

### Educate Members
Settings → Privacy → Phone Number → Nobody
Settings → Privacy → Forwarded Messages → Nobody
Settings → Privacy → Profile Photo → Contacts/Nobody

### Admin Responsibility
- Never share/screenshot member phone numbers
- Use usernames for all communication
- Clear policy on data handling
- Minimal data collection

### Group Settings
- Disable "Save Content" if sensitive
- Consider invite links over adding
- Regular member list hygiene

```

**Symptoms:**
- Members doxxed
- Phone numbers leaked
- Privacy complaints
- Legal concerns

---

## Collaboration

### When to Hand Off

| Trigger | Delegate To | Context |
|---------|-------------|--------|
| `discord|discord server` | discord-mastery | Discord platform |
| `twitter|reddit|social` | social-community | Other platforms |
| `web3|token|crypto|nft` | web3-community | Web3 patterns |
| `strategy|overall community` | community-strategy | Strategic guidance |
| `bots|automation|tools` | community-tooling | Bot and tool selection |

### Receives Work From

- **community-strategy**: Strategic direction for Telegram
- **web3-community**: Crypto/Web3 Telegram patterns

### Works Well With

- community-strategy
- community-operations
- web3-community
- community-tooling

---

## Get the Full Version

This skill has **automated validations**, **detection patterns**, and **structured handoff triggers** that work with the Spawner orchestrator.

```bash
npx vibeship-spawner-skills install
```

Full skill path: `~/.spawner/skills/community/telegram-mastery/`

**Includes:**
- `skill.yaml` - Structured skill definition
- `sharp-edges.yaml` - Machine-parseable gotchas with detection patterns
- `validations.yaml` - Automated code checks
- `collaboration.yaml` - Handoff triggers for skill orchestration

---

*Generated by [VibeShip Spawner](https://github.com/vibeforge1111/vibeship-spawner-skills)*
