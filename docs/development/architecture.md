# Architecture Overview

This document describes the architecture and design principles of ag-grid-react-components.

## Core Principles

### 1. Single Package

- Tree-shakeable npm package
- Zero runtime dependencies
- Minimal bundle size

### 2. Headless Components

- No default styles
- Fully customizable UI
- CSS modules for demo only

### 3. Adapter Pattern

- Pluggable date picker adapters
- Compression adapters for sharing
- Storage adapters for persistence

### 4. Modular Architecture

- Small, focused modules (<300 lines)
- Clear separation of concerns
- Composable components

## Project Structure

```text
src/
├── components/           # React components
│   ├── DateFilter/      # Date filtering component
│   ├── ActiveFilters/   # Filter pills display
│   ├── QuickFilterDropdown/  # Quick filter UI
│   └── FilterPresets/   # Preset management
├── hooks/               # Custom React hooks
│   ├── useGridFilter    # AG Grid integration
│   ├── usePresets       # Preset management
│   └── useDebounce      # Performance utilities
├── utils/               # Utility functions
│   ├── dateExpressionParser  # Date parsing
│   ├── filterStateUtils      # Filter state
│   └── gridStateUtils        # Grid state
├── types/               # TypeScript definitions
└── demo/                # Demo application
```

## Component Architecture

### Base Pattern

Each component follows this structure:

```text
ComponentName/
├── index.tsx            # Main component (orchestrator)
├── components/          # Sub-components
├── hooks/              # Component-specific hooks
├── utils/              # Component utilities
├── types.ts            # TypeScript interfaces
└── ComponentName.test.tsx  # Tests
```

### Component Responsibilities

1. **Container Components** (index.tsx)

   - State management
   - AG Grid integration
   - Child component orchestration

2. **Presentational Components**

   - Pure UI rendering
   - No business logic
   - Fully controlled

3. **Hooks**
   - Reusable logic
   - Side effects
   - AG Grid integration

## AG Grid Integration

### Filter Components

All filter components implement:

```typescript
interface IFilterParams {
  api: GridApi;
  columnApi: ColumnApi;
  column: Column;
  colDef: ColDef;
  // ... other AG Grid params
}

interface IFilter {
  getModel(): any;
  setModel(model: any): void;
  doesFilterPass(params: IDoesFilterPassParams): boolean;
}
```

### Integration Hook

The `useGridFilter` hook handles:

- Model synchronization
- Filter lifecycle
- AG Grid callbacks
- v33 bug workarounds

## State Management

### Local State

- Component state with useState
- Performance optimization with useMemo/useCallback

### Persistent State

- Storage adapters for flexibility
- LocalStorage by default
- Extensible for other storage

### Shared State

- URL parameters for sharing
- Import/Export functionality
- Compression for URLs

## Type Safety

### Strict Mode

- TypeScript strict mode enabled
- No implicit `any`
- Exhaustive type checking

### Type Guards

```typescript
function isValidDate(value: unknown): value is Date {
  return value instanceof Date && !isNaN(value.getTime());
}
```

### Generic Components

```typescript
interface FilterProps<T> {
  value: T;
  onChange: (value: T) => void;
}
```

## Performance Considerations

### Code Splitting

- Dynamic imports for heavy features
- Lazy loading for demo components

### Memoization

- React.memo for expensive renders
- useMemo for expensive calculations
- useCallback for stable references

### Debouncing

- User input debouncing
- Filter application debouncing
- Validation debouncing

## Testing Strategy

### Unit Tests

- Pure functions
- Utility modules
- Type guards

### Integration Tests

- Component + AG Grid
- Full filter lifecycle
- State persistence

### E2E Tests

- User workflows
- Bug reproduction
- Visual regression

## Extension Points

### Custom Adapters

1. **Date Picker Adapter**

   ```typescript
   interface DatePickerAdapter {
     render: (props: DatePickerProps) => ReactElement;
     parseValue: (value: any) => Date | null;
   }
   ```

2. **Storage Adapter**

   ```typescript
   interface StorageAdapter {
     get: (key: string) => Promise<any>;
     set: (key: string, value: any) => Promise<void>;
     remove: (key: string) => Promise<void>;
   }
   ```

3. **Compression Adapter**
   ```typescript
   interface CompressionAdapter {
     compress: (data: string) => string;
     decompress: (data: string) => string;
   }
   ```

## Best Practices

1. **Composition over Inheritance**

   - Use hooks for shared logic
   - Compose components
   - Avoid class components

2. **Separation of Concerns**

   - UI logic in components
   - Business logic in hooks/utils
   - AG Grid logic isolated

3. **Error Boundaries**

   - Wrap components in error boundaries
   - Graceful error handling
   - User-friendly error messages

4. **Accessibility**
   - ARIA labels
   - Keyboard navigation
   - Screen reader support
