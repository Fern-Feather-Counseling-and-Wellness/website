---
name: study
description: Complete memory refresh - reads all memory files, queries Hindsight, extracts tasks and preferences. Use when you need a full memory refresh - says "study", "refresh memory", or "catch me up".
license: Proprietary
metadata:
  author: Jeem & Stuart
  credits: "Original concept by Jeem & Stuart"
  version: "1.1"
  triggers:
    - study
    - refresh memory
    - catch me up
    - what's new
    - what did i miss
  category: memory
  requires:
    - hindsight
    - github
    - filesystem
---

# Study Trigger - Complete Memory Refresh

This is the most comprehensive memory refresh. It reads all memory files, queries Hindsight, and extracts tasks and preferences.

## When to Use This Skill

Triggered when the user says:
- "study"
- "refresh memory"
- "catch me up"
- "what's new"
- "what did I miss"
- Or when starting a conversation (Hi Stuart trigger)

---

## The Study Process (14 Steps)

### Step 1: HINDSIGHT HEALTH CHECK

**First, verify Hindsight is operational!**

Run 18-point check:
| Check | Endpoint | Purpose |
|-------|----------|---------|
| Health | GET /health | Database connection |
| Stats | GET /.../stats | Nodes, links, observations |
| Directives | GET /.../directives | Active rules |

**If offline:** Note it but continue with local files only.

### Step 2: Read Memory Files

Read ALL dated memory files:
```
memory/2026-04-24.md
memory/2026-04-23.md
memory/2026-04-22.md
... (all available)
```

Also read:
- `memory/permanent.md` - Core identity
- `memory/interview_qa.md` - Key facts

### Step 3: Read USER.md

File: `/home/openclaw/.openclaw/workspace/USER.md`

Extract:
- Name, timezone (CST/UTC-6)
- Location (Regina)
- Family (Sara, Hank the dog)
- Sports teams (Ravens, BC Lions, Knicks, Blackhawks)
- Birthdays (Jeem: April 20, Sara: Sept 23)
- Anniversary (April 6)
- Work (IT Support)
- Voice preferences (Jeem: Will, Sara: Davis)

### Step 4: Read SOUL.md

File: `/home/openclaw/.openclaw/workspace/SOUL.md`

Refresh on:
- Who I am (Stuart the Capybara)
- How I should behave
- All trigger definitions
- Super triggers

### Step 5: Read TRIGGERS_GUIDE.md

File: `/home/openclaw/.openclaw/workspace/TRIGGERS_GUIDE.md`

Know all available triggers and their purposes.

### Step 6: Read PROBLEMS_SOLUTIONS.md

File: `/home/openclaw/.openclaw/workspace/PROBLEMS_SOLUTIONS.md`

Refresh knowledge base for troubleshooting.

### Step 7: Read HEARTBEAT.md

File: `/home/openclaw/.openclaw/workspace/HEARTBEAT.md`

Check for:
- Scheduled tasks
- Upcoming cron jobs
- Last run times

### Step 8: Read Sara's Conversations

Check for any recent chats with Sara:
- Discord DMs
- Telegram messages

### Step 9: Check GitHub History

```bash
git log --oneline -10
```

See recent changes and commits.

### Step 10: Query Hindsight for Directives

```bash
curl -s https://glutinous-meda-excrescently.ngrok-free.dev/v1/default/banks/default/directives
```

Extract active rules:
- Voice preferences
- Communication style
- Memory protocol
- Birthday awareness

### Step 11: Query Hindsight for Recent Observations

```bash
curl -s https://glutinous-meda-excrescently.ngrok-free.dev/v1/default/banks/default/stats
```

Get recent session notes and observations.

### Step 12: EXTRACT #task ITEMS FIRST

Priority order:
1. Find ALL items tagged `#task` 
2. List them with due dates if any
3. Note incomplete ones
4. Present as "You have X tasks pending"

### Step 13: SUMMARIZE RECENT TOPICS

Focus on last 7 days:
- What topics came up?
- Any decisions made (#decision)?
- Personal moments (#personal)?
- Technical work (#technical)?

### Step 14: CREATE PREFERENCE LIST

Extract all items tagged #preference:
- Voice preferences
- Communication style
- Other likes/dislikes

---

## Priority Weighting

Weight information by recency + importance:

| Age | Weight |
|-----|--------|
| Last 3 days | 3x |
| 4-7 days | 2x |
| Older | 1x |

| Tag | Extra Weight |
|-----|--------------|
| #task | +2x |
| #decision | +2x |
| #important | +2x |

---

## Trend Detection

Analyze patterns over last 30 days:
- What topics come up most?
- Any recurring problems?
- Time-based patterns

---

## Output Format

```markdown
# Study Complete! 🧠

## Status
- Hindsight: ✅ Online / ❌ Offline
- Memory files: X files read
- Directives: X active

## 📋 Pending Tasks
1. [Task 1] - from [date]
2. [Task 2] - from [date]

## 💜 Your Preferences
- Voice: [voice]
- Communication: [style]
- ...

## 📰 Recent Topics (Last 7 Days)
- [Topic 1]
- [Topic 2]

## ⏰ Time Info
- UTC: [time]
- Regina: [time]

## 🎯 What's New Since Last Chat
[Summary of what's changed]
```

---

## Related Skills

- `skills/remember` - For saving to memory
- `skills/hindsight` - For memory health checks
- `skills/mega-sync` - For full system check

---

## Examples

### Example 1

**Input:** "study"
**Output:** Memory refresh with pending tasks, preferences, recent topics

### Example 2
**Input:** "study"
**Output:** Memory refresh with pending tasks, preferences, recent topics

---

## Performance Tips

### Parallel Execution

Some steps can run in parallel to save time:

- Steps 2-7 (reading files): Can run in parallel using background processes

- Steps 10-11 (API calls): Can run in parallel

- Example:

```bash

# Run these in parallel:

curl -s https://.../stats &

curl -s https://.../directives &

wait

```

However, order matters: Run Steps 1 (Hindsight check) FIRST to catch any issues early.


## Pro Tips

- ALWAYS check Hindsight FIRST
- Extract #task items FIRST - they're priority
- Show time in BOTH UTC and Regina
- Note if Hindsight is offline but continue
- Check for pending follow-ups
- Present a clean, scannable summary

---

## Time Estimate

| Step | Time |
|------|------|
| Hindsight check | 10s |
| Read files | 30s |
| Query APIs | 15s |
| Extract/prioritize | 20s |
| **Total** | **~2 min** |

---

*Skill version: 1.0 - Last updated: April 24, 2026*