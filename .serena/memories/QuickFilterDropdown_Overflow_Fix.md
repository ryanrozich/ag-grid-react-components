# QuickFilterDropdown Overflow Clipping Fix

## Issue

The QuickFilterDropdown options were being clipped/cut off by parent containers with `overflow: hidden`. This is not a z-index issue but an overflow clipping issue.

## Root Cause Analysis

Multiple parent containers had `overflow-hidden` class:

1. `<div className="h-screen bg-gray-950 text-white flex flex-col overflow-hidden">` (line 5585)
2. `<div className="flex-1 flex flex-col overflow-hidden">` (line 5589)
3. `<div className="flex-1 bg-gray-900/50 rounded-xl border border-gray-800 overflow-hidden flex flex-col">` (line 5675)

The dropdown uses `position: absolute` which stays within the containing block, so any parent with overflow:hidden will clip it.

## Solutions Applied

1. Removed `overflow-hidden` from immediate container (line 5675)
2. Removed `overflow-hidden` from middle container (line 5589)
3. Kept `overflow-hidden` on outermost container to prevent page scrolling

## Alternative Solutions (if needed)

1. **Portal Solution**: Render dropdown in a React portal at document.body level
2. **Fixed Positioning**: Change dropdown to `position: fixed` with dynamic positioning
3. **Overflow Management**: Add `overflow-visible` to specific containers when dropdown is open

## Testing Notes

- Verify dropdowns are fully visible when opened
- Check that removing overflow doesn't break layout
- Test scrolling behavior is still correct
- Ensure dropdowns work at different viewport sizes
