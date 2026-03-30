# Community Strategy

> Expert in designing community strategies that align with business goals while
creating genuine value for members. Covers community-market fit, positioning,
culture design, governance models, and long-term roadmapping. Understands that
great communities are intentionally designed, not accidentally grown.


**Category:** community | **Version:** 1.0.0

---

## Identity

[object Object]

## Expertise Areas

- Community vision and mission
- Community-market fit
- Community positioning
- Culture and values design
- Governance frameworks
- Community roadmapping
- Member journey mapping
- Community business models

## Patterns

### Community-Market Fit Canvas
Framework for validating community need before building
```
## Community-Market Fit Canvas

### 1. Member Definition
| Question | Answer |
|----------|--------|
| Who are they? | [Specific persona] |
| What do they struggle with? | [Pain points] |
| Where do they currently gather? | [Existing communities] |
| Why would they leave/add yours? | [Unique value] |

### 2. Value Proposition
| For Members | For Business |
|-------------|--------------|
| Connection to peers | Customer insights |
| Access to knowledge | Reduced support costs |
| Career opportunities | Brand advocacy |
| Recognition/status | Product feedback loop |

### 3. Validation Signals
- 10 people actively asking for this
- Existing fragmented communities
- Clear pain point your community solves
- Members willing to contribute, not just consume

### 4. Red Flags (Don't Build)
- "We should have a community" without clear why
- No existing audience to seed from
- Purely extractive business goals
- No budget for community team

```

### Culture Architecture
Designing intentional community culture
```
## Culture Design Framework

### Core Elements

**1. Values (What We Believe)**
- 3-5 core values, specific not generic
- Bad: "We value respect" (everyone says this)
- Good: "We celebrate failed experiments publicly"

**2. Norms (How We Behave)**
| Value | Norm | Anti-Norm |
|-------|------|-----------|
| Radical honesty | Share failures openly | Humble-bragging |
| Builder mindset | Show work-in-progress | Only polished content |
| Generosity | Answer before asking | Lurking indefinitely |

**3. Rituals (What We Do Together)**
- Daily: GM threads, standup posts
- Weekly: Office hours, wins celebration
- Monthly: AMAs, retrospectives
- Annually: Community awards, meetups

**4. Symbols (What Identifies Us)**
- Language/slang unique to community
- Visual identity and memes
- Credentials and roles
- Origin story and lore

```

### Member Journey Mapping
Designing the path from stranger to advocate
```
## Member Journey Stages

```
STRANGER → VISITOR → MEMBER → CONTRIBUTOR → ADVOCATE → LEADER
```

### Stage Definitions

| Stage | Behavior | Goal | Metric |
|-------|----------|------|--------|
| Stranger | Unaware of community | Awareness | Reach |
| Visitor | Lurking, reading | First value | Time to first value |
| Member | Introduced self, engaged once | Regular participation | DAU/MAU |
| Contributor | Creates content, helps others | Consistent contribution | Posts/week |
| Advocate | Invites others, defends community | Referrals | Invite rate |
| Leader | Moderates, leads initiatives | Ownership | Programs led |

### Transition Triggers

| Transition | Trigger |
|------------|---------|
| Stranger → Visitor | Content discovery, referral |
| Visitor → Member | Welcome flow, first reply received |
| Member → Contributor | Recognition, asked for help |
| Contributor → Advocate | Exclusive access, deeper relationships |
| Advocate → Leader | Formal role, training program |

```

### Governance Evolution
Governance models for different community stages
```
## Governance By Stage

### Stage 1: Founder-Led (0-100 members)
- Founder makes all decisions
- Direct relationships with most members
- Culture set by example
- Fast, informal, personal

### Stage 2: Core Team (100-1K members)
- Small trusted team helps govern
- Written guidelines emerge
- Mod team established
- Regular community input sessions

### Stage 3: Representative (1K-10K members)
- Community councils or guilds
- Formal feedback mechanisms
- Elected/appointed representatives
- Transparent decision logging

### Stage 4: Distributed (10K+ members)
- Sub-communities with autonomy
- Governance frameworks documented
- Appeals and escalation paths
- Potential token/voting systems

### Governance Principles
1. Start simple, add complexity only when needed
2. Document decisions, not just rules
3. Make the implicit explicit
4. Create paths for members to gain governance power

```


## Anti-Patterns

### Build It And They Will Come
Launching community without existing audience
**Why it's bad:** Empty communities feel dead and repel new members.
No seed audience means no initial activity.
Chicken-and-egg problem is very hard to solve.


### Copy-Paste Culture
Adopting another community's culture wholesale
**Why it's bad:** Culture must be authentic to your context.
What works for one community may poison another.
Members detect inauthenticity quickly.


### Metrics Over Meaning
Optimizing for numbers instead of value
**Why it's bad:** Vanity metrics don't reflect community health.
Growth hacking tactics attract wrong members.
Short-term gains, long-term culture damage.


### Democracy From Day One
Giving governance power before community is ready
**Why it's bad:** New communities need direction and speed.
Premature democracy leads to bikeshedding.
Members don't have context to make good decisions.



## Sharp Edges (Gotchas)

*Real production issues that cause outages and bugs.*

*Sharp edges documented in full version.*

## Collaboration

### When to Hand Off

| Trigger | Delegate To | Context |
|---------|-------------|--------|
| `discord|server setup|channels` | discord-mastery | Platform-specific implementation |
| `telegram|group|channel` | telegram-mastery | Telegram implementation |
| `twitter|reddit|social` | social-community | Social platform community |
| `moderation|daily ops|running` | community-operations | Operational execution |
| `growth|acquisition|engagement` | community-growth | Growth implementation |
| `metrics|analytics|measure` | community-analytics | Measurement setup |
| `ambassador|advocate|champion` | ambassador-programs | Ambassador program design |
| `devrel|developer|open source` | developer-community | Developer community specifics |

### Receives Work From

- **product-strategy**: Aligning community with product goals
- **brand-positioning**: Brand alignment for community

### Works Well With

- community-operations
- community-growth
- community-analytics
- ambassador-programs

---

## Get the Full Version

This skill has **automated validations**, **detection patterns**, and **structured handoff triggers** that work with the Spawner orchestrator.

```bash
npx vibeship-spawner-skills install
```

Full skill path: `~/.spawner/skills/community/community-strategy/`

**Includes:**
- `skill.yaml` - Structured skill definition
- `sharp-edges.yaml` - Machine-parseable gotchas with detection patterns
- `validations.yaml` - Automated code checks
- `collaboration.yaml` - Handoff triggers for skill orchestration

---

*Generated by [VibeShip Spawner](https://github.com/vibeforge1111/vibeship-spawner-skills)*
