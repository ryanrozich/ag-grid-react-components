# AG Grid React Components v2

Headless, composable React components for AG Grid with minimal bundle size. Build powerful data grids with date filtering, quick filters, and more - all in a tiny, modular package.

## 🎯 Why v2?

Version 2 is a complete rewrite focused on:

- **95% smaller bundle** - Core components in <20KB vs 329KB in v1
- **Modular architecture** - Use only what you need
- **Headless components** - Bring your own styles
- **Zero dependencies** in core (date pickers, compression are optional)
- **Tree-shakeable** - Dead code elimination works perfectly

## 📦 Packages

| Package          | Description                    | Size (gzipped) |
| ---------------- | ------------------------------ | -------------- |
| `@agrc/core`     | Headless components (required) | 5KB            |
| `@agrc/adapters` | Date pickers, compression      | 2KB            |
| `@agrc/styles`   | Optional CSS styles            | 3KB            |
| `@agrc/compat`   | v1 compatibility layer         | 5KB            |

## 🚀 Quick Start

### Installation

```bash
# Minimal install (native date picker)
npm install @agrc/core

# With React DatePicker
npm install @agrc/core @agrc/adapters react-datepicker

# With styles
npm install @agrc/core @agrc/styles

# Easy migration from v1
npm install @agrc/compat
```

### Basic Usage

```typescript
import { createDateFilter } from "@agrc/core";

// Smallest bundle - uses native HTML5 date input
const DateFilter = createDateFilter();

// Use in AG Grid
const columnDefs = [
  {
    field: "dueDate",
    filter: DateFilter,
  },
];
```

### With React DatePicker

```typescript
import { createDateFilter } from "@agrc/core";
import { reactDatePickerAdapter } from "@agrc/adapters/react-datepicker";

const DateFilter = createDateFilter({
  datePickerAdapter: reactDatePickerAdapter,
});
```

### Custom Styling

```typescript
// Option 1: CSS classes
import "@agrc/styles/core.css";

// Option 2: Inline styles
const DateFilter = createDateFilter({
  styles: {
    container: "p-4 bg-white rounded shadow",
    typeSelector: "w-full px-3 py-2 border rounded",
    datePicker: "w-full px-3 py-2 border rounded",
    actions: "flex gap-2 mt-4",
  },
});

// Option 3: CSS-in-JS
const DateFilter = createDateFilter({
  className: css`
    display: flex;
    flex-direction: column;
    gap: 8px;
  `,
});
```

## 📚 Components

### DateFilter

Flexible date filtering with multiple comparison types.

```typescript
import { createDateFilter } from '@agrc/core';

// With all options
const DateFilter = createDateFilter({
  datePickerAdapter: myAdapter,     // Custom date picker
  enableRelativeDates: true,        // Support "today", "yesterday", etc
  className: 'my-date-filter',      // Custom class
  styles: { ... }                   // Style overrides
});
```

**Features:**

- Equals, Not Equal, Before, After, In Range
- Blank/Not Blank
- Open-ended ranges
- Configurable inclusivity
- Relative date expressions (optional)

### QuickFilterDropdown

Pre-built filter shortcuts for common scenarios.

```typescript
import { QuickFilterDropdown } from '@agrc/core';

const quickFilters = [
  { label: 'Today', filterModel: { /* ... */ } },
  { label: 'This Week', filterModel: { /* ... */ } },
  {
    label: 'Status',
    filters: [
      { label: 'Active', filterModel: { /* ... */ } },
      { label: 'Completed', filterModel: { /* ... */ } }
    ]
  }
];

<QuickFilterDropdown
  gridApi={gridApi}
  columnId="date"
  filters={quickFilters}
/>
```

### ActiveFilters

Display and manage active filters as removable pills.

```typescript
import { ActiveFilters } from '@agrc/core';

<ActiveFilters
  api={gridApi}
  showClearAll={true}
  formatFilterValue={(column, model) => {
    // Custom formatting
    return `${column.getColDef().headerName}: ${model.filter}`;
  }}
/>
```

### Grid State Persistence

Save and restore complete grid state in URLs.

```typescript
import { setupGridStatePersistence } from "@agrc/core";

// Basic - no compression
const cleanup = setupGridStatePersistence(gridApi);

// With compression (dynamic import)
import { createLZStringAdapter } from "@agrc/adapters/compression";

setupGridStatePersistence(gridApi, {
  compressionAdapter: createLZStringAdapter(),
  includeFilters: true,
  includeColumns: true,
  includeSort: true,
});
```

## 🔄 Migration from v1

### Option 1: Zero Code Changes

```bash
npm install @agrc/compat
```

```typescript
// Your existing code works unchanged!
import { DateFilter, QuickFilterDropdown } from "@agrc/compat";
```

### Option 2: Gradual Migration

```typescript
// Old (v1)
import { DateFilter } from "ag-grid-react-components";

// New (v2) - 90% smaller!
import { createDateFilter } from "@agrc/core";
const DateFilter = createDateFilter();
```

### Option 3: Full Optimization

```typescript
// Only import what you need
import { createDateFilter } from "@agrc/core/date-filter";
import { QuickFilterDropdown } from "@agrc/core/quick-filter";

// Use native date picker (smallest)
const DateFilter = createDateFilter();

// Or bring your own
const DateFilter = createDateFilter({
  datePickerAdapter: myCustomAdapter,
});
```

## 📊 Bundle Size Comparison

| Setup                         | v1 Size | v2 Size | Reduction |
| ----------------------------- | ------- | ------- | --------- |
| Just DateFilter (native)      | 329KB   | 25KB    | **92%**   |
| Just QuickFilter              | 329KB   | 15KB    | **95%**   |
| Everything (native dates)     | 329KB   | 45KB    | **86%**   |
| Everything (React DatePicker) | 329KB   | 85KB    | **74%**   |

## 🎨 Styling Options

### 1. Unstyled (Default)

Components come with minimal structure, no visual styles.

```typescript
const DateFilter = createDateFilter(); // BYO styles
```

### 2. Provided Styles

```css
/* Individual components */
@import "@agrc/styles/date-filter.css";
@import "@agrc/styles/quick-filter.css";
@import "@agrc/styles/active-filters.css";

/* Or everything */
@import "@agrc/styles/core.css";
```

### 3. Tailwind Ready

```typescript
const DateFilter = createDateFilter({
  styles: {
    container: "flex flex-col space-y-2 p-4",
    typeSelector: "select select-bordered w-full",
    datePicker: "input input-bordered w-full",
    actions: "flex gap-2",
  },
});
```

## 🔌 Adapters

### Date Picker Adapters

```typescript
// Native HTML5 (built-in)
import { nativeDateAdapter } from "@agrc/core";

// React DatePicker
import { reactDatePickerAdapter } from "@agrc/adapters/react-datepicker";

// Custom adapter
const customAdapter = {
  Component: MyDatePicker,
  parseValue: (val) => new Date(val),
  formatValue: (date) => date.toISOString(),
};
```

### Compression Adapters

```typescript
// No compression (default)
setupGridStatePersistence(api);

// LZ-String (95% compression)
import { createLZStringAdapter } from "@agrc/adapters/compression";
setupGridStatePersistence(api, {
  compressionAdapter: createLZStringAdapter(),
});

// Base64 (built-in browser)
import { base64CompressionAdapter } from "@agrc/adapters/compression";
setupGridStatePersistence(api, {
  compressionAdapter: base64CompressionAdapter,
});
```

## 🛠️ Advanced Usage

### Custom Date Picker

```typescript
const myAdapter = {
  Component: ({ value, onChange, className }) => (
    <MyCustomDatePicker
      date={value}
      onDateChange={onChange}
      className={className}
    />
  ),
  parseValue: (val) => /* parsing logic */,
  formatValue: (date) => /* formatting logic */
};

const DateFilter = createDateFilter({
  datePickerAdapter: myAdapter
});
```

### Server-Side Persistence

```typescript
setupGridStatePersistence(api, {
  compressionAdapter: {
    compress: async (data) => {
      const res = await fetch("/api/compress", {
        method: "POST",
        body: data,
      });
      return res.text(); // Return short ID
    },
    decompress: async (id) => {
      const res = await fetch(`/api/state/${id}`);
      return res.text();
    },
  },
});
```

## 📄 License

MIT © [Ryan Rozich](https://github.com/ryanrozich)

## 🤝 Contributing

Contributions welcome! Please read our [contributing guide](CONTRIBUTING.md).

## 🙏 Acknowledgments

- AG Grid team for the excellent data grid
- Radix UI for headless component inspiration
- The React community

---

<p align="center">
  <a href="https://www.npmjs.com/package/@agrc/core">
    <img src="https://img.shields.io/npm/v/@agrc/core.svg" alt="npm version">
  </a>
  <a href="https://bundlephobia.com/package/@agrc/core">
    <img src="https://img.shields.io/bundlephobia/minzip/@agrc/core" alt="bundle size">
  </a>
  <a href="https://github.com/ryanrozich/ag-grid-react-components/blob/main/LICENSE">
    <img src="https://img.shields.io/npm/l/@agrc/core.svg" alt="license">
  </a>
</p>
