# AG Grid React Components - UI Improvements Todo List

**Date**: 2025-01-24
**Context**: User identified 8 issues in the demo application after ActiveFilters component was added

## Todo Items

1. **Add ActiveFilters tab to navigation** (HIGH)

   - Need to add ActiveFilters tab alongside Date Filter, Quick Filter, and URL State tabs at the top
   - Currently missing from the tab navigation

2. **Fix result count** (HIGH)

   - The "1000 items" count doesn't update when filters are applied
   - Need to make it reactive to filter changes

3. **Redesign toolbar layout** (HIGH)

   - Put active filters and quick filters in the same row
   - Allow pills to wrap if they need more space
   - Current layout feels staggered

4. **Create Priority pill renderer** (MEDIUM)

   - Custom cell renderer for Priority column
   - Use colored pills similar to Status column
   - Consider adding icons if appropriate

5. **Fix Status column total** (MEDIUM)

   - Remove the total value from Status column in the grand total row
   - Status shouldn't be aggregated

6. **Add Remaining column** (MEDIUM)

   - New column showing budget - spent values
   - Will help complete the financial picture

7. **Add stats UI blocks** (HIGH)

   - Use Tailwind stats UI blocks at top of page
   - Show: Number of Tasks, Total Budget, Progress, Budget Remaining
   - Should respond to current grid result set
   - Remove current result count in favor of Number of Tasks stat

8. **Update dev docs** (HIGH)
   - Document the AG Grid setFilterModel workaround
   - Explain risks and potential issues
   - Link to relevant GitHub issues

## Implementation Status

- Todo list created and persisted
- Ready to begin implementation
