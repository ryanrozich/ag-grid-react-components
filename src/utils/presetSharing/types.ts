import type { FilterModel } from "ag-grid-community";

/**
 * Complete filter preset including all grid state
 */
export interface FilterPreset {
  /** Unique identifier */
  id: string;
  /** Display name */
  name: string;
  /** Optional description */
  description?: string;
  /** Tags for categorization */
  tags?: string[];
  /** Complete grid state */
  gridState: {
    /** Filter models for all columns */
    filters?: Record<string, FilterModel>;
    /** Sort state */
    sort?: Array<{
      colId: string;
      sort: "asc" | "desc";
    }>;
    /** Column state */
    columns?: Record<
      string,
      {
        width?: number;
        pinned?: boolean | "left" | "right";
        visible?: boolean;
      }
    >;
  };
  /** Creation timestamp */
  createdAt: string;
  /** Last update timestamp */
  updatedAt?: string;
}

/**
 * Options for URL sharing
 */
export interface ShareOptions {
  /** Whether to embed full data or just reference ID */
  mode: "embedded" | "reference";
  /** Base URL for sharing */
  baseUrl?: string;
  /** Whether to compress the data */
  compress?: boolean;
}

/**
 * Result of URL serialization
 */
export interface SerializedUrl {
  /** The complete shareable URL */
  url: string;
  /** Whether compression was used */
  compressed: boolean;
  /** Original size in bytes */
  originalSize: number;
  /** Final size in bytes */
  finalSize: number;
  /** Compression ratio (if compressed) */
  compressionRatio?: number;
}

/**
 * Options for parsing URLs
 */
export interface ParseOptions {
  /** Whether to validate the preset data */
  validate?: boolean;
  /** Whether to decompress automatically */
  decompress?: boolean;
}

/**
 * Result of URL parsing
 */
export interface ParsedUrl {
  /** The preset data if embedded */
  preset?: FilterPreset;
  /** The preset ID if reference mode */
  presetId?: string;
  /** Whether the data was compressed */
  compressed: boolean;
  /** Any errors encountered */
  error?: string;
}

/**
 * Export format for filter presets
 */
export interface PresetExportFormat {
  /** Format version */
  version: string;
  /** Export timestamp */
  exportDate: string;
  /** Source application */
  source: string;
  /** Exported presets */
  presets: FilterPreset[];
}

/**
 * Import options
 */
export type ImportMode = "replace" | "merge" | "add";

/**
 * Import result
 */
export interface ImportResult {
  /** Successfully imported presets */
  imported: FilterPreset[];
  /** Skipped presets (e.g., duplicates) */
  skipped: FilterPreset[];
  /** Any errors encountered */
  errors: Array<{
    preset: Partial<FilterPreset>;
    error: string;
  }>;
}

/**
 * Validation result for preset data
 */
export interface ValidationResult {
  /** Whether the preset is valid */
  isValid: boolean;
  /** Validation errors */
  errors: string[];
  /** Sanitized preset (if fixable issues were found) */
  sanitized?: FilterPreset;
}
