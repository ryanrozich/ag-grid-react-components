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
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
} from "date-fns";

export type DateUnit = "d" | "w" | "m" | "y";

export interface DateExpression {
  isValid: boolean;
  resolvedDate: Date | null;
  error?: string;
}

/**
 * Sanitizes input to prevent injection attacks
 * @param input - The input string to sanitize
 * @returns - Sanitized string safe for processing
 */
function sanitizeExpression(input: string): string {
  // Remove any characters that aren't alphanumeric, +, -, or spaces
  // This prevents any script injection or special character attacks
  return input.replace(/[^a-zA-Z0-9+\-\s]/g, "");
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

  // Sanitize input first to prevent any injection attacks
  const sanitized = sanitizeExpression(expression);

  // Check if sanitization removed characters (potential attack)
  if (sanitized !== expression.trim()) {
    return {
      isValid: false,
      resolvedDate: null,
      error: "Expression contains invalid characters",
    };
  }

  // Limit expression length to prevent DoS
  if (expression.length > 50) {
    return {
      isValid: false,
      resolvedDate: null,
      error: "Expression too long (max 50 characters)",
    };
  }

  // Standardize expression (case insensitive)
  const standardizedExpression = sanitized.trim().toLowerCase();

  // Just 'today' by itself
  if (standardizedExpression === "today") {
    return {
      isValid: true,
      resolvedDate: startOfDay(new Date()),
    };
  }

  // Check for special date expressions
  switch (standardizedExpression) {
    case "startofweek":
      return {
        isValid: true,
        resolvedDate: startOfWeek(new Date(), { weekStartsOn: 1 }), // Monday
      };
    case "endofweek":
      return {
        isValid: true,
        resolvedDate: endOfWeek(new Date(), { weekStartsOn: 1 }), // Sunday
      };
    case "startofmonth":
      return {
        isValid: true,
        resolvedDate: startOfMonth(new Date()),
      };
    case "endofmonth":
      return {
        isValid: true,
        resolvedDate: endOfMonth(new Date()),
      };
    case "startofyear":
      return {
        isValid: true,
        resolvedDate: startOfYear(new Date()),
      };
    case "endofyear":
      return {
        isValid: true,
        resolvedDate: endOfYear(new Date()),
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
        'Invalid format. Use "Today", "Today+Nd", "Today-Nd", "StartOfWeek", "EndOfWeek", "StartOfMonth", "EndOfMonth", "StartOfYear", "EndOfYear"',
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

  // Prevent extreme values that could cause issues
  if (amount > 10000) {
    return {
      isValid: false,
      resolvedDate: null,
      error: "Number too large (max 10000)",
    };
  }

  if (amount === 0) {
    return {
      isValid: false,
      resolvedDate: null,
      error: "Number cannot be zero",
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
