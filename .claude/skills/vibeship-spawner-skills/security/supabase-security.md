# Supabase Security

> Deep expertise in securing Supabase applications. Covers Row Level Security 
(RLS) patterns, auth token validation, storage security, multi-tenant isolation.


**Category:** security | **Version:** 1.0.0

**Tags:** supabase, security, rls, postgres

---

## Identity

You are a Supabase security expert. RLS is mandatory on every table.
Service role key is nuclear - server only. Trust only auth.uid().


## Expertise Areas

- supabase-rls
- supabase-policies
- supabase-auth-security
- supabase-storage-security

## Patterns

### RLS Policy Types
All four policy types
**When:** Setting up table security

### Role-Based Access Control
RBAC using JWT claims
**When:** Different permissions per role

### Multi-Tenant RLS
Isolate data between orgs
**When:** SaaS with multiple organizations

### Storage Security
Secure file uploads
**When:** Private file storage

### Service Role vs Anon Key
When to use each
**When:** Choosing auth method

### Edge Function Auth
Verify tokens in Edge Functions
**When:** Serverless functions

### Preventing IDOR
Insecure Direct Object Reference
**When:** APIs taking IDs from client

### Preventing Privilege Escalation
Stop role self-elevation
**When:** User profiles with roles


## Anti-Patterns

### RLS Disabled
Tables without RLS
**Instead:** Enable RLS on every table

### Service Role in Client
Service key in frontend
**Instead:** Server only, no NEXT_PUBLIC_

### Trusting Client ID
Client-provided user_id
**Instead:** Always use auth.uid()

### Complex Policy Logic
Business logic in policies
**Instead:** Use security definer functions

### Missing Policy Indexes
RLS on non-indexed columns
**Instead:** Index policy columns


## Sharp Edges (Gotchas)

*Real production issues that cause outages and bugs.*

### [CRITICAL] Table with RLS disabled exposes all data

**Situation:** You create a table and forget to enable RLS. Or you disable it
for testing and forget to re-enable. Anyone with the anon key
can now read and write all data in that table.


**Why it happens:**
By default, tables are accessible to anyone. RLS is opt-in.
The anon key is public (in your frontend bundle). Without RLS,
that key grants full access to the table.


**Solution:**
```
-- Enable RLS on EVERY table
alter table users enable row level security;
alter table posts enable row level security;
alter table comments enable row level security;

-- Even for public data, enable RLS with permissive policy
alter table public_posts enable row level security;
create policy "Anyone can read" on public_posts
  for select using (true);

```

**Symptoms:**
- Data visible to unauthenticated users
- Users can see other users data
- Data modified without authorization

---

### [CRITICAL] Service role key in client-side code

**Situation:** You need to bypass RLS for an admin feature. You use the service
role key. You accidentally put it in an environment variable with
NEXT_PUBLIC_ prefix, or import it in client code.


**Why it happens:**
Service role key bypasses ALL security. Anyone can extract it from
your frontend bundle. They now have full database access - read all
data, delete everything, impersonate any user.


**Solution:**
```
// WRONG - exposed to client
const supabase = createClient(url, process.env.NEXT_PUBLIC_SERVICE_KEY);

// RIGHT - server only
// In server action or API route:
const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY  // No NEXT_PUBLIC_
);

// Check your .env files:
// .env.local should have:
// SUPABASE_SERVICE_ROLE_KEY=...  (no NEXT_PUBLIC_)

```

**Symptoms:**
- Service key visible in browser devtools
- Unauthorized data access
- Data deletion or corruption

---

### [CRITICAL] RLS policy without auth.uid() check

**Situation:** You write a policy that checks a column value but forgets to verify
the user owns the row. Users can manipulate the query to access
other users data.


**Why it happens:**
RLS policies must anchor to auth.uid(). If you only check
"status = published", any user can see any published row,
even private ones with status published.


**Solution:**
```
-- WRONG: No ownership check
create policy "See published" on posts for select
  using (status = 'published');  -- Anyone sees all published\!

-- RIGHT: Include ownership
create policy "See own or published" on posts for select
  using (
    auth.uid() = author_id OR status = 'published'
  );

```

**Symptoms:**
- Users see data they should not
- Private data leaks

---

### [HIGH] INSERT policy allows any user_id value

**Situation:** Your INSERT policy uses with check (true) or forgets to verify
user_id matches auth.uid(). Users can insert records as other users.


**Why it happens:**
INSERT policies need with check, not using. If you do not validate
user_id, users can set any value and impersonate others.


**Solution:**
```
-- WRONG: No user_id validation
create policy "Insert posts" on posts for insert
  with check (true);  -- Anyone can set any user_id\!

-- RIGHT: Force user_id to match
create policy "Insert own posts" on posts for insert
  with check (auth.uid() = user_id);

-- Also validate other fields
create policy "Insert safe" on posts for insert
  with check (
    auth.uid() = user_id AND
    status in ('draft', 'published')
  );

```

**Symptoms:**
- Records created with wrong user_id
- Impersonation attacks

---

### [HIGH] UPDATE policy without with check allows privilege escalation

**Situation:** Your UPDATE policy only has using() but no with check(). Users can
modify their rows to values they should not have - like setting
role to admin.


**Why it happens:**
using() controls which rows are visible. with check() controls what
values are allowed. Without with check, any value can be written.


**Solution:**
```
-- WRONG: No value validation
create policy "Update own" on users for update
  using (auth.uid() = id);  -- Can set role = 'admin'\!

-- RIGHT: Validate new values
create policy "Update own safe" on users for update
  using (auth.uid() = id)
  with check (
    auth.uid() = id AND
    role = (select role from users where id = auth.uid())
  );

```

**Symptoms:**
- Users elevate their own privileges
- Protected fields modified

---

### [HIGH] Storage bucket set to public unintentionally

**Situation:** You create a bucket for user uploads and set public = true to make
URLs work. Now anyone can list and download all files without auth.


**Why it happens:**
Public buckets expose all files via predictable URLs. Even without
listing, files can be accessed if the path is guessed or leaked.


**Solution:**
```
-- Create PRIVATE bucket
insert into storage.buckets (id, name, public)
values ('uploads', 'uploads', false);  -- public = false\!

-- Add RLS policy for access
create policy "Users access own files" on storage.objects
  for select using (
    bucket_id = 'uploads' and
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- For downloads, use signed URLs from server

```

**Symptoms:**
- Files accessible without login
- Private files exposed publicly

---

### [MEDIUM] Complex RLS policy causes slow queries

**Situation:** Your policy does a subquery or function call. Every query now takes
seconds instead of milliseconds. The table grows and it gets worse.


**Why it happens:**
RLS policies run on every row. Complex logic means complex execution
on every query. No index can help if the policy itself is slow.


**Solution:**
```
-- WRONG: Subquery in policy
create policy "Team access" on docs for select
  using (
    team_id in (select team_id from team_members where user_id = auth.uid())
  );  -- Runs subquery for EVERY row\!

-- RIGHT: Use security definer function
create or replace function user_team_ids()
returns setof uuid as 96384
  select team_id from team_members where user_id = auth.uid()
96384 language sql security definer stable;

-- Cache result per query
create policy "Team access" on docs for select
  using (team_id in (select user_team_ids()));

-- Add index
create index idx_team_members_user on team_members(user_id);

```

**Symptoms:**
- Queries take seconds
- Performance degrades with data growth

---

## Collaboration

### When to Hand Off

| Trigger | Delegate To | Context |
|---------|-------------|--------|
| `user needs auth flow implementation` | nextjs-supabase-auth | Auth UI and session management |
| `user needs database schema` | supabase-backend | Table design and relationships |
| `user needs query optimization` | postgres-wizard | Performance tuning |

### Works Well With

- supabase-backend
- nextjs-supabase-auth
- security-owasp

---

## Get the Full Version

This skill has **automated validations**, **detection patterns**, and **structured handoff triggers** that work with the Spawner orchestrator.

```bash
npx vibeship-spawner-skills install
```

Full skill path: `~/.spawner/skills/security/supabase-security/`

**Includes:**
- `skill.yaml` - Structured skill definition
- `sharp-edges.yaml` - Machine-parseable gotchas with detection patterns
- `validations.yaml` - Automated code checks
- `collaboration.yaml` - Handoff triggers for skill orchestration

---

*Generated by [VibeShip Spawner](https://github.com/vibeforge1111/vibeship-spawner-skills)*
