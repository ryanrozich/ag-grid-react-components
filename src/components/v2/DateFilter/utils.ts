/**
 * Simple relative date parser for POC
 * In production, this would use a more robust date parsing library
 */
export function parseRelativeDate(value: string): Date {
  const now = new Date();
  const trimmed = value.trim().toLowerCase();

  // Handle common relative date patterns
  if (trimmed === "today") {
    return now;
  }

  if (trimmed === "yesterday") {
    const date = new Date(now);
    date.setDate(date.getDate() - 1);
    return date;
  }

  if (trimmed === "tomorrow") {
    const date = new Date(now);
    date.setDate(date.getDate() + 1);
    return date;
  }

  // Handle patterns like "-7d", "+1w", etc.
  const match = trimmed.match(/^([+-]?\d+)([dwmy])$/);
  if (match) {
    const [, amount, unit] = match;
    const num = parseInt(amount, 10);
    const date = new Date(now);

    switch (unit) {
      case "d":
        date.setDate(date.getDate() + num);
        break;
      case "w":
        date.setDate(date.getDate() + num * 7);
        break;
      case "m":
        date.setMonth(date.getMonth() + num);
        break;
      case "y":
        date.setFullYear(date.getFullYear() + num);
        break;
    }

    return date;
  }

  // Handle "last week", "next month", etc.
  if (trimmed.includes("last")) {
    if (trimmed.includes("week")) {
      const date = new Date(now);
      date.setDate(date.getDate() - 7);
      return date;
    }
    if (trimmed.includes("month")) {
      const date = new Date(now);
      date.setMonth(date.getMonth() - 1);
      return date;
    }
  }

  if (trimmed.includes("next")) {
    if (trimmed.includes("week")) {
      const date = new Date(now);
      date.setDate(date.getDate() + 7);
      return date;
    }
    if (trimmed.includes("month")) {
      const date = new Date(now);
      date.setMonth(date.getMonth() + 1);
      return date;
    }
  }

  throw new Error(`Unable to parse relative date: ${value}`);
}
