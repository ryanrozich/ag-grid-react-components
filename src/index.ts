// Date Filter Components
import DateFilter from "./components/DateFilter";
export { DateFilter };

// Export RelativeDateFilter as alias (alternative name)
export { DateFilter as RelativeDateFilter };

// Quick Filter Dropdown
import {
  QuickFilterDropdown,
  DATE_FILTER_PRESETS,
} from "./components/QuickFilterDropdown";
export { QuickFilterDropdown, DATE_FILTER_PRESETS };

// Active Filters Component
import ActiveFilters from "./components/ActiveFilters";
export { ActiveFilters };

// Filter Presets Components
export { PresetSelector } from "./components/FilterPresets/PresetSelector";
export { SavePresetDialog } from "./components/FilterPresets/SavePresetDialog";
export { PresetManager } from "./components/FilterPresets/PresetManager";
export { usePresets } from "./components/FilterPresets/hooks/usePresets";

// Filter Preset Types
export type {
  FilterPreset,
  PresetStorage,
  StorageInfo,
  PresetSelectorProps,
  SavePresetDialogProps,
  PresetManagerProps,
  PresetItemProps,
  UsePresetsOptions,
  UsePresetsReturn,
} from "./components/FilterPresets/types";

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
  EnablePresetsConfig,
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

// AG Grid Workarounds
export { applyFilterModelWithWorkaround } from "./components/QuickFilterDropdown/utils/agGridWorkaround";

// Import CSS
import "./styles.css";

// For AG Grid v33 compatibility
// @ts-expect-error - Add metadata for AG Grid to properly recognize components
DateFilter.__AG_GRID_COMPONENT = true;

// Default export for convenience
export default DateFilter;
