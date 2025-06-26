/**
 * Date expression types and interfaces for the AG Grid React Components library.
 * These types provide comprehensive type safety for date filtering operations.
 */

/**
 * Valid date units for relative date expressions
 * @example
 * "d" - days (Today+7d)
 * "w" - weeks (Today-2w)
 * "m" - months (Today+1m)
 * "y" - years (Today-1y)
 */
export type DateUnit = "d" | "w" | "m" | "y";

/**
 * Special date keywords that can be used in expressions
 */
export type DateKeyword =
  | "Today"
  | "StartOfWeek"
  | "EndOfWeek"
  | "StartOfMonth"
  | "EndOfMonth"
  | "StartOfYear"
  | "EndOfYear";

/**
 * Arithmetic operators for date expressions
 */
export type DateOperator = "+" | "-";

/**
 * Result of parsing a date expression
 */
export interface DateExpression {
  /** Whether the expression is valid */
  isValid: boolean;
  /** The resolved date if expression is valid */
  resolvedDate: Date | null;
  /** Error message if expression is invalid */
  error?: string;
}

/**
 * Parsed components of an arithmetic date expression
 */
export interface ParsedDateExpression {
  /** Base keyword (always "Today" for arithmetic) */
  base: "Today";
  /** Arithmetic operator */
  operator: DateOperator;
  /** Numeric amount */
  amount: number;
  /** Unit of time */
  unit: DateUnit;
}

/**
 * Valid relative date expression patterns
 * @example
 * "Today"
 * "Today+7d"
 * "Today-30d"
 * "StartOfWeek"
 * "EndOfMonth"
 */
export type RelativeDateExpression =
  | DateKeyword
  | `Today${DateOperator}${number}${DateUnit}`;

/**
 * Configuration for date expression validation
 */
export interface DateExpressionConfig {
  /** Maximum allowed expression length (default: 50) */
  maxLength?: number;
  /** Maximum allowed numeric value (default: 10000) */
  maxValue?: number;
  /** Whether to allow zero values (default: false) */
  allowZero?: boolean;
  /** Custom sanitization regex */
  sanitizationPattern?: RegExp;
}

/**
 * Common preset date filter configurations
 */
export interface DateFilterPreset {
  /** Unique identifier */
  id: string;
  /** Display label */
  label: string;
  /** Optional description */
  description?: string;
  /** Start expression for the filter */
  expressionFrom?: RelativeDateExpression;
  /** End expression for range filters */
  expressionTo?: RelativeDateExpression;
  /** Filter type */
  type: "equals" | "notEqual" | "after" | "before" | "inRange";
}

/**
 * Type guard to check if a string is a valid date unit
 */
export function isDateUnit(value: string): value is DateUnit {
  return ["d", "w", "m", "y"].includes(value);
}

/**
 * Type guard to check if a string is a valid date keyword
 */
export function isDateKeyword(value: string): value is DateKeyword {
  const keywords: DateKeyword[] = [
    "Today",
    "StartOfWeek",
    "EndOfWeek",
    "StartOfMonth",
    "EndOfMonth",
    "StartOfYear",
    "EndOfYear",
  ];
  return keywords.includes(value as DateKeyword);
}

/**
 * Examples of common date filter presets using expressions
 */
export const COMMON_DATE_PRESETS: DateFilterPreset[] = [
  {
    id: "today",
    label: "Today",
    description: "Show only today's items",
    expressionFrom: "Today",
    type: "equals",
  },
  {
    id: "yesterday",
    label: "Yesterday",
    description: "Show yesterday's items",
    expressionFrom: "Today-1d",
    type: "equals",
  },
  {
    id: "last7days",
    label: "Last 7 Days",
    description: "Show items from the last week",
    expressionFrom: "Today-7d",
    expressionTo: "Today",
    type: "inRange",
  },
  {
    id: "last30days",
    label: "Last 30 Days",
    description: "Show items from the last month",
    expressionFrom: "Today-30d",
    expressionTo: "Today",
    type: "inRange",
  },
  {
    id: "thisWeek",
    label: "This Week",
    description: "Show items from this week",
    expressionFrom: "StartOfWeek",
    expressionTo: "EndOfWeek",
    type: "inRange",
  },
  {
    id: "thisMonth",
    label: "This Month",
    description: "Show items from this month",
    expressionFrom: "StartOfMonth",
    expressionTo: "EndOfMonth",
    type: "inRange",
  },
  {
    id: "thisYear",
    label: "This Year",
    description: "Show items from this year",
    expressionFrom: "StartOfYear",
    expressionTo: "EndOfYear",
    type: "inRange",
  },
  {
    id: "future",
    label: "Future",
    description: "Show future items",
    expressionFrom: "Today+1d",
    type: "after",
  },
  {
    id: "past",
    label: "Past",
    description: "Show past items",
    expressionFrom: "Today-1d",
    type: "before",
  },
];
