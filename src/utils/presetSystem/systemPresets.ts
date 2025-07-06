import type { SystemPreset } from "./types";

/**
 * Default system presets for common filtering patterns
 */
export const DEFAULT_SYSTEM_PRESETS: SystemPreset[] = [
  {
    id: "active-only",
    name: "Active Items Only",
    description: "Show only active records",
    gridState: {
      filters: {
        status: {
          filterType: "text",
          type: "equals",
          filter: "active",
        },
      },
    },
    isSystemPreset: true,
  },
  {
    id: "recent-changes",
    name: "Recent Changes (Last 7 Days)",
    description: "Items modified in the last week",
    gridState: {
      filters: {
        updatedAt: {
          filterType: "date",
          type: "after",
          filter: "{{last7Days}}",
        },
      },
    },
    isSystemPreset: true,
  },
  {
    id: "high-priority",
    name: "High Priority",
    description: "Show only high priority items",
    gridState: {
      filters: {
        priority: {
          filterType: "text",
          type: "equals",
          filter: "high",
        },
      },
    },
    isSystemPreset: true,
  },
  {
    id: "needs-review",
    name: "Needs Review",
    description: "Items pending review",
    gridState: {
      filters: {
        status: {
          filterType: "text",
          type: "equals",
          filter: "pending_review",
        },
      },
    },
    isSystemPreset: true,
  },
  {
    id: "overdue-items",
    name: "Overdue Items",
    description: "Items past their due date",
    gridState: {
      filters: {
        dueDate: {
          filterType: "date",
          type: "before",
          filter: "{{today}}",
        },
        status: {
          filterType: "text",
          type: "notEqual",
          filter: "completed",
        },
      },
    },
    isSystemPreset: true,
  },
  {
    id: "this-month",
    name: "This Month",
    description: "Items created this month",
    gridState: {
      filters: {
        createdAt: {
          filterType: "date",
          type: "inRange",
          dateFrom: "{{startOfMonth}}",
          dateTo: "{{endOfMonth}}",
        },
      },
    },
    isSystemPreset: true,
  },
  {
    id: "my-items",
    name: "My Items",
    description: "Items assigned to current user",
    gridState: {
      filters: {
        assignee: {
          filterType: "text",
          type: "equals",
          filter: "{{currentUser}}",
        },
      },
    },
    isSystemPreset: true,
  },
];

/**
 * Date-specific system presets
 */
export const DATE_SYSTEM_PRESETS: SystemPreset[] = [
  {
    id: "date-today",
    name: "Today",
    description: "Items with today's date",
    gridState: {
      filters: {
        date: {
          filterType: "date",
          type: "equals",
          filter: "{{today}}",
        },
      },
    },
    isSystemPreset: true,
  },
  {
    id: "date-last-7-days",
    name: "Last 7 Days",
    description: "Items from the past week",
    gridState: {
      filters: {
        date: {
          filterType: "date",
          type: "inRange",
          dateFrom: "{{last7Days}}",
          dateTo: "{{today}}",
        },
      },
    },
    isSystemPreset: true,
  },
  {
    id: "date-this-quarter",
    name: "This Quarter",
    description: "Items from current quarter",
    gridState: {
      filters: {
        date: {
          filterType: "date",
          type: "inRange",
          dateFrom: "{{startOfQuarter}}",
          dateTo: "{{endOfQuarter}}",
        },
      },
    },
    isSystemPreset: true,
  },
  {
    id: "date-future",
    name: "Future",
    description: "Items with future dates",
    gridState: {
      filters: {
        date: {
          filterType: "date",
          type: "after",
          filter: "{{today}}",
        },
      },
    },
    isSystemPreset: true,
  },
];

/**
 * Create custom system presets for specific use cases
 */
export function createSystemPreset(
  preset: Omit<SystemPreset, "isSystemPreset">,
): SystemPreset {
  return {
    ...preset,
    isSystemPreset: true,
  };
}

/**
 * Combine multiple preset arrays
 */
export function combineSystemPresets(
  ...presetArrays: SystemPreset[][]
): SystemPreset[] {
  const combined = presetArrays.flat();

  // Remove duplicates by ID
  const uniquePresets = new Map<string, SystemPreset>();
  for (const preset of combined) {
    uniquePresets.set(preset.id, preset);
  }

  return Array.from(uniquePresets.values());
}
