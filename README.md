# AG Grid React Components

A collection of powerful, reusable React components for AG Grid (v33.3.0+) that enhance your data grid with advanced filtering and state management capabilities.

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

### 🔗 URL State Serializer

Utilities for persisting AG Grid filter state in the URL:

- **Browser History Integration**: Back/forward button support
- **Shareable Links**: Share filtered views via URL
- **Automatic Sync**: Keeps URL and grid state in sync
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
import {
  QuickFilterDropdown,
  DATE_FILTER_PRESETS,
} from "ag-grid-react-components";

function MyToolbar({ api }) {
  return (
    <QuickFilterDropdown
      api={api}
      columnId="date"
      options={DATE_FILTER_PRESETS}
      placeholder="Select time period"
      onFilterChange={(option) => console.log("Filter changed:", option)}
    />
  );
}
```

### URL State Persistence

```tsx
import { setupFilterStatePersistence } from "ag-grid-react-components";

function MyGrid() {
  const onGridReady = (params) => {
    // Set up automatic URL persistence
    const cleanup = setupFilterStatePersistence(params.api);

    // Call cleanup when component unmounts
    return cleanup;
  };

  return <AgGridReact onGridReady={onGridReady} />;
}
```

## 📚 Date Expression Syntax

The Relative Date Filter supports powerful expressions:

- **Basic**: `Today`, `Now`, `Tomorrow`, `Yesterday`
- **Arithmetic**: `Today+7d`, `Now-3h`, `Today+1M-2d`
- **Period Start/End**: `StartOfMonth`, `EndOfYear`, `StartOfWeek+1w`

### Units

- `d` - days
- `w` - weeks
- `M` - months
- `y` - years
- `h` - hours
- `m` - minutes

## 🎨 Customization

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

Live demo available at: https://demo.rozich.net/ag-grid-react-components/

The demo is deployed using a custom Cloudflare Workers architecture. See:

- [Demo Router Repository](https://github.com/ryanrozich/demo-router-worker) - The centralized router that serves all demos
- [Deployment Guide](./DEMO-DEPLOYMENT-WORKER.md) - How this demo is deployed

## 📄 License

MIT

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines before submitting PRs.
