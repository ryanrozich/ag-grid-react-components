# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

This project uses npm scripts for all commands. To see available commands, run `npm run` or check the scripts section in `package.json`.

### Development

```bash
# Start development server
npm run dev

# Start development with quality checks first
npm run dev:safe

# Build the library
npm run build

# Preview the built package
npm run preview
```

### Testing

```bash
# Run all tests (unit + e2e)
npm test

# Run unit tests only
npm run test:unit

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm run test:file -- DateFilter.test

# E2E tests
npm run test:e2e           # Run playwright tests
npm run test:e2e:ui        # Open playwright UI
npm run test:e2e:debug     # Debug mode
npm run test:e2e:headed    # Run with visible browser

# Browser tests
npm run test:browser       # Validate demo works
npm run test:filter-click  # Test filter clicking

# Generate and open coverage report
npm run coverage:report
```

### Code Quality

```bash
# Run linter
npm run lint

# Lint CSS files
npm run lint:styles

# Format code
npm run format

# Check formatting without changing files
npm run format:check

# Type checking
npm run typecheck

# Run format check + typecheck
npm run check

# Run all quality checks
npm run quality

# Pre-commit check (format + quality)
npm run pre-commit
```

**CRITICAL**: Always run `npm run pre-commit` before committing code. This runs formatting and all quality checks.

### Utility Commands

```bash
# Install dependencies
npm install

# Clean build artifacts
npm run clean

# Fresh start (clean + install + build)
npm run fresh

# Check bundle size
npm run bundle-size

# Run TypeScript file directly
npm run run-tsx src/demo/test.tsx
```

### Commits and Releases

**IMPORTANT**: This project uses conventional commits for semantic versioning. Always use:

```bash
# Create a conventional commit interactively
npm run commit

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
npm run release

# Specific version bumps
npm run release:patch   # 1.0.0 → 1.0.1
npm run release:minor   # 1.0.0 → 1.1.0
npm run release:major   # 1.0.0 → 2.0.0

# Preview what would happen
npm run release:dry-run

# Create the very first release (for new projects)
npm run release:first
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
6. Run `npm run pre-commit` before committing to ensure all quality standards are met

### IMPORTANT: Documentation and Demo Updates

**When making changes to components, ALWAYS update both:**

1. **README.md** - Update the documentation to reflect:

   - New features or APIs
   - Updated examples
   - Changed behavior
   - Installation/usage instructions
   - TypeScript interfaces

2. **Demo Application** (`src/demo/components-showcase-complete.tsx`):
   - Add examples of new features
   - Update existing examples if behavior changes
   - Ensure all component capabilities are demonstrated
   - Test that the demo runs correctly with `npm run dev`

This ensures users have accurate documentation and working examples of all features.

### Demo Feature Documentation

When making notable changes to the demo that showcase AG Grid features or serve as implementation examples, you MUST also:

1. **Update Demo Documentation** - In the Demo Guide section of `components-showcase-complete.tsx`:

   - Document any new AG Grid features enabled (e.g., grand totals, group totals, custom cell renderers)
   - Note which features are Enterprise vs Community
   - Add implementation details if they serve as good examples for users
   - Include links to relevant AG Grid documentation

2. **Create GitHub Documentation** - If the feature implementation is substantial:

   - Create a corresponding documentation page in the GitHub repository
   - Document the implementation approach
   - Include code examples
   - Explain any design decisions

3. **Keep Information in Sync** - Ensure consistency between:
   - Demo documentation in the showcase
   - GitHub repository documentation
   - README.md
   - llms.txt

Examples of demo features that should be documented:

- Custom cell renderers (avatar renderer, category pills)
- Aggregation features (grand totals, group totals)
- Filtering implementations
- Styling customizations
- Performance optimizations

### Standard Development Workflow

```bash
# 1. Start your work
npm run dev:safe         # Runs quality checks before starting dev server

# 2. During development
npm run test:watch       # Keep tests running in another terminal
npm run check           # Periodically check for issues

# 3. Before committing
npm run pre-commit      # Formats code and runs all checks

# 4. Create your commit
npm run commit          # Interactive conventional commit
# OR use git with conventional format:
# git commit -m "feat(components): add date range support"
# git commit -m "fix(utils): correct timezone handling"

# 5. Check your work
npm run bundle-size     # Ensure bundle size is reasonable
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
2. **Integration Tests**: Test DateFilter with AG Grid using AGGridTestHarness
3. **E2E Tests**: Playwright tests for browser validation
4. **Browser Tests**: Validate that the demo works correctly using Puppeteer

### Testing Utilities

- **AGGridTestHarness**: Test component for AG Grid integration testing
- **agGridTestUtils.ts**: Helper functions for testing AG Grid components
- **Test fixtures**: Consistent test data in `tests/fixtures/testData.ts`

## Supported Configurations

- AG Grid versions: 33.3.0+
- React versions: 18 or later
- date-fns versions: 4+
- Node.js: 18+
- TypeScript: 5+

## Important Notes

- The filter works with both AG Grid Community and Enterprise editions
- Enterprise features (like Filter Tool Panel) are automatically enabled when available
- All date filter operations support configurable inclusive/exclusive boundaries
- The filter model is serializable for bookmarking and browser history integration

## Demo Deployment

The demo is deployed to https://demo.rozich.net/ag-grid-react-components/ using a custom Cloudflare Workers architecture. This deployment system allows hosting multiple demos under a single domain with edge caching and global distribution.

For detailed information about the deployment architecture and how to deploy updates, see [DEMO-DEPLOYMENT.md](./DEMO-DEPLOYMENT.md).

Key points:

- Uses Cloudflare Workers for routing and R2 for asset storage
- Automatic deployment via GitHub Actions on push to main
- Demo router repository: https://github.com/ryanrozich/demo-router-worker
- All infrastructure fits within Cloudflare's free tier

## Prettier Configuration

This project uses Prettier for code formatting. Prettier is integrated into the workflow:

```bash
# Format all files
npm run format

# Check if files are formatted correctly
npm run format:check
```

Prettier will automatically:

- Format TypeScript/JavaScript files
- Format CSS/SCSS files
- Format JSON files
- Format Markdown files

The configuration follows standard Prettier defaults with minimal customization to ensure consistency across the codebase.

**Note**: Always run `npm run format` before committing or use `npm run pre-commit` which includes formatting.

## CRITICAL: Documentation Synchronization

**When making ANY changes to component functionality or APIs, you MUST update ALL of the following:**

1. **README.md** - Main repository documentation

   - Component APIs and parameters
   - Usage examples
   - Installation instructions
   - Feature descriptions

2. **Demo Documentation** (`src/demo/components-showcase-complete.tsx`)

   - Update the docs page sections
   - Update code examples
   - Update parameter tables
   - Update feature lists

3. **llms.txt** (`public/llms.txt`)
   - Keep component descriptions current
   - Update usage examples
   - Maintain accurate feature lists

**Synchronization Checklist:**

- [ ] Component parameter changes → Update ALL documentation
- [ ] New features → Document in README, demo docs, and llms.txt
- [ ] API changes → Update all code examples everywhere
- [ ] Bug fixes that change behavior → Note in documentation
- [ ] New expressions or operators → Document in expressions section

**Documentation Standards:**

- Use consistent terminology across all docs
- Keep code examples working and tested
- Maintain the same level of detail in all locations
- Update version numbers if applicable

**Remember:** The demo site documentation IS the primary documentation for many users. It must always be accurate and complete.

## Component Library

### ActiveFilters Component

**Purpose**: Display active AG Grid filters as removable pills showing both column names and filter values.

**Location**: `src/components/ActiveFilters/`

**Key Features**:

- Shows filter values alongside column names (e.g., "Due Date: Last 7 days")
- Individual filter removal via × button
- "Clear all" button to remove all filters
- Handles various filter types: date ranges, set filters, text filters
- TypeScript interfaces for type safety
- CSS Modules for styling isolation

**API**:

```typescript
export interface ActiveFiltersProps {
  api: GridApi;
  filterModel: FilterModel;
  className?: string;
}
```

**CSS Styling Notes**:

- Uses `rgb()` notation with decimal alpha values (e.g., `rgb(99, 102, 241, 0.1)`)
- This satisfies stylelint's `color-function-notation: "legacy"` rule
- Do NOT use `rgba()` or modern `rgb(99 102 241 / 0.1)` syntax

## Known Issues and Workarounds

### AG Grid v33 setFilterModel Bug

**Issue**: When calling `api.setFilterModel()` programmatically on custom React filter components, the filter doesn't properly initialize. The component receives the model in props but doesn't apply it to internal state, causing filters to not work.

**Related GitHub Issues**:

- [ag-grid/ag-grid#2256](https://github.com/ag-grid/ag-grid/issues/2256)
- [ag-grid/ag-grid#2709](https://github.com/ag-grid/ag-grid/issues/2709)
- [ag-grid/ag-grid#4870](https://github.com/ag-grid/ag-grid/issues/4870)

**Workaround**: Use the `applyFilterModelWithWorkaround` function from `src/components/QuickFilterDropdown/utils/agGridWorkaround.ts`:

```typescript
import { applyFilterModelWithWorkaround } from "./utils/agGridWorkaround";

// Instead of:
api.setFilterModel({ columnId: filterModel });

// Use:
await applyFilterModelWithWorkaround(api, columnId, filterModel);
```

This workaround:

- Handles AG Grid v33's Promise-based filter instances
- Manually calls setModel on the filter instance
- Forces grid refresh to ensure DOM updates
- Adds proper timing for React component lifecycle

**Note**: This workaround should be removed once AG Grid fixes the underlying issue.

# important-instruction-reminders

Do what has been asked; nothing more, nothing less.
NEVER create files unless they're absolutely necessary for achieving your goal.
ALWAYS prefer editing an existing file to creating a new one.
NEVER proactively create documentation files (\*.md) or README files. Only create documentation files if explicitly requested by the User.
