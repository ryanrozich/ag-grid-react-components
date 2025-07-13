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
import { ActiveFilters, QuickFilterDropdown } from "../../index";
import SavedViewsManager from "../../components/SavedViewsManager";
import {
  darkTheme,
  getColumnDefs,
  defaultColDef,
  components,
  sideBarConfig,
  getStatusBarConfig,
} from "../config/sharedGridConfig";
import { DemoToolbar, StatsBar } from "../config/commonUIConfig";
import "../styles/SavedViewsManager.css";

// Register AG Grid Enterprise modules
ModuleRegistry.registerModules([AllEnterpriseModule]);

// Time-based quick filters - same as client-side demo
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
];

// Task type filters - same as client-side demo
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
];

// Preset filters - complex filter combinations
const presetFilters = [
  {
    id: "all",
    label: "All Tasks",
    icon: "📋",
    description: "Show all tasks",
    filterModel: null,
  },
  {
    id: "myOpenTasks",
    label: "My Open Tasks",
    icon: "👤",
    description: "Assigned to me, not completed",
    buildFilterModel: (_api: GridApi) => {
      // In a real app, you'd get current user from context
      const currentUser = "Sam Cassin"; // Example user
      return {
        assignee: {
          values: [currentUser],
        },
        status: {
          values: ["Todo", "In Progress", "In Review", "Testing", "Blocked"],
        },
      };
    },
  },
  {
    id: "criticalOverdue",
    label: "Critical & Overdue",
    icon: "🚨",
    description: "High priority tasks past due date",
    buildFilterModel: (_api: GridApi) => {
      return {
        priority: {
          values: ["Critical", "High"],
        },
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
  },
  {
    id: "highPriority",
    label: "High Priority",
    icon: "⚡",
    description: "Critical and high priority items",
    buildFilterModel: (_api: GridApi) => {
      return {
        priority: {
          values: ["Critical", "High"],
        },
      };
    },
  },
  {
    id: "upcomingDeadlines",
    label: "Upcoming Deadlines",
    icon: "⏰",
    description: "Due in the next 7 days",
    buildFilterModel: (_api: GridApi) => {
      return {
        dueDate: {
          mode: "relative",
          type: "inRange",
          expressionFrom: "Today",
          expressionTo: "Today+7d",
        },
        status: {
          values: ["Todo", "In Progress", "In Review", "Testing"],
        },
      };
    },
  },
  {
    id: "recentlyCompleted",
    label: "Recently Completed",
    icon: "✅",
    description: "Completed in the last 7 days",
    buildFilterModel: (_api: GridApi) => {
      return {
        status: {
          values: ["Done"],
        },
        completedDate: {
          mode: "relative",
          type: "inRange",
          expressionFrom: "Today-7d",
          expressionTo: "Today",
        },
      };
    },
  },
  {
    id: "blockedTasks",
    label: "Blocked Tasks",
    icon: "🛑",
    description: "Tasks that are currently blocked",
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

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${apiUrl}/stats`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ filterModel, searchText }),
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
  }, [apiUrl, filterModel, searchText]);

  // Show stats with loading indicator
  const displayStats = loading
    ? {
        taskCount: "—",
        totalBudget: "—",
        avgProgress: "—",
        budgetRemaining: "—",
      }
    : stats || {
        taskCount: 0,
        totalBudget: 0,
        avgProgress: 0,
        budgetRemaining: 0,
      };

  return (
    <div className="relative">
      <StatsBar stats={displayStats} />
      {loading && (
        <div className="absolute inset-0 bg-gray-900/20 backdrop-blur-[1px] flex items-center justify-center">
          <div className="text-xs text-gray-400 flex items-center gap-2">
            <svg
              className="animate-spin h-3 w-3"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <span>Updating...</span>
          </div>
        </div>
      )}
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

      // Set the datasource
      params.api.setGridOption("serverSideDatasource", datasource);
    },
    [apiUrl, fetchAggregations],
  );

  const onFilterChanged = useCallback((event: FilterChangedEvent) => {
    setFilterModel(event.api.getFilterModel());
    // For server-side row model, we need to refresh the data when filters change
    event.api.refreshServerSide({ purge: true });
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
        {/* Quick Filters */}
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
            <QuickFilterDropdown
              key="server-preset-filter"
              api={gridApi}
              columnId="_multi"
              options={presetFilters}
              placeholder="Preset filters"
              showDescriptions={false}
              className="min-w-[160px]"
              usePortal="always"
            />
            <SavedViewsManager
              api={gridApi}
              storageKey="demo-saved-views-server"
            >
              <SavedViewsManager.Trigger className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-gray-300 hover:bg-gray-700 transition-colors flex items-center gap-2" />

              <SavedViewsManager.Panel className="w-80 bg-gray-900 border border-gray-700 rounded-lg shadow-xl">
                <div className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <SavedViewsManager.Title className="text-lg font-semibold text-white" />
                    <SavedViewsManager.CloseButton className="text-gray-400 hover:text-white transition-colors" />
                  </div>

                  <SavedViewsManager.Actions className="flex gap-2 mb-4">
                    <button
                      data-action="save"
                      className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors text-sm"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V2"
                        />
                      </svg>
                      Save Current
                    </button>
                    <button
                      data-action="export"
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-700 text-gray-300 rounded-md hover:bg-gray-600 aria-disabled:bg-gray-800 aria-disabled:text-gray-600 aria-disabled:cursor-not-allowed transition-colors text-sm"
                      title="Export all saved views"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      Export
                    </button>
                    <button
                      data-action="import"
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-700 text-gray-300 rounded-md hover:bg-gray-600 transition-colors text-sm"
                      title="Import saved views"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                      Import
                    </button>
                  </SavedViewsManager.Actions>

                  <SavedViewsManager.List className="max-h-96 overflow-y-auto" />
                </div>
              </SavedViewsManager.Panel>

              <SavedViewsManager.Dialog className="save-view-dialog-styles" />
            </SavedViewsManager>
          </>
        )}
      </DemoToolbar>

      {/* Active Filters */}
      {gridApi && Object.keys(filterModel).length > 0 && (
        <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-800 rounded-lg mt-3">
          <div className="border-t border-gray-700/50 bg-gray-800/20 p-3">
            <ActiveFilters api={gridApi} filterModel={filterModel} />
          </div>
        </div>
      )}

      {/* Results Count and Loading Status */}
      <div className="text-sm text-gray-400 flex items-center justify-between mt-3">
        <div className="flex items-center">
          {loading && <span className="mr-2">🔍 Loading...</span>}
          {rowCount !== null && !loading && (
            <span>{rowCount.toLocaleString()} results</span>
          )}
        </div>
      </div>

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
