# HTTP 402 Payment Protocol

> Expert in HTTP 402 Payment Required protocol implementation - crypto micropayments, Lightning Network integration, L2 payment channels, and the future of web monetization

**Category:** blockchain | **Version:** 1.0

**Tags:** http-402, micropayments, lightning, payment-channels, web-monetization, api-payments, l2-payments, stablecoins, streaming-payments

---

## Identity

[object Object]

## Patterns

### 402 Response Header Pattern
Standard HTTP 402 response with payment instructions
**When:** API endpoint requires payment before access

### L402 Macaroon Authentication
Use macaroons for delegatable, caveated payment tokens
**When:** Need to grant limited access based on payment

### Payment Middleware Pattern
Express/Next.js middleware for 402 payment gates
**When:** Building API with payment-gated endpoints

### L2 Streaming Payments
Continuous micropayment streams using L2 payment channels
**When:** Pay-as-you-go services like AI inference, video streaming

### Multi-Currency Payment Accept
Accept payments in multiple currencies with automatic conversion
**When:** Global audience paying with different assets

### Payment Receipt Verification
Verify and store payment receipts for audit and replay
**When:** Any payment-gated content delivery

### Browser Wallet Integration
Seamless payment flow with browser wallets
**When:** Web application with crypto payments


## Anti-Patterns

### Trust Client Claims
Accepting client's claim of payment without verification
**Instead:** // Bad: Trust the client
if (req.headers['X-Paid'] === 'true') {
  serveContent();
}

// Good: Verify payment proof
const proof = req.headers['Authorization'];
const isValid = await verifyPaymentProof(proof);
if (isValid) {
  serveContent();
}


### Blocking Payment Verification
Synchronously waiting for payment confirmation in request handler
**Instead:** // Bad: Block until confirmed
app.get('/content', async (req, res) => {
  await waitForPaymentConfirmation(req.paymentId); // Could take minutes!
  res.send(content);
});

// Good: Webhook + polling
// 1. Return 402 with payment request
// 2. Client pays, receives token
// 3. Client presents token, server verifies instantly


### Expired Invoice Acceptance
Accepting payments on expired Lightning invoices
**Instead:** // Bad: No expiry check
const invoice = await db.getInvoice(paymentHash);
if (invoice.paid) { proceed(); }

// Good: Check expiry
const invoice = await db.getInvoice(paymentHash);
if (invoice.paid && invoice.expires_at > Date.now()) {
  proceed();
} else if (invoice.expires_at <= Date.now()) {
  // Generate new invoice, refund if paid late
  throw new PaymentExpiredError();
}


### Hardcoded Amounts
Embedding payment amounts directly in code
**Instead:** // Bad
const PRICE_SATS = 1000;

// Good: Dynamic pricing
const pricing = await getPricing(endpoint, user);
// Supports: A/B testing, dynamic pricing, user tiers


### Single Payment Method
Only supporting one payment method (e.g., only Lightning)
**Instead:** // Bad: Lightning only
const invoice = await createInvoice(amount);

// Good: Multiple options with fallback
const options = await generatePaymentOptions(amount);
// Returns: Lightning, L2 ETH, L2 USDC, etc.


### No Payment Caching
Verifying the same payment token on every request
**Instead:** // Bad: Verify every time
app.use(async (req, res, next) => {
  const valid = await verifyPaymentToken(req.token); // 100ms each!
  if (valid) next();
});

// Good: Cache verification results
const paymentCache = new LRU({ maxAge: 60000 });

app.use(async (req, res, next) => {
  const token = req.headers.authorization;
  let valid = paymentCache.get(token);

  if (valid === undefined) {
    valid = await verifyPaymentToken(token);
    paymentCache.set(token, valid);
  }

  if (valid) next();
  else res.status(402).json({ error: 'payment_required' });
});


### Ignoring Exchange Rate Risk
Not locking exchange rates during payment flow
**Instead:** // Bad: Use spot rate at settlement
const sats = usdAmount / currentBtcPrice;

// Good: Lock rate at invoice creation
const rateSnapshot = {
  btc_usd: await getRate(),
  locked_at: Date.now(),
  valid_for: 300000, // 5 minutes
};
const sats = usdAmount / rateSnapshot.btc_usd;
// Store snapshot with invoice for settlement reference



## Sharp Edges (Gotchas)

*Real production issues that cause outages and bugs.*

## Collaboration

### When to Hand Off

| Trigger | Delegate To | Context |
|---------|-------------|--------|
| `` | api-designer | Design payment-gated API endpoints |
| `` | blockchain-defi | Lightning Network infrastructure setup |
| `` | layer2-scaling | L2 payment channel deployment |
| `` | evm-deep-dive | Payment contract development |
| `` | frontend | Payment UI implementation |
| `` | backend | Payment data storage and state |
| `` | stripe-integration | Fiat payment fallback integration |
| `` | event-architect | Payment event processing pipeline |

### Receives Work From

- **api-designer**: 
- **backend**: 
- **blockchain-defi**: 
- **layer2-scaling**: 
- **frontend**: 

---

## Get the Full Version

This skill has **automated validations**, **detection patterns**, and **structured handoff triggers** that work with the Spawner orchestrator.

```bash
npx vibeship-spawner-skills install
```

Full skill path: `~/.spawner/skills/blockchain/x402-payments/`

**Includes:**
- `skill.yaml` - Structured skill definition
- `sharp-edges.yaml` - Machine-parseable gotchas with detection patterns
- `validations.yaml` - Automated code checks
- `collaboration.yaml` - Handoff triggers for skill orchestration

---

*Generated by [VibeShip Spawner](https://github.com/vibeforge1111/vibeship-spawner-skills)*
