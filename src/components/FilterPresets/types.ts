import type { ReactNode } from "react";
import type { FilterModelV33 } from "../interfaces";

export interface FilterPreset {
  id: string;
  name: string;
  description?: string;
  tags?: string[];
  filterModel: Record<string, FilterModelV33 | null>;
  isSystem?: boolean;
  isDefault?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface StorageInfo {
  used: number;
  total: number;
  percentage: number;
}

export interface TriggerProps {
  isOpen: boolean;
  onToggle: () => void;
  activePreset?: FilterPreset;
}

export interface PresetSelectorProps {
  presets: FilterPreset[];
  activePresetId?: string;
  onPresetSelect: (preset: FilterPreset) => void;
  renderTrigger?: (props: TriggerProps) => ReactNode;
  renderOption?: (preset: FilterPreset) => ReactNode;
  className?: string;
  disabled?: boolean;
}

export interface SavePresetDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (preset: Partial<FilterPreset>) => void;
  existingNames: string[];
  storageInfo?: StorageInfo;
  currentFilterModel?: Record<string, FilterModelV33 | null>;
  renderContent?: (props: SavePresetContentProps) => ReactNode;
}

export interface SavePresetContentProps {
  formData: SavePresetFormData;
  onChange: (data: Partial<SavePresetFormData>) => void;
  onSubmit: () => void;
  onCancel: () => void;
  errors: SavePresetFormErrors;
  storageInfo?: StorageInfo;
}

export interface SavePresetFormData {
  name: string;
  description: string;
  tags: string;
  isDefault: boolean;
}

export interface SavePresetFormErrors {
  name?: string;
  tags?: string;
}

export interface PresetManagerProps {
  presets: FilterPreset[];
  activePresetId?: string;
  onSetDefault: (id: string | null) => void;
  onEdit: (preset: FilterPreset) => void;
  onDelete: (ids: string[]) => void;
  onExport: (ids: string[]) => void;
  onImport?: (presets: FilterPreset[]) => void;
  renderPresetItem?: (props: PresetItemProps) => ReactNode;
  className?: string;
}

export interface PresetItemProps {
  preset: FilterPreset;
  isActive: boolean;
  isSelected: boolean;
  onToggleSelect: (selected: boolean) => void;
  onSetDefault: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onExport: () => void;
}

export interface UsePresetsOptions {
  storage?: PresetStorage;
  systemPresets?: FilterPreset[];
  onPresetChange?: (preset: FilterPreset | null) => void;
  maxPresets?: number;
}

export interface PresetStorage {
  load: () => Promise<FilterPreset[]>;
  save: (presets: FilterPreset[]) => Promise<void>;
  getStorageInfo?: () => Promise<StorageInfo>;
}

export interface UsePresetsReturn {
  presets: FilterPreset[];
  activePresetId: string | null;
  storageInfo: StorageInfo | null;
  isLoading: boolean;
  error: Error | null;
  selectPreset: (presetId: string | null) => void;
  savePreset: (preset: Partial<FilterPreset>) => Promise<void>;
  updatePreset: (id: string, updates: Partial<FilterPreset>) => Promise<void>;
  deletePresets: (ids: string[]) => Promise<void>;
  setDefaultPreset: (id: string | null) => Promise<void>;
  exportPresets: (ids?: string[]) => string;
  importPresets: (data: string) => Promise<void>;
  refreshStorageInfo: () => Promise<void>;
}
