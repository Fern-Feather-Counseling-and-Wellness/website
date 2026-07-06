---
name: skill-audit
description: Analyze all Agent Skills, identify improvements, categorize issues by priority. Use when reviewing skills - says "skill audit", "audit skills", or "review all skills".
license: Proprietary
metadata:
  author: Jeem & Stuart
  credits: "Original concept by Jeem & Stuart"
  version: "1.0"
  triggers:
    - skill audit
    - audit skills
    - review all skills
    - improve skills
    - mega dive into skills
  category: system
  requires:
    - filesystem
    - web_search
---

# Skill Audit - Comprehensive Skills Analysis

This skill analyzes ALL Agent Skills, identifies issues, and provides categorized recommendations for improvement. It follows the same process we used on April 24, 2026.

## When to Use This Skill

Triggered when the user says:
- "skill audit"
- "audit skills"
- "review all skills"
- "improve skills"
- "mega dive into skills"
- "analyze our skills"

---

## The Skill Audit Process (8 Steps)

### Step 1: DISCOVER SKILLS

List all skills in the skills directory:
```bash
ls -la skills/
```

Identify count and categories.

### Step 2: ANALYZE EACH SKILL

For each skill, verify:
- ✅ YAML frontmatter present (name, description, version, triggers)
- ✅ Has SKILL.md
- ✅ Has references/ directory
- ✅ Error handling table
- ✅ Examples section
- ✅ Time estimate
- ✅ Related skills documented

### Step 3: RESEARCH BEST PRACTICES

Search for AI agent skill best practices:
- Agent Skills specification (agentskills.io)
- YAML frontmatter standards
- Common patterns from Claude/Anthropic documentation

### Step 4: IDENTIFY ISSUES

Categorize by severity:

| Priority | Category | Description |
|----------|----------|--------------|
| 🔴 HIGH | Critical errors | Missing fallback, broken verification |
| 🟡 MEDIUM | Logic gaps | Missing skill load, unclear steps |
| 🟢 LOW | Enhancements | Version bumps, tags, templates |

### Step 5: CATEGORIZABLE COMMON ISSUES

Check each skill for these common issues:

**HIGH Priority:**
- No error handling for API failures
- No verification steps
- Missing fallbacks when calls fail
- No explicit skill file loading

**MEDIUM Priority:**
- Missing clarifying questions (Advise)
- Quotes not defined (Creative Spark)
- No explicit skill loading (Mega Dive)
- Missing examples section

**LOW Priority:**
- Older version number
- Missing tags in frontmatter
- No scoring matrix template
- No parallel execution hints

### Step 6: VERIFY STRUCTURE

Ensure each skill follows Agent Skills spec:
- YAML frontmatter with required fields
- Clear step-by-step instructions
- Examples section
- Error handling table
- Related skills section

### Step 7: COMPARE AGAINST BENCHMARKS

Research current best practices:
- Web search for "AI agent skill best practices"
- Check Anthropic/Agent Skills specification
- Compare structure against standard patterns

### Step 8: PRESENT RECOMMENDATIONS

Output comprehensive report:

```markdown
# 🔍 Skill Audit Complete!

## Summary
- Skills reviewed: X
- 🔴 HIGH issues: X
- 🟡 MEDIUM issues: X  
- 🟢 LOW issues: X

## Issues by Skill
| Skill | Priority | Issue | Fix |
|-------|----------|-------|-----|
| diary | 🔴 HIGH | No audio fallback | Add retry + text-only |
| mega-dive | 🟡 MEDIUM | Missing skill load | Add explicit read |
| ... | ... | ... | ... |

## Recommendations by Priority

### 🔴 HIGH (Must Fix)
1. [Issue description]
   - Fix: [solution]

### 🟡 MEDIUM (Should Fix)
1. [Issue description]
   - Fix: [solution]

### 🟢 LOW (Nice to Have)
1. [Issue description]
   - Fix: [solution]

## What's Working Well
- [List strengths]

## Next Steps
[Waiting for user approval to implement]
```

---

## Issue Categories (Reference)

### HIGH Priority Issues Include:
- No error handling when external APIs fail
- Missing fallback for voice/image generation
- No verification steps to confirm completion
- Critical missing information

### MEDIUM Priority Issues Include:
- Missing clarifying questions before research
- Skills referenced but not explicitly loaded
- No quote collection when needed
- Duplicate or unclear trigger words

### LOW Priority Issues Include:
- Version not bumped after changes
- Missing tags in frontmatter
- No scoring matrix templates
- No performance hints

---

## Examples

### Example 1
**Input:** "skill audit"
**Output:** Complete audit report with issues categorized by priority, recommendations ready for implementation

### Example 2
**Input:** "review all skills"
**Output:** Summary table of all skills, strengths, weaknesses, improvement roadmap

---

## Pro Tips

- Be systematic - review each skill the same way
- Categorize issues strictly - don't inflate LOW to HIGH
- Include specific code fixes, not just descriptions
- Wait for user approval before implementing
- Create follow-up skill for implementation if needed

---

## Time Estimate

| Step | Time |
|------|------|
| DISCOVER SKILLS | 1 min |
| ANALYZE EACH | 5-10 min |
| RESEARCH | 5 min |
| IDENTIFY ISSUES | 5 min |
| CATEGORIZE | 2 min |
| VERIFY | 2 min |
| COMPARE | 3 min |
| PRESENT | 3 min |
| **Total** | **~25-35 min** |

---

*Skill version: 1.0 - Last updated: April 24, 2026*