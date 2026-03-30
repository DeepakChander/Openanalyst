# Cultural Remix

> Expert in identifying, adapting, and participating in cultural moments and trends.

**Category:** creative | **Version:** 1.0.0

---

## Patterns

### See full skill for patterns
Contains implementation patterns with code examples


## Anti-Patterns

### See full skill for anti-patterns
Contains anti-patterns with examples


## Sharp Edges (Gotchas)

*Real production issues that cause outages and bugs.*

### [HIGH] Misjudging cultural moment and facing backlash

**Situation:** Brand participation angers community

**Why it happens:**
Didn't understand context.
Acted too fast.
Read moment wrong.


**Solution:**
```
## Moment Misreading Prevention

### Research Before Posting

```
For any moment:

1. What's the full context?
2. Who started it?
3. What's the sentiment?
4. Who's against it?
5. How could this evolve?
```

### Sensitive Moment Checklist

| Check | Before Posting |
|-------|----------------|
| Is there tragedy involved? | |
| Are there victims? | |
| Is this political? | |
| Could it be misread? | |
| Has context changed? | |

### The "Check Before Sending" People

```
Build a quick-response team:

- Diverse perspectives
- Different generations
- Can respond quickly
- Have authority to stop

Before major moments: quick sanity check.
```

### Recovery

| Severity | Response |
|----------|----------|
| Minor misjudge | Delete quietly |
| Moderate backlash | Acknowledge, apologize |
| Major outrage | Full apology, action plan |

```

**Symptoms:**
- Unexpected negative reaction
- Read the room
- Community backlash

---

### [MEDIUM] Brand becomes known as trend chaser

**Situation:** No original voice, just endless remixes

**Why it happens:**
Easy to follow.
Looks like activity.
Forgot own voice.


**Solution:**
```
## Building Original Voice

### Content Mix

```
Healthy ratio:

ORIGINAL CONTENT: 60%
- Your unique perspective
- Original formats
- Owned ideas

TREND PARTICIPATION: 40%
- Relevant remixes
- Moment jacking
- Community participation
```

### Original Content Types

| Type | Purpose |
|------|---------|
| Owned series | Recurring brand property |
| Unique insights | Your expertise |
| Original formats | Invented by you |
| Core messaging | Brand fundamentals |

### Building Identity

```
Ask:

- What would we post if no trends existed?
- What's our unique POV?
- What do we want to be known for?
- What would people miss if we stopped?
```

### Trend Participation Filter

| Before Trend | Check |
|--------------|-------|
| Does this align with our voice? | |
| Are we adding or just copying? | |
| Would this work without the trend? | |

```

**Symptoms:**
- No distinctive voice
- They post every trend
- Nothing memorable

---

### [HIGH] Participating in cultures not yours

**Situation:** Brand uses cultural elements inappropriately

**Why it happens:**
Looked cool.
Didn't understand origins.
Treated culture as costume.


**Solution:**
```
## Cultural Sensitivity

### The Distinction

```
APPRECIATION:
- Understanding context
- Respecting origins
- Giving credit
- Adding value

APPROPRIATION:
- Ignoring context
- Taking without credit
- Reducing to aesthetic
- Profit without acknowledgment
```

### Before Participating

| Question | Honest Answer |
|----------|---------------|
| Is this our culture? | |
| Do we understand origins? | |
| Are we crediting source? | |
| Would the community appreciate this? | |
| Are we profiting from their culture? | |

### Safe Participation

| Safer | Risky |
|-------|-------|
| Mainstream trends | Subculture specific |
| Invited participation | Self-insertion |
| Credited remix | Uncredited copying |
| Collaborative | Extractive |

### When Uncertain

```
If you're not sure:

1. Ask someone from that community
2. Research origins
3. Err on side of caution
4. Skip if uncertain

Better to miss a trend than cause harm.
```

```

**Symptoms:**
- This isn't yours
- Community backlash
- Called out for appropriation

---

### [MEDIUM] Trend participation ages badly

**Situation:** Content looks cringe months later

**Why it happens:**
Moment passed.
Context changed.
Trend died hard.


**Solution:**
```
## Content Aging

### Content Lifespan Planning

| Content Type | Lifespan |
|--------------|----------|
| Breaking news take | Hours |
| Viral moment remix | Days |
| Platform trend | Weeks |
| Format adaptation | Weeks-Months |
| Cultural commentary | Months |
| Evergreen | Years |

### Aging Risk by Platform

| Platform | Risk | Why |
|----------|------|-----|
| Stories | Low | Disappears |
| Feed posts | Medium | Stays but buries |
| Website | High | Permanent |
| Blog | High | Permanent, searchable |

### Mitigation Strategies

```
1. EPHEMERAL PLATFORMS
   - Stories
   - Time-limited content

2. ARCHIVE STRATEGY
   - Delete dated content
   - Update evergreen
   - Audit regularly

3. TIMELESS SPIN
   - Focus on principle, not moment
   - Less specific, more universal
```

### Content Audit

| Frequency | Action |
|-----------|--------|
| Monthly | Review recent trend content |
| Quarterly | Delete or update dated |
| Yearly | Full content audit |

```

**Symptoms:**
- Old content resurfaces badly
- Did you really post this?
- Aged like milk

---

## Collaboration

### When to Hand Off

| Trigger | Delegate To | Context |
|---------|-------------|--------|
| `meme|meme format|viral format` | meme-engineering | Need meme execution |
| `hook|opening|scroll stopper` | viral-hooks | Need hook strategy |
| `brand voice|weird|unhinged` | absurdist-voice | Need absurdist voice |
| `content plan|calendar` | content-strategy | Need content strategy |

### Receives Work From

- **meme-engineering**: Meme formats for remixing
- **brand-storytelling**: Brand guidelines for trend fit
- **content-strategy**: Content calendar integration

---

## Get the Full Version

This skill has **automated validations**, **detection patterns**, and **structured handoff triggers** that work with the Spawner orchestrator.

```bash
npx vibeship-spawner-skills install
```

Full skill path: `~/.spawner/skills/creative/cultural-remix/`

**Includes:**
- `skill.yaml` - Structured skill definition
- `sharp-edges.yaml` - Machine-parseable gotchas with detection patterns
- `validations.yaml` - Automated code checks
- `collaboration.yaml` - Handoff triggers for skill orchestration

---

*Generated by [VibeShip Spawner](https://github.com/vibeforge1111/vibeship-spawner-skills)*
