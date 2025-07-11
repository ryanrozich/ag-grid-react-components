# Headless UI Component Architecture

## What are Headless UI Components?

Headless UI components provide the behavior, state management, and accessibility features without any visual styling. They are "headless" because they don't include any CSS or visual opinions - you bring your own styles.

In the context of React components, "headless" means the component handles all the complex logic and behavior, but leaves the visual presentation entirely up to you. This is different from backend "headless" services - we're specifically talking about frontend UI components without styling.

This approach was popularized by [Headless UI](https://headlessui.com/) from the Tailwind team, and has been adopted by many modern React libraries:

- [Headless UI](https://headlessui.com/) by Tailwind Labs - The library that coined the term for UI components
- [Radix UI](https://www.radix-ui.com/) - Unstyled, accessible components for building design systems
- [React Aria](https://react-spectrum.adobe.com/react-aria/) - Adobe's collection of React hooks for building accessible UI
- [Downshift](https://www.downshift-js.com/) - Primitives to build flexible and accessible dropdown components
- [Tanstack Table](https://tanstack.com/table) - Headless UI for building powerful tables & datagrids

## Core Principles

### 1. **No Styles Included**

Components ship with zero CSS. No stylesheets, no inline styles, no CSS-in-JS.

```tsx
// ❌ Wrong - includes styles
<button style={{ padding: '10px' }}>Click me</button>

// ✅ Right - no styles
<button className={className}>Click me</button>
```

### 2. **Full Control via className**

Every visual element accepts a `className` prop for styling.

```tsx
<DateFilter.Input className="w-full px-3 py-2 border border-gray-300 rounded-md" />
```

### 3. **State Exposed via Data Attributes**

Component state is exposed through data attributes for CSS styling.

```tsx
// Component adds: data-active="true" when active
<Menu.Item className="data-[active]:bg-blue-100">Settings</Menu.Item>
```

### 4. **Compound Components**

Complex components are broken into composable pieces.

```tsx
<DateFilter>
  <DateFilter.Root>
    <DateFilter.Input />
    <DateFilter.Button />
  </DateFilter.Root>
</DateFilter>
```

## How It Works

### Component Structure

```tsx
// The component manages state and behavior
export const DateFilter = ({ children, value, onChange }) => {
  const [internalState, setInternalState] = useState();

  // Provide state via Context
  return <DateFilterContext.Provider value={{ value, onChange, internalState }}>{children}</DateFilterContext.Provider>;
};

// Sub-components receive className and add data attributes
DateFilter.Input = forwardRef(({ className, ...props }, ref) => {
  const { value, onChange, isValid } = useDateFilterContext();

  return (
    <input
      ref={ref}
      className={className} // User's styles
      value={value}
      onChange={onChange}
      data-invalid={!isValid} // State for CSS
      aria-invalid={!isValid} // Accessibility
      {...props}
    />
  );
});
```

### Data Attributes

Data attributes expose component state for CSS styling:

| Attribute          | Description                   | Example CSS                      |
| ------------------ | ----------------------------- | -------------------------------- |
| `data-active`      | Element is active/current     | `data-[active]:bg-blue-100`      |
| `data-selected`    | Element is selected           | `data-[selected]:font-bold`      |
| `data-disabled`    | Element is disabled           | `data-[disabled]:opacity-50`     |
| `data-open`        | Dropdown/panel is open        | `data-[open]:rotate-180`         |
| `data-invalid`     | Input validation failed       | `data-[invalid]:border-red-500`  |
| `data-highlighted` | Keyboard navigation highlight | `data-[highlighted]:bg-gray-100` |

## Styling Methods

### 1. Tailwind CSS (Recommended)

Tailwind's data attribute selectors make styling headless components intuitive:

```tsx
<QuickFilterDropdown>
  <QuickFilterDropdown.Trigger
    className="
      flex items-center gap-2 px-4 py-2 
      bg-white border border-gray-300 rounded-md
      hover:bg-gray-50 
      data-[open]:ring-2 data-[open]:ring-blue-500
    "
  >
    Select filter
    <ChevronIcon className="w-4 h-4 transition-transform data-[open]:rotate-180" />
  </QuickFilterDropdown.Trigger>

  <QuickFilterDropdown.Panel
    className="
      absolute mt-2 py-1 
      bg-white border border-gray-200 rounded-lg shadow-lg
    "
  >
    <QuickFilterDropdown.Option
      className="
        px-4 py-2 text-sm
        data-[highlighted]:bg-gray-100
        data-[selected]:font-semibold
        data-[disabled]:opacity-50
      "
    >
      Last 7 days
    </QuickFilterDropdown.Option>
  </QuickFilterDropdown.Panel>
</QuickFilterDropdown>
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

.input {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
}

.input[data-invalid="true"] {
  border-color: #ef4444;
}

.button {
  padding: 0.5rem 1rem;
  background: #3b82f6;
  color: white;
  border-radius: 0.375rem;
  transition: background-color 0.2s;
}

.button:hover {
  background: #2563eb;
}

.button[data-disabled="true"] {
  background: #e5e7eb;
  color: #9ca3af;
  cursor: not-allowed;
}
```

```tsx
import styles from "./DateFilter.module.css";

<DateFilter>
  <DateFilter.Root className={styles.root}>
    <DateFilter.Input className={styles.input} />
    <DateFilter.Button className={styles.button}>Apply</DateFilter.Button>
  </DateFilter.Root>
</DateFilter>;
```

### 3. Styled Components / Emotion

```tsx
import styled from "styled-components";

const StyledInput = styled(DateFilter.Input)`
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: ${(props) => props.theme.radii.md};

  &[data-invalid="true"] {
    border-color: ${(props) => props.theme.colors.error};
  }

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.primary};
    box-shadow: 0 0 0 3px ${(props) => props.theme.colors.primaryAlpha};
  }
`;

const StyledButton = styled(DateFilter.Button)`
  padding: 0.5rem 1rem;
  background: ${(props) => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${(props) => props.theme.radii.md};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${(props) => props.theme.colors.primaryDark};
  }

  &[data-disabled="true"] {
    background: ${(props) => props.theme.colors.gray300};
    cursor: not-allowed;
  }
`;

// Usage
<DateFilter>
  <DateFilter.Root>
    <StyledInput />
    <StyledButton>Apply</StyledButton>
  </DateFilter.Root>
</DateFilter>;
```

### 4. Plain CSS

```css
/* styles.css */
[data-testid="date-filter"] {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  background: white;
  border-radius: 0.5rem;
}

[data-testid="date-filter"] input {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
}

[data-testid="date-filter"] input[data-invalid="true"] {
  border-color: #ef4444;
  background-color: #fef2f2;
}

[data-testid="date-filter"] button {
  padding: 0.5rem 1rem;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
}

[data-testid="date-filter"] button:hover {
  background: #2563eb;
}

[data-testid="date-filter"] button[data-disabled="true"] {
  background: #e5e7eb;
  color: #9ca3af;
  cursor: not-allowed;
}
```

### 5. CSS Variables / Design Tokens

```css
/* tokens.css */
:root {
  --color-primary: #3b82f6;
  --color-primary-hover: #2563eb;
  --color-border: #e5e7eb;
  --color-error: #ef4444;
  --radius-sm: 0.375rem;
  --spacing-2: 0.5rem;
  --spacing-3: 0.75rem;
  --spacing-4: 1rem;
}

/* component.css */
.date-filter-input {
  padding: var(--spacing-2) var(--spacing-3);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
}

.date-filter-input[data-invalid="true"] {
  border-color: var(--color-error);
}
```

## Render Props Pattern

For dynamic styling based on component state:

```tsx
<QuickFilterDropdown.Option value="today">
  {({ selected, highlighted }) => (
    <div
      className={`
      px-4 py-2 flex items-center justify-between
      ${highlighted ? "bg-gray-100" : ""}
      ${selected ? "font-semibold text-blue-600" : ""}
    `}
    >
      <span>Today</span>
      {selected && <CheckIcon className="w-4 h-4" />}
    </div>
  )}
</QuickFilterDropdown.Option>
```

## Accessibility

Headless components handle accessibility automatically:

```tsx
// The component adds these for you:
<button role="button" aria-pressed={isActive} aria-disabled={isDisabled} aria-expanded={isOpen} aria-haspopup="listbox" aria-controls={panelId} />
```

You just need to style the visual states:

```css
button[aria-pressed="true"] {
  background: #3b82f6;
  color: white;
}

button[aria-disabled="true"] {
  opacity: 0.5;
  cursor: not-allowed;
}
```

## Best Practices

### 1. Use Semantic HTML

The components use proper HTML elements. Style them accordingly:

```tsx
// DateFilter.Button renders a <button>
// DateFilter.Input renders an <input>
// Style the actual elements, not wrapper divs
```

### 2. Mobile-First Responsive Design

```tsx
<DateFilter.Root className="
  flex flex-col gap-4 p-4
  sm:flex-row sm:items-end sm:gap-2
">
```

### 3. Dark Mode Support

```tsx
<DateFilter.Input
  className="
  bg-white dark:bg-gray-800
  border-gray-300 dark:border-gray-600
  text-gray-900 dark:text-gray-100
"
/>
```

### 4. Focus Styles

Always include focus indicators for accessibility:

```tsx
<DateFilter.Button className="
  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
">
```

### 5. State Combinations

Handle multiple states together:

```css
/* Highlighted AND selected */
[data-highlighted="true"][data-selected="true"] {
  background: #3b82f6;
  color: white;
}

/* Disabled overrides all other states */
[data-disabled="true"] {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}
```

## Migration from Styled Components

If you're migrating from v1 (which included styles):

### Before (v1.x)

```tsx
import { DateFilter } from "ag-grid-react-components";
// Styles were included automatically

<DateFilter />; // Had default styles
```

### After (v2.0)

```tsx
import { DateFilter } from "ag-grid-react-components";
import { dateFilterStyles } from "./styles";

<DateFilter>
  <DateFilter.Root className={dateFilterStyles.root}>
    <DateFilter.Input className={dateFilterStyles.input} />
    {/* ... */}
  </DateFilter.Root>
</DateFilter>;
```

## Complete Example

Here's a fully styled DateFilter using Tailwind CSS:

```tsx
import { DateFilter } from "ag-grid-react-components";
import { Calendar, Clock } from "lucide-react";

function MyDateFilter() {
  const [value, setValue] = useState("");

  return (
    <DateFilter value={value} onChange={setValue}>
      <DateFilter.Root className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 space-y-4">
          {/* Mode Toggle */}
          <div className="flex gap-1 p-1 bg-gray-100 dark:bg-gray-700 rounded-md">
            <DateFilter.ModeButton
              mode="relative"
              className="
                flex-1 flex items-center justify-center gap-2 px-3 py-1.5 
                text-sm font-medium rounded transition-colors
                data-[active]:bg-white data-[active]:dark:bg-gray-600 
                data-[active]:shadow-sm
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
                text-sm font-medium rounded transition-colors
                data-[active]:bg-white data-[active]:dark:bg-gray-600 
                data-[active]:shadow-sm
                data-[inactive]:text-gray-600 data-[inactive]:dark:text-gray-400
              "
            >
              <Calendar className="w-4 h-4" />
              Absolute
            </DateFilter.ModeButton>
          </div>

          {/* Input Section */}
          <DateFilter.RelativeSection className="space-y-2">
            <DateFilter.RelativeInput
              className="
                w-full px-3 py-2 
                bg-white dark:bg-gray-900 
                border border-gray-300 dark:border-gray-600 
                rounded-md shadow-sm
                focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                data-[invalid]:border-red-500 data-[invalid]:focus:ring-red-500
                placeholder:text-gray-400
              "
              placeholder="e.g., -7d, today, next month"
            />
            <DateFilter.HelpText className="text-xs text-gray-500 dark:text-gray-400">Use natural language like "last week" or "-30d"</DateFilter.HelpText>
            <DateFilter.ErrorMessage className="text-xs text-red-600 dark:text-red-400" />
          </DateFilter.RelativeSection>

          <DateFilter.AbsoluteSection className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Start Date</label>
              <DateFilter.StartDateInput
                className="
                  w-full px-3 py-2 
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
                  w-full px-3 py-2 
                  bg-white dark:bg-gray-900 
                  border border-gray-300 dark:border-gray-600 
                  rounded-md shadow-sm
                  focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                "
              />
            </div>
          </DateFilter.AbsoluteSection>

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <DateFilter.ApplyButton
              className="
                flex-1 px-4 py-2 
                bg-blue-600 hover:bg-blue-700 
                data-[disabled]:bg-gray-300 data-[disabled]:cursor-not-allowed
                text-white font-medium 
                rounded-md shadow-sm 
                transition-colors
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
              "
            >
              Apply Filter
            </DateFilter.ApplyButton>
            <DateFilter.ResetButton
              className="
                px-4 py-2 
                bg-white dark:bg-gray-800 
                hover:bg-gray-50 dark:hover:bg-gray-700
                border border-gray-300 dark:border-gray-600 
                text-gray-700 dark:text-gray-300 
                font-medium rounded-md shadow-sm 
                transition-colors
                focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2
              "
            >
              Reset
            </DateFilter.ResetButton>
          </div>
        </div>
      </DateFilter.Root>
    </DateFilter>
  );
}
```

## Resources

- [Headless UI Documentation](https://headlessui.com/)
- [Tailwind CSS Data Attribute Selectors](https://tailwindcss.com/docs/hover-focus-and-other-states#data-attributes)
- [Radix UI Styling Guide](https://www.radix-ui.com/docs/primitives/overview/styling)
- [Building Headless Components](https://www.smashingmagazine.com/2021/05/building-headless-components-react/)
