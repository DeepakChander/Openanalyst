# Monorepo Management

> Expert at organizing and optimizing monorepos. Covers Turborepo, Nx,
pnpm workspaces, task orchestration, caching, and dependency management.
Knows how to scale codebases without scaling build times.


**Category:** backend | **Version:** 1.0.0

**Tags:** monorepo, turborepo, nx, pnpm, workspace, caching

---

## Identity

[object Object]

## Patterns


## Sharp Edges (Gotchas)

*Real production issues that cause outages and bugs.*

### [CRITICAL] Code works locally but fails in CI

**Situation:** App imports lodash. Works locally. CI fails: Cannot find module
lodash. Turns out lodash was installed by another package, not
declared in this apps package.json.


**Why it happens:**
Node.js module resolution walks up directories. In monorepos,
packages can accidentally use dependencies from siblings or root
without declaring them.


**Solution:**
```
# USE STRICT PACKAGE MANAGERS

// .npmrc for pnpm
strict-peer-dependencies=true
auto-install-peers=false

// Or use Nx/Turborepo with strict mode

// Always declare dependencies explicitly
// packages/app/package.json
{
  "dependencies": {
    "lodash": "^4.17.21"  // Declare it!
  }
}

// Use pnpm why to find phantom deps
pnpm why lodash

```

**Symptoms:**
- Works locally, fails in CI
- Cannot find module errors
- Inconsistent builds

---

### [HIGH] Package A needs B, B needs A

**Situation:** Adding feature to package A requires importing from B. But B
already imports from A. Now you have a circular dependency.
Build fails or produces wrong output.


**Why it happens:**
Circular dependencies create import ordering issues. TypeScript
may not see the types. Runtime code may not be initialized yet.


**Solution:**
```
# BREAK CYCLES WITH SHARED PACKAGE

// WRONG: Circular
// packages/auth imports packages/api
// packages/api imports packages/auth

// RIGHT: Extract shared
packages/
  auth/          # Uses types from shared
  api/           # Uses types from shared
  shared/        # Common types and utilities

// Or use dependency injection
// packages/api/src/index.ts
export function createApi(auth: AuthService) {
  // Inject auth instead of importing
}

// Check for cycles
npx madge --circular packages/

```

**Symptoms:**
- Build order issues
- Type errors for existing code
- Undefined imports at runtime

---

### [MEDIUM] Cache not invalidating when it should

**Situation:** Changed shared package. Ran build. Apps using it did not rebuild.
Deployed stale code. Users see old behavior or errors.


**Why it happens:**
Turborepo/Nx cache by inputs. If inputs are not configured
correctly, changes do not trigger rebuild.


**Solution:**
```
# CONFIGURE INPUTS CORRECTLY

// turbo.json
{
  "tasks": {
    "build": {
      "dependsOn": ["^build"],  // Build deps first
      "inputs": [
        "src/**",
        "package.json",
        "tsconfig.json"
      ],
      "outputs": ["dist/**"]
    }
  },
  "globalDependencies": [
    ".env",                    // Env changes invalidate
    "tsconfig.base.json"       // Shared config
  ]
}

// Force rebuild if needed
turbo build --force

// Check what will run
turbo build --dry-run

```

**Symptoms:**
- Changes not reflected after build
- Stale cached artifacts
- Works after --force

---

### [MEDIUM] Different versions of same package across workspace

**Situation:** App uses React 18, UI package uses React 17. Hooks dont work.
Two copies of React in bundle. Weird runtime errors.


**Why it happens:**
Monorepos should use single versions. Multiple versions bloat
bundles and cause runtime conflicts, especially for React.


**Solution:**
```
# SINGLE VERSION POLICY

// Root package.json - manage versions here
{
  "devDependencies": {
    "react": "^18.2.0",
    "typescript": "^5.0.0"
  }
}

// Package package.json - use workspace protocol
{
  "peerDependencies": {
    "react": "^18.0.0"
  },
  "devDependencies": {
    "react": "workspace:*"  // Gets from root
  }
}

// Or use syncpack to enforce versions
npx syncpack list-mismatches
npx syncpack fix-mismatches

// pnpm overrides for forcing versions
// package.json (root)
{
  "pnpm": {
    "overrides": {
      "react": "^18.2.0"
    }
  }
}

```

**Symptoms:**
- Multiple React copies in bundle
- Hook errors
- Invalid hook call

---

## Collaboration

### When to Hand Off

| Trigger | Delegate To | Context |
|---------|-------------|--------|
| `CI/CD for monorepo` | cicd-pipelines | Pipeline optimization |
| `shared UI components` | react-patterns | UI package design |
| `TypeScript config` | typescript-strict | Shared tsconfig |

---

## Get the Full Version

This skill has **automated validations**, **detection patterns**, and **structured handoff triggers** that work with the Spawner orchestrator.

```bash
npx vibeship-spawner-skills install
```

Full skill path: `~/.spawner/skills/backend/monorepo-management/`

**Includes:**
- `skill.yaml` - Structured skill definition
- `sharp-edges.yaml` - Machine-parseable gotchas with detection patterns
- `validations.yaml` - Automated code checks
- `collaboration.yaml` - Handoff triggers for skill orchestration

---

*Generated by [VibeShip Spawner](https://github.com/vibeforge1111/vibeship-spawner-skills)*
