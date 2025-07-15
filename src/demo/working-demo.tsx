import React, {
  useState,
  useCallback,
  useMemo,
  useRef,
  useEffect,
} from "react";
import { AgGridReact } from "ag-grid-react";
import {
  GridReadyEvent,
  GridApi,
  themeQuartz,
  colorSchemeLightWarm,
} from "ag-grid-community";
import { AllEnterpriseModule, ModuleRegistry } from "ag-grid-enterprise";

// Register AG Grid Enterprise modules
ModuleRegistry.registerModules([AllEnterpriseModule]);

// Create custom theme
const myWarmTheme = themeQuartz.withPart(colorSchemeLightWarm);

// Import AG Grid CSS
import "ag-grid-community/styles/ag-theme-quartz.css";

// Import our components and utilities
import DateFilter from "../components/DateFilter";
import {
  setupFilterStatePersistence,
  loadFilterStateFromUrl,
} from "../utils/filterStateUtils";

// Import demo modules
import { RowData } from "./data/types";
import { generateData } from "./data/generator";
import { createColumnDefs } from "./config/columnDefs";
import {
  createDefaultColDef,
  createAutoGroupColumnDef,
  createSideBar,
} from "./config/gridConfig";
import { DocumentationPanel } from "./components/DocumentationPanel";
import { components } from "./config/sharedGridConfig";

// Import the production QuickFilterDropdown component
import {
  QuickFilterDropdown,
  DATE_FILTER_PRESETS,
} from "../components/QuickFilterDropdown";
import type { QuickFilterOption } from "../components/QuickFilterDropdown";

// Import SavedViewsManager
import SavedViewsManager from "../components/SavedViewsManager";

// Import demo styles
import "./styles/demo.css";
import "./styles/buttons.module.css";
import "./styles/SavedViewsManager.css";

// Add some basic styles for the demo
const savedViewsButtonStyles = {
  padding: "0.5rem 1rem",
  backgroundColor: "rgb(31 41 55)",
  border: "1px solid rgb(55 65 81)",
  borderRadius: "0.375rem",
  color: "rgb(209 213 219)",
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  cursor: "pointer",
  transition: "all 0.15s",
};

const savedViewsPanelStyles = {
  width: "320px",
  backgroundColor: "rgb(17 24 39)",
  border: "1px solid rgb(55 65 81)",
  borderRadius: "0.5rem",
  boxShadow:
    "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 10px 10px -5px rgb(0 0 0 / 0.04)",
};

// Status Display Component
const StatusDisplay: React.FC<{ status: string }> = ({ status }) => (
  <div className="status-display">
    <span className="status-icon">📊</span>
    <span className="status-text">{status}</span>
  </div>
);

// Main application component
const App: React.FC = () => {
  const [rowData, setRowData] = useState<RowData[]>([]);
  const gridRef = useRef<AgGridReact | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("No filter applied");
  const [gridApi, setGridApi] = useState<GridApi | null>(null);
  const cleanupRef = useRef<(() => void) | null>(null);

  // Column definitions
  const columnDefs = useMemo(() => createColumnDefs(), []);
  const defaultColDef = useMemo(() => createDefaultColDef(), []);
  const autoGroupColumnDef = useMemo(() => createAutoGroupColumnDef(), []);
  const sideBar = useMemo(() => createSideBar(), []);

  // Generate initial data
  const initialData = useMemo(() => generateData(1000), []);

  // Handle filter changes from dropdown
  const handleFilterChange = useCallback((option: QuickFilterOption | null) => {
    if (!option) {
      setFilterStatus("No filter applied");
    } else {
      setFilterStatus(option.description || option.label);
    }
  }, []);

  // Grid ready event handler
  const onGridReady = useCallback(
    (params: GridReadyEvent) => {
      setRowData(initialData);
      setGridApi(params.api);

      // Set up filter state persistence
      cleanupRef.current = setupFilterStatePersistence(params.api);

      // Load initial filter state from URL
      const filterModel = loadFilterStateFromUrl();
      if (filterModel && Object.keys(filterModel).length > 0) {
        params.api.setFilterModel(filterModel);
        setFilterStatus("Loaded from URL");
      }

      // Listen for filter changes
      params.api.addEventListener("filterChanged", () => {
        const model = params.api.getFilterModel();
        const hasFilters = model && Object.keys(model).length > 0;
        setFilterStatus(hasFilters ? "Filter active" : "No filter applied");
      });
    },
    [initialData],
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (cleanupRef.current) {
        cleanupRef.current();
      }
    };
  }, []);

  return (
    <div className="demo-container">
      <div className="demo-content">
        <header className="demo-header">
          <h1 className="demo-title">
            AG Grid Date Filter Package Demo{" "}
            <span style={{ fontSize: "1.5rem", color: "#6b7280" }}>(e)</span>
          </h1>
          <p className="demo-subtitle">
            Demonstrating custom date filters with both specific date selection
            and relative date expressions
          </p>
        </header>

        <div className="demo-controls">
          <div className="controls-header">
            <h2 className="controls-title">Quick Date Filters</h2>
            <StatusDisplay status={filterStatus} />
          </div>
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            {gridApi && (
              <>
                <QuickFilterDropdown
                  api={gridApi}
                  columnId="date"
                  options={DATE_FILTER_PRESETS}
                  placeholder="Select date filter"
                  onFilterChange={handleFilterChange}
                  showDescriptions={true}
                  ariaLabel="Quick date filter options"
                />
                <SavedViewsManager
                  api={gridApi}
                  storageKey="demo-saved-views-client"
                >
                  <SavedViewsManager.Trigger style={savedViewsButtonStyles} />

                  <SavedViewsManager.Panel style={savedViewsPanelStyles}>
                    <div style={{ padding: "16px" }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          marginBottom: "16px",
                        }}
                      >
                        <SavedViewsManager.Title
                          style={{
                            fontSize: "18px",
                            fontWeight: "600",
                            color: "white",
                            margin: 0,
                          }}
                        />
                        <SavedViewsManager.CloseButton
                          style={{
                            background: "none",
                            border: "none",
                            color: "rgb(156 163 175)",
                            cursor: "pointer",
                          }}
                        />
                      </div>

                      <SavedViewsManager.Actions
                        style={{
                          display: "flex",
                          gap: "8px",
                          marginBottom: "16px",
                        }}
                      >
                        <button
                          data-action="save"
                          style={{
                            flex: 1,
                            padding: "6px 12px",
                            backgroundColor: "rgb(79 70 229)",
                            color: "white",
                            border: "none",
                            borderRadius: "6px",
                            cursor: "pointer",
                            fontSize: "14px",
                          }}
                        >
                          Save Current
                        </button>
                        <button
                          data-action="export"
                          style={{
                            padding: "6px 12px",
                            backgroundColor: "rgb(55 65 81)",
                            color: "rgb(209 213 219)",
                            border: "none",
                            borderRadius: "6px",
                            cursor: "pointer",
                            fontSize: "14px",
                          }}
                          title="Export all views"
                        >
                          Export
                        </button>
                        <button
                          data-action="import"
                          style={{
                            padding: "6px 12px",
                            backgroundColor: "rgb(55 65 81)",
                            color: "rgb(209 213 219)",
                            border: "none",
                            borderRadius: "6px",
                            cursor: "pointer",
                            fontSize: "14px",
                          }}
                          title="Import views"
                        >
                          Import
                        </button>
                      </SavedViewsManager.Actions>

                      <SavedViewsManager.List
                        style={{ maxHeight: "384px", overflowY: "auto" }}
                      />
                    </div>
                  </SavedViewsManager.Panel>

                  <SavedViewsManager.Dialog />
                </SavedViewsManager>
              </>
            )}
          </div>
        </div>

        <div className="grid-container ag-theme-quartz">
          <AgGridReact
            ref={gridRef}
            theme={myWarmTheme}
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            autoGroupColumnDef={autoGroupColumnDef}
            animateRows={true}
            onGridReady={onGridReady}
            pagination={true}
            paginationPageSize={20}
            paginationPageSizeSelector={[10, 20, 50, 100]}
            groupDisplayType="groupRows"
            sideBar={sideBar}
            suppressMenuHide={true}
            components={{
              ...components,
              agDateColumnFilter: DateFilter,
            }}
            // Style the group footer rows
            groupRowRendererParams={{
              footerValueGetter: (params: any) => {
                const isRootLevel = params.node.level === -1;
                if (isRootLevel) {
                  return "Grand Total";
                }
                return `Total (${params.value})`;
              },
              suppressCount: true,
            }}
            // Show totals even when no grouping is active
            alwaysShowVerticalScroll={true}
          />
        </div>

        <DocumentationPanel />
      </div>
    </div>
  );
};

export default App;
