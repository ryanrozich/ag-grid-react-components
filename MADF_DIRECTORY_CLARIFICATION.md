# MADF Directory Structure Clarification

## What IS the packages/ directory?

The `packages/` directory in MADF is **part of your monorepo structure** and should **NOT** be in .gitignore:

```
multi-agent-dev-framework/
├── packages/           # ✅ This is your CODE - keep in git!
│   ├── core/          # Core framework logic
│   ├── cli/           # CLI tool
│   ├── contracts/     # Contract system
│   └── plugins/       # Plugins
├── node_modules/      # ❌ This goes in .gitignore
├── dist/              # ❌ This goes in .gitignore
└── ...
```

## Common Confusion

You might be thinking of:

- `node_modules/` - Dependencies (should be in .gitignore)
- `dist/` or `build/` - Compiled output (should be in .gitignore)

But `packages/` is where your actual source code lives!

## Correct .gitignore for MADF

```gitignore
# Dependencies
node_modules/        # ✅ Ignore this
.pnpm-store/

# Build outputs
dist/               # ✅ Ignore this
build/              # ✅ Ignore this
*.tsbuildinfo

# Environment
.env
.env.local

# IDE
.vscode/
.idea/

# OS
.DS_Store

# Logs
*.log

# Testing
coverage/

# BUT NOT:
# packages/         # ❌ Never ignore this!
```

## The Monorepo Structure

```
packages/
├── core/
│   ├── package.json    # Name: @coalesce-labs/madf-core
│   └── src/           # Your TypeScript source code
├── cli/
│   ├── package.json    # Name: @coalesce-labs/madf
│   └── src/           # CLI source code
└── plugins/
    └── typescript/
        ├── package.json # Name: @coalesce-labs/madf-plugin-typescript
        └── src/        # Plugin source code
```

This structure allows you to:

- Publish multiple npm packages
- Share code between packages
- Version packages independently
- Maintain everything in one repo
