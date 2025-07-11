import {
  startOfDay,
  subDays,
  addDays,
  startOfMonth,
  endOfMonth,
  startOfQuarter,
  endOfQuarter,
  startOfYear,
  endOfYear,
  format as formatDate,
} from "date-fns";
import type { GridState } from "../gridStateUtils";
import { createLogger } from "../logger";

const logger = createLogger("templateResolver");

/**
 * Template resolution options
 */
export interface TemplateOptions {
  /** Current user identifier */
  currentUser?: string;
  /** Custom date format (default: Date object, "iso" for ISO string, or date-fns format) */
  dateFormat?: "iso" | string;
  /** Custom template variables */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  customVariables?: Record<string, any>;
  /** Custom template functions */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  templateFunctions?: Record<string, () => any>;
  /** Base date for relative calculations (for testing) */
  baseDate?: Date;
}

/**
 * Built-in template resolvers
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TEMPLATE_RESOLVERS: Record<string, (options: TemplateOptions) => any> = {
  today: (options) => startOfDay(options.baseDate || new Date()),
  last7Days: (options) =>
    startOfDay(subDays(options.baseDate || new Date(), 7)),
  startOfMonth: (options) => startOfMonth(options.baseDate || new Date()),
  endOfMonth: (options) => endOfMonth(options.baseDate || new Date()),
  startOfQuarter: (options) => startOfQuarter(options.baseDate || new Date()),
  endOfQuarter: (options) => endOfQuarter(options.baseDate || new Date()),
  startOfYear: (options) => startOfYear(options.baseDate || new Date()),
  endOfYear: (options) => endOfYear(options.baseDate || new Date()),
  currentUser: (options) => options.currentUser || "",
};

/**
 * Resolve a template string to its value
 */
export function resolveTemplate(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any,
  options: TemplateOptions = {},
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): any {
  // Handle null/undefined
  if (value === null || value === undefined) {
    return value;
  }

  // Handle arrays recursively
  if (Array.isArray(value)) {
    return value.map((item) => resolveTemplate(item, options));
  }

  // Handle objects recursively
  if (typeof value === "object" && !(value instanceof Date)) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const resolved: Record<string, any> = {};
    for (const [key, val] of Object.entries(value)) {
      resolved[key] = resolveTemplate(val, options);
    }
    return resolved;
  }

  // Handle string templates
  if (typeof value === "string") {
    // Check if it's a template pattern {{...}}
    const templateMatch = value.match(/^{{(.+)}}$/);
    if (!templateMatch) {
      return value;
    }

    const templateName = templateMatch[1];

    // Check custom variables first
    if (options.customVariables && templateName in options.customVariables) {
      return options.customVariables[templateName];
    }

    // Check template functions
    if (
      options.templateFunctions &&
      templateName in options.templateFunctions
    ) {
      try {
        return options.templateFunctions[templateName]();
      } catch (error) {
        logger.error(
          `Error executing template function ${templateName}:`,
          error,
        );
        return value;
      }
    }

    // Check for relative date calculations (e.g., {{today-30}} or {{today+7}})
    const relativeMatch = templateName.match(/^(today|last7Days)([+-])(\d+)$/);
    if (relativeMatch) {
      const [, base, operator, daysStr] = relativeMatch;
      const days = parseInt(daysStr, 10);
      const baseDate = TEMPLATE_RESOLVERS[base]?.(options);

      if (baseDate instanceof Date) {
        const resultDate =
          operator === "+" ? addDays(baseDate, days) : subDays(baseDate, days);
        return formatDateValue(resultDate, options.dateFormat);
      }
    }

    // Check built-in resolvers
    if (templateName in TEMPLATE_RESOLVERS) {
      const resolved = TEMPLATE_RESOLVERS[templateName](options);

      // Format dates if needed
      if (resolved instanceof Date) {
        return formatDateValue(resolved, options.dateFormat);
      }

      return resolved;
    }

    // Unknown template, return as-is
    logger.debug(`Unknown template: ${templateName}`);
    return value;
  }

  return value;
}

/**
 * Format a date value based on the format option
 */
function formatDateValue(date: Date, dateFormat?: string): Date | string {
  if (!dateFormat) {
    return date;
  }

  if (dateFormat === "iso") {
    return date.toISOString();
  }

  try {
    return formatDate(date, dateFormat);
  } catch (error) {
    logger.error(`Invalid date format: ${dateFormat}`, error);
    return date;
  }
}

/**
 * Resolve templates in a grid state object
 */
export function resolveTemplateInGridState(
  gridState: GridState,
  options: TemplateOptions = {},
): GridState {
  const resolved: GridState = { ...gridState };

  // Resolve templates in filters
  if (resolved.filters) {
    resolved.filters = resolveFilters(resolved.filters, options);
  }

  return resolved;
}

/**
 * Recursively resolve templates in filter models
 */
function resolveFilters(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  filters: Record<string, any>,
  options: TemplateOptions,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Record<string, any> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const resolved: Record<string, any> = {};

  for (const [key, filter] of Object.entries(filters)) {
    if (!filter) {
      resolved[key] = filter;
      continue;
    }

    // Deep clone the filter
    const resolvedFilter = { ...filter };

    // Resolve direct filter value
    if ("filter" in resolvedFilter) {
      resolvedFilter.filter = resolveTemplate(resolvedFilter.filter, options);
    }

    // Resolve date range filters
    if ("dateFrom" in resolvedFilter) {
      resolvedFilter.dateFrom = resolveTemplate(
        resolvedFilter.dateFrom,
        options,
      );
    }
    if ("dateTo" in resolvedFilter) {
      resolvedFilter.dateTo = resolveTemplate(resolvedFilter.dateTo, options);
    }

    // Resolve combined filter conditions
    if (
      "conditions" in resolvedFilter &&
      Array.isArray(resolvedFilter.conditions)
    ) {
      resolvedFilter.conditions = resolvedFilter.conditions.map(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (condition: any) => ({
          ...condition,
          filter: resolveTemplate(condition.filter, options),
        }),
      );
    }

    resolved[key] = resolvedFilter;
  }

  return resolved;
}
