import React, {
  useState,
  useCallback,
  useMemo,
  useRef,
  useEffect,
} from "react";
import { AgGridReact } from "ag-grid-react";
import { 
  ColDef,
  GridReadyEvent,
  SideBarDef,
  themeQuartz,
  colorSchemeLightWarm
} from "ag-grid-community";
import { AllEnterpriseModule, ModuleRegistry } from "ag-grid-enterprise";

// Register AG Grid Enterprise modules (includes all Community modules)
ModuleRegistry.registerModules([AllEnterpriseModule]);

// Create custom theme with warm color scheme
const myWarmTheme = themeQuartz.withPart(colorSchemeLightWarm);

import { addDays, format, subDays } from "date-fns";

// Import AG Grid CSS - using the modern Quartz theme
// No need to import ag-grid.css when using the theming API
import "ag-grid-community/styles/ag-theme-quartz.css";

// Add custom styles for alternating rows
const customStyles = `
  .ag-theme-quartz .ag-row-even {
    background-color: rgba(0, 0, 0, 0.03);
  }
  .ag-theme-quartz .ag-row-odd {
    background-color: white;
  }
  .ag-theme-quartz .ag-row-hover {
    background-color: rgba(0, 0, 0, 0.05) !important;
  }
`;

// Import our filter components
import RelativeDateFilter from "../components/RelativeDateFilter";
import RelativeDateFloatingFilter from "../components/RelativeDateFloatingFilter";

// Import filter state utilities
import {
  setupFilterStatePersistence,
  loadFilterStateFromUrl,
} from "../utils/filterStateUtils";

// We'll use inline Tailwind classes for now

// Generate more interesting sample data
const generateData = (count: number) => {
  const today = new Date();
  const data = [];

  const categories = ["Task", "Meeting", "Event", "Reminder", "Deadline"];
  const priorities = ["Low", "Medium", "High", "Urgent"];
  const statuses = [
    "Pending",
    "In Progress",
    "Completed",
    "Cancelled",
    "Delayed",
  ];

  for (let i = 0; i < count; i++) {
    // Generate a date between 30 days ago and 30 days in the future
    const date = addDays(today, -30 + Math.floor(Math.random() * 61));

    // Create a due date that's after the start date (between 1-14 days later)
    const dueDate = addDays(date, 1 + Math.floor(Math.random() * 14));

    // Create a date string for comparison
    const dateString = format(date, "yyyy-MM-dd");

    // Determine if it's upcoming, today, or past
    const isPast = date < subDays(today, 1);
    const isToday = format(date, "yyyy-MM-dd") === format(today, "yyyy-MM-dd");
    const isUpcoming = !isPast && !isToday;

    // Generate other properties
    const category = categories[Math.floor(Math.random() * categories.length)];
    const priority = priorities[Math.floor(Math.random() * priorities.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const value = Math.floor(Math.random() * 1000);

    data.push({
      id: i,
      name: `${category} ${i + 1}`,
      date,
      dateString,
      dueDate,
      dueDateString: format(dueDate, "yyyy-MM-dd"),
      category,
      priority,
      status,
      isPast,
      isToday,
      isUpcoming,
      value,
    });
  }

  return data;
};

// Main application component
const App: React.FC = () => {
  const [rowData, setRowData] = useState<any[]>([]); // required for grid data
  const gridRef = useRef<AgGridReact | null>(null);
  // gridApi is not used directly, so removed
  // Always show the tool panel since we removed the toggle button
  // Always show the tool panel (no toggle needed)
  const [filterStatus, setFilterStatus] = useState<string>("No filter applied");
  const [_lastSortModel, _setLastSortModel] = useState<any[]>([]);
  const cleanupRef = useRef<(() => void) | null>(null);

  // Column definitions with more columns and styling
  // Configured for proper row grouping support
  const columnDefs: ColDef[] = useMemo(
    () => [
      {
        field: "id",
        headerName: "ID",
        width: 70,
        filter: "agNumberColumnFilter",
        cellClass: "font-mono text-xs",
        enableRowGroup: false, // ID not useful for grouping
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
        cellClass: (params) => {
          const category = params.value;
          switch (category) {
            case "Task":
              return "bg-blue-50 text-blue-800";
            case "Meeting":
              return "bg-purple-50 text-purple-800";
            case "Event":
              return "bg-green-50 text-green-800";
            case "Reminder":
              return "bg-yellow-50 text-yellow-800";
            case "Deadline":
              return "bg-red-50 text-red-800";
            default:
              return "";
          }
        },
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
        cellClass: (params) => {
          if (params.data?.isToday) return "bg-green-100 font-bold";
          if (params.data?.isPast) return "bg-gray-100 text-gray-600";
          if (params.data?.isUpcoming) return "bg-blue-50";
          return "";
        },
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
      },
      {
        field: "priority",
        headerName: "Priority",
        width: 120,
        filter: "agSetColumnFilter",
        enableRowGroup: true,
        headerTooltip: "Drag to Row Groups section to group data by Priority",
        cellClass: (params) => {
          const priority = params.value;
          switch (priority) {
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
        },
      },
      {
        field: "status",
        headerName: "Status",
        width: 130,
        filter: "agSetColumnFilter",
        enableRowGroup: true,
        headerTooltip: "Drag to Row Groups section to group data by Status",
        cellClass: (params) => {
          const status = params.value;
          switch (status) {
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
        },
      },
      {
        field: "value",
        headerName: "Value",
        width: 120,
        filter: "agNumberColumnFilter",
        valueFormatter: (params) => {
          // Format the value as currency
          if (params.value === undefined || params.value === null) return "";
          return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
          }).format(params.value);
        },
        // Apply different styles for normal cells vs total cells
        cellClass: (params) => {
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
        },
        enableRowGroup: false,
        enableValue: true,
        aggFunc: "sum",
      },
    ],
    [],
  );

  // Default column definitions
  const defaultColDef: ColDef = useMemo(
    () => ({
      sortable: true,
      resizable: true,
      filter: true,
      floatingFilter: true,
      minWidth: 100,
      // Add default row grouping settings
      enableRowGroup: true,
      enableValue: true,
    }),
    [],
  );

  // Configure auto group column to better display total rows
  const autoGroupColumnDef: ColDef = useMemo(
    () => ({
      minWidth: 220,
      sortable: true,
      cellRendererParams: {
        // Custom value formatter for total rows
        totalValueGetter: (params: any) => {
          // Check if this is the grand total (-1 level)
          const isRootLevel = params.node?.level === -1;
          if (isRootLevel) {
            return "Grand Total";
          }

          // For group totals, include the group value
          return `Subtotal: ${params.value ?? ""}`;
        },
      },
    }),
    [],
  );

  // Create side bar definition with tools
  const sideBar: SideBarDef = useMemo(
    () => ({
      toolPanels: [
        {
          id: "filters",
          labelDefault: "Filters",
          labelKey: "filters",
          iconKey: "filter",
          toolPanel: "agFiltersToolPanel",
          toolPanelParams: {
            suppressExpandAll: false,
            suppressFilterSearch: false,
          },
        },
        {
          id: "columns",
          labelDefault: "Columns",
          labelKey: "columns",
          iconKey: "columns",
          toolPanel: "agColumnsToolPanel",
        },
      ],
      defaultToolPanel: "filters",
      position: "right",
    }),
    [],
  );

  // Create theme with DarkBlue color scheme

  // Generate data initially and use for filtering
  const initialData = useMemo(() => generateData(100), []);

  // Apply filters to the fixed dataset using AG Grid's filter model
  const applyFilters = useCallback(
    (filter?: string) => {
      // First, set all rows regardless of filter (we'll use AG Grid's filtering)
      setRowData(initialData);

      // Wait for data to be set, then apply filter model
      setTimeout(() => {
        if (!gridRef.current || !gridRef.current.api) return;

        if (filter === "today") {
          // Create date filter model for "today" using our custom filter format
          const filterModel = {
            date: {
              type: "equals",
              mode: "relative", // Use relative mode with our expression
              expressionFrom: "Today",
            },
          };
          gridRef.current.api.setFilterModel(filterModel);
        } else if (filter === "upcoming") {
          // Create date filter model for dates after today
          const filterModel = {
            date: {
              type: "after",
              mode: "relative",
              expressionFrom: "Today",
              fromInclusive: false, // Exclude today
            },
          };
          gridRef.current.api.setFilterModel(filterModel);
        } else if (filter === "past") {
          // Create date filter model for dates before today
          const filterModel = {
            date: {
              type: "before",
              mode: "relative",
              expressionFrom: "Today",
              toInclusive: false, // Exclude today
            },
          };
          gridRef.current.api.setFilterModel(filterModel);
        } else {
          // 'all' or undefined - clear all filters
          if (
            typeof (gridRef.current.api as any).setFilterModel === "function"
          ) {
            (gridRef.current.api as any).setFilterModel(null);
          }
        }
      }, 0);
    },
    [initialData],
  );

  // Handle grid ready event
  const onGridReady = useCallback(
    (params: GridReadyEvent) => {
      console.log("Grid ready");

      // Store API reference
      // gridApi is not used elsewhere, so do not set

      // Load initial data
      setRowData(initialData);

      // Size columns to fit
      setTimeout(() => {
        // In AG Grid v33, columnApi was merged into the main api
        const columnDefs = params.api?.getColumnDefs();
        if (columnDefs && columnDefs.length > 0) {
          params.api?.sizeColumnsToFit();
        }
      }, 100);

      // Setup filter changed listener to update status for manual filter changes
      params.api.addEventListener("filterChanged", () => {
        try {
          const filterModel = params.api.getFilterModel();
          const filterKeys = Object.keys(filterModel);

          if (filterKeys.length === 0) {
            setFilterStatus("No filter applied");
          } else {
            // Create a descriptive status based on the active filters
            const filterDescriptions = filterKeys
              .map((key) => {
                const filter = filterModel[key];

                // Handle our custom date filter
                if (filter.type && filter.mode) {
                  let description = `${key}: `;
                  
                  // Add the filter type
                  switch (filter.type) {
                    case "equals":
                      description += "=";
                      break;
                    case "notEqual":
                      description += "≠";
                      break;
                    case "before":
                      description += "<";
                      break;
                    case "after":
                      description += ">";
                      break;
                    case "inRange":
                      description += "between";
                      break;
                    default:
                      description += filter.type;
                  }
                  
                  // Add the value(s)
                  if (filter.mode === "relative") {
                    if (filter.type === "inRange" && filter.expressionFrom && filter.expressionTo) {
                      description += ` ${filter.expressionFrom} and ${filter.expressionTo}`;
                    } else if (filter.expressionFrom) {
                      description += ` ${filter.expressionFrom}`;
                    }
                  } else if (filter.mode === "absolute") {
                    if (filter.type === "inRange" && filter.dateFrom && filter.dateTo) {
                      description += ` ${format(filter.dateFrom, "MMM d")} and ${format(filter.dateTo, "MMM d")}`;
                    } else if (filter.dateFrom) {
                      description += ` ${format(filter.dateFrom, "MMM d, yyyy")}`;
                    }
                  }
                  
                  return description;
                }

                // Handle other filter types (text, number, etc.)
                if (filter.filter) {
                  return `${key}: "${filter.filter}"`;
                }
                
                return key;
              })
              .join(" | ");

            setFilterStatus(`Filters: ${filterDescriptions}`);
          }
        } catch (err) {
          console.warn("Error updating filter status:", err);
        }
      });

      // Open filters tool panel by default
      setTimeout(() => {
        params.api.openToolPanel("filters");
      }, 200);

      // Check for filter parameters in URL
      const filterModel = loadFilterStateFromUrl();
      if (filterModel) {
        // Apply the filter to the grid
        if (typeof (params.api as any).setFilterModel === "function") {
          (params.api as any).setFilterModel(filterModel);
        }
        // Don't set a special status - let the filterChanged listener handle it
      }

      // Setup filter persistence and browser history
      const cleanup = setupFilterStatePersistence(params.api, {
        onFilterLoad: (_model: any) => {
          // Filter status will be updated by the filterChanged listener
        },
        onFilterSave: (model: any) => {
          // Just save the sort model when filters change
          try {
            if (
              gridRef.current &&
              gridRef.current.api &&
              typeof (gridRef.current.api as any).getSortModel === "function"
            ) {
              _setLastSortModel(
                (gridRef.current.api as any).getSortModel?.() ?? [],
              );
            }
          } catch (err) {
            console.warn("Error getting sort model during filter save:", err);
          }
        },
      });

      // Store cleanup function
      cleanupRef.current = cleanup;
    },
    [filterStatus, initialData],
  );

  // Clean up filter persistence on unmount
  useEffect(() => {
    // Apply the dark-blue theme mode to the document body
    document.body.setAttribute("data-ag-theme-mode", "dark-blue");

    return () => {
      if (cleanupRef.current) {
        cleanupRef.current();
      }
      // Clean up the theme attribute when component unmounts
      document.body.removeAttribute("data-ag-theme-mode");
    };
  }, []);

  return (
    <>
      <style>{customStyles}</style>
      <div
        style={{
          backgroundColor: "#f8fafc",
          minHeight: "100vh",
          backgroundImage: "linear-gradient(to bottom, #ffffff, #f8fafc)",
          paddingBottom: "3rem",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "2rem",
          }}
        >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1.5rem",
          }}
        >
          <h1
            style={{
              fontSize: "1.875rem",
              fontWeight: "bold",
              color: "#111827",
            }}
          >
            AG Grid with Custom Date Filter
          </h1>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
              alignItems: "flex-end",
            }}
          >
            {/* Status display with improved styling */}
            <div
              style={{
                fontSize: "0.875rem",
                color: "#4b5563",
                backgroundColor: "#ffffff",
                padding: "0.5rem 1rem",
                borderRadius: "0.375rem",
                border: "1px solid #e5e7eb",
                marginBottom: "0.25rem",
                minWidth: "280px",
                textAlign: "center",
                boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
              }}
            >
              <span style={{ fontWeight: "bold", marginRight: "0.5rem" }}>
                Status:
              </span>
              <span
                style={{
                  color: filterStatus.includes("No filter")
                    ? "#6b7280"
                    : "#1f2937",
                  fontWeight: filterStatus.includes("No filter")
                    ? "normal"
                    : "medium",
                }}
              >
                {filterStatus}
              </span>
            </div>
            {/* Filter button row with improved styling - removed unnecessary buttons */}
            <div
              style={{
                display: "flex",
                gap: "0.75rem",
                flexWrap: "wrap",
                justifyContent: "flex-end",
              }}
            >
              <button
                onClick={() => applyFilters("all")}
                style={{
                  padding: "0.6rem 1.2rem",
                  backgroundColor: "#104ada",
                  color: "white",
                  borderRadius: "0.5rem",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: "600",
                  boxShadow:
                    "0 1px 3px rgba(0, 0, 0, 0.2), 0 1px 2px rgba(0, 0, 0, 0.1)",
                  display: "flex",
                  alignItems: "center",
                  transition: "all 0.15s ease",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = "#0e3bbb";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = "#104ada";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <span style={{ marginRight: "0.25rem" }}>🔄</span> All Items
              </button>
              <button
                onClick={() => applyFilters("today")}
                style={{
                  padding: "0.6rem 1.2rem",
                  backgroundColor: "#1457e2",
                  color: "white",
                  borderRadius: "0.5rem",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: "600",
                  boxShadow:
                    "0 1px 3px rgba(0, 0, 0, 0.2), 0 1px 2px rgba(0, 0, 0, 0.1)",
                  display: "flex",
                  alignItems: "center",
                  transition: "all 0.15s ease",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = "#124ac9";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = "#1457e2";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <span style={{ marginRight: "0.25rem" }}>📅</span> Today's Items
              </button>
              <button
                onClick={() => applyFilters("upcoming")}
                style={{
                  padding: "0.6rem 1.2rem",
                  backgroundColor: "#1967F2",
                  color: "white",
                  borderRadius: "0.5rem",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: "600",
                  boxShadow:
                    "0 1px 3px rgba(0, 0, 0, 0.2), 0 1px 2px rgba(0, 0, 0, 0.1)",
                  display: "flex",
                  alignItems: "center",
                  transition: "all 0.15s ease",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = "#1655d4";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = "#1967F2";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <span style={{ marginRight: "0.25rem" }}>⏩</span> Upcoming
                Items
              </button>
              <button
                onClick={() => applyFilters("past")}
                style={{
                  padding: "0.6rem 1.2rem",
                  backgroundColor: "#0d3dc6",
                  color: "white",
                  borderRadius: "0.5rem",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: "600",
                  boxShadow:
                    "0 1px 3px rgba(0, 0, 0, 0.2), 0 1px 2px rgba(0, 0, 0, 0.1)",
                  display: "flex",
                  alignItems: "center",
                  transition: "all 0.15s ease",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = "#0b33a7";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = "#0d3dc6";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <span style={{ marginRight: "0.25rem" }}>⏪</span> Past Items
              </button>
            </div>
          </div>
        </div>
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "0.75rem",
            boxShadow:
              "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
            overflow: "hidden",
            border: "1px solid #e5e7eb",
            marginTop: "2rem",
            height: "600px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ height: "100%", padding: "2rem" }}>
            <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            autoGroupColumnDef={autoGroupColumnDef}
            sideBar={sideBar}
            domLayout="normal"
            onGridReady={onGridReady}
            theme={myWarmTheme}
            components={{
              agDateColumnFilter: RelativeDateFilter,
              agDateColumnFloatingFilter: RelativeDateFloatingFilter,
            }}
            pagination={true}
            paginationPageSize={20}
            paginationPageSizeSelector={[10, 20, 50, 100]}
            grandTotalRow="bottom"
            getRowClass={(params) => {
              return params.node.rowIndex % 2 === 0 ? "ag-row-even" : "ag-row-odd";
            }}
          />
          </div>
        </div>
        <div
          style={{
            marginTop: "2rem",
            backgroundColor: "#f1f5f9",
            borderRadius: "0.5rem",
            padding: "2rem",
          }}
        >
          <h2
            style={{
              fontSize: "1.25rem",
              fontWeight: "bold",
              color: "#1e293b",
              marginBottom: "0.75rem",
            }}
          >
            AG Grid Custom Date Filter Components
          </h2>
          <div style={{ marginBottom: "1.5rem" }}>
            <h3
              style={{
                fontSize: "1.125rem",
                fontWeight: "600",
                color: "#1f2937",
                marginBottom: "0.5rem",
              }}
            >
              📦 Components Provided
            </h3>
            <p style={{ color: "#4b5563", marginBottom: "0.75rem" }}>
              This package provides two essential date filtering components for AG Grid:
            </p>
            <ul
              style={{
                listStyleType: "none",
                paddingLeft: "0",
                color: "#374151",
              }}
            >
              <li style={{ marginBottom: "0.5rem" }}>
                <strong>🔍 RelativeDateFilter</strong> - A powerful date filter that supports both absolute date selection via date picker and relative date expressions (e.g., "Today+7d"). Accessible through the column menu filter icon.
              </li>
              <li>
                <strong>🎯 RelativeDateFloatingFilter</strong> - A companion floating filter that displays the current filter state in the column header and provides quick access to filter modification.
              </li>
            </ul>
          </div>
          <div style={{ marginBottom: "1.5rem" }}>
            <h3
              style={{
                fontSize: "1.125rem",
                fontWeight: "600",
                color: "#1f2937",
                marginBottom: "0.5rem",
              }}
            >
              🏢 Enterprise Features Demonstrated
            </h3>
            <p style={{ color: "#4b5563", marginBottom: "0.75rem" }}>
              This demo showcases several AG Grid Enterprise features (marked with (e)):
            </p>
            <ul
              style={{
                listStyleType: "disc",
                paddingLeft: "1.5rem",
                color: "#374151",
              }}
            >
              <li>
                <strong>Row Grouping & Aggregation</strong> - Drag columns to the "Row Groups" section in the sidebar to group data. See sum and average aggregations for numeric columns.
              </li>
              <li>
                <strong>Grand Total Row</strong> - View aggregated totals for the entire dataset at the bottom of the grid.
              </li>
              <li>
                <strong>Filter Tool Panel</strong> - Access all column filters in one place via the sidebar's filter tab.
              </li>
              <li>
                <strong>Advanced Column Management</strong> - Use the columns tool panel to show/hide columns and manage grouping.
              </li>
            </ul>
          </div>
          <div style={{ marginBottom: "1.5rem" }}>
            <h3
              style={{
                fontSize: "1.125rem",
                fontWeight: "600",
                color: "#1f2937",
                marginBottom: "0.5rem",
              }}
            >
              📅 Using Relative Date Expressions
            </h3>
            <p style={{ color: "#4b5563", marginBottom: "0.5rem" }}>
              Click the filter icon on any date column and select "Relative Date" mode:
            </p>
            <ul
              style={{
                listStyleType: "disc",
                paddingLeft: "1.5rem",
                color: "#374151",
              }}
            >
              <li>
                <code
                  style={{
                    backgroundColor: "#f3f4f6",
                    padding: "0.125rem 0.25rem",
                    borderRadius: "0.25rem",
                    fontSize: "0.875rem",
                  }}
                >
                  Today
                </code>{" "}
                - Current date
              </li>
              <li>
                <code
                  style={{
                    backgroundColor: "#f3f4f6",
                    padding: "0.125rem 0.25rem",
                    borderRadius: "0.25rem",
                    fontSize: "0.875rem",
                  }}
                >
                  Today+7d
                </code>{" "}
                - 7 days from today
              </li>
              <li>
                <code
                  style={{
                    backgroundColor: "#f3f4f6",
                    padding: "0.125rem 0.25rem",
                    borderRadius: "0.25rem",
                    fontSize: "0.875rem",
                  }}
                >
                  Today-3m
                </code>{" "}
                - 3 months ago
              </li>
              <li>
                <code
                  style={{
                    backgroundColor: "#f3f4f6",
                    padding: "0.125rem 0.25rem",
                    borderRadius: "0.25rem",
                    fontSize: "0.875rem",
                  }}
                >
                  Today+1y
                </code>{" "}
                - 1 year from today
              </li>
              <li>
                Supported units: <strong>d</strong> (days), <strong>w</strong> (weeks), <strong>m</strong> (months), <strong>y</strong> (years)
              </li>
            </ul>
          </div>
          <div>
            <h3
              style={{
                fontSize: "1.125rem",
                fontWeight: "600",
                color: "#1f2937",
                marginBottom: "0.5rem",
              }}
            >
              ⚡ Quick Filter Buttons
            </h3>
            <p style={{ color: "#4b5563", marginBottom: "0.5rem" }}>
              Use the buttons above the grid for rapid filtering:
            </p>
            <ul
              style={{
                listStyleType: "disc",
                paddingLeft: "1.5rem",
                color: "#374151",
              }}
            >
              <li>
                <strong>All Items</strong> - Clear all date filters
              </li>
              <li>
                <strong>Today's Items</strong> - Filter to today's date only
              </li>
              <li>
                <strong>Upcoming Items</strong> - Show future dates
              </li>
              <li>
                <strong>Past Items</strong> - Show past dates
              </li>
            </ul>
          </div>
          <div style={{ marginTop: "1.5rem" }}>
            <h3
              style={{
                fontSize: "1.125rem",
                fontWeight: "600",
                color: "#1f2937",
                marginBottom: "0.5rem",
              }}
            >
              📊 Additional Demo Features
            </h3>
            <div
              style={{
                backgroundColor: "#f9fafb",
                padding: "1rem",
                borderRadius: "0.375rem",
                marginBottom: "1rem",
              }}
            >
              <p style={{ color: "#4b5563", marginBottom: "0.5rem" }}>
                <strong>Visual Enhancements:</strong>
              </p>
              <ul
                style={{
                  listStyleType: "disc",
                  paddingLeft: "1.5rem",
                  color: "#374151",
                  fontSize: "0.875rem",
                }}
              >
                <li>Alternating row colors for better readability</li>
                <li>Warm color scheme theme applied to the grid</li>
                <li>Pagination with configurable page sizes (10, 20, 50, 100 rows)</li>
                <li>Fixed height grid (600px) with vertical scrolling</li>
                <li>Grand total row showing sum aggregations at the bottom</li>
              </ul>
            </div>
            <div
              style={{
                backgroundColor: "#e0f2fe",
                padding: "1rem",
                borderRadius: "0.375rem",
                border: "1px solid #7dd3fc",
                marginBottom: "1rem",
              }}
            >
              <p style={{ color: "#075985", fontWeight: "500", marginBottom: "0.25rem" }}>
                💡 Try This:
              </p>
              <p style={{ color: "#0c4a6e", fontSize: "0.875rem" }}>
                1. Click the filter icon on the Date column and switch to "Relative Date" mode<br/>
                2. Enter "Today-7d" to see items from the past week<br/>
                3. Drag the "Category" column to the Row Groups area to group by category<br/>
                4. Check the grand total row at the bottom showing aggregated values<br/>
                5. Use the Filter tool panel tab to see all active filters at once
              </p>
            </div>
            <div
              style={{
                backgroundColor: "#fef3c7",
                padding: "1rem",
                borderRadius: "0.375rem",
                border: "1px solid #fde68a",
              }}
            >
              <p style={{ color: "#92400e", fontSize: "0.875rem" }}>
                <strong>Note on Enterprise Features:</strong> This demo uses AG Grid Enterprise to showcase row grouping, aggregation, filter tool panel, and grand totals. These features are marked with (e) in the AG Grid documentation and require a commercial license for production use.
              </p>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default App;
