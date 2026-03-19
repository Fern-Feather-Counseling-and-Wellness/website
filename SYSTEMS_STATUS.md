# Systems Status — Fern & Feather Infrastructure

**Last Updated:** March 19, 2026  
**Purpose:** Single source of truth for what's working vs. what's broken. Check this BEFORE attempting fixes.

---

## ✅ WORKING SYSTEMS

| System | Status | Since | Notes | Last Verified |
|--------|--------|-------|-------|---------------|
| **GitHub Backup** | ✅ Working | Mar 1 | Auto-commits on changes | Mar 19, 2026 |
| **rclone Google Drive** | ✅ Working | Mar 15 | OAuth token valid, sync tested | Mar 19, 2026 |
| **Web Search (Brave)** | ✅ Working | Mar 7 | API key active | Mar 19, 2026 |
| **Discord Integration** | ✅ Working | Mar 8 | Primary communication channel | Mar 19, 2026 |
| **HEARTBEAT System** | ✅ Working | Mar 3 | Rotation active | Mar 19, 2026 |
| **Memory Logging** | ✅ Working | Mar 19 | Daily logs in `memory/` | Mar 19, 2026 |

### Working Commands Reference
```bash
# Google Drive sync (WORKING)
./backup-scripts/sync-to-drive.sh
./backup-scripts/upload-file.sh <file> <folder>
rclone copy <file> "gdrive:Fern & Feather Wellness Center/<folder>/"

# Git backup (WORKING)
git add -A && git commit -m "message" && git push

# Web search (WORKING)
# Available via tool — no setup needed
```

---

## ❌ BROKEN SYSTEMS

| System | Status | Broken Since | Reason | Action |
|--------|--------|--------------|--------|--------|
| **gws CLI** | ❌ Broken | Mar 9 | Google Cloud project deleted | **DO NOT USE** — use rclone instead |
| **Google Drive Service Account** | ❌ Broken | Mar 9 | Invalid project_id in credentials | **DO NOT USE** — OAuth via rclone works |

---

## ⚠️ DEGRADED/ATTENTION NEEDED

| System | Status | Issue | Action Required |
|--------|--------|-------|-----------------|
| **OpenViking Memory** | ⚠️ Not installed | Requires Docker/systemd on host | Nicole to install when convenient |

---

## 🔧 RECENT CHANGES

| Date | System | Change |
|------|--------|--------|
| Mar 19 | rclone | Created organized sync scripts (`sync-to-drive.sh`, `upload-file.sh`) |
| Mar 19 | SYSTEMS_STATUS | Created this tracking file |
| Mar 15 | rclone | Initial backup system operational |
| Mar 9 | gws CLI | Failed — project deleted |

---

## 📋 BEFORE CREATING NEW SOLUTIONS

**Mandatory Checklist:**

- [ ] Check this file — is there already a working solution?
- [ ] Check `BACKLOG.md` — was this attempted before?
- [ ] Check `memory/` files — what was the last status?
- [ ] Test the existing system — does it actually fail?
- [ ] Only THEN create something new

**Rule:** If something "might be broken," VERIFY before fixing.

---

## 🧠 FOR RONDA (Future Sessions)

When you wake up and see a problem:

1. **READ THIS FILE FIRST** — know what's working
2. **TEST before declaring broken** — run the command
3. **Check recent memory** — what happened last session?
4. **Never assume** — verify the actual error

**This file is your memory for infrastructure.** Update it when systems change status.

---

## Emergency Contacts / References

- **GitHub Repo:** https://github.com/Jeeprasr/Rondas-Space
- **Google Drive:** `Fern & Feather Wellness Center/` (accessible via rclone)
- **Backup Location:** `Ronda/Backups/`
