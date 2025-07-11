# What Are Headless UI Components?

## Introduction

If you're used to component libraries that ship with built-in styles, the concept of "headless" UI components might seem strange at first. This guide will help you understand what headless React components are, why they're powerful, and how to use them effectively.

## Why "Headless" for UI Components?

You might be wondering: **"Why are we calling frontend components 'headless'? Isn't that a backend term?"**

You're right! "Headless" traditionally refers to systems without a user interface (like headless CMSs or headless browsers). However, in the React ecosystem, "headless" has taken on a new meaning:

**Headless UI components = Components without visual styling**

Think of it this way:

- Traditional components = "Full body" (behavior + appearance)
- Headless components = "Just the brain" (behavior only)

This terminology was popularized by libraries like [Headless UI](https://headlessui.com/) from the Tailwind team, and represents a growing movement in the React community to ship unstyled, behavior-only components that give developers complete control over appearance.

## The Traditional Approach vs Headless

### Traditional Component Libraries

```tsx
// Traditional: Component comes with built-in styles
import { DatePicker } from "some-ui-library";
import "some-ui-library/dist/styles.css"; // Required CSS

<DatePicker />; // Looks styled out of the box
```

### Headless UI Components

```tsx
// Headless: Component has NO styles
import { DateFilter } from "ag-grid-react-components";

<DateFilter />; // Just HTML - you style it
```

## What Makes a UI Component "Headless"?

A headless UI component provides **behavior without styles**. Think of it as the "brain" of the component without the "appearance".

This approach is part of a broader movement in the React ecosystem, with popular libraries including:

- [Headless UI](https://headlessui.com/) by Tailwind Labs - The library that popularized the term
- [Radix UI](https://www.radix-ui.com/) - Unstyled, accessible components
- [React Aria](https://react-spectrum.adobe.com/react-aria/) - Adobe's headless component hooks
- [Downshift](https://www.downshift-js.com/) - Headless dropdown components
- [Tanstack Table](https://tanstack.com/table) - Headless table utilities

These libraries recognize that while behavior can be standardized, visual design is unique to each application.

### What Headless Components DO Provide ✅

1. **State Management**

   - Internal state (open/closed, selected values, etc.)
   - State synchronization
   - Controlled/uncontrolled modes

2. **Business Logic**

   - Date parsing and validation
   - Filtering algorithms
   - Data transformations

3. **Accessibility**

   - ARIA attributes
   - Keyboard navigation
   - Focus management
   - Screen reader support

4. **Event Handling**
   - User interactions
   - Callbacks and hooks
   - Side effects

### What Headless Components DON'T Provide ❌

1. **Visual Styles**

   - No CSS files
   - No inline styles
   - No CSS-in-JS
   - No default theme

2. **Layout Opinions**

   - No positioning
   - No spacing
   - No sizing
   - No responsive breakpoints

3. **Visual States**
   - No hover effects
   - No focus rings
   - No transitions
   - No animations

## Real Example: DateFilter Headless Component

Let's look at our DateFilter headless React component to understand this concept better.

### The Component Structure

```tsx
<DateFilter value={value} onChange={onChange}>
  <DateFilter.Root>
    <DateFilter.ModeToggle>
      <DateFilter.ModeButton mode="relative">Relative</DateFilter.ModeButton>
      <DateFilter.ModeButton mode="absolute">Absolute</DateFilter.ModeButton>
    </DateFilter.ModeToggle>
    <DateFilter.RelativeInput placeholder="e.g., -7d" />
    <DateFilter.ApplyButton>Apply</DateFilter.ApplyButton>
  </DateFilter.Root>
</DateFilter>
```

### What the Component Handles

| Feature              | What It Does                                        |
| -------------------- | --------------------------------------------------- |
| **Date Parsing**     | Understands "-7d", "yesterday", "last week", etc.   |
| **Validation**       | Checks if input is valid, provides error states     |
| **Mode Switching**   | Toggles between relative and absolute date modes    |
| **State Management** | Tracks active mode, input values, validation status |
| **Data Attributes**  | Exposes `data-active`, `data-invalid` for styling   |
| **Accessibility**    | Adds `aria-pressed`, `aria-invalid` automatically   |
| **Event Handling**   | Manages onChange, onApply, onReset callbacks        |

### What You Control

Everything visual is up to you! Here's the same component with different styling approaches:

## Styling Examples

### 1. Completely Unstyled (Raw Headless Component)

This is what the headless UI component looks like with zero styling:

```tsx
<DateFilter>
  <DateFilter.Root>
    <DateFilter.ModeToggle>
      <DateFilter.ModeButton mode="relative">Relative</DateFilter.ModeButton>
      <DateFilter.ModeButton mode="absolute">Absolute</DateFilter.ModeButton>
    </DateFilter.ModeToggle>
    <DateFilter.RelativeInput />
    <DateFilter.ApplyButton>Apply</DateFilter.ApplyButton>
  </DateFilter.Root>
</DateFilter>
```

**Result:** Plain HTML elements - buttons, inputs, divs. No styling whatsoever.

### 2. With Tailwind CSS

```tsx
<DateFilter>
  <DateFilter.Root className="p-4 bg-white rounded-lg shadow">
    <DateFilter.ModeToggle className="flex gap-1 p-1 bg-gray-100 rounded">
      <DateFilter.ModeButton
        mode="relative"
        className="
          flex-1 px-3 py-1 rounded text-sm
          data-[active=true]:bg-white data-[active=true]:shadow
          data-[inactive=true]:text-gray-500
        "
      >
        Relative
      </DateFilter.ModeButton>
    </DateFilter.ModeToggle>

    <DateFilter.RelativeInput
      className="
        w-full mt-4 px-3 py-2 border rounded
        focus:ring-2 focus:ring-blue-500
        data-[invalid=true]:border-red-500
      "
    />

    <DateFilter.ApplyButton
      className="
        mt-4 px-4 py-2 bg-blue-500 text-white rounded
        hover:bg-blue-600
        data-[disabled=true]:bg-gray-300
      "
    >
      Apply
    </DateFilter.ApplyButton>
  </DateFilter.Root>
</DateFilter>
```

### 3. With CSS Modules

```css
/* DateFilter.module.css */
.root {
  padding: 1rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.modeButton {
  padding: 0.5rem 1rem;
  background: transparent;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.modeButton[data-active="true"] {
  background: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.input[data-invalid="true"] {
  border-color: #ef4444;
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

### 4. With Styled Components

```tsx
const StyledRoot = styled(DateFilter.Root)`
  padding: 1rem;
  background: ${(props) => props.theme.colors.surface};
  border-radius: ${(props) => props.theme.radii.md};
`;

const StyledInput = styled(DateFilter.RelativeInput)`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid ${(props) => props.theme.colors.border};

  &[data-invalid="true"] {
    border-color: ${(props) => props.theme.colors.error};
  }
`;

<DateFilter>
  <StyledRoot>
    <StyledInput />
  </StyledRoot>
</DateFilter>;
```

## Data Attributes for State-Based Styling

Headless components expose their state through data attributes. This allows you to style based on component state using CSS:

| Data Attribute  | Description                | CSS Example                                         |
| --------------- | -------------------------- | --------------------------------------------------- |
| `data-active`   | Element is active/selected | `[data-active="true"] { background: blue; }`        |
| `data-invalid`  | Input validation failed    | `[data-invalid="true"] { border-color: red; }`      |
| `data-disabled` | Element is disabled        | `[data-disabled="true"] { opacity: 0.5; }`          |
| `data-open`     | Dropdown is open           | `[data-open="true"] { transform: rotate(180deg); }` |

### Using with Tailwind

Tailwind makes this especially elegant with data attribute modifiers:

```tsx
<button className="data-[active]:bg-blue-500 data-[active]:text-white">Click me</button>
```

## Benefits of Headless UI Components

### 1. **Complete Control**

You own every pixel. No fighting with `!important` or deeply nested selectors.

### 2. **Consistency**

Use your existing design system without compromise. The component adapts to your styles, not the other way around.

### 3. **Performance**

- No unused CSS shipped to users
- Tree-shakeable
- Smaller bundle sizes

### 4. **Framework Agnostic Styling**

Works with any CSS solution:

- Tailwind CSS
- CSS Modules
- Styled Components
- Emotion
- Plain CSS
- Sass/Less

### 5. **No Style Conflicts**

Since there are no default styles, there's nothing to override or conflict with your application's styles.

## When to Use Headless UI Components

Headless React components are perfect when:

- ✅ You have a design system to follow
- ✅ You need complete control over styling
- ✅ You're using a utility-first CSS framework
- ✅ You want to avoid style conflicts
- ✅ Bundle size is a concern
- ✅ You need to support multiple themes

They might not be ideal when:

- ❌ You want something that looks good instantly
- ❌ You're prototyping quickly
- ❌ You don't have design requirements
- ❌ You prefer pre-built themes

## Migration Tips

If you're moving from a traditional component library:

1. **Start with one component** - Don't migrate everything at once
2. **Create a style guide** - Document your common patterns
3. **Build a component library** - Wrap headless components with your styles
4. **Use CSS variables** - Make theming easier
5. **Leverage TypeScript** - Get autocomplete for className props

## Common Patterns

### Creating Your Own Styled Version

```tsx
// my-components/StyledDateFilter.tsx
import { DateFilter } from "ag-grid-react-components";

export function StyledDateFilter(props) {
  return (
    <DateFilter {...props}>
      <DateFilter.Root className="your-styles">{/* Pre-styled for your app */}</DateFilter.Root>
    </DateFilter>
  );
}
```

### Theme Provider Pattern

```tsx
const theme = {
  dateFilter: {
    root: "p-4 bg-white rounded-lg",
    input: "w-full px-3 py-2 border rounded",
    button: "px-4 py-2 bg-blue-500 text-white rounded",
  },
};

<DateFilter>
  <DateFilter.Root className={theme.dateFilter.root}>
    <DateFilter.RelativeInput className={theme.dateFilter.input} />
    <DateFilter.ApplyButton className={theme.dateFilter.button}>Apply</DateFilter.ApplyButton>
  </DateFilter.Root>
</DateFilter>;
```

## Conclusion

Headless UI components represent a shift in thinking about React component libraries. Instead of shipping opinions about how things should look, they ship functionality and let you decide on appearance.

This approach provides maximum flexibility and control while still giving you the complex behavior, accessibility, and state management that would be time-consuming to build from scratch.

The learning curve is worth it - once you understand headless React components, you'll appreciate the freedom they provide to build exactly what you need without compromise.

## Further Reading

- [Headless UI Documentation](https://headlessui.com/) - Learn from the library that popularized the term
- [Patterns for Building Unstyled Components](https://www.patterns.dev/posts/headless-components) - Deep dive into headless patterns
- [The Case for Headless UI Components](https://www.smashingmagazine.com/2022/05/unstyled-components-ui-libraries/) - Why this approach is gaining popularity

## See It In Action

To see these examples live:

1. Run `npm run dev` in the project root
2. Visit http://localhost:5173/v2-headless

This will show you the same DateFilter component styled in multiple ways, demonstrating the power of headless components.
