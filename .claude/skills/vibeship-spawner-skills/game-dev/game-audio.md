# Game Audio Design & Implementation

> Expert game audio designer and implementer specializing in interactive sound design,
adaptive music systems, spatial audio, and audio middleware integration. Brings
deep knowledge of FMOD, Wwise, and native engine audio systems to create immersive
sonic experiences that respond dynamically to gameplay.


**Category:** game-dev | **Version:** 1.0.0

**Tags:** audio, sound, music, game-audio, fmod, wwise, spatial-audio, middleware, mixing, sound-design

---

## Identity

[object Object]

## Expertise Areas

- Audio system architecture
- Sound design implementation
- Music system design
- Audio middleware setup
- Spatial audio configuration
- Audio mixing and buses
- Voice/VO integration
- Audio optimization

## Patterns

### Audio Manager Singleton
Centralized audio management with proper initialization and cleanup
**When:** Setting up audio system architecture

### Audio Source Pooling
Reuse AudioSources instead of creating/destroying them
**When:** Playing frequent sound effects

### Spatial Audio Setup
Configure 3D audio with proper falloff and spatialization
**When:** Implementing positional audio in 3D games

### Adaptive Music System
Music that responds to gameplay states
**When:** Implementing dynamic game music

### Audio Bus Architecture
Proper routing and mixing hierarchy
**When:** Setting up audio mixing

### Memory-Conscious Audio Loading
Strategic loading and unloading of audio assets
**When:** Managing audio memory budget

### Audio Occlusion System
Realistic sound blocking by geometry
**When:** Implementing environmental audio realism


## Anti-Patterns

### Creating AudioSources at Runtime
Instantiating and destroying AudioSources causes GC spikes
**Why it's bad:** Memory allocation during gameplay causes frame hitches

### Loading All Audio Upfront
Loading every sound file at game start
**Why it's bad:** Excessive memory usage and long load times

### Ignoring Platform Audio Limits
Not accounting for platform voice limits
**Why it's bad:** Mobile has 32-64 voices, console 128-256 - exceeding causes dropouts

### Linear Volume Sliders
Using linear 0-1 values directly for volume
**Why it's bad:** Human hearing is logarithmic - linear feels wrong

### Hardcoded Audio References
Referencing audio clips directly in gameplay code
**Why it's bad:** Tight coupling, hard to iterate on sound design

### No Audio Prioritization
All sounds treated equally
**Why it's bad:** Important sounds get drowned out or stolen

### Uncompressed Audio in Builds
Shipping WAV or uncompressed audio
**Why it's bad:** Massive file sizes, memory waste

### Synchronous Audio Loading
Loading audio on main thread during gameplay
**Why it's bad:** Causes frame spikes and stuttering


## Sharp Edges (Gotchas)

*Real production issues that cause outages and bugs.*

### [CRITICAL] undefined

**Symptoms:**
- Sounds randomly not playing
- Audio cutting out during intense scenes
- No errors but missing sound effects
- Works in editor, fails on device

---

### [HIGH] undefined

**Symptoms:**
- 3D sounds too quiet or too loud
- Sound doesn't fade with distance
- Audio feels 'flat' or unrealistic
- Sounds cut off abruptly at max distance

---

### [HIGH] undefined

**Symptoms:**
- Metallic or 'underwater' sound quality
- Audible artifacts on sustained notes
- Looping audio has clicks/pops
- Build size unexpectedly large

---

### [CRITICAL] undefined

**Symptoms:**
- Out of memory crashes
- Audio stops working mid-session
- Performance degradation over time
- Mobile app killed by OS

---

### [HIGH] undefined

**Symptoms:**
- Audio plays with delay on first trigger
- Disk/storage thrashing
- Memory usage spikes
- Audio skips during streaming

---

### [CRITICAL] undefined

**Symptoms:**
- Sounds randomly cut out
- Works on PC, fails on console/mobile
- Audio system becomes unresponsive
- Priority sounds not playing

---

### [HIGH] undefined

**Symptoms:**
- Random crashes in audio system
- Corrupted audio output
- Deadlocks during audio operations
- Race conditions in audio callbacks

---

### [MEDIUM] undefined

**Symptoms:**
- Click or pop when audio loops
- Audible seam in looping music
- Discontinuity at loop point

---

### [MEDIUM] undefined

**Symptoms:**
- Reverb sounds wrong or too heavy
- Sudden reverb changes when moving
- Performance issues with many zones
- Reverb doesn't match environment

---

### [HIGH] undefined

**Symptoms:**
- Game audio stops when phone call ends
- Audio interrupted by notifications
- Background audio from other apps plays over game
- Volume duck not working properly

---

## Collaboration

### Receives Work From

- **unity-development**: 
- **unreal-engine**: 
- **godot-development**: 
- **game-dev-unity**: 
- **game-dev-godot**: 

---

## Get the Full Version

This skill has **automated validations**, **detection patterns**, and **structured handoff triggers** that work with the Spawner orchestrator.

```bash
npx vibeship-spawner-skills install
```

Full skill path: `~/.spawner/skills/game-dev/game-audio/`

**Includes:**
- `skill.yaml` - Structured skill definition
- `sharp-edges.yaml` - Machine-parseable gotchas with detection patterns
- `validations.yaml` - Automated code checks
- `collaboration.yaml` - Handoff triggers for skill orchestration

---

*Generated by [VibeShip Spawner](https://github.com/vibeforge1111/vibeship-spawner-skills)*
