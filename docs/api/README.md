# API Reference

Complete API documentation for all components and utilities.

## Components

### Filter Components

- [DateFilter](../components/date-filter.md) - Date range filtering
- [QuickFilterDropdown](../components/quick-filter-dropdown.md) - Quick filter UI
- [ActiveFilters](../components/active-filters.md) - Active filter display
- [FilterPresets](../components/filter-presets.md) - Preset management

### Utility Components

- [CategorySelector](../components/category-selector.md) - Category management (planned)

## Hooks

### Core Hooks

- `useGridFilter` - AG Grid filter integration
- `usePresets` - Preset management
- `usePresetFromUrl` - URL preset handling

### Utility Hooks

- `useDebounce` - Debounce values
- `useFilterState` - Filter state management
- `useFilterValidation` - Validation logic

## Utilities

### Date Utilities

- `dateExpressionParser` - Parse date expressions
- `isValidDateExpression` - Validate expressions
- `evaluateDateExpression` - Evaluate to Date

### Filter Utilities

- `filterStateUtils` - Filter state helpers
- `gridStateUtils` - Grid state persistence
- `filterModelBuilder` - Build AG Grid models

### Preset Utilities

- `PresetManager` - Preset CRUD operations
- `PresetStorageEngine` - Storage abstraction
- `urlSerializer` - URL serialization

## Types

### Core Types

```typescript
interface FilterPreset {
  id: string;
  name: string;
  description?: string;
  filters: FilterState;
  category?: string;
  isSystem?: boolean;
  createdAt: string;
  updatedAt: string;
}

interface FilterState {
  [field: string]: any;
}
```

### Component Props

See individual component documentation for detailed prop types.

## Constants

### Date Expressions

- `today`, `yesterday`, `tomorrow`
- `start-of-week`, `end-of-week`
- `start-of-month`, `end-of-month`
- `start-of-year`, `end-of-year`

### Filter Types

- `equals`, `notEqual`
- `contains`, `notContains`
- `startsWith`, `endsWith`
- `greaterThan`, `lessThan`
- `inRange`
