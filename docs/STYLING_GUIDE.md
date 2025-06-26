# Styling and Customization Guide

This guide covers how to style and customize the AG Grid React Components to match your application's design system.

## Overview

The components use a combination of:

- CSS Modules for component isolation
- CSS custom properties (variables) for theming
- BEM-like class naming for predictable styling
- Tailwind-compatible class names where appropriate

## Global CSS Variables

The components respect these CSS custom properties that you can override:

```css
:root {
  /* Primary Colors */
  --agrc-primary: #2563eb; /* Primary brand color */
  --agrc-primary-hover: #1d4ed8; /* Primary hover state */
  --agrc-primary-active: #1e40af; /* Primary active state */

  /* Neutral Colors */
  --agrc-border: #e5e7eb; /* Default border color */
  --agrc-border-hover: #d1d5db; /* Border hover color */
  --agrc-background: #ffffff; /* Component background */
  --agrc-background-hover: #f9fafb; /* Hover background */
  --agrc-text: #111827; /* Primary text color */
  --agrc-text-secondary: #6b7280; /* Secondary text color */

  /* Status Colors */
  --agrc-error: #ef4444; /* Error state color */
  --agrc-success: #10b981; /* Success state color */
  --agrc-warning: #f59e0b; /* Warning state color */

  /* Spacing */
  --agrc-spacing-xs: 0.25rem; /* 4px */
  --agrc-spacing-sm: 0.5rem; /* 8px */
  --agrc-spacing-md: 1rem; /* 16px */
  --agrc-spacing-lg: 1.5rem; /* 24px */

  /* Border Radius */
  --agrc-radius-sm: 0.25rem; /* Small radius */
  --agrc-radius-md: 0.375rem; /* Medium radius */
  --agrc-radius-lg: 0.5rem; /* Large radius */

  /* Shadows */
  --agrc-shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --agrc-shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  --agrc-shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
}
```

## Component-Specific Styling

### DateFilter Component

The DateFilter component exposes these CSS classes:

```css
/* Root container */
.agrc-date-filter {
  /* Your custom styles */
}

/* Mode toggle buttons */
.agrc-date-filter__mode-toggle {
  /* Style the toggle container */
}

.agrc-date-filter__mode-option {
  /* Individual toggle option */
}

.agrc-date-filter__mode-option--active {
  /* Active toggle state */
}

/* Filter type selector */
.agrc-date-filter__type-selector {
  /* Dropdown styling */
}

/* Date inputs */
.agrc-date-filter__input {
  /* Input field styling */
}

.agrc-date-filter__input--error {
  /* Error state */
}

/* Action buttons */
.agrc-date-filter__actions {
  /* Button container */
}

.agrc-date-filter__button {
  /* Base button styles */
}

.agrc-date-filter__button--primary {
  /* Primary button (Apply) */
}

.agrc-date-filter__button--secondary {
  /* Secondary button (Reset) */
}
```

#### Example: Custom DateFilter Theme

```css
/* Dark theme example */
.dark-theme .agrc-date-filter {
  --agrc-background: #1f2937;
  --agrc-border: #374151;
  --agrc-text: #f3f4f6;
  --agrc-primary: #3b82f6;
}

/* Compact variant */
.compact-date-filter .agrc-date-filter {
  --agrc-spacing-sm: 0.25rem;
  --agrc-spacing-md: 0.5rem;
}

.compact-date-filter .agrc-date-filter__input {
  padding: var(--agrc-spacing-sm);
  font-size: 0.875rem;
}
```

### QuickFilterDropdown Component

```css
/* Root dropdown */
.agrc-quick-filter {
  /* Custom dropdown styles */
}

/* Trigger button */
.agrc-quick-filter__trigger {
  /* Customize the dropdown trigger */
}

/* Dropdown panel */
.agrc-quick-filter__panel {
  /* Panel positioning and styling */
}

/* Option items */
.agrc-quick-filter__option {
  /* Individual option styling */
}

.agrc-quick-filter__option--selected {
  /* Selected state */
}

.agrc-quick-filter__option--highlighted {
  /* Keyboard navigation highlight */
}

/* Search input (when enabled) */
.agrc-quick-filter__search {
  /* Search box styling */
}
```

#### Example: Custom QuickFilter Styling

```css
/* Material Design style */
.material-quick-filter .agrc-quick-filter__trigger {
  border: none;
  border-bottom: 2px solid var(--agrc-border);
  border-radius: 0;
  transition: border-color 0.2s;
}

.material-quick-filter .agrc-quick-filter__trigger:hover {
  border-bottom-color: var(--agrc-primary);
}

/* Custom option with icons */
.agrc-quick-filter__option {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.agrc-quick-filter__option-icon {
  width: 1.25rem;
  height: 1.25rem;
  color: var(--agrc-text-secondary);
}
```

### ActiveFilters Component

```css
/* Container */
.agrc-active-filters {
  /* Container styling */
}

/* Individual filter pill */
.agrc-active-filters__pill {
  /* Pill styling */
}

/* Filter label */
.agrc-active-filters__label {
  /* Column name styling */
}

/* Filter value */
.agrc-active-filters__value {
  /* Filter value styling */
}

/* Remove button */
.agrc-active-filters__remove {
  /* X button styling */
}

/* Clear all button */
.agrc-active-filters__clear-all {
  /* Clear all button */
}
```

#### Example: Custom ActiveFilters Pills

```css
/* Colorful pills based on column */
.agrc-active-filters__pill[data-column="status"] {
  background-color: #dbeafe;
  color: #1e40af;
}

.agrc-active-filters__pill[data-column="priority"] {
  background-color: #fef3c7;
  color: #92400e;
}

/* Rounded pills */
.rounded-pills .agrc-active-filters__pill {
  border-radius: 9999px;
  padding: 0.25rem 0.75rem;
}
```

## Using CSS Modules

If you need complete style isolation, you can import and override the CSS modules:

```tsx
import styles from "ag-grid-react-components/dist/DateFilter.module.css";

// Override with your own styles
const customStyles = {
  ...styles,
  filterContainer: `${styles.filterContainer} my-custom-class`,
};

<DateFilter className={customStyles.filterContainer} />;
```

## Tailwind CSS Integration

The components work well with Tailwind CSS. You can use the `className` prop:

```tsx
<DateFilter
  className="p-4 bg-gray-50 rounded-lg shadow-sm"
/>

<QuickFilterDropdown
  className="w-64"
  triggerClassName="bg-blue-500 text-white hover:bg-blue-600"
/>

<ActiveFilters
  className="flex flex-wrap gap-2 p-2 bg-gray-100 rounded"
/>
```

## Advanced Customization

### Custom Render Props

Some components support render props for maximum flexibility:

```tsx
<QuickFilterDropdown
  triggerContent={(option) => (
    <div className="custom-trigger">
      {option ? (
        <>
          <Icon name={option.icon} />
          <span>{option.label}</span>
        </>
      ) : (
        <span>Select filter...</span>
      )}
    </div>
  )}
/>
```

### Headless UI Compatibility

While the components don't use Headless UI internally, they're designed to be compatible with it:

```tsx
import { Transition } from "@headlessui/react";

// Wrap components with Headless UI utilities
<Transition show={isOpen} enter="transition-opacity duration-150" enterFrom="opacity-0" enterTo="opacity-100">
  <DateFilter />
</Transition>;
```

### Component Composition

You can compose the components with your own UI elements:

```tsx
function CustomFilterBar({ api }) {
  return (
    <div className="filter-bar">
      <QuickFilterDropdown api={api} columnId="date" />
      <Separator />
      <ActiveFilters api={api} />
      <Spacer />
      <Button onClick={() => api.setFilterModel({})}>Clear All</Button>
    </div>
  );
}
```

## Dark Mode Support

The components automatically support dark mode through CSS variables:

```css
@media (prefers-color-scheme: dark) {
  :root {
    --agrc-background: #1f2937;
    --agrc-text: #f9fafb;
    --agrc-border: #374151;
    --agrc-primary: #60a5fa;
    /* ... other dark mode overrides */
  }
}

/* Or with a class-based approach */
.dark {
  --agrc-background: #1f2937;
  --agrc-text: #f9fafb;
  /* ... */
}
```

## Accessibility Styling

The components include proper ARIA attributes. You can enhance with custom focus styles:

```css
/* High contrast focus indicators */
.agrc-date-filter__input:focus {
  outline: 3px solid var(--agrc-primary);
  outline-offset: 2px;
}

/* Keyboard navigation indicators */
.agrc-quick-filter__option:focus {
  box-shadow: inset 0 0 0 2px var(--agrc-primary);
}
```

## Performance Considerations

1. **Use CSS Variables**: They're more performant than inline styles
2. **Avoid Deep Nesting**: Keep selectors shallow for better performance
3. **Minimize Reflows**: Group style changes together
4. **Use CSS Modules**: They provide better tree-shaking

## Examples

### Complete Theme Example

```css
/* my-theme.css */
.my-app {
  /* Colors */
  --agrc-primary: #7c3aed;
  --agrc-primary-hover: #6d28d9;
  --agrc-background: #fafafa;
  --agrc-border: #e4e4e7;

  /* Typography */
  --agrc-font-family: "Inter", sans-serif;
  --agrc-font-size-sm: 0.875rem;
  --agrc-font-size-base: 1rem;

  /* Spacing */
  --agrc-spacing-unit: 0.25rem;
}

/* Component overrides */
.my-app .agrc-date-filter {
  font-family: var(--agrc-font-family);
}

.my-app .agrc-date-filter__button--primary {
  background: linear-gradient(to right, #7c3aed, #6d28d9);
  border: none;
  box-shadow: 0 2px 4px rgba(124, 58, 237, 0.3);
}
```

### Bootstrap Integration

```css
/* Bootstrap theme compatibility */
.agrc-date-filter__input {
  @extend .form-control;
}

.agrc-date-filter__button--primary {
  @extend .btn;
  @extend .btn-primary;
}

.agrc-date-filter__button--secondary {
  @extend .btn;
  @extend .btn-outline-secondary;
}
```

## Troubleshooting

### Specificity Issues

If your styles aren't applying, increase specificity:

```css
.my-app .agrc-date-filter .agrc-date-filter__input {
  /* Your styles */
}
```

### CSS Module Conflicts

Use the `!important` flag sparingly:

```css
.my-override {
  background-color: red !important;
}
```

### Z-Index Problems

The components use these z-index values:

- Dropdowns: 1050
- Tooltips: 1060
- Modals: 1070

Adjust your z-index accordingly.

## Best Practices

1. **Use CSS Variables**: Define your theme using CSS custom properties
2. **Maintain Consistency**: Use the same spacing and color variables throughout
3. **Test Responsively**: Ensure styles work on all screen sizes
4. **Consider A11y**: Always test with keyboard navigation and screen readers
5. **Document Changes**: Keep a style guide for your customizations

## Resources

- [CSS Modules Documentation](https://github.com/css-modules/css-modules)
- [Tailwind CSS](https://tailwindcss.com/)
- [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- [Component Source Styles](../src/components/)
