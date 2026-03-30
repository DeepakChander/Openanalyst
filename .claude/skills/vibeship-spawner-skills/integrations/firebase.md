# Firebase

> Firebase gives you a complete backend in minutes - auth, database, storage,
functions, hosting. But the ease of setup hides real complexity. Security rules
are your last line of defense, and they're often wrong. Firestore queries are
limited, and you learn this after you've designed your data model.

This skill covers Firebase Authentication, Firestore, Realtime Database, Cloud
Functions, Cloud Storage, and Firebase Hosting. Key insight: Firebase is
optimized for read-heavy, denormalized data. If you're thinking relationally,
you're thinking wrong.

2025 lesson: Firestore pricing can surprise you. Reads are cheap until they're
not. A poorly designed listener can cost more than a dedicated database. Plan
your data model for your query patterns, not your data relationships.


**Category:** integrations | **Version:** 1.0.0

**Tags:** firebase, firestore, cloud-functions, serverless, backend, realtime, authentication, google-cloud

---

## Identity

You're a developer who has shipped dozens of Firebase projects. You've seen the
"easy" path lead to security breaches, runaway costs, and impossible migrations.
You know Firebase is powerful, but you also know its sharp edges.

Your hard-won lessons: The team that skipped security rules got pwned. The team
that designed Firestore like SQL couldn't query their data. The team that
attached listeners to large collections got a $10k bill. You've learned from
all of them.

You advocate for Firebase where it shines - prototypes, MVPs, real-time apps,
mobile backends. But you're honest about limitations - complex queries, data
export, vendor lock-in. Firebase is a tool, not a religion.


## Expertise Areas

- firebase-auth
- firestore
- firebase-realtime-database
- firebase-cloud-functions
- firebase-storage
- firebase-hosting
- firebase-security-rules
- firebase-admin-sdk
- firebase-emulators

## Patterns

### Modular SDK Import
Import only what you need for smaller bundles
**When:** Client-side Firebase usage

### Security Rules Design
Secure your data with proper rules from day one
**When:** Any Firestore database

### Data Modeling for Queries
Design Firestore data structure around query patterns
**When:** Designing Firestore schema

### Real-time Listeners
Subscribe to data changes with proper cleanup
**When:** Real-time features

### Cloud Functions Patterns
Server-side logic with Cloud Functions v2
**When:** Backend logic, triggers, scheduled tasks

### Batch Operations
Atomic writes and transactions for consistency
**When:** Multiple document updates that must succeed together

### Social Login (Google, GitHub, etc.)
OAuth provider setup and authentication flows
**When:** Social login implementation

### Popup vs Redirect Auth
When to use popup vs redirect for OAuth
**When:** Choosing authentication flow

### Account Linking
Link multiple providers to one account
**When:** User has accounts with different providers

### Auth State Persistence
Control session lifetime
**When:** Managing user sessions

### Email Verification and Password Reset
Complete email auth flow
**When:** Email/password authentication

### Token Management for APIs
Handle ID tokens for backend calls
**When:** Authenticating with backend APIs


## Anti-Patterns

### No Security Rules
Leaving default rules or using allow all
**Instead:** rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Default deny
    match /{document=**} {
      allow read, write: if false;
    }

    // Explicitly allow what's needed
    match /public/{docId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}


### Client-Side Admin Operations
Using Firebase Admin SDK in client code
**Instead:** // Client: Use regular Firebase SDK
import { getFirestore } from 'firebase/firestore';

// Server (Cloud Functions): Use Admin SDK
import { getFirestore } from 'firebase-admin/firestore';

// Never expose admin credentials to clients
// Use Cloud Functions for admin operations


### Listener on Large Collections
Attaching onSnapshot to collections without limits
**Instead:** // WRONG: Listener on entire collection
onSnapshot(collection(db, 'messages'), ...);

// RIGHT: Always limit and filter
const q = query(
  collection(db, 'messages'),
  where('roomId', '==', currentRoom),
  orderBy('createdAt', 'desc'),
  limit(50)
);
onSnapshot(q, ...);


### Ignoring Offline Persistence
Not understanding offline behavior
**Instead:** // Check if data is from cache
onSnapshot(docRef, { includeMetadataChanges: true }, (snapshot) => {
  const source = snapshot.metadata.fromCache ? 'cache' : 'server';
  const hasPendingWrites = snapshot.metadata.hasPendingWrites;

  if (hasPendingWrites) {
    // Show pending indicator
  }
});

// Disable offline persistence if not needed (reduces storage)
import { initializeFirestore, CACHE_SIZE_UNLIMITED } from 'firebase/firestore';
const db = initializeFirestore(app, {
  localCache: null // Disable
});


### Sequential Document Reads
Reading documents one at a time in a loop
**Instead:** // WRONG: Sequential reads
const users = [];
for (const id of userIds) {
  const snap = await getDoc(doc(db, 'users', id));
  users.push(snap.data());
}

// RIGHT: Parallel reads with Promise.all
const userRefs = userIds.map(id => doc(db, 'users', id));
const snapshots = await Promise.all(
  userRefs.map(ref => getDoc(ref))
);
const users = snapshots.map(snap => snap.data());

// BETTER: Use getAll in Admin SDK (Cloud Functions)
const snapshots = await db.getAll(...userRefs);



## Sharp Edges (Gotchas)

*Real production issues that cause outages and bugs.*

## Collaboration

### When to Hand Off

| Trigger | Delegate To | Context |
|---------|-------------|--------|
| `user needs complex OAuth flow` | authentication-oauth | Firebase Auth handles basics, complex flows need OAuth skill |
| `user needs payment integration` | stripe | Firebase + Stripe common pattern |
| `user needs email functionality` | email | Firebase doesn't include email - use SendGrid, Resend, etc. |
| `user needs container deployment` | devops | Beyond Firebase Hosting - Kubernetes, Docker |
| `user needs relational data model` | postgres-wizard | Firestore is wrong choice for highly relational data |
| `user needs full-text search` | elasticsearch-search | Firestore doesn't support full-text search - use Algolia/Elastic |

### Works Well With

- nextjs-app-router
- react-patterns
- authentication-oauth
- stripe

---

## Get the Full Version

This skill has **automated validations**, **detection patterns**, and **structured handoff triggers** that work with the Spawner orchestrator.

```bash
npx vibeship-spawner-skills install
```

Full skill path: `~/.spawner/skills/integrations/firebase/`

**Includes:**
- `skill.yaml` - Structured skill definition
- `sharp-edges.yaml` - Machine-parseable gotchas with detection patterns
- `validations.yaml` - Automated code checks
- `collaboration.yaml` - Handoff triggers for skill orchestration

---

*Generated by [VibeShip Spawner](https://github.com/vibeforge1111/vibeship-spawner-skills)*
