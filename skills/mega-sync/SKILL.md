---
name: mega-sync
description: Complete system health check combining OpenClaw, Hindsight, and GitHub. Runs full sync with memory verification and reflect. Use when you need a comprehensive status check - says "mega sync", "full system check", or "check everything".
license: Proprietary
metadata:
  author: Jeem & Stuart
  credits: "Original concept by Jeem & Stuart"
  version: "1.1"
  triggers:
    - mega sync
    - system check
    - check everything
    - full system
  category: system
  requires:
    - hindsight
    - github
    - openclaw
---

# Mega Sync - Complete System Health Check

This is the most comprehensive system check. It combines multiple health checks into one unified report.

## When to Use This Skill

Triggered when the user says:
- "mega sync"
- "system check"
- "check everything"
- "full system"
- "status"

---

## The Mega Sync Process (6 Steps)

### Step 1: Full Sync - OpenClaw Status

Run OpenClaw status check:
```bash
openclaw status
```

Verify:
- Gateway running
- Model loaded (should be MiniMax M2.5)
- Session count
- Channel connections (Discord, Telegram)

### Step 2: Hindsight Health Check (18-point)

Call Hindsight API endpoints in sequence:

| # | Check | Endpoint | Purpose |
|---|-------|----------|---------|
| 1 | Health | GET /health | Database connection |
| 2 | Version | GET /version | API version |
| 3 | Bank | GET /v1/default/banks | Verify bank exists |
| 4 | Profile | GET /v1/default/banks/default/profile | Bank settings |
| 5 | Config | GET /v1/default/banks/default/config | Configuration |
| 6 | Directives | GET /v1/default/banks/default/directives | Active rules |
| 7 | Memories | GET /v1/default/banks/default/memories/list | Memory count |
| 8 | Entities | GET /v1/default/banks/default/entities | Stored entities |
| 9 | Mental Models | GET /v1/default/banks/default/mental-models | Synthesized insights |
| 10 | Documents | GET /v1/default/banks/default/documents | Stored docs |
| 11 | Tags | GET /v1/default/banks/default/tags | Tags in use |
| 12 | Graph | GET /v1/default/banks/default/graph | Node/link connections |
| 13 | Stats | GET /v1/default/banks/default/stats | Comprehensive stats |
| 14 | Operations | GET /v1/default/banks/default/operations | Pending/failed ops |
| 15 | Recall Test | POST /v1/default/banks/default/memories/recall | Test semantic search |
| 16 | Reflect | POST /v1/default/banks/default/reflect | Synthesize memories |

**CRITICAL API STRUCTURE:**
- Base URL: `https://glutinous-meda-excrescently.ngrok-free.dev`
- Use `/v1/default/banks/default/` prefix for most endpoints
- Use `/list` suffix for memories: `/memories/list` NOT `/memories`

### Step 3: GitHub Status

Check GitHub repository state:
```bash
git status
git log --oneline -5
```

Verify:
- Working directory clean or what files changed
- Last commit
- Branch status

### Step 4: Cross-Reference (Optional)

Compare memory vs actual state:
- Check recent memory files
- Verify what's in memory vs what's in code
- Note any discrepancies

### Step 5: RUN REFLECT

After all checks complete, call Hindsight Reflect API:

```bash
curl -s --max-time 90 -X POST https://glutinous-meda-excrescently.ngrok-free.dev/v1/default/banks/default/reflect \
  -H "Content-Type: application/json" \
  -d '{"query": "What is the current state of the human-AI partnership?"}'
```

**Important:**
- Use --max-time 90 (90 seconds) for slow responses
- Include synthesized insight in the report
- If fails: retry once
- If still fails: log warning, continue anyway

### Step 6: Verify Reflect

After calling reflect:
- Check response has "answer" field not empty
- If empty: retry once
- Report any failures

---

## Output Format

Present ONE unified status report:

```markdown
## Mega Sync Results

| System | Status | Details |
|--------|--------|---------|
| OpenClaw | ✅ Running | Model: MiniMax M2.5 |
| Hindsight | ✅ 264 nodes, 8072 links | 111 observations |
| GitHub | ✅ Up to date | Last commit: xxx |
| Reflect | ✅ Complete | Partnership insight: ...

### Key Stats
- Memories: X
- Entities: X  
- Pending Operations: X
- Failed Operations: X
```

---

## Error Handling

| Error | What to Do |
|-------|------------|
| Hindsight offline | Show "Memory: Offline" - continue with local checks |
| GitHub not synced | Show what needs commit |
| Reflect fails | Retry once, then note "Reflect: Pending" |
| OpenClaw slow | Wait up to 30 seconds |

---

## Related Skills

- `skills/brainstorm` - For creative problem-solving
- `skills/study` - For memory refresh
- `skills/remember` - For memory save

---

## Examples

### Example 1

**Input:** "mega sync"
**Output:** Unified status report (OpenClaw ✅, Hindsight ✅, GitHub ✅, Reflect complete)

### Example 2
**Input:** "mega sync"
**Output:** Unified status report (OpenClaw ✅, Hindsight ✅, GitHub ✅, Reflect complete)

---

## Pro Tips

- Always run Reflect during Mega Sync - it synthesizes memories!
- Show the partnership insight in your report
- Be specific with numbers (nodes, links, commits)
- Note any warnings but don't alarm - present solutions

---

*Skill version: 1.0 - Last updated: April 24, 2026*