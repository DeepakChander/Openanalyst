# Browser Extension Builder

> Expert in building browser extensions that solve real problems - Chrome, Firefox,
and cross-browser extensions. Covers extension architecture, manifest v3, content
scripts, popup UIs, monetization strategies, and Chrome Web Store publishing.


**Category:** maker | **Version:** 1.0.0

---

## Identity

[object Object]

## Expertise Areas

- Extension architecture
- Manifest v3 (MV3)
- Content scripts
- Background workers
- Popup interfaces
- Extension monetization
- Chrome Web Store publishing
- Cross-browser support

## Patterns

### Extension Architecture
Structure for modern browser extensions
```
## Extension Architecture

### Project Structure
```
extension/
├── manifest.json      # Extension config
├── popup/
│   ├── popup.html     # Popup UI
│   ├── popup.css
│   └── popup.js
├── content/
│   └── content.js     # Runs on web pages
├── background/
│   └── service-worker.js  # Background logic
├── options/
│   ├── options.html   # Settings page
│   └── options.js
└── icons/
    ├── icon16.png
    ├── icon48.png
    └── icon128.png
```

### Manifest V3 Template
```json
{
  "manifest_version": 3,
  "name": "My Extension",
  "version": "1.0.0",
  "description": "What it does",
  "permissions": ["storage", "activeTab"],
  "action": {
    "default_popup": "popup/popup.html",
    "default_icon": {
      "16": "icons/icon16.png",
      "48": "icons/icon48.png",
      "128": "icons/icon128.png"
    }
  },
  "content_scripts": [{
    "matches": ["<all_urls>"],
    "js": ["content/content.js"]
  }],
  "background": {
    "service_worker": "background/service-worker.js"
  },
  "options_page": "options/options.html"
}
```

### Communication Pattern
```
Popup ←→ Background (Service Worker) ←→ Content Script
              ↓
        chrome.storage
```

```

### Content Scripts
Code that runs on web pages
```
## Content Scripts

### Basic Content Script
```javascript
// content.js - Runs on every matched page

// Wait for page to load
document.addEventListener('DOMContentLoaded', () => {
  // Modify the page
  const element = document.querySelector('.target');
  if (element) {
    element.style.backgroundColor = 'yellow';
  }
});

// Listen for messages from popup/background
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'getData') {
    const data = document.querySelector('.data')?.textContent;
    sendResponse({ data });
  }
  return true; // Keep channel open for async
});
```

### Injecting UI
```javascript
// Create floating UI on page
function injectUI() {
  const container = document.createElement('div');
  container.id = 'my-extension-ui';
  container.innerHTML = `
    <div style="position: fixed; bottom: 20px; right: 20px;
                background: white; padding: 16px; border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15); z-index: 10000;">
      <h3>My Extension</h3>
      <button id="my-extension-btn">Click me</button>
    </div>
  `;
  document.body.appendChild(container);

  document.getElementById('my-extension-btn').addEventListener('click', () => {
    // Handle click
  });
}

injectUI();
```

### Permissions for Content Scripts
```json
{
  "content_scripts": [{
    "matches": ["https://specific-site.com/*"],
    "js": ["content.js"],
    "run_at": "document_end"
  }]
}
```

```

### Storage and State
Persisting extension data
```
## Storage and State

### Chrome Storage API
```javascript
// Save data
chrome.storage.local.set({ key: 'value' }, () => {
  console.log('Saved');
});

// Get data
chrome.storage.local.get(['key'], (result) => {
  console.log(result.key);
});

// Sync storage (syncs across devices)
chrome.storage.sync.set({ setting: true });

// Watch for changes
chrome.storage.onChanged.addListener((changes, area) => {
  if (changes.key) {
    console.log('key changed:', changes.key.newValue);
  }
});
```

### Storage Limits
| Type | Limit |
|------|-------|
| local | 5MB |
| sync | 100KB total, 8KB per item |

### Async/Await Pattern
```javascript
// Modern async wrapper
async function getStorage(keys) {
  return new Promise((resolve) => {
    chrome.storage.local.get(keys, resolve);
  });
}

async function setStorage(data) {
  return new Promise((resolve) => {
    chrome.storage.local.set(data, resolve);
  });
}

// Usage
const { settings } = await getStorage(['settings']);
await setStorage({ settings: { ...settings, theme: 'dark' } });
```

```

### Extension Monetization
Making money from extensions
```
## Extension Monetization

### Revenue Models
| Model | How It Works |
|-------|--------------|
| Freemium | Free basic, paid features |
| One-time | Pay once, use forever |
| Subscription | Monthly/yearly access |
| Donations | Tip jar / Buy me a coffee |
| Affiliate | Recommend products |

### Payment Integration
```javascript
// Use your backend for payments
// Extension can't directly use Stripe

// 1. User clicks "Upgrade" in popup
// 2. Open your website with user ID
chrome.tabs.create({
  url: `https://your-site.com/upgrade?user=${userId}`
});

// 3. After payment, sync status
async function checkPremium() {
  const { userId } = await getStorage(['userId']);
  const response = await fetch(
    `https://your-api.com/premium/${userId}`
  );
  const { isPremium } = await response.json();
  await setStorage({ isPremium });
  return isPremium;
}
```

### Feature Gating
```javascript
async function usePremiumFeature() {
  const { isPremium } = await getStorage(['isPremium']);
  if (!isPremium) {
    showUpgradeModal();
    return;
  }
  // Run premium feature
}
```

### Chrome Web Store Payments
- Chrome discontinued built-in payments
- Use your own payment system
- Link to external checkout page

```


## Anti-Patterns

### Requesting All Permissions
Asking for permissions you don't need
**Why it's bad:** Users won't install.
Store may reject.
Security risk.
Bad reviews.


### Heavy Background Processing
Service worker doing too much
**Why it's bad:** MV3 terminates idle workers.
Battery drain.
Browser slows down.
Users uninstall.


### Breaking on Updates
Extension breaks when sites update
**Why it's bad:** Selectors change.
APIs change.
Angry users.
Bad reviews.



## Sharp Edges (Gotchas)

*Real production issues that cause outages and bugs.*

*Sharp edges documented in full version.*

## Collaboration

### When to Hand Off

| Trigger | Delegate To | Context |
|---------|-------------|--------|
| `react|vue|svelte` | frontend | Extension popup framework |
| `monetization|payment|subscription` | micro-saas-launcher | Extension business model |
| `personal tool|just for me` | personal-tool-builder | Personal extension |
| `AI|LLM|GPT` | ai-wrapper-product | AI-powered extension |

### Receives Work From

- **frontend**: Extension UI development
- **micro-saas-launcher**: Extension as SaaS

### Works Well With

- frontend
- micro-saas-launcher
- personal-tool-builder

---

## Get the Full Version

This skill has **automated validations**, **detection patterns**, and **structured handoff triggers** that work with the Spawner orchestrator.

```bash
npx vibeship-spawner-skills install
```

Full skill path: `~/.spawner/skills/maker/browser-extension-builder/`

**Includes:**
- `skill.yaml` - Structured skill definition
- `sharp-edges.yaml` - Machine-parseable gotchas with detection patterns
- `validations.yaml` - Automated code checks
- `collaboration.yaml` - Handoff triggers for skill orchestration

---

*Generated by [VibeShip Spawner](https://github.com/vibeforge1111/vibeship-spawner-skills)*
