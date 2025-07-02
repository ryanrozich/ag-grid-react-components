import React, { useState, useCallback, useRef, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { themeQuartz } from "ag-grid-community";
import type {
  ColDef,
  GridApi,
  IServerSideDatasource,
  IServerSideGetRowsParams,
  GridReadyEvent,
  FilterChangedEvent,
} from "ag-grid-community";
import { RelativeDateFilter, ActiveFilters } from "../../index";
import AvatarCellRenderer from "./AvatarCellRenderer";
import CategoryCellRenderer from "./CategoryCellRenderer";
import PercentBarRenderer from "./PercentBarRenderer";
import type { ICellRendererParams } from "ag-grid-community";

// Status chip renderer
const StatusRenderer: React.FC<ICellRendererParams> = ({ value }) => {
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
const PriorityRenderer: React.FC<ICellRendererParams> = ({ value }) => {
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

// Create server-side demo theme
const serverTheme = themeQuartz.withParams({
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
  // Input and control styling for filters
  inputBackgroundColor: "rgba(15, 23, 42, 0.8)",
  inputBorderColor: "rgba(55, 65, 81, 0.5)",
  inputFocusBorderColor: "#4f46e5",
  inputDisabledBackgroundColor: "rgba(15, 23, 42, 0.5)",
  inputDisabledBorderColor: "rgba(31, 41, 55, 0.3)",
  // Menu and popup styling
  menuBackgroundColor: "#0f172a",
  menuBorderColor: "rgba(55, 65, 81, 0.5)",
  menuTextColor: "#9ca3af",
  menuShadow:
    "0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2)",
});

// Stats display component
const ServerStats: React.FC<{ apiUrl: string; filterModel: any }> = ({
  apiUrl,
  filterModel,
}) => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${apiUrl}/stats`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ filterModel }),
        });
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error("Error fetching stats:", error);
        // Fallback stats on error
        setStats({
          totalTasks: 0,
          totalBudget: 0,
          averageProgress: 0,
          totalSpent: 0,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [apiUrl, filterModel]);

  if (loading || !stats) {
    return (
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-gray-800 rounded-lg p-4 animate-pulse">
            <div className="h-4 bg-gray-700 rounded w-1/2 mb-2"></div>
            <div className="h-8 bg-gray-700 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      <div className="bg-gray-800 rounded-lg p-4">
        <div className="text-sm text-gray-400">Total Tasks</div>
        <div className="text-2xl font-bold text-white">
          {stats.totalTasks.toLocaleString()}
        </div>
        <div className="text-xs text-gray-500 mt-1">From server</div>
      </div>
      <div className="bg-gray-800 rounded-lg p-4">
        <div className="text-sm text-gray-400">Total Budget</div>
        <div className="text-2xl font-bold text-white">
          ${stats.totalBudget.toLocaleString()}
        </div>
      </div>
      <div className="bg-gray-800 rounded-lg p-4">
        <div className="text-sm text-gray-400">Average Progress</div>
        <div className="text-2xl font-bold text-white">
          {stats.averageProgress}%
        </div>
      </div>
      <div className="bg-gray-800 rounded-lg p-4">
        <div className="text-sm text-gray-400">Budget Remaining</div>
        <div className="text-2xl font-bold text-white">
          ${(stats.totalBudget - stats.totalSpent).toLocaleString()}
        </div>
      </div>
    </div>
  );
};

export const ServerSideDemo: React.FC = () => {
  const gridRef = useRef<AgGridReact>(null);
  const [gridApi, setGridApi] = useState<GridApi | null>(null);
  const [filterModel, setFilterModel] = useState({});
  const [rowCount, setRowCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [showBanner, setShowBanner] = useState(true);

  // Determine API URL based on environment
  const getApiUrl = () => {
    const isPR =
      window.location.hostname === "demo.rozich.net" &&
      window.location.pathname.includes("-pr-");
    const isLocal = window.location.hostname === "localhost";

    if (isLocal) {
      // For local development, use Vite proxy
      return "/api";
    }

    if (isPR) {
      // Extract PR number from pathname
      const match = window.location.pathname.match(/pr-(\d+)/);
      const prNumber = match ? match[1] : "";
      return `https://demo.rozich.net/ag-grid-react-components-pr-${prNumber}/api`;
    }

    // Production
    return "https://demo.rozich.net/ag-grid-react-components/api";
  };

  const apiUrl = getApiUrl();

  const columnDefs: ColDef[] = [
    {
      field: "taskId",
      headerName: "Task ID",
      width: 120,
      pinned: "left",
    },
    {
      field: "title",
      headerName: "Title",
      width: 300,
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
      field: "assignee.name",
      headerName: "Assignee",
      width: 180,
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
      field: "progress",
      headerName: "Progress",
      width: 150,
      cellRenderer: "progressRenderer",
      filter: "agNumberColumnFilter",
    },
    {
      field: "budget",
      headerName: "Budget",
      width: 120,
      filter: "agNumberColumnFilter",
      valueFormatter: (params) => `$${params.value.toLocaleString()}`,
    },
  ];

  const defaultColDef: ColDef = {
    sortable: true,
    resizable: true,
    filterParams: {
      buttons: ["reset", "apply"],
    },
  };

  const onGridReady = useCallback(
    (params: GridReadyEvent) => {
      setGridApi(params.api);

      // Create server-side datasource
      const datasource: IServerSideDatasource = {
        getRows: async (params: IServerSideGetRowsParams) => {
          setLoading(true);
          try {
            const response = await fetch(`${apiUrl}/tasks`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                startRow: params.request.startRow,
                endRow: params.request.endRow,
                filterModel: params.request.filterModel,
                sortModel: params.request.sortModel,
              }),
            });

            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();

            // Update row count
            setRowCount(result.lastRow);

            // Supply rows to grid
            params.success({
              rowData: result.rows,
              rowCount: result.lastRow,
            });
          } catch (error) {
            console.error("Error fetching data:", error);
            console.error("API URL:", `${apiUrl}/tasks`);

            // Show error message in UI
            if (error instanceof Error) {
              alert(
                `Error loading data: ${error.message}\n\nMake sure the API is running with: npm run api`,
              );
            }

            params.fail();
          } finally {
            setLoading(false);
          }
        },
      };

      // Set the datasource
      params.api.setGridOption("serverSideDatasource", datasource);
    },
    [apiUrl],
  );

  const onFilterChanged = useCallback((event: FilterChangedEvent) => {
    setFilterModel(event.api.getFilterModel());
  }, []);

  return (
    <div className="flex flex-col h-full">
      {/* Info Banner */}
      {showBanner && (
        <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-4 mb-4 relative">
          <button
            onClick={() => setShowBanner(false)}
            className="absolute top-2 right-2 text-gray-400 hover:text-white transition-colors"
            aria-label="Dismiss banner"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <h3 className="text-blue-400 font-semibold mb-2">
            🚀 Server-Side Row Model Demo
          </h3>
          <p className="text-gray-300 text-sm pr-8">
            This demo uses AG Grid's Server-Side Row Model with a real API
            backend. Data is fetched on-demand as you scroll, filter, and sort.
            The API endpoint is{" "}
            <code className="bg-gray-800 px-2 py-1 rounded text-xs">
              {apiUrl}/tasks
            </code>
          </p>
          <p className="text-gray-400 text-xs mt-2">
            Total rows on server:{" "}
            <span className="font-mono">
              {rowCount?.toLocaleString() || "..."}
            </span>
            {loading && <span className="ml-2">⏳ Loading...</span>}
          </p>
        </div>
      )}

      {/* Server Stats */}
      <ServerStats apiUrl={apiUrl} filterModel={filterModel} />

      {/* Search info for server-side */}
      <div className="bg-yellow-900/20 border border-yellow-700 rounded-lg p-3 mb-4 text-sm">
        <p className="text-yellow-300">
          💡 Note: Server-side row model uses column filters for searching. Use
          the floating filters below each column header to search.
        </p>
      </div>

      {/* Active Filters */}
      {gridApi && Object.keys(filterModel).length > 0 && (
        <div className="mb-4">
          <ActiveFilters api={gridApi} filterModel={filterModel} />
        </div>
      )}

      {/* Grid - flex-1 takes remaining height */}
      <div className="flex-1 min-h-0">
        <AgGridReact
          theme={serverTheme}
          ref={gridRef}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          rowModelType="serverSide"
          cacheBlockSize={100}
          maxBlocksInCache={10}
          onGridReady={onGridReady}
          onFilterChanged={onFilterChanged}
          onSortChanged={() => {
            /* Server-side handles sorting automatically */
          }}
          animateRows={true}
          pagination={false} // Server-side doesn't use pagination
          suppressMenuHide={true}
          enableCellTextSelection={true}
          ensureDomOrder={true}
          components={{
            statusRenderer: StatusRenderer,
            priorityRenderer: PriorityRenderer,
            categoryRenderer: CategoryCellRenderer,
            avatarRenderer: AvatarCellRenderer,
            progressRenderer: PercentBarRenderer,
          }}
          floatingFilter={true}
        />
      </div>

      {/* API Health Check */}
      <div className="text-xs text-gray-500 text-center mt-2">
        API Status: <span className="font-mono">{apiUrl}</span>
      </div>
    </div>
  );
};
