import React, { useCallback, useMemo, useState, useEffect } from "react";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import type {
  ColDef,
  GridApi,
  GridOptions,
  ICellRendererParams,
  GridReadyEvent,
} from "ag-grid-community";
import { AllEnterpriseModule, ModuleRegistry } from "ag-grid-enterprise";
import {
  RelativeDateFilter,
  RelativeDateFloatingFilter,
  QuickFilterDropdown,
  setupFilterStatePersistence,
  serializeFilterModel,
} from "../index";
import { generateData } from "./data/generator";
import { CodeBlock } from "./components/CodeBlock";
import { AnchorHeading } from "./components/AnchorHeading";
// import { SimpleCodeBlock as CodeBlock } from "./components/SimpleCodeBlock";
import "./styles/showcase-dark.css";
import "./styles/code-override.css";

// Register AG Grid Enterprise modules
ModuleRegistry.registerModules([AllEnterpriseModule]);

// Import AG Grid styles
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

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

// Navigation component
const Navigation: React.FC<{
  currentPage: "hero" | "demo" | "docs";
}> = ({ currentPage }) => (
  <header className="bg-gray-900/50 backdrop-blur-md border-b border-gray-800">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center py-6">
        <div className="flex items-center gap-8">
          <h1 className="text-2xl font-bold">AG Grid React Components</h1>
          <nav className="hidden md:flex gap-6">
            <Link
              to="/"
              className={`text-sm ${currentPage === "hero" ? "text-white font-medium" : "text-gray-400 hover:text-white"} transition-colors`}
            >
              Home
            </Link>
            <Link
              to="/demo"
              className={`text-sm ${currentPage === "demo" ? "text-white font-medium" : "text-gray-400 hover:text-white"} transition-colors`}
            >
              Demo
            </Link>
            <Link
              to="/docs"
              className={`text-sm ${currentPage === "docs" ? "text-white font-medium" : "text-gray-400 hover:text-white"} transition-colors`}
            >
              Docs
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                clipRule="evenodd"
              />
            </svg>
            MIT License
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
    </div>
  </header>
);

// Footer component
const Footer: React.FC = () => (
  <footer className="bg-gray-900 border-t border-gray-800 mt-auto">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-white font-semibold mb-4">
            AG Grid React Components
          </h3>
          <p className="text-gray-400 text-sm">
            Enterprise-ready date filtering components for AG Grid. Released
            under the MIT License.
          </p>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-4">Resources</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href="https://github.com/ryanrozich/ag-grid-react-components"
                className="text-gray-400 hover:text-white transition-colors"
              >
                GitHub Repository
              </a>
            </li>
            <li>
              <a
                href="https://www.npmjs.com/package/ag-grid-react-components"
                className="text-gray-400 hover:text-white transition-colors"
              >
                NPM Package
              </a>
            </li>
            <li>
              <a
                href="https://www.ag-grid.com/react-data-grid/"
                className="text-gray-400 hover:text-white transition-colors"
              >
                AG Grid Documentation
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-4">Legal</h3>
          <p className="text-gray-400 text-sm mb-2">
            This project is not affiliated with AG Grid Ltd.
          </p>
          <p className="text-gray-400 text-sm">
            Use at your own risk. No warranty provided.
          </p>
        </div>
      </div>
      <div className="mt-8 pt-8 border-t border-gray-800">
        <p className="text-center text-gray-400 text-sm">
          © {new Date().getFullYear()} Ryan Rozich. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

interface ComponentsShowcaseCompleteProps {
  initialPage?: "hero" | "demo" | "docs";
}

export const ComponentsShowcaseComplete: React.FC<
  ComponentsShowcaseCompleteProps
> = ({ initialPage = "hero" }) => {
  const [gridApi, setGridApi] = useState<GridApi | null>(null);
  const [rowData] = useState(() => generateData(1000));
  const [activeComponent, setActiveComponent] = useState("date-filter");
  const [filterModel, setFilterModel] = useState<any>({});
  const [activeDocSection, setActiveDocSection] = useState("getting-started");

  // Router hooks
  const location = useLocation();
  const navigate = useNavigate();
  const { section } = useParams<{ section?: string }>();

  // Determine current page from URL
  const currentPage = useMemo(() => {
    if (location.pathname === "/") return "hero";
    if (location.pathname.startsWith("/demo")) return "demo";
    if (location.pathname.startsWith("/docs")) return "docs";
    return initialPage;
  }, [location.pathname, initialPage]);

  // Update active doc section from URL params
  useEffect(() => {
    if (section) {
      setActiveDocSection(section);
    }
  }, [section]);

  // Column definitions
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

    params.api.addEventListener("filterChanged", () => {
      const model = params.api.getFilterModel();
      setFilterModel(model || {});
    });

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

  // Quick filter examples
  const dateQuickFilters = [
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

  // Combined filters example
  const combinedQuickFilters = [
    {
      id: "highValueRecent",
      label: "High Value Recent",
      icon: "💎",
      description: "Amount > $500 in last 30 days",
      filterModel: null,
      buildFilterModel: (_api: GridApi) => {
        return {
          date: {
            mode: "relative",
            type: "inRange",
            expressionFrom: "Today-30d",
            expressionTo: "Today",
          },
          value: {
            type: "greaterThan",
            filter: 500,
          },
        };
      },
    },
    {
      id: "pendingThisWeek",
      label: "Pending This Week",
      icon: "⏳",
      description: "Pending items due this week",
      filterModel: null,
      buildFilterModel: (_api: GridApi) => {
        return {
          date: {
            mode: "relative",
            type: "inRange",
            expressionFrom: "StartOfWeek",
            expressionTo: "EndOfWeek",
          },
          status: {
            values: ["Pending"],
          },
        };
      },
    },
  ];

  if (currentPage === "hero") {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex flex-col">
        <Navigation currentPage={currentPage} />

        <div className="flex-1">
          <div className="relative isolate overflow-hidden">
            <div className="absolute inset-0 -z-10">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-gray-950 to-purple-950"></div>
              <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-gray-900 shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center"></div>
            </div>

            <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
              <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8">
                <div className="mt-6 flex items-center gap-x-4">
                  <span className="inline-flex items-center gap-x-1.5 rounded-full bg-indigo-600/10 px-3 py-1.5 text-sm font-medium text-indigo-400 ring-1 ring-inset ring-indigo-600/20">
                    <svg
                      className="h-3 w-3"
                      viewBox="0 0 6 6"
                      aria-hidden="true"
                    >
                      <circle cx={3} cy={3} r={3} fill="currentColor" />
                    </svg>
                    Open Source
                  </span>
                  <span className="inline-flex items-center gap-x-1.5 rounded-full bg-emerald-600/10 px-3 py-1.5 text-sm font-medium text-emerald-400 ring-1 ring-inset ring-emerald-600/20">
                    MIT License
                  </span>
                </div>
                <h1 className="mt-10 text-4xl font-bold tracking-tight text-white sm:text-6xl">
                  AG Grid React Components
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-300">
                  Enterprise-ready date filtering components for AG Grid.
                  Support for relative date expressions, quick filters, and URL
                  state persistence.
                </p>
                <div className="mt-10 flex items-center gap-x-6">
                  <button
                    onClick={() => navigate("/demo")}
                    className="rounded-md bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all transform hover:scale-105"
                  >
                    View Live Demo
                  </button>
                  <button
                    onClick={() => navigate("/docs")}
                    className="text-sm font-semibold leading-6 text-gray-300 hover:text-white transition-colors"
                  >
                    Documentation <span aria-hidden="true">→</span>
                  </button>
                </div>
              </div>
              <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
                <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
                  <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                    <CodeBlock
                      code={`// Simple relative date filtering
<AgGridReact
  columnDefs={[{
    field: "date",
    filter: RelativeDateFilter,
    floatingFilter: true,
    floatingFilterComponent: RelativeDateFloatingFilter
  }]}
/>

// Example expressions:
"Today-7d"     // 7 days ago
"StartOfMonth" // First day of month
"Today+1w"     // 1 week from today`}
                      language="tsx"
                      variant="hero"
                      showCopyButton={false}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

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
                      Use intuitive expressions like "Today-7d" or
                      "StartOfMonth" instead of picking specific dates.
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
                      Share filtered views with automatic URL synchronization
                      and browser history support.
                    </p>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    );
  }

  if (currentPage === "docs") {
    const docSections = [
      // Getting Started Section
      { id: "getting-started", label: "Getting Started", isSection: true },
      { id: "prerequisites", label: "Prerequisites", indent: true },
      { id: "installation", label: "Installation", indent: true },
      { id: "basic-setup", label: "Basic Setup", indent: true },

      // Components Section
      { id: "components", label: "Components", isSection: true },
      { id: "relativedatefilter", label: "RelativeDateFilter", indent: true },
      {
        id: "relativedatefloatingfilter",
        label: "RelativeDateFloatingFilter",
        indent: true,
      },
      { id: "quickfilterdropdown", label: "QuickFilterDropdown", indent: true },

      // Demo Guide Section
      { id: "demo-guide", label: "Demo Guide", isSection: true },
      { id: "running-locally", label: "Running Locally", indent: true },
      { id: "demo-features", label: "Demo Features", indent: true },

      // References Section
      { id: "references", label: "References", isSection: true },
      { id: "expressions", label: "Date Expressions", indent: true },
      { id: "types", label: "TypeScript Types", indent: true },
      { id: "urlstate", label: "URL State Persistence", indent: true },
      { id: "date-vs-timestamp", label: "Date vs Timestamp", indent: true },

      // Contributing Section
      { id: "contributing", label: "Contributing", isSection: true },
      { id: "development", label: "Development Setup", indent: true },
      { id: "testing", label: "Testing", indent: true },
      { id: "examples", label: "Code Examples", indent: true },
    ];

    return (
      <div className="min-h-screen bg-gray-950 text-white flex flex-col">
        <Navigation currentPage={currentPage} />

        <div className="flex-1">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
            <div className="lg:grid lg:grid-cols-12 lg:gap-8">
              {/* Sidebar Navigation */}
              <nav className="lg:col-span-3">
                <div className="sticky top-8 space-y-1">
                  <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
                    Documentation
                  </h3>
                  {docSections.map((section) =>
                    section.isSection ? (
                      <div
                        key={section.id}
                        className="font-semibold text-gray-300 uppercase text-xs tracking-wider mt-4 first:mt-0 px-3 py-2"
                      >
                        {section.label}
                      </div>
                    ) : (
                      <Link
                        key={section.id}
                        to={`/docs/${section.id}`}
                        className={`block w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${
                          activeDocSection === section.id
                            ? "bg-gray-800 text-white"
                            : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                        } ${section.indent ? "ml-4" : ""}`}
                      >
                        {section.label}
                      </Link>
                    ),
                  )}
                </div>
              </nav>

              {/* Main Content */}
              <main className="lg:col-span-9">
                {/* Getting Started Section */}
                {activeDocSection === "getting-started" && (
                  <div className="space-y-8">
                    <div>
                      <AnchorHeading level={1} id="getting-started">
                        Getting Started
                      </AnchorHeading>
                      <p className="text-gray-300 mb-6">
                        Welcome to AG Grid React Components! This library
                        provides enterprise-ready date filtering components for
                        AG Grid with support for relative date expressions,
                        quick filters, and URL state persistence.
                      </p>

                      <div className="bg-indigo-900/20 border border-indigo-600/30 rounded-lg p-6 mb-8">
                        <AnchorHeading
                          level={3}
                          id="key-features"
                          className="text-lg font-semibold text-indigo-400 mb-3"
                        >
                          Key Features
                        </AnchorHeading>
                        <ul className="space-y-2 text-gray-300">
                          <li className="flex items-start">
                            <span className="text-indigo-400 mr-2">📅</span>
                            <div>
                              <strong>Relative Date Expressions:</strong> Use
                              intuitive expressions like "Today-7d" or
                              "StartOfMonth"
                            </div>
                          </li>
                          <li className="flex items-start">
                            <span className="text-indigo-400 mr-2">⚡</span>
                            <div>
                              <strong>Quick Filter Presets:</strong> Apply
                              common date ranges with one click
                            </div>
                          </li>
                          <li className="flex items-start">
                            <span className="text-indigo-400 mr-2">🔗</span>
                            <div>
                              <strong>URL State Persistence:</strong> Share
                              filtered views with automatic URL synchronization
                            </div>
                          </li>
                          <li className="flex items-start">
                            <span className="text-indigo-400 mr-2">🏢</span>
                            <div>
                              <strong>Enterprise Ready:</strong> Fully
                              compatible with AG Grid Enterprise features
                            </div>
                          </li>
                        </ul>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                          <AnchorHeading
                            level={3}
                            id="community-features"
                            className="text-lg font-semibold text-white mb-3"
                          >
                            Community Features
                          </AnchorHeading>
                          <ul className="space-y-2 text-sm text-gray-300">
                            <li>✓ Basic date filtering</li>
                            <li>✓ Floating filters</li>
                            <li>✓ Relative expressions</li>
                            <li>✓ URL state persistence</li>
                            <li>✓ Quick filter dropdown</li>
                          </ul>
                        </div>
                        <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                          <AnchorHeading
                            level={3}
                            id="enterprise-features"
                            className="text-lg font-semibold text-white mb-3"
                          >
                            Enterprise Features
                          </AnchorHeading>
                          <ul className="space-y-2 text-sm text-gray-300">
                            <li>✓ Filter tool panel</li>
                            <li>✓ Advanced filter options</li>
                            <li>✓ Set filters integration</li>
                            <li>✓ Row grouping with filters</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Prerequisites */}
                {activeDocSection === "prerequisites" && (
                  <div className="space-y-8">
                    <div>
                      <AnchorHeading level={1} id="prerequisites">
                        Prerequisites
                      </AnchorHeading>
                      <p className="text-gray-300 mb-6">
                        Before installing AG Grid React Components, ensure your
                        project meets these requirements.
                      </p>

                      <div className="space-y-6">
                        <div>
                          <AnchorHeading level={3} id="system-requirements">
                            System Requirements
                          </AnchorHeading>
                          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                            <table className="w-full text-sm">
                              <thead>
                                <tr className="border-b border-gray-700">
                                  <th className="text-left py-2 text-gray-300">
                                    Dependency
                                  </th>
                                  <th className="text-left py-2 text-gray-300">
                                    Required Version
                                  </th>
                                  <th className="text-left py-2 text-gray-300">
                                    Notes
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="text-gray-400">
                                <tr className="border-b border-gray-800">
                                  <td className="py-3">Node.js</td>
                                  <td className="py-3">18.0.0+</td>
                                  <td className="py-3">
                                    LTS version recommended
                                  </td>
                                </tr>
                                <tr className="border-b border-gray-800">
                                  <td className="py-3">React</td>
                                  <td className="py-3">18.0.0+</td>
                                  <td className="py-3">
                                    React 17 may work but not tested
                                  </td>
                                </tr>
                                <tr className="border-b border-gray-800">
                                  <td className="py-3">TypeScript</td>
                                  <td className="py-3">5.0.0+</td>
                                  <td className="py-3">
                                    Optional but recommended
                                  </td>
                                </tr>
                                <tr className="border-b border-gray-800">
                                  <td className="py-3">AG Grid Community</td>
                                  <td className="py-3">33.3.0+</td>
                                  <td className="py-3">
                                    Core grid functionality
                                  </td>
                                </tr>
                                <tr className="border-b border-gray-800">
                                  <td className="py-3">AG Grid React</td>
                                  <td className="py-3">33.3.0+</td>
                                  <td className="py-3">
                                    React wrapper for AG Grid
                                  </td>
                                </tr>
                                <tr className="border-b border-gray-800">
                                  <td className="py-3">AG Grid Enterprise</td>
                                  <td className="py-3">33.3.0+</td>
                                  <td className="py-3">
                                    Required for floating filters
                                  </td>
                                </tr>
                                <tr>
                                  <td className="py-3">date-fns</td>
                                  <td className="py-3">4.0.0+</td>
                                  <td className="py-3">
                                    Date manipulation library
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>

                        <div>
                          <AnchorHeading level={3} id="ag-grid-license">
                            AG Grid License
                          </AnchorHeading>
                          <div className="bg-amber-900/20 border border-amber-600/30 rounded-lg p-4">
                            <p className="text-amber-400 text-sm mb-3">
                              <strong>Important:</strong> AG Grid Enterprise is
                              required for the full feature set.
                            </p>
                            <p className="text-gray-300 text-sm mb-3">
                              You can use AG Grid Enterprise in one of these
                              ways:
                            </p>
                            <ul className="space-y-2 text-sm text-gray-300">
                              <li>
                                • <strong>Trial License:</strong> Free for
                                evaluation (watermark displayed)
                              </li>
                              <li>
                                • <strong>Development License:</strong> For
                                development and testing
                              </li>
                              <li>
                                • <strong>Production License:</strong> For
                                deployed applications
                              </li>
                            </ul>
                            <p className="text-gray-400 text-sm mt-3">
                              Visit{" "}
                              <a
                                href="https://www.ag-grid.com/license-pricing"
                                className="text-indigo-400 hover:text-indigo-300"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                AG Grid Pricing
                              </a>{" "}
                              for license information.
                            </p>
                          </div>
                        </div>

                        <div>
                          <AnchorHeading level={3} id="browser-support">
                            Browser Support
                          </AnchorHeading>
                          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                            <p className="text-gray-300 mb-4">
                              The components support all modern browsers:
                            </p>
                            <ul className="grid grid-cols-2 gap-3 text-sm text-gray-300">
                              <li>✓ Chrome 90+</li>
                              <li>✓ Firefox 88+</li>
                              <li>✓ Safari 14+</li>
                              <li>✓ Edge 90+</li>
                            </ul>
                            <p className="text-gray-400 text-sm mt-4">
                              Internet Explorer is not supported.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Installation */}
                {activeDocSection === "installation" && (
                  <div className="space-y-8">
                    <div>
                      <AnchorHeading level={1} id="installation">
                        Installation
                      </AnchorHeading>
                      <p className="text-gray-300 mb-6">
                        Get started with AG Grid React Components in your
                        project.
                      </p>

                      <div className="space-y-6">
                        <div>
                          <AnchorHeading level={3} id="npm">
                            NPM
                          </AnchorHeading>
                          <CodeBlock
                            code={`npm install ag-grid-react-components

# Required peer dependencies
npm install ag-grid-community ag-grid-react ag-grid-enterprise date-fns`}
                            language="bash"
                          />
                        </div>

                        <div>
                          <AnchorHeading level={3} id="yarn">
                            Yarn
                          </AnchorHeading>
                          <CodeBlock
                            code={`yarn add ag-grid-react-components

# Required peer dependencies
yarn add ag-grid-community ag-grid-react ag-grid-enterprise date-fns`}
                            language="bash"
                          />
                        </div>

                        <div className="bg-amber-900/20 border border-amber-600/30 rounded-lg p-4">
                          <p className="text-amber-400 text-sm">
                            <strong>Note:</strong> AG Grid Enterprise is
                            required for the filter components. You can use the
                            trial version or purchase a license from AG Grid.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Basic Setup */}
                {activeDocSection === "basic-setup" && (
                  <div className="space-y-8">
                    <div>
                      <AnchorHeading level={1} id="basic-setup">
                        Basic Setup
                      </AnchorHeading>
                      <p className="text-gray-300 mb-6">
                        Getting started with AG Grid React Components is
                        straightforward. Here's a complete example showing all
                        the components working together.
                      </p>

                      <div className="space-y-8">
                        <div>
                          <AnchorHeading level={2} id="complete-example">
                            Complete Example
                          </AnchorHeading>
                          <CodeBlock
                            code={`import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import { 
  RelativeDateFilter, 
  RelativeDateFloatingFilter,
  QuickFilterDropdown,
  setupFilterStatePersistence
} from 'ag-grid-react-components';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';

function App() {
  const columnDefs = [
    {
      field: 'date',
      headerName: 'Date',
      filter: RelativeDateFilter,
      floatingFilter: true,
      floatingFilterComponent: RelativeDateFloatingFilter,
    },
    {
      field: 'status',
      headerName: 'Status',
    }
  ];

  const gridOptions = {
    defaultColDef: {
      sortable: true,
      resizable: true,
    }
  };

  React.useEffect(() => {
    // Enable URL state persistence
    const cleanup = setupFilterStatePersistence(gridApi);
    return cleanup;
  }, [gridApi]);

  return (
    <div className="ag-theme-quartz" style={{ height: 600 }}>
      <AgGridReact
        columnDefs={columnDefs}
        gridOptions={gridOptions}
        rowData={rowData}
      />
    </div>
  );
}`}
                            language="tsx"
                          />
                        </div>

                        <div>
                          <AnchorHeading level={2} id="key-points">
                            Key Points
                          </AnchorHeading>
                          <ul className="space-y-2 text-gray-300">
                            <li className="flex items-start">
                              <span className="text-gray-500 mr-2">•</span>
                              Import the components you need from
                              'ag-grid-react-components'
                            </li>
                            <li className="flex items-start">
                              <span className="text-gray-500 mr-2">•</span>
                              Set up column definitions with the custom filter
                              components
                            </li>
                            <li className="flex items-start">
                              <span className="text-gray-500 mr-2">•</span>
                              Enable floating filters for better UX
                            </li>
                            <li className="flex items-start">
                              <span className="text-gray-500 mr-2">•</span>
                              Optionally enable URL state persistence
                            </li>
                          </ul>
                        </div>

                        <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                          <AnchorHeading level={3} id="next-steps">
                            Next Steps
                          </AnchorHeading>
                          <p className="text-gray-300 mb-4">
                            Now that you have the basic setup, explore:
                          </p>
                          <ul className="space-y-2 text-sm text-gray-300">
                            <li>
                              <Link
                                to="/docs/relativedatefilter"
                                className="text-blue-400 hover:text-blue-300"
                              >
                                RelativeDateFilter documentation
                              </Link>{" "}
                              for advanced date filtering
                            </li>
                            <li>
                              <Link
                                to="/docs/quickfilterdropdown"
                                className="text-blue-400 hover:text-blue-300"
                              >
                                QuickFilterDropdown documentation
                              </Link>{" "}
                              for predefined filters
                            </li>
                            <li>
                              <Link
                                to="/demo"
                                className="text-blue-400 hover:text-blue-300"
                              >
                                Live demo
                              </Link>{" "}
                              to see all features in action
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* RelativeDateFilter */}
                {activeDocSection === "relativedatefilter" && (
                  <div className="space-y-8">
                    <div>
                      <AnchorHeading level={1} id="relative-date-filter">
                        RelativeDateFilter
                      </AnchorHeading>
                      <p className="text-gray-300 mb-6">
                        A powerful date filter that supports both absolute dates
                        and relative expressions.
                      </p>

                      <div className="space-y-8">
                        <div>
                          <AnchorHeading
                            level={3}
                            id="relative-date-filter-basic-usage"
                          >
                            Basic Usage
                          </AnchorHeading>
                          <CodeBlock
                            code={`import { RelativeDateFilter, RelativeDateFloatingFilter } from 'ag-grid-react-components';

const columnDefs = [
  {
    field: 'dateField',
    headerName: 'Date',
    filter: RelativeDateFilter,
    floatingFilter: true,
    floatingFilterComponent: RelativeDateFloatingFilter,
  }
];`}
                            language="typescript"
                          />
                        </div>

                        <div>
                          <AnchorHeading
                            level={3}
                            id="relative-date-filter-configuration-options"
                          >
                            Configuration Options
                          </AnchorHeading>
                          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                            <table className="w-full text-sm">
                              <thead>
                                <tr className="border-b border-gray-700">
                                  <th className="text-left py-2 text-gray-300">
                                    Parameter
                                  </th>
                                  <th className="text-left py-2 text-gray-300">
                                    Type
                                  </th>
                                  <th className="text-left py-2 text-gray-300">
                                    Required
                                  </th>
                                  <th className="text-left py-2 text-gray-300">
                                    Default
                                  </th>
                                  <th className="text-left py-2 text-gray-300">
                                    Description
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="text-gray-400">
                                <tr className="border-b border-gray-800">
                                  <td className="py-3">buttons</td>
                                  <td className="py-3">string[]</td>
                                  <td className="py-3">No</td>
                                  <td className="py-3">['reset', 'apply']</td>
                                  <td className="py-3">
                                    Filter buttons to display
                                  </td>
                                </tr>
                                <tr className="border-b border-gray-800">
                                  <td className="py-3">closeOnApply</td>
                                  <td className="py-3">boolean</td>
                                  <td className="py-3">No</td>
                                  <td className="py-3">true</td>
                                  <td className="py-3">
                                    Close filter when apply is clicked
                                  </td>
                                </tr>
                                <tr className="border-b border-gray-800">
                                  <td className="py-3">
                                    includeBlanksInEquals
                                  </td>
                                  <td className="py-3">boolean</td>
                                  <td className="py-3">No</td>
                                  <td className="py-3">false</td>
                                  <td className="py-3">
                                    Include blank values in equals
                                  </td>
                                </tr>
                                <tr className="border-b border-gray-800">
                                  <td className="py-3">
                                    includeBlanksInLessThan
                                  </td>
                                  <td className="py-3">boolean</td>
                                  <td className="py-3">No</td>
                                  <td className="py-3">false</td>
                                  <td className="py-3">
                                    Include blank values in less than
                                  </td>
                                </tr>
                                <tr className="border-b border-gray-800">
                                  <td className="py-3">
                                    includeBlanksInGreaterThan
                                  </td>
                                  <td className="py-3">boolean</td>
                                  <td className="py-3">No</td>
                                  <td className="py-3">false</td>
                                  <td className="py-3">
                                    Include blank values in greater than
                                  </td>
                                </tr>
                                <tr>
                                  <td className="py-3">includeBlanksInRange</td>
                                  <td className="py-3">boolean</td>
                                  <td className="py-3">No</td>
                                  <td className="py-3">false</td>
                                  <td className="py-3">
                                    Include blank values in range
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>

                        <div>
                          <AnchorHeading
                            level={3}
                            id="relative-date-filter-example-with-all-options"
                          >
                            Example with All Options
                          </AnchorHeading>
                          <CodeBlock
                            code={`const columnDefs = [
  {
    field: 'dateField',
    headerName: 'Date',
    filter: RelativeDateFilter,
    floatingFilter: true,
    floatingFilterComponent: RelativeDateFloatingFilter,
    filterParams: {
      buttons: ['reset', 'apply', 'clear'],
      closeOnApply: false,
      includeBlanksInEquals: false,
      includeBlanksInLessThan: true,
      includeBlanksInGreaterThan: false,
      includeBlanksInRange: false
    }
  }
];`}
                            language="typescript"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* RelativeDateFloatingFilter */}
                {activeDocSection === "relativedatefloatingfilter" && (
                  <div className="space-y-8">
                    <div>
                      <AnchorHeading
                        level={1}
                        id="relative-date-floating-filter"
                      >
                        RelativeDateFloatingFilter
                      </AnchorHeading>
                      <p className="text-gray-300 mb-6">
                        A companion floating filter component that displays the
                        current filter state in the column header.
                      </p>

                      <div className="space-y-8">
                        <div>
                          <AnchorHeading
                            level={2}
                            id="floating-filter-overview"
                          >
                            Overview
                          </AnchorHeading>
                          <p className="text-gray-300 mb-4">
                            The RelativeDateFloatingFilter component works in
                            conjunction with RelativeDateFilter to provide a
                            seamless filtering experience. It displays the
                            current filter state in the column header, allowing
                            users to see active filters at a glance.
                          </p>

                          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                            <AnchorHeading
                              level={3}
                              id="floating-filter-key-features"
                            >
                              Key Features
                            </AnchorHeading>
                            <ul className="space-y-2 text-sm text-gray-300">
                              <li>
                                ✓ Displays active filter values in the header
                              </li>
                              <li>
                                ✓ Shows relative expressions in human-readable
                                format
                              </li>
                              <li>
                                ✓ Indicates when multiple conditions are active
                              </li>
                              <li>✓ Provides quick clear functionality</li>
                              <li>✓ Synchronizes with the main filter</li>
                            </ul>
                          </div>
                        </div>

                        <div>
                          <AnchorHeading level={2} id="floating-filter-usage">
                            Usage
                          </AnchorHeading>
                          <CodeBlock
                            code={`const columnDefs = [
  {
    field: 'dateField',
    headerName: 'Date',
    filter: RelativeDateFilter,
    floatingFilter: true,  // Enable floating filters
    floatingFilterComponent: RelativeDateFloatingFilter,
  }
];`}
                            language="tsx"
                          />
                        </div>

                        <div>
                          <AnchorHeading
                            level={2}
                            id="floating-filter-display-examples"
                          >
                            Display Examples
                          </AnchorHeading>
                          <div className="space-y-4">
                            <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
                              <p className="text-sm text-gray-400 mb-2">
                                Single condition:
                              </p>
                              <p className="text-white font-mono">= Today+7d</p>
                            </div>
                            <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
                              <p className="text-sm text-gray-400 mb-2">
                                Range condition:
                              </p>
                              <p className="text-white font-mono">
                                Today-7d → Today+7d
                              </p>
                            </div>
                            <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
                              <p className="text-sm text-gray-400 mb-2">
                                Multiple conditions:
                              </p>
                              <p className="text-white font-mono">
                                (Multiple conditions)
                              </p>
                            </div>
                          </div>
                        </div>

                        <div>
                          <AnchorHeading level={2} id="integration-notes">
                            Integration Notes
                          </AnchorHeading>
                          <ul className="space-y-2 text-gray-300">
                            <li className="flex items-start">
                              <span className="text-gray-500 mr-2">•</span>
                              The floating filter automatically syncs with the
                              main filter
                            </li>
                            <li className="flex items-start">
                              <span className="text-gray-500 mr-2">•</span>
                              No additional configuration is required beyond
                              setting the component
                            </li>
                            <li className="flex items-start">
                              <span className="text-gray-500 mr-2">•</span>
                              Works with both Community and Enterprise editions
                              of AG Grid
                            </li>
                            <li className="flex items-start">
                              <span className="text-gray-500 mr-2">•</span>
                              Respects the same date formats as the main filter
                            </li>
                          </ul>
                        </div>

                        <div className="bg-blue-900/20 rounded-lg p-6 border border-blue-800/50">
                          <AnchorHeading
                            level={3}
                            id="pro-tip"
                            className="text-lg font-semibold text-blue-300 mb-3"
                          >
                            💡 Pro Tip
                          </AnchorHeading>
                          <p className="text-gray-300">
                            Floating filters are part of AG Grid Community
                            edition and provide immediate visual feedback about
                            active filters. They're especially useful in
                            data-heavy applications where users need to quickly
                            understand the current filter state.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* QuickFilterDropdown */}
                {activeDocSection === "quickfilterdropdown" && (
                  <div className="space-y-8">
                    <div>
                      <AnchorHeading level={1} id="quick-filter-dropdown">
                        QuickFilterDropdown
                      </AnchorHeading>
                      <p className="text-gray-300 mb-6">
                        A dropdown component for applying predefined filters
                        with a single click. Works with any column type, not
                        just dates.
                      </p>

                      <div className="space-y-8">
                        <div>
                          <AnchorHeading
                            level={3}
                            id="quick-filter-basic-usage"
                          >
                            Basic Usage
                          </AnchorHeading>
                          <CodeBlock
                            code={`import { QuickFilterDropdown } from 'ag-grid-react-components';

// In your component
<QuickFilterDropdown
  api={gridApi}
  columnId="date"
  options={[
    {
      id: 'last7days',
      label: 'Last 7 Days',
      filterModel: {
        mode: 'relative',
        type: 'inRange',
        expressionFrom: 'Today-7d',
        expressionTo: 'Today'
      },
      icon: '📅',
      description: 'Past week'
    }
  ]}
  placeholder="Select time period"
/>`}
                            language="tsx"
                          />
                        </div>

                        <div>
                          <AnchorHeading
                            level={3}
                            id="quick-filter-configuration-options"
                          >
                            Configuration Options
                          </AnchorHeading>
                          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                            <table className="w-full text-sm">
                              <thead>
                                <tr className="border-b border-gray-700">
                                  <th className="text-left py-2 text-gray-300">
                                    Parameter
                                  </th>
                                  <th className="text-left py-2 text-gray-300">
                                    Type
                                  </th>
                                  <th className="text-left py-2 text-gray-300">
                                    Required
                                  </th>
                                  <th className="text-left py-2 text-gray-300">
                                    Default
                                  </th>
                                  <th className="text-left py-2 text-gray-300">
                                    Description
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="text-gray-400">
                                <tr className="border-b border-gray-800">
                                  <td className="py-3">api</td>
                                  <td className="py-3">GridApi</td>
                                  <td className="py-3">Yes</td>
                                  <td className="py-3">-</td>
                                  <td className="py-3">AG Grid API instance</td>
                                </tr>
                                <tr className="border-b border-gray-800">
                                  <td className="py-3">columnId</td>
                                  <td className="py-3">string</td>
                                  <td className="py-3">Yes*</td>
                                  <td className="py-3">-</td>
                                  <td className="py-3">
                                    Column to filter (*unless using onSelect)
                                  </td>
                                </tr>
                                <tr className="border-b border-gray-800">
                                  <td className="py-3">options</td>
                                  <td className="py-3">QuickFilterOption[]</td>
                                  <td className="py-3">Yes</td>
                                  <td className="py-3">-</td>
                                  <td className="py-3">
                                    Filter options to display
                                  </td>
                                </tr>
                                <tr className="border-b border-gray-800">
                                  <td className="py-3">placeholder</td>
                                  <td className="py-3">string</td>
                                  <td className="py-3">No</td>
                                  <td className="py-3">'Select filter'</td>
                                  <td className="py-3">Placeholder text</td>
                                </tr>
                                <tr className="border-b border-gray-800">
                                  <td className="py-3">showDescriptions</td>
                                  <td className="py-3">boolean</td>
                                  <td className="py-3">No</td>
                                  <td className="py-3">false</td>
                                  <td className="py-3">
                                    Show option descriptions
                                  </td>
                                </tr>
                                <tr className="border-b border-gray-800">
                                  <td className="py-3">className</td>
                                  <td className="py-3">string</td>
                                  <td className="py-3">No</td>
                                  <td className="py-3">''</td>
                                  <td className="py-3">
                                    Additional CSS classes
                                  </td>
                                </tr>
                                <tr>
                                  <td className="py-3">onFilterChange</td>
                                  <td className="py-3">function</td>
                                  <td className="py-3">No</td>
                                  <td className="py-3">-</td>
                                  <td className="py-3">
                                    Callback when filter changes
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>

                        <div>
                          <AnchorHeading level={3} id="non-date-filter-example">
                            Non-Date Filter Example
                          </AnchorHeading>
                          <CodeBlock
                            code={`// Filter by status
const statusFilters = [
  {
    id: 'active',
    label: 'Active Only',
    filterModel: { values: ['Active', 'In Progress'] },
    icon: '✅',
    description: 'Show active items'
  },
  {
    id: 'completed',
    label: 'Completed',
    filterModel: { values: ['Completed'] },
    icon: '✔️',
    description: 'Show completed items'
  }
];

<QuickFilterDropdown
  api={gridApi}
  columnId="status"
  options={statusFilters}
  placeholder="Filter by status"
/>`}
                            language="tsx"
                          />
                        </div>

                        <div>
                          <AnchorHeading
                            level={3}
                            id="combined-filters-example"
                          >
                            Combined Filters Example
                          </AnchorHeading>
                          <CodeBlock
                            code={`// Apply multiple filters at once
const combinedFilters = [
  {
    id: 'highValueRecent',
    label: 'High Value Recent',
    icon: '💎',
    description: 'Amount > $500 in last 30 days',
    onSelect: (api) => {
      api.setFilterModel({
        date: {
          mode: 'relative',
          type: 'inRange',
          expressionFrom: 'Today-30d',
          expressionTo: 'Today'
        },
        amount: {
          type: 'greaterThan',
          filter: 500
        }
      });
    }
  }
];

<QuickFilterDropdown
  api={gridApi}
  options={combinedFilters}
  placeholder="Quick filters"
/>`}
                            language="tsx"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Demo Guide Section */}
                {activeDocSection === "demo-guide" && (
                  <div className="space-y-8">
                    <div>
                      <AnchorHeading level={1} id="demo-guide">
                        Demo Guide
                      </AnchorHeading>
                      <p className="text-gray-300 mb-6">
                        This interactive demo showcases all the features of AG
                        Grid React Components. You can explore the components,
                        test different configurations, and see the code in
                        action.
                      </p>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                          <AnchorHeading
                            level={3}
                            id="online-demo"
                            className="text-lg font-semibold text-indigo-400 mb-3"
                          >
                            Online Demo
                          </AnchorHeading>
                          <p className="text-gray-300 mb-4">
                            Visit our live demo to see all components in action
                            without any setup.
                          </p>
                          <a
                            href="https://demo.rozich.net/ag-grid-react-components/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-indigo-400 hover:text-indigo-300"
                          >
                            Open Live Demo →
                          </a>
                        </div>
                        <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                          <AnchorHeading
                            level={3}
                            id="local-development"
                            className="text-lg font-semibold text-indigo-400 mb-3"
                          >
                            Local Development
                          </AnchorHeading>
                          <p className="text-gray-300 mb-4">
                            Run the demo locally to explore the source code and
                            make modifications.
                          </p>
                          <button
                            onClick={() =>
                              setActiveDocSection("running-locally")
                            }
                            className="text-indigo-400 hover:text-indigo-300"
                          >
                            View Instructions →
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Running Locally */}
                {activeDocSection === "running-locally" && (
                  <div className="space-y-8">
                    <div>
                      <AnchorHeading level={1} id="running-locally">
                        Running Locally
                      </AnchorHeading>
                      <p className="text-gray-300 mb-6">
                        Follow these steps to run the demo on your local
                        machine.
                      </p>

                      <div className="space-y-6">
                        <div>
                          <AnchorHeading level={3} id="clone-repository">
                            1. Clone the Repository
                          </AnchorHeading>
                          <CodeBlock
                            code={`git clone https://github.com/ryanrozich/ag-grid-react-components.git
cd ag-grid-react-components`}
                            language="bash"
                          />
                        </div>

                        <div>
                          <AnchorHeading level={3} id="install-dependencies">
                            2. Install Dependencies
                          </AnchorHeading>
                          <CodeBlock code={`npm install`} language="bash" />
                        </div>

                        <div>
                          <AnchorHeading
                            level={3}
                            id="start-development-server"
                          >
                            3. Start Development Server
                          </AnchorHeading>
                          <CodeBlock
                            code={`npm run dev

# Or run with quality checks first
npm run dev:safe`}
                            language="bash"
                          />
                          <p className="text-sm text-gray-400 mt-2">
                            The demo will open at{" "}
                            <code className="text-indigo-300">
                              http://localhost:5173
                            </code>
                          </p>
                        </div>

                        <div>
                          <AnchorHeading level={3} id="available-scripts">
                            Available Scripts
                          </AnchorHeading>
                          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                            <dl className="space-y-3">
                              <div>
                                <dt className="text-indigo-400 font-mono text-sm">
                                  npm run dev
                                </dt>
                                <dd className="text-gray-300 text-sm ml-4">
                                  Start development server
                                </dd>
                              </div>
                              <div>
                                <dt className="text-indigo-400 font-mono text-sm">
                                  npm run build
                                </dt>
                                <dd className="text-gray-300 text-sm ml-4">
                                  Build the library for production
                                </dd>
                              </div>
                              <div>
                                <dt className="text-indigo-400 font-mono text-sm">
                                  npm test
                                </dt>
                                <dd className="text-gray-300 text-sm ml-4">
                                  Run all tests
                                </dd>
                              </div>
                              <div>
                                <dt className="text-indigo-400 font-mono text-sm">
                                  npm run test:watch
                                </dt>
                                <dd className="text-gray-300 text-sm ml-4">
                                  Run tests in watch mode
                                </dd>
                              </div>
                              <div>
                                <dt className="text-indigo-400 font-mono text-sm">
                                  npm run lint
                                </dt>
                                <dd className="text-gray-300 text-sm ml-4">
                                  Run ESLint
                                </dd>
                              </div>
                              <div>
                                <dt className="text-indigo-400 font-mono text-sm">
                                  npm run format
                                </dt>
                                <dd className="text-gray-300 text-sm ml-4">
                                  Format code with Prettier
                                </dd>
                              </div>
                            </dl>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Demo Features */}
                {activeDocSection === "demo-features" && (
                  <div className="space-y-8">
                    <div>
                      <AnchorHeading level={1} id="demo-features">
                        Demo Features
                      </AnchorHeading>
                      <p className="text-gray-300 mb-6">
                        The demo application showcases all components with
                        interactive examples and real-time code snippets.
                      </p>

                      <div className="space-y-6">
                        <div>
                          <AnchorHeading level={3} id="interactive-components">
                            Interactive Components
                          </AnchorHeading>
                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
                              <AnchorHeading
                                level={4}
                                id="date-filter-tab"
                                className="text-indigo-400 font-semibold mb-2"
                              >
                                Date Filter Tab
                              </AnchorHeading>
                              <ul className="space-y-1 text-sm text-gray-300">
                                <li>
                                  • Toggle between absolute/relative modes
                                </li>
                                <li>• Test all filter operations</li>
                                <li>• Try different date expressions</li>
                                <li>• See real-time validation</li>
                              </ul>
                            </div>
                            <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
                              <AnchorHeading
                                level={4}
                                id="quick-filter-tab"
                                className="text-indigo-400 font-semibold mb-2"
                              >
                                Quick Filter Tab
                              </AnchorHeading>
                              <ul className="space-y-1 text-sm text-gray-300">
                                <li>• Pre-configured date ranges</li>
                                <li>• Combined filter examples</li>
                                <li>• Custom filter presets</li>
                                <li>• Multi-column filtering</li>
                              </ul>
                            </div>
                            <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
                              <AnchorHeading
                                level={4}
                                id="url-state-tab"
                                className="text-indigo-400 font-semibold mb-2"
                              >
                                URL State Tab
                              </AnchorHeading>
                              <ul className="space-y-1 text-sm text-gray-300">
                                <li>• Automatic URL updates</li>
                                <li>• Browser history support</li>
                                <li>• Shareable filter links</li>
                                <li>• State persistence demo</li>
                              </ul>
                            </div>
                            <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
                              <AnchorHeading
                                level={4}
                                id="grid-features"
                                className="text-indigo-400 font-semibold mb-2"
                              >
                                Grid Features
                              </AnchorHeading>
                              <ul className="space-y-1 text-sm text-gray-300">
                                <li>
                                  • 1000 realistic software development records
                                </li>
                                <li>• Multiple column types and renderers</li>
                                <li>• Sorting, filtering, and pagination</li>
                                <li>• Enterprise features when available</li>
                              </ul>
                            </div>
                          </div>
                        </div>

                        <div>
                          <AnchorHeading level={3} id="custom-cell-renderers">
                            Custom Cell Renderers
                          </AnchorHeading>
                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
                              <AnchorHeading
                                level={4}
                                id="avatar-cell-renderer"
                                className="text-indigo-400 font-semibold mb-2"
                              >
                                Avatar Cell Renderer
                              </AnchorHeading>
                              <p className="text-sm text-gray-300 mb-2">
                                Displays user avatars for assignees using the{" "}
                                <a
                                  href="https://ui-avatars.com/"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-400 hover:underline"
                                >
                                  UI Avatars API
                                </a>
                                .
                              </p>
                              <ul className="space-y-1 text-sm text-gray-300">
                                <li>• Generates avatars from user initials</li>
                                <li>• Consistent color scheme per user</li>
                                <li>• Handles missing assignees gracefully</li>
                                <li>
                                  • See implementation in{" "}
                                  <code className="text-xs bg-gray-800 px-1 py-0.5 rounded">
                                    src/demo/config/columnDefs.ts
                                  </code>
                                </li>
                              </ul>
                            </div>
                            <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
                              <AnchorHeading
                                level={4}
                                id="category-pills-renderer"
                                className="text-indigo-400 font-semibold mb-2"
                              >
                                Category Pills Renderer
                              </AnchorHeading>
                              <p className="text-sm text-gray-300 mb-2">
                                Displays categories as color-coded pills for
                                better visual identification.
                              </p>
                              <ul className="space-y-1 text-sm text-gray-300">
                                <li>• Color-coded by category type</li>
                                <li>• Rounded pill design with tailwind</li>
                                <li>• Supports 6 distinct categories</li>
                                <li>• Improves data scanability</li>
                              </ul>
                            </div>
                          </div>
                        </div>

                        <div>
                          <AnchorHeading level={3} id="aggregation-features">
                            Aggregation Features{" "}
                            <span className="text-xs bg-blue-600 px-2 py-1 rounded ml-2">
                              Enterprise
                            </span>
                          </AnchorHeading>
                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
                              <AnchorHeading
                                level={4}
                                id="grand-total-row"
                                className="text-indigo-400 font-semibold mb-2"
                              >
                                Grand Total Row
                              </AnchorHeading>
                              <p className="text-sm text-gray-300 mb-2">
                                Displays aggregated totals at the bottom of the
                                grid. See{" "}
                                <a
                                  href="https://www.ag-grid.com/react-data-grid/aggregation/#grand-total-row"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-400 hover:underline"
                                >
                                  AG Grid docs
                                </a>
                                .
                              </p>
                              <ul className="space-y-1 text-sm text-gray-300">
                                <li>• Shows sum of all values</li>
                                <li>• Count of total records</li>
                                <li>• MIN/MAX dates with formatting</li>
                                <li>• Pinned to bottom for visibility</li>
                              </ul>
                            </div>
                            <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
                              <AnchorHeading
                                level={4}
                                id="group-totals"
                                className="text-indigo-400 font-semibold mb-2"
                              >
                                Group Totals
                              </AnchorHeading>
                              <p className="text-sm text-gray-300 mb-2">
                                When row grouping is enabled, see subtotals for
                                each group.
                              </p>
                              <ul className="space-y-1 text-sm text-gray-300">
                                <li>• Automatic aggregation per group</li>
                                <li>• Supports sum, count, min, max</li>
                                <li>• Custom formatters for dates</li>
                                <li>• Try grouping by Status or Priority</li>
                              </ul>
                            </div>
                          </div>
                          <div className="mt-4 bg-yellow-900/20 border border-yellow-600/30 rounded-lg p-4">
                            <p className="text-sm text-yellow-200">
                              <strong>Note:</strong> Aggregation features
                              require AG Grid Enterprise. The demo detects and
                              enables these features automatically when
                              Enterprise is available.
                            </p>
                          </div>
                        </div>

                        <div>
                          <AnchorHeading level={3} id="sample-data">
                            Sample Data
                          </AnchorHeading>
                          <p className="text-gray-300 mb-4">
                            The demo uses 1000 rows of realistic software
                            development data including tasks, bugs, features,
                            and more.
                          </p>
                          <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
                            <AnchorHeading
                              level={4}
                              id="sample-record"
                              className="text-gray-400 text-sm font-mono mb-2"
                            >
                              Sample Record:
                            </AnchorHeading>
                            <CodeBlock
                              code={`{
  id: 1,
  name: "Implement user authentication",
  category: "Feature",
  status: "In Progress",
  priority: "High",
  assignee: "John Smith",
  created: "2024-03-15T10:30:00Z",
  updated: "2024-03-16T14:22:00Z",
  dueDate: "2024-03-20T17:00:00Z",
  completedDate: null,
  estimatedHours: 16,
  actualHours: 8.5,
  value: 2500.00
}`}
                              language="json"
                            />
                          </div>
                        </div>

                        <div>
                          <AnchorHeading level={3} id="implementation-details">
                            Implementation Details
                          </AnchorHeading>
                          <div className="space-y-4">
                            <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
                              <AnchorHeading
                                level={4}
                                id="avatar-cell-renderer-example"
                                className="text-gray-400 text-sm font-mono mb-2"
                              >
                                Avatar Cell Renderer Example:
                              </AnchorHeading>
                              <CodeBlock
                                code={`cellRenderer: (params: any) => {
  if (!params.value) return '';
  const initials = params.value.split(' ')
    .map((n: string) => n[0])
    .join('')
    .toUpperCase();
  const bgColor = \`hsl(\${params.value.charCodeAt(0) * 3 % 360}, 70%, 50%)\`;
  
  return \`<div class="flex items-center gap-2">
    <img src="https://ui-avatars.com/api/?name=\${initials}&background=\${bgColor.slice(4, -1)}&color=fff&size=32&rounded=true" 
         alt="\${params.value}" 
         class="w-8 h-8 rounded-full" />
    <span>\${params.value}</span>
  </div>\`;
}`}
                                language="javascript"
                              />
                            </div>
                            <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
                              <AnchorHeading
                                level={4}
                                id="grand-total-configuration"
                                className="text-gray-400 text-sm font-mono mb-2"
                              >
                                Grand Total Configuration:
                              </AnchorHeading>
                              <CodeBlock
                                code={`const gridOptions = {
  // Enable grand total row (Enterprise feature)
  grandTotalRow: 'bottom',
  
  // Configure aggregations per column
  columnDefs: [
    {
      field: 'value',
      aggFunc: 'sum',
      valueFormatter: (params) => params.value?.toFixed(2) || ''
    },
    {
      field: 'created',
      aggFunc: 'min',
      valueFormatter: (params) => {
        if (params.node?.rowPinned) {
          return params.value ? 
            \`MIN: \${format(new Date(params.value), 'MMM d, yyyy')}\` : '';
        }
        return formatDate(params.value);
      }
    }
  ]
};`}
                                language="javascript"
                              />
                            </div>
                          </div>
                        </div>

                        <div>
                          <AnchorHeading level={3} id="try-these-actions">
                            Try These Actions
                          </AnchorHeading>
                          <ol className="space-y-3 text-gray-300">
                            <li className="flex items-start">
                              <span className="text-indigo-400 font-semibold mr-2">
                                1.
                              </span>
                              <div>
                                <strong>Date Filtering:</strong> Click the Date
                                column filter and try "Today-7d"
                              </div>
                            </li>
                            <li className="flex items-start">
                              <span className="text-indigo-400 font-semibold mr-2">
                                2.
                              </span>
                              <div>
                                <strong>Quick Filters:</strong> Use the dropdown
                                to apply "Last 7 Days"
                              </div>
                            </li>
                            <li className="flex items-start">
                              <span className="text-indigo-400 font-semibold mr-2">
                                3.
                              </span>
                              <div>
                                <strong>Combined Filters:</strong> Try "High
                                Value Recent" to see multi-column filtering
                              </div>
                            </li>
                            <li className="flex items-start">
                              <span className="text-indigo-400 font-semibold mr-2">
                                4.
                              </span>
                              <div>
                                <strong>URL State:</strong> Apply filters and
                                copy the URL to share the view
                              </div>
                            </li>
                          </ol>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* References Section */}
                {activeDocSection === "references" && (
                  <div className="space-y-8">
                    <div>
                      <AnchorHeading level={1} id="references">
                        References
                      </AnchorHeading>
                      <p className="text-gray-300 mb-6">
                        Technical references and resources for AG Grid React
                        Components.
                      </p>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                          <AnchorHeading
                            level={3}
                            id="quick-links"
                            className="text-lg font-semibold text-indigo-400 mb-3"
                          >
                            Quick Links
                          </AnchorHeading>
                          <ul className="space-y-2 text-sm">
                            <li>
                              <a
                                href="https://github.com/ryanrozich/ag-grid-react-components"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-300 hover:text-white"
                              >
                                📦 GitHub Repository
                              </a>
                            </li>
                            <li>
                              <a
                                href="https://www.npmjs.com/package/ag-grid-react-components"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-300 hover:text-white"
                              >
                                📦 NPM Package
                              </a>
                            </li>
                            <li>
                              <a
                                href="https://www.ag-grid.com/react-data-grid/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-300 hover:text-white"
                              >
                                📖 AG Grid Documentation
                              </a>
                            </li>
                            <li>
                              <a
                                href="https://date-fns.org/docs/Getting-Started"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-300 hover:text-white"
                              >
                                📅 date-fns Documentation
                              </a>
                            </li>
                          </ul>
                        </div>
                        <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                          <AnchorHeading
                            level={3}
                            id="topic-guides"
                            className="text-lg font-semibold text-indigo-400 mb-3"
                          >
                            Topic Guides
                          </AnchorHeading>
                          <ul className="space-y-2 text-sm">
                            <li>
                              <button
                                onClick={() =>
                                  setActiveDocSection("expressions")
                                }
                                className="text-gray-300 hover:text-white"
                              >
                                📅 Date Expressions Reference
                              </button>
                            </li>
                            <li>
                              <button
                                onClick={() => setActiveDocSection("types")}
                                className="text-gray-300 hover:text-white"
                              >
                                📝 TypeScript Types
                              </button>
                            </li>
                            <li>
                              <button
                                onClick={() => setActiveDocSection("urlstate")}
                                className="text-gray-300 hover:text-white"
                              >
                                🔗 URL State Persistence
                              </button>
                            </li>
                            <li>
                              <button
                                onClick={() =>
                                  setActiveDocSection("date-vs-timestamp")
                                }
                                className="text-gray-300 hover:text-white"
                              >
                                🕒 Date vs Timestamp Filtering
                              </button>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* URL State */}
                {activeDocSection === "urlstate" && (
                  <div className="space-y-8">
                    <div>
                      <AnchorHeading level={1} id="url-state-persistence">
                        URL State Persistence
                      </AnchorHeading>
                      <p className="text-gray-300 mb-6">
                        Automatically sync filter state with the URL for
                        shareable links and browser history support.
                      </p>

                      <div className="space-y-8">
                        <div>
                          <AnchorHeading level={3} id="url-state-basic-usage">
                            Basic Usage
                          </AnchorHeading>
                          <CodeBlock
                            code={`import { setupFilterStatePersistence } from 'ag-grid-react-components';

const onGridReady = (params) => {
  const cleanup = setupFilterStatePersistence(params.api, {
    onFilterLoad: (model) => {
      console.log('Filters loaded from URL:', model);
    },
    onFilterSave: (model) => {
      console.log('Filters saved to URL:', model);
    }
  });

  // Clean up on component unmount
  return cleanup;
};`}
                            language="typescript"
                          />
                        </div>

                        <div>
                          <AnchorHeading
                            level={3}
                            id="url-state-configuration-options"
                          >
                            Configuration Options
                          </AnchorHeading>
                          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                            <table className="w-full text-sm">
                              <thead>
                                <tr className="border-b border-gray-700">
                                  <th className="text-left py-2 text-gray-300">
                                    Parameter
                                  </th>
                                  <th className="text-left py-2 text-gray-300">
                                    Type
                                  </th>
                                  <th className="text-left py-2 text-gray-300">
                                    Required
                                  </th>
                                  <th className="text-left py-2 text-gray-300">
                                    Default
                                  </th>
                                  <th className="text-left py-2 text-gray-300">
                                    Description
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="text-gray-400">
                                <tr className="border-b border-gray-800">
                                  <td className="py-3">onFilterLoad</td>
                                  <td className="py-3">function</td>
                                  <td className="py-3">No</td>
                                  <td className="py-3">-</td>
                                  <td className="py-3">
                                    Called when filters are loaded from URL
                                  </td>
                                </tr>
                                <tr className="border-b border-gray-800">
                                  <td className="py-3">onFilterSave</td>
                                  <td className="py-3">function</td>
                                  <td className="py-3">No</td>
                                  <td className="py-3">-</td>
                                  <td className="py-3">
                                    Called when filters are saved to URL
                                  </td>
                                </tr>
                                <tr>
                                  <td className="py-3">parameterName</td>
                                  <td className="py-3">string</td>
                                  <td className="py-3">No</td>
                                  <td className="py-3">'filters'</td>
                                  <td className="py-3">URL parameter name</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>

                        <div>
                          <AnchorHeading level={3} id="url-state-full-example">
                            Full Example
                          </AnchorHeading>
                          <CodeBlock
                            code={`import React, { useState, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { setupFilterStatePersistence } from 'ag-grid-react-components';

function MyGrid() {
  const [filterModel, setFilterModel] = useState({});

  const onGridReady = useCallback((params) => {
    // Set up URL persistence
    const cleanup = setupFilterStatePersistence(params.api, {
      onFilterLoad: (model) => {
        console.log('Loaded filters:', model);
        setFilterModel(model);
      },
      onFilterSave: (model) => {
        console.log('Saved filters:', model);
        setFilterModel(model);
      },
      parameterName: 'myFilters' // Custom URL parameter
    });

    // Listen for filter changes
    params.api.addEventListener('filterChanged', () => {
      const model = params.api.getFilterModel();
      setFilterModel(model || {});
    });

    // Return cleanup function
    return cleanup;
  }, []);

  return (
    <div>
      <div>Current filters: {JSON.stringify(filterModel)}</div>
      <AgGridReact onGridReady={onGridReady} ... />
    </div>
  );
}`}
                            language="tsx"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* TypeScript Types */}
                {activeDocSection === "types" && (
                  <div className="space-y-8">
                    <div>
                      <AnchorHeading level={1} id="typescript-types">
                        TypeScript Types
                      </AnchorHeading>
                      <p className="text-gray-300 mb-6">
                        Complete TypeScript type definitions for all components
                        and utilities.
                      </p>

                      <div className="space-y-8">
                        <div>
                          <AnchorHeading level={3} id="filter-model-types">
                            Filter Model Types
                          </AnchorHeading>
                          <CodeBlock
                            code={`// RelativeDateFilter model structure
interface DateFilterModel {
  mode: 'absolute' | 'relative';
  type: 'equals' | 'before' | 'after' | 'inRange' | 'blank' | 'notBlank';
  
  // For absolute mode
  dateFrom?: Date | null;
  dateTo?: Date | null;
  
  // For relative mode
  expressionFrom?: string;
  expressionTo?: string;
}

// Example filter models
const absoluteFilter: DateFilterModel = {
  mode: 'absolute',
  type: 'inRange',
  dateFrom: new Date('2024-01-01'),
  dateTo: new Date('2024-12-31')
};

const relativeFilter: DateFilterModel = {
  mode: 'relative',
  type: 'inRange',
  expressionFrom: 'Today-7d',
  expressionTo: 'Today'
};`}
                            language="typescript"
                          />
                          <p className="text-sm text-gray-400 mt-2">
                            View full type definitions on{" "}
                            <a
                              href="https://github.com/ryanrozich/ag-grid-react-components/blob/main/src/components/DateFilter/types/index.ts"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-indigo-400 hover:text-indigo-300"
                            >
                              GitHub
                            </a>
                          </p>
                        </div>

                        <div>
                          <AnchorHeading
                            level={3}
                            id="quick-filter-dropdown-types"
                          >
                            QuickFilterDropdown Types
                          </AnchorHeading>
                          <CodeBlock
                            code={`interface QuickFilterOption {
  id: string;
  label: string;
  icon?: string;
  description?: string;
  filterModel?: any;  // Column-specific filter model
  onSelect?: (api: GridApi) => void;  // Custom handler
}

interface QuickFilterDropdownProps {
  api: GridApi;
  columnId?: string;  // Required unless using onSelect
  options: QuickFilterOption[];
  placeholder?: string;
  showDescriptions?: boolean;
  className?: string;
  onFilterChange?: (option: QuickFilterOption | null) => void;
}`}
                            language="typescript"
                          />
                        </div>

                        <div>
                          <AnchorHeading
                            level={3}
                            id="url-state-persistence-types"
                          >
                            URL State Persistence Types
                          </AnchorHeading>
                          <CodeBlock
                            code={`interface FilterStatePersistenceOptions {
  onFilterLoad?: (filterModel: any) => void;
  onFilterSave?: (filterModel: any) => void;
  parameterName?: string;  // Default: 'filters'
}

// Usage
function setupFilterStatePersistence(
  api: GridApi,
  options?: FilterStatePersistenceOptions
): () => void;  // Returns cleanup function`}
                            language="typescript"
                          />
                        </div>

                        <div>
                          <AnchorHeading level={3} id="date-expression-types">
                            Date Expression Types
                          </AnchorHeading>
                          <CodeBlock
                            code={`// Valid date anchors
type DateAnchor = 
  | 'Today' 
  | 'Now' 
  | 'StartOfWeek' 
  | 'EndOfWeek'
  | 'StartOfMonth' 
  | 'EndOfMonth'
  | 'StartOfYear' 
  | 'EndOfYear';

// Valid time units
type TimeUnit = 'd' | 'w' | 'M' | 'y' | 'h' | 'm';

// Expression validation
function isValidDateExpression(expression: string): boolean;
function parseDateExpression(expression: string): ParseResult;
function resolveDateExpression(expression: string): Date | null;`}
                            language="typescript"
                          />
                        </div>

                        <div>
                          <AnchorHeading
                            level={3}
                            id="ag-grid-integration-types"
                          >
                            AG Grid Integration Types
                          </AnchorHeading>
                          <CodeBlock
                            code={`// Filter params interface
interface RelativeDateFilterParams extends IDateFilterParams {
  buttons?: FilterButtonType[];
  closeOnApply?: boolean;
  includeBlanksInEquals?: boolean;
  includeBlanksInLessThan?: boolean;
  includeBlanksInGreaterThan?: boolean;
  includeBlanksInRange?: boolean;
}

// Component interfaces
interface IRelativeDateFilter extends IFilter {
  // AG Grid required methods
  doesFilterPass(params: IDoesFilterPassParams): boolean;
  getModel(): DateFilterModel | null;
  setModel(model: DateFilterModel | null): void;
  
  // Optional AG Grid methods
  afterGuiAttached?(): void;
  onNewRowsLoaded?(): void;
}`}
                            language="typescript"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Date vs Timestamp */}
                {activeDocSection === "date-vs-timestamp" && (
                  <div className="space-y-8">
                    <div>
                      <AnchorHeading level={1} id="date-vs-timestamp-filtering">
                        Date vs Timestamp Filtering
                      </AnchorHeading>
                      <p className="text-gray-300 mb-6">
                        Understanding how the RelativeDateFilter handles
                        different date formats and time components.
                      </p>

                      <div className="space-y-6">
                        <div>
                          <AnchorHeading level={3} id="date-handling">
                            Date Handling
                          </AnchorHeading>
                          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                            <p className="text-gray-300 mb-4">
                              The RelativeDateFilter intelligently handles both
                              date-only and timestamp values:
                            </p>
                            <ul className="space-y-3 text-gray-300">
                              <li className="flex items-start">
                                <span className="text-indigo-400 mr-2">•</span>
                                <div>
                                  <strong>Date-only values:</strong> Compared at
                                  midnight (00:00:00)
                                  <div className="text-sm text-gray-400 mt-1">
                                    Example: "2024-03-15" is treated as
                                    "2024-03-15T00:00:00"
                                  </div>
                                </div>
                              </li>
                              <li className="flex items-start">
                                <span className="text-indigo-400 mr-2">•</span>
                                <div>
                                  <strong>Timestamp values:</strong> Compared
                                  with full precision
                                  <div className="text-sm text-gray-400 mt-1">
                                    Example: "2024-03-15T14:30:00Z" preserves
                                    the exact time
                                  </div>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>

                        <div>
                          <AnchorHeading level={3} id="filter-behavior">
                            Filter Behavior
                          </AnchorHeading>
                          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                            <table className="w-full text-sm">
                              <thead>
                                <tr className="border-b border-gray-700">
                                  <th className="text-left py-2 text-gray-300">
                                    Filter Type
                                  </th>
                                  <th className="text-left py-2 text-gray-300">
                                    Date Handling
                                  </th>
                                  <th className="text-left py-2 text-gray-300">
                                    Example
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="text-gray-400">
                                <tr className="border-b border-gray-800">
                                  <td className="py-3">Equals</td>
                                  <td className="py-3">
                                    Matches entire day if date-only
                                  </td>
                                  <td className="py-3">
                                    "2024-03-15" matches any time on that day
                                  </td>
                                </tr>
                                <tr className="border-b border-gray-800">
                                  <td className="py-3">Before</td>
                                  <td className="py-3">
                                    Exclusive of the date
                                  </td>
                                  <td className="py-3">
                                    &lt; "2024-03-15" means before midnight
                                  </td>
                                </tr>
                                <tr className="border-b border-gray-800">
                                  <td className="py-3">After</td>
                                  <td className="py-3">
                                    Exclusive of the date
                                  </td>
                                  <td className="py-3">
                                    &gt; "2024-03-15" means after 23:59:59
                                  </td>
                                </tr>
                                <tr>
                                  <td className="py-3">In Range</td>
                                  <td className="py-3">
                                    Inclusive of both dates
                                  </td>
                                  <td className="py-3">
                                    "2024-03-01" to "2024-03-31" includes entire
                                    March
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>

                        <div>
                          <AnchorHeading
                            level={3}
                            id="relative-expression-time-handling"
                          >
                            Relative Expression Time Handling
                          </AnchorHeading>
                          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                            <p className="text-gray-300 mb-4">
                              Relative expressions handle time components
                              differently based on the anchor:
                            </p>
                            <table className="w-full text-sm">
                              <thead>
                                <tr className="border-b border-gray-700">
                                  <th className="text-left py-2 text-gray-300">
                                    Expression
                                  </th>
                                  <th className="text-left py-2 text-gray-300">
                                    Time Component
                                  </th>
                                  <th className="text-left py-2 text-gray-300">
                                    Result
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="text-gray-400">
                                <tr className="border-b border-gray-800">
                                  <td className="py-3 font-mono text-green-400">
                                    Today
                                  </td>
                                  <td className="py-3">00:00:00</td>
                                  <td className="py-3">Start of current day</td>
                                </tr>
                                <tr className="border-b border-gray-800">
                                  <td className="py-3 font-mono text-green-400">
                                    Now
                                  </td>
                                  <td className="py-3">Current time</td>
                                  <td className="py-3">
                                    Exact current timestamp
                                  </td>
                                </tr>
                                <tr className="border-b border-gray-800">
                                  <td className="py-3 font-mono text-green-400">
                                    Today-7d
                                  </td>
                                  <td className="py-3">00:00:00</td>
                                  <td className="py-3">
                                    7 days ago at midnight
                                  </td>
                                </tr>
                                <tr className="border-b border-gray-800">
                                  <td className="py-3 font-mono text-green-400">
                                    Now-3h
                                  </td>
                                  <td className="py-3">Current time - 3h</td>
                                  <td className="py-3">Exactly 3 hours ago</td>
                                </tr>
                                <tr className="border-b border-gray-800">
                                  <td className="py-3 font-mono text-green-400">
                                    StartOfMonth
                                  </td>
                                  <td className="py-3">00:00:00</td>
                                  <td className="py-3">
                                    First day of month at midnight
                                  </td>
                                </tr>
                                <tr>
                                  <td className="py-3 font-mono text-green-400">
                                    EndOfMonth
                                  </td>
                                  <td className="py-3">23:59:59.999</td>
                                  <td className="py-3">
                                    Last moment of the month
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>

                        <div>
                          <AnchorHeading level={3} id="best-practices">
                            Best Practices
                          </AnchorHeading>
                          <div className="bg-indigo-900/20 border border-indigo-600/30 rounded-lg p-6">
                            <AnchorHeading
                              level={4}
                              id="recommendations"
                              className="text-indigo-400 font-semibold mb-3"
                            >
                              Recommendations
                            </AnchorHeading>
                            <ul className="space-y-2 text-gray-300">
                              <li className="flex items-start">
                                <span className="text-indigo-400 mr-2">💡</span>
                                <div>
                                  <strong>Date-only data:</strong> Use "Today"
                                  for current date comparisons
                                </div>
                              </li>
                              <li className="flex items-start">
                                <span className="text-indigo-400 mr-2">💡</span>
                                <div>
                                  <strong>Timestamp data:</strong> Use "Now" for
                                  precise time comparisons
                                </div>
                              </li>
                              <li className="flex items-start">
                                <span className="text-indigo-400 mr-2">💡</span>
                                <div>
                                  <strong>Range filters:</strong> Be aware that
                                  ranges are inclusive
                                </div>
                              </li>
                              <li className="flex items-start">
                                <span className="text-indigo-400 mr-2">💡</span>
                                <div>
                                  <strong>Time zones:</strong> Ensure consistent
                                  timezone handling in your data
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>

                        <div>
                          <AnchorHeading level={3} id="code-example">
                            Code Example
                          </AnchorHeading>
                          <CodeBlock
                            code={`// Configure column for date-only filtering
const dateOnlyColumn = {
  field: 'orderDate',
  filter: RelativeDateFilter,
  valueFormatter: (params) => {
    // Display date only
    return new Date(params.value).toLocaleDateString();
  }
};

// Configure column for timestamp filtering
const timestampColumn = {
  field: 'createdAt',
  filter: RelativeDateFilter,
  valueFormatter: (params) => {
    // Display full timestamp
    return new Date(params.value).toLocaleString();
  }
};

// Filter examples
const dateOnlyFilter = {
  mode: 'relative',
  type: 'equals',
  expressionFrom: 'Today'  // Matches all records from today
};

const timestampFilter = {
  mode: 'relative',
  type: 'after',
  expressionFrom: 'Now-1h'  // Records from last hour
};`}
                            language="typescript"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Expressions */}
                {activeDocSection === "expressions" && (
                  <div className="space-y-8">
                    <div>
                      <AnchorHeading level={1} id="date-expressions">
                        Date Expressions
                      </AnchorHeading>
                      <p className="text-gray-300 mb-6">
                        Comprehensive guide to relative date expressions
                        supported by the filter.
                      </p>

                      <div className="space-y-8">
                        <div>
                          <AnchorHeading level={3} id="expression-syntax">
                            Expression Syntax
                          </AnchorHeading>
                          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                            <p className="text-gray-300 mb-4">
                              Expressions follow the pattern:{" "}
                              <code className="text-indigo-400">
                                [Anchor][Operator][Value][Unit]
                              </code>
                            </p>
                            <ul className="space-y-2 text-gray-300">
                              <li>
                                <strong>Anchor:</strong> Starting point (Today,
                                StartOfMonth, etc.)
                              </li>
                              <li>
                                <strong>Operator:</strong> + (add) or -
                                (subtract)
                              </li>
                              <li>
                                <strong>Value:</strong> Numeric value
                              </li>
                              <li>
                                <strong>Unit:</strong> Time unit (d, w, M, y, h,
                                m)
                              </li>
                            </ul>
                          </div>
                        </div>

                        <div>
                          <AnchorHeading level={3} id="supported-anchors">
                            Supported Anchors
                          </AnchorHeading>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
                              <AnchorHeading
                                level={4}
                                id="current-time"
                                className="text-indigo-400 font-semibold mb-2"
                              >
                                Current Time
                              </AnchorHeading>
                              <ul className="space-y-1 text-sm text-gray-300">
                                <li>
                                  <code className="text-green-400">Today</code>{" "}
                                  - Current date at midnight
                                </li>
                                <li>
                                  <code className="text-green-400">Now</code> -
                                  Current date and time
                                </li>
                              </ul>
                            </div>
                            <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
                              <AnchorHeading
                                level={4}
                                id="period-boundaries"
                                className="text-indigo-400 font-semibold mb-2"
                              >
                                Period Boundaries
                              </AnchorHeading>
                              <ul className="space-y-1 text-sm text-gray-300">
                                <li>
                                  <code className="text-green-400">
                                    StartOfWeek
                                  </code>{" "}
                                  - Monday (configurable)
                                </li>
                                <li>
                                  <code className="text-green-400">
                                    EndOfWeek
                                  </code>{" "}
                                  - Sunday
                                </li>
                                <li>
                                  <code className="text-green-400">
                                    StartOfMonth
                                  </code>{" "}
                                  - First day
                                </li>
                                <li>
                                  <code className="text-green-400">
                                    EndOfMonth
                                  </code>{" "}
                                  - Last day
                                </li>
                                <li>
                                  <code className="text-green-400">
                                    StartOfYear
                                  </code>{" "}
                                  - January 1st
                                </li>
                                <li>
                                  <code className="text-green-400">
                                    EndOfYear
                                  </code>{" "}
                                  - December 31st
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>

                        <div>
                          <AnchorHeading level={3} id="time-units">
                            Time Units
                          </AnchorHeading>
                          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                            <table className="w-full text-sm">
                              <thead>
                                <tr className="border-b border-gray-700">
                                  <th className="text-left py-2 text-gray-300">
                                    Unit
                                  </th>
                                  <th className="text-left py-2 text-gray-300">
                                    Symbol
                                  </th>
                                  <th className="text-left py-2 text-gray-300">
                                    Example
                                  </th>
                                  <th className="text-left py-2 text-gray-300">
                                    Result
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="text-gray-400">
                                <tr className="border-b border-gray-800">
                                  <td className="py-3">Days</td>
                                  <td className="py-3">d</td>
                                  <td className="py-3">
                                    <code className="text-green-400">
                                      Today-7d
                                    </code>
                                  </td>
                                  <td className="py-3">7 days ago</td>
                                </tr>
                                <tr className="border-b border-gray-800">
                                  <td className="py-3">Weeks</td>
                                  <td className="py-3">w</td>
                                  <td className="py-3">
                                    <code className="text-green-400">
                                      Today+2w
                                    </code>
                                  </td>
                                  <td className="py-3">2 weeks from today</td>
                                </tr>
                                <tr className="border-b border-gray-800">
                                  <td className="py-3">Months</td>
                                  <td className="py-3">M</td>
                                  <td className="py-3">
                                    <code className="text-green-400">
                                      StartOfMonth-1M
                                    </code>
                                  </td>
                                  <td className="py-3">Start of last month</td>
                                </tr>
                                <tr className="border-b border-gray-800">
                                  <td className="py-3">Years</td>
                                  <td className="py-3">y</td>
                                  <td className="py-3">
                                    <code className="text-green-400">
                                      StartOfYear+1y
                                    </code>
                                  </td>
                                  <td className="py-3">Start of next year</td>
                                </tr>
                                <tr className="border-b border-gray-800">
                                  <td className="py-3">Hours</td>
                                  <td className="py-3">h</td>
                                  <td className="py-3">
                                    <code className="text-green-400">
                                      Now-3h
                                    </code>
                                  </td>
                                  <td className="py-3">3 hours ago</td>
                                </tr>
                                <tr>
                                  <td className="py-3">Minutes</td>
                                  <td className="py-3">m</td>
                                  <td className="py-3">
                                    <code className="text-green-400">
                                      Now+30m
                                    </code>
                                  </td>
                                  <td className="py-3">30 minutes from now</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>

                        <div>
                          <AnchorHeading
                            level={3}
                            id="start-of-week-configuration"
                          >
                            Start of Week Configuration
                          </AnchorHeading>
                          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                            <p className="text-gray-300 mb-4">
                              By default,{" "}
                              <code className="text-indigo-400">
                                StartOfWeek
                              </code>{" "}
                              returns Monday (ISO 8601 standard). This is
                              currently not configurable but follows the
                              international standard.
                            </p>
                            <p className="text-gray-300">
                              The week starts on Monday (day 1) and ends on
                              Sunday (day 7).
                            </p>
                          </div>
                        </div>

                        <div>
                          <AnchorHeading level={3} id="future-enhancements">
                            Future Enhancements
                          </AnchorHeading>
                          <div className="bg-indigo-900/20 border border-indigo-600/30 rounded-lg p-6">
                            <AnchorHeading
                              level={4}
                              id="planned-features"
                              className="text-indigo-400 font-semibold mb-3"
                            >
                              Planned Features
                            </AnchorHeading>
                            <ul className="space-y-2 text-gray-300">
                              <li className="flex items-start">
                                <span className="text-indigo-400 mr-2">📅</span>
                                <div>
                                  <strong>Quarter support:</strong>{" "}
                                  StartOfQuarter, EndOfQuarter, Today+1Q
                                </div>
                              </li>
                              <li className="flex items-start">
                                <span className="text-indigo-400 mr-2">📅</span>
                                <div>
                                  <strong>Day of week:</strong> NextMonday,
                                  LastFriday, DayOfWeek(1)
                                </div>
                              </li>
                              <li className="flex items-start">
                                <span className="text-indigo-400 mr-2">📅</span>
                                <div>
                                  <strong>Week of month/year:</strong>{" "}
                                  WeekOfMonth(2), WeekOfYear(52)
                                </div>
                              </li>
                              <li className="flex items-start">
                                <span className="text-indigo-400 mr-2">📅</span>
                                <div>
                                  <strong>Configurable week start:</strong>{" "}
                                  Allow Sunday or Monday as first day
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Contributing Section */}
                {activeDocSection === "contributing" && (
                  <div className="space-y-8">
                    <div>
                      <AnchorHeading level={1} id="contributing">
                        Contributing
                      </AnchorHeading>
                      <p className="text-gray-300 mb-6">
                        We welcome contributions! This guide will help you get
                        started with development, testing, and submitting
                        changes.
                      </p>

                      <div className="bg-indigo-900/20 border border-indigo-600/30 rounded-lg p-6 mb-8">
                        <AnchorHeading
                          level={3}
                          id="contributing-quick-links"
                          className="text-lg font-semibold text-indigo-400 mb-3"
                        >
                          Quick Links
                        </AnchorHeading>
                        <div className="grid md:grid-cols-2 gap-4">
                          <a
                            href="https://github.com/ryanrozich/ag-grid-react-components/issues"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-gray-300 hover:text-white"
                          >
                            🐛 Report Issues
                          </a>
                          <a
                            href="https://github.com/ryanrozich/ag-grid-react-components/pulls"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-gray-300 hover:text-white"
                          >
                            🔄 Pull Requests
                          </a>
                          <a
                            href="https://github.com/ryanrozich/ag-grid-react-components/discussions"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-gray-300 hover:text-white"
                          >
                            💬 Discussions
                          </a>
                          <a
                            href="https://github.com/ryanrozich/ag-grid-react-components/blob/main/LICENSE"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-gray-300 hover:text-white"
                          >
                            📜 MIT License
                          </a>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div>
                          <AnchorHeading level={3} id="ways-to-contribute">
                            Ways to Contribute
                          </AnchorHeading>
                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
                              <AnchorHeading
                                level={4}
                                id="bug-reports"
                                className="text-indigo-400 font-semibold mb-2"
                              >
                                🐛 Bug Reports
                              </AnchorHeading>
                              <p className="text-sm text-gray-300">
                                Found a bug? Create an issue with a minimal
                                reproduction example.
                              </p>
                            </div>
                            <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
                              <AnchorHeading
                                level={4}
                                id="feature-requests"
                                className="text-indigo-400 font-semibold mb-2"
                              >
                                ✨ Feature Requests
                              </AnchorHeading>
                              <p className="text-sm text-gray-300">
                                Have an idea? Open a discussion to propose new
                                features.
                              </p>
                            </div>
                            <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
                              <AnchorHeading
                                level={4}
                                id="documentation"
                                className="text-indigo-400 font-semibold mb-2"
                              >
                                📝 Documentation
                              </AnchorHeading>
                              <p className="text-sm text-gray-300">
                                Help improve docs, add examples, or fix typos.
                              </p>
                            </div>
                            <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
                              <AnchorHeading
                                level={4}
                                id="code"
                                className="text-indigo-400 font-semibold mb-2"
                              >
                                💻 Code
                              </AnchorHeading>
                              <p className="text-sm text-gray-300">
                                Submit PRs for bug fixes, features, or
                                improvements.
                              </p>
                            </div>
                          </div>
                        </div>

                        <div>
                          <AnchorHeading level={3} id="pull-request-guidelines">
                            Pull Request Guidelines
                          </AnchorHeading>
                          <ol className="space-y-3 text-gray-300">
                            <li className="flex items-start">
                              <span className="text-indigo-400 font-semibold mr-2">
                                1.
                              </span>
                              <div>
                                <strong>Fork & Clone:</strong> Fork the repo and
                                create a feature branch
                                <CodeBlock
                                  code={`git checkout -b feature/my-new-feature`}
                                  language="bash"
                                />
                              </div>
                            </li>
                            <li className="flex items-start">
                              <span className="text-indigo-400 font-semibold mr-2">
                                2.
                              </span>
                              <div>
                                <strong>Install & Test:</strong> Ensure all
                                tests pass
                                <CodeBlock
                                  code={`npm install
npm test`}
                                  language="bash"
                                />
                              </div>
                            </li>
                            <li className="flex items-start">
                              <span className="text-indigo-400 font-semibold mr-2">
                                3.
                              </span>
                              <div>
                                <strong>Make Changes:</strong> Write code
                                following the existing style
                              </div>
                            </li>
                            <li className="flex items-start">
                              <span className="text-indigo-400 font-semibold mr-2">
                                4.
                              </span>
                              <div>
                                <strong>Add Tests:</strong> Cover new
                                functionality with tests
                              </div>
                            </li>
                            <li className="flex items-start">
                              <span className="text-indigo-400 font-semibold mr-2">
                                5.
                              </span>
                              <div>
                                <strong>Commit:</strong> Use conventional
                                commits
                                <CodeBlock
                                  code={`npm run commit`}
                                  language="bash"
                                />
                              </div>
                            </li>
                            <li className="flex items-start">
                              <span className="text-indigo-400 font-semibold mr-2">
                                6.
                              </span>
                              <div>
                                <strong>Push & PR:</strong> Push to your fork
                                and open a PR
                              </div>
                            </li>
                          </ol>
                        </div>

                        <div>
                          <AnchorHeading level={3} id="code-style">
                            Code Style
                          </AnchorHeading>
                          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                            <ul className="space-y-2 text-gray-300">
                              <li className="flex items-start">
                                <span className="text-indigo-400 mr-2">✓</span>
                                TypeScript with strict mode enabled
                              </li>
                              <li className="flex items-start">
                                <span className="text-indigo-400 mr-2">✓</span>
                                Prettier for code formatting (run automatically)
                              </li>
                              <li className="flex items-start">
                                <span className="text-indigo-400 mr-2">✓</span>
                                ESLint for code quality
                              </li>
                              <li className="flex items-start">
                                <span className="text-indigo-400 mr-2">✓</span>
                                Conventional commits for versioning
                              </li>
                              <li className="flex items-start">
                                <span className="text-indigo-400 mr-2">✓</span>
                                100% type safety - no `any` types
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Development Setup */}
                {activeDocSection === "development" && (
                  <div className="space-y-8">
                    <div>
                      <AnchorHeading level={1} id="development-setup">
                        Development Setup
                      </AnchorHeading>
                      <p className="text-gray-300 mb-6">
                        Set up your development environment to contribute to AG
                        Grid React Components.
                      </p>

                      <div className="space-y-6">
                        <div>
                          <AnchorHeading level={3} id="prerequisites">
                            Prerequisites
                          </AnchorHeading>
                          <ul className="space-y-2 text-gray-300">
                            <li className="flex items-start">
                              <span className="text-indigo-400 mr-2">✓</span>
                              Node.js 18+ and npm 8+
                            </li>
                            <li className="flex items-start">
                              <span className="text-indigo-400 mr-2">✓</span>
                              Git for version control
                            </li>
                            <li className="flex items-start">
                              <span className="text-indigo-400 mr-2">✓</span>A
                              code editor with TypeScript support (VS Code
                              recommended)
                            </li>
                            <li className="flex items-start">
                              <span className="text-indigo-400 mr-2">✓</span>
                              Basic knowledge of React and TypeScript
                            </li>
                          </ul>
                        </div>

                        <div>
                          <AnchorHeading level={3} id="setup-steps">
                            Setup Steps
                          </AnchorHeading>
                          <div className="space-y-4">
                            <div>
                              <AnchorHeading
                                level={4}
                                id="fork-and-clone"
                                className="text-gray-300 font-semibold mb-2"
                              >
                                1. Fork and Clone
                              </AnchorHeading>
                              <CodeBlock
                                code={`# Fork the repository on GitHub first, then:
git clone https://github.com/YOUR_USERNAME/ag-grid-react-components.git
cd ag-grid-react-components
git remote add upstream https://github.com/ryanrozich/ag-grid-react-components.git`}
                                language="bash"
                              />
                            </div>

                            <div>
                              <AnchorHeading
                                level={4}
                                id="install-dependencies-step"
                                className="text-gray-300 font-semibold mb-2"
                              >
                                2. Install Dependencies
                              </AnchorHeading>
                              <CodeBlock code={`npm install`} language="bash" />
                            </div>

                            <div>
                              <AnchorHeading
                                level={4}
                                id="run-development-server"
                                className="text-gray-300 font-semibold mb-2"
                              >
                                3. Run Development Server
                              </AnchorHeading>
                              <CodeBlock code={`npm run dev`} language="bash" />
                              <p className="text-sm text-gray-400 mt-2">
                                Opens at http://localhost:5173
                              </p>
                            </div>

                            <div>
                              <AnchorHeading
                                level={4}
                                id="run-tests"
                                className="text-gray-300 font-semibold mb-2"
                              >
                                4. Run Tests
                              </AnchorHeading>
                              <CodeBlock
                                code={`# Run all tests
npm test

# Run in watch mode during development
npm run test:watch

# Run with coverage
npm run test:coverage`}
                                language="bash"
                              />
                            </div>
                          </div>
                        </div>

                        <div>
                          <AnchorHeading level={3} id="development-workflow">
                            Development Workflow
                          </AnchorHeading>
                          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                            <AnchorHeading
                              level={4}
                              id="recommended-workflow"
                              className="text-indigo-400 font-semibold mb-3"
                            >
                              Recommended Workflow
                            </AnchorHeading>
                            <ol className="space-y-2 text-sm text-gray-300">
                              <li>1. Create a feature branch from main</li>
                              <li>
                                2. Run tests in watch mode while developing
                              </li>
                              <li>3. Use the demo app to test your changes</li>
                              <li>
                                4. Write/update tests for new functionality
                              </li>
                              <li>5. Run quality checks before committing</li>
                              <li>
                                6. Create a pull request with a clear
                                description
                              </li>
                            </ol>
                          </div>
                        </div>

                        <div>
                          <AnchorHeading level={3} id="useful-commands">
                            Useful Commands
                          </AnchorHeading>
                          <CodeBlock
                            code={`# Quality checks
npm run lint          # Run ESLint
npm run format        # Format with Prettier
npm run typecheck     # TypeScript type checking
npm run quality       # Run all checks

# Before committing
npm run pre-commit    # Format + all quality checks

# Building
npm run build         # Build the library
npm run preview      # Preview the built package

# Testing
npm run test:unit     # Unit tests only
npm run test:e2e      # E2E tests with Playwright
npm run test:e2e:ui   # Playwright UI mode`}
                            language="bash"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Testing */}
                {activeDocSection === "testing" && (
                  <div className="space-y-8">
                    <div>
                      <AnchorHeading level={1} id="testing">
                        Testing
                      </AnchorHeading>
                      <p className="text-gray-300 mb-6">
                        Comprehensive testing ensures the reliability of the
                        components. We use Vitest for unit tests and Playwright
                        for E2E tests.
                      </p>

                      <div className="space-y-6">
                        <div>
                          <AnchorHeading level={3} id="testing-stack">
                            Testing Stack
                          </AnchorHeading>
                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
                              <AnchorHeading
                                level={4}
                                id="unit-testing"
                                className="text-indigo-400 font-semibold mb-2"
                              >
                                Unit Testing
                              </AnchorHeading>
                              <ul className="space-y-1 text-sm text-gray-300">
                                <li>• Vitest for test runner</li>
                                <li>• React Testing Library</li>
                                <li>• Testing Library User Event</li>
                                <li>• Jest DOM matchers</li>
                              </ul>
                            </div>
                            <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
                              <AnchorHeading
                                level={4}
                                id="e2e-testing"
                                className="text-indigo-400 font-semibold mb-2"
                              >
                                E2E Testing
                              </AnchorHeading>
                              <ul className="space-y-1 text-sm text-gray-300">
                                <li>• Playwright for browser testing</li>
                                <li>• Cross-browser support</li>
                                <li>• Visual regression tests</li>
                                <li>• Accessibility testing</li>
                              </ul>
                            </div>
                          </div>
                        </div>

                        <div>
                          <AnchorHeading level={3} id="writing-unit-tests">
                            Writing Unit Tests
                          </AnchorHeading>
                          <CodeBlock
                            code={`import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RelativeDateFilter } from '../RelativeDateFilter';

describe('RelativeDateFilter', () => {
  it('should toggle between absolute and relative modes', async () => {
    const user = userEvent.setup();
    const mockApi = createMockGridApi();
    
    render(
      <RelativeDateFilter 
        filterParams={{}} 
        api={mockApi}
        column={mockColumn}
      />
    );
    
    // Start in absolute mode
    expect(screen.getByText('Absolute')).toBeInTheDocument();
    
    // Click to switch to relative mode
    await user.click(screen.getByText('Relative'));
    
    // Should show expression input
    expect(screen.getByPlaceholderText(/Today/)).toBeInTheDocument();
  });
  
  it('should validate date expressions', async () => {
    // Test implementation
  });
});`}
                            language="tsx"
                          />
                        </div>

                        <div>
                          <AnchorHeading level={3} id="writing-e2e-tests">
                            Writing E2E Tests
                          </AnchorHeading>
                          <CodeBlock
                            code={`import { test, expect } from '@playwright/test';

test.describe('Date Filter E2E', () => {
  test('should filter grid with relative expression', async ({ page }) => {
    await page.goto('/demo');
    
    // Open date filter
    await page.click('[aria-label="Date filter"]');
    
    // Switch to relative mode
    await page.click('text=Relative');
    
    // Enter expression
    await page.fill('input[placeholder*="Today"]', 'Today-7d');
    
    // Apply filter
    await page.click('button:has-text("Apply")');
    
    // Verify grid is filtered
    const rowCount = await page.locator('.ag-row').count();
    expect(rowCount).toBeLessThan(1000); // Original count
  });
});`}
                            language="typescript"
                          />
                        </div>

                        <div>
                          <AnchorHeading level={3} id="test-utilities">
                            Test Utilities
                          </AnchorHeading>
                          <p className="text-gray-300 mb-4">
                            We provide test utilities to help with AG Grid
                            component testing:
                          </p>
                          <CodeBlock
                            code={`// AGGridTestHarness - Wrapper for testing AG Grid components
import { AGGridTestHarness } from '@/test-utils/AGGridTestHarness';

const { result } = render(
  <AGGridTestHarness 
    columnDefs={columnDefs}
    rowData={testData}
  />
);

// agGridTestUtils - Helper functions
import { 
  createMockGridApi, 
  createMockColumn,
  waitForGridReady 
} from '@/test-utils/agGridTestUtils';

const mockApi = createMockGridApi();
const mockColumn = createMockColumn({ field: 'date' });`}
                            language="tsx"
                          />
                        </div>

                        <div>
                          <AnchorHeading level={3} id="running-tests">
                            Running Tests
                          </AnchorHeading>
                          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                            <AnchorHeading
                              level={4}
                              id="test-commands"
                              className="text-indigo-400 font-semibold mb-3"
                            >
                              Test Commands
                            </AnchorHeading>
                            <dl className="space-y-3">
                              <div>
                                <dt className="text-indigo-300 font-mono text-sm">
                                  npm test
                                </dt>
                                <dd className="text-gray-400 text-sm ml-4">
                                  Run all tests once
                                </dd>
                              </div>
                              <div>
                                <dt className="text-indigo-300 font-mono text-sm">
                                  npm run test:watch
                                </dt>
                                <dd className="text-gray-400 text-sm ml-4">
                                  Run tests in watch mode (recommended during
                                  development)
                                </dd>
                              </div>
                              <div>
                                <dt className="text-indigo-300 font-mono text-sm">
                                  npm run test:coverage
                                </dt>
                                <dd className="text-gray-400 text-sm ml-4">
                                  Generate coverage report
                                </dd>
                              </div>
                              <div>
                                <dt className="text-indigo-300 font-mono text-sm">
                                  npm run test:file DateFilter
                                </dt>
                                <dd className="text-gray-400 text-sm ml-4">
                                  Run specific test file
                                </dd>
                              </div>
                              <div>
                                <dt className="text-indigo-300 font-mono text-sm">
                                  npm run test:e2e:ui
                                </dt>
                                <dd className="text-gray-400 text-sm ml-4">
                                  Open Playwright UI for debugging
                                </dd>
                              </div>
                            </dl>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Examples */}
                {activeDocSection === "examples" && (
                  <div className="space-y-8">
                    <div>
                      <AnchorHeading level={1} id="examples">
                        Examples
                      </AnchorHeading>
                      <p className="text-gray-300 mb-6">
                        Complete examples showing different use cases and
                        configurations.
                      </p>

                      <div className="space-y-8">
                        <div>
                          <AnchorHeading level={3} id="full-grid-setup">
                            Full Grid Setup
                          </AnchorHeading>
                          <CodeBlock
                            code={`import React, { useState, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { 
  RelativeDateFilter, 
  RelativeDateFloatingFilter,
  QuickFilterDropdown,
  setupFilterStatePersistence,
  DATE_FILTER_PRESETS
} from 'ag-grid-react-components';

// Import AG Grid styles
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';

function DateFilterGrid() {
  const [gridApi, setGridApi] = useState(null);
  const [rowData] = useState([
    { id: 1, date: new Date(), amount: 100, status: 'Active' },
    // ... more data
  ]);

  const columnDefs = [
    {
      field: 'date',
      headerName: 'Date',
      filter: RelativeDateFilter,
      floatingFilter: true,
      floatingFilterComponent: RelativeDateFloatingFilter,
      filterParams: {
        buttons: ['reset', 'apply'],
        closeOnApply: true
      }
    },
    {
      field: 'amount',
      headerName: 'Amount',
      filter: 'agNumberColumnFilter'
    },
    {
      field: 'status',
      headerName: 'Status',
      filter: 'agSetColumnFilter'
    }
  ];

  const onGridReady = useCallback((params) => {
    setGridApi(params.api);
    
    // Set up URL persistence
    const cleanup = setupFilterStatePersistence(params.api);
    
    return cleanup;
  }, []);

  return (
    <div>
      {gridApi && (
        <div className="mb-4">
          <QuickFilterDropdown
            api={gridApi}
            columnId="date"
            options={DATE_FILTER_PRESETS}
            placeholder="Quick date filters"
          />
        </div>
      )}
      
      <div className="ag-theme-quartz" style={{ height: 400, width: '100%' }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          onGridReady={onGridReady}
        />
      </div>
    </div>
  );
}`}
                            language="tsx"
                            showLineNumbers
                          />
                        </div>

                        <div>
                          <AnchorHeading level={3} id="custom-quick-filters">
                            Custom Quick Filters
                          </AnchorHeading>
                          <CodeBlock
                            code={`// Create custom quick filters for your use case
const customFilters = [
  // Date-based filters
  {
    id: 'thisWeek',
    label: 'This Week',
    icon: '📅',
    description: 'Monday to Sunday',
    filterModel: {
      mode: 'relative',
      type: 'inRange',
      expressionFrom: 'StartOfWeek',
      expressionTo: 'EndOfWeek'
    }
  },
  {
    id: 'lastMonth',
    label: 'Last Month',
    icon: '📆',
    description: 'Previous calendar month',
    filterModel: {
      mode: 'relative',
      type: 'inRange',
      expressionFrom: 'StartOfMonth-1M',
      expressionTo: 'EndOfMonth-1M'
    }
  },
  
  // Combined filters
  {
    id: 'recentHighValue',
    label: 'Recent High Value',
    icon: '💰',
    description: 'Last 30 days, amount > $1000',
    onSelect: (api) => {
      api.setFilterModel({
        date: {
          mode: 'relative',
          type: 'inRange',
          expressionFrom: 'Today-30d',
          expressionTo: 'Today'
        },
        amount: {
          type: 'greaterThan',
          filter: 1000
        }
      });
    }
  },
  
  // Status-based filters
  {
    id: 'activeToday',
    label: 'Active Today',
    icon: '✅',
    description: 'Active items with today\'s date',
    onSelect: (api) => {
      api.setFilterModel({
        date: {
          mode: 'relative',
          type: 'equals',
          expressionFrom: 'Today'
        },
        status: {
          values: ['Active']
        }
      });
    }
  }
];`}
                            language="typescript"
                            showLineNumbers
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </main>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    );
  }

  // Demo page
  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      <Navigation currentPage={currentPage} />

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
      <div className="flex-1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          {/* Component Info */}
          <div className="mb-8">
            {activeComponent === "date-filter" && (
              <div className="bg-gray-900/50 rounded-xl p-8 border border-gray-800">
                <AnchorHeading level={2} id="relative-date-filter-info">
                  Relative Date Filter
                </AnchorHeading>
                <p className="text-gray-300 mb-6">
                  Filter dates using absolute values or relative expressions
                  like "Today-7d"
                </p>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <AnchorHeading
                      level={3}
                      id="date-filter-features"
                      className="text-lg font-semibold text-indigo-400 mb-3"
                    >
                      Features
                    </AnchorHeading>
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
                        All standard filter operations (equals, before, after,
                        in range)
                      </li>
                      <li className="flex items-start">
                        <span className="text-indigo-400 mr-2">✓</span>
                        Inclusive/exclusive boundary controls
                      </li>
                    </ul>
                  </div>

                  <div>
                    <AnchorHeading
                      level={3}
                      id="try-these-expressions"
                      className="text-lg font-semibold text-indigo-400 mb-3"
                    >
                      Try These Expressions
                    </AnchorHeading>
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
                <AnchorHeading level={2} id="quick-filter-dropdown-info">
                  Quick Filter Dropdown
                </AnchorHeading>
                <p className="text-gray-300 mb-6">
                  Apply predefined filters with a single click. Works with any
                  column type.
                </p>

                <div className="space-y-6">
                  <div>
                    <AnchorHeading
                      level={3}
                      id="date-filters-demo"
                      className="text-lg font-semibold text-indigo-400 mb-3"
                    >
                      Date Filters
                    </AnchorHeading>
                    {gridApi && (
                      <QuickFilterDropdown
                        api={gridApi}
                        columnId="date"
                        options={dateQuickFilters}
                        placeholder="Select time period"
                        showDescriptions={true}
                        className="min-w-60"
                      />
                    )}
                  </div>

                  <div>
                    <AnchorHeading
                      level={3}
                      id="combined-filters-demo"
                      className="text-lg font-semibold text-indigo-400 mb-3"
                    >
                      Combined Filters
                    </AnchorHeading>
                    {gridApi && (
                      <QuickFilterDropdown
                        api={gridApi}
                        columnId="date"
                        options={combinedQuickFilters}
                        placeholder="Combined filters"
                        showDescriptions={true}
                        className="min-w-60"
                      />
                    )}
                  </div>
                </div>

                <div className="mt-6">
                  <AnchorHeading
                    level={3}
                    id="quick-filter-features"
                    className="text-lg font-semibold text-indigo-400 mb-3"
                  >
                    Features
                  </AnchorHeading>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li className="flex items-start">
                      <span className="text-indigo-400 mr-2">✓</span>
                      Works with any AG Grid column type
                    </li>
                    <li className="flex items-start">
                      <span className="text-indigo-400 mr-2">✓</span>
                      Combine multiple filters in one action
                    </li>
                    <li className="flex items-start">
                      <span className="text-indigo-400 mr-2">✓</span>
                      Keyboard navigation support
                    </li>
                    <li className="flex items-start">
                      <span className="text-indigo-400 mr-2">✓</span>
                      Customizable icons and descriptions
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {activeComponent === "url-state" && (
              <div className="bg-gray-900/50 rounded-xl p-8 border border-gray-800">
                <AnchorHeading level={2} id="url-state-persistence-info">
                  URL State Persistence
                </AnchorHeading>
                <p className="text-gray-300 mb-6">
                  Share filtered views with automatic URL synchronization
                </p>

                <div className="bg-gray-800 rounded-lg p-4 mb-6">
                  <AnchorHeading
                    level={3}
                    id="current-filter-state"
                    className="text-sm font-medium text-gray-400 mb-2"
                  >
                    Current Filter State
                  </AnchorHeading>
                  <pre className="text-sm text-indigo-300">
                    <code>
                      {JSON.stringify(
                        serializeFilterModel(filterModel),
                        null,
                        2,
                      )}
                    </code>
                  </pre>
                </div>

                <AnchorHeading
                  level={3}
                  id="url-state-features"
                  className="text-lg font-semibold text-indigo-400 mb-3"
                >
                  Features
                </AnchorHeading>
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
                  <li className="flex items-start">
                    <span className="text-indigo-400 mr-2">✓</span>
                    Proper Date object serialization
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Grid */}
          <div className="bg-gray-900/50 rounded-xl p-8 border border-gray-800">
            <AnchorHeading level={2} id="live-demo-grid">
              Live Demo Grid
            </AnchorHeading>
            <p className="text-gray-400 mb-6">
              {activeComponent === "date-filter" &&
                "Click on the Date column filter to try relative expressions"}
              {activeComponent === "quick-filter" &&
                "Use the dropdowns above to quickly filter the data"}
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

      <Footer />
    </div>
  );
};
