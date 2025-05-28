# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Primary Workflow: Using Just

**IMPORTANT**: This project uses `just` as the primary command runner. All commands should be run through `just` rather than directly using npm, trunk, or other tools. This ensures:

- Consistent command execution
- Proper sequencing of checks
- Unified interface for all project tasks

To see all available commands, simply run:

```bash
just
```

## Prerequisites

This project uses `just` as a command runner. If `just` is not installed, install it first:

```bash
# macOS
brew install just

# Linux
curl --proto '=https' --tlsv1.2 -sSf https://just.systems/install.sh | bash -s -- --to /usr/local/bin

# Or via cargo (if Rust is installed)
cargo install just
```

## Commands

**IMPORTANT**: Always use `just` commands instead of npm/trunk commands directly. This ensures consistency and includes necessary checks.

### Development

```bash
# Start development server
just dev

# Start development with quality checks first
just dev-safe

# Build the library
just build

# Preview the built package
just preview
```

### Testing

```bash
# Run all tests
just test

# Run tests in watch mode
just test-watch

# Run tests with coverage
just test-coverage

# Run specific test file
just test-file "DateFilter.test"

# Browser test to validate demo
just test-browser

# Test clicking on filter icons
just test-filter-click
```

### Code Quality

```bash
# Run linter
just lint

# Run Trunk comprehensive checks
just check

# Auto-fix formatting issues
just fmt

# Run ALL quality checks (lint + trunk + tests)
just quality

# Pre-commit check (format + quality)
just pre-commit
```

**CRITICAL**: Always run `just pre-commit` before committing code. This runs formatting and all quality checks.

### Utility Commands

```bash
# Install/update dependencies
just install
just update-deps

# Clean and fresh build
just clean
just fresh

# Show component architecture
just show-architecture

# Check bundle size
just bundle-size

# Create new component
just new-component MyComponent

# Show refactoring TODOs
just show-todos

# Run TypeScript file directly
just run-tsx src/demo/test.tsx
```

### Quick Reference

```bash
just          # Show all available commands
just qa       # Alias for pre-commit
just ci       # Run quality + build (for CI)
```

### Commits and Releases

**IMPORTANT**: This project uses conventional commits for semantic versioning. Always use:

```bash
# Create a conventional commit interactively
just commit

# This will prompt you for:
# - Type (feat, fix, docs, style, refactor, test, chore)
# - Scope (optional: core, components, utils, demo, test, deps, build, docs, ci)
# - Description
# - Breaking changes
# - Issues closed
```

#### Release Management

```bash
# Create a new release (auto-determines version from commits)
just release

# Specific version bumps
just release-patch   # 1.0.0 → 1.0.1
just release-minor   # 1.0.0 → 1.1.0
just release-major   # 1.0.0 → 2.0.0

# Preview what would happen
just release-dry-run
```

The release process will:

1. Analyze commits since last release
2. Bump version in package.json
3. Generate/update CHANGELOG.md
4. Create a git tag
5. Commit all changes

## Architecture

This repository contains a custom date filter component for AG Grid that supports both absolute dates and relative date expressions. Following a recent major refactoring, the codebase now uses a modular component architecture.

### Component Structure (Modular Architecture)

The date filter has been decomposed from a 971-line monolith into a clean, modular architecture:

```txt
src/components/DateFilter/
├── index.tsx                    # Main orchestrator (291 lines, 70% reduction)
├── components/
│   ├── FilterModeToggle.tsx    # Toggle between absolute/relative modes
│   ├── FilterTypeSelector.tsx  # Dropdown for filter types
│   ├── AbsoluteDatePicker.tsx  # Date picker UI for absolute mode
│   ├── RelativeExpressionInput.tsx # Expression input for relative mode
│   └── FilterActions.tsx       # Reset/Apply buttons
├── hooks/
│   ├── useFilterState.ts       # Centralized state management (13+ state variables)
│   └── useFilterValidation.ts  # Validation logic and date resolution
└── types.ts                    # TypeScript interfaces and types
```

### Core Components

1. **DateFilter (index.tsx)**: The main filter component that implements AG Grid's IFilter interface. Key responsibilities:

   - AG Grid integration via useGridFilter hook
   - Orchestrates child components
   - Implements required callbacks (doesFilterPass, getModel, setModel)

2. **RelativeDateFloatingFilter.tsx**: A companion component that displays the current filter state in AG Grid's floating filter header.

### Utilities

1. **dateExpressionParser.ts**: Handles parsing and resolving relative date expressions like "Today+7d" using date-fns.

   - `parseDateExpression`: Parses expressions and validates them
   - `isValidDateExpression`: Checks if an expression is valid
   - `resolveDateExpression`: Resolves expressions to actual Date objects

2. **filterStateUtils.ts**: Handles filter serialization and URL persistence.
   - `serializeFilterModel`: Serializes Date objects in filter models for storage
   - `deserializeFilterModel`: Deserializes string dates back to Date objects
   - `setupFilterStatePersistence`: Sets up browser history integration

### Demo

The package includes a comprehensive demo in `src/demo/working-demo.tsx` that showcases:

- Both absolute and relative date filtering
- Integration with AG Grid Enterprise features
- Filter state persistence in the URL
- Quick filter buttons for common date ranges

### Data Flow

1. User interacts with the filter UI (selects dates or enters expressions)
2. Component validates input and creates a filter model
3. AG Grid calls the `doesFilterPass` method to filter rows
4. Filter state can be serialized for persistence and later restored

## Integration Points

When working with this codebase, be aware of these key integration points:

1. **AG Grid API**: The components use the AG Grid v33+ API with `useGridFilter` hook. This is a critical integration point.

2. **date-fns**: All date manipulation relies on date-fns v4+ functions.

3. **Browser History API**: Filter state persistence uses the browser's History API for URL-based state management.

## Design Patterns

1. **Component State Management**: Uses React hooks (useState, useCallback, useMemo) extensively for state management.

2. **Serialization/Deserialization**: Dates are serialized to ISO strings for storage and deserialized back to Date objects.

3. **Callback Registration**: The filter registers callback functions with AG Grid through the useGridFilter hook.

4. **Expression Parsing**: The date expression parser uses regex pattern matching for parsing relative date expressions.

## Expert Architectural Advice

Based on our comprehensive refactoring, here are key principles to maintain code quality:

### Component Design

1. **Single Responsibility**: Each component should have ONE clear purpose. If you find yourself using "and" to describe what a component does, it needs to be split.
2. **Component Size**: Target <300 lines per component. Our 971→291 line reduction proves this is achievable.
3. **Props Interface**: Keep props interfaces focused. If a component needs >5-7 props, consider if it's doing too much.

### State Management

1. **Centralize Complex State**: Use custom hooks (like useFilterState) when managing >3-4 related state variables.
2. **Avoid Prop Drilling**: If passing props through >2 levels, consider context or composition.
3. **Type Safety First**: Never use `any`. Use `unknown` with type guards for dynamic data.

### AG Grid Integration

1. **Required Callbacks**: Always implement getModel, setModel, and doesFilterPass for custom filters.
2. **State Synchronization**: AG Grid expects filters to be controlled components - always sync internal state with AG Grid's model.
3. **Memory Management**: Use useCallback for all AG Grid callbacks to prevent unnecessary re-renders.

### Code Quality Standards

1. **Type Everything**: TypeScript strict mode should be enabled. No implicit any.
2. **Validation Boundaries**: Validate at system boundaries (user input, API responses, URL params).
3. **Error Handling**: Use proper error boundaries and graceful degradation.
4. **Performance**: Use React.memo, useMemo, and useCallback appropriately.

### Security Considerations

1. **Input Sanitization**: Always validate and sanitize user inputs, especially date expressions.
2. **XSS Prevention**: Never use dangerouslySetInnerHTML. Validate all dynamic content.
3. **Type Guards**: Use type guards for all external data (API responses, URL params).

## Common Development Tasks

When implementing or modifying features:

1. Start by updating tests to reflect the new behavior (TDD approach)
2. Update the component implementation
3. Test both the component in isolation and its integration with AG Grid
4. For any new filter capabilities, update both the main filter and floating filter
5. Ensure backward compatibility with existing filter models
6. Run `just pre-commit` before committing to ensure all quality standards are met

### Standard Development Workflow

```bash
# 1. Start your work
just dev-safe         # Runs quality checks before starting dev server

# 2. During development
just test-watch       # Keep tests running in another terminal
just check           # Periodically check for issues

# 3. Before committing
just pre-commit      # Formats code and runs all checks

# 4. Create your commit
just commit          # Interactive conventional commit
# OR use git with conventional format:
# git commit -m "feat(components): add date range support"
# git commit -m "fix(utils): correct timezone handling"

# 5. Creating new components
just new-component ComponentName
just test-file ComponentName.test

# 6. Check your work
just bundle-size     # Ensure bundle size is reasonable
just show-architecture # Verify component structure
```

### Commit Message Format

Follow the conventional commits specification:

```txt
<type>(<scope>): <subject>

<body>

<footer>
```

Examples:

- `feat(components): add relative date shortcuts`
- `fix(core): resolve memory leak in filter state`
- `docs(readme): update installation instructions`
- `refactor(utils): extract date validation logic`
- `test(components): add coverage for edge cases`
- `chore(deps): update ag-grid to v34`

**Breaking Changes**: Use `BREAKING CHANGE:` in the footer or `!` after the type/scope.

## Testing Approach

The codebase uses Vitest with React Testing Library for unit testing:

1. **Unit Tests**: Test individual functions and components in isolation
2. **Browser Tests**: Validate that the demo works correctly in a real browser using Puppeteer
3. **Manual Testing**: Use scripts to help with manual testing scenarios

## Supported Configurations

- AG Grid versions: 33.3.0+
- React versions: 18+ or 19+
- date-fns versions: 4+

## Important Notes

- The filter works with both AG Grid Community and Enterprise editions
- Enterprise features (like Filter Tool Panel) are automatically enabled when available
- All date filter operations support configurable inclusive/exclusive boundaries
- The filter model is serializable for bookmarking and browser history integration

## Trunk.io Setup

This project uses Trunk for comprehensive code quality checks. To set up Trunk:

```bash
# Install Trunk
curl https://get.trunk.io -fsSL | bash

# Initialize Trunk in the project
trunk init

# Run your first check
trunk check

# Set up Git hooks for pre-commit checks
trunk git-hooks sync
```

### Trunk Configuration

Trunk will automatically detect and configure appropriate linters for this project:

- **ESLint**: JavaScript/TypeScript linting (already configured)
- **Prettier**: Code formatting
- **TypeScript**: Type checking
- **Markdownlint**: Markdown file linting
- **Gitleaks**: Secret scanning
- **Hadolint**: Dockerfile linting (if applicable)

### Daily Workflow with Trunk

1. **Before starting work**: `trunk upgrade` to ensure latest tool versions
2. **During development**: `trunk check` to catch issues early
3. **Before committing**: `trunk fmt` to auto-fix formatting
4. **CI Integration**: Trunk can be integrated into CI/CD pipelines

### Why Trunk?

- **Unified Interface**: One command for all code quality tools
- **Incremental Checking**: Only checks changed files for speed
- **Auto-fixing**: Can automatically fix many issues
- **Tool Management**: Handles tool installation and updates
- **Consistency**: Ensures same tool versions across team
