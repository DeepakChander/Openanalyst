# 3D Modeling Expert

> Expert 3D modeling specialist with deep knowledge of topology, UV mapping,
game-ready and film-ready pipelines, DCC tool workflows (Blender, Maya, ZBrush,
3ds Max, Houdini), retopology, LOD systems, and export pipelines. This skill
represents years of production experience distilled into actionable guidance.


**Category:** game-dev | **Version:** 1.0.0

**Tags:** 3d, modeling, topology, uv, game-dev, vfx, blender, maya, zbrush, retopology, lod, hard-surface, organic, sculpting

---

## Identity

[object Object]

## Expertise Areas

- mesh-topology
- uv-mapping
- retopology
- lod-creation
- 3d-export-formats
- subdivision-modeling
- hard-surface-modeling
- organic-modeling
- mesh-optimization
- texel-density

## Patterns

### Topology for Deformation
Edge loops must follow muscle flow and joint rotation axes. This isn't
optional - it's physics.

```
## Edge Loop Placement Rules

### Joint Areas (Elbows, Knees, Fingers)
- Minimum 3 edge loops at each joint
- 1 loop at the pivot point (where bone rotates)
- 1 loop on each side for falloff
- For 180-degree bends, add 2 more loops (5 total)

```
BAD (2 loops):        GOOD (3 loops):       BEST (5 loops for full bend):
═══════════════       ═══════════════       ═══════════════════════════
    │     │               │  │  │                 │ │ │ │ │
    │     │               │  │  │                 │ │ │ │ │
═══════════════       ═══════════════       ═══════════════════════════
(pinches badly)       (clean bend)          (180° bend without artifacts)
```

### Face Topology
- Eye loops: Concentric circles around the eye socket (minimum 2)
- Mouth loops: Horizontal loops following the lips (minimum 3)
- Nasolabial fold: Edge flow from nose to mouth corner
- Never let edge loops terminate at the face - always flow to ears/neck

### Muscle Direction
```
Bicep:    Loops perpendicular to arm length (allow bulge)
Forearm:  Loops follow twist rotation axis
Chest:    Loops follow pectoral muscle shape
Back:     Loops follow latissimus dorsi fan shape
```

### Pole Placement
- 5-poles (5 edges meeting) create tension - place in low-deformation areas
- 3-poles (3 edges meeting) are rare - usually indicate problems
- Ideal locations: center of cheek, back of head, back of hand
- NEVER place poles: at joints, on lips, around eyes

```

### Modular Asset Workflow
Build assets from reusable, tileable components that snap together without
visible seams. Essential for environment art and level design.

```
## Grid-Based Modeling

### Establish Grid Units
```
Standard game grids:
- Unreal Engine: 100 units = 1 meter (power of 2 subdivisions: 100, 50, 25, 12.5)
- Unity: 1 unit = 1 meter (subdivisions: 1, 0.5, 0.25, 0.125)
- Godot: 1 unit = 1 meter

Model in your target engine's units from the START
```

### Modular Piece Types
```
Wall pieces:      4m x 3m (width x height)
Floor tiles:      4m x 4m
Corner pieces:    Match wall dimensions
Trim pieces:      4m length, variable height
Props:            Fit within grid or explicit measurements
```

### Pivot Point Standards
```
Walls:            Bottom-center of the piece
Floors:           Center of the piece (for rotation)
Corners:          At the corner vertex
Props:            Bottom-center or contact point with ground
Doors/Windows:    Center of the opening
```

### Seamless Tiling Rules
1. Edge vertices MUST align to grid
2. Matching edges need IDENTICAL vertex count
3. UV seams should be at connection points
4. Normal direction must be consistent across all pieces

### Vertex Welding at Connections
```python
# Blender Python example - weld modular pieces
import bpy

def weld_modular_pieces(objects, threshold=0.001):
    """Weld vertices at modular connection points"""
    bpy.ops.object.select_all(action='DESELECT')
    for obj in objects:
        obj.select_set(True)
    bpy.context.view_layer.objects.active = objects[0]
    bpy.ops.object.join()
    bpy.ops.object.mode_set(mode='EDIT')
    bpy.ops.mesh.select_all(action='SELECT')
    bpy.ops.mesh.remove_doubles(threshold=threshold)
    bpy.ops.object.mode_set(mode='OBJECT')
```

```

### LOD Creation Strategy
Create efficient Level of Detail meshes that maintain silhouette and reduce
draw calls without visual popping.

```
## LOD Reduction Targets

### Standard LOD Chain
```
LOD0: 100% (base mesh)
LOD1: 50%  (first reduction - maintain silhouette)
LOD2: 25%  (medium distance - simplify internal detail)
LOD3: 12%  (far distance - basic shape only)
LOD4: 5%   (impostor distance - optional billboard)
```

### What to Remove at Each LOD

**LOD1 (50%)**
- Internal edge loops that don't affect silhouette
- Bevels on edges not visible at distance
- Small extrusions < 5% of object size
- Subdivisions in flat areas

**LOD2 (25%)**
- Most bevels except major edges
- Secondary shapes
- Internal geometry completely
- Reduce circular segments (32 → 16 → 8)

**LOD3 (12%)**
- All bevels
- Tertiary shapes
- Circular segments to minimum (8 → 6 → 4)
- Merge separate meshes into single shapes

### Preservation Priority
```
1. Silhouette edges (NEVER remove)
2. Contact points with other objects
3. Major surface breaks
4. Character-recognizable features (eyes, hands)
5. Everything else
```

### Distance Thresholds (Unreal defaults)
```python
# Screen size percentage when LOD switches
LOD0_to_LOD1 = 0.8   # 80% screen coverage
LOD1_to_LOD2 = 0.4   # 40% screen coverage
LOD2_to_LOD3 = 0.2   # 20% screen coverage
LOD3_to_LOD4 = 0.1   # 10% screen coverage
```

### Manual vs Automatic LOD
```
USE AUTOMATIC (Simplygon, InstaLOD, Blender Decimate):
- Props with no deformation
- Environment meshes
- Static decorations

USE MANUAL:
- Characters (preserve edge loops)
- Weapons (maintain profile)
- Vehicles (preserve functional silhouette)
- Hero props (anything in close-up cutscenes)
```

```

### Hard Surface Modeling Workflow
Non-destructive hard surface modeling using booleans, bevels, and modifiers
that maintain editability throughout production.

```
## Non-Destructive Stack (Blender)

### Modifier Order (CRITICAL)
```
1. Mirror (if symmetrical)
2. Array (if repeating)
3. Boolean (cutters live in separate collection)
4. Bevel (weight-based, not angle-based)
5. Weighted Normal (for shading)
6. Triangulate (export only - keep disabled)
7. Subdivision (optional, for curved surfaces)
```

### Boolean Best Practices
```
CUTTER SETUP:
- Keep cutters in hidden collection named "Cutters" or "Bool_Cuts"
- Name cutters: ObjectName_Cut_Description (e.g., Gun_Cut_MagWell)
- Cutters should be slightly larger than the cut
- Use Exact solver, not Fast (Fast creates artifacts)

AVOIDING BOOLEAN ARTIFACTS:
- Ensure cutters have clean topology (no n-gons)
- Cutter edges should not align with base mesh edges
- Cutter should fully penetrate (no partial intersections)
- After boolean, check for non-manifold geometry
```

### Bevel Weight Workflow
```python
# Instead of auto-smooth angle, use bevel weights

Edge Types:
- Sharp edges:     Bevel Weight = 1.0, Crease = 1.0
- Medium edges:    Bevel Weight = 0.5, Crease = 0.5
- Soft edges:      Bevel Weight = 0.0, Crease = 0.0

# Bevel modifier settings:
Width:          0.02 (adjust to scale)
Segments:       3 (for subdiv) or 2 (for game)
Limit Method:   Weight
Miter Outer:    Arc
Harden Normals: ON
```

### Floating Geometry Technique
```
For panel lines and surface details:
1. Model detail as separate mesh
2. Position slightly above surface (0.001 units)
3. Shrinkwrap modifier to conform to surface
4. Bake to normal map for game use

Benefits:
- Easy to edit/reposition
- Clean normal map bakes
- Works with curved surfaces
```

```

### Organic Sculpting Workflow
Efficient sculpting pipeline from blockout to final detail, with proper
subdivision management and retopology planning.

```
## Sculpting Phase Pipeline

### Phase 1: Primary Forms (Subdivision 1-2)
```
Focus: Overall silhouette and proportions
Tools: Move, Clay, Grab
Time:  30% of sculpting time

Checkpoints:
- [ ] Silhouette reads clearly from all angles
- [ ] Major masses are established
- [ ] Proportions match reference
- [ ] No anatomy errors at this stage
```

### Phase 2: Secondary Forms (Subdivision 3-4)
```
Focus: Muscle groups, major wrinkles, feature shapes
Tools: Clay Buildup, Dam Standard, Inflate
Time:  40% of sculpting time

Checkpoints:
- [ ] Muscle anatomy is defined
- [ ] Major skin folds established
- [ ] Features (eyes, nose, mouth) shaped
- [ ] Hands/feet blocked in
```

### Phase 3: Tertiary Detail (Subdivision 5-7)
```
Focus: Skin pores, fine wrinkles, micro-detail
Tools: Standard, Alpha stamps, Surface noise
Time:  30% of sculpting time

Checkpoints:
- [ ] Pore detail consistent across surface
- [ ] Fine wrinkles follow tension lines
- [ ] No stretching or compression artifacts
- [ ] Detail density matches final resolution
```

### ZBrush-Specific Workflow
```
Subdivision Management:
- Work at lowest subdivision possible
- Use "Smooth Subdivison" for organic, "Flat" for hard surface
- Store morph targets before major changes
- Use layers for detail passes (can blend/adjust later)

Polygroup Strategy:
- Group by: material zones, symmetry halves, detail areas
- Use for: masking, hiding, isolation, UV planning
```

### Retopology Planning During Sculpt
```
While sculpting, note:
- Where edge loops should go for animation
- UV seam locations (hide in creases)
- Material boundaries
- Areas needing extra resolution

Mark these using polygroups or polypaint
```

```

### UV Unwrapping Strategy
Efficient UV layouts that maximize texture resolution while hiding seams
and maintaining consistent texel density.

```
## Texel Density Standards

### Calculate Target Texel Density
```
Formula: Texel Density = Texture Resolution / World Size

AAA Game Standards:
- Hero characters:    10.24 px/cm (1024px per meter)
- NPCs:               5.12 px/cm  (512px per meter)
- Large props:        5.12 px/cm
- Environment:        2.56 px/cm
- Distant background: 1.28 px/cm

Mobile Standards:
- All assets:         2.56-5.12 px/cm
```

### Texel Density Checker (Blender)
```python
# Add-on: "Texel Density Checker" by mrven
# Or calculate manually:

def check_texel_density(obj, texture_size):
    """Check if UV density is consistent"""
    mesh = obj.data
    uv_layer = mesh.uv_layers.active.data

    densities = []
    for poly in mesh.polygons:
        # Calculate 3D area
        world_area = poly.area

        # Calculate UV area
        uv_verts = [uv_layer[loop_idx].uv for loop_idx in poly.loop_indices]
        uv_area = calculate_polygon_area(uv_verts)

        # Texel density
        density = (texture_size * math.sqrt(uv_area)) / math.sqrt(world_area)
        densities.append(density)

    return min(densities), max(densities), sum(densities)/len(densities)
```

### Seam Placement Rules
```
HIDE SEAMS IN:
- Natural creases (armpit, groin, behind ears)
- Material boundaries (skin to cloth)
- Back of objects (where camera rarely sees)
- Underside of props
- Inside of mouths/eyelids

AVOID SEAMS ON:
- Face front (especially across nose/lips)
- Visible flat surfaces
- Areas with stretching patterns
- Across areas with continuous detail
```

### UV Island Organization
```
Layout Strategy:
1. Group related islands together (all face islands, all body islands)
2. Orient islands consistently (same "up" direction)
3. Straight edges should be axis-aligned
4. Mirror matching islands when possible
5. Leave 2-4 pixel padding between islands

Padding Formula:
- 256px texture:  2px padding minimum
- 512px texture:  4px padding minimum
- 1024px texture: 8px padding minimum
- 2048px texture: 16px padding minimum
- 4096px texture: 32px padding minimum
```

### UDIM Workflow (Film/High-End)
```
When to use UDIMs:
- Texture resolution > 8K needed
- Multiple texture sets on one mesh
- Film/VFX production

UDIM Layout:
1001: Face
1002: Head back/neck
1003: Torso front
1004: Torso back
1005-1006: Arms
1007-1008: Legs
1009-1010: Hands (one per hand)
```

```

### High to Low Poly Baking
Transfer detail from sculpts to game-ready meshes through normal, AO, and
curvature map baking with proper cage setup.

```
## Baking Setup Checklist

### Pre-Bake Requirements
```
HIGH POLY:
- [ ] All transforms applied (Ctrl+A in Blender)
- [ ] Normals facing outward (Shift+N recalculate)
- [ ] No holes or open edges
- [ ] Smoothing groups/hard edges set correctly
- [ ] Named with _high suffix

LOW POLY:
- [ ] All transforms applied
- [ ] UVs unwrapped with proper padding
- [ ] No overlapping UVs (for unique maps)
- [ ] Named with _low suffix
- [ ] Matches high poly in world position

CAGE (optional but recommended):
- [ ] Duplicate of low poly, slightly inflated
- [ ] Named with _cage suffix
- [ ] No intersections with high poly
```

### Cage Creation
```
Method 1: Manual (Most Control)
1. Duplicate low poly
2. Apply Displace modifier with constant offset
3. Manually adjust problem areas

Method 2: Ray Distance (Faster)
1. Use baking software's ray distance setting
2. Start with auto, adjust per-mesh

Cage Rules:
- Must fully encompass high poly
- Should not intersect high poly
- Larger cage = more bake margin for error
- Too large = ray misses, artifacts
```

### Baking Settings (Marmoset Toolbag)
```
Samples:        64 (production) / 16 (preview)
Output Size:    Match final texture (2K, 4K)
Padding:        Match UV padding in pixels

Normal Map:
- Tangent space (for game engines)
- Flip Y: ON for Unity, OFF for Unreal

AO Map:
- Ray count: 128+
- Ignore backfaces: ON
- Self-occlusion only: typically ON
```

### Common Baking Artifacts and Fixes
```
PROBLEM: Wavy/wobbly normals
CAUSE: Low poly normals not matching high poly
FIX: Set low poly to smooth shading, add hard edges at UV seams

PROBLEM: Black areas in bake
CAUSE: Cage too tight, rays missing high poly
FIX: Inflate cage, increase ray distance

PROBLEM: "Skirt" artifacts at edges
CAUSE: Rays hitting wrong surface
FIX: Add geometry to low poly to separate surfaces

PROBLEM: Seams visible on normal map
CAUSE: UV seam on curved surface
FIX: Move seam to hard edge, or split mesh at seam

PROBLEM: Gradient across flat surface
CAUSE: Averaged normals on low poly
FIX: Set hard edges on 90-degree corners
```

```

### Retopology Best Practices
Create optimized, animation-ready topology from sculpts using manual and
semi-automatic techniques.

```
## Retopology Target Budgets

### Character Poly Budgets (Triangles)
```
AAA Current-Gen (2024):
- Hero character:     80,000 - 150,000
- Main NPCs:          30,000 - 60,000
- Background NPCs:    10,000 - 20,000
- Creatures (large):  50,000 - 100,000

Mobile/VR:
- Main character:     5,000 - 15,000
- NPCs:               2,000 - 5,000

Film/Cinematic:
- No real limit, but animation-friendly topology
```

### Body Part Distribution (Hero Character)
```
Head/Face:    25-30%  (most expression detail)
Torso:        20-25%  (deformation areas)
Arms:         15-20%  (elbow/wrist detail)
Hands:        15-20%  (finger articulation)
Legs:         15-20%  (knee/ankle detail)
```

### Manual Retopo Workflow (Blender)
```
Setup:
1. Import sculpt, apply shrinkwrap modifier to new mesh
2. Enable X-mirror for symmetrical work
3. Use Poly Build or RetopoFlow add-on

Process:
1. Start with main edge loops (eye, mouth, joints)
2. Connect loops with quad fills
3. Work from high-detail areas outward
4. Check topology against animation requirements
5. Final pass: optimize unnecessary geometry

Shrinkwrap Settings:
- Mode: Nearest Surface Point
- Snap Mode: Above Surface
- Offset: 0.001 (small gap prevents z-fighting)
```

### Semi-Automatic Tools
```
ZBrush ZRemesher:
- Good for: organic shapes, quick iterations
- Settings: Target poly count, adaptive size ON
- Post-process: Always manual cleanup for animation

Quad Remesher (Blender/3ds Max):
- Better edge flow than ZRemesher
- Can guide with edge flow curves
- Still needs manual work at joints

When to Use Automatic:
- Props and hard surface (no deformation)
- Quick previews
- Background assets

When to Use Manual:
- Face topology (always)
- Joint areas (elbows, knees, fingers)
- Anything with blend shapes
```

```

### Export Pipeline Standards
Standardized export workflow for all major game engines and formats,
avoiding the most common export issues.

```
## Pre-Export Checklist

### Universal Requirements
```
- [ ] All transforms applied (scale, rotation, location)
- [ ] Scale is 1.0, 1.0, 1.0
- [ ] Origin point is correct (usually bottom-center)
- [ ] Normals are facing outward
- [ ] No n-gons (triangulate if needed)
- [ ] No non-manifold geometry
- [ ] No floating vertices
- [ ] Named correctly (no spaces, no special characters)
```

### Format Selection
```
FBX:
- Best for: Unreal Engine, Unity (with animation)
- Pros: Industry standard, embedded materials/textures
- Cons: Proprietary format, versioning issues

glTF/GLB:
- Best for: Web, Godot, cross-platform
- Pros: Open standard, PBR material support
- Cons: Less animation support than FBX

OBJ:
- Best for: Static meshes, quick transfer
- Pros: Universal support, simple format
- Cons: No animation, no hierarchy

USD:
- Best for: Film/VFX, complex scenes
- Pros: Industry standard for film, non-destructive
- Cons: Complex, not all game engines support
```

### FBX Export Settings (Blender)
```
Scale:              1.0 (or 0.01 for Unreal if needed)
Apply Scalings:     FBX All
Forward:            -Y Forward (Unreal) / Z Forward (Unity)
Up:                 Z Up

Geometry:
- Apply Modifiers:  ON
- Triangulate:      ON (for game engines)
- Tangent Space:    ON

Armature:
- Add Leaf Bones:   OFF (usually)
- Primary Bone Axis: Y
- Secondary Bone Axis: X

Animation:
- Bake Animation:   ON
- NLA Strips:       OFF (export each action separately)
```

### Engine-Specific Settings

#### Unreal Engine
```
FBX Settings in Blender:
- Scale: 1.0 (UE handles conversion)
- Forward: -Y Forward
- Up: Z Up

In Unreal Import:
- Convert Scene: ON
- Force Front XAxis: OFF
- Convert Scene Unit: ON
- Import Normals: Import Normals and Tangents
```

#### Unity
```
FBX Settings in Blender:
- Scale: 1.0
- Forward: -Z Forward
- Up: Y Up

Or just use .blend file directly (Unity 2020.1+)

In Unity Import:
- Scale Factor: 1
- Import BlendShapes: ON
- Import Normals: Import
- Tangents: Calculate Mikktspace
```

#### Godot
```
Preferred: glTF 2.0 (.glb)

glTF Settings in Blender:
- Format: glTF Binary (.glb)
- Include: Selected Objects only
- Transform: +Y Up
- Geometry: Apply Modifiers, UVs, Normals
- Compression: Draco (for web)
```

```

### Asset Naming Conventions
Industry-standard naming for 3D assets, ensuring clarity in large productions
and compatibility with version control.

```
## Naming Structure

### General Format
```
[Prefix]_[AssetName]_[Variant]_[LOD/Type]

Examples:
SM_Chair_Wood_LOD0          (Static Mesh)
SK_Character_Hero_LOD1      (Skeletal Mesh)
T_Chair_Wood_D              (Texture - Diffuse)
M_Chair_Wood                (Material)
```

### Prefixes by Type
```
SM_     Static Mesh
SK_     Skeletal Mesh
T_      Texture
M_      Material
MI_     Material Instance
A_      Animation
BP_     Blueprint (Unreal)
FX_     Effect/Particle
S_      Sound
W_      Widget
```

### Texture Suffixes
```
_D      Diffuse / Albedo / Base Color
_N      Normal Map
_R      Roughness
_M      Metallic
_AO     Ambient Occlusion
_H      Height / Displacement
_E      Emissive
_O      Opacity / Alpha
_ARM    Packed: AO, Roughness, Metallic (RGB)
_ORM    Packed: Occlusion, Roughness, Metallic (RGB)
```

### LOD Naming
```
_LOD0   Base mesh (highest quality)
_LOD1   First reduction
_LOD2   Second reduction
_LOD3   Third reduction
_LOD4   Lowest quality / impostor
```

### Version Control Friendly Names
```
DO:
- Use underscores, not spaces
- Use PascalCase or camelCase
- Keep names under 64 characters
- Use numbers for variants (Chair_01, Chair_02)

DON'T:
- Spaces in names (Chair Wood ❌)
- Special characters (&, %, #, etc.)
- Very long names
- Ambiguous names (Final, Final2, FinalFinal)
```

### Folder Structure
```
Project/
├── Characters/
│   ├── Hero/
│   │   ├── Mesh/
│   │   ├── Textures/
│   │   ├── Materials/
│   │   └── Animations/
│   └── NPCs/
├── Props/
│   ├── Furniture/
│   └── Weapons/
├── Environment/
│   ├── Modular/
│   └── Unique/
└── VFX/
```

```


## Anti-Patterns

### Modeling with N-gons
Leaving n-gons (polygons with more than 4 sides) in production geometry.
N-gons cause unpredictable subdivision, shading artifacts, and export issues.

**Why it's bad:** - Subdivision surfaces create artifacts at n-gon boundaries
- Different software triangulates n-gons differently
- Causes shading discontinuities
- Can break physics/collision generation
- Animation deformation becomes unpredictable


### Exporting with Unapplied Transforms
Exporting models without applying scale, rotation, and location transforms.
This causes scaling and orientation issues in game engines.

**Why it's bad:** - Object may appear at wrong scale in engine
- Rotation values affect animation and physics
- Parent/child relationships break
- Baking produces incorrect results
- LOD switching may not work correctly


### Overlapping UVs for Unique Bakes
Using overlapping/mirrored UVs when baking unique maps (normal, AO, etc.).
Overlapping UVs work for tiling textures but cause baking artifacts.

**Why it's bad:** - Multiple surfaces bake to same UV space
- Normal map shows averaged/corrupted data
- AO shows incorrect shadowing
- Impossible to paint unique details


### Poor Boolean Cleanup
Leaving boolean operations without cleaning up the resulting geometry,
leading to n-gons, overlapping faces, and non-manifold edges.

**Why it's bad:** - Creates n-gons that must be fixed later
- Can create non-manifold geometry
- Causes shading issues
- Makes topology unusable for animation
- Subdivision creates artifacts


### Inconsistent Texel Density
UV islands with wildly different texel densities, causing some surfaces
to appear blurry while others are sharp.

**Why it's bad:** - Visual inconsistency is immediately noticeable
- Important surfaces may be under-detailed
- Unimportant surfaces waste texture space
- Makes the asset look unprofessional


### Modeling at Wrong Scale
Creating models at arbitrary scale instead of real-world or engine-native
units, causing issues when combining assets.

**Why it's bad:** - Assets don't fit together
- Physics behaves incorrectly
- Lighting/shadows look wrong
- Texture density becomes unpredictable
- Modular pieces don't snap


### Dense Topology Where Not Needed
Adding the same topology density everywhere regardless of visibility,
deformation needs, or silhouette importance.

**Why it's bad:** - Wastes performance budget
- Makes editing harder
- Increases file size
- Slows down rendering
- Makes rigging more difficult



## Sharp Edges (Gotchas)

*Real production issues that cause outages and bugs.*

## Collaboration

### Receives Work From

- **concept-art**: 
- **game-design**: 
- **3d-scanning**: 
- **procedural-generation**: 

---

## Get the Full Version

This skill has **automated validations**, **detection patterns**, and **structured handoff triggers** that work with the Spawner orchestrator.

```bash
npx vibeship-spawner-skills install
```

Full skill path: `~/.spawner/skills/game-dev/3d-modeling/`

**Includes:**
- `skill.yaml` - Structured skill definition
- `sharp-edges.yaml` - Machine-parseable gotchas with detection patterns
- `validations.yaml` - Automated code checks
- `collaboration.yaml` - Handoff triggers for skill orchestration

---

*Generated by [VibeShip Spawner](https://github.com/vibeforge1111/vibeship-spawner-skills)*
