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

// Helper function to create group rows with aggregations
function createGroupRow(groupKey, groupValue, children, level, groupColumns) {
  // Calculate aggregations for the group
  const totalValue = children.reduce(
    (sum, child) => sum + (child.value || 0),
    0,
  );
  const totalAmountDelivered = children.reduce(
    (sum, child) => sum + (child.amountDelivered || 0),
    0,
  );
  const avgPercentDelivered =
    children.length > 0
      ? children.reduce(
          (sum, child) => sum + (child.percentDelivered || 0),
          0,
        ) / children.length
      : 0;
  const totalEstimatedHours = children.reduce(
    (sum, child) => sum + (child.estimatedHours || 0),
    0,
  );
  const totalActualHours = children.reduce(
    (sum, child) => sum + (child.actualHours || 0),
    0,
  );

  const groupRow = {
    // AG Grid group row properties
    group: true,
    groupKey: groupKey || "",

    // Aggregated values
    value: totalValue,
    amountDelivered: totalAmountDelivered,
    remaining: totalValue - totalAmountDelivered,
    percentDelivered: Math.round(avgPercentDelivered),
    estimatedHours: totalEstimatedHours,
    actualHours: totalActualHours,

    // Group metadata
    childCount: children.length,
    expanded: false,
    level: level,
  };

  // Add the group field dynamically if we have valid column info
  if (groupColumns && groupColumns[level]) {
    groupRow[groupColumns[level]] = groupValue;
  }

  return groupRow;
}

// Function to perform server-side grouping
function performGrouping(data, rowGroupCols, groupKeys) {
  // Normalize rowGroupCols - it might be an array of objects or strings
  const groupColumns = Array.isArray(rowGroupCols)
    ? rowGroupCols.map((col) =>
        typeof col === "string" ? col : col.field || col.id,
      )
    : [];

  if (groupColumns.length === 0) {
    return data; // No grouping requested
  }

  // If we have group keys, we're fetching children of a specific group
  if (groupKeys && groupKeys.length > 0) {
    // Filter data to match all group keys
    let filteredData = data;
    for (let i = 0; i < groupKeys.length; i++) {
      const groupCol = groupColumns[i];
      const groupValue = groupKeys[i];
      filteredData = filteredData.filter((row) => row[groupCol] === groupValue);
    }

    // If we've reached the deepest level, return leaf nodes
    if (groupKeys.length === groupColumns.length) {
      return filteredData;
    }

    // Otherwise, group by the next column
    const nextGroupCol = groupColumns[groupKeys.length];
    const groups = {};

    filteredData.forEach((row) => {
      const groupValue = row[nextGroupCol];
      if (!groups[groupValue]) {
        groups[groupValue] = [];
      }
      groups[groupValue].push(row);
    });

    // Create group rows
    const groupRows = [];
    Object.entries(groups).forEach(([groupValue, children]) => {
      const groupKey = [...groupKeys, groupValue].join("|");
      groupRows.push(
        createGroupRow(
          groupKey,
          groupValue,
          children,
          groupKeys.length,
          groupColumns,
        ),
      );
    });

    return groupRows;
  }

  // Top level grouping - group by first column
  const firstGroupCol = groupColumns[0];
  const groups = {};

  data.forEach((row) => {
    const groupValue = row[firstGroupCol];
    if (!groups[groupValue]) {
      groups[groupValue] = [];
    }
    groups[groupValue].push(row);
  });

  // Create top-level group rows
  const groupRows = [];
  Object.entries(groups).forEach(([groupValue, children]) => {
    groupRows.push(
      createGroupRow(groupValue, groupValue, children, 0, groupColumns),
    );
  });

  return groupRows;
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

  // Handle row grouping if enabled
  if (rowGroupCols && rowGroupCols.length > 0) {
    // Perform server-side grouping with aggregations
    data = performGrouping(data, rowGroupCols, groupKeys);

    // Apply sorting to grouped data
    if (sortModel && sortModel.length > 0) {
      data = applySorting(data, sortModel);
    }
  } else {
    // Apply sorting to flat data
    data = applySorting(data, sortModel);
  }

  // Get total after filtering and grouping
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
