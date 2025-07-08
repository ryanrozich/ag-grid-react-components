# Migration Guide: v1 to v2

## Overview

Version 2.0 introduces a modular architecture that reduces bundle size by up to 90% through optional dependencies and tree-shaking. This guide will help you migrate from v1 to v2.

## Breaking Changes

1. **Package Structure**: Components are now in separate entry points
2. **Date Picker**: react-datepicker is now optional
3. **Compression**: lz-string is now dynamically imported
4. **Styling**: Components are unstyled by default

## Migration Strategies

### Option 1: Compatibility Mode (Easiest)

Install the compatibility package that maintains v1 API:

```bash
npm install @ag-grid-react-components/compat
```

````typescript
// No code changes needed!
import { DateFilter, QuickFilterDropdown } from "@ag-grid-react-components/compat";

// Works exactly like v1
```text

### Option 2: Gradual Migration (Recommended)

Migrate component by component while keeping both versions:

```typescript
// Old import (keep working)
import { QuickFilterDropdown } from "ag-grid-react-components";

// New import (for migrated components)
import { createDateFilter } from "@ag-grid-react-components/core";
```text

### Option 3: Full Migration (Best Performance)

Update all imports to the new modular structure.

## Component Migration

### DateFilter

#### Before (v1)

```typescript
import { DateFilter } from "ag-grid-react-components";
import "ag-grid-react-components/dist/styles.css";

const columnDefs = [
  {
    field: "date",
    filter: DateFilter,
    filterParams: {
      suppressAndOrCondition: true,
    },
  },
];
```text

#### After (v2) - Option A: Native Date Picker (Smallest)

```typescript
import { createDateFilter } from "@ag-grid-react-components/core";

const DateFilter = createDateFilter(); // Uses native HTML5 date input

const columnDefs = [
  {
    field: "date",
    filter: DateFilter,
    filterParams: {
      suppressAndOrCondition: true,
    },
  },
];
```text

#### After (v2) - Option B: With React DatePicker

```typescript
import { createDateFilter } from "@ag-grid-react-components/core";
import { reactDatePickerAdapter } from "@ag-grid-react-components/adapters/react-datepicker";

const DateFilter = createDateFilter({
  datePickerAdapter: reactDatePickerAdapter,
});
```text

#### After (v2) - Option C: Custom Date Picker

```typescript
import { createDateFilter } from '@ag-grid-react-components/core';
import MyCustomDatePicker from './MyDatePicker';

const customAdapter = {
  Component: MyCustomDatePicker,
  parseValue: (value) => /* parsing logic */,
  formatValue: (date) => /* formatting logic */
};

const DateFilter = createDateFilter({
  datePickerAdapter: customAdapter
});
```text

### QuickFilterDropdown

#### Before (v1) (2)

```typescript
import { QuickFilterDropdown } from 'ag-grid-react-components';

<QuickFilterDropdown
  gridApi={gridApi}
  columnId="date"
  filters={quickFilters}
/>
```text

#### After (v2)

```typescript
import { QuickFilterDropdown } from '@ag-grid-react-components/core/quick-filter';

// Same API, just different import
<QuickFilterDropdown
  gridApi={gridApi}
  columnId="date"
  filters={quickFilters}
/>
```text

### Grid State Persistence

#### Before (v1) (3)

```typescript
import { setupGridStatePersistence } from "ag-grid-react-components";

// Always includes lz-string compression
setupGridStatePersistence(gridApi);
```text

#### After (v2) - No Compression

```typescript
import { setupGridStatePersistence } from "@ag-grid-react-components/utils/persistence";

// No compression by default (smaller bundle)
setupGridStatePersistence(gridApi);
```text

#### After (v2) - With Compression

```typescript
import { setupGridStatePersistence } from "@ag-grid-react-components/utils/persistence";
import { createLZStringAdapter } from "@ag-grid-react-components/adapters/compression";

// Compression loaded on-demand
setupGridStatePersistence(gridApi, {
  compressionAdapter: createLZStringAdapter(),
});
```text

## Styling Migration

### Before (v1) (4)

```typescript
// Styled by default
import 'ag-grid-react-components/dist/styles.css';

<DateFilter /> // Has built-in styles
```text

### After (v2) - Option A: Unstyled

```typescript
// No styles imported
<DateFilter className="my-custom-date-filter" />
```text

### After (v2) - Option B: Provided Styles

```typescript
import '@ag-grid-react-components/styles/date-filter.css';

<DateFilter /> // Styled like v1
```text

### After (v2) - Option C: Tailwind

```typescript
const DateFilter = createDateFilter({
  styles: {
    container: "flex flex-col gap-2 p-4 bg-white rounded shadow",
    typeSelector: "px-3 py-2 border border-gray-300 rounded",
    datePicker: "px-3 py-2 border border-gray-300 rounded",
    actions: "flex gap-2 mt-4",
  },
});
```text

## Automated Migration

### Using the Codemod

We provide a codemod to automate most of the migration:

```bash
npx @ag-grid-react-components/codemod v1-to-v2 ./src
```javascript

The codemod will:

- Update import statements
- Add compatibility imports where needed
- Flag areas that need manual review

### Codemod Example

```javascript
// codemod.js
module.exports = function transformer(fileInfo, api) {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);

  // Update DateFilter imports
  root
    .find(j.ImportDeclaration, {
      source: { value: "ag-grid-react-components" },
    })
    .forEach((path) => {
      const imports = path.node.specifiers;

      imports.forEach((spec) => {
        if (spec.imported.name === "DateFilter") {
          // Replace with createDateFilter
          j(path).replaceWith(j.importDeclaration([j.importSpecifier(j.identifier("createDateFilter"))], j.literal("@ag-grid-react-components/core")));

          // Add initialization after imports
          const program = root.find(j.Program);
          program.get().node.body.splice(1, 0, j.variableDeclaration("const", [j.variableDeclarator(j.identifier("DateFilter"), j.callExpression(j.identifier("createDateFilter"), []))]));
        }
      });
    });

  return root.toSource();
};
```text

## Bundle Size Comparison

### Before (v1) (5)

````

ag-grid-react-components: 329KB (66KB gzipped)
├── DateFilter: ~150KB (includes react-datepicker)
├── QuickFilterDropdown: ~50KB
├── ActiveFilters: ~30KB
└── Utils: ~100KB (includes lz-string)

```text

### After (v2) - Minimal

```

@ag-grid-react-components/core: 20KB (5KB gzipped)
├── date-filter: 10KB (using native date picker)
└── quick-filter: 8KB

```text

### After (v2) - With Optional Features

```

@ag-grid-react-components/core: 20KB

- react-datepicker adapter: +40KB (loaded on demand)
- compression adapter: +15KB (loaded on demand)
  = Total: 75KB (only when features are used)

````text

## Common Migration Patterns

### Pattern 1: Minimal Changes

```typescript
// Use compatibility package
import { DateFilter } from "@ag-grid-react-components/compat";
// No other changes needed
```text

### Pattern 2: Optimal Bundle Size

```typescript
// Import only what you need
import { createDateFilter } from "@ag-grid-react-components/core/date-filter";
import { QuickFilterDropdown } from "@ag-grid-react-components/core/quick-filter";

// Use native date picker
const DateFilter = createDateFilter();
```text

### Pattern 3: Feature Parity with v1

```typescript
// Import core and adapters
import { createDateFilter } from "@ag-grid-react-components/core";
import { reactDatePickerAdapter } from "@ag-grid-react-components/adapters/react-datepicker";
import { createLZStringAdapter } from "@ag-grid-react-components/adapters/compression";

// Configure like v1
const DateFilter = createDateFilter({
  datePickerAdapter: reactDatePickerAdapter,
});

setupGridStatePersistence(gridApi, {
  compressionAdapter: createLZStringAdapter(),
});
```text

## Troubleshooting

### TypeScript Errors

If you see TypeScript errors after migration:

```typescript
// Add type imports
import type { DateFilterConfig } from "@ag-grid-react-components/core";
```text

### Missing Styles

If components appear unstyled:

```typescript
// Option 1: Import provided styles
import "@ag-grid-react-components/styles/core.css";

// Option 2: Add your own styles
const DateFilter = createDateFilter({
  className: "my-date-filter",
});
```text

### Lazy Loading Issues

If you encounter issues with dynamic imports:

```typescript
// Ensure your bundler supports dynamic imports
// For Webpack 4, add:
output: {
  chunkFilename: "[name].[contenthash].js";
}

// For older browsers, use the sync adapter:
import { lzStringSyncAdapter } from "@ag-grid-react-components/adapters/compression/sync";
````

## Support

- **Documentation**: [https://github.com/ryanrozich/ag-grid-react-components/v2](https://github.com/ryanrozich/ag-grid-react-components/v2)
- **Examples**: [https://github.com/ryanrozich/ag-grid-react-components/examples](https://github.com/ryanrozich/ag-grid-react-components/examples)
- **Issues**: [https://github.com/ryanrozich/ag-grid-react-components/issues](https://github.com/ryanrozich/ag-grid-react-components/issues)
- **Discord**: [https://discord.gg/ag-grid-components](https://discord.gg/ag-grid-components)

## Timeline

- **v2.0.0-beta.1**: Available now for testing
- **v2.0.0**: Planned for Q2 2025
- **v1 Support**: Maintained until Q4 2025
