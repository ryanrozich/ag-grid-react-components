# Manual Test for Infinite Loop Fix

## Steps to Test:

1. Start the development server:

   ```bash
   npm run dev
   ```

2. Open the browser console (F12) and go to http://localhost:5173/

3. Click on the "Demo" tab if not already there

4. Find the Quick Filter Dropdown (should be in the header area)

5. Click on it and select "Last 7 days"

6. Watch the console for messages

## Expected Result:

- You should see ONE "Grid state saved to URL" message
- The filter should be applied (active filter pill shows "today-7d")
- No infinite loop of console messages

## What was Fixed:

The issue was in `components-showcase-complete.tsx` where the `onStateSave` callback was calling `setFilterModel(state.filters)`, which triggered another filter change event, creating an infinite loop.

The fix was to remove this circular dependency since the `filterChanged` event handler already updates the filter model.

## Before the Fix:

```typescript
onStateSave: (state) => {
  console.log("Grid state saved to URL:", state);
  if (state.filters) {
    setFilterModel(state.filters); // This caused the infinite loop!
  }
},
```

## After the Fix:

```typescript
onStateSave: (state) => {
  console.log("Grid state saved to URL:", state);
  // Don't update filterModel here as it creates a circular dependency
  // The filterChanged event already handles updating the filterModel
},
```
