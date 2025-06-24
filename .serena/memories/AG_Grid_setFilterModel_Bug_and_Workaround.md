# AG Grid setFilterModel Bug and Workaround

## Bug Description
AG Grid has a confirmed bug where `api.setFilterModel()` fails to properly initialize custom React filter components. When called programmatically:

1. AG Grid destroys the existing filter instance
2. Creates a new filter instance with `model: null`
3. **Never calls `setModel()` on the new instance**
4. Filter has no state, causing `doesFilterPass` to return true for all rows
5. No filtering occurs despite filter model being set in AG Grid

## Evidence
- GitHub Issues: #2256, #2709, #4870
- Affects all frameworks (React, Angular, Vue)
- Present since 2018, still exists in v33
- Confirmed by multiple developers and reproduced in our codebase

## Root Cause
AG Grid's filter lifecycle for programmatic updates is incomplete. The framework assumes filter state will be passed as props during instantiation, but when using `setFilterModel()`, it creates the component with null props and never follows up with `setModel()`.

## Verified Workarounds

### Method 1: Manual setModel (Most Reliable)
```typescript
async function applyFilterModelWithWorkaround(api: GridApi, columnId: string, filterModel: any) {
  // Step 1: Set filter model (creates instance)
  api.setFilterModel({ [columnId]: filterModel });
  
  // Step 2: Wait for instance creation
  await new Promise(resolve => setTimeout(resolve, 10));
  
  // Step 3: Get filter instance
  const filterInstance = api.getFilterInstance(columnId);
  
  // Step 4: Manually call setModel
  if (filterInstance && filterInstance.setModel) {
    await filterInstance.setModel(filterModel);
  }
  
  // Step 5: Trigger filtering
  api.onFilterChanged();
}
```

### Method 2: Clear and Reapply
```typescript
// Clear all filters first
api.setFilterModel({});
await new Promise(resolve => setTimeout(resolve, 10));

// Then apply new filter
api.setFilterModel({ [columnId]: filterModel });
// ... continue with manual setModel
```

### Method 3: Use firstDataRendered Event
For initial filter setup, wait for `firstDataRendered` event instead of `gridReady`.

## Implementation Location
Workaround implemented in: `/src/components/QuickFilterDropdown/utils/agGridWorkaround.ts`

## Important Notes
- Always call `api.onFilterChanged()` after setting filters
- For set filters (Enterprise), also call `filterInstance.applyModel()`
- The 10ms delay is crucial for React component lifecycle
- This bug does NOT occur when users interact with filters through UI