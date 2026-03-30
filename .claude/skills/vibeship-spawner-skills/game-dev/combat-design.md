# Combat Systems Designer

> Expert in designing and implementing visceral, satisfying combat systems. Masters hitbox/hurtbox
design, frame data, combo systems, enemy archetypes, damage feedback, and the invisible craft that
makes players feel powerful. Draws from fighting games, character action games (DMC, Bayonetta),
and Souls-like design to create combat that is readable, responsive, and endlessly replayable.


**Category:** game-dev | **Version:** 1.0.0

**Tags:** combat, action-game, fighting-game, hitbox, frame-data, game-feel, souls-like, character-action, melee, enemy-design, boss-design, combo, parry, i-frames

---

## Identity

[object Object]

## Expertise Areas

- Hitbox/hurtbox collision systems
- Frame data and timing
- Input buffering systems
- Combo system architecture
- Damage feedback systems
- Enemy combat AI patterns
- Attack telegraph design
- Stamina/resource systems
- Parry and counter mechanics
- Difficulty curve design

## Patterns

### Hitbox/Hurtbox Separation
Separate attack collision (hitboxes) from damage reception (hurtboxes)
**When:** Implementing any melee combat system

### Input Buffering System
Queue inputs during uncommitted states for responsive controls
**When:** Player inputs must feel responsive during animations

### Coyote Time and Jump Buffering
Forgiveness windows that respect player intent
**When:** Implementing platforming in action games

### Hitstop (Hit Freeze) System
Brief pause on hit to sell impact
**When:** Attacks need to feel impactful

### Screen Shake for Impact
Camera trauma that reinforces hit feedback
**When:** Attacks connect, explosions occur, heavy landings

### Invincibility Frames (I-Frames)
Periods where player cannot be hit
**When:** Implementing dodges, rolls, backsteps

### Attack Cancel Windows
When attacks can be interrupted into other actions
**When:** Building combo systems or responsive combat

### Enemy Archetype System
Design enemies with clear combat roles
**When:** Populating a game with varied combat encounters

### Attack Telegraph System
Visual and audio cues that warn of incoming attacks
**When:** Designing enemy attacks players must react to

### Damage Feedback Hierarchy
Layered feedback that communicates damage magnitude
**When:** Hits need to communicate impact level

### Recovery and Punishment Windows
Frame-data driven openings after attacks
**When:** Combat needs risk/reward depth

### Stamina and Resource Management
Action economy that creates strategic decisions
**When:** Combat needs pacing and decision-making


## Anti-Patterns

### Invisible Hitboxes
Hitboxes that don't match visual attacks
**Instead:** Make hitboxes LARGER than visuals, not smaller.
If an attack looks like it should hit, it should hit.
Test with hitbox visualization enabled.

// Debug visualization is mandatory during development
function renderHitboxDebug() {
  for (const hitbox of activeHitboxes) {
    drawWireframe(hitbox, COLOR_RED)
  }
  for (const hurtbox of allHurtboxes) {
    drawWireframe(hurtbox, COLOR_GREEN)
  }
}


### Unreadable Attack Tells
Enemy attacks with no clear warning
**Instead:** Every attack needs telegraph time >= human reaction time (~250ms).
Fast attacks are fine IF telegraphed by stance/behavior.
Add audio cues for attacks - accessibility and fairness.

Rule of thumb: If playtesters say "I didn't see that coming"
more than 10% of the time, the telegraph is too subtle.


### No Recovery Windows
Enemies that can attack again immediately after attacking
**Instead:** Every attack should have a clear window where the enemy is vulnerable.
Recovery >= player's fastest punish.
If unsure, make recovery too long then tune shorter.

// Boss attack formula:
// Big wind-up (readable) + Extended recovery (punishable) = Fair
// Quick attack + Instant followup = Frustrating


### Damage Sponges
Enemies with massive HP but simple patterns
**Instead:** Reduce HP, add phases or new attacks.
If a fight lasts > 3 minutes, it needs phase transitions.
Interesting fights are about adaptation, not endurance.

// Instead of:
bossHP = 5000
attackPattern = [attack1, attack2, attack1, attack2...]

// Do:
bossHP = 2000
phases = [
  { threshold: 1.0, attacks: [attack1, attack2] },
  { threshold: 0.5, attacks: [attack1, attack2, attack3, newMechanic] },
  { threshold: 0.25, attacks: [enragedCombo, desperationMove] }
]


### Input Delay Ignoring
Not accounting for input-to-action delay
**Instead:** Measure total input latency: Input -> Action visible on screen.
Target: < 100ms for responsive games, < 66ms for fighting games.
Compensate for platform (TV game mode, wireless controllers).

// Common sources of delay:
// - Controller polling (8-16ms wireless)
// - Input processing (1 frame = 16.67ms)
// - Animation blend time (variable)
// - Display lag (16-60ms on TVs)
//
// Total can easily reach 100-200ms if not careful


### Cancel Everything Always
Every attack can cancel into any other action at any time
**Instead:** Cancels should be strategic choices, not universal escapes.
Design cancel hierarchies: Normal < Special < Super.
Some attacks SHOULD be committal - that's where reads happen.

// Good cancel design:
// Early frames: Can cancel into dodge (escape option)
// Active frames: Committed (risk)
// Late recovery: Can cancel into combo followup (reward for hit)


### Inconsistent Frame Data
Same-looking attacks with different timings
**Instead:** Visual similarity should mean timing similarity.
If two attacks look the same, they should have same frame data.
Exceptions must have clear visual distinction.

// Enemy has "quick slash" and "delayed slash"
// BAD: Both use same animation at different speeds
// GOOD: Delayed slash has distinct wind-up pose and effect


### Perfect Play Required
Combat that only works if player never makes mistakes
**Instead:** Design for "good enough" play, not perfect play.
Recovery from mistakes should be possible (healing, distance, etc).
Difficulty comes from consistency over time, not single execution tests.

// Dark Souls works because:
// Individual mistakes are recoverable (heal, back off)
// Difficulty is cumulative (resource management over time)
// Victory requires consistency, not perfection



## Sharp Edges (Gotchas)

*Real production issues that cause outages and bugs.*

*Sharp edges documented in full version.*

## Collaboration

### When to Hand Off

| Trigger | Delegate To | Context |
|---------|-------------|--------|
| `animation|blend tree|state machine|animator controller` | animation-systems | Combat animation integration |
| `enemy AI|behavior tree|boss patterns|patrol|aggression` | game-ai-behavior | Enemy behavior implementation |
| `hit effect|particles|screen shake|VFX|impact` | vfx-realtime | Combat visual feedback |
| `hit sound|impact audio|combat SFX|weapon sounds` | game-audio | Combat audio feedback |
| `game feel|juice|overall polish|responsiveness` | game-design | Combat feel tuning and polish |
| `shader|visual effect shader|dissolve|hit flash` | shader-programming | Combat visual effects implementation |
| `UI|health bar|damage numbers|combo counter` | game-design | Combat UI elements |
| `multiplayer|netcode|rollback|prediction` | game-networking | Networked combat implementation |

### Receives Work From

- **game-design**: Game needs combat system design
- **unity-development**: Unity game needs combat implementation guidance
- **unreal-engine**: Unreal game needs combat implementation guidance
- **godot-development**: Godot game needs combat implementation
- **mobile-game-dev**: Mobile game needs touch-friendly combat

### Works Well With

- animation-systems
- game-ai-behavior
- vfx-realtime
- game-audio
- game-design

---

## Get the Full Version

This skill has **automated validations**, **detection patterns**, and **structured handoff triggers** that work with the Spawner orchestrator.

```bash
npx vibeship-spawner-skills install
```

Full skill path: `~/.spawner/skills/game-dev/combat-design/`

**Includes:**
- `skill.yaml` - Structured skill definition
- `sharp-edges.yaml` - Machine-parseable gotchas with detection patterns
- `validations.yaml` - Automated code checks
- `collaboration.yaml` - Handoff triggers for skill orchestration

---

*Generated by [VibeShip Spawner](https://github.com/vibeforge1111/vibeship-spawner-skills)*
