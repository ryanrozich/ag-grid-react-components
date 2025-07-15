import {
  addDays,
  addWeeks,
  addMonths,
  addYears,
  startOfDay,
  startOfWeek,
  startOfMonth,
  startOfYear,
} from "date-fns";

export function parseRelativeDate(expression: string): Date | null {
  const trimmed = expression.trim().toLowerCase();
  const now = new Date();

  // Handle special keywords
  switch (trimmed) {
    case "today":
      return startOfDay(now);
    case "yesterday":
      return startOfDay(addDays(now, -1));
    case "tomorrow":
      return startOfDay(addDays(now, 1));
    case "this week":
      return startOfWeek(now);
    case "last week":
      return startOfWeek(addWeeks(now, -1));
    case "next week":
      return startOfWeek(addWeeks(now, 1));
    case "this month":
    case "startofmonth":
      return startOfMonth(now);
    case "endofmonth":
      return new Date(
        now.getFullYear(),
        now.getMonth() + 1,
        0,
        23,
        59,
        59,
        999,
      );
    case "last month":
      return startOfMonth(addMonths(now, -1));
    case "startoflastmonth":
      return startOfMonth(addMonths(now, -1));
    case "endoflastmonth":
      const lastMonth = addMonths(now, -1);
      return new Date(
        lastMonth.getFullYear(),
        lastMonth.getMonth() + 1,
        0,
        23,
        59,
        59,
        999,
      );
    case "next month":
      return startOfMonth(addMonths(now, 1));
    case "this year":
      return startOfYear(now);
    case "last year":
      return startOfYear(addYears(now, -1));
    case "next year":
      return startOfYear(addYears(now, 1));
  }

  // Handle relative date expressions like "-7d", "+1w", "-1m", "+2y"
  const relativeMatch = trimmed.match(/^([+-]?\d+)([dwmy])$/);
  if (relativeMatch) {
    const [, amount, unit] = relativeMatch;
    const value = parseInt(amount, 10);

    switch (unit) {
      case "d":
        return startOfDay(addDays(now, value));
      case "w":
        return startOfDay(addWeeks(now, value));
      case "m":
        return startOfDay(addMonths(now, value));
      case "y":
        return startOfDay(addYears(now, value));
    }
  }

  // Handle expressions like "7 days ago", "2 weeks from now"
  const agoMatch = trimmed.match(
    /^(\d+)\s+(days?|weeks?|months?|years?)\s+(ago|from\s+now)$/,
  );
  if (agoMatch) {
    const [, amount, unit, direction] = agoMatch;
    const value = parseInt(amount, 10) * (direction === "ago" ? -1 : 1);

    if (unit.startsWith("day")) {
      return startOfDay(addDays(now, value));
    } else if (unit.startsWith("week")) {
      return startOfDay(addWeeks(now, value));
    } else if (unit.startsWith("month")) {
      return startOfDay(addMonths(now, value));
    } else if (unit.startsWith("year")) {
      return startOfDay(addYears(now, value));
    }
  }

  // Handle "in X days/weeks/months/years"
  const inMatch = trimmed.match(/^in\s+(\d+)\s+(days?|weeks?|months?|years?)$/);
  if (inMatch) {
    const [, amount, unit] = inMatch;
    const value = parseInt(amount, 10);

    if (unit.startsWith("day")) {
      return startOfDay(addDays(now, value));
    } else if (unit.startsWith("week")) {
      return startOfDay(addWeeks(now, value));
    } else if (unit.startsWith("month")) {
      return startOfDay(addMonths(now, value));
    } else if (unit.startsWith("year")) {
      return startOfDay(addYears(now, value));
    }
  }

  return null;
}

export function formatDateForInput(date: Date | null): string {
  if (!date) return "";
  return date.toISOString().split("T")[0];
}

export function validateDateRange(
  startDate: Date | null,
  endDate: Date | null,
): boolean {
  if (!startDate || !endDate) return false;
  return startDate <= endDate;
}
