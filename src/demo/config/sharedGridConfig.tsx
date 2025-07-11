import React from "react";
import { themeQuartz } from "ag-grid-community";
import type { ColDef, ICellRendererParams } from "ag-grid-community";
import { RelativeDateFilter } from "../../index";
import AvatarCellRenderer from "../components/AvatarCellRenderer";
import CategoryCellRenderer from "../components/CategoryCellRenderer";
import PercentBarRenderer from "../components/PercentBarRenderer";

// Shared dark theme configuration
export const darkTheme = themeQuartz.withParams({
  backgroundColor: "#0a0f19",
  foregroundColor: "#9ca3af",
  borderColor: "rgba(31, 41, 55, 0.5)",
  chromeBackgroundColor: "#0a0f19",
  headerBackgroundColor: "rgba(15, 23, 42, 0.8)",
  headerTextColor: "#9ca3af",
  oddRowBackgroundColor: "rgba(15, 23, 42, 0.3)",
  browserColorScheme: "dark",
  accentColor: "#4f46e5",
  headerFontWeight: 500,
  rowHoverColor: "rgba(99, 102, 241, 0.06)",
  selectedRowBackgroundColor: "rgba(99, 102, 241, 0.1)",
  rangeSelectionBorderColor: "rgba(99, 102, 241, 0.3)",
  inputBackgroundColor: "rgba(15, 23, 42, 0.8)",
  inputBorder: "rgba(55, 65, 81, 0.5)",
  inputFocusBorder: "#4f46e5",
  inputDisabledBackgroundColor: "rgba(15, 23, 42, 0.5)",
  inputDisabledBorder: "rgba(31, 41, 55, 0.3)",
  menuBackgroundColor: "#0f172a",
  menuBorder: "rgba(55, 65, 81, 0.5)",
  menuTextColor: "#9ca3af",
  menuShadow:
    "0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2)",
});

// Status chip renderer
export const StatusRenderer: React.FC<ICellRendererParams> = ({ value }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Backlog":
        return "bg-gray-500/20 text-gray-400 border-gray-500/50";
      case "Todo":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/50";
      case "In Progress":
        return "bg-blue-500/20 text-blue-400 border-blue-500/50";
      case "In Review":
        return "bg-purple-500/20 text-purple-400 border-purple-500/50";
      case "Testing":
        return "bg-orange-500/20 text-orange-400 border-orange-500/50";
      case "Done":
        return "bg-emerald-500/20 text-emerald-400 border-emerald-500/50";
      case "Blocked":
        return "bg-red-500/20 text-red-400 border-red-500/50";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/50";
    }
  };

  return (
    <div className="flex items-center h-full">
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(value)}`}
      >
        {value}
      </span>
    </div>
  );
};

// Priority chip renderer
export const PriorityRenderer: React.FC<ICellRendererParams> = ({ value }) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical":
        return "bg-red-500/20 text-red-400 border-red-500/50";
      case "High":
        return "bg-orange-500/20 text-orange-400 border-orange-500/50";
      case "Medium":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/50";
      case "Low":
        return "bg-green-500/20 text-green-400 border-green-500/50";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/50";
    }
  };

  return (
    <div className="flex items-center h-full">
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(value)}`}
      >
        {value}
      </span>
    </div>
  );
};

// Shared column definitions
export const getColumnDefs = (isServerSide = false): ColDef[] => [
  {
    field: "id",
    headerName: "ID",
    width: 100,
    pinned: "left",
    enableRowGroup: !isServerSide,
    cellClass: "font-mono text-sm",
  },
  {
    field: "name",
    headerName: "Task",
    width: 320,
    filter: "agTextColumnFilter",
  },
  {
    field: "status",
    headerName: "Status",
    width: 140,
    cellRenderer: "statusRenderer",
    filter: "agSetColumnFilter",
    filterParams: {
      values: [
        "Todo",
        "In Progress",
        "Done",
        "In Review",
        "Testing",
        "Blocked",
        "Backlog",
      ],
      suppressSelectAll: true,
    },
    enableRowGroup: true,
  },
  {
    field: "priority",
    headerName: "Priority",
    width: 120,
    cellRenderer: "priorityRenderer",
    filter: "agSetColumnFilter",
    filterParams: {
      values: ["Low", "Medium", "High", "Critical"],
      suppressSelectAll: true,
    },
    enableRowGroup: true,
  },
  {
    field: "category",
    headerName: "Category",
    width: 140,
    cellRenderer: "categoryRenderer",
    filter: "agSetColumnFilter",
    filterParams: {
      values: [
        "Bug",
        "Feature",
        "Documentation",
        "Refactor",
        "Testing",
        "DevOps",
        "Security",
        "Performance",
      ],
      suppressSelectAll: true,
    },
    enableRowGroup: true,
  },
  {
    field: "assignee",
    headerName: "Assignee",
    width: 200,
    cellRenderer: "avatarRenderer",
    filter: "agTextColumnFilter",
    enableRowGroup: true,
  },
  {
    field: "dueDate",
    headerName: "Due Date",
    width: 150,
    filter: RelativeDateFilter,
    valueFormatter: (params) => {
      if (!params.value) return "";
      return new Date(params.value).toLocaleDateString();
    },
  },
  {
    field: "percentDelivered",
    headerName: "% Delivered",
    width: 150,
    cellRenderer: "progressRenderer",
    filter: "agNumberColumnFilter",
  },
  {
    field: "value",
    headerName: "Value",
    width: 120,
    filter: "agNumberColumnFilter",
    valueFormatter: (params) =>
      params.value ? `$${params.value.toLocaleString()}` : "",
    aggFunc: "sum",
  },
  {
    field: "amountDelivered",
    headerName: "Delivered",
    width: 120,
    filter: "agNumberColumnFilter",
    valueFormatter: (params) =>
      params.value ? `$${params.value.toLocaleString()}` : "",
    aggFunc: "sum",
  },
  {
    field: "remaining",
    headerName: "Remaining",
    width: 120,
    filter: "agNumberColumnFilter",
    valueFormatter: (params) =>
      params.value ? `$${params.value.toLocaleString()}` : "",
    aggFunc: "sum",
    hide: !isServerSide,
  },
];

// Default column definition
export const defaultColDef: ColDef = {
  sortable: true,
  resizable: true,
  filterParams: {
    buttons: ["reset", "apply"],
  },
};

// Cell renderer components mapping
export const components = {
  statusRenderer: StatusRenderer,
  priorityRenderer: PriorityRenderer,
  categoryRenderer: CategoryCellRenderer,
  avatarRenderer: AvatarCellRenderer,
  progressRenderer: PercentBarRenderer,
};

// Sidebar configuration (for Enterprise)
export const sideBarConfig = {
  toolPanels: [
    {
      id: "columns",
      labelDefault: "Columns",
      labelKey: "columns",
      iconKey: "columns",
      toolPanel: "agColumnsToolPanel",
      toolPanelParams: {
        suppressRowGroups: false,
        suppressValues: false,
        suppressPivots: true,
        suppressPivotMode: true,
      },
    },
    {
      id: "filters",
      labelDefault: "Filters",
      labelKey: "filters",
      iconKey: "filter",
      toolPanel: "agFiltersToolPanel",
      toolPanelParams: {
        suppressFilterSearch: false,
      },
    },
  ],
  position: "right" as const,
  defaultToolPanel: "", // Empty string means no panel is open by default
};

// Status bar configuration (for Enterprise)
export const getStatusBarConfig = (isServerSide = false) => {
  if (isServerSide) {
    // Server-side row model only supports limited status bar components
    return {
      statusPanels: [
        { statusPanel: "agSelectedRowCountComponent", align: "left" },
        { statusPanel: "agAggregationComponent", align: "right" },
      ],
    };
  }

  // Client-side row model supports all components
  return {
    statusPanels: [
      { statusPanel: "agTotalAndFilteredRowCountComponent", align: "left" },
      { statusPanel: "agTotalRowCountComponent", align: "center" },
      { statusPanel: "agFilteredRowCountComponent", align: "center" },
      { statusPanel: "agSelectedRowCountComponent", align: "center" },
      { statusPanel: "agAggregationComponent", align: "right" },
    ],
  };
};
