# Social Community

> Expert in building community presence across social platforms - Twitter/X,
Reddit, Farcaster, and forums. Covers platform-specific strategies,
cross-platform coordination, and leveraging social for community growth.


**Category:** community | **Version:** 1.0.0

---

## Identity

[object Object]

## Expertise Areas

- Twitter/X community building
- Reddit community management
- Farcaster/decentralized social
- Forum management (Discourse, etc.)
- Cross-platform strategy
- Social-driven community growth

## Patterns

### Twitter Community Building
Building community through Twitter/X
```
## Twitter/X Community Strategy

### Content Pillars
| Type | Frequency | Purpose |
|------|-----------|---------|
| Educational | 3-4x/week | Establish expertise |
| Engagement | Daily | Build relationships |
| Community spotlight | 2x/week | Celebrate members |
| Behind-scenes | 1x/week | Build connection |

### Engagement Tactics
- Reply to relevant conversations
- Quote tweet with value-add
- Host Twitter Spaces regularly
- Create threads that invite response
- Ask questions, not just broadcast

### Twitter Spaces
| Type | Frequency | Format |
|------|-----------|--------|
| Weekly chat | 1x/week | Casual, consistent |
| AMAs | Monthly | Guest experts |
| Breaking news | As needed | Timely response |

### Community Tab
- Create community around topic
- Exclusive content for members
- Moderated, quality space

```

### Reddit Community Management
Building and managing subreddit community
```
## Reddit Strategy

### Subreddit Setup
| Element | Best Practice |
|---------|---------------|
| Rules | Clear, enforced, visible |
| Flairs | Organize posts by type |
| Wiki | FAQ and resources |
| Automod | Filter spam, enforce rules |

### Content Strategy
- Don't just promote, participate
- Value-first posts
- Engage in comments
- Host AMAs
- Regular discussion threads

### Reddit Culture
- Self-promotion limits (10:1 rule)
- Authenticity over polish
- Admit mistakes publicly
- Humor and memes welcome
- Downvotes are feedback

### Moderation
- Active, fair moderation
- Transparent rule enforcement
- Community input on rules
- Mod recruitment from active users

```

### Farcaster/Decentralized Social
Building on crypto-native social
```
## Farcaster Strategy

### Why Farcaster
- Crypto-native audience
- High engagement rates
- Quality over quantity
- Frame functionality

### Content Approach
- More technical, crypto-native
- Frames for interactive content
- Channel participation
- Direct engagement (no algorithm hiding)

### Frames
- Interactive experiences in feed
- NFT mints, polls, games
- Community activations
- Check-ins and events

### Channel Strategy
- Create or claim relevant channel
- Consistent posting
- Engage with casts
- Build channel community

```


## Anti-Patterns

### Broadcast-Only Social
Using social to broadcast, not engage
**Why it's bad:** No community forms from one-way content.
Followers don't become members.
Algorithm penalizes low engagement.


### Platform Mismatch
Same content across all platforms
**Why it's bad:** Each platform has different culture.
Content that works on Twitter fails on Reddit.
Feels inauthentic.



## Sharp Edges (Gotchas)

*Real production issues that cause outages and bugs.*

### [MEDIUM] Getting ratio'd on controversial post

**Situation:** Community post gets more negative replies than likes

**Why it happens:**
Tone-deaf content.
Didn't read the room.
Touched sensitive topic.


**Solution:**
```
## Handling Ratio/Backlash

### Prevention
- Multiple eyes on sensitive content
- Read recent discourse before posting
- Avoid hot-take culture
- Test with community members first

### Response
1. Don't delete immediately (looks worse)
2. Assess if genuine mistake
3. If wrong: Acknowledge, apologize, learn
4. If misunderstood: Clarify calmly
5. Don't argue with pile-on

### Recovery
- Let it blow over (24-48h)
- Resume normal posting
- Address privately if needed
- Document for future learning

```

**Symptoms:**
- More replies than likes
- Negative quote tweets
- Main character of the day
- Community defending/attacking

---

### [HIGH] Community or account banned from subreddit

**Situation:** Promotional activity leads to ban

**Why it happens:**
Violated self-promotion rules.
Spammy behavior.
Didn't participate authentically.


**Solution:**
```
## Reddit Anti-Ban Strategy

### Prevention
- Follow 10:1 rule (10 valuable posts per 1 promo)
- Participate before promoting
- Read each subreddit's rules
- Use official [Company] accounts transparently

### Recovery
- Message mods politely
- Acknowledge mistake
- Ask for guidance
- Don't evade with alt accounts

### Building Reddit Karma
- Help others genuinely
- Post useful content
- Comment thoughtfully
- Build over months, not days

```

**Symptoms:**
- Posts removed
- Shadowban
- Account suspension
- You have been banned

---

### [MEDIUM] Team stretched thin across too many platforms

**Situation:** Quality drops trying to be everywhere

**Why it happens:**
FOMO on platforms.
No prioritization.
Same team doing everything.


**Solution:**
```
## Platform Prioritization

### Assessment
| Platform | Audience There? | ROI? | Resource Cost? |
|----------|-----------------|------|----------------|
| Twitter | Score 1-5 | Score 1-5 | Score 1-5 |
| Reddit | Score 1-5 | Score 1-5 | Score 1-5 |
| etc. | ... | ... | ... |

### Prioritization
- Tier 1: Active, engaged (2-3 platforms max)
- Tier 2: Presence, low effort
- Tier 3: Not yet, future consideration

### Resource Allocation
- 70% to Tier 1 platforms
- 20% to Tier 2
- 10% experimentation

### When to Cut
- Low engagement after 3 months
- Team burnout
- Better ROI elsewhere

```

**Symptoms:**
- Inconsistent posting
- Team overwhelmed
- Quality declining
- We should be on X too

---

## Collaboration

### When to Hand Off

| Trigger | Delegate To | Context |
|---------|-------------|--------|
| `discord|server` | discord-mastery | Discord platform |
| `telegram|group` | telegram-mastery | Telegram platform |
| `strategy|overall` | community-strategy | Strategic guidance |
| `web3|crypto|farcaster` | web3-community | Web3 social patterns |
| `growth|acquisition` | community-growth | Growth tactics |

### Receives Work From

- **community-strategy**: Strategic direction for social
- **community-growth**: Growth through social

### Works Well With

- community-strategy
- community-growth
- discord-mastery
- telegram-mastery

---

## Get the Full Version

This skill has **automated validations**, **detection patterns**, and **structured handoff triggers** that work with the Spawner orchestrator.

```bash
npx vibeship-spawner-skills install
```

Full skill path: `~/.spawner/skills/community/social-community/`

**Includes:**
- `skill.yaml` - Structured skill definition
- `sharp-edges.yaml` - Machine-parseable gotchas with detection patterns
- `validations.yaml` - Automated code checks
- `collaboration.yaml` - Handoff triggers for skill orchestration

---

*Generated by [VibeShip Spawner](https://github.com/vibeforge1111/vibeship-spawner-skills)*
