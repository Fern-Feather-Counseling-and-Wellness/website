# Memory System Alternatives for OpenClaw (2026 Update)
## Comprehensive Research & Recommendation for Nicole

**Date:** March 20, 2026, 6:20 AM UTC  
**Researcher:** Ronda  
**Goal:** Find automatic memory solution that doesn't require Chinese phone numbers or manual saving

**NEW FINDINGS:** Discovered Hindsight (open source, local-first) and QMD (hybrid retrieval) as superior alternatives to previous recommendations.

---

## Executive Summary

**Recommended Solution: Hindsight (@vectorize-io/hindsight-openclaw)**  
**Why:** Open source, local-first, automatic capture & recall, no cloud dependency, privacy-focused, designed specifically for OpenClaw.

**Backup Option: QMD (Query-Memory-Document)**  
**Why:** Hybrid retrieval improves search accuracy dramatically while keeping existing Markdown files.

**Secondary Option: Cognee**  
**Why:** Knowledge graph with free tier, but cloud dependency.

**Eliminated:** OpenViking (requires Chinese phone number), Friend's Python approach (requires manual saving)

---

## Problem Statement

Nicole needs:
- ✅ **Automatic memory** — no "remember to save" commands
- ✅ **No Chinese phone numbers** — Volcengine/OpenViking blocked
- ✅ **Free or low-cost** — minimal ongoing expenses
- ✅ **OpenClaw integration** — works with our existing setup
- ✅ **Actually works** — not theoretical, proven implementation
- ✅ **Privacy-focused** — local-first preferred

---

## Options Evaluated (Ranked)

### 1. Hindsight (@vectorize-io/hindsight-openclaw) ★★★★☆ **BEST**

**What it is:** Open-source memory engine that replaces OpenClaw's memory layer with automated, structured knowledge extraction.

**How it works:**
- **Automatic capture:** Every conversation captured after each turn without agent deciding what to remember
- **Structured knowledge:** Extracts facts, entities, relationships (not just text)
- **Auto-recall:** Injects relevant memory into context before every agent response
- **Local-first:** Runs via `hindsight-embed` daemon (bundles API + PostgreSQL)
- **Feedback loop prevention:** Strips its own memory tags to avoid duplicates

**Pros:**
- ✅ **Open source & local-first** — your data stays on your machine
- ✅ **Automatic capture & recall** — no manual commands needed
- ✅ **Structured knowledge** — facts, entities, relationships
- ✅ **Privacy-focused** — no cloud dependency
- ✅ **No regional restrictions**
- ✅ **Specifically designed for OpenClaw**
- ✅ **Free** — no costs except optional LLM for extraction

**Cons:**
- ⚠️ **Requires LLM for extraction** (but can use cheap models like gpt-4o-mini)
- ⚠️ **First-run downloads ~3GB** of dependencies (one-time)
- ⚠️ **Early project** — but actively maintained

**Installation:**
```bash
# Install plugin
openclaw plugins install @vectorize-io/hindsight-openclaw

# That's it — plugin auto-starts daemon on port 9077
# Configure LLM provider via environment variables
export OPENAI_API_KEY="your_key"  # or ANTHROPIC_API_KEY, GEMINI_API_KEY, etc.
```

**Pricing:** Free (open source). Optional cloud version for teams.

**Why it's #1:** Solves all requirements: automatic, no Chinese phone, free, local, privacy-focused, designed for OpenClaw.

---

### 2. QMD (Query-Memory-Document) ★★★☆☆ **EXCELLENT RETRIEVAL**

**What it is:** Hybrid retrieval backend that combines keyword (BM25) and vector search for dramatically improved recall.

**How it works:**
- Runs keyword and vector search in parallel
- Re-ranks combined results
- Works with existing Markdown files
- Local sidecar service (no cloud)

**Pros:**
- ✅ **Massively improves recall** — hybrid search beats pure vector
- ✅ **Local** — runs as sidecar service
- ✅ **Works with existing files** — no migration needed
- ✅ **Free & open source**
- ✅ **No external dependencies**

**Cons:**
- ⚠️ **Improves retrieval, not capture** — still need to write memory files
- ⚠️ **Additional service to run** (sidecar)
- ⚠️ **Doesn't extract structured knowledge**

**Installation:**
```bash
# Install QMD
bun install -g https://github.com/tobi/qmd

# Start service
qmd

# Configure OpenClaw
# Add to openclaw.json: memory.backend = "qmd"
```

**Pricing:** Free (open source).

**Best for:** When retrieval quality is the main problem, not capture automation.

---

### 3. Cognee (@cognee/cognee-openclaw) ★★★☆☆ **GOOD CLOUD OPTION**

**What it is:** Knowledge graph memory system that works with OpenClaw's existing Markdown memory files.

**Pros:**
- ✅ **Free tier available** (developer plan)
- ✅ **Zero-config with existing files**
- ✅ **Automatic** — no manual commands needed
- ✅ **Knowledge graph** — smarter than vector search
- ✅ **No regional restrictions**

**Cons:**
- ⚠️ **Cloud service** (though free tier exists)
- ⚠️ **Early project** — less mature than Mem0
- ⚠️ **Potential bugs** (some GitHub issues reported)

**Pricing:**
- **Free:** Build and run memory workflows, auto-generate knowledge structures
- **Developer:** $35/month for 1,000 documents or 1 GB
- **Our use case:** Free tier should be sufficient

---

### 4. Mem0 Self-Hosted (tensakulabs/openclaw-mem0) ★★☆☆☆ **COMPLEX BUT CONTROL**

**What it is:** Vector-based memory system with self-hosted option using any OpenAI-compatible provider.

**Pros:**
- ✅ **Fully self-hosted** — you control all data
- ✅ **No monthly fees** (except minimal OpenRouter costs)
- ✅ **Mature ecosystem** — Mem0 is established
- ✅ **No regional restrictions**

**Cons:**
- ⚠️ **Complex setup** — requires QDrant + OpenRouter + FastAPI server
- ⚠️ **Multiple components** — more things that can break
- ⚠️ **Manual configuration** — JSON config with API keys
- ⚠️ **Costs for embeddings** (~$0.02 per million tokens)

**Pricing:**
- **Mem0:** Free (self-hosted)
- **OpenRouter:** ~$0.02 per million embedding tokens

---

## Comparison Table

| Feature | **Hindsight** | **QMD** | **Cognee** | **Mem0 Self-Hosted** |
|---------|--------------|---------|------------|---------------------|
| **Type** | Automatic extraction + recall | Hybrid retrieval | Knowledge graph | Automatic extraction |
| **Local/Cloud** | Local-first | Local | Cloud (free tier) | Self-hosted |
| **Cost** | Free | Free | Free tier → $35/mo | Free + embedding costs |
| **Automatic Capture** | ✅ Yes | ❌ No | ✅ Yes | ✅ Yes |
| **Automatic Recall** | ✅ Yes | N/A | ✅ Yes | ✅ Yes |
| **Structured Knowledge** | ✅ Facts, entities | ❌ Text chunks | ✅ Knowledge graph | ❌ Vector embeddings |
| **Setup Complexity** | Low | Medium | Low | High |
| **Privacy** | ✅ Local | ✅ Local | ⚠️ Cloud | ✅ Self-hosted |
| **Chinese Phone Required** | ❌ No | ❌ No | ❌ No | ❌ No |
| **OpenClaw Integration** | ✅ Native plugin | ✅ Memory backend | ✅ Native plugin | ✅ Community plugin |

---

## Recommendation

### Primary: Hindsight
**Why:** It's exactly what you asked for — automatic, no manual saving, no Chinese phones, free, local, privacy-focused, and designed for OpenClaw.

**Implementation time:** 5 minutes  
**Steps:**
1. `openclaw plugins install @vectorize-io/hindsight-openclaw`
2. `export OPENAI_API_KEY="your_key"` (or use Claude Code/OpenAI Codex for free)
3. Restart gateway

**What changes:**
- Every conversation automatically captured
- Facts extracted in background
- Relevant memories injected before each response
- No more "I don't remember"

### Backup: QMD
If Hindsight has issues, QMD dramatically improves retrieval while we keep current manual memory system.

### Fallback: Cognee
If you prefer cloud simplicity over local setup.

---

## Next Steps

1. **Try Hindsight now** (5 minutes):
   ```bash
   openclaw plugins install @vectorize-io/hindsight-openclaw
   export OPENAI_API_KEY="your_openai_key"  # optional — can use free Claude Code
   # Restart gateway
   ```

2. **Test with a conversation** — tell me something important, close tab, reopen, ask about it.

3. **If issues:** Switch to QMD for improved retrieval while we debug.

**No more research needed — we have the solution.** Hindsight checks every box. Let's implement it.

---

## Resources

- **Hindsight GitHub:** https://github.com/vectorize-io/hindsight
- **Hindsight OpenClaw Docs:** https://hindsight.vectorize.io/sdks/integrations/openclaw
- **QMD GitHub:** https://github.com/tobi/qmd
- **Cognee:** https://github.com/cognee-api/cognee-openclaw
- **Mem0 Self-Hosted:** https://github.com/tensakulabs/openclaw-mem0
- **Comparison Article:** https://lumadock.com/tutorials/openclaw-advanced-memory-management

---

*Research updated after discovering Hindsight and QMD — both superior to previous options.*