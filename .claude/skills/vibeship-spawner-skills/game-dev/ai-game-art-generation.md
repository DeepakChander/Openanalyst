# AI Game Art Generation

> Master AI-powered game asset pipelines using ComfyUI, Stable Diffusion, FLUX, ControlNet, and IP-Adapter. Creates production-ready sprites, textures, UI, and environments with consistency, proper licensing, and game engine integration.


**Category:** game-dev | **Version:** 1.0

---

## Identity

[object Object]

## Expertise Areas

- AI image generation for games
- ComfyUI workflow design
- LoRA training for game styles
- Asset consistency pipelines
- Batch processing workflows
- Background removal and transparency

## Patterns

### ComfyUI Game Asset Pipeline
Production workflow for consistent game assets

### LoRA Training for Game Styles
Train custom models for perfect style matching

### Tileable Texture Generation
Create seamless, game-ready textures with PBR maps

### Character Consistency Pipeline
Generate consistent characters across multiple poses/angles

### Batch Asset Automation
Process hundreds of assets overnight

### Steam AI Disclosure Compliance
Proper AI content disclosure for Steam release


## Anti-Patterns

### AI Slop Production
Mass-generating without quality curation
**Why it's bad:** Creates generic, recognizable "AI art" that players and critics will immediately identify and criticize. Damages game perception.


### Prompt Adjective Stacking
Loading prompts with competing descriptors
**Why it's bad:** "vibrant cinematic dreamy soft golden pastel muted ethereal" creates statistical chaos - each word pulls in different directions.


### Ignoring License Terms
Using AI tools without checking commercial terms
**Why it's bad:** Stability AI requires enterprise license if revenue > $1M. Midjourney requires paid plan for commercial use. Steam requires disclosure. Violations = legal risk.


### No Version Control for AI Assets
Not tracking AI assets in Git LFS
**Why it's bad:** AI generation is non-deterministic. Lost assets cannot be exactly regenerated. Prompts + seeds must be documented.



## Sharp Edges (Gotchas)

*Real production issues that cause outages and bugs.*

### [CRITICAL] undefined

**Solution:**
```
1. Document revenue projections
2. If expecting > $1M, contact Stability AI for enterprise license
3. Consider FLUX or other alternatives for commercial work
4. Maintain clear documentation of all AI tool usage

```

**Symptoms:**
- Cease and desist letter
- Steam store removal threat
- Legal liability

---

### [HIGH] undefined

**Solution:**
```
1. Never use free tier for commercial projects
2. Enable Stealth Mode (Pro/Mega only) for confidential work
3. Pro plan minimum for commercial game development
4. Document license tier used for each asset

```

**Symptoms:**
- Copyright claim on game assets
- Competitors copying revealed concepts

---

### [HIGH] undefined

**Solution:**
```
1. Complete AI Content section in Steam Content Survey
2. Classify as Pre-Generated or Live-Generated
3. Describe guardrails for live generation
4. NEVER use Adult Only Sexual Content with live AI

```

**Symptoms:**
- Store page rejection
- Post-launch takedown
- Negative reviews from disclosure omission

---

### [HIGH] undefined

**Solution:**
```
1. Train custom LoRA on character reference art
2. Use IP-Adapter with starting_control_step: 0.5
3. Seed lock for reproducibility
4. Generate ALL poses/expressions in single session
5. Manual QA pass to catch outliers
6. Keep master reference sheet for verification

```

**Symptoms:**
- Same character looks different in different scenes
- Players notice "multiple twins" effect
- Art feels inconsistent, amateur

---

### [MEDIUM] undefined

**Solution:**
```
1. Use ControlNet with OpenPose for structured poses
2. Generate hands separately and composite
3. Use negative prompts: "extra fingers, deformed hands, bad anatomy"
4. Always manually review character outputs
5. Consider stylization that hides anatomical details

```

**Symptoms:**
- Extra or missing fingers
- Merged limbs
- Impossible body proportions
- Uncanny valley effect

---

### [MEDIUM] undefined

**Solution:**
```
1. Use Retro Diffusion or similar specialized models
2. Post-process with color quantization
3. Manual cleanup of edge pixels
4. Generate at exact target resolution (e.g., 32x32)
5. Custom downscaling algorithms, not standard bicubic

```

**Symptoms:**
- Blurry pixels instead of crisp edges
- Inconsistent pixel sizes in same image
- Random noise patterns
- Sub-pixel details that shouldn't exist

---

### [MEDIUM] undefined

**Solution:**
```
1. Define explicit color palette before generation
2. Use consistent, focused prompt vocabulary
3. Train LoRA on reference palette
4. Post-process to enforce palette compliance
5. Use color reference image with IP-Adapter

```

**Symptoms:**
- Colors don't match across assets
- Muddy, unfocused color schemes
- Style feels inconsistent

---

### [MEDIUM] undefined

**Solution:**
```
1. Use specialized tiling workflow (circular convolution)
2. Generate 4 similar textures and use Seamless Stitcher
3. Add variation overlays in-engine
4. Test at game zoom levels, not just preview
5. Use larger tile sizes to reduce repetition visibility

```

**Symptoms:**
- Obvious grid pattern when tiled
- Edge artifacts at tile boundaries
- Player notices repetition

---

### [MEDIUM] undefined

**Solution:**
```
1. Use FP16/FP8 quantized models
2. Reduce batch size to 1
3. Lower resolution, upscale after
4. Enable tiled VAE decode
5. Close other GPU applications
6. Consider cloud GPU (RunPod, etc.)

```

**Symptoms:**
- CUDA out of memory errors
- System freeze during generation
- Workflow only works with tiny batch sizes

---

### [HIGH] undefined

**Solution:**
```
1. Set up Git LFS before first generation
2. Track all binary formats: *.png, *.jpg, *.psd, *.blend
3. Use lockable files for unmergeable assets
4. Document prompts + seeds + model versions
5. Store ComfyUI workflow JSON with assets

```

**Symptoms:**
- Binary files too large for git
- Assets lost after branch switch
- Cannot reproduce exact asset

---

## Collaboration

### When to Hand Off

| Trigger | Delegate To | Context |
|---------|-------------|--------|
| `3D model|mesh|sculpt` | 3d-modeling | AI generates 2D reference, 3D skill creates mesh |
| `animate|rig|skeleton|motion` | rigging-animation | AI generates static sprites, animation skill adds motion |
| `pixel art|retro|8-bit|16-bit` | pixel-art | Specialized pixel art has different workflow |
| `voxel|3D pixels|Minecraft style` | voxel-art | Voxel art requires specialized techniques |
| `texture UV|material|shader` | texture-art | Complex texture work needs specialized skill |

### Receives Work From

- **concept-art**: 
- **game-design-core**: 
- **character-design**: 
- **environment-art**: 
- **ui-ux-design**: 

### Works Well With

- texture-art
- character-design
- pixel-art
- voxel-art
- concept-art
- environment-art
- ui-ux-design

---

## Get the Full Version

This skill has **automated validations**, **detection patterns**, and **structured handoff triggers** that work with the Spawner orchestrator.

```bash
npx vibeship-spawner-skills install
```

Full skill path: `~/.spawner/skills/game-dev/ai-game-art-generation/`

**Includes:**
- `skill.yaml` - Structured skill definition
- `sharp-edges.yaml` - Machine-parseable gotchas with detection patterns
- `validations.yaml` - Automated code checks
- `collaboration.yaml` - Handoff triggers for skill orchestration

---

*Generated by [VibeShip Spawner](https://github.com/vibeforge1111/vibeship-spawner-skills)*
