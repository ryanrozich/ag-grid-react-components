#!/bin/bash

echo "🚀 Complete Project Bootstrap"
echo "============================"
echo ""
echo "This will:"
echo "1. Create/update all label definitions in the repo"
echo "2. Add missing required labels to all issues"
echo "3. Sync project field values to issue labels"
echo "4. Trigger the GitHub Actions for final sync"
echo ""
echo "Press Ctrl+C to cancel, or Enter to continue..."
read

# Step 1: Create all labels
echo ""
echo "🏷️  Step 1: Creating/updating label definitions..."
echo "─────────────────────────────────────────────"
node scripts/create-all-labels.js

# Step 2: Add missing labels
echo ""
echo "📝 Step 2: Adding missing required labels..."
echo "─────────────────────────────────────────────"
node scripts/add-missing-labels.js

# Step 3: Sync from project to labels
echo ""
echo "🔄 Step 3: Syncing project fields to labels..."
echo "─────────────────────────────────────────────"
node scripts/bootstrap-project-sync.js

# Step 4: Trigger GitHub Action
echo ""
echo "⚙️  Step 4: Triggering labels-to-project sync..."
echo "─────────────────────────────────────────────"
gh workflow run sync-labels-to-project.yml || echo "Note: Workflow may already be running"

# Step 5: Also trigger the reverse sync
echo ""
echo "⚙️  Step 5: Triggering project-to-labels sync..."
echo "─────────────────────────────────────────────"
gh workflow run sync-project-to-labels.yml || echo "Note: Workflow may already be running"

echo ""
echo "✅ Bootstrap complete!"
echo ""
echo "📊 You can monitor the workflows at:"
echo "   https://github.com/ryanrozich/ag-grid-react-components/actions"
echo ""
echo "🔄 The automated sync will continue running every 5 minutes."