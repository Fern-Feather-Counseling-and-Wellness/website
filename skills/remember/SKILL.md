---
name: remember
description: Complete memory save - saves session to memory file, GitHub, and Hindsight with reflection. Use when you want to save the current conversation - says "remember", "save", or "backup".
license: Proprietary
metadata:
  author: Jeem & Stuart
  credits: "Original concept by Jeem & Stuart"
  version: "1.1"
  triggers:
    - remember
    - save
    - backup
    - store
  category: memory
  requires:
    - hindsight
    - github
    - filesystem
---

# Remember Trigger - Complete Memory Save

This is the most comprehensive memory save. It saves everything to local files, GitHub, AND Hindsight with reflection.

## When to Use This Skill

Triggered when the user says:
- "remember"
- "save"
- "backup"
- "store"
- Or any variation of "remember what we talked about"

---

## The Remember Process (13 Steps)

### Step 1: HINDSIGHT HEALTH CHECK

**First, verify Hindsight is operational!**

Run quick check:
```bash
curl -s https://glutinous-meda-excrescently.ngrok-free.dev/v1/default/banks/default/stats
```

If offline: Note it but continue with local + GitHub save.

### Step 2: Remember Everything in Session

Save all important details from the current chat session:
- Key decisions made
- Tasks created
- Important moments
- Topics discussed
- Personal notes

Write to today's memory file: `memory/YYYY-MM-DD.md`

**Format:**
```markdown
---

## Today's Session (Date - Time)

### Topics
- [Topic 1]
- [Topic 2]

### Decisions
- [Decision 1]

### Tasks
- [Task 1] (pending/complete)

### Personal
- [Personal note]

### #category #tags
```

### Step 3: Full GitHub Backup

```bash
cd /home/openclaw/workspace
git add .
git commit -m "Memory update $(date +%Y-%m-%d\ %H:%M)"
git push -u origin main
```

### Step 4: Store in Hindsight

Create document in Hindsight for semantic search:
```bash
curl -s -X POST https://glutinous-meda-excrescently.ngrok-free.dev/v1/default/banks/default/documents \
  -H "Content-Type: application/json" \
  -d '{"content": "...", "tags": ["session", ...]}'
```

### Step 5: Verify Saved

- Check memory file exists
- Check GitHub push succeeded
- Report any failures

---

## Priority Tagging

Mark important moments vs regular ones:

| Tag | Use For |
|-----|---------|
| #important | Big moments, milestones, praise |
| #routine | Regular updates |
| #decision | Key decisions made |
| #task | Any tasks created |
| #preference | Any preferences shared |

---

## Auto-Categorization

Auto-tag by topic type:

| Category | Topics |
|----------|--------|
| session | General conversation |
| business | AI Agent Builder, money, startup |
| personal | Family, hobbies, health |
| technical | Triggers, setup, integrations |
| OpenClaw | System configuration |

---

## Cross-Reference Links

Link to related past memories:
1. Check Hindsight for similar topics
2. Link to previous decisions on same subject
3. Tag related sessions together

---

## Confirmation Summary

After saving, tell the user:
- What was saved (topic count)
- Categories used
- Key points captured
- GitHub commit link

**Format:**
```
✅ Remember complete!

- Topics: X
- Categories: [list]
- Key points: [summary]
- GitHub: [commit link]
- Hindsight: ✅ Saved
```

---

## Real-Time Capture

During the session, keep track of:
- Key decisions made
- Tasks created
- Important moments
- Attach these to final memory when "remember" is triggered

---

## Weekly Recap

If memory file gets long (>100 lines):
- Keep last 7 days detailed
- Compress older days to highlights
- Maintain cross-references

---

## Reflect (Important!)

After saving, call Hindsight Reflect API:

```bash
curl -s --max-time 90 -X POST https://glutinous-meda-excrescently.ngrok-free.dev/v1/default/banks/default/reflect \
  -H "Content-Type: application/json" \
  -d '{"query": "What important decision or insight was captured in this session?"}'
```

**Important:**
- Use --max-time 90 (90 seconds)
- Store reflection as observation with #important tag
- This makes memory smarter, not just a log

---

## Verify Reflect

After calling reflect:
- Check "answer" field not empty
- If fails: Retry once
- If still fails: Log warning, continue anyway

---

## Verify Hindsight Storage

Confirm observation was stored:
- Check response from Hindsight API
- If fails: Log warning, proceed anyway (file + GitHub saved)

---

## Output Format

```markdown
# 💾 Remember Complete!

## What Was Saved
- **Topics:** X
- **Categories:** [list]
- **Tasks:** X pending
- **Decisions:** X made

## Key Points
- [Key point 1]
- [Key point 2]

## Tags Used
#important, #session, #category

## Status
- ✅ Memory file saved
- ✅ GitHub backed up (commit: xxx)
- ✅ Hindsight stored
- ✅ Reflect complete

## Next Steps
[Any follow-up tasks]
```

---

## Error Handling

| Error | What to Do |
|-------|------------|
| Hindsight offline | Continue with local + GitHub, note offline |
| GitHub push fails | Retry once, then alert user |
| Reflect fails | Retry once, log warning |
| File write fails | Alert user immediately |

---

## Related Skills

- `skills/study` - For loading saved memories
- `skills/hindsight` - For memory health checks
- `skills/mega-sync` - For full system check

---

## Examples

### Example 1

**Input:** "remember"
**Output:** Saved to memory file, GitHub backup, Hindsight storage, Reflect complete

### Example 2
**Input:** "remember"
**Output:** Saved to memory file, GitHub backup, Hindsight storage, Reflect complete

---

## Pro Tips

- ALWAYS run Hindsight check FIRST
- Use specific tags for better recall
- Include personal moments - they matter!
- Cross-reference previous sessions
- Run Reflect to synthesize insights
- Confirm everything saved before ending

---

## Time Estimate

| Step | Time |
|------|------|
| Hindsight check | 5s |
| Write memory file | 15s |
| GitHub push | 10s |
| Hindsight storage | 10s |
| Reflect | 30s |
| **Total** | **~1-2 min** |

---

*Skill version: 1.0 - Last updated: April 24, 2026*