---
name: creative-spark
description: Creativity boost + problem-solving combo - runs Brainstorm then Inspire. Use when you need creativity + motivation - says "creative spark".
license: Proprietary
metadata:
  author: Jeem & Stuart
  credits: "Original concept by Jeem & Stuart"
  version: "1.1"
  triggers:
    - creative spark
    - creativity boost
    - inspire me
  category: creativity
  requires:
    - skills/brainstorm
    - skills/inspire
---

# Creative Spark - Creativity Boost + Problem-Solving

This skill combines Brainstorm (creative problem-solving) with Inspire (motivational quotes) for a complete creativity boost.

## When to Use This Skill

Triggered when the user says:
- "creative spark"
- "creativity boost"
- "inspire me"
- "give me ideas"
- "I need creative help"

---

## The Creative Spark Process (2 Phases)

### PHASE 1: BRAINSTORM

**Load and use:** `skills/brainstorm/SKILL.md`

Run the full 10-step Brainstorm process:
1. **DIVERGENCE** - Generate 5 wildly different approaches
2. **CROSS-POLLINATION** - Combine best elements
3. **AMPLIFICATION** - Make it bolder
4. **PRESENT** - Deliver unique solution
5. **GOAL SETTING** - Clarify objectives
6. **RISK EVALUATION** - Assess challenges
7. **SCORING MATRIX** - Rate ideas
8. **SAVE TO MEMORY** - Store results
9. **FOLLOW-UP ACTIONS** - Create tasks
10. **CATEGORY TAGS** - Organize by type

### PHASE 2: INSPIRE

Share a motivational quote to boost creativity:

**Quote Collection (use one randomly):**

| # | Quote | Author |
|---|-------|--------|
| 1 | "Creativity is intelligence having fun." | Albert Einstein |
| 2 | "Every expert was once a beginner." | Helen Hayes |
| 3 | "The only way to do great work is to love what you do." | Steve Jobs |
| 4 | "Innovation distinguishes between a leader and a follower." | Steve Jobs |
| 5 | "Imagination is more important than knowledge." | Albert Einstein |
| 6 | "The best way to predict the future is to create it." | Peter Drucker |
| 7 | "It does not matter how slowly you go as long as you do not stop." | Confucius |
| 8 | "Success is not final, failure is not fatal." | Winston Churchill |
| 9 | "The only limit to our realization of tomorrow is our doubts of today." | Franklin D. Roosevelt |
| 10 | "Do what you can, with what you have, where you are." | Theodore Roosevelt |

**Selection method:** Randomly pick one, or ask Jeem if he has a preference.

---

## Output Format

```markdown
# Creative Spark! 💡

## Phase 1: Brainstorm Results
[Full brainstorm output from skills/brainstorm]

## Phase 2: Inspiration

**Quote:** "[Quote]"

**- [Author]**

---

## Summary
- Approaches generated: 5
- Top pick: [Option]
- Next steps: [Action items]
```

---

## Error Handling

| Scenario | What to Do |
|----------|------------|
| Brainstorm fails | Skip to Inspire phase, note issue |
| No quote available | Use fallback: "Stay curious and keep creating!" |

---

## Related Skills

- `skills/brainstorm` - Used in Phase 1
- `skills/inspire` - Used in Phase 2
- `skills/mega-dive` - For deeper research + creativity

---

## Examples

### Example 1

**Input:** "creative spark for a new product"
**Output:** Brainstorm results + motivational quote

### Example 2
**Input:** "creative spark for a new product"
**Output:** Brainstorm results + motivational quote

---

## Pro Tips

- This is a "super skill" - it calls other skills!
- The combination of ideation + motivation is powerful
- Use after a break or when feeling stuck
- Great for starting new projects

---

## Time Estimate

| Phase | Time |
|-------|------|
| Brainstorm | 15-25 min |
| Inspire | 1 min |
| **Total** | **~16-26 min** |

---

*Skill version: 1.0 - Last updated: April 24, 2026*