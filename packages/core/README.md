# @agrc/core

Headless, composable React components for AG Grid with minimal bundle size. Build powerful data grids with date filtering, quick filters, and more - all in a tiny package.

## Features

- 🎯 **Tiny Bundle**: Core components in <20KB gzipped
- 🧩 **Composable**: Use only what you need
- 🎨 **Headless**: Bring your own styles
- 🔌 **Pluggable**: Adapters for date pickers, compression, etc.
- 📦 **Tree-Shakeable**: Zero overhead for unused features
- 🚀 **Fast**: No heavy dependencies in core

## Installation

```bash
npm install @agrc/core

# Optional adapters
npm install @agrc/adapters
```

## Quick Start

### Date Filter with Native HTML5 Input (Smallest Bundle)

```typescript
import { createDateFilter } from "@agrc/core/date-filter";

// Create filter with native date picker (adds only ~10KB)
const DateFilter = createDateFilter();

// Use in AG Grid
const columnDefs = [
  {
    field: "date",
    filter: DateFilter,
  },
];
```

### Date Filter with React DatePicker

```typescript
import { createDateFilter } from "@agrc/core/date-filter";
import { reactDatePickerAdapter } from "@agrc/adapters/react-datepicker";

// Create filter with React DatePicker (loaded on demand)
const DateFilter = createDateFilter({
  datePickerAdapter: reactDatePickerAdapter,
});
```

### Custom Styling

```typescript
const DateFilter = createDateFilter({
  className: "my-custom-filter",
  styles: {
    container: "filter-container",
    typeSelector: "filter-type-select",
    datePicker: "filter-date-input",
    actions: "filter-actions",
  },
});
```

## Components

### DateFilter

A flexible date filter supporting multiple comparison types:

- Equals / Not Equal
- Before / After
- In Range
- Blank / Not Blank

**Bundle Impact**: ~10KB with native date picker

### QuickFilterDropdown

Pre-built filter options for common date ranges:

- Today, Yesterday, This Week
- Last 7/30/90 days
- Custom ranges

**Bundle Impact**: ~8KB

### ActiveFilters

Display active filters as removable pills.

**Bundle Impact**: ~5KB

## Adapters

### Date Picker Adapters

```typescript
// Native HTML5 (included in core)
import { nativeDateAdapter } from "@agrc/core/date-filter";

// React DatePicker (separate package)
import { reactDatePickerAdapter } from "@agrc/adapters/react-datepicker";

// Custom adapter
const customAdapter = {
  Component: MyDatePicker,
  parseValue: (value) => new Date(value),
  formatValue: (date) => date.toISOString(),
};
```

### Compression Adapters

```typescript
// No compression (default)
setupGridStatePersistence(api);

// LZ-String compression (loaded on demand)
import { createLZStringAdapter } from "@agrc/adapters/compression";
setupGridStatePersistence(api, {
  compressionAdapter: createLZStringAdapter(),
});
```

## Bundle Size Comparison

| Setup              | Size  | Gzipped |
| ------------------ | ----- | ------- |
| Core only          | 20KB  | 5KB     |
| + Native date      | 30KB  | 10KB    |
| + React DatePicker | 70KB  | 25KB    |
| Everything         | 100KB | 35KB    |

Compare to v1: 329KB (66KB gzipped) for everything

## TypeScript

Full TypeScript support with comprehensive types:

```typescript
import type { DateFilterConfig, DatePickerAdapter, DateFilterModel } from "@agrc/core";
```

## Browser Support

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support (14+)
- Mobile: iOS Safari 14+, Chrome Android

## Migration from v1

See the [migration guide](https://github.com/ryanrozich/ag-grid-react-components/blob/main/MIGRATION_GUIDE_V2.md) for upgrading from v1.

## License

MIT © [Ryan Rozich](https://github.com/ryanrozich)
