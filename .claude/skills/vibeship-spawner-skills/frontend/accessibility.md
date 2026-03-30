# Accessibility (a11y)

> Accessibility isn't a feature - it's a fundamental quality of good software.
1 in 4 adults has a disability. Many more have temporary impairments or
situational limitations. Your users include people who can't see, can't hear,
can't use a mouse, or can't process information the way you do.

This skill covers WCAG guidelines, ARIA patterns, keyboard navigation,
screen reader compatibility, and automated testing. Key insight: accessible
code is better code. The constraints of accessibility lead to simpler,
more semantic, more maintainable implementations.

2025 lesson: Accessibility lawsuits are at an all-time high. "We'll add it
later" is both ethically wrong and legally risky. Start accessible, stay
accessible.


**Category:** frontend | **Version:** 1.0.0

**Tags:** accessibility, a11y, wcag, aria, screen-reader, keyboard, inclusive, semantic-html

---

## Identity

You're a developer who understands that accessibility is not optional. You've
seen teams scramble to retrofit accessibility after lawsuits, watched users
struggle with inaccessible interfaces, and learned that building accessible
from the start is always cheaper than fixing it later.

Your hard-won lessons: The team that uses semantic HTML ships accessible code
by default. The team that uses divs for everything spends months adding ARIA.
You've debugged screen reader issues at 2 AM, fought with focus traps, and
learned that if you can't tab to it, real users can't use it.

You push for keyboard testing during development, not after. You know that
automated tools catch 30% at best - real testing with NVDA and VoiceOver is
non-negotiable.


## Expertise Areas

- accessibility
- wcag
- aria
- keyboard-navigation
- screen-readers
- focus-management
- color-contrast
- semantic-html
- skip-links

## Patterns

### Semantic HTML First
Use native HTML elements before reaching for ARIA
**When:** Building any interactive component

### Accessible Modal/Dialog
Focus-trapped modal with proper ARIA and keyboard handling
**When:** Building modal dialogs, popups, or overlays

### Skip Navigation Link
Allow keyboard users to skip repetitive navigation
**When:** Pages with navigation before main content

### Accessible Forms
Form fields with proper labels and error handling
**When:** Building any form

### Live Regions for Dynamic Content
Announce dynamic changes to screen reader users
**When:** Content updates without page reload (notifications, loading states)

### Color Contrast and Visual Design
Ensure content is perceivable regardless of visual ability
**When:** Designing and styling any interface


## Anti-Patterns

### Div Button
Using div or span as clickable elements instead of button
**Instead:** <button type="button" onclick="doAction()">Click me</button>

If you need a link that looks like a button:
<a href="/page" class="button">Go to page</a>


### Mouse-Only Interactions
Features that only work with hover or click
**Instead:** Make all interactions work with:
- Mouse (click, hover)
- Keyboard (Enter, Space, Tab)
- Touch (tap)

Tooltips should be focusable:
<button aria-describedby="tooltip">
  Info
</button>
<div role="tooltip" id="tooltip">
  Additional information
</div>


### Removing Focus Outline
Using outline:none without replacement
**Instead:** /* Provide custom focus styles */
:focus-visible {
  outline: 2px solid #2563eb;
  outline-offset: 2px;
  border-radius: 2px;
}


### Auto-Playing Media
Audio or video that plays automatically
**Instead:** <video controls>...</video>

If autoplay is required (muted background):
<video autoplay muted playsinline>
  <track kind="captions" src="..." />
</video>
<button onclick="toggleAudio()">Enable sound</button>


### ARIA First
Adding ARIA to fix non-semantic HTML
**Instead:** <!-- WRONG: ARIA bandaid -->
<div role="navigation" aria-label="Main">
  <div role="list">
    <div role="listitem"><a href="/">Home</a></div>
  </div>
</div>

<!-- RIGHT: Semantic HTML -->
<nav aria-label="Main">
  <ul>
    <li><a href="/">Home</a></li>
  </ul>
</nav>



## Sharp Edges (Gotchas)

*Real production issues that cause outages and bugs.*

### [CRITICAL] Missing or incorrect alt text makes images invisible to screen readers

**Situation:** You add images without alt text, or write alt text that describes the
image file ("photo123.jpg") instead of its meaning or purpose.


**Why it happens:**
Screen readers announce "image" with no context, or worse, read the
filename. Blind users have no idea what the image conveys. For informative
images, this is like having a blank spot in your content.


**Solution:**
```
# ALT TEXT GUIDE

<!-- Informative image - describe the content/purpose -->
<img src="chart.png" alt="Sales increased 40% from Q1 to Q4 2024" />

<!-- Functional image (links/buttons) - describe the action -->
<a href="/search">
  <img src="search-icon.png" alt="Search" />
</a>

<!-- Decorative image - empty alt to skip -->
<img src="decorative-swirl.png" alt="" />

<!-- Complex image - use longer description -->
<figure>
  <img src="org-chart.png" alt="Organization chart showing CEO at top" />
  <figcaption>
    Full organization structure with 5 departments
    reporting to the CEO...
  </figcaption>
</figure>

<!-- Image with text in it - include that text -->
<img src="sale-banner.png" alt="Summer Sale: 50% off all items" />

# Good alt text:
- Conveys the same information as the image
- Is concise (usually under 125 characters)
- Doesn't start with "Image of" or "Picture of"
- Includes text shown in the image

```

**Symptoms:**
- Screen reader says "image" or reads filename
- Automated tools flag missing alt
- Context lost without images

---

### [HIGH] Positive tabindex creates unpredictable focus order

**Situation:** You use tabindex="1", tabindex="2", etc. to "fix" the tab order,
but this creates a confusing, unpredictable experience.


**Why it happens:**
Positive tabindex jumps elements to the front of the tab order. If you
have tabindex="2" somewhere, keyboard users hit it before all the
natural tabindex="0" elements. The focus jumps around illogically.


**Solution:**
```
# TABINDEX VALUES

<!-- WRONG: Positive tabindex -->
<input tabindex="3" />  <!-- Focused third -->
<input tabindex="1" />  <!-- Focused first -->
<input tabindex="2" />  <!-- Focused second -->

<!-- RIGHT: Use document order -->
<input />  <!-- First -->
<input />  <!-- Second -->
<input />  <!-- Third -->

<!-- tabindex="0" - add to tab order (for non-focusable elements) -->
<div tabindex="0" role="button">Custom button</div>

<!-- tabindex="-1" - programmatically focusable only -->
<div tabindex="-1" id="modal">
  <!-- Can call .focus() but not in tab order -->
</div>

# If you need different order, change the DOM order
# Use CSS for visual positioning

```

**Symptoms:**
- Focus jumps unexpectedly
- Users get lost in tab order
- Automated tools flag positive tabindex

---

### [CRITICAL] Click handlers without keyboard equivalents

**Situation:** You add onClick handlers to divs, spans, or other non-interactive
elements without adding keyboard support.


**Why it happens:**
Keyboard users can't activate these elements. Screen reader users
can't interact with them. About 20% of users rely on keyboard for
some or all navigation.


**Solution:**
```
# KEYBOARD EQUIVALENT

<!-- WRONG: Click only on div -->
<div onclick="openMenu()">Menu</div>

<!-- RIGHT: Use button -->
<button type="button" onclick="openMenu()">Menu</button>

<!-- If you must use a div (you usually don't) -->
<div
  role="button"
  tabindex="0"
  onclick="openMenu()"
  onkeydown="handleKeyDown(event)"
>
  Menu
</div>

function handleKeyDown(e) {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    openMenu();
  }
}

<!-- For links that act as buttons -->
<a href="#" onclick="doAction(); return false;">Action</a>
<!-- Better: -->
<button type="button" onclick="doAction()">Action</button>

```

**Symptoms:**
- Can't Tab to element
- Enter/Space does nothing
- Only works with mouse

---

### [HIGH] Modal or overlay traps focus with no escape

**Situation:** You create a focus trap for a modal, but there's no way to close
it with keyboard (no Escape key handler, no close button in trap).


**Why it happens:**
Keyboard users are stuck. They can't close the modal, can't Tab
out of it, can't do anything but refresh the page. This is a
complete blocker.


**Solution:**
```
# FOCUS TRAP WITH ESCAPE

<!-- Modal must have escape route -->
<div role="dialog" aria-modal="true">
  <!-- Close button INSIDE the trap -->
  <button onclick="closeModal()">Close</button>

  <!-- Content -->
</div>

// Always handle Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modalIsOpen) {
    closeModal();
  }
});

// Return focus when closing
let previousFocus;

function openModal() {
  previousFocus = document.activeElement;
  modal.hidden = false;
  modal.querySelector('button').focus();
}

function closeModal() {
  modal.hidden = true;
  previousFocus?.focus();
}

```

**Symptoms:**
- Can't escape modal with keyboard
- Tab key cycles endlessly
- User must refresh page

---

### [HIGH] Color is the only way to convey information

**Situation:** Error states, required fields, status indicators, or chart data
are communicated only through color.


**Why it happens:**
About 8% of men have some form of color blindness. Low vision users
may not perceive color differences. High contrast mode removes colors.
Printed pages may be grayscale.


**Solution:**
```
# COLOR + ADDITIONAL INDICATOR

<!-- WRONG: Color only for error -->
<input style="border-color: red" />
<span style="color: red">Invalid email</span>

<!-- RIGHT: Color + icon + text -->
<input aria-invalid="true" aria-describedby="error" />
<span id="error" class="error">
  <svg aria-hidden="true"><!-- Error icon --></svg>
  Error: Invalid email format
</span>

<!-- WRONG: Chart with color-only legend -->
<!-- Blue = Sales, Green = Profit -->

<!-- RIGHT: Color + pattern/label -->
<!-- Blue solid = Sales, Green dotted = Profit -->
<!-- Or direct labels on data points -->

<!-- Required fields -->
<!-- WRONG: Red asterisk only -->
<label>Email <span style="color: red">*</span></label>

<!-- RIGHT: Text explanation -->
<p class="required-note">* Required fields</p>
<label>Email <span aria-hidden="true">*</span>
  <span class="sr-only">(required)</span>
</label>

```

**Symptoms:**
- Color-blind users miss information
- Works on color screen, fails on print
- High contrast mode breaks meaning

---

### [MEDIUM] Page auto-refreshes or redirects without warning

**Situation:** Page automatically refreshes to show new content, or redirects
after a timeout, without user consent or control.


**Why it happens:**
Screen reader users might be in the middle of reading. Users with
cognitive disabilities may lose their place. Users with motor
impairments may not be able to interact quickly enough.


**Solution:**
```
# USER-CONTROLLED UPDATES

<!-- WRONG: Auto-refresh -->
<meta http-equiv="refresh" content="30" />

<!-- WRONG: Auto-redirect -->
setTimeout(() => window.location.href = '/new', 5000);

<!-- RIGHT: Offer choice -->
<div role="alert" aria-live="polite">
  New content available.
  <button onclick="refresh()">Refresh now</button>
</div>

<!-- RIGHT: Pause auto-updates -->
<button onclick="pauseUpdates()">Pause updates</button>

<!-- If redirect is required, make it long and interruptible -->
<div role="timer" aria-live="polite">
  Redirecting in <span id="countdown">30</span> seconds.
  <button onclick="cancelRedirect()">Stay on this page</button>
</div>

```

**Symptoms:**
- Content disappears while reading
- Focus lost on refresh
- Can't complete tasks in time

---

### [MEDIUM] Hidden content is still keyboard focusable

**Situation:** You hide content visually with CSS (opacity, position, clip) but
it's still in the DOM and receives keyboard focus.


**Why it happens:**
Keyboard users Tab to invisible elements and get lost. Screen
readers might read hidden content. Focus disappears visually.


**Solution:**
```
# PROPERLY HIDDEN CONTENT

<!-- WRONG: Visually hidden but focusable -->
<div style="opacity: 0; position: absolute; left: -9999px">
  <button>Hidden but focusable!</button>
</div>

<!-- RIGHT: Hidden from everyone -->
<div hidden>
  <button>Properly hidden</button>
</div>

<!-- Or with display: none -->
<div style="display: none;">
  <button>Properly hidden</button>
</div>

<!-- Or with visibility: hidden -->
<div style="visibility: hidden;">
  <button>Properly hidden</button>
</div>

<!-- For screen-reader-only text (visually hidden, announced) -->
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

<!-- Remove from tab order explicitly if needed -->
<button tabindex="-1" aria-hidden="true">Hidden button</button>

```

**Symptoms:**
- Focus disappears during tabbing
- Screen reader reads invisible content
- Tab order seems to "skip" elements

---

### [MEDIUM] Page or content sections missing language declaration

**Situation:** The HTML element lacks a lang attribute, or content in different
languages isn't marked with appropriate lang attributes.


**Why it happens:**
Screen readers use lang to switch pronunciation. Without it, English
screen readers try to read French text with English pronunciation.
Translation tools also rely on lang.


**Solution:**
```
# LANGUAGE DECLARATIONS

<!-- Page language -->
<html lang="en">

<!-- Content in different language -->
<p>The French word for hello is <span lang="fr">bonjour</span>.</p>

<!-- Quotes in other languages -->
<blockquote lang="es">
  "El conocimiento es poder"
</blockquote>

<!-- Navigation in multiple languages -->
<nav>
  <a href="/en" lang="en">English</a>
  <a href="/fr" lang="fr">Français</a>
  <a href="/es" lang="es">Español</a>
</nav>

# Common language codes:
en, en-US, en-GB, es, fr, de, zh, ja, ko, ar, he

```

**Symptoms:**
- Screen reader mispronounces foreign words
- Translation tools guess wrong
- Automated tools flag missing lang

---

## Collaboration

### When to Hand Off

| Trigger | Delegate To | Context |
|---------|-------------|--------|
| `user needs component implementation` | frontend | Accessible component patterns |
| `user needs styling system` | tailwind-ui | Accessible color and focus styles |
| `user needs automated testing setup` | testing | axe-core integration |
| `user needs legal compliance` | legal | WCAG compliance requirements |

### Works Well With

- frontend
- tailwind-ui
- testing

---

## Get the Full Version

This skill has **automated validations**, **detection patterns**, and **structured handoff triggers** that work with the Spawner orchestrator.

```bash
npx vibeship-spawner-skills install
```

Full skill path: `~/.spawner/skills/frontend/accessibility/`

**Includes:**
- `skill.yaml` - Structured skill definition
- `sharp-edges.yaml` - Machine-parseable gotchas with detection patterns
- `validations.yaml` - Automated code checks
- `collaboration.yaml` - Handoff triggers for skill orchestration

---

*Generated by [VibeShip Spawner](https://github.com/vibeforge1111/vibeship-spawner-skills)*
