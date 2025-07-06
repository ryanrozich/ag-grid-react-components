#!/bin/bash

# Manual cleanup script for stale PR preview deployments
# Run this to clean up workers from merged/closed PRs

echo "🧹 Cleaning up stale PR preview deployments..."
echo "==========================================="
echo ""

# List of PR numbers to clean up (based on the screenshot)
# Add any additional PR numbers here
PR_NUMBERS=(18 35 38 40 41)

# Check if wrangler is installed
if ! command -v wrangler &> /dev/null; then
    echo "❌ Wrangler CLI not found. Please install it first:"
    echo "   npm install -g wrangler"
    exit 1
fi

# Check if logged in
if ! wrangler whoami &> /dev/null; then
    echo "❌ Not logged in to Cloudflare. Please run:"
    echo "   wrangler login"
    exit 1
fi

# Check for required environment variables
if [ -z "$CLOUDFLARE_KV_NAMESPACE_ID" ]; then
    echo "❌ CLOUDFLARE_KV_NAMESPACE_ID environment variable is required"
    echo "   export CLOUDFLARE_KV_NAMESPACE_ID=your_namespace_id"
    exit 1
fi

echo "🔍 Checking for workers to clean up..."
echo ""

# Counter for cleaned up deployments
CLEANED=0

# Clean up each PR
for PR_NUM in "${PR_NUMBERS[@]}"; do
    WORKER_NAME="ag-grid-demo-api-pr-${PR_NUM}"
    KV_KEY="ag-grid-react-components-pr-${PR_NUM}"
    
    echo "Checking PR #${PR_NUM}..."
    
    # Try to delete the worker
    if wrangler deployments list 2>/dev/null | grep -q "$WORKER_NAME"; then
        echo "  🗑️  Deleting worker: $WORKER_NAME"
        if npx wrangler delete "$WORKER_NAME" --force 2>/dev/null; then
            echo "  ✅ Worker deleted successfully"
            ((CLEANED++))
        else
            echo "  ⚠️  Could not delete worker (may not exist)"
        fi
    else
        echo "  ℹ️  Worker not found: $WORKER_NAME"
    fi
    
    # Try to delete the KV entry
    echo "  🗑️  Deleting KV entry: $KV_KEY"
    if wrangler kv key delete "$KV_KEY" --namespace-id="$CLOUDFLARE_KV_NAMESPACE_ID" --force 2>/dev/null; then
        echo "  ✅ KV entry deleted successfully"
    else
        echo "  ℹ️  KV entry not found or already deleted"
    fi
    
    echo ""
done

echo "🎉 Cleanup complete! Cleaned up $CLEANED worker deployments"
echo ""
echo "💡 Note: R2 bucket files need to be cleaned up separately:"
echo "   1. Go to Cloudflare dashboard → R2 → rozich-demos bucket"
echo "   2. Delete folders named 'ag-grid-react-components-pr-*' for closed PRs"
echo ""
echo "To clean up additional PRs, add their numbers to the PR_NUMBERS array in this script"