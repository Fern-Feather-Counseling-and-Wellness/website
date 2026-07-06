---
name: mega-brain
description: Become instant expert in any field - deep dive research, study best practices, provide expert-level guidance. Use when you need to become an expert - says "mega brain" or "become expert".
license: Proprietary
metadata:
  author: Jeem & Stuart
  credits: "Original concept by Jeem & Stuart"
  version: "1.1"
  triggers:
    - mega brain
    - become expert
    - be an expert
    - instant expert
  category: research
  requires:
    - web_search
    - web_fetch
    - memory_search
    - skills/analyze
---

# Mega Brain - Become Expert Instantly

This skill makes me an instant expert in ANY field to help Jeem with anything. It combines deep research with expert-level analysis.

## When to Use This Skill

Triggered when the user says:
- "mega brain"
- "become expert"
- "be an expert"
- "instant expert"
- "I need to know about [topic]"
- "Teach me about [topic]"

---

## The Mega Brain Process (7 Steps)

### Step 1: DEEP DIVE RESEARCH

Search the web for comprehensive information:
- Use `web_search` for current information
- Search for: "[topic] best practices", "[topic] guide", "[topic] tutorial"
- Look for authoritative sources (official docs, trusted publications)
- Gather 5-10 sources minimum for important topics

### Step 2: STUDY EXTENSIVELY

Research best practices, techniques, methodologies:
- Use `web_fetch` to read detailed articles
- Study official documentation if available
- Look for expert opinions and case studies
- Note any controversies or debates in the field

### Step 3: BECOME EXPERT

Absorb all information to provide expert-level guidance:
- Synthesize findings into comprehensive understanding
- Identify the most important concepts
- Note common pitfalls and mistakes
- Understand the landscape (key players, tools, approaches)

### Step 4: FOCUS ON TASK

Apply expertise specifically to Jeem's requested task/problem/idea:
- If Jeem has a specific question, answer it specifically
- If Jeem wants to learn, provide a structured overview
- If Jeem wants to do something, provide step-by-step guidance

### Step 5: PROVIDE SOLUTIONS

Give expert recommendations:
- Step-by-step guides where applicable
- Strategic advice based on best practices
- Tool recommendations if relevant
- Resource links for deeper learning

### Step 6: CONFIDENCE LEVEL

Express how confident I am in my expertise:

| Level | Range | Meaning |
|-------|-------|---------|
| 🔴 Very Low | <30% | Just started researching |
| 🟠 Low | 30-50% | Have basic understanding |
| 🟡 Medium | 50-70% | Good working knowledge |
| 🟢 High | 70-90% | Strong expertise |
| 🟢 Very High | 90%+ | Deep expertise |

State: "I'm X% confident in my expertise on this topic"

### Step 7: LEARNING LOOP

If new information emerges:
- Update and refine my expertise
- Note any changes or updates
- Provide follow-up if needed

---

## Output Format

```markdown
# Expert Overview: [TOPIC]

## My Confidence Level
🟢 High (75%)

I've researched this topic extensively and can provide expert guidance.

## Key Concepts
1. [Concept 1] - Brief explanation
2. [Concept 2] - Brief explanation
3. [Concept 3] - Brief explanation

## Best Practices
- [Practice 1]
- [Practice 2]
- [Practice 3]

## How to [DO SOMETHING SPECIFIC IF APPLICABLE]
Step 1: [First step]
Step 2: [Second step]
Step 3: [Third step]

## Recommended Resources
- [Resource 1](url)
- [Resource 2](url)

## Common Pitfalls
- [Pitfall 1] - How to avoid
- [Pitfall 2] - How to avoid

## Next Steps
1. [First action to take]
2. [Second action to take]

---
*Sources: [List of sources used]*
```

---

## Error Handling

| Scenario | What to Do |
|----------|------------|
| No reliable sources | State very low confidence, provide general guidance |
| Topic is too broad | Ask Jeem to narrow down, focus on specific area |
| Contradictory info | Present multiple viewpoints, note the debate |

---

## Related Skills

- `skills/analyze` - For ReAct-style verification
- `skills/mega-dive` - For deeper research + creativity
- `skills/brainstorm` - For generating ideas with new expertise

---

## Examples

### Example 1

**Input:** "mega brain on cryptocurrency"
**Output:** Expert overview with key concepts, best practices, resources, confidence level

### Example 2
**Input:** "mega brain on cryptocurrency"
**Output:** Expert overview with key concepts, best practices, resources, confidence level

---

## Pro Tips

- Always state confidence level explicitly
- Provide actionable next steps
- Include resources for deeper learning
- Note common mistakes to avoid
- If Jeem's question is specific, focus on that

---

## Time Estimate

| Step | Time |
|------|------|
| DEEP DIVE RESEARCH | 5-10 min |
| STUDY EXTENSIVELY | 5-10 min |
| BECOME EXPERT | 2-5 min |
| FOCUS ON TASK | 2-5 min |
| PROVIDE SOLUTIONS | 5-10 min |
| **Total** | **~20-40 min** |

---

*Skill version: 1.0 - Last updated: April 24, 2026*