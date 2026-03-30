# Easter Egg Design

> Expert in designing hidden features, secret codes, and delightful surprises in products.
Covers discovery mechanics, reward calibration, shareability triggers, and maintaining the
magic. Knows how to create moments that make users feel special for finding them.


**Category:** creative | **Version:** 1.0.0

---

## Identity

[object Object]

## Expertise Areas

- Hidden features
- Secret codes
- Discovery mechanics
- Surprise and delight
- Konami codes
- Developer jokes
- Hidden messages
- Secret modes

## Patterns

### Easter Egg Types
Categories of hidden features
```
## Easter Egg Categories

### 1. Type Taxonomy

| Type | Description | Example |
|------|-------------|---------|
| Code Triggered | Specific input sequence | Konami code |
| Exploration | Found by poking around | Hidden pages |
| Time-based | Appears at specific times | Holiday themes |
| Cumulative | Unlocked by usage | Achievement unlock |
| Social | Requires multiple users | Collaborative unlock |
| Contextual | Appears in specific conditions | Empty state jokes |

### 2. Reward Types

| Reward | Impact | Shareability |
|--------|--------|--------------|
| Visual change | Medium | High (screenshot-able) |
| Sound effect | Low-Medium | Medium |
| Hidden game | High | Very high |
| Secret mode | High | High |
| Message/joke | Low | Medium |
| Functional unlock | High | Varies |

### 3. Effort vs Reward Matrix

```
High Reward
     │
     │  [Hidden game]    [Secret mode]
     │
     │  [Rare unlock]    [Visual easter egg]
     │
     ├─────────────────────────────────
     │                    Easy Discovery
Hard │
Discovery  [Dev signature]  [Loading joke]
     │
     │  [Secret API]      [Empty state fun]
     │
Low Reward
```

### 4. Selection Criteria

```
Choose type based on:

- Audience: Who will find this?
- Platform: What's possible here?
- Brand: Does it fit personality?
- Effort: Worth the dev time?
- Longevity: Will it age well?
```

```

### Discovery Design
How users find easter eggs
```
## Discovery Mechanics

### 1. Discovery Methods

| Method | How Found | Example |
|--------|-----------|---------|
| Accidental | Random user action | Clicking logo 7 times |
| Curious | Exploring UI | Hidden menu item |
| Informed | Hints or rumors | "Type this phrase" |
| Social | Others share | Friend shows you |
| Seasonal | Time-limited | Holiday appearance |

### 2. Discoverability Calibration

```
Too Hidden                    Too Obvious
─────────────────────────────────────────
Never found ← Sweet Spot → Not special

Sweet spot factors:
- Some people find naturally
- Those who find share
- Feels exclusive but findable
- Hints exist if you look
```

### 3. Hint Design

| Hint Level | Example |
|------------|---------|
| None | Pure exploration reward |
| Subtle | Unusual UI element |
| Moderate | Tooltip or hover text |
| Explicit | "Try [action] for a surprise" |

### 4. Discovery Journey

```
Ideal discovery arc:

1. CURIOSITY
   "What happens if I..."

2. EXPERIMENTATION
   Trying different things

3. DISCOVERY
   The reveal moment

4. DELIGHT
   Emotional payoff

5. SHARING
   "You have to see this!"
```

```

### Shareability Engineering
Making discoveries spread
```
## Shareability Design

### 1. Share Triggers

```
People share when they feel:

- Special (I found this!)
- Generous (You'll love this!)
- Smart (I figured it out!)
- Connected (Remember this?)
- Amused (This is hilarious!)
```

### 2. Share Format Optimization

| Format | Shareability | Design For |
|--------|--------------|------------|
| Screenshot | High | Visual impact |
| Video | Very high | Motion/sound |
| Story | High | Memorable moment |
| Demo | Highest | "Try this" |

### 3. Share-Friendly Features

```
Make sharing easy:

1. VISUAL CLARITY
   - Clear in screenshot
   - Works out of context
   - Interesting at a glance

2. DEMONSTRABLE
   - Others can try it
   - Steps are simple
   - Works reliably

3. CONTEXTUAL HOOK
   - "In [product], try..."
   - Clear what product is
   - Brand visible
```

### 4. Viral Easter Egg Anatomy

| Element | Purpose |
|---------|---------|
| Discoverable | Some people find it |
| Shareable | Format spreads easily |
| Reproducible | Others can try it |
| Delightful | Worth sharing |
| On-brand | Reinforces product |

```

### Famous Easter Eggs
Learn from the best
```
## Easter Egg Hall of Fame

### 1. Classic Examples

| Product | Easter Egg | Why It Works |
|---------|------------|--------------|
| Google | "Do a barrel roll" | Simple, visual, shareable |
| Slack | Loading messages | Personality, discovery |
| GitHub | 404 pages | Brand personality |
| Chrome | Dinosaur game | Utility in frustration |
| Spotify | Star Wars theme | Cultural reference |

### 2. Pattern Analysis

**Google "Do a barrel roll"**
```
Trigger: Search specific phrase
Reward: Visual animation
Discovery: Word of mouth
Shareability: Easy to show/tell
Brand fit: Playful, surprising
```

**Chrome Dinosaur Game**
```
Trigger: No internet connection
Reward: Full game
Discovery: Accidental
Shareability: Screenshot scores
Brand fit: Helpful, human
```

### 3. Easter Egg Principles

```
From the best examples:

1. Reward curiosity
2. Match brand personality
3. Be genuinely delightful
4. Enable sharing naturally
5. Don't break main experience
6. Age gracefully
```

### 4. Anti-Patterns from History

| Anti-Pattern | Problem |
|--------------|---------|
| Too complex trigger | Never discovered |
| Inside joke only | Alienates most users |
| Dated reference | Ages badly |
| Breaks accessibility | Excludes users |
| One-time only | Limits sharing |

```


## Anti-Patterns

### Over-Hidden
Easter eggs no one ever finds
**Why it's bad:** Wasted effort.
No delight delivered.
No word of mouth.


### Breaking Core Experience
Easter eggs that interfere with main product
**Why it's bad:** Confuses users.
Damages usability.
Unprofessional.


### Inside Jokes Only
References only developers get
**Why it's bad:** Alienates users.
Feels exclusionary.
Misses opportunity.



## Sharp Edges (Gotchas)

*Real production issues that cause outages and bugs.*

### [MEDIUM] Easter eggs that become technical debt

**Situation:** Hidden features that break or need constant updates

**Why it happens:**
Forgotten in refactors.
Dependencies change.
No one owns them.


**Solution:**
```
## Sustainable Easter Eggs

### Design for Longevity

```
Easter egg architecture:

1. ISOLATION
   - Separate from core code
   - Own module/component
   - Clear boundaries

2. SIMPLICITY
   - Minimal dependencies
   - Self-contained logic
   - Simple triggers

3. DOCUMENTATION
   - Document existence
   - Document triggers
   - Document owners
```

### Maintenance Checklist

| Check | Frequency |
|-------|-----------|
| Still working? | Every release |
| References current? | Quarterly |
| Owner assigned? | Yearly |
| Worth keeping? | Yearly |

### Graceful Degradation

```
If easter egg breaks:

Option A: Fix it (if worth it)
Option B: Remove cleanly (if not)
Option C: Degrade gracefully (show nothing)

Never: Leave broken
```

### Technical Patterns

| Pattern | Benefit |
|---------|---------|
| Feature flag | Easy to disable |
| Lazy loading | No core impact |
| Time limit | Natural sunset |
| Fallback | Breaks silently |

```

**Symptoms:**
- Broken easter eggs in production
- No one knows how it works
- Blocks refactoring

---

### [HIGH] Easter eggs that exclude users

**Situation:** Discovery requires abilities some users don't have

**Why it happens:**
Designed for one input method.
Visual-only reveals.
Timing requirements.


**Solution:**
```
## Accessible Easter Eggs

### Inclusive Discovery

| Barrier | Solution |
|---------|----------|
| Mouse-only trigger | Add keyboard equivalent |
| Visual-only reward | Add audio/text |
| Timing-dependent | Allow flexible timing |
| Color-dependent | Use patterns/text too |

### Multiple Paths

```
Good easter egg:

Trigger options:
- Click logo 5 times OR
- Press Ctrl+Alt+E OR
- Type "surprise" anywhere

Multiple ways in = more inclusive.
```

### Reward Accessibility

| Reward Type | Accessibility |
|-------------|---------------|
| Visual only | Add alt text, aria |
| Audio only | Add captions, visual |
| Motion | Provide static option |
| Game | Ensure keyboard playable |

### Testing Checklist

```
Before shipping:

□ Works with keyboard only?
□ Works with screen reader?
□ No timing requirements?
□ Color-blind friendly?
□ Doesn't trigger seizures?
```

```

**Symptoms:**
- I couldn't access it
- Relies on specific abilities
- Excludes user segments

---

### [MEDIUM] References that don't translate across cultures

**Situation:** Easter egg relies on culture-specific knowledge

**Why it happens:**
Pop culture isn't universal.
References age quickly.
Humor doesn't translate.


**Solution:**
```
## Universal Delight

### Culture-Safe Categories

| Safe | Risky |
|------|-------|
| Universal humor | Country-specific |
| Visual gags | Language puns |
| Math/logic puzzles | Cultural references |
| Product self-reference | Pop culture |
| Animal cuteness | Regional memes |

### Reference Lifespan

| Reference Type | Lifespan |
|----------------|----------|
| Classic (Star Wars) | Decades |
| Current trend | Months |
| Meme | Weeks to months |
| News | Days |

### Global Testing

```
Before shipping:

1. Test with diverse users
2. Check if reference translates
3. Verify no offensive meanings
4. Consider all markets

When in doubt, go universal.
```

### Localization Strategy

| Approach | Pros | Cons |
|----------|------|------|
| Universal | Works everywhere | Less targeted |
| Localized | More relevant | More work |
| Market-specific | Deep resonance | Limited reach |

```

**Symptoms:**
- I don't get it
- Works in US only
- Offensive in some cultures

---

### [LOW] Users gaming discovery for rewards

**Situation:** Easter eggs with valuable rewards get exploited

**Why it happens:**
Rewards too valuable.
Easy to share method.
Undermines specialness.


**Solution:**
```
## Reward Calibration

### Value Tiers

| Reward Value | Discovery Difficulty |
|--------------|---------------------|
| High (features) | Very hidden |
| Medium (cosmetic) | Moderate |
| Low (fun only) | Easy to find |

### Exploitation Prevention

```
For valuable rewards:

1. Rate limit (once per user)
2. Require account
3. Time-gate availability
4. Make discovery personal

For fun rewards:
Let them be found and shared!
```

### The Right Balance

| If everyone knows | It's not special |
| If no one knows | It's not found |
| If some know | Perfect tension |

### Embrace Sharing

```
Often, exploitation isn't bad:

- Spreads word of mouth
- Increases engagement
- Shows product personality
- Creates community moments

Only protect if reward is truly valuable.
```

```

**Symptoms:**
- Tutorials showing easter egg
- Everyone knows immediately
- Feels less special

---

## Collaboration

### When to Hand Off

| Trigger | Delegate To | Context |
|---------|-------------|--------|
| `gamification|points|achievements` | gamification-loops | Need gamification strategy |
| `lore|backstory|world` | lore-building | Need lore strategy |
| `viral|shareable|spread` | viral-hooks | Need viral strategy |
| `dopamine|reward|satisfaction` | gamification-loops | Need reward design |

### Receives Work From

- **gamification-loops**: Gamification context for easter eggs
- **lore-building**: Narrative context for easter eggs
- **brand-storytelling**: Brand context for easter eggs

### Works Well With

- gamification-loops
- lore-building
- meme-engineering
- dopamine-design

---

## Get the Full Version

This skill has **automated validations**, **detection patterns**, and **structured handoff triggers** that work with the Spawner orchestrator.

```bash
npx vibeship-spawner-skills install
```

Full skill path: `~/.spawner/skills/creative/easter-egg-design/`

**Includes:**
- `skill.yaml` - Structured skill definition
- `sharp-edges.yaml` - Machine-parseable gotchas with detection patterns
- `validations.yaml` - Automated code checks
- `collaboration.yaml` - Handoff triggers for skill orchestration

---

*Generated by [VibeShip Spawner](https://github.com/vibeforge1111/vibeship-spawner-skills)*
