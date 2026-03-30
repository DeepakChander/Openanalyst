# Godot 4 Development

> Expert Godot 4 game developer specializing in GDScript, the node/scene system,
signals, resources, and engine-native patterns. Provides deep knowledge of
Godot's unique architecture, performance optimization, and best practices
for building games from simple prototypes to production-ready releases.


**Category:** game-dev | **Version:** 1.0.0

**Tags:** godot, gdscript, game-engine, game-development, 2d-games, 3d-games, open-source

---

## Identity

[object Object]

## Patterns


## Sharp Edges (Gotchas)

*Real production issues that cause outages and bugs.*

### [HIGH] undefined

**Solution:**
```
```gdscript
# WRONG: Children not ready yet
func _enter_tree() -> void:
    $HealthBar.max_value = max_health  # Error: null

# CORRECT: Use _ready for child access
func _ready() -> void:
    $HealthBar.max_value = max_health  # Works

# Use _enter_tree only for:
# - Connecting to parent/tree signals
# - Setting up before children initialize
# - Adding to groups early
```

```

---

### [CRITICAL] undefined

**Solution:**
```
```gdscript
# Option 1: Disconnect in _exit_tree
func _ready() -> void:
    EventBus.game_event.connect(_on_game_event)

func _exit_tree() -> void:
    if EventBus.game_event.is_connected(_on_game_event):
        EventBus.game_event.disconnect(_on_game_event)

# Option 2: Use one-shot for single-use signals
enemy.died.connect(_on_enemy_died, CONNECT_ONE_SHOT)

# Option 3: Use Callable with CONNECT_DEFERRED (auto-cleanup)
# Godot 4.2+ handles some cases automatically

# Option 4: Weak references for optional listeners
# (advanced - use with caution)
```

```

---

### [HIGH] undefined

**Solution:**
```
```gdscript
# WRONG: Tree traversal every frame
func _process(delta: float) -> void:
    var player = $"../Player"
    var enemies = get_tree().get_nodes_in_group("enemies")

# CORRECT: Cache in _ready
@onready var player: CharacterBody2D = $"../Player"
var enemies: Array[Node]

func _ready() -> void:
    enemies = get_tree().get_nodes_in_group("enemies")
    # Update cache when enemies change
    get_tree().node_added.connect(_on_node_added)

func _process(delta: float) -> void:
    # Use cached references
    player.take_damage(1)
```

```

---

### [MEDIUM] undefined

**Solution:**
```
```gdscript
# BAD: Global state autoload
# Global.gd
var player_health = 100
var player_coins = 0

# GOOD: State on actual objects
# Player.gd
extends CharacterBody2D
var health: int = 100
var coins: int = 0

# Use autoloads for:
# - EventBus (signals only, no state)
# - SaveManager (load/save, transient)
# - AudioManager (plays sounds, no game state)
# - SceneManager (transitions, no game state)
```

```

---

### [HIGH] undefined

**Solution:**
```
```gdscript
# WRONG: Physics in _process
func _process(delta: float) -> void:
    velocity += gravity * delta
    move_and_slide()

# CORRECT: Physics in _physics_process
func _physics_process(delta: float) -> void:
    velocity += gravity * delta
    move_and_slide()

# _process is for:
# - Visual updates (sprite animation)
# - UI updates
# - Audio triggers
# - Non-gameplay timers
```

```

---

### [MEDIUM] undefined

**Solution:**
```
```gdscript
# Issue 1: Default override
@export var speed: float = 100.0  # Changed to 200.0 in code
# Existing scenes still have 100.0 saved!
# Fix: Reset in inspector or delete .tscn and recreate

# Issue 2: Shared resources
@export var inventory: Array = []  # Shared across instances!
# Fix: Initialize in _ready
var inventory: Array
func _ready() -> void:
    inventory = []

# Issue 3: Resource sharing
@export var stats: Resource  # Same instance if not unique
# Fix: Make unique in inspector OR:
func _ready() -> void:
    stats = stats.duplicate()

# Issue 4: Complex types
@export var data: Dictionary  # Limited editor support
# Fix: Use custom Resource class instead
```

```

---

### [MEDIUM] undefined

---

### [MEDIUM] undefined

**Solution:**
```
```gdscript
# 1. Use multiple TileMapLayers instead of one TileMap with layers
# (Godot 4.3+ TileMapLayer is faster)

# 2. Chunk large maps
# Only load visible chunks

# 3. Batch tile operations
# BAD: Set tiles one by one
for x in 1000:
    for y in 1000:
        tilemap.set_cell(0, Vector2i(x, y), source, atlas)

# BETTER: Use set_cells_terrain_connect for terrain
# Or queue changes and apply in batches

# 4. Disable navigation/physics on decorative layers
# In TileSet, only enable collision on necessary layers
```

```

---

### [MEDIUM] undefined

**Solution:**
```
```gdscript
# The tree processes top-to-bottom:
# Player (processes first)
# Enemy (processes second, sees Player's NEW position)
# UI (processes last, sees current state)

# If order matters:
# 1. Rearrange nodes in tree
# 2. Use process_priority (lower = earlier)
func _ready() -> void:
    process_priority = -1  # Process before default (0)

# 3. Use signals for guaranteed timing
# 4. Use call_deferred for next-frame operations
call_deferred("late_update")
```

```

---

### [MEDIUM] undefined

**Solution:**
```
```gdscript
# 1. Use Input Map (Project Settings > Input Map)
# DON'T hardcode keys
if Input.is_key_pressed(KEY_SPACE):  # Bad
if Input.is_action_pressed("jump"):   # Good

# 2. Choose correct callback
# _input: ALL input, including handled
# _unhandled_input: Input not consumed by UI
# _physics_process: Poll-based input for movement

func _unhandled_input(event: InputEvent) -> void:
    if event.is_action_pressed("interact"):
        interact()
        get_viewport().set_input_as_handled()

func _physics_process(delta: float) -> void:
    # Movement input (continuous)
    var direction = Input.get_vector("left", "right", "up", "down")

# 3. UI blocking input
# Control nodes consume input by default
# Use mouse_filter = MOUSE_FILTER_IGNORE on overlays
```

```

---

## Collaboration

### Receives Work From

- **game-design**: 
- **procedural-generation**: 
- **game-ai-behavior**: 
- **game-art**: 
- **game-audio**: 

---

## Get the Full Version

This skill has **automated validations**, **detection patterns**, and **structured handoff triggers** that work with the Spawner orchestrator.

```bash
npx vibeship-spawner-skills install
```

Full skill path: `~/.spawner/skills/game-dev/godot-development/`

**Includes:**
- `skill.yaml` - Structured skill definition
- `sharp-edges.yaml` - Machine-parseable gotchas with detection patterns
- `validations.yaml` - Automated code checks
- `collaboration.yaml` - Handoff triggers for skill orchestration

---

*Generated by [VibeShip Spawner](https://github.com/vibeforge1111/vibeship-spawner-skills)*
