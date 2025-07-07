import { defineConfig } from "@coalesce-labs/madf";

/**
 * MADF Configuration Example
 *
 * This configuration is based on successful patterns from ag-grid-react-components.
 * It provides a comprehensive setup for TypeScript/React component libraries.
 *
 * CUSTOMIZE: Update project details, commands, and thresholds for your needs.
 */
export default defineConfig({
  // Project metadata
  project: {
    name: "your-component-library", // CUSTOMIZE: Your project name
    type: "library", // Options: 'library' | 'application' | 'service'
    language: ["typescript", "react"],
    description: "Headless React components for your needs", // CUSTOMIZE
  },

  // GitHub integration
  github: {
    owner: "your-org", // CUSTOMIZE: Your GitHub org/username
    repo: "your-repo", // CUSTOMIZE: Your repository name
    project: 1, // CUSTOMIZE: GitHub project number (optional)
  },

  // Development stages configuration
  stages: {
    // Testing stage - runs different test types
    test: {
      unit: {
        command: "npm run test:unit",
        coverage: 80, // CUSTOMIZE: Your coverage threshold
        pattern: "**/*.test.{ts,tsx}",
        required: true,
      },
      integration: {
        command: "npm run test:integration",
        pattern: "**/*.integration.test.{ts,tsx}",
        required: true,
      },
      e2e: {
        command: "npm run test:e2e",
        framework: "playwright",
        browsers: ["chromium"], // CUSTOMIZE: Add more browsers
        configFile: "playwright.config.ts",
        required: false, // E2E can be optional for PRs
      },
    },

    // Linting stage - code quality checks
    lint: {
      tool: "trunk", // MADF is opinionated about using Trunk
      command: "trunk check",
      autoFix: "trunk fmt",
      preCommit: "npm run pre-commit",
      // Specific rules are in .trunk/trunk.yaml
    },

    // Build stage - compilation and bundling
    build: {
      command: "npm run build",
      outputs: ["dist/", "types/"], // CUSTOMIZE: Your build outputs
      validation: "npm run typecheck",
      clean: "npm run clean",
    },

    // Deploy stage - publishing and deployment
    deploy: {
      preview: "npm run deploy:preview",
      production: "npm run deploy:prod",
      // CUSTOMIZE: Add your deployment commands
    },
  },

  // Label taxonomy for issues and PRs
  labels: {
    // Area labels - what part of the codebase
    areas: [
      { name: "area: components", description: "Related to React components" },
      { name: "area: demo", description: "Demo application" },
      { name: "area: build", description: "Build and bundling" },
      { name: "area: testing", description: "Test suite" },
      { name: "area: docs", description: "Documentation" },
      // CUSTOMIZE: Add your area labels
    ],

    // Type labels - what kind of work
    types: [
      { name: "bug", description: "Something isn't working" },
      { name: "enhancement", description: "New feature or request" },
      { name: "documentation", description: "Documentation improvements" },
      {
        name: "refactor",
        description: "Code improvement without changing behavior",
      },
      { name: "chore", description: "Maintenance tasks" },
    ],

    // Priority labels - urgency of work
    priorities: [
      {
        name: "priority: critical",
        color: "#e11d48",
        description: "Must fix ASAP",
      },
      {
        name: "priority: high",
        color: "#f59e0b",
        description: "Important, fix soon",
      },
      {
        name: "priority: medium",
        color: "#3b82f6",
        description: "Normal priority",
      },
      { name: "priority: low", color: "#8b5cf6", description: "Nice to have" },
    ],

    // MADF adds agent: labels automatically
  },

  // File structure and patterns
  structure: {
    // Component organization
    components: {
      path: "src/components/",
      pattern: "**/index.tsx", // Component entry points
      testPattern: "**/*.test.tsx",
      structure: {
        "index.tsx": "Main component file",
        "types.ts": "TypeScript interfaces",
        "hooks/": "Custom React hooks",
        "utils/": "Utility functions",
        "components/": "Sub-components",
        "__tests__/": "Component tests",
      },
    },

    // Utility organization
    utils: {
      path: "src/utils/",
      pattern: "**/*.ts",
      testPattern: "**/*.test.ts",
    },

    // Demo app organization
    demo: {
      path: "src/demo/",
      entry: "main.tsx",
      components: "components/",
    },

    // Documentation
    docs: {
      path: "docs/",
      api: "api/",
      guides: "guides/",
      examples: "examples/",
    },
  },

  // Agent behavior configuration
  agents: {
    // Instruction files
    instructions: "CLAUDE.md", // Project-specific instructions
    personalInstructions: "CLAUDE.personal.md", // Personal overrides

    // Concurrency and model settings
    maxConcurrent: 6, // CUSTOMIZE: Based on your plan
    defaultModel: "claude-3",
    models: {
      "claude-3": { maxTokens: 200000 },
      "gpt-4": { maxTokens: 128000 },
    },

    // Project-specific validations
    validations: {
      noExternalDependencies: true, // For zero-dep libraries
      headlessComponents: true, // No built-in styles
      strictTypeScript: true, // No 'any' types
      testFirst: true, // TDD approach
      // CUSTOMIZE: Add your validations
    },

    // Checkpoint strategy
    checkpoints: {
      frequency: "stage", // After each stage
      includeTests: true,
      includeOutput: true,
    },
  },

  // Integration rules for parallel development
  integration: {
    // Requirements for integration
    requireTests: true, // Must have tests
    requireDocs: true, // Must update docs
    requireChangelog: true, // Must have changelog entry

    // Contract validation
    contracts: {
      enabled: true,
      location: ".contracts/",
      validation: "strict", // 'strict' | 'loose'
    },

    // Merge strategy
    mergeStrategy: "dependency-order", // Order based on dependencies
    conflictResolution: "manual", // Or 'auto' with rules

    // Branch protection
    protection: {
      requireReview: true,
      requireChecks: ["test", "lint", "build"],
      dismissStaleReviews: true,
    },
  },

  // Hooks for custom behavior
  hooks: {
    // Called before agent starts work
    beforeWork: ".madf/hooks/before-work.js",

    // Called after each stage
    afterStage: ".madf/hooks/after-stage.js",

    // Called before creating PR
    beforePR: ".madf/hooks/before-pr.js",

    // Custom validations
    validate: ".madf/hooks/validate.js",
  },

  // Monitoring and observability
  monitoring: {
    // Cost tracking
    costTracking: {
      enabled: true,
      alerts: {
        hourly: 50, // Alert if >$50/hour
        daily: 500, // Alert if >$500/day
      },
    },

    // Performance tracking
    performance: {
      enabled: true,
      slowThreshold: 300000, // 5 minutes
    },

    // Error tracking
    errors: {
      enabled: true,
      service: "sentry", // Or 'custom'
      // CUSTOMIZE: Add your error tracking config
    },
  },

  // Output preferences
  output: {
    // Logging
    logLevel: "info", // 'debug' | 'info' | 'warn' | 'error'
    logFile: ".madf/logs/madf.log",

    // Progress reporting
    progress: {
      style: "detailed", // 'minimal' | 'detailed' | 'verbose'
      dashboard: true, // Enable web dashboard
    },

    // Notifications
    notifications: {
      slack: {
        enabled: false, // CUSTOMIZE: Enable if using Slack
        webhook: process.env.SLACK_WEBHOOK,
        events: ["error", "complete"],
      },
    },
  },
});
