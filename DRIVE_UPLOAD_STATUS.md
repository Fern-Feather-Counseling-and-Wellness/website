# Files to Upload to Google Drive — March 9, 2026

## New Files Created Today (Not Yet in Drive)

### 1. Research & Intelligence
**File:** `research/intelligence-brief-2026-03-09.md`
**Destination:** `Fern & Feather/5 Research & Intelligence/`
**Contents:** 
- TikTok therapy trends (Gen Z self-diagnosis, somatic content rising)
- Somatic therapy mainstreaming evidence (2025-2026)
- Professional development opportunities (Boston Trauma Conference 2026, Safe and Sound Protocol)
- Strategic implications for Fern & Feather
- Action items

### 2. Daily Logs (Already in workspace, should be in Drive)
**Files:** 
- `memory/2026-03-09.md`
- `memory/2026-03-08.md`
- `memory/2026-03-07.md`
- `memory/2026-03-06.md`
- `memory/2026-03-05.md`

**Destination:** `Fern & Feather/6 Admin & Operations/Memory Logs/`
**Note:** These contain all research findings, session notes, and daily activity

---

## Google Drive Upload Issue

**Problem:** gws CLI returning "Project 'projects/fern-feather' not found or deleted"

**Likely Cause:** Google Cloud project associated with the OAuth credentials may have been deleted or disabled

**Solutions:**

### Option 1: Fix the Google Cloud Project (Recommended)
1. Go to https://console.cloud.google.com/
2. Check if project "fern-feather" exists
3. If deleted, may need to recreate or use a different project
4. Update client_secret.json with new project credentials

### Option 2: Manual Upload (Immediate)
Upload these files manually to the Drive for now:
- `/root/.openclaw/workspace/research/intelligence-brief-2026-03-09.md` → `Fern & Feather/5 Research & Intelligence/`

### Option 3: Alternative Tool
Could install and configure rclone or another Drive sync tool

---

## Going Forward — New Workflow

**Rule:** Every piece of research, every deliverable gets:
1. Created as a tangible document in `/root/.openclaw/workspace/`
2. Uploaded to appropriate Google Drive folder
3. No more "just logging in memory files"

**Folder Structure for Deliverables:**
- `1 Business Planning/` — Strategy docs, pricing models
- `2 Digital Products/` — Workbooks, toolkits, lead magnets
- `3 Marketing & Content/` — TikTok scripts, email sequences, blog posts
- `4 Client Systems/` — Intake forms, consent documents
- `5 Research & Intelligence/` — Market research, trend briefs, competitor analysis
- `6 Admin & Operations/` — Memory logs, backlog, internal docs

---

## Backfill Needed

Once Drive sync is working, these should be uploaded:

**Research Documents:**
- [ ] `market-analysis-digital-products.md`
- [ ] `platform-comparison.md`
- [ ] `retreat-venues-georgia-nc.md`
- [ ] `subagent-assessment.md`

**Daily Memory Logs:**
- [ ] `memory/2026-03-01.md`
- [ ] `memory/2026-03-05.md`
- [ ] `memory/2026-03-06.md`
- [ ] `memory/2026-03-07.md`
- [ ] `memory/2026-03-08.md`
- [ ] `memory/2026-03-09.md`

---

**Next Steps:**
1. Decide on Drive sync solution
2. Upload today's intelligence brief
3. Backfill previous research documents
4. Update HEARTBEAT.md to include "upload to Drive" as final step for all deliverables
