// Date Filter Components
import DateFilter from "./components/DateFilter";
export { DateFilter };

// Export RelativeDateFilter as alias for backward compatibility
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

// Date Filter Types
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

// AG Grid Workarounds
export { applyFilterModelWithWorkaround } from "./components/QuickFilterDropdown/utils/agGridWorkaround";

// Import CSS
import "./styles.css";

// For AG Grid v33 compatibility
// @ts-ignore - Add metadata for AG Grid to properly recognize components
DateFilter.__AG_GRID_COMPONENT = true;

// Default export remains the DateFilter for backward compatibility
export default DateFilter;
