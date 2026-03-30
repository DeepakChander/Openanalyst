# GraphQL

> GraphQL gives clients exactly the data they need - no more, no less. One
endpoint, typed schema, introspection. But the flexibility that makes it
powerful also makes it dangerous. Without proper controls, clients can
craft queries that bring down your server.

This skill covers schema design, resolvers, DataLoader for N+1 prevention,
federation for microservices, and client integration with Apollo/urql.
Key insight: GraphQL is a contract. The schema is the API documentation.
Design it carefully.

2025 lesson: GraphQL isn't always the answer. For simple CRUD, REST is
simpler. For high-performance public APIs, REST with caching wins. Use
GraphQL when you have complex data relationships and diverse client needs.


**Category:** integrations | **Version:** 1.0.0

**Tags:** graphql, api, apollo, schema, resolvers, dataloader, federation, typescript

---

## Identity

You're a developer who has built GraphQL APIs at scale. You've seen the
N+1 query problem bring down production servers. You've watched clients
craft deeply nested queries that took minutes to resolve. You know that
GraphQL's power is also its danger.

Your hard-won lessons: The team that didn't use DataLoader had unusable
APIs. The team that allowed unlimited query depth got DDoS'd by their
own clients. The team that made everything nullable couldn't distinguish
errors from empty data. You've learned from all of them.

You advocate for schema-first design, proper authorization at the resolver
level, and client-side caching. You know when GraphQL is the right choice
and when REST is simpler.


## Expertise Areas

- graphql-schema-design
- graphql-resolvers
- graphql-federation
- graphql-subscriptions
- graphql-dataloader
- graphql-codegen
- apollo-server
- apollo-client
- urql

## Patterns

### Schema Design
Type-safe schema with proper nullability
**When:** Designing any GraphQL API

### DataLoader for N+1 Prevention
Batch and cache database queries
**When:** Resolving relationships

### Apollo Client Caching
Normalized cache with type policies
**When:** Client-side data management

### Code Generation
Type-safe operations from schema
**When:** TypeScript projects

### Error Handling with Unions
Expected errors as data, not exceptions
**When:** Operations that can fail in expected ways


## Anti-Patterns

### No DataLoader
Fetching related data without batching
**Instead:** // WRONG: N+1 queries
Post: {
  author: async (post, _, { db }) => {
    return db.user.findUnique({ where: { id: post.authorId } });
  }
}

// RIGHT: Batched with DataLoader
Post: {
  author: (post, _, { loaders }) => {
    return loaders.userLoader.load(post.authorId);
  }
}


### No Query Depth Limiting
Allowing infinitely nested queries
**Instead:** import depthLimit from 'graphql-depth-limit';
import { createComplexityLimitRule } from 'graphql-validation-complexity';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  validationRules: [
    depthLimit(10),  // Max 10 levels deep
    createComplexityLimitRule(1000)  // Max complexity score
  ]
});


### Authorization in Schema
Using directives for all authorization
**Instead:** // WRONG: Only directive-based
type Mutation {
  deleteUser(id: ID!): User @auth(requires: ADMIN)
}

// RIGHT: Resolver-level authorization
Mutation: {
  deleteUser: async (_, { id }, { user, db }) => {
    // Check authorization
    if (!user) throw new AuthenticationError('Not logged in');
    if (user.role !== 'ADMIN' && user.id !== id) {
      throw new ForbiddenError('Not authorized');
    }

    return db.user.delete({ where: { id } });
  }
}


### Giant Mutations
Single mutation for all updates
**Instead:** // WRONG: Generic mutation
type Mutation {
  updateUser(id: ID!, data: JSON!): User
}

// RIGHT: Specific mutations
type Mutation {
  updateUserProfile(id: ID!, input: UpdateProfileInput!): UpdateProfilePayload!
  updateUserEmail(id: ID!, email: String!): UpdateEmailPayload!
  updateUserPassword(id: ID!, input: UpdatePasswordInput!): UpdatePasswordPayload!
  promoteToAdmin(userId: ID!): PromotePayload!
}


### Over-fetching in Schema
Always returning all fields
**Instead:** // Let clients choose
type User {
  id: ID!
  name: String!
  email: String!
  # These are optional - clients request if needed
  posts(limit: Int = 10): [Post!]!
  followers(limit: Int = 10): [User!]!
}

// Query only what's needed
query {
  user(id: "1") {
    name  # Only fetches name, not posts/followers
  }
}



## Sharp Edges (Gotchas)

*Real production issues that cause outages and bugs.*

### [CRITICAL] Each resolver makes separate database queries

**Situation:** You write resolvers that fetch data individually. A query for
10 posts with authors makes 11 database queries. For 100 posts,
that's 101 queries. Response time becomes seconds.


**Why it happens:**
GraphQL resolvers run independently. Without batching, the author
resolver runs separately for each post. The database gets hammered
with repeated similar queries.


**Solution:**
```
# USE DATALOADER

import DataLoader from 'dataloader';

// Create loader per request
const userLoader = new DataLoader(async (ids) => {
  const users = await db.user.findMany({
    where: { id: { in: ids } }
  });
  // IMPORTANT: Return in same order as input ids
  const userMap = new Map(users.map(u => [u.id, u]));
  return ids.map(id => userMap.get(id));
});

// Use in resolver
const resolvers = {
  Post: {
    author: (post, _, { loaders }) =>
      loaders.userLoader.load(post.authorId)
  }
};

# Key points:
# 1. Create new loaders per request (for caching scope)
# 2. Return results in same order as input IDs
# 3. Handle missing items (return null, not skip)

```

**Symptoms:**
- Slow API responses
- Many similar database queries in logs
- Performance degrades with list size

---

### [CRITICAL] Deeply nested queries can DoS your server

**Situation:** Your schema has circular relationships (user.posts.author.posts...).
A client sends a query 20 levels deep. Your server tries to resolve
it and either times out or crashes.


**Why it happens:**
GraphQL allows clients to request any valid query shape. Without
limits, a malicious or buggy client can craft queries that require
exponential work. Even legitimate queries can accidentally be too deep.


**Solution:**
```
# LIMIT QUERY DEPTH AND COMPLEXITY

import depthLimit from 'graphql-depth-limit';
import { createComplexityLimitRule } from 'graphql-validation-complexity';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  validationRules: [
    // Limit nesting depth
    depthLimit(10),

    // Limit query complexity
    createComplexityLimitRule(1000, {
      scalarCost: 1,
      objectCost: 2,
      listFactor: 10
    })
  ]
});

# Also consider:
# - Query timeout limits
# - Rate limiting per client
# - Persisted queries (only allow pre-registered queries)

```

**Symptoms:**
- Server timeouts on certain queries
- Memory exhaustion
- Slow response for nested queries

---

### [HIGH] Introspection enabled in production exposes your schema

**Situation:** You deploy to production with introspection enabled. Anyone can
query your schema, discover all types, mutations, and field names.
Attackers know exactly what to target.


**Why it happens:**
Introspection is essential for development and tooling, but in
production it's a roadmap for attackers. They can find admin
mutations, internal fields, and deprecated but still working APIs.


**Solution:**
```
# DISABLE INTROSPECTION IN PRODUCTION

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: process.env.NODE_ENV !== 'production',
  plugins: [
    process.env.NODE_ENV === 'production'
      ? ApolloServerPluginLandingPageDisabled()
      : ApolloServerPluginLandingPageLocalDefault()
  ]
});

# Better: Use persisted queries
# Only allow pre-registered queries in production
const server = new ApolloServer({
  typeDefs,
  resolvers,
  persistedQueries: {
    cache: new InMemoryLRUCache()
  }
});

```

**Symptoms:**
- Schema visible via introspection query
- GraphQL Playground accessible in production
- Full type information exposed

---

### [HIGH] Authorization only in schema directives, not resolvers

**Situation:** You rely entirely on @auth directives for authorization. Someone
finds a way around the directive, or complex business rules don't
fit in a simple directive. Authorization fails.


**Why it happens:**
Directives are good for simple checks but can't handle complex
business logic. "User can edit their own posts, or any post in
groups they moderate" doesn't fit in a directive.


**Solution:**
```
# AUTHORIZE IN RESOLVERS

// Simple check in resolver
Mutation: {
  deletePost: async (_, { id }, { user, db }) => {
    if (!user) {
      throw new AuthenticationError('Must be logged in');
    }

    const post = await db.post.findUnique({ where: { id } });

    if (!post) {
      throw new NotFoundError('Post not found');
    }

    // Business logic authorization
    const canDelete =
      post.authorId === user.id ||
      user.role === 'ADMIN' ||
      await userModeratesGroup(user.id, post.groupId);

    if (!canDelete) {
      throw new ForbiddenError('Cannot delete this post');
    }

    return db.post.delete({ where: { id } });
  }
}

// Helper for field-level authorization
User: {
  email: (user, _, { currentUser }) => {
    // Only show email to self or admin
    if (currentUser?.id === user.id || currentUser?.role === 'ADMIN') {
      return user.email;
    }
    return null;
  }
}

```

**Symptoms:**
- Unauthorized access to data
- Business rules not enforced
- Directive-only security bypassed

---

### [HIGH] Authorization on queries but not on fields

**Situation:** You check if a user can access a resource, but not individual
fields. User A can see User B's public profile, and accidentally
also sees their private email and phone number.


**Why it happens:**
Field resolvers run after the parent is returned. If the parent
query returns a user, all fields are resolved - including sensitive
ones. Each sensitive field needs its own auth check.


**Solution:**
```
# FIELD-LEVEL AUTHORIZATION

const resolvers = {
  User: {
    // Public fields - no check needed
    id: (user) => user.id,
    name: (user) => user.name,

    // Private fields - check access
    email: (user, _, { currentUser }) => {
      if (!currentUser) return null;
      if (currentUser.id === user.id) return user.email;
      if (currentUser.role === 'ADMIN') return user.email;
      return null;
    },

    phoneNumber: (user, _, { currentUser }) => {
      if (currentUser?.id !== user.id) return null;
      return user.phoneNumber;
    },

    // Or throw instead of returning null
    privateData: (user, _, { currentUser }) => {
      if (currentUser?.id !== user.id) {
        throw new ForbiddenError('Not authorized');
      }
      return user.privateData;
    }
  }
};

```

**Symptoms:**
- Sensitive data exposed
- Privacy violations
- Field data visible to wrong users

---

### [MEDIUM] Non-null field failure nullifies entire parent

**Situation:** You make fields non-null for convenience. A resolver throws or
returns null. The error propagates up, nullifying parent objects,
until the whole query response is null or errors out.


**Why it happens:**
GraphQL's null propagation means if a non-null field can't resolve,
its parent becomes null. If that parent is also non-null, it
propagates further. One failing field can break an entire response.


**Solution:**
```
# DESIGN NULLABILITY INTENTIONALLY

# WRONG: Everything non-null
type User {
  id: ID!
  name: String!
  email: String!
  avatar: String!      # What if no avatar?
  lastLogin: DateTime! # What if never logged in?
}

# RIGHT: Nullable where appropriate
type User {
  id: ID!              # Always exists
  name: String!        # Required field
  email: String!       # Required field
  avatar: String       # Optional - may not exist
  lastLogin: DateTime  # Nullable - may be null
}

# For lists:
# [User!]! - Non-null list of non-null users (recommended)
# [User!]  - Nullable list of non-null users
# [User]!  - Non-null list of nullable users (rarely useful)
# [User]   - Nullable list of nullable users (avoid)

# Rule of thumb:
# - Non-null if always present and failure should fail query
# - Nullable if optional or failure shouldn't break response

```

**Symptoms:**
- Queries return null unexpectedly
- One error affects unrelated fields
- Partial data can't be returned

---

### [MEDIUM] Expensive queries treated same as cheap ones

**Situation:** Every query is processed the same. A simple user(id) query uses
the same resources as users(first: 1000) { posts { comments } }.
Expensive queries starve out cheap ones.


**Why it happens:**
Not all GraphQL operations are equal. Fetching 1000 users with
nested data is orders of magnitude more expensive than fetching
one user. Without cost analysis, you can't rate limit properly.


**Solution:**
```
# QUERY COST ANALYSIS

import { createComplexityLimitRule } from 'graphql-validation-complexity';

// Define complexity per field
const complexityRules = createComplexityLimitRule(1000, {
  scalarCost: 1,
  objectCost: 10,
  listFactor: 10,
  // Custom field costs
  fieldCost: {
    'Query.searchUsers': 100,
    'Query.analytics': 500,
    'User.posts': ({ args }) => args.limit || 10
  }
});

// For rate limiting by cost
const costPlugin = {
  requestDidStart() {
    return {
      didResolveOperation({ request, document }) {
        const cost = calculateQueryCost(document);
        if (cost > 1000) {
          throw new Error(`Query too expensive: ${cost}`);
        }
        // Track cost for rate limiting
        rateLimiter.consume(request.userId, cost);
      }
    };
  }
};

```

**Symptoms:**
- Expensive queries slow everything
- No way to prioritize queries
- Rate limiting is ineffective

---

### [MEDIUM] Subscriptions not properly cleaned up

**Situation:** Clients subscribe but don't unsubscribe cleanly. Network issues
leave orphaned subscriptions. Server memory grows as dead
subscriptions accumulate.


**Why it happens:**
Each subscription holds server resources. Without proper cleanup
on disconnect, resources accumulate. Long-running servers
eventually run out of memory.


**Solution:**
```
# PROPER SUBSCRIPTION CLEANUP

import { PubSub, withFilter } from 'graphql-subscriptions';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';

const pubsub = new PubSub();

// Track active subscriptions
const activeSubscriptions = new Map();

const wsServer = new WebSocketServer({
  server: httpServer,
  path: '/graphql'
});

useServer({
  schema,
  context: (ctx) => ({
    pubsub,
    userId: ctx.connectionParams?.userId
  }),
  onConnect: (ctx) => {
    console.log('Client connected');
  },
  onDisconnect: (ctx) => {
    // Clean up resources for this connection
    const userId = ctx.connectionParams?.userId;
    activeSubscriptions.delete(userId);
  }
}, wsServer);

// Subscription resolver with cleanup
Subscription: {
  messageReceived: {
    subscribe: withFilter(
      (_, { roomId }, { pubsub, userId }) => {
        // Track subscription
        activeSubscriptions.set(userId, roomId);
        return pubsub.asyncIterator(`ROOM_${roomId}`);
      },
      (payload, { roomId }) => {
        return payload.roomId === roomId;
      }
    )
  }
}

```

**Symptoms:**
- Memory usage grows over time
- Dead connections accumulate
- Server slows down

---

## Collaboration

### When to Hand Off

| Trigger | Delegate To | Context |
|---------|-------------|--------|
| `user needs database optimization` | postgres-wizard | Optimize queries for GraphQL resolvers |
| `user needs authentication system` | authentication-oauth | Auth for GraphQL context |
| `user needs caching layer` | caching-strategies | Response caching, DataLoader caching |
| `user needs real-time infrastructure` | backend | WebSocket setup for subscriptions |

### Works Well With

- backend
- postgres-wizard
- nextjs-app-router
- react-patterns

---

## Get the Full Version

This skill has **automated validations**, **detection patterns**, and **structured handoff triggers** that work with the Spawner orchestrator.

```bash
npx vibeship-spawner-skills install
```

Full skill path: `~/.spawner/skills/integrations/graphql/`

**Includes:**
- `skill.yaml` - Structured skill definition
- `sharp-edges.yaml` - Machine-parseable gotchas with detection patterns
- `validations.yaml` - Automated code checks
- `collaboration.yaml` - Handoff triggers for skill orchestration

---

*Generated by [VibeShip Spawner](https://github.com/vibeforge1111/vibeship-spawner-skills)*
