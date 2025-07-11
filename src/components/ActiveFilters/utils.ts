import { format } from "date-fns";

/**
 * Format a filter value for display in the active filters list
 */
export function formatFilterValue(filter: any): string {
  // Handle null/undefined
  if (!filter) {
    return "";
  }

  // Text filters (simple filter with string value)
  if (typeof filter.filter === "string" || typeof filter.filter === "number") {
    return String(filter.filter);
  }

  // Set filters (array of values)
  if (filter.values && Array.isArray(filter.values)) {
    return filter.values.join(", ");
  }

  // Date filters
  if (
    filter.type &&
    (filter.dateFrom ||
      filter.dateTo ||
      filter.expressionFrom ||
      filter.expressionTo)
  ) {
    return formatDateFilter(filter);
  }

  // Complex filters (e.g., combined conditions)
  if (filter.condition1 || filter.condition2) {
    return "Active";
  }

  // Fallback for unknown filter types
  return "Active";
}

/**
 * Format a date filter for display
 */
function formatDateFilter(filter: any): string {
  const { type, mode, dateFrom, dateTo, expressionFrom, expressionTo } = filter;

  // Relative mode
  if (mode === "relative") {
    if (type === "inRange" && expressionFrom && expressionTo) {
      return `${expressionFrom} to ${expressionTo}`;
    }
    if (expressionFrom) {
      return `${type} ${expressionFrom}`;
    }
    return "Active";
  }

  // Absolute mode
  if (type === "inRange" && dateFrom && dateTo) {
    const fromStr = formatDate(dateFrom);
    const toStr = formatDate(dateTo);
    return `${fromStr} to ${toStr}`;
  }

  if (dateFrom) {
    const dateStr = formatDate(dateFrom);
    if (type === "equals") {
      return dateStr;
    }
    return `${type} ${dateStr}`;
  }

  return "Active";
}

/**
 * Format a date value for display
 */
function formatDate(dateValue: string | Date): string {
  try {
    const date =
      typeof dateValue === "string" ? new Date(dateValue) : dateValue;
    // Use UTC to avoid timezone issues in tests
    return format(date, "M/d/yyyy");
  } catch {
    return String(dateValue);
  }
}
