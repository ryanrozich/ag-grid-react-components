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

// Import the production QuickFilterDropdown component
import {
  QuickFilterDropdown,
  DATE_FILTER_PRESETS,
} from "../components/QuickFilterDropdown";
import type { QuickFilterOption } from "../components/QuickFilterDropdown";

// Import demo styles
import "./styles/demo.css";
import "./styles/buttons.module.css";

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
          {gridApi && (
            <QuickFilterDropdown
              api={gridApi}
              columnId="date"
              options={DATE_FILTER_PRESETS}
              placeholder="Select date filter"
              onFilterChange={handleFilterChange}
              showDescriptions={true}
              ariaLabel="Quick date filter options"
            />
          )}
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
              agDateColumnFilter: DateFilter,
            }}
            // Style the group footer rows
            groupRowRendererParams={{
              footerValueGetter: (params) => {
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
