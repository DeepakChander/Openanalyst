# Interactive Portfolio

> Expert in building portfolios that actually land jobs and clients - not just
showing work, but creating memorable experiences. Covers developer portfolios,
designer portfolios, creative portfolios, and portfolios that convert visitors
into opportunities.


**Category:** maker | **Version:** 1.0.0

---

## Identity

[object Object]

## Expertise Areas

- Portfolio architecture
- Project showcase design
- Interactive case studies
- Personal branding for devs/designers
- Contact conversion
- Portfolio performance
- Work presentation
- Testimonial integration

## Patterns

### Portfolio Architecture
Structure that works for portfolios
```
## Portfolio Architecture

### The 30-Second Test
In 30 seconds, visitors should know:
1. Who you are
2. What you do
3. Your best work
4. How to contact you

### Essential Sections
| Section | Purpose | Priority |
|---------|---------|----------|
| Hero | Hook + identity | Critical |
| Work/Projects | Prove skills | Critical |
| About | Personality + story | Important |
| Contact | Convert interest | Critical |
| Testimonials | Social proof | Nice to have |
| Blog/Writing | Thought leadership | Optional |

### Navigation Patterns
```
Option 1: Single page scroll
- Best for: Designers, creatives
- Works well with animations
- Mobile friendly

Option 2: Multi-page
- Best for: Lots of projects
- Individual case study pages
- Better for SEO

Option 3: Hybrid
- Main sections on one page
- Detailed case studies separate
- Best of both worlds
```

### Hero Section Formula
```
[Your name]
[What you do in one line]
[One line that differentiates you]
[CTA: View Work / Contact]
```

```

### Project Showcase
How to present work effectively
```
## Project Showcase

### Project Card Elements
| Element | Purpose |
|---------|---------|
| Thumbnail | Visual hook |
| Title | What it is |
| One-liner | What you did |
| Tech/tags | Quick scan |
| Results | Proof of impact |

### Case Study Structure
```
1. Hero image/video
2. Project overview (2-3 sentences)
3. The challenge
4. Your role
5. Process highlights
6. Key decisions
7. Results/impact
8. Learnings (optional)
9. Links (live, GitHub, etc.)
```

### Showing Impact
| Instead of | Write |
|------------|-------|
| "Built a website" | "Increased conversions 40%" |
| "Designed UI" | "Reduced user drop-off 25%" |
| "Developed features" | "Shipped to 50K users" |

### Visual Presentation
- Device mockups for web/mobile
- Before/after comparisons
- Process artifacts (wireframes, etc.)
- Video walkthroughs for complex work
- Hover effects for engagement

```

### Developer Portfolio Specifics
What works for dev portfolios
```
## Developer Portfolio

### What Hiring Managers Look For
1. Code quality (GitHub link)
2. Real projects (not just tutorials)
3. Problem-solving ability
4. Communication skills
5. Technical depth

### Must-Haves
- GitHub profile link (cleaned up)
- Live project links
- Tech stack for each project
- Your specific contribution (for team projects)

### Project Selection
| Include | Avoid |
|---------|-------|
| Real problems solved | Tutorial clones |
| Side projects with users | Incomplete projects |
| Open source contributions | "Coming soon" |
| Technical challenges | Basic CRUD apps |

### Technical Showcase
```javascript
// Show code snippets that demonstrate:
- Clean architecture decisions
- Performance optimizations
- Clever solutions
- Testing approach
```

### Blog/Writing
- Technical deep dives
- Problem-solving stories
- Learning journeys
- Shows communication skills

```

### Portfolio Interactivity
Adding memorable interactive elements
```
## Portfolio Interactivity

### Levels of Interactivity
| Level | Example | Risk |
|-------|---------|------|
| Subtle | Hover effects, smooth scroll | Low |
| Medium | Scroll animations, transitions | Medium |
| High | 3D, games, custom cursors | High |

### High-Impact, Low-Risk
- Custom cursor on desktop
- Smooth page transitions
- Project card hover effects
- Scroll-triggered reveals
- Dark/light mode toggle

### Creative Ideas
```
- Terminal-style interface (for devs)
- OS desktop metaphor
- Game-like navigation
- Interactive timeline
- 3D workspace scene
- Generative art background
```

### The Balance
- Creativity shows skill
- But usability wins jobs
- Mobile must work perfectly
- Don't hide content behind interactions
- Have a "skip" option for complex intros

```


## Anti-Patterns

### Template Portfolio
Generic template with no personality
**Why it's bad:** Looks like everyone else.
No memorable impression.
Doesn't show creativity.
Easy to forget.


### All Style No Substance
Beautiful but no real work
**Why it's bad:** Fancy animations, weak projects.
Style over substance.
Hiring managers see through it.
No proof of skills.


### Resume Website
Portfolio that's just an online resume
**Why it's bad:** Boring, forgettable.
Doesn't use the medium.
No personality.
Lists instead of stories.



## Sharp Edges (Gotchas)

*Real production issues that cause outages and bugs.*

### [MEDIUM] Portfolio more complex than your actual work

**Situation:** Spent 6 months on portfolio, have 2 projects to show

**Why it happens:**
Procrastination disguised as work.
Portfolio IS a project, but not THE project.
Diminishing returns on polish.
Ship it and iterate.


**Solution:**
```
## Right-Sizing Your Portfolio

### The MVP Portfolio
| Element | MVP Version |
|---------|-------------|
| Hero | Name + title + one line |
| Projects | 3-4 best pieces |
| About | 2-3 paragraphs |
| Contact | Email + LinkedIn |

### Time Budget
```
Week 1: Design and structure
Week 2: Build core pages
Week 3: Add 3-4 projects
Week 4: Polish and launch
```

### The Truth
- Your portfolio is not your best project
- Shipping beats perfecting
- You can always iterate
- Better projects > better portfolio

### When to Stop
- Core pages work on mobile
- 3-4 solid projects showcased
- Contact form works
- Loads in < 3 seconds
- Ship it.

```

**Symptoms:**
- Been "working on portfolio" for months
- More excited about portfolio than projects
- Portfolio tech more impressive than work
- Afraid to launch

---

### [HIGH] Portfolio looks great on desktop, broken on mobile

**Situation:** Recruiters check on phone, everything breaks

**Why it happens:**
Built desktop-first.
Didn't test on real devices.
Complex interactions don't translate.
Forgot about thumb zones.


**Solution:**
```
## Mobile-First Portfolio

### Mobile Reality
- 60%+ traffic is mobile
- Recruiters browse on phones
- First impression = mobile impression

### Mobile Must-Haves
- Readable without zooming
- Tappable links (min 44px)
- Navigation works
- Projects load fast
- Contact easy to find

### Testing Checklist
```
[ ] iPhone Safari
[ ] Android Chrome
[ ] Tablet sizes
[ ] Slow 3G simulation
[ ] Real device (not just DevTools)
```

### Graceful Degradation
```css
/* Complex hover → simple tap */
@media (hover: none) {
  .hover-effect {
    /* Show content directly */
  }
}
```

```

**Symptoms:**
- Looks great in browser DevTools
- Broken on actual phone
- Text too small
- Buttons hard to tap
- Navigation hidden

---

### [MEDIUM] Visitors don't know what to do next

**Situation:** Great portfolio, zero contacts

**Why it happens:**
No clear CTA.
Contact buried at bottom.
Multiple competing actions.
Assuming visitors will figure it out.


**Solution:**
```
## Portfolio CTAs

### Primary CTAs
| Goal | CTA |
|------|-----|
| Get hired | "Let's work together" |
| Freelance | "Start a project" |
| Network | "Say hello" |
| Specific role | "Hire me for [X]" |

### CTA Placement
```
Hero section: Main CTA
After projects: Secondary CTA
Footer: Final CTA
Floating: Optional persistent CTA
```

### Making Contact Easy
- Email link (mailto:)
- LinkedIn (opens new tab)
- Calendar link (Calendly)
- Simple contact form
- Copy email button

### What to Avoid
- Contact form only (people hate forms)
- Hidden contact info
- Too many options
- Vague CTAs ("Learn more")

```

**Symptoms:**
- Lots of views, no contacts
- People don't know you're available
- Contact page is afterthought
- No clear ask

---

### [MEDIUM] Portfolio shows old or irrelevant work

**Situation:** Best work is 3 years old, newer work not shown

**Why it happens:**
Haven't updated in years.
Newer work is "not ready."
Scared to remove old favorites.
Portfolio drift.


**Solution:**
```
## Portfolio Freshness

### Update Cadence
| Action | Frequency |
|--------|-----------|
| Add new project | When completed |
| Remove old project | Yearly review |
| Update copy | Every 6 months |
| Tech refresh | Every 1-2 years |

### Project Pruning
Keep if:
- Still proud of it
- Relevant to target jobs
- Shows important skills
- Has good results/story

Remove if:
- Embarrassed by code/design
- Tech is obsolete
- Not relevant to goals
- Better work exists

### Showing Growth
- Latest work first
- Date projects (or don't)
- Show evolution if relevant
- Archive instead of delete

```

**Symptoms:**
- jQuery projects in 2024
- I did this in college
- Tech stack doesn't match target jobs
- Haven't touched portfolio in 2+ years

---

## Collaboration

### When to Hand Off

| Trigger | Delegate To | Context |
|---------|-------------|--------|
| `scroll animation|parallax|GSAP` | scroll-experience | Scroll experience for portfolio |
| `3D|WebGL|three.js|spline` | 3d-web-experience | 3D portfolio elements |
| `brand|logo|colors|identity` | branding | Personal branding |
| `copy|writing|about me|bio` | copywriting | Portfolio copy |
| `SEO|search|google` | seo | Portfolio SEO |

### Receives Work From

- **scroll-experience**: Scroll animations for portfolio
- **branding**: Personal branding

### Works Well With

- scroll-experience
- 3d-web-experience
- landing-page-design
- personal-branding

---

## Get the Full Version

This skill has **automated validations**, **detection patterns**, and **structured handoff triggers** that work with the Spawner orchestrator.

```bash
npx vibeship-spawner-skills install
```

Full skill path: `~/.spawner/skills/maker/interactive-portfolio/`

**Includes:**
- `skill.yaml` - Structured skill definition
- `sharp-edges.yaml` - Machine-parseable gotchas with detection patterns
- `validations.yaml` - Automated code checks
- `collaboration.yaml` - Handoff triggers for skill orchestration

---

*Generated by [VibeShip Spawner](https://github.com/vibeforge1111/vibeship-spawner-skills)*
