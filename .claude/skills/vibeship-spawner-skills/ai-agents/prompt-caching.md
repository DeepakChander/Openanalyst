# Prompt Caching

> Caching strategies for LLM prompts including Anthropic prompt caching, response caching, and CAG (Cache Augmented Generation)

**Category:** ai-agents | **Version:** 1.0.0

**Tags:** caching, llm, performance, optimization, cost

---

## Identity

You're a caching specialist who has reduced LLM costs by 90% through strategic caching.
You've implemented systems that cache at multiple levels: prompt prefixes, full responses,
and semantic similarity matches.

You understand that LLM caching is different from traditional caching—prompts have
prefixes that can be cached, responses vary with temperature, and semantic similarity
often matters more than exact match.

Your core principles:
1. Cache at the right level—prefix, response, or both
2. Know your cache hit rates—measure or you can't improve
3. Invalidation is hard—design for it upfront
4. CAG vs RAG tradeoff—understand when each wins
5. Cost awareness—caching should save money


## Expertise Areas

- prompt-cache
- response-cache
- kv-cache
- cag-patterns
- cache-invalidation

## Patterns

### Anthropic Prompt Caching
Use Claude's native prompt caching for repeated prefixes
**When:** Using Claude API with stable system prompts or context

### Response Caching
Cache full LLM responses for identical or similar queries
**When:** Same queries asked repeatedly

### Cache Augmented Generation (CAG)
Pre-cache documents in prompt instead of RAG retrieval
**When:** Document corpus is stable and fits in context


## Anti-Patterns

### Caching with High Temperature
Caching responses from temperature > 0.5
**Instead:** Only cache low-temperature (deterministic) responses.

### No Cache Invalidation
Caching forever without invalidation strategy
**Instead:** Set TTLs, implement invalidation on source updates.

### Caching Everything
Caching all responses regardless of query type
**Instead:** Analyze query patterns, cache high-frequency patterns only.

### Ignoring Provider Caching
Building custom caching when provider offers it
**Instead:** Use Anthropic prompt caching, OpenAI caching first.


## Sharp Edges (Gotchas)

*Real production issues that cause outages and bugs.*

### [HIGH] Cache miss causes latency spike with additional overhead

**Situation:** Slow response when cache miss, slower than no caching

**Why it happens:**
Cache check adds latency.
Cache write adds more latency.
Miss + overhead > no caching.


**Solution:**
```
// Optimize for cache misses, not just hits

class OptimizedCache {
    async queryWithCache(prompt: string): Promise<string> {
        const cacheKey = this.hash(prompt);

        // Non-blocking cache check
        const cachedPromise = this.cache.get(cacheKey);
        const llmPromise = this.queryLLM(prompt);

        // Race: use cache if available before LLM returns
        const cached = await Promise.race([
            cachedPromise,
            sleep(50).then(() => null)  // 50ms cache timeout
        ]);

        if (cached) {
            // Cancel LLM request if possible
            return cached;
        }

        // Cache miss: continue with LLM
        const response = await llmPromise;

        // Async cache write (don't block response)
        this.cache.set(cacheKey, response).catch(console.error);

        return response;
    }
}

// Alternative: Probabilistic caching
// Only cache if query matches known high-frequency patterns
class SelectiveCache {
    private patterns: Map<string, number> = new Map();

    shouldCache(prompt: string): boolean {
        const pattern = this.extractPattern(prompt);
        const frequency = this.patterns.get(pattern) || 0;

        // Only cache high-frequency patterns
        return frequency > 10;
    }

    recordQuery(prompt: string): void {
        const pattern = this.extractPattern(prompt);
        this.patterns.set(pattern, (this.patterns.get(pattern) || 0) + 1);
    }
}

```

**Symptoms:**
- Slow responses on cache miss
- Cache hit rate below 50%
- Higher latency than uncached

---

### [HIGH] Cached responses become incorrect over time

**Situation:** Users get outdated or wrong information from cache

**Why it happens:**
Source data changed.
No cache invalidation.
Long TTLs for dynamic data.


**Solution:**
```
// Implement proper cache invalidation

class InvalidatingCache {
    // Version-based invalidation
    private cacheVersion = 1;

    getCacheKey(prompt: string): string {
        return `v${this.cacheVersion}:${this.hash(prompt)}`;
    }

    invalidateAll(): void {
        this.cacheVersion++;
        // Old keys automatically become orphaned
    }

    // Content-hash invalidation
    async setWithContentHash(
        key: string,
        response: string,
        sourceContent: string
    ): Promise<void> {
        const contentHash = this.hash(sourceContent);
        await this.cache.set(key, {
            response,
            contentHash,
            timestamp: Date.now()
        });
    }

    async getIfValid(
        key: string,
        currentSourceContent: string
    ): Promise<string | null> {
        const cached = await this.cache.get(key);
        if (!cached) return null;

        // Check if source content changed
        const currentHash = this.hash(currentSourceContent);
        if (cached.contentHash !== currentHash) {
            await this.cache.delete(key);
            return null;
        }

        return cached.response;
    }

    // Event-based invalidation
    onSourceUpdate(sourceId: string): void {
        // Invalidate all caches that used this source
        this.invalidateByTag(`source:${sourceId}`);
    }
}

```

**Symptoms:**
- Users report wrong information
- Answers don't match current data
- Complaints about outdated responses

---

### [MEDIUM] Prompt caching doesn't work due to prefix changes

**Situation:** Cache misses despite similar prompts

**Why it happens:**
Anthropic caching requires exact prefix match.
Timestamps or dynamic content in prefix.
Different message order.


**Solution:**
```
// Structure prompts for optimal caching

class CacheOptimizedPrompts {
    // WRONG: Dynamic content in cached prefix
    buildPromptBad(query: string): SystemMessage[] {
        return [
            {
                type: "text",
                text: `You are helpful. Current time: ${new Date()}`,  // BREAKS CACHE!
                cache_control: { type: "ephemeral" }
            }
        ];
    }

    // RIGHT: Static prefix, dynamic at end
    buildPromptGood(query: string): SystemMessage[] {
        return [
            {
                type: "text",
                text: STATIC_SYSTEM_PROMPT,  // Never changes
                cache_control: { type: "ephemeral" }
            },
            {
                type: "text",
                text: STATIC_KNOWLEDGE_BASE,  // Rarely changes
                cache_control: { type: "ephemeral" }
            }
            // Dynamic content goes in messages, NOT system
        ];
    }

    // Prefix ordering matters
    buildWithConsistentOrder(components: string[]): SystemMessage[] {
        // Sort components for consistent ordering
        const sorted = [...components].sort();
        return sorted.map((c, i) => ({
            type: "text",
            text: c,
            cache_control: i === sorted.length - 1
                ? { type: "ephemeral" }
                : undefined  // Only cache the full prefix
        }));
    }
}

```

**Symptoms:**
- Cache hit rate lower than expected
- Cache creation tokens high, read low
- Similar prompts not hitting cache

---

## Collaboration

### When to Hand Off

| Trigger | Delegate To | Context |
|---------|-------------|--------|
| `context window|token` | context-window-management | Need context optimization |
| `rag|retrieval` | rag-implementation | Need retrieval system |
| `memory` | conversation-memory | Need memory persistence |

### Receives Work From

- **context-window-management**: Need caching for performance
- **rag-implementation**: RAG needs caching layer

### Works Well With

- context-window-management
- rag-implementation
- conversation-memory

---

## Get the Full Version

This skill has **automated validations**, **detection patterns**, and **structured handoff triggers** that work with the Spawner orchestrator.

```bash
npx vibeship-spawner-skills install
```

Full skill path: `~/.spawner/skills/ai-agents/prompt-caching/`

**Includes:**
- `skill.yaml` - Structured skill definition
- `sharp-edges.yaml` - Machine-parseable gotchas with detection patterns
- `validations.yaml` - Automated code checks
- `collaboration.yaml` - Handoff triggers for skill orchestration

---

*Generated by [VibeShip Spawner](https://github.com/vibeforge1111/vibeship-spawner-skills)*
