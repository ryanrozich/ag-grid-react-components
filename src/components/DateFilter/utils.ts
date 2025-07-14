import { parseDateExpression } from "../../utils/dateExpressionParser";

export function parseRelativeDate(expression: string): Date | null {
  const result = parseDateExpression(expression);
  return result.isValid ? result.resolvedDate : null;
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
