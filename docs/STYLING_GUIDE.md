# Styling Guide for Headless Components

This guide shows you how to style the AG Grid React Components v2.0 using the headless UI pattern.

## Quick Start with Tailwind CSS

The fastest way to style these components is with Tailwind CSS:

```tsx
import { QuickFilterDropdown } from "ag-grid-react-components";

<QuickFilterDropdown>
  <QuickFilterDropdown.Trigger className="px-4 py-2 bg-white border rounded-md hover:bg-gray-50">Select Filter</QuickFilterDropdown.Trigger>
  <QuickFilterDropdown.Panel className="absolute mt-2 bg-white border rounded-lg shadow-lg">
    <QuickFilterDropdown.Option className="px-4 py-2 hover:bg-gray-100">Last 7 days</QuickFilterDropdown.Option>
  </QuickFilterDropdown.Panel>
</QuickFilterDropdown>;
```

## Understanding Headless Components

Headless components provide **behavior without styles**. You get:

- ✅ Full accessibility (ARIA attributes, keyboard navigation)
- ✅ State management (open/closed, selected, etc.)
- ✅ Event handling
- ❌ No CSS or visual styling

You provide all visual styling through the `className` prop on each component.

## Data Attributes for State Styling

Components expose their state through data attributes:

```tsx
// Component renders:
<button data-active="true" data-disabled="false">...</button>

// Style with Tailwind:
<button className="data-[active]:bg-blue-500 data-[disabled]:opacity-50">

// Or with CSS:
button[data-active="true"] {
  background: #3b82f6;
}
```

### Common Data Attributes

| Attribute          | Description               | Example                          |
| ------------------ | ------------------------- | -------------------------------- |
| `data-active`      | Element is active/current | `data-[active]:bg-blue-500`      |
| `data-selected`    | Element is selected       | `data-[selected]:font-bold`      |
| `data-disabled`    | Element is disabled       | `data-[disabled]:opacity-50`     |
| `data-open`        | Dropdown/panel is open    | `data-[open]:rotate-180`         |
| `data-invalid`     | Input validation failed   | `data-[invalid]:border-red-500`  |
| `data-highlighted` | Keyboard navigation       | `data-[highlighted]:bg-gray-100` |

## Styling Methods

### 1. Tailwind CSS (Recommended)

Tailwind's data attribute modifiers work perfectly with headless components:

```tsx
<DateFilter>
  <DateFilter.Root className="space-y-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
    {/* Mode Toggle */}
    <DateFilter.ModeToggle className="flex gap-1 p-1 bg-gray-100 dark:bg-gray-700 rounded">
      <DateFilter.ModeButton
        mode="relative"
        className="
          flex-1 px-3 py-1 rounded text-sm font-medium transition-colors
          data-[active]:bg-white data-[active]:dark:bg-gray-600 
          data-[active]:shadow-sm
          data-[inactive]:text-gray-600 data-[inactive]:dark:text-gray-400
        "
      >
        Relative
      </DateFilter.ModeButton>
    </DateFilter.ModeToggle>

    {/* Input with validation states */}
    <DateFilter.RelativeInput
      className="
        w-full px-3 py-2 border rounded-md 
        bg-white dark:bg-gray-900
        border-gray-300 dark:border-gray-600
        focus:ring-2 focus:ring-blue-500 focus:border-blue-500
        data-[invalid]:border-red-500 data-[invalid]:focus:ring-red-500
        placeholder:text-gray-400
      "
      placeholder="e.g., -7d, today, next month"
    />

    {/* Buttons */}
    <div className="flex gap-2">
      <DateFilter.ApplyButton
        className="
        flex-1 px-4 py-2 rounded font-medium
        bg-blue-600 hover:bg-blue-700 text-white
        data-[disabled]:bg-gray-300 data-[disabled]:cursor-not-allowed
        transition-colors
      "
      >
        Apply
      </DateFilter.ApplyButton>
    </div>
  </DateFilter.Root>
</DateFilter>
```

### 2. CSS Modules

Create component-specific styles:

```css
/* DateFilter.module.css */
.root {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.modeButton {
  flex: 1;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  background: transparent;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.2s;
}

.modeButton[data-active="true"] {
  background: white;
  color: #111827;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.input {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  transition: all 0.15s;
}

.input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.input[data-invalid="true"] {
  border-color: #ef4444;
  background-color: #fef2f2;
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
  .root {
    background: #1f2937;
    color: #f3f4f6;
  }

  .modeButton[data-active="true"] {
    background: #374151;
  }

  .input {
    background: #111827;
    border-color: #374151;
    color: #f3f4f6;
  }
}
```

```tsx
import styles from "./DateFilter.module.css";

<DateFilter>
  <DateFilter.Root className={styles.root}>
    <DateFilter.ModeButton className={styles.modeButton}>Relative</DateFilter.ModeButton>
    <DateFilter.RelativeInput className={styles.input} />
  </DateFilter.Root>
</DateFilter>;
```

### 3. Styled Components / Emotion

```tsx
import styled from "styled-components";
import { DateFilter } from "ag-grid-react-components";

const StyledRoot = styled(DateFilter.Root)`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.md};
  padding: ${(props) => props.theme.spacing.lg};
  background: ${(props) => props.theme.colors.surface};
  border-radius: ${(props) => props.theme.radii.lg};
  box-shadow: ${(props) => props.theme.shadows.sm};
`;

const StyledInput = styled(DateFilter.RelativeInput)`
  width: 100%;
  padding: ${(props) => props.theme.spacing.sm} ${(props) => props.theme.spacing.md};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: ${(props) => props.theme.radii.md};
  font-size: ${(props) => props.theme.fontSizes.sm};
  background: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text};
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.primary};
    box-shadow: 0 0 0 3px ${(props) => props.theme.colors.primaryAlpha};
  }

  &[data-invalid="true"] {
    border-color: ${(props) => props.theme.colors.error};
    background-color: ${(props) => props.theme.colors.errorBg};
  }
`;

const StyledButton = styled(DateFilter.ApplyButton)`
  padding: ${(props) => props.theme.spacing.sm} ${(props) => props.theme.spacing.lg};
  background: ${(props) => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${(props) => props.theme.radii.md};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${(props) => props.theme.colors.primaryDark};
  }

  &[data-disabled="true"] {
    background: ${(props) => props.theme.colors.disabled};
    cursor: not-allowed;
  }
`;

// Usage
<DateFilter>
  <StyledRoot>
    <StyledInput placeholder="Enter date..." />
    <StyledButton>Apply Filter</StyledButton>
  </StyledRoot>
</DateFilter>;
```

### 4. Plain CSS

```css
/* styles.css */

/* Container */
[data-testid="date-filter"] {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

/* Mode buttons */
[data-testid="date-filter"] button[data-mode] {
  flex: 1;
  padding: 0.5rem 1rem;
  border: none;
  background: transparent;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.2s;
}

[data-testid="date-filter"] button[data-active="true"] {
  background: white;
  color: #111827;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

/* Input fields */
[data-testid="date-filter"] input {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  font-size: 0.875rem;
}

[data-testid="date-filter"] input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

[data-testid="date-filter"] input[data-invalid="true"] {
  border-color: #ef4444;
  background-color: #fef2f2;
}

/* Action buttons */
[data-testid="date-filter"] button[data-action] {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.375rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

[data-testid="date-filter"] button[data-action="apply"] {
  background: #3b82f6;
  color: white;
}

[data-testid="date-filter"] button[data-action="apply"]:hover {
  background: #2563eb;
}

[data-testid="date-filter"] button[data-disabled="true"] {
  opacity: 0.5;
  cursor: not-allowed;
}
```

### 5. CSS Variables / Design Tokens

```css
/* tokens.css */
:root {
  /* Colors */
  --color-primary: #3b82f6;
  --color-primary-hover: #2563eb;
  --color-primary-alpha: rgba(59, 130, 246, 0.1);
  --color-surface: #ffffff;
  --color-background: #f9fafb;
  --color-border: #e5e7eb;
  --color-text: #111827;
  --color-text-secondary: #6b7280;
  --color-error: #ef4444;
  --color-error-bg: #fef2f2;

  /* Dark mode */
  --color-dark-surface: #1f2937;
  --color-dark-background: #111827;
  --color-dark-border: #374151;
  --color-dark-text: #f3f4f6;

  /* Spacing */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 0.75rem;
  --spacing-lg: 1rem;
  --spacing-xl: 1.5rem;

  /* Radii */
  --radius-sm: 0.25rem;
  --radius-md: 0.375rem;
  --radius-lg: 0.5rem;

  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

/* Dark mode overrides */
@media (prefers-color-scheme: dark) {
  :root {
    --color-surface: var(--color-dark-surface);
    --color-background: var(--color-dark-background);
    --color-border: var(--color-dark-border);
    --color-text: var(--color-dark-text);
  }
}
```

Use with components:

```css
.date-filter-root {
  padding: var(--spacing-lg);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
}

.date-filter-input {
  padding: var(--spacing-sm) var(--spacing-md);
  background: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  color: var(--color-text);
}

.date-filter-button {
  padding: var(--spacing-sm) var(--spacing-lg);
  background: var(--color-primary);
  color: white;
  border-radius: var(--radius-md);
}

.date-filter-button:hover {
  background: var(--color-primary-hover);
}
```

## Advanced Patterns

### Render Props for Dynamic Styling

When you need to style based on component state:

```tsx
<QuickFilterDropdown.Option value="today">
  {({ highlighted, selected }) => (
    <div className={clsx("px-4 py-2 flex items-center justify-between", highlighted && "bg-gray-100", selected && "text-blue-600 font-semibold")}>
      <span>Today</span>
      {selected && <CheckIcon className="w-4 h-4" />}
    </div>
  )}
</QuickFilterDropdown.Option>
```

### Responsive Design

```tsx
<DateFilter.Root
  className="
  /* Mobile first */
  w-full flex flex-col gap-4
  
  /* Tablet and up */
  sm:max-w-md
  
  /* Desktop */
  lg:flex-row lg:items-end lg:gap-2
"
>
  <DateFilter.Input
    className="
    w-full
    lg:w-64
  "
  />
  <DateFilter.Actions
    className="
    flex gap-2
    flex-col sm:flex-row
    lg:flex-shrink-0
  "
  >
    <DateFilter.ApplyButton
      className="
      w-full sm:w-auto
      px-4 py-2
    "
    >
      Apply
    </DateFilter.ApplyButton>
  </DateFilter.Actions>
</DateFilter.Root>
```

### Animation Examples

```tsx
// Tailwind animation utilities
<QuickFilterDropdown.Panel className="
  transition-all duration-200 ease-out
  data-[open]:opacity-100 data-[open]:translate-y-0
  data-[closed]:opacity-0 data-[closed]:-translate-y-2
">

// CSS animations
@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.dropdown-panel[data-open="true"] {
  animation: slideDown 0.2s ease-out;
}
```

### Dark Mode

```tsx
// Class-based dark mode (Tailwind)
<DateFilter.Input
  className="
    bg-white dark:bg-gray-800
    border-gray-300 dark:border-gray-600
    text-gray-900 dark:text-gray-100
  "
/>

// Media query dark mode
@media (prefers-color-scheme: dark) {
  .date-input {
    background: #1f2937;
    color: #f3f4f6;
    border-color: #4b5563;
  }
}

// Data attribute dark mode
[data-theme="dark"] .date-input {
  background: #1f2937;
  color: #f3f4f6;
  border-color: #4b5563;
}
```

## Complete Examples

### DateFilter with Full Styling

```tsx
import { DateFilter } from "ag-grid-react-components";
import { Calendar, Clock } from "lucide-react";

function StyledDateFilter() {
  const [value, setValue] = useState("");

  return (
    <DateFilter value={value} onChange={setValue}>
      <DateFilter.Root className="w-full max-w-md mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          {/* Header */}
          <div className="px-4 py-3 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">Filter by Date</h3>
          </div>

          <div className="p-4 space-y-4">
            {/* Mode Toggle */}
            <div className="flex gap-1 p-1 bg-gray-100 dark:bg-gray-700 rounded-md">
              <DateFilter.ModeButton
                mode="relative"
                className="
                  flex-1 flex items-center justify-center gap-2 px-3 py-1.5 
                  text-sm font-medium rounded transition-all
                  data-[active]:bg-white data-[active]:dark:bg-gray-600 
                  data-[active]:shadow-sm data-[active]:text-gray-900 data-[active]:dark:text-white
                  data-[inactive]:text-gray-600 data-[inactive]:dark:text-gray-400
                "
              >
                <Clock className="w-4 h-4" />
                Relative
              </DateFilter.ModeButton>
              <DateFilter.ModeButton
                mode="absolute"
                className="
                  flex-1 flex items-center justify-center gap-2 px-3 py-1.5 
                  text-sm font-medium rounded transition-all
                  data-[active]:bg-white data-[active]:dark:bg-gray-600 
                  data-[active]:shadow-sm data-[active]:text-gray-900 data-[active]:dark:text-white
                  data-[inactive]:text-gray-600 data-[inactive]:dark:text-gray-400
                "
              >
                <Calendar className="w-4 h-4" />
                Specific Dates
              </DateFilter.ModeButton>
            </div>

            {/* Relative Date Input */}
            <DateFilter.RelativeSection>
              <DateFilter.RelativeInput
                className="
                  w-full px-3 py-2 text-sm
                  bg-white dark:bg-gray-900 
                  border border-gray-300 dark:border-gray-600 
                  rounded-md shadow-sm
                  focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                  data-[invalid]:border-red-500 data-[invalid]:focus:ring-red-500
                  placeholder:text-gray-400 dark:placeholder:text-gray-500
                "
                placeholder="e.g., -7d, last week, yesterday"
              />
              <DateFilter.HelpText className="mt-1.5 text-xs text-gray-500 dark:text-gray-400">Use natural language like "last 30 days" or "-1w"</DateFilter.HelpText>
              <DateFilter.ErrorMessage className="mt-1 text-xs text-red-600 dark:text-red-400" />
            </DateFilter.RelativeSection>

            {/* Absolute Date Inputs */}
            <DateFilter.AbsoluteSection className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Start Date</label>
                <DateFilter.StartDateInput
                  className="
                    w-full px-3 py-2 text-sm
                    bg-white dark:bg-gray-900 
                    border border-gray-300 dark:border-gray-600 
                    rounded-md shadow-sm
                    focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                  "
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">End Date</label>
                <DateFilter.EndDateInput
                  className="
                    w-full px-3 py-2 text-sm
                    bg-white dark:bg-gray-900 
                    border border-gray-300 dark:border-gray-600 
                    rounded-md shadow-sm
                    focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                  "
                />
              </div>
            </DateFilter.AbsoluteSection>
          </div>

          {/* Footer Actions */}
          <div className="px-4 py-3 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 flex gap-2">
            <DateFilter.ApplyButton
              className="
                flex-1 px-4 py-2 text-sm font-medium
                bg-blue-600 hover:bg-blue-700 
                text-white rounded-md shadow-sm 
                transition-colors
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                data-[disabled]:bg-gray-300 data-[disabled]:cursor-not-allowed
              "
            >
              Apply Filter
            </DateFilter.ApplyButton>
            <DateFilter.ResetButton
              className="
                px-4 py-2 text-sm font-medium
                bg-white dark:bg-gray-800 
                hover:bg-gray-50 dark:hover:bg-gray-700
                border border-gray-300 dark:border-gray-600 
                text-gray-700 dark:text-gray-300 
                rounded-md shadow-sm 
                transition-colors
                focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2
              "
            >
              Clear
            </DateFilter.ResetButton>
          </div>
        </div>
      </DateFilter.Root>
    </DateFilter>
  );
}
```

### QuickFilterDropdown with Animation

```tsx
<QuickFilterDropdown>
  <QuickFilterDropdown.Trigger
    className="
    inline-flex items-center gap-2 px-4 py-2 
    bg-white dark:bg-gray-800 
    border border-gray-300 dark:border-gray-600 
    rounded-md shadow-sm
    hover:bg-gray-50 dark:hover:bg-gray-700
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
    data-[open]:ring-2 data-[open]:ring-blue-500
    transition-all
  "
  >
    <span>Time Period</span>
    <ChevronDownIcon
      className="
      w-4 h-4 text-gray-500
      transition-transform duration-200
      data-[open]:rotate-180
    "
    />
  </QuickFilterDropdown.Trigger>

  <QuickFilterDropdown.Panel
    className="
    absolute z-10 mt-2 w-56 
    bg-white dark:bg-gray-800 
    border border-gray-200 dark:border-gray-700 
    rounded-lg shadow-lg
    transform origin-top-left
    transition-all duration-200 ease-out
    data-[open]:opacity-100 data-[open]:scale-100
    data-[closed]:opacity-0 data-[closed]:scale-95
  "
  >
    <div className="p-1">
      {timeOptions.map((option) => (
        <QuickFilterDropdown.Option
          key={option.value}
          value={option.value}
          className="
            flex items-center gap-2 px-3 py-2 
            text-sm rounded-md cursor-pointer
            transition-colors
            data-[highlighted]:bg-gray-100 data-[highlighted]:dark:bg-gray-700
            data-[selected]:text-blue-600 data-[selected]:font-semibold
            data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed
          "
        >
          <span className="flex-1">{option.label}</span>
          <CheckIcon
            className="
            w-4 h-4 text-blue-600
            data-[selected]:block
            hidden
          "
          />
        </QuickFilterDropdown.Option>
      ))}
    </div>
  </QuickFilterDropdown.Panel>
</QuickFilterDropdown>
```

## Accessibility Best Practices

1. **Always include focus indicators**

   ```css
   .input:focus {
     outline: 2px solid #3b82f6;
     outline-offset: 2px;
   }

   /* Or with Tailwind */
   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
   ```

2. **Ensure color contrast**

   - Text on backgrounds should meet WCAG AA standards (4.5:1 ratio)
   - Use tools like WebAIM's contrast checker

3. **Visible disabled states**

   ```css
   [data-disabled="true"] {
     opacity: 0.6; /* Not too faint */
     cursor: not-allowed;
   }
   ```

4. **Keyboard navigation indicators**
   ```css
   [data-highlighted="true"] {
     background: #f3f4f6;
     outline: 2px solid #3b82f6;
     outline-offset: -2px;
   }
   ```

## Performance Tips

1. **Avoid inline style objects**

   ```tsx
   // ❌ Bad - creates new object every render
   <div style={{ padding: '1rem' }}>

   // ✅ Good - use className
   <div className="p-4">
   ```

2. **Use CSS transitions over JS animations**

   ```css
   /* Smooth, performant transitions */
   .panel {
     transition:
       opacity 200ms,
       transform 200ms;
   }
   ```

3. **Optimize re-renders with memo**
   ```tsx
   const MemoizedOption = React.memo(({ option, ...props }) => <QuickFilterDropdown.Option {...props}>{option.label}</QuickFilterDropdown.Option>);
   ```

## Migration from v1

If you're upgrading from v1 (which included default styles), see the [Migration Guide](./MIGRATION_GUIDE.md) for detailed instructions and style references.
