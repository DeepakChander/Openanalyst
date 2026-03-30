# Progression Systems Specialist

> Expert in designing compelling progression systems that create the "one more turn"
hook while respecting player time. Deep knowledge of XP mathematics, skill tree
topology, reward pacing psychology, and meta-progression loops. Draws from
decades of ARPG evolution (Diablo, Path of Exile), roguelike innovation
(Hades, Slay the Spire), and mobile design patterns.


**Category:** game-dev | **Version:** 1.0.0

---

## Identity

[object Object]

## Expertise Areas

- experience_points
- leveling_systems
- skill_trees
- talent_systems
- unlock_gates
- prestige_systems
- meta_progression
- battle_passes
- achievement_systems
- new_game_plus
- power_curves
- loot_progression

## Patterns

### Logarithmic XP Curve
Use logarithmic scaling where each level requires progressively more XP,
but the RATIO of increase diminishes. This creates the perception of
achievable goals while extending content.

```
```javascript
// The Diablo II formula - proven over 20+ years
function xpForLevel(level, baseXP = 100, exponent = 1.5) {
  return Math.floor(baseXP * Math.pow(level, exponent));
}

// Level 1: 100 XP, Level 10: 3,162 XP, Level 50: 35,355 XP
// The key insight: Level 50 takes ~11x level 10, not 50x

// For softer curves (casual games):
function casualXPCurve(level, baseXP = 100) {
  return Math.floor(baseXP * level * Math.log2(level + 1));
}

// For steeper curves (hardcore ARPGs):
function hardcoreXPCurve(level, baseXP = 100) {
  return Math.floor(baseXP * Math.pow(level, 2) * Math.log10(level + 1));
}
```

```

### Diamond Skill Tree Topology
Structure skill trees as diamonds: narrow start, wide middle, narrow end.
This forces early commitment but allows mid-game exploration before
converging on a final build identity.

```
```javascript
// Path of Exile's passive tree uses this principle
const skillTreeStructure = {
  // Tier 1: 3 starting nodes - establishes archetype
  tier1: {
    nodeCount: 3,
    philosophy: "Choose your core identity",
    examples: ["Warrior", "Mage", "Rogue"]
  },

  // Tier 2-4: Explosion of options - 15-25 nodes each
  tier2to4: {
    nodeCount: [15, 20, 25],
    philosophy: "Explore hybrid possibilities",
    interconnections: "HIGH - allow switching between branches"
  },

  // Tier 5-6: Convergence - 10-5 nodes
  tier5to6: {
    nodeCount: [10, 5],
    philosophy: "Define your endgame identity",
    keystones: "Mutually exclusive powerful effects"
  }
};

// The golden rule: Any two starting classes should have
// at least one viable hybrid build path
```

```

### Reward Schedule Layering
Layer multiple reward timelines: immediate (every action), short-term
(every session), medium-term (weekly), and long-term (seasonal).
Each layer reinforces the others.

```
```javascript
const rewardLayers = {
  immediate: {
    frequency: "Every 1-5 minutes",
    rewards: ["XP ticks", "Gold drops", "Small loot"],
    psychology: "Variable ratio reinforcement",
    example: "Diablo's constant loot explosions"
  },

  shortTerm: {
    frequency: "Every 30-60 minutes",
    rewards: ["Level ups", "Skill points", "Equipment upgrades"],
    psychology: "Session goals - 'one more level'",
    example: "Reaching a new zone in PoE"
  },

  mediumTerm: {
    frequency: "Daily/Weekly",
    rewards: ["Daily login bonus", "Weekly challenges", "Bounties"],
    psychology: "Habit formation - routine engagement",
    warning: "MUST be completable, not FOMO-inducing"
  },

  longTerm: {
    frequency: "Monthly/Seasonal",
    rewards: ["Season rewards", "Prestige", "Exclusive cosmetics"],
    psychology: "Investment and identity",
    example: "Battle pass final rewards, Season journey"
  }
};

// Critical: Each layer should be achievable WITHOUT the layer above
// Players who miss dailies shouldn't be locked out of seasonal rewards
```

```

### Catch-Up Acceleration
Implement catch-up mechanics that accelerate progression for trailing
players WITHOUT punishing leaders. The gap should narrow naturally,
not through leader penalties.

```
```javascript
// World of Warcraft's Rested XP system - the gold standard
function calculateXPMultiplier(playerLevel, contentLevel, isRested) {
  let multiplier = 1.0;

  // Catch-up: Old content gives bonus XP
  const levelDifference = contentLevel - playerLevel;
  if (levelDifference < -5) {
    // Player is overleveled - no bonus, slight reduction
    multiplier *= 0.9;
  } else if (levelDifference > 5) {
    // Player is underleveled - catch-up bonus
    multiplier *= 1.0 + (levelDifference * 0.05); // +5% per level behind
  }

  // Rested XP: Rewards taking breaks
  if (isRested) {
    multiplier *= 2.0;
  }

  return multiplier;
}

// Alternative: Hades-style "God Mode"
// Each death permanently increases damage resistance
// Catch-up through persistence, not time
```

```

### Meaningful Prestige Reset
Prestige systems should make players feel like masters returning to
teach, not students repeating lessons. Carry forward KNOWLEDGE (unlocks,
blueprints) not POWER (stats, gear).

```
```javascript
// Clicker Heroes 2 / Realm Grinder approach
const prestigeDesign = {
  whatResets: [
    "Character level",
    "Current gear",
    "Active currencies",
    "Map progress"
  ],

  whatPersists: [
    "Unlocked features",
    "Knowledge/blueprints",
    "Cosmetics",
    "Achievement progress"
  ],

  whatAccelerates: {
    example: "Each prestige grants +10% base XP permanently",
    cap: "Cap at 500% to prevent trivialization",
    feeling: "The early game should feel FASTER, not EASIER"
  },

  newContent: {
    rule: "Each prestige tier MUST unlock new mechanics",
    examples: [
      "Prestige 1: Unlock crafting",
      "Prestige 2: Unlock enchanting",
      "Prestige 3: Unlock challenge modes"
    ]
  }
};

// The golden ratio: First prestige at 60% of base content
// Most players should prestige 3-5 times for "full" experience
```

```

### Horizontal Progression Islands
Once vertical power growth caps, expand horizontally into "islands" -
self-contained progression systems that don't inflate main power.

```
```javascript
// Guild Wars 2's Mastery system
const horizontalProgressionIslands = {
  mainProgression: {
    type: "Vertical",
    cap: "Level 80, BiS gear achievable",
    timeline: "40-60 hours"
  },

  horizontalIslands: [
    {
      name: "Mounts",
      progression: "Unlock abilities, not stats",
      example: "Raptor: Longer jump, not more damage"
    },
    {
      name: "Crafting Mastery",
      progression: "New recipes, not stronger gear",
      example: "Legendary weapons = cosmetic + convenience"
    },
    {
      name: "Story Achievements",
      progression: "Titles, cosmetics, lore",
      example: "No power gain, pure expression"
    },
    {
      name: "Challenge Modes",
      progression: "Skill expression",
      example: "Leaderboards, time trials"
    }
  ],

  // The key insight: Islands should be OPTIONAL but ATTRACTIVE
  // Players choose based on interest, not power necessity
};
```

```

### The Meaningful Choice Framework
Every upgrade choice must pass the "meaningful choice" test:
Are there scenarios where each option is optimal?

```
```javascript
// The Three Pillars of Meaningful Choice
const meaningfulChoiceFramework = {
  pillar1_distinctIdentity: {
    rule: "Each option must FEEL different to play",
    bad: "+5% fire damage vs +5% ice damage",
    good: "Fireball (burst) vs Ice Storm (area control)"
  },

  pillar2_situationalOptimality: {
    rule: "No option is best in ALL situations",
    bad: "+10% damage (always good)",
    good: "+20% damage vs bosses OR +30% damage vs groups"
  },

  pillar3_expressionNotMath: {
    rule: "Choice expresses playstyle, not spreadsheet skills",
    bad: "Option A is 3% better DPS",
    good: "Option A rewards aggressive play, B rewards patience"
  },

  // The litmus test:
  test: `
    Ask 100 players which option they prefer.
    If >70% choose the same option, it's not meaningful.
    Target: 30-40-30 split across three options.
  `
};
```

```

### Power Budget Architecture
Define a total "power budget" for each player milestone. All sources
of power (gear, skills, passives) draw from this budget, preventing
uncontrolled scaling.

```
```javascript
// Define power in a normalized unit
const powerBudget = {
  level1: { totalBudget: 100, breakdown: {
    baseStat: 50,
    skills: 30,
    gear: 20
  }},

  level50: { totalBudget: 1000, breakdown: {
    baseStat: 200,   // 4x growth
    skills: 400,     // 13x growth (main scaling)
    gear: 300,       // 15x growth
    passives: 100    // New source
  }},

  level100: { totalBudget: 5000, breakdown: {
    baseStat: 300,   // Diminishing returns
    skills: 1500,
    gear: 2000,
    passives: 800,
    setBonus: 400    // New source unlocked late
  }}
};

// The scaling ratio should follow:
// Early game: Stats > Skills > Gear (easy to understand)
// Mid game: Skills > Gear > Stats (build identity emerges)
// End game: Gear > Skills > Stats (farming motivation)
```

```

### Anti-Grind Checkpoints
Place guaranteed progression checkpoints that prevent "bad luck"
streaks from blocking progress entirely. Players should never feel
stuck due to RNG.

```
```javascript
// Pity system design
const antiGrindCheckpoints = {
  lootPity: {
    implementation: "Track attempts since last rare drop",
    threshold: "2x expected attempts = guaranteed drop",
    example: "1% drop rate? Guaranteed at 200 attempts",
    hidden: false // Always show progress to pity
  },

  upgradeProtection: {
    implementation: "Failed upgrades increase success chance",
    example: "+10% per failure, resets on success",
    alternative: "3 failures = free success"
  },

  progressFloor: {
    implementation: "Minimum XP/rewards per time unit",
    example: "Always gain at least 1000 XP per hour of play",
    purpose: "Respects player time investment"
  },

  // The critical UX element:
  visibility: {
    rule: "ALWAYS show progress toward checkpoint",
    bad: "Hidden pity timer",
    good: "42/200 attempts toward guaranteed legendary"
  }
};
```

```

### Session Goal Bracketing
Design progression milestones to fit common play session lengths.
15-minute, 30-minute, and 60-minute players should all have
achievable goals.

```
```javascript
const sessionBrackets = {
  micro: {
    duration: "5-15 minutes",
    goals: ["Complete daily quest", "One dungeon run", "Quick PvP match"],
    reward: "Immediate satisfaction",
    example: "Slay the Spire: One floor of the Spire"
  },

  short: {
    duration: "30-45 minutes",
    goals: ["Level up once", "Complete zone", "Meaningful gear upgrade"],
    reward: "Progress feeling",
    example: "Hades: One full run"
  },

  standard: {
    duration: "60-90 minutes",
    goals: ["Story chapter", "Major milestone", "New ability unlock"],
    reward: "Achievement feeling",
    example: "Diablo: Clear an Act"
  },

  long: {
    duration: "2+ hours",
    goals: ["Prestige reset", "Major content completion", "Build finalization"],
    reward: "Investment payoff",
    example: "PoE: Reach maps on new character"
  },

  // Design rule: Every session should end with a "one more" hook
  // but also a natural stopping point
};
```

```

### New Game Plus Philosophy
NG+ should transform, not just scale. Each cycle should reveal
new dimensions of the game that weren't visible before.

```
```javascript
const ngPlusPhilosophy = {
  tier1_basic: {
    changes: ["Enemies have more HP/damage", "Retain some gear"],
    feeling: "Victory lap with challenge",
    example: "Dark Souls NG+"
  },

  tier2_remixed: {
    changes: [
      "New enemy placements",
      "Altered boss patterns",
      "New item locations"
    ],
    feeling: "Familiar but surprising",
    example: "Resident Evil's second scenarios"
  },

  tier3_transformed: {
    changes: [
      "New story content/endings",
      "Unlock hidden mechanics",
      "Role reversal possibilities"
    ],
    feeling: "New game experience",
    example: "NieR: Automata's Route B-E"
  },

  // The golden question:
  test: "Would a player who loved the base game pay for NG+ as DLC?",
  target: "If yes for tier 2-3, you've succeeded"
};
```

```


## Anti-Patterns

### Exponential Power Creep
Allowing multiplicative stacking that results in exponential power
growth, trivializing content.


### False Choice Traps
Presenting "choices" where one option is mathematically superior
in all situations.


### Time-Gated FOMO
Creating artificial urgency through limited-time content that
punishes players for having lives outside the game.


### Prestige Punishment
Making prestige resets feel like losing progress rather than
gaining mastery.


### Invisible Progress
Hiding progression numbers or making them incomprehensible, leaving
players unable to feel their growth.


### Reward Dilution
Adding too many reward types that individually feel meaningless.


### Level Cap Paralysis
Reaching max level and having nothing meaningful to progress toward.



## Sharp Edges (Gotchas)

*Real production issues that cause outages and bugs.*

### [CRITICAL] undefined

**Symptoms:**
- Damage numbers in millions/billions
- Old dungeons one-shot by new players
- Gear from 2 patches ago is vendor trash
- New players can't engage with veterans

---

### [HIGH] undefined

**Symptoms:**
- Every guide recommends the same build
- Players feel 'forced' into one playstyle
- Content balanced around optimal build
- Non-optimal players can't complete content

---

### [HIGH] undefined

**Symptoms:**
- AFK farming is optimal strategy
- Skill expression doesn't matter
- New players with time beat veterans without time
- Content feels like a job, not a game

---

### [HIGH] undefined

**Symptoms:**
- Players spend more time on wikis than playing
- 'Did I waste my points?' anxiety
- Community demands respec systems
- New players avoid committing to anything

---

### [HIGH] undefined

**Symptoms:**
- Players log in, do dailies, log out
- Streaks feel like chains, not achievements
- 'I can't take a vacation' complaints
- Sudden mass exodus after extended play

---

### [MEDIUM] undefined

**Symptoms:**
- Players resist prestige even when optimal
- 'Why would I erase my progress?'
- Prestige feels mandatory, not exciting
- Early prestigers regret it

---

### [MEDIUM] undefined

**Symptoms:**
- Player complaints about 'hitting a wall'
- Confusion about why progress slowed
- Suspicion of hidden paywalls
- Guides needed to explain soft caps

---

### [MEDIUM] undefined

**Symptoms:**
- Players don't look at drops anymore
- Inventory management is a chore
- 'Why does this boss drop 50 items?'
- Good items don't feel special

---

### [MEDIUM] undefined

**Symptoms:**
- 'What's the point of leveling?'
- Numbers go up but nothing changes
- No power fantasy fulfillment
- Early zones never feel conquered

---

### [LOW] undefined

**Symptoms:**
- Players dismiss achievement popups
- No pride in actual achievements
- Achievement hunting feels like busywork
- 100% completion is trivial grind

---

## Collaboration

### Receives Work From

- **game-design-core**: 
- **game-monetization**: 
- **narrative-design**: 
- **game-balance**: 
- **game-analytics**: 

---

## Get the Full Version

This skill has **automated validations**, **detection patterns**, and **structured handoff triggers** that work with the Spawner orchestrator.

```bash
npx vibeship-spawner-skills install
```

Full skill path: `~/.spawner/skills/game-dev/progression-systems/`

**Includes:**
- `skill.yaml` - Structured skill definition
- `sharp-edges.yaml` - Machine-parseable gotchas with detection patterns
- `validations.yaml` - Automated code checks
- `collaboration.yaml` - Handoff triggers for skill orchestration

---

*Generated by [VibeShip Spawner](https://github.com/vibeforge1111/vibeship-spawner-skills)*
