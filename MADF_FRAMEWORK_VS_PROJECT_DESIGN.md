# MADF Framework vs Project Configuration Design

## Core Principle

**MADF provides the stages and hooks, projects provide the implementations.**

## Configuration Structure

```typescript
// In project: madf.config.ts
export default {
  project: {
    name: "ag-grid-react-components",
    type: "library",
    language: ["typescript", "react"],
  },

  // MADF knows these stages exist, project defines what happens
  stages: {
    test: {
      unit: {
        command: "npm run test:unit",
        coverage: 80,
        pattern: "**/*.test.{ts,tsx}",
      },
      integration: {
        command: "npm run test:integration",
        required: true,
      },
      e2e: {
        command: "npm run test:e2e",
        framework: "playwright",
        configFile: "playwright.config.ts",
      },
    },

    lint: {
      tool: "trunk", // MADF can be opinionated here
      command: "trunk check",
      autoFix: "trunk fmt",
      // But specific rules are in .trunk/trunk.yaml
    },

    build: {
      command: "npm run build",
      outputs: ["dist/", "types/"],
    },
  },

  // Project-specific label taxonomy
  labels: {
    areas: [
      { name: "area: components", description: "React components" },
      { name: "area: demo", description: "Demo application" },
      { name: "area: docs", description: "Documentation" },
    ],
    types: [
      { name: "bug", description: "Something isn't working" },
      { name: "enhancement", description: "New feature" },
    ],
    // MADF adds its own agent: labels automatically
  },

  // Project-specific file organization
  structure: {
    components: "src/components/",
    tests: {
      unit: "src/**/__tests__/",
      e2e: "tests/e2e/",
    },
    docs: "docs/",
  },

  // Project-specific instructions for agents
  agentInstructions: {
    file: "CLAUDE.md", // MADF reads this
    personalFile: "CLAUDE.personal.md", // Optional overrides
  },
};
```

## Framework Responsibilities (MADF)

### 1. **Stage Orchestration**

```typescript
class AgentWorkflow {
  async runStage(stage: "test" | "lint" | "build") {
    const config = await this.loadProjectConfig();
    const stageConfig = config.stages[stage];

    // MADF orchestrates, project config executes
    if (stage === "test") {
      await this.runTests(stageConfig);
    }
  }
}
```

### 2. **Agent Lifecycle**

- Claiming issues
- Creating PRs
- Managing checkpoints
- Label transitions (agent:todo → agent:wip → agent:done)

### 3. **Integration Patterns**

- Dependency management
- Contract validation
- Merge ordering
- Conflict resolution

### 4. **Observability**

- Progress tracking
- Cost monitoring
- Performance metrics
- Error reporting

## Project Responsibilities (ag-grid-react-components)

### 1. **Testing Implementation**

```yaml
# In project: .madf/testing.yml
testing:
  unit:
    framework: vitest
    config: vitest.config.ts
    thresholds:
      statements: 80
      branches: 75

  e2e:
    framework: playwright
    browsers: [chromium, firefox]
    baseURL: http://localhost:3000
```

### 2. **Code Quality Rules**

```yaml
# In project: .trunk/trunk.yaml
lint:
  enabled:
    - eslint
    - prettier
    - typescript

  # Project-specific rules
  eslint:
    rules:
      no-console: error
      react/prop-types: off
```

### 3. **Project Instructions**

```markdown
# In project: CLAUDE.md

When developing ag-grid-react-components:

- Use headless component pattern
- No external dependencies
- Follow TDD approach
- Run trunk before committing
```

## Integration Points

### 1. **MADF Reads Project Config**

```typescript
// MADF framework code
const projectConfig = await loadConfig("madf.config.ts");
const instructions = await readFile(projectConfig.agentInstructions.file);
```

### 2. **MADF Provides Hooks**

```typescript
// MADF provides hooks
export interface ProjectHooks {
  beforeTest?: () => Promise<void>;
  afterTest?: (results: TestResults) => Promise<void>;
  beforeBuild?: () => Promise<void>;
  validateComponent?: (path: string) => Promise<boolean>;
}
```

### 3. **Projects Implement Hooks**

```typescript
// In project: .madf/hooks.ts
export const hooks: ProjectHooks = {
  validateComponent: async (path) => {
    // ag-grid specific: ensure headless pattern
    const content = await readFile(path);
    return !content.includes("styled-components");
  },
};
```

## Opinionated Defaults (MADF)

MADF can be opinionated about:

1. **Git workflow** (worktrees, branches)
2. **GitHub integration** (issues, PRs, projects)
3. **Agent coordination** (parallel execution)
4. **Testing stages** (unit → integration → e2e)
5. **Trunk for linting** (but not the rules)

## Project-Specific (ag-grid-react-components)

Projects define:

1. **Actual test commands and configs**
2. **Specific lint rules**
3. **Label taxonomies**
4. **Component patterns**
5. **Documentation structure**

## Migration Path

1. **Phase 1**: MADF hardcodes stages
2. **Phase 2**: Add configuration system
3. **Phase 3**: Plugin architecture for custom stages
4. **Phase 4**: Full extensibility

## Example: How Testing Works

```typescript
// MADF knows about test stages
class TestStage {
  async execute(agent: Agent, config: TestConfig) {
    // 1. MADF orchestrates
    agent.log('Running tests...');

    // 2. Project config provides command
    const result = await agent.run(config.unit.command);

    // 3. MADF handles results
    if (!result.success) {
      await agent.createIssue('Test failures detected');
    }
  }
}

// Project provides specifics
{
  test: {
    unit: {
      command: 'npm run test:unit',
      framework: 'vitest'
    }
  }
}
```

This separation gives you:

- ✅ Framework reusability
- ✅ Project flexibility
- ✅ Clear boundaries
- ✅ Progressive enhancement
