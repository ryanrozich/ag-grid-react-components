import type {
  FilterModel,
  SortModelItem,
  ColumnState,
} from "@ag-grid-community/core";

/**
 * Base preset interface
 */
export interface Preset {
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

  /** Optional tags for categorization */
  tags?: string[];

  /** Usage count for analytics */
  usageCount?: number;
}

/**
 * System preset (read-only, provided by developers)
 */
export interface SystemPreset extends Preset {
  type: "system";

  /** Optional icon for UI display */
  icon?: string;

  /** Display order in lists */
  order?: number;

  /** Category for grouping */
  category?: string;
}

/**
 * User preset (mutable, created by users)
 */
export interface UserPreset extends Preset {
  type: "user";

  /** User who created the preset */
  createdBy?: string;

  /** Sharing settings */
  sharing?: {
    enabled: boolean;
    url?: string;
    expiresAt?: string;
  };
}

/**
 * Grid state structure
 */
export interface GridState {
  /** Filter model from AG Grid */
  filterModel: FilterModel;

  /** Sort model from AG Grid */
  sortModel?: SortModelItem[];

  /** Column state including visibility, width, order */
  columnState?: ColumnState[];

  /** Group state */
  groupState?: {
    groupColIds?: string[];
    expandedGroups?: string[];
  };

  /** Pagination state */
  paginationState?: {
    currentPage?: number;
    pageSize?: number;
  };
}

/**
 * Storage adapter interface
 */
export interface PresetStorageAdapter {
  /** Get all presets */
  getAll(): Promise<UserPreset[]>;

  /** Get single preset by ID */
  get(id: string): Promise<UserPreset | null>;

  /** Save or update a preset */
  save(preset: UserPreset): Promise<void>;

  /** Update preset partially */
  update(id: string, updates: Partial<UserPreset>): Promise<void>;

  /** Delete a preset */
  delete(id: string): Promise<void>;

  /** Clear all presets */
  clear(): Promise<void>;

  /** Get storage information */
  getInfo(): Promise<StorageInfo>;
}

/**
 * Storage information
 */
export interface StorageInfo {
  /** Used space in bytes */
  used: number;

  /** Available space in bytes */
  available: number;

  /** Total quota in bytes */
  quota: number;

  /** Number of presets stored */
  count: number;

  /** Whether compression is enabled */
  compressed: boolean;
}

/**
 * Preset configuration for components
 */
export interface PresetConfig {
  /** Allow users to save their own presets */
  allowUserPresets?: boolean;

  /** Maximum number of user presets (default: 10) */
  maxUserPresets?: number;

  /** System-defined presets */
  systemPresets?: SystemPreset[];

  /** Default preset to load on initialization */
  defaultPresetId?: string;

  /** Storage key for user presets */
  storageKey?: string;

  /** Storage adapter to use */
  storage?: PresetStorageAdapter;

  /** Enable compression for storage */
  compression?: boolean;

  /** Callbacks */
  onPresetSaved?: (preset: UserPreset) => void;
  onPresetDeleted?: (presetId: string) => void;
  onPresetLoaded?: (preset: Preset) => void;
}

/**
 * Options for saving a preset
 */
export interface SavePresetOptions {
  /** Preset name */
  name: string;

  /** Optional description */
  description?: string;

  /** Tags for categorization */
  tags?: string[];

  /** Whether this is an auto-save */
  isAutoSave?: boolean;

  /** Custom grid state (defaults to current state) */
  gridState?: Partial<GridState>;
}

/**
 * Result of importing presets
 */
export interface ImportResult {
  /** Successfully imported presets */
  imported: UserPreset[];

  /** Failed imports with reasons */
  failed: Array<{
    data: unknown;
    reason: string;
  }>;

  /** Total count attempted */
  total: number;
}

/**
 * Shareable URL data
 */
export interface ShareableUrlData {
  /** Preset ID if referencing saved preset */
  presetId?: string;

  /** Inline filter model */
  filterModel?: FilterModel;

  /** Full grid state */
  gridState?: Partial<GridState>;

  /** Whether compression was used */
  compressed?: boolean;

  /** Version for compatibility */
  version?: string;
}

/**
 * Validation result for presets
 */
export interface ValidationResult {
  /** Whether the preset is valid */
  isValid: boolean;

  /** Validation errors if any */
  errors: ValidationError[];

  /** Sanitized preset data if valid */
  sanitized?: Preset;
}

/**
 * Validation error details
 */
export interface ValidationError {
  /** Field that failed validation */
  field: string;

  /** Error message */
  message: string;

  /** Error code for programmatic handling */
  code: string;
}

/**
 * Custom error types for preset operations
 */
export class PresetError extends Error {
  constructor(
    message: string,
    public code: string,
    public details?: unknown,
  ) {
    super(message);
    this.name = "PresetError";
  }
}

export class QuotaExceededError extends PresetError {
  constructor(public storageInfo: StorageInfo) {
    super("Storage quota exceeded", "QUOTA_EXCEEDED", storageInfo);
    this.name = "QuotaExceededError";
  }
}

export class PresetNotFoundError extends PresetError {
  constructor(public presetId: string) {
    super(`Preset not found: ${presetId}`, "PRESET_NOT_FOUND", { presetId });
    this.name = "PresetNotFoundError";
  }
}

export class InvalidPresetError extends PresetError {
  constructor(public validationErrors: ValidationError[]) {
    super("Invalid preset data", "INVALID_PRESET", validationErrors);
    this.name = "InvalidPresetError";
  }
}

export class ImportExportError extends PresetError {
  constructor(
    message: string,
    public phase: "parse" | "validate" | "save",
    details?: unknown,
  ) {
    super(message, "IMPORT_EXPORT_ERROR", details);
    this.name = "ImportExportError";
  }
}
