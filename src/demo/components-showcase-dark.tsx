import React, { useCallback, useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import type {
  ColDef,
  GridApi,
  GridOptions,
  GridReadyEvent,
  ICellRendererParams,
} from "ag-grid-community";
import { AllEnterpriseModule, ModuleRegistry } from "ag-grid-enterprise";
import {
  RelativeDateFilter,
  QuickFilterDropdown,
  setupFilterStatePersistence,
  serializeFilterModel,
} from "../index";
import { generateData } from "./data/generator";
import "./styles/showcase-dark.css";

// Register AG Grid Enterprise modules
ModuleRegistry.registerModules([AllEnterpriseModule]);

// Import AG Grid styles
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

// interface ShowcaseSection {
//   id: string;
//   title: string;
//   description: string;
//   component: React.ReactNode;
// }

// Status chip renderer
const StatusRenderer: React.FC<ICellRendererParams> = ({ value }) => {
  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "bg-emerald-500/20 text-emerald-400 border-emerald-500/50";
      case "in progress":
        return "bg-blue-500/20 text-blue-400 border-blue-500/50";
      case "pending":
        return "bg-amber-500/20 text-amber-400 border-amber-500/50";
      case "delayed":
        return "bg-red-500/20 text-red-400 border-red-500/50";
      case "cancelled":
        return "bg-gray-500/20 text-gray-400 border-gray-500/50";
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

export const ComponentsShowcaseDark: React.FC = () => {
  const [gridApi, setGridApi] = useState<GridApi | null>(null);
  const [rowData] = useState(() => generateData(1000));
  const [currentPage, setCurrentPage] = useState<"hero" | "demo" | "docs">(
    "hero",
  );
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
      },
      {
        field: "category",
        headerName: "Category",
        width: 120,
        filter: "agSetColumnFilter",
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
      },
      {
        field: "status",
        headerName: "Status",
        width: 130,
        filter: "agSetColumnFilter",
        cellRenderer: StatusRenderer,
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
        setFilterModel(model);
      },
      onFilterSave: (model) => {
        console.log("Filters saved to URL:", model);
        setFilterModel(model);
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
            suppressRowGroups: true,
            suppressValues: true,
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
      defaultToolPanel: "",
      position: "right",
    },
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

  // Custom quick filter options
  const customQuickFilters = [
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
  ];

  if (currentPage === "hero") {
    return (
      <div className="min-h-screen bg-gray-950 text-white">
        {/* Hero Section */}
        <div className="relative isolate overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-gray-950 to-purple-950"></div>
            <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-gray-900 shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center"></div>
          </div>

          <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
            <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8">
              <h1 className="mt-10 text-4xl font-bold tracking-tight text-white sm:text-6xl">
                AG Grid React Components
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-300">
                Enterprise-ready date filtering components for AG Grid. Support
                for relative date expressions, quick filters, and URL state
                persistence.
              </p>
              <div className="mt-10 flex items-center gap-x-6">
                <button
                  onClick={() => setCurrentPage("demo")}
                  className="rounded-md bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all transform hover:scale-105"
                >
                  View Live Demo
                </button>
                <button
                  onClick={() => setCurrentPage("docs")}
                  className="text-sm font-semibold leading-6 text-gray-300 hover:text-white transition-colors"
                >
                  Learn more <span aria-hidden="true">→</span>
                </button>
              </div>
            </div>
            <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
              <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
                <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                  <div className="rounded-lg bg-gray-900 p-8 shadow-2xl ring-1 ring-gray-800">
                    <pre className="text-sm text-gray-300">
                      <code>{`// Simple relative date filtering
<AgGridReact
  columnDefs={[{
    field: "date",
    filter: RelativeDateFilter,
    floatingFilter: true,
  }]}
/>

// Example expressions:
"Today-7d"     // 7 days ago
"StartOfMonth" // First day of month
"Today+1w"     // 1 week from today`}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Section */}
        <div className="mx-auto max-w-7xl px-6 lg:px-8 pb-24">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-indigo-400">
              Advanced Filtering
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Everything you need for date filtering
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              <div className="flex flex-col">
                <dt className="text-base font-semibold leading-7 text-white">
                  <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                    <svg
                      className="h-6 w-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                      />
                    </svg>
                  </div>
                  Relative Date Expressions
                </dt>
                <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-300">
                  <p className="flex-auto">
                    Use intuitive expressions like "Today-7d" or "StartOfMonth"
                    instead of picking specific dates.
                  </p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="text-base font-semibold leading-7 text-white">
                  <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                    <svg
                      className="h-6 w-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                      />
                    </svg>
                  </div>
                  Quick Filter Presets
                </dt>
                <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-300">
                  <p className="flex-auto">
                    Apply common date ranges with one click using customizable
                    dropdown menus.
                  </p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="text-base font-semibold leading-7 text-white">
                  <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                    <svg
                      className="h-6 w-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
                      />
                    </svg>
                  </div>
                  URL State Persistence
                </dt>
                <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-300">
                  <p className="flex-auto">
                    Share filtered views with automatic URL synchronization and
                    browser history support.
                  </p>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    );
  }

  if (currentPage === "docs") {
    return (
      <div className="min-h-screen bg-gray-950 text-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Documentation
            </h2>
            <p className="mt-2 text-lg leading-8 text-gray-300">
              Learn how to integrate and use the components
            </p>
          </div>

          <div className="mt-16 space-y-16">
            {/* Installation */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Installation
              </h3>
              <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                <pre className="text-sm text-gray-300">
                  <code>{`npm install ag-grid-react-components

# Required peer dependencies
npm install ag-grid-community ag-grid-react ag-grid-enterprise date-fns`}</code>
                </pre>
              </div>
            </div>

            {/* Basic Usage */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Basic Usage
              </h3>
              <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                <pre className="text-sm text-gray-300">
                  <code>{`import { RelativeDateFilter } from 'ag-grid-react-components';

const columnDefs = [
  {
    field: 'date',
    filter: RelativeDateFilter,
    floatingFilter: true,
    filterParams: {
      buttons: ['reset', 'apply'],
      closeOnApply: true
    }
  }
];`}</code>
                </pre>
              </div>
            </div>

            {/* Expression Examples */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Expression Examples
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                  <h4 className="text-lg font-semibold text-indigo-400 mb-3">
                    Relative to Today
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>
                      <code className="text-green-400">Today</code> - Current
                      date
                    </li>
                    <li>
                      <code className="text-green-400">Today-7d</code> - 7 days
                      ago
                    </li>
                    <li>
                      <code className="text-green-400">Today+1w</code> - 1 week
                      from today
                    </li>
                    <li>
                      <code className="text-green-400">Today-1M</code> - 1 month
                      ago
                    </li>
                  </ul>
                </div>
                <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                  <h4 className="text-lg font-semibold text-indigo-400 mb-3">
                    Period Boundaries
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>
                      <code className="text-green-400">StartOfMonth</code> -
                      First day of current month
                    </li>
                    <li>
                      <code className="text-green-400">EndOfMonth</code> - Last
                      day of current month
                    </li>
                    <li>
                      <code className="text-green-400">StartOfYear</code> -
                      January 1st
                    </li>
                    <li>
                      <code className="text-green-400">StartOfWeek</code> -
                      Monday
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-4 mt-12">
              <button
                onClick={() => setCurrentPage("demo")}
                className="rounded-md bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition-all"
              >
                Try Live Demo
              </button>
              <a
                href="https://github.com/ryanrozich/ag-grid-react-components"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md bg-gray-800 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 transition-all"
              >
                View on GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Demo page
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <header className="bg-gray-900/50 backdrop-blur-md border-b border-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center gap-8">
              <h1 className="text-2xl font-bold">AG Grid React Components</h1>
              <nav className="hidden md:flex gap-6">
                <button
                  onClick={() => setCurrentPage("hero")}
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Home
                </button>
                <button
                  onClick={() => setCurrentPage("demo")}
                  className="text-sm text-white font-medium"
                >
                  Demo
                </button>
                <button
                  onClick={() => setCurrentPage("docs")}
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Docs
                </button>
              </nav>
            </div>
            <a
              href="https://github.com/ryanrozich/ag-grid-react-components"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                  clipRule="evenodd"
                />
              </svg>
              GitHub
            </a>
          </div>
        </div>
      </header>

      {/* Component Tabs */}
      <div className="bg-gray-900/30 border-b border-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8 py-4">
            <button
              className={`px-1 py-2 text-sm font-medium transition-all border-b-2 ${
                activeComponent === "date-filter"
                  ? "text-indigo-400 border-indigo-400"
                  : "text-gray-400 border-transparent hover:text-gray-300"
              }`}
              onClick={() => setActiveComponent("date-filter")}
            >
              Date Filter
            </button>
            <button
              className={`px-1 py-2 text-sm font-medium transition-all border-b-2 ${
                activeComponent === "quick-filter"
                  ? "text-indigo-400 border-indigo-400"
                  : "text-gray-400 border-transparent hover:text-gray-300"
              }`}
              onClick={() => setActiveComponent("quick-filter")}
            >
              Quick Filter
            </button>
            <button
              className={`px-1 py-2 text-sm font-medium transition-all border-b-2 ${
                activeComponent === "url-state"
                  ? "text-indigo-400 border-indigo-400"
                  : "text-gray-400 border-transparent hover:text-gray-300"
              }`}
              onClick={() => setActiveComponent("url-state")}
            >
              URL State
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Component Info */}
        <div className="mb-8">
          {activeComponent === "date-filter" && (
            <div className="bg-gray-900/50 rounded-xl p-8 border border-gray-800">
              <h2 className="text-2xl font-bold mb-4">Relative Date Filter</h2>
              <p className="text-gray-300 mb-6">
                Filter dates using absolute values or relative expressions like
                "Today-7d"
              </p>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-indigo-400 mb-3">
                    Features
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li className="flex items-start">
                      <span className="text-indigo-400 mr-2">✓</span>
                      Toggle between absolute dates and relative expressions
                    </li>
                    <li className="flex items-start">
                      <span className="text-indigo-400 mr-2">✓</span>
                      Real-time validation with date preview
                    </li>
                    <li className="flex items-start">
                      <span className="text-indigo-400 mr-2">✓</span>
                      All standard filter operations (equals, before, after, in
                      range)
                    </li>
                    <li className="flex items-start">
                      <span className="text-indigo-400 mr-2">✓</span>
                      Inclusive/exclusive boundary controls
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-indigo-400 mb-3">
                    Example Expressions
                  </h3>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      "Today",
                      "Today-7d",
                      "Today+1w",
                      "StartOfMonth",
                      "EndOfMonth",
                      "StartOfYear",
                    ].map((expr) => (
                      <code
                        key={expr}
                        className="bg-gray-800 px-3 py-2 rounded text-sm text-indigo-300 text-center hover:bg-gray-700 transition-colors cursor-pointer"
                        onClick={() => navigator.clipboard.writeText(expr)}
                      >
                        {expr}
                      </code>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-3">Click to copy</p>
                </div>
              </div>
            </div>
          )}

          {activeComponent === "quick-filter" && (
            <div className="bg-gray-900/50 rounded-xl p-8 border border-gray-800">
              <h2 className="text-2xl font-bold mb-4">Quick Filter Dropdown</h2>
              <p className="text-gray-300 mb-6">
                Apply predefined filters with a single click
              </p>

              <div className="mb-6">
                {gridApi && (
                  <QuickFilterDropdown
                    api={gridApi}
                    columnId="date"
                    options={customQuickFilters}
                    placeholder="Select time period"
                    showDescriptions={true}
                    className="min-w-60"
                  />
                )}
              </div>

              <h3 className="text-lg font-semibold text-indigo-400 mb-3">
                Features
              </h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start">
                  <span className="text-indigo-400 mr-2">✓</span>
                  Predefined filter options with icons and descriptions
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-400 mr-2">✓</span>
                  Keyboard navigation support
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-400 mr-2">✓</span>
                  Customizable trigger content and styling
                </li>
              </ul>
            </div>
          )}

          {activeComponent === "url-state" && (
            <div className="bg-gray-900/50 rounded-xl p-8 border border-gray-800">
              <h2 className="text-2xl font-bold mb-4">URL State Persistence</h2>
              <p className="text-gray-300 mb-6">
                Share filtered views with automatic URL synchronization
              </p>

              <div className="bg-gray-800 rounded-lg p-4 mb-6">
                <h3 className="text-sm font-medium text-gray-400 mb-2">
                  Current Filter State
                </h3>
                <pre className="text-sm text-indigo-300">
                  <code>
                    {JSON.stringify(serializeFilterModel(filterModel), null, 2)}
                  </code>
                </pre>
              </div>

              <h3 className="text-lg font-semibold text-indigo-400 mb-3">
                Features
              </h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start">
                  <span className="text-indigo-400 mr-2">✓</span>
                  Automatic URL synchronization as you filter
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-400 mr-2">✓</span>
                  Browser back/forward button support
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-400 mr-2">✓</span>
                  Shareable filter links
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Grid */}
        <div className="bg-gray-900/50 rounded-xl p-8 border border-gray-800">
          <h2 className="text-2xl font-bold mb-2">Live Demo Grid</h2>
          <p className="text-gray-400 mb-6">
            {activeComponent === "date-filter" &&
              "Click on the Date column filter to try relative expressions"}
            {activeComponent === "quick-filter" &&
              "Use the dropdown above to quickly filter the date column"}
            {activeComponent === "url-state" &&
              "Apply filters and watch the URL update"}
          </p>

          <div
            className="ag-theme-quartz-dark rounded-lg overflow-hidden"
            style={{ height: 600, width: "100%" }}
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
  );
};
