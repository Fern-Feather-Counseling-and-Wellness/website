#!/bin/bash
# Fern & Feather Google Drive Sync System
# Permanent replacement for broken gws CLI
# Uses rclone with OAuth (already authenticated)

set -e

WORKSPACE_DIR="/root/.openclaw/workspace"
GDRIVE_BASE="gdrive:Fern & Feather Wellness Center"
BACKUP_DIR="gdrive:Ronda/Backups"
LOG_FILE="${WORKSPACE_DIR}/.sync-log.txt"

echo "=========================================="
echo "Fern & Feather Drive Sync"
echo "$(date)"
echo "=========================================="

# Function to sync a folder
sync_folder() {
    local src="$1"
    local dest="$2"
    local name="$3"
    
    if [ -d "$src" ]; then
        echo "📁 Syncing: $name"
        rclone sync "$src" "$dest" \
            --progress \
            --exclude=".git/**" \
            --exclude="node_modules/**" \
            --exclude=".env" \
            --exclude="*.key" \
            --exclude="*.pem" \
            --log-file="$LOG_FILE" \
            --log-level=INFO 2>&1 | tail -20
        echo "✅ $name complete"
        echo ""
    fi
}

# Sync organized folders to Drive structure
echo "🔄 Starting organized sync..."
echo ""

# 01 - Business Planning (strategic docs, pricing, market analysis)
if [ -d "${WORKSPACE_DIR}/business" ]; then
    sync_folder "${WORKSPACE_DIR}/business" "${GDRIVE_BASE}/01 - Business Planning" "Business Planning"
fi

# 02 - Digital Products (workbooks, toolkits, lead magnets)
if [ -d "${WORKSPACE_DIR}/products" ]; then
    sync_folder "${WORKSPACE_DIR}/products" "${GDRIVE_BASE}/02 - Digital Products" "Digital Products"
fi

# Also sync fern-feather-workbooks directory
if [ -d "${WORKSPACE_DIR}/fern-feather-workbooks" ]; then
    sync_folder "${WORKSPACE_DIR}/fern-feather-workbooks" "${GDRIVE_BASE}/02 - Digital Products/Workbooks" "Workbooks Archive"
fi

# 03 - Marketing & Content (TikTok, emails, blog posts, carousels)
if [ -d "${WORKSPACE_DIR}/content" ]; then
    sync_folder "${WORKSPACE_DIR}/content" "${GDRIVE_BASE}/03 - Marketing & Content" "Marketing Content"
fi

# Also sync marketing directory
if [ -d "${WORKSPACE_DIR}/marketing" ]; then
    sync_folder "${WORKSPACE_DIR}/marketing" "${GDRIVE_BASE}/03 - Marketing & Content/Strategy" "Marketing Strategy"
fi

# 04 - Client Systems (intake forms, consent, programs)
if [ -d "${WORKSPACE_DIR}/forms" ]; then
    sync_folder "${WORKSPACE_DIR}/forms" "${GDRIVE_BASE}/04 - Client Systems/Forms" "Client Forms"
fi

if [ -d "${WORKSPACE_DIR}/courses" ]; then
    sync_folder "${WORKSPACE_DIR}/courses" "${GDRIVE_BASE}/04 - Client Systems/Programs" "Client Programs"
fi

# 05 - Operations & Legal (SOPs, agreements, admin)
if [ -d "${WORKSPACE_DIR}/operations" ]; then
    sync_folder "${WORKSPACE_DIR}/operations" "${GDRIVE_BASE}/05 - Operations & Legal" "Operations"
fi

# 06 - Research & Development (market research, analysis)
if [ -d "${WORKSPACE_DIR}/research" ]; then
    sync_folder "${WORKSPACE_DIR}/research" "${GDRIVE_BASE}/06 - Research & Development" "Research & Intelligence"
fi

# Also sync individual strategic documents at root level
echo "📄 Syncing strategic documents..."
for file in \
    "fern-feather-master-plan.md" \
    "fern-feather-product-strategy.md" \
    "fern-feather-pricing-calculator.md" \
    "market-analysis-digital-products.md" \
    "BACKLOG.md" \
    "HEARTBEAT.md" \
    "USER.md" \
    "SOUL.md"
do
    if [ -f "${WORKSPACE_DIR}/$file" ]; then
        echo "  → $file"
        rclone copy "${WORKSPACE_DIR}/$file" "${GDRIVE_BASE}/01 - Business Planning/" 2>/dev/null || true
    fi
done

# Create full workspace backup to Ronda/Backups (archive)
echo ""
echo "📦 Creating full workspace backup..."
BACKUP_DATE=$(date +%Y-%m-%d_%H-%M-%S)
BACKUP_NAME="fern-feather-full-backup-${BACKUP_DATE}"
TEMP_DIR="/tmp/${BACKUP_NAME}"

mkdir -p "${TEMP_DIR}"

# Copy all workspace files
cp -r "${WORKSPACE_DIR}"/* "${TEMP_DIR}/" 2>/dev/null || true

# Create archive
tar -czf "/tmp/${BACKUP_NAME}.tar.gz" -C /tmp "${BACKUP_NAME}" 2>/dev/null

# Upload backup
if [ -f "/tmp/${BACKUP_NAME}.tar.gz" ]; then
    rclone copy "/tmp/${BACKUP_NAME}.tar.gz" "$BACKUP_DIR" --progress 2>&1 | tail -5
    rm -f "/tmp/${BACKUP_NAME}.tar.gz"
    echo "✅ Backup uploaded: ${BACKUP_NAME}.tar.gz"
fi

rm -rf "${TEMP_DIR}"

echo ""
echo "=========================================="
echo "✅ Sync complete!"
echo "📁 Organized files: Fern & Feather Wellness Center/"
echo "📦 Full backup: Ronda/Backups/"
echo "📝 Log: .sync-log.txt"
echo "=========================================="
