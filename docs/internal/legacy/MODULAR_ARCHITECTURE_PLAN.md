# Modular Architecture Plan for AG Grid React Components

## Executive Summary

Transform the library from a monolithic 329KB bundle to a modular, composable system targeting <50KB gzipped total, with individual components under 20KB.

## Current State vs Target State

### Current State (329KB / 66KB gzipped)

```text
ag-grid-react-components
├── DateFilter (with react-datepicker) - 150KB
├── QuickFilterDropdown - 50KB
├── ActiveFilters - 30KB
└── Utils (with lz-string) - 100KB
```

### Target State (<100KB / <25KB gzipped)

```text
@ag-grid-react-components/core - 5KB
├── /date-filter - 10KB (headless)
├── /quick-filter - 8KB
├── /active-filters - 5KB
├── /utils - 3KB
└── /adapters
    ├── /react-datepicker - 2KB (adapter only)
    ├── /native-date - 1KB
    └── /compression - 1KB
```

## Phase 1: Core Abstractions (Week 1)

### 1.1 Create Headless Core

````typescript
// packages/core/src/date-filter/types.ts
export interface DatePickerAdapter {
  render: (props: DatePickerProps) => React.ReactElement;
  parseValue: (value: unknown) => Date | null;
  formatValue: (date: Date) => string;
}

export interface DateFilterConfig {
  datePickerAdapter?: DatePickerAdapter;
  enableCompression?: boolean;
  compressionAdapter?: CompressionAdapter;
}

// packages/core/src/date-filter/createDateFilter.ts
export function createDateFilter(config: DateFilterConfig = {}) {
  const { datePickerAdapter = nativeDateAdapter, enableCompression = false, compressionAdapter } = config;

  return function DateFilter(props: IFilterParams) {
    // Core logic without heavy dependencies
    // Use adapter pattern for date picker
    // Lazy load compression if enabled
  };
}
```text

### 1.2 Adapter Pattern Implementation

```typescript
// packages/adapters/react-datepicker/index.ts
let ReactDatePicker: typeof import('react-datepicker').default;

export const reactDatePickerAdapter: DatePickerAdapter = {
  async init() {
    if (!ReactDatePicker) {
      const mod = await import('react-datepicker');
      ReactDatePicker = mod.default;
    }
  },

  render: (props) => <ReactDatePicker {...props} />,
  parseValue: (value) => /* parsing logic */,
  formatValue: (date) => /* formatting logic */
};

// packages/adapters/native-date/index.ts
export const nativeDateAdapter: DatePickerAdapter = {
  render: (props) => (
    <input
      type="date"
      value={props.value}
      onChange={e => props.onChange(new Date(e.target.value))}
    />
  ),
  parseValue: (value) => new Date(value),
  formatValue: (date) => date.toISOString().split('T')[0]
};
```text

## Phase 2: Bundle Splitting (Week 2)

### 2.1 Multiple Entry Points

```typescript
// packages/core/package.json
{
  "name": "@ag-grid-react-components/core",
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "require": "./dist/index.cjs"
    },
    "./date-filter": {
      "import": "./dist/date-filter.js",
      "require": "./dist/date-filter.cjs"
    },
    "./quick-filter": {
      "import": "./dist/quick-filter.js",
      "require": "./dist/quick-filter.cjs"
    },
    "./active-filters": {
      "import": "./dist/active-filters.js",
      "require": "./dist/active-filters.cjs"
    },
    "./utils/*": {
      "import": "./dist/utils/*.js",
      "require": "./dist/utils/*.cjs"
    }
  },
  "sideEffects": false
}
```text

### 2.2 Tree-Shakeable Utils

```typescript
// Instead of:
import { setupGridStatePersistence, captureGridState } from "ag-grid-react-components";

// Allow:
import { setupGridStatePersistence } from "@ag-grid-react-components/utils/persistence";
import { captureGridState } from "@ag-grid-react-components/utils/state";
```text

## Phase 3: Compression as Optional Feature

### 3.1 Dynamic Import Pattern

```typescript
// packages/utils/src/compression.ts
export interface CompressionAdapter {
  compress: (data: string) => Promise<string>;
  decompress: (data: string) => Promise<string>;
}

export function createCompressionAdapter(): CompressionAdapter {
  let lzString: typeof import("lz-string");

  return {
    async compress(data: string) {
      if (!lzString) {
        lzString = await import("lz-string");
      }
      return lzString.compressToEncodedURIComponent(data);
    },

    async decompress(data: string) {
      if (!lzString) {
        lzString = await import("lz-string");
      }
      return lzString.decompressFromEncodedURIComponent(data);
    },
  };
}

// Usage
const gridState = await setupGridStatePersistence(api, {
  compression: createCompressionAdapter(), // Optional
});
```text

## Phase 4: CSS Strategy

### 4.1 Unstyled Core Components

```typescript
// Provide unstyled components by default
export function DateFilter({ className, ...props }) {
  return (
    <div className={className || 'ag-date-filter'}>
      {/* No built-in styles */}
    </div>
  );
}

// Option 1: CSS Modules (user imports)
import styles from '@ag-grid-react-components/core/styles/date-filter.module.css';
<DateFilter className={styles.dateFilter} />

// Option 2: Tailwind-ready
<DateFilter className="flex flex-col gap-2 p-4" />

// Option 3: Styled wrapper (separate package)
import { StyledDateFilter } from '@ag-grid-react-components/styled';
```text

## Phase 5: Migration Strategy

### 5.1 Backward Compatibility Layer

```typescript
// packages/compat/src/index.ts
// This package maintains backward compatibility
import { createDateFilter } from "@ag-grid-react-components/core";
import { reactDatePickerAdapter } from "@ag-grid-react-components/adapters/react-datepicker";

// Export pre-configured components that match v1 API
export const DateFilter = createDateFilter({
  datePickerAdapter: reactDatePickerAdapter,
});

// Maintain old import paths
export { DateFilter } from "./DateFilter";
export { QuickFilterDropdown } from "./QuickFilterDropdown";
export { ActiveFilters } from "./ActiveFilters";
export * from "./utils";
```text

### 5.2 Progressive Migration

```typescript
// Step 1: Update imports (non-breaking)
import { DateFilter } from "ag-grid-react-components"; // Still works

// Step 2: Opt into modular imports
import { createDateFilter } from "@ag-grid-react-components/core";
import { nativeDateAdapter } from "@ag-grid-react-components/adapters/native";

const DateFilter = createDateFilter({
  datePickerAdapter: nativeDateAdapter, // -40KB!
});

// Step 3: Tree-shake unused features
import { QuickFilterDropdown } from "@ag-grid-react-components/core/quick-filter";
// Don't import what you don't use
```text

## Implementation Timeline

### Week 1: Core Abstractions

- [ ] Create monorepo structure with npm workspaces
- [ ] Implement headless DateFilter core
- [ ] Create adapter interfaces
- [ ] Build native date adapter

### Week 2: Adapters & Splitting

- [ ] Create react-datepicker adapter
- [ ] Implement dynamic compression
- [ ] Set up multiple entry points
- [ ] Configure build for tree-shaking

### Week 3: Optimization

- [ ] Remove CSS from core
- [ ] Create styled wrapper package
- [ ] Optimize date-fns imports
- [ ] Add bundle size tests

### Week 4: Migration & Docs

- [ ] Create compatibility package
- [ ] Write migration guide
- [ ] Build codemod for automation
- [ ] Update all documentation

## Expected Results

| Package                 | Current | Target | Reduction |
| ----------------------- | ------- | ------ | --------- |
| Full Bundle             | 329KB   | 80KB   | 76%       |
| Core Only               | N/A     | 20KB   | N/A       |
| Core + Native           | N/A     | 25KB   | 92%       |
| Core + React DatePicker | N/A     | 70KB   | 79%       |

## Success Metrics

1. **Bundle Size**: <25KB gzipped for core + native adapter
2. **Tree Shaking**: Unused components = 0KB impact
3. **Performance**: <5ms initialization time
4. **DX**: Migration completable in <30 minutes
5. **Compatibility**: 100% backward compatible with adapter

## Code Examples

### Before (v1)

```typescript
import { DateFilter, setupGridStatePersistence } from "ag-grid-react-components";
// Imports everything: 329KB
```text

### After (v2)

```typescript
// Option 1: Minimal (25KB total)
import { createDateFilter } from "@ag-grid-react-components/core/date-filter";
const DateFilter = createDateFilter(); // Uses native date picker

// Option 2: With React DatePicker (70KB total)
import { createDateFilter } from "@ag-grid-react-components/core/date-filter";
import { reactDatePickerAdapter } from "@ag-grid-react-components/adapters/react-datepicker";
const DateFilter = createDateFilter({ datePickerAdapter: reactDatePickerAdapter });

// Option 3: Just what you need (8KB)
import { QuickFilterDropdown } from "@ag-grid-react-components/core/quick-filter";
````

## Inspiration from Best-in-Class Libraries

Following patterns from:

- **Radix UI**: Unstyled, composable primitives
- **Headless UI**: Fully accessible unstyled components
- **React Hook Form**: Minimal core with adapters
- **TanStack**: Modular architecture with framework adapters
- **Arco Design**: Progressive enhancement approach

## Next Steps

1. Set up monorepo with Turborepo or nx
2. Create RFC for community feedback
3. Build proof-of-concept for DateFilter
4. Benchmark bundle sizes at each step
5. Plan v2.0.0 release with full migration support
