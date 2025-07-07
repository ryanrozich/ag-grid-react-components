# Migration Instructions for MADF

## What to Move to MADF

### 1. Bot Workflow Scripts

- `scripts/bot-workflow/` - Entire directory
- `scripts/sync-agent-status-to-project.js`
- `scripts/setup-madf-repo.sh`
- `scripts/migrate-to-madf.sh`
- `scripts/update-madf-license.sh`
- `scripts/commit-madf-license.sh`

### 2. Documentation

- `MULTI_AGENT_FRAMEWORK_DESIGN.md`
- `MADF_EXTRACTION_PLAN.md`
- `MADF_VALUE_PROPOSITION.md`
- `MADF_TECHNICAL_SCENARIOS.md`
- `MADF_LICENSING_STRATEGY.md`
- `COALESCE_LABS_ECOSYSTEM.md`
- `MADF_REPO_SETUP.md`
- `docs/FILTER_PRESETS_INTEGRATION_PLAN.md` (as example)
- `COORDINATOR_GUIDE.md`
- `BOT_COMMANDS.md`
- `BOT_CONTINUE_GUIDE.md`

### 3. GitHub Workflows (if any bot-specific ones)

- `.github/workflows/sync-agent-status.yml`

## What NOT to Commit in ag-grid-react-components

Add to `.gitignore`:

```
# Bot orchestration (moved to MADF)
scripts/bot-workflow/
scripts/*madf*
scripts/sync-agent-status-to-project.js
MULTI_AGENT_FRAMEWORK_*.md
MADF_*.md
COALESCE_LABS_*.md
*COORDINATOR*.md
*BOT_*.md
.bot/
```

## Steps to Clean ag-grid-react-components

```bash
# 1. Remove bot-related files (but keep locally)
git rm -r --cached scripts/bot-workflow/
git rm --cached scripts/sync-agent-status-to-project.js
git rm --cached MULTI_AGENT_FRAMEWORK_DESIGN.md
git rm --cached MADF_*.md
git rm --cached COALESCE_LABS_ECOSYSTEM.md
git rm --cached COORDINATOR_GUIDE.md
git rm --cached BOT_*.md
git rm --cached .github/workflows/sync-agent-status.yml

# 2. Update .gitignore
echo "
# Bot orchestration (moved to MADF)
scripts/bot-workflow/
scripts/*madf*
MULTI_AGENT_FRAMEWORK_*.md
MADF_*.md
COALESCE_LABS_*.md
*COORDINATOR*.md
*BOT_*.md
.bot/
" >> .gitignore

# 3. Commit the cleanup
git add .gitignore
git commit -m "chore: remove bot orchestration (moved to MADF)"
```

## Start Fresh in MADF

When you open Claude in the MADF directory:

```bash
cd ~/code-repos/github/coalesce-labs/multi-agent-dev-framework
code .  # or your preferred editor
```

Then tell Claude:

"I'm building MADF - a framework for orchestrating multiple AI agents to develop software in parallel. I've migrated the bot workflow scripts from ag-grid-react-components. Please help me:

1. Copy the bot workflow scripts from ag-grid-react-components
2. Convert them to TypeScript
3. Create proper abstractions for the framework
4. Build the CLI tool
5. Set up the monorepo structure properly

The key directories to migrate are:

- scripts/bot-workflow/ (entire directory)
- Related documentation files
- GitHub automation scripts

Let's start by setting up the core architecture and converting the first script."

## What to Keep in MADF packages/ Directory

The `packages/` directory should NOT be in .gitignore! It's your monorepo structure:

```
packages/
├── core/        # Core framework logic
├── cli/         # CLI tool
├── contracts/   # Contract system
└── plugins/     # Plugin system
```

What SHOULD be in .gitignore:

- `node_modules/`
- `dist/`
- `.env`
- `*.log`

## Migration Sequence

1. **Phase 1**: Copy raw scripts to MADF
2. **Phase 2**: Convert to TypeScript with proper classes
3. **Phase 3**: Build abstractions and interfaces
4. **Phase 4**: Create CLI commands
5. **Phase 5**: Add configuration system
6. **Phase 6**: Build plugin architecture
