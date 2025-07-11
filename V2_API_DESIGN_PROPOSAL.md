# V2.0 Headless Components API Design Proposal

## Executive Summary

We need to choose an API pattern for v2.0 headless components. After analysis, I recommend **Option A: ClassNames Object** with optional render prop overrides for advanced use cases.

## Detailed API Options

### Option A: ClassNames Object (RECOMMENDED) ✅

```tsx
interface HeadlessComponentProps {
  // Behavioral props
  value?: string;
  onChange?: (value: string) => void;

  // Styling props
  className?: string; // Container class
  classNames?: {
    container?: string;
    trigger?: string;
    panel?: string;
    item?: string;
    // ... specific to each component
  };

  // Optional render prop overrides
  renderTrigger?: (props: TriggerRenderProps) => ReactNode;
}
```

#### Implementation Example: DateFilter

```tsx
export const DateFilter = ({ className, classNames = {}, value, onChange, ...props }) => {
  return (
    <div className={cn(className, classNames.container)} data-testid="date-filter">
      <FilterModeToggle className={classNames.modeToggle} active={mode === "relative"} onClick={toggleMode} />

      {mode === "relative" ? <input className={classNames.relativeInput} value={relativeValue} onChange={handleRelativeChange} placeholder="e.g., -7d, today, next month" /> : <DateInputs className={classNames.dateInputs} startDate={startDate} endDate={endDate} onChange={handleDateChange} />}

      <div className={classNames.actions}>
        <button className={classNames.applyButton} onClick={handleApply}>
          Apply
        </button>
        <button className={classNames.resetButton} onClick={handleReset}>
          Reset
        </button>
      </div>
    </div>
  );
};
```

#### Usage Examples

**Basic (user provides all styles):**

```tsx
<DateFilter
  className="my-date-filter"
  classNames={{
    container: "flex flex-col gap-4 p-4 bg-white rounded-lg shadow",
    modeToggle: "flex gap-2",
    relativeInput: "px-3 py-2 border rounded focus:ring-2",
    actions: "flex gap-2 mt-4",
    applyButton: "px-4 py-2 bg-blue-500 text-white rounded",
    resetButton: "px-4 py-2 bg-gray-200 rounded",
  }}
/>
```

**With Style System:**

```tsx
// styles/components.ts
export const dateFilterStyles = {
  container: "date-filter-container",
  modeToggle: "date-filter-toggle",
  relativeInput: "date-filter-input",
  actions: "date-filter-actions",
  applyButton: "btn btn-primary",
  resetButton: "btn btn-secondary",
};

// Component usage
<DateFilter classNames={dateFilterStyles} />;
```

**With CSS Modules:**

```tsx
import styles from "./DateFilter.module.css";

<DateFilter classNames={styles} />;
```

### Why ClassNames is the Best Choice

#### 1. **Simplicity**

- Easy to understand and implement
- Familiar pattern (React Select, MUI, etc.)
- No complex render prop logic

#### 2. **Flexibility**

- Works with any CSS solution
- Allows partial styling
- Can be extended with render props when needed

#### 3. **Type Safety**

```tsx
interface DateFilterClassNames {
  container?: string;
  modeToggle?: string;
  relativeInput?: string;
  dateInputs?: string;
  actions?: string;
  applyButton?: string;
  resetButton?: string;
}

// Full IntelliSense support
```

#### 4. **Performance**

- No extra re-renders from render props
- Simple string props
- Tree-shakeable styles

#### 5. **Migration Path**

```tsx
// v1.x (current)
<DateFilter /> // Styles included

// v1.9 (deprecation)
<DateFilter unstyled classNames={styles} /> // Opt-in

// v2.0 (headless)
<DateFilter classNames={styles} /> // Required
```

## Component-Specific APIs

### DateFilter

```tsx
interface DateFilterClassNames {
  container?: string;
  modeToggle?: string;
  modeButton?: string;
  modeButtonActive?: string;
  relativeSection?: string;
  relativeInput?: string;
  relativeHint?: string;
  absoluteSection?: string;
  dateInputs?: string;
  dateInput?: string;
  dateLabel?: string;
  actions?: string;
  applyButton?: string;
  resetButton?: string;
  errorMessage?: string;
}
```

### QuickFilterDropdown

```tsx
interface QuickFilterDropdownClassNames {
  container?: string;
  trigger?: string;
  triggerActive?: string;
  triggerIcon?: string;
  dropdown?: string;
  dropdownOpen?: string;
  searchSection?: string;
  searchInput?: string;
  optionsList?: string;
  optionGroup?: string;
  optionGroupLabel?: string;
  option?: string;
  optionActive?: string;
  optionSelected?: string;
  optionDisabled?: string;
  optionIcon?: string;
  optionContent?: string;
  optionLabel?: string;
  optionDescription?: string;
  divider?: string;
  emptyState?: string;
  loadingState?: string;
}
```

### ActiveFilters

```tsx
interface ActiveFiltersClassNames {
  container?: string;
  filterList?: string;
  filterItem?: string;
  filterLabel?: string;
  filterValue?: string;
  filterRemove?: string;
  clearAll?: string;
  emptyState?: string;
}
```

## Styling Cookbook

### 1. Tailwind CSS Template

```tsx
const tailwindStyles = {
  // Modern card style
  container: "bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4",

  // Interactive elements
  trigger: "px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-md transition-colors",

  // Form inputs
  input: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700",

  // Buttons
  primaryButton: "px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors",
  secondaryButton: "px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-md transition-colors",
};
```

### 2. CSS Modules Template

```css
/* DateFilter.module.css */
.container {
  background: var(--surface);
  border-radius: var(--radius);
  padding: var(--spacing-4);
}

.input {
  width: 100%;
  padding: var(--spacing-2) var(--spacing-3);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
}

.input:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px var(--primary-alpha);
}
```

### 3. Styled Components Template

```tsx
const StyledDateFilter = {
  container: styled.div`
    background: ${(props) => props.theme.surface};
    border-radius: ${(props) => props.theme.radius};
    padding: ${(props) => props.theme.spacing(4)};
  `,

  input: styled.input`
    width: 100%;
    padding: ${(props) => props.theme.spacing(2, 3)};
    border: 1px solid ${(props) => props.theme.border};

    &:focus {
      outline: none;
      border-color: ${(props) => props.theme.primary};
    }
  `,
};
```

## Advanced Patterns

### Conditional Styling

```tsx
<DateFilter
  classNames={{
    applyButton: cn("px-4 py-2 rounded transition-colors", hasChanges ? "bg-blue-500 hover:bg-blue-600 text-white" : "bg-gray-300 cursor-not-allowed text-gray-500"),
  }}
/>
```

### Variant Systems

```tsx
const createDateFilterStyles = (variant: "default" | "compact" | "inline") => ({
  container: cn("date-filter", {
    "p-4 rounded-lg shadow": variant === "default",
    "p-2": variant === "compact",
    "inline-flex items-center gap-2": variant === "inline",
  }),
  // ... other styles based on variant
});

<DateFilter classNames={createDateFilterStyles("compact")} />;
```

### Composition

```tsx
// Compose multiple style sources
const dateFilterStyles = {
  ...baseStyles.dateFilter,
  ...themeStyles.dateFilter,
  ...customStyles,
};
```

## Testing Strategy

### 1. Visual Regression Tests

```tsx
// Create stories with different style systems
export const TailwindStyled = () => <DateFilter classNames={tailwindStyles} />;

export const CSSModulesStyled = () => <DateFilter classNames={cssModuleStyles} />;

export const Unstyled = () => <DateFilter classNames={{}} />;
```

### 2. Accessibility Tests

```tsx
test("maintains accessibility without styles", () => {
  render(<DateFilter classNames={{}} />);

  // Ensure ARIA attributes work
  expect(screen.getByRole("button", { name: "Apply" })).toBeInTheDocument();
  expect(screen.getByLabelText("Start date")).toBeInTheDocument();
});
```

### 3. Style Application Tests

```tsx
test("applies custom classNames", () => {
  const classNames = {
    container: "custom-container",
    applyButton: "custom-button",
  };

  render(<DateFilter classNames={classNames} />);

  expect(screen.getByTestId("date-filter")).toHaveClass("custom-container");
  expect(screen.getByText("Apply")).toHaveClass("custom-button");
});
```

## Implementation Checklist

- [ ] Remove all CSS imports from components
- [ ] Delete all .module.css files
- [ ] Add classNames prop to all components
- [ ] Add className prop for root element
- [ ] Ensure all elements can be styled
- [ ] Add data-testid attributes
- [ ] Forward refs where appropriate
- [ ] Update TypeScript interfaces
- [ ] Create migration guide
- [ ] Build style templates
- [ ] Update documentation
- [ ] Add deprecation warnings (v1.9)
- [ ] Create codemods

## Decision

**Recommendation: Proceed with ClassNames Object API**

This provides the best balance of:

- Simplicity for users
- Flexibility for styling
- Ease of implementation
- Clear migration path
- Industry-standard patterns

The classNames approach is proven by popular libraries like React Select, Headless UI, and others. It's intuitive, performant, and provides excellent developer experience.
