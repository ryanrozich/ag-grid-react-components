# ActiveFilters Component - Implementation Details

## Filter Type Display Fix

The ActiveFilters component was updated to correctly display filter types for date filters.

### Key Learning

Date filters in AG Grid use these type values:

- `"after"` - for greater than comparisons
- `"before"` - for less than comparisons
- `"equals"` - for exact match
- `"notEqual"` - for not equal
- `"inRange"` - for between two values

NOT `"greaterThan"` or `"lessThan"` as might be expected.

### Code Update

```typescript
// In getFilterDisplayValue function
if (model.mode === "relative") {
  const expression = model.expressionFrom || model.expression || "";
  switch (model.type) {
    case "after":
      return `after ${expression}`;
    case "before":
      return `before ${expression}`;
    // ... other cases
  }
}
```

This ensures active filter pills show the complete filter condition like "Due Date: after Today" instead of just "Due Date: Today".
