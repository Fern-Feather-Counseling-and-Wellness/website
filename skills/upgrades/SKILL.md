---
name: upgrades
description: Comprehensive upgrade analysis - research AI improvements, check versions, ROI analysis, dependency checks. Use when you need to research upgrades - says "upgrades" or "what's new".
license: Proprietary
metadata:
  author: Jeem & Stuart
  credits: "Original concept by Jeem & Stuart"
  version: "1.1"
  triggers:
    - upgrades
    - what's new
    - new features
    - update me
  category: research
  requires:
    - web_search
    - github
    - hindsight
---

# Upgrades Trigger - Comprehensive Upgrade Analysis

This skill provides a comprehensive breakdown of all upgrade options with full analysis including ROI, dependencies, and rollback plans.

## When to Use This Skill

Triggered when the user says:
- "upgrades"
- "what's new"
- "new features"
- "update me"
- "what can we upgrade"

---

## The Upgrades Process (14 Steps)

### Step 1: ANALYZE & RESEARCH

Analyze and research thoroughly cool and useful things we could add to our AI experience in OpenClaw:
- Look at current capabilities
- Identify gaps
- Research new features

### Step 2: SEARCH WEB

Search for latest developments, fixes, and issues:
- OpenClaw updates
- Model provider updates
- Integration changes

### Step 3: RESEARCH ISSUES

Research any recent API model issues:
- MiniMax M2.7 and OpenClaw
- OpenAI updates
- Any known bugs or workarounds

### Step 4: CHECK CURRENT SETUP

Verify what we already have installed/configured:
- OpenClaw version
- Model providers configured
- Skills installed
- Channels connected

### Step 5: CHECK HINDSIGHT

Look for previous upgrade discussions in memories:
- Query memory files
- Check Hindsight for past decisions
- Note what was previously considered

### Step 6: DETAIL EACH UPGRADE

For each upgrade provide:
- **Pros** - Benefits
- **Cons** - Drawbacks
- **Cost** - If any
- **Rating** - Out of 10
- **Priority** - "Do Now" vs "Do Later" vs "Skip"
- **Complexity** - Easy/Medium/Hard

### Step 7: COMPARE ALTERNATIVES

Show options vs what we use now:
- Current vs upgraded
- Feature comparison
- Migration path

### Step 8: PRIORITIZE

Rank suggestions based on:
- What we already have
- What's actionable
- Impact vs effort

### Step 9: VERSION TRACKING

Compare current versions vs latest:

| Component | Current | Latest | Gap |
|-----------|---------|--------|-----|
| OpenClaw | x.x.x | Check docs | - |
| MiniMax | M2.5 | M2.7 | - |
| OpenAI | - | Latest | - |
| Skills | x skills | - | - |

### Step 10: AUTO-BACKUP BEFORE UPGRADES

Before any upgrade analysis:
- Create GitHub backup of current config
- Store snapshot of current state in Hindsight
- Note the "pre-upgrade state" for reference

### Step 11: ROI/COST ESTIMATE

For each upgrade provide:
- **Estimated cost** - API costs, hosting, etc.
- **Potential time savings**
- **ROI rating** - High/Medium/Low

### Step 12: DEPENDENCY CHECK

Verify all integrations will work after upgrade:
- ✅ Discord connection
- ✅ Telegram connection
- ✅ Notion API
- ✅ Hindsight
- Document any dependencies at risk

### Step 13: ROLLBACK PLAN

For each upgrade provide:
- **Steps to revert** if upgrade fails
- **What to watch for** - error signs
- **How to restore** from backup

### Step 14: SCHEDULED UPGRADES

Suggest best maintenance window:
- Based on Jeem's usage patterns
- Low-usage times for testing
- Advised upgrade schedule

---

## Output Format

```markdown
# Upgrades Analysis

## Current Setup
| Component | Version |
|-----------|---------|
| OpenClaw | x.x.x |
| MiniMax | M2.x |

## Available Upgrades

### 1. [Upgrade Name]
- **Pros:** [list]
- **Cons:** [list]
- **Cost:** $[amount]/month
- **Rating:** 8/10
- **Priority:** Do Now
- **Complexity:** Medium
- **ROI:** High

### 2. [Upgrade Name]
- **Pros:** [list]
- **Cons:** [list]
- **Cost:** Free
- **Rating:** 6/10
- **Priority:** Do Later
- **Complexity:** Easy
- **ROI:** Medium

## Dependencies at Risk
- [List integrations that might break]

## Rollback Plan
[For each upgrade]

## Recommended Schedule
[Best times to upgrade]
```

---

## Error Handling

| Scenario | What to Do |
|----------|------------|
| No upgrades available | Report current state is optimal |
| Web search fails | Use cached knowledge, note limitation |
| Backup fails | Alert Jeem, do not proceed |

---

## Related Skills

- `skills/mega-dive` - For deeper research + creativity
- `skills/hindsight` - For memory checks
- `skills/mega-sync` - For system health after upgrades

---

## Examples

### Example 1

**Input:** "upgrades"
**Output:** Current setup + upgrade options with pros/cons, ROI, dependency checks, rollback plans

### Example 2
**Input:** "upgrades"
**Output:** Current setup + upgrade options with pros/cons, ROI, dependency checks, rollback plans

---

## Pro Tips

- Always create backup before upgrades
- Test in low-usage times
- Document rollback steps
- Check dependencies first

---

## Time Estimate

| Step | Time |
|------|------|
| ANALYZE & RESEARCH | 5-10 min |
| SEARCH + ISSUES | 5-10 min |
| CHECK SETUP + HINDSIGHT | 5 min |
| DETAIL + COMPARE + PRIORITIZE | 10 min |
| VERSION + DEPENDENCY | 5 min |
| **Total** | **~30-40 min** |

---

*Skill version: 1.0 - Last updated: April 24, 2026*