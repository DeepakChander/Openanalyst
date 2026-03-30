# Prisma

> Expert in Prisma - the TypeScript ORM for type-safe database access. Covers schema
design, migrations, Prisma Client queries, relations, edge deployment, and
performance optimization. Essential for building reliable database layers in
TypeScript applications.


**Category:** backend | **Version:** 1.0.0

**Tags:** prisma, orm, database, typescript, postgresql, migrations, type-safe

---

## Identity

[object Object]

## Expertise Areas

- Prisma schema design
- Database migrations
- Prisma Client usage
- Relations and nested queries
- Edge deployment (Accelerate)
- Query optimization
- Seeding and testing

## Patterns

### Project Setup
Initialize Prisma in a project
```
# Install Prisma
npm install prisma --save-dev
npm install @prisma/client

# Initialize Prisma
npx prisma init

# Generated files:
# prisma/schema.prisma - Schema file
# .env - Database URL

# prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"  // or mysql, sqlite, sqlserver, mongodb
  url      = env("DATABASE_URL")
}

# .env
DATABASE_URL="postgresql://user:password@localhost:5432/mydb?schema=public"

# For PlanetScale (MySQL)
DATABASE_URL="mysql://user:password@host/db?sslaccept=strict"
# Add to schema:
datasource db {
  provider     = "mysql"
  url          = env("DATABASE_URL")
  relationMode = "prisma"  // For PlanetScale
}

# For Neon (PostgreSQL serverless)
DATABASE_URL="postgresql://user:password@host/db?sslmode=require"

```

### Schema Design
Define data models with relations
```
// prisma/schema.prisma

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  role      Role     @default(USER)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  // Relations
  posts     Post[]
  profile   Profile?

  @@index([email])
  @@map("users")  // Table name in DB
}

model Profile {
  id     String @id @default(cuid())
  bio    String?
  avatar String?

  // One-to-one relation
  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)
  userId String @unique

  @@map("profiles")
}

model Post {
  id        String   @id @default(cuid())
  title     String
  content   String?
  published Boolean  @default(false)
  createdAt DateTime @default(now())

  // Many-to-one relation
  author   User   @relation(fields: [authorId], references: [id])
  authorId String

  // Many-to-many relation
  categories Category[]

  @@index([authorId])
  @@map("posts")
}

model Category {
  id    String @id @default(cuid())
  name  String @unique
  posts Post[]

  @@map("categories")
}

enum Role {
  USER
  ADMIN
  MODERATOR
}

// Composite unique constraint
model Subscription {
  userId    String
  planId    String
  startDate DateTime
  endDate   DateTime?

  @@id([userId, planId])  // Composite primary key
  @@unique([userId, planId, startDate])
}

```

### Migrations
Manage database schema changes
```
# Create migration from schema changes
npx prisma migrate dev --name init

# Migration workflow:
# 1. Edit schema.prisma
# 2. Run migrate dev (creates migration + applies)
# 3. Commit migration files

# Preview migration without applying
npx prisma migrate dev --create-only

# Apply migrations in production
npx prisma migrate deploy

# Reset database (dev only!)
npx prisma migrate reset

# Generate client without migration
npx prisma generate

# View current migration status
npx prisma migrate status

# Migration file example:
// prisma/migrations/20250101000000_init/migration.sql
CREATE TABLE "users" (
  "id" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "name" TEXT,
  "role" TEXT NOT NULL DEFAULT 'USER',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

# Safe migration practices:
# - Never edit applied migrations
# - Use expand/contract for breaking changes
# - Test migrations on copy of production data

```

### CRUD Operations
Basic database operations
```
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// CREATE
const user = await prisma.user.create({
  data: {
    email: "alice@example.com",
    name: "Alice",
    profile: {
      create: { bio: "Hello!" }  // Nested create
    }
  },
  include: { profile: true }  // Return with relation
});

// CREATE many
const users = await prisma.user.createMany({
  data: [
    { email: "bob@example.com", name: "Bob" },
    { email: "carol@example.com", name: "Carol" }
  ],
  skipDuplicates: true
});

// READ - find unique
const user = await prisma.user.findUnique({
  where: { email: "alice@example.com" },
  include: {
    posts: { where: { published: true } },
    profile: true
  }
});

// READ - find many with filters
const users = await prisma.user.findMany({
  where: {
    OR: [
      { name: { contains: "ali", mode: "insensitive" } },
      { email: { endsWith: "@example.com" } }
    ],
    role: { in: ["USER", "ADMIN"] },
    createdAt: { gte: new Date("2025-01-01") }
  },
  orderBy: { createdAt: "desc" },
  take: 10,
  skip: 0,
  select: {
    id: true,
    email: true,
    name: true,
    _count: { select: { posts: true } }
  }
});

// READ - find first
const admin = await prisma.user.findFirst({
  where: { role: "ADMIN" }
});

// UPDATE
const updated = await prisma.user.update({
  where: { id: "..." },
  data: {
    name: "Alice Smith",
    profile: {
      update: { bio: "Updated bio" }
    }
  }
});

// UPDATE many
await prisma.post.updateMany({
  where: { authorId: "...", published: false },
  data: { published: true }
});

// UPSERT
const user = await prisma.user.upsert({
  where: { email: "alice@example.com" },
  create: { email: "alice@example.com", name: "Alice" },
  update: { name: "Alice Updated" }
});

// DELETE
await prisma.user.delete({
  where: { id: "..." }
});

// DELETE many
await prisma.post.deleteMany({
  where: { published: false, createdAt: { lt: new Date("2024-01-01") } }
});

```

### Advanced Queries
Complex queries and transactions
```
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

// TRANSACTION - sequential
const [user, post] = await prisma.$transaction([
  prisma.user.create({ data: { email: "new@example.com" } }),
  prisma.post.create({ data: { title: "Hello", authorId: "..." } })
]);

// TRANSACTION - interactive
const result = await prisma.$transaction(async (tx) => {
  const user = await tx.user.findUnique({ where: { id: "..." } });
  if (!user) throw new Error("User not found");

  const updatedBalance = user.balance - 100;
  if (updatedBalance < 0) throw new Error("Insufficient balance");

  return tx.user.update({
    where: { id: user.id },
    data: { balance: updatedBalance }
  });
});

// AGGREGATION
const stats = await prisma.post.aggregate({
  _count: { id: true },
  _avg: { viewCount: true },
  _max: { viewCount: true },
  where: { published: true }
});

// GROUP BY
const postsByAuthor = await prisma.post.groupBy({
  by: ["authorId"],
  _count: { id: true },
  _sum: { viewCount: true },
  orderBy: { _count: { id: "desc" } },
  having: { id: { _count: { gt: 5 } } }
});

// RAW SQL
const users = await prisma.$queryRaw<User[]>`
  SELECT * FROM users
  WHERE email LIKE ${`%@example.com`}
  ORDER BY "createdAt" DESC
  LIMIT 10
`;

// Raw with Prisma.sql for dynamic queries
const column = Prisma.sql`email`;
const users = await prisma.$queryRaw`
  SELECT * FROM users ORDER BY ${column}
`;

// Execute raw (no return)
await prisma.$executeRaw`
  UPDATE users SET "lastActive" = NOW() WHERE id = ${userId}
`;

// PAGINATION - offset-based
const page = 1;
const pageSize = 10;
const [users, total] = await prisma.$transaction([
  prisma.user.findMany({
    skip: (page - 1) * pageSize,
    take: pageSize,
    orderBy: { createdAt: "desc" }
  }),
  prisma.user.count()
]);

// PAGINATION - cursor-based (better for large datasets)
const users = await prisma.user.findMany({
  take: 10,
  cursor: { id: lastUserId },
  skip: 1,  // Skip the cursor
  orderBy: { createdAt: "desc" }
});

```

### Edge and Serverless
Deploy Prisma to edge and serverless
```
// Problem: Edge runtimes can't use direct DB connections
// Solution: Prisma Accelerate or Data Proxy

// 1. PRISMA ACCELERATE (Recommended)
// npm install @prisma/client @prisma/extension-accelerate

// schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")  // Direct URL for migrations
  directUrl = env("DIRECT_DATABASE_URL")  // For local dev
}

// lib/prisma.ts
import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

const prisma = new PrismaClient().$extends(withAccelerate());

// Query with caching
const users = await prisma.user.findMany({
  cacheStrategy: {
    ttl: 60,  // Cache for 60 seconds
    swr: 120  // Stale-while-revalidate for 120 seconds
  }
});

// 2. CONNECTION POOLING (for serverless)
// Use PgBouncer, Supabase pooler, or Neon pooler

// .env
DATABASE_URL="postgresql://user:pass@pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_DATABASE_URL="postgresql://user:pass@db.supabase.com:5432/postgres"

// schema.prisma
datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_DATABASE_URL")
}

// 3. SINGLETON PATTERN (prevent connection exhaustion)
// lib/prisma.ts
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === "development"
    ? ["query", "error", "warn"]
    : ["error"]
});

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

// 4. VERCEL EDGE CONFIG
// vercel.json
{
  "functions": {
    "api/**/*.ts": {
      "runtime": "edge"
    }
  }
}

// Use Accelerate URL
DATABASE_URL="prisma://accelerate.prisma-data.net/?api_key=..."

```

### Testing with Prisma
Test database operations
```
// 1. USE TEST DATABASE
// .env.test
DATABASE_URL="postgresql://user:pass@localhost:5432/myapp_test"

// package.json
{
  "scripts": {
    "test": "dotenv -e .env.test -- jest",
    "test:setup": "dotenv -e .env.test -- prisma migrate deploy"
  }
}

// 2. RESET BETWEEN TESTS
// tests/setup.ts
import { prisma } from "@/lib/prisma";

beforeEach(async () => {
  // Clean all tables
  const tablenames = await prisma.$queryRaw<{ tablename: string }[]>`
    SELECT tablename FROM pg_tables WHERE schemaname='public'
  `;

  for (const { tablename } of tablenames) {
    if (tablename !== "_prisma_migrations") {
      await prisma.$executeRawUnsafe(
        `TRUNCATE TABLE "public"."${tablename}" CASCADE;`
      );
    }
  }
});

afterAll(async () => {
  await prisma.$disconnect();
});

// 3. FACTORY PATTERN
// tests/factories/user.ts
import { prisma } from "@/lib/prisma";
import { faker } from "@faker-js/faker";

export function createUser(overrides = {}) {
  return prisma.user.create({
    data: {
      email: faker.internet.email(),
      name: faker.person.fullName(),
      ...overrides
    }
  });
}

// 4. WRITE TESTS
// tests/user.test.ts
import { prisma } from "@/lib/prisma";
import { createUser } from "./factories/user";

describe("User", () => {
  it("should create user with posts", async () => {
    const user = await createUser();
    const post = await prisma.post.create({
      data: {
        title: "Test Post",
        authorId: user.id
      }
    });

    expect(post.authorId).toBe(user.id);
  });
});

// 5. SEEDING
// prisma/seed.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      email: "admin@example.com",
      name: "Admin",
      role: "ADMIN"
    }
  });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

// package.json
{
  "prisma": {
    "seed": "ts-node prisma/seed.ts"
  }
}

// Run: npx prisma db seed

```


## Anti-Patterns

### N+1 Queries
Fetching relations in a loop
**Why it's bad:** Exponential database calls.
Slow performance.
Connection exhaustion.


### No Connection Pooling
Creating new client per request
**Why it's bad:** Connection exhaustion.
Slow cold starts.
Database overwhelmed.


### Selecting All Fields
Not using select for large models
**Why it's bad:** Unnecessary data transfer.
Slow queries.
Memory usage.


### No Indexes
Missing indexes on queried fields
**Why it's bad:** Slow queries at scale.
Full table scans.
Timeouts.



## Sharp Edges (Gotchas)

*Real production issues that cause outages and bugs.*

*Sharp edges documented in full version.*

## Collaboration

### When to Hand Off

| Trigger | Delegate To | Context |
|---------|-------------|--------|
| `next.js|api routes|app router` | nextjs-app-router | Need Next.js integration for Prisma |
| `supabase|auth` | supabase-backend | Using Supabase with Prisma |
| `graphql|api` | graphql-schema | Building GraphQL with Prisma |
| `testing|test` | integration-testing | Testing Prisma database operations |

### Receives Work From

- **nextjs-app-router**: Database layer for Next.js app
- **supabase-backend**: Using Prisma with Supabase
- **graphql-schema**: Database for GraphQL API

### Works Well With

- nextjs-app-router
- supabase-backend
- typescript

---

## Get the Full Version

This skill has **automated validations**, **detection patterns**, and **structured handoff triggers** that work with the Spawner orchestrator.

```bash
npx vibeship-spawner-skills install
```

Full skill path: `~/.spawner/skills/backend/prisma/`

**Includes:**
- `skill.yaml` - Structured skill definition
- `sharp-edges.yaml` - Machine-parseable gotchas with detection patterns
- `validations.yaml` - Automated code checks
- `collaboration.yaml` - Handoff triggers for skill orchestration

---

*Generated by [VibeShip Spawner](https://github.com/vibeforge1111/vibeship-spawner-skills)*
