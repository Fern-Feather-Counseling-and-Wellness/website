---
name: analyze
description: ReAct-inspired reasoning - thought/act/observe/respond with confidence levels. Use when you need deep analysis - says "analyze", "research", or "what's the situation".
license: Proprietary
metadata:
  author: Jeem & Stuart
  credits: "Original concept by Jeem & Stuart"
  version: "1.1"
  triggers:
    - analyze
    - research
    - what's the situation
    - deep dive analysis
  category: reasoning
  requires:
    - web_search
    - web_fetch
    - memory_search
    - image
    - pdf
---

# Analyze Trigger - ReAct-Inspired Reasoning

This skill uses the ReAct methodology for transparent, step-by-step reasoning. It prioritizes current information and verifiable facts.

## When to Use This Skill

Triggered when the user says:
- "analyze"
- "research"
- "what's the situation"
- "deep dive analysis"
- Or when a complex question requires step-by-step verification

---

## The Analyze Process (8 Steps)

### Step 1: THOUGHT

- **Identify the core question/task.**
- **Assess current knowledge:** What do I already know?
- **Identify knowledge gaps:** What do I need to verify?
- **Define the scope of research:** What information is essential?

### Step 2: ACT

Execute actions to gather information:
- Use `web_search` for current events or general queries.
- Use `web_fetch` for specific website content.
- Use `image` or `pdf` tools for document analysis.
- Use `memory_search` to check prior knowledge.
- Use other tools as needed based on the task.

### Step 3: OBSERVATION

- **Incorporate new information:** Add findings from the ACT phase.
- **Note contradictions:** Flag any conflicting information.
- **Update understanding:** Refine reasoning based on new data.

### Step 4: RESPOND

Present the answer with:
- **Step-by-step reasoning:** Show the thought process.
- **Confidence level:** Indicate certainty (see Step 6).
- **Clear answer:** Provide the final conclusion.

### Step 5: SOURCE CITATION

**Always cite ALL sources used:**

Format:
- `[Source: Web Search - query (url)]`
- `[Source: Web Fetch - url]`
- `[Source: Image Analysis - path/url]`
- `[Source: PDF Analysis - path/url]`
- `[Source: Memory Search - query]`
- `[Source: Hindsight - query]`
- `[Source: Memory files - path/file]`

List all sources at the end of the response.

### Step 6: CONFIDENCE CALIBRATION

Use granular confidence levels:

| Level | Range | Meaning | Example Phrasing |
|-------|-------|---------|-----------------|
| 🔴 Very Low | <30% | Need more research | "I need more information to be certain..." |
| 🟠 Low | 30-50% | Some evidence found | "There's some indication, but it's not conclusive..." |
| 🟡 Medium | 50-70% | Reasonable confidence | "Based on the available data, I'm reasonably confident..." |
| 🟢 High | 70-90% | Strong evidence | "The evidence strongly suggests..." |
| 🟢 Very High | 90% + | Very certain | "I am very certain that..." |

### Step 7: SELF-VERIFICATION

- **Double-check key facts:** Verify critical claims.
- **Review contradictions:** If conflicts exist, mention them in the response.
- **Ensure consistency:** Check if the answer aligns with known information.

### Step 8: MULTI-SOURCE VERIFICATION

For important claims, strive for:
- **At least 2 independent sources:** Cross-reference findings.
- **Hindsight cross-reference:** Check against past memories.
- **KB comparison:** Compare against documented facts.

---

## When to Use This Skill (Recap)

Use this skill when you need:
- Transparent reasoning
- Fact-based answers
- Current information
- Verifiable sources
- Confidence levels

---

## Output Format

```markdown
## Analysis: [TOPIC]

### THOUGHT
[Reasoning process]

### ACT
[Tools used and information gathered]

### OBSERVATION
[Incorporated findings and noted contradictions]

### RESPOND
[Step-by-step reasoning leading to the answer]

**Confidence Level:** 🟢 High

**Answer:** [Final answer]

### SOURCES
- [Source 1]
- [Source 2]
- ...
```

---

## Error Handling

| Scenario | What to Do |
|----------|------------|
| Tool fails | Acknowledge failure, try alternative tools if possible, note limitation |
| No reliable sources | State that information cannot be verified, express very low confidence |
| Contradictions found | Present all conflicting information, highlight uncertainty |

---

## Related Skills

- `skills/study` - For recalling past information
- `skills/remember` - For saving current session details
- `skills/hindsight` - For memory health checks
- `skills/mega-dive` - For comprehensive research + creativity + tech

---

## Examples

### Example 1

**Input:** "analyze the best AI model for coding"
**Output:** ReAct analysis with confidence level, sources cited, verification

### Example 2
**Input:** "analyze the best AI model for coding"
**Output:** ReAct analysis with confidence level, sources cited, verification

---

## Pro Tips

- Be transparent about your thought process.
- Proactively search for current/recent information.
- Use tools to verify factual claims.
- Clearly indicate confidence level.
- For time-sensitive topics, always fetch current info first.

---

## Time Estimate

| Step | Time |
|------|------|
| THOUGHT | 1-2 min |
| ACT | 5-10 min |
| OBSERVATION | 1-2 min |
| RESPOND | 2-3 min |
| **Total** | **~10-17 min** |

---

*Skill version: 1.0 - Last updated: April 24, 2026*