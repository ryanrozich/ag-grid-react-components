# Component Mapping & Usage Guide

## All Components Overview

| Component               | Purpose                       | Current Headless UI      | Recommended Headless UI                         | Used in Demo                              |
| ----------------------- | ----------------------------- | ------------------------ | ----------------------------------------------- | ----------------------------------------- |
| **ActiveFilters**       | Display active filter pills   | None                     | `Disclosure` (for grouping)                     | ✅ Client & Server demos                  |
| **CategorySelector**    | Dropdown with search & create | `Combobox` ✅            | `Combobox`                                      | ✅ In SaveViewModal & ViewManagementModal |
| **DateFilter**          | AG Grid date filter           | None                     | `RadioGroup`/`Tab` for mode, `Field` for inputs | ✅ Column definitions                     |
| **RelativeDateFilter**  | Relative date expressions     | None                     | None (AG Grid specific)                         | ❌ Legacy component                       |
| **QuickFilterDropdown** | Filter preset dropdown        | None                     | `Listbox`                                       | ✅ Client & Server demos                  |
| **SavedViewsDropdown**  | Saved views selector          | Orchestrator             | `Popover` for panel                             | ✅ Client & Server demos                  |
| **ViewManagementMenu**  | Three-dots menu               | `Menu` ✅                | `Menu`                                          | ✅ Via SavedViewsDropdown                 |
| **ViewManagementModal** | Manage views dialog           | `Dialog` ✅              | `Dialog`                                        | ✅ Via ViewManagementMenu                 |
| **SaveViewModal**       | Save view dialog              | `Dialog` + `Fieldset` ✅ | `Dialog` + `Fieldset`                           | ✅ Via ViewManagementMenu                 |
| **GridResetButton**     | Reset grid button             | None                     | `Dialog` for confirmation                       | ✅ Via ViewManagementMenu                 |
| **FilterPresetManager** | Manage filter presets         | None                     | `Menu` for dropdowns                            | ✅ In demo toolbar                        |

## Detailed Component Mapping

### 1. ActiveFilters

- **What it does**: Shows removable filter pills
- **Headless UI**: Not needed (simple display component)
- **Demo usage**:
  ```tsx
  // In components-showcase-complete.tsx
  <ActiveFilters api={gridApi} filterModel={filterModel} />
  ```

### 2. CategorySelector

- **What it does**: Searchable dropdown with "create new" option
- **Headless UI**: `Combobox` (perfect fit)
- **Demo usage**:
  ```tsx
  // In SaveViewModal
  <CategorySelector value={category} onChange={setCategory} existingCategories={categories} />
  ```

### 3. DateFilter

- **What it does**: AG Grid custom date filter
- **Headless UI**: None (too AG Grid specific)
- **Demo usage**:
  ```tsx
  // In column definitions
  {
    field: 'dateCreated',
    filter: 'agDateColumnFilter',
    filterParams: {
      filterComponent: AGGridFilterWrapper
    }
  }
  ```

### 4. QuickFilterDropdown

- **What it does**: Dropdown for filter presets
- **Headless UI**: `Listbox` or `Combobox`
- **Demo usage**:
  ```tsx
  <QuickFilterDropdown api={gridApi} columnId="dateCreated" options={dateQuickFilters} placeholder="Quick Filters" />
  ```

### 5. SavedViewsDropdown

- **What it does**: Orchestrates view management components
- **Headless UI**: N/A (uses other components)
- **Demo usage**:
  ```tsx
  <SavedViewsDropdown api={gridApi} columnId="dateCreated" placeholder="My Views" />
  ```

### 6. ViewManagementMenu

- **What it does**: Dropdown menu with actions
- **Headless UI**: `Menu` (perfect fit)
- **Demo usage**: Used internally by SavedViewsDropdown

### 7. ViewManagementModal

- **What it does**: Modal to manage saved views
- **Headless UI**: `Dialog` (perfect fit)
- **Demo usage**: Opened via ViewManagementMenu

### 8. SaveViewModal

- **What it does**: Modal to save current view
- **Headless UI**: `Dialog` (perfect fit)
- **Demo usage**: Opened via ViewManagementMenu

### 9. GridResetButton

- **What it does**: Button to reset grid state
- **Headless UI**: None (simple button)
- **Demo usage**: Action in ViewManagementMenu

## Components That Should Use Headless UI

### ✅ Definitely Convert

1. **CategorySelector** → `Combobox`
2. **ViewManagementMenu** → `Menu`
3. **ViewManagementModal** → `Dialog`
4. **SaveViewModal** → `Dialog`

### 🤔 Maybe Convert

1. **QuickFilterDropdown** → `Combobox` or `Listbox`
   - Has AG Grid specific logic
   - Could benefit from better accessibility

### ❌ Keep Custom

1. **ActiveFilters** - Simple display component
2. **DateFilter** - AG Grid filter component
3. **SavedViewsDropdown** - Orchestrator component
4. **GridResetButton** - Simple button

## Demo Architecture

```
components-showcase-complete.tsx
├── Uses TailwindStyledComponents
│   ├── QuickFilterDropdown
│   ├── ActiveFilters
│   └── SavedViewsDropdown
│       ├── ViewManagementMenu
│       ├── ViewManagementModal
│       │   └── CategorySelector
│       └── SaveViewModal
│           └── CategorySelector
└── Grid Configuration
    └── DateFilter (via AGGridFilterWrapper)
```

## Tailwind CSS in Demo

The demo applies Tailwind styles via:

1. **CSS @apply directives** in `tailwind-overrides.css`
2. **Direct Tailwind classes** on wrapper components
3. **Headless components** remain unstyled

This showcases that users can:

- Use any CSS framework
- Apply Tailwind utilities
- Keep components headless

## Headless UI Components Usage

### Currently Implemented

1. **SaveViewModal with Fieldset** ✅

   ```tsx
   import { Dialog, Fieldset, Field, Label, Input, Textarea, Legend } from "@headlessui/react";
   ```

   - Uses semantic form structure with Fieldset
   - Better accessibility for form groups
   - Proper field associations

2. **CategorySelector with Combobox** ✅

   ```tsx
   import { Combobox, Transition } from "@headlessui/react";
   ```

   - Searchable dropdown with create option
   - Built-in keyboard navigation
   - Automatic filtering

3. **ViewManagementMenu with Menu** ✅
   ```tsx
   import { Menu, Transition } from "@headlessui/react";
   ```
   - Accessible dropdown menu
   - Keyboard navigation
   - Focus management

### Recommended Implementations

#### High Priority

1. **QuickFilterDropdown → Listbox**
   - Current: Custom dropdown with manual focus management
   - Benefit: Built-in keyboard navigation and ARIA support
2. **DateFilter Mode Toggle → RadioGroup**

   - Current: Custom toggle buttons
   - Benefit: Proper radio semantics and keyboard navigation

3. **SavedViewsDropdown Panel → Popover**
   - Current: Custom portal implementation
   - Benefit: Better positioning and focus trap

#### Medium Priority

4. **Date Range Inputs → Field Components**

   ```tsx
   <Field>
     <Label>Start Date</Label>
     <Input type="date" />
     <Description>Select the start date for filtering</Description>
   </Field>
   ```

5. **GridResetButton Confirmation → Dialog**
   - Replace `window.confirm()` with styled Dialog
   - Better UX and consistent styling

#### Low Priority

6. **ActiveFilters → Disclosure**

   - Add collapsible sections for grouped filters
   - Better organization with many active filters

7. **Filter Type Selector → Listbox**
   - Replace native `<select>` with styled Listbox
   - Consistent styling across components

### Installation Required

**Note**: To use Headless UI components, add to package.json:

```json
{
  "peerDependencies": {
    "@headlessui/react": "^2.0.0"
  }
}
```

### Benefits of Headless UI

1. **Accessibility**: WAI-ARIA compliant out of the box
2. **Keyboard Navigation**: Full keyboard support built-in
3. **Focus Management**: Proper focus trapping and restoration
4. **Reduced Code**: Less custom logic to maintain
5. **Consistent Behavior**: Predictable interactions across components
