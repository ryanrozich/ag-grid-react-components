# AG Grid React Components

🎉 **Pre-release: Modular Architecture with Minimal Bundle Size!**

A collection of powerful, tree-shakeable React components for AG Grid (v33.3.0+) that enhance your data grid with advanced filtering and state management capabilities. Start with just 25KB or add features as needed.

📖 **[Full Documentation →](./docs/)**
🚀 **[Live Demo →](https://demo.rozich.net/ag-grid-react-components/)**

## 🚀 Features

### 📅 Relative Date Filter

A custom date filter that supports both absolute dates and relative date expressions:

- **Dual Mode Support**: Switch between date picker and expression mode
- **Relative Expressions**: Use expressions like "Today+7d", "StartOfMonth-1M"
- **Comprehensive Operations**: Equals, Not Equals, After, Before, In Range
- **Real-time Validation**: Shows resolved dates for relative expressions

### 🎯 Quick Filter Dropdown

A dropdown component for applying predefined filters quickly:

- **Preset Options**: Pre-configured filter options for common scenarios
- **Customizable**: Define your own filter presets
- **Keyboard Navigation**: Full keyboard support
- **Search Functionality**: Search through options for large lists
- **Icons & Descriptions**: Rich UI with icons and descriptions

### 🔍 Active Filters Display

A component that displays active filters as removable pills:

- **Visual Feedback**: Shows filter column names and values
- **Individual Removal**: Click × to remove specific filters
- **Clear All**: Remove all filters with one click
- **Filter Types**: Handles date, text, and set filters
- **Customizable**: Style with CSS classes

### 🔗 URL State Persistence

Comprehensive grid state persistence with URL synchronization:

- **Full Grid State**: Persists filters, columns, sorting, and grouping
- **URL Compression**: Uses LZ-String for 50-90% smaller URLs
- **Browser History**: Full back/forward navigation support
- **Shareable Links**: Share complete grid configurations
- **Selective Persistence**: Choose which state to include
- **Date Serialization**: Properly handles Date objects

## 📦 Installation

Choose your installation based on your needs:

### Minimal Installation (25KB)

```bash
# Install the complete package (tree-shakeable)
npm install ag-grid-react-components
```

### With React DatePicker (65KB)

```bash
# Install with peer dependencies for date picker
npm install ag-grid-react-components react-datepicker
```

### Full Installation (85KB)

```bash
# Install with all optional dependencies
npm install ag-grid-react-components react-datepicker lz-string
```

## 📋 Requirements

- AG Grid Community or Enterprise v33.3.0+
- React 18 or later
- date-fns v4 or later

## 🔧 Usage

### Minimal Setup (25KB)

```tsx
import { AgGridReact } from "ag-grid-react";
import { createDateFilter } from "ag-grid-react-components";

// Create DateFilter with native HTML5 inputs
const DateFilter = createDateFilter();

const columnDefs = [
  {
    field: "date",
    filter: DateFilter,
    floatingFilter: true,
  },
];
```

### With React DatePicker (65KB)

```tsx
import { createDateFilter, reactDatePickerAdapter } from "ag-grid-react-components";

// Create DateFilter with React DatePicker
const DateFilter = createDateFilter({
  datePickerAdapter: reactDatePickerAdapter,
});
```

### Full Setup Example (85KB)

```tsx
import { AgGridReact } from "ag-grid-react";
import { createDateFilter, createQuickFilterDropdown, createActiveFilters, setupGridStatePersistence, reactDatePickerAdapter } from "ag-grid-react-components";

// Create all components
const DateFilter = createDateFilter({
  datePickerAdapter: reactDatePickerAdapter,
});
const QuickFilterDropdown = createQuickFilterDropdown();
const ActiveFilters = createActiveFilters();

function App() {
  const [gridApi, setGridApi] = useState(null);

  const onGridReady = (params) => {
    setGridApi(params.api);
    // Enable compressed URL state persistence
    setupGridStatePersistence(params.api, {
      compressionAdapter: createLZStringAdapter(),
      useCompression: true,
    });
  };

  return (
    <div>
      <QuickFilterDropdown
        api={gridApi}
        columnId="date"
        options={[
          { id: "today", label: "Today" },
          { id: "week", label: "This Week" },
        ]}
      />

      <AgGridReact columnDefs={columnDefs} onGridReady={onGridReady} rowData={rowData} />
    </div>
  );
}
```

## 🌟 Bundle Sizes

| Use Case                 | Bundle Size |
| ------------------------ | ----------- |
| Just DateFilter (native) | **25KB**    |
| With React DatePicker    | **65KB**    |
| All components           | **85KB**    |

## 🎯 Key Features

### Core Features (25KB minimal)

- ✅ DateFilter with native HTML5 inputs
- ✅ QuickFilterDropdown for preset filters
- ✅ ActiveFilters display component
- ✅ Tree-shakeable architecture

### Optional Features (loaded on demand)

- 📅 React DatePicker integration (+40KB when used)
- 🗜️ LZ-String URL compression (+20KB when used)
- 🎨 Pre-built styles (optional)
- 🔌 Full TypeScript support

````

#### Portal Rendering

The dropdown supports three rendering modes via the `usePortal` prop:

- **`"never"` (default)**: Uses CSS positioning. Best performance for most cases.
- **`"always"`**: Always renders using React Portal. Use when the dropdown is inside containers with `overflow: hidden`.
- **`"auto"`**: Automatically detects if portal is needed (experimental).

```tsx
// Example: Dropdown inside a scrollable container
<div style={{ overflow: "auto", height: "300px" }}>
  <QuickFilterDropdown
    api={api}
    columnId="status"
    options={statusOptions}
    usePortal="always" // Prevents clipping in scrollable container
  />
</div>
````

## 📚 API Documentation

### Date Filter

```typescript
// Factory function with options
const DateFilter = createDateFilter({
  datePickerAdapter?: DatePickerAdapter,  // Optional date picker
  className?: string,                      // Custom CSS class
  styles?: DateFilterStyles               // Custom styles object
});

// Filter parameters
filterParams: {
  buttons?: ['reset', 'apply'],
  closeOnApply?: boolean,
  defaultMode?: 'absolute' | 'relative',
  dateFormat?: string,  // date-fns format

  // Inclusivity settings
  afterInclusive?: boolean,    // >= vs >
  beforeInclusive?: boolean,   // <= vs <
  rangeInclusive?: {
    from?: boolean,
    to?: boolean
  }
}
```

### Quick Filter Dropdown

```typescript
interface QuickFilterOption {
  id: string;
  label: string;
  icon?: string;
  description?: string;
  filterModel?: Record<string, unknown>;
  onSelect?: (api: GridApi) => void;
}

const QuickFilterDropdown = createQuickFilterDropdown();

<QuickFilterDropdown
  api={gridApi}
  columnId="date"
  options={options}
  placeholder="Select filter"
  showDescriptions={true}
  usePortal="never" | "always" | "auto"
/>
```

### Grid State Persistence

```typescript
import { setupGridStatePersistence } from "ag-grid-react-components";

// With compression (enabled by default)
const cleanup = setupGridStatePersistence(gridApi, {
  useCompression: true,
  maxUrlLength: 2000,

  includeFilters: true,
  includeColumns: true,
  includeSort: true,
  includeRowGrouping: true,

  onStateLoad: (state) => console.log("Loaded:", state),
  onStateSave: (state) => console.log("Saved:", state),
});
```

#### Advanced Examples

##### Selective State Persistence

```tsx
// Only persist specific state elements
const cleanup = setupGridStatePersistence(gridApi, {
  includeFilters: true,
  includeColumns: false, // Don't persist column changes
  includeSort: true,
  includeRowGrouping: false, // Don't persist grouping
});
```

##### Manual State Management

```tsx
import { captureGridState, applyGridState } from "ag-grid-react-components";

// Capture current state
const state = captureGridState(gridApi, {
  includeFilters: true,
  includeColumns: true,
});

// Save to localStorage
localStorage.setItem("gridState", JSON.stringify(state));

// Restore from localStorage
const savedState = localStorage.getItem("gridState");
if (savedState) {
  const state = JSON.parse(savedState);
  applyGridState(gridApi, state);
}

// Send to server
const saveToServer = async () => {
  const state = captureGridState(gridApi);
  await fetch("/api/grid-state", {
    method: "POST",
    body: JSON.stringify(state),
  });
};
```

#### Compression Effectiveness

LZ-String compression provides significant URL length reduction:

| State Type            | Original    | Compressed | Reduction |
| --------------------- | ----------- | ---------- | --------- |
| Simple filters        | 312 chars   | 88 chars   | 72%       |
| Complex grid state    | 2,890 chars | 342 chars  | 88%       |
| 10 column definitions | 1,245 chars | 156 chars  | 87%       |

Example compressed URL:

```text
https://app.com/?gridState=N4IgZgpgLghgbgUwHZQKYQPYFMCeEB0IA5gMYD2AdAK4C2E...
```

#### State Persistence Options

You can choose between filter-only persistence or full grid state persistence:

```tsx
// Option 1: Filter persistence only (lightweight)
import { setupFilterStatePersistence } from "ag-grid-react-components";
setupFilterStatePersistence(params.api);

// Option 2: Full grid state persistence (recommended)
import { setupGridStatePersistence } from "ag-grid-react-components";
setupGridStatePersistence(params.api, {
  useCompression: true,
  includeFilters: true,
  includeColumns: true,
  includeSort: true,
});
```

#### Custom State Handlers

```tsx
// Example: Save to server with short ID
const setupServerStatePersistence = (gridApi) => {
  return setupGridStatePersistence(gridApi, {
    maxUrlLength: 100, // Force server storage for long states

    onStateSave: async (state) => {
      const url = new URL(window.location);

      if (JSON.stringify(state).length > 100) {
        // State too large for URL, save to server
        const response = await fetch("/api/grid-state", {
          method: "POST",
          body: JSON.stringify(state),
        });
        const { id } = await response.json();

        // Use short ID in URL
        url.searchParams.set("stateId", id);
      } else {
        // Small state, keep in URL
        url.searchParams.set("gridState", JSON.stringify(state));
      }

      window.history.replaceState({}, "", url);
    },

    onStateLoad: async (state) => {
      const url = new URL(window.location);
      const stateId = url.searchParams.get("stateId");

      if (stateId) {
        // Load from server
        const response = await fetch(`/api/grid-state/${stateId}`);
        return await response.json();
      }

      return state;
    },
  });
};
```

## 📅 Advanced DateFilter Features

### Open-Ended Date Ranges

The DateFilter now supports open-ended date ranges, allowing you to filter dates with only a start or end date:

```tsx
// Filter all dates after January 1, 2024 (no end date)
const filterModel = {
  type: "inRange",
  mode: "absolute",
  dateFrom: new Date("2024-01-01"),
  dateTo: null, // Open-ended to future
};

// Filter all dates before December 31, 2024 (no start date)
const filterModel = {
  type: "inRange",
  mode: "absolute",
  dateFrom: null, // Open-ended from past
  dateTo: new Date("2024-12-31"),
};

// With relative expressions
const filterModel = {
  type: "inRange",
  mode: "relative",
  expressionFrom: "Today-30d",
  expressionTo: null, // All dates from 30 days ago onwards
};
```

### Inclusive/Exclusive Date Filtering

Control whether date boundaries are inclusive or exclusive for precise filtering:

```tsx
const columnDefs = [
  {
    field: "date",
    filter: RelativeDateFilter,
    filterParams: {
      // Make 'after' filter inclusive (>= instead of >)
      afterInclusive: true,

      // Make 'before' filter inclusive (<= instead of <)
      beforeInclusive: true,

      // Control inclusivity for date ranges
      rangeInclusive: {
        from: true, // Include start date (>=)
        to: true, // Include end date (<=)
      },
    },
  },
];
```

You can also set inclusivity per filter instance:

```tsx
// Programmatically set filter with specific inclusivity
api.setFilterModel({
  dateColumn: {
    type: "inRange",
    mode: "absolute",
    dateFrom: new Date("2024-01-01"),
    dateTo: new Date("2024-12-31"),
    fromInclusive: true, // Include January 1st
    toInclusive: false, // Exclude December 31st
  },
});
```

#### Inclusivity Examples

- **Exclusive (default)**: `after 2024-01-01` matches dates > 2024-01-01 (2024-01-02 onwards)
- **Inclusive**: `after 2024-01-01` with `afterInclusive: true` matches dates >= 2024-01-01 (includes 2024-01-01)
- **Range exclusive**: `2024-01-01 to 2024-01-31` matches dates > 2024-01-01 and < 2024-01-31
- **Range inclusive**: `2024-01-01 to 2024-01-31` with `rangeInclusive: {from: true, to: true}` matches dates >= 2024-01-01 and <= 2024-01-31

## 📚 Date Expression Syntax

The Relative Date Filter supports powerful expressions for dynamic date filtering. See the [comprehensive Date Expressions documentation](./docs/DATE_EXPRESSIONS.md) for full details.

### Quick Reference

- **Basic**: `Today`, `StartOfWeek`, `EndOfMonth`, `StartOfYear`
- **Arithmetic**: `Today+7d`, `Today-30d`, `Today+1m`, `Today-1y`
- **Period Start/End**: `StartOfMonth`, `EndOfYear`, `StartOfWeek`, `EndOfWeek`

### Units

- `d` - days
- `w` - weeks
- `m` - months
- `y` - years

📖 [Full Documentation →](./docs/DATE_EXPRESSIONS.md)

## 🎨 Customization

See the [comprehensive Styling Guide](./docs/STYLING_GUIDE.md) for detailed customization options.

### Quick Start

The components use CSS variables for easy theming:

```css
:root {
  --agrc-primary: #2563eb;
  --agrc-border: #e5e7eb;
  --agrc-hover: #f3f4f6;
}
```

### Custom Quick Filter Options

```tsx
const customOptions = [
  {
    id: "all",
    label: "All Items",
    filterModel: null, // Clears filter
  },
  {
    id: "recent",
    label: "Last 7 Days",
    filterModel: {
      mode: "relative",
      type: "inRange",
      expressionFrom: "Today-7d",
      expressionTo: "Today",
    },
  },
];
```

### Styling

The components use CSS modules and can be customized via CSS variables:

```css
:root {
  --agrc-primary: #2563eb;
  --agrc-border: #e5e7eb;
  --agrc-hover: #f3f4f6;
}
```

## 🧪 Testing

Components are thoroughly tested with:

- Unit tests (Vitest + React Testing Library)
- Integration tests with AG Grid
- E2E tests (Playwright)

## ⚠️ Known Issues

### AG Grid v33 setFilterModel Bug

When calling `api.setFilterModel()` programmatically on custom React filter components in AG Grid v33, the filter doesn't properly initialize. This is a known AG Grid bug affecting all v33.x versions.

**Related Issues:**

- [ag-grid/ag-grid#2256](https://github.com/ag-grid/ag-grid/issues/2256)
- [ag-grid/ag-grid#2709](https://github.com/ag-grid/ag-grid/issues/2709)
- [ag-grid/ag-grid#4870](https://github.com/ag-grid/ag-grid/issues/4870)

**Workaround:**

Use the provided `applyFilterModelWithWorkaround` function:

```tsx
import { applyFilterModelWithWorkaround } from "ag-grid-react-components";

// Instead of:
api.setFilterModel({ dateColumn: filterModel });

// Use:
await applyFilterModelWithWorkaround(api, "dateColumn", filterModel);
```

This workaround handles AG Grid v33's Promise-based filter instances and ensures the filter state is properly initialized. It should be removed once AG Grid fixes the underlying issue.

## 🚀 Demo

Live demo available at: <https://demo.rozich.net/ag-grid-react-components/>

The demo is deployed using a custom Cloudflare Workers architecture. See:

- [Demo Router Repository](https://github.com/ryanrozich/demo-router-worker) - The centralized router that serves all demos
- [Deployment Guide](./DEMO-DEPLOYMENT-WORKER.md) - How this demo is deployed

## 📄 License

MIT

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines before submitting PRs.

### 📋 Issues & Project Management

- **[Open Issues](https://github.com/ryanrozich/ag-grid-react-components/issues)** - Report bugs or request features
- **[Project Board](https://github.com/users/ryanrozich/projects/1)** - Track progress and priorities
- **[Automation Guide](./docs/github-project-automation.md)** - How our label/project sync works

When creating issues, our automation will sync labels to project fields for better organization.

### For AI Agents & Automation

- **[GitHub Project Automation](./docs/github-project-automation.md)** - How issue labels sync to project fields
- **[CLAUDE.md](./CLAUDE.md)** - Instructions for AI assistants working with this codebase
