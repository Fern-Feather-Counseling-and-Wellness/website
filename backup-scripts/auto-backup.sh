#!/bin/bash
# Auto-backup trigger - Run this after any significant file creation/modification
# Usage: source /root/.openclaw/workspace/backup-scripts/auto-backup.sh

BACKUP_DIR="/root/.openclaw/workspace/backup-scripts"
LAST_BACKUP_FILE="${BACKUP_DIR}/.last-backup-time"
MIN_BACKUP_INTERVAL=300  # Minimum 5 minutes between backups (in seconds)

# Check if enough time has passed since last backup
if [ -f "$LAST_BACKUP_FILE" ]; then
    LAST_BACKUP=$(cat "$LAST_BACKUP_FILE")
    CURRENT_TIME=$(date +%s)
    TIME_DIFF=$((CURRENT_TIME - LAST_BACKUP))
    
    if [ $TIME_DIFF -lt $MIN_BACKUP_INTERVAL ]; then
        # Too soon, skip backup
        exit 0
    fi
fi

# Run backup silently in background
${BACKUP_DIR}/backup-to-drive.sh > /dev/null 2>&1 &

# Update last backup time
date +%s > "$LAST_BACKUP_FILE"
