# QuickFilterDropdown Debugging Plan

## Problem Statement
The QuickFilterDropdown component renders beautifully but selecting options does not filter the grid data.

## Debugging Strategy

### 1. Verify Filter Model Structure
- [ ] Check what filter model is being sent to AG Grid
- [ ] Verify the DateFilter component expects this structure
- [ ] Ensure the column ID matches exactly

### 2. Check AG Grid Integration Points
- [ ] Confirm the custom DateFilter is registered correctly
- [ ] Verify the API instance is valid when filtering
- [ ] Check if filter events are being triggered

### 3. Inspect Filter Model Format
Current implementation sends:
```typescript
{
  date: {
    mode: "relative",
    type: "equals", 
    expression: "Today"
  }
}
```

But DateFilter might expect:
```typescript
{
  date: {
    filterModel: {
      mode: "relative",
      type: "equals",
      expression: "Today"
    }
  }
}
```

### 4. Debug Steps
1. **Add console logging** to trace the flow:
   - Log in `applyQuickFilter` when called
   - Log the filter model being sent
   - Log in DateFilter's `setModel` method
   - Log in DateFilter's `doesFilterPass` method

2. **Verify column configuration**:
   - Check the column ID is exactly "date"
   - Confirm filter type is set to "agDateColumnFilter"
   - Verify DateFilter component is properly mapped

3. **Test with AG Grid's built-in filters**:
   - Try using AG Grid's default date filter
   - Compare the filter model structure

4. **Check DateFilter implementation**:
   - Review how DateFilter expects to receive models
   - Verify the model structure in useGridFilter hook

### 5. Potential Fixes

#### Fix A: Correct Filter Model Structure
The DateFilter component likely expects a different structure based on its implementation.

#### Fix B: Use Column Filter API
Instead of `api.setFilterModel()`, might need to use:
```typescript
const filterInstance = api.getFilterInstance(columnId);
filterInstance?.setModel(filterModel);
```

#### Fix C: Match DateFilter's Expected Format
The DateFilter might expect the model wrapped differently or with additional properties.

### 6. Implementation Plan
1. First, add extensive logging to understand the flow
2. Examine the DateFilter's setModel implementation
3. Update filterModelBuilder to match expected format
4. Test with different filter options
5. Verify the fix works for all filter types

### 7. Success Criteria
- [ ] Clicking "Today" shows only today's items
- [ ] Clicking "This Week" shows this week's items
- [ ] Clicking "All Items" clears the filter
- [ ] Filter state syncs with URL
- [ ] Filter state persists on refresh