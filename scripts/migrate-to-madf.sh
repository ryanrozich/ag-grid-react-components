#!/bin/bash

# Migration script to move bot workflow to MADF
# Run this from the ag-grid-react-components directory

set -e

echo "🚀 Migrating Bot Workflow to MADF"
echo "================================="

# Configuration
SOURCE_DIR="$(pwd)"
TARGET_DIR="$HOME/code-repos/github/coalesce-labs/multi-agent-dev-framework"

# Check if target exists
if [ ! -d "$TARGET_DIR" ]; then
    echo "❌ MADF directory not found at: $TARGET_DIR"
    exit 1
fi

echo "📦 Source: $SOURCE_DIR"
echo "📦 Target: $TARGET_DIR"
echo ""

# Step 1: Copy documentation
echo "📄 Copying documentation..."
mkdir -p "$TARGET_DIR/docs/original"
cp MULTI_AGENT_FRAMEWORK_DESIGN.md "$TARGET_DIR/docs/original/"
cp MADF_EXTRACTION_PLAN.md "$TARGET_DIR/docs/original/"
cp MADF_VALUE_PROPOSITION.md "$TARGET_DIR/docs/original/"
cp MADF_TECHNICAL_SCENARIOS.md "$TARGET_DIR/docs/original/"
cp docs/FILTER_PRESETS_INTEGRATION_PLAN.md "$TARGET_DIR/docs/examples/" 2>/dev/null || true

# Step 2: Create migration mapping
echo "🗺️  Creating migration plan..."
cat > "$TARGET_DIR/MIGRATION_MAP.md" << 'EOF'
# Migration Map

## Scripts to Convert

### Core Agent Operations
- `scripts/bot-workflow/core/bot-claim-issue.js` → `packages/core/src/agents/claim.ts`
- `scripts/bot-workflow/core/bot-checkpoint.js` → `packages/core/src/agents/checkpoint.ts`
- `scripts/bot-workflow/core/bot-create-pr.js` → `packages/core/src/agents/pr.ts`
- `scripts/bot-workflow/core/bot-resume-work.js` → `packages/core/src/agents/resume.ts`
- `scripts/bot-workflow/core/bot-handoff.js` → `packages/core/src/agents/handoff.ts`

### Monitoring & Status
- `scripts/bot-workflow/core/bot-status-all.js` → `packages/core/src/monitoring/status.ts`
- `scripts/bot-workflow/core/bot-integration-check.js` → `packages/core/src/integration/check.ts`
- `scripts/bot-workflow/core/bot-release-ready.js` → `packages/core/src/release/validate.ts`

### Orchestration
- `scripts/bot-workflow/coordinator/launch-bot-army.js` → `packages/cli/src/commands/launch.ts`
- `scripts/bot-workflow/coordinator/auto-bot-orchestrator.js` → `packages/cli/src/commands/orchestrate.ts`
- `scripts/bot-workflow/coordinator/bot-coordinator-start.js` → `packages/cli/src/commands/start.ts`

### Git Operations
- `scripts/bot-workflow/worktree/setup-worktree.js` → `packages/core/src/git/worktree.ts`
- `scripts/bot-workflow/worktree/cleanup-worktree.js` → `packages/core/src/git/cleanup.ts`

### GitHub Integration
- `scripts/sync-agent-status-to-project.js` → `packages/core/src/github/project-sync.ts`
- `scripts/bot-workflow/update-issue-dependencies.js` → `packages/core/src/github/dependencies.ts`

## Configuration to Extract

### From Scripts
- Label namespace: "agent"
- Label states: todo, wip, needs-review, done, error
- Worktree directory pattern
- GitHub project integration

### From CLAUDE.md
- Project-specific instructions
- Command patterns
- File structure requirements

## Plugin Opportunities

### TypeScript Plugin
- Strict mode enforcement
- Type checking integration
- Build command patterns

### React Plugin
- Component structure validation
- Testing patterns
- Build optimization

### AG Grid Plugin
- Grid state management
- Filter preset patterns
- Integration patterns
EOF

# Step 3: Copy core scripts (preserve for reference)
echo "📂 Copying scripts for reference..."
mkdir -p "$TARGET_DIR/migration/original-scripts"
cp -r scripts/bot-workflow "$TARGET_DIR/migration/original-scripts/"
cp scripts/sync-agent-status-to-project.js "$TARGET_DIR/migration/original-scripts/"

# Step 4: Extract configuration patterns
echo "⚙️  Extracting configuration..."
cat > "$TARGET_DIR/packages/core/src/config/defaults.ts" << 'EOF'
/**
 * Default MADF configuration
 * Extracted from ag-grid-react-components bot workflow
 */

export const DEFAULT_CONFIG = {
  labels: {
    namespace: 'agent',
    states: {
      todo: 'agent:todo',
      wip: 'agent:wip',
      needsReview: 'agent:needs-review',
      done: 'agent:done',
      error: 'agent:error'
    }
  },
  
  workspace: {
    directory: '${HOME}/madf-worktrees',
    useWorktrees: true,
    isolateEnvironments: true
  },
  
  github: {
    enableProjectSync: true,
    syncInterval: 5000,
    labels: {
      includeStatus: true,
      autoTransition: true
    }
  },
  
  commands: {
    install: 'npm install',
    test: 'npm run test',
    build: 'npm run build',
    lint: 'npm run lint',
    typecheck: 'npm run typecheck'
  },
  
  integrations: {
    checkDependencies: true,
    validateContracts: true,
    autoMergeOrder: true
  }
};
EOF

# Step 5: Create example TypeScript conversion
echo "🔄 Creating example TypeScript conversion..."
mkdir -p "$TARGET_DIR/packages/core/src/agents"
cat > "$TARGET_DIR/packages/core/src/agents/base.ts" << 'EOF'
/**
 * Base Agent class
 * All agent operations extend from this
 */

import { execSync } from 'child_process';
import { GitHubClient } from '../github/client';
import { WorktreeManager } from '../git/worktree';
import { AgentContext, AgentConfig } from '../types';

export abstract class BaseAgent {
  protected github: GitHubClient;
  protected worktree: WorktreeManager;
  
  constructor(
    protected config: AgentConfig,
    protected context: AgentContext
  ) {
    this.github = new GitHubClient(config.github);
    this.worktree = new WorktreeManager(config.workspace);
  }
  
  protected async updateLabels(
    issueNumber: number,
    add: string[],
    remove: string[]
  ): Promise<void> {
    await this.github.updateIssueLabels(issueNumber, { add, remove });
  }
  
  protected async runCommand(
    command: string,
    options?: { cwd?: string }
  ): Promise<string> {
    return execSync(command, {
      encoding: 'utf8',
      cwd: options?.cwd || this.context.workdir,
      ...options
    });
  }
  
  protected log(message: string, level: 'info' | 'warn' | 'error' = 'info'): void {
    const prefix = {
      info: '✅',
      warn: '⚠️',
      error: '❌'
    }[level];
    
    console.log(`${prefix} ${message}`);
    this.context.logger?.log(level, message);
  }
}
EOF

# Step 6: Create conversion guide
echo "📘 Creating conversion guide..."
cat > "$TARGET_DIR/CONVERSION_GUIDE.md" << 'EOF'
# JavaScript to TypeScript Conversion Guide

## Step 1: Analyze Current Script

Example: `bot-claim-issue.js`

```javascript
// Original
const issueNumber = process.argv[2];
if (!issueNumber) {
  console.error('Usage: node bot-claim-issue.js <issue-number>');
  process.exit(1);
}
```

## Step 2: Create TypeScript Interface

```typescript
// New
interface ClaimOptions {
  issueNumber: number;
  force?: boolean;
}

class ClaimAgent extends BaseAgent {
  async claim(options: ClaimOptions): Promise<void> {
    // Implementation
  }
}
```

## Step 3: Extract Configuration

Move hardcoded values to configuration:
- Label names → config.labels
- Directories → config.workspace
- Commands → config.commands

## Step 4: Add Error Handling

```typescript
try {
  await this.claim(options);
} catch (error) {
  if (error instanceof GitHubError) {
    this.log(`GitHub API error: ${error.message}`, 'error');
  }
  throw error;
}
```

## Step 5: Add Tests

Create corresponding test file:
- `claim.ts` → `claim.test.ts`
- Mock external dependencies
- Test edge cases

## Conversion Checklist

- [ ] Convert to TypeScript class
- [ ] Extract configuration
- [ ] Add proper types
- [ ] Improve error handling
- [ ] Add logging
- [ ] Create tests
- [ ] Update imports/exports
- [ ] Document API
EOF

# Step 7: Create CLI structure
echo "🛠️  Setting up CLI structure..."
mkdir -p "$TARGET_DIR/packages/cli/src/commands"
cat > "$TARGET_DIR/packages/cli/src/commands/index.ts" << 'EOF'
export { InitCommand } from './init';
export { LaunchCommand } from './launch';
export { StatusCommand } from './status';
export { ConfigCommand } from './config';
EOF

# Final message
echo ""
echo "✅ Migration preparation complete!"
echo ""
echo "📋 Next steps:"
echo "1. cd $TARGET_DIR"
echo "2. git add -A"
echo "3. git commit -m 'feat: add migration files from ag-grid-react-components'"
echo "4. git push"
echo ""
echo "5. Start converting scripts using CONVERSION_GUIDE.md"
echo "6. Run tests as you convert each module"
echo "7. Build the CLI once core modules are ready"
echo ""
echo "📦 The MADF framework is ready for development!"