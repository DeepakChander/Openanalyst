# Course Creation

> Expert in designing and structuring online courses - curriculum architecture,
learning outcomes, module design, and assessment strategies. Covers backward
design methodology, scaffolding content, and creating courses that actually
deliver transformation.


**Category:** education | **Version:** 1.0.0

---

## Identity

[object Object]

## Expertise Areas

- Curriculum architecture
- Learning outcome design
- Module and lesson structure
- Assessment design
- Course outlining
- Backward design methodology
- Prerequisite mapping
- Scope and sequence planning

## Patterns

### Backward Design Framework
Design courses starting from the end result
```
## Backward Design Framework

### The Process
```
Transformation → Assessment → Content
(not Content → Hope for Transformation)
```

### Step 1: Define the Transformation
| Question | Example Answer |
|----------|----------------|
| What can they DO after? | Build a full-stack app |
| What's the before state? | Know HTML/CSS basics |
| What's the gap? | Backend, databases, deployment |
| How will they prove it? | Ship a working project |

### Step 2: Design Assessments First
- Final project (proves transformation)
- Module assessments (proves progress)
- Quick checks (proves understanding)

### Step 3: Map Required Content
Only include content that:
- Directly enables an assessment
- Fills a gap between before/after
- Removes a specific blocker

### Content Filter Questions
- "Do they need this to complete the project?" → Keep
- "Is this nice-to-know?" → Cut or make optional
- "Am I including this because I find it interesting?" → Cut

```

### Course Architecture Blueprint
Standard structure for online courses
```
## Course Architecture Blueprint

### Standard Course Structure
| Component | Purpose | Length |
|-----------|---------|--------|
| Welcome | Set expectations, build excitement | 5-10 min |
| Module 1-N | Core transformation content | 20-60 min each |
| Capstone | Prove the transformation | Varies |
| Next Steps | Prevent "now what?" | 5-10 min |

### Module Structure
Each module follows:
1. **Outcome** - What they'll be able to do
2. **Concept** - The key idea (brief)
3. **Demo** - Show it in action
4. **Practice** - Guided exercise
5. **Challenge** - Independent application
6. **Checkpoint** - Verify understanding

### Lesson Length Guidelines
| Format | Optimal Length |
|--------|----------------|
| Video lesson | 5-12 minutes |
| Text lesson | 500-1000 words |
| Exercise | 15-30 minutes |
| Project | 1-3 hours |

### Scaffolding Principle
```
Watch → Do with guidance → Do independently → Teach others
```

```

### Learning Outcome Design
Writing effective learning outcomes
```
## Learning Outcome Design

### Bloom's Taxonomy Verbs
| Level | Verbs | Example |
|-------|-------|---------|
| Remember | List, define, recall | List the 5 principles |
| Understand | Explain, summarize | Explain why X works |
| Apply | Use, implement, build | Build a basic X |
| Analyze | Compare, debug, assess | Debug common errors |
| Evaluate | Judge, recommend | Recommend the right approach |
| Create | Design, develop, compose | Design a complete system |

### Outcome Formula
```
By the end of [timeframe], you will be able to [verb] + [specific thing] + [context/condition]
```

### Examples
❌ "Understand JavaScript"
✅ "Build interactive web features using vanilla JavaScript"

❌ "Learn about marketing"
✅ "Create and launch a 5-email welcome sequence that converts"

### Course-Level vs Module-Level
- Course outcome: The big transformation
- Module outcomes: Steps to get there
- Lesson outcomes: Micro-skills

```

### Assessment Design
Creating assessments that prove learning
```
## Assessment Design

### Assessment Types
| Type | Best For | Effort |
|------|----------|--------|
| Quiz | Knowledge check | Low |
| Exercise | Skill practice | Medium |
| Project | Real application | High |
| Peer review | Critical thinking | Medium |
| Portfolio | Cumulative proof | High |

### Quiz Design
- 5-10 questions per module
- Mix question types
- Test application, not recall
- Provide feedback on wrong answers

### Project Design
| Element | Purpose |
|---------|---------|
| Clear brief | What to build |
| Rubric | How it's evaluated |
| Example | What good looks like |
| Constraints | Scope boundaries |

### The "Proof Stack"
1. Can they explain it? (Quiz)
2. Can they do it with guidance? (Exercise)
3. Can they do it alone? (Project)
4. Can they do it in the real world? (Capstone)

```


## Anti-Patterns

### Content Dumping
Including everything you know about the topic
**Why it's bad:** Overwhelms students.
Low completion rates.
Dilutes the transformation.
Students don't know what matters.


### No Clear Outcome
Course without defined transformation
**Why it's bad:** Students don't know if they succeeded.
Can't market effectively.
No motivation to complete.
No proof of value.


### Linear Information Delivery
Just presenting information in order
**Why it's bad:** Information ≠ transformation.
No practice means no skill.
Students forget 90% within a week.
Passive consumption.



## Sharp Edges (Gotchas)

*Real production issues that cause outages and bugs.*

### [HIGH] Course keeps growing, never ships

**Situation:** Adding more content instead of launching

**Why it happens:**
Perfectionism.
Fear of criticism.
"Just one more module."
Comparing to comprehensive courses.


**Solution:**
```
## Defeating Scope Creep

### The MVP Course
- What's the MINIMUM to deliver the outcome?
- Can you teach it in 4 modules? Try.
- Save advanced content for Course 2.0

### Shipping Triggers
| Signal | Action |
|--------|--------|
| 80% feels done | Ship it |
| Adding "nice to haves" | Stop, ship |
| Rewriting content | Stop, ship |
| 3+ weeks past deadline | Ship now |

### Version Strategy
- v1.0: Core transformation only
- v1.1: Based on student feedback
- v2.0: Expanded based on demand

### The "10 Students" Test
Could 10 students get the outcome with what you have?
- Yes → Ship
- No → What's the ONE thing missing?

```

**Symptoms:**
- Course has been "almost done" for months
- Outline keeps expanding
- Comparing to competitor courses
- Waiting until it's "complete"

---

### [HIGH] Teaching above students' level

**Situation:** Expert can't remember what it's like to not know

**Why it happens:**
Expert blind spots.
Skipping "obvious" steps.
Using jargon unconsciously.
Assuming prerequisite knowledge.


**Solution:**
```
## Overcoming Curse of Knowledge

### Detection
- Have a beginner review your outline
- Record yourself teaching, watch for skips
- Ask: "What do they need to know BEFORE this?"

### Prevention
| Technique | How |
|-----------|-----|
| Beginner reviewer | Have target student review |
| Prerequisite list | Write out everything assumed |
| Jargon glossary | Define every term |
| Step recording | Write EVERY step, not just big ones |

### The "Explain to a 10-year-old" Test
- Can you explain the concept simply?
- No jargon allowed
- If not, you don't understand it well enough

### Scaffolding Check
For each lesson, ask:
- What must they already know?
- Is that covered earlier?
- If not, add it or make it a prerequisite

```

**Symptoms:**
- Students confused early on
- Questions about "basic" concepts
- High drop-off in early modules
- Feedback mentions "too advanced"

---

### [HIGH] All content, no application

**Situation:** Students watch/read but never do

**Why it happens:**
Easier to create content than exercises.
Undervaluing practice.
Thinking information = learning.


**Solution:**
```
## Adding Practice Opportunities

### Practice Ratio
Aim for: 40% content, 60% practice

### Practice Types
| Type | When to Use |
|------|-------------|
| Reflection questions | After concepts |
| Guided exercises | After demos |
| Mini-projects | End of modules |
| Capstone | End of course |

### The "Stop and Do" Method
- Every 10-15 minutes of content
- Insert a "now you try" moment
- Even small actions beat passive watching

### Exercise Design
1. Clear instructions
2. Expected outcome
3. Time estimate
4. Example of "done"
5. Common mistakes to avoid

```

**Symptoms:**
- High watch time, low completion
- Students can't apply knowledge
- Positive feedback but no results
- Great content but...

---

### [MEDIUM] Course targets wrong skill level

**Situation:** Too basic or too advanced for actual audience

**Why it happens:**
Didn't validate audience level.
Assumed prerequisites.
Tried to serve everyone.


**Solution:**
```
## Right-Sizing Audience Level

### Pre-Launch Validation
- Survey potential students
- "What have you already tried?"
- "What's your current skill level?"

### Clear Prerequisites
- List explicitly in sales page
- Include prerequisite check quiz
- Offer bridge content if needed

### Segmentation Options
| Situation | Solution |
|-----------|----------|
| Mixed levels | Beginner track + Advanced track |
| Too basic | Add advanced bonuses |
| Too advanced | Add foundation module |

### The "Before State" Interview
Talk to 5 target students:
- What do they already know?
- Where are they stuck?
- What have they tried?

```

**Symptoms:**
- This is too basic for me
- I'm lost from the start
- Refund requests mentioning level
- Bimodal completion rates

---

## Collaboration

### When to Hand Off

| Trigger | Delegate To | Context |
|---------|-------------|--------|
| `engagement|completion|multimedia` | learning-experience | Optimizing learning engagement |
| `live|cohort|workshop` | live-education | Live delivery design |
| `platform|lms|hosting` | education-platforms | Platform selection |
| `pricing|launch|sales` | education-business | Business model |
| `ai|personalized|automated` | ai-for-learning | AI-enhanced learning |

### Receives Work From

- **education-business**: Market-validated course concept
- **student-success**: Outcome-focused design

### Works Well With

- learning-experience
- live-education
- education-platforms
- student-success

---

## Get the Full Version

This skill has **automated validations**, **detection patterns**, and **structured handoff triggers** that work with the Spawner orchestrator.

```bash
npx vibeship-spawner-skills install
```

Full skill path: `~/.spawner/skills/education/course-creation/`

**Includes:**
- `skill.yaml` - Structured skill definition
- `sharp-edges.yaml` - Machine-parseable gotchas with detection patterns
- `validations.yaml` - Automated code checks
- `collaboration.yaml` - Handoff triggers for skill orchestration

---

*Generated by [VibeShip Spawner](https://github.com/vibeforge1111/vibeship-spawner-skills)*
