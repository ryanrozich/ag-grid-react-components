#!/bin/bash

# Setup script for MADF repository under coalesce-labs
# Run this to create the initial repository structure

set -e

echo "🚀 Setting up Multi-Agent Development Framework (MADF)"
echo "====================================================="

# Configuration
ORG="coalesce-labs"
REPO="multi-agent-dev-framework"
BASE_DIR="$HOME/code-repos/github/$ORG"

# Create base directory if it doesn't exist
mkdir -p "$BASE_DIR"
cd "$BASE_DIR"

# Step 1: Create GitHub repository
echo "📦 Creating private repository on GitHub..."
gh repo create "$ORG/$REPO" \
  --private \
  --description "Orchestrate multiple AI agents to develop software in parallel on GitHub" \
  --homepage "https://madf.dev" \
  --license MIT \
  --clone

cd "$REPO"

# Step 2: Create directory structure
echo "📁 Creating directory structure..."

# Core directories
mkdir -p packages/{core,cli,contracts,plugins}
mkdir -p packages/core/src/{agents,git,github,workflows,integration,monitoring,contracts}
mkdir -p packages/cli/src/{commands,utils,templates}
mkdir -p packages/plugins/{typescript,react,python,golang}

# Template directories
mkdir -p templates/{library,application,service,microservices}
mkdir -p templates/library/{typescript,python,ruby}

# Documentation
mkdir -p docs/{api,guides,examples,architecture}

# GitHub specific
mkdir -p .github/{workflows,ISSUE_TEMPLATE,PULL_REQUEST_TEMPLATE}

# Test directories
mkdir -p tests/{unit,integration,e2e}

# Step 3: Create root configuration files
echo "📝 Creating configuration files..."

# .gitignore
cat > .gitignore << 'EOF'
# Dependencies
node_modules/
*.log
.pnpm-store/

# Build outputs
dist/
build/
*.tsbuildinfo

# IDE
.vscode/
.idea/
*.swp
*.swo
.DS_Store

# Environment
.env
.env.local
.env.*.local

# Test coverage
coverage/
.nyc_output/

# Temporary
tmp/
temp/
*.tmp

# MADF specific
.madf/
worktrees/
agent-logs/
EOF

# Root package.json
cat > package.json << 'EOF'
{
  "name": "@coalesce-labs/madf",
  "version": "0.1.0",
  "description": "Multi-Agent Development Framework - Orchestrate AI agents for parallel development",
  "private": true,
  "workspaces": [
    "packages/*"
  ],
  "scripts": {
    "build": "turbo build",
    "dev": "turbo dev",
    "test": "turbo test",
    "lint": "turbo lint",
    "format": "prettier --write .",
    "clean": "turbo clean && rm -rf node_modules",
    "changeset": "changeset",
    "version": "changeset version",
    "publish": "turbo build && changeset publish"
  },
  "devDependencies": {
    "@changesets/cli": "^2.27.0",
    "@types/node": "^20.0.0",
    "@typescript-eslint/eslint-plugin": "^6.0.0",
    "@typescript-eslint/parser": "^6.0.0",
    "eslint": "^8.56.0",
    "prettier": "^3.2.0",
    "turbo": "^1.12.0",
    "typescript": "^5.3.0",
    "vitest": "^1.2.0"
  },
  "engines": {
    "node": ">=18.0.0"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/coalesce-labs/multi-agent-dev-framework.git"
  },
  "keywords": [
    "ai",
    "agents",
    "development",
    "automation",
    "github",
    "parallel",
    "orchestration",
    "claude",
    "gpt",
    "llm"
  ],
  "author": "Ryan Rozich <ryan@coalesce-labs.com>",
  "license": "MIT",
  "bugs": {
    "url": "https://github.com/coalesce-labs/multi-agent-dev-framework/issues"
  },
  "homepage": "https://madf.dev"
}
EOF

# tsconfig.json
cat > tsconfig.json << 'EOF'
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "commonjs",
    "lib": ["ES2022"],
    "outDir": "./dist",
    "rootDir": "./",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  },
  "exclude": ["node_modules", "dist", "build"]
}
EOF

# turbo.json
cat > turbo.json << 'EOF'
{
  "$schema": "https://turbo.build/schema.json",
  "globalDependencies": ["**/.env.*local"],
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    },
    "test": {
      "dependsOn": ["build"],
      "outputs": ["coverage/**"]
    },
    "lint": {},
    "dev": {
      "cache": false,
      "persistent": true
    },
    "clean": {
      "cache": false
    }
  }
}
EOF

# README.md
cat > README.md << 'EOF'
# Multi-Agent Development Framework (MADF)

> 🚀 Orchestrate multiple AI agents to develop software in parallel on GitHub

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Node](https://img.shields.io/badge/Node-20+-green)](https://nodejs.org)

## What is MADF?

MADF enables you to leverage multiple AI agents (Claude, GPT-4, Gemini, etc.) to work on different parts of your codebase simultaneously, with automatic integration and conflict resolution.

## 🎯 Key Features

- **Parallel Development**: Run multiple AI agents on different issues simultaneously
- **Smart Integration**: Automatic dependency resolution and merge ordering
- **Contract System**: Define interfaces between components for clean integration
- **Multi-Model Support**: Use different AI models for different tasks
- **GitHub Native**: Deep integration with issues, PRs, projects, and milestones
- **Observable**: Full visibility into agent work, costs, and progress

## 📦 Installation

```bash
npm install -g @coalesce-labs/madf
```

## 🚀 Quick Start

```bash
# Initialize in your project
madf init

# Launch agents for a feature
madf launch feature "Add user authentication"
```

## 📖 Documentation

See [docs/](./docs) for detailed documentation.

## 🤝 Contributing

This project is currently in private development. See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## 📄 License

MIT © [Coalesce Labs](https://github.com/coalesce-labs)

---

Built with ❤️ by [Coalesce Labs](https://coalesce-labs.com)
EOF

# Create initial source files
echo "📦 Creating initial source files..."

# packages/core/src/index.ts
mkdir -p packages/core/src
cat > packages/core/src/index.ts << 'EOF'
export * from './agents';
export * from './contracts';
export * from './workflows';
export * from './config';

export const VERSION = '0.1.0';
EOF

# packages/cli/src/index.ts
mkdir -p packages/cli/src
cat > packages/cli/src/index.ts << 'EOF'
#!/usr/bin/env node
import { Command } from 'commander';
import { VERSION } from '@coalesce-labs/madf-core';

const program = new Command();

program
  .name('madf')
  .description('Multi-Agent Development Framework CLI')
  .version(VERSION);

// Add commands here

program.parse();
EOF

# Step 4: Initialize git
echo "🔧 Initializing git repository..."
git add .
git commit -m "feat: initial MADF repository structure

- Set up monorepo with turbo
- Create package structure for core, cli, and plugins
- Add configuration files
- Add documentation templates"

# Step 5: Set up npm
echo "📦 Installing dependencies..."
npm install

# Step 6: Create first GitHub Action
cat > .github/workflows/ci.yml << 'EOF'
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run lint
      - run: npm run test
      - run: npm run build
EOF

# Final steps
echo "✅ MADF repository setup complete!"
echo ""
echo "Next steps:"
echo "1. cd $BASE_DIR/$REPO"
echo "2. Start migrating scripts from ag-grid-react-components"
echo "3. Convert JavaScript to TypeScript"
echo "4. Add tests for core functionality"
echo "5. Build the CLI tool"
echo ""
echo "🚀 Happy building!"