import type { GridState } from "../gridStateUtils";

export interface FilterPreset {
  id: string;
  name: string;
  description?: string;
  gridState: GridState;
  isDefault?: boolean;
  isSystem?: boolean;
  createdAt: string;
  updatedAt: string;
  tags?: string[];
  metadata?: Record<string, unknown>;
}

export interface StorageAdapter {
  getItem(key: string): Promise<string | null>;
  setItem(key: string, value: string): Promise<void>;
  removeItem(key: string): Promise<void>;
  clear(): Promise<void>;
  getAllKeys(): Promise<string[]>;
}

export interface PresetStorageOptions {
  storageKey?: string;
  adapter?: StorageAdapter;
  maxPresets?: number;
  onStorageQuotaExceeded?: (error: DOMException) => void;
  onSyncUpdate?: (presets: FilterPreset[]) => void;
}

export interface PresetValidationError {
  field: string;
  message: string;
}

export interface PresetStorageState {
  presets: FilterPreset[];
  defaultPresetId?: string;
}
