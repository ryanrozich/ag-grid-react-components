## ActiveFilters Component and UI Redesign

### Overview

Created a new ActiveFilters component and redesigned the demo UI to feel more like a real application, moving from a "quick filters panel" approach to an integrated toolbar design.

### ActiveFilters Component

- **Location**: `/src/components/ActiveFilters/`
- **Purpose**: Display active AG Grid filters as removable pills with filter values
- **Key Features**:
  - Shows both column name and filter value (e.g., "Due Date: Last 7 days")
  - Individual filter removal via × button
  - "Clear all" button for removing all filters at once
  - Handles various filter types: date ranges, set filters, text filters
  - TypeScript interfaces for type safety
  - CSS Modules for styling isolation

### Component API

```typescript
export interface ActiveFiltersProps {
  api: GridApi;
  filterModel: FilterModel;
  className?: string;
}
```

### UI Redesign Changes

1. **Removed Quick Filters Panel**: Eliminated the separate panel labeled "Quick Filters"
2. **Integrated Toolbar**: Created a cohesive grid toolbar with:
   - Grid title and item count
   - Quick filter dropdowns aligned to the right
   - Active filters displayed below when filters are applied
3. **Column Width Adjustments**:
   - Task Name: `flex: 1, minWidth: 250` for readability
   - Budget: `width: 100`
   - Progress: `width: 120`
   - Due Date: `width: 140`
   - Status: `width: 140`
   - Category: `width: 140`
   - Assignee: `width: 180`

### CSS Styling Notes

- Uses `rgb()` notation with decimal alpha values (e.g., `rgb(99, 102, 241, 0.1)`)
- This satisfies stylelint's `color-function-notation: "legacy"` rule
- Do NOT use `rgba()` or modern `rgb(99 102 241 / 0.1)` syntax

### Export Configuration

The ActiveFilters component is exported from the main index.ts file, making it available as part of the library's public API.
