# Memory System Alternatives for OpenClaw (2026)
## Comprehensive Research & Recommendation for Nicole

**Date:** March 20, 2026  
**Researcher:** Ronda  
**Goal:** Find automatic memory solution that doesn't require Chinese phone numbers or manual saving

---

## Executive Summary

**Recommended Solution: Cognee**  
**Why:** Works with existing memory files, free tier available, simpler setup than alternatives, no regional restrictions.

**Backup Option:** Mem0 self-hosted with OpenRouter  
**Why:** More control but complex setup requiring QDrant database.

**Eliminated:** OpenViking (requires Chinese phone number), Friend's Python approach (requires manual saving)

---

## Problem Statement

Nicole needs:
- ✅ **Automatic memory** — no "remember to save" commands
- ✅ **No Chinese phone numbers** — Volcengine/OpenViking blocked
- ✅ **Free or low-cost** — minimal ongoing expenses
- ✅ **OpenClaw integration** — works with our existing setup
- ✅ **Actually works** — not theoretical, proven implementation

---

## Options Evaluated

### 1. Cognee (@cognee/cognee-openclaw)

**What it is:** Knowledge graph memory system that works with OpenClaw's existing Markdown memory files.

**How it works:**
- Reads your `MEMORY.md` and `memory/*.md` files
- Builds a knowledge graph automatically
- Injects relevant context before each agent response
- Updates graph as new memories are added

**Pros:**
- ✅ **Free tier** available (developer plan)
- ✅ **Zero-config with existing files** — works with what we already have
- ✅ **Automatic** — no manual commands needed
- ✅ **Knowledge graph** — smarter than vector search alone
- ✅ **Open source** — self-hostable if needed
- ✅ **No regional restrictions**

**Cons:**
- ⚠️ **Cloud service** (but free tier exists)
- ⚠️ **Early project** — less mature than Mem0
- ⚠️ **Potential bugs** (some GitHub issues reported)

**Pricing:**
- **Free:** Build and run memory workflows, auto-generate knowledge structures, 28+ data sources
- **Developer:** $35/month for 1,000 documents or 1 GB
- **Our use case:** Free tier should be sufficient for conversation memory

**Installation:**
```bash
# Install plugin
openclaw plugins install @cognee/cognee-openclaw

# Configure (minimal config needed)
openclaw config set memory.provider cognee
```

---

### 2. Mem0 Self-Hosted (tensakulabs/openclaw-mem0)

**What it is:** Vector-based memory system with self-hosted option using any OpenAI-compatible provider.

**How it works:**
- Requires QDrant vector database (runs locally)
- Uses OpenRouter for embeddings (or other provider)
- Auto-recall and auto-capture features
- More manual configuration needed

**Pros:**
- ✅ **Fully self-hosted** — you control all data
- ✅ **No monthly fees** (except minimal OpenRouter costs)
- ✅ **Mature ecosystem** — Mem0 is established
- ✅ **Dual mode** — can switch to cloud if needed
- ✅ **No regional restrictions**

**Cons:**
- ⚠️ **Complex setup** — requires QDrant + OpenRouter
- ⚠️ **Multiple components** — more things that can break
- ⚠️ **Manual configuration** — JSON config with API keys
- ⚠️ **Costs for embeddings** (~$0.02 per million tokens)

**Pricing:**
- **Mem0:** Free (self-hosted)
- **OpenRouter:** ~$0.02 per million embedding tokens (negligible for our use)
- **QDrant:** Free (open source)

**Installation (complex):**
```bash
# 1. Install QDrant (vector database)
docker run -d -p 6333:6333 qdrant/qdrant

# 2. Install Mem0 plugin
openclaw plugins install github:tensakulabs/openclaw-mem0

# 3. Complex JSON config required
# (See full config in appendix)
```

---

### 3. OpenViking (Official)

**Status: ELIMINATED**

**Why:** Requires Chinese phone number for Volcengine API key. This is a non-starter for Nicole.

**Alternative:** Friend's fork (`heyron-ai/openviking`) might not need API key, but:
- Requires manual saving (against requirements)
- Python server + CLI setup
- Not automatic

---

### 4. Other Options (Briefly Considered)

**QMD:** Too experimental, not enough documentation
**Obsidian Integration:** Manual, not automatic
**Native OpenClaw Memory:** What we have now — loses context between sessions
**Manual Improvements:** Better templates, but still manual

---

## Detailed Comparison

| Feature | **Cognee** | **Mem0 Self-Hosted** | **OpenViking** |
|---------|------------|---------------------|---------------|
| **Automatic** | ✅ Yes | ✅ Yes | ⚠️ Manual (friend's fork) |
| **Cost** | Free tier | ~$0.02/million tokens | ❌ Chinese phone required |
| **Setup Complexity** | Low | High | Medium |
| **Data Ownership** | Cloud (free tier) | Self-hosted | Self-hosted |
| **OpenClaw Integration** | Native plugin | Native plugin | Native plugin (broken) |
| **Learning Curve** | Low | High | Medium |
| **Maintenance** | None (cloud) | High (self-hosted) | Medium |
| **Recommended For** | **Nicole** | Technical users | N/A (blocked) |

---

## Recommendation: Cognee

**Why Cognee is the right choice for Nicole:**

1. **It Just Works™** — Install plugin, it reads existing memory files, done
2. **Free** — No costs unless you exceed free tier (unlikely for memory)
3. **Automatic** — No manual saving, no commands to remember
4. **Builds on what we have** — Uses `MEMORY.md` and `memory/*.md` files
5. **Smart retrieval** — Knowledge graph > vector search for conversations

**Potential concerns addressed:**
- **"But it's cloud!"** → Free tier, can export data, open source option exists
- **"But bugs!"** → Active development, issues being fixed
- **"But new project!"** → Growing rapidly, 2026 momentum

---

## Implementation Plan

### Phase 1: Install & Test (15 minutes)
```bash
# Step 1: Install Cognee plugin
openclaw plugins install @cognee/cognee-openclaw

# Step 2: Configure (if auto-config doesn't work)
openclaw config set memory.provider cognee

# Step 3: Restart gateway
# (Gateway auto-restarts after config change)
```

### Phase 2: Verify (5 minutes)
1. Have a short conversation
2. Check if memories are automatically retrieved in new session
3. Verify `MEMORY.md` updates automatically

### Phase 3: Monitor (Ongoing)
- Watch for any issues in gateway logs
- Test recall across multiple sessions
- Adjust if needed

---

## Fallback Plan: Mem0 Self-Hosted

If Cognee doesn't work:

1. **Install QDrant:**
   ```bash
   docker run -d -p 6333:6333 --name qdrant qdrant/qdrant
   ```

2. **Install Mem0 plugin:**
   ```bash
   openclaw plugins install github:tensakulabs/openclaw-mem0
   ```

3. **Configure with OpenRouter:**
   ```json
   {
     "plugins": {
       "entries": {
         "openclaw-mem0": {
           "config": {
             "mode": "open-source",
             "userId": "nicole",
             "autoCapture": true,
             "autoRecall": true,
             "oss": {
               "embedder": {
                 "provider": "openai",
                 "config": {
                   "apiKey": "${OPENROUTER_API_KEY}",
                   "baseURL": "https://openrouter.ai/api/v1",
                   "model": "openai/text-embedding-3-small"
                 }
               },
               "vectorStore": {
                 "provider": "qdrant",
                 "config": {
                   "host": "localhost",
                   "port": 6333,
                   "collectionName": "memories"
                 }
               },
               "llm": {
                 "provider": "openai",
                 "config": {
                   "apiKey": "${OPENROUTER_API_KEY}",
                   "baseURL": "https://openrouter.ai/api/v1",
                   "model": "openai/gpt-4o-mini"
                 }
               }
             }
           }
         }
       }
     }
   }
   ```

---

## Next Steps

1. **Nicole approves** Cognee approach
2. **Install plugin** (simple command)
3. **Test automatic memory** (have conversation, check recall)
4. **Celebrate** no more "remember when I said..."

**Time to solution:** 20 minutes if we go with Cognee.

---

## Appendix: Research Sources

1. **Cognee Documentation:** https://docs.cognee.ai/integrations/openclaw-integration
2. **Mem0 OpenClaw Plugin:** https://github.com/tensakulabs/openclaw-mem0
3. **Comparison Article:** https://vectorize.io/articles/mem0-vs-cognee
4. **OpenViking Issue:** Chinese phone requirement confirmed
5. **OpenRouter Pricing:** $0.02 per million embedding tokens

---

## Decision Needed

**Nicole, which option do you want to try?**

- **Option A: Cognee** (Recommended) — Simple, free, automatic
- **Option B: Mem0 Self-Hosted** — More control, complex setup
- **Option C: Something else** — Tell me what you're thinking

**Your call.** I'll implement whatever you choose. 😏