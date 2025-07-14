# Saved Views API Documentation

The Saved Views system provides a complete solution for saving, managing, and applying grid configurations.

## Components

### SavedViewsDropdown

The main orchestrator component that provides a complete saved views experience.

```tsx
import { SavedViewsDropdown } from "ag-grid-react-components";

<SavedViewsDropdown api={gridApi} columnId="dateCreated" placeholder="My Views" showManagementMenu={true} onViewChange={(view) => console.log("View changed:", view)} />;
```

#### Props

| Prop                 | Type                                      | Required | Default              | Description                   |
| -------------------- | ----------------------------------------- | -------- | -------------------- | ----------------------------- |
| `api`                | `GridApi \| null`                         | Yes      | -                    | AG Grid API instance          |
| `columnId`           | `string`                                  | Yes      | -                    | Column ID to apply filters to |
| `loader`             | `ViewDropdownLoader`                      | No       | `LocalStorageLoader` | View persistence loader       |
| `placeholder`        | `string`                                  | No       | `"My Views"`         | Placeholder text              |
| `className`          | `string`                                  | No       | `""`                 | Custom CSS class              |
| `showManagementMenu` | `boolean`                                 | No       | `true`               | Show three-dots menu          |
| `onViewChange`       | `(view: SavedViewOption \| null) => void` | No       | -                    | View change callback          |

### ViewManagementMenu

Three-dots menu for view management actions.

```tsx
import { ViewManagementMenu } from "ag-grid-react-components";

<ViewManagementMenu api={gridApi} onSaveView={() => setShowSaveModal(true)} onManageViews={() => setShowManageModal(true)} onResetToDefaults={handleReset} onImport={handleImport} onExport={handleExport} />;
```

#### Props

| Prop                | Type              | Required | Default | Description           |
| ------------------- | ----------------- | -------- | ------- | --------------------- |
| `api`               | `GridApi \| null` | Yes      | -       | AG Grid API instance  |
| `onSaveView`        | `() => void`      | No       | -       | Save view callback    |
| `onManageViews`     | `() => void`      | No       | -       | Manage views callback |
| `onResetToDefaults` | `() => void`      | No       | -       | Reset callback        |
| `onImport`          | `() => void`      | No       | -       | Import callback       |
| `onExport`          | `() => void`      | No       | -       | Export callback       |
| `className`         | `string`          | No       | `""`    | Custom CSS class      |

### ViewManagementModal

Modal dialog for managing saved views.

```tsx
import { ViewManagementModal } from "ag-grid-react-components";

<ViewManagementModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} views={savedViews} categories={["Sales", "Marketing", "Support"]} defaultViewId={defaultView} onRename={(id, name) => handleRename(id, name)} onDelete={(id) => handleDelete(id)} onChangeCategory={(id, category) => handleChangeCategory(id, category)} onSetDefault={(id) => handleSetDefault(id)} onExportView={(id) => handleExportView(id)} />;
```

#### Props

| Prop               | Type                                     | Required | Default | Description                 |
| ------------------ | ---------------------------------------- | -------- | ------- | --------------------------- |
| `isOpen`           | `boolean`                                | Yes      | -       | Modal open state            |
| `onClose`          | `() => void`                             | Yes      | -       | Close callback              |
| `views`            | `SavedViewOption[]`                      | Yes      | -       | Array of saved views        |
| `categories`       | `string[]`                               | Yes      | -       | Available categories        |
| `defaultViewId`    | `string \| null`                         | No       | `null`  | Default view ID             |
| `onRename`         | `(id: string, name: string) => void`     | No       | -       | Rename callback             |
| `onDelete`         | `(id: string) => void`                   | No       | -       | Delete callback             |
| `onChangeCategory` | `(id: string, category: string) => void` | No       | -       | Category change callback    |
| `onSetDefault`     | `(id: string) => void`                   | No       | -       | Set default callback        |
| `onExportView`     | `(id: string) => void`                   | No       | -       | Export single view callback |

### SaveViewModal

Modal dialog for saving the current grid state as a view.

```tsx
import { SaveViewModal } from "ag-grid-react-components";

<SaveViewModal
  isOpen={isSaveModalOpen}
  onClose={() => setIsSaveModalOpen(false)}
  api={gridApi}
  categories={["Sales", "Marketing", "Support"]}
  onSave={(viewData) => {
    console.log("Saving view:", viewData);
    // viewData contains: label, saveType, category, description
  }}
/>;
```

#### Props

| Prop         | Type                       | Required | Default | Description          |
| ------------ | -------------------------- | -------- | ------- | -------------------- |
| `isOpen`     | `boolean`                  | Yes      | -       | Modal open state     |
| `onClose`    | `() => void`               | Yes      | -       | Close callback       |
| `api`        | `GridApi \| null`          | Yes      | -       | AG Grid API instance |
| `categories` | `string[]`                 | No       | `[]`    | Available categories |
| `onSave`     | `(view: ViewData) => void` | Yes      | -       | Save callback        |

### GridResetButton

Standalone button for resetting grid state.

```tsx
import { GridResetButton } from "ag-grid-react-components";

<GridResetButton
  api={gridApi}
  defaultViewId={defaultView}
  loader={viewLoader}
  confirmReset={true}
  label="Reset Grid"
  onReset={(resetType) => {
    console.log("Reset type:", resetType); // 'default-view' or 'factory'
  }}
/>;
```

#### Props

| Prop             | Type                        | Required | Default         | Description                  |
| ---------------- | --------------------------- | -------- | --------------- | ---------------------------- |
| `api`            | `GridApi \| null`           | Yes      | -               | AG Grid API instance         |
| `defaultViewId`  | `string`                    | No       | -               | Default view to reset to     |
| `loader`         | `ViewDropdownLoader`        | No       | -               | View loader for default view |
| `confirmReset`   | `boolean`                   | No       | `false`         | Show confirmation dialog     |
| `confirmMessage` | `string`                    | No       | Default message | Custom confirmation message  |
| `label`          | `string`                    | No       | `"Reset"`       | Button label                 |
| `icon`           | `ReactNode`                 | No       | Reset icon      | Custom icon                  |
| `className`      | `string`                    | No       | `""`            | Custom CSS class             |
| `disabled`       | `boolean`                   | No       | `false`         | Disable button               |
| `onReset`        | `(type: ResetType) => void` | No       | -               | Reset callback               |

## Save Types

Views can be saved with different levels of detail:

### Filters Only

Saves only the active filter model:

- Column filters
- Quick filters
- Search filters

### Full View

Saves complete grid state:

- All filters
- Column visibility and order
- Column widths
- Sort model
- Row grouping
- Aggregations

## Built with Headless UI

All saved view components are built on top of Headless UI for excellent accessibility and keyboard navigation:

```tsx
// Components use Headless UI internally
import { ViewManagementMenu, ViewManagementModal, SaveViewModal } from "ag-grid-react-components";

// Full accessibility built-in
<ViewManagementMenu
  api={gridApi}
  onSaveView={handleSave}
  // ... props
/>;
```

## Styling

All components are headless and require styling. The demo uses Tailwind CSS:

```css
/* Example Tailwind styling */
.view-management-menu-trigger {
  @apply p-2 bg-gray-800/50 border border-gray-700/30 
         rounded-md text-gray-200 hover:bg-gray-700/50;
}

.save-view-modal {
  @apply bg-gray-900 border border-gray-700/50 
         rounded-xl shadow-2xl max-w-md w-full;
}
```

## Complete Example

```tsx
import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { SavedViewsDropdown, ActiveFilters, setupGridStatePersistence } from "ag-grid-react-components";

function MyGrid() {
  const [gridApi, setGridApi] = useState(null);
  const [filterModel, setFilterModel] = useState({});

  // Set up persistence (optional)
  const { loadState, clearState } = setupGridStatePersistence();

  const onGridReady = (params) => {
    setGridApi(params.api);
    loadState(params.api); // Load from URL
  };

  const onFilterChanged = () => {
    setFilterModel(gridApi.getFilterModel());
  };

  return (
    <div>
      <div className="toolbar">
        <SavedViewsDropdown
          api={gridApi}
          columnId="dateCreated"
          placeholder="My Views"
          onViewChange={(view) => {
            console.log("Applied view:", view);
          }}
        />

        <ActiveFilters api={gridApi} filterModel={filterModel} />
      </div>

      <AgGridReact
        onGridReady={onGridReady}
        onFilterChanged={onFilterChanged}
        // ... other grid props
      />
    </div>
  );
}
```

## LocalStorage Schema

The default LocalStorageLoader stores views with this structure:

```typescript
interface StoredView {
  id: string;
  label: string;
  saveType: "filters-only" | "full-view";
  filterModel?: FilterModel;
  gridState?: {
    columnState?: ColumnState[];
    sortModel?: SortModelItem[];
    // ... other AG Grid state
  };
  metadata?: {
    category?: string;
    description?: string;
    createdAt?: string;
    updatedAt?: string;
  };
}
```
