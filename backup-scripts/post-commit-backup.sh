#!/bin/bash
# Post-commit backup - Run after git commits
# This ensures every meaningful change is backed up to Google Drive

echo "🔄 Triggering backup to Google Drive..."
/root/.openclaw/workspace/backup-scripts/backup-to-drive.sh
