import type { GridState } from "../gridStateUtils";

/**
 * Base preset interface
 */
export interface BasePreset {
  /** Unique identifier */
  id: string;
  /** Display name */
  name: string;
  /** Optional description */
  description?: string;
  /** The grid state for this preset */
  gridState: GridState;
  /** Whether this is a system preset (read-only) */
  isSystemPreset: boolean;
}

/**
 * System preset - defined by developers, read-only for users
 */
export interface SystemPreset extends BasePreset {
  isSystemPreset: true;
}

/**
 * User preset - created and managed by end users
 */
export interface UserPreset extends BasePreset {
  isSystemPreset: false;
  /** Tags for organization */
  tags: string[];
  /** Creation timestamp */
  createdAt: string;
  /** Last update timestamp */
  updatedAt: string;
}

/**
 * Filter preset - union type of system and user presets
 */
export type FilterPreset = SystemPreset | UserPreset;

/**
 * Template variables that can be used in system presets
 */
export interface TemplateVariables {
  /** Current date */
  today: Date;
  /** 7 days ago */
  last7Days: Date;
  /** Start of current month */
  startOfMonth: Date;
  /** End of current month */
  endOfMonth: Date;
  /** Start of current quarter */
  startOfQuarter: Date;
  /** End of current quarter */
  endOfQuarter: Date;
  /** Start of current year */
  startOfYear: Date;
  /** End of current year */
  endOfYear: Date;
  /** Current user ID/name (if available) */
  currentUser?: string;
}

/**
 * Options for the preset system
 */
export interface PresetSystemOptions {
  /** LocalStorage key for user presets */
  storageKey?: string;
  /** LocalStorage key for default preset */
  defaultKey?: string;
  /** Maximum number of user presets allowed */
  maxUserPresets?: number;
  /** Template variables provider */
  templateVariables?: () => Partial<TemplateVariables>;
}

/**
 * Events emitted by the preset system
 */
export interface PresetSystemEvents {
  /** Emitted when presets change */
  onPresetsChange: (presets: {
    system: FilterPreset[];
    user: FilterPreset[];
  }) => void;
  /** Emitted when default preset changes */
  onDefaultChange: (preset: FilterPreset | null) => void;
}

/**
 * Preset system interface
 */
export interface PresetSystem {
  // System preset configuration
  registerSystemPresets(presets: SystemPreset[]): void;

  // User preset operations
  saveUserPreset(preset: Partial<FilterPreset>): FilterPreset;
  updateUserPreset(id: string, updates: Partial<FilterPreset>): void;
  deleteUserPreset(id: string): void;

  // Default management
  setDefaultPreset(id: string | null): void;
  getDefaultPreset(): FilterPreset | null;
  clearDefault(): void;

  // Combined access
  getAllPresets(): {
    system: FilterPreset[];
    user: FilterPreset[];
    activeId?: string;
  };

  // Utility
  duplicateAsUserPreset(systemPresetId: string, newName: string): FilterPreset;

  // Events
  onPresetsChange: (
    callback: PresetSystemEvents["onPresetsChange"],
  ) => () => void;
  onDefaultChange: (
    callback: PresetSystemEvents["onDefaultChange"],
  ) => () => void;
}
