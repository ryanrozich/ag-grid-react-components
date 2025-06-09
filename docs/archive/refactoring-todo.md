# AG Grid Date Filter - Refactoring TODO List

## Phase 1: Project Setup & Structure

- [ ] Create proper project structure for components
  - [ ] `src/components/DateFilter/` (main component)
  - [ ] `src/components/DateFilter/types.ts` (TypeScript types)
  - [ ] `src/components/DateFilter/utils/` (utility functions)
  - [ ] `src/components/DateFilter/__tests__/` (test files)
  - [ ] `src/test-utils/` (test utilities and mocks)
  - [ ] `tests/e2e/` (end-to-end tests)
  - [ ] `tests/fixtures/` (test data)
- [ ] Set up proper TypeScript configuration
  - [ ] Enable strict mode
  - [ ] Configure path aliases
  - [ ] Set up type checking in CI
- [ ] Add ESLint and Prettier with strict rules
  - [ ] AG Grid specific rules
  - [ ] React Hooks rules
  - [ ] Testing Library rules
- [ ] Set up testing infrastructure
  - [ ] Vitest for unit tests
  - [ ] Playwright for E2E tests
  - [ ] MSW for API mocking
  - [ ] Test coverage reporting

## Phase 2: State Management Refactor

- [ ] Implement useReducer for state management
  - [ ] Define state shape and actions
  - [ ] Create reducer function
  - [ ] Set up context for state sharing if needed
- [ ] Extract complex state logic into custom hooks
  - [ ] useDateFilterState
  - [ ] useDateValidation
  - [ ] useFilterEffects

## Phase 3: Component Decomposition

- [ ] Break down into smaller components:
  - [ ] `FilterModeToggle` - Toggle between absolute/relative modes
  - [ ] `AbsoluteDateInputs` - Date picker inputs for absolute dates
  - [ ] `RelativeDateInputs` - Inputs for relative date expressions
  - [ ] `FilterTypeSelector` - Dropdown for filter type (equals, before, after, etc.)
  - [ ] `FilterActions` - Apply/clear buttons
  - [ ] `DatePreview` - Shows current filter state in human-readable format

## Phase 4: Performance Optimizations

- [ ] Memoize expensive calculations
- [ ] Optimize re-renders with React.memo
- [ ] Use useCallback for event handlers
- [ ] Implement proper dependency arrays
- [ ] Consider virtualization for large date pickers

## Phase 5: Testing Strategy

### 5.1 Unit Testing

- [x] Fix TypeScript errors in existing test files
  - [x] Fix DateFilterModel type issues
  - [x] Add proper type declarations for test props
  - [x] Remove invalid properties (filterType)
- [ ] Test utility functions in isolation
  - [ ] Date parsing and validation
  - [ ] Filter logic
  - [ ] State management helpers
- [ ] Test individual components
  - [ ] FilterModeToggle
  - [ ] AbsoluteDateInputs
  - [ ] RelativeDateInputs
  - [ ] FilterTypeSelector
  - [ ] FilterActions
  - [ ] DatePreview

### 5.2 Integration Testing

- [ ] Test component interactions
  - [ ] Mode switching
  - [ ] Filter type changes
  - [ ] Date input validation
  - [ ] Filter application
- [ ] Test with AG Grid integration
  - [ ] Filter model updates
  - [ ] Grid refresh behavior
  - [ ] Column definition changes

### 5.3 E2E Testing with Playwright

- [ ] Set up AG Grid Test Harness
  - [ ] Create AGGridTestHarness component
  - [ ] Expose grid API for testing
  - [ ] Add test utilities
- [ ] Test Scenarios:
  - [ ] Filter by exact date
  - [ ] Filter by date range
  - [ ] Relative date filtering
  - [ ] Filter clearing
  - [ ] Multiple column filtering
  - [ ] Pagination with filters
  - [ ] Sorting with active filters

### 5.4 Test Data Management

- [ ] Create deterministic test data set
  - [ ] Fixed date ranges
  - [ ] Edge cases (leap years, month ends, etc.)
  - [ ] Different date formats
- [ ] Test data factory
  - [ ] Generate consistent test records
  - [ ] Support different test scenarios
  - [ ] Mock API responses

### 5.5 Performance Testing

- [ ] Measure filter performance
  - [ ] Small datasets (<100 rows)
  - [ ] Large datasets (>10,000 rows)
  - [ ] Multiple active filters
- [ ] Memory usage
- [ ] Render performance
- [ ] Filter application time

## Phase 6: Documentation & Examples

- [ ] Document component API
- [ ] Create usage examples
- [ ] Add JSDoc comments
- [ ] Document common patterns and gotchas

## Phase 7: Accessibility

- [ ] Add ARIA attributes
- [ ] Implement keyboard navigation
- [ ] Ensure proper focus management
- [ ] Test with screen readers

## Phase 8: Final Polish

- [ ] Code review
- [ ] Performance profiling
- [ ] Bundle size analysis
- [ ] Browser compatibility testing

## Current Progress

- **Pre-refactor state**: Tagged as `pre-refactor-01-swe-1`
- **Testing Infrastructure**: Basic unit tests exist, E2E tests need to be implemented
- **Current Status**:

  - [x] Fixed TypeScript errors in tests
  - [x] Improved test props typing
  - [x] Fixed DateFilterModel interface usage in tests
  - [ ] Improved test coverage in progress

- **Next Steps**:
  1. Complete unit tests for RelativeDateFilter component
  2. Set up Playwright for E2E testing
  3. Implement AG Grid Test Harness
  4. Create deterministic test data set

## Testing Implementation Plan

### 1. Core Filter Component Testing (In Progress)

- [ ] Basic Rendering
  - [ ] Test all filter elements render correctly
  - [ ] Test with different configurations (buttons, callbacks)
- [ ] Filter Model Handling
  - [ ] Test absolute mode initialization
  - [ ] Test relative mode initialization
  - [ ] Test empty/null model handling
- [ ] State Changes
  - [ ] Test model updates reflect in UI
  - [ ] Test UI changes update model

### 2. Filter Functionality Testing

- [ ] Absolute Date Testing
  - [ ] Test equals filter type
  - [ ] Test before/after filter types
  - [ ] Test in-range filter type
- [ ] Relative Date Testing
  - [ ] Test relative date expressions
  - [ ] Test expression validation
  - [ ] Test changing between expressions
- [ ] Filter Type Tests
  - [ ] Test switching between filter types
  - [ ] Test UI changes based on filter type

### 3. Interaction Testing

- [ ] User Input Handling
  - [ ] Test date picker inputs
  - [ ] Test expression inputs
  - [ ] Test validation feedback
- [ ] Button Interactions
  - [ ] Test apply button
  - [ ] Test clear button
  - [ ] Test cancel button
- [ ] Filter Toggle
  - [ ] Test expanding/collapsing filter
  - [ ] Test filter state persistence

### 4. AG Grid Integration

- [ ] AGGridTestHarness Usage
  - [ ] Test filter in grid context
  - [ ] Test row data filtering
- [ ] Filter Callbacks
  - [ ] Test filterChanged callbacks
  - [ ] Test filterModified callbacks
- [ ] Row Filtering
  - [ ] Test data filtering with absolute dates
  - [ ] Test data filtering with relative dates

### 5. Accessibility Testing

- [ ] Keyboard Navigation
  - [ ] Test tab order
  - [ ] Test keyboard shortcuts
- [ ] ARIA Attributes
  - [ ] Test proper labels
  - [ ] Test accessible descriptions
- [ ] Focus Management
  - [ ] Test focus handling on open/close
  - [ ] Test focus trap in modal components

## Testing Best Practices

### AG Grid Specific

- Use AG Grid's test utilities for reliable element selection
- Test both the API and DOM states
- Verify filter models match expected values
- Test with different grid configurations

### General Guidelines

- **Deterministic Tests**: Use fixed dates and controlled environments
- **Test Isolation**: Each test should be independent
- **Accessibility**: Include screen reader and keyboard navigation tests
- **Performance**: Monitor test execution time
- **Documentation**: Document test scenarios and coverage

## Notes

- Keep commits small and focused
- Write tests for new code
- Document decisions and trade-offs
- Keep the component working at each step
- Test in multiple browsers
- Monitor test flakiness
- Keep test data up-to-date with schema changes

---

_Last updated: 2025-05-18_
