# Open Source Tools Research for Fern & Feather
## GitHub Repos for Implementation Testing

**Date:** March 7, 2026  
**Research Focus:** AI coding assistants, practice management, CRM  
**Status:** Ready for testing/evaluation

---

## 🤖 AI Coding Assistants (Claude Code Alternatives)

### 1. **Cline** ⭐ TOP RECOMMENDATION
- **GitHub:** https://github.com/cline/cline
- **Type:** VS Code extension
- **Stars:** 5M+ users
- **License:** Open source
- **Features:**
  - Autonomous coding agent in IDE
  - Plan/Act modes
  - MCP (Model Context Protocol) integration
  - Terminal access + browser capabilities
  - Multi-model support (Claude, GPT-4, Gemini)
  - File creation/editing with permission
- **Use Case:** Direct replacement for Claude Code
- **Testing Priority:** HIGH

### 2. **Continue.dev**
- **GitHub:** https://github.com/continuedev/continue
- **Type:** VS Code + JetBrains extension
- **License:** Open source
- **Features:**
  - Source-controlled AI checks
  - CI/CD integration
  - Custom autocomplete + chat
  - Any model, any context
  - Markdown-based checks
- **Use Case:** Code review automation, team workflows
- **Testing Priority:** MEDIUM

### 3. **Aider**
- **GitHub:** https://github.com/Aider-AI/aider
- **Type:** Terminal-based
- **License:** Open source
- **Features:**
  - Multi-file coordinated changes
  - Natural language to code
  - Auto git commits
  - DeepSeek, Claude, OpenAI support
- **Use Case:** Git-integrated pair programming
- **Testing Priority:** MEDIUM

### 4. **OpenWork**
- **GitHub:** https://github.com/different-ai/openwork
- **Type:** Team collaboration
- **License:** Open source
- **Features:**
  - Claude Cowork alternative
  - Team-based workflows
  - Opencode powered
- **Use Case:** Multi-user AI collaboration
- **Testing Priority:** LOW (newer, less proven)

---

## 🏥 Practice Management (Therapy-Specific)

### 1. **OpenEMR** ⭐ MOST POPULAR
- **GitHub:** https://github.com/openemr/openemr
- **Type:** Full EHR + practice management
- **License:** Open source (GPL)
- **Features:**
  - Electronic health records
  - Scheduling
  - Billing/insurance
  - Patient portal
  - Reporting
- **Pros:** Mature, widely used, ONC certified
- **Cons:** Medical-focused (not therapy-specific), complex setup
- **Use Case:** Full practice infrastructure
- **Testing Priority:** MEDIUM (may be overkill)

### 2. **ClearHealth**
- **GitHub:** https://github.com/clearhealth/clearhealth
- **Type:** Practice management + EMR
- **License:** Open source
- **Features:**
  - Scheduling
  - Billing
  - Patient records
- **Status:** Less active than OpenEMR
- **Testing Priority:** LOW

---

## 👥 CRM & Client Management

### 1. **SuiteCRM** ⭐ MOST MATURE
- **GitHub:** https://github.com/SuiteCRM/SuiteCRM
- **Type:** Full-featured CRM
- **License:** Open source (AGPL)
- **Features:**
  - Contact management
  - Sales pipeline
  - Marketing automation
  - Reporting
  - Workflow automation
- **Pros:** SugarCRM fork, very mature, highly customizable
- **Cons:** Complex, may be overkill for solo practice
- **Use Case:** Client relationship management, sales tracking
- **Testing Priority:** MEDIUM

### 2. **Krayin Laravel CRM**
- **GitHub:** https://github.com/krayin/laravel-crm
- **Type:** Laravel-based CRM
- **License:** Open source
- **Features:**
  - Customer lifecycle management
  - Lead tracking
  - Invoicing
  - Modern Laravel stack
- **Pros:** Modern codebase, easier to customize
- **Cons:** Newer, smaller community
- **Use Case:** Lightweight CRM for small practice
- **Testing Priority:** HIGH (better fit for Fern & Feather)

### 3. **Peppermint** (Invoice/Client Management)
- **GitHub:** Search: github.com/topics/crm → peppermint
- **Type:** Self-hosted invoicing + client management
- **License:** Open source
- **Features:**
  - Invoice management
  - Client tracking
  - Payment tracking
- **Use Case:** Simple billing + client records
- **Testing Priority:** MEDIUM

---

## 🎯 Recommended Testing Priority

### Phase 1: AI Coding (Immediate)
1. **Cline** — Install VS Code extension, test with Fern & Feather codebase
2. Compare to current Claude Code experience
3. Evaluate: speed, accuracy, multi-file handling

### Phase 2: CRM (Next 2 weeks)
1. **Krayin Laravel CRM** — Spin up local instance
2. Test: client intake workflow, session tracking, basic reporting
3. Compare to SimplePractice/TherapyNotes pricing

### Phase 3: Practice Management (Later)
1. **OpenEMR** — Only if HIPAA compliance becomes critical
2. Evaluate: scheduling, billing, notes integration
3. Decision: Build vs buy vs open source

---

## ⚡ Quick Test Plan

### Cline (30 minutes)
```bash
# 1. Install VS Code
# 2. Install Cline extension
# 3. Connect API key (Claude/OpenAI)
# 4. Open Fern & Feather workspace
# 5. Test: "Create a Python script to calculate revenue projections"
# 6. Evaluate: speed, quality, git integration
```

### Krayin CRM (1 hour)
```bash
# 1. Clone repo
git clone https://github.com/krayin/laravel-crm.git
# 2. Follow setup instructions (Docker recommended)
# 3. Create test client: "Nicole Test"
# 4. Add mock session notes
# 5. Test: reporting, search, workflow
# 6. Evaluate: usability, customization needs
```

---

## 💰 Cost Comparison

| Tool | Open Source Cost | Commercial Alternative | Savings |
|------|-----------------|----------------------|---------|
| Cline | Free (API costs only) | Claude Code: $20/mo | $240/year |
| Krayin CRM | Free (hosting: $10/mo) | SimplePractice: $39/mo | $348/year |
| OpenEMR | Free (hosting: $20/mo) | TherapyNotes: $59/mo | $468/year |
| **Total** | **~$30/mo** | **~$118/mo** | **$1,056/year** |

---

## 🔒 Security & HIPAA Considerations

**⚠️ WARNING:** None of these open source tools are HIPAA-compliant out-of-the-box.

### For Fern & Feather (Pre-Launch):
- ✅ Testing/development: Safe
- ✅ Non-client data: Safe
- ❌ Real client PHI: NOT SAFE

### To Make HIPAA-Compliant:
1. Business Associate Agreements (BAAs) with hosting
2. Encryption at rest + in transit
3. Access controls + audit logs
4. Regular security updates
5. Penetration testing

**Recommendation:** Use open source for operations/business management. Use commercial HIPAA-compliant platforms (SimplePractice, TherapyNotes) for actual client data until you can afford proper compliance infrastructure.

---

## 📝 Next Steps

1. **Test Cline this week** — 30 min evaluation
2. **Decision:** Keep Claude Code or switch?
3. **Test Krayin CRM** — 1 hour evaluation
4. **Decision:** Use for business operations?
5. **Document findings** — Update this file with test results

---

## 🔗 Links Summary

**AI Coding:**
- Cline: https://github.com/cline/cline
- Continue: https://github.com/continuedev/continue
- Aider: https://github.com/Aider-AI/aider

**Practice Management:**
- OpenEMR: https://github.com/openemr/openemr
- ClearHealth: https://github.com/clearhealth/clearhealth

**CRM:**
- SuiteCRM: https://github.com/SuiteCRM/SuiteCRM
- Krayin: https://github.com/krayin/laravel-crm

---

*Document created: March 7, 2026*  
*Next update: After testing Cline and Krayin*
