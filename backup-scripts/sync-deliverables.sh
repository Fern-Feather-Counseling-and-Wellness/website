#!/bin/bash
# Fern & Feather Deliverable Sync - Smart Version
# Only syncs actual deliverables, not node_modules or system files

set -e

WORKSPACE="/root/.openclaw/workspace"
GDRIVE_BASE="gdrive:Fern & Feather Wellness Center"
BACKUP_DATE=$(date +%Y-%m-%d)

echo "=========================================="
echo "Fern & Feather Deliverable Sync"
echo "Date: ${BACKUP_DATE}"
echo "=========================================="

# Function to sync specific files (not entire directories)
deliverable_sync_files() {
    local source_files="$1"
    local dest_folder="$2"
    local description="$3"
    
    if [ -n "$source_files" ]; then
        echo ""
        echo "📁 Syncing: ${description}"
        echo "   To: Fern & Feather Wellness Center/${dest_folder}/"
        
        # Create temp dir for this batch
        TEMP_BATCH_DIR="/tmp/deliverable-batch-$(date +%s)"
        mkdir -p "${TEMP_BATCH_DIR}"
        
        # Copy only the specific files
        for file in ${source_files}; do
            if [ -f "${WORKSPACE}/${file}" ]; then
                cp "${WORKSPACE}/${file}" "${TEMP_BATCH_DIR}/" 2>/dev/null || true
            fi
        done
        
        # Sync if we have files
        if [ "$(ls -A ${TEMP_BATCH_DIR} 2>/dev/null)" ]; then
            rclone sync "${TEMP_BATCH_DIR}" "${GDRIVE_BASE}/${dest_folder}/" --progress
        fi
        
        # Cleanup
        rm -rf "${TEMP_BATCH_DIR}"
    fi
}

# Function to sync a directory (excluding unwanted files)
deliverable_sync_dir() {
    local source_dir="$1"
    local dest_folder="$2"
    local description="$3"
    
    if [ -d "${WORKSPACE}/${source_dir}" ] && [ "$(ls -A ${WORKSPACE}/${source_dir} 2>/dev/null)" ]; then
        echo ""
        echo "📁 Syncing: ${description}"
        echo "   From: ${source_dir}/"
        echo "   To: Fern & Feather Wellness Center/${dest_folder}/"
        
        # Create filtered temp copy
        TEMP_SYNC_DIR="/tmp/sync-$(date +%s)"
        mkdir -p "${TEMP_SYNC_DIR}"
        
        # Copy files, excluding unwanted directories and file types
        rsync -av --exclude='node_modules' --exclude='.git' --exclude='.env' \
            --exclude='*.key' --exclude='*.pem' --exclude='package*.json' \
            "${WORKSPACE}/${source_dir}/" "${TEMP_SYNC_DIR}/" 2>/dev/null || true
        
        # Sync to Drive
        if [ "$(ls -A ${TEMP_SYNC_DIR} 2>/dev/null)" ]; then
            rclone sync "${TEMP_SYNC_DIR}" "${GDRIVE_BASE}/${dest_folder}/" --progress
        fi
        
        # Cleanup
        rm -rf "${TEMP_SYNC_DIR}"
    fi
}

echo ""
echo "🔄 Starting deliverable sync..."

# 01 - Business Planning
deliverable_sync_files "fern-feather-master-plan.md fern-feather-product-strategy.md fern-feather-pricing-calculator.md" "01 - Business Planning/Master Documents" "Master business documents"
deliverable_sync_dir "research" "01 - Business Planning/Research & Analysis" "Market research and analysis"

# 02 - Digital Products
deliverable_sync_dir "products" "02 - Digital Products/Workbooks & Toolkits" "Digital products (workbooks, toolkits)"

# 03 - Marketing & Content
deliverable_sync_dir "content/tiktok" "03 - Marketing & Content/TikTok Scripts" "TikTok content calendar and scripts"
deliverable_sync_dir "content/email-sequences" "03 - Marketing & Content/Email Sequences" "Email nurture sequences"
deliverable_sync_dir "content/carousels" "03 - Marketing & Content/Social Media Carousels" "Social media carousel content"
deliverable_sync_dir "marketing" "03 - Marketing & Content/Marketing Strategy" "Marketing playbooks and strategy"

# 04 - Client Systems
deliverable_sync_dir "content/intake-forms" "04 - Client Systems/Intake Forms" "Client intake forms and agreements"
deliverable_sync_dir "content/group-therapy" "04 - Client Systems/Group Therapy Programs" "Group therapy curricula"
deliverable_sync_dir "content/yoga-workshops" "04 - Client Systems/Trauma-Informed Yoga" "Yoga workshop materials"

# 05 - Operations & Legal
deliverable_sync_dir "content/sublease" "05 - Operations & Legal/Sublease Agreements" "Sublease agreement templates"
deliverable_sync_dir "content/supervision" "05 - Operations & Legal/Supervision Materials" "Supervision curriculum"
deliverable_sync_dir "content/referral-network" "05 - Operations & Legal/Referral Network" "Referral network framework"

# 06 - Research & Development
deliverable_sync_dir "research" "06 - Research & Development/Market Intelligence" "Research and intelligence briefs"

# Full workspace backup (archival only - key files only)
echo ""
echo "📦 Creating full workspace backup (key files only)..."
BACKUP_NAME="full-backup-${BACKUP_DATE}"
TEMP_DIR="/tmp/${BACKUP_NAME}"
mkdir -p "${TEMP_DIR}"

# Copy only important files (no node_modules, no .git)
rsync -av --exclude='node_modules' --exclude='.git' --exclude='.env' \
    --exclude='*.key' --exclude='*.pem' --exclude='package*.json' \
    "${WORKSPACE}/" "${TEMP_DIR}/" 2>/dev/null || true

# Create archive
tar -czf "/tmp/${BACKUP_NAME}.tar.gz" -C /tmp "${BACKUP_NAME}"

# Upload to archive folder
rclone copy "/tmp/${BACKUP_NAME}.tar.gz" "${GDRIVE_BASE}/06 - Research & Development/Archive/" --progress

# Cleanup
rm -rf "${TEMP_DIR}" "/tmp/${BACKUP_NAME}.tar.gz"

echo ""
echo "=========================================="
echo "✅ Deliverable sync complete!"
echo "=========================================="
echo ""
echo "📍 Locations:"
echo "   • Business docs → 01 - Business Planning/"
echo "   • Products → 02 - Digital Products/"
echo "   • Marketing → 03 - Marketing & Content/"
echo "   • Client systems → 04 - Client Systems/"
echo "   • Operations → 05 - Operations & Legal/"
echo "   • Research → 06 - Research & Development/"
echo "   • Full backup → 06 - Research & Development/Archive/"
echo "=========================================="
