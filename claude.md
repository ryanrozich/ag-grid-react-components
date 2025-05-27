# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development

```bash
# Start development server
npm run dev

# Build the library
npm run build

# Preview the built package
npm run preview
```

### Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Browser test to validate demo
npm run test:browser

# Test clicking on filter icons
npm run test:filter-click

# Run directly a TypeScript file
npm run run-tsx src/path/to/file.tsx
```

### Linting

```bash
# Run linter
npm run lint
```

## Architecture

This repository contains a custom date filter component for AG Grid that supports both absolute dates and relative date expressions. The codebase is structured around the following key components:

### Components

1. **RelativeDateFilter.tsx**: The main filter component that implements AG Grid's IFilter interface. It provides two date filtering modes:

   - Absolute Mode: Select specific dates via a date picker
   - Relative Mode: Enter expressions like "Today+7d" or "Today-3m"

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

## Common Development Tasks

When implementing or modifying features:

1. Start by updating tests to reflect the new behavior (TDD approach)
2. Update the component implementation
3. Test both the component in isolation and its integration with AG Grid
4. For any new filter capabilities, update both the main filter and floating filter
5. Ensure backward compatibility with existing filter models

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
