# Game Monetization & Economy Design

> 

**Category:** game-dev | **Version:** 1.0.0

**Tags:** monetization, f2p, free-to-play, iap, in-app-purchase, battle-pass, season-pass, gacha, loot-box, virtual-economy, game-economy, ltv, arpu, retention, whales, pricing, microtransactions

---

## Identity

[object Object]

## Expertise Areas

- game economy design
- virtual currency systems
- IAP implementation
- battle pass mechanics
- monetization analytics
- pricing strategy for games
- loot box probability
- player spending segmentation

## Patterns


## Anti-Patterns

### Pay-to-Win Mechanics
NEVER sell gameplay advantages that cannot be earned through play.
This destroys competitive integrity and community trust.


### Uncapped Gacha Spending
Never allow unlimited spending on gacha without pity systems.
Players spending $1000+ without guaranteed reward creates legal and PR risk.


### Hidden Currency Conversion
Never obscure real money costs through complex currency conversions.
Players should always understand what they're spending.


### Aggressive Monetization Popups
Never interrupt gameplay with purchase prompts.
Players buy when they want to, not when forced.


### Economy Hyperinflation
Never increase currency rewards without proportional sinks.
Inflation devalues purchases and breaks progression.



## Sharp Edges (Gotchas)

*Real production issues that cause outages and bugs.*

### [CRITICAL] undefined

**Solution:**
```
1. Geo-gate loot box features by region
2. Offer direct purchase alternatives in regulated markets
3. Always disclose probabilities globally
4. Consult legal counsel before launching gacha systems

```javascript
// Region-aware gacha system
const gachaAvailability = {
  BE: { available: false, alternative: 'direct_purchase' },
  NL: { available: false, alternative: 'direct_purchase' },
  JP: { available: true, restrictions: ['no_kompu_gacha'] },
  CN: { available: true, restrictions: ['show_rates', 'spending_limits'] },
  US: { available: true, restrictions: [] },
  DEFAULT: { available: true, restrictions: ['show_rates'] }
};

function canShowGacha(region) {
  const config = gachaAvailability[region] || gachaAvailability.DEFAULT;
  return config.available;
}
```

```

**Symptoms:**
- App rejected in Belgium/Netherlands
- Legal notice from gaming authority
- Store removal threat
- Refund demands citing gambling laws

---

### [CRITICAL] undefined

**Solution:**
```
1. Implement age gate if content appeals to children
2. Require parental consent for IAP in kids' games
3. Use platform parental controls (Ask to Buy on iOS)
4. Keep detailed records of consent mechanisms

```javascript
// Age-appropriate purchase flow
async function initiatePurchase(playerId, itemId) {
  const player = await getPlayer(playerId);

  if (player.age < 13 || player.ageUnverified) {
    // Require parental gate
    const parentApproved = await requestParentalConsent(playerId, {
      item: itemId,
      price: getPrice(itemId),
      method: 'PIN_OR_EMAIL'
    });

    if (!parentApproved) {
      return { blocked: true, reason: 'PARENTAL_CONSENT_REQUIRED' };
    }
  }

  return processPurchase(playerId, itemId);
}
```

```

**Symptoms:**
- FTC inquiry letter
- Parental complaint about unauthorized purchase
- Store age-rating mismatch with content

---

### [CRITICAL] undefined

**Solution:**
```
1. Implement spending limits and cooldowns
2. Send purchase confirmation emails
3. Make refund process easy (reduces chargebacks)
4. Monitor chargeback rate daily

```javascript
// Proactive chargeback prevention
class ChargebackPrevention {
  async onPurchase(purchase) {
    // 1. Send confirmation email immediately
    await sendConfirmationEmail(purchase.playerId, purchase);

    // 2. Check for unusual patterns
    const riskScore = await this.calculateRiskScore(purchase);
    if (riskScore > 0.7) {
      await this.flagForReview(purchase);
      await this.sendReceiptReminder(purchase, '24h');
    }

    // 3. Track for early warning
    await this.updateChargebackMetrics();
    const rate = await this.getChargebackRate('30d');
    if (rate > 0.005) { // 0.5% warning threshold
      await this.alertTeam('CHARGEBACK_WARNING', { rate });
    }
  }

  async handleRefundRequest(playerId, purchaseId, reason) {
    // Make refunds easy - it's cheaper than chargebacks
    const purchase = await getPurchase(purchaseId);

    if (purchase.age < 48 * 60 * 60 * 1000) { // Within 48 hours
      await this.processRefund(purchase);
      return { refunded: true };
    }

    // Older purchases: offer in-game compensation instead
    return { offer: 'IN_GAME_CREDIT', value: purchase.amount * 1.2 };
  }
}
```

```

**Symptoms:**
- Chargeback rate exceeding 0.5%
- Warning letter from payment processor
- Spike in 'unauthorized purchase' disputes
- App store threatening removal

---

### [HIGH] undefined

**Solution:**
```
1. Model economy before launch with spreadsheets
2. Implement proportional sinks that scale with rewards
3. Use currency tiers (bronze/silver/gold) for segmentation
4. Monitor currency velocity weekly

```javascript
// Economy health monitoring
class EconomyMonitor {
  async dailyHealthCheck() {
    const metrics = {
      currencyInCirculation: await this.getTotalCurrency(),
      currencyVelocity: await this.getVelocity('24h'),
      sourceBreakdown: await this.getSourceBreakdown('24h'),
      sinkBreakdown: await this.getSinkBreakdown('24h'),
      netFlow: await this.getNetFlow('24h')
    };

    // Alert on inflation
    if (metrics.netFlow > metrics.currencyInCirculation * 0.01) {
      await this.alert('INFLATION_WARNING', {
        message: 'Net positive flow exceeds 1% of circulation',
        metrics
      });
    }

    // Alert on deflation (also bad - players feel stuck)
    if (metrics.netFlow < -metrics.currencyInCirculation * 0.005) {
      await this.alert('DEFLATION_WARNING', {
        message: 'Economy contracting - players may feel progression blocked',
        metrics
      });
    }

    return metrics;
  }
}
```

```

**Symptoms:**
- Veteran players complaining about 'wasted money'
- New players catching up too quickly
- Currency rewards per hour increasing over time
- Items that used to be premium now feel cheap

---

### [HIGH] undefined

**Solution:**
```
1. NEVER sell power that can't be earned
2. If selling time-savers, ensure time investment is reasonable
3. Keep competitive modes completely F2P
4. Get community feedback before launching new monetization

```javascript
// P2W prevention checklist
const monetizationReview = {
  item: 'New Sword',
  stats: { damage: 150, critChance: 0.15 },

  checks: {
    canBeEarned: true, // REQUIRED
    earnTime: '20 hours', // Must be reasonable
    earnMethod: 'Raid boss drop',

    competitiveImpact: 'low', // Must be low or none
    alternatives: ['Craftable Sword (same stats)'],

    communityReaction: null // Poll before launch!
  },

  approved: function() {
    return this.checks.canBeEarned &&
           this.checks.competitiveImpact !== 'high' &&
           this.checks.alternatives.length > 0;
  }
};
```

```

**Symptoms:**
- Steam reviews mentioning 'pay to win' or 'P2W'
- Reddit posts calculating 'dollars per power'
- Competitive players quitting
- Streamers refusing to cover the game

---

### [HIGH] undefined

**Solution:**
```
1. Offer exceptional value starter packs ($0.99-$4.99)
2. Make first purchase risk-free (no regret)
3. Remove all friction from first purchase flow
4. Track first purchase conversion as key metric

```javascript
// First purchase optimization
const starterPack = {
  price: 0.99,
  value: 10.00, // 10x value for first purchase

  contents: {
    premiumCurrency: 500, // Worth $4.99 alone
    exclusiveCosmetic: 'Founder Badge', // Can't get elsewhere
    boosts: ['7-day VIP', '2x XP 24h'],
    resources: { gold: 10000, energy: 100 }
  },

  restrictions: {
    onePerAccount: true,
    availableUntil: 'day 7', // Creates urgency
    displayPrompt: 'after_tutorial'
  },

  // Track meticulously
  analytics: {
    shown: 'starter_pack_shown',
    dismissed: 'starter_pack_dismissed',
    purchased: 'first_purchase',
    timeToConvert: 'first_purchase_days'
  }
};
```

```

**Symptoms:**
- Low conversion rate (<2%)
- High ARPPU but low paying user %
- Starter packs not selling
- Players buying only during sales

---

### [HIGH] undefined

**Solution:**
```
1. Always calculate net revenue (after fees)
2. Consider minimum purchase thresholds
3. Factor fees into LTV calculations
4. Evaluate alternative distribution channels

```javascript
// Revenue calculation with platform fees
const platformFees = {
  ios: {
    standard: 0.30,
    smallBusiness: 0.15, // Under $1M/year
    subscription: 0.15   // After year 1
  },
  android: {
    standard: 0.30,
    smallBusiness: 0.15
  },
  steam: {
    tier1: 0.30,         // Under $10M
    tier2: 0.25,         // $10M-$50M
    tier3: 0.20          // Over $50M
  },
  payment: 0.029 + 0.30  // Stripe: 2.9% + $0.30
};

function calculateNetRevenue(grossRevenue, platform, isSmallBusiness = true) {
  const feeRate = isSmallBusiness ?
    platformFees[platform].smallBusiness :
    platformFees[platform].standard;

  return grossRevenue * (1 - feeRate);
}

// Example: $0.99 purchase on iOS (small business)
// Net = $0.99 * 0.85 = $0.84
// If item cost $0.50 to create: $0.34 profit

// Example: $0.99 purchase on iOS (standard)
// Net = $0.99 * 0.70 = $0.69
// If item cost $0.50 to create: $0.19 profit (45% less!)
```

```

**Symptoms:**
- Actual revenue 30%+ below projections
- Negative unit economics on small purchases
- Confusion about net vs gross revenue

---

### [MEDIUM] undefined

**Solution:**
```
1. Implement PPP (Purchasing Power Parity) pricing
2. Use platform's regional pricing tools
3. Price to local market standards, not USD conversion
4. Monitor for VPN arbitrage

```javascript
// Regional pricing matrix (example)
const regionalPricing = {
  // Developed markets - full price
  US: { multiplier: 1.0, currency: 'USD' },
  GB: { multiplier: 1.0, currency: 'GBP' },
  DE: { multiplier: 1.0, currency: 'EUR' },
  JP: { multiplier: 1.0, currency: 'JPY' },

  // Emerging markets - adjusted for PPP
  BR: { multiplier: 0.4, currency: 'BRL' },  // 60% discount
  IN: { multiplier: 0.3, currency: 'INR' },  // 70% discount
  TR: { multiplier: 0.35, currency: 'TRY' }, // 65% discount
  RU: { multiplier: 0.4, currency: 'RUB' },  // 60% discount
  MX: { multiplier: 0.5, currency: 'MXN' },  // 50% discount

  // Arbitrage prevention
  antiArbitrage: {
    vpnDetection: true,
    purchaseLimits: { perDay: 3, perWeek: 10 },
    tradingRestrictions: true // Can't gift to other regions
  }
};

function getPrice(baseUSD, region) {
  const config = regionalPricing[region] || regionalPricing.US;
  return {
    amount: baseUSD * config.multiplier,
    currency: config.currency,
    displayPrice: formatCurrency(baseUSD * config.multiplier, config.currency)
  };
}
```

```

**Symptoms:**
- Low conversion in Brazil, India, Turkey, etc.
- High usage but zero revenue from emerging markets
- Players requesting regional pricing

---

### [MEDIUM] undefined

**Solution:**
```
1. If it's limited, make it actually limited
2. If it returns, say "seasonal" not "limited"
3. Use countdown timers only for real deadlines
4. Be transparent about rotation schedules

```javascript
// Honest scarcity implementation
const offerTypes = {
  truly_limited: {
    example: 'Founder Pack',
    behavior: 'Never returns',
    messaging: 'Exclusive to early supporters - will never be sold again',
    implementation: {
      endDate: '2024-03-31',
      returns: false,
      quantityLimit: null
    }
  },

  seasonal: {
    example: 'Winter Skin Bundle',
    behavior: 'Returns annually',
    messaging: 'Available during Winter Event (returns yearly)',
    implementation: {
      availability: 'WINTER_EVENT',
      returns: true,
      returnSchedule: 'annual'
    }
  },

  rotating: {
    example: 'Daily Deal',
    behavior: 'Rotates through catalog',
    messaging: 'Today\'s Deal - new selection tomorrow',
    implementation: {
      rotation: 'daily',
      returns: true,
      returnSchedule: 'every 30-60 days'
    }
  }
};

// NEVER: "Only 3 left!" (when it's actually unlimited)
// NEVER: "Limited time!" (when it returns next month)
```

```

**Symptoms:**
- Reddit posts exposing 'fake limited' items
- Players cynically ignoring all limited offers
- Trust metrics declining
- Conversion dropping on legitimate limited offers

---

### [MEDIUM] undefined

**Solution:**
```
1. Implement spending notifications at thresholds
2. Show lifetime spend in purchase flow
3. Offer "take a break" features
4. Cap gacha pity to prevent infinite chase

```javascript
// Ethical spending awareness
class SpendingAwareness {
  async prePurchaseCheck(playerId, purchaseAmount) {
    const lifetime = await this.getLifetimeSpend(playerId);
    const session = await this.getSessionSpend(playerId);
    const today = await this.getTodaySpend(playerId);

    const warnings = [];

    // Lifetime threshold warnings
    if (lifetime + purchaseAmount > 100 && lifetime < 100) {
      warnings.push({
        type: 'MILESTONE',
        message: 'This purchase will bring your total to over $100'
      });
    }

    // Session warning
    if (session > 50) {
      warnings.push({
        type: 'SESSION',
        message: `You've spent $${session} this session. Take a moment to consider.`
      });
    }

    // Cooling off suggestion
    if (today > 30) {
      warnings.push({
        type: 'COOLDOWN_SUGGESTION',
        message: 'Consider taking a break before this purchase'
      });
    }

    return {
      proceed: true,
      warnings,
      showWarnings: warnings.length > 0,
      requireConfirmation: warnings.length > 1
    };
  }
}
```

```

**Symptoms:**
- High refund rate on large purchases
- Players expressing regret in reviews
- Spending concentrated in small percentage of players
- Whales churning after large spending sprees

---

## Collaboration

### Receives Work From

- **game-design**: 
- **mobile-game-dev**: 
- **analytics**: 
- **backend**: 
- **ui-design**: 

---

## Get the Full Version

This skill has **automated validations**, **detection patterns**, and **structured handoff triggers** that work with the Spawner orchestrator.

```bash
npx vibeship-spawner-skills install
```

Full skill path: `~/.spawner/skills/game-dev/game-monetization/`

**Includes:**
- `skill.yaml` - Structured skill definition
- `sharp-edges.yaml` - Machine-parseable gotchas with detection patterns
- `validations.yaml` - Automated code checks
- `collaboration.yaml` - Handoff triggers for skill orchestration

---

*Generated by [VibeShip Spawner](https://github.com/vibeforge1111/vibeship-spawner-skills)*
