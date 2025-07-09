# API Reference

This document provides a comprehensive API reference for all filter preset components, hooks, and utilities.

## Components

### QuickFilterDropdown

The main component for quick filtering with preset support.

#### Props

````typescript
interface QuickFilterDropdownProps {
  /** Column definitions from AG Grid */
  columns: ColDef[];

  /** Callback when a filter is applied */
  onFilterApplied?: (filter: QuickFilterOption) => void;

  /** Enable preset functionality */
  enablePresets?: PresetConfig;

  /** Custom placeholder text */
  placeholder?: string;

  /** Position of the dropdown */
  position?: "left" | "right" | "center";

  /** Custom CSS class */
  className?: string;

  /** Use portal for rendering */
  usePortal?: "always" | "mobile" | "never";

  /** Maximum dropdown height */
  maxHeight?: number;
}
```text

#### PresetConfig Interface

```typescript
interface PresetConfig {
  /** Allow users to save their own presets */
  allowUserPresets?: boolean;

  /** Maximum number of user presets (default: 10) */
  maxUserPresets?: number;

  /** System-defined presets */
  systemPresets?: SystemPreset[];

  /** Default preset to load on initialization */
  defaultPresetId?: string;

  /** Storage key for user presets (default: 'ag-grid-filter-presets') */
  storageKey?: string;

  /** Callback when a preset is saved */
  onPresetSaved?: (preset: UserPreset) => void;

  /** Callback when a preset is deleted */
  onPresetDeleted?: (presetId: string) => void;

  /** Callback when a preset is loaded */
  onPresetLoaded?: (preset: Preset) => void;
}
```text

#### QuickFilterDropdown Example

```typescript
<QuickFilterDropdown
  columns={columnDefs}
  enablePresets={{
    allowUserPresets: true,
    maxUserPresets: 20,
    systemPresets: [
      {
        id: 'recent',
        name: 'Recent Items',
        gridState: {
          filterModel: {
            date: { type: 'after', mode: 'relative', expressionFrom: 'Today-7d' }
          }
        }
      }
    ],
    defaultPresetId: 'recent'
  }}
  onFilterApplied={(filter) => {
    gridApi.setFilterModel(filter.filterModel);
  }}
/>
```text

### FilterPresetManager

A dedicated component for managing filter presets.

#### FilterPresetManager Props

```typescript
interface FilterPresetManagerProps {
  /** AG Grid API instance */
  gridApi: GridApi;

  /** Column API instance */
  columnApi?: ColumnApi;

  /** Position of the preset manager */
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";

  /** Show as modal or inline */
  displayMode?: "modal" | "inline" | "dropdown";

  /** System presets */
  systemPresets?: SystemPreset[];

  /** Storage configuration */
  storage?: PresetStorageConfig;

  /** Custom styling */
  className?: string;

  /** Theme */
  theme?: "light" | "dark" | "auto";
}
```text

#### FilterPresetManager Example

```typescript
<FilterPresetManager
  gridApi={gridApi}
  position="top-right"
  displayMode="dropdown"
  systemPresets={systemPresets}
  storage={{
    adapter: 'localStorage',
    maxPresets: 50,
    compression: true
  }}
/>
```text

## Hooks

### useFilterPresets

Hook for managing filter presets programmatically.

#### Parameters

```typescript
interface UseFilterPresetsParams {
  /** AG Grid API instance */
  gridApi: GridApi;

  /** Storage key */
  storageKey?: string;

  /** Storage adapter */
  storage?: PresetStorageAdapter;

  /** System presets */
  systemPresets?: SystemPreset[];

  /** Auto-save current filters */
  autoSave?: boolean;

  /** Auto-save delay in ms (default: 1000) */
  autoSaveDelay?: number;
}
```text

#### Returns

```typescript
interface UseFilterPresetsReturn {
  /** All presets (system + user) */
  presets: Preset[];

  /** User presets only */
  userPresets: UserPreset[];

  /** System presets only */
  systemPresets: SystemPreset[];

  /** Currently active preset */
  activePreset: Preset | null;

  /** Save current filters as preset */
  savePreset: (options: SavePresetOptions) => Promise<UserPreset>;

  /** Load a preset */
  loadPreset: (presetId: string) => Promise<void>;

  /** Update existing preset */
  updatePreset: (presetId: string, updates: PresetUpdates) => Promise<void>;

  /** Delete a preset */
  deletePreset: (presetId: string) => Promise<void>;

  /** Export presets */
  exportPresets: () => Promise<string>;

  /** Import presets */
  importPresets: (data: string) => Promise<ImportResult>;

  /** Generate shareable URL */
  getShareableUrl: (presetId?: string) => string;

  /** Check if can save more presets */
  canSavePreset: boolean;

  /** Loading state */
  isLoading: boolean;

  /** Error state */
  error: Error | null;
}
```text

#### useFilterPresets Example

```typescript
function MyFilterControls({ gridApi }) {
  const {
    presets,
    savePreset,
    loadPreset,
    deletePreset,
    activePreset,
    canSavePreset
  } = useFilterPresets({
    gridApi,
    storageKey: 'my-app-filters',
    autoSave: true,
    systemPresets: defaultPresets
  });

  const handleSave = async () => {
    const preset = await savePreset({
      name: 'My Filter Set',
      description: 'Filters for Q4 analysis',
      tags: ['quarterly', 'analysis']
    });
    console.log('Saved preset:', preset);
  };

  return (
    <div>
      <select onChange={(e) => loadPreset(e.target.value)}>
        {presets.map(preset => (
          <option key={preset.id} value={preset.id}>
            {preset.name} {preset.id === activePreset?.id && '(active)'}
          </option>
        ))}
      </select>

      <button onClick={handleSave} disabled={!canSavePreset}>
        Save Current Filters
      </button>
    </div>
  );
}
```text

### usePresetStorage

Low-level hook for preset storage operations.

#### usePresetStorage Parameters

```typescript
interface UsePresetStorageParams {
  /** Storage key */
  key?: string;

  /** Storage adapter */
  adapter?: "localStorage" | "sessionStorage" | "indexedDB" | PresetStorageAdapter;

  /** Enable compression */
  compression?: boolean;

  /** Max storage size in bytes */
  maxSize?: number;
}
```text

#### usePresetStorage Returns

```typescript
interface UsePresetStorageReturn {
  /** Get all stored presets */
  getPresets: () => Promise<UserPreset[]>;

  /** Get a single preset */
  getPreset: (id: string) => Promise<UserPreset | null>;

  /** Save a preset */
  savePreset: (preset: UserPreset) => Promise<void>;

  /** Update a preset */
  updatePreset: (id: string, updates: Partial<UserPreset>) => Promise<void>;

  /** Delete a preset */
  deletePreset: (id: string) => Promise<void>;

  /** Clear all presets */
  clearPresets: () => Promise<void>;

  /** Get storage info */
  getStorageInfo: () => Promise<StorageInfo>;

  /** Storage quota exceeded */
  isQuotaExceeded: boolean;
}
```javascript

## Utility Functions

### createPresetStorage

Factory function for creating custom storage adapters.

```typescript
function createPresetStorage(options: StorageOptions): PresetStorageAdapter;

interface StorageOptions {
  /** Storage type */
  adapter: "localStorage" | "sessionStorage" | "indexedDB";

  /** Database name (for IndexedDB) */
  dbName?: string;

  /** Object store name (for IndexedDB) */
  storeName?: string;

  /** Enable compression */
  compression?: boolean;

  /** Encryption key (optional) */
  encryptionKey?: string;
}
```text

### parseShareableUrl

Parse a shareable URL to extract preset data.

```typescript
function parseShareableUrl(url: string): ShareableUrlData | null;

interface ShareableUrlData {
  /** Preset ID if referencing saved preset */
  presetId?: string;

  /** Inline filter model */
  filterModel?: FilterModel;

  /** Grid state including sorting, grouping */
  gridState?: Partial<GridState>;

  /** Compression used */
  compressed?: boolean;

  /** Version for compatibility */
  version?: string;
}
```text

### validatePreset

Validate preset data structure.

```typescript
function validatePreset(preset: unknown): ValidationResult;

interface ValidationResult {
  /** Whether preset is valid */
  isValid: boolean;

  /** Validation errors */
  errors: ValidationError[];

  /** Sanitized preset data */
  sanitized?: Preset;
}
```text

### migratePresets

Migrate presets from older versions.

```typescript
function migratePresets(presets: unknown[], fromVersion: string, toVersion: string): MigrationResult;

interface MigrationResult {
  /** Migrated presets */
  presets: Preset[];

  /** Migration report */
  report: {
    successful: number;
    failed: number;
    errors: MigrationError[];
  };
}
```text

## TypeScript Interfaces

### Core Types

```typescript
/** Base preset interface */
interface Preset {
  /** Unique identifier */
  id: string;

  /** Display name */
  name: string;

  /** Optional description */
  description?: string;

  /** Grid state including filters */
  gridState: Partial<GridState>;

  /** Creation timestamp */
  createdAt: string;

  /** Last modified timestamp */
  updatedAt: string;

  /** Preset type */
  type: "system" | "user";

  /** Optional tags */
  tags?: string[];

  /** Usage count */
  usageCount?: number;
}

/** System preset (read-only) */
interface SystemPreset extends Preset {
  type: "system";

  /** Optional icon */
  icon?: string;

  /** Display order */
  order?: number;

  /** Preset category */
  category?: string;
}

/** User preset (mutable) */
interface UserPreset extends Preset {
  type: "user";

  /** User who created it */
  createdBy?: string;

  /** Sharing settings */
  sharing?: {
    enabled: boolean;
    url?: string;
    expiresAt?: string;
  };
}

/** Grid state structure */
interface GridState {
  /** Filter model */
  filterModel: FilterModel;

  /** Sort model */
  sortModel?: SortModelItem[];

  /** Column state */
  columnState?: ColumnState[];

  /** Group state */
  groupState?: GroupState;

  /** Pagination state */
  paginationState?: PaginationState;
}
```text

### Storage Types

```typescript
/** Storage adapter interface */
interface PresetStorageAdapter {
  /** Get all presets */
  getAll(): Promise<UserPreset[]>;

  /** Get single preset */
  get(id: string): Promise<UserPreset | null>;

  /** Save preset */
  save(preset: UserPreset): Promise<void>;

  /** Update preset */
  update(id: string, updates: Partial<UserPreset>): Promise<void>;

  /** Delete preset */
  delete(id: string): Promise<void>;

  /** Clear all presets */
  clear(): Promise<void>;

  /** Get storage info */
  getInfo(): Promise<StorageInfo>;
}

/** Storage info */
interface StorageInfo {
  /** Used space in bytes */
  used: number;

  /** Available space in bytes */
  available: number;

  /** Total quota in bytes */
  quota: number;

  /** Number of presets */
  count: number;

  /** Compression enabled */
  compressed: boolean;
}
```text

### Event Types

```typescript
/** Preset events */
interface PresetEvents {
  /** Fired when preset is saved */
  onPresetSaved: (preset: UserPreset) => void;

  /** Fired when preset is loaded */
  onPresetLoaded: (preset: Preset) => void;

  /** Fired when preset is deleted */
  onPresetDeleted: (presetId: string) => void;

  /** Fired when preset is updated */
  onPresetUpdated: (preset: UserPreset) => void;

  /** Fired when presets are imported */
  onPresetsImported: (result: ImportResult) => void;

  /** Fired when storage quota exceeded */
  onQuotaExceeded: (info: StorageInfo) => void;
}
```text

## Error Handling

All preset operations can throw these error types:

```typescript
/** Base preset error */
class PresetError extends Error {
  code: string;
  details?: unknown;
}

/** Storage quota exceeded */
class QuotaExceededError extends PresetError {
  code = "QUOTA_EXCEEDED";
  storageInfo: StorageInfo;
}

/** Preset not found */
class PresetNotFoundError extends PresetError {
  code = "PRESET_NOT_FOUND";
  presetId: string;
}

/** Invalid preset data */
class InvalidPresetError extends PresetError {
  code = "INVALID_PRESET";
  validationErrors: ValidationError[];
}

/** Import/export errors */
class ImportExportError extends PresetError {
  code = "IMPORT_EXPORT_ERROR";
  phase: "parse" | "validate" | "save";
}
```text

## Browser Storage Events

Listen for cross-tab preset updates:

```typescript
// Listen for storage events
window.addEventListener("storage", (e) => {
  if (e.key === "ag-grid-filter-presets") {
    // Presets updated in another tab
    const updatedPresets = JSON.parse(e.newValue || "[]");
    // Update your UI accordingly
  }
});

// Using the hook
const { presets } = useFilterPresets({
  gridApi,
  // Automatically syncs across tabs
  syncAcrossTabs: true,
});
````
