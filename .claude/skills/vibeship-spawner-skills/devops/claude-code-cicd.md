# Claude Code CI/CD

> Expert in integrating Claude Code with CI/CD pipelines. Covers headless mode for
non-interactive execution, GitHub Actions and GitLab CI/CD integration, automated
code review, issue triage, and PR workflows. Essential for teams wanting AI-powered
automation in their development pipelines.


**Category:** devops | **Version:** 1.0.0

**Tags:** claude-code, cicd, automation, github-actions, gitlab, headless, pipeline, devops

---

## Identity

[object Object]

## Expertise Areas

- Headless mode configuration
- GitHub Actions integration
- GitLab CI/CD integration
- Automated code review pipelines
- Issue triage automation
- PR creation and review workflows
- SDK-based automation

## Patterns

### Basic Headless Execution
Run Claude Code non-interactively
```
# Headless mode basics
# The -p flag enables non-interactive mode

# Simple prompt execution
claude -p "Explain what this function does" src/utils.ts

# With specific output format
claude -p "List all TODOs in this file" src/main.ts --output-format text

# JSON output for parsing
claude -p "Analyze this code for issues" src/api.ts --output-format json

# Streaming JSON for real-time processing
claude -p "Review this PR" --output-format stream-json

# Environment variables for CI
export ANTHROPIC_API_KEY=${{ secrets.ANTHROPIC_API_KEY }}

# Or with explicit provider
claude -p "Review code" \
  --api-key $ANTHROPIC_API_KEY \
  --model claude-sonnet-4-20250514

# With file input
cat changes.diff | claude -p "Review these changes"

# Multiple files
claude -p "Find security issues in these files" \
  src/auth.ts src/api.ts src/db.ts

```

### GitHub Actions Code Review
Automated PR code review
```
# .github/workflows/claude-review.yml
name: Claude Code Review

on:
  pull_request:
    types: [opened, synchronize]
    # Only review substantial changes
    paths:
      - 'src/**'
      - '!src/**/*.test.ts'

jobs:
  review:
    runs-on: ubuntu-latest
    # Skip for very small PRs
    if: github.event.pull_request.additions > 10

    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Install Claude Code
        run: npm install -g @anthropic-ai/claude-code

      - name: Get changed files
        id: files
        run: |
          echo "files=$(git diff --name-only origin/${{ github.base_ref }}...HEAD | grep -E '\.(ts|js|py)$' | tr '\n' ' ')" >> $GITHUB_OUTPUT

      - name: Run Claude Review
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
        run: |
          claude -p "Review these files for bugs, security issues, and code quality. Be concise. Focus on actionable feedback.

          Files: ${{ steps.files.outputs.files }}

          Output as markdown suitable for a PR comment." \
            --output-format text > review.md

      - name: Post review comment
        uses: actions/github-script@v7
        with:
          script: |
            const fs = require('fs');
            const review = fs.readFileSync('review.md', 'utf8');

            await github.rest.issues.createComment({
              owner: context.repo.owner,
              repo: context.repo.repo,
              issue_number: context.issue.number,
              body: `## Claude Code Review\n\n${review}`
            });

```

### Issue Triage Automation
Auto-label and triage new issues
```
# .github/workflows/issue-triage.yml
name: Issue Triage

on:
  issues:
    types: [opened]

jobs:
  triage:
    runs-on: ubuntu-latest
    permissions:
      issues: write

    steps:
      - uses: actions/checkout@v4

      - name: Install Claude Code
        run: npm install -g @anthropic-ai/claude-code

      - name: Analyze issue
        id: analyze
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
        run: |
          # Use smaller model for triage (cost effective)
          claude -p "Analyze this GitHub issue and return JSON:
          {
            \"labels\": [\"bug\"|\"feature\"|\"docs\"|\"question\"],
            \"priority\": \"high\"|\"medium\"|\"low\",
            \"area\": \"frontend\"|\"backend\"|\"infra\"|\"other\",
            \"needs_info\": true|false,
            \"summary\": \"one line summary\"
          }

          Issue Title: ${{ github.event.issue.title }}
          Issue Body: ${{ github.event.issue.body }}" \
            --model claude-haiku-3-5 \
            --output-format json > analysis.json

          echo "result=$(cat analysis.json)" >> $GITHUB_OUTPUT

      - name: Apply labels
        uses: actions/github-script@v7
        with:
          script: |
            const analysis = JSON.parse('${{ steps.analyze.outputs.result }}');

            // Apply labels
            const labels = [
              ...analysis.labels,
              `priority:${analysis.priority}`,
              `area:${analysis.area}`
            ];

            await github.rest.issues.addLabels({
              owner: context.repo.owner,
              repo: context.repo.repo,
              issue_number: context.issue.number,
              labels: labels
            });

            // If needs more info, add comment
            if (analysis.needs_info) {
              await github.rest.issues.createComment({
                owner: context.repo.owner,
                repo: context.repo.repo,
                issue_number: context.issue.number,
                body: "Thanks for opening this issue! Could you provide more details about:\n- Steps to reproduce\n- Expected vs actual behavior\n- Your environment"
              });
            }

```

### GitLab CI/CD Integration
Claude Code in GitLab pipelines
```
# .gitlab-ci.yml
stages:
  - review
  - test
  - deploy

variables:
  CLAUDE_MODEL: claude-sonnet-4-20250514

claude-review:
  stage: review
  image: node:20
  rules:
    - if: $CI_PIPELINE_SOURCE == "merge_request_event"
  before_script:
    - npm install -g @anthropic-ai/claude-code
  script:
    # Get MR diff
    - git diff origin/$CI_MERGE_REQUEST_TARGET_BRANCH_NAME...HEAD > changes.diff

    # Run Claude review
    - |
      claude -p "Review this diff for a merge request.
      Focus on: bugs, security issues, performance problems.
      Format as GitLab markdown.

      $(cat changes.diff)" \
        --output-format text > review.md

    # Post to MR (using GitLab API)
    - |
      curl --request POST \
        --header "PRIVATE-TOKEN: $GITLAB_API_TOKEN" \
        --header "Content-Type: application/json" \
        --data "{\"body\": \"## Claude Review\n\n$(cat review.md | jq -Rs .)\"}" \
        "$CI_API_V4_URL/projects/$CI_PROJECT_ID/merge_requests/$CI_MERGE_REQUEST_IID/notes"
  variables:
    ANTHROPIC_API_KEY: $ANTHROPIC_API_KEY

# Automated fix suggestions
claude-fix:
  stage: review
  image: node:20
  rules:
    - if: $CI_PIPELINE_SOURCE == "merge_request_event"
      when: manual  # Manual trigger to control costs
  script:
    - npm install -g @anthropic-ai/claude-code
    - git config user.email "claude-bot@example.com"
    - git config user.name "Claude Bot"

    # Run Claude to fix issues
    - |
      claude -p "Fix any linting errors and type issues in the changed files.
      Do not make other changes." \
        --allowedTools "Edit,Bash(npm run lint:fix)"

    # If changes made, commit them
    - |
      if [ -n "$(git status --porcelain)" ]; then
        git add .
        git commit -m "fix: Auto-fix linting issues [Claude]"
        git push origin HEAD:$CI_MERGE_REQUEST_SOURCE_BRANCH_NAME
      fi

```

### Automated PR Creation
Create PRs from issues or descriptions
```
# .github/workflows/auto-implement.yml
name: Auto-implement Issue

on:
  issues:
    types: [labeled]

jobs:
  implement:
    runs-on: ubuntu-latest
    if: github.event.label.name == 'auto-implement'
    permissions:
      contents: write
      pull-requests: write

    steps:
      - uses: actions/checkout@v4
        with:
          token: ${{ secrets.GITHUB_TOKEN }}

      - name: Setup Git
        run: |
          git config user.email "claude-bot@users.noreply.github.com"
          git config user.name "Claude Bot"

      - name: Install Claude Code
        run: npm install -g @anthropic-ai/claude-code

      - name: Create branch
        run: |
          BRANCH="auto/issue-${{ github.event.issue.number }}"
          git checkout -b $BRANCH
          echo "branch=$BRANCH" >> $GITHUB_ENV

      - name: Implement feature
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
        run: |
          # Let Claude implement with controlled tools
          claude -p "Implement this feature request:

          Title: ${{ github.event.issue.title }}
          Description: ${{ github.event.issue.body }}

          Requirements:
          1. Follow existing code patterns
          2. Add tests for new functionality
          3. Update documentation if needed
          4. Make atomic, focused commits" \
            --allowedTools "Read,Write,Edit,Bash(npm test),Bash(npm run lint)"

      - name: Create PR
        env:
          GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        run: |
          git push origin ${{ env.branch }}

          gh pr create \
            --title "Implement: ${{ github.event.issue.title }}" \
            --body "Automated implementation of #${{ github.event.issue.number }}

          This PR was generated by Claude Code. Please review carefully before merging.

          Closes #${{ github.event.issue.number }}" \
            --base main \
            --head ${{ env.branch }} \
            --label "auto-generated"

```

### SDK-Based Automation
Programmatic Claude Code control
```
// Using Claude Code SDK for programmatic control
// automation/review-service.ts

import Anthropic from "@anthropic-ai/sdk";
import { execSync } from "child_process";

interface ReviewRequest {
  files: string[];
  context: string;
  strictness: "lenient" | "normal" | "strict";
}

interface ReviewResult {
  summary: string;
  issues: Array<{
    file: string;
    line: number;
    severity: "error" | "warning" | "info";
    message: string;
  }>;
  approved: boolean;
}

async function reviewCode(request: ReviewRequest): Promise<ReviewResult> {
  // Read file contents
  const fileContents = request.files.map(file => {
    const content = execSync(`cat ${file}`).toString();
    return `### ${file}\n\`\`\`\n${content}\n\`\`\``;
  }).join("\n\n");

  // Use Claude Code in headless mode via SDK
  const result = execSync(
    `claude -p "${buildPrompt(request, fileContents)}" --output-format json`,
    {
      env: {
        ...process.env,
        ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY
      }
    }
  ).toString();

  return JSON.parse(result);
}

function buildPrompt(request: ReviewRequest, files: string): string {
  const strictnessGuide = {
    lenient: "Focus only on critical bugs and security issues",
    normal: "Balance thoroughness with practicality",
    strict: "Apply rigorous standards, flag all potential issues"
  };

  return `You are reviewing code for a PR.

  Context: ${request.context}
  Review strictness: ${request.strictness}
  Guidelines: ${strictnessGuide[request.strictness]}

  Files to review:
  ${files}

  Return JSON matching this schema:
  {
    "summary": "Brief overall assessment",
    "issues": [
      {
        "file": "path/to/file",
        "line": 42,
        "severity": "error|warning|info",
        "message": "Description of issue"
      }
    ],
    "approved": true/false
  }`;
}

// Usage in CI script
async function main() {
  const changedFiles = execSync(
    "git diff --name-only origin/main...HEAD"
  ).toString().trim().split("\n");

  const result = await reviewCode({
    files: changedFiles.filter(f => f.endsWith(".ts")),
    context: "Feature branch for user authentication",
    strictness: "normal"
  });

  console.log(JSON.stringify(result, null, 2));

  // Exit with error if not approved
  if (!result.approved) {
    process.exit(1);
  }
}

main();

```


## Anti-Patterns

### Running Claude on Every Commit
Triggering Claude for every single commit
**Why it's bad:** Expensive - each run costs money.
Slow - adds latency to every commit.
Noisy - too many reviews causes alert fatigue.


### Unbounded Tool Access in CI
Not restricting which tools Claude can use
**Why it's bad:** CI environments need controlled access.
Unrestricted Bash could run dangerous commands.
Could accidentally push or delete things.


### Secrets in Prompts
Including secrets directly in prompt text
**Why it's bad:** Secrets appear in logs.
Prompt text may be stored/logged.
Security risk in multi-tenant CI.


### No Cost Controls
Running without usage limits or model tiers
**Why it's bad:** Costs can spiral unexpectedly.
Large PRs trigger large context.
No visibility into spend.


### Trusting AI Output Blindly
Auto-merging or deploying based solely on AI approval
**Why it's bad:** AI can hallucinate or miss issues.
Removes human accountability.
Risky for security-sensitive code.



## Sharp Edges (Gotchas)

*Real production issues that cause outages and bugs.*

### [HIGH] Wrong output format causes parsing failures

**Situation:** CI script can't parse Claude's response

**Why it happens:**
Default output is text, not structured.
JSON output requires --output-format json.
Stream JSON is different from regular JSON.


**Solution:**
```
// Output formats for CI/CD

// TEXT OUTPUT (default)
claude -p "Explain this code" src/main.ts
# Returns: Human-readable text, may include markdown

// JSON OUTPUT
claude -p "Return JSON with issues" --output-format json
# Returns: {"result": "...", "usage": {...}}
# Parse with: jq .result

// STREAM JSON (for real-time processing)
claude -p "Long analysis" --output-format stream-json
# Returns: Multiple JSON lines (JSONL format)
# Each line: {"type": "...", "content": "..."}

// PARSING IN BASH
# JSON:
result=$(claude -p "..." --output-format json)
issues=$(echo $result | jq -r '.result')

# Stream JSON:
claude -p "..." --output-format stream-json | while read line; do
  type=$(echo $line | jq -r '.type')
  if [ "$type" = "result" ]; then
    content=$(echo $line | jq -r '.content')
    echo $content
  fi
done

// COMMON MISTAKE: Expecting JSON from text mode
# WRONG
result=$(claude -p "Return JSON: {status: ok}")
echo $result | jq .status  # Fails - result is text, not JSON

# RIGHT
result=$(claude -p "Return JSON: {status: ok}" --output-format json)
echo $result | jq -r '.result' | jq .status

// NODE.JS PARSING
import { execSync } from 'child_process';

const output = execSync(
  'claude -p "..." --output-format json'
).toString();

const parsed = JSON.parse(output);
const result = parsed.result;

```

**Symptoms:**
- jq: parse error
- Unexpected token in JSON
- Empty or truncated output

---

### [HIGH] Claude times out in CI, job fails

**Situation:** Long-running Claude commands exceed CI timeout

**Why it happens:**
Complex analysis can take minutes.
CI jobs have default timeouts.
No streaming means no visibility during execution.


**Solution:**
```
// Handle timeouts in CI

// GITHUB ACTIONS - Set timeout
- name: Claude Review
  timeout-minutes: 10  # Increase from default 6
  run: |
    claude -p "Review code" --max-tokens 2000

// GITLAB CI - Set timeout
claude-review:
  timeout: 15 minutes
  script:
    - claude -p "Review code"

// LIMIT OUTPUT LENGTH
claude -p "Brief review, max 500 words" \
  --max-tokens 1000

// USE SMALLER MODEL FOR SPEED
# Haiku is faster than Sonnet
claude -p "Quick triage" --model claude-haiku-3-5

// SPLIT LARGE TASKS
# Instead of reviewing all files at once
for file in $(git diff --name-only); do
  claude -p "Review $file briefly" --max-tokens 500
done

// BACKGROUND WITH TIMEOUT
timeout 300 claude -p "Long analysis" > result.txt &
pid=$!

# Poll for completion
while kill -0 $pid 2>/dev/null; do
  echo "Still running..."
  sleep 10
done

// STREAMING FOR VISIBILITY
# Stream shows progress during execution
claude -p "Analysis" --output-format stream-json | \
  while read line; do
    echo "Progress: $(echo $line | jq -r .type)"
  done

```

**Symptoms:**
- Job killed after timeout
- No output before failure
- Works locally, fails in CI

---

### [CRITICAL] API keys or prompts appear in logs

**Situation:** Secrets visible in CI logs

**Why it happens:**
CI logs are often accessible to team.
echo/debug statements expose values.
Error messages may include sensitive data.


**Solution:**
```
// Secure secret handling in CI

// GITHUB ACTIONS - Use secrets
- name: Review
  env:
    ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
  run: |
    # Key is in env, not in command line
    claude -p "Review code"

// MASK VALUES
- name: Setup
  run: |
    echo "::add-mask::${{ secrets.ANTHROPIC_API_KEY }}"

// DON'T ECHO PROMPTS WITH SENSITIVE DATA
# WRONG
echo "Running: claude -p '$PROMPT_WITH_DATA'"
claude -p "$PROMPT_WITH_DATA"

# RIGHT
echo "Running Claude review..."
claude -p "$PROMPT_WITH_DATA" 2>/dev/null

// USE PROMPT FILES INSTEAD
# Store prompt in file, not variable
cat > prompt.txt << 'EOF'
Review this code for security issues
EOF
cat prompt.txt | claude -p -

// GITLAB CI - Use masked variables
variables:
  ANTHROPIC_API_KEY:
    value: $ANTHROPIC_API_KEY
    masked: true

// CLEAN UP AFTER
- name: Cleanup
  if: always()
  run: |
    rm -f prompt.txt analysis.json
    unset ANTHROPIC_API_KEY

// CHECK FOR LEAKED SECRETS IN OUTPUT
- name: Validate output
  run: |
    if grep -q "sk-ant-" result.txt; then
      echo "ERROR: API key in output!"
      exit 1
    fi

```

**Symptoms:**
- API key visible in logs
- Security scan alerts
- Unauthorized API usage

---

### [HIGH] Claude uses tools you didn't intend to allow

**Situation:** Claude executes unexpected commands in CI

**Why it happens:**
Default allows many tools.
--allowedTools requires exact matching.
Wildcard patterns may over-permit.


**Solution:**
```
// Properly restrict tools in CI

// DENY BY DEFAULT - Explicit allow list
claude -p "Fix bugs" \
  --allowedTools "Read,Edit,Write"
  # Only file operations, no Bash

// ALLOW SPECIFIC COMMANDS
claude -p "Run tests and fix" \
  --allowedTools "Read,Edit,Bash(npm test),Bash(npm run lint)"
  # Can only run npm test and lint

// PATTERNS FOR BASH
--allowedTools "Bash(npm *)"      # Any npm command
--allowedTools "Bash(git status)" # Only git status
--allowedTools "Bash(ls *)"       # Only ls commands

// DANGEROUS - DON'T DO THIS
--allowedTools "Bash"             # All bash commands!
--allowedTools "Bash(*)"          # Same as above
--allowedTools "Bash(rm *)"       # Can delete anything!

// RECOMMENDED CI PROFILES
# Review only (no changes):
--allowedTools "Read,Grep,Glob"

# Fix issues (controlled changes):
--allowedTools "Read,Edit,Bash(npm run lint:fix)"

# Full implementation (careful!):
--allowedTools "Read,Write,Edit,Bash(npm test),Bash(npm run build)"

// VERIFY RESTRICTIONS
# Test your restrictions locally first
claude -p "Delete all files" \
  --allowedTools "Read,Edit"
# Should refuse to use rm

// AUDIT TOOL USAGE
# Log which tools were used
claude -p "..." --output-format stream-json | \
  jq 'select(.type == "tool_use") | .name' | \
  sort | uniq

```

**Symptoms:**
- Unexpected file changes
- Commands run that shouldn't
- Security violations

---

### [MEDIUM] CI fails due to API rate limits

**Situation:** Multiple concurrent jobs hit rate limits

**Why it happens:**
CI runs many jobs in parallel.
Each job makes API calls.
Rate limits are per-organization.


**Solution:**
```
// Handle rate limits in CI

// RETRY WITH BACKOFF
max_retries=3
retry_delay=60

for i in $(seq 1 $max_retries); do
  if claude -p "Review" --output-format json > result.json 2>&1; then
    break
  fi

  if grep -q "rate_limit" result.json; then
    echo "Rate limited, waiting ${retry_delay}s..."
    sleep $retry_delay
    retry_delay=$((retry_delay * 2))
  else
    echo "Failed for non-rate-limit reason"
    exit 1
  fi
done

// LIMIT CONCURRENCY
# GitHub Actions
jobs:
  review:
    concurrency:
      group: claude-api
      cancel-in-progress: false

# GitLab CI
claude-review:
  resource_group: claude-api

// QUEUE LARGE BATCHES
# Instead of parallel, use sequential
- name: Review files sequentially
  run: |
    for file in src/*.ts; do
      claude -p "Review $file" >> reviews.md
      sleep 2  # Rate limit buffer
    done

// USE CACHING
# Don't re-review unchanged files
- uses: actions/cache@v4
  with:
    path: .claude-review-cache
    key: claude-review-${{ hashFiles('src/**') }}

- name: Review
  run: |
    if [ ! -f .claude-review-cache/result.md ]; then
      claude -p "Review" > .claude-review-cache/result.md
    fi

// MONITOR USAGE
# Track costs and rate limit hits
claude -p "..." --output-format json | \
  jq '{tokens: .usage, timestamp: now}' >> usage.log

```

**Symptoms:**
- 429 Too Many Requests
- Random job failures
- Works sometimes, fails others

---

### [MEDIUM] Large PRs exceed Claude's context window

**Situation:** Analysis fails or truncates on large changes

**Why it happens:**
Context window has limits.
Large diffs exceed capacity.
No clear error for overflow.


**Solution:**
```
// Handle large contexts in CI

// CHECK DIFF SIZE FIRST
diff_lines=$(git diff --stat | tail -1 | grep -oE '[0-9]+' | head -1)

if [ "$diff_lines" -gt 1000 ]; then
  echo "Large diff ($diff_lines lines) - splitting review"

  # Review file by file
  for file in $(git diff --name-only); do
    echo "## Reviewing $file" >> review.md
    claude -p "Review only this file: $file" >> review.md
  done
else
  # Normal review
  claude -p "Review all changes" > review.md
fi

// SUMMARIZE THEN DETAIL
# First pass: summary
summary=$(claude -p "Summarize these changes in 100 words" \
  --max-tokens 200)

# Second pass: focused reviews
for critical_file in $(identify-critical-files); do
  claude -p "Deep review of $critical_file" >> reviews.md
done

// FILTER NOISE
# Skip generated files, tests, etc.
git diff --name-only | \
  grep -v 'package-lock.json\|\.generated\.\|\.test\.' | \
  xargs claude -p "Review these files"

// CHUNK LARGE FILES
split_file() {
  local file=$1
  local chunk_size=200  # lines per chunk

  split -l $chunk_size $file /tmp/chunk_

  for chunk in /tmp/chunk_*; do
    claude -p "Review this code chunk from $file" $chunk
  done
}

// SET EXPLICIT LIMITS
claude -p "Brief review (max 500 words)" \
  --max-tokens 1000 \
  $(git diff --name-only | head -10)  # First 10 files only

```

**Symptoms:**
- Incomplete reviews
- Model errors about length
- Truncated output

---

## Collaboration

### When to Hand Off

| Trigger | Delegate To | Context |
|---------|-------------|--------|
| `local hook|pre-commit` | claude-code-hooks | Need local hook configuration |
| `slash command|custom command` | claude-code-commands | Need command for CI workflow |
| `Actions workflow|GitHub workflow` | github-actions | Need GitHub Actions expertise |
| `test strategy|coverage` | testing-patterns | Need testing patterns for CI |

### Receives Work From

- **claude-code-hooks**: Local hooks inform CI requirements
- **claude-code-commands**: Commands run in CI
- **github-actions**: Need Actions expertise
- **testing-patterns**: Tests inform CI gates

### Works Well With

- claude-code-hooks
- claude-code-commands
- github-actions
- testing-patterns

---

## Get the Full Version

This skill has **automated validations**, **detection patterns**, and **structured handoff triggers** that work with the Spawner orchestrator.

```bash
npx vibeship-spawner-skills install
```

Full skill path: `~/.spawner/skills/devops/claude-code-cicd/`

**Includes:**
- `skill.yaml` - Structured skill definition
- `sharp-edges.yaml` - Machine-parseable gotchas with detection patterns
- `validations.yaml` - Automated code checks
- `collaboration.yaml` - Handoff triggers for skill orchestration

---

*Generated by [VibeShip Spawner](https://github.com/vibeforge1111/vibeship-spawner-skills)*
