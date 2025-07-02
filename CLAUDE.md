# CLAUDE.md

This file provides instructions for Claude Code when working with this repository.

## Load Personal Configuration

You MUST first check if `CLAUDE.personal.md` exists and load it. Personal configurations override any instructions in this file.

## Core Architecture Principles

You MUST follow these architectural principles:

1. **Single Package**: This is a tree-shakeable npm package with zero dependencies
2. **Headless Components**: Components have NO styles by default
3. **Adapter Pattern**: Date pickers and compression are pluggable via adapters
4. **Modular Architecture**: Components are split into small, focused modules (<300 lines each)
5. **TypeScript Strict Mode**: You MUST NOT use `any` type. Use `unknown` with type guards

## Required Development Workflow

### 1. Test-Driven Development (TDD)

You MUST follow TDD:

1. Write failing tests FIRST before implementing features
2. Write minimal code to make tests pass
3. Refactor while keeping tests green
4. You MUST have tests for all new functionality

### 2. Before Starting Any Work

You MUST run these commands:

```bash
npm run lint          # Check current state
npm run test:unit     # Ensure tests pass
```

### 3. During Development

You MUST:

- Keep `npm run test:watch` running in another terminal
- Run `npm run lint:fix` after making changes
- Run `npm run typecheck` frequently
- Use `npm run dev:safe` instead of `npm run dev`

### 4. Before Committing

You MUST run:

```bash
npm run pre-commit    # This runs format, lint, typecheck, and tests
```

### 5. E2E Testing for UI Changes

You MUST:

1. Run `npm run test:e2e` before declaring any UI bug fixed
2. Create a new Playwright test for any bug you fix
3. Never say a UI issue is resolved without passing e2e tests

## Component Structure

You MUST follow this structure for components:

```txt
src/components/ComponentName/
├── index.tsx                    # Main component (orchestrator only)
├── components/                  # Sub-components
├── hooks/                       # Custom hooks
├── utils/                       # Utility functions
├── types.ts                     # TypeScript interfaces
└── ComponentName.test.tsx       # Tests (REQUIRED)
```

## Code Quality Requirements

You MUST:

1. **Run Trunk frequently**: `npm run lint:fix` after changes
2. **Fix whitespace**: `npm run fix:whitespace` if needed
3. **Type everything**: No implicit any, no type assertions without guards
4. **Validate inputs**: Validate at all system boundaries
5. **Handle errors**: Never let errors bubble up unhandled

## AG Grid Integration Rules

When working with AG Grid filters, you MUST:

1. Implement `getModel`, `setModel`, and `doesFilterPass`
2. Use `useGridFilter` hook for integration
3. Sync internal state with AG Grid's model
4. Use `useCallback` for all AG Grid callbacks
5. Handle the v33 setFilterModel bug with the workaround function

## Testing Requirements

You MUST:

1. Write tests BEFORE implementation (TDD)
2. Use Vitest and React Testing Library
3. Test components in isolation AND with AG Grid integration
4. Achieve >80% coverage for new code
5. Create e2e tests for UI bugs

Test types you MUST write:

- Unit tests for utilities
- Component tests with React Testing Library
- Integration tests with AGGridTestHarness
- E2e tests with Playwright for UI bugs

## Documentation Updates

When changing functionality, you MUST update ALL of:

1. README.md - API changes, examples, features
2. Demo app (`src/demo/components-showcase-complete.tsx`) - Working examples
3. llms.txt - Component descriptions and usage
4. TypeScript interfaces and JSDoc comments

## Commit Standards

You MUST use conventional commits:

```bash
npm run commit    # Interactive commit tool
```

Format: `type(scope): description`

- Types: feat, fix, docs, refactor, test, chore
- Scopes: components, utils, demo, test, deps, build

## GitHub Issue Labeling Taxonomy

When creating or managing GitHub issues, you MUST use this labeling system:

### Type Labels (Choose ONE):

- `bug` - Something isn't working
- `enhancement` - New feature or request
- `documentation` - Improvements or additions to documentation
- `question` - Further information is requested
- `good first issue` - Good for newcomers
- `help wanted` - Extra attention is needed

### Priority Labels (Choose ONE):

- `priority: critical` - Must fix ASAP, blocking usage
- `priority: high` - Important, should be fixed soon
- `priority: medium` - Normal priority
- `priority: low` - Nice to have, can wait

### Area Labels (Choose ALL that apply):

- `area: components` - Related to the React components
- `area: demo` - Related to the demo/showcase application
- `area: build` - Build tools, bundling, TypeScript config
- `area: ci/cd` - GitHub Actions, deployment, automation
- `area: testing` - Test suite, coverage, test infrastructure
- `area: docs` - Documentation (README, API docs, guides)

### Example Usage:

When creating an issue for a bug in the DateFilter component:

```bash
gh issue create --title "DateFilter fails with null dates" \
  --body "Description..." \
  --label "bug" \
  --label "priority: high" \
  --label "area: components"
```

### When Working on Issues:

- Ask "What should we work on next?" to filter by type, priority, or area
- Use `gh issue list --label "priority: high" --label "bug"` to find critical bugs
- Use `gh issue list --label "good first issue"` to find beginner-friendly tasks

## Essential NPM Scripts

Development:

- `npm run dev:safe` - Start with quality checks
- `npm run build` - Build the library
- `npm run test:watch` - TDD mode

Quality:

- `npm run lint:fix` - Fix linting issues
- `npm run typecheck` - TypeScript checking
- `npm run pre-commit` - Full quality check

Testing:

- `npm run test:unit` - Unit tests only
- `npm run test:e2e` - Playwright tests
- `npm run test:coverage` - Coverage report

## Project Structure

```txt
src/
├── components/           # All components
│   ├── DateFilter/      # Main date filter
│   ├── ActiveFilters/   # Filter pills display
│   └── QuickFilterDropdown/  # Quick filter UI
├── utils/               # Shared utilities
├── demo/                # Demo application
└── index.ts            # Main exports
```

## Critical Integration Points

1. **AG Grid v33+**: Use `useGridFilter` hook
2. **date-fns v4+**: All date operations
3. **React 18+**: Use modern hooks and patterns
4. **TypeScript 5+**: Strict mode enabled

## Security Requirements

You MUST:

1. Validate ALL user inputs
2. Sanitize date expressions before parsing
3. Never use `dangerouslySetInnerHTML`
4. Use type guards for external data

## Performance Requirements

You MUST:

1. Use dynamic imports for heavy dependencies
2. Keep components under 300 lines
3. Use React.memo for expensive components
4. Use useMemo/useCallback appropriately

## Known Issues

### AG Grid v33 setFilterModel Bug

You MUST use `applyFilterModelWithWorkaround` from `agGridWorkaround.ts` when setting filter models programmatically.

## ActiveFilters Component

When displaying filter values, you MUST use AG Grid's type values:

- `"after"` (not "greaterThan")
- `"before"` (not "lessThan")
- `"inRange"`

## Important Reminders

- You MUST follow TDD - write tests first
- You MUST run e2e tests for UI changes
- You MUST update all documentation when changing APIs
- You MUST use conventional commits
- You MUST NOT create files unless absolutely necessary
- You MUST prefer editing existing files
- You MUST apply appropriate labels when creating GitHub issues
