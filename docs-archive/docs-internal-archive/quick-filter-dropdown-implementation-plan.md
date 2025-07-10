# Quick Filter Dropdown Component Implementation Plan

## Overview

Create a production-grade, reusable AG Grid quick filter dropdown component that meets the same quality standards as the core DateFilter components.

## Design Principles

- [ ] Follow the established component architecture patterns from DateFilter
- [ ] Use CSS modules for all styling (zero inline styles)
- [ ] Full TypeScript type safety with no `any` types
- [ ] Configurable and reusable across different AG Grid implementations
- [ ] WCAG 2.1 AA compliant accessibility
- [ ] Performance optimized with proper memoization
- [ ] Comprehensive test coverage (>95%)

## Implementation Checklist

### 1. Component Architecture Design

- [ ] Create component structure following the modular pattern:
  ```text
  src/components/QuickFilterDropdown/
  ├── index.tsx                    # Main component with AG Grid integration
  ├── QuickFilterDropdown.module.css
  ├── QuickFilterDropdown.test.tsx
  ├── QuickFilterDropdown.stories.tsx
  ├── types.ts                     # TypeScript interfaces
  └── utils/
      ├── filterModelBuilder.ts   # Build AG Grid filter models
      └── filterModelBuilder.test.ts
  ```

### 2. TypeScript Interface Design

- [ ] Define comprehensive interfaces:

  ```typescript
  interface QuickFilterOption {
    id: string;
    label: string;
    description?: string;
    filterModel: any; // Will be properly typed
    icon?: React.ReactNode;
  }

  interface QuickFilterDropdownProps {
    api: GridApi;
    columnId: string;
    options: QuickFilterOption[];
    placeholder?: string;
    className?: string;
    onFilterChange?: (option: QuickFilterOption | null) => void;
    position?: "bottom-left" | "bottom-right" | "top-left" | "top-right";
  }
  ```

### 3. Core Component Implementation

- [ ] Implement dropdown trigger button with proper ARIA attributes
- [ ] Create dropdown panel with:
  - [ ] Smooth open/close animations
  - [ ] Click-outside-to-close behavior
  - [ ] Escape key to close
  - [ ] Proper z-index management
- [ ] Add keyboard navigation:
  - [ ] Arrow keys to navigate options
  - [ ] Enter/Space to select
  - [ ] Home/End for first/last option
  - [ ] Type-ahead search
- [ ] Implement proper focus management:
  - [ ] Focus trap when open
  - [ ] Return focus to trigger on close
  - [ ] Visual focus indicators

### 4. AG Grid Integration

- [ ] Create flexible filter model builder supporting:
  - [ ] Date filters with relative expressions
  - [ ] Text filters
  - [ ] Number filters
  - [ ] Custom filter models
- [ ] Handle different column types automatically
- [ ] Support both Community and Enterprise editions
- [ ] Implement proper cleanup on unmount

### 5. Styling with CSS Modules

- [ ] Create comprehensive CSS module with:
  ```css
  /* QuickFilterDropdown.module.css */
  .container {
    /* Positioning context */
  }
  .trigger {
    /* Button styling */
  }
  .triggerActive {
    /* Active state */
  }
  .dropdown {
    /* Panel container */
  }
  .dropdownOpen {
    /* Open state */
  }
  .optionsList {
    /* Options container */
  }
  .option {
    /* Individual option */
  }
  .optionActive {
    /* Hover/focus state */
  }
  .optionSelected {
    /* Selected state */
  }
  .optionIcon {
    /* Icon container */
  }
  .optionContent {
    /* Text content */
  }
  .optionLabel {
    /* Primary text */
  }
  .optionDescription {
    /* Secondary text */
  }
  ```
- [ ] Support theming through CSS custom properties
- [ ] Ensure responsive design
- [ ] Add smooth transitions and animations

### 6. Date-Specific Quick Filters

- [ ] Implement standard date filter presets:
  - [ ] Today
  - [ ] Yesterday
  - [ ] This Week
  - [ ] Last Week
  - [ ] This Month
  - [ ] Last Month
  - [ ] This Quarter
  - [ ] Last Quarter
  - [ ] This Year
  - [ ] Last Year
  - [ ] Last 7 Days
  - [ ] Last 30 Days
  - [ ] Custom Range (opens DateFilter)

### 7. State Management

- [ ] Track current active filter
- [ ] Sync with AG Grid filter state
- [ ] Handle external filter changes
- [ ] Persist selection in URL (optional)

### 8. Error Handling

- [ ] Validate filter options on mount
- [ ] Handle invalid column IDs gracefully
- [ ] Provide meaningful error messages
- [ ] Implement error boundaries

### 9. Performance Optimization

- [ ] Memoize filter model generation
- [ ] Use React.memo for option components
- [ ] Lazy render dropdown content
- [ ] Optimize re-renders with useCallback

### 10. Testing Strategy

- [ ] Unit tests for all utilities
- [ ] Component testing with React Testing Library
- [ ] Integration tests with AG Grid
- [ ] Accessibility testing with jest-axe
- [ ] Visual regression tests
- [ ] Performance benchmarks

### 11. Documentation

- [ ] Comprehensive JSDoc comments
- [ ] README with usage examples
- [ ] Storybook stories for all variants
- [ ] API documentation
- [ ] Migration guide from buttons

### 12. Demo Integration

- [ ] Replace existing broken buttons in demo
- [ ] Show multiple use cases:
  - [ ] Date column filtering
  - [ ] Text column filtering
  - [ ] Custom filter models
- [ ] Demonstrate keyboard navigation
- [ ] Show accessibility features

## Quality Checklist

### Code Quality

- [ ] Zero ESLint warnings
- [ ] Zero TypeScript errors
- [ ] Passes all Trunk checks
- [ ] No console.logs or debugger statements
- [ ] Proper error boundaries
- [ ] Memory leak prevention

### Accessibility

- [ ] ARIA labels and descriptions
- [ ] Keyboard fully navigable
- [ ] Screen reader announcements
- [ ] High contrast mode support
- [ ] Focus indicators meet WCAG standards

### Performance

- [ ] Initial render < 16ms
- [ ] Interaction response < 100ms
- [ ] No unnecessary re-renders
- [ ] Efficient DOM updates

### Browser Compatibility

- [ ] Chrome/Edge (latest 2 versions)
- [ ] Firefox (latest 2 versions)
- [ ] Safari (latest 2 versions)
- [ ] Mobile browsers

## Implementation Order

1. **Phase 1: Core Structure** (2 hours)

   - Set up component structure
   - Define TypeScript interfaces
   - Create basic dropdown UI

2. **Phase 2: Styling** (2 hours)

   - Implement CSS modules
   - Add animations and transitions
   - Ensure responsive design

3. **Phase 3: AG Grid Integration** (3 hours)

   - Build filter model utilities
   - Connect to AG Grid API
   - Handle state synchronization

4. **Phase 4: Accessibility** (2 hours)

   - Add ARIA attributes
   - Implement keyboard navigation
   - Test with screen readers

5. **Phase 5: Testing** (3 hours)

   - Write comprehensive tests
   - Add Storybook stories
   - Performance benchmarks

6. **Phase 6: Demo Integration** (1 hour)
   - Replace broken buttons
   - Add multiple examples
   - Update documentation

## Success Criteria

- [ ] Component works flawlessly in demo
- [ ] Zero runtime errors
- [ ] Passes all quality checks
- [ ] Professional appearance matching AG Grid
- [ ] Would receive "Approved" in principal engineer code review
- [ ] Ready for production use

## Notes

- Study the DateFilter component patterns for consistency
- Use the same testing utilities and patterns
- Follow the established CSS module naming conventions
- Ensure backward compatibility considerations
- Consider future extensibility for custom filter types
