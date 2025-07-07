# MADF Integration Plan for ag-grid-react-components

## Once MADF is Ready

This document describes how ag-grid-react-components will use MADF once the framework is complete.

## 1. Install MADF

```bash
npm install -g @coalesce-labs/madf
# or
npm install --save-dev @coalesce-labs/madf
```

## 2. Create MADF Configuration

```typescript
// madf.config.ts
import { defineConfig } from "@coalesce-labs/madf";

export default defineConfig({
  project: {
    name: "ag-grid-react-components",
    type: "library",
    language: ["typescript", "react"],
    description: "Headless React components for AG Grid",
  },

  github: {
    owner: "ryanrozich",
    repo: "ag-grid-react-components",
    project: 1, // GitHub project number
  },

  stages: {
    test: {
      unit: {
        command: "npm run test:unit",
        coverage: 80,
        required: true,
      },
      integration: {
        command: "npm run test:integration",
        required: true,
      },
      e2e: {
        command: "npm run test:e2e",
        browsers: ["chromium"],
        required: false,
      },
    },

    lint: {
      tool: "trunk",
      command: "trunk check",
      autoFix: "trunk fmt",
      preCommit: "npm run pre-commit",
    },

    build: {
      command: "npm run build",
      outputs: ["dist/", "types/"],
      validation: "npm run typecheck",
    },

    deploy: {
      preview: "npm run deploy:preview",
      production: "npm run deploy:prod",
    },
  },

  // Project-specific labels
  labels: {
    namespace: "area",
    categories: [
      { name: "area: components", description: "Related to React components" },
      { name: "area: demo", description: "Demo application" },
      { name: "area: build", description: "Build and bundling" },
      { name: "area: testing", description: "Test suite" },
      { name: "area: docs", description: "Documentation" },
    ],
    priorities: [
      { name: "priority: critical", color: "#e11d48" },
      { name: "priority: high", color: "#f59e0b" },
      { name: "priority: medium", color: "#3b82f6" },
      { name: "priority: low", color: "#8b5cf6" },
    ],
  },

  // File structure
  structure: {
    components: {
      path: "src/components/",
      pattern: "**/index.tsx",
      testPattern: "**/*.test.tsx",
    },
    utils: {
      path: "src/utils/",
      pattern: "**/*.ts",
    },
    demo: {
      path: "src/demo/",
      entry: "main.tsx",
    },
  },

  // Agent behavior
  agents: {
    instructions: "CLAUDE.md",
    personalInstructions: "CLAUDE.personal.md",
    maxConcurrent: 6,
    defaultModel: "claude-3",

    // Project-specific validations
    validations: {
      noExternalDependencies: true,
      headlessComponents: true,
      strictTypeScript: true,
    },
  },

  // Integration rules
  integration: {
    requireTests: true,
    requireDocs: true,
    contractValidation: true,
    mergeStrategy: "dependency-order",
  },
});
```

## 3. Project-Specific Files to Keep

### CLAUDE.md (Project Instructions)

```markdown
# Instructions for AI Agents

When working on ag-grid-react-components:

## Architecture Principles

- Headless components only (no styles)
- Zero external dependencies
- Tree-shakeable exports
- Full TypeScript strict mode

## Development Workflow

- Write tests first (TDD)
- Run trunk check before committing
- Update documentation for API changes
- Follow existing patterns

## Component Structure

src/components/ComponentName/
├── index.tsx # Main component
├── types.ts # TypeScript types
├── hooks.ts # Custom hooks
├── utils.ts # Utilities
└── **tests**/ # Tests
```

### Testing Configuration

Keep all test configs:

- `vitest.config.ts`
- `playwright.config.ts`
- Test utilities and helpers

### Linting Configuration

Keep all quality configs:

- `.trunk/trunk.yaml`
- `.eslintrc`
- `.prettierrc`

## 4. How to Use MADF

### Initialize in Existing Project

```bash
madf init --existing
```

### Launch Agents for Feature

```bash
# MADF reads madf.config.ts and CLAUDE.md
madf launch feature "Add date range picker"
```

### Check Status

```bash
madf status
```

### Run Specific Stage

```bash
madf run test --stage e2e
```

## 5. What Happens

1. MADF reads your configuration
2. Breaks down the feature into parallel tasks
3. Assigns agents to each task
4. Each agent:
   - Reads CLAUDE.md for project rules
   - Follows the configured stages
   - Runs your specific commands
   - Validates according to your rules
5. MADF orchestrates integration
6. Creates PRs with proper labels

## 6. GitHub Actions Integration

Add MADF GitHub Actions:

```yaml
# .github/workflows/madf-monitor.yml
name: MADF Monitor
on:
  issues:
    types: [labeled]

jobs:
  monitor:
    if: contains(github.event.label.name, 'agent:')
    runs-on: ubuntu-latest
    steps:
      - uses: coalesce-labs/madf-action@v1
        with:
          command: monitor
          issue: ${{ github.event.issue.number }}
```

## 7. Benefits

- ✅ All bot orchestration is external
- ✅ Project stays focused on components
- ✅ Configuration-driven automation
- ✅ Reusable across other projects
- ✅ Professional framework with support

## Timeline

1. **Now**: Continue developing in ag-grid-react-components normally
2. **MADF Beta**: Test integration with this project
3. **MADF 1.0**: Full migration from scripts to framework
4. **Future**: Use MADF for all Coalesce Labs projects
