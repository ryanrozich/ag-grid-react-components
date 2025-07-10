# Code Examples

This directory contains practical examples of using ag-grid-react-components.

## Basic Examples

### DateFilter

```typescript
import { DateFilter } from '@ag-grid-community/react-components';

// Basic usage
const dateFilterParams = {
  api: gridApi,
  column: column,
  onFilterChanged: () => gridApi.onFilterChanged()
};

<DateFilter {...dateFilterParams} />
```

### QuickFilterDropdown

```typescript
import { QuickFilterDropdown } from '@ag-grid-community/react-components';

<QuickFilterDropdown
  columns={columns}
  onFiltersChange={(filters) => {
    gridApi.setFilterModel(filters);
  }}
/>
```

### ActiveFilters

```typescript
import { ActiveFilters } from '@ag-grid-community/react-components';

<ActiveFilters
  gridApi={gridApi}
  onRemoveFilter={(field) => {
    const model = gridApi.getFilterModel();
    delete model[field];
    gridApi.setFilterModel(model);
  }}
/>
```

## Advanced Examples

### Complete Filter System

```typescript
import {
  QuickFilterDropdown,
  ActiveFilters,
  FilterPresets
} from '@ag-grid-community/react-components';

function FilteredGrid() {
  const [gridApi, setGridApi] = useState(null);

  return (
    <div>
      <div className="filter-toolbar">
        <QuickFilterDropdown
          columns={columnDefs}
          onFiltersChange={(filters) => {
            gridApi?.setFilterModel(filters);
          }}
        />
        <FilterPresets
          gridApi={gridApi}
          columnApi={columnApi}
        />
      </div>

      <ActiveFilters
        gridApi={gridApi}
        onRemoveFilter={(field) => {
          const model = gridApi.getFilterModel();
          delete model[field];
          gridApi.setFilterModel(model);
        }}
      />

      <AgGridReact
        columnDefs={columnDefs}
        rowData={rowData}
        onGridReady={(params) => {
          setGridApi(params.api);
        }}
      />
    </div>
  );
}
```

### Custom Date Expressions

```typescript
const customDateFilter = {
  filterType: "agDateColumnFilter",
  filterParams: {
    filterOptions: ["equals", "greaterThan", "lessThan", "inRange"],
    defaultOption: "inRange",
    comparator: (filterDate, cellValue) => {
      // Custom comparison logic
    },
  },
};
```

### Preset Sharing via URL

```typescript
import { usePresetFromUrl } from "@ag-grid-community/react-components";

function App() {
  const { preset, isLoading } = usePresetFromUrl();

  useEffect(() => {
    if (preset && gridApi) {
      gridApi.setFilterModel(preset.filters);
    }
  }, [preset, gridApi]);
}
```

## Interactive Examples

### StackBlitz Examples

- [Basic DateFilter](https://stackblitz.com/edit/ag-grid-react-datefilter)
- [QuickFilterDropdown](https://stackblitz.com/edit/ag-grid-react-quickfilter)
- [Complete System](https://stackblitz.com/edit/ag-grid-react-filters)

### CodeSandbox Examples

- [Filter Presets](https://codesandbox.io/s/ag-grid-filter-presets)
- [Custom Styling](https://codesandbox.io/s/ag-grid-custom-filters)

## Integration Examples

### With Redux

```typescript
// Redux action
const setFilters = (filters) => ({
  type: 'SET_FILTERS',
  payload: filters
});

// Component
const dispatch = useDispatch();
const filters = useSelector(state => state.filters);

<QuickFilterDropdown
  columns={columns}
  initialFilters={filters}
  onFiltersChange={(filters) => {
    dispatch(setFilters(filters));
    gridApi.setFilterModel(filters);
  }}
/>
```

### With React Query

```typescript
const { data: presets } = useQuery(
  'filterPresets',
  fetchPresets
);

<FilterPresets
  gridApi={gridApi}
  initialPresets={presets}
/>
```

## Styling Examples

### Custom Theme

```css
/* Custom filter styles */
.custom-filter {
  --filter-primary: #007bff;
  --filter-hover: #0056b3;
  --filter-border: #dee2e6;
}

.custom-filter .date-filter {
  border: 1px solid var(--filter-border);
  border-radius: 4px;
}
```

### Dark Mode

```css
.dark-theme {
  --bg-primary: #1a1a1a;
  --text-primary: #ffffff;
  --border-color: #333333;
}
```

## Testing Examples

See the [Testing Guide](../development/testing.md) for examples of testing components.
