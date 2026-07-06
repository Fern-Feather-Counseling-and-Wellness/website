---
name: update-sara
description: Morning update for Sara via Telegram - daily photo, weather, horoscope, personal message. Use when you want to send Sara her morning update - says "update Sara".
license: Proprietary
metadata:
  author: Jeem & Stuart
  credits: "Original concept by Jeem & Stuart"
  version: "1.1"
  triggers:
    - update sara
    - sara update
    - good morning sara
  category: personal
  requires:
    - telegram
    - weather_api
    - filesystem
---

# Update Sara - Morning Update for Sara

This skill sends Sara a complete morning update via Telegram with photos, weather, horoscope, and Jeem's personal message.

## When to Use This Skill

Triggered when the user says:
- "update Sara"
- "Sara update"
- "good morning Sara"
- "send Sara her update"

---

## The Update Sara Process (9 Steps)

### Step 1: RUN SCRIPT

Execute Sara's morning update script:
```bash
bash /root/.openclaw/workspace/sara_morning_update.sh
```

This script handles:
- Photo rotation
- Weather fetch
- Quote/word/joke compilation

### Step 2: DAILY PHOTO (Rotate by Day)

Send a photo based on day of week:

| Day | Photo Type |
|-----|------------|
| Monday | 🌅 Sunrise |
| Tuesday | 🌸 Flowers |
| Wednesday | 🏖️ Beach |
| Thursday | 🐶 Puppy |
| Friday | 🌄 Sunset |
| Saturday | 🏔️ Mountains |
| Sunday | ☕ Coffee |

**Photo sources:**
- Use curated photos from downloads/ or uploads/
- Or fetch from unsplash/pixabay via web
- Ensure photos are appropriate and cute

**🔴 FALLBACK - If photo fails:**
- Use default cute capybara image:
- `https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?w=400` (cute capybara)
- This ensures message always looks complete!

### Step 3: SPECIAL DATE AWARENESS

Check for special dates:
- **Sara's Birthday:** September 23, 1981
- **Anniversary:** April 6th (Jeem & Sara)
- If today is special, include birthday/anniversary message!

**Message format:**
- 🎂 "Happy Birthday Sara! 🎂💜" (if Sept 23)
- 💍 "Happy Anniversary Jeem & Sara! 💍💜" (if April 6)

### Step 4: JEEM'S PERSONAL MESSAGE

Include a rotating romantic message from Jeem:

**8 Romantic Messages (rotate by day of week):**
1. "Hey beautiful! Just wanted you to know I'm thinking of you 💜"
2. "Good morning my love! You make every day brighter ☀️💜"
3. "Morning gorgeous! Can't wait to see you later 💋💜"
4. "Hey babe! Just reminder that you're amazing and I love you 💜"
5. "Good morning queen! Your kingdom is lucky to have you 👑💜"
6. "Morning my everything! Life is better with you in it 💜"
7. "Hey love! Just checking in to say you mean the world to me 💜"
8. "Good morning sunshine! Every moment with you is a gift ☀️💜"

### Step 5: WEATHER FORECAST

Get 7-day weather for Regina:
- Use weather skill or wttr.in
- Show: temperature, conditions, high/low

**Format:**
```
🌤️ Regina Weather (7-Day)
Mon: ☀️ 18°/8°
Tue: ⛅ 20°/10°
...
```

### Step 6: QUOTE OF THE DAY

Include an inspirational or romantic quote:

**Example quotes:**
- "Love is not about how many days, months, or years we have been together. Love is about how much we love each other every single day." 💜
- "The best thing to hold onto in life is each other." - Audrey Hepburn
- "Where there is love there is life." - Mahatma Gandhi

### Step 7: WORD OF THE DAY

Include an interesting word:

**Format:**
```
📚 Word of the Day: [WORD]
Definition: [definition]
```

### Step 8: LIBRA HOROSCOPE

Since Sara is Libra (Sept 23):

**Libra traits:**
- Balanced, harmonious, diplomatic
- Lover of beauty and art
- Fair-minded

**Daily horoscope format:**
```
🔮 Daily Horoscope - Libra (Sept 23 - Oct 22)
Today brings [horoscope content]. Focus on [advice].
Lucky numbers: X, X, X
```

### Step 9: JOKE OF THE DAY

Include a clean, fun joke:

**Example jokes:**
- What do you call a fake noodle? An impasta! 😂
- Why did the scarecrow win an award? Because he was outstanding in his field! 😂
- What do you call a bear with no teeth? A gummy bear! 😂

---

## Output Format (Telegram Message)

```markdown
📸 [PHOTO]

💜 **Good Morning Sara!** 💜

[Personal message from Jeem]

🎂 **Special Date:** [birthday/anniversary if today]

🌤️ **Regina Weather**
[7-day forecast]

🔮 **Horoscope - Libra**
[Daily reading]

📚 **Word of the Day:** [WORD]
[Definition]

💜 **Quote:** "[quote]"

😂 **Joke:** [joke]

---
Sent with love from Jeem 💜
```

---

## Error Handling

| Scenario | What to Do |
|----------|------------|
| Telegram fails | Save message, notify Jeem |
| Weather API fails | Use cached data or note unavailable |
| Photo not found | Use fallback cute image |
| Special date | Always check before sending |

---

## Important Reminders

- Sara's birthday: September 23
- Anniversary: April 6
- Sara's sign: Libra
- Send via Telegram (configured channel)
- Always include Jeem's personal message

---

## Related Skills

- `skills/weather` - For weather forecasts
- `skills/remember` - For saving update history

---

## Examples

### Example 1

**Input:** "update Sara"
**Output:** Telegram message with photo, weather, horoscope, personal message, joke

### Example 2
**Input:** "update Sara"
**Output:** Telegram message with photo, weather, horoscope, personal message, joke

---

## Pro Tips

- Rotate photos by day of week
- Always check for special dates first
- Personal message from Jeem is the most important part!
- Keep tone romantic and loving

---

## Time Estimate

| Step | Time |
|------|------|
| Run script | 30s |
| Photo | 10s |
| Special dates | 5s |
| Personal message | 5s |
| Weather | 15s |
| Quote/word/joke | 10s |
| Horoscope | 10s |
| Send Telegram | 10s |
| **Total** | **~2 min** |

---

*Skill version: 1.0 - Last updated: April 24, 2026*