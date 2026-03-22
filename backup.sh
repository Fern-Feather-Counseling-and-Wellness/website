#!/bin/bash
# Auto-backup script for Fern & Feather workspace
# Run this after every meaningful file change

cd /root/.openclaw/workspace

# Check if there are changes
if [ -n "$(git status --porcelain)" ]; then
    git add -A
    git commit -m "Auto-backup: $(date '+%Y-%m-%d %H:%M UTC') - ${1:-'Workspace update'}"
    git push origin master
    echo "✅ Backed up at $(date)"
else
    echo "No changes to backup"
fi