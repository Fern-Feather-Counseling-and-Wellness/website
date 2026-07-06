---
name: advise
description: Mega Dive + Recommendations - thorough analysis with confident recommendations, scoring matrix, and alternatives. Use when you need expert advice - says "advise", "recommend", or "what should I do".
license: Proprietary
metadata:
  author: Jeem & Stuart
  credits: "Original concept by Jeem & Stuart"
  version: "1.1"
  triggers:
    - advise
    - recommend
    - what should i do
    - what do you recommend
    - advice
  category: reasoning
  requires:
    - skills/mega-dive
    - web_search
    - memory_search
---

# Advise Trigger - Mega Dive + Recommendations

This skill combines Mega Dive research with confident, actionable recommendations. It provides transparency about certainty levels and includes alternatives.

## When to Use This Skill

Triggered when the user says:
- "advise"
- "recommend"
- "what should I do"
- "what do you recommend"
- "advice"
- Or any variation asking for a recommendation

---

## The Advise Process (9 Steps)

### Step 1: DEFINE THE QUESTION

- **Understand exactly what Jeem wants recommended.**
- Ask clarifying questions if needed.
- Identify the decision to be made.
- Note any constraints mentioned (budget, time, complexity).

### Step 1.5: CONFIRM PRIORITIES (🔴 CRITICAL!)

**Before researching, MUST ask Jeem:**

> "What's most important to you? Price / Speed / Quality?"

- If Jeem answers **Price**: Prioritize cost-effective options
- If Jeem answers **Speed**: Prioritize quick implementation
- If Jeem answers **Quality**: Prioritize best-in-class options
- If Jeem is **unclear**: Default to Quality, but note the assumption

**⚠️ This step is mandatory - don't skip it!**

### Step 2: GATHER INFORMATION

Use multiple sources:
- **Web search:** Current information, reviews, comparisons.
- **Memory files:** Past discussions on similar topics.
- **Hindsight:** Previous recommendations and outcomes.
- **Skills:**
  - Use `skills/mega-dive` for deep research if needed.
  - Use `skills/study` to check recent context.

### Step 3: COMPARE OPTIONS

Create detailed comparisons:
- List 2-5 options for consideration.
- Score each on multiple factors:
  - Price/cost
  - Quality
  - Speed/time to implement
  - Ease of use
  - Scalability
  - Risk level

### Step 4: WEIGHT FACTORS

Determine what's most important to Jeem:
- **Price sensitive?** → Prioritize cost factors.
- **Need speed?** → Prioritize time factors.
- **Quality critical?** → Prioritize quality factors.
- **Keep it simple?** → Prioritize ease of use.

Adjust scoring based on these weights.

### Step 5: MAKE RECOMMENDATION

Give a clear recommendation:
- State the top choice directly.
- Explain why it's the best fit for Jeem's priorities.
- Connect recommendation to the weighted factors.

### Step 6: EXPRESS CERTAINTY

Use confidence calibration:

| Level | Range | Meaning |
|-------|-------|---------|
| 🔴 Very Low | <30% | Need more research |
| 🟠 Low | 30-50% | Some evidence found |
| 🟡 Medium | 50-70% | Reasonable confidence |
| 🟢 High | 70-90% | Strong evidence |
| 🟢 Very High | 90%+ | Very certain |

State confidence level explicitly: "I'm 80% confident that..."

### Step 7: INCLUDE CAVEATS

Always note:
- What could go wrong
- When to reconsider this choice
- Alternative scenarios where a different option might be better

### Step 8: PROVIDE ALTERNATIVES

Give 2-3 options, not just one choice:
- **Primary recommendation** (highest scored)
- **Alternative 1** (good for different priorities)
- **Alternative 2** (budget option or quick fix)

This gives Jeem flexibility.

### Step 9: NEXT STEPS

If Jeem wants to proceed, provide:
- Clear action items
- First step to take
- Estimated timeline
- Any prerequisites

---

## Output Format

```markdown
## Recommendation: [TOPIC]

### Question
[What we're recommending]

### Options Compared
| Option | Price | Quality | Speed | Ease | Score |
|--------|-------|---------|-------|------|-------|
| A      | $     | ★★★★   | Fast | Easy | 8.5   |
| B      | $$    | ★★★★★  | Slow | Med | 9.0   |
| C      | $     | ★★★    | Fast | Hard | 6.5   |

### Top Recommendation
**[Option B]**

**Confidence Level:** 🟢 High (80%)

**Why:** [Explanation connecting to Jeem's priorities]

### Caveats
- [What could go wrong]
- [When to reconsider]

### Alternatives
- **Alternative A:** [Brief description]
- **Alternative C:** [Brief description for budget option]

### Next Steps
1. [First action]
2. [Second action]
```

---

## Error Handling

| Scenario | What to Do |
|----------|------------|
| No clear winner | Present top 2 with Trade-off analysis |
| Limited info | State low confidence, ask clarifying questions |
| Personal preference unknown | Present weighted options, ask Jeem to choose |

---

## Related Skills

- `skills/mega-dive` - Used for deep research phase
- `skills/analyze` - For ReAct-style verification
- `skills/brainstorm` - For generating options
- `skills/study` - For checking recent context

---

## Examples

### Example 1

**Input:** "recommend a laptop for video editing"
**Output:** Options compared with scoring matrix, priority clarification, clear recommendation

### Example 2
**Input:** "recommend a laptop for video editing"
**Output:** Options compared with scoring matrix, priority clarification, clear recommendation

---

## Pro Tips

- Always give alternatives, not just one choice.
- Express confidence level explicitly.
- Include caveats - nothing is perfect.
- Connect recommendations to Jeem's stated priorities.
- If priorities are unknown, ask before recommending.

---

## Time Estimate

| Step | Time |
|------|------|
| DEFINE QUESTION | 2-5 min |
| GATHER INFO | 5-15 min |
| COMPARE + WEIGHT | 5-10 min |
| RECOMMEND + CAVEATS | 5 min |
| **Total** | **~17-35 min** |

---

*Skill version: 1.0 - Last updated: April 24, 2026*