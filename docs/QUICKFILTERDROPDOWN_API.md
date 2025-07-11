# QuickFilterDropdown API Reference

The QuickFilterDropdown component provides a dropdown interface for applying predefined filter configurations to AG Grid columns.

## Installation

````bash
npm install ag-grid-react-components
```text

## Basic Usage

```tsx
import { QuickFilterDropdown } from "ag-grid-react-components";

<QuickFilterDropdown
  api={gridApi}
  columnId="dueDate"
  options={[
    {
      id: "overdue",
      label: "Overdue",
      icon: "🔴",
      description: "Tasks past their due date",
      filterModel: {
        type: "before",
        dateFrom: new Date(),
      },
    },
  ]}
/>;
````

## API

### Component Props

| Prop               | Type                                  | Default         | Description                                        |
| ------------------ | ------------------------------------- | --------------- | -------------------------------------------------- |
| `api`              | `GridApi`                             | Required        | AG Grid API instance                               |
| `columnId`         | `string`                              | Required        | Column ID to apply filters to                      |
| `options`          | `QuickFilterOption[]`                 | Required        | Array of filter options                            |
| `placeholder`      | `string`                              | "Select filter" | Placeholder text for the dropdown                  |
| `className`        | `string`                              | -               | Additional CSS class for the component             |
| `buttonClassName`  | `string`                              | -               | CSS class for the trigger button                   |
| `showDescriptions` | `boolean`                             | `true`          | Show option descriptions in dropdown               |
| `showIcons`        | `boolean`                             | `true`          | Show option icons in dropdown                      |
| `searchable`       | `boolean`                             | `false`         | Enable search functionality for large option lists |
| `usePortal`        | `"never" \| "always" \| "auto"`       | `"never"`       | Portal rendering mode for constrained containers   |
| `onSelect`         | `(option: QuickFilterOption) => void` | -               | Callback when an option is selected                |
| `onClear`          | `() => void`                          | -               | Callback when filters are cleared                  |

### QuickFilterOption Interface

````typescript
interface QuickFilterOption {
  id: string; // Unique identifier
  label: string; // Display label
  icon?: string; // Optional emoji or icon
  description?: string; // Optional description
  filterModel?: Record<string, unknown>; // AG Grid filter model
  onSelect?: (api: GridApi) => void; // Custom handler (overrides filterModel)
}
```text

## Examples

### Date Filter Presets

```tsx
const dateFilterOptions: QuickFilterOption[] = [
  {
    id: "today",
    label: "Today",
    icon: "📅",
    filterModel: {
      type: "equals",
      dateFrom: new Date(),
    },
  },
  {
    id: "this-week",
    label: "This Week",
    icon: "📆",
    filterModel: {
      type: "inRange",
      dateFrom: startOfWeek(new Date()),
      dateTo: endOfWeek(new Date()),
    },
  },
  {
    id: "overdue",
    label: "Overdue",
    icon: "🔴",
    description: "Past due date",
    filterModel: {
      type: "before",
      dateFrom: new Date(),
    },
  },
];
```text

### Custom Filter Logic

```tsx
const customOptions: QuickFilterOption[] = [
  {
    id: "complex-filter",
    label: "High Priority & Overdue",
    icon: "⚠️",
    onSelect: (api) => {
      // Apply multiple filters
      api.setFilterModel({
        priority: {
          type: "equals",
          filter: "High",
        },
        dueDate: {
          type: "before",
          dateFrom: new Date(),
        },
      });
    },
  },
];
```text

### With Search (for large lists)

```tsx
<QuickFilterDropdown
  api={gridApi}
  columnId="category"
  options={categoryOptions} // 50+ options
  searchable={true}
  placeholder="Search categories..."
/>
````

### Portal Rendering

Use portal rendering when the dropdown is inside a container with `overflow: hidden`:

````tsx
// Inside a modal or constrained container
<QuickFilterDropdown api={gridApi} columnId="status" options={statusOptions} usePortal="always" />
```text

## Styling

The component uses CSS modules with these customizable classes:

```css
/* Override default styles */
.my-custom-dropdown {
  --dropdown-width: 300px;
  --dropdown-max-height: 400px;
}

/* Style the trigger button */
.my-custom-button {
  background: #007bff;
  color: white;
}
````

## Keyboard Navigation

- `Enter` / `Space` - Open dropdown
- `↑` / `↓` - Navigate options
- `Enter` - Select option
- `Escape` - Close dropdown
- `Tab` - Move to next focusable element

## Best Practices

1. **Performance**: Use `"never"` for `usePortal` unless you need it
2. **Accessibility**: Always provide meaningful labels and descriptions
3. **Icons**: Use emojis or icon fonts for better visual feedback
4. **Groups**: For many options, consider grouping by category

## TypeScript

Full TypeScript support with exported types:

```typescript
import type { QuickFilterOption, QuickFilterDropdownProps } from "ag-grid-react-components";
```

## Browser Support

- All modern browsers (Chrome, Firefox, Safari, Edge)
- IE11 not supported
