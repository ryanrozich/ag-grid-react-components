# Updated Instructions for Claude in MADF

## Copy this to Claude in your MADF directory:

---

I'm building MADF (Multi-Agent Development Framework) - a commercial framework for orchestrating multiple AI agents to develop software in parallel on GitHub.

I've migrated bot workflow scripts from ag-grid-react-components. The files are in `migration/from-ag-grid/`.

## Important Design Principle

MADF should provide **stages and hooks**, while projects provide **specific implementations**. Think of it like ESLint - the framework knows about linting, but projects configure the rules.

## Architecture Guidelines

### 1. Configuration-Driven Design

Create a configuration system where projects can define:

- Test commands and strategies (unit, integration, e2e)
- Build processes
- Linting tools and rules
- Label taxonomies
- Directory structures

Example structure:

```typescript
// MADF knows about stages
interface MADFConfig {
  stages: {
    test?: TestStageConfig;
    lint?: LintStageConfig;
    build?: BuildStageConfig;
  };
  labels?: ProjectLabels;
  structure?: ProjectStructure;
}
```

### 2. Core Abstractions to Build

1. **Stage System** (`packages/core/src/stages/`)

   - BaseStage abstract class
   - TestStage, LintStage, BuildStage implementations
   - Stage orchestration and ordering

2. **Configuration Loader** (`packages/core/src/config/`)

   - Load madf.config.ts from projects
   - Merge with defaults
   - Validate configuration

3. **Agent Instructions** (`packages/core/src/instructions/`)
   - Read project-specific instructions (CLAUDE.md)
   - Merge with framework knowledge
   - Pass to agents dynamically

### 3. What MADF Should Be Opinionated About

- Git workflow (worktrees, branches)
- GitHub integration patterns
- Agent coordination
- Stage progression (test → lint → build → deploy)
- Trunk as the default linter (but not the rules)

### 4. What Projects Should Configure

- Specific test commands and frameworks
- Lint rules and severity
- Build outputs and processes
- Label taxonomies (area: components, area: demo)
- File organization

## Conversion Priority

1. **First**: Create the configuration system

   - ConfigLoader class
   - Default configurations
   - Schema validation

2. **Second**: Convert bot-checkpoint.js with stages in mind

   - Checkpoint should understand what stage it's in
   - Different stages might have different checkpoint strategies

3. **Third**: Build the stage system

   - Extract common patterns from the scripts
   - Create extensible stage architecture

4. **Fourth**: Update agent base class
   - Agents should read project config
   - Agents should execute stages based on config

## Example Implementation

```typescript
// packages/core/src/stages/TestStage.ts
export class TestStage extends BaseStage {
  async execute(agent: Agent, config: TestStageConfig): Promise<StageResult> {
    // MADF orchestrates
    this.log("Executing test stage...");

    // Run tests based on project config
    if (config.unit) {
      await agent.run(config.unit.command);
    }

    if (config.integration) {
      await agent.run(config.integration.command);
    }

    if (config.e2e) {
      await agent.run(config.e2e.command);
    }

    // MADF handles results
    return this.analyzeResults();
  }
}
```

## Project Compatibility

Ensure MADF can work with projects that have:

- Different test frameworks (Jest, Vitest, Mocha)
- Different build tools (Vite, Webpack, Rollup)
- Different languages (TypeScript, JavaScript, Python)
- Different label systems

## Testing the Framework

As you build, create a sample project configuration:

```typescript
// examples/ag-grid-config/madf.config.ts
export default {
  project: {
    name: "ag-grid-react-components",
    type: "library",
  },
  stages: {
    test: {
      unit: { command: "npm run test:unit" },
      e2e: { command: "npm run test:e2e" },
    },
    lint: {
      command: "trunk check",
      autoFix: "trunk fmt",
    },
  },
  labels: {
    areas: ["components", "demo", "docs"],
  },
};
```

This will help ensure the framework remains generic while supporting specific project needs.

## Remember

- MADF is a tool that works across projects
- Configuration over hardcoding
- Stages and hooks, not implementations
- Think "framework" not "scripts"

Let's start by examining the migrated scripts and building the configuration system first.

---
