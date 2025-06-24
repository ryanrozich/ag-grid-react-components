# DateFilter Component Architecture

## Overview

The DateFilter is a refactored, modular version of the original 971-line RelativeDateFilter component, now organized into a clean architecture with ~291 lines in the main component.

## Component Structure

```
src/components/DateFilter/
├── index.tsx                    # Main orchestrator (291 lines)
├── components/
│   ├── FilterModeToggle.tsx    # Toggle between absolute/relative modes
│   ├── FilterTypeSelector.tsx  # Dropdown for filter types
│   ├── AbsoluteDatePicker.tsx  # Date picker UI (renamed from TextDateInput)
│   ├── RelativeExpressionInput.tsx # Expression input for relative mode
│   └── FilterActions.tsx       # Reset/Apply buttons
├── hooks/
│   ├── useFilterState.ts       # Centralized state management (13+ state variables)
│   ├── useFilterValidation.ts  # Validation logic and date resolution
│   └── useDebouncedValidation.ts # 300ms debounced validation
├── utils/
│   └── withErrorBoundary.tsx  # Error boundary HOC
└── types.ts                    # TypeScript interfaces and types
```

## Key Implementation Details

### State Management

- Uses `useFilterState` hook to manage 13+ state variables
- Initializes from `initialModel` prop or defaults
- Handles both absolute dates and relative expressions

### AG Grid Integration

- Implements IFilter interface via `useGridFilter` hook
- Required callbacks: `doesFilterPass`, `getModel`, `setModel`
- Optional callbacks: `isFilterActive`, `getModelAsString`, `onNewRowsLoaded`
- Proper date serialization/deserialization for models

### Filter Model Structure

```typescript
{
  type: "equals" | "notEqual" | "after" | "before" | "inRange",
  mode: "absolute" | "relative",
  dateFrom?: Date | null,
  dateTo?: Date | null,
  expressionFrom?: string,
  expressionTo?: string,
  fromInclusive?: boolean,
  toInclusive?: boolean
}
```

### Validation Flow

1. User input → Debounced validation (300ms)
2. Expression parsing via `parseDateExpression`
3. Date resolution via `resolveDateExpression`
4. Filter validity check before applying

## Current Issues

### Programmatic Filter Setting

When filters are set via `api.setFilterModel()`:

1. AG Grid creates new component instance with `model: null`
2. `setModel` is not called on the new instance
3. Component has no state, filter doesn't work

### Workaround Attempts

- Added extensive logging
- Tried manual state initialization
- Checked for timing issues with React state updates
- Issue affects both DateFilter and RelativeDateFilter

## Integration Points

- **dateExpressionParser.ts**: Handles relative date expressions
- **filterStateUtils.ts**: Serialization for URL persistence
- **QuickFilterDropdown**: Sets filters programmatically
- **AG Grid v33**: Uses `useGridFilter` hook for integration
