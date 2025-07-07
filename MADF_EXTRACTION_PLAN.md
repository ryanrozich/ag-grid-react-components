# MADF Extraction Plan

## Current Asset Inventory

### Scripts to Extract

```
bot-workflow/
├── core/
│   ├── bot-claim-issue.js        → madf/core/agents/claim.ts
│   ├── bot-checkpoint.js         → madf/core/agents/checkpoint.ts
│   ├── bot-create-pr.js          → madf/core/agents/pr.ts
│   ├── bot-status-all.js         → madf/core/monitoring/status.ts
│   ├── bot-integration-check.js  → madf/core/integration/check.ts
│   └── bot-release-ready.js      → madf/core/release/validate.ts
├── coordinator/
│   ├── launch-bot-army.js        → madf/cli/commands/launch.ts
│   └── auto-bot-orchestrator.js  → madf/cli/commands/orchestrate.ts
└── worktree/
    └── setup-worktree.js         → madf/core/git/worktree.ts
```

### Patterns to Extract

1. **Label Patterns**

   ```typescript
   interface LabelConfig {
     namespace: string; // "agent"
     states: {
       todo: string; // "agent:todo"
       wip: string; // "agent:wip"
       review: string; // "agent:needs-review"
       done: string; // "agent:done"
       error: string; // "agent:error"
     };
     includeStatus: boolean; // Also use status: labels
   }
   ```

2. **Command Patterns**

   ```typescript
   interface CommandConfig {
     test: string; // "npm run test"
     build: string; // "npm run build"
     lint: string; // "npm run lint"
     typecheck?: string; // "npm run typecheck"
     e2e?: string; // "npm run test:e2e"
   }
   ```

3. **Project Structure**
   ```typescript
   interface ProjectStructure {
     instructionFile: string; // "CLAUDE.md"
     contractsDir: string; // "src/contracts"
     testsPattern: string; // "**/*.test.{ts,tsx}"
   }
   ```

## Extraction Steps

### Step 1: Create Framework Structure

```bash
# New repository: multi-agent-dev-framework
mkdir -p madf/{core,cli,plugins,templates}
mkdir -p madf/core/{agents,git,github,integration,monitoring,contracts}
mkdir -p madf/cli/commands
mkdir -p madf/plugins/{typescript,react,python}
mkdir -p madf/templates/{library,application,api}
```

### Step 2: Core Abstractions

```typescript
// madf/core/agent.ts
export abstract class Agent {
  constructor(
    protected config: MADFConfig,
    protected context: AgentContext,
  ) {}

  abstract claim(issueNumber: number): Promise<void>;
  abstract checkpoint(message: string): Promise<void>;
  abstract createPR(options?: PROptions): Promise<void>;
  abstract handoff(reason: string): Promise<void>;
}

// madf/core/github/client.ts
export class GitHubClient {
  constructor(private config: GitHubConfig) {}

  async updateLabels(issue: number, add: string[], remove: string[]);
  async createPR(options: PROptions): Promise<PR>;
  async syncToProject(mapping: ProjectMapping): Promise<void>;
}

// madf/core/workflow.ts
export class Workflow {
  constructor(
    private config: WorkflowConfig,
    private agents: Agent[],
  ) {}

  async execute(): Promise<WorkflowResult>;
  async checkpoint(): Promise<void>;
  async integrate(): Promise<IntegrationResult>;
}
```

### Step 3: Configuration System

```typescript
// madf/core/config/loader.ts
export class ConfigLoader {
  static async load(projectRoot: string): Promise<MADFConfig> {
    // 1. Load madf.config.ts
    // 2. Load .madf/config.yml
    // 3. Load environment variables
    // 4. Merge with defaults
    return config;
  }
}

// madf/core/config/validator.ts
export class ConfigValidator {
  static validate(config: unknown): config is MADFConfig {
    // Validate required fields
    // Check command availability
    // Verify GitHub access
    return true;
  }
}
```

### Step 4: Plugin System

```typescript
// madf/core/plugins/manager.ts
export class PluginManager {
  private plugins: Map<string, MADFPlugin> = new Map();

  async loadPlugin(name: string): Promise<void>;
  async executeHook(hook: string, context: any): Promise<void>;

  // Auto-discover plugins
  async discover(): Promise<void> {
    // Check .madf/plugins
    // Check node_modules/@madf-plugin-*
    // Check package.json madf.plugins
  }
}
```

### Step 5: CLI Tool

```typescript
// madf/cli/index.ts
#!/usr/bin/env node
import { Command } from 'commander';

const program = new Command();

program
  .name('madf')
  .description('Multi-Agent Development Framework')
  .version('1.0.0');

// Commands
program
  .command('init')
  .description('Initialize MADF in current project')
  .option('-t, --template <template>', 'Project template')
  .action(initCommand);

program
  .command('launch <issues...>')
  .description('Launch bot army for issues')
  .option('--tmux', 'Use tmux session')
  .option('--agents <n>', 'Number of agents')
  .action(launchCommand);

program
  .command('status')
  .description('Check agent status')
  .option('-m, --milestone <name>', 'Filter by milestone')
  .action(statusCommand);
```

### Step 6: Templates

```yaml
# madf/templates/typescript-library/.madf/config.yml
name: TypeScript Library Template
version: 1.0.0

project:
  type: library
  language:
    - typescript
  structure:
    src: src/
    tests: tests/
    docs: docs/

commands:
  install: npm install
  test: npm run test
  build: npm run build
  lint: npm run lint

agents:
  instructions: |
    You are developing a TypeScript library.
    Follow these principles:
    - Write tests first (TDD)
    - Use strict TypeScript
    - Document all public APIs

github:
  labels:
    namespace: agent
    includeStatus: true

workflows:
  default: parallel-development
  integration: staged-merge
```

## Migration Guide

### For Existing Projects

```bash
# 1. Install MADF
npm install -g @madf/cli

# 2. Initialize in project
cd my-project
madf init --from-existing

# 3. MADF analyzes and suggests config
# Detects: test commands, build process, etc.

# 4. Customize configuration
edit madf.config.ts

# 5. Test with existing issues
madf launch --dry-run 123 124 125

# 6. Launch for real
madf launch 123 124 125
```

### Configuration Mapping

```typescript
// Before (hardcoded in scripts)
const BOT_WORKSPACE_DIR = path.join(process.env.HOME, "ag-grid-worktrees");
const labelNamespace = "agent";

// After (in madf.config.ts)
export default {
  workspace: {
    directory: "~/madf-workspaces/${project.name}",
    useWorktrees: true,
  },
  github: {
    labelNamespace: "agent",
  },
} as MADFConfig;
```

## Advantages of Framework

### 1. **Reusability**

- Use same framework across all projects
- Share plugins between teams
- Consistent workflow everywhere

### 2. **Configurability**

- No code changes needed
- Everything driven by config
- Project-specific customizations

### 3. **Extensibility**

- Plugin system for new languages
- Custom workflow definitions
- Integration with any tools

### 4. **Observability**

- Built-in monitoring
- Analytics across projects
- Cost tracking per project

### 5. **Best Practices**

- Enforced through framework
- Consistent patterns
- Proven workflows

## Implementation Timeline

### Week 1: Core Extraction

- [ ] Set up new repository
- [ ] Extract core agent logic
- [ ] Create configuration system
- [ ] Build basic CLI

### Week 2: GitHub Integration

- [ ] Extract GitHub operations
- [ ] Build label management
- [ ] Add project sync
- [ ] Create workflow automation

### Week 3: Plugin System

- [ ] Design plugin API
- [ ] Create TypeScript plugin
- [ ] Add React plugin
- [ ] Build plugin discovery

### Week 4: Polish & Documentation

- [ ] Comprehensive documentation
- [ ] Migration guides
- [ ] Video tutorials
- [ ] Example projects

### Month 2: Advanced Features

- [ ] Cloud orchestration
- [ ] Analytics dashboard
- [ ] Plugin marketplace
- [ ] Enterprise features

## Success Criteria

1. **Easy Adoption**: < 5 minutes to set up
2. **Zero Lock-in**: Can remove framework anytime
3. **Performance**: No overhead vs direct scripts
4. **Flexibility**: Handles any project type
5. **Reliability**: 99.9% success rate

This framework would transform AI-assisted development from a collection of scripts to a professional, reusable system that any team can adopt.
