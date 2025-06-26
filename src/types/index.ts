/**
 * Central type definitions for AG Grid React Components
 */

// Re-export date expression types
export * from "./date-expressions";

// Re-export component interfaces
export type {
  DateFilterType,
  DateFilterMode,
  DateFilterModel,
  DateFilterParams,
} from "../components/interfaces";

// Re-export QuickFilter types
export type {
  QuickFilterOption,
  QuickFilterDropdownProps,
} from "../components/QuickFilterDropdown/types";

// Export ActiveFilters types
export interface ActiveFiltersProps {
  /** AG Grid API instance */
  api: import("ag-grid-community").GridApi;
  /** Current filter model from AG Grid */
  filterModel: import("ag-grid-community").FilterModel;
  /** Optional CSS class name */
  className?: string;
  /** Optional callback when a filter is removed */
  onFilterRemove?: (columnId: string) => void;
  /** Optional callback when all filters are cleared */
  onClearAll?: () => void;
}

// Utility type for filter state persistence
export interface SerializedFilterModel {
  [key: string]: unknown;
  // Date fields will be ISO strings when serialized
}

// Type for the filter state URL parameters
export interface FilterStateUrlParams {
  /** Serialized filter model as JSON string */
  filters?: string;
  /** Optional timestamp for cache busting */
  timestamp?: string;
}

// Helper type for component styling
export interface ComponentStyles {
  /** Custom CSS class names */
  className?: string;
  /** Inline styles (use sparingly) */
  style?: React.CSSProperties;
}

// Type for date formatting options
export interface DateFormatOptions {
  /** Date format string (date-fns format) */
  format?: string;
  /** Locale for date formatting */
  locale?: import("date-fns").Locale;
  /** Timezone for date display */
  timezone?: string;
}
