# DateFilter State Reset Fixes

## Changes Made

### 1. Added User Interaction Tracking

- Added `isUserInteracting` state to track when the user is actively interacting with the filter
- This prevents re-initialization during user input

### 2. Fixed useEffect to Only Run on Mount

- Changed the useEffect that calls `initializeFromModel` to have an empty dependency array
- This ensures it only runs once on component mount, not on every prop change

### 3. Added Model Comparison

- Implemented `areModelsEqual` function to check if the model has actually changed
- This prevents unnecessary state re-initialization when the model hasn't changed
- Handles both Date objects and ISO string dates properly

### 4. Force Update for Programmatic Changes

- When `setModel` is called programmatically (e.g., from QuickFilterDropdown), it passes `forceUpdate=true`
- This ensures programmatic changes still work correctly

### 5. Set User Interaction Flag on All User Actions

- Filter type changes
- Filter mode toggle
- Date input changes
- Expression input changes
- All now set `isUserInteracting=true` to prevent state reset during interaction

### 6. Reset Interaction Flag After Apply/Reset

- After applying or resetting the filter, the interaction flag is cleared
- Also clears on blur with a small delay

## Expected Behavior After Fixes

1. **Filter type stays selected**: When you select "after" and apply, it should remain "after" and not reset to "equals"

2. **Mode switching works**: You can switch between absolute and relative modes without the state reverting

3. **Input values can be cleared**: You can delete values from input fields without them reappearing

4. **Programmatic updates still work**: QuickFilterDropdown and other components can still update the filter via setModel

## Testing Instructions

1. Open the DateFilter and select "after" filter type
2. Enter a date and click Apply
3. Verify the filter type remains "after"

4. Switch to relative mode
5. Enter an expression like "today"
6. Switch back to absolute mode
7. Verify the mode stays in absolute

8. Clear an input field completely
9. Verify the value stays cleared and doesn't reappear
