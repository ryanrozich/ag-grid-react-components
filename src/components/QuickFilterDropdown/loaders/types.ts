import type { FilterModel } from "ag-grid-community";

/**
 * Represents a saved view option that can be loaded into the grid
 */
export interface SavedViewOption {
  /** Unique identifier for the view */
  id: string;

  /** Display label for the view */
  label: string;

  /** Optional description */
  description?: string;

  /** Optional icon (emoji or React component) */
  icon?: string | React.ReactNode;

  /** Whether this saves just filters or the full grid state */
  saveType: "filters-only" | "full-view";

  /** The filter model to apply (for filters-only or as part of full-view) */
  filterModel?: FilterModel | null;

  /** Full grid state (for full-view saves) */
  gridState?: {
    /** Column state including visibility, width, order */
    columnState?: unknown[];
    /** Sort model */
    sortModel?: unknown[];
    /** Row grouping state */
    groupState?: unknown;
    /** Any other grid state that should be persisted */
    [key: string]: unknown;
  };

  /** Optional metadata */
  metadata?: {
    /** When this view was created */
    createdAt?: string;
    /** When this view was last updated */
    updatedAt?: string;
    /** User who created this view */
    createdBy?: string;
    /** Category for organization */
    category?: string;
    /** Description of the view */
    description?: string;
    /** Whether this is a default view */
    isDefault?: boolean;
    /** Whether this is a system/preset view (read-only) */
    isPreset?: boolean;
  };
}

/**
 * Interface for loading and managing saved view options
 */
export interface ViewDropdownLoader {
  /**
   * Load all available view options
   * @returns Promise resolving to array of saved view options
   */
  loadOptions(): Promise<SavedViewOption[]>;

  /**
   * Save a new view option or update existing
   * @param option The view option to save
   * @returns Promise resolving when save is complete
   */
  saveOption?(option: SavedViewOption): Promise<void>;

  /**
   * Delete a view option by ID
   * @param id The ID of the view to delete
   * @returns Promise resolving when delete is complete
   */
  deleteOption?(id: string): Promise<void>;

  /**
   * Update an existing view option
   * @param id The ID of the view to update
   * @param updates Partial updates to apply
   * @returns Promise resolving when update is complete
   */
  updateOption?(id: string, updates: Partial<SavedViewOption>): Promise<void>;

  /**
   * Get the default view ID
   * @returns Promise resolving to the default view ID, or null if none
   */
  getDefaultViewId?(): Promise<string | null>;

  /**
   * Set the default view
   * @param id The ID of the view to set as default
   * @returns Promise resolving when default is set
   */
  setDefaultView?(id: string): Promise<void>;

  /**
   * Export all views to a serialized format
   * @returns Promise resolving to serialized views data
   */
  exportViews?(): Promise<string>;

  /**
   * Import views from serialized format
   * @param data The serialized views data
   * @returns Promise resolving when import is complete
   */
  importViews?(data: string): Promise<void>;

  /**
   * Optional method to subscribe to changes
   * @param callback Function to call when views change
   * @returns Unsubscribe function
   */
  subscribe?(callback: () => void): () => void;
}

/**
 * Factory function for creating loaders with common functionality
 */
export type LoaderFactory<T extends ViewDropdownLoader = ViewDropdownLoader> = (
  config?: unknown,
) => T;
