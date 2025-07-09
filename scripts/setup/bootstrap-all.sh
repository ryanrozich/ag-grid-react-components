#!/bin/bash

echo "🚀 Complete Project Bootstrap"
echo "============================"
echo ""
echo "This will:"
echo "1. Add missing required labels to all issues"
echo "2. Sync project field values to issue labels"
echo "3. Trigger the GitHub Actions for final sync"
echo ""
echo "Press Ctrl+C to cancel, or Enter to continue..."
read

# Step 1: Add missing labels
echo ""
echo "📝 Step 1: Adding missing required labels..."
echo "─────────────────────────────────────────────"
node scripts/automation/add-missing-labels.js

# Step 2: Sync from project to labels
echo ""
echo "🔄 Step 2: Syncing project fields to labels..."
echo "─────────────────────────────────────────────"
node scripts/automation/bootstrap-project-sync.js

# Step 3: Trigger GitHub Action
echo ""
echo "⚙️  Step 3: Triggering labels-to-project sync..."
echo "─────────────────────────────────────────────"
gh workflow run sync-labels-to-project.yml || echo "Note: Workflow may already be running"

# Step 4: Also trigger the reverse sync
echo ""
echo "⚙️  Step 4: Triggering project-to-labels sync..."
echo "─────────────────────────────────────────────"
gh workflow run sync-project-to-labels.yml || echo "Note: Workflow may already be running"

echo ""
echo "✅ Bootstrap complete!"
echo ""
echo "📊 You can monitor the workflows at:"
echo "   https://github.com/ryanrozich/ag-grid-react-components/actions"
echo ""
echo "🔄 The automated sync will continue running every 5 minutes."