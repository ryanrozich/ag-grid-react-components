#!/bin/bash

# Copy bot workflow files to MADF without committing them here

set -e

echo "📦 Copying Bot Workflow to MADF"
echo "==============================="

SOURCE_DIR="$(pwd)"
TARGET_DIR="$HOME/code-repos/github/coalesce-labs/multi-agent-dev-framework"

if [ ! -d "$TARGET_DIR" ]; then
    echo "❌ MADF directory not found at: $TARGET_DIR"
    exit 1
fi

# Create migration directory in MADF
echo "📁 Creating migration directory in MADF..."
mkdir -p "$TARGET_DIR/migration/from-ag-grid"

# Copy bot workflow scripts
echo "📂 Copying bot workflow scripts..."
cp -r scripts/bot-workflow "$TARGET_DIR/migration/from-ag-grid/" 2>/dev/null || echo "  ⚠️  bot-workflow not found"
cp scripts/sync-agent-status-to-project.js "$TARGET_DIR/migration/from-ag-grid/" 2>/dev/null || echo "  ⚠️  sync script not found"

# Copy documentation
echo "📄 Copying documentation..."
mkdir -p "$TARGET_DIR/migration/from-ag-grid/docs"
cp MULTI_AGENT_FRAMEWORK_*.md "$TARGET_DIR/migration/from-ag-grid/docs/" 2>/dev/null || true
cp MADF_*.md "$TARGET_DIR/migration/from-ag-grid/docs/" 2>/dev/null || true
cp COALESCE_LABS_*.md "$TARGET_DIR/migration/from-ag-grid/docs/" 2>/dev/null || true
cp *COORDINATOR*.md "$TARGET_DIR/migration/from-ag-grid/docs/" 2>/dev/null || true
cp BOT_*.md "$TARGET_DIR/migration/from-ag-grid/docs/" 2>/dev/null || true
cp docs/FILTER_PRESETS_INTEGRATION_PLAN.md "$TARGET_DIR/migration/from-ag-grid/docs/" 2>/dev/null || true

# Copy GitHub workflows
echo "🔧 Copying GitHub workflows..."
mkdir -p "$TARGET_DIR/migration/from-ag-grid/workflows"
cp .github/workflows/sync-agent-status.yml "$TARGET_DIR/migration/from-ag-grid/workflows/" 2>/dev/null || true

# Create migration status file
echo "📊 Creating migration status..."
cat > "$TARGET_DIR/migration/MIGRATION_STATUS.md" << 'EOF'
# Migration Status

## Migrated from ag-grid-react-components

### Scripts to Convert
- [ ] bot-claim-issue.js → packages/core/src/agents/claim.ts
- [ ] bot-checkpoint.js → packages/core/src/agents/checkpoint.ts  
- [ ] bot-create-pr.js → packages/core/src/agents/pr.ts
- [ ] bot-status-all.js → packages/core/src/monitoring/status.ts
- [ ] bot-integration-check.js → packages/core/src/integration/check.ts
- [ ] bot-release-ready.js → packages/core/src/release/validate.ts
- [ ] launch-bot-army.js → packages/cli/src/commands/launch.ts
- [ ] setup-worktree.js → packages/core/src/git/worktree.ts
- [ ] sync-agent-status-to-project.js → packages/core/src/github/project-sync.ts

### Configuration to Extract
- [ ] Label patterns (agent:*)
- [ ] Command patterns (npm, git)
- [ ] Directory structures
- [ ] GitHub integration settings

### Next Steps
1. Start with core abstractions (BaseAgent class)
2. Convert simplest scripts first (claim, checkpoint)
3. Build configuration system
4. Create CLI commands
5. Add tests for each module
EOF

echo ""
echo "✅ Files copied to MADF!"
echo ""
echo "📋 Next steps:"
echo "1. cd $TARGET_DIR"
echo "2. git add migration/"
echo "3. git commit -m 'feat: add bot workflow scripts from ag-grid-react-components'"
echo "4. git push"
echo "5. Start converting scripts to TypeScript!"
echo ""
echo "🧹 To clean up ag-grid-react-components:"
echo "   ./scripts/cleanup-bot-files.sh"