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

  // Determine API URL based on environment
  const getApiUrl = () => {
    const isPR =
      window.location.hostname === "demo.rozich.net" &&
      window.location.pathname.includes("-pr-");
    const isLocal = window.location.hostname === "localhost";

    if (isLocal) {
      // For local development, you'll need to run the API worker locally
      return "http://localhost:8787/api";
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
      filter: "agSetColumnFilter",
    },
    {
      field: "priority",
      headerName: "Priority",
      width: 120,
      filter: "agSetColumnFilter",
    },
    {
      field: "category",
      headerName: "Category",
      width: 140,
      cellRenderer: CategoryCellRenderer,
      filter: "agSetColumnFilter",
    },
    {
      field: "assignee.name",
      headerName: "Assignee",
      width: 180,
      cellRenderer: AvatarCellRenderer,
      filter: "agTextColumnFilter",
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
      cellRenderer: PercentBarRenderer,
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

  const clearAllFilters = useCallback(() => {
    gridApi?.setFilterModel(null);
  }, [gridApi]);

  return (
    <div className="space-y-6">
      {/* Info Banner */}
      <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-4">
        <h3 className="text-blue-400 font-semibold mb-2">
          🚀 Server-Side Row Model Demo
        </h3>
        <p className="text-gray-300 text-sm">
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

      {/* Server Stats */}
      <ServerStats apiUrl={apiUrl} filterModel={filterModel} />

      {/* Active Filters */}
      {gridApi && Object.keys(filterModel).length > 0 && (
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-gray-300">
              Active Filters
            </h3>
            <button
              onClick={clearAllFilters}
              className="text-xs text-gray-400 hover:text-white"
            >
              Clear all
            </button>
          </div>
          <ActiveFilters api={gridApi} filterModel={filterModel} />
        </div>
      )}

      {/* Grid */}
      <div style={{ height: 600, width: "100%" }}>
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
        />
      </div>

      {/* API Health Check */}
      <div className="text-xs text-gray-500 text-center">
        API Status: <span className="font-mono">{apiUrl}</span>
      </div>
    </div>
  );
};
