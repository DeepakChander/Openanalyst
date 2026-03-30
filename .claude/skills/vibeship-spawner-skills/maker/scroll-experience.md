# Scroll Experience

> Expert in building immersive scroll-driven experiences - parallax storytelling,
scroll animations, interactive narratives, and cinematic web experiences. Like
NY Times interactives, Apple product pages, and award-winning web experiences.
Makes websites feel like experiences, not just pages.


**Category:** maker | **Version:** 1.0.0

---

## Identity

[object Object]

## Expertise Areas

- Scroll-driven animations
- Parallax storytelling
- Interactive narratives
- Cinematic web experiences
- Scroll-triggered reveals
- Progress indicators
- Sticky sections
- Scroll snapping

## Patterns

### Scroll Animation Stack
Tools and techniques for scroll animations
```
## Scroll Animation Stack

### Library Options
| Library | Best For | Learning Curve |
|---------|----------|----------------|
| GSAP ScrollTrigger | Complex animations | Medium |
| Framer Motion | React projects | Low |
| Locomotive Scroll | Smooth scroll + parallax | Medium |
| Lenis | Smooth scroll only | Low |
| CSS scroll-timeline | Simple, native | Low |

### GSAP ScrollTrigger Setup
```javascript
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Basic scroll animation
gsap.to('.element', {
  scrollTrigger: {
    trigger: '.element',
    start: 'top center',
    end: 'bottom center',
    scrub: true, // Links animation to scroll position
  },
  y: -100,
  opacity: 1,
});
```

### Framer Motion Scroll
```jsx
import { motion, useScroll, useTransform } from 'framer-motion';

function ParallaxSection() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -200]);

  return (
    <motion.div style={{ y }}>
      Content moves with scroll
    </motion.div>
  );
}
```

### CSS Native (2024+)
```css
@keyframes reveal {
  from { opacity: 0; transform: translateY(50px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-on-scroll {
  animation: reveal linear;
  animation-timeline: view();
  animation-range: entry 0% cover 40%;
}
```

```

### Parallax Storytelling
Tell stories through scroll depth
```
## Parallax Storytelling

### Layer Speeds
| Layer | Speed | Effect |
|-------|-------|--------|
| Background | 0.2x | Far away, slow |
| Midground | 0.5x | Middle depth |
| Foreground | 1.0x | Normal scroll |
| Content | 1.0x | Readable |
| Floating elements | 1.2x | Pop forward |

### Creating Depth
```javascript
// GSAP parallax layers
gsap.to('.background', {
  scrollTrigger: {
    scrub: true
  },
  y: '-20%', // Moves slower
});

gsap.to('.foreground', {
  scrollTrigger: {
    scrub: true
  },
  y: '-50%', // Moves faster
});
```

### Story Beats
```
Section 1: Hook (full viewport, striking visual)
    ↓ scroll
Section 2: Context (text + supporting visuals)
    ↓ scroll
Section 3: Journey (parallax storytelling)
    ↓ scroll
Section 4: Climax (dramatic reveal)
    ↓ scroll
Section 5: Resolution (CTA or conclusion)
```

### Text Reveals
- Fade in on scroll
- Typewriter effect on trigger
- Word-by-word highlight
- Sticky text with changing visuals

```

### Sticky Sections
Pin elements while scrolling through content
```
## Sticky Sections

### CSS Sticky
```css
.sticky-container {
  height: 300vh; /* Space for scrolling */
}

.sticky-element {
  position: sticky;
  top: 0;
  height: 100vh;
}
```

### GSAP Pin
```javascript
gsap.to('.content', {
  scrollTrigger: {
    trigger: '.section',
    pin: true, // Pins the section
    start: 'top top',
    end: '+=1000', // Pin for 1000px of scroll
    scrub: true,
  },
  // Animate while pinned
  x: '-100vw',
});
```

### Horizontal Scroll Section
```javascript
const sections = gsap.utils.toArray('.panel');

gsap.to(sections, {
  xPercent: -100 * (sections.length - 1),
  ease: 'none',
  scrollTrigger: {
    trigger: '.horizontal-container',
    pin: true,
    scrub: 1,
    end: () => '+=' + document.querySelector('.horizontal-container').offsetWidth,
  },
});
```

### Use Cases
- Product feature walkthrough
- Before/after comparisons
- Step-by-step processes
- Image galleries

```

### Performance Optimization
Keep scroll experiences smooth
```
## Performance Optimization

### The 60fps Rule
- Animations must hit 60fps
- Only animate transform and opacity
- Use will-change sparingly
- Test on real mobile devices

### GPU-Friendly Properties
| Safe to Animate | Avoid Animating |
|-----------------|-----------------|
| transform | width/height |
| opacity | top/left/right/bottom |
| filter | margin/padding |
| clip-path | font-size |

### Lazy Loading
```javascript
// Only animate when in viewport
ScrollTrigger.create({
  trigger: '.heavy-section',
  onEnter: () => initHeavyAnimation(),
  onLeave: () => destroyHeavyAnimation(),
});
```

### Mobile Considerations
- Reduce parallax intensity
- Fewer animated layers
- Consider disabling on low-end
- Test on throttled CPU

### Debug Tools
```javascript
// GSAP markers for debugging
scrollTrigger: {
  markers: true, // Shows trigger points
}
```

```


## Anti-Patterns

### Scroll Hijacking
Taking over natural scroll behavior
**Why it's bad:** Users hate losing scroll control.
Accessibility nightmare.
Breaks back button expectations.
Frustrating on mobile.


### Animation Overload
Everything animates on scroll
**Why it's bad:** Distracting, not delightful.
Performance tanks.
Content becomes secondary.
User fatigue.


### Desktop-Only Experience
Scroll effects that break on mobile
**Why it's bad:** Mobile is majority of traffic.
Touch scroll is different.
Performance issues on phones.
Unusable experience.



## Sharp Edges (Gotchas)

*Real production issues that cause outages and bugs.*

### [HIGH] Animations stutter during scroll

**Situation:** Scroll animations aren't smooth 60fps

**Why it happens:**
Animating wrong properties.
Too many elements animating.
Heavy JavaScript on scroll.
No GPU acceleration.


**Solution:**
```
## Fixing Scroll Jank

### Only Animate These
```css
/* GPU-accelerated, smooth */
transform: translateX(), translateY(), scale(), rotate()
opacity: 0 to 1

/* Triggers layout, causes jank */
width, height, top, left, margin, padding
```

### Force GPU Acceleration
```css
.animated-element {
  will-change: transform;
  transform: translateZ(0); /* Force GPU layer */
}
```

### Throttle Scroll Events
```javascript
// Don't do this
window.addEventListener('scroll', heavyFunction);

// Do this instead
let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      heavyFunction();
      ticking = false;
    });
    ticking = true;
  }
});

// Or use GSAP (handles this automatically)
```

### Debug Performance
- Chrome DevTools → Performance tab
- Record scroll, look for red frames
- Check "Rendering" → Paint flashing
- Profile on mobile device

```

**Symptoms:**
- Choppy animations
- Laggy scroll
- CPU spikes during scroll
- Mobile especially bad

---

### [HIGH] Parallax breaks on mobile devices

**Situation:** Parallax effects glitch on iOS/Android

**Why it happens:**
Mobile browsers handle scroll differently.
iOS momentum scrolling conflicts.
Transform during scroll is tricky.
Performance varies wildly.


**Solution:**
```
## Mobile-Safe Parallax

### Detection
```javascript
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
// Or better: check viewport width
const isMobile = window.innerWidth < 768;
```

### Reduce or Disable
```javascript
if (isMobile) {
  // Simpler animations
  gsap.to('.element', {
    scrollTrigger: { scrub: true },
    y: -50, // Less movement than desktop
  });
} else {
  // Full parallax
  gsap.to('.element', {
    scrollTrigger: { scrub: true },
    y: -200,
  });
}
```

### iOS-Specific Fix
```css
/* Helps with iOS scroll issues */
.scroll-container {
  -webkit-overflow-scrolling: touch;
}

.parallax-layer {
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
}
```

### Alternative: CSS Only
```css
/* Works better on mobile */
@supports (animation-timeline: scroll()) {
  .parallax {
    animation: parallax linear;
    animation-timeline: scroll();
  }
}
```

```

**Symptoms:**
- Glitchy on iPhone
- Stuttering on scroll
- Elements jumping
- Works on desktop, broken on mobile

---

### [MEDIUM] Scroll experience is inaccessible

**Situation:** Screen readers and keyboard users can't use the site

**Why it happens:**
Animations hide content.
Scroll hijacking breaks navigation.
No reduced motion support.
Focus management ignored.


**Solution:**
```
## Accessible Scroll Experiences

### Respect Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

```javascript
const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

if (!prefersReducedMotion) {
  initScrollAnimations();
}
```

### Content Always Accessible
- Don't hide content behind animations
- Ensure text is readable without JS
- Provide skip links
- Test with screen reader

### Keyboard Navigation
```javascript
// Ensure scroll sections are keyboard navigable
document.querySelectorAll('.scroll-section').forEach(section => {
  section.setAttribute('tabindex', '0');
});
```

```

**Symptoms:**
- Failed accessibility audit
- Can't navigate with keyboard
- Screen reader doesn't work
- Vestibular disorder complaints

---

### [MEDIUM] Critical content hidden below animations

**Situation:** Users have to scroll through animations to find content

**Why it happens:**
Prioritized experience over content.
Long scroll to reach info.
SEO suffering.
Mobile users bounce.


**Solution:**
```
## Content-First Scroll Design

### Above-the-Fold Content
- Key message visible immediately
- CTA visible without scroll
- Value proposition clear
- Skip animation option

### Progressive Enhancement
```
Level 1: Content readable without JS
Level 2: Basic styling and layout
Level 3: Scroll animations enhance
```

### SEO Considerations
- Text in DOM, not just in canvas
- Proper heading hierarchy
- Content not hidden by default
- Fast initial load

### Quick Exit Points
- Clear navigation always visible
- Skip to content links
- Don't trap users in experience

```

**Symptoms:**
- High bounce rate
- Low time on page (paradoxically)
- SEO ranking issues
- User complaints about finding info

---

## Collaboration

### When to Hand Off

| Trigger | Delegate To | Context |
|---------|-------------|--------|
| `3D|WebGL|three.js|spline` | 3d-web-experience | 3D elements in scroll experience |
| `react|vue|next|framework` | frontend | Frontend implementation |
| `performance|slow|optimize` | performance-hunter | Performance optimization |
| `design|mockup|visual` | ui-design | Visual design |

### Receives Work From

- **ui-design**: Visual design for scroll sections
- **landing-page-design**: Landing page with scroll experience

### Works Well With

- 3d-web-experience
- frontend
- ui-design
- landing-page-design

---

## Get the Full Version

This skill has **automated validations**, **detection patterns**, and **structured handoff triggers** that work with the Spawner orchestrator.

```bash
npx vibeship-spawner-skills install
```

Full skill path: `~/.spawner/skills/maker/scroll-experience/`

**Includes:**
- `skill.yaml` - Structured skill definition
- `sharp-edges.yaml` - Machine-parseable gotchas with detection patterns
- `validations.yaml` - Automated code checks
- `collaboration.yaml` - Handoff triggers for skill orchestration

---

*Generated by [VibeShip Spawner](https://github.com/vibeforge1111/vibeship-spawner-skills)*
