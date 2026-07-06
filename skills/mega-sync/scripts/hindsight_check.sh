#!/bin/bash
# Mega Sync Helper - Runs Hindsight health checks
# Usage: ./hindsight_check.sh

HINDSIGHT_URL="https://glutinous-meda-excrescently.ngrok-free.dev"

echo "=== Hindsight Health Check ==="
echo ""

# Check 1: Health
echo "1. Health check..."
curl -s -o /dev/null -w "%{http_code}" "$HINDSIGHT_URL/health" 2>/dev/null | grep -q "200" && echo "   ✅ Healthy" || echo "   ❌ Offline"

# Check 2: Stats
STATS=$(curl -s "$HINDSIGHT_URL/v1/default/banks/default/stats" 2>/dev/null)
if [ -n "$STATS" ]; then
    NODES=$(echo "$STATS" | grep -o '"total_nodes":[0-9]*' | cut -d: -f2)
    LINKS=$(echo "$STATS" | grep -o '"total_links":[0-9]*' | cut -d: -f2)
    OBS=$(echo "$STATS" | grep -o '"total_observations":[0-9]*' | cut -d: -f2)
    echo "   ✅ Stats: $NODES nodes, $LINKS links, $OBS observations"
else
    echo "   ❌ Cannot fetch stats"
fi

# Check 3: Directives
DIRECTIVES=$(curl -s "$HINDSIGHT_URL/v1/default/banks/default/directives" 2>/dev/null)
COUNT=$(echo "$DIRECTIVES" | grep -o '"id":"' | wc -l)
echo "   ✅ $COUNT active directives"

# Check 4: Test Reflect
echo "   Running Reflect (max 90s)..."
REFLECT=$(curl -s --max-time 90 -X POST "$HINDSIGHT_URL/v1/default/banks/default/reflect" \
  -H "Content-Type: application/json" \
  -d '{"query": "Current system status"}' 2>/dev/null)

if echo "$REFLECT" | grep -q "answer"; then
    echo "   ✅ Reflect successful"
else
    echo "   ⚠️ Reflect incomplete or slow"
fi

echo ""
echo "=== Check Complete ==="