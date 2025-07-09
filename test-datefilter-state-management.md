# DateFilter State Management Tests

This document outlines the comprehensive tests created for the DateFilter state reset fixes.

## Test Coverage

### 1. Filter Type Persistence Tests (`DateFilter.state-management.test.tsx`)

These tests verify that the selected filter type (equals, before, after, inRange) persists correctly after applying the filter:

- **Test: should persist filter type (equals) after applying**

  - Selects "equals" filter type
  - Enters a relative expression
  - Applies the filter
  - Verifies the filter type remains "equals"

- **Test: should persist filter type (before) after applying**

  - Similar to above but for "before" filter type

- **Test: should persist filter type (after) after applying**

  - Similar to above but for "after" filter type

- **Test: should persist filter type (inRange) after applying**
  - Tests the range filter type with both from and to expressions

### 2. Mode Switching Tests

These tests ensure smooth switching between relative and absolute modes without reverting:

- **Test: should switch from absolute to relative mode without reverting**

  - Starts in absolute mode
  - Enters a date
  - Switches to relative mode
  - Verifies mode persists and data can be entered

- **Test: should switch from relative to absolute mode without reverting**

  - Starts in relative mode
  - Enters an expression
  - Switches to absolute mode
  - Verifies mode persists

- **Test: should maintain filter type when switching modes**
  - Sets filter type to inRange
  - Switches between modes
  - Verifies filter type remains inRange

### 3. User Input Deletion Tests

These tests ensure users can delete and edit input without values mysteriously reappearing:

- **Test: should allow deleting input without values reappearing**

  - Types an expression
  - Clears the input completely
  - Waits to ensure value doesn't reappear
  - Types a new value

- **Test: should allow partial deletion in range inputs**

  - Sets up range filter with two inputs
  - Partially deletes content in the 'to' field
  - Verifies partial value remains stable
  - Completes the edit

- **Test: should handle selecting all and deleting**
  - Types an expression
  - Selects all text (Ctrl+A)
  - Deletes everything
  - Ensures field stays empty

### 4. State Re-initialization Prevention Tests

These tests verify the component doesn't re-initialize state during user interaction:

- **Test: should not re-initialize when user is typing**

  - Monitors console logs for `initializeFromModel` calls
  - Types character by character
  - Verifies no re-initialization occurs

- **Test: should not re-initialize when changing filter type**

  - Enters an expression
  - Changes filter type
  - Verifies state isn't reset

- **Test: should track user interaction state correctly**
  - Tests the isUserInteracting flag
  - Attempts to set model while user is interacting
  - Verifies user input is preserved

### 5. Programmatic Update Tests

These tests ensure programmatic updates (like from QuickFilterDropdown) work correctly:

- **Test: should accept programmatic updates when not interacting**

  - Uses the component ref to call setModel
  - Verifies the UI updates correctly
  - Checks that callbacks are triggered

- **Test: should handle quick filter preset changes**

  - Simulates rapid preset changes
  - Verifies each preset is applied correctly

- **Test: should handle null model (reset) programmatically**

  - Sets an initial model
  - Resets with null
  - Verifies UI returns to default state

- **Test: should handle forceUpdate flag correctly**
  - User starts typing
  - Programmatic update with force flag
  - Verifies forced update overrides user interaction

### 6. Edge Cases and Regression Tests

Additional tests for edge cases:

- **Test: should handle rapid filter type changes**

  - Rapidly changes filter types without delay
  - Verifies final state is stable

- **Test: should handle model with ISO date strings**

  - Tests deserialization of ISO date strings
  - Verifies dates are parsed correctly

- **Test: should maintain state during async validation**
  - Tests debounced validation (300ms delay)
  - Verifies values remain stable during validation

## Hook Tests (`useFilterState.test.ts`)

Additional tests for the `useFilterState` hook:

### User Interaction State Management

- **Test: should track user interaction state**

  - Tests the isUserInteracting flag getter/setter

- **Test: should prevent model initialization during user interaction**

  - Sets isUserInteracting to true
  - Attempts to initialize with new model
  - Verifies state doesn't change

- **Test: should allow forced model initialization during user interaction**
  - Tests the forceUpdate parameter
  - Verifies forced updates work even during interaction

### Model Equality Checking

- **Test: should not re-initialize with equivalent models**

  - Tests the areModelsEqual function
  - Prevents unnecessary re-renders

- **Test: should handle date comparison correctly**

  - Compares Date objects with ISO strings
  - Ensures equivalent dates are recognized

- **Test: should detect changes in inclusivity flags**
  - Tests that changes to fromInclusive/toInclusive trigger updates

## Running the Tests

To run these tests in the worktree:

```bash
# Run the state management tests
npm run test:unit -- src/components/DateFilter/DateFilter.state-management.test.tsx

# Run the hook tests
npm run test:unit -- src/components/DateFilter/hooks/useFilterState.test.ts

# Run all DateFilter tests
npm run test:unit -- src/components/DateFilter
```

## Key Testing Principles

1. **User Interaction Tracking**: The component tracks when a user is actively interacting to prevent unwanted state resets.

2. **Model Equality**: The component compares models to avoid unnecessary re-initialization when the same model is set.

3. **Force Updates**: Programmatic updates can force state changes even during user interaction when needed.

4. **Debounced Validation**: Expression validation is debounced to improve performance without affecting user experience.

5. **State Persistence**: Filter type and mode selections persist through various operations and don't revert unexpectedly.
