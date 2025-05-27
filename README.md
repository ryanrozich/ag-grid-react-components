# AG Grid Relative Date Filter

A powerful custom date filter component for AG Grid (v33.3.0+) that supports both absolute dates and relative date expressions. Works with both Community and Enterprise editions of AG Grid.

## Features

- 🗓️ **Dual Mode Support**:

  - **Absolute Mode**: Select dates using a standard date picker
  - **Relative Mode**: Enter expressions like "Today+7d" or "Today-3m"

- 🔍 **Comprehensive Filter Operations**:

  - Equals
  - Not Equals
  - After (> or ≥ with configurable inclusivity)
  - Before (< or ≤ with configurable inclusivity)
  - In Range (with configurable inclusive/exclusive bounds)

- 📊 **AG Grid Integration**:

  - Compatible with AG Grid v33.3.0+ (Community and Enterprise)
  - Supports floating filters
  - Full filter model serialization
  - Enterprise features automatically enabled when available

- 📱 **UI Features**:
  - Clean, responsive design with Tailwind CSS
  - Real-time validation of expressions
  - Shows resolved dates for relative expressions
  - Easy mode toggling

## Installation

```bash
npm install ag-grid-relative-date-filter
```

## Requirements

- AG Grid Community or Enterprise v33.3.0+
- React 18 or later
- date-fns v4 or later

Enterprise features (like Filter Tool Panel) will be automatically enabled if AG Grid Enterprise is available, but are not required.

## Usage

```tsx
import { AgGridReact } from "ag-grid-react";

// Import and register community modules
import {
  ModuleRegistry,
  ClientSideRowModelModule,
  MenuModule,
  themeAlpine,
} from "ag-grid-community";

// Register required community modules
const modules = [ClientSideRowModelModule, MenuModule];

// Optional: Conditionally use Enterprise modules if available
let enterpriseModules = [];
try {
  // This will fail silently if ag-grid-enterprise is not installed
  const agGridEnterprise = require("ag-grid-enterprise");
  if (agGridEnterprise) {
    const { SetFilterModule, FiltersToolPanelModule } = agGridEnterprise;

    enterpriseModules = [SetFilterModule, FiltersToolPanelModule];
    console.log("AG Grid Enterprise features enabled");
  }
} catch (e) {
  // Enterprise is not available - that's fine
}

// Register all available modules
ModuleRegistry.registerModules([...modules, ...enterpriseModules]);

// Import the filter components
import {
  RelativeDateFilter,
  RelativeDateFloatingFilter,
} from "ag-grid-relative-date-filter";
import "ag-grid-relative-date-filter/dist/style.css";

// Define your column definitions
const columnDefs = [
  // ...other columns
  {
    field: "date",
    headerName: "Date",
    filter: RelativeDateFilter,
    floatingFilter: true,
    floatingFilterComponent: RelativeDateFloatingFilter,
    // Optional filter params
    filterParams: {
      defaultMode: "absolute",
      dateFormat: "yyyy-MM-dd",
    },
  },
];

// In your component
return (
  <div style={{ height: 500, width: "100%" }}>
    <AgGridReact
      rowData={rowData}
      columnDefs={columnDefs}
      // Optional: Display the filters panel if Enterprise is available
      sideBar={
        enterpriseModules.length > 0
          ? {
              toolPanels: [
                {
                  id: "filters",
                  labelDefault: "Filters",
                  labelKey: "filters",
                  iconKey: "filter",
                  toolPanel: "agFiltersToolPanel",
                },
              ],
            }
          : undefined
      }
      // Other props
      defaultColDef={{
        sortable: true,
        filter: true,
        floatingFilter: true,
      }}
    />
  </div>
);
```

## Relative Date Expression Format

The filter supports the following relative date expression formats:

- `Today` - Current date at midnight
- `Today+Nd` - N days after today
- `Today-Nd` - N days before today

Where:

- `d` = days
- `w` = weeks
- `m` = months
- `y` = years

Examples:

- `Today+7d` - 7 days from today
- `Today-2w` - 2 weeks ago
- `Today+1m` - 1 month from today
- `Today-1y` - 1 year ago

## Advanced Configuration

The filter component accepts the following configuration options:

```tsx
{
  // Date parsing function for custom date formats
  dateParser: (value: any) => Date | null,

  // Default filter mode
  defaultMode: 'absolute' | 'relative',

  // Custom date format for display (date-fns format)
  dateFormat: 'yyyy-MM-dd',

  // Min/max date constraints for date picker
  minDate: new Date(),
  maxDate: new Date(),

  // Configure whether 'before' filters are inclusive (<=) or exclusive (<)
  // Defaults to false (exclusive)
  beforeInclusive: false,

  // Configure whether 'after' filters are inclusive (>=) or exclusive (>)
  // Defaults to false (exclusive)
  afterInclusive: false,

  // Configure whether 'inRange' bounds are inclusive or exclusive
  rangeInclusive: {
    // Whether start date is inclusive (>=) or exclusive (>)
    from: false,
    // Whether end date is inclusive (<=) or exclusive (<)
    to: false
  }
}
```

## Inclusive/Exclusive Filter Boundaries

The date filter supports configurable inclusive or exclusive boundaries for date comparisons:

### Basic Filters (Before/After)

You can configure whether "Before" and "After" filters are inclusive or exclusive:

```tsx
// Column definition with inclusive boundaries
{
  field: 'date',
  headerName: 'Date',
  filter: RelativeDateFilter,
  floatingFilter: true,
  floatingFilterComponent: RelativeDateFloatingFilter,
  filterParams: {
    // Makes "Before" filters use <= instead of <
    beforeInclusive: true,

    // Makes "After" filters use >= instead of >
    afterInclusive: true
  }
}
```

### Range Filters

For range filters, you can configure inclusivity for both the start and end of the range:

```tsx
// Column definition with inclusive range bounds
{
  field: 'date',
  headerName: 'Date',
  filter: RelativeDateFilter,
  floatingFilter: true,
  floatingFilterComponent: RelativeDateFloatingFilter,
  filterParams: {
    rangeInclusive: {
      // Makes the start of the range inclusive [from, to)
      from: true,

      // Makes the end of the range inclusive (from, to]
      to: true

      // With both true, the range is fully inclusive [from, to]
    }
  }
}
```

### Visual Indicators

The filter UI automatically displays the appropriate comparison operators based on inclusivity settings:

- **Exclusive Before**: `< 2023-05-16`
- **Inclusive Before**: `≤ 2023-05-16`
- **Exclusive After**: `> 2023-05-16`
- **Inclusive After**: `≥ 2023-05-16`
- **Range with various inclusivity**: `[2023-05-01 to 2023-05-16)` (inclusive start, exclusive end)

## Filter State Inspection and Bookmarking

The filter model is fully serializable, allowing for bookmarking, URL sharing, and browser history integration.

### Filter Model Structure

The filter model structure preserves all aspects of your filter configuration:

```typescript
// Example of a serialized absolute date filter
{
  "date": {                                   // Column field name
    "type": "before",                         // Filter type: equals, notEqual, before, after, inRange
    "mode": "absolute",                       // Mode: absolute or relative
    "dateFrom": "2023-05-16T00:00:00.000Z",   // ISO string (for absolute dates)
    "dateTo": null,                           // Second date for range filters
    "fromInclusive": true,                    // Whether start is inclusive (>=)
    "toInclusive": false                      // Whether end is inclusive (<=)
  }
}

// Example of a serialized relative date filter
{
  "date": {
    "type": "inRange",                        // Filter type: inRange
    "mode": "relative",                       // Mode: relative
    "expressionFrom": "Today-7d",             // Start date expression
    "expressionTo": "Today",                  // End date expression
    "dateFrom": "2023-05-09T00:00:00.000Z",   // Resolved start date (for filtering)
    "dateTo": "2023-05-16T00:00:00.000Z",     // Resolved end date (for filtering)
    "fromInclusive": true,                    // Whether start is inclusive
    "toInclusive": true                       // Whether end is inclusive
  }
}
```

### Basic URL Bookmarking

Store the filter state in the URL for bookmarking:

```tsx
// Get the current filter model
const filterModel = gridApi.getFilterModel();
const filterJson = JSON.stringify(filterModel);

// Store in URL
const url = new URL(window.location.href);
url.searchParams.set("filter", filterJson);
window.history.pushState({}, "", url.toString());

// Later, to restore the filter state:
const url = new URL(window.location.href);
const filterJson = url.searchParams.get("filter");
if (filterJson) {
  const filterModel = JSON.parse(filterJson);
  gridApi.setFilterModel(filterModel);
}
```

### Browser History Integration

For a complete history integration with back button support, the package provides convenient utility functions:

```tsx
import { useEffect, useRef } from "react";
import { setupFilterStatePersistence } from "ag-grid-relative-date-filter";

function DataGrid() {
  // AG Grid API reference
  const gridApiRef = useRef(null);
  const cleanupRef = useRef<(() => void) | null>(null);

  // Setup filter state persistence when grid is ready
  const onGridReady = (params) => {
    gridApiRef.current = params.api;

    // Set up complete filter state persistence with one line
    cleanupRef.current = setupFilterStatePersistence(params.api, {
      paramName: "filter", // URL parameter name
      onFilterLoad: (model) => {
        console.log("Filter loaded:", model);
        // You could update other UI state here
      },
      onFilterSave: (model) => {
        console.log("Filter saved:", model);
        // You could sync with other components here
      },
    });
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (cleanupRef.current) {
        cleanupRef.current();
      }
    };
  }, []);

  return (
    <AgGridReact
      onGridReady={onGridReady}
      // other props
    />
  );
}
```

### Filter State Utilities

The package exports several utility functions for working with filter state:

```tsx
import {
  // Serialize the filter model (handles Date objects)
  serializeFilterModel,

  // Deserialize a filter model (converts strings back to Date objects)
  deserializeFilterModel,

  // Save current filter to URL and browser history
  saveFilterToHistory,

  // Load filter state from URL parameters
  loadFilterFromUrl,

  // Set up complete filter state persistence
  setupFilterStatePersistence,
} from "ag-grid-relative-date-filter";

// Manual usage example
function saveCurrentFilter(gridApi) {
  // Serialize and save the filter model to browser history
  saveFilterToHistory(gridApi, {
    paramName: "filter", // URL parameter name
    addToHistory: true, // Add as a new history entry vs. replacing current
  });
}

function loadSavedFilter(gridApi) {
  // Load filter from URL parameters
  loadFilterFromUrl(gridApi, {
    paramName: "filter", // URL parameter name to load from
  });
}
```

## Utilities

The package also exports utility functions for working with date expressions:

```tsx
import {
  parseDateExpression,
  isValidDateExpression,
  resolveDateExpression,
} from "ag-grid-relative-date-filter";

// Parse an expression
const result = parseDateExpression("Today+7d");
// { isValid: true, resolvedDate: Date }

// Check if expression is valid
const isValid = isValidDateExpression("Today+7d");
// true

// Resolve an expression to a Date
const date = resolveDateExpression("Today+7d");
// Date object
```

## License

MIT

## Server-Side Row Model Compatibility

This filter component is fully compatible with AG Grid's Server-Side Row Model. When using with the Server-Side Row Model:

1. The filter model has the same structure as with Client-Side Row Model:

```json
{
  "date": {
    "type": "inRange",
    "dateFrom": "2023-05-09T00:00:00.000Z",
    "dateTo": "2023-05-16T00:00:00.000Z",
    "fromInclusive": true,
    "toInclusive": true
  }
}
```

2. You'll need to implement the server-side logic to interpret the filter model and apply the filter according to your database/API requirements. The filter model's inclusive/exclusive properties give you full control over how the date boundaries should be applied.

3. For relative date expressions, the filter preserves both the expression and the resolved date value, allowing your server code to either:
   - Use the resolved date directly (simpler approach)
   - Re-evaluate the expression on the server (for time-shifted expressions like "Today")

Sample server-side filter handling (assuming SQL):

```javascript
function buildSqlFilter(filterModel) {
  const dateFilter = filterModel.date;
  if (!dateFilter) return "";

  const { type, dateFrom, dateTo, fromInclusive, toInclusive } = dateFilter;

  switch (type) {
    case "equals":
      return `date_column = '${formatDate(dateFrom)}'`;
    case "notEqual":
      return `date_column != '${formatDate(dateFrom)}'`;
    case "before":
      return `date_column ${toInclusive ? "<=" : "<"} '${formatDate(dateFrom)}'`;
    case "after":
      return `date_column ${fromInclusive ? ">=" : ">"} '${formatDate(dateFrom)}'`;
    case "inRange":
      return `date_column ${fromInclusive ? ">=" : ">"} '${formatDate(dateFrom)}' AND
              date_column ${toInclusive ? "<=" : "<"} '${formatDate(dateTo)}'`;
    default:
      return "";
  }
}
```

## Community vs Enterprise Edition

This filter component is designed to work seamlessly with both Community and Enterprise editions of AG Grid.

### Community Edition Features

- All core filter functionality works in Community Edition
- Supports floating filters
- All filter operators (equals, not equals, before/after with inclusive/exclusive options)
- Absolute and relative date modes
- Filter model serialization
- Comprehensive browser history integration

## Testing

This project includes a comprehensive test suite to ensure the reliability and correctness of the AG Grid Date Filter component. The testing strategy includes unit tests, integration tests, and end-to-end (E2E) tests.

### Test Structure

- **Unit Tests**: Test individual functions and components in isolation
- **Integration Tests**: Test the interaction between components and AG Grid
- **E2E Tests**: Test the complete application flow using Playwright

### Running Tests

#### Run All Tests

```bash
npm test
```

#### Run Unit Tests Only

```bash
npm run test:unit
```

#### Run E2E Tests

```bash
# Run headless tests
npm run test:e2e

# Run tests in headed mode
npm run test:e2e:headed

# Run tests with UI (for debugging)
npm run test:e2e:ui
```

#### Test Coverage

To generate a test coverage report:

```bash
npm run test:coverage
```

This will generate coverage reports in multiple formats in the `coverage` directory.

### Test Data

The test suite uses deterministic test data to ensure consistent test results. The test data includes a variety of date scenarios to thoroughly test the date filter functionality.

### Test Utilities

The `test-utils` directory contains utility functions to help with testing AG Grid components:

- `AGGridTestHarness`: A React component that wraps AG Grid for testing
- `agGridTestUtils.ts`: Utility functions for interacting with AG Grid in tests

### Writing Tests

When writing new tests, follow these guidelines:

1. **Unit Tests**: Test individual functions with various inputs and edge cases
2. **Integration Tests**: Test component interactions and state management
3. **E2E Tests**: Test user interactions and application flow

### Debugging Tests

To debug tests, you can use the following approaches:

1. **Debug Logs**: Add `console.log` statements in your test files
2. **Playwright Inspector**: Use `npx playwright test --debug` to step through tests
3. **VS Code Debugger**: Use the built-in debugger with the provided launch configurations

### Additional Enterprise Edition Features

When AG Grid Enterprise is available, these features are automatically enabled:

- Filters Tool Panel for managing multiple filters
- Set Filter capabilities
- Multi-filter capabilities
- Advanced column management
- Row grouping and aggregation with the filter

## Development

To run the project in development mode with the Enterprise edition:

```bash
npm install
npm run dev
```

To run the project with only Community edition features:

```bash
# Remove or rename node_modules/ag-grid-enterprise temporarily
mv node_modules/ag-grid-enterprise node_modules/ag-grid-enterprise-disabled
npm run dev
# Restore when done
mv node_modules/ag-grid-enterprise-disabled node_modules/ag-grid-enterprise
```

To build the package for production:

```bash
npm run build
```

To run tests:

```bash
npm test
```

### Recent Fixes

The following issues have been fixed in the latest update:

1. **AG Grid Enterprise Dependency**: Fixed ESM import syntax in main.tsx to properly load AG Grid Enterprise modules
2. **Custom Filter Visibility**: Updated grid configuration to ensure the custom filter appears when clicking the filter icon
3. **Filter Click Testing**: Enhanced filter click test to properly locate and test custom filter elements
4. **TypeScript in ESM Context**: Added support for running .tsx files directly in Node.js ESM context with custom loader

### Additional Testing Scripts

- `npm run test:filter-click`: Test clicking on filter icons to verify custom filter appears
- `npm run run-tsx`: Helper script to run TypeScript files directly in Node.js

### Running TypeScript Files Directly

For development, you can now run TypeScript files directly:

```bash
# Run a .tsx file directly
npm run run-tsx src/demo/some-test.tsx

# Or use the script with arguments
node scripts/run-tsx.js src/some-file.tsx arg1 arg2
```
