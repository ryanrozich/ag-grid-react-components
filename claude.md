# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## IMPORTANT: Version 0.1.0 Modular Architecture (December 2024)

This project has been completely refactored into a modular, tree-shakeable architecture with multiple npm packages:

### Package Structure

```
ag-grid-react-components - Single tree-shakeable package
- Minimal bundle: 25KB (just core components)
- With React DatePicker: 65KB
- Full featured: 85KB

Total: Minimal bundle size starting at 25KB
```

### Key Architecture Decisions

1. **Headless by default** - Components come with zero styles
2. **Adapter pattern** - Date pickers and compression are pluggable
3. **Dynamic imports** - Heavy dependencies load only when used
4. **Tree-shakeable** - Each component has its own entry point
5. **Zero dependencies** in core package

### Publishing to NPM

```bash
# Login first
npm login

# Publish all packages with beta tag (requires OTP)
npm run publish:beta --otp=123456

# Publish as latest
npm run publish:latest --otp=123456
```

Package publishes as `ag-grid-react-components` on npm.

### Example Usage Patterns

```typescript
// MINIMAL (25KB total) - Uses native HTML5 date input
import { createDateFilter } from "ag-grid-react-components";
const DateFilter = createDateFilter();

// WITH REACT DATEPICKER (65KB total) - Lazy loaded
import { createDateFilter, reactDatePickerAdapter } from "ag-grid-react-components";
const DateFilter = createDateFilter({ datePickerAdapter: reactDatePickerAdapter });

// WITH COMPRESSION (adds 15KB when used)
import { setupGridStatePersistence } from "ag-grid-react-components";
setupGridStatePersistence(api, { useCompression: true });
```

### Monorepo Structure

- Uses npm workspaces for package management
- Turbo for build orchestration
- Each package has its own package.json and build config
- Shared TypeScript config at root

### Bundle Size Achievements

| Use Case                             | Bundle Size |
| ------------------------------------ | ----------- |
| Just DateFilter (native)             | 25KB        |
| Just QuickFilter                     | 15KB        |
| All components (native)              | 45KB        |
| All components (w/ React DatePicker) | 85KB        |

## Prerequisites

### Installing Trunk

This project uses Trunk.io for code quality. Install it globally:

```bash
# macOS/Linux
curl https://get.trunk.io -fsSL | bash

# Or via Homebrew
brew install trunk-io

# Windows (WSL required)
curl https://get.trunk.io -fsSL | bash
```

After installation, run `trunk` in the project directory to ensure it's set up correctly.

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

### Code Quality (Powered by Trunk)

This project uses **Trunk.io** as the primary code quality runner. Trunk manages multiple linters and formatters in a single, fast, and consistent interface.

#### Trunk Commands

```bash
# Check all files (shows issues without fixing)
npm run lint              # or: trunk check

# Check and auto-fix issues
npm run lint:fix          # or: trunk check --fix

# Format all files
npm run format            # or: trunk fmt

# Check specific linter
npm run lint:styles       # CSS only (stylelint)
npm run format:check      # Formatting only (prettier)

# Type checking (not managed by Trunk)
npm run typecheck         # TypeScript compiler

# Combined checks
npm run check             # Trunk check + TypeScript
npm run quality           # All Trunk checks (no fix)

# Whitespace checks
npm run check:whitespace  # Check for trailing whitespace
npm run fix:whitespace    # Fix trailing whitespace

# Pre-commit (auto-fixes issues)
npm run pre-commit        # Format + fix whitespace + check + typecheck
```

#### What Trunk Checks

- **prettier**: Code formatting
- **eslint**: JavaScript/TypeScript linting
- **stylelint**: CSS/PostCSS linting
- **markdownlint**: Markdown formatting
- **git-diff-check**: Git whitespace issues (trailing spaces, tabs)
- **checkov**: Infrastructure as Code security
- **osv-scanner**: Dependency vulnerabilities
- **trufflehog**: Secrets detection
- **oxipng**: PNG optimization

#### CRITICAL for Claude Code

**You MUST run these commands frequently when making changes:**

1. **Before making changes**: `npm run lint` to see current state
2. **After making changes**: `npm run lint:fix` to auto-fix issues
3. **Before committing**: `npm run pre-commit` (this also runs automatically)

**Trunk will automatically:**

- Format code consistently
- Fix linting issues where possible
- Catch security issues
- Optimize images
- Check for secrets

**Example workflow:**

```bash
# 1. Make your changes
# 2. Check what Trunk finds
npm run lint

# 3. Auto-fix what's possible
npm run lint:fix

# 4. Run pre-commit to ensure everything passes
npm run pre-commit

# 5. If all passes, commit your changes
git add -A && git commit -m "feat: add new feature"
```

**Note**: The pre-commit hook will run automatically, but it's good practice to run it manually first to catch issues early.

#### Whitespace Enforcement

This project enforces strict whitespace rules to ensure clean code:

- **No trailing whitespace** at the end of lines
- **No whitespace on blank lines**
- **Consistent line endings** (LF, not CRLF)
- **No tabs in indentation** (spaces only)

Whitespace is enforced by:

1. **Trunk's git-diff-check**: Catches whitespace issues during `trunk check`
2. **Custom scripts**: Additional validation in `npm run check:whitespace`
3. **Git attributes**: `.gitattributes` configures git's whitespace detection
4. **Pre-commit hooks**: Automatically fixes whitespace issues

If you see whitespace errors:

```bash
# Check for whitespace issues
npm run check:whitespace

# Fix them automatically
npm run fix:whitespace

# Or run pre-commit which includes the fix
npm run pre-commit
```

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

This repository contains custom components for AG Grid including a date filter, quick filters, active filters display, and various cell renderers that supports both absolute dates and relative date expressions. Following a recent major refactoring, the codebase now uses a modular component architecture.

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

### Custom Cell Renderers

The demo includes several custom cell renderers for enhanced visual presentation:

1. **PriorityRenderer**: Color-coded pills for priority levels

   - Critical: Red background/border
   - High: Orange background/border
   - Medium: Yellow background/border
   - Low: Green background/border

2. **StatusRenderer**: Status badges with appropriate colors
3. **AvatarCellRenderer**: User avatars with fallback initials
4. **CategoryCellRenderer**: Category pills with predefined colors
5. **PercentBarRenderer**: Progress bars for percentage values

### Stats Dashboard

The demo features a stats dashboard that displays:

- Number of Tasks (with dynamic filtering)
- Total Budget (sum of all visible rows)
- Average Progress (percentage)
- Budget Remaining (budget - spent)

Stats are calculated using `api.forEachNodeAfterFilterAndSort()` and update automatically when filters change.

### Demo

The package includes a comprehensive demo in `src/demo/components-showcase-complete.tsx` that showcases:

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

The demo is deployed to <https://demo.rozich.net/ag-grid-react-components/> using a custom Cloudflare Workers architecture. This deployment system allows hosting multiple demos under a single domain with edge caching and global distribution.

For detailed information about the deployment architecture and how to deploy updates, see [DEMO-DEPLOYMENT.md](./DEMO-DEPLOYMENT.md).

Key points:

- Uses Cloudflare Workers for routing and R2 for asset storage
- Automatic deployment via GitHub Actions on push to main
- Demo router repository: <https://github.com/ryanrozich/demo-router-worker>
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

### QuickFilterDropdown Component

**Portal Rendering Architecture**:

The component supports optional portal rendering via the `usePortal` prop:

- **`"never"` (default)**: Uses simple CSS positioning for best performance
- **`"always"`**: Forces React Portal rendering for constrained containers
- **`"auto"`**: Experimental auto-detection (currently defaults to "never")

**Design Philosophy**:

- Performance first: Don't make users pay for complexity they don't need
- Progressive enhancement: Simple cases should use simple solutions
- Escape hatches: Always provide ways to handle edge cases

**When to use portal**:

- Only when dropdown is inside containers with `overflow: hidden/auto/scroll`
- When dropdown appears clipped or cut off
- When z-index battles can't be resolved with CSS alone

**Implementation Details**:

- Portal renders at `document.body` level
- Position calculated dynamically based on trigger button
- Includes viewport boundary detection
- Resize/scroll handlers only active when portal is used
- Clean separation between portal and non-portal rendering paths

## Component Library Notes

### Free and Open Source

**IMPORTANT**: AG Grid React Components is 100% free and open source under the MIT license. There is no paid version of these components. The components work with both:

- **AG Grid Community (Free)**: All component features work fully
- **AG Grid Enterprise (Paid)**: Enables additional AG Grid features like floating filters, filter tool panel, etc.

The components themselves are always free regardless of which AG Grid edition you use.

## Demo UI/UX Improvements (December 2024)

### Key Improvements Made

1. **Stats Panel Bug Fix**: Fixed initial load showing no data by adding `setStats(calculateStats(params.api))` in onGridReady

2. **Z-Index Layering Fixes**:

   - QuickFilterDropdown z-index: 50 → 1050 (in CSS module)
   - Added z-index: 10 to pagination panel
   - Added z-index: 1 to grand total row
   - Added relative z-20 to grid toolbar

3. **Layout Enhancements**:

   - Moved "Project Tasks" heading above stats cards
   - Added search bar with AG Grid quick filter integration
   - Full viewport height layout with proper flexbox
   - Removed documentation tabs for cleaner application look

4. **Search Implementation**:
   ```tsx
   onChange={(e) => {
     if (gridApi) {
       gridApi.setGridOption('quickFilterText', e.target.value);
     }
   }}
   ```

## Grid State Persistence

### Overview

The library now includes comprehensive grid state persistence with URL compression, allowing you to save and restore complete grid configurations including filters, columns, sorting, and grouping.

### Implementation Details

**Core Utilities** (`src/utils/gridStateUtils.ts`):

- `setupGridStatePersistence`: Automatic URL synchronization with compression
- `captureGridState`: Manual state capture for custom persistence
- `applyGridState`: Manual state restoration

**Features**:

- **Complete State Capture**: Filters, columns (visibility, order, width, pinning), sorting, row grouping
- **URL Compression**: Uses LZ-String for 50-90% URL size reduction
- **Browser Navigation**: Full back/forward button support
- **Selective Persistence**: Choose which state elements to include
- **TypeScript Support**: Full type safety with GridState and GridStateOptions interfaces

### Usage Examples

```typescript
// Basic setup with compression
const cleanup = setupGridStatePersistence(params.api, {
  useCompression: true,
  maxUrlLength: 2000,
  onStateLoad: (state) => {
    console.log("Grid state loaded:", state);
  },
});

// Selective state persistence
const cleanup = setupGridStatePersistence(params.api, {
  includeFilters: true,
  includeColumns: true,
  includeSort: true,
  includeRowGrouping: false, // Exclude grouping
});

// Manual state management
import { captureGridState, applyGridState } from "ag-grid-react-components";

const state = captureGridState(gridApi);
localStorage.setItem("gridState", JSON.stringify(state));

// Later...
const savedState = JSON.parse(localStorage.getItem("gridState"));
applyGridState(gridApi, savedState);
```

### Compression Statistics

LZ-String compression provides significant URL length reduction:

- Simple filter state: ~54% reduction (312 → 88 chars)
- Complex grid state: ~88% reduction (2,890 → 342 chars)

The compression is most effective with repetitive data like column definitions and complex filter models.

### Migration from setupFilterStatePersistence

The original `setupFilterStatePersistence` is still available for backward compatibility, but we recommend migrating to `setupGridStatePersistence` for full state management:

```typescript
// Old (filters only)
setupFilterStatePersistence(params.api);

// New (full state with options)
setupGridStatePersistence(params.api, {
  useCompression: true,
  includeFilters: true,
  includeColumns: true,
  includeSort: true,
});
```

### URL Length Considerations

When using URL state persistence, be aware of browser limits:

- **Safe limit**: 2,000 characters (Chrome, Firefox, IE)
- **Safari**: ~80,000 characters
- **Servers**: Usually 8,192 characters default

For very large states, consider:

1. Using compression (enabled by default)
2. Selective state persistence (exclude less important state)
3. Server-side storage with short IDs in URLs
4. Local storage as a fallback

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

## DateFilter Component Enhancements

### Recent Enhancements (December 2024)

The DateFilter component has been enhanced with two major features:

1. **Open-Ended Date Ranges**: The component now supports date ranges with only a start or end date:

   - `dateFrom` with `dateTo: null` - filters all dates from the start date onwards
   - `dateFrom: null` with `dateTo` - filters all dates up to the end date
   - Works with both absolute and relative date modes

2. **Configurable Inclusivity**: Full control over whether date boundaries are inclusive or exclusive:
   - `afterInclusive` - controls whether 'after' filter uses >= (inclusive) or > (exclusive)
   - `beforeInclusive` - controls whether 'before' filter uses <= (inclusive) or < (exclusive)
   - `rangeInclusive: {from, to}` - controls inclusivity for date ranges
   - Can be set via filterParams or per filter instance in the model

### Implementation Details

- The inclusivity flags are managed in the `useFilterState` hook
- Open-ended ranges are validated to ensure at least one date is present
- The `doesFilterPass` method properly handles all combinations of open-ended ranges and inclusivity
- Test coverage increased from 54.58% to 82.27% with comprehensive integration tests

### Documentation

Full documentation is available in:

- [DateFilter API Reference](./docs/DATEFILTER_API.md) - Complete API documentation
- [README.md](./README.md#advanced-datefilter-features) - User-facing documentation with examples
- [llms.txt](./public/llms.txt) - Summarized documentation for LLMs

## ActiveFilters Component Notes

When displaying filter values in the ActiveFilters component, be aware that AG Grid date filters use these type values:

- `"after"` (not "greaterThan")
- `"before"` (not "lessThan")
- `"equals"`
- `"notEqual"`
- `"inRange"`

The component's `getFilterDisplayValue` function must handle these specific type values to correctly display filter conditions like "after Today" or "before 2024-01-01".

## important-instruction-reminders

Do what has been asked; nothing more, nothing less.
NEVER create files unless they're absolutely necessary for achieving your goal.
ALWAYS prefer editing an existing file to creating a new one.
NEVER proactively create documentation files (\*.md) or README files. Only create documentation files if explicitly requested by the User.
