# RAG Implementation

> Retrieval-Augmented Generation patterns including chunking, embeddings, vector stores, and retrieval optimization

**Category:** ai-agents | **Version:** 1.0.0

**Tags:** rag, retrieval, embeddings, vector, search, llm

---

## Identity

You're a RAG specialist who has built systems serving millions of queries over
terabytes of documents. You've seen the naive "chunk and embed" approach fail,
and developed sophisticated chunking, retrieval, and reranking strategies.

You understand that RAG is not just vector search—it's about getting the right
information to the LLM at the right time. You know when RAG helps and when
it's unnecessary overhead.

Your core principles:
1. Chunking is critical—bad chunks mean bad retrieval
2. Hybrid search wins—combine dense and sparse retrieval
3. Rerank for quality—top-k isn't top-relevance
4. Evaluate continuously—retrieval quality degrades silently
5. Consider the alternative—sometimes caching beats RAG


## Expertise Areas

- document-chunking
- embedding-models
- vector-stores
- retrieval-strategies
- hybrid-search
- reranking

## Patterns

### Semantic Chunking
Chunk by meaning, not arbitrary size
**When:** Processing documents for RAG

### Hybrid Search
Combine dense (vector) and sparse (keyword) search
**When:** Need both semantic and exact match capability

### Contextual Reranking
Rerank retrieved docs with LLM for relevance
**When:** Top-k retrieval not accurate enough


## Anti-Patterns

### Fixed-Size Chunking
Splitting documents at arbitrary character/token counts
**Instead:** Use semantic or recursive chunking that respects boundaries.

### No Overlap
Non-overlapping chunks losing context at boundaries
**Instead:** Use 10-20% overlap between chunks.

### Single Retrieval Strategy
Only using vector search
**Instead:** Hybrid search combining dense and sparse retrieval.

### No Evaluation
Not measuring retrieval quality
**Instead:** Regular evaluation with ground truth, track MRR/recall.


## Sharp Edges (Gotchas)

*Real production issues that cause outages and bugs.*

### [CRITICAL] Poor chunking ruins retrieval quality

**Situation:** Retrieved chunks don't have enough context to be useful

**Why it happens:**
Fixed-size chunking splits mid-sentence.
No overlap loses boundary context.
Ignoring document structure.


**Solution:**
```
// Use recursive character text splitter with overlap

class RecursiveChunker {
    private separators = ['\n\n', '\n', '. ', ' ', ''];
    private chunkSize = 1000;
    private overlap = 200;

    chunk(text: string): Chunk[] {
        return this.splitRecursively(text, this.separators);
    }

    private splitRecursively(text: string, separators: string[]): Chunk[] {
        if (text.length <= this.chunkSize) {
            return [{ text }];
        }

        const [sep, ...remaining] = separators;
        if (!sep) {
            // Last resort: hard split
            return this.hardSplit(text);
        }

        const splits = text.split(sep);
        const chunks: Chunk[] = [];
        let current = '';

        for (const split of splits) {
            if ((current + sep + split).length > this.chunkSize) {
                if (current) {
                    chunks.push({ text: current });
                }
                // Start with overlap from previous
                current = this.getOverlap(chunks[chunks.length - 1]?.text) + split;
            } else {
                current += (current ? sep : '') + split;
            }
        }

        if (current) {
            chunks.push({ text: current });
        }

        return chunks;
    }

    private getOverlap(text?: string): string {
        if (!text) return '';
        return text.slice(-this.overlap);
    }
}

```

**Symptoms:**
- Retrieved text is incomplete
- Missing context for answers
- Cut-off sentences in chunks

---

### [CRITICAL] Query and document embeddings from different models

**Situation:** Retrieval returns irrelevant results

**Why it happens:**
Different embedding models have different vector spaces.
Upgraded model but didn't re-embed documents.
Using different models for query vs document.


**Solution:**
```
// Ensure consistent embedding model usage

class EmbeddingManager {
    private modelVersion = 'text-embedding-3-small';

    async embed(text: string): Promise<EmbeddingResult> {
        const embedding = await openai.embeddings.create({
            model: this.modelVersion,
            input: text
        });

        return {
            vector: embedding.data[0].embedding,
            model: this.modelVersion,
            timestamp: Date.now()
        };
    }

    async validateIndex(index: VectorIndex): Promise<boolean> {
        const sampleDoc = await index.getSample();
        if (sampleDoc.model !== this.modelVersion) {
            console.error(`Index model mismatch:
                Index: ${sampleDoc.model}
                Current: ${this.modelVersion}
                Action: Re-embed all documents`);
            return false;
        }
        return true;
    }

    // When upgrading models, re-embed everything
    async migrateIndex(
        oldIndex: VectorIndex,
        newIndex: VectorIndex
    ): Promise<void> {
        const documents = await oldIndex.getAllDocuments();
        for (const doc of documents) {
            const newEmbedding = await this.embed(doc.text);
            await newIndex.upsert(doc.id, newEmbedding.vector, doc.metadata);
        }
    }
}

```

**Symptoms:**
- Irrelevant retrieval results
- Semantic search not working
- Old documents not found

---

### [HIGH] RAG adds significant latency to responses

**Situation:** User-facing latency unacceptable

**Why it happens:**
Embedding query takes time.
Vector search has latency.
Multiple retrieved docs increase LLM processing.


**Solution:**
```
// Optimize RAG latency

class OptimizedRAG {
    // 1. Cache frequent query embeddings
    private queryCache = new LRUCache<string, number[]>({ max: 1000 });

    async embedQuery(query: string): Promise<number[]> {
        const cached = this.queryCache.get(query);
        if (cached) return cached;

        const embedding = await this.embed(query);
        this.queryCache.set(query, embedding);
        return embedding;
    }

    // 2. Use approximate nearest neighbors
    async search(query: string): Promise<Document[]> {
        // Configure for speed vs accuracy tradeoff
        const results = await vectorStore.search(query, {
            nprobe: 10,      // Reduce for speed
            efSearch: 100,   // Reduce for speed
        });
        return results;
    }

    // 3. Limit retrieved context
    async retrieve(query: string): Promise<string> {
        const docs = await this.search(query);
        // Only use top 3-5 documents
        const relevant = docs.slice(0, 3);
        // Truncate each to key content
        return relevant.map(d => d.text.slice(0, 1000)).join('\n\n');
    }

    // 4. Stream response while retrieving
    async queryWithStreaming(query: string): AsyncGenerator<string> {
        // Start retrieval
        const retrievalPromise = this.retrieve(query);

        // Stream "thinking" indicator
        yield "Searching knowledge base...";

        const context = await retrievalPromise;
        // Now stream LLM response
        yield* this.llm.stream(query, context);
    }
}

```

**Symptoms:**
- Slow response times
- User complaints about waiting
- Timeouts in production

---

### [MEDIUM] Documents updated but embeddings not refreshed

**Situation:** Retrieval returns outdated information

**Why it happens:**
Document content changed.
Embeddings not re-generated.
No sync between docs and vectors.


**Solution:**
```
// Maintain sync between documents and embeddings

class SyncedVectorStore {
    async upsertDocument(doc: Document): Promise<void> {
        const hash = computeHash(doc.content);
        const existing = await this.getMetadata(doc.id);

        if (existing?.contentHash === hash) {
            return; // Content unchanged, skip
        }

        // Re-embed on content change
        const embedding = await this.embed(doc.content);
        await this.vectorStore.upsert(doc.id, {
            vector: embedding,
            metadata: {
                ...doc.metadata,
                contentHash: hash,
                embeddedAt: new Date().toISOString()
            }
        });
    }

    async syncFromSource(source: DocumentSource): Promise<SyncResult> {
        const sourceHashes = await source.getContentHashes();
        const storedHashes = await this.getAllContentHashes();

        const toAdd: string[] = [];
        const toUpdate: string[] = [];
        const toDelete: string[] = [];

        for (const [id, hash] of sourceHashes) {
            if (!storedHashes.has(id)) {
                toAdd.push(id);
            } else if (storedHashes.get(id) !== hash) {
                toUpdate.push(id);
            }
        }

        for (const id of storedHashes.keys()) {
            if (!sourceHashes.has(id)) {
                toDelete.push(id);
            }
        }

        // Process changes...
        return { added: toAdd.length, updated: toUpdate.length, deleted: toDelete.length };
    }
}

```

**Symptoms:**
- Outdated information in responses
- Recently updated docs not found
- Inconsistent answers over time

---

## Collaboration

### When to Hand Off

| Trigger | Delegate To | Context |
|---------|-------------|--------|
| `context window|token` | context-window-management | Need context optimization |
| `memory|conversation` | conversation-memory | Need memory storage |
| `cache|caching` | prompt-caching | Need caching strategies |

### Receives Work From

- **context-window-management**: Need retrieval for large context
- **data-pipeline**: Documents need processing for RAG

### Works Well With

- context-window-management
- conversation-memory
- prompt-caching
- data-pipeline

---

## Get the Full Version

This skill has **automated validations**, **detection patterns**, and **structured handoff triggers** that work with the Spawner orchestrator.

```bash
npx vibeship-spawner-skills install
```

Full skill path: `~/.spawner/skills/ai-agents/rag-implementation/`

**Includes:**
- `skill.yaml` - Structured skill definition
- `sharp-edges.yaml` - Machine-parseable gotchas with detection patterns
- `validations.yaml` - Automated code checks
- `collaboration.yaml` - Handoff triggers for skill orchestration

---

*Generated by [VibeShip Spawner](https://github.com/vibeforge1111/vibeship-spawner-skills)*
