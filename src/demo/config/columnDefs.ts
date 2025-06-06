import { ColDef } from "ag-grid-community";
import { format } from "date-fns";
import { CATEGORY_STYLES } from "../data/constants";

// Helper function to get cell class for categories
const getCategoryClass = (value: string) => {
  return CATEGORY_STYLES[value as keyof typeof CATEGORY_STYLES] || "";
};

// Helper function to get cell class for priorities
const getPriorityClass = (value: string) => {
  switch (value) {
    case "Low":
      return "bg-gray-50 text-gray-800";
    case "Medium":
      return "bg-blue-50 text-blue-800";
    case "High":
      return "bg-orange-50 text-orange-800";
    case "Urgent":
      return "bg-red-50 text-red-800";
    default:
      return "";
  }
};

// Helper function to get cell class for status
const getStatusClass = (value: string) => {
  switch (value) {
    case "Pending":
      return "bg-yellow-50 text-yellow-800";
    case "In Progress":
      return "bg-blue-50 text-blue-800";
    case "Completed":
      return "bg-green-50 text-green-800";
    case "Cancelled":
      return "bg-red-50 text-red-800";
    case "Delayed":
      return "bg-orange-50 text-orange-800";
    default:
      return "";
  }
};

// Helper function to get date cell class
const getDateCellClass = (params: { data?: { isToday?: boolean; isPast?: boolean; isUpcoming?: boolean } }) => {
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
const getValueCellClass = (params: { node?: { footer?: boolean; level?: number } }) => {
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
    field: "id",
    headerName: "ID",
    width: 70,
    filter: "agNumberColumnFilter",
    cellClass: "font-mono text-xs",
    enableRowGroup: false,
  },
  {
    field: "name",
    headerName: "Name",
    flex: 1,
    filter: "agTextColumnFilter",
    enableRowGroup: true,
    headerTooltip: "Drag to Row Groups section to group data by Name",
  },
  {
    field: "category",
    headerName: "Category",
    width: 120,
    filter: "agSetColumnFilter",
    enableRowGroup: true,
    headerTooltip: "Drag to Row Groups section to group data by Category",
    cellClass: (params) => getCategoryClass(params.value),
  },
  {
    field: "date",
    headerName: "Date",
    filter: "agDateColumnFilter",
    floatingFilter: true,
    floatingFilterComponent: "agDateColumnFloatingFilter",
    valueFormatter: (params) =>
      params.value ? format(params.value, "yyyy-MM-dd") : "",
    width: 150,
    cellClass: getDateCellClass,
    enableValue: true,
    aggFunc: null,
    comparator: dateComparator,
    valueFormatter: dateAggValueFormatter,
  },
  {
    field: "dueDate",
    headerName: "Due Date",
    filter: "agDateColumnFilter",
    floatingFilter: true,
    floatingFilterComponent: "agDateColumnFloatingFilter",
    valueFormatter: (params) =>
      params.value ? format(params.value, "yyyy-MM-dd") : "",
    width: 150,
    enableValue: true,
    aggFunc: null,
    comparator: dateComparator,
    valueFormatter: dateAggValueFormatter,
  },
  {
    field: "priority",
    headerName: "Priority",
    width: 120,
    filter: "agSetColumnFilter",
    enableRowGroup: true,
    headerTooltip: "Drag to Row Groups section to group data by Priority",
    cellClass: (params) => getPriorityClass(params.value),
  },
  {
    field: "status",
    headerName: "Status",
    width: 130,
    filter: "agSetColumnFilter",
    enableRowGroup: true,
    headerTooltip: "Drag to Row Groups section to group data by Status",
    cellClass: (params) => getStatusClass(params.value),
  },
  {
    field: "value",
    headerName: "Value",
    width: 120,
    filter: "agNumberColumnFilter",
    valueFormatter: (params) => {
      if (params.value === undefined || params.value === null) return "";
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
      }).format(params.value);
    },
    cellClass: getValueCellClass,
    enableRowGroup: false,
    enableValue: true,
    aggFunc: "sum",
  },
];