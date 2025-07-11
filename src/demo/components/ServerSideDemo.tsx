import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
  useMemo,
} from "react";
import { AgGridReact } from "ag-grid-react";
import type {
  GridApi,
  IServerSideDatasource,
  IServerSideGetRowsParams,
  GridReadyEvent,
  FilterChangedEvent,
} from "ag-grid-community";
import { AllEnterpriseModule, ModuleRegistry } from "ag-grid-enterprise";
import {
  ActiveFilters,
  QuickFilterDropdown,
  FilterPresetManager,
} from "../../index";
import {
  darkTheme,
  getColumnDefs,
  defaultColDef,
  components,
  sideBarConfig,
  getStatusBarConfig,
} from "../config/sharedGridConfig";
import { DemoToolbar, StatsBar } from "../config/commonUIConfig";

// Register AG Grid Enterprise modules
ModuleRegistry.registerModules([AllEnterpriseModule]);

// Time-based quick filters - matching client-side demo
const dateQuickFilters = [
  {
    id: "all",
    label: "All Time",
    filterModel: null,
    icon: "🌍",
    description: "Show all records",
  },
  {
    id: "last7days",
    label: "Last 7 Days",
    filterModel: {
      mode: "relative",
      type: "inRange",
      expressionFrom: "Today-7d",
      expressionTo: "Today",
    },
    icon: "📅",
    description: "Records from the past week",
  },
  {
    id: "thisMonth",
    label: "This Month",
    filterModel: {
      mode: "relative",
      type: "inRange",
      expressionFrom: "StartOfMonth",
      expressionTo: "EndOfMonth",
    },
    icon: "📆",
    description: "All records from current month",
  },
  {
    id: "overdue",
    label: "Overdue",
    filterModel: null,
    buildFilterModel: (_api: GridApi) => {
      return {
        dueDate: {
          mode: "relative",
          type: "before",
          expressionFrom: "Today",
        },
        status: {
          values: [
            "Backlog",
            "Todo",
            "In Progress",
            "In Review",
            "Testing",
            "Blocked",
          ],
        },
      };
    },
    icon: "🚨",
    description: "Tasks past their due date (not done)",
  },
  {
    id: "notStarted",
    label: "Not Started",
    filterModel: null,
    buildFilterModel: (_api: GridApi) => {
      return {
        dueDate: {
          mode: "relative",
          type: "before",
          expressionFrom: "Today",
        },
        status: {
          values: ["Backlog", "Todo"],
        },
      };
    },
    icon: "⚠️",
    description: "Tasks that should have started",
  },
];

// Task type filters - matching client-side demo
const taskTypeFilters = [
  {
    id: "allTasks",
    label: "All Tasks",
    filterModel: null,
    icon: "📋",
    description: "Show all task types",
  },
  {
    id: "criticalBugs",
    label: "Critical Bugs",
    icon: "🐛",
    description: "High priority bug fixes",
    filterModel: null,
    buildFilterModel: (_api: GridApi) => {
      return {
        category: {
          values: ["Bug"],
        },
        priority: {
          values: ["Critical", "High"],
        },
      };
    },
  },
  {
    id: "features",
    label: "Features",
    icon: "✨",
    description: "New feature development",
    filterModel: null,
    buildFilterModel: (_api: GridApi) => {
      return {
        category: {
          values: ["Feature"],
        },
      };
    },
  },
  {
    id: "inProgress",
    label: "In Progress",
    icon: "🚀",
    description: "Active work items",
    filterModel: null,
    buildFilterModel: (_api: GridApi) => {
      return {
        status: {
          values: ["In Progress", "In Review", "Testing"],
        },
      };
    },
  },
  {
    id: "blocked",
    label: "Blocked",
    icon: "🛑",
    description: "Blocked tasks",
    filterModel: null,
    buildFilterModel: (_api: GridApi) => {
      return {
        status: {
          values: ["Blocked"],
        },
      };
    },
  },
];

// Stats display component - using server data
const ServerStats: React.FC<{
  apiUrl: string;
  filterModel: any;
  searchText: string;
}> = ({ apiUrl, filterModel, searchText }) => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Memoize the filter model string to prevent infinite re-renders
  const filterModelString = useMemo(
    () => JSON.stringify(filterModel),
    [filterModel],
  );

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${apiUrl}/stats`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            filterModel: JSON.parse(filterModelString),
            searchText,
          }),
        });
        const data = await response.json();
        // Transform server stats to match our common format
        setStats({
          taskCount: data.totalTasks,
          totalBudget: data.totalBudget,
          avgProgress: data.averageProgress,
          budgetRemaining: data.totalBudget - data.totalSpent,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
        // Fallback stats on error
        setStats({
          taskCount: 0,
          totalBudget: 0,
          avgProgress: 0,
          budgetRemaining: 0,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [apiUrl, filterModelString, searchText]);

  if (loading || !stats) {
    return (
      <div className="border-b border-gray-700/50 bg-gray-900/30">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-x divide-gray-700/50">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="px-6 py-5">
              <div className="flex items-center gap-4">
                <div className="p-2.5 bg-gray-700/50 rounded-lg animate-pulse">
                  <div className="w-5 h-5"></div>
                </div>
                <div className="flex-1">
                  <div className="h-3 bg-gray-700 rounded w-1/2 mb-2 animate-pulse"></div>
                  <div className="h-6 bg-gray-700 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return <StatsBar stats={stats} />;
};

export const ServerSideDemo: React.FC = () => {
  const gridRef = useRef<AgGridReact>(null);
  const [gridApi, setGridApi] = useState<GridApi | null>(null);
  const [filterModel, setFilterModel] = useState({});
  const [rowCount, setRowCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [showBanner, setShowBanner] = useState(true);
  const [searchText, setSearchText] = useState("");
  const searchTextRef = useRef("");
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [aggregations, setAggregations] = useState<any>(null);

  // Keep ref in sync with state
  useEffect(() => {
    searchTextRef.current = searchText;
  }, [searchText]);

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

  // Fetch aggregations for grand total row
  const fetchAggregations = useCallback(async () => {
    try {
      const response = await fetch(`${apiUrl}/stats`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          filterModel,
          searchText: searchTextRef.current,
        }),
      });
      const data = await response.json();
      setAggregations(data);
    } catch (error) {
      console.error("Error fetching aggregations:", error);
    }
  }, [apiUrl, filterModel]);

  // Get column definitions for server-side
  const columnDefs = useMemo(() => getColumnDefs(true), []);

  // Get status bar config for server-side
  const statusBarConfig = useMemo(() => getStatusBarConfig(true), []);

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
                searchText: searchTextRef.current,
              }),
            });

            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();

            // Update row count
            setRowCount(result.lastRow);

            // Fetch aggregations for the grand total row
            fetchAggregations();

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

      // Set the datasource with error handling for license issues
      try {
        params.api.setGridOption("serverSideDatasource", datasource);
      } catch (error) {
        console.error("Error setting server-side datasource:", error);
        // Fall back to client-side if server-side fails due to licensing
        alert(
          "Server-side features require AG Grid Enterprise license. Please use the Client-Side Data tab for testing.",
        );
      }
    },
    [apiUrl, fetchAggregations],
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

      {/* Search bar */}
      <DemoToolbar
        searchPlaceholder="Search all columns..."
        onSearchChange={(value) => {
          setSearchText(value);

          // Debounce the server request
          if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
          }

          searchTimeoutRef.current = setTimeout(() => {
            // Refresh the server-side data with new search
            gridApi?.refreshServerSide({ purge: true });
          }, 300); // 300ms debounce
        }}
      >
        {/* Quick Filters - matching client-side demo */}
        {gridApi && (
          <>
            <QuickFilterDropdown
              key="server-date-filter"
              api={gridApi}
              columnId="dueDate"
              options={dateQuickFilters}
              placeholder="Time period"
              showDescriptions={false}
              className="min-w-[140px]"
              usePortal="always"
            />
            <QuickFilterDropdown
              key="server-task-filter"
              api={gridApi}
              columnId="_multi"
              options={taskTypeFilters}
              placeholder="Task type"
              showDescriptions={false}
              className="min-w-[140px]"
              usePortal="always"
            />
          </>
        )}
      </DemoToolbar>

      {/* Active Filters Row and Filter Preset Actions - matching client-side demo */}
      {gridApi && (
        <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-800 rounded-lg mt-3">
          <div className="border-t border-gray-700/50 bg-gray-800/20 p-3">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              {Object.keys(filterModel).length > 0 && (
                <ActiveFilters api={gridApi} filterModel={filterModel} />
              )}
              <FilterPresetManager
                api={gridApi}
                gridId="server-side-demo"
                onPresetApplied={(preset) => {
                  console.log("Applied preset:", preset.name);
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Grid Container - fills remaining height */}
      <div className="flex-1 bg-gray-900/50 rounded-xl border border-gray-800 flex flex-col mt-4">
        {/* Server Stats Bar */}
        <ServerStats
          apiUrl={apiUrl}
          filterModel={filterModel}
          searchText={searchText}
        />

        {/* AG Grid - fills remaining height */}
        <div
          className="flex-1 relative overflow-hidden"
          style={{ minHeight: "400px", height: "100%" }}
        >
          <AgGridReact
            theme={darkTheme}
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
            components={components}
            sideBar={sideBarConfig}
            statusBar={statusBarConfig}
            domLayout="normal"
            pinnedBottomRowData={
              aggregations
                ? [
                    {
                      id: "TOTAL",
                      name: "Grand Total",
                      value: aggregations.totalBudget,
                      amountDelivered: aggregations.totalSpent,
                      remaining:
                        aggregations.totalBudget - aggregations.totalSpent,
                      percentDelivered: aggregations.averageProgress,
                    },
                  ]
                : []
            }
            getRowStyle={(params) => {
              if (params.node.rowPinned) {
                return {
                  fontWeight: "bold",
                  backgroundColor: "rgba(79, 70, 229, 0.1)",
                  borderTop: "2px solid rgba(79, 70, 229, 0.3)",
                };
              }
              return undefined;
            }}
          />
        </div>
      </div>

      {/* API Health Check */}
      <div className="text-xs text-gray-500 text-center mt-2">
        API Status: <span className="font-mono">{apiUrl}</span>
      </div>
    </div>
  );
};
