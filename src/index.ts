import RelativeDateFilter from "./components/RelativeDateFilter";
import RelativeDateFloatingFilter from "./components/RelativeDateFloatingFilter";
import {
  DateFilterType,
  DateFilterMode,
  DateFilterModel,
  DateFilterParams,
} from "./components/interfaces";
import {
  parseDateExpression,
  isValidDateExpression,
  resolveDateExpression,
} from "./utils/dateExpressionParser";

import {
  serializeFilterModel,
  deserializeFilterModel,
  loadFilterStateFromUrl as loadFilterFromUrl,
  setupFilterStatePersistence,
} from "./utils/filterStateUtils";

// Import CSS
import "./styles.css";

export {
  RelativeDateFilter,
  RelativeDateFloatingFilter,
  // Date expression utils
  parseDateExpression,
  isValidDateExpression,
  resolveDateExpression,
  // Filter state utils
  serializeFilterModel,
  deserializeFilterModel,
  loadFilterFromUrl,
  setupFilterStatePersistence,
};

// Export type definitions
export type {
  DateFilterType,
  DateFilterMode,
  DateFilterModel,
  DateFilterParams,
};

// For AG Grid v33 compatibility
// @ts-ignore - Add metadata for AG Grid to properly recognize components
RelativeDateFilter.__AG_GRID_COMPONENT = true;
// @ts-ignore - Add metadata for AG Grid to properly recognize components
RelativeDateFloatingFilter.__AG_GRID_COMPONENT = true;

export default RelativeDateFilter;
