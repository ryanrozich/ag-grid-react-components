# AG Grid React Components

A collection of powerful, reusable React components for AG Grid (v33.3.0+) that enhance your data grid with advanced filtering and state management capabilities.

📖 **[Full Documentation →](./docs/)**

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

```bash
npm install ag-grid-react-components
```

## 📋 Requirements

- AG Grid Community or Enterprise v33.3.0+
- React 18 or later
- date-fns v4 or later

## 🔧 Usage

### Relative Date Filter

```tsx
import { AgGridReact } from "ag-grid-react";
import { RelativeDateFilter } from "ag-grid-react-components";
import "ag-grid-react-components/dist/style.css";

const columnDefs = [
  {
    field: "date",
    filter: RelativeDateFilter,
    floatingFilter: true,
    // The floating filter is automatically provided by AG Grid
    // using the filter's getModelAsString() method
    filterParams: {
      // Optional: customize the filter
      buttons: ["reset", "apply"],
      closeOnApply: true,
    },
  },
];
```

### Quick Filter Dropdown

```tsx
import { QuickFilterDropdown, DATE_FILTER_PRESETS } from "ag-grid-react-components";

function MyToolbar({ api }) {
  return <QuickFilterDropdown api={api} columnId="date" options={DATE_FILTER_PRESETS} placeholder="Select time period" onFilterChange={(option) => console.log("Filter changed:", option)} />;
}
```

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
```

### Active Filters Display

```tsx
import { ActiveFilters } from "ag-grid-react-components";

function MyGrid() {
  const [gridApi, setGridApi] = useState(null);
  const [filterModel, setFilterModel] = useState({});

  const onGridReady = (params) => {
    setGridApi(params.api);
  };

  const onFilterChanged = () => {
    setFilterModel(gridApi.getFilterModel());
  };

  return (
    <>
      {gridApi && Object.keys(filterModel).length > 0 && <ActiveFilters api={gridApi} filterModel={filterModel} />}
      <AgGridReact onGridReady={onGridReady} onFilterChanged={onFilterChanged} />
    </>
  );
}
```

### URL State Persistence

Comprehensive grid state persistence with URL synchronization and compression:

#### Basic Setup

```tsx
import { setupGridStatePersistence } from "ag-grid-react-components";

function MyGrid() {
  const onGridReady = (params) => {
    // Set up full grid state persistence with compression
    const cleanup = setupGridStatePersistence(params.api, {
      useCompression: true, // LZ-String compression for shorter URLs
      includeFilters: true, // Include filter state
      includeColumns: true, // Include column state (visibility, order, width)
      includeSort: true, // Include sort state
      maxUrlLength: 2000, // Warn if URL exceeds this length

      onStateLoad: (state) => {
        console.log("Grid state loaded:", state);
      },
      onStateSave: (state) => {
        console.log("Grid state saved:", state);
      },
    });

    // Call cleanup when component unmounts
    return cleanup;
  };

  return <AgGridReact onGridReady={onGridReady} />;
}
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

#### Migration from Legacy Version

```tsx
// Old (filters only)
import { setupFilterStatePersistence } from "ag-grid-react-components";
setupFilterStatePersistence(params.api);

// New (full state with options)
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
