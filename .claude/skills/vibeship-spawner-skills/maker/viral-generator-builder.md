# Viral Generator Builder

> Expert in building shareable generator tools that go viral - name generators,
quiz makers, avatar creators, personality tests, and calculator tools. Covers
the psychology of sharing, viral mechanics, and building tools people can't
resist sharing with friends.


**Category:** maker | **Version:** 1.0.0

---

## Identity

[object Object]

## Expertise Areas

- Generator tool architecture
- Shareable result design
- Viral mechanics
- Quiz and personality test builders
- Name and text generators
- Avatar and image generators
- Calculator tools that get shared
- Social sharing optimization

## Patterns

### Generator Architecture
Building generators that go viral
```
## Generator Architecture

### The Viral Generator Formula
```
Input (minimal) → Magic (your algorithm) → Result (shareable)
```

### Input Design
| Type | Example | Virality |
|------|---------|----------|
| Name only | "Enter your name" | High (low friction) |
| Birthday | "Enter your birth date" | High (personal) |
| Quiz answers | "Answer 5 questions" | Medium (more investment) |
| Photo upload | "Upload a selfie" | High (personalized) |

### Result Types That Get Shared
1. **Identity results** - "You are a..."
2. **Comparison results** - "You're 87% like..."
3. **Prediction results** - "In 2025 you will..."
4. **Score results** - "Your score: 847/1000"
5. **Visual results** - Avatar, badge, certificate

### The Screenshot Test
- Result must look good as a screenshot
- Include branding subtly
- Make text readable on mobile
- Add share buttons but design for screenshots

```

### Quiz Builder Pattern
Building personality quizzes that spread
```
## Quiz Builder Pattern

### Quiz Structure
```
5-10 questions → Weighted scoring → One of N results
```

### Question Design
| Type | Engagement |
|------|------------|
| Image choice | Highest |
| This or that | High |
| Slider scale | Medium |
| Multiple choice | Medium |
| Text input | Low |

### Result Categories
- 4-8 possible results (sweet spot)
- Each result should feel desirable
- Results should feel distinct
- Include "rare" results for sharing

### Scoring Logic
```javascript
// Simple weighted scoring
const scores = { typeA: 0, typeB: 0, typeC: 0, typeD: 0 };

answers.forEach(answer => {
  scores[answer.type] += answer.weight;
});

const result = Object.entries(scores)
  .sort((a, b) => b[1] - a[1])[0][0];
```

### Result Page Elements
- Big, bold result title
- Flattering description
- Shareable image/card
- "Share your result" buttons
- "See what friends got" CTA
- Subtle retake option

```

### Name Generator Pattern
Building name generators that people love
```
## Name Generator Pattern

### Generator Types
| Type | Example | Algorithm |
|------|---------|-----------|
| Deterministic | "Your Star Wars name" | Hash of input |
| Random + seed | "Your rapper name" | Seeded random |
| AI-powered | "Your brand name" | LLM generation |
| Combinatorial | "Your fantasy name" | Word parts |

### The Deterministic Trick
Same input = same output = shareable!
```javascript
function generateName(input) {
  const hash = simpleHash(input.toLowerCase());
  const firstNames = ["Shadow", "Storm", "Crystal"];
  const lastNames = ["Walker", "Blade", "Heart"];

  return `${firstNames[hash % firstNames.length]} ${lastNames[(hash >> 8) % lastNames.length]}`;
}
```

### Making Results Feel Personal
- Use their actual name in the result
- Reference their input cleverly
- Add a "meaning" or backstory
- Include a visual representation

### Shareability Boosters
- "Your [X] name is:" format
- Certificate/badge design
- Compare with friends feature
- Daily/weekly changing results

```

### Calculator Virality
Making calculator tools that get shared
```
## Calculator Virality

### Calculators That Go Viral
| Topic | Why It Works |
|-------|--------------|
| Salary/money | Everyone curious |
| Age/time | Personal stakes |
| Compatibility | Relationship drama |
| Worth/value | Ego involvement |
| Predictions | Future curiosity |

### The Viral Calculator Formula
1. Ask for interesting inputs
2. Show impressive calculation
3. Reveal surprising result
4. Make result shareable

### Result Presentation
```
BAD:  "Result: $45,230"
GOOD: "You could save $45,230 by age 40"
BEST: "You're leaving $45,230 on the table 💸"
```

### Comparison Features
- "Compare with average"
- "Compare with friends"
- "See where you rank"
- Percentile displays

```


## Anti-Patterns

### Forgettable Results
Results that don't trigger sharing
**Why it's bad:** Generic results don't get shared.
"You are creative" - so what?
No identity moment.
Nothing to screenshot.


### Too Much Input
Asking for too much before showing results
**Why it's bad:** Every field is a dropout point.
People want instant gratification.
Long forms kill virality.
Mobile users bounce.


### Boring Share Cards
Share images that don't pop
**Why it's bad:** Social feeds are competitive.
Bland cards get scrolled past.
No click = no viral loop.
Wasted opportunity.



## Sharp Edges (Gotchas)

*Real production issues that cause outages and bugs.*

*Sharp edges documented in full version.*

## Collaboration

### When to Hand Off

| Trigger | Delegate To | Context |
|---------|-------------|--------|
| `landing page|conversion|signup` | landing-page-design | Landing page for generator |
| `SEO|search|google` | seo | Search optimization for generator |
| `react|vue|frontend code` | frontend | Frontend implementation |
| `copy|headline|hook` | viral-hooks | Viral copy for sharing |
| `image generation|og image|dynamic image` | ai-image-generation | Dynamic result images |

### Receives Work From

- **viral-hooks**: Viral messaging for generator
- **frontend**: UI implementation

### Works Well With

- viral-hooks
- landing-page-design
- seo
- frontend

---

## Get the Full Version

This skill has **automated validations**, **detection patterns**, and **structured handoff triggers** that work with the Spawner orchestrator.

```bash
npx vibeship-spawner-skills install
```

Full skill path: `~/.spawner/skills/maker/viral-generator-builder/`

**Includes:**
- `skill.yaml` - Structured skill definition
- `sharp-edges.yaml` - Machine-parseable gotchas with detection patterns
- `validations.yaml` - Automated code checks
- `collaboration.yaml` - Handoff triggers for skill orchestration

---

*Generated by [VibeShip Spawner](https://github.com/vibeforge1111/vibeship-spawner-skills)*
