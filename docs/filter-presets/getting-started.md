# Filter Presets Guide

Filter presets provide a powerful way to save, share, and reuse filter configurations in your AG Grid applications. This guide will help you understand the core concepts and get started quickly.

## Quick Start

### Installing and Basic Setup

The filter preset functionality is built into the `ag-grid-react-components` package:

````bash
npm install ag-grid-react-components
```text

### Your First Preset

Here's how to enable filter presets with the QuickFilterDropdown component:

```typescript
import { QuickFilterDropdown } from 'ag-grid-react-components';

function MyGrid() {
  const [columnDefs] = useState([
    { field: 'date', filter: 'agDateColumnFilter' },
    { field: 'status', filter: 'agTextColumnFilter' },
    { field: 'amount', filter: 'agNumberColumnFilter' }
  ]);

  return (
    <div>
      <QuickFilterDropdown
        columns={columnDefs}
        enablePresets={{
          systemPresets: [
            {
              id: 'recent',
              name: 'Recent Activity',
              gridState: {
                filterModel: {
                  date: {
                    type: 'after',
                    mode: 'relative',
                    expressionFrom: 'Today-7d'
                  }
                }
              }
            },
            {
              id: 'high-value',
              name: 'High Value',
              gridState: {
                filterModel: {
                  amount: {
                    type: 'greaterThan',
                    filter: 1000
                  }
                }
              }
            }
          ]
        }}
        onFilterApplied={(filter) => {
          // Apply filter to your grid
          gridApi.setFilterModel(filter.filterModel);
        }}
      />
      {/* Your AG Grid component */}
    </div>
  );
}
```text

### Common Use Cases

#### 1. Date Range Presets

```typescript
const datePresets = [
  {
    id: "today",
    name: "Today",
    gridState: {
      filterModel: {
        date: { type: "equals", mode: "relative", expressionFrom: "Today" },
      },
    },
  },
  {
    id: "this-week",
    name: "This Week",
    gridState: {
      filterModel: {
        date: {
          type: "inRange",
          mode: "relative",
          expressionFrom: "StartOfWeek",
          expressionTo: "EndOfWeek",
        },
      },
    },
  },
  {
    id: "last-30-days",
    name: "Last 30 Days",
    gridState: {
      filterModel: {
        date: { type: "after", mode: "relative", expressionFrom: "Today-30d" },
      },
    },
  },
];
```text

#### 2. Status-Based Presets

```typescript
const statusPresets = [
  {
    id: "active",
    name: "Active Only",
    gridState: {
      filterModel: {
        status: { type: "equals", filter: "active" },
      },
    },
  },
  {
    id: "pending",
    name: "Pending Review",
    gridState: {
      filterModel: {
        status: { type: "equals", filter: "pending" },
        assignedTo: { type: "blank" },
      },
    },
  },
];
```text

#### 3. Complex Multi-Column Presets

```typescript
const complexPresets = [
  {
    id: "priority-tasks",
    name: "Priority Tasks",
    gridState: {
      filterModel: {
        priority: { type: "equals", filter: "high" },
        dueDate: {
          type: "before",
          mode: "relative",
          expressionFrom: "Today+7d",
        },
        status: { type: "notEqual", filter: "completed" },
      },
      sortModel: [{ colId: "dueDate", sort: "asc" }],
    },
  },
];
```text

## Core Concepts

### System vs User Presets

Filter presets come in two types:

1. **System Presets**: Predefined by developers, available to all users

   - Cannot be modified or deleted by users
   - Provide consistent filtering options across the application
   - Ideal for common use cases

2. **User Presets**: Created and managed by individual users
   - Stored in browser localStorage
   - Can be created, updated, and deleted
   - Personal to each user

### Default Preset Behavior

You can specify a default preset that loads automatically:

```typescript
<QuickFilterDropdown
  columns={columnDefs}
  enablePresets={{
    defaultPresetId: 'active', // Loads this preset by default
    systemPresets: presets
  }}
/>
```text

### Storage Limitations

User presets are stored in browser localStorage, which has limitations:

- **Storage Quota**: Typically 5-10MB per origin
- **Browser Support**: Works in all modern browsers
- **Privacy Mode**: Limited or no storage in private/incognito mode
- **Cross-Device**: Presets don't sync across devices

### Browser Compatibility

Filter presets work in all modern browsers:

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

For older browsers, the preset functionality gracefully degrades to basic filtering.

## Integration Guide

### With QuickFilterDropdown

The QuickFilterDropdown component has built-in preset support:

```typescript
<QuickFilterDropdown
  columns={columnDefs}
  enablePresets={{
    // Allow users to save their own presets
    allowUserPresets: true,

    // Maximum user presets (default: 10)
    maxUserPresets: 20,

    // System presets
    systemPresets: [...],

    // Default preset
    defaultPresetId: 'recent'
  }}
  onPresetSaved={(preset) => {
    console.log('Preset saved:', preset);
  }}
  onPresetDeleted={(presetId) => {
    console.log('Preset deleted:', presetId);
  }}
/>
```text

### With Custom Filter UI

You can also integrate presets with your custom filter UI:

```typescript
import { useFilterPresets } from 'ag-grid-react-components';

function CustomFilterUI({ gridApi }) {
  const {
    presets,
    savePreset,
    loadPreset,
    deletePreset,
    updatePreset
  } = useFilterPresets({
    gridApi,
    storageKey: 'my-app-filter-presets'
  });

  const handleSaveCurrentFilters = () => {
    const currentFilters = gridApi.getFilterModel();

    savePreset({
      name: 'My Custom Filter',
      filterModel: currentFilters,
      description: 'Filters for Q4 analysis'
    });
  };

  return (
    <div>
      <button onClick={handleSaveCurrentFilters}>
        Save Current Filters
      </button>

      <select onChange={(e) => loadPreset(e.target.value)}>
        <option value="">Select a preset...</option>
        {presets.map(preset => (
          <option key={preset.id} value={preset.id}>
            {preset.name}
          </option>
        ))}
      </select>
    </div>
  );
}
```text

### With Existing Applications

To add preset support to existing applications:

1. **Update Grid Configuration**:

```typescript
const gridOptions = {
  // Enable filter persistence
  suppressFilterPersistence: false,

  // Handle filter changes
  onFilterChanged: (params) => {
    // Update URL or state as needed
  },
};
```text

2. **Add Preset UI**:

```typescript
import { FilterPresetManager } from 'ag-grid-react-components';

function MyApp() {
  return (
    <>
      <FilterPresetManager
        gridApi={gridApi}
        position="top-right"
      />
      <AgGridReact {...gridOptions} />
    </>
  );
}
```text

3. **Migrate Existing Filters**:

```typescript
// Convert existing saved filters to presets
const migrateFilters = () => {
  const oldFilters = localStorage.getItem("saved-filters");
  if (oldFilters) {
    const filters = JSON.parse(oldFilters);
    filters.forEach((filter) => {
      savePreset({
        name: filter.name,
        filterModel: filter.model,
        createdAt: new Date().toISOString(),
      });
    });
  }
};
````

## Next Steps

- Read the [API Reference](./api-reference.md) for detailed component documentation
- Explore [Advanced Topics](./advanced-usage.md) for performance optimization and custom storage
- Check out the [Troubleshooting Guide](./troubleshooting.md) for common issues
- See the [Migration Guide](./migration-guide.md) for upgrading from older versions
