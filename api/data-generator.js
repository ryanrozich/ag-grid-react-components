/* eslint-env browser */
// Server-side data generation with filtering, sorting, and pagination
import { faker } from "@faker-js/faker";

const TOTAL_RECORDS = 10000; // Large dataset for server-side demo
let cachedData = null;

// Categories with colors (matching frontend CategoryCellRenderer)
const categories = [
  { name: "Feature", color: "green" },
  { name: "Bug", color: "red" },
  { name: "Documentation", color: "blue" },
  { name: "Refactor", color: "purple" },
  { name: "Testing", color: "yellow" },
  { name: "DevOps", color: "gray" },
  { name: "Security", color: "orange" },
  { name: "Performance", color: "indigo" },
];

const statuses = [
  "Backlog",
  "Todo",
  "In Progress",
  "In Review",
  "Testing",
  "Done",
  "Blocked",
];
const priorities = ["Low", "Medium", "High", "Critical"];

// Generate a single task
function generateTask(id) {
  const startDate = faker.date.recent({ days: 30 });
  const dueDate = faker.date.soon({ days: 30, refDate: startDate });
  const completedDate =
    Math.random() > 0.5
      ? faker.date.between({ from: startDate, to: new Date() })
      : null;

  const value = faker.number.int({ min: 1000, max: 50000 });
  const amountDelivered = faker.number.int({ min: 0, max: value });
  const percentDelivered = faker.number.int({ min: 0, max: 100 });

  return {
    id: `TASK-${id}`,
    name: faker.hacker.phrase(),
    description: faker.lorem.paragraph(),
    status: faker.helpers.arrayElement(statuses),
    priority: faker.helpers.arrayElement(priorities),
    category: faker.helpers.arrayElement(categories).name,
    assignee: faker.person.fullName(),
    reporter: faker.person.fullName(),
    createdDate: faker.date.recent({ days: 60 }).toISOString(),
    startDate: startDate.toISOString(),
    dueDate: dueDate.toISOString(),
    completedDate: completedDate?.toISOString() || null,
    estimatedHours: faker.number.int({ min: 1, max: 40 }),
    actualHours: faker.number.int({ min: 0, max: 50 }),
    percentDelivered,
    value,
    amountDelivered,
    remaining: value - amountDelivered,
    tags: faker.helpers.arrayElements(
      [
        "frontend",
        "backend",
        "api",
        "database",
        "ui",
        "ux",
        "performance",
        "security",
      ],
      { min: 1, max: 3 },
    ),
    comments: faker.number.int({ min: 0, max: 25 }),
    attachments: faker.number.int({ min: 0, max: 10 }),
    watchers: faker.number.int({ min: 0, max: 15 }),
    votes: faker.number.int({ min: 0, max: 50 }),
    lastUpdated: faker.date.recent({ days: 7 }).toISOString(),
  };
}

// Get or generate the full dataset
function getFullDataset() {
  if (!cachedData) {
    cachedData = Array.from({ length: TOTAL_RECORDS }, (_, i) =>
      generateTask(i + 1),
    );
  }
  return cachedData;
}

// Apply filters to the dataset
function applyFilters(data, filterModel) {
  if (!filterModel || Object.keys(filterModel).length === 0) {
    return data;
  }

  return data.filter((row) => {
    for (const [field, filter] of Object.entries(filterModel)) {
      // Handle date filters
      if (
        field === "dueDate" ||
        field === "startDate" ||
        field === "createdDate"
      ) {
        const dateValue = new Date(row[field]);

        if (filter.type === "equals") {
          const filterDate = new Date(filter.dateFrom);
          if (dateValue.toDateString() !== filterDate.toDateString())
            return false;
        } else if (filter.type === "notEqual") {
          const filterDate = new Date(filter.dateFrom);
          if (dateValue.toDateString() === filterDate.toDateString())
            return false;
        } else if (filter.type === "lessThan" || filter.type === "before") {
          const filterDate = new Date(filter.dateFrom);
          if (dateValue >= filterDate) return false;
        } else if (filter.type === "greaterThan" || filter.type === "after") {
          const filterDate = new Date(filter.dateFrom);
          if (dateValue <= filterDate) return false;
        } else if (filter.type === "inRange") {
          const startDate = filter.dateFrom ? new Date(filter.dateFrom) : null;
          const endDate = filter.dateTo ? new Date(filter.dateTo) : null;

          if (startDate && dateValue < startDate) return false;
          if (endDate && dateValue > endDate) return false;
        }
      }
      // Handle text filters
      else if (filter.type === "contains") {
        if (
          !String(row[field])
            .toLowerCase()
            .includes(filter.filter.toLowerCase())
        ) {
          return false;
        }
      }
      // Handle set filters
      else if (filter.values) {
        if (!filter.values.includes(row[field])) {
          return false;
        }
      }
      // Handle number filters
      else if (typeof row[field] === "number") {
        if (filter.type === "equals" && row[field] !== filter.filter)
          return false;
        if (filter.type === "notEqual" && row[field] === filter.filter)
          return false;
        if (filter.type === "lessThan" && row[field] >= filter.filter)
          return false;
        if (filter.type === "greaterThan" && row[field] <= filter.filter)
          return false;
      }
    }
    return true;
  });
}

// Apply sorting to the dataset
function applySorting(data, sortModel) {
  if (!sortModel || sortModel.length === 0) {
    return data;
  }

  return [...data].sort((a, b) => {
    for (const sort of sortModel) {
      const { colId, sort: direction } = sort;

      let aVal = a[colId];
      let bVal = b[colId];

      // Handle nested values (e.g., assignee.name)
      if (colId.includes(".")) {
        const path = colId.split(".");
        aVal = path.reduce((obj, key) => obj?.[key], a);
        bVal = path.reduce((obj, key) => obj?.[key], b);
      }

      // Handle null/undefined
      if (aVal == null && bVal == null) continue;
      if (aVal == null) return direction === "asc" ? -1 : 1;
      if (bVal == null) return direction === "asc" ? 1 : -1;

      // Compare values
      let comparison = 0;
      if (typeof aVal === "string") {
        comparison = aVal.localeCompare(bVal);
      } else if (aVal instanceof Date || !isNaN(Date.parse(aVal))) {
        comparison = new Date(aVal).getTime() - new Date(bVal).getTime();
      } else {
        comparison = aVal - bVal;
      }

      if (comparison !== 0) {
        return direction === "asc" ? comparison : -comparison;
      }
    }
    return 0;
  });
}

// Apply search text filter across all columns
function applySearchText(data, searchText) {
  if (!searchText || searchText.trim() === "") {
    return data;
  }

  const search = searchText.toLowerCase();
  return data.filter((row) => {
    // Search in all string/number fields
    return Object.entries(row).some(([, value]) => {
      if (value === null || value === undefined) return false;

      // Handle nested objects (like assignee)
      if (typeof value === "object") {
        return Object.values(value).some((nestedVal) =>
          String(nestedVal).toLowerCase().includes(search),
        );
      }

      // Convert to string and search
      return String(value).toLowerCase().includes(search);
    });
  });
}

// Main function to process data request
export function processDataRequest({
  startRow = 0,
  endRow = 100,
  filterModel = {},
  sortModel = [],
  searchText = "",
  rowGroupCols = [],
  groupKeys = [],
}) {
  // Get full dataset
  let data = getFullDataset();

  // Apply search text first (like a pre-filter)
  data = applySearchText(data, searchText);

  // Apply filters
  data = applyFilters(data, filterModel);

  // Apply sorting
  data = applySorting(data, sortModel);

  // Handle row grouping if enabled
  if (rowGroupCols && rowGroupCols.length > 0) {
    // TODO: Implement proper grouping logic
    // For now, just return flat data
    console.log(
      "Row grouping requested but not fully implemented:",
      rowGroupCols,
      groupKeys,
    );
  }

  // Get total after filtering
  const totalRows = data.length;

  // Apply pagination
  const paginatedData = data.slice(startRow, endRow);

  return {
    rows: paginatedData,
    lastRow: totalRows,
    success: true,
  };
}

// Get aggregated stats (for dashboard)
export function getStats(filterModel = {}, searchText = "") {
  let data = getFullDataset();

  // Apply search text first (like in processDataRequest)
  data = applySearchText(data, searchText);

  // Then apply filters
  data = applyFilters(data, filterModel);

  const stats = {
    totalTasks: data.length,
    totalBudget: data.reduce((sum, task) => sum + task.value, 0),
    totalSpent: data.reduce((sum, task) => sum + task.amountDelivered, 0),
    averageProgress: Math.round(
      data.reduce((sum, task) => sum + task.percentDelivered, 0) / data.length,
    ),
    statusBreakdown: {},
    priorityBreakdown: {},
    categoryBreakdown: {},
  };

  // Calculate breakdowns
  data.forEach((task) => {
    stats.statusBreakdown[task.status] =
      (stats.statusBreakdown[task.status] || 0) + 1;
    stats.priorityBreakdown[task.priority] =
      (stats.priorityBreakdown[task.priority] || 0) + 1;
    stats.categoryBreakdown[task.category] =
      (stats.categoryBreakdown[task.category] || 0) + 1;
  });

  return stats;
}

// Export for worker
export default {
  processDataRequest,
  getStats,
  generateTask,
  TOTAL_RECORDS,
};
