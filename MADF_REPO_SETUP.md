# MADF Repository Setup for coalesce-labs

## Repository Creation

```bash
# Create the private repository
gh repo create coalesce-labs/multi-agent-dev-framework \
  --private \
  --description "Orchestrate multiple AI agents to develop software in parallel on GitHub" \
  --license MIT

# Clone locally
cd ~/code-repos/github/coalesce-labs
git clone git@github.com:coalesce-labs/multi-agent-dev-framework.git
cd multi-agent-dev-framework
```

## Initial Repository Structure

```bash
# Create directory structure
mkdir -p packages/{core,cli,plugins,contracts}
mkdir -p packages/core/{agents,git,github,workflows,integration,monitoring}
mkdir -p packages/cli/src/commands
mkdir -p packages/plugins/{typescript,react,python}
mkdir -p templates/{library,application,service}
mkdir -p docs/{api,guides,examples}
mkdir -p .github/workflows

# Create root files
touch README.md
touch LICENSE
touch .gitignore
touch package.json
touch tsconfig.json
touch lerna.json
touch CONTRIBUTING.md
touch SECURITY.md
```

## Root package.json

```json
{
  "name": "@coalesce-labs/madf",
  "version": "0.1.0",
  "description": "Multi-Agent Development Framework - Orchestrate AI agents for parallel development",
  "private": true,
  "workspaces": ["packages/*"],
  "scripts": {
    "build": "lerna run build",
    "test": "lerna run test",
    "lint": "lerna run lint",
    "clean": "lerna clean -y && rm -rf node_modules",
    "publish": "lerna publish",
    "dev": "lerna run dev --parallel",
    "cli": "node packages/cli/dist/index.js"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@typescript-eslint/eslint-plugin": "^6.0.0",
    "@typescript-eslint/parser": "^6.0.0",
    "eslint": "^8.0.0",
    "lerna": "^8.0.0",
    "prettier": "^3.0.0",
    "typescript": "^5.0.0",
    "vitest": "^1.0.0"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/coalesce-labs/multi-agent-dev-framework.git"
  },
  "keywords": ["ai", "agents", "development", "automation", "github", "parallel", "orchestration"],
  "author": "Ryan Rozich <ryan@coalesce-labs.com>",
  "license": "MIT",
  "bugs": {
    "url": "https://github.com/coalesce-labs/multi-agent-dev-framework/issues"
  },
  "homepage": "https://madf.dev"
}
```

## README.md Template

````markdown
# Multi-Agent Development Framework (MADF)

> Orchestrate multiple AI agents to develop software in parallel on GitHub

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Node](https://img.shields.io/badge/Node-20+-green)](https://nodejs.org)

## 🚀 What is MADF?

MADF enables you to leverage multiple AI agents (Claude, GPT-4, Gemini, etc.) to work on different parts of your codebase simultaneously, with automatic integration and conflict resolution.

### Before MADF

- One developer, one AI, one task at a time
- Manual coordination of changes
- Hope that parallel work integrates

### With MADF

- Multiple AIs working in parallel
- Automatic dependency management
- Validated integration with contract enforcement
- 10x faster feature development

## 🎯 Key Features

- **Parallel Development**: Run multiple AI agents on different issues simultaneously
- **Smart Integration**: Automatic dependency resolution and merge ordering
- **Contract System**: Define interfaces between components for clean integration
- **Multi-Model Support**: Use different AI models for different tasks
- **GitHub Native**: Deep integration with issues, PRs, projects, and milestones
- **Observable**: Full visibility into agent work, costs, and progress
- **Extensible**: Plugin system for languages, frameworks, and workflows

## 📦 Installation

```bash
npm install -g @coalesce-labs/madf
```
````

## 🚀 Quick Start

1. Initialize MADF in your project:

```bash
madf init
```

2. Configure your project:

```typescript
// madf.config.ts
export default {
  project: {
    name: "my-app",
    type: "application",
    language: ["typescript", "react"],
  },
  github: {
    owner: "myorg",
    repo: "myapp",
  },
  agents: {
    model: "claude-3",
    maxConcurrent: 6,
  },
};
```

3. Launch agents for a feature:

```bash
madf launch feature "Add user authentication"
```

## 📖 Documentation

- [Getting Started Guide](docs/guides/getting-started.md)
- [Configuration Reference](docs/api/configuration.md)
- [Plugin Development](docs/guides/plugin-development.md)
- [Best Practices](docs/guides/best-practices.md)

## 🤝 Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for development setup and guidelines.

## 📄 License

MIT © [Coalesce Labs](https://github.com/coalesce-labs)

## 🔗 Links

- [Website](https://madf.dev)
- [Documentation](https://docs.madf.dev)
- [Blog](https://blog.madf.dev)
- [Discord Community](https://discord.gg/madf)

---

Built with ❤️ by [Coalesce Labs](https://coalesce-labs.com)

````

## Core Package Structure

```typescript
// packages/core/package.json
{
  "name": "@coalesce-labs/madf-core",
  "version": "0.1.0",
  "description": "Core engine for Multi-Agent Development Framework",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "scripts": {
    "build": "tsc",
    "test": "vitest",
    "lint": "eslint src"
  },
  "dependencies": {
    "simple-git": "^3.0.0",
    "yaml": "^2.0.0",
    "zod": "^3.0.0"
  },
  "peerDependencies": {
    "@octokit/rest": "^20.0.0"
  }
}
````

## CLI Package Structure

```typescript
// packages/cli/package.json
{
  "name": "@coalesce-labs/madf",
  "version": "0.1.0",
  "description": "CLI for Multi-Agent Development Framework",
  "bin": {
    "madf": "./dist/index.js"
  },
  "scripts": {
    "build": "tsc",
    "dev": "tsx src/index.ts",
    "test": "vitest"
  },
  "dependencies": {
    "@coalesce-labs/madf-core": "workspace:*",
    "commander": "^11.0.0",
    "chalk": "^5.0.0",
    "ora": "^7.0.0",
    "inquirer": "^9.0.0"
  }
}
```

## Migration Script

```bash
#!/bin/bash
# migrate-to-madf.sh

# Create directories in MADF repo
MADF_REPO="~/code-repos/github/coalesce-labs/multi-agent-dev-framework"
CURRENT_REPO="~/code-repos/github/ryanrozich/ag-grid-react-components"

# Copy and transform scripts
echo "📦 Migrating bot workflow scripts..."

# Core scripts
cp $CURRENT_REPO/scripts/bot-workflow/core/bot-claim-issue.js \
   $MADF_REPO/packages/core/src/agents/claim.ts

cp $CURRENT_REPO/scripts/bot-workflow/core/bot-checkpoint.js \
   $MADF_REPO/packages/core/src/agents/checkpoint.ts

cp $CURRENT_REPO/scripts/bot-workflow/core/bot-create-pr.js \
   $MADF_REPO/packages/core/src/agents/pr.ts

# Continue for all scripts...

echo "✅ Migration complete!"
```

## Branding Ideas for Coalesce Labs

### MADF Brand Identity

- **Logo**: Hexagonal network pattern (representing parallel agents)
- **Colors**:
  - Primary: Deep purple (#6B46C1)
  - Secondary: Electric blue (#3B82F6)
  - Accent: Emerald (#10B981)
- **Tagline**: "Parallel Intelligence for Software Development"

### Related Tools Under Coalesce Labs

1. **MADF**: Core framework
2. **MADF Cloud**: Managed agent orchestration
3. **MADF Studio**: Visual workflow designer
4. **MADF Analytics**: Performance and cost tracking
5. **MADF Enterprise**: On-premise solution

## Next Steps

1. **Create the repository**:

   ```bash
   gh repo create coalesce-labs/multi-agent-dev-framework --private
   ```

2. **Set up development environment**:

   ```bash
   git clone git@github.com:coalesce-labs/multi-agent-dev-framework.git
   cd multi-agent-dev-framework
   npm install
   ```

3. **Start migration**:

   - Extract core functionality
   - Convert to TypeScript
   - Add tests
   - Create documentation

4. **MVP Timeline**:
   - Week 1: Core extraction and setup
   - Week 2: CLI development
   - Week 3: Plugin system
   - Week 4: Documentation and examples
   - Month 2: Private beta

Would you like me to help create the initial repository structure and start the migration process?
