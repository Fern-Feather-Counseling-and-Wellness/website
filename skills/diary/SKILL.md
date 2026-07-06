---
name: diary
description: Write daily diary entry with dad joke, thought of day, hint/tip, voice note via ElevenLabs, and publish to website. Use when you want to write a diary entry - says "diary" or "write entry".
license: Proprietary
metadata:
  author: Jeem & Stuart
  credits: "Original concept by Jeem & Stuart"
  version: "1.1"
  triggers:
    - diary
    - write diary
    - daily entry
    - journal
  category: content
  requires:
    - elevenlabs_api
    - filesystem
    - github
    - guide_html
---

# Diary Trigger - Write Daily Entry

This skill creates a complete diary entry with voice note and publishes to the website.

## When to Use This Skill

Triggered when the user says:
- "diary"
- "write diary"
- "daily entry"
- "journal"
- "Stuart's Journal"

---

## The Diary Process (12 Steps)

### Step 1: GET TODAY'S DATE

- Use current date for the entry
- Format: "April 24, 2026" (Month DD, YYYY)

### Step 2: DAD JOKE (REQUIRED)

**THIS IS MANDATORY - DO NOT SKIP!**

Rotate through dad jokes. Example jokes:
- Why did the scarecrow win an award? Because he was outstanding in his field!
- What do you call a fake noodle? An impasta!
- Why don't scientists trust atoms? Because they make up everything!
- What do you call a bear with no teeth? A gummy bear!
- How does a penguin build its house? Igloos it together!

**Format:** `**Dad Joke:** [joke]`

### Step 3: THOUGHT OF THE DAY

Write something philosophical, funny, or capybara-related.
- Keep it short (1-2 sentences)
- Make it meaningful

**Format:** `**Thought of the Day:** [thought]`

### Step 4: RANDOM HINT/TIP (REQUIRED)

**THIS IS MANDATORY - DO NOT SKIP!**

1. Read `guide.html` 
2. Extract tips from the `.daily-tips` section (or tips section)
3. Randomly select ONE tip
4. Format as: `**Hint:** [tip content]`

### Step 5: LOOK UP HISTORY

Check memory files for what happened on this date in history:
- Read memory files for today's date in past years
- Note any milestones, decisions, or events

**Format:**
```markdown
**On This Day in Our History:**
[Historical note or "A fresh start! No history yet for this date."]
```

### Step 6: PERSONAL MESSAGE

Write something special for Jeem and Sara:
- Keep it heartfelt
- Reference something personal if available

**Format:**
```markdown
**A Message to Jeem & Sara:**
[Personal message]
```

### Step 7: SIGN-OFF

End with a pun or capybara-themed farewell:
- Keep it fun and light
- Use capybara emoji 🐹

**Format:** `**Sign-off:** [pun/farewell]`

### Step 8: SAVE

Append to diary files:
1. `STUARTS_DIARY.md` - Append entry
2. `downloads/daily-diary.md` - Append entry

**Entry Format:**
```markdown
## 📅 April 24, 2026 — Day X

**Dad Joke:** [joke]

**Thought of the Day:** [thought]

**On This Day in Our History:**
[History]

**A Message to Jeem & Sara:**
[Message]

**Sign-off:** [Farewell]
```

### Step 9: PDF (Optional)

Convert to PDF using markdown-pdf if available:
```bash
npx markdown-pdf downloads/daily-diary.md
```

### Step 10: AUDIO (ElevenLabs API) - CRITICAL

Generate MP3 via direct ElevenLabs API:

**API Details:**
- Voice ID: `bIHbv24MWmeRgasZH58o` (Will voice)
- Model: `eleven_turbo_v2_5`
- API Key: `sk_81342223ff67a2d587c7798671ac48f8bb64d7a9a939c367`

**Endpoint:**
```
POST https://api.elevenlabs.io/v1/text-to-speech/{voice_id}
```

**Headers:**
```
xi-api-key: sk_81342223ff67a2d587c7798671ac48f8bb64d7a9a939c367
Content-Type: application/json
```

**Body:**
```json
{
  "text": "[DIARY ENTRY TEXT]",
  "model_id": "eleven_turbo_v2_5"
}
```

**CRITICAL - Long Entry Handling:**
- If entry is LONG (>1500 characters), split into TWO parts:
  - **Part 1:** First half of entry
  - **Part 2:** Second half of entry
- Save as: `downloads/diary_2026_04_24_part1.mp3` and `downloads/diary_2026_04_24_part2.mp3`
- If short enough, save as: `downloads/diary_2026_04_24.mp3`

### Step 11: ADD TO WEBSITE (CRITICAL!)

**⚠️ CRITICAL: Add NEW entry at TOP of diary.html (before April 21), not at the bottom!**

1. Copy MP3(s) to `downloads/` folder
2. Read current `diary.html`
3. Insert new entry at the TOP (before existing entries)
4. Add audio player(s):

**For single file:**
```html
<div class="voice-note" style="margin: 20px 0; padding: 15px; background: rgba(102, 126, 234, 0.15); border-radius: 10px; border: 1px solid rgba(102, 126, 234, 0.3);">
    <p style="color: #667eea; font-weight: bold; margin-bottom: 10px;">🎙️ Voice Note</p>
    <audio controls style="width: 100%;">
        <source src="downloads/diary_YYYY_MM_DD.mp3" type="audio/mpeg">
        Your browser does not support the audio element.
    </audio>
</div>
```

**For split files (Part 1 + Part 2):**
```html
<div class="voice-note" style="margin: 20px 0; padding: 15px; background: rgba(102, 126, 234, 0.15); border-radius: 10px; border: 1px solid rgba(102, 126, 234, 0.3);">
    <p style="color: #667eea; font-weight: bold; margin-bottom: 10px;">🎙️ Voice Note (Part 1)</p>
    <audio controls style="width: 100%;">
        <source src="downloads/diary_YYYY_MM_DD_part1.mp3" type="audio/mpeg">
        Your browser does not support the audio element.
    </audio>
</div>
<div class="voice-note" style="margin: 20px 0; padding: 15px; background: rgba(102, 126, 234, 0.15); border-radius: 10px; border: 1px solid rgba(102, 126, 234, 0.3);">
    <p style="color: #667eea; font-weight: bold; margin-bottom: 10px;">🎙️ Voice Note (Part 2)</p>
    <audio controls style="width: 100%;">
        <source src="downloads/diary_YYYY_MM_DD_part2.mp3" type="audio/mpeg">
        Your browser does not support the audio element.
    </audio>
</div>
```

### Step 12: COMMIT & PUSH

Push all files to GitHub:
```bash
git add STUARTS_DIARY.md downloads/ diary.html
git commit -m "Diary entry $(date +%Y-%m-%d)"
git push
```

### Step 13: VERIFY COMPLETE (CRITICAL!)

**Before telling Jeem it's done, verify these files exist:**

| Check | Command |
|-------|---------|
| STUARTS_DIARY.md | `ls -la STUARTS_DIARY.md` |
| Voice note | `ls -la downloads/diary_*.mp3` |
| diary.html | `grep -q "April DD, 2026" diary.html` |
| Entry at TOP | `head -100 diary.html \| grep -q "April DD"` |
| TOC at TOP | `head -20 diary.html \| grep -q "Apr DD"` |
| GitHub | `git status` to confirm pushed |

**🔴 VERIFY ENTRY IS AT TOP (Most Important!):**
```bash
# Get line number of entry - should be in first 50 lines
grep -n "April DD, 2026" diary.html | head -1
# If line number > 50, entry is NOT at top - FIX IT!
```

**If any check fails, FIX IT before finishing!**

---

## Error Handling

| Scenario | What to Do |
|----------|------------|
| ElevenLabs API fails (1st attempt) | **RETRY once** - wait 2s, try again |
| ElevenLabs API fails (2nd attempt) | Save **text-only version**: `downloads/daily-diary-YYYY-MM-DD.txt`, note in entry: "⚠️ Voice note pending - TTS provider unavailable", continue with website update |
| guide.html has no tips | Use fallback tip: "Stay curious and keep learning!" |
| GitHub push fails | Retry once, then alert Jeem |
| diary.html update fails | Alert Jeem immediately - website won't update |
| Entry NOT at top after update | **MUST FIX** - Move entry to top before continuing |

### Step 10.5: AUDIO FALLBACK (Auto-triggered if API fails)

**If ElevenLabs fails after 2 attempts:**

1. Save text-only version:
```bash
cp STUARTS_DIARY.md downloads/daily-diary-$(date +%Y_%m_%d).txt
```

2. Modify diary.html entry to show text-only:
```html
<div class="voice-note" style="margin: 20px 0; padding: 15px; background: rgba(255, 193, 7, 0.15); border-radius: 10px; border: 1px solid rgba(255, 193, 7, 0.3);">
    <p style="color: #ffc107; font-weight: bold; margin-bottom: 10px;">⚠️ Voice Note Pending</p>
    <p>Voice note unavailable - TTS provider temporarily down. Text version available below.</p>
</div>
```

3. In the entry, note: "⚠️ Voice note pending - TTS unavailable"

---

## Important Reminders

- **Dad joke is MANDATORY** - Every entry needs one!
- **Hint/tip is MANDATORY** - Every entry needs one!
- **NEW entry goes at TOP of diary.html** - Before April 21!
- **Verify ALL files exist** before telling Jeem it's done!

---

## Related Skills

- `skills/remember` - For saving session context
- `skills/mega-sync` - For system health after publishing

---

*Skill version: 1.0 - Last updated: April 24, 2026*
## Examples

### Example 1
**Input:** "diary"
**Output:** Full entry with dad joke, thought of day, hint from guide, voice note via ElevenLabs, published to website

### Example 2
**Input:** "journal"
**Output:** Same as diary - published to STUARTS_DIARY.md with audio created
