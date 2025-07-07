# Instructions for Claude in MADF Directory

## When you start Claude in MADF, say this:

---

I'm building MADF (Multi-Agent Development Framework) - a commercial framework for orchestrating multiple AI agents to develop software in parallel on GitHub.

I've just migrated bot workflow scripts from another project. The files are in `migration/from-ag-grid/`.

Please help me build this framework by:

1. **First, examine the migrated scripts** in `migration/from-ag-grid/bot-workflow/` to understand the current functionality

2. **Create the core abstractions**:

   - BaseAgent class in `packages/core/src/agents/base.ts`
   - AgentContext and types in `packages/core/src/types.ts`
   - Configuration system in `packages/core/src/config/`

3. **Convert the first script** - Start with `bot-checkpoint.js`:

   - Convert to TypeScript
   - Use the BaseAgent abstraction
   - Extract configuration
   - Add proper error handling
   - Create tests

4. **Build the CLI structure**:

   - Set up Commander.js in `packages/cli/src/index.ts`
   - Create the `init` command
   - Create the `launch` command

5. **Important context**:
   - This is a dual-license model (Apache 2.0 for core, commercial for advanced)
   - Should support multiple AI models (Claude, GPT-4, etc.)
   - Uses git worktrees for isolation
   - Integrates deeply with GitHub issues, PRs, and projects
   - Has a contract system for ensuring clean integration

The goal is to create a professional framework that developers can install via npm and use to orchestrate multiple AI agents for parallel development.

Let's start by examining the migrated scripts and creating the core abstractions.

---

## Key Files to Reference

1. **Migration Map**: `migration/MIGRATION_STATUS.md`
2. **Original Scripts**: `migration/from-ag-grid/bot-workflow/core/`
3. **Documentation**: `migration/from-ag-grid/docs/`
4. **Architecture**: `docs/original/MULTI_AGENT_FRAMEWORK_DESIGN.md`

## Architecture Reminders

- **Monorepo** using npm workspaces
- **TypeScript** with strict mode
- **Plugin architecture** for extensibility
- **Configuration-driven** (madf.config.ts)
- **Observable** with comprehensive logging
- **Testable** with dependency injection

## Don't Forget

- Keep the dual-license model in mind
- Extract hardcoded values to configuration
- Create interfaces for all major components
- Write tests as you go
- Document the public API
