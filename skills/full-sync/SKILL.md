---
name: full-sync
description: Complete synchronization - Hindsight health + directives + reflect + GitHub ingest + recall + cron status. Use when you need full system sync - says "full sync" or "sync everything".
license: Proprietary
metadata:
  author: Jeem & Stuart
  credits: "Original concept by Jeem & Stuart"
  version: "1.1"
  triggers:
    - full sync
    - sync everything
    - complete sync
  category: system
  requires:
    - hindsight
    - github
    - filesystem
    - skills/hindsight
---

# Full Sync - Complete System Synchronization

This skill performs a complete synchronization combining ALL memory operations. It's the most comprehensive sync available.

## When to Use This Skill

Triggered when the user says:
- "full sync"
- "sync everything"
- "complete sync"
- "full system sync"

---

## The Full Sync Process (13 Steps)

### Step 1: HINDSIGHT HEALTH CHECK (18-Point)

Run full 18-point check using `skills/hindsight/SKILL.md`:
- Health, Version, Bank, Profile, Config
- Directives, Memories, Entities, Mental Models
- Documents, Tags, Graph, Stats, Operations
- Recall test, RUN REFLECT, ENTITY TIMELINE, CONSOLIDATION CHECK

**API Base:** `https://glutinous-meda-excrescently.ngrok-free.dev`

### Step 2: DIRECTIVES

Query Hindsight for active rules:
```bash
curl -s https://glutinous-meda-excrescently.ngrok-free.dev/v1/default/banks/default/directives
```
Extract:
- Voice preferences (Jeem=Onyx/Will, Sara=Davis)
- Communication style
- Memory protocol
- Birthday awareness

### Step 3: REFLECT

Trigger Hindsight to synthesize memories:
```bash
curl -s --max-time 90 -X POST https://glutinous-meda-excrescently.ngrok-free.dev/v1/default/banks/default/reflect \
  -H "Content-Type: application/json" \
  -d '{"query": "What is the current state of our system and partnership?"}'
```

### Step 4: INGEST

Read current GitHub state:
- README.md
- Config files
- Recent commits (last 10)
- Skills directory

```bash
git log --oneline -10
git status
```

### Step 5: RECALL

Call Hindsight for recent design discussions:
```bash
curl -s -X POST https://glutinous-meda-excrescently.ngrok-free.dev/v1/default/banks/default/memories/recall \
  -H "Content-Type: application/json" \
  -d '{"query": "What design decisions have we made recently?"}'
```

### Step 6: CROSS-REFERENCE

Compare what's in memory vs what's in the code:
- Check if skills referenced in SOUL.md actually exist
- Verify trigger definitions match skill files
- Note any discrepancies

### Step 7: CRON STATUS

Check HEARTBEAT.md for scheduled tasks:
- backup_to_github: daily midnight (Saskatchewan)
- morning_update: daily 8am (Saskatchewan)
- sara_morning_update: daily 8:05am (Saskatchewan)
- tts_health_check: daily 6am (Saskatchewan)
- weekly_summary: Sunday 5pm (Saskatchewan)
- full_sync_morning: daily 8:30am (Saskatchewan)
- full_sync_evening: daily 8pm (Saskatchewan)

### Step 8: CHANGE DETECTION

Show what's new since last sync:
- New commits since last check
- New memories added
- New directives created
- Updated configurations

### Step 9: SYNC TIMESTAMPS

Track when each component last synced:
- Hindsight: timestamp
- GitHub: last push time
- Memory files: last update
- Cron jobs: last run

### Step 10: HEALTH SCORING

Rate overall system health (1-10):
| Component | Weight | Score |
|-----------|--------|-------|
| Hindsight connectivity | 30% | /10 |
| GitHub sync status | 20% | /10 |
| Cron job success rate | 20% | /10 |
| Memory freshness | 15% | /10 |
| Directive currency | 15% | /10 |

**Overall:** Weighted average

### Step 11: SYNC VALIDATION

Verify key integrations still work:
- ✅ Test Hindsight connection
- ✅ Verify GitHub push works
- ✅ Check all channels (Discord, Telegram)
- ✅ Validate Notion API (if configured)
- Report any failures

### Step 12: CONFLICT DETECTION

Find contradictory information:
- Compare memory vs Hindsight facts
- Check code vs documentation consistency
- Flag stale information

### Step 13: OUTPUT COMPLETE REPORT

Present unified report:
- 🎯 Active directives (from Step 2)
- 🧠 Updated mental models (from Reflect)
- 📚 Codebase context (from Ingest)
- 📅 Cron/Schedule status (from Step 7)
- 🔄 Changes detected (from Step 8)
- ⏰ Sync timestamps (from Step 9)
- 📊 Health score (from Step 10)
- ⚠️ Any conflicts found

---

## Output Format

```markdown
# Full Sync Complete! 🔄

## Health Score: X/10

### System Status
| Component | Status | Last Sync |
|-----------|--------|-----------|
| Hindsight | ✅ | timestamp |
| GitHub | ✅ | timestamp |
| Cron | ✅ | timestamp |

### Active Directives
- [List directives]

### Changes Detected
- [New commits]
- [New memories]
- [New directives]

### Cron Jobs
| Job | Schedule | Status |
|-----|----------|--------|
| backup_to_github | Daily midnight | ✅ |

### Conflicts
- [Any contradictions found]

### Next Steps
[Recommended actions based on findings]
```

---

## Error Handling

| Error | What to Do |
|-------|------------|
| Hindsight offline | Continue with GitHub + local only |
| GitHub push fails | Retry once, note failure |
| Cron check fails | Note in report, continue |

---

## Related Skills

- `skills/hindsight` - Used for Step 1
- `skills/mega-sync` - Similar but less comprehensive
- `skills/study` - For memory refresh

---

## Examples

### Example 1

**Input:** "full sync"
**Output:** Complete sync report with health score, changes, timestamps, validation

### Example 2
**Input:** "full sync"
**Output:** Complete sync report with health score, changes, timestamps, validation

---

## Pro Tips

- This is the MOST comprehensive sync
- Use when you need full picture
- Run reflect to synthesize insights
- Check for conflicts regularly

---

## Time Estimate

| Step | Time |
|------|------|
| Hindsight Health | 2-3 min |
| Directives + Reflect | 2 min |
| GitHub Ingest | 30s |
| Recall | 30s |
| Cross-ref + Cron | 1 min |
| Validation | 1 min |
| **Total** | **~8-10 min** |

---

*Skill version: 1.0 - Last updated: April 24, 2026*