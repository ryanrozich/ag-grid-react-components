# V2.0 Headless Components Migration Plan

## Current State Analysis

### CSS Files in Components (2,491 lines total)

1. **QuickFilterDropdown** - 642 lines (QuickFilterDropdown.module.css)
2. **FilterPresetManagerV2** - 464 lines (FilterPresetManager.module.css)
3. **FilterPresetActions** - 378 lines (FilterPresetActions.module.css)
4. **PresetSelector** - 214 lines (components/PresetSelector.module.css)
5. **DateInputs** - 194 lines (components/DateInputs.module.css)
6. **SavedFiltersDropdown** - 167 lines (SavedFiltersDropdown.module.css)
7. **ActiveFilters** - 107 lines (ActiveFilters.module.css)
8. **FilterActions** - 79 lines (components/FilterActions.module.css)
9. **FilterModeToggle** - 76 lines (components/FilterModeToggle.module.css)
10. **PresetMenu** - 72 lines (components/PresetMenu.module.css)
11. **FilterTypeSelector** - 63 lines (components/FilterTypeSelector.module.css)
12. **DateFilter** - 35 lines (DateFilter.module.css)

### Additional Styles in src/index.css

- `.ag-grid-date-filter` classes with Tailwind utilities
- Toggle buttons, inputs, filter buttons, error messages
- ~43 lines of component-specific styles

### Total CSS to Remove: ~2,534 lines

## Components Affected

1. **QuickFilterDropdown** - Dropdown for quick filter presets
2. **DateFilter/RelativeDateFilter** - Date filtering components
3. **ActiveFilters** - Display of active filters
4. **FilterPresetManagerV2** - Preset management
5. **FilterPresetActions** - Preset action buttons
6. **SavedFiltersDropdown** - Saved filters dropdown
7. All sub-components of the above

## Migration Strategy

### Phase 1: API Design (Week 1)

- Design consistent API pattern for all components
- Choose between:
  - Option A: `classNames` object prop
  - Option B: Render props for each element
  - Option C: Compound components with context
  - Option D: Hybrid approach

### Phase 2: Component Refactoring (Weeks 2-3)

- Start with leaf components (smallest first)
- Work up to complex components
- Maintain backward compatibility with deprecation warnings

### Phase 3: Demo Migration (Week 4)

- Move all CSS to demo application
- Create example implementations for:
  - Tailwind CSS
  - CSS Modules
  - Styled Components
  - Plain CSS

### Phase 4: Documentation (Week 5)

- Migration guide with before/after examples
- Styling cookbook
- Best practices guide
- Update all component docs

### Phase 5: Testing & Release (Week 6)

- Update all tests
- E2E testing
- Beta release
- Gather feedback

## Proposed API Design

### Option A: ClassNames Object (Recommended)

```tsx
interface QuickFilterDropdownProps {
  // ... other props
  classNames?: {
    container?: string;
    trigger?: string;
    triggerActive?: string;
    dropdown?: string;
    dropdownOpen?: string;
    searchInput?: string;
    optionsList?: string;
    option?: string;
    optionSelected?: string;
    optionHighlighted?: string;
    emptyState?: string;
    divider?: string;
    // ... etc
  };
}
```

**Pros:**

- Easy to implement
- Familiar pattern (used by React Select, etc.)
- Good TypeScript support
- Allows partial styling

**Cons:**

- Can get verbose for complex components
- Limited flexibility for custom structure

### Option B: Render Props

```tsx
interface QuickFilterDropdownProps {
  // ... other props
  renderTrigger?: (props: TriggerProps) => ReactNode;
  renderOption?: (props: OptionProps) => ReactNode;
  renderEmptyState?: () => ReactNode;
  // ... etc
}
```

**Pros:**

- Maximum flexibility
- Full control over structure
- Can optimize rendering

**Cons:**

- More complex to implement
- Steeper learning curve
- Can break component logic if misused

### Option C: Compound Components

```tsx
<QuickFilterDropdown>
  <QuickFilterDropdown.Trigger className="my-trigger">Select Filter</QuickFilterDropdown.Trigger>
  <QuickFilterDropdown.Panel className="my-panel">
    <QuickFilterDropdown.Option value="1">Option 1</QuickFilterDropdown.Option>
  </QuickFilterDropdown.Panel>
</QuickFilterDropdown>
```

**Pros:**

- Most flexible
- Composable
- Natural React patterns

**Cons:**

- Complete rewrite needed
- Breaking change for all users
- More complex implementation

### Option D: Hybrid Approach

- Use `classNames` by default
- Add render props for advanced customization
- Provide unstyled primitive components

## Implementation Order

1. **DateFilter Components** (Simplest)

   - FilterModeToggle
   - FilterTypeSelector
   - FilterActions
   - DateInputs
   - DateFilter (parent)

2. **ActiveFilters** (Medium complexity)

   - Single component
   - Clear styling patterns

3. **QuickFilterDropdown** (Complex)

   - Most CSS to remove
   - Portal rendering
   - Keyboard navigation

4. **FilterPreset Components** (Most complex)
   - FilterPresetManagerV2
   - FilterPresetActions
   - SavedFiltersDropdown
   - Multiple sub-components

## Breaking Changes

### Before (v1.x)

```tsx
import { QuickFilterDropdown } from "ag-grid-react-components";
// Styles included automatically

<QuickFilterDropdown api={gridApi} options={options} />;
```

### After (v2.0)

```tsx
import { QuickFilterDropdown } from "ag-grid-react-components";
import "my-app/styles/quick-filter-dropdown.css"; // User provides styles

<QuickFilterDropdown
  api={gridApi}
  options={options}
  classNames={{
    trigger: "my-trigger-button",
    dropdown: "my-dropdown-panel",
  }}
/>;
```

## Migration Path

### 1. Deprecation Warnings (v1.9)

- Add console warnings when CSS is used
- Provide migration guide link
- Keep existing CSS but mark deprecated

### 2. Opt-in Headless (v1.10)

- Add `unstyled` prop to components
- When true, skip CSS module imports
- Allow gradual migration

### 3. Full Headless (v2.0)

- Remove all CSS files
- Remove style imports
- Require className props

## Style Migration Examples

### Example: Migrating QuickFilterDropdown

#### Current (with CSS modules)

```tsx
// No styling needed - included automatically
<QuickFilterDropdown api={gridApi} options={options} />
```

#### Tailwind Migration

```tsx
<QuickFilterDropdown
  api={gridApi}
  options={options}
  classNames={{
    trigger: "inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50",
    dropdown: "absolute mt-2 bg-white border border-gray-200 rounded-lg shadow-lg",
    option: "px-4 py-2 hover:bg-gray-100 cursor-pointer",
    optionSelected: "bg-blue-50 text-blue-700",
  }}
/>
```

#### CSS Modules Migration

```css
/* QuickFilter.module.css */
.trigger {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
}

.trigger:hover {
  background: #f9fafb;
}
```

```tsx
import styles from "./QuickFilter.module.css";

<QuickFilterDropdown
  api={gridApi}
  options={options}
  classNames={{
    trigger: styles.trigger,
    dropdown: styles.dropdown,
    option: styles.option,
  }}
/>;
```

## Success Criteria

1. **Zero CSS in components** - No .css files, no style imports
2. **Full user control** - Users can style every element
3. **TypeScript support** - Full typing for className props
4. **Documentation** - Complete migration guide
5. **Examples** - Working demos with multiple styling approaches
6. **Performance** - Smaller bundle size
7. **Accessibility** - Maintain ARIA attributes

## Risks and Mitigations

### Risk 1: User Frustration

**Mitigation:**

- Provide complete style templates
- Create interactive migration tool
- Offer community support

### Risk 2: Breaking Existing Apps

**Mitigation:**

- Clear deprecation path
- Codemod for automatic migration
- Extended v1.x support

### Risk 3: Increased Complexity

**Mitigation:**

- Excellent documentation
- Video tutorials
- Common patterns library

## Timeline

- **Week 1**: API design and approval
- **Week 2-3**: Component implementation
- **Week 4**: Demo migration
- **Week 5**: Documentation
- **Week 6**: Testing and beta
- **Week 7-8**: Community feedback
- **Week 9**: v2.0 release

## Next Steps

1. Review and approve API design
2. Create proof of concept with DateFilter
3. Get community feedback
4. Begin implementation
