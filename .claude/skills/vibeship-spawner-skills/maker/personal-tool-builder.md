# Personal Tool Builder

> Expert in building custom tools that solve your own problems first. The best products
often start as personal tools - scratch your own itch, build for yourself, then
discover others have the same itch. Covers rapid prototyping, local-first apps,
CLI tools, scripts that grow into products, and the art of dogfooding.


**Category:** maker | **Version:** 1.0.0

---

## Identity

[object Object]

## Expertise Areas

- Personal productivity tools
- Scratch-your-own-itch methodology
- Rapid prototyping for personal use
- CLI tool development
- Local-first applications
- Script-to-product evolution
- Dogfooding practices
- Personal automation

## Patterns

### Scratch Your Own Itch
Building from personal pain points
```
## The Itch-to-Tool Process

### Identifying Real Itches
```
Good itches:
- "I do this manually 10x per day"
- "This takes me 30 minutes every time"
- "I wish X just did Y"
- "Why doesn't this exist?"

Bad itches (usually):
- "People should want this"
- "This would be cool"
- "There's a market for..."
- "AI could probably..."
```

### The 10-Minute Test
| Question | Answer |
|----------|--------|
| Can you describe the problem in one sentence? | Required |
| Do you experience this problem weekly? | Must be yes |
| Have you tried solving it manually? | Must have |
| Would you use this daily? | Should be yes |

### Start Ugly
```
Day 1: Script that solves YOUR problem
- No UI, just works
- Hardcoded paths, your data
- Zero error handling
- You understand every line

Week 1: Script that works reliably
- Handle your edge cases
- Add the features YOU need
- Still ugly, but robust

Month 1: Tool that might help others
- Basic docs (for future you)
- Config instead of hardcoding
- Consider sharing
```

```

### CLI Tool Architecture
Building command-line tools that last
```
## CLI Tool Stack

### Node.js CLI Stack
```javascript
// package.json
{
  "name": "my-tool",
  "version": "1.0.0",
  "bin": {
    "mytool": "./bin/cli.js"
  },
  "dependencies": {
    "commander": "^12.0.0",    // Argument parsing
    "chalk": "^5.3.0",          // Colors
    "ora": "^8.0.0",            // Spinners
    "inquirer": "^9.2.0",       // Interactive prompts
    "conf": "^12.0.0"           // Config storage
  }
}

// bin/cli.js
#!/usr/bin/env node
import { Command } from 'commander';
import chalk from 'chalk';

const program = new Command();

program
  .name('mytool')
  .description('What it does in one line')
  .version('1.0.0');

program
  .command('do-thing')
  .description('Does the thing')
  .option('-v, --verbose', 'Verbose output')
  .action(async (options) => {
    // Your logic here
  });

program.parse();
```

### Python CLI Stack
```python
# Using Click (recommended)
import click

@click.group()
def cli():
    """Tool description."""
    pass

@cli.command()
@click.option('--name', '-n', required=True)
@click.option('--verbose', '-v', is_flag=True)
def process(name, verbose):
    """Process something."""
    click.echo(f'Processing {name}')

if __name__ == '__main__':
    cli()
```

### Distribution
| Method | Complexity | Reach |
|--------|------------|-------|
| npm publish | Low | Node devs |
| pip install | Low | Python devs |
| Homebrew tap | Medium | Mac users |
| Binary release | Medium | Everyone |
| Docker image | Medium | Tech users |

```

### Local-First Apps
Apps that work offline and own your data
```
## Local-First Architecture

### Why Local-First for Personal Tools
```
Benefits:
- Works offline
- Your data stays yours
- No server costs
- Instant, no latency
- Works forever (no shutdown)

Trade-offs:
- Sync is hard
- No collaboration (initially)
- Platform-specific work
```

### Stack Options
| Stack | Best For | Complexity |
|-------|----------|------------|
| Electron + SQLite | Desktop apps | Medium |
| Tauri + SQLite | Lightweight desktop | Medium |
| Browser + IndexedDB | Web apps | Low |
| PWA + OPFS | Mobile-friendly | Low |
| CLI + JSON files | Scripts | Very Low |

### Simple Local Storage
```javascript
// For simple tools: JSON file storage
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { homedir } from 'os';
import { join } from 'path';

const DATA_DIR = join(homedir(), '.mytool');
const DATA_FILE = join(DATA_DIR, 'data.json');

function loadData() {
  if (!existsSync(DATA_FILE)) return { items: [] };
  return JSON.parse(readFileSync(DATA_FILE, 'utf8'));
}

function saveData(data) {
  if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR);
  writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}
```

### SQLite for More Complex Tools
```javascript
// better-sqlite3 for Node.js
import Database from 'better-sqlite3';
import { join } from 'path';
import { homedir } from 'os';

const db = new Database(join(homedir(), '.mytool', 'data.db'));

// Create tables on first run
db.exec(`
  CREATE TABLE IF NOT EXISTS items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// Fast synchronous queries
const items = db.prepare('SELECT * FROM items').all();
```

```

### Script to Product Evolution
Growing a script into a real product
```
## Evolution Path

### Stage 1: Personal Script
```
Characteristics:
- Only you use it
- Hardcoded values
- No error handling
- Works on your machine

Time: Hours to days
```

### Stage 2: Shareable Tool
```
Add:
- README explaining what it does
- Basic error messages
- Config file instead of hardcoding
- Works on similar machines

Time: Days
```

### Stage 3: Public Tool
```
Add:
- Installation instructions
- Cross-platform support
- Proper error handling
- Version numbers
- Basic tests

Time: Week or two
```

### Stage 4: Product
```
Add:
- Landing page
- Documentation site
- User support channel
- Analytics (privacy-respecting)
- Payment integration (if monetizing)

Time: Weeks to months
```

### Signs You Should Productize
| Signal | Strength |
|--------|----------|
| Others asking for it | Strong |
| You use it daily | Strong |
| Solves $100+ problem | Strong |
| Others would pay | Very strong |
| Competition exists but sucks | Strong |
| You're embarrassed by it | Actually good |

```


## Anti-Patterns

### Building for Imaginary Users
Creating tools for problems you don't have
**Why it's bad:** No real feedback loop.
Building features no one needs.
Giving up because no motivation.
Solving the wrong problem.


### Over-Engineering Personal Tools
Adding unnecessary complexity to personal scripts
**Why it's bad:** Takes forever to build.
Harder to modify later.
Complexity kills motivation.
Perfect is enemy of done.


### Not Dogfooding
Building tools you don't use yourself
**Why it's bad:** Missing obvious UX issues.
Not finding real bugs.
Features that don't help.
No passion for improvement.


### Premature Monetization
Trying to charge before the tool is proven
**Why it's bad:** Pressure kills exploration.
Wrong incentives.
Optimize for payment, not utility.
Users before revenue.



## Sharp Edges (Gotchas)

*Real production issues that cause outages and bugs.*

### [MEDIUM] Tool only works in your specific environment

**Situation:** Script fails when you try to share it

**Why it happens:**
Hardcoded absolute paths.
Relies on your installed tools.
Assumes your OS/shell.
Uses your auth tokens.


**Solution:**
```
## Making Tools Portable

### Common Portability Issues
| Issue | Fix |
|-------|-----|
| Hardcoded paths | Use ~ or env vars |
| Specific shell | Declare shell in shebang |
| Missing deps | Check and prompt to install |
| Auth tokens | Use config file or env |
| OS-specific | Test on other OS or use cross-platform libs |

### Path Portability
```javascript
// Bad
const dataFile = '/Users/yourname/data.json';

// Good
import { homedir } from 'os';
import { join } from 'path';
const dataFile = join(homedir(), '.mytool', 'data.json');
```

### Dependency Checking
```javascript
import { execSync } from 'child_process';

function checkDep(cmd, installHint) {
  try {
    execSync(`which ${cmd}`, { stdio: 'ignore' });
  } catch {
    console.error(`Missing: ${cmd}`);
    console.error(`Install: ${installHint}`);
    process.exit(1);
  }
}

checkDep('ffmpeg', 'brew install ffmpeg');
```

### Cross-Platform Considerations
```javascript
import { platform } from 'os';

const isWindows = platform() === 'win32';
const isMac = platform() === 'darwin';
const isLinux = platform() === 'linux';

// Path separator
import { sep } from 'path';
// Use sep instead of hardcoded / or \
```

```

**Symptoms:**
- Works on my machine
- Scripts failing for others
- Path not found errors
- Command not found errors

---

### [MEDIUM] Configuration becomes unmanageable

**Situation:** Too many config options making the tool unusable

**Why it happens:**
Adding options instead of opinions.
Fear of making decisions.
Every edge case becomes an option.
Config file larger than the tool.


**Solution:**
```
## Taming Configuration

### The Config Hierarchy
```
Best to worst:
1. Smart defaults (no config needed)
2. Single config file
3. Environment variables
4. Command-line flags
5. Interactive prompts

Use sparingly:
6. Config directory with multiple files
7. Config inheritance/merging
```

### Opinionated Defaults
```javascript
// Instead of 10 options, pick reasonable defaults
const defaults = {
  outputDir: join(homedir(), '.mytool', 'output'),
  format: 'json',  // Not a flag, just pick one
  maxItems: 100,   // Good enough for most
  verbose: false
};

// Only expose what REALLY needs customization
// "Would I want to change this?" - not "Could someone?"
```

### Config File Pattern
```javascript
// ~/.mytool/config.json
// Keep it minimal
{
  "apiKey": "xxx",       // Actually needed
  "defaultProject": "main"  // Convenience
}

// Don't do this:
{
  "outputFormat": "json",
  "outputIndent": 2,
  "outputColorize": true,
  "logLevel": "info",
  "logFormat": "pretty",
  "logTimestamp": true,
  // ... 50 more options
}
```

### When to Add Options
| Add option if... | Don't add if... |
|------------------|-----------------|
| Users ask repeatedly | You imagine someone might want |
| Security/auth related | It's a "nice to have" |
| Fundamental behavior change | It's a micro-preference |
| Environment-specific | You can pick a good default |

```

**Symptoms:**
- Config file is huge
- Users confused by options
- You forget what options exist
- Every bug fix adds a flag

---

### [LOW] Personal tool becomes unmaintained

**Situation:** Tool you built is now broken and you don't want to fix it

**Why it happens:**
Built for old workflow.
Dependencies broke.
Lost interest.
No documentation for yourself.


**Solution:**
```
## Sustainable Personal Tools

### Design for Abandonment
```
Assume future-you won't remember:
- Why you built this
- How it works
- Where the data is
- What the dependencies do

Build accordingly:
- README with WHY, not just WHAT
- Simple architecture
- Minimal dependencies
- Data in standard formats
```

### Minimal Dependency Strategy
| Approach | When to Use |
|----------|-------------|
| Zero deps | Simple scripts |
| Core deps only | CLI tools |
| Lock versions | Important tools |
| Bundle deps | Distribution |

### Self-Documenting Pattern
```javascript
#!/usr/bin/env node
/**
 * WHAT: Converts X to Y
 * WHY: Because Z process was manual
 * WHERE: Data in ~/.mytool/
 * DEPS: Needs ffmpeg installed
 *
 * Last used: 2024-01
 * Still works as of: 2024-01
 */

// Tool code here
```

### Graceful Degradation
```javascript
// When things break, fail helpfully
try {
  await runMainFeature();
} catch (err) {
  console.error('Tool broken. Error:', err.message);
  console.error('');
  console.error('Data location: ~/.mytool/data.json');
  console.error('You can manually access your data there.');
  process.exit(1);
}
```

### When to Let Go
```
Signs to abandon:
- Haven't used in 6+ months
- Problem no longer exists
- Better tool now exists
- Would rebuild differently

How to abandon gracefully:
- Archive in clear state
- Note why abandoned
- Export data to standard format
- Don't delete (might want later)
```

```

**Symptoms:**
- Script hasn't run in months
- Don't remember how it works
- Dependencies outdated
- Workflow has changed

---

### [HIGH] Personal tools with security vulnerabilities

**Situation:** Your personal tool exposes sensitive data or access

**Why it happens:**
"It's just for me" mentality.
Credentials in code.
No input validation.
Accidental exposure.


**Solution:**
```
## Security in Personal Tools

### Common Mistakes
| Risk | Mitigation |
|------|------------|
| API keys in code | Use env vars or config file |
| Tool exposed on network | Bind to localhost only |
| No input validation | Validate even your own input |
| Logs contain secrets | Sanitize logging |
| Git commits with secrets | .gitignore config files |

### Credential Management
```javascript
// Never in code
const API_KEY = 'sk-xxx'; // BAD

// Environment variable
const API_KEY = process.env.MY_API_KEY;

// Config file (gitignored)
import { readFileSync } from 'fs';
const config = JSON.parse(
  readFileSync(join(homedir(), '.mytool', 'config.json'))
);
const API_KEY = config.apiKey;
```

### Localhost-Only Servers
```javascript
// If your tool has a web UI
import express from 'express';
const app = express();

// ALWAYS bind to localhost for personal tools
app.listen(3000, '127.0.0.1', () => {
  console.log('Running on http://localhost:3000');
});

// NEVER do this for personal tools:
// app.listen(3000, '0.0.0.0') // Exposes to network!
```

### Before Sharing
```
Checklist:
[ ] No hardcoded credentials
[ ] Config file is gitignored
[ ] README mentions credential setup
[ ] No personal paths in code
[ ] No sensitive data in repo
[ ] Reviewed git history for secrets
```

```

**Symptoms:**
- API keys in source code
- Tool accessible on network
- Credentials in git history
- Personal data exposed

---

## Collaboration

### When to Hand Off

| Trigger | Delegate To | Context |
|---------|-------------|--------|
| `sell|monetize|SaaS|charge` | micro-saas-launcher | Productizing personal tool |
| `browser extension|chrome extension` | browser-extension-builder | Building browser-based tool |
| `automate|workflow|cron|trigger` | workflow-automation | Automation setup |
| `API|server|database|postgres` | backend | Backend infrastructure |
| `telegram bot` | telegram-bot-builder | Telegram-based tool |
| `AI|GPT|Claude|LLM` | ai-wrapper-product | AI-powered tool |

### Receives Work From

- **workflow-automation**: Building automation tools
- **backend**: Tool needs data persistence

### Works Well With

- micro-saas-launcher
- browser-extension-builder
- workflow-automation
- backend

---

## Get the Full Version

This skill has **automated validations**, **detection patterns**, and **structured handoff triggers** that work with the Spawner orchestrator.

```bash
npx vibeship-spawner-skills install
```

Full skill path: `~/.spawner/skills/maker/personal-tool-builder/`

**Includes:**
- `skill.yaml` - Structured skill definition
- `sharp-edges.yaml` - Machine-parseable gotchas with detection patterns
- `validations.yaml` - Automated code checks
- `collaboration.yaml` - Handoff triggers for skill orchestration

---

*Generated by [VibeShip Spawner](https://github.com/vibeforge1111/vibeship-spawner-skills)*
