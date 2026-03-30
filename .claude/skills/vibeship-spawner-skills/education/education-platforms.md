# Education Platforms

> Expert in course platform selection and implementation - comparing Teachable,
Kajabi, Thinkific, and custom solutions. Covers LMS selection criteria,
platform migrations, tech stack decisions, and building vs buying.


**Category:** education | **Version:** 1.0.0

---

## Identity

[object Object]

## Expertise Areas

- LMS platform selection
- Platform comparison
- Course platform migrations
- Education tech stack
- Build vs buy decisions
- Platform integrations
- Feature evaluation
- Vendor assessment

## Patterns

### Platform Selection Framework
Choosing the right course platform
```
## Platform Selection Framework

### Decision Matrix
| Factor | Weight | Questions |
|--------|--------|-----------|
| Core features | High | Does it do what I need? |
| Pricing model | High | Can I afford it at scale? |
| Ease of use | Medium | Can I manage it myself? |
| Customization | Medium | Can I brand it properly? |
| Integrations | Medium | Does it connect to my tools? |
| Support | Low | Can I get help when stuck? |

### Platform Categories
| Type | Examples | Best For |
|------|----------|----------|
| All-in-one | Kajabi, Kartra | Solo educators, bundled needs |
| Course-focused | Teachable, Thinkific | Course-first business |
| Community-first | Circle, Mighty Networks | Community + courses |
| Enterprise | Docebo, Cornerstone | Large orgs, compliance |
| Open source | Moodle, Open edX | Full control, tech team |

### Quick Recommendation
| Situation | Platform |
|-----------|----------|
| First course, simple | Teachable or Thinkific |
| Courses + community | Circle or Mighty Networks |
| All-in-one marketing | Kajabi |
| Full customization | Custom (Next.js + headless) |
| Enterprise/compliance | Docebo or Cornerstone |

```

### Platform Comparison Matrix
Detailed comparison of major platforms
```
## Platform Comparison Matrix

### Course Platforms (2024)
| Platform | Price | Best For | Weakness |
|----------|-------|----------|----------|
| Teachable | $59-249/mo | Beginners, simplicity | Limited community |
| Thinkific | $49-199/mo | Course + membership | Basic marketing |
| Kajabi | $149-399/mo | All-in-one | Expensive, opinionated |
| Podia | $39-199/mo | Digital products | Limited features |
| LearnDash | $199/yr | WordPress users | Needs WordPress |

### Community + Courses
| Platform | Price | Best For | Weakness |
|----------|-------|----------|----------|
| Circle | $49-219/mo | Community-first | Courses less mature |
| Mighty Networks | $99-315/mo | Courses + community | Can be slow |
| Skool | $99/mo | Gamified community | Limited course features |

### Feature Comparison
| Feature | Teachable | Kajabi | Thinkific | Circle |
|---------|-----------|--------|-----------|--------|
| Course hosting | ✅ | ✅ | ✅ | ✅ |
| Community | ❌ | Basic | Basic | ✅ |
| Email marketing | Basic | ✅ | Basic | ❌ |
| Landing pages | Basic | ✅ | Basic | ❌ |
| Cohort features | ❌ | ❌ | ✅ | ✅ |
| API access | ✅ | Limited | ✅ | ✅ |

### Hidden Costs to Consider
- Transaction fees (some platforms take %)
- Additional user charges
- Storage limits
- Integration costs
- Migration costs later

```

### Build vs Buy Decision
When to build custom vs use SaaS
```
## Build vs Buy Decision

### When to Buy (SaaS Platform)
- First course
- No development team
- Need to launch fast
- Standard course format
- Budget under $5K/month

### When to Build Custom
- Unique learning format
- Tight integration needs
- 10K+ students
- Platform taking too much revenue
- Long-term cost optimization

### Hybrid Approach
| Component | Buy | Build |
|-----------|-----|-------|
| Video hosting | Vimeo, Bunny | |
| Payments | Stripe | |
| Auth | | Custom or Clerk |
| Course UI | | Custom |
| Community | Discord, Circle | |

### Custom Stack Options
| Stack | Complexity | Flexibility |
|-------|------------|-------------|
| WordPress + LearnDash | Low | Medium |
| Next.js + Headless CMS | High | High |
| Rails + Custom | High | High |
| No-code (Bubble) | Medium | Medium |

### Total Cost Comparison (5 year)
| Approach | Year 1 | Year 5 Total |
|----------|--------|--------------|
| Teachable Pro | $3K | $15K |
| Kajabi Growth | $5K | $25K |
| Custom build | $30-50K | $50-70K |

```

### Platform Migration
Moving between course platforms
```
## Platform Migration

### Migration Checklist
- [ ] Export student data
- [ ] Export course content
- [ ] Document current structure
- [ ] Test new platform thoroughly
- [ ] Plan communication
- [ ] Set redirect strategy
- [ ] Pick low-activity time

### What Migrates Easily
- Video files (re-upload or link)
- Text content
- Student email list
- Basic course structure

### What Doesn't Migrate
- Progress data (usually lost)
- Platform-specific features
- URLs and bookmarks
- Platform integrations
- Quiz results

### Migration Timeline
| Phase | Duration |
|-------|----------|
| Planning | 2 weeks |
| Content export/import | 2-4 weeks |
| Testing | 1-2 weeks |
| Parallel run | 1-2 weeks |
| Switch + communication | 1 week |

### Communication Template
```
Subject: We're moving to a better home

Good news: We've upgraded to a new platform that will
give you [specific benefits].

What you need to do:
1. Your login is the same
2. New URL: [link]
3. Progress resets (we're giving you [bonus])

Questions? Reply to this email.
```

```


## Anti-Patterns

### Feature Chasing
Choosing platform for features you won't use
**Why it's bad:** Paying for unused features.
More complex than needed.
Harder to switch later.


### Price-First Decision
Choosing cheapest option
**Why it's bad:** Hidden costs emerge.
Missing critical features.
Limits growth.
Migrating costs more than premium would have.


### Premature Custom Build
Building custom before validating
**Why it's bad:** Months of development.
Not sure course will sell.
Technical debt before revenue.
Could use that time to teach.



## Sharp Edges (Gotchas)

*Real production issues that cause outages and bugs.*

### [HIGH] Trapped in platform that no longer fits

**Situation:** Can't migrate without losing data and students

**Why it happens:**
No data export capability.
Proprietary features used heavily.
Student progress not portable.
URLs can't redirect.


**Solution:**
```
## Avoiding Platform Lock-in

### Prevention
- Evaluate export capabilities FIRST
- Own your email list (outside platform)
- Keep content in external format
- Use platform-agnostic tools where possible

### Lock-in Warning Signs
| Sign | Risk Level |
|------|------------|
| No export option | Critical |
| Proprietary formats | High |
| No API | High |
| Community can't migrate | Medium |
| Custom domain issues | Medium |

### If Already Locked In
1. Export what you can now
2. Build email list externally
3. Document all content outside platform
4. Plan migration for low-activity period
5. Accept some data loss

### Portable Elements (Own These)
- Email list (in ConvertKit, Mailchimp)
- Content source files
- Student testimonials
- Brand assets
- Your own domain

```

**Symptoms:**
- We can't leave because...
- Platform raising prices
- Missing critical features
- Competitors using better tools

---

### [HIGH] Platform fees eating into revenue at scale

**Situation:** Transaction fees become significant cost

**Why it happens:**
Didn't read fine print.
Fees compound at scale.
Cheaper tier had higher fees.


**Solution:**
```
## Transaction Fee Analysis

### Common Fee Structures
| Platform | Monthly | Transaction |
|----------|---------|-------------|
| Teachable Basic | $59 | 5% |
| Teachable Pro | $159 | 0% |
| Thinkific Basic | $49 | 0% |
| Kajabi | $149+ | 0% |
| Podia | $39 | 5% (Mover) |

### Break-Even Analysis
When to upgrade from Basic (5% fee) to Pro (0% fee):

| Revenue/mo | 5% Fee | Pro Cost | Winner |
|------------|--------|----------|--------|
| $1,000 | $50 | $159 | Basic |
| $2,000 | $100 | $159 | Basic |
| $3,200 | $160 | $159 | Pro |
| $5,000 | $250 | $159 | Pro |

### Hidden Fees to Check
- Payment processor fees (Stripe/PayPal)
- Currency conversion
- Payout fees
- Affiliate commission processing

```

**Symptoms:**
- Fees growing each month
- Profit margins shrinking
- Paying more in fees than subscription

---

### [HIGH] Platform migration causes chaos

**Situation:** Migration causes data loss and student confusion

**Why it happens:**
Rushed migration.
Insufficient testing.
Poor communication.
Progress data lost.


**Solution:**
```
## Safe Migration Process

### Pre-Migration
- [ ] Full backup of everything
- [ ] Document current structure completely
- [ ] Test import on new platform
- [ ] Prepare student communication
- [ ] Plan redirect strategy

### Migration Day
- [ ] Choose low-traffic period
- [ ] Have support on standby
- [ ] Don't delete old platform yet
- [ ] Monitor for issues
- [ ] Be responsive to questions

### Post-Migration
- [ ] Verify all content accessible
- [ ] Test student journeys
- [ ] Check payment integration
- [ ] Monitor support tickets
- [ ] Keep old platform live 2-4 weeks

### Communicate Early and Often
- 2 weeks before: Announce change
- 1 week before: What to expect
- Day of: Here's what changed
- Day after: Check-in email

```

**Symptoms:**
- Students can't log in
- Content missing
- Progress lost without warning
- Support overwhelmed

---

### [MEDIUM] Switching platforms for new features, not needs

**Situation:** Frequent platform switching or evaluation

**Why it happens:**
FOMO on new features.
Competitor platform envy.
Marketing to educators.
Avoiding real work.


**Solution:**
```
## Staying Focused

### Switch Criteria (2 of 4 needed)
1. Missing feature that's costing real money
2. Platform limiting growth significantly
3. Support quality unacceptable
4. Pricing no longer competitive

### "Good Enough" Principle
- Perfect platform doesn't exist
- Switching costs time and money
- Students don't care about your platform
- Focus on content, not tools

### Quarterly Review (Not More)
- Is current platform blocking anything?
- What would switching actually gain?
- What's the true switching cost?
- Decision: Stay or start migration

```

**Symptoms:**
- Constantly researching platforms
- Switching more than once/year
- Grass-is-greener thinking
- Procrastinating on course work

---

## Collaboration

### When to Hand Off

| Trigger | Delegate To | Context |
|---------|-------------|--------|
| `curriculum|content|structure` | course-creation | Course design |
| `engagement|gamification|completion` | learning-experience | Experience design |
| `pricing|launch|business` | education-business | Business model |
| `ai|personalization` | ai-for-learning | AI features |
| `community|discord|slack` | community-operations | Community platform |

### Receives Work From

- **course-creation**: Course requirements for platform
- **learning-experience**: Experience feature requirements
- **education-business**: Business model requirements

### Works Well With

- course-creation
- learning-experience
- education-business
- ai-for-learning

---

## Get the Full Version

This skill has **automated validations**, **detection patterns**, and **structured handoff triggers** that work with the Spawner orchestrator.

```bash
npx vibeship-spawner-skills install
```

Full skill path: `~/.spawner/skills/education/education-platforms/`

**Includes:**
- `skill.yaml` - Structured skill definition
- `sharp-edges.yaml` - Machine-parseable gotchas with detection patterns
- `validations.yaml` - Automated code checks
- `collaboration.yaml` - Handoff triggers for skill orchestration

---

*Generated by [VibeShip Spawner](https://github.com/vibeforge1111/vibeship-spawner-skills)*
