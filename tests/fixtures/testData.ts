import { format, addDays, subDays, parseISO } from "date-fns";

/**
 * Test data factory for AG Grid date filter tests
 *
 * This provides a consistent set of test data with known dates and properties
 * to ensure reliable and deterministic test results.
 */

// Base date for relative testing (fixed to ensure consistent tests)
const BASE_DATE = new Date("2023-06-15T12:00:00Z");

// Common date formats for testing
const DATE_FORMATS = {
  ISO: "yyyy-MM-dd",
  US: "MM/dd/yyyy",
  EU: "dd/MM/yyyy",
  FULL: "EEEE, MMMM do, yyyy",
} as const;

// Test dates for various scenarios
export const TEST_DATES = {
  // Fixed dates
  PAST: "2023-01-01",
  RECENT: "2023-05-15",
  TODAY: format(BASE_DATE, DATE_FORMATS.ISO),
  FUTURE: "2023-12-31",

  // Edge cases
  LEAP_DAY: "2024-02-29",
  YEAR_START: "2023-01-01",
  YEAR_END: "2023-12-31",

  // Relative to today
  YESTERDAY: format(subDays(BASE_DATE, 1), DATE_FORMATS.ISO),
  TOMORROW: format(addDays(BASE_DATE, 1), DATE_FORMATS.ISO),
  NEXT_WEEK: format(addDays(BASE_DATE, 7), DATE_FORMATS.ISO),
  LAST_MONTH: format(subDays(BASE_DATE, 30), DATE_FORMATS.ISO),
  NEXT_MONTH: format(addDays(BASE_DATE, 30), DATE_FORMATS.ISO),
};

// Categories for test data
export const CATEGORIES = ["Meeting", "Task", "Event", "Deadline", "Reminder"];

// Statuses for test data
export const STATUSES = [
  "Pending",
  "In Progress",
  "Completed",
  "Cancelled",
  "Deferred",
];

// Priority levels
export const PRIORITIES = ["Low", "Medium", "High", "Critical"];

/**
 * Creates a test record with consistent data
 */
export const createTestRecord = (
  id: number,
  overrides: Partial<TestRecord> = {},
): TestRecord => {
  const baseDate = overrides.date ? parseISO(overrides.date) : BASE_DATE;
  const baseRecord: Omit<TestRecord, "id"> = {
    date: format(baseDate, DATE_FORMATS.ISO),
    description: `Test Item ${id}`,
    category: CATEGORIES[id % CATEGORIES.length],
    status: STATUSES[id % STATUSES.length],
    priority: PRIORITIES[id % PRIORITIES.length],
    completed: false,
    notes: "",
  };

  return { ...baseRecord, ...overrides, id };
};

/**
 * Generates a set of test records with a deterministic pattern
 */
export const generateTestRecords = (count: number): TestRecord[] => {
  const records: TestRecord[] = [];

  // Generate records with a consistent pattern
  for (let i = 0; i < count; i++) {
    // Distribute dates around the base date
    const daysOffset = (i % 10) - 5; // -5 to +4 days
    const recordDate = addDays(BASE_DATE, daysOffset);

    records.push(
      createTestRecord(i + 1, {
        date: format(recordDate, DATE_FORMATS.ISO),
      }),
    );
  }

  return records;
};

// Predefined test data sets
export const TEST_RECORDS = {
  // Small data set for quick tests
  SMALL: generateTestRecords(10),

  // Medium data set for most tests
  MEDIUM: generateTestRecords(100),

  // Large data set for performance testing
  LARGE: generateTestRecords(10000),

  // Edge cases
  EDGE_CASES: [
    createTestRecord(1001, { date: TEST_DATES.LEAP_DAY }),
    createTestRecord(1002, { date: TEST_DATES.YEAR_START }),
    createTestRecord(1003, { date: TEST_DATES.YEAR_END }),
    createTestRecord(1004, { date: TEST_DATES.YESTERDAY }),
    createTestRecord(1005, { date: TEST_DATES.TOMORROW }),
  ],
};

// Type for test records
export interface TestRecord {
  id: number;
  date: string;
  description: string;
  category: string;
  status: string;
  priority: string;
  completed: boolean;
  notes?: string;
}

// Helper to get a date in a specific format
export const formatTestDate = (
  date: Date | string,
  formatStr: string = DATE_FORMATS.ISO,
) => {
  const dateObj = typeof date === "string" ? parseISO(date) : date;
  return format(dateObj, formatStr);
};

// Helper to parse a date string to a Date object
export const parseTestDate = (dateStr: string) => {
  return parseISO(dateStr);
};
