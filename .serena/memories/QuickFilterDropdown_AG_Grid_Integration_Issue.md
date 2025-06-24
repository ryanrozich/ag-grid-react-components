# QuickFilterDropdown AG Grid Integration Issue

## Problem Summary

The QuickFilterDropdown component does not actually filter the grid data when selections are made. The filter model is set correctly in AG Grid, but the data remains unfiltered.

## Root Cause

When AG Grid sets a filter model programmatically (via `api.setFilterModel()`), it creates a NEW filter component instance but:

1. Does NOT pass the model as a prop to the new instance
2. Does NOT call `setModel` on the new instance

This results in the filter component having no state and therefore not filtering any data.

## Key Investigation Findings

### 1. Component Switch

- Originally using `RelativeDateFilter` (old monolithic component)
- Switched to `DateFilter` (new refactored component)
- Both components exhibit the same issue

### 2. Filter Lifecycle

When setting filter programmatically:

```
1. api.setFilterModel({ dueDate: {...} }) is called
2. AG Grid destroys existing filter instance
3. AG Grid creates NEW filter instance with model: null
4. setModel is NEVER called on the new instance
5. doesFilterPass is called with null state, returns true for all rows
6. No filtering occurs (row count remains 1001)
```

### 3. Debug Logs Show

```
[DateFilter] Component instantiated with props: {model: null}
[useFilterState] Initializing with model: null
[DateFilter] doesFilterPass called #1 currentModel: null isValid: false
[DateFilter] Returning true - no valid filter
```

### 4. Test Results

- Filter model is correctly stored in AG Grid: `{dueDate: {mode: "relative", type: "inRange", ...}}`
- Filter instance exists and has correct methods
- But the instance has no state/model
- Row count remains unchanged after filtering

## Code Locations

### Key Files Modified

1. `/src/demo/components-showcase-complete.tsx`

   - Fixed column ID from "date" to "dueDate"
   - Enabled floating filters
   - Switched from RelativeDateFilter to DateFilter

2. `/src/components/QuickFilterDropdown/utils/filterModelBuilder.ts`

   - Made applyQuickFilter async
   - Added extensive logging
   - Calls both setFilterModel and onFilterChanged

3. `/src/components/DateFilter/index.tsx`

   - Added comprehensive logging
   - Implemented proper AG Grid filter interface
   - Added isFilterActive callback

4. `/src/index.ts`
   - Updated exports to include DateFilter
   - Maintained backward compatibility

## Current Status

This appears to be a limitation or bug in AG Grid v33's React integration. The filter works correctly when set through the column menu UI but not when set programmatically. Both DateFilter and RelativeDateFilter are affected.

## Potential Solutions to Explore

1. Check if AG Grid has a different API for programmatically setting custom React filters
2. Investigate if we need to manually trigger setModel after setFilterModel
3. Consider using AG Grid's imperative filter API instead of declarative
4. Check if this is fixed in newer AG Grid versions
5. Implement a workaround that forces filter refresh after programmatic changes
