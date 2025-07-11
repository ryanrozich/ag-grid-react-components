# V2.0 API Design (REVISED) - Following Headless UI Pattern

## Executive Summary

After reviewing Headless UI's approach, I'm revising the recommendation to follow their pattern of **direct className props** with **data attributes** for state styling, rather than a classNames object.

## Revised API Pattern (Following Headless UI)

### Example: DateFilter Component

```tsx
// Component implementation
export const DateFilter = ({ children, ...props }) => {
  const [mode, setMode] = useState<"relative" | "absolute">("relative");
  const [isValid, setIsValid] = useState(true);

  return (
    <DateFilter.Root {...props}>
      <DateFilter.ModeToggle>
        <DateFilter.ModeButton active={mode === "relative"} onClick={() => setMode("relative")}>
          Relative
        </DateFilter.ModeButton>
        <DateFilter.ModeButton active={mode === "absolute"} onClick={() => setMode("absolute")}>
          Absolute
        </DateFilter.ModeButton>
      </DateFilter.ModeToggle>

      {mode === "relative" ? <DateFilter.RelativeInput /> : <DateFilter.AbsoluteInputs />}

      <DateFilter.Actions>
        <DateFilter.ApplyButton />
        <DateFilter.ResetButton />
      </DateFilter.Actions>
    </DateFilter.Root>
  );
};

// Sub-components
DateFilter.Root = ({ className, children, ...props }) => (
  <div className={className} data-testid="date-filter" {...props}>
    {children}
  </div>
);

DateFilter.ModeButton = ({ active, className, children, ...props }) => (
  <button className={className} data-active={active} aria-pressed={active} {...props}>
    {children}
  </button>
);

DateFilter.RelativeInput = ({ className, ...props }) => {
  const { value, onChange, isValid } = useDateFilterContext();

  return <input className={className} data-invalid={!isValid} value={value} onChange={onChange} placeholder="e.g., -7d, today, next month" {...props} />;
};
```

### Usage Examples

#### With Tailwind CSS (Recommended)

```tsx
<DateFilter>
  <DateFilter.Root className="space-y-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
    <DateFilter.ModeToggle className="flex gap-2">
      <DateFilter.ModeButton className="px-3 py-1 rounded data-[active=true]:bg-blue-500 data-[active=true]:text-white data-[active=false]:bg-gray-200 hover:bg-gray-300">Relative</DateFilter.ModeButton>
      <DateFilter.ModeButton className="px-3 py-1 rounded data-[active=true]:bg-blue-500 data-[active=true]:text-white data-[active=false]:bg-gray-200 hover:bg-gray-300">Absolute</DateFilter.ModeButton>
    </DateFilter.ModeToggle>

    <DateFilter.RelativeInput className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500 data-[invalid=true]:border-red-500" />

    <DateFilter.Actions className="flex gap-2">
      <DateFilter.ApplyButton className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded">Apply</DateFilter.ApplyButton>
      <DateFilter.ResetButton className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded">Reset</DateFilter.ResetButton>
    </DateFilter.Actions>
  </DateFilter.Root>
</DateFilter>
```

#### With Render Props (When Needed)

```tsx
<DateFilter>
  {({ isValid, hasChanges }) => (
    <DateFilter.Root className="space-y-4">
      <DateFilter.RelativeInput className={clsx("w-full px-3 py-2 border rounded", isValid ? "border-gray-300" : "border-red-500")} />

      <DateFilter.ApplyButton className={clsx("px-4 py-2 rounded", hasChanges ? "bg-blue-500 hover:bg-blue-600 text-white" : "bg-gray-300 cursor-not-allowed")} disabled={!hasChanges}>
        Apply
      </DateFilter.ApplyButton>
    </DateFilter.Root>
  )}
</DateFilter>
```

#### With CSS (Using Data Attributes)

```css
/* styles.css */
[data-testid="date-filter"] {
  padding: 1rem;
  background: white;
  border-radius: 0.5rem;
}

[data-testid="date-filter"] button[data-active="true"] {
  background: #3b82f6;
  color: white;
}

[data-testid="date-filter"] button[data-active="false"] {
  background: #e5e7eb;
}

[data-testid="date-filter"] input[data-invalid="true"] {
  border-color: #ef4444;
}
```

## QuickFilterDropdown Example

```tsx
// Component structure
<QuickFilterDropdown>
  <QuickFilterDropdown.Trigger className="...">
    {selectedOption?.label || 'Select filter...'}
  </QuickFilterDropdown.Trigger>

  <QuickFilterDropdown.Panel className="...">
    <QuickFilterDropdown.Search className="..." />

    <QuickFilterDropdown.Options>
      {options.map(option => (
        <QuickFilterDropdown.Option
          key={option.id}
          value={option.id}
          className="..."
        >
          {({ selected, active }) => (
            <>
              <span>{option.label}</span>
              {selected && <CheckIcon />}
            </>
          )}
        </QuickFilterDropdown.Option>
      ))}
    </QuickFilterDropdown.Options>
  </QuickFilterDropdown.Panel>
</QuickFilterDropdown>

// Or simpler usage without render props
<QuickFilterDropdown>
  <QuickFilterDropdown.Trigger className="flex items-center gap-2 px-4 py-2 bg-white border rounded-md hover:bg-gray-50 data-[open=true]:ring-2 data-[open=true]:ring-blue-500">
    Select filter
    <ChevronDownIcon className="w-4 h-4" />
  </QuickFilterDropdown.Trigger>

  <QuickFilterDropdown.Panel className="absolute mt-2 bg-white border rounded-lg shadow-lg">
    <QuickFilterDropdown.Option
      value="today"
      className="px-4 py-2 data-[active=true]:bg-gray-100 data-[selected=true]:font-semibold"
    >
      Today
    </QuickFilterDropdown.Option>
  </QuickFilterDropdown.Panel>
</QuickFilterDropdown>
```

## Benefits of Headless UI Pattern

1. **Natural with Tailwind** - Data attribute modifiers work perfectly with Tailwind
2. **Flexible** - Can use simple className or render props as needed
3. **Composable** - Build complex UIs from simple primitives
4. **Type-safe** - Each component has its own props interface
5. **Familiar** - Developers already know this pattern from Headless UI/Radix

## Data Attributes We'll Provide

### Common States

- `data-active` - For active/selected states
- `data-disabled` - For disabled states
- `data-open` - For open/closed states (dropdowns)
- `data-invalid` - For validation states
- `data-focused` - For focus states
- `data-highlighted` - For keyboard navigation

### Component-Specific

- DateFilter: `data-mode="relative|absolute"`
- QuickFilterDropdown: `data-selected`, `data-highlighted`
- ActiveFilters: `data-empty`

## Migration Strategy Update

### Before (v1.x - Current)

```tsx
import { DateFilter } from "ag-grid-react-components";
// CSS included automatically via CSS modules

<DateFilter value={value} onChange={onChange} />;
```

### After (v2.0 - Headless)

```tsx
import { DateFilter } from "ag-grid-react-components";
// No CSS included - user controls all styling

<DateFilter value={value} onChange={onChange}>
  <DateFilter.Root className="p-4 border rounded">
    <DateFilter.RelativeInput className="w-full px-3 py-2 border rounded" />
    <DateFilter.ApplyButton className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Apply</DateFilter.ApplyButton>
  </DateFilter.Root>
</DateFilter>;
```

### Transition Period (v1.9)

```tsx
// Opt-in to headless mode
<DateFilter unstyled>
  {/* Use new compound component API */}
</DateFilter>

// Or continue using old API with deprecation warning
<DateFilter /> // Console warning about v2.0 changes
```

## Implementation Approach

1. **Create compound components** using React Context
2. **Forward all refs** appropriately
3. **Spread all props** to allow full customization
4. **Add data attributes** for all states
5. **Support both patterns**:
   - Simple className for basic use
   - Render props for advanced use

## Example Implementation

```tsx
// DateFilter/index.tsx
const DateFilterContext = createContext<DateFilterContextValue>();

export const DateFilter = ({ children, value, onChange }) => {
  const contextValue = useMemo(
    () => ({
      value,
      onChange,
      // ... other shared state
    }),
    [value, onChange],
  );

  return <DateFilterContext.Provider value={contextValue}>{children}</DateFilterContext.Provider>;
};

// Sub-components
DateFilter.Root = forwardRef(({ className, ...props }, ref) => <div ref={ref} className={className} data-testid="date-filter" {...props} />);

DateFilter.RelativeInput = forwardRef(({ className, ...props }, ref) => {
  const { value, onChange, isValid } = useContext(DateFilterContext);

  return <input ref={ref} className={className} value={value} onChange={onChange} data-invalid={!isValid} aria-invalid={!isValid} {...props} />;
});

// Export everything
DateFilter.Root.displayName = "DateFilter.Root";
DateFilter.RelativeInput.displayName = "DateFilter.RelativeInput";
```

## Decision

**Use Headless UI pattern** instead of classNames object:

- Direct className props on each element
- Data attributes for state-based styling
- Optional render props for complex cases
- Compound components for composition

This aligns with modern best practices and provides the best developer experience.
