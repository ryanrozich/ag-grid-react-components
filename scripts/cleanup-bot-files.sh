#!/bin/bash

# Clean up bot workflow files from ag-grid-react-components
# Run AFTER copying to MADF!

set -e

echo "🧹 Cleaning Bot Files from ag-grid-react-components"
echo "==================================================="
echo ""
echo "⚠️  WARNING: This will remove bot workflow files!"
echo "⚠️  Make sure you've run copy-to-madf.sh first!"
echo ""
read -p "Continue? (y/N) " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Cancelled"
    exit 1
fi

# Remove from git tracking (but keep local files)
echo "📝 Removing from git tracking..."
git rm -r --cached scripts/bot-workflow/ 2>/dev/null || echo "  ⚠️  bot-workflow already untracked"
git rm --cached scripts/sync-agent-status-to-project.js 2>/dev/null || true
git rm --cached scripts/*madf*.sh 2>/dev/null || true
git rm --cached MULTI_AGENT_FRAMEWORK_*.md 2>/dev/null || true
git rm --cached MADF_*.md 2>/dev/null || true
git rm --cached COALESCE_LABS_*.md 2>/dev/null || true
git rm --cached *COORDINATOR*.md 2>/dev/null || true
git rm --cached BOT_*.md 2>/dev/null || true
git rm --cached .github/workflows/sync-agent-status.yml 2>/dev/null || true

# Update .gitignore
echo "📝 Updating .gitignore..."
cat >> .gitignore << 'EOF'

# Bot orchestration framework (moved to MADF)
scripts/bot-workflow/
scripts/*madf*
scripts/sync-agent-status-to-project.js
MULTI_AGENT_FRAMEWORK_*.md
MADF_*.md
COALESCE_LABS_*.md
*COORDINATOR*.md
*BOT_*.md
.bot/
migration/
EOF

# Create a placeholder README for the scripts directory
echo "📄 Creating placeholder..."
cat > scripts/BOT_WORKFLOW_MOVED.md << 'EOF'
# Bot Workflow Moved

The bot workflow orchestration framework has been moved to its own repository:
`coalesce-labs/multi-agent-dev-framework`

This is now a standalone product that can be used across multiple projects.
EOF

echo ""
echo "✅ Cleanup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Review changes: git status"
echo "2. Commit: git add . && git commit -m 'chore: remove bot orchestration (moved to MADF)'"
echo "3. Push: git push"
echo ""
echo "The bot workflow files are still in your local directory but are now"
echo "untracked by git. You can safely delete them after confirming MADF has them."