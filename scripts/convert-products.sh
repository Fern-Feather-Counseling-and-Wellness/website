#!/bin/bash
# Convert Fern & Feather products from Markdown to Word/PDF

PRODUCTS_DIR="/root/.openclaw/workspace/content/products"
EMAILS_DIR="/root/.openclaw/workspace/content/email-sequences"
LEADMAG_DIR="/root/.openclaw/workspace/content/lead-magnets"

echo "Converting Fern & Feather products to Word documents..."

# Convert all products
for file in $PRODUCTS_DIR/*.md; do
    if [ -f "$file" ]; then
        filename=$(basename "$file" .md)
        echo "  Converting: $filename"
        pandoc "$file" -o "$PRODUCTS_DIR/$filename.docx"
    fi
done

echo "Done! Word documents created in: $PRODUCTS_DIR"
echo ""
echo "To convert to PDF (requires LibreOffice or similar):"
echo "  libreoffice --headless --convert-to pdf $PRODUCTS_DIR/*.docx"
