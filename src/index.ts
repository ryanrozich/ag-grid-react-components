// Date Filter Components
import RelativeDateFilter from "./components/DateFilter";
export { RelativeDateFilter };

// Quick Filter Dropdown
import {
  QuickFilterDropdown,
  DATE_FILTER_PRESETS,
} from "./components/QuickFilterDropdown";
export { QuickFilterDropdown, DATE_FILTER_PRESETS };

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

// Import CSS
import "./styles.css";

// For AG Grid v33 compatibility
// @ts-ignore - Add metadata for AG Grid to properly recognize components
RelativeDateFilter.__AG_GRID_COMPONENT = true;

// Default export remains the RelativeDateFilter for backward compatibility
export default RelativeDateFilter;
