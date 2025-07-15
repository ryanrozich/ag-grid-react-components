import type { GridApi, FilterModel } from "ag-grid-community";

export interface FilterPreset {
  id: string;
  name: string;
  description?: string;
  category?: string;
  filterModel: FilterModel;
  createdAt: Date;
  updatedAt?: Date;
  order?: number;
  isDefault?: boolean;
  isShared?: boolean;
}

export interface FilterPresetManagerProps {
  /**
   * AG Grid API instance
   */
  api: GridApi;

  /**
   * REQUIRED: Unique identifier for this grid instance.
   * Used to namespace presets in storage.
   * Should be stable across deployments.
   * @example "project-tasks", "inventory-items", "customer-orders"
   */
  gridId: string;

  /**
   * Callback when a preset is applied
   */
  onPresetApplied?: (preset: FilterPreset) => void;

  /**
   * Maximum number of presets allowed per grid
   * @default 50
   */
  maxPresets?: number;

  /**
   * Allowed categories for organizing presets
   */
  allowedCategories?: string[];

  /**
   * Custom storage key prefix (advanced usage)
   * @default "ag-grid-presets"
   */
  storagePrefix?: string;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Enable migration from old storage format
   * @default true
   */
  enableMigration?: boolean;
}

export interface PresetSelectorProps {
  api: GridApi;
  presets: FilterPreset[];
  onPresetSelect: (preset: FilterPreset) => void;
  placeholder?: string;
  className?: string;
}

export interface PresetMenuProps {
  api: GridApi;
  gridId: string;
  presets: FilterPreset[];
  onPresetsChange: (presets: FilterPreset[]) => void;
  maxPresets?: number;
  allowedCategories?: string[];
  className?: string;
}

export interface PresetStorageManager {
  getPresets(gridId: string): FilterPreset[];
  savePresets(gridId: string, presets: FilterPreset[]): void;
  migratePresets?(oldKey: string, gridId: string): boolean;
}
