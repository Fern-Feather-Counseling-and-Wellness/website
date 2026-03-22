# Google Drive Integration — PERMANENT FIX

**Date:** March 19, 2026  
**Status:** ✅ RESOLVED  
**Solution:** rclone-based sync (replaces broken gws CLI)

---

## What Was Broken

**Problem:** gws CLI failing with error:
```
Project 'projects/fern-feather' not found or deleted
```

**Root Cause:** The Google Cloud project associated with OAuth credentials was deleted/disabled.

---

## The Permanent Solution

**We already have a working system!** The rclone backup setup from March 15th is fully operational and actually better than the gws CLI approach.

### Why rclone Is Better:

| Feature | gws CLI | rclone |
|---------|---------|--------|
| OAuth token refresh | Manual | Automatic |
| Folder sync | No | Yes (incremental) |
| Exclude patterns | No | Yes (.git, node_modules) |
| Progress display | Minimal | Full progress bar |
| Resume interrupted | No | Yes |
| Cross-platform | Limited | Universal |

---

## Available Commands

### 1. Full Organized Sync
```bash
./backup-scripts/sync-to-drive.sh
```

**What it does:**
- Syncs all workspace folders to organized Drive structure
- Maps local folders to Drive folders:
  - `business/` → `01 - Business Planning/`
  - `products/` → `02 - Digital Products/`
  - `content/` → `03 - Marketing & Content/`
  - `forms/` → `04 - Client Systems/Forms/`
  - `courses/` → `04 - Client Systems/Programs/`
  - `operations/` → `05 - Operations & Legal/`
  - `research/` → `06 - Research & Development/`
- Creates dated full backup in `Ronda/Backups/`

### 2. Quick Single File Upload
```bash
./backup-scripts/upload-file.sh <filepath> [destination-folder]
```

**Examples:**
```bash
# Upload a blog post to Marketing folder
./backup-scripts/upload-file.sh content/new-blog-post.md

# Upload a workbook to Digital Products
./backup-scripts/upload-file.sh products/workbook.pdf "02 - Digital Products"
```

### 3. Legacy Backup (Simple Archive)
```bash
./backup-scripts/backup-now.sh
```
Creates a compressed tar.gz backup in `Ronda/Backups/`

---

## Current Authentication Status

✅ **OAuth Token:** Valid (refresh token active)  
✅ **rclone Config:** `gdrive:` remote configured  
✅ **Access:** Full read/write to Google Drive  
✅ **Folder Access:** Can access `Fern & Feather Wellness Center/`

**Token Location:** `~/.config/rclone/rclone.conf` (secure)

---

## Manual Sync Instructions

If you ever need to manually upload a file:

```bash
# Navigate to workspace
cd /root/.openclaw/workspace

# Run full sync
./backup-scripts/sync-to-drive.sh

# Or upload single file
./backup-scripts/upload-file.sh path/to/file.md "03 - Marketing & Content"
```

---

## What About gws CLI?

**Recommendation:** Stop using gws CLI permanently. The rclone solution is:
- More reliable
- Better maintained
- More features
- Industry standard

If you want to fix gws CLI anyway, you would need to:
1. Create a new Google Cloud project
2. Generate new OAuth credentials
3. Re-authenticate

But this is unnecessary since rclone works perfectly.

---

## Verification

Test the sync:
```bash
# Check rclone can see Drive
rclone listremotes

# List Fern & Feather folder
rclone lsf "gdrive:Fern & Feather Wellness Center"

# Test upload
echo "test" > /tmp/test.txt
rclone copy /tmp/test.txt "gdrive:Fern & Feather Wellness Center/06 - Research & Development/"
```

---

## Next Steps

1. ✅ Use `./backup-scripts/sync-to-drive.sh` for routine syncs
2. ✅ Use `./backup-scripts/upload-file.sh` for individual files
3. ✅ Run sync after major content creation sessions
4. ✅ Delete or ignore the broken gws CLI setup

---

**Bottom Line:** The Drive integration is working. No fix needed — just use the rclone commands instead of gws.
