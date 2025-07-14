// Date Filter Components
import DateFilter from "./components/DateFilter";
export { DateFilter };

// Export RelativeDateFilter as alias (alternative name)
export { DateFilter as RelativeDateFilter };

// Export AG Grid adapter for the DateFilter
export {
  AGGridFilterAdapter,
  AGGridDateFilter,
} from "./components/DateFilter/AGGridFilterAdapter";

// Quick Filter Dropdown
import {
  QuickFilterDropdown,
  DATE_FILTER_PRESETS,
} from "./components/QuickFilterDropdown";
export { QuickFilterDropdown, DATE_FILTER_PRESETS };

// Active Filters Component
import ActiveFilters from "./components/ActiveFilters";
export { ActiveFilters };

// Saved Views Manager Component
import SavedViewsManager from "./components/SavedViewsManager";
export { SavedViewsManager };
export type {
  SavedView,
  SavedViewCategory,
  SavedViewsManagerProps,
} from "./components/SavedViewsManager";

// Saved Views Dropdown Component
import SavedViewsDropdown from "./components/SavedViewsDropdown";
export { SavedViewsDropdown };
export type { SavedViewsDropdownProps } from "./components/SavedViewsDropdown";

// View Management Components
export { ViewManagementMenu } from "./components/ViewManagementMenu";
export { ViewManagementModal } from "./components/ViewManagementModal";
export { SaveViewModal } from "./components/SaveViewModal";

// Grid Reset Components
export { GridResetButton } from "./components/GridResetButton";
export type { GridResetButtonProps } from "./components/GridResetButton";

// View Dropdown Loader
export { LocalStorageLoader } from "./components/QuickFilterDropdown/loaders/LocalStorageLoader";
export type {
  ViewDropdownLoader,
  SavedViewOption,
} from "./components/QuickFilterDropdown/loaders/types";

// Category Selector Component
import { CategorySelector } from "./components/CategorySelector/index";
export { CategorySelector };
export type { CategorySelectorProps } from "./components/CategorySelector/index";

// Export all types from central location
export * from "./types";

// Common type exports for convenience
export type {
  DateFilterType,
  DateFilterMode,
  DateFilterModel,
  DateFilterParams,
} from "./components/interfaces";

// Quick Filter Types
export type {
  QuickFilterOption,
  QuickFilterDropdownProps,
} from "./components/QuickFilterDropdown";

// Date Expression Utilities
export {
  parseDateExpression,
  isValidDateExpression,
  resolveDateExpression,
} from "./utils/dateExpressionParser";

// Filter State Utilities (URL Serialization)
export {
  serializeFilterModel,
  deserializeFilterModel,
  loadFilterStateFromUrl as loadFilterFromUrl,
  setupFilterStatePersistence,
} from "./utils/filterStateUtils";

// Grid State Utilities (Full State Persistence with Compression)
export {
  setupGridStatePersistence,
  captureGridState,
  applyGridState,
  type GridState,
  type GridStateOptions,
} from "./utils/gridStateUtils";

// Grid Reset Utilities
export {
  resetGrid,
  resetGridToFactory,
  applyGridView,
  type ResetType,
  type ResetGridOptions,
} from "./utils/gridReset";

// AG Grid Workarounds
export { applyFilterModelWithWorkaround } from "./components/QuickFilterDropdown/utils/agGridWorkaround";

// For AG Grid v33 compatibility
// @ts-expect-error - Add metadata for AG Grid to properly recognize components
DateFilter.__AG_GRID_COMPONENT = true;

// Default export for convenience
export default DateFilter;
