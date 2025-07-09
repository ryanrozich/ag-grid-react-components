import React, { useCallback, useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import type {
  ColDef,
  GridApi,
  GridOptions,
  GridReadyEvent,
} from "ag-grid-community";
import { AllEnterpriseModule, ModuleRegistry } from "ag-grid-enterprise";
import {
  RelativeDateFilter,
  QuickFilterDropdown,
  DATE_FILTER_PRESETS,
  setupFilterStatePersistence,
  serializeFilterModel,
} from "../index";
import { generateData } from "./data/generator";
import "./styles/showcase.css";

// Register AG Grid Enterprise modules
ModuleRegistry.registerModules([AllEnterpriseModule]);

// Import AG Grid styles
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

interface ShowcaseSection {
  id: string;
  title: string;
  description: string;
  component: React.ReactNode;
}

export const ComponentsShowcase: React.FC = () => {
  const [gridApi, setGridApi] = useState<GridApi | null>(null);
  const [rowData] = useState(() => generateData(1000));
  const [activeComponent, setActiveComponent] = useState("date-filter");
  const [filterModel, setFilterModel] = useState<Record<string, unknown>>({});

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
        enableRowGroup: true,
      },
      {
        field: "category",
        headerName: "Category",
        width: 120,
        filter: "agSetColumnFilter",
        enableRowGroup: true,
      },
      {
        field: "date",
        headerName: "Date",
        width: 150,
        filter: RelativeDateFilter,
        floatingFilter: true,
        filterParams: {
          buttons: ["reset", "apply"],
          closeOnApply: true,
        },
        valueFormatter: (params) => {
          if (!params.value) return "";
          return new Date(params.value).toLocaleDateString();
        },
        enableValue: true,
        aggFunc: "min",
      },
      {
        field: "value",
        headerName: "Amount",
        width: 120,
        filter: "agNumberColumnFilter",
        valueFormatter: (params) => {
          if (params.value == null) return "";
          return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(params.value);
        },
        enableValue: true,
        aggFunc: "sum",
      },
      {
        field: "status",
        headerName: "Status",
        width: 120,
        filter: "agSetColumnFilter",
        enableRowGroup: true,
      },
    ],
    [],
  );

  const defaultColDef: ColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      resizable: true,
      floatingFilter: false,
    }),
    [],
  );

  const onGridReady = useCallback((params: GridReadyEvent) => {
    setGridApi(params.api);

    // Set up URL persistence
    const cleanup = setupFilterStatePersistence(params.api, {
      onFilterLoad: (model) => {
        console.log("Filters loaded from URL:", model);
        setFilterModel(model || {});
      },
      onFilterSave: (model) => {
        console.log("Filters saved to URL:", model);
        setFilterModel(model || {});
      },
    });

    // Listen for filter changes
    params.api.addEventListener("filterChanged", () => {
      const model = params.api.getFilterModel();
      setFilterModel(model || {});
    });

    // Cleanup on unmount
    return cleanup;
  }, []);

  // Quick filter options for demo
  const customQuickFilters = useMemo(
    () => [
      {
        id: "all",
        label: "All Data",
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
        id: "future",
        label: "Future Dates",
        filterModel: {
          mode: "relative",
          type: "after",
          expressionFrom: "Today",
        },
        icon: "🔮",
        description: "Upcoming records only",
      },
      {
        id: "highValue",
        label: "High Value (>$500)",
        filterModel: null,
        icon: "💰",
        description: "Filter by amount > $500",
        onSelect: (api: GridApi) => {
          // Custom filter logic for non-date filter
          api.setFilterModel({
            value: {
              type: "greaterThan",
              filter: 500,
            },
          });
        },
      },
    ],
    [],
  );

  // Showcase sections
  const sections: ShowcaseSection[] = useMemo(
    () => [
      {
        id: "date-filter",
        title: "Relative Date Filter",
        description:
          "A powerful date filter supporting both absolute dates and relative expressions",
        component: (
          <div className="showcase-section">
            <div className="bg-gradient-to-br from-white via-blue-50/30 to-orange-50/30 rounded-xl p-8 shadow-xl border border-blue-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400 to-blue-600 opacity-10 rounded-full -translate-y-16 translate-x-16"></div>
              <h3 className="text-xl font-semibold text-blue-600 mb-4">
                📚 Component Overview
              </h3>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-orange-600 font-medium mb-3">
                    Available Components
                  </h4>
                  <ul className="space-y-3 text-slate-700 text-sm">
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <div>
                        <code className="bg-blue-50 px-2 py-1 rounded text-xs text-blue-700 font-medium">
                          RelativeDateFilter
                        </code>
                        <span className="text-slate-500 ml-2 text-xs">
                          (AG Grid Enterprise)
                        </span>
                        <p className="text-xs text-slate-600 mt-1">
                          Full-featured filter with date picker and expression
                          support
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-orange-600 font-medium mb-3">
                    Key Features
                  </h4>
                  <ul className="space-y-2 text-slate-700 text-sm">
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span>
                        Toggle between absolute dates and relative expressions
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-400 mr-2">•</span>
                      <span>Real-time validation with date preview</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-400 mr-2">•</span>
                      <span>
                        All standard filter operations (equals, before, after,
                        in range)
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-400 mr-2">•</span>
                      <span>Inclusive/exclusive boundary controls</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 p-4 bg-slate-50 rounded-lg">
                <h4 className="text-orange-600 font-medium mb-3">
                  Example Expressions
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[
                    "Today",
                    "Today+7d",
                    "Today-1w",
                    "StartOfMonth",
                    "EndOfMonth+1d",
                    "StartOfYear",
                    "EndOfYear-1M",
                    "StartOfWeek",
                    "Now+3h",
                  ].map((expr) => (
                    <code
                      key={expr}
                      className="bg-white border border-slate-200 px-3 py-2 rounded text-sm text-blue-700 text-center hover:bg-blue-50 hover:border-blue-300 transition-all cursor-pointer shadow-sm"
                      onClick={() => {
                        // Copy to clipboard
                        navigator.clipboard.writeText(expr);
                      }}
                      title="Click to copy"
                    >
                      {expr}
                    </code>
                  ))}
                </div>
                <p className="text-xs text-slate-600 mt-3 italic">
                  💡 Click any expression to copy • Try them in the Date column
                  filter below
                </p>
              </div>

              <div className="mt-6 p-6 bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg shadow-inner">
                <h4 className="text-white font-bold mb-4 flex items-center">
                  <span className="text-2xl mr-2">🔧</span> Configuration
                  Options
                </h4>
                <pre className="text-xs bg-slate-950 p-4 rounded-lg border border-slate-700 overflow-x-auto shadow-inner">
                  <code className="text-green-400 font-mono">{`{
  field: "date",
  filter: RelativeDateFilter,
  floatingFilter: true,
  filterParams: {
    buttons: ["reset", "apply"],
    closeOnApply: true,
    includeBlanksInEquals: false,
    includeBlanksInLessThan: false,
    includeBlanksInGreaterThan: false,
    includeBlanksInRange: false
  }
}`}</code>
                </pre>
              </div>
            </div>
          </div>
        ),
      },
      {
        id: "quick-filter",
        title: "Quick Filter Dropdown",
        description:
          "Apply predefined filters with a single click using customizable dropdowns",
        component: (
          <div className="showcase-section">
            <div className="toolbar mb-6 flex flex-wrap gap-4">
              {gridApi && (
                <>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm text-slate-400">
                      Date Presets
                    </label>
                    <QuickFilterDropdown
                      api={gridApi}
                      columnId="date"
                      options={DATE_FILTER_PRESETS}
                      placeholder="Select time period"
                      showDescriptions={true}
                      className="min-w-60"
                      onFilterChange={(option) => {
                        console.log("Quick filter applied:", option);
                      }}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm text-slate-400">
                      Custom Filters
                    </label>
                    <QuickFilterDropdown
                      api={gridApi}
                      columnId="date"
                      options={customQuickFilters}
                      placeholder="Quick filters"
                      showDescriptions={false}
                      className="min-w-48"
                    />
                  </div>
                </>
              )}
            </div>

            <div className="bg-slate-900/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700">
              <h3 className="text-xl font-semibold text-blue-400 mb-4">
                Features
              </h3>
              <ul className="space-y-2 text-slate-300">
                <li className="flex items-start">
                  <span className="text-orange-400 mr-2">•</span>
                  <span>
                    Predefined filter options with icons and descriptions
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-400 mr-2">•</span>
                  <span>
                    Keyboard navigation support (↑↓ to navigate, Enter to
                    select)
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-400 mr-2">•</span>
                  <span>Search functionality for large option lists</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-400 mr-2">•</span>
                  <span>Customizable trigger content and styling</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-400 mr-2">•</span>
                  <span>Works with any AG Grid column type</span>
                </li>
              </ul>

              <div className="mt-6 p-4 bg-orange-50 rounded-lg border border-orange-200">
                <h4 className="text-orange-700 font-medium mb-2 flex items-center">
                  <span className="mr-2">⚙️</span> Configuration Options
                </h4>
                <pre className="text-xs bg-white p-3 rounded border border-orange-100 overflow-x-auto">
                  <code className="text-slate-700">{`<QuickFilterDropdown
  api={gridApi}
  columnId="date"
  options={[
    {
      id: "last7days",
      label: "Last 7 Days",
      filterModel: {
        mode: "relative",
        type: "inRange",
        expressionFrom: "Today-7d",
        expressionTo: "Today"
      },
      icon: "📅",
      description: "Past week"
    }
  ]}
  placeholder="Select filter"
  showDescriptions={true}
  className="min-w-60"
  onFilterChange={(option) => console.log(option)}
/>`}</code>
                </pre>
              </div>
            </div>
          </div>
        ),
      },
      {
        id: "url-state",
        title: "URL State Persistence",
        description:
          "Automatically sync filter state with the URL for shareable links",
        component: (
          <div className="showcase-section">
            <div className="bg-slate-900/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700">
              <h3 className="text-xl font-semibold text-blue-400 mb-4">
                Current Filter State
              </h3>
              <pre className="bg-slate-800 p-4 rounded-lg overflow-x-auto text-sm">
                <code className="text-green-400">
                  {JSON.stringify(serializeFilterModel(filterModel), null, 2)}
                </code>
              </pre>

              <div className="mt-6">
                <h3 className="text-xl font-semibold text-blue-400 mb-4">
                  Features
                </h3>
                <ul className="space-y-2 text-slate-300">
                  <li className="flex items-start">
                    <span className="text-orange-400 mr-2">•</span>
                    <span>Automatic URL synchronization as you filter</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-400 mr-2">•</span>
                    <span>Browser back/forward button support</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-400 mr-2">•</span>
                    <span>
                      Shareable filter links - send filtered views to colleagues
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-400 mr-2">•</span>
                    <span>
                      Proper Date object serialization/deserialization
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-400 mr-2">•</span>
                    <span>Customizable URL parameter name</span>
                  </li>
                </ul>
                <p className="mt-4 text-sm text-orange-600 font-medium">
                  ✨ Try applying filters and watch the state update above!
                </p>
              </div>

              <div className="mt-6 p-4 bg-orange-50 rounded-lg border border-orange-200">
                <h4 className="text-orange-700 font-medium mb-2 flex items-center">
                  <span className="mr-2">⚙️</span> Configuration Options
                </h4>
                <pre className="text-xs bg-white p-3 rounded border border-orange-100 overflow-x-auto">
                  <code className="text-slate-700">{`import { setupFilterStatePersistence } from 'ag-grid-react-components';

// In your onGridReady callback:
const cleanup = setupFilterStatePersistence(gridApi, {
  onFilterLoad: (model) => console.log('Loaded:', model),
  onFilterSave: (model) => console.log('Saved:', model),
  parameterName: 'filters' // Optional, defaults to 'filters'
});

// Don't forget to cleanup on unmount
return cleanup;`}</code>
                </pre>
              </div>
            </div>
          </div>
        ),
      },
    ],
    [gridApi, filterModel, customQuickFilters],
  );

  const gridOptions: GridOptions = {
    theme: "legacy",
    animateRows: true,
    pagination: true,
    paginationPageSize: 15,
    paginationPageSizeSelector: [15, 30, 50, 100],
    suppressMenuHide: true,
    cellSelection: true,
    sideBar: {
      toolPanels: [
        {
          id: "columns",
          labelDefault: "Columns",
          labelKey: "columns",
          iconKey: "columns",
          toolPanel: "agColumnsToolPanel",
          minWidth: 225,
          width: 225,
          maxWidth: 350,
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
        },
      ],
      defaultToolPanel: "columns",
      position: "right",
    },
    rowGroupPanelShow: "always",
    groupDefaultExpanded: 1,
    statusBar: {
      statusPanels: [
        { statusPanel: "agTotalAndFilteredRowCountComponent", align: "left" },
        { statusPanel: "agTotalRowCountComponent", align: "center" },
        { statusPanel: "agFilteredRowCountComponent", align: "center" },
        { statusPanel: "agSelectedRowCountComponent", align: "center" },
        { statusPanel: "agAggregationComponent", align: "right" },
      ],
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      {/* Background decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-orange-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative z-10">
        <header className="bg-white/70 backdrop-blur-md border-b border-blue-100 shadow-sm">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-blue-500 to-orange-500 bg-clip-text text-transparent">
                  AG Grid React Components
                </h1>
                <p className="text-slate-700 mt-2 text-lg">
                  Powerful, enterprise-ready components for AG Grid
                </p>
              </div>
              <a
                href="https://github.com/ryanrozich/ag-grid-react-components"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-slate-800 to-slate-700 hover:from-slate-700 hover:to-slate-600 text-white rounded-lg transition-all transform hover:scale-105 shadow-md"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>View on GitHub</span>
              </a>
            </div>
          </div>
        </header>

        <nav className="bg-white/80 backdrop-blur-md border-b border-blue-100 shadow-sm sticky top-0 z-20">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between py-4">
              <div className="flex gap-2">
                <button
                  className={`px-5 py-2.5 rounded-lg font-medium transition-all transform ${
                    activeComponent === "date-filter"
                      ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg scale-105"
                      : "bg-white border border-slate-200 text-slate-700 hover:border-blue-300 hover:shadow-md"
                  }`}
                  onClick={() => setActiveComponent("date-filter")}
                >
                  Date Filter
                </button>
                <button
                  className={`px-5 py-2.5 rounded-lg font-medium transition-all transform ${
                    activeComponent === "quick-filter"
                      ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg scale-105"
                      : "bg-white border border-slate-200 text-slate-700 hover:border-blue-300 hover:shadow-md"
                  }`}
                  onClick={() => setActiveComponent("quick-filter")}
                >
                  Quick Filter
                </button>
                <button
                  className={`px-5 py-2.5 rounded-lg font-medium transition-all transform ${
                    activeComponent === "url-state"
                      ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg scale-105"
                      : "bg-white border border-slate-200 text-slate-700 hover:border-blue-300 hover:shadow-md"
                  }`}
                  onClick={() => setActiveComponent("url-state")}
                >
                  URL State
                </button>
              </div>
              <div className="flex gap-4">
                <a
                  href="https://github.com/ryanrozich/ag-grid-react-components#readme"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-transparent bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text hover:from-blue-700 hover:to-blue-600 transition-all"
                >
                  📖 Docs
                </a>
                <a
                  href="https://github.com/ryanrozich/ag-grid-react-components/tree/main/src/components"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-transparent bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text hover:from-orange-700 hover:to-orange-600 transition-all"
                >
                  💻 Source
                </a>
              </div>
            </div>
          </div>
        </nav>

        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            {sections.find((s) => s.id === activeComponent)?.component}
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
            <h2 className="text-2xl font-bold text-slate-800 mb-2">
              Live Demo Grid
            </h2>
            <p className="text-slate-600 mb-6">
              {activeComponent === "date-filter" &&
                "Click on the Date column filter to try absolute dates or relative expressions like 'Today-7d'"}
              {activeComponent === "quick-filter" &&
                "Use the dropdown above to quickly apply predefined date filters"}
              {activeComponent === "url-state" &&
                "Apply any filters and watch the state persist in the URL"}
            </p>

            <div className="relative">
              <div
                className="ag-theme-material rounded-lg overflow-hidden shadow-xl border border-slate-200"
                style={{ height: 700, width: "100%" }}
              >
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
        </div>

        <footer className="bg-gradient-to-r from-blue-600 via-purple-600 to-orange-500 mt-16">
          <div className="container mx-auto px-4 py-8 text-center text-white">
            <p className="text-lg font-medium mb-4">
              Built with 💙 using React, TypeScript, and AG Grid Enterprise
            </p>
            <div className="flex justify-center gap-8">
              <a
                href="https://github.com/ryanrozich/ag-grid-react-components"
                className="text-white hover:text-blue-100 transition-all font-semibold flex items-center gap-2 transform hover:scale-105"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                    clipRule="evenodd"
                  />
                </svg>
                GitHub
              </a>
              <a
                href="https://www.npmjs.com/package/ag-grid-react-components"
                className="text-white hover:text-orange-100 transition-all font-semibold flex items-center gap-2 transform hover:scale-105"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M0 0v24h24V0H0zm12 2.4v19.2c-5.3 0-9.6-4.3-9.6-9.6S6.7 2.4 12 2.4z" />
                </svg>
                npm
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};
