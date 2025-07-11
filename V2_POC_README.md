# V2.0 Headless DateFilter Proof of Concept

## Overview

This POC demonstrates the v2.0 headless component architecture following the Headless UI pattern from Tailwind Labs. The DateFilter component is completely unstyled and provides only behavior, state management, and accessibility.

## Documentation

- **[What Are Headless Components?](docs/WHAT_ARE_HEADLESS_COMPONENTS.md)** - Comprehensive guide explaining the headless concept
- **[Headless Architecture Guide](docs/HEADLESS_ARCHITECTURE.md)** - Technical details on implementation
- **[Styling Guide](docs/STYLING_GUIDE.md)** - How to style headless components

## Key Features

### 1. **Compound Component Pattern**

```tsx
<DateFilter>
  <DateFilter.Root>
    <DateFilter.ModeToggle>
      <DateFilter.ModeButton mode="relative" />
    </DateFilter.ModeToggle>
    <DateFilter.RelativeInput />
    <DateFilter.ApplyButton />
  </DateFilter.Root>
</DateFilter>
```

### 2. **Direct className Props**

Every component accepts className for styling:

```tsx
<DateFilter.Input className="w-full px-3 py-2 border rounded" />
```

### 3. **Data Attributes for State**

Components expose state through data attributes:

```tsx
// Component renders: data-active="true" data-disabled="false"
<DateFilter.ModeButton className="data-[active]:bg-blue-500" />
```

### 4. **Zero CSS Included**

- No CSS files in component directory
- No CSS modules
- No inline styles
- No hardcoded classNames

## View the Demos

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. View the demos:
   - **Visual Examples**: http://localhost:5173/v2-headless - Clean demonstration of styling approaches
   - **Interactive Demo**: http://localhost:5173/v2-poc - Working example with date filtering

## POC Structure

```
src/components/v2/DateFilter/
├── index.tsx        # Main export with compound components
├── context.tsx      # React Context for state management
├── components.tsx   # All sub-components
├── types.ts        # TypeScript interfaces
└── utils.ts        # Helper functions
```

## Styling Examples

The POC demonstrates 4 styling approaches:

### 1. Tailwind CSS

Using utility classes and data attribute modifiers:

```tsx
className = "data-[active=true]:bg-blue-500 data-[disabled=true]:opacity-50";
```

### 2. CSS Modules

Traditional CSS with classes:

```css
.date-filter-button[data-active="true"] {
  background: #3b82f6;
}
```

### 3. Plain CSS with Data Attributes

Using data attributes for styling:

```css
[data-theme="custom"] button[data-active="true"] {
  background: #007bff;
}
```

### 4. Completely Unstyled

Raw HTML elements with no styling.

## Benefits

1. **Full Control** - Users style every aspect
2. **Tree-Shakeable** - No unused CSS
3. **Framework Agnostic** - Works with any CSS solution
4. **Type Safe** - Full TypeScript support
5. **Accessible** - ARIA attributes handled automatically

## Next Steps

1. Gather feedback on the API design
2. Implement remaining components:
   - ActiveFilters
   - QuickFilterDropdown
   - FilterPreset components
3. Create migration tools
4. Update documentation

## API Design Decisions

- **Compound Components** - Better composition than render props
- **Data Attributes** - Standard way to expose component state
- **No classNames Object** - Direct className props are simpler
- **Context for State** - Cleaner than prop drilling
- **forwardRef Everywhere** - Better integration with UI libraries

## Migration from v1

```tsx
// Before (v1.x)
import { DateFilter } from "ag-grid-react-components";
<DateFilter />; // Styles included

// After (v2.0)
import { DateFilter } from "ag-grid-react-components";
<DateFilter>
  <DateFilter.Root className="your-styles">
    <DateFilter.RelativeInput className="your-input-styles" />
  </DateFilter.Root>
</DateFilter>;
```
