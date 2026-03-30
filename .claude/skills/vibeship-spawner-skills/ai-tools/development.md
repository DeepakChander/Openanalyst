# Development AI Tools

> Master the AI tools that supercharge software development.
From code completion to full application generation, write
better code faster and automate the tedious parts.


**Category:** ai-tools | **Version:** 1.0.0

**Tags:** development, coding, ai-assistant, productivity, code-generation

---

## Patterns

### Comment-driven development
Write what you want, let AI implement

### Test-first with AI
Write test cases, let AI implement

### Code review with AI
Have AI review before human review

### Refactor with AI
Explain desired refactor, AI executes


## Anti-Patterns

### Blindly accepting suggestions
Tabbing through without reading

### AI for architecture
Letting AI decide system design

### Skipping understanding
Using AI code you don't understand

### Over-prompting
Writing paragraphs for simple tasks


## Sharp Edges (Gotchas)

*Real production issues that cause outages and bugs.*

### [CRITICAL] AI often suggests insecure code patterns

**Situation:** AI suggests code with security vulnerabilities

**Why it happens:**
AI training data includes insecure code:
- SQL injection patterns
- Hardcoded secrets
- Insecure random number generation
- Missing input validation
- Unsafe deserialization

AI doesn't understand security context.


**Solution:**
```
1. Always review security-sensitive code
2. Run security scanners (SAST)
3. Never trust AI with auth/crypto
4. Use security-focused prompts
5. Code review for security explicitly

```python
# Bad: AI might suggest
query = f"SELECT * FROM users WHERE id = {user_id}"

# Good: Always parameterize
query = "SELECT * FROM users WHERE id = %s"
cursor.execute(query, (user_id,))
```

```

**Symptoms:**
- Security scanner finds vulnerabilities
- Code review catches injection risks
- Secrets appear in suggestions

---

### [MEDIUM] AI suggests deprecated or outdated patterns

**Situation:** AI suggests old library versions or deprecated APIs

**Why it happens:**
Training data includes old code:
- Deprecated React patterns (class components)
- Old library versions
- Superseded APIs
- Legacy approaches

AI doesn't know "best practice" changed.


**Solution:**
```
1. Know current best practices
2. Question patterns that seem old
3. Check library documentation
4. Update prompts with version info
5. Configure AI for modern patterns

```

**Symptoms:**
- Using class components in React
- Old callback patterns vs async/await
- Deprecated warnings at runtime

---

### [HIGH] AI invents APIs that don't exist

**Situation:** AI uses function/method that doesn't exist

**Why it happens:**
AI confuses or invents:
- Similar library APIs mixed up
- Methods that "should" exist
- Plausible but fake functions
- Wrong library versions

Code looks right but won't compile.


**Solution:**
```
1. Always test AI code
2. Verify imports work
3. Check documentation
4. Don't trust unfamiliar APIs
5. Type checking helps catch this

```

**Symptoms:**
- Module not found errors
- AttributeError: no such method
- TypeScript errors on AI code

---

### [MEDIUM] AI loses context in large codebases

**Situation:** AI suggestions ignore project patterns

**Why it happens:**
Limited context window means:
- Can't see whole codebase
- Misses project conventions
- Ignores related files
- Suggests inconsistent patterns

More context-aware tools help.


**Solution:**
```
1. Use Cursor/Claude Code for large projects
2. Provide context in prompts
3. Reference existing patterns
4. Use consistent file naming
5. Keep related code near cursor

```

**Symptoms:**
- Suggestions don't match project style
- Different patterns for same thing
- Ignores existing utilities

---

### [MEDIUM] AI over-complicates simple tasks

**Situation:** AI writes 50 lines when 5 would do

**Why it happens:**
AI tends to:
- Add unnecessary abstractions
- Include unused error handling
- Over-generalize solutions
- Add features not requested

More code = more bugs, more maintenance.


**Solution:**
```
1. Ask for simple solutions
2. Specify constraints in prompts
3. Delete unnecessary code
4. Request minimal implementation
5. Review for YAGNI violations

```

**Symptoms:**
- Way more code than needed
- Abstractions for single use cases
- Features nobody asked for

---

### [HIGH] AI may reproduce copyrighted code

**Situation:** AI generates code from copyleft or proprietary sources

**Why it happens:**
Training data includes:
- GPL licensed code
- Stack Overflow (CC-BY-SA)
- Proprietary code (leaked)
- Various license restrictions

Using could violate licenses.


**Solution:**
```
1. Enable Copilot's duplication filter
2. Review long blocks of generated code
3. Run license scanning
4. Be cautious with recognizable patterns
5. Understand your company's policy

```

**Symptoms:**
- Recognizable code from elsewhere
- License scanner flags
- Exact match to Stack Overflow

---

### [MEDIUM] Relying on AI can degrade programming skills

**Situation:** Developer forgets fundamentals, can't code without AI

**Why it happens:**
Over-reliance leads to:
- Forgetting syntax
- Not understanding generated code
- Unable to debug without AI
- Losing problem-solving skills

AI should augment, not replace.


**Solution:**
```
1. Understand code before using it
2. Code without AI regularly
3. Explain AI code to yourself
4. Don't skip learning fundamentals
5. Use AI to accelerate, not replace thinking

```

**Symptoms:**
- Can't code without Copilot
- Don't understand own codebase
- Can't solve problems AI can't

---

### [MEDIUM] Junior devs accept bad suggestions more

**Situation:** Less experienced developers trust AI too much

**Why it happens:**
Junior developers may:
- Not recognize bad patterns
- Can't evaluate suggestions
- Accept insecure code
- Miss better alternatives

AI amplifies existing skill gaps.


**Solution:**
```
1. Senior review of AI-heavy code
2. Pair programming with AI
3. Teach how to evaluate suggestions
4. Emphasis on fundamentals first
5. Create team guidelines for AI use

```

**Symptoms:**
- PRs with copied AI patterns
- Security issues in junior code
- Inconsistent code quality

---

### [HIGH] AI API costs can explode

**Situation:** Using API-based tools without cost awareness

**Why it happens:**
Pay-per-token adds up:
- Large codebases = large context
- Multiple iterations
- Multi-file changes
- Long conversations

Easy to spend $100+ per day.


**Solution:**
```
1. Set API spending limits
2. Monitor usage closely
3. Use smaller models when possible
4. Be efficient with prompts
5. Consider subscription tools instead

```

**Symptoms:**
- Unexpected API bill
- Hitting spending limits
- Cost per feature too high

---

### [HIGH] Code sent to AI providers

**Situation:** Proprietary code sent to external AI

**Why it happens:**
Default settings often:
- Send code for completion
- Send code for training
- Store conversation history
- Share with third parties

May violate security policies or regulations.


**Solution:**
```
1. Review privacy settings
2. Opt out of training data
3. Use self-hosted options
4. Enterprise tiers for more control
5. Policy: no secrets in prompts

```

**Symptoms:**
- Security audit concerns
- Compliance questions
- Code in AI training sets

---

## Collaboration

---

## Get the Full Version

This skill has **automated validations**, **detection patterns**, and **structured handoff triggers** that work with the Spawner orchestrator.

```bash
npx vibeship-spawner-skills install
```

Full skill path: `~/.spawner/skills/ai-tools/development/`

**Includes:**
- `skill.yaml` - Structured skill definition
- `sharp-edges.yaml` - Machine-parseable gotchas with detection patterns
- `validations.yaml` - Automated code checks
- `collaboration.yaml` - Handoff triggers for skill orchestration

---

*Generated by [VibeShip Spawner](https://github.com/vibeforge1111/vibeship-spawner-skills)*
