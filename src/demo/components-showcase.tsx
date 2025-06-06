import React, { useCallback, useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import type { ColDef, GridApi, GridOptions } from "ag-grid-community";
import { 
  RelativeDateFilter, 
  RelativeDateFloatingFilter,
  QuickFilterDropdown,
  DATE_FILTER_PRESETS,
  setupFilterStatePersistence,
  serializeFilterModel
} from "../index";
import { generateData } from "./data/generator";
import "./styles/demo.css";

// Import AG Grid styles
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

interface ShowcaseSection {
  id: string;
  title: string;
  description: string;
  component: React.ReactNode;
}

export const ComponentsShowcase: React.FC = () => {
  const [gridApi, setGridApi] = useState<GridApi | null>(null);
  const [rowData] = useState(() => generateData(1000));
  const [activeSection, setActiveSection] = useState("date-filter");

  // Column definitions with our custom filter
  const columnDefs: ColDef[] = useMemo(
    () => [
      {
        field: "id",
        headerName: "ID",
        width: 80,
        filter: "agNumberColumnFilter",
      },
      {
        field: "name",
        headerName: "Name",
        flex: 1,
        filter: "agTextColumnFilter",
      },
      {
        field: "date",
        headerName: "Date",
        flex: 1,
        filter: RelativeDateFilter,
        floatingFilter: true,
        floatingFilterComponent: RelativeDateFloatingFilter,
        filterParams: {
          buttons: ["reset", "apply"],
          closeOnApply: true,
        },
        valueFormatter: (params) => {
          if (!params.value) return "";
          return new Date(params.value).toLocaleDateString();
        },
      },
      {
        field: "amount",
        headerName: "Amount",
        flex: 1,
        filter: "agNumberColumnFilter",
        valueFormatter: (params) => {
          if (params.value == null) return "";
          return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(params.value);
        },
      },
      {
        field: "status",
        headerName: "Status",
        width: 120,
        filter: "agSetColumnFilter",
      },
    ],
    []
  );

  const defaultColDef: ColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      resizable: true,
      floatingFilter: false,
    }),
    []
  );

  const onGridReady = useCallback((params: any) => {
    setGridApi(params.api);
    
    // Set up URL persistence
    const cleanup = setupFilterStatePersistence(params.api, {
      onFilterLoad: (model) => {
        console.log("Filters loaded from URL:", model);
      },
      onFilterSave: (model) => {
        console.log("Filters saved to URL:", model);
      },
    });

    // Cleanup on unmount
    return cleanup;
  }, []);

  // Showcase sections
  const sections: ShowcaseSection[] = useMemo(() => [
    {
      id: "date-filter",
      title: "Relative Date Filter",
      description: "A powerful date filter supporting both absolute dates and relative expressions like 'Today+7d'",
      component: (
        <div className="showcase-section">
          <div className="section-content">
            <h3>Features:</h3>
            <ul>
              <li>Switch between absolute date picker and relative expressions</li>
              <li>Support for complex expressions: Today+7d, StartOfMonth-1M</li>
              <li>Real-time validation with resolved date preview</li>
              <li>All standard filter operations: equals, not equals, before, after, in range</li>
            </ul>
            <div className="example-expressions">
              <h4>Try these expressions:</h4>
              <code>Today</code>
              <code>Today+7d</code>
              <code>StartOfMonth</code>
              <code>EndOfYear-1M</code>
              <code>Now+3h</code>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "quick-filter",
      title: "Quick Filter Dropdown",
      description: "Apply predefined filters with a single click using a customizable dropdown",
      component: (
        <div className="showcase-section">
          <div className="toolbar">
            <QuickFilterDropdown
              api={gridApi!}
              columnId="date"
              options={DATE_FILTER_PRESETS}
              placeholder="Select time period"
              showDescriptions={true}
              className="showcase-dropdown"
              onFilterChange={(option) => {
                console.log("Quick filter applied:", option);
              }}
            />
            
            <QuickFilterDropdown
              api={gridApi!}
              columnId="date"
              options={[
                { id: "all", label: "All Items", filterModel: null, icon: "🌍" },
                { id: "recent", label: "Recent (7d)", filterModel: {
                  mode: "relative",
                  type: "inRange",
                  expressionFrom: "Today-7d",
                  expressionTo: "Today"
                }, icon: "📅" },
                { id: "future", label: "Future", filterModel: {
                  mode: "relative",
                  type: "after",
                  expressionFrom: "Today"
                }, icon: "🔮" },
              ]}
              placeholder="Custom filters"
              showDescriptions={false}
              className="showcase-dropdown"
            />
          </div>
          <div className="section-content">
            <h3>Features:</h3>
            <ul>
              <li>Predefined filter options with icons and descriptions</li>
              <li>Keyboard navigation support</li>
              <li>Search functionality for large option lists</li>
              <li>Customizable trigger content</li>
              <li>Works with any AG Grid column</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      id: "url-state",
      title: "URL State Persistence",
      description: "Automatically sync filter state with the URL for shareable links and browser history support",
      component: (
        <div className="showcase-section">
          <div className="section-content">
            <h3>Current Filter State:</h3>
            <pre className="state-display">
              {gridApi ? JSON.stringify(serializeFilterModel(gridApi.getFilterModel()), null, 2) : "No filters applied"}
            </pre>
            <h3>Features:</h3>
            <ul>
              <li>Automatic URL synchronization</li>
              <li>Browser back/forward button support</li>
              <li>Shareable filter links</li>
              <li>Proper Date object serialization</li>
              <li>Customizable parameter name</li>
            </ul>
            <p className="hint">Try applying filters and watch the URL update!</p>
          </div>
        </div>
      ),
    },
  ], [gridApi]);

  const gridOptions: GridOptions = {
    animateRows: true,
    pagination: true,
    paginationPageSize: 20,
    suppressMenuHide: true,
    enableRangeSelection: true,
    sideBar: {
      toolPanels: [
        {
          id: "filters",
          labelDefault: "Filters",
          labelKey: "filters",
          iconKey: "filter",
          toolPanel: "agFiltersToolPanel",
        },
      ],
      defaultToolPanel: "filters",
    },
  };

  return (
    <div className="components-showcase">
      <header className="showcase-header">
        <h1>AG Grid React Components</h1>
        <p>A collection of powerful, reusable components for AG Grid</p>
      </header>

      <nav className="showcase-nav">
        {sections.map((section) => (
          <button
            key={section.id}
            className={`nav-button ${activeSection === section.id ? "active" : ""}`}
            onClick={() => setActiveSection(section.id)}
          >
            {section.title}
          </button>
        ))}
      </nav>

      <div className="showcase-content">
        <div className="showcase-info">
          {sections.find(s => s.id === activeSection)?.component}
        </div>

        <div className="grid-container">
          <h2>Live Demo Grid</h2>
          <p className="grid-hint">
            {activeSection === "date-filter" && "Click on the Date column filter to try the relative date filter"}
            {activeSection === "quick-filter" && "Use the dropdowns above to quickly filter the date column"}
            {activeSection === "url-state" && "Apply any filters and check your browser's URL"}
          </p>
          <div className="ag-theme-quartz" style={{ height: 500, width: "100%" }}>
            <AgGridReact
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              rowData={rowData}
              gridOptions={gridOptions}
              onGridReady={onGridReady}
            />
          </div>
        </div>
      </div>

      <footer className="showcase-footer">
        <p>
          View source on{" "}
          <a href="https://github.com/your-username/ag-grid-react-components" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </p>
      </footer>
    </div>
  );
};