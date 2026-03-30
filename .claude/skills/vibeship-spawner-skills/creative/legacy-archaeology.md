# Legacy Archaeology

> Expert in understanding and navigating legacy codebases. Covers code
archaeology techniques, finding hidden knowledge, mapping dependencies,
and extracting understanding from code without documentation. Knows how
to read the stories that old code tells.


**Category:** creative | **Version:** 1.0.0

---

## Identity

[object Object]

## Expertise Areas

- Code archaeology
- Dependency mapping
- Knowledge extraction
- System understanding
- Hidden documentation
- Historical context
- Risk assessment

## Patterns

### The Archaeological Dig
Systematic approach to understanding legacy code
```
## Archaeological Dig Process

### 1. Survey Phase (Day 1)

```
DON'T read code yet. Gather context:

□ README (even if outdated)
□ Deployment config (what runs where)
□ Database schema (the truth)
□ Environment variables (integration points)
□ Dependencies (package.json, etc.)
```

| Artifact | Reveals |
|----------|---------|
| Package versions | When last updated |
| Config files | What services connect |
| Database schema | True data model |
| Test files | Actual behavior |

### 2. Excavation Phase (Week 1)

```
ENTRY POINTS:

1. Start from HTTP routes / CLI commands
2. Follow the happy path first
3. Note patterns, don't judge yet
4. Map what calls what
```

| Technique | Tool |
|-----------|------|
| Call graph | IDE "Find References" |
| Data flow | Follow variables |
| Entry points | Routes, main(), handlers |

### 3. Documentation Phase (Ongoing)

```
AS YOU LEARN:

- Create system diagram
- Note "here be dragons" areas
- Document what ISN'T obvious
- Write the onboarding doc you wish you had
```

### 4. Risk Assessment

| Risk Level | Signs |
|------------|-------|
| Low | Tests exist, clear patterns |
| Medium | Some tests, mixed patterns |
| High | No tests, confusing logic |
| Critical | Nobody understands, production critical |

```

### Git Archaeology
Using version control history as documentation
```
## Reading Git History

### 1. Key Commands

```bash
# Who knows this file?
git shortlog -sn -- path/to/file

# When did this function change?
git log -p -S "functionName" -- path/

# What was the context of this line?
git blame -w -C -C -C path/to/file

# What changed together?
git log --stat --oneline -- path/
```

### 2. What History Reveals

| Pattern | Meaning |
|---------|---------|
| Many authors, one file | Hot spot, high risk |
| Recent changes | Active development |
| Old commits only | Abandoned or stable |
| Revert commits | Problem area |
| Long messages | Complex context |

### 3. The "Why" Hunt

```
FINDING CONTEXT:

1. git blame → find the commit
2. Read the full commit message
3. Look for ticket/PR references
4. Check if PR exists with discussion
5. Search Slack/email archives
```

### 4. Author Archaeology

| If author... | Try |
|--------------|-----|
| Still at company | Ask them |
| Left recently | Ask their manager |
| Long gone | Check their PRs |
| Multiple authors | Find the most recent |

```

### Test-Driven Understanding
Using tests to understand behavior
```
## Tests as Documentation

### 1. Test Hierarchy

```
MOST USEFUL FOR UNDERSTANDING:

1. Integration tests → What the system does
2. Unit tests → What components do
3. E2E tests → User flows
4. Fixtures → Valid data shapes
```

### 2. Reading Tests

| Test Element | Reveals |
|--------------|---------|
| Test name | Intended behavior |
| Setup/arrange | Required state |
| Assertions | Expected outcomes |
| Mocks | External dependencies |

### 3. Exploration via Tests

```javascript
// Add console.logs to understand flow
test('existing test', () => {
  console.log('Input:', input);
  const result = mysteryFunction(input);
  console.log('Output:', result);
  // existing assertions
});
```

### 4. Creating Understanding Tests

```javascript
// Write tests to document discoveries
describe('DISCOVERY: mysteryFunction', () => {
  test('returns X when given Y', () => {
    // Documents your understanding
    // If it breaks, understanding was wrong
  });
});
```

```

### Dependency Mapping
Understanding system interconnections
```
## Mapping Dependencies

### 1. External Dependencies

```
FIND:

□ Environment variables → External services
□ HTTP calls → APIs consumed
□ Database connections → Data stores
□ Message queues → Async dependencies
□ File paths → Filesystem dependencies
```

| Config Type | Check |
|-------------|-------|
| .env files | Connection strings |
| docker-compose | Services required |
| kubernetes | External services |
| config/*.json | Integration points |

### 2. Internal Dependencies

```
CREATE DIAGRAM:

┌─────────┐    ┌──────────┐    ┌──────────┐
│ Routes  │───▶│ Services │───▶│  Models  │
└─────────┘    └──────────┘    └──────────┘
                    │
                    ▼
               ┌──────────┐
               │ External │
               │   APIs   │
               └──────────┘
```

### 3. Data Flow Tracing

| Trace | Method |
|-------|--------|
| Request → Response | Follow handler |
| Write → Read | Follow data ID |
| Event → Handler | Search for subscribers |

### 4. Coupling Assessment

| Coupling Level | Sign |
|----------------|------|
| Low | Clear interfaces |
| Medium | Shared utilities |
| High | Direct database access |
| Dangerous | Circular dependencies |

```


## Anti-Patterns

### The Premature Rewrite
Deciding to rewrite before understanding
**Why it's bad:** You'll repeat mistakes.
Lose hidden requirements.
Likely fail anyway.


### The Judgment Trap
Dismissing code as "bad" without context
**Why it's bad:** Miss the real constraints.
Disrespect previous work.
Create same problems.


### The Isolation Dig
Trying to understand alone
**Why it's bad:** Slower than asking.
Miss tribal knowledge.
Reinvent understanding.



## Sharp Edges (Gotchas)

*Real production issues that cause outages and bugs.*

*Sharp edges documented in full version.*

## Collaboration

### When to Hand Off

| Trigger | Delegate To | Context |
|---------|-------------|--------|
| `tech debt|refactor|improve` | tech-debt-negotiation | Need to prioritize changes |
| `documentation|write up|explain` | documentation-that-slaps | Need to document findings |
| `git|history|blame|commit` | git-time-travel | Need git history analysis |
| `incident|failure|broke` | incident-postmortem | Need incident analysis |

### Receives Work From

- **tech-debt-negotiation**: Debt requiring understanding
- **incident-postmortem**: Incident root cause investigation
- **git-time-travel**: Git history analysis

### Works Well With

- tech-debt-negotiation
- documentation-that-slaps
- git-time-travel
- incident-postmortem

---

## Get the Full Version

This skill has **automated validations**, **detection patterns**, and **structured handoff triggers** that work with the Spawner orchestrator.

```bash
npx vibeship-spawner-skills install
```

Full skill path: `~/.spawner/skills/creative/legacy-archaeology/`

**Includes:**
- `skill.yaml` - Structured skill definition
- `sharp-edges.yaml` - Machine-parseable gotchas with detection patterns
- `validations.yaml` - Automated code checks
- `collaboration.yaml` - Handoff triggers for skill orchestration

---

*Generated by [VibeShip Spawner](https://github.com/vibeforge1111/vibeship-spawner-skills)*
