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

// Preset Storage Engine
export {
  PresetStorageEngine,
  LocalStorageAdapter,
} from "./utils/presetStorage";
export type {
  StorageAdapter,
  PresetStorageOptions,
  PresetValidationError,
  PresetStorageState,
} from "./utils/presetStorage";

// Preset System exports
export {
  resolveTemplate,
  resolveTemplateInGridState,
  DEFAULT_SYSTEM_PRESETS,
  DATE_SYSTEM_PRESETS,
  createSystemPreset,
  combineSystemPresets,
} from "./utils/presetSystem";

// Preset System types
export type {
  BasePreset,
  SystemPreset,
  UserPreset,
  FilterPreset,
  TemplateVariables,
  PresetSystemOptions,
  PresetSystemEvents,
  PresetSystem,
  TemplateOptions,
} from "./utils/presetSystem";

// AG Grid Workarounds
export { applyFilterModelWithWorkaround } from "./components/QuickFilterDropdown/utils/agGridWorkaround";

// Filter Preset Sharing
export { ShareButton } from "./components/FilterPresets/ShareButton";
export { usePresetFromUrl } from "./hooks/usePresetFromUrl";
export {
  exportPresets,
  importPresets,
  validateImportData,
  generateExportFilename,
  createExportBlob,
  readImportFile,
} from "./utils/presetSharing/importExport";
export {
  createShareableUrl,
  extractPresetFromUrl,
  serializeToUrl,
  parseFromUrl,
} from "./utils/presetSharing";
export {
  compress,
  decompress,
  getCompressionRatio,
} from "./utils/presetSharing/compression";

// Preset Sharing Types
export type {
  PresetExportFormat,
  ImportMode,
  ImportResult,
  ShareOptions,
  SerializedUrl,
  ParsedUrl,
  ValidationResult,
} from "./utils/presetSharing/types";
export type { ShareButtonProps } from "./components/FilterPresets/ShareButton";
export type {
  UsePresetFromUrlOptions,
  UsePresetFromUrlResult,
} from "./hooks/usePresetFromUrl";

// Import CSS
import "./styles.css";

// For AG Grid v33 compatibility
// @ts-expect-error - Add metadata for AG Grid to properly recognize components
DateFilter.__AG_GRID_COMPONENT = true;

// Default export for convenience
export default DateFilter;
