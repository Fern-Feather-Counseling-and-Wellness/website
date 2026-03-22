#!/bin/bash
# Preview Fern & Feather Website Locally

echo "=========================================="
echo "Fern & Feather Website Preview"
echo "=========================================="
echo ""

# Check if Python is available
if command -v python3 &> /dev/null; then
    PYTHON=python3
elif command -v python &> /dev/null; then
    PYTHON=python
else
    echo "❌ Python not found. Please install Python 3."
    exit 1
fi

echo "✅ Python found: $PYTHON"
echo ""
echo "Starting local server..."
echo ""
echo "🌐 Open your browser and go to:"
echo "   http://localhost:8000"
echo ""
echo "📁 Website files are in: website/"
echo ""
echo "Press Ctrl+C to stop the server"
echo "=========================================="

# Start the server in the website directory
cd /root/.openclaw/workspace/website && $PYTHON -m http.server 8000
