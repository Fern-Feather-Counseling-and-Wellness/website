---
name: mega-dive
description: Ultimate research + creativity + tech combo. Runs Analyze (ReAct) → Brainstorm (Force Divergence) → Upgrades (version check). Use when you need deep research followed by creative solutions and tech improvements. Triggered by "deep dive", "mega dive", or "research everything".
license: Proprietary
metadata:
  author: Jeem & Stuart
  credits: "Original concept by Jeem & Stuart"
  version: "1.1"
  triggers:
    - deep dive
    - mega dive
    - research everything
    - full research
  category: research
  requires:
    - web_search
    - skills/brainstorm
    - skills/hindsight
    - skills/knowledge-base
---

# Mega Dive - Research + Creativity + Tech

This is the ultimate combo skill for comprehensive problem-solving. It combines three powerful processes into one seamless workflow.

## When to Use This Skill

Triggered when the user says:
- "deep dive"
- "mega dive"
- "research everything"
- "full research"
- "analyze and brainstorm"

Perfect for when you need full research → creative solutions → tech improvements in one go!

---

## The Mega Dive Process (3 Phases)

### PHASE 1: ANALYZE (ReAct Methodology)

**Load these skills as needed:**
- `skills/knowledge-base` - For checking documented facts
- `skills/recent` - For recent conversation context
- `skills/hindsight` - For memory recall

Use the Analyze skill process:

#### Step 1: THOUGHT
- Identify the question/task
- List what you already know vs. what you need to verify
- Define the scope of research

#### Step 2: ACT
Execute research:
- Use web search for current information
- Fetch URLs for detailed content
- Analyze images/PDFs if relevant
- Use other tools as needed

#### Step 3: OBSERVATION
- Incorporate new information into reasoning
- Note contradictions or gaps
- Update understanding

#### Step 4: RESPOND
Present findings with:
- Step-by-step reasoning shown
- Clear answer with confidence level
- All sources cited

#### Step 5: SOURCE CITATION
**Always cite sources:**
```
[Source: Web Search - url]
[Source: Hindsight]
[Source: Memory files]
```

#### Step 6: CONFIDENCE CALIBRATION
Use granular confidence levels:

| Level | Range | Meaning |
|-------|-------|---------|
| 🔴 Very Low | <30% | Need more research |
| 🟠 Low | 30-50% | Some evidence found |
| 🟡 Medium | 50-70% | Reasonable confidence |
| 🟢 High | 70-90% | Strong evidence |
| 🟢 Very High | 90%+ | Very certain |

#### Step 7: SELF-VERIFICATION
- Double-check key facts
- Flag any contradictions
- If conflicts exist, mention them

#### Step 8: MULTI-SOURCE VERIFICATION
For important claims:
- Check at least 2 independent sources
- Cross-reference with Hindsight memories
- Compare against documented facts in KB

---

### PHASE 2: BRAINSTORM (Force Divergence)

**🔴 CRITICAL: Load the skill file explicitly first:**
```bash
Read skills/brainstorm/SKILL.md
```

**Then use:** `skills/brainstorm/SKILL.md`

Run the full 10-step process:
1. DIVERGENCE - 5 wildly different approaches
2. CROSS-POLLINATION - combine best elements
3. AMPLIFICATION - make it bolder
4. PRESENT - deliver unique solution
5. GOAL SETTING - clarify objectives
6. RISK EVALUATION - assess challenges
7. SCORING MATRIX - rate ideas
8. SAVE TO MEMORY - store results
9. FOLLOW-UP ACTIONS - create tasks
10. CATEGORY TAGS - organize by type

---

### PHASE 3: UPGRADES (Tech Research)

Run the Upgrades process:

#### Step 1: ANALYZE & RESEARCH
- Research thoroughly cool/useful upgrades for your AI experience
- Look for latest developments, fixes, issues

#### Step 2: SEARCH WEB
- Search for latest AI developments
- Check OpenClaw docs
- Check model provider updates

#### Step 3: RESEARCH ISSUES
- Research any API model issues (MiniMax M2.7, OpenClaw)
- Note any known bugs or workarounds

#### Step 4: CHECK CURRENT SETUP
- Verify what you already have installed/configured
- List current versions

#### Step 5: CHECK HINDSIGHT
- Use `skills/hindsight` for full check
- Query Hindsight for previous upgrade discussions
- Review past decisions

#### Step 6: DETAIL EACH UPGRADE
For each upgrade provide:
- **Pros** - Benefits
- **Cons** - Drawbacks
- **Cost** - If any
- **Rating** - Out of 10
- **Priority** - Do Now / Do Later / Skip
- **Complexity** - Easy / Medium / Hard

#### Step 7: COMPARE ALTERNATIVES
- Show options vs. current setup
- Highlight improvements

#### Step 8: PRIORITIZE
- Rank suggestions by actionability
- Consider dependencies

#### Step 9: VERSION TRACKING
Compare versions:
| Component | Current | Latest | Gap |
|-----------|---------|--------|-----|
| OpenClaw | x.x.x | Check docs | - |
| MiniMax | M2.5 | M2.7 | - |
| Model providers | - | - | - |

#### Step 10: AUTO-BACKUP
Before any upgrade analysis:
- Create GitHub backup
- Store snapshot in Hindsight
- Note "pre-upgrade state"

#### Step 11: ROI/COST ESTIMATE
For each upgrade:
- Estimated cost (API, hosting)
- Potential time savings
- ROI rating (High/Medium/Low)

#### Step 12: DEPENDENCY CHECK
Verify integrations after upgrade:
- Discord connection
- Telegram connection
- Notion API
- Hindsight

---

## Output Format

Present ONE unified Mega Dive report:

```markdown
# Mega Dive Results: [TOPIC]

## Phase 1: Research Findings
[Analysis with sources, confidence levels]

## Phase 2: Creative Solutions
[Brainstorm results with scoring matrix]

## Phase 3: Tech Upgrades
[Upgrade recommendations with priority]

### Recommended Actions
1. [Top priority action]
2. [Second priority]
3. [Third priority]

### Backup Created
- GitHub: [commit]
- Hindsight: [snapshot]
```

---

## Error Handling

| Scenario | What to Do |
|----------|------------|
| Web search fails | Use cached knowledge, note limitation |
| Hindsight offline | Continue without memory cross-ref, note it |
| One phase partial | Complete remaining phases anyway |
| Skills missing | Use inline process (don't fail) |

---

## Related Skills

Mega Dive calls/uses these skills:
- `skills/brainstorm` - **Required** for Phase 2
- `skills/hindsight` - For Phase 3 Hindsight check
- `skills/knowledge-base` - For Phase 1 fact verification
- `skills/recent` - For checking recent discussions

Other useful skills:
- `skills/mega-sync` - For system checks after upgrades
- `skills/remember` - For saving results

---

## Examples

### Example 1

**Input:** "deep dive into AI agent business"
**Output:** Research findings + creative solutions + upgrade recommendations

### Example 2
**Input:** "deep dive into AI agent business"
**Output:** Research findings + creative solutions + upgrade recommendations

---

## Pro Tips

- Show confidence levels for all research findings
- Use the scoring matrix to prioritize
- Always create backup before upgrades
- Cite every source
- Present one unified report at the end
- Include actionable next steps

---

## Time Estimate

| Phase | Time |
|-------|------|
| Analyze | 5-15 min |
| Brainstorm | 10-20 min |
| Upgrades | 10-15 min |
| **Total** | **25-50 min** |

---

*Skill version: 1.0 - Last updated: April 24, 2026*