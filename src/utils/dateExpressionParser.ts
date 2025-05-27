import {
  addDays,
  addMonths,
  addWeeks,
  addYears,
  subDays,
  subMonths,
  subWeeks,
  subYears,
  startOfDay,
} from "date-fns";

export type DateUnit = "d" | "w" | "m" | "y";

export interface DateExpression {
  isValid: boolean;
  resolvedDate: Date | null;
  error?: string;
}

/**
 * Parse a relative date expression like 'Today', 'Today+7d', 'Today-3m', etc.
 * @param expression - The relative date expression to parse
 * @returns - Object containing validity, resolved date and optional error message
 */
export function parseDateExpression(expression: string): DateExpression {
  if (!expression || expression.trim() === "") {
    return {
      isValid: false,
      resolvedDate: null,
      error: "Expression cannot be empty",
    };
  }

  // Standardize 'today' (case insensitive)
  const standardizedExpression = expression.trim().toLowerCase();

  // Just 'today' by itself
  if (standardizedExpression === "today") {
    return {
      isValid: true,
      resolvedDate: startOfDay(new Date()),
    };
  }

  // Check for 'today+Nd' or 'today-Nd' pattern
  const regex = /^today([+-])(\d+)([dwmy])$/;
  const match = standardizedExpression.match(regex);

  if (!match) {
    return {
      isValid: false,
      resolvedDate: null,
      error:
        'Invalid format. Use "Today", "Today+Nd", "Today-Nd" (where N is a number and d=days, w=weeks, m=months, y=years)',
    };
  }

  const [, operation, amountStr, unit] = match;
  const amount = parseInt(amountStr, 10);

  if (isNaN(amount)) {
    return {
      isValid: false,
      resolvedDate: null,
      error: "Invalid number in expression",
    };
  }

  const today = startOfDay(new Date());
  let resultDate: Date;

  switch (unit as DateUnit) {
    case "d":
      resultDate =
        operation === "+" ? addDays(today, amount) : subDays(today, amount);
      break;
    case "w":
      resultDate =
        operation === "+" ? addWeeks(today, amount) : subWeeks(today, amount);
      break;
    case "m":
      resultDate =
        operation === "+" ? addMonths(today, amount) : subMonths(today, amount);
      break;
    case "y":
      resultDate =
        operation === "+" ? addYears(today, amount) : subYears(today, amount);
      break;
    default:
      return {
        isValid: false,
        resolvedDate: null,
        error: "Invalid unit. Use d=days, w=weeks, m=months, y=years",
      };
  }

  return {
    isValid: true,
    resolvedDate: resultDate,
  };
}

/**
 * Validate if a given string is a valid date expression
 * @param expression - The expression to validate
 * @returns - Boolean indicating if expression is valid
 */
export function isValidDateExpression(expression: string): boolean {
  return parseDateExpression(expression).isValid;
}

/**
 * Resolve a date expression to an actual Date object
 * @param expression - The expression to resolve
 * @returns - The resolved Date or null if invalid
 */
export function resolveDateExpression(expression: string): Date | null {
  return parseDateExpression(expression).resolvedDate;
}
