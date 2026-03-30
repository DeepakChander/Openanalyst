# Animation Systems Architect

> Expert in real-time game animation systems including skeletal animation, blend trees,
state machines, inverse kinematics, root motion, procedural animation, and animation
retargeting. Specializes in creating fluid, responsive character animation that balances
visual quality with performance constraints.


**Category:** game-dev | **Version:** 1.0.0

**Tags:** animation, game-dev, character, state-machine, unity, unreal, godot, skeletal, rigging, motion

---

## Identity

[object Object]

## Expertise Areas

- Animation state machine design
- Blend tree architecture
- IK system implementation
- Animation event systems
- Root motion integration
- Animation data pipeline
- Animation compression strategies
- Retargeting systems
- Procedural animation
- Animation LOD

## Patterns


## Sharp Edges (Gotchas)

*Real production issues that cause outages and bugs.*

### [CRITICAL] undefined

**Solution:**
```
1. Server-authoritative position, client-side animation
2. Snapshot root motion destination, lerp to it
3. Use root motion for visuals only, code for actual movement
4. Send target position with animation trigger

```csharp
// Network-safe root motion
[Command]
void CmdPlayAttack(Vector3 startPos, Vector3 targetPos)
{
    // Server validates and broadcasts
    RpcPlayAttackAnimation(startPos, targetPos);
}

[ClientRpc]
void RpcPlayAttackAnimation(Vector3 startPos, Vector3 targetPos)
{
    // Client plays animation but lerps to authoritative position
    StartCoroutine(AnimateToPosition(startPos, targetPos, attackDuration));
}
```

```

**Symptoms:**
- Characters teleport or rubber-band
- Player position differs between clients
- Attacks miss despite appearing to hit
- Characters slide after animation ends

---

### [HIGH] undefined

**Solution:**
```
1. **Sync markers**: Tag foot contact points in all blend animations
2. **Matching**: Only blend animations at matching foot phases
3. **Normalized time**: Ensure all locomotion loops have same phase
4. **Animation authoring**: Create animations with matched timing

```
Walk cycle:    [L down]----[R down]----[L down]
Run cycle:     [L down]----[R down]----[L down]
                    ↑           ↑
               Sync points must align
```

Unity: Use "Foot IK" on Humanoid with proper foot contacts
Unreal: Use Sync Groups in Anim Graph

```

**Symptoms:**
- Feet clip through ground during walk-to-run transition
- Character appears to hover at certain blend values
- Foot IK goes crazy trying to compensate
- Legs twist unnaturally during blends

---

### [MEDIUM] undefined

**Solution:**
```
Per-bone compression settings:
```
Spine/Major bones: Normal compression (0.5 degrees)
Hands/Fingers: Reduced compression (0.1 degrees)
Weapons/Props: Minimal compression
Facial: Minimal compression
Fast actions: Increase keyframe density

Unity AnimationClip settings:
- Rotation Error: 0.5 (default) → 0.1 for fingers
- Position Error: Increase precision for IK targets

Unreal:
- Per-track compression settings
- "Bitwise Compress Only" for important bones
```

```

**Symptoms:**
- Fingers jitter or pop
- Weapon wobbles unnaturally
- Fast swings have visible stepping
- Facial animation looks robotic

---

### [HIGH] undefined

**Solution:**
```
1. **Guard conditions**: Check current state in transition
2. **Can Transition To Self = false**: Prevent self-transitions
3. **Exit time requirements**: Add minimum time in state
4. **Use specific transitions**: Avoid Any State when possible

```csharp
// In animator controller:
// Any State → HitReact
// Conditions: TookDamage = true
// Settings: Can Transition To Self = FALSE

// Reset trigger after transition
void OnStateEnter(Animator animator, AnimatorStateInfo stateInfo, int layerIndex)
{
    if (stateInfo.IsName("HitReact"))
    {
        animator.ResetTrigger("TookDamage");
    }
}
```

```

**Symptoms:**
- Character stuck in animation loop
- Can't exit a state despite meeting conditions
- State machine behaves differently than expected
- Same animation plays repeatedly

---

### [HIGH] undefined

**Solution:**
```
```
IK Budget Guidelines (per character):
- Foot IK: 2 chains, 3 iterations each (~0.1ms)
- Hand IK: 2 chains, 3 iterations (~0.1ms)
- Look At: 1 chain, single pass (~0.02ms)
- Full Body: AVOID or LOD aggressively (~1-2ms)

LOD Strategy:
- Distance 0-10m: Full IK
- Distance 10-25m: Foot IK only
- Distance 25m+: No IK, baked animation

Optimization:
1. Reduce iteration count (3 is usually enough)
2. Skip IK when not visible
3. Update IK at reduced frequency (every 2-3 frames)
4. Use analytical IK for 2-bone chains
```

```

**Symptoms:**
- Frame rate drops with many characters
- Animation update dominates profiler
- IK quality varies with frame rate
- Characters freeze momentarily

---

### [CRITICAL] undefined

**Solution:**
```
1. **Use consistent reference pose**: Usually T-pose or first frame
2. **Create additive from same base**:
   ```
   Walking + Tired Additive = Walking Tired
   Reference for Tired Additive = Walking (first frame)
   ```
3. **Test on multiple bases**: Verify additive works on all intended bases
4. **Clamp extreme values**: Limit bone rotations

Unity:
- Set "Additive Reference Pose" in animation import
- Use same rig reference pose for all additives

Unreal:
- "Apply Mesh Space Additive" vs "Local Space"
- Define reference pose in skeleton

```

**Symptoms:**
- Character explodes when additive plays
- Bones rotate to impossible angles
- Additive looks completely different on different bases
- Subtle additive becomes extreme

---

### [MEDIUM] undefined

**Solution:**
```
```csharp
// Option 1: Use event ranges instead of points
// Event at frame 10-12 instead of exactly frame 10

// Option 2: Check event window in code
public class SafeAnimationEvents : StateMachineBehaviour
{
    public float damageWindowStart = 0.3f;
    public float damageWindowEnd = 0.5f;
    private bool damageDealt = false;

    public override void OnStateUpdate(Animator animator,
        AnimatorStateInfo stateInfo, int layerIndex)
    {
        float normalizedTime = stateInfo.normalizedTime % 1f;

        if (!damageDealt &&
            normalizedTime >= damageWindowStart &&
            normalizedTime <= damageWindowEnd)
        {
            // Deal damage
            damageDealt = true;
        }
    }

    public override void OnStateExit(Animator animator,
        AnimatorStateInfo stateInfo, int layerIndex)
    {
        damageDealt = false;
    }
}
```

```

**Symptoms:**
- Footstep sounds don't play at low FPS
- Damage frame never triggers
- VFX spawns at wrong time
- Events work in editor, fail in build

---

### [MEDIUM] undefined

**Solution:**
```
1. **Match proportions**: Design characters with similar ratios
2. **Use IK for contacts**: Hands reaching objects, feet on ground
3. **Per-character adjustments**: Scale offsets for specific bones
4. **Motion warping**: Adjust root motion for character scale

```
Character A (source): Arm reach 1.0m
Character B (target): Arm reach 0.8m

Without correction: B's hands don't reach objects
With IK correction: IK pulls hands to target positions

Per-bone scale adjustment:
- Import animation with "Preserve Hierarchy"
- Apply bone-level scale multipliers
```

```

**Symptoms:**
- Hands don't reach targets
- Feet float or clip through ground
- Animations look stretched or compressed
- IK targets are in wrong positions

---

### [MEDIUM] undefined

**Solution:**
```
```csharp
public class LayerWeightController : MonoBehaviour
{
    private Animator animator;
    private float targetWeight;
    private float currentWeight;
    private int layerIndex = 1;

    [SerializeField] private float blendSpeed = 5f;

    void Update()
    {
        // Smoothly interpolate layer weight
        currentWeight = Mathf.MoveTowards(currentWeight, targetWeight,
            blendSpeed * Time.deltaTime);
        animator.SetLayerWeight(layerIndex, currentWeight);
    }

    public void EnableLayer()
    {
        targetWeight = 1f;
    }

    public void DisableLayer()
    {
        targetWeight = 0f;
    }
}
```

```

**Symptoms:**
- Upper body snaps when aiming
- Visible pop when enabling layer
- Blending looks unnatural

---

### [HIGH] undefined

**Solution:**
```
```
Memory Optimization:
1. Reduce pose database resolution (15fps vs 30fps)
2. Compress pose data (quantize, delta encoding)
3. Cluster similar poses, store representatives
4. Stream pose data (load chunks as needed)
5. Share databases between similar characters

Typical budgets:
- Main character: 50-100MB pose database
- NPCs: 10-20MB shared database
- Crowds: 2-5MB minimal database

Compression techniques:
- Store deltas from previous pose
- Quantize floats to 16-bit
- PCA dimensionality reduction on features
```

```

**Symptoms:**
- Memory usage spikes on animation load
- Long load times
- Out of memory on consoles
- Can't fit all characters in memory

---

## Collaboration

### Receives Work From

- **unity-development**: 
- **unreal-engine**: 
- **game-ai-behavior**: 
- **character-controller**: 
- **game-physics**: 

---

## Get the Full Version

This skill has **automated validations**, **detection patterns**, and **structured handoff triggers** that work with the Spawner orchestrator.

```bash
npx vibeship-spawner-skills install
```

Full skill path: `~/.spawner/skills/game-dev/animation-systems/`

**Includes:**
- `skill.yaml` - Structured skill definition
- `sharp-edges.yaml` - Machine-parseable gotchas with detection patterns
- `validations.yaml` - Automated code checks
- `collaboration.yaml` - Handoff triggers for skill orchestration

---

*Generated by [VibeShip Spawner](https://github.com/vibeforge1111/vibeship-spawner-skills)*
