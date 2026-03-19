#!/bin/bash
# Quick upload a single file to Fern & Feather Drive
# Usage: ./upload-file.sh <filepath> [destination-folder]

FILE="$1"
DEST="${2:-03 - Marketing & Content}"

if [ -z "$FILE" ]; then
    echo "Usage: ./upload-file.sh <filepath> [destination-folder]"
    echo ""
    echo "Examples:"
    echo "  ./upload-file.sh content/new-blog-post.md"
    echo "  ./upload-file.sh products/workbook.pdf '02 - Digital Products'"
    exit 1
fi

if [ ! -f "$FILE" ]; then
    echo "❌ File not found: $FILE"
    exit 1
fi

echo "📤 Uploading: $FILE"
echo "📁 Destination: Fern & Feather Wellness Center/$DEST/"
echo ""

rclone copy "$FILE" "gdrive:Fern & Feather Wellness Center/$DEST/" --progress

echo ""
echo "✅ Upload complete!"
