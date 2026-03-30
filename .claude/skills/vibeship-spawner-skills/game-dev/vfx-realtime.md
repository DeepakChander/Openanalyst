# Real-Time VFX Artist

> Expert real-time VFX artist specializing in particle systems, shader effects, and the
invisible craft that makes games feel satisfying. Masters Niagara, VFX Graph, Godot GPU
particles, and understands the AAA principles that make effects read clearly at 60fps.


**Category:** game-dev | **Version:** 1.0.0

**Tags:** vfx, particles, effects, niagara, vfx-graph, game-juice, visual-effects, shaders, flipbook, trails, beams, explosions, optimization, gpu-particles

---

## Identity

[object Object]

## Expertise Areas

- Particle system architecture
- VFX timing and animation
- Effect composition and layering
- Flipbook and texture sheet creation
- Shader effects for VFX
- Performance budgeting for effects
- Effect LOD systems
- Procedural effect generation

## Patterns

### Shape-Timing-Color Framework
The foundational framework for creating readable, satisfying effects
**When:** Designing any new visual effect

### Anticipation-Action-Follow Through
Disney's 12 principles applied to VFX timing
**When:** Any effect that needs to feel impactful

### Secondary Motion System
Particles spawning particles for organic complexity
**When:** Effects feel too simple or mechanical

### Soft Particles for Intersection
Depth-based fade to avoid hard clipping against geometry
**When:** Particles intersect world geometry

### Flipbook Motion Blur
Texture animation with proper inter-frame blending
**When:** Using sprite sheet animations for effects

### Depth Fade for Volumetric Feel
Fading effects based on camera distance for atmospheric depth
**When:** Effects need to feel like they exist in 3D space

### Effect Layering Hierarchy
Composing complex effects from simple layers with clear hierarchy
**When:** Creating any multi-element effect

### Looping Effect Seamless Transition
Creating perfectly looping effects without visible seams
**When:** Any continuous effect (ambient particles, fire, energy shields)

### Value Contrast Priority
Designing effects that read in any lighting condition
**When:** Effects must work across different environments

### GPU Particle Simulation
Leveraging GPU compute for massive particle counts
**When:** Need thousands of particles without CPU bottleneck

### Screen-Space Effect Integration
Combining particle effects with post-processing for cohesion
**When:** Effects need to feel integrated with the rendered scene

### Procedural Noise for Organic Motion
Using noise functions to break up mechanical patterns
**When:** Particles look too uniform or computer-generated

### Performance Budget Framework
Structured approach to VFX performance allocation
**When:** Planning VFX for a scene or game


## Anti-Patterns

### Overdraw Overload
Stacking too many transparent particles causing massive fill rate cost
**Why it's bad:** Every pixel rendered multiple times multiplies GPU fragment work linearly

### Additive Blending Abuse
Using additive blending for everything, causing washed-out effects
**Why it's bad:** Additive particles sum to white, lose color information, blow out HDR

### Static Flipbook Timing
All particles playing flipbook at same speed and start frame
**Why it's bad:** Creates visible synchronization, looks artificial

### Ignoring Value Hierarchy
Creating effects purely based on color, ignoring brightness contrast
**Why it's bad:** Effects become unreadable on certain backgrounds, especially for colorblind players

### Missing Anticipation
Effects that start at full intensity with no buildup
**Why it's bad:** Feels sudden and unsatisfying; player doesn't register the event

### Symmetrical Particles
Using perfectly symmetrical textures for organic effects
**Why it's bad:** Bilateral symmetry reads as artificial; nature is asymmetric

### Fill Rate on Mobile
Desktop-quality effects destroying mobile performance
**Why it's bad:** Mobile GPU fill rate is 1/10th of desktop; effects that run fine on PC tank on phone

### Particle Sorting Always On
Forcing depth sort on all particle systems
**Why it's bad:** Sorting is O(n log n) per frame; thousands of particles = CPU spike

### No Effect LOD
Full-quality effects rendering regardless of distance or importance
**Why it's bad:** Distant effects wasting GPU cycles; effects during intense combat piling up

### Velocity Inheritance Without Damping
Particles inherit full parent velocity and maintain it forever
**Why it's bad:** Particles shoot away unnaturally fast and never settle


## Sharp Edges (Gotchas)

*Real production issues that cause outages and bugs.*

### [CRITICAL] Particle overdraw compounds exponentially with layers

**Situation:** Multiple particle systems rendering in same screen area

**Why it happens:**
Each transparent particle renders fully, discarding result based on alpha.
10 particles at 10% screen coverage = 100% fill rate EACH layer.
3 overlapping systems = 3x that fill rate. Large particles make this worse.
The "just add more particles" mentality destroys frame rate exponentially.

Real example: Fire (50 particles) + Smoke (100 particles) + Sparks (200 particles)
With average 5x overlap per particle = 1750 fragment shader invocations
per pixel in the effect area. At 1080p in a 200x200 pixel area = 70M fragments.


**Solution:**
```
1. AUDIT overdraw with GPU profiler visualization mode
2. CAP particle counts in system settings (not just spawn rate)
3. REDUCE particle lifetime to limit concurrent count
4. USE opaque particles with alpha test for non-blended elements
5. COMBINE systems - render one fire texture instead of 50 flame particles
6. CULL particles that would render behind others (depth-based kill)
7. SET fill rate budgets per effect: Tier 1 = 10%, Tier 2 = 2%, Tier 3 = 0.5%

```

**Symptoms:**
- GPU frame time spikes when effects trigger
- Framerate tanks looking at certain areas
- Mobile devices overheat during combat
- Performance varies wildly by camera angle
- Adding one more emitter causes disproportionate slowdown

---

### [HIGH] Transparency sorting is expensive and often wrong

**Situation:** Transparent particles rendering in wrong order causing visual artifacts

**Why it happens:**
Correct transparency requires back-to-front rendering order. Sorting thousands
of particles every frame is O(n log n) CPU cost. Even with sorting, particles
can interpenetrate and still look wrong. Large particles that span depth
ranges can never sort correctly - part should be in front, part behind.

Sorting across multiple emitters is worse - need global sort, not per-system.
GPU particles can't easily sort because simulation is on GPU, sort is on CPU.


**Solution:**
```
1. USE additive blending when possible (order-independent)
2. DESIGN particles that don't need sorting (small, fast, opaque cores)
3. ACCEPT imperfection - players rarely notice at 60fps
4. GROUP particles by depth and sort groups, not individuals
5. USE OIT (Order-Independent Transparency) for critical hero effects
6. LIMIT sorted particle count to < 1000 per frame
7. For GPU particles, consider depth-write pre-pass

```

**Symptoms:**
- Particles popping in front/behind each other
- Visual order changes as camera moves
- CPU spike from particle systems (not GPU)
- Smoke appearing in front of fire core

---

### [HIGH] Texture compression destroys flipbook quality, especially on mobile

**Situation:** Flipbook animations looking blocky, banded, or losing alpha edges

**Why it happens:**
DXT/BC compression works in 4x4 pixel blocks. Flipbook frames are often
small (64x64 to 256x256 per frame). Compression artifacts are VISIBLE at
these sizes. Alpha gradients get quantized to 4-8 levels in DXT5. Mobile
ASTC/ETC2 has similar issues. Pre-multiplied alpha helps but doesn't solve.

Worse: compression is shared across the entire atlas, so unrelated frames
can cause artifacts in each other through block boundaries.


**Solution:**
```
1. USE higher resolution per frame (min 128x128 for hero effects)
2. AVOID tiny frames - combine into larger animated texture
3. USE BC7 (desktop) or ASTC 4x4 (mobile) for better quality
4. TEST compression artifacts in-engine, not in image viewer
5. BAKE alpha into RGB (pre-multiply) to reduce alpha quantization
6. For critical effects, consider uncompressed (yes, memory cost)
7. ADD padding between frames to prevent block bleeding
8. USE power-of-2 frame sizes that align with block boundaries

```

**Symptoms:**
- Blocky edges on smoke/fire particles
- Color banding in gradients
- Alpha edges look "chunky" or stepped
- Effects look fine in editor, bad in build

---

### [HIGH] Effects don't scale with game time (slow-mo, pause, hitstop)

**Situation:** Game has time manipulation but effects play at wrong speed

**Why it happens:**
Particle systems using real time (Time.unscaledTime) continue during pause.
Systems using game time pause but don't slow correctly. Velocity is often
baked assuming 1.0 time scale. Flipbook animations don't account for time
scale at all by default. Emitters continue spawning during hitstop.

Slow-motion reveals all the sins: particles that move too fast, flipbooks
that animate normally while world is at 0.1x, trails that don't stretch.


**Solution:**
```
1. USE deltaTime consistently (not unscaledDeltaTime) for gameplay VFX
2. MULTIPLY velocities by timeScale in simulation
3. SCALE flipbook playback speed by timeScale
4. OPTION: Pause particle spawn during hitstop, let existing particles slow
5. SEPARATE "world" effects (use game time) from "UI" effects (use real time)
6. TEST all effects at 0.25x, 0.5x, 1.0x, 2.0x time scales
7. For Unreal: Use Game Time vs Real Time simulation space
8. For Unity: Check "Simulation Space" and "Time Scale Mode"

```

**Symptoms:**
- Effects keep playing during pause menu
- Slow-mo feels wrong because particles don't slow
- Hitstop but fire keeps animating normally
- Time rewind causes effects to behave strangely

---

### [CRITICAL] Mobile GPUs have 1/10th desktop fill rate - effects that work on PC die on phone

**Situation:** Effects performing fine in editor but destroying mobile frame rate

**Why it happens:**
Mobile GPUs are tile-based deferred renderers with extremely limited memory
bandwidth. Desktop GPU: ~500 GB/s bandwidth. Mobile GPU: ~25-50 GB/s.
That's 10-20x less bandwidth for filling pixels. Overdraw is catastrophic.

Additionally, mobile uses unified memory - GPU and CPU share RAM. Heavy
particle systems starve the CPU of memory bandwidth too. Thermal throttling
kicks in after 30-60 seconds of high load, making performance WORSE over time.


**Solution:**
```
1. HALVE particle counts on mobile at minimum (quarter for low-end)
2. REDUCE particle size - smaller = less fill rate
3. AVOID distortion effects entirely on mobile
4. LIMIT overdraw to 2x average, 4x peak
5. USE simpler shaders - 1 texture sample max, basic math
6. DISABLE soft particles on low-end (depth texture sample = expensive)
7. CULL effects aggressively based on screen importance
8. TEST on actual devices, not just scaled resolution in editor
9. PROFILE thermal throttling - run game for 10 mins then check perf

```

**Symptoms:**
- 60fps in editor, 20fps on device
- Framerate degrades over time (thermal throttle)
- Battery drains extremely fast
- Device gets hot during gameplay
- Effects work on flagship phone, die on budget phone

---

### [HIGH] Using wrong blend mode destroys readability and wastes fill rate

**Situation:** Effects looking washed out, invisible, or too bright in different contexts

**Why it happens:**
ADDITIVE (src + dst): Light emission, energy, glows. Sums to white on overlap.
Good: Lasers, magic, fire cores, explosions. Bad: Smoke, dust, debris.

ALPHA BLEND (src * alpha + dst * (1-alpha)): Occluding materials.
Good: Smoke, clouds, blood, debris. Bad: Energy effects (look dim).

Problem 1: Additive on dark backgrounds = vibrant. On bright = invisible.
Problem 2: Alpha blend stacking = muddy colors, not brighter.
Problem 3: Both together with wrong order = broken compositing.


**Solution:**
```
1. RULE: If it emits light, use additive. If it blocks light, use alpha.
2. LAYER: Core = additive, smoke around core = alpha blend
3. TEST: Check effect on pure white AND pure black backgrounds
4. PREMULTIPLY: Premultiplied alpha improves compositing, reduces fringing
5. HDR: Use values > 1.0 for additive bloom instead of max saturation
6. SOFT ADDITIVE: Blend mode OneMinusDstColor for softer addition
7. MULTIPLY: Use for shadows, ground darkening (darkens only)

```

**Symptoms:**
- Fire effect invisible in bright outdoor level
- Smoke turns level gray/washed out
- Stacking additive = white rectangle
- Colors look wrong compared to source texture

---

### [MEDIUM] Looping effects with visible reset/seam break immersion

**Situation:** Continuous effects (fire, waterfall, energy shield) showing periodic stutter

**Why it happens:**
Many effects loop based on particle lifetime. When all particles die at once,
there's a frame with fewer particles. Noise-based animation using raw time
snaps back when loop restarts. Flipbook last frame doesn't blend into first.

These seams are subtle but the brain detects repetition unconsciously.
Players will say "something feels off" without identifying the loop point.


**Solution:**
```
1. STAGGER particle birth times - never all at once
2. VARY lifetime randomly (+/- 20% minimum)
3. USE modular noise: noise(sin(time * 2 * PI / loopDuration))
4. CROSSFADE: Spawn new wave as old wave fades out
5. FLIPBOOK: Ensure frame 0 and frame N-1 blend seamlessly
6. RECORD and scrub effect to find loop point, fix visually
7. Multiple particle groups offset by 1/N of loop period

```

**Symptoms:**
- Effect "pulses" or "breathes" periodically
- Visible pop when loop restarts
- Animation feels repetitive even if you can't say why
- Particles all respawn at once

---

### [MEDIUM] Particle motion not matching world physics feels wrong

**Situation:** Effects that feel floaty, too fast, or disconnected from game world

**Why it happens:**
Game gravity: -9.8 m/s^2. Particle gravity: random artist value.
Result: Debris floats like it's on the moon. Sparks fall faster than character.
Players don't consciously notice, but wrong physics triggers uncanny valley.

Also: Wind affects world but not particles. Water splash but particles
go through water surface. Character hits ground but debris keeps falling.


**Solution:**
```
1. MATCH game gravity exactly for physical debris
2. USE gameplay physics for collision when needed
3. APPLY same wind forces to particles as world
4. INHERIT character velocity on spawn for attached effects
5. KILL particles on collision with ground/water
6. REFERENCE real footage - slow-mo video of fire, explosions, debris
7. Mass-based gravity: heavier debris falls faster (larger = heavier)

```

**Symptoms:**
- Debris feels floaty or moon-like
- Effects detached from character motion
- Wind affects trees but not nearby particles
- Splash spray going wrong direction

---

### [HIGH] No LOD system for effects = impossible to scale for different hardware

**Situation:** Effects working on dev machine but tanking on min-spec or console

**Why it happens:**
VFX artists work on powerful machines. They make effects that look great
at full quality. No one thinks about low-end until the game ships.
Then: "just reduce particle counts" - but effects designed for 1000 particles
look broken with 100. Need to design for scalability from the start.


**Solution:**
```
1. DESIGN at LOW settings first, add detail for higher
2. CREATE quality tiers: Ultra/High/Medium/Low/Off
3. DOCUMENT particle budgets per tier before production
4. SEPARATE "essential" from "polish" particles
5. TEST on min-spec hardware regularly, not just at end
6. PROVIDE fallback effects - simple sprite if particles disabled
7. USE scalability system in engine:
   - Niagara: Scalability settings, effect types
   - VFX Graph: Output contexts with conditions
   - Godot: Process mode and LOD

```

**Symptoms:**
- Min-spec device unplayable but dev machines fine
- Graphics settings don't affect VFX performance
- Lowering quality just makes effects look broken
- No difference between Medium and Low VFX settings

---

### [MEDIUM] Depth-based effects fail at distance due to Z-buffer precision loss

**Situation:** Soft particles, depth fade, distortion breaking at far distances

**Why it happens:**
Z-buffer has more precision near camera, less far away. At 100m+ distance,
depth values may have only 1-2 bits of precision. Soft particle fade
calculation becomes binary - either 0 or 1, no gradient.

This is worse with large far clip plane (1000+) or small near plane (<0.1).
Reverse-Z helps but doesn't fully solve for extreme distances.


**Solution:**
```
1. PUSH near plane as far as possible (0.3m for FPS, 1m+ for RTS)
2. USE reverse-Z depth buffer when available
3. FADE out depth-based effects with distance
4. INCREASE soft particle distance for far effects
5. FALLBACK to non-soft particles beyond certain distance
6. USE linear depth in shader calculations when possible
7. CONSIDER logarithmic depth buffer for extreme ranges

```

**Symptoms:**
- Soft particles popping between hard/soft at distance
- Depth fade flickering in far view
- Effects look fine near camera, broken far away
- Z-fighting in distant particle effects

---

## Collaboration

### When to Hand Off

| Trigger | Delegate To | Context |
|---------|-------------|--------|
| `shader code|HLSL|GLSL|custom material|shader graph` | shader-programming | VFX requires custom shader implementation |
| `game design|player feedback|juice|game feel` | game-design | VFX needs game design context |
| `sound|audio|sfx|audio sync|sound effect` | game-audio | VFX needs audio synchronization |
| `combat|hit effect|damage|attack|ability` | combat-design | VFX for combat system |
| `animation|rig|skeleton|motion` | animation-systems | VFX needs animation synchronization |
| `Unity|URP|HDRP|Unity particles|VFX Graph` | unity-development | VFX needs Unity-specific implementation |
| `Unreal|UE5|Niagara|Cascade` | unreal-engine | VFX needs Unreal implementation |
| `Godot|GPUParticles|CPUParticles` | godot-development | VFX needs Godot implementation |

### Receives Work From

- **game-design**: Game needs visual feedback for gameplay events
- **unity-development**: Unity project needs particle effects
- **unreal-engine**: Unreal project needs Niagara effects
- **godot-development**: Godot project needs particle effects
- **combat-design**: Combat system needs hit feedback and ability effects

### Works Well With

- shader-programming
- game-design
- game-audio
- unity-development
- unreal-engine
- godot-development
- lighting-design
- animation-systems
- performance-hunter
- mobile-game-dev

---

## Get the Full Version

This skill has **automated validations**, **detection patterns**, and **structured handoff triggers** that work with the Spawner orchestrator.

```bash
npx vibeship-spawner-skills install
```

Full skill path: `~/.spawner/skills/game-dev/vfx-realtime/`

**Includes:**
- `skill.yaml` - Structured skill definition
- `sharp-edges.yaml` - Machine-parseable gotchas with detection patterns
- `validations.yaml` - Automated code checks
- `collaboration.yaml` - Handoff triggers for skill orchestration

---

*Generated by [VibeShip Spawner](https://github.com/vibeforge1111/vibeship-spawner-skills)*
