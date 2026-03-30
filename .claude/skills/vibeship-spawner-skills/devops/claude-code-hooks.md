# Claude Code Hooks

> Expert in Claude Code hooks - user-defined shell commands that execute at specific
points in Claude Code's lifecycle. Provides guaranteed automation that doesn't rely
on the LLM "remembering" to do something. Essential for enterprise workflows, code
quality enforcement, and deterministic behavior in agentic coding.


**Category:** devops | **Version:** 1.0.0

**Tags:** claude-code, automation, hooks, lifecycle, cli, workflow, devtools

---

## Identity

[object Object]

## Expertise Areas

- Claude Code hook configuration
- Lifecycle event automation
- PreToolUse and PostToolUse patterns
- SessionStart initialization
- Tool blocking and validation
- Notification hooks

## Patterns

### Block-at-Submit Pattern
Validate before commit, not on every write
```
// Block-at-Submit: Only check when committing, not on every write
// This lets Claude finish its plan before validation

// .claude/settings.local.json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash(git commit*)",
        "hooks": [
          {
            "type": "command",
            "command": "sh -c '[ -f /tmp/tests-passed ] || (echo \"Tests must pass before commit. Run tests first.\" && exit 1)'"
          }
        ]
      }
    ],
    "PostToolUse": [
      {
        "matcher": "Bash(npm test*)",
        "hooks": [
          {
            "type": "command",
            "command": "sh -c 'if [ $TOOL_EXIT_CODE -eq 0 ]; then touch /tmp/tests-passed; else rm -f /tmp/tests-passed; fi'"
          }
        ]
      }
    ]
  }
}

// Result: Claude can write code freely, but must pass tests before commit
// Creates a natural "test-and-fix" loop until build is green

```

### Auto-Format on Write
Run formatters after every file edit
```
// Auto-format after every file write
// PostToolUse runs after successful tool execution

{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "prettier --write \"$TOOL_INPUT_FILE_PATH\" 2>/dev/null || true"
          }
        ]
      },
      {
        "matcher": "Write(*.py)|Edit(*.py)",
        "hooks": [
          {
            "type": "command",
            "command": "black \"$TOOL_INPUT_FILE_PATH\" 2>/dev/null || true"
          }
        ]
      }
    ]
  }
}

// Available environment variables:
// $TOOL_INPUT_FILE_PATH - Path of file being written/edited
// $TOOL_EXIT_CODE - Exit code of the tool (PostToolUse only)
// $HOOK_EVENT - The event type (PreToolUse, PostToolUse, etc.)

```

### Session Context Injection
Load context automatically at session start
```
// SessionStart hook to inject context
// Runs once when Claude Code session begins

{
  "hooks": {
    "SessionStart": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "cat ~/.claude/project-context.md"
          }
        ]
      },
      {
        "hooks": [
          {
            "type": "command",
            "command": "git log --oneline -10 2>/dev/null | head -5"
          }
        ]
      },
      {
        "hooks": [
          {
            "type": "command",
            "command": "jira-cli list --assignee=me --status='In Progress' 2>/dev/null || echo 'No active tickets'"
          }
        ]
      }
    ]
  }
}

// Project context file example (~/.claude/project-context.md):
// # Current Sprint Goals
// - Complete authentication flow
// - Fix performance issues in dashboard
//
// # Team Conventions
// - All PRs need 2 approvals
// - Run `npm test` before committing

```

### Dangerous Command Blocking
Prevent risky operations
```
// Block dangerous operations before they happen
// PreToolUse with exit code 1 blocks the action

{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Write(.env*)|Edit(.env*)",
        "hooks": [
          {
            "type": "command",
            "command": "echo 'BLOCKED: Direct .env modification not allowed. Use environment management tools.' && exit 1"
          }
        ]
      },
      {
        "matcher": "Bash(rm -rf*)|Bash(sudo*)",
        "hooks": [
          {
            "type": "command",
            "command": "echo 'BLOCKED: Destructive command requires manual execution.' && exit 1"
          }
        ]
      },
      {
        "matcher": "Bash(git push*--force*)|Bash(git push*-f*)",
        "hooks": [
          {
            "type": "command",
            "command": "echo 'BLOCKED: Force push requires manual confirmation.' && exit 1"
          }
        ]
      },
      {
        "matcher": "Write(**/production/**)|Edit(**/production/**)",
        "hooks": [
          {
            "type": "command",
            "command": "echo 'BLOCKED: Production config changes require manual review.' && exit 1"
          }
        ]
      }
    ]
  }
}

```

### Security Scanning Hook
Run security checks on code changes
```
// Security scan after file modifications
// Integrate with tools like Gitleaks, Trivy, or Semgrep

{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write(*.ts)|Write(*.js)|Write(*.py)",
        "hooks": [
          {
            "type": "command",
            "command": "gitleaks detect --source=\"$TOOL_INPUT_FILE_PATH\" --no-git 2>/dev/null && echo '✓ No secrets detected'"
          }
        ]
      }
    ],
    "PreToolUse": [
      {
        "matcher": "Bash(git commit*)",
        "hooks": [
          {
            "type": "command",
            "command": "semgrep scan --config=auto --error 2>/dev/null || (echo 'Security issues found. Fix before committing.' && exit 1)"
          }
        ]
      }
    ]
  }
}

```

### Notification Hook for Long Tasks
Alert when Claude needs attention
```
// Notification hook to alert user
// Runs when Claude needs permission or has a question

{
  "hooks": {
    "Notification": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "osascript -e 'display notification \"Claude needs your attention\" with title \"Claude Code\"' 2>/dev/null || notify-send 'Claude Code' 'Claude needs your attention' 2>/dev/null || echo 'Notification: Claude needs attention'"
          }
        ]
      }
    ],
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "echo 'Session complete' && say 'Claude Code has finished' 2>/dev/null || true"
          }
        ]
      }
    ]
  }
}

```


## Anti-Patterns

### Hook on Every Keystroke
Blocking or running heavy scripts on every small action
**Why it's bad:** Creates friction, slows down Claude significantly, and can cause
timeout issues. Claude may avoid using certain tools to bypass hooks.


### Blocking Without Clear Message
Exiting with code 1 but not explaining why
**Why it's bad:** Claude doesn't know what went wrong or how to fix it.
Creates frustrating loops without progress.


### Complex Logic in Hook Commands
Writing elaborate shell one-liners in hooks
**Why it's bad:** Hard to debug, maintain, and prone to escaping issues.
JSON escaping combined with shell escaping is error-prone.


### Ignoring Hook Timeouts
Running long-running processes in hooks
**Why it's bad:** Hooks have timeouts. Long processes get killed, leaving
inconsistent state.


### Hooks as Only Validation
Relying solely on hooks without CLAUDE.md guidance
**Why it's bad:** Hooks block but don't teach. Claude keeps hitting the same
blocks without understanding why.



## Sharp Edges (Gotchas)

*Real production issues that cause outages and bugs.*

### [HIGH] Hook matchers use glob patterns, not regex

**Situation:** Hook doesn't match expected tools, silently fails

**Why it happens:**
Matchers use glob-style patterns like "Bash(git*)" not regex.
Using regex patterns causes no matches, hook never fires.
No error message when matcher doesn't match anything.


**Solution:**
```
// Correct glob patterns for hook matchers

// WRONG - regex patterns don't work
{
  "matcher": "Bash(git\\s+commit.*)"  // Won't match
}

// CORRECT - glob patterns
{
  "matcher": "Bash(git commit*)"  // Matches git commit, git commit -m, etc.
}

// Common matcher patterns:
{
  // Match specific tool
  "matcher": "Write",           // All Write operations
  "matcher": "Edit",            // All Edit operations
  "matcher": "Bash",            // All Bash commands

  // Match with file patterns
  "matcher": "Write(*.ts)",     // TypeScript files only
  "matcher": "Edit(src/**/*)",  // Files in src directory
  "matcher": "Write(.env*)",    // Environment files

  // Match command patterns
  "matcher": "Bash(npm*)",      // npm commands
  "matcher": "Bash(git push*)", // git push variations

  // Multiple patterns (use array)
  "matcher": ["Write(*.ts)", "Write(*.js)", "Edit(*.ts)", "Edit(*.js)"]
}

// Debug matchers with --mcp-debug flag:
// claude --mcp-debug

```

**Symptoms:**
- Hook never fires
- No error messages
- Works for some tools but not others

---

### [HIGH] Wrong environment variable names in hooks

**Situation:** Hook script fails because variables are undefined

**Why it happens:**
Different hook events have different available variables.
Using wrong variable name gives empty string, not error.
Variable names are case-sensitive.


**Solution:**
```
// Available environment variables by hook type

// PreToolUse and PostToolUse:
{
  "TOOL_NAME": "Write",              // Name of the tool
  "TOOL_INPUT_FILE_PATH": "/path",   // For file operations
  "TOOL_INPUT_COMMAND": "npm test",  // For Bash commands
  "TOOL_EXIT_CODE": "0",             // PostToolUse only

  // Hook context
  "HOOK_EVENT": "PreToolUse",        // Event type
  "SESSION_ID": "abc123"             // Current session
}

// SessionStart:
{
  "WORKING_DIRECTORY": "/project",   // Project root
  "SESSION_ID": "abc123"
}

// Notification:
{
  "NOTIFICATION_MESSAGE": "text",    // Notification content
  "SESSION_ID": "abc123"
}

// Stop:
{
  "SESSION_ID": "abc123",
  "EXIT_REASON": "complete"          // Why session ended
}

// Safe variable access in shell:
{
  "command": "sh -c '[ -n \"$TOOL_INPUT_FILE_PATH\" ] && prettier --write \"$TOOL_INPUT_FILE_PATH\"'"
}

// Debug variables:
{
  "command": "env | grep -E '^(TOOL_|HOOK_|SESSION_)' >> /tmp/hook-debug.log"
}

```

**Symptoms:**
- Empty strings in hook output
- Commands fail silently
- Partial execution

---

### [HIGH] JSON escaping breaks shell commands

**Situation:** Complex shell commands fail due to escaping issues

**Why it happens:**
Hooks are configured in JSON.
Shell commands have their own escaping rules.
Double-escaping creates garbled commands.


**Solution:**
```
// Escaping levels in hook commands

// PROBLEM: Double quotes inside command
// WRONG
{
  "command": "echo "Hello World""  // JSON syntax error
}

// CORRECT - escape inner quotes
{
  "command": "echo \"Hello World\""
}

// PROBLEM: Dollar signs for variables
// WRONG - JSON tries to interpret
{
  "command": "echo $TOOL_INPUT_FILE_PATH"  // May not expand
}

// CORRECT - use sh -c wrapper
{
  "command": "sh -c 'echo \"$TOOL_INPUT_FILE_PATH\"'"
}

// PROBLEM: Complex logic
// WRONG - unreadable and error-prone
{
  "command": "if [ -f /tmp/x ]; then echo \"yes\"; else echo \"no\" && exit 1; fi"
}

// CORRECT - use external script
{
  "command": "./scripts/check-file.sh"
}

// The script (scripts/check-file.sh):
#!/bin/bash
if [ -f /tmp/x ]; then
  echo "yes"
else
  echo "no"
  exit 1
fi

// BEST PRACTICE: Keep hook commands simple
// - Single command or script call
// - Use scripts for logic
// - Avoid nested quotes when possible

```

**Symptoms:**
- Syntax errors in hooks
- Commands not executing as expected
- Random characters in output

---

### [MEDIUM] Long-running hooks get killed silently

**Situation:** Hook appears to complete but actually timed out

**Why it happens:**
Hooks have execution timeouts (typically 30 seconds).
Timeout kills the process mid-execution.
No clear error message, just incomplete results.


**Solution:**
```
// Handle hook timeouts properly

// Default timeout is ~30 seconds
// Can't be extended in config

// PATTERN 1: Fast-fail approach
{
  "command": "timeout 5 npm test -- --bail || echo 'Tests taking too long, run manually'"
}

// PATTERN 2: Background process for long tasks
{
  "command": "sh -c '(npm test > /tmp/test-output.log 2>&1 &) && echo \"Tests running in background\"'"
}

// PATTERN 3: Quick check, defer full run
{
  "command": "sh -c 'if git diff --cached --name-only | grep -q \"\\.ts$\"; then echo \"TypeScript changed - run tests before push\"; fi'"
}

// PATTERN 4: Marker file approach
// Instead of blocking on test completion:
{
  "PostToolUse": [
    {
      "matcher": "Bash(npm test*)",
      "hooks": [
        {
          "command": "sh -c '[ $TOOL_EXIT_CODE -eq 0 ] && touch /tmp/tests-passed'"
        }
      ]
    }
  ],
  "PreToolUse": [
    {
      "matcher": "Bash(git push*)",
      "hooks": [
        {
          "command": "sh -c '[ -f /tmp/tests-passed ] || (echo \"Run tests first\" && exit 1)'"
        }
      ]
    }
  ]
}

// ANTI-PATTERN: Long synchronous operations
// DON'T:
{
  "command": "npm run full-test-suite && npm run e2e && npm run lint"
}

```

**Symptoms:**
- Incomplete test runs
- Hooks that "work sometimes"
- Inconsistent state between runs

---

### [MEDIUM] Exit codes affect hook behavior differently

**Situation:** Non-zero exit doesn't block, or zero exit blocks unexpectedly

**Why it happens:**
PreToolUse: exit 1 = block the tool
PostToolUse: exit 1 = log warning but continue
Different semantics cause confusion.


**Solution:**
```
// Exit code behavior by hook type

// PreToolUse: Exit code determines if tool runs
{
  "PreToolUse": [
    {
      "matcher": "Bash(git push*)",
      "hooks": [
        {
          // exit 0 = allow push
          // exit 1 = block push
          "command": "sh -c '[ -f /tmp/tests-passed ] && exit 0 || exit 1'"
        }
      ]
    }
  ]
}

// PostToolUse: Exit code is informational
{
  "PostToolUse": [
    {
      "matcher": "Write",
      "hooks": [
        {
          // exit 1 logs warning but doesn't undo write
          // Tool already completed
          "command": "prettier --check \"$TOOL_INPUT_FILE_PATH\" || echo 'Format warning'"
        }
      ]
    }
  ]
}

// Notification/Stop: Exit code mostly ignored
// These are fire-and-forget

// IMPORTANT: Always provide clear message before exit
{
  "command": "sh -c 'if ! npm test; then echo \"BLOCKED: Tests failed. Fix and retry.\"; exit 1; fi'"
}

// DON'T: Silent failures
{
  "command": "npm test"  // No message if fails
}

```

**Symptoms:**
- Tool runs when it should be blocked
- Confusing error messages
- Actions blocked unexpectedly

---

### [MEDIUM] Hook state doesn't persist across sessions

**Situation:** Marker files lost, hooks stop working after restart

**Why it happens:**
Hooks use /tmp for state (tests-passed markers, etc.).
/tmp is cleared on reboot.
Different sessions may have different state expectations.


**Solution:**
```
// Manage hook state properly

// PATTERN 1: Session-scoped state (default)
// Good for: test gates within single session
{
  "command": "sh -c 'touch /tmp/claude-tests-passed-$SESSION_ID'"
}

// Check session-scoped state
{
  "command": "sh -c '[ -f /tmp/claude-tests-passed-$SESSION_ID ] || exit 1'"
}

// PATTERN 2: Project-scoped state
// Good for: persistent markers
{
  "command": "sh -c 'touch .claude-state/tests-passed'"
}

// Initialize in SessionStart
{
  "SessionStart": [
    {
      "hooks": [
        { "command": "mkdir -p .claude-state" }
      ]
    }
  ]
}

// PATTERN 3: Git-based state
// Good for: team-wide state
{
  "command": "sh -c 'git stash list | grep -q claude-checkpoint && echo \"Has checkpoint\" || echo \"No checkpoint\"'"
}

// PATTERN 4: Time-based expiry
// Good for: test results that expire
{
  "command": "sh -c 'find /tmp -name \"tests-passed\" -mmin -10 | grep -q . || (echo \"Tests expired, rerun\" && exit 1)'"
}

// Clean up on session end
{
  "Stop": [
    {
      "hooks": [
        { "command": "rm -f /tmp/claude-tests-passed-$SESSION_ID" }
      ]
    }
  ]
}

```

**Symptoms:**
- Hooks work then stop working
- State leaks between sessions
- Inconsistent behavior on restart

---

## Collaboration

### When to Hand Off

| Trigger | Delegate To | Context |
|---------|-------------|--------|
| `slash command|custom command|workflow` | claude-code-commands | Need reusable workflow commands |
| `CI/CD|pipeline|GitHub Actions|GitLab` | claude-code-cicd | Need CI/CD integration |
| `test strategy|testing framework` | testing-patterns | Need comprehensive testing approach |
| `linting|formatting|code style` | linting-formatting | Need style configuration |

### Receives Work From

- **claude-code-commands**: Commands need lifecycle hooks
- **claude-code-cicd**: CI/CD needs hook enforcement
- **testing-patterns**: Tests need enforcement
- **linting-formatting**: Style needs auto-application

### Works Well With

- claude-code-commands
- claude-code-cicd
- testing-patterns
- linting-formatting

---

## Get the Full Version

This skill has **automated validations**, **detection patterns**, and **structured handoff triggers** that work with the Spawner orchestrator.

```bash
npx vibeship-spawner-skills install
```

Full skill path: `~/.spawner/skills/devops/claude-code-hooks/`

**Includes:**
- `skill.yaml` - Structured skill definition
- `sharp-edges.yaml` - Machine-parseable gotchas with detection patterns
- `validations.yaml` - Automated code checks
- `collaboration.yaml` - Handoff triggers for skill orchestration

---

*Generated by [VibeShip Spawner](https://github.com/vibeforge1111/vibeship-spawner-skills)*
