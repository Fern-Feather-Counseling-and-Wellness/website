#!/bin/bash
# Fern & Feather Daily Backup Script
# Automatically backs up workspace to Google Drive

set -e

BACKUP_DATE=$(date +%Y-%m-%d_%H-%M-%S)
BACKUP_NAME="fern-feather-backup-${BACKUP_DATE}"
TEMP_DIR="/tmp/${BACKUP_NAME}"
GDRIVE_FOLDER="Ronda/Backups"
WORKSPACE_DIR="/root/.openclaw/workspace"

echo "=========================================="
echo "Fern & Feather Backup - ${BACKUP_DATE}"
echo "=========================================="

# Create temp directory
mkdir -p "${TEMP_DIR}"

# Copy workspace files (excluding .git and sensitive files)
echo "Copying workspace files..."
rsync -av --exclude='.git' --exclude='.env' --exclude='*.key' --exclude='*.pem' \
    "${WORKSPACE_DIR}/" "${TEMP_DIR}/" 2>/dev/null || cp -r "${WORKSPACE_DIR}"/* "${TEMP_DIR}/" 2>/dev/null || true

# Create tar.gz archive
echo "Creating archive..."
tar -czf "/tmp/${BACKUP_NAME}.tar.gz" -C /tmp "${BACKUP_NAME}"

# Upload to Google Drive
echo "Uploading to Google Drive..."
rclone copy "/tmp/${BACKUP_NAME}.tar.gz" "gdrive:${GDRIVE_FOLDER}/" --progress

# Cleanup temp files
rm -rf "${TEMP_DIR}" "/tmp/${BACKUP_NAME}.tar.gz"

echo ""
echo "✅ Backup complete: ${BACKUP_NAME}.tar.gz"
echo "📁 Location: Google Drive/${GDRIVE_FOLDER}/"
echo "=========================================="
