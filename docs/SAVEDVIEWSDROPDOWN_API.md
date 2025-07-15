# SavedViewsDropdown API Reference

The SavedViewsDropdown component provides a comprehensive solution for saving and managing AG Grid view states, including filters, column configurations, and sort settings. It offers both styled and headless implementations for maximum flexibility.

## Installation

```bash
npm install ag-grid-react-components
```

## Basic Usage

```tsx
import { SavedViewsDropdown } from "ag-grid-react-components";

function MyGrid() {
  const [gridApi, setGridApi] = useState(null);

  return (
    <div>
      <SavedViewsDropdown api={gridApi} columnId="myColumn" placeholder="My Views" />
      <AgGridReact
        onGridReady={(params) => setGridApi(params.api)}
        // ... other grid props
      />
    </div>
  );
}
```

## Features

### 1. Saving Filters

Save current filter configurations for quick access later:

```tsx
<SavedViewsDropdown
  api={gridApi}
  columnId="status"
  onViewChange={(view) => {
    console.log("Applied view:", view);
  }}
/>
```

### 2. Saving Column State

Preserve column widths, order, visibility, and pinning:

```tsx
// When saving a view with saveType="full-view", column state is automatically captured
const savedView = {
  saveType: "full-view",
  gridState: {
    columnState: api.getColumnState(),
    // Includes: width, order, visibility, pinning, etc.
  },
};
```

### 3. Saving Sort State

Maintain sort configurations across sessions:

```tsx
// Sort state is included in full-view saves
const savedView = {
  saveType: "full-view",
  gridState: {
    sortModel: api.getSortModel(),
    // Preserves multi-column sorting
  },
};
```

## Headless Architecture

The SavedViewsDropdown is built with a headless architecture, allowing complete customization of the UI while maintaining all functionality.

### Unstyled (Headless) Example

```tsx
import { SavedViewsDropdown } from "ag-grid-react-components";

// Basic dropdown with no styling
<SavedViewsDropdown
  api={gridApi}
  columnId="myColumn"
  className="" // No styles applied
/>;
```

### Styled Example

```tsx
import { SavedViewsDropdown } from "ag-grid-react-components";
import "ag-grid-react-components/styles/SavedViewsDropdown.css";

// Styled dropdown with default theme
<SavedViewsDropdown api={gridApi} columnId="myColumn" className="saved-views-dropdown-styled" />;
```

### Custom Styled Example

```tsx
// Create your own styled wrapper
const StyledSavedViewsDropdown = ({ api, columnId }) => {
  return (
    <div className="my-custom-wrapper">
      <SavedViewsDropdown
        api={api}
        columnId={columnId}
        className="my-custom-dropdown"
        showManagementMenu={true}
      />
    </div>
  );
};

// Custom CSS
.my-custom-wrapper {
  position: relative;
  display: inline-flex;
  gap: 8px;
}

.my-custom-dropdown {
  /* Your custom styles */
  background: var(--custom-bg);
  border: 1px solid var(--custom-border);
  border-radius: 8px;
}
```

## API Documentation

### Component Props

| Prop                 | Type                                      | Default              | Description                          |
| -------------------- | ----------------------------------------- | -------------------- | ------------------------------------ |
| `api`                | `GridApi \| null`                         | Required             | AG Grid API instance                 |
| `columnId`           | `string`                                  | Required             | Column ID to apply filters to        |
| `loader`             | `ViewDropdownLoader`                      | `LocalStorageLoader` | View loader instance for persistence |
| `placeholder`        | `string`                                  | `"My Views"`         | Placeholder text for dropdown        |
| `className`          | `string`                                  | -                    | Custom class name for styling        |
| `showManagementMenu` | `boolean`                                 | `true`               | Show view management menu button     |
| `onViewChange`       | `(view: SavedViewOption \| null) => void` | -                    | Callback when view changes           |

### SavedViewOption Interface

```typescript
interface SavedViewOption {
  id: string;
  label: string;
  description?: string;
  icon?: string | React.ReactNode;
  saveType: "filters-only" | "full-view";
  filterModel?: FilterModel | null;
  gridState?: {
    columnState?: unknown[];
    sortModel?: unknown[];
    groupState?: unknown;
    [key: string]: unknown;
  };
  metadata?: {
    createdAt?: string;
    updatedAt?: string;
    createdBy?: string;
    category?: string;
    isDefault?: boolean;
    isPreset?: boolean;
  };
}
```

### ViewDropdownLoader Interface

```typescript
interface ViewDropdownLoader {
  loadOptions(): Promise<SavedViewOption[]>;
  saveOption?(option: SavedViewOption): Promise<void>;
  deleteOption?(id: string): Promise<void>;
  updateOption?(id: string, updates: Partial<SavedViewOption>): Promise<void>;
  getDefaultViewId?(): Promise<string | null>;
  setDefaultView?(id: string): Promise<void>;
  exportViews?(): Promise<string>;
  importViews?(data: string): Promise<void>;
  subscribe?(callback: () => void): () => void;
}
```

## Local Storage vs Server Persistence

### Local Storage (Default)

The component uses `LocalStorageLoader` by default, which stores views in the browser's local storage:

```tsx
import { SavedViewsDropdown } from "ag-grid-react-components";

// Uses LocalStorageLoader automatically
<SavedViewsDropdown api={gridApi} columnId="myColumn" />;
```

### Server Persistence

Create a custom loader to persist views on your server:

```tsx
import { ViewDropdownLoader } from "ag-grid-react-components";

class ServerViewLoader implements ViewDropdownLoader {
  private apiUrl: string;

  constructor(apiUrl: string) {
    this.apiUrl = apiUrl;
  }

  async loadOptions(): Promise<SavedViewOption[]> {
    const response = await fetch(`${this.apiUrl}/views`);
    return response.json();
  }

  async saveOption(option: SavedViewOption): Promise<void> {
    await fetch(`${this.apiUrl}/views`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(option),
    });
  }

  async deleteOption(id: string): Promise<void> {
    await fetch(`${this.apiUrl}/views/${id}`, {
      method: "DELETE",
    });
  }

  async updateOption(id: string, updates: Partial<SavedViewOption>): Promise<void> {
    await fetch(`${this.apiUrl}/views/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });
  }

  // Implement other methods as needed...
}

// Usage
const serverLoader = new ServerViewLoader("https://api.example.com");

<SavedViewsDropdown api={gridApi} columnId="myColumn" loader={serverLoader} />;
```

### Hybrid Approach

Combine local and server storage for offline support:

```tsx
class HybridViewLoader implements ViewDropdownLoader {
  private localStorage: LocalStorageLoader;
  private serverLoader: ServerViewLoader;

  constructor(apiUrl: string) {
    this.localStorage = new LocalStorageLoader();
    this.serverLoader = new ServerViewLoader(apiUrl);
  }

  async loadOptions(): Promise<SavedViewOption[]> {
    try {
      // Try server first
      const serverViews = await this.serverLoader.loadOptions();
      // Cache locally
      await this.localStorage.importViews(JSON.stringify(serverViews));
      return serverViews;
    } catch (error) {
      // Fall back to local storage
      console.warn("Server unavailable, using local cache", error);
      return this.localStorage.loadOptions();
    }
  }

  async saveOption(option: SavedViewOption): Promise<void> {
    // Save locally first
    await this.localStorage.saveOption(option);
    // Then sync to server
    try {
      await this.serverLoader.saveOption(option);
    } catch (error) {
      console.error("Failed to sync to server", error);
    }
  }

  // Implement other methods similarly...
}
```

## Advanced Examples

### With Categories and Organization

```tsx
<SavedViewsDropdown
  api={gridApi}
  columnId="myColumn"
  showManagementMenu={true}
  onViewChange={(view) => {
    if (view?.metadata?.category) {
      console.log(`Applied view from category: ${view.metadata.category}`);
    }
  }}
/>
```

### With Custom Icons

```tsx
const customLoader = new LocalStorageLoader();

// Pre-populate with views that have custom icons
await customLoader.saveOption({
  id: "high-priority",
  label: "High Priority",
  icon: "🔥",
  saveType: "filters-only",
  filterModel: {
    priority: {
      type: "equals",
      filter: "high",
    },
  },
  metadata: {
    category: "Quick Filters",
  },
});

<SavedViewsDropdown api={gridApi} columnId="myColumn" loader={customLoader} />;
```

### Import/Export Functionality

The component includes built-in import/export capabilities:

```tsx
<SavedViewsDropdown
  api={gridApi}
  columnId="myColumn"
  showManagementMenu={true} // Enables import/export buttons
/>
```

Users can:

- Export all views to a JSON file
- Import views from a JSON file
- Share view configurations between users

## Best Practices

1. **Use Descriptive Names**: Give views clear, descriptive names that indicate their purpose
2. **Organize with Categories**: Use categories to group related views
3. **Set Defaults**: Mark commonly used views as default for quick access
4. **Regular Cleanup**: Periodically review and remove unused views
5. **Test Persistence**: Verify your persistence strategy works across sessions
6. **Handle Errors**: Implement error handling for failed save/load operations

## Styling Guide

### CSS Variables

```css
/* Customize the dropdown appearance */
.saved-views-dropdown {
  --dropdown-bg: #ffffff;
  --dropdown-border: #e0e0e0;
  --dropdown-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  --item-hover-bg: #f5f5f5;
  --item-selected-bg: #e3f2fd;
  --text-primary: #333333;
  --text-secondary: #666666;
}
```

### Dark Mode Support

```css
@media (prefers-color-scheme: dark) {
  .saved-views-dropdown {
    --dropdown-bg: #2a2a2a;
    --dropdown-border: #444444;
    --item-hover-bg: #3a3a3a;
    --item-selected-bg: #1976d2;
    --text-primary: #ffffff;
    --text-secondary: #bbbbbb;
  }
}
```

## TypeScript Support

The component is fully typed with TypeScript:

```tsx
import type { SavedViewsDropdownProps, SavedViewOption, ViewDropdownLoader } from "ag-grid-react-components";

const MyComponent: React.FC = () => {
  const handleViewChange = (view: SavedViewOption | null) => {
    // Type-safe view handling
  };

  return <SavedViewsDropdown api={gridApi} columnId="myColumn" onViewChange={handleViewChange} />;
};
```

## See Also

- [QuickFilterDropdown API](./QUICKFILTERDROPDOWN_API.md) - Base dropdown component
- [Grid State Persistence API](./GRIDSTATE_API.md) - URL-based state management
- [Styling Guide](./STYLING_GUIDE.md) - Complete styling documentation
