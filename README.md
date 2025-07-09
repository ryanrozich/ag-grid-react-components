# AG Grid React Components

🎉 **Pre-release: Modular Architecture with Minimal Bundle Size!**

A collection of powerful, tree-shakeable React components for AG Grid (v33.3.0+) that enhance your data grid with advanced filtering and state management capabilities. Start with just 25KB or add features as needed.

📖 **[Full Documentation →](./docs/)**
🚀 **[Live Demo →](https://demo.rozich.net/ag-grid-react-components/)**

## 🚀 Features

### 📅 Relative Date Filter

A custom date filter that supports both absolute dates and relative date expressions:

- **Dual Mode Support**: Switch between date picker and expression mode
- **Relative Expressions**: Use expressions like "Today+7d", "StartOfMonth-1M"
- **Comprehensive Operations**: Equals, Not Equals, After, Before, In Range
- **Real-time Validation**: Shows resolved dates for relative expressions

### 🎯 Quick Filter Dropdown

A dropdown component for applying predefined filters quickly:

- **Preset Options**: Pre-configured filter options for common scenarios
- **Customizable**: Define your own filter presets
- **Keyboard Navigation**: Full keyboard support
- **Search Functionality**: Search through options for large lists
- **Icons & Descriptions**: Rich UI with icons and descriptions

### 🔍 Active Filters Display

A component that displays active filters as removable pills:

- **Visual Feedback**: Shows filter column names and values
- **Individual Removal**: Click × to remove specific filters
- **Clear All**: Remove all filters with one click
- **Filter Types**: Handles date, text, and set filters
- **Customizable**: Style with CSS classes

### 💾 Filter Preset Sharing

Save and share filter configurations with others:

- **URL Sharing**: Share presets via compressed URLs
- **Export/Import**: Download presets as JSON files
- **Compression**: Achieves >50% size reduction with LZ-String
- **Two Modes**: Embedded (full data) or Reference (ID only)
- **ShareButton Component**: Ready-to-use UI for sharing
- **Auto-load from URL**: Automatically apply shared presets

### 🔗 URL State Persistence

Comprehensive grid state persistence with URL synchronization:

- **Full Grid State**: Persists filters, columns, sorting, and grouping
- **URL Compression**: Uses LZ-String for 50-90% smaller URLs
- **Browser History**: Full back/forward navigation support
- **Shareable Links**: Share complete grid configurations
- **Selective Persistence**: Choose which state to include
- **Date Serialization**: Properly handles Date objects

### 💾 Filter Presets (New!)

Save, load, and share filter configurations with the new preset system:

- **User Presets**: Save personal filter combinations in localStorage
- **System Presets**: Pre-configured filters provided by developers
- **Import/Export**: Share presets via JSON files
- **Shareable URLs**: Generate links for specific filter configurations
- **QuickFilterDropdown Integration**: Built-in preset support
- **Storage Management**: Automatic compression and quota handling
- **Cross-Tab Sync**: Presets update across browser tabs
- **Version Migration**: Automatic updates when filter models change

📖 **[Filter Presets Documentation →](./docs/filter-presets/)**

## 📦 Installation

Choose your installation based on your needs:

### Minimal Installation (25KB)

````bash
# Install the complete package (tree-shakeable)
npm install ag-grid-react-components
```text

### With React DatePicker (65KB)

```bash
# Install with peer dependencies for date picker
npm install ag-grid-react-components react-datepicker
```text

### Full Installation (85KB)

```bash
# Install with all optional dependencies
npm install ag-grid-react-components react-datepicker lz-string
```text

## 📋 Requirements

- AG Grid Community or Enterprise v33.3.0+
- React 18 or later
- date-fns v4 or later

## 🔧 Basic Usage

### Basic Setup (25KB)

```tsx
import { AgGridReact } from "ag-grid-react";
import { createDateFilter } from "ag-grid-react-components";

// Create DateFilter with native HTML5 inputs
const DateFilter = createDateFilter();

const columnDefs = [
  {
    field: "date",
    filter: DateFilter,
    floatingFilter: true,
  },
];
```text

### React DatePicker Integration

```tsx
import { createDateFilter, reactDatePickerAdapter } from "ag-grid-react-components";

// Create DateFilter with React DatePicker
const DateFilter = createDateFilter({
  datePickerAdapter: reactDatePickerAdapter,
});
```text

### Full Setup Example (85KB)

```tsx
import { AgGridReact } from "ag-grid-react";
import { createDateFilter, createQuickFilterDropdown, createActiveFilters, setupGridStatePersistence, reactDatePickerAdapter } from "ag-grid-react-components";

// Create all components
const DateFilter = createDateFilter({
  datePickerAdapter: reactDatePickerAdapter,
});
const QuickFilterDropdown = createQuickFilterDropdown();
const ActiveFilters = createActiveFilters();

function App() {
  const [gridApi, setGridApi] = useState(null);

  const onGridReady = (params) => {
    setGridApi(params.api);
    // Enable compressed URL state persistence
    setupGridStatePersistence(params.api, {
      compressionAdapter: createLZStringAdapter(),
      useCompression: true,
    });
  };

  return (
    <div>
      <QuickFilterDropdown
        api={gridApi}
        columnId="date"
        options={[
          { id: "today", label: "Today" },
          { id: "week", label: "This Week" },
        ]}
      />

      <AgGridReact columnDefs={columnDefs} onGridReady={onGridReady} rowData={rowData} />
    </div>
  );
}
```text

### Filter Presets Example

```tsx
import { QuickFilterDropdown, useFilterPresets } from "ag-grid-react-components";

function App() {
  const [gridApi, setGridApi] = useState(null);

  return (
    <div>
      {/* QuickFilterDropdown with preset support */}
      <QuickFilterDropdown
        api={gridApi}
        columnId="date"
        enablePresets={{
          systemPresets: [
            {
              id: "recent",
              name: "Recent Activity",
              gridState: {
                filterModel: {
                  date: { type: "after", mode: "relative", expressionFrom: "Today-7d" },
                },
              },
            },
            {
              id: "high-priority",
              name: "High Priority",
              gridState: {
                filterModel: {
                  priority: { type: "equals", filter: "high" },
                  status: { type: "notEqual", filter: "completed" },
                },
              },
            },
          ],
          allowUserPresets: true,
          defaultPresetId: "recent",
        }}
      />

      <AgGridReact columnDefs={columnDefs} onGridReady={onGridReady} rowData={rowData} />
    </div>
  );
}

// Or use the hook directly for custom UI
function CustomPresetUI({ gridApi }) {
  const { presets, savePreset, loadPreset } = useFilterPresets({ gridApi });

  return (
    <div>
      <select onChange={(e) => loadPreset(e.target.value)}>
        {presets.map((preset) => (
          <option key={preset.id} value={preset.id}>
            {preset.name}
          </option>
        ))}
      </select>
      <button onClick={() => savePreset({ name: "My Filters" })}>Save Current Filters</button>
    </div>
  );
}
````

## 🌟 Bundle Sizes

| Use Case                 | Bundle Size |
| ------------------------ | ----------- |
| Just DateFilter (native) | **25KB**    |
| With React DatePicker    | **65KB**    |
| With Preset Sharing      | **35KB**    |
| All components           | **85KB**    |

## 🎯 Key Features

### Core Features (25KB minimal)

- ✅ DateFilter with native HTML5 inputs
- ✅ QuickFilterDropdown for preset filters
- ✅ ActiveFilters display component
- ✅ Tree-shakeable architecture

### Optional Features (loaded on demand)

- 💾 Filter Preset Sharing (+10KB when used)
- 📅 React DatePicker integration (+40KB when used)
- 🗜️ LZ-String URL compression (+20KB when used)
- 💾 Filter Presets with localStorage/IndexedDB support
- 🎨 Pre-built styles (optional)
- 🔌 Full TypeScript support

#### Portal Rendering

The dropdown supports three rendering modes via the `usePortal` prop:

- **`"never"` (default)**: Uses CSS positioning. Best performance for most cases.
- **`"always"`**: Always renders using React Portal. Use when the dropdown is inside containers with `overflow: hidden`.
- **`"auto"`**: Automatically detects if portal is needed (experimental).

````tsx
// Example: Dropdown inside a scrollable container
<div style={{ overflow: "auto", height: "300px" }}>
  <QuickFilterDropdown
    api={api}
    columnId="status"
    options={statusOptions}
    usePortal="always" // Prevents clipping in scrollable container
  />
</div>
```text

## 📚 API Documentation

### Date Filter

```typescript
// Factory function with options
const DateFilter = createDateFilter({
  datePickerAdapter?: DatePickerAdapter,  // Optional date picker
  className?: string,                      // Custom CSS class
  styles?: DateFilterStyles               // Custom styles object
});

// Filter parameters
filterParams: {
  buttons?: ['reset', 'apply'],
  closeOnApply?: boolean,
  defaultMode?: 'absolute' | 'relative',
  dateFormat?: string,  // date-fns format

  // Inclusivity settings
  afterInclusive?: boolean,    // >= vs >
  beforeInclusive?: boolean,   // <= vs <
  rangeInclusive?: {
    from?: boolean,
    to?: boolean
  }
}
```text

### Quick Filter Dropdown

```typescript
interface QuickFilterOption {
  id: string;
  label: string;
  icon?: string;
  description?: string;
  filterModel?: Record<string, unknown>;
  onSelect?: (api: GridApi) => void;
}

const QuickFilterDropdown = createQuickFilterDropdown();

<QuickFilterDropdown
  api={gridApi}
  columnId="date"
  options={options}
  placeholder="Select filter"
  showDescriptions={true}
  usePortal="never" | "always" | "auto"

  // Optional: Enable filter presets
  enablePresets={{
    storage: presetStorage,
    systemPresets: systemPresets,
    onPresetChange: handlePresetChange,
    allowSave: true,
    allowManage: true,
    onManageClick: handleManageClick,
    maxPresets: 20
  }}
/>
```text

### Filter Presets

```typescript
// Storage adapter interface
interface PresetStorage {
  load: () => Promise<FilterPreset[]>;
  save: (presets: FilterPreset[]) => Promise<void>;
  remove: (id: string) => Promise<void>;
  getStorageInfo?: () => Promise<StorageInfo>;
}

// Use the preset hook
const presets = usePresets({
  storage: localStorageAdapter,
  systemPresets: [
    {
      id: 'recent',
      name: 'Recent Items',
      filterModel: { /* ... */ },
      isSystem: true
    }
  ],
  onPresetChange: (preset) => console.log('Preset changed:', preset),
  maxPresets: 50
});

// Save preset dialog
<SavePresetDialog
  isOpen={showDialog}
  onClose={() => setShowDialog(false)}
  onSave={(name, description, tags) => {
    presets.addPreset({
      name,
      description,
      tags,
      filterModel: gridApi.getFilterModel()
    });
  }}
  existingNames={presets.presets.map(p => p.name)}
  currentFilterModel={gridApi.getFilterModel()}
  storageInfo={presets.storageInfo}
/>

// Preset manager component
<PresetManager
  presets={presets.presets}
  activePresetId={presets.activePresetId}
  onSetDefault={presets.setDefaultPreset}
  onEdit={handleEditPreset}
  onDelete={presets.deletePresets}
  onExport={presets.exportPresets}
  onImport={presets.importPresets}
/>
```text

### Grid State Persistence

```typescript
import { setupGridStatePersistence } from "ag-grid-react-components";

// With compression (enabled by default)
const cleanup = setupGridStatePersistence(gridApi, {
  useCompression: true,
  maxUrlLength: 2000,

  includeFilters: true,
  includeColumns: true,
  includeSort: true,
  includeRowGrouping: true,

  onStateLoad: (state) => console.log("Loaded:", state),
  onStateSave: (state) => console.log("Saved:", state),
});
```text

#### Advanced Examples

##### Selective State Persistence

```tsx
// Only persist specific state elements
const cleanup = setupGridStatePersistence(gridApi, {
  includeFilters: true,
  includeColumns: false, // Don't persist column changes
  includeSort: true,
  includeRowGrouping: false, // Don't persist grouping
});
```text

### Filter Presets (2)

```typescript
// Using with QuickFilterDropdown
<QuickFilterDropdown
  api={gridApi}
  columnId="date"
  enablePresets={{
    // System-defined presets
    systemPresets: [
      {
        id: 'recent',
        name: 'Recent Activity',
        gridState: { filterModel: {...} }
      }
    ],

    // User preset settings
    allowUserPresets: true,
    maxUserPresets: 20,
    defaultPresetId: 'recent',

    // Callbacks
    onPresetSaved: (preset) => console.log('Saved:', preset),
    onPresetLoaded: (preset) => console.log('Loaded:', preset)
  }}
/>

// Using the hook directly
const {
  presets,          // All presets (system + user)
  userPresets,      // User presets only
  systemPresets,    // System presets only
  activePreset,     // Currently active preset

  savePreset,       // Save current filters as preset
  loadPreset,       // Load a preset by ID
  deletePreset,     // Delete a user preset
  updatePreset,     // Update existing preset

  exportPresets,    // Export to JSON
  importPresets,    // Import from JSON
  getShareableUrl,  // Generate shareable URL

  canSavePreset,    // Check if can save more
  isLoading,        // Loading state
  error            // Error state
} = useFilterPresets({
  gridApi,
  storageKey: 'my-app-presets',
  systemPresets: [...],
  autoSave: true,
  autoSaveDelay: 2000
});

// Example: Save current filters
await savePreset({
  name: 'Q4 Analysis',
  description: 'Filters for Q4 report',
  tags: ['quarterly', 'report']
});

// Example: Generate shareable URL
const shareUrl = getShareableUrl(preset.id);
```text

#### Manual State Management

```tsx
import { captureGridState, applyGridState } from "ag-grid-react-components";

// Capture current state
const state = captureGridState(gridApi, {
  includeFilters: true,
  includeColumns: true,
});

// Save to localStorage
localStorage.setItem("gridState", JSON.stringify(state));

// Restore from localStorage
const savedState = localStorage.getItem("gridState");
if (savedState) {
  const state = JSON.parse(savedState);
  applyGridState(gridApi, state);
}

// Send to server
const saveToServer = async () => {
  const state = captureGridState(gridApi);
  await fetch("/api/grid-state", {
    method: "POST",
    body: JSON.stringify(state),
  });
};
```text

#### Compression Effectiveness

LZ-String compression provides significant URL length reduction:

| State Type            | Original    | Compressed | Reduction |
| --------------------- | ----------- | ---------- | --------- |
| Simple filters        | 312 chars   | 88 chars   | 72%       |
| Complex grid state    | 2,890 chars | 342 chars  | 88%       |
| 10 column definitions | 1,245 chars | 156 chars  | 87%       |

Example compressed URL:

```text
https://app.com/?gridState=N4IgZgpgLghgbgUwHZQKYQPYFMCeEB0IA5gMYD2AdAK4C2E...
```text

#### State Persistence Options

You can choose between filter-only persistence or full grid state persistence:

```tsx
// Option 1: Filter persistence only (lightweight)
import { setupFilterStatePersistence } from "ag-grid-react-components";
setupFilterStatePersistence(params.api);

// Option 2: Full grid state persistence (recommended)
import { setupGridStatePersistence } from "ag-grid-react-components";
setupGridStatePersistence(params.api, {
  useCompression: true,
  includeFilters: true,
  includeColumns: true,
  includeSort: true,
});
```text

#### Custom State Handlers

```tsx
// Example: Save to server with short ID
const setupServerStatePersistence = (gridApi) => {
  return setupGridStatePersistence(gridApi, {
    maxUrlLength: 100, // Force server storage for long states

    onStateSave: async (state) => {
      const url = new URL(window.location);

      if (JSON.stringify(state).length > 100) {
        // State too large for URL, save to server
        const response = await fetch("/api/grid-state", {
          method: "POST",
          body: JSON.stringify(state),
        });
        const { id } = await response.json();

        // Use short ID in URL
        url.searchParams.set("stateId", id);
      } else {
        // Small state, keep in URL
        url.searchParams.set("gridState", JSON.stringify(state));
      }

      window.history.replaceState({}, "", url);
    },

    onStateLoad: async (state) => {
      const url = new URL(window.location);
      const stateId = url.searchParams.get("stateId");

      if (stateId) {
        // Load from server
        const response = await fetch(`/api/grid-state/${stateId}`);
        return await response.json();
      }

      return state;
    },
  });
};
```text

### Filter Preset Sharing

```typescript
// ShareButton Component
interface ShareButtonProps {
  preset: FilterPreset;
  baseUrl?: string;
  onCopy?: () => void;
  renderTrigger?: (props: TriggerProps) => React.ReactNode;
}

<ShareButton
  preset={currentPreset}
  baseUrl="https://app.example.com"
  onCopy={() => console.log('Copied!')}
/>

// usePresetFromUrl Hook
interface UsePresetFromUrlOptions {
  loadPresetById?: (id: string) => Promise<FilterPreset>;
  autoLoad?: boolean;
}

const { preset, presetId, loading, error, loadPreset, clearPreset } = usePresetFromUrl({
  loadPresetById: async (id) => fetchPresetFromAPI(id),
  autoLoad: true
});

// Import/Export Functions
import { exportPresets, importPresets } from "ag-grid-react-components";

// Export presets
const exportData = exportPresets(savedPresets);
// Returns: { version: "1.0.0", exportDate: string, source: string, presets: FilterPreset[] }

// Import presets with different modes
const result = importPresets(data, existingPresets, 'merge');
// Modes: 'replace' | 'merge' | 'add'
// Returns: { imported: FilterPreset[], skipped: FilterPreset[], errors: ImportError[] }

// URL Serialization
import { createShareableUrl, extractPresetFromUrl } from "ag-grid-react-components";

// Create shareable URL
const shareResult = createShareableUrl(preset, {
  mode: 'embedded', // or 'reference'
  baseUrl: 'https://app.example.com',
  compress: true
});
// Returns: { url: string, compressed: boolean, originalSize: number, finalSize: number }

// Extract preset from current URL
const extractResult = extractPresetFromUrl();
// Returns: { preset?: FilterPreset, presetId?: string, compressed: boolean, error?: string }
```text

#### Preset Format

```typescript
interface FilterPreset {
  id: string;
  name: string;
  description?: string;
  gridState: any; // AG Grid filter model
  createdAt: string;
  updatedAt?: string;
  tags?: string[];
  author?: string;
}
````

#### Sharing Modes

- **Embedded Mode**: Entire preset data is compressed and included in the URL
  - Best for: Sharing via email, chat, or when no backend is available
  - URL length: ~200-500 characters for typical presets
- **Reference Mode**: Only the preset ID is included in the URL
  - Best for: When you have a backend to store presets
  - URL length: ~50 characters
  - Requires: `loadPresetById` function in `usePresetFromUrl`

#### Compression Details

The sharing system uses LZ-String compression to achieve >50% size reduction:

````typescript
// Compression utilities are also exported
import { compress, decompress } from "ag-grid-react-components";

const compressed = compress(JSON.stringify(data)); // Returns compressed string
const original = JSON.parse(decompress(compressed)); // Returns original data
```text

## 📅 Advanced DateFilter Features

### Open-Ended Date Ranges

The DateFilter now supports open-ended date ranges, allowing you to filter dates with only a start or end date:

```tsx
// Filter all dates after January 1, 2024 (no end date)
const filterModel = {
  type: "inRange",
  mode: "absolute",
  dateFrom: new Date("2024-01-01"),
  dateTo: null, // Open-ended to future
};

// Filter all dates before December 31, 2024 (no start date)
const filterModel = {
  type: "inRange",
  mode: "absolute",
  dateFrom: null, // Open-ended from past
  dateTo: new Date("2024-12-31"),
};

// With relative expressions
const filterModel = {
  type: "inRange",
  mode: "relative",
  expressionFrom: "Today-30d",
  expressionTo: null, // All dates from 30 days ago onwards
};
```text

### Inclusive/Exclusive Date Filtering

Control whether date boundaries are inclusive or exclusive for precise filtering:

```tsx
const columnDefs = [
  {
    field: "date",
    filter: RelativeDateFilter,
    filterParams: {
      // Make 'after' filter inclusive (>= instead of >)
      afterInclusive: true,

      // Make 'before' filter inclusive (<= instead of <)
      beforeInclusive: true,

      // Control inclusivity for date ranges
      rangeInclusive: {
        from: true, // Include start date (>=)
        to: true, // Include end date (<=)
      },
    },
  },
];
```text

You can also set inclusivity per filter instance:

```tsx
// Programmatically set filter with specific inclusivity
api.setFilterModel({
  dateColumn: {
    type: "inRange",
    mode: "absolute",
    dateFrom: new Date("2024-01-01"),
    dateTo: new Date("2024-12-31"),
    fromInclusive: true, // Include January 1st
    toInclusive: false, // Exclude December 31st
  },
});
````

#### Inclusivity Examples

- **Exclusive (default)**: `after 2024-01-01` matches dates > 2024-01-01 (2024-01-02 onwards)
- **Inclusive**: `after 2024-01-01` with `afterInclusive: true` matches dates >= 2024-01-01 (includes 2024-01-01)
- **Range exclusive**: `2024-01-01 to 2024-01-31` matches dates > 2024-01-01 and < 2024-01-31
- **Range inclusive**: `2024-01-01 to 2024-01-31` with `rangeInclusive: {from: true, to: true}` matches dates >= 2024-01-01 and <= 2024-01-31

## 📚 Date Expression Syntax

The Relative Date Filter supports powerful expressions for dynamic date filtering. See the [comprehensive Date Expressions documentation](./docs/DATE_EXPRESSIONS.md) for full details.

### Quick Reference

- **Basic**: `Today`, `StartOfWeek`, `EndOfMonth`, `StartOfYear`
- **Arithmetic**: `Today+7d`, `Today-30d`, `Today+1m`, `Today-1y`
- **Period Start/End**: `StartOfMonth`, `EndOfYear`, `StartOfWeek`, `EndOfWeek`

### Units

- `d` - days
- `w` - weeks
- `m` - months
- `y` - years

📖 [Full Documentation →](./docs/DATE_EXPRESSIONS.md)

## 🎯 Preset System

The preset system provides a two-tier architecture for managing and applying predefined filter configurations:

### System Presets

Read-only presets defined by developers for common filtering patterns:

````tsx
import { PresetManager, DEFAULT_SYSTEM_PRESETS } from "ag-grid-react-components";

// Initialize preset manager with system presets
const presetManager = new PresetManager();
presetManager.registerSystemPresets(DEFAULT_SYSTEM_PRESETS);
```text

### User Presets

Full CRUD support for user-defined presets with tags and default selection:

```tsx
// Save current filters as a user preset
const preset = presetManager.saveUserPreset({
  name: "My Custom View",
  description: "Filters for my workflow",
  gridState: { filters: api.getFilterModel() },
  tags: ["custom", "workflow"],
});

// Set as default preset (auto-loads on page refresh)
presetManager.setDefaultPreset(preset.id);

// Update an existing preset
presetManager.updateUserPreset(preset.id, {
  name: "Updated View Name",
});

// Delete a preset
presetManager.deleteUserPreset(preset.id);
```text

### Template Variables

Dynamic values that resolve at runtime:

```tsx
// Available template variables:
// {{today}} - Current date at midnight
// {{yesterday}} - Yesterday at midnight
// {{tomorrow}} - Tomorrow at midnight
// {{last7Days}} - 7 days ago
// {{last30Days}} - 30 days ago
// {{last90Days}} - 90 days ago
// {{startOfWeek}} - Start of current week
// {{endOfWeek}} - End of current week
// {{startOfMonth}} - Start of current month
// {{endOfMonth}} - End of current month
// {{startOfQuarter}} - Start of current quarter
// {{endOfQuarter}} - End of current quarter
// {{startOfYear}} - Start of current year
// {{endOfYear}} - End of current year
// {{currentUser}} - Current user (requires context)

// Example preset with templates
const systemPreset = {
  id: "recent-changes",
  name: "Recent Changes",
  gridState: {
    filters: {
      updatedAt: {
        filterType: "date",
        type: "after",
        filter: "{{last7Days}}",
      },
    },
  },
};
```text

### Integration with QuickFilterDropdown

```tsx
const [presetManager] = useState(() => new PresetManager());

// Convert presets to dropdown options
const presetOptions = presetManager.getAllPresets().user.map((preset) => ({
  id: preset.id,
  label: preset.name,
  description: preset.description,
  filterModel: preset.gridState.filters,
  tags: preset.tags,
}));

const systemPresetOptions = presetManager.getAllPresets().system.map((preset) => ({
  id: preset.id,
  label: preset.name,
  description: preset.description,
  filterModel: preset.gridState.filters,
  isSystemPreset: true,
}));

<QuickFilterDropdown
  api={gridApi}
  columnId="_all" // Use "_all" for grid-wide presets
  options={presetOptions}
  systemPresets={systemPresetOptions}
  enablePresetManagement={true}
  onPresetSave={(preset) => {
    presetManager.saveUserPreset(preset);
  }}
  onPresetDelete={(presetId) => {
    presetManager.deleteUserPreset(presetId);
  }}
/>;
```text

### Preset Storage

User presets are automatically persisted to localStorage and synchronized across browser tabs:

```tsx
// Listen for preset changes
const unsubscribe = presetManager.onPresetsChange((presets) => {
  console.log("System presets:", presets.system);
  console.log("User presets:", presets.user);
  console.log("Active preset ID:", presets.activeId);
});

// Listen for default preset changes
const unsubscribeDefault = presetManager.onDefaultChange((preset) => {
  if (preset) {
    // Apply default preset on load
    const resolvedState = resolveTemplateInGridState(preset.gridState);
    api.setFilterModel(resolvedState.filters);
  }
});
```text

### Creating Custom System Presets

```tsx
import { createSystemPreset, combineSystemPresets } from "ag-grid-react-components";

// Create domain-specific presets
const mySystemPresets = [
  createSystemPreset({
    id: "critical-issues",
    name: "Critical Issues",
    description: "High priority items needing attention",
    gridState: {
      filters: {
        priority: { filterType: "text", type: "equals", filter: "critical" },
        status: { filterType: "text", type: "notEqual", filter: "resolved" },
      },
    },
  }),
];

// Combine with default presets
const allSystemPresets = combineSystemPresets(DEFAULT_SYSTEM_PRESETS, mySystemPresets);
```text

## 🎨 Customization

See the [comprehensive Styling Guide](./docs/STYLING_GUIDE.md) for detailed customization options.

### Quick Start

The components use CSS variables for easy theming:

```css
:root {
  --agrc-primary: #2563eb;
  --agrc-border: #e5e7eb;
  --agrc-hover: #f3f4f6;
}
```text

### Custom Quick Filter Options

```tsx
const customOptions = [
  {
    id: "all",
    label: "All Items",
    filterModel: null, // Clears filter
  },
  {
    id: "recent",
    label: "Last 7 Days",
    filterModel: {
      mode: "relative",
      type: "inRange",
      expressionFrom: "Today-7d",
      expressionTo: "Today",
    },
  },
];
```text

### Styling

The components use CSS modules and can be customized via CSS variables:

```css
:root {
  --agrc-primary: #2563eb;
  --agrc-border: #e5e7eb;
  --agrc-hover: #f3f4f6;
}
````

## 🧪 Testing

Components are thoroughly tested with:

- Unit tests (Vitest + React Testing Library)
- Integration tests with AG Grid
- E2E tests (Playwright)

## ⚠️ Known Issues

### AG Grid v33 setFilterModel Bug

When calling `api.setFilterModel()` programmatically on custom React filter components in AG Grid v33, the filter doesn't properly initialize. This is a known AG Grid bug affecting all v33.x versions.

### Related Issues

- [ag-grid/ag-grid#2256](https://github.com/ag-grid/ag-grid/issues/2256)
- [ag-grid/ag-grid#2709](https://github.com/ag-grid/ag-grid/issues/2709)
- [ag-grid/ag-grid#4870](https://github.com/ag-grid/ag-grid/issues/4870)

### Workaround

Use the provided `applyFilterModelWithWorkaround` function:

````tsx
import { applyFilterModelWithWorkaround } from "ag-grid-react-components";

// Instead of:
api.setFilterModel({ dateColumn: filterModel });

// Use:
await applyFilterModelWithWorkaround(api, "dateColumn", filterModel);
```text

This workaround handles AG Grid v33's Promise-based filter instances and ensures the filter state is properly initialized. It should be removed once AG Grid fixes the underlying issue.

## 🚀 Demo

Live demo available at: <https://demo.rozich.net/ag-grid-react-components/>

The demo is deployed using a custom Cloudflare Workers architecture. See:

- [Demo Router Repository](https://github.com/ryanrozich/demo-router-worker) - The centralized router that serves all demos
- [Deployment Guide](./DEMO-DEPLOYMENT-WORKER.md) - How this demo is deployed

## 📄 License

MIT

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines before submitting PRs.

### 📋 Issues & Project Management

- **[Open Issues](https://github.com/ryanrozich/ag-grid-react-components/issues)** - Report bugs or request features
- **[Project Board](https://github.com/users/ryanrozich/projects/1)** - Track progress and priorities
- **[Automation Guide](./docs/github-project-automation.md)** - How our label/project sync works

When creating issues, our automation will sync labels to project fields for better organization.

### For AI Agents & Automation

- **[GitHub Project Automation](./docs/github-project-automation.md)** - How issue labels sync to project fields
- **[CLAUDE.md](./CLAUDE.md)** - Instructions for AI assistants working with this codebase
````
