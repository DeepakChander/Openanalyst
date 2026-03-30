# Claude Code Commands

> Expert in creating custom slash commands for Claude Code. Slash commands encode
repeatable workflows as markdown files, turning complex multi-step processes into
simple one-line invocations. Essential for team standardization, onboarding, and
reducing cognitive load during development.


**Category:** devops | **Version:** 1.0.0

**Tags:** claude-code, commands, slash-commands, workflow, automation, templates, productivity

---

## Identity

[object Object]

## Expertise Areas

- Custom slash command creation
- Workflow template design
- Command arguments and parameters
- Project-wide vs personal commands
- Command documentation patterns

## Patterns

### Standard Workflow Command
Basic command structure with clear sections
```
# .claude/commands/feature.md
# Standard command for new feature development

# New Feature Development

You are starting development of a new feature.

## Context
- Feature: $ARGUMENTS
- Branch: Create from main with pattern feature/$ARGUMENTS

## Workflow

### 1. Research Phase
- Search codebase for similar implementations
- Identify files that will need changes
- Check for existing tests to understand patterns

### 2. Planning Phase
- List the files you'll modify
- Identify any new files needed
- Consider database/API changes

### 3. Implementation Phase
- Implement changes incrementally
- Add tests as you go
- Run tests after each significant change

### 4. Review Checklist
Before finishing:
- [ ] All tests pass
- [ ] No console.log/debug statements
- [ ] Types are correct
- [ ] Documentation updated if needed

## Output Format
After completing, provide:
1. Summary of changes made
2. Files modified
3. Any follow-up tasks

---
# Usage: /feature user authentication
# The $ARGUMENTS becomes "user authentication"

```

### Issue-Linked Command
Command that integrates with issue tracking
```
# .claude/commands/issue.md
# Work on a JIRA/Linear/GitHub issue

# Work on Issue: $ARGUMENTS

## First: Fetch Issue Details
Run this command to get issue details:
```bash
# For GitHub Issues:
gh issue view $ARGUMENTS --json title,body,labels,assignees

# For JIRA:
# jira issue view $ARGUMENTS

# For Linear:
# linear issue $ARGUMENTS
```

## Understand the Issue
Based on the issue details:
1. Summarize what needs to be done
2. Identify acceptance criteria
3. Note any linked PRs or issues

## Create Branch
```bash
git checkout -b issue-$ARGUMENTS
```

## Implementation
- Work according to issue requirements
- Reference issue number in commit messages
- Update issue status as you progress

## Before Completion
Verify all acceptance criteria are met.
Run tests relevant to the changes.

## Closing
When complete, prepare for PR:
1. Push branch
2. Create PR linking to issue
3. Update issue status

---
# Usage: /issue PROJ-123

```

### Debug Investigation Command
Structured debugging workflow
```
# .claude/commands/debug.md
# Structured debugging workflow

# Debug: $ARGUMENTS

## Phase 1: Reproduce
First, understand and reproduce the issue.
- What is the expected behavior?
- What is the actual behavior?
- What are the steps to reproduce?

## Phase 2: Gather Information
```bash
# Check recent changes
git log --oneline -20

# Check for related errors in logs
grep -r "error\|Error\|ERROR" logs/ 2>/dev/null | tail -20
```

Search codebase for:
- Error messages mentioned in $ARGUMENTS
- Functions/components involved
- Recent changes to affected files

## Phase 3: Hypothesize
Based on findings, list 2-3 most likely causes:
1. [Hypothesis 1]
2. [Hypothesis 2]
3. [Hypothesis 3]

## Phase 4: Test Hypotheses
For each hypothesis:
- Add targeted logging
- Write a test case if possible
- Verify or eliminate

## Phase 5: Fix
Once root cause found:
- Implement minimal fix
- Add regression test
- Verify original issue resolved
- Check for similar issues elsewhere

## Phase 6: Document
Record:
- Root cause
- Fix applied
- Prevention measures

---
# Usage: /debug login fails after password reset

```

### Review Command with Checklist
Code review with specific criteria
```
# .claude/commands/review.md
# Code review with checklist

# Code Review

## Files to Review
Check the current staged/changed files:
```bash
git diff --name-only HEAD~1
```

## Review Checklist

### Security
- [ ] No hardcoded secrets or credentials
- [ ] Input validation on user data
- [ ] No SQL injection vulnerabilities
- [ ] Proper authentication/authorization checks

### Code Quality
- [ ] Functions are single-purpose
- [ ] No code duplication
- [ ] Error handling is comprehensive
- [ ] Edge cases are considered

### Testing
- [ ] New code has tests
- [ ] Tests cover happy path and errors
- [ ] Tests are deterministic

### Performance
- [ ] No N+1 queries
- [ ] No unnecessary re-renders (React)
- [ ] Appropriate caching

### Documentation
- [ ] Complex logic is commented
- [ ] Public APIs are documented
- [ ] README updated if needed

## Output Format
For each issue found:
- **File:Line** - Issue description
- **Severity**: Critical/High/Medium/Low
- **Suggestion**: How to fix

---
# Usage: /review

```

### Parameterized Multi-Use Command
Command with multiple use patterns
```
# .claude/commands/db.md
# Database operations helper

# Database: $ARGUMENTS

Parse the command: $ARGUMENTS

## Common Operations

### If "migrate" or "migration":
```bash
npm run db:migrate
```
Verify migration applied correctly.

### If "seed":
```bash
npm run db:seed
```
Verify seed data is correct.

### If "reset":
⚠️ WARNING: This will delete all data!
Only proceed if explicitly confirmed.
```bash
npm run db:reset
```

### If "status":
```bash
npm run db:status
```
Show current migration status.

### If starts with "query":
Run the SQL query that follows "query".
Explain results in plain language.

### If "schema":
Show current database schema.
```bash
npm run db:schema
```

---
# Usage: /db migrate
# Usage: /db seed
# Usage: /db query SELECT * FROM users LIMIT 5

```

### File Reference Command
Command that includes file contents
```
# .claude/commands/refactor.md
# Refactor with architecture guidelines

# Refactor: $ARGUMENTS

## Architecture Guidelines
Follow these patterns from our codebase:

@src/architecture.md

## Current Code
First, read and understand the code to refactor:
$ARGUMENTS

## Refactoring Goals
1. Improve readability
2. Follow established patterns
3. Reduce complexity
4. Improve testability

## Process
1. Identify code smells
2. Plan refactoring steps
3. Apply changes incrementally
4. Verify tests still pass after each change

## Constraints
- Don't change public API unless necessary
- Maintain backwards compatibility
- Keep commits atomic

---
# The @src/architecture.md includes that file's content
# Usage: /refactor src/services/auth.ts

```


## Anti-Patterns

### Command as Script
Trying to make commands do conditional logic
**Why it's bad:** Commands are prompts, not programs.
Claude interprets them, doesn't execute them.
Conditional logic creates confusion.


### Massive Monolithic Command
Single command that tries to do everything
**Why it's bad:** Too long to read and understand.
Claude may miss parts or get confused.
Can't reuse parts in other contexts.


### Undocumented Arguments
Using $ARGUMENTS without explaining format
**Why it's bad:** Users don't know what to pass.
Wrong arguments cause unexpected behavior.
Team members can't learn commands.


### Hardcoded Paths and Names
Commands with specific paths that differ per user
**Why it's bad:** Breaks on different machines.
Requires editing for each project.
Not portable across team.


### No Output Format
Commands that don't specify expected output
**Why it's bad:** Claude's output varies unpredictably.
Hard to use output in next steps.
No consistency across invocations.



## Sharp Edges (Gotchas)

*Real production issues that cause outages and bugs.*

*Sharp edges documented in full version.*

## Collaboration

### When to Hand Off

| Trigger | Delegate To | Context |
|---------|-------------|--------|
| `enforce|guarantee|block` | claude-code-hooks | Need to enforce command behavior with hooks |
| `CI/CD|pipeline|automated run` | claude-code-cicd | Need to run commands in CI/CD |
| `debug methodology|investigation` | debugging-master | Need debugging expertise for command |

### Receives Work From

- **claude-code-hooks**: Hooks enforce command behavior
- **claude-code-cicd**: Commands run in CI/CD
- **debugging-master**: Debug workflow command
- **testing-patterns**: Test workflow commands

### Works Well With

- claude-code-hooks
- claude-code-cicd
- debugging-master
- testing-patterns

---

## Get the Full Version

This skill has **automated validations**, **detection patterns**, and **structured handoff triggers** that work with the Spawner orchestrator.

```bash
npx vibeship-spawner-skills install
```

Full skill path: `~/.spawner/skills/devops/claude-code-commands/`

**Includes:**
- `skill.yaml` - Structured skill definition
- `sharp-edges.yaml` - Machine-parseable gotchas with detection patterns
- `validations.yaml` - Automated code checks
- `collaboration.yaml` - Handoff triggers for skill orchestration

---

*Generated by [VibeShip Spawner](https://github.com/vibeforge1111/vibeship-spawner-skills)*
