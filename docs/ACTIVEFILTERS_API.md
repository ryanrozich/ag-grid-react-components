# ActiveFilters API Reference

The ActiveFilters component displays currently active AG Grid filters as removable pills, providing visual feedback and easy filter management.

## Installation

```bash
npm install ag-grid-react-components
```

## Basic Usage

```tsx
import { ActiveFilters } from "ag-grid-react-components";

<ActiveFilters api={gridApi} filterModel={filterModel} />;
```

## API

### Component Props

| Prop             | Type                         | Default  | Description                                        |
| ---------------- | ---------------------------- | -------- | -------------------------------------------------- |
| `api`            | `GridApi`                    | Required | AG Grid API instance                               |
| `filterModel`    | `FilterModel`                | Required | Current filter model from AG Grid                  |
| `className`      | `string`                     | -        | Additional CSS class for the container             |
| `pillClassName`  | `string`                     | -        | CSS class for individual filter pills              |
| `onFilterRemove` | `(columnId: string) => void` | -        | Callback when a filter is removed                  |
| `onClearAll`     | `() => void`                 | -        | Callback when all filters are cleared              |
| `showClearAll`   | `boolean`                    | `true`   | Show "Clear all" button                            |
| `maxFilters`     | `number`                     | -        | Maximum number of filters to display               |
| `customLabels`   | `Record<string, string>`     | -        | Custom column labels (override column definitions) |

### TypeScript Interfaces

```typescript
interface ActiveFiltersProps {
  api: GridApi;
  filterModel: FilterModel;
  className?: string;
  pillClassName?: string;
  onFilterRemove?: (columnId: string) => void;
  onClearAll?: () => void;
  showClearAll?: boolean;
  maxFilters?: number;
  customLabels?: Record<string, string>;
}

interface FilterModel {
  [columnId: string]: any;
}
```

## Examples

### Basic Implementation

```tsx
const MyGrid = () => {
  const [filterModel, setFilterModel] = useState({});

  const onFilterChanged = useCallback(() => {
    setFilterModel(gridApi.getFilterModel());
  }, [gridApi]);

  return (
    <>
      <ActiveFilters api={gridApi} filterModel={filterModel} />
      <AgGridReact
        onFilterChanged={onFilterChanged}
        // ... other props
      />
    </>
  );
};
```

### Custom Styling

```tsx
<ActiveFilters
  api={gridApi}
  filterModel={filterModel}
  className="my-filter-container"
  pillClassName="my-filter-pill"
/>

// CSS
.my-filter-container {
  padding: 1rem;
  background: #f5f5f5;
}

.my-filter-pill {
  background: #007bff;
  color: white;
}
```

### With Custom Labels

```tsx
<ActiveFilters
  api={gridApi}
  filterModel={filterModel}
  customLabels={{
    dueDate: "Due Date",
    taskName: "Task",
    assignedTo: "Assigned To",
  }}
/>
```

### Limited Display

```tsx
// Only show first 5 filters
<ActiveFilters api={gridApi} filterModel={filterModel} maxFilters={5} />
```

### Custom Callbacks

```tsx
<ActiveFilters
  api={gridApi}
  filterModel={filterModel}
  onFilterRemove={(columnId) => {
    console.log(`Removing filter from ${columnId}`);
    // Custom logic before removal
  }}
  onClearAll={() => {
    if (confirm("Clear all filters?")) {
      gridApi.setFilterModel(null);
    }
  }}
/>
```

## Filter Display Format

The component intelligently formats different filter types:

### Date Filters

- `equals`: "Date: Dec 25, 2024"
- `before`: "Date: before Dec 25, 2024"
- `after`: "Date: after Dec 25, 2024"
- `inRange`: "Date: Dec 1 - Dec 31, 2024"

### Text Filters

- `contains`: "Name: contains 'John'"
- `equals`: "Status: Active"
- `notEqual`: "Status: not Draft"

### Number Filters

- `greaterThan`: "Amount: > 1000"
- `lessThan`: "Amount: < 500"
- `inRange`: "Amount: 100 - 500"

### Set Filters

- Single: "Category: Development"
- Multiple: "Category: Development, Design"

## Styling

The component uses CSS modules with these classes:

```css
/* Container */
.container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
}

/* Individual filter pill */
.filterPill {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  background: rgb(239, 246, 255);
  border: 1px solid rgb(191, 219, 254);
  border-radius: 9999px;
  font-size: 0.875rem;
}

/* Column name */
.columnName {
  font-weight: 500;
  color: rgb(59, 130, 246);
}

/* Filter value */
.filterValue {
  color: rgb(55, 65, 81);
  margin-left: 0.25rem;
}

/* Remove button */
.removeButton {
  margin-left: 0.5rem;
  cursor: pointer;
  color: rgb(107, 114, 128);
}

/* Clear all button */
.clearAllButton {
  padding: 0.25rem 0.75rem;
  background: white;
  border: 1px solid rgb(209, 213, 219);
  border-radius: 0.375rem;
  font-size: 0.875rem;
  cursor: pointer;
}
```

## Accessibility

- Pills are keyboard navigable
- Remove buttons have proper ARIA labels
- Screen reader announcements for filter changes
- Focus management after filter removal

## Performance Considerations

- Component uses React.memo for optimization
- Efficient filter model diffing
- Minimal re-renders on filter changes

## Integration with AG Grid

The component automatically:

- Subscribes to filter change events
- Updates when columns are added/removed
- Handles column visibility changes
- Respects column definitions (headers, field names)

## TypeScript

Full TypeScript support with proper AG Grid type integration:

```typescript
import type { GridApi, FilterModel } from "ag-grid-community";
import type { ActiveFiltersProps } from "ag-grid-react-components";
```

## Browser Support

- All modern browsers (Chrome, Firefox, Safari, Edge)
- IE11 not supported
