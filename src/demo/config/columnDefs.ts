import { ColDef } from "ag-grid-community";
import { format } from "date-fns";
import { PRIORITY_STYLES, STATUS_STYLES } from "../data/constants";
import AvatarCellRenderer from "../components/AvatarCellRenderer";
import CategoryCellRenderer from "../components/CategoryCellRenderer";

// Helper function to get cell class for priorities
const getPriorityClass = (value: string) => {
  return PRIORITY_STYLES[value as keyof typeof PRIORITY_STYLES] || "";
};

// Helper function to get cell class for status
const getStatusClass = (value: string) => {
  return STATUS_STYLES[value as keyof typeof STATUS_STYLES] || "";
};

// Helper function to get date cell class
const getDateCellClass = (params: {
  data?: { isToday?: boolean; isPast?: boolean; isUpcoming?: boolean };
}) => {
  if (params.data?.isToday) return "bg-green-100 font-bold";
  if (params.data?.isPast) return "bg-gray-100 text-gray-600";
  if (params.data?.isUpcoming) return "bg-blue-50";
  return "";
};

// Helper function for date comparator
const dateComparator = (valueA: Date | null, valueB: Date | null) => {
  if (valueA == null && valueB == null) return 0;
  if (valueA == null) return -1;
  if (valueB == null) return 1;
  return valueA.getTime() - valueB.getTime();
};

// Helper function for date aggregation value formatter
const dateAggValueFormatter = (params: { value?: unknown }): string => {
  if (params.value && params.value instanceof Date) {
    return format(params.value, "yyyy-MM-dd");
  }
  return String(params.value || "");
};

// Helper function for value cell class
const getValueCellClass = (params: {
  node?: { footer?: boolean; level?: number };
}) => {
  const classes = ["font-mono", "text-right"];

  // Check if this is a total row (footer node)
  if (params.node?.footer) {
    classes.push("font-bold", "bg-gray-100");
  }

  // Grand total - extra emphasis
  if (params.node?.level === -1) {
    classes.push("text-green-800", "bg-green-50");
  }

  return classes.join(" ");
};

// Column definitions
export const createColumnDefs = (): ColDef[] => [
  {
    field: "name",
    headerName: "Task",
    flex: 2,
    filter: "agTextColumnFilter",
    enableRowGroup: true,
    headerTooltip: "Drag to Row Groups section to group data by Task",
    cellClass: "font-medium",
  },
  {
    field: "assignee",
    headerName: "Assignee",
    width: 200,
    filter: "agSetColumnFilter",
    enableRowGroup: true,
    headerTooltip: "Drag to Row Groups section to group data by Assignee",
    cellRenderer: AvatarCellRenderer,
    autoHeight: true,
  },
  {
    field: "category",
    headerName: "Category",
    width: 130,
    filter: "agSetColumnFilter",
    enableRowGroup: true,
    headerTooltip: "Drag to Row Groups section to group data by Category",
    cellRenderer: CategoryCellRenderer,
    autoHeight: true,
  },
  {
    field: "priority",
    headerName: "Priority",
    width: 100,
    filter: "agSetColumnFilter",
    enableRowGroup: true,
    headerTooltip: "Drag to Row Groups section to group data by Priority",
    cellClass: (params) => getPriorityClass(params.value),
  },
  {
    field: "status",
    headerName: "Status",
    width: 120,
    filter: "agSetColumnFilter",
    enableRowGroup: true,
    headerTooltip: "Drag to Row Groups section to group data by Status",
    cellClass: (params) => getStatusClass(params.value),
  },
  {
    field: "date",
    headerName: "Created",
    filter: "agDateColumnFilter",
    floatingFilter: true,
    floatingFilterComponent: "agDateColumnFloatingFilter",
    valueFormatter: (params) => {
      if (params.node?.footer || params.node?.level === -1) {
        return dateAggValueFormatter(params);
      }
      return params.value ? format(params.value, "yyyy-MM-dd") : "";
    },
    width: 120,
    cellClass: getDateCellClass,
    enableValue: true,
    aggFunc: null,
    comparator: dateComparator,
  },
  {
    field: "dueDate",
    headerName: "Due Date",
    filter: "agDateColumnFilter",
    floatingFilter: true,
    floatingFilterComponent: "agDateColumnFloatingFilter",
    valueFormatter: (params) => {
      if (params.node?.footer || params.node?.level === -1) {
        return dateAggValueFormatter(params);
      }
      return params.value ? format(params.value, "yyyy-MM-dd") : "";
    },
    width: 120,
    enableValue: true,
    aggFunc: null,
    comparator: dateComparator,
    cellClass: (params) => {
      if (!params.value || !params.data) return "";
      const today = new Date();
      const dueDate = new Date(params.value);
      const diffDays = Math.floor(
        (dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
      );

      if (diffDays < 0) return "text-red-600 font-semibold"; // Overdue
      if (diffDays === 0) return "text-orange-600 font-semibold"; // Due today
      if (diffDays <= 3) return "text-yellow-600"; // Due soon
      return "";
    },
  },
  {
    field: "value",
    headerName: "Points",
    width: 100,
    filter: "agNumberColumnFilter",
    valueFormatter: (params) => {
      if (params.value === undefined || params.value === null) return "";
      // Special formatting for grand total
      if (params.node?.level === -1) {
        return `∑ ${params.value.toLocaleString()}`;
      }
      return params.value.toString();
    },
    cellClass: getValueCellClass,
    enableRowGroup: false,
    enableValue: true,
    aggFunc: "sum",
  },
];
