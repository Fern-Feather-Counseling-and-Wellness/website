---
name: hindsight
description: Full memory system check - 18-point health check, recall test, reflect, entity timeline. Use when you need to check memory health - says "hindsight" or "memory check".
license: Proprietary
metadata:
  author: Jeem & Stuart
  credits: "Original concept by Jeem & Stuart"
  version: "1.1"
  triggers:
    - hindsight
    - memory check
    - memory status
  category: system
  requires:
    - hindsight_api
    - curl
---

# Hindsight Trigger - Full Memory System Check

This skill runs a comprehensive 18-point health check on Hindsight, our long-term memory system. It verifies connectivity, functionality, and creates mental models.

## When to Use This Skill

Triggered when the user says:
- "hindsight"
- "memory check"
- "memory status"
- "check my memory"
- "is memory working"

---

## The Hindsight Process (18 Steps)

### Step 1: HEALTH CHECK

Verify database connection:
```bash
curl -s https://glutinous-meda-excrescently.ngrok-free.dev/health
```
Check: status, database connection

### Step 2: WRITE TEST

Test write capability:
```bash
curl -s -X POST https://glutinous-meda-excrescently.ngrok-free.dev/v1/default/banks/default/documents \
  -H "Content-Type: application/json" \
  -d '{"content": "Test document", "tags": ["test"]}'
```
**Note:** Create temp doc, then delete it after test.

**🔗 OpenAPI Spec Reference:**

For latest API endpoints, always check:

```bash

curl -s https://glutinous-meda-excrescently.ngrok-free.dev/openapi.json

```

This returns the complete OpenAPI specification with all available endpoints.


### Step 3: VERSION

Check API version and features:
```bash
curl -s https://glutinous-meda-excrescently.ngrok-free.dev/version
```

### Step 4: BANK INFO

Verify bank exists:
```bash
curl -s https://glutinous-meda-excrescently.ngrok-free.dev/v1/default/banks
```

### Step 5: PROFILE

Get bank settings:
```bash
curl -s https://glutinous-meda-excrescently.ngrok-free.dev/v1/default/banks/default/profile
```

### Step 6: CONFIG

Get configuration details:
```bash
curl -s https://glutinous-meda-excrescently.ngrok-free.dev/v1/default/banks/default/config
```

### Step 7: DIRECTIVES

List all active directives:
```bash
curl -s https://glutinous-meda-excrescently.ngrok-free.dev/v1/default/banks/default/directives
```

### Step 8: MEMORIES

Count total memories:
```bash
curl -s https://glutinous-meda-excrescently.ngrok-free.dev/v1/default/banks/default/memories/list
```
**Note:** Must use `/list` suffix!

### Step 9: ENTITIES

Count stored entities:
```bash
curl -s https://glutinous-meda-excrescently.ngrok-free.dev/v1/default/banks/default/entities
```

### Step 10: MENTAL MODELS

Get synthesized insights:
```bash
curl -s https://glutinous-meda-excrescently.ngrok-free.dev/v1/default/banks/default/mental-models
```

**CREATE INSIGHT:** After check, synthesize key observations from current session into a mental model:
- "Jeem focused on business growth"
- "Partnership deepened today"
- "Skills system launched"

### Step 11: DOCUMENTS

Count stored documents:
```bash
curl -s https://glutinous-meda-excrescently.ngrok-free.dev/v1/default/banks/default/documents
```

### Step 12: TAGS

List all tags in use:
```bash
curl -s https://glutinous-meda-excrescently.ngrok-free.dev/v1/default/banks/default/tags
```

### Step 13: GRAPH

Verify node/link connections:
```bash
curl -s https://glutinous-meda-excrescently.ngrok-free.dev/v1/default/banks/default/graph
```

### Step 14: STATS

Get comprehensive statistics:
```bash
curl -s https://glutinous-meda-excrescently.ngrok-free.dev/v1/default/banks/default/stats
```
Display: nodes, links, entities, memories, documents, tags

### Step 15: OPERATIONS

Check pending/failed operations:
```bash
curl -s https://glutinous-meda-excrescently.ngrok-free.dev/v1/default/banks/default/operations
```

### Step 16: RECALL TEST

Test semantic search with cross-encoder:
```bash
curl -s -X POST https://glutinous-meda-excrescently.ngrok-free.dev/v1/default/banks/default/memories/recall \
  -H "Content-Type: application/json" \
  -d '{"query": "What is the state of the human-AI partnership?"}'
```
**Note:** Must use POST, not GET!

### Step 17: RUN REFLECT

Trigger memory synthesis:
```bash
curl -s --max-time 90 -X POST https://glutinous-meda-excrescently.ngrok-free.dev/v1/default/banks/default/reflect \
  -H "Content-Type: application/json" \
  -d '{"query": "What insights emerged from this session?"}'
```
Creates mental models from recent memories.

### Step 18: ENTITY TIMELINE

Query recent entity changes:
- Show how key entities (Jeem, Sara, triggers) evolved
- Note changes in relationships or attributes

### Step 19: CONSOLIDATION CHECK

Check last consolidation time:
- Report when last consolidation ran
- Suggest if consolidation is needed

---

## ⚠️ CRITICAL API STRUCTURE

**Base URL:** `https://glutinous-meda-excrescently.ngrok-free.dev`

**Common Mistakes (404s):**
| WRONG | CORRECT |
|-------|---------|
| `/memories` | `/memories/list` |
| `/entries` | `/v1/default/banks/default/entities` |
| GET `/memories/recall` | POST `/memories/recall` |

**Always check:** `GET /openapi.json` for correct paths!

---

## Output Format

```markdown
# Hindsight Health Check 🔍

## Status: ✅ CONNECTED

### Test Results
| Test | Status |
|------|--------|
| Health Check | ✅ |
| Write Test | ✅ |
| Version | ✅ 1.0 |
| Bank Info | ✅ |
| Profile | ✅ |
| Config | ✅ |
| Directives | ✅ 8 active |
| Memories | ✅ X total |
| Entities | ✅ X stored |
| Mental Models | ✅ X insights |
| Documents | ✅ X stored |
| Tags | ✅ X tags |
| Graph | ✅ X nodes/links |
| Stats | ✅ |
| Operations | ✅ 0 pending |
| Recall Test | ✅ |
| Reflect | ✅ |
| Consolidation | ✅ |

### Key Stats
- Nodes: X
- Links: X
- Observations: X
- Last Consolidation: [date]

### Entity Timeline
[Summary of entity changes]

### Reflect Results
[Synthesis insights]
```

---

## Error Handling

| Error | What to Do |
|-------|------------|
| 404 on endpoint | Check /openapi.json for correct path |
| Connection failed | Report offline, use fallback |
| Reflect timeout | Retry once, log warning |

---

## Related Skills

- `skills/study` - Uses Hindsight for memory refresh
- `skills/remember` - Stores in Hindsight
- `skills/mega-sync` - Includes Hindsight check

---

## Examples

### Example 1

**Input:** "hindsight"
**Output:** 18-point health check results, stats, directives, reflect synthesis

### Example 2
**Input:** "hindsight"
**Output:** 18-point health check results, stats, directives, reflect synthesis

---

## Pro Tips

- Always verify `/list` suffix for memories
- Use POST for recall, not GET
- Run Reflect to synthesize insights
- Check OpenAPI spec if getting 404s

---

## Time Estimate

| Step | Time |
|------|------|
| Health + Basic | 10s |
| Detailed checks | 30s |
| Reflect | 90s |
| **Total** | **~2-3 min** |

---

*Skill version: 1.0 - Last updated: April 24, 2026*