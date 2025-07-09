import React, { useCallback, useMemo, useState, useEffect } from "react";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import type { GridApi, GridReadyEvent } from "ag-grid-community";
import { AllEnterpriseModule, ModuleRegistry } from "ag-grid-enterprise";
import {
  QuickFilterDropdown,
  ActiveFilters,
  FilterPresetManager,
  setupGridStatePersistence,
  usePresetFromUrl,
} from "../index";
import { generateData } from "./data/generator";
import { CodeBlock } from "./components/CodeBlock";
import { AnchorHeading } from "./components/AnchorHeading";
import { VERSION_DISPLAY, IS_PRERELEASE } from "./version";
import VersionInfo from "./components/VersionInfo";
import heroScreenshot from "./assets/screenshots/hero-screenshot.png";
import { ServerSideDemo } from "./components/ServerSideDemo";
import { SimpleFilterPresetsDemo } from "./SimpleFilterPresetsDemo";
import { StackBlitzExample } from "./components/StackBlitzExample";
import {
  darkTheme,
  getColumnDefs,
  defaultColDef,
  components,
  sideBarConfig,
  getStatusBarConfig,
} from "./config/sharedGridConfig";
import { DemoToolbar, StatsBar } from "./config/commonUIConfig";
// import { SimpleCodeBlock as CodeBlock } from "./components/SimpleCodeBlock";
import "./styles/showcase-dark.css";
import "./styles/code-override.css";

// Register AG Grid Enterprise modules
ModuleRegistry.registerModules([AllEnterpriseModule]);

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
          <VersionInfo className="hidden md:block" />
          <a
            href="https://www.npmjs.com/package/ag-grid-react-components"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 256 256">
              <path d="M0 256V0h256v256z" />
              <path d="M128 128v128h128V0H128z" fill="#C12127" />
            </svg>
            NPM
          </a>
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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-white font-semibold mb-4">
            AG Grid React Components
          </h3>
          <p className="text-gray-400 text-sm">
            Supercharge AG Grid with modern UX components. Tree-shakeable,
            headless, and released under the MIT License.
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
          <h3 className="text-white font-semibold mb-4">Community</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href="https://github.com/ryanrozich/ag-grid-react-components/issues"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Report Issues
              </a>
            </li>
            <li>
              <a
                href="https://github.com/ryanrozich/ag-grid-react-components/issues/new?labels=enhancement"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Suggest Features
              </a>
            </li>
            <li>
              <a
                href="https://github.com/ryanrozich/ag-grid-react-components/pulls"
                className="text-gray-400 hover:text-white transition-colors"
              >
                View Pull Requests
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

// Stats calculation helper
const calculateStats = (api: GridApi | null) => {
  if (!api) {
    return {
      taskCount: 0,
      totalBudget: 0,
      totalSpent: 0,
      avgProgress: 0,
      budgetRemaining: 0,
    };
  }

  let taskCount = 0;
  let totalBudget = 0;
  let totalSpent = 0;
  let totalProgress = 0;

  api.forEachNodeAfterFilterAndSort((node) => {
    if (!node.group && node.data) {
      taskCount++;
      totalBudget += node.data.value || 0;
      totalSpent += node.data.amountDelivered || 0;
      totalProgress += node.data.percentDelivered || 0;
    }
  });

  const avgProgress = taskCount > 0 ? totalProgress / taskCount : 0;
  const budgetRemaining = totalBudget - totalSpent;

  return {
    taskCount,
    totalBudget,
    totalSpent,
    avgProgress,
    budgetRemaining,
  };
};

// Time-based quick filters - defined outside component to avoid recreating on each render
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

export const ComponentsShowcaseComplete: React.FC<
  ComponentsShowcaseCompleteProps
> = ({ initialPage = "hero" }) => {
  const [gridApi, setGridApi] = useState<GridApi | null>(null);
  const [rowData] = useState(() => generateData(10000));
  const [filterModel, setFilterModel] = useState<
    import("ag-grid-community").FilterModel
  >({});
  const [activeDocSection, setActiveDocSection] = useState("overview");

  const [stats, setStats] = useState({
    taskCount: 0,
    totalBudget: 0,
    totalSpent: 0,
    avgProgress: 0,
    budgetRemaining: 0,
  });

  // Preset sharing state
  const [savedPresets, _setSavedPresets] = useState<any[]>(() => {
    const stored = localStorage.getItem("demo-filter-presets");
    return stored ? JSON.parse(stored) : [];
  });

  // Save presets to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("demo-filter-presets", JSON.stringify(savedPresets));
  }, [savedPresets]);

  // Auto-load preset from URL
  // Memoize the loadPresetById function to prevent infinite loops
  const loadPresetById = useCallback(
    async (id: string) => {
      return savedPresets.find((p) => p.id === id);
    },
    [savedPresets],
  );

  const { preset: urlPreset } = usePresetFromUrl({
    loadPresetById,
  });

  // Apply URL preset when loaded
  useEffect(() => {
    if (urlPreset && gridApi) {
      gridApi.setFilterModel(urlPreset.gridState);
    }
  }, [urlPreset, gridApi]);

  // Store cleanup function reference
  const cleanupRef = React.useRef<(() => void) | null>(null);

  // State for demo tabs
  const [activeDemoTab, setActiveDemoTab] = useState<
    "client" | "server" | "presets"
  >("client");

  // Clean up grid API when switching tabs
  useEffect(() => {
    return () => {
      // Clean up when tab changes
      if (gridApi) {
        console.log("Cleaning up grid API on tab change");
        setGridApi(null);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeDemoTab]);

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

  // Cleanup when navigating away from demo
  useEffect(() => {
    // Only run cleanup when we're leaving the demo page
    if (currentPage !== "demo") {
      if (cleanupRef.current) {
        console.log("Cleaning up grid state persistence");
        cleanupRef.current();
        cleanupRef.current = null;
      }

      // Also destroy the grid if it exists
      if (gridApi) {
        console.log("Destroying grid API");
        gridApi.destroy();
        setGridApi(null);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]); // Only run when page changes, not when gridApi changes

  // Get column definitions from shared config
  const columnDefs = useMemo(
    () => getColumnDefs(false), // false for client-side
    [],
  );

  const onGridReady = useCallback((params: GridReadyEvent) => {
    setGridApi(params.api);

    // Expose API globally for debugging
    if (typeof window !== "undefined") {
      (window as Window & { agGridApi?: GridApi }).agGridApi = params.api;
    }

    // Use full grid state persistence with compression
    const cleanup = setupGridStatePersistence(params.api, {
      useCompression: true,
      maxUrlLength: 2000,
      onStateLoad: (state) => {
        console.log("Grid state loaded from URL:", state);
        if (state.filters) {
          setFilterModel(state.filters);
        }
        // Log compression stats
        const url = new URL(window.location.href);
        const stateParam = url.searchParams.get("gridState");
        if (stateParam) {
          console.log(
            `Compressed URL state length: ${stateParam.length} chars`,
          );
        }
      },
      onStateSave: (state) => {
        console.log("Grid state saved to URL:", state);
        if (state.filters) {
          setFilterModel(state.filters);
        }
      },
    });

    params.api.addEventListener("filterChanged", () => {
      const model = params.api.getFilterModel();
      setFilterModel(model || {});

      // Update stats
      setStats(calculateStats(params.api));
    });

    // Also update when data first loads
    params.api.addEventListener("modelUpdated", () => {
      // Update stats
      setStats(calculateStats(params.api));
    });

    // Initialize stats on first load
    setStats(calculateStats(params.api));

    // Start with unfiltered state - no default filters

    // Store the cleanup function
    cleanupRef.current = cleanup;
  }, []);

  // Grid options are now passed directly as props to avoid conflicts between demos

  // dateQuickFilters is now defined outside the component

  // Task type filters
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
                  <span className="inline-flex items-center gap-x-1.5 rounded-full bg-green-600/10 px-3 py-1.5 text-sm font-medium text-green-400 ring-1 ring-inset ring-green-600/20">
                    <svg
                      className="h-3 w-3"
                      viewBox="0 0 6 6"
                      aria-hidden="true"
                    >
                      <circle cx={3} cy={3} r={3} fill="currentColor" />
                    </svg>
                    {IS_PRERELEASE ? "Pre-release" : "Version"}{" "}
                    {VERSION_DISPLAY}
                  </span>
                  <span className="inline-flex items-center gap-x-1.5 rounded-full bg-indigo-600/10 px-3 py-1.5 text-sm font-medium text-indigo-400 ring-1 ring-inset ring-indigo-600/20">
                    Minimal Bundle Size
                  </span>
                  <span className="inline-flex items-center gap-x-1.5 rounded-full bg-emerald-600/10 px-3 py-1.5 text-sm font-medium text-emerald-400 ring-1 ring-inset ring-emerald-600/20">
                    MIT License
                  </span>
                </div>
                <h1 className="mt-10 text-4xl font-bold tracking-tight text-white sm:text-6xl">
                  Supercharge AG Grid with modern UX components
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-300">
                  Transform AG Grid from a powerful data table into a delightful
                  user experience. These production-ready React components add
                  the filtering, presets, and state management features your
                  users have been asking for.
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
                  <div className="flex flex-col lg:flex-row gap-8 items-start">
                    {/* Hero Component Showcase */}
                    <div className="relative overflow-hidden rounded-2xl flex-1">
                      {/* Gradient background */}
                      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 via-purple-600/10 to-pink-600/10 blur-2xl" />

                      {/* Main container with glass effect */}
                      <div className="relative rounded-2xl bg-gray-900/40 backdrop-blur-xl ring-1 ring-white/10 overflow-hidden">
                        {/* Screenshot container */}
                        <div className="relative">
                          {/* Image wrapper with hover effect */}
                          <div className="group relative overflow-hidden bg-gray-800/50">
                            <img
                              src={heroScreenshot}
                              alt="AG Grid React Components showcase - DateFilter with relative date expressions, QuickFilterDropdown with presets, and ActiveFilters display"
                              className="w-full h-auto transition-transform duration-700 group-hover:scale-[1.02] will-change-transform"
                              loading="eager"
                              decoding="async"
                            />

                            {/* Interactive overlay on hover */}
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                          </div>

                          {/* Feature badges overlay - matching the colors from the screenshot */}
                          <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2 z-20">
                            <div className="bg-gray-950/90 backdrop-blur-md rounded-lg px-3 py-1.5 ring-1 ring-white/10">
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                <span className="text-xs font-medium text-white">
                                  DateFilter
                                </span>
                              </div>
                            </div>
                            <div className="bg-gray-950/90 backdrop-blur-md rounded-lg px-3 py-1.5 ring-1 ring-white/10">
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                                <span className="text-xs font-medium text-white">
                                  QuickFilterDropdown
                                </span>
                              </div>
                            </div>
                            <div className="bg-gray-950/90 backdrop-blur-md rounded-lg px-3 py-1.5 ring-1 ring-white/10">
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
                                <span className="text-xs font-medium text-white">
                                  ActiveFilters
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Developer Experience Cards */}
                    <div className="lg:w-96 space-y-6">
                      {/* Start in minutes */}
                      <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-800">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 bg-indigo-600/20 rounded-lg flex items-center justify-center">
                            <svg
                              className="w-6 h-6 text-indigo-400"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="2"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M13 10V3L4 14h7v7l9-11h-7z"
                              />
                            </svg>
                          </div>
                          <h3 className="text-lg font-semibold text-white">
                            Start in minutes
                          </h3>
                        </div>
                        <ul className="space-y-2 text-sm text-gray-300">
                          <li className="flex items-start">
                            <span className="text-green-400 mr-2">→</span>
                            Single npm install
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-400 mr-2">→</span>
                            Works with AG Grid Community & Enterprise
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-400 mr-2">→</span>
                            TypeScript support out of the box
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-400 mr-2">→</span>
                            Minimal bundle: starts at 25KB
                          </li>
                        </ul>
                      </div>

                      {/* Style it your way */}
                      <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-800">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 bg-purple-600/20 rounded-lg flex items-center justify-center">
                            <svg
                              className="w-6 h-6 text-purple-400"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="2"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                              />
                            </svg>
                          </div>
                          <h3 className="text-lg font-semibold text-white">
                            Style it your way
                          </h3>
                        </div>
                        <ul className="space-y-2 text-sm text-gray-300">
                          <li className="flex items-start">
                            <span className="text-purple-400 mr-2">→</span>
                            Headless by default
                          </li>
                          <li className="flex items-start">
                            <span className="text-purple-400 mr-2">→</span>
                            CSS modules for scoped styles
                          </li>
                          <li className="flex items-start">
                            <span className="text-purple-400 mr-2">→</span>
                            Override any style with className
                          </li>
                          <li className="flex items-start">
                            <span className="text-purple-400 mr-2">→</span>
                            Works with Tailwind, CSS-in-JS, etc.
                          </li>
                        </ul>
                      </div>

                      {/* Configure everything */}
                      <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-800">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 bg-green-600/20 rounded-lg flex items-center justify-center">
                            <svg
                              className="w-6 h-6 text-green-400"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="2"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                            </svg>
                          </div>
                          <h3 className="text-lg font-semibold text-white">
                            Configure everything
                          </h3>
                        </div>
                        <ul className="space-y-2 text-sm text-gray-300">
                          <li className="flex items-start">
                            <span className="text-green-400 mr-2">→</span>
                            Pluggable date picker adapters
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-400 mr-2">→</span>
                            Customizable date expressions
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-400 mr-2">→</span>
                            Extensible filter presets
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-400 mr-2">→</span>
                            Override any behavior with callbacks
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Features */}
          <div className="mx-auto max-w-7xl px-6 lg:px-8 pb-16">
            <div className="mx-auto max-w-2xl lg:text-center">
              <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Essential components for modern data applications
              </p>
              <p className="mt-6 text-lg text-gray-300">
                AG Grid gives you the foundation. These components add the
                polish your users expect: intuitive filtering, visible filter
                pills, shareable presets, and persistent state. Built for teams
                who use grids as their primary workspace.
              </p>
            </div>
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
              <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-4">
                <div className="flex flex-col">
                  <dt className="text-base font-semibold leading-7 text-white">
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
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
                    Relative Date Filtering
                  </dt>
                  <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-300">
                    <p className="flex-auto">
                      Natural language date filters like "last 30 days" that
                      actually update every day. Your saved views and shared
                      links always show current data.
                    </p>
                  </dd>
                </div>
                <div className="flex flex-col">
                  <dt className="text-base font-semibold leading-7 text-white">
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
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
                          d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0l-3.75-3.75M17.25 21L21 17.25"
                        />
                      </svg>
                    </div>
                    Quick Filter Menus
                  </dt>
                  <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-300">
                    <p className="flex-auto">
                      One-click access to your most-used filters. Configure
                      dropdowns for "High Priority", "Due This Week", or any
                      complex filter combination your team needs.
                    </p>
                  </dd>
                </div>
                <div className="flex flex-col">
                  <dt className="text-base font-semibold leading-7 text-white">
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
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
                          d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 6h.008v.008H6V6z"
                        />
                      </svg>
                    </div>
                    Active Filter Pills
                  </dt>
                  <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-300">
                    <p className="flex-auto">
                      Stop hunting for tiny blue dots. Display active filters as
                      clear, interactive pills that users can see and remove
                      with a single click.
                    </p>
                  </dd>
                </div>
                <div className="flex flex-col">
                  <dt className="text-base font-semibold leading-7 text-white">
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
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
                          d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                        />
                      </svg>
                    </div>
                    Filter Presets & Sharing
                  </dt>
                  <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-300">
                    <p className="flex-auto">
                      Save complex filter combinations as named presets. Export
                      and share them with your team, or copy a URL that captures
                      your exact grid state.
                    </p>
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Developer Experience section */}
          <div className="mx-auto max-w-7xl px-6 lg:px-8 pb-24">
            <div className="mx-auto max-w-2xl lg:text-center">
              <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Seamlessly integrates with your existing AG Grid setup
              </p>
              <p className="mt-6 text-lg text-gray-300">
                Drop-in components with zero dependencies. Use our thoughtful
                defaults or customize every detail with headless flexibility.
              </p>
            </div>

            {/* Code Example */}
            <div className="mx-auto mt-12 max-w-3xl">
              <div className="rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:rounded-2xl lg:p-4">
                <CodeBlock
                  code={`npm install ag-grid-react-components

// Just add to your existing AG Grid setup
import { createDateFilter } from 'ag-grid-react-components';

const DateFilter = createDateFilter();

const columnDefs = [{
  field: 'dueDate',
  filter: DateFilter,
  filterParams: {
    defaultMode: 'relative'
  }
}];`}
                  language="tsx"
                  variant="hero"
                  showCopyButton={false}
                />
              </div>
            </div>

            {/* Bundle Size Comparison */}
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                <div className="bg-gray-900/50 rounded-lg p-8 border border-gray-800">
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
                  <h3 className="text-xl font-semibold text-white mb-4">
                    Start in minutes
                  </h3>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-start">
                      <span className="text-green-400 mr-2">→</span>
                      Single npm install
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-400 mr-2">→</span>
                      Works with AG Grid Community & Enterprise
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-400 mr-2">→</span>
                      TypeScript support out of the box
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-400 mr-2">→</span>
                      Minimal bundle: starts at 25KB
                    </li>
                  </ul>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-8 border border-gray-800">
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
                        d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-4">
                    Style it your way
                  </h3>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-start">
                      <span className="text-indigo-400 mr-2">→</span>
                      Headless by default
                    </li>
                    <li className="flex items-start">
                      <span className="text-indigo-400 mr-2">→</span>
                      CSS modules for scoped styles
                    </li>
                    <li className="flex items-start">
                      <span className="text-indigo-400 mr-2">→</span>
                      Override any style with className
                    </li>
                    <li className="flex items-start">
                      <span className="text-indigo-400 mr-2">→</span>
                      Works with Tailwind, CSS-in-JS, etc.
                    </li>
                  </ul>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-8 border border-gray-800">
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
                        d="M6 13.5V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 9.75V10.5"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-4">
                    Configure everything
                  </h3>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-start">
                      <span className="text-purple-400 mr-2">→</span>
                      Pluggable date picker adapters
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-400 mr-2">→</span>
                      Customizable date expressions
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-400 mr-2">→</span>
                      Extensible filter presets
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-400 mr-2">→</span>
                      Override any behavior with callbacks
                    </li>
                  </ul>
                </div>
              </div>
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
      { id: "overview", label: "Overview", indent: true },
      { id: "prerequisites", label: "Prerequisites", indent: true },
      { id: "installation", label: "Installation", indent: true },
      { id: "basic-setup", label: "Basic Setup", indent: true },

      // Components Section
      { id: "components", label: "Components", isSection: true },
      { id: "relativedatefilter", label: "DateFilter", indent: true },
      { id: "quickfilterdropdown", label: "QuickFilterDropdown", indent: true },
      { id: "activefilters", label: "ActiveFilters", indent: true },
      { id: "filterpresets", label: "Filter Presets", indent: true },
      { id: "urlstate", label: "URL State Persistence", indent: true },

      // Demo Guide Section
      { id: "demo-guide", label: "Demo Guide", isSection: true },
      { id: "running-locally", label: "Running Locally", indent: true },
      { id: "demo-features", label: "Demo Features", indent: true },

      // References Section
      { id: "references", label: "References", isSection: true },
      { id: "expressions", label: "Date Expressions", indent: true },
      { id: "types", label: "TypeScript Types", indent: true },
      { id: "date-vs-timestamp", label: "Date vs Timestamp", indent: true },

      // Known Issues Section
      { id: "known-issues", label: "Known Issues", isSection: true },
      { id: "ag-grid-bugs", label: "AG Grid Bugs", indent: true },

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
                {/* Overview/Home Section */}
                {activeDocSection === "overview" && (
                  <div className="space-y-8">
                    <div>
                      <AnchorHeading level={1} id="overview">
                        AG Grid React Components Documentation
                      </AnchorHeading>
                      <p className="text-gray-300 mb-6 text-lg">
                        Transform AG Grid from a powerful data table into a
                        delightful daily workspace. These components solve the
                        real-world filtering challenges your users face.
                      </p>

                      <div className="prose prose-invert max-w-none mb-8">
                        <h3 className="text-xl font-semibold text-white mb-4">
                          The Journey to Better Filtering
                        </h3>

                        <p className="text-gray-300 mb-4">
                          <strong>It starts with dates.</strong> Your users are
                          tired of manually selecting date ranges every day.
                          They want "last 30 days" to actually mean the last 30
                          days—including tomorrow. Our{" "}
                          <Link
                            to="/demo"
                            className="text-indigo-400 hover:text-indigo-300"
                          >
                            DateFilter component
                          </Link>{" "}
                          introduces relative date expressions that update
                          automatically.
                        </p>

                        <p className="text-gray-300 mb-4">
                          <strong>Then visibility becomes crucial.</strong> As
                          your grid grows to dozens of columns, users lose track
                          of what's filtered. Those tiny blue dots in column
                          headers? Nobody notices them.
                          <Link
                            to="/demo"
                            className="text-indigo-400 hover:text-indigo-300"
                          >
                            Active Filter Pills
                          </Link>{" "}
                          display every active filter clearly, making them
                          instantly visible and removable.
                        </p>

                        <p className="text-gray-300 mb-4">
                          <strong>Soon, patterns emerge.</strong> Your team runs
                          the same queries repeatedly: "High priority bugs",
                          "Due this week", "My overdue tasks". Instead of
                          recreating these filters daily,
                          <Link
                            to="/demo"
                            className="text-indigo-400 hover:text-indigo-300"
                          >
                            Quick Filter Menus
                          </Link>{" "}
                          provide one-click access to complex filter
                          combinations.
                        </p>

                        <p className="text-gray-300 mb-4">
                          <strong>Finally, collaboration kicks in.</strong>{" "}
                          Teams want to save their carefully crafted views, name
                          them, organize them, and share them. The{" "}
                          <Link
                            to="/demo"
                            className="text-indigo-400 hover:text-indigo-300"
                          >
                            Filter Presets system
                          </Link>{" "}
                          enables users to build a library of views, export them
                          to colleagues, or simply copy a URL that captures
                          their exact grid state.
                        </p>

                        <p className="text-gray-300 text-lg font-medium">
                          Together, these components transform AG Grid from a
                          feature-rich table into a tool people actually enjoy
                          using every day.
                        </p>
                      </div>
                    </div>

                    {/* Why These Components Exist */}
                    <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700 mb-8">
                      <h3 className="text-lg font-semibold text-white mb-3">
                        Why We Built This
                      </h3>
                      <p className="text-gray-300 mb-4">
                        AG Grid is incredibly powerful, flexible, and
                        feature-rich. It's the Swiss Army knife of data grids.
                        But when you're building applications where users live
                        in these grids 8 hours a day, you need more than just
                        features—you need thoughtful UX.
                      </p>
                      <p className="text-gray-300">
                        These components are the missing piece that transforms
                        AG Grid from a powerful development tool into a
                        delightful user experience. They're the difference
                        between a grid that <em>works</em> and a grid that users{" "}
                        <em>love</em>.
                      </p>
                    </div>

                    {/* Quick Navigation */}
                    <div className="flex gap-4 mb-8">
                      <button
                        onClick={() => setActiveDocSection("getting-started")}
                        className="flex-1 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white font-medium transition-colors"
                      >
                        Get Started →
                      </button>
                      <button
                        onClick={() => navigate("/demo")}
                        className="flex-1 px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg text-white font-medium transition-colors"
                      >
                        View Live Demo →
                      </button>
                    </div>
                  </div>
                )}

                {/* Getting Started Section */}
                {activeDocSection === "getting-started" && (
                  <div className="space-y-8">
                    <div>
                      <AnchorHeading level={1} id="getting-started">
                        Getting Started
                      </AnchorHeading>
                      <p className="text-gray-300 mb-6">
                        Welcome to AG Grid React Components! This modular,
                        tree-shakeable library provides powerful date filtering
                        components for AG Grid. Start with just 25KB for basic
                        features or add advanced capabilities as needed.
                      </p>

                      <div className="bg-green-900/20 border border-green-600/30 rounded-lg p-4 mb-6">
                        <p className="text-green-400 text-sm font-medium mb-2">
                          🎆 Modular Architecture
                        </p>
                        <p className="text-gray-300 text-sm">
                          Choose only what you need:
                        </p>
                        <ul className="mt-2 space-y-1 text-sm text-gray-300">
                          <li>• Tree-shakeable architecture starts at 25KB</li>
                          <li>• Optional features loaded only when used</li>
                          <li>• Full featured setup is only 85KB</li>
                        </ul>
                      </div>

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
                              intuitive expressions like &quot;Today-7d&quot; or
                              &quot;StartOfMonth&quot;
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

                      <div className="space-y-4">
                        <AnchorHeading
                          level={3}
                          id="ag-grid-edition-features"
                          className="text-lg font-semibold text-white"
                        >
                          What Features Are Available?
                        </AnchorHeading>
                        <p className="text-gray-300 text-sm mb-4">
                          Our components work with both AG Grid editions.
                          Here&apos;s what functionality is available with each:
                        </p>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                            <AnchorHeading
                              level={4}
                              id="with-ag-grid-community"
                              className="text-base font-semibold text-white mb-3"
                            >
                              With AG Grid Community (Free)
                            </AnchorHeading>
                            <ul className="space-y-2 text-sm text-gray-300">
                              <li>✓ All date filter functionality</li>
                              <li>✓ Relative date expressions</li>
                              <li>✓ Quick filter dropdowns</li>
                              <li>✓ Active filters display</li>
                              <li>✓ URL state persistence</li>
                              <li>✓ Search functionality</li>
                              <li>✓ All component features</li>
                            </ul>
                          </div>
                          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                            <AnchorHeading
                              level={4}
                              id="additional-with-ag-grid-enterprise"
                              className="text-base font-semibold text-white mb-3"
                            >
                              Additional with AG Grid Enterprise
                            </AnchorHeading>
                            <ul className="space-y-2 text-sm text-gray-300">
                              <li>✓ Floating filters in column headers</li>
                              <li>✓ Filter tool panel</li>
                              <li>✓ Advanced filter options</li>
                              <li>✓ Row grouping with filters</li>
                              <li>✓ Excel export with filters</li>
                              <li>✓ Server-side filtering</li>
                              <li>✓ And more AG Grid features...</li>
                            </ul>
                          </div>
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
                              <strong>Note about AG Grid Enterprise:</strong>{" "}
                              While our components are completely free, some AG
                              Grid features require an Enterprise license.
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
                              for AG Grid license information.
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
                        Choose your installation approach based on your bundle
                        size requirements.
                      </p>

                      <div className="bg-blue-900/20 border border-blue-600/30 rounded-lg p-4 mb-6">
                        <p className="text-blue-400 text-sm">
                          <strong>Note:</strong> The npm package name is{" "}
                          <code className="text-blue-300">
                            ag-grid-react-components
                          </code>
                          . The modular architecture allows you to start with
                          just 25KB and add features as needed.
                        </p>
                      </div>

                      <div className="space-y-8">
                        {/* Minimal Installation */}
                        <div>
                          <AnchorHeading level={3} id="minimal-installation">
                            Minimal Installation (25KB)
                          </AnchorHeading>
                          <p className="text-gray-400 mb-4">
                            Just the core components with native HTML5 date
                            inputs.
                          </p>
                          <CodeBlock
                            code={`# Install the package
npm install ag-grid-react-components

# Required peer dependencies
npm install ag-grid-community ag-grid-react react react-dom`}
                            language="bash"
                          />
                        </div>

                        {/* With Date Picker */}
                        <div>
                          <AnchorHeading level={3} id="with-datepicker">
                            With React DatePicker (65KB)
                          </AnchorHeading>
                          <p className="text-gray-400 mb-4">
                            Add a full-featured date picker component.
                          </p>
                          <CodeBlock
                            code={`# Install with React DatePicker support
npm install ag-grid-react-components react-datepicker

# The date picker is dynamically imported only when used`}
                            language="bash"
                          />
                        </div>

                        {/* Full Installation */}
                        <div>
                          <AnchorHeading level={3} id="full-installation">
                            Full Installation (85KB)
                          </AnchorHeading>
                          <p className="text-gray-400 mb-4">
                            All features including compression and styles.
                          </p>
                          <CodeBlock
                            code={`# Install with all optional dependencies
npm install ag-grid-react-components react-datepicker lz-string

# Everything is lazy-loaded when used`}
                            language="bash"
                          />
                        </div>

                        {/* Import Examples */}
                        <div>
                          <AnchorHeading level={3} id="import-examples">
                            Import Examples
                          </AnchorHeading>
                          <p className="text-gray-400 mb-4">
                            Simple imports for all components - just one package
                            to install.
                          </p>
                          <CodeBlock
                            code={`# Import what you need - tree-shaking handles the rest
import { DateFilter, QuickFilterDropdown } from 'ag-grid-react-components';

# Or import specific utilities
import { setupGridStatePersistence } from 'ag-grid-react-components';`}
                            language="bash"
                          />
                        </div>

                        <div className="bg-green-900/20 border border-green-600/30 rounded-lg p-4">
                          <p className="text-green-400 text-sm font-medium mb-2">
                            🌱 Tree-Shaking Enabled
                          </p>
                          <p className="text-gray-300 text-sm">
                            Only the code you import will be included in your
                            bundle. Heavy dependencies like react-datepicker
                            (100KB) are dynamically imported only when used.
                          </p>
                        </div>

                        <div className="bg-amber-900/20 border border-amber-600/30 rounded-lg p-4">
                          <p className="text-amber-400 text-sm">
                            <strong>Note:</strong> AG Grid Enterprise provides
                            additional features like floating filters and the
                            filter tool panel. The components work with both
                            Community (free) and Enterprise editions.
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
                        straightforward. Here&apos;s a complete example showing
                        all the components working together.
                      </p>

                      <div className="space-y-8">
                        <div>
                          <AnchorHeading level={2} id="complete-example">
                            Usage Examples
                          </AnchorHeading>

                          {/* Minimal Example */}
                          <div className="mb-8">
                            <h4 className="text-lg font-semibold text-gray-200 mb-3">
                              Minimal Setup (25KB)
                            </h4>
                            <CodeBlock
                              code={`import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import { createDateFilter } from 'ag-grid-react-components';

// Create DateFilter with native HTML5 inputs
const DateFilter = createDateFilter();

function App() {
  const columnDefs = [
    {
      field: 'date',
      headerName: 'Date',
      filter: DateFilter,
    }
  ];

  return (
    <div className="ag-theme-quartz" style={{ height: 600 }}>
      <AgGridReact columnDefs={columnDefs} rowData={rowData} />
    </div>
  );
}`}
                              language="tsx"
                            />
                          </div>

                          {/* With DatePicker Example */}
                          <div className="mb-8">
                            <h4 className="text-lg font-semibold text-gray-200 mb-3">
                              With React DatePicker (65KB)
                            </h4>
                            <CodeBlock
                              code={`import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import { createDateFilter, createQuickFilterDropdown, reactDatePickerAdapter } from 'ag-grid-react-components';

// Create components with date picker support
const DateFilter = createDateFilter({
  datePickerAdapter: reactDatePickerAdapter
});
const QuickFilterDropdown = createQuickFilterDropdown();

function App() {
  const [gridApi, setGridApi] = useState(null);

  const columnDefs = [
    {
      field: 'date',
      headerName: 'Date',
      filter: DateFilter,
      floatingFilter: true,
    }
  ];

  return (
    <div>
      <QuickFilterDropdown
        api={gridApi}
        columnId="date"
        options={[
          { id: 'today', label: 'Today' },
          { id: 'week', label: 'This Week' },
          { id: 'month', label: 'This Month' },
        ]}
      />

      <div className="ag-theme-quartz" style={{ height: 600 }}>
        <AgGridReact
          columnDefs={columnDefs}
          rowData={rowData}
          onGridReady={params => setGridApi(params.api)}
        />
      </div>
    </div>
  );
}`}
                              language="tsx"
                            />
                          </div>

                          {/* Full Featured Example */}
                          <div>
                            <h4 className="text-lg font-semibold text-gray-200 mb-3">
                              Full Featured with URL Persistence (85KB)
                            </h4>
                            <CodeBlock
                              code={`import React, { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import {
  createDateFilter,
  createQuickFilterDropdown,
  createActiveFilters,
  setupGridStatePersistence,
  reactDatePickerAdapter
} from 'ag-grid-react-components';

// Create all components
const DateFilter = createDateFilter({
  datePickerAdapter: reactDatePickerAdapter
});
const QuickFilterDropdown = createQuickFilterDropdown();
const ActiveFilters = createActiveFilters();

function App() {
  const [gridApi, setGridApi] = useState(null);
  const [filterModel, setFilterModel] = useState({});

  const onGridReady = (params) => {
    setGridApi(params.api);
    // Enable compressed URL state persistence
    setupGridStatePersistence(params.api, {
      compressionAdapter: createLZStringAdapter(),
      useCompression: true,
    });
  };

  return (
    <div>
      <ActiveFilters api={gridApi} filterModel={filterModel} />

      <div className="ag-theme-quartz" style={{ height: 600 }}>
        <AgGridReact
          columnDefs={columnDefs}
          onGridReady={onGridReady}
          onFilterChanged={() => setFilterModel(gridApi?.getFilterModel() || {})}
          rowData={rowData}
        />
      </div>
    </div>
  );
}`}
                              language="tsx"
                            />
                          </div>
                        </div>

                        <div>
                          <AnchorHeading level={2} id="key-points">
                            Key Points
                          </AnchorHeading>
                          <ul className="space-y-2 text-gray-300">
                            <li className="flex items-start">
                              <span className="text-gray-500 mr-2">•</span>
                              Create components using factory functions from
                              &apos;ag-grid-react-components&apos;
                            </li>
                            <li className="flex items-start">
                              <span className="text-gray-500 mr-2">•</span>
                              Add optional adapters for date pickers and
                              compression
                            </li>
                            <li className="flex items-start">
                              <span className="text-gray-500 mr-2">•</span>
                              Only import what you need - unused code is
                              tree-shaken
                            </li>
                            <li className="flex items-start">
                              <span className="text-gray-500 mr-2">•</span>
                              Heavy dependencies load dynamically when used
                            </li>
                          </ul>
                        </div>

                        <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                          <AnchorHeading level={3} id="bundle-size-guide">
                            Bundle Size Guide
                          </AnchorHeading>
                          <p className="text-gray-300 mb-4">
                            Choose components based on your size requirements:
                          </p>
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="border-b border-gray-700">
                                <th className="text-left py-2 text-gray-300">
                                  Feature
                                </th>
                                <th className="text-left py-2 text-gray-300">
                                  Size Impact
                                </th>
                                <th className="text-left py-2 text-gray-300">
                                  When to Use
                                </th>
                              </tr>
                            </thead>
                            <tbody className="text-gray-400">
                              <tr className="border-b border-gray-800">
                                <td className="py-3">Native date inputs</td>
                                <td className="py-3">+0KB</td>
                                <td className="py-3">
                                  Mobile-friendly, minimal size
                                </td>
                              </tr>
                              <tr className="border-b border-gray-800">
                                <td className="py-3">React DatePicker</td>
                                <td className="py-3">+40KB</td>
                                <td className="py-3">
                                  Better UX, calendar widget
                                </td>
                              </tr>
                              <tr className="border-b border-gray-800">
                                <td className="py-3">URL compression</td>
                                <td className="py-3">+15KB</td>
                                <td className="py-3">Shorter shareable URLs</td>
                              </tr>
                              <tr className="border-b border-gray-800">
                                <td className="py-3">Styles package</td>
                                <td className="py-3">+3KB</td>
                                <td className="py-3">
                                  Pre-built component styles
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>

                        <div className="bg-indigo-900/20 border border-indigo-600/30 rounded-lg p-6">
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
                                className="text-indigo-400 hover:text-indigo-300"
                              >
                                DateFilter documentation
                              </Link>{" "}
                              for advanced date filtering
                            </li>
                            <li>
                              <Link
                                to="/docs/quickfilterdropdown"
                                className="text-indigo-400 hover:text-indigo-300"
                              >
                                QuickFilterDropdown documentation
                              </Link>{" "}
                              for predefined filters
                            </li>
                            <li>
                              <Link
                                to="/docs/activefilters"
                                className="text-indigo-400 hover:text-indigo-300"
                              >
                                ActiveFilters documentation
                              </Link>{" "}
                              for displaying filter pills
                            </li>
                            <li>
                              <Link
                                to="/demo"
                                className="text-indigo-400 hover:text-indigo-300"
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

                {/* DateFilter */}
                {activeDocSection === "relativedatefilter" && (
                  <div className="space-y-8">
                    <div>
                      <AnchorHeading level={1} id="relative-date-filter">
                        DateFilter
                      </AnchorHeading>
                      <p className="text-gray-300 mb-6">
                        A powerful date filter that supports both absolute dates
                        and relative expressions. Now available as a
                        lightweight, modular component with optional date picker
                        support.
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
                            code={`// Minimal (25KB) - Native HTML5 date inputs
import { createDateFilter } from 'ag-grid-react-components';
const DateFilter = createDateFilter();

// With React DatePicker (65KB)
import { createDateFilter, reactDatePickerAdapter } from 'ag-grid-react-components';
const DateFilter = createDateFilter({
  datePickerAdapter: reactDatePickerAdapter
});

// Use in column definitions
const columnDefs = [
  {
    field: 'dateField',
    headerName: 'Date',
    filter: DateFilter,
    floatingFilter: true
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
                                  <td className="py-3">
                                    [&apos;reset&apos;, &apos;apply&apos;]
                                  </td>
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
                                <tr className="border-b border-gray-800">
                                  <td className="py-3">includeBlanksInRange</td>
                                  <td className="py-3">boolean</td>
                                  <td className="py-3">No</td>
                                  <td className="py-3">false</td>
                                  <td className="py-3">
                                    Include blank values in range
                                  </td>
                                </tr>
                                <tr className="border-b border-gray-800">
                                  <td className="py-3">dateFormat</td>
                                  <td className="py-3">string</td>
                                  <td className="py-3">No</td>
                                  <td className="py-3">"yyyy-MM-dd"</td>
                                  <td className="py-3">
                                    Date format for display (date-fns format)
                                  </td>
                                </tr>
                                <tr className="border-b border-gray-800">
                                  <td className="py-3">dateParser</td>
                                  <td className="py-3">function</td>
                                  <td className="py-3">No</td>
                                  <td className="py-3">Built-in parser</td>
                                  <td className="py-3">
                                    Custom function to parse cell values to
                                    dates
                                  </td>
                                </tr>
                                <tr className="border-b border-gray-800">
                                  <td className="py-3">defaultMode</td>
                                  <td className="py-3">
                                    "absolute" | "relative"
                                  </td>
                                  <td className="py-3">No</td>
                                  <td className="py-3">"absolute"</td>
                                  <td className="py-3">Default filter mode</td>
                                </tr>
                                <tr className="border-b border-gray-800">
                                  <td className="py-3">minDate</td>
                                  <td className="py-3">Date</td>
                                  <td className="py-3">No</td>
                                  <td className="py-3">-</td>
                                  <td className="py-3">
                                    Minimum selectable date in date picker
                                  </td>
                                </tr>
                                <tr className="border-b border-gray-800">
                                  <td className="py-3">maxDate</td>
                                  <td className="py-3">Date</td>
                                  <td className="py-3">No</td>
                                  <td className="py-3">-</td>
                                  <td className="py-3">
                                    Maximum selectable date in date picker
                                  </td>
                                </tr>
                                <tr className="border-b border-gray-800">
                                  <td className="py-3">afterInclusive</td>
                                  <td className="py-3">boolean</td>
                                  <td className="py-3">No</td>
                                  <td className="py-3">false</td>
                                  <td className="py-3">
                                    Whether 'after' filter includes the boundary
                                    date (&gt;= vs &gt;)
                                  </td>
                                </tr>
                                <tr className="border-b border-gray-800">
                                  <td className="py-3">beforeInclusive</td>
                                  <td className="py-3">boolean</td>
                                  <td className="py-3">No</td>
                                  <td className="py-3">false</td>
                                  <td className="py-3">
                                    Whether 'before' filter includes the
                                    boundary date (&lt;= vs &lt;)
                                  </td>
                                </tr>
                                <tr>
                                  <td className="py-3">rangeInclusive</td>
                                  <td className="py-3">{`{from?: boolean, to?: boolean}`}</td>
                                  <td className="py-3">No</td>
                                  <td className="py-3">{`{from: false, to: false}`}</td>
                                  <td className="py-3">
                                    Inclusivity for date ranges
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
    filter: DateFilter,
    floatingFilter: true,
    filterParams: {
      buttons: ['reset', 'apply', 'clear'],
      closeOnApply: false,
      includeBlanksInEquals: false,
      includeBlanksInLessThan: true,
      includeBlanksInGreaterThan: false,
      includeBlanksInRange: false,

      // Date format and parsing
      dateFormat: 'MM/dd/yyyy',
      dateParser: (value) => new Date(value),
      defaultMode: 'relative',

      // Date constraints
      minDate: new Date('2020-01-01'),
      maxDate: new Date('2030-12-31'),

      // Inclusivity settings
      afterInclusive: true,     // >= instead of >
      beforeInclusive: true,    // <= instead of <
      rangeInclusive: {
        from: true,  // Include start date
        to: true     // Include end date
      }
    }
  }
];`}
                            language="typescript"
                          />
                        </div>

                        <div>
                          <AnchorHeading
                            level={3}
                            id="relative-date-filter-styling"
                          >
                            Styling & Customization
                          </AnchorHeading>
                          <p className="text-gray-400 mb-4">
                            The DateFilter component can be styled using CSS
                            classes, CSS variables, or the className prop.
                          </p>

                          <div className="mb-6">
                            <h4 className="text-lg font-semibold text-gray-200 mb-3">
                              Available CSS Classes
                            </h4>
                            <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
                              <ul className="space-y-2 text-sm text-gray-400">
                                <li>
                                  <code className="text-blue-400">
                                    .agrc-date-filter
                                  </code>{" "}
                                  - Root container
                                </li>
                                <li>
                                  <code className="text-blue-400">
                                    .agrc-date-filter__mode-toggle
                                  </code>{" "}
                                  - Mode toggle buttons container
                                </li>
                                <li>
                                  <code className="text-blue-400">
                                    .agrc-date-filter__mode-option
                                  </code>{" "}
                                  - Individual toggle option
                                </li>
                                <li>
                                  <code className="text-blue-400">
                                    .agrc-date-filter__mode-option--active
                                  </code>{" "}
                                  - Active toggle state
                                </li>
                                <li>
                                  <code className="text-blue-400">
                                    .agrc-date-filter__type-selector
                                  </code>{" "}
                                  - Filter type dropdown
                                </li>
                                <li>
                                  <code className="text-blue-400">
                                    .agrc-date-filter__input
                                  </code>{" "}
                                  - Date/expression input fields
                                </li>
                                <li>
                                  <code className="text-blue-400">
                                    .agrc-date-filter__input--error
                                  </code>{" "}
                                  - Input error state
                                </li>
                                <li>
                                  <code className="text-blue-400">
                                    .agrc-date-filter__button
                                  </code>{" "}
                                  - Base button styles
                                </li>
                                <li>
                                  <code className="text-blue-400">
                                    .agrc-date-filter__button--primary
                                  </code>{" "}
                                  - Apply button
                                </li>
                                <li>
                                  <code className="text-blue-400">
                                    .agrc-date-filter__button--secondary
                                  </code>{" "}
                                  - Reset button
                                </li>
                              </ul>
                            </div>
                          </div>

                          <div className="mb-6">
                            <h4 className="text-lg font-semibold text-gray-200 mb-3">
                              CSS Variables
                            </h4>
                            <CodeBlock
                              code={`:root {
  /* Colors */
  --agrc-primary: #2563eb;
  --agrc-primary-hover: #1d4ed8;
  --agrc-border: #e5e7eb;
  --agrc-background: #ffffff;
  --agrc-text: #111827;
  --agrc-error: #ef4444;

  /* Spacing */
  --agrc-spacing-sm: 0.5rem;
  --agrc-spacing-md: 1rem;

  /* Border Radius */
  --agrc-radius-md: 0.375rem;
}`}
                              language="css"
                            />
                          </div>

                          <div>
                            <h4 className="text-lg font-semibold text-gray-200 mb-3">
                              Customization Examples
                            </h4>
                            <CodeBlock
                              code={`// Using className prop
<DateFilter className="my-custom-filter" />

// Custom CSS
.my-custom-filter .agrc-date-filter__button--primary {
  background: linear-gradient(to right, #7c3aed, #6d28d9);
  border: none;
}

// Dark theme
.dark-theme .agrc-date-filter {
  --agrc-background: #1f2937;
  --agrc-border: #374151;
  --agrc-text: #f3f4f6;
}`}
                              language="css"
                            />
                          </div>
                        </div>

                        <div>
                          <AnchorHeading level={3} id="open-ended-date-ranges">
                            Open-Ended Date Ranges
                          </AnchorHeading>
                          <p className="text-gray-400 mb-4">
                            DateFilter supports filtering with only a start or
                            end date, perfect for scenarios like "all dates
                            after X" or "all dates before Y".
                          </p>
                          <CodeBlock
                            code={`// Filter all dates after January 1, 2024
const filterModel = {
  type: "inRange",
  mode: "absolute",
  dateFrom: new Date("2024-01-01"),
  dateTo: null,  // Open-ended to future
};

// Filter all dates before December 31, 2024
const filterModel = {
  type: "inRange",
  mode: "absolute",
  dateFrom: null,  // Open-ended from past
  dateTo: new Date("2024-12-31"),
};

// With relative expressions
const filterModel = {
  type: "inRange",
  mode: "relative",
  expressionFrom: "Today-30d",
  expressionTo: null,  // All dates from 30 days ago onwards
};

// Apply programmatically
api.setFilterModel({
  dateColumn: filterModel
});`}
                            language="typescript"
                          />
                        </div>

                        <div>
                          <AnchorHeading
                            level={3}
                            id="inclusive-exclusive-filtering"
                          >
                            Inclusive vs Exclusive Filtering
                          </AnchorHeading>
                          <p className="text-gray-400 mb-4">
                            Control whether date boundaries are inclusive or
                            exclusive for precise filtering needs.
                          </p>

                          <div className="mb-6">
                            <h4 className="text-lg font-semibold text-gray-200 mb-3">
                              Filter Params Configuration
                            </h4>
                            <CodeBlock
                              code={`const columnDefs = [
  {
    field: "date",
    filter: DateFilter,
    filterParams: {
      // Make 'after' filter inclusive (>= instead of >)
      afterInclusive: true,

      // Make 'before' filter inclusive (<= instead of <)
      beforeInclusive: true,

      // Control inclusivity for date ranges
      rangeInclusive: {
        from: true,  // Include start date (>=)
        to: true,    // Include end date (<=)
      },
    },
  },
];`}
                              language="typescript"
                            />
                          </div>

                          <div className="mb-6">
                            <h4 className="text-lg font-semibold text-gray-200 mb-3">
                              Per-Instance Configuration
                            </h4>
                            <CodeBlock
                              code={`// Set inclusivity per filter instance
api.setFilterModel({
  dateColumn: {
    type: "inRange",
    mode: "absolute",
    dateFrom: new Date("2024-01-01"),
    dateTo: new Date("2024-12-31"),
    fromInclusive: true,   // Include January 1st
    toInclusive: false,    // Exclude December 31st
  },
});`}
                              language="typescript"
                            />
                          </div>

                          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                            <h4 className="font-semibold text-white mb-3">
                              Inclusivity Examples
                            </h4>
                            <ul className="space-y-2 text-sm text-gray-300">
                              <li>
                                <strong>Exclusive (default):</strong> "after
                                2024-01-01" matches dates &gt; 2024-01-01
                                (2024-01-02 onwards)
                              </li>
                              <li>
                                <strong>Inclusive:</strong> "after 2024-01-01"
                                with afterInclusive: true matches dates &gt;=
                                2024-01-01 (includes 2024-01-01)
                              </li>
                              <li>
                                <strong>Range exclusive:</strong> "2024-01-01 to
                                2024-01-31" matches dates &gt; 2024-01-01 and
                                &lt; 2024-01-31
                              </li>
                              <li>
                                <strong>Range inclusive:</strong> "2024-01-01 to
                                2024-01-31" with rangeInclusive:{" "}
                                {`{from: true, to: true}`} matches dates &gt;=
                                2024-01-01 and &lt;= 2024-01-31
                              </li>
                            </ul>
                          </div>
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
                        A lightweight dropdown component for applying predefined
                        filters with a single click. Part of the modular v2.0
                        architecture, it works with any column type and adds
                        minimal bundle size.
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
                            code={`// Create the component
import { createQuickFilterDropdown } from 'ag-grid-react-components';
const QuickFilterDropdown = createQuickFilterDropdown();

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
                                  <td className="py-3">
                                    &apos;Select filter&apos;
                                  </td>
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
                                  <td className="py-3">&apos;&apos;</td>
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

                        <div>
                          <AnchorHeading level={3} id="quick-filter-styling">
                            Styling & Customization
                          </AnchorHeading>
                          <p className="text-gray-400 mb-4">
                            The QuickFilterDropdown can be styled using CSS
                            classes, CSS variables, or props.
                          </p>

                          <div className="mb-6">
                            <h4 className="text-lg font-semibold text-gray-200 mb-3">
                              Available CSS Classes
                            </h4>
                            <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
                              <ul className="space-y-2 text-sm text-gray-400">
                                <li>
                                  <code className="text-blue-400">
                                    .agrc-quick-filter
                                  </code>{" "}
                                  - Root dropdown container
                                </li>
                                <li>
                                  <code className="text-blue-400">
                                    .agrc-quick-filter__trigger
                                  </code>{" "}
                                  - Dropdown trigger button
                                </li>
                                <li>
                                  <code className="text-blue-400">
                                    .agrc-quick-filter__panel
                                  </code>{" "}
                                  - Dropdown panel
                                </li>
                                <li>
                                  <code className="text-blue-400">
                                    .agrc-quick-filter__option
                                  </code>{" "}
                                  - Individual option item
                                </li>
                                <li>
                                  <code className="text-blue-400">
                                    .agrc-quick-filter__option--selected
                                  </code>{" "}
                                  - Selected option state
                                </li>
                                <li>
                                  <code className="text-blue-400">
                                    .agrc-quick-filter__option--highlighted
                                  </code>{" "}
                                  - Keyboard navigation highlight
                                </li>
                                <li>
                                  <code className="text-blue-400">
                                    .agrc-quick-filter__search
                                  </code>{" "}
                                  - Search input (when enabled)
                                </li>
                              </ul>
                            </div>
                          </div>

                          <div className="mb-6">
                            <h4 className="text-lg font-semibold text-gray-200 mb-3">
                              Customization Examples
                            </h4>
                            <CodeBlock
                              code={`// Using props
<QuickFilterDropdown
  className="w-64"
  triggerClassName="bg-blue-500 text-white hover:bg-blue-600"
/>

// Custom CSS
.agrc-quick-filter__trigger {
  border: 2px solid #2563eb;
  transition: all 0.2s;
}

.agrc-quick-filter__option {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.agrc-quick-filter__option-icon {
  width: 1.25rem;
  height: 1.25rem;
  color: var(--agrc-text-secondary);
}

// Material Design style
.material-quick-filter .agrc-quick-filter__trigger {
  border: none;
  border-bottom: 2px solid var(--agrc-border);
  border-radius: 0;
}`}
                              language="css"
                            />
                          </div>

                          <div className="mb-6">
                            <h4 className="text-lg font-semibold text-gray-200 mb-3">
                              Z-Index Layering
                            </h4>
                            <p className="text-gray-400 mb-2">
                              The dropdown has a default z-index of 1050 to
                              ensure it appears above AG Grid components. You
                              can override this if needed:
                            </p>
                            <CodeBlock
                              code={`.agrc-quick-filter__panel {
  z-index: 2000; /* Custom z-index */
}`}
                              language="css"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* ActiveFilters */}
                {activeDocSection === "activefilters" && (
                  <div className="space-y-8">
                    <div>
                      <AnchorHeading level={1} id="active-filters">
                        ActiveFilters
                      </AnchorHeading>
                      <p className="text-gray-300 mb-6">
                        A zero-dependency component that displays active filters
                        as removable pills. Part of the modular v2.0
                        architecture, it shows both column names and filter
                        values with minimal overhead.
                      </p>

                      <div className="space-y-8">
                        <div>
                          <AnchorHeading
                            level={3}
                            id="active-filters-basic-usage"
                          >
                            Basic Usage
                          </AnchorHeading>
                          <CodeBlock
                            code={`// Create the component
import { createActiveFilters } from 'ag-grid-react-components';
const ActiveFilters = createActiveFilters();

function MyGrid() {
  const [gridApi, setGridApi] = useState(null);
  const [filterModel, setFilterModel] = useState({});

  const onGridReady = (params) => {
    setGridApi(params.api);
  };

  const onFilterChanged = () => {
    setFilterModel(gridApi.getFilterModel());
  };

  return (
    <>
      {gridApi && Object.keys(filterModel).length > 0 && (
        <ActiveFilters
          api={gridApi}
          filterModel={filterModel}
        />
      )}
      <AgGridReact
        onGridReady={onGridReady}
        onFilterChanged={onFilterChanged}
      />
    </>
  );
}`}
                            language="tsx"
                          />
                        </div>

                        <div>
                          <AnchorHeading level={3} id="active-filters-features">
                            Key Features
                          </AnchorHeading>
                          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                            <ul className="space-y-3 text-gray-300">
                              <li className="flex items-start">
                                <span className="text-indigo-400 mr-2">•</span>
                                <div>
                                  <strong>Visual Filter Display:</strong> Shows
                                  active filters as pills with column name and
                                  filter value
                                </div>
                              </li>
                              <li className="flex items-start">
                                <span className="text-indigo-400 mr-2">•</span>
                                <div>
                                  <strong>Individual Removal:</strong> Click the
                                  × button to remove specific filters
                                </div>
                              </li>
                              <li className="flex items-start">
                                <span className="text-indigo-400 mr-2">•</span>
                                <div>
                                  <strong>Clear All:</strong> Remove all filters
                                  with a single click
                                </div>
                              </li>
                              <li className="flex items-start">
                                <span className="text-indigo-400 mr-2">•</span>
                                <div>
                                  <strong>Smart Value Display:</strong>{" "}
                                  Automatically extracts meaningful values from
                                  different filter types
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>

                        <div>
                          <AnchorHeading
                            level={3}
                            id="active-filters-configuration-options"
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
                                    Description
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="text-gray-400">
                                <tr className="border-b border-gray-800">
                                  <td className="py-3">api</td>
                                  <td className="py-3">GridApi</td>
                                  <td className="py-3">Yes</td>
                                  <td className="py-3">
                                    AG Grid API instance for filter operations
                                  </td>
                                </tr>
                                <tr className="border-b border-gray-800">
                                  <td className="py-3">filterModel</td>
                                  <td className="py-3">FilterModel</td>
                                  <td className="py-3">Yes</td>
                                  <td className="py-3">
                                    Current filter model from AG Grid
                                  </td>
                                </tr>
                                <tr>
                                  <td className="py-3">className</td>
                                  <td className="py-3">string</td>
                                  <td className="py-3">No</td>
                                  <td className="py-3">
                                    Additional CSS classes for styling
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>

                        <div>
                          <AnchorHeading
                            level={3}
                            id="active-filters-supported-filter-types"
                          >
                            Supported Filter Types
                          </AnchorHeading>
                          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                            <div className="space-y-4">
                              <div>
                                <h4 className="font-semibold text-white mb-2">
                                  Date Filters
                                </h4>
                                <ul className="space-y-1 text-sm text-gray-400">
                                  <li>
                                    • Relative expressions: &quot;Due Date:
                                    Today-7d to Today&quot;
                                  </li>
                                  <li>
                                    • Absolute dates: &quot;Due Date: 3/15/2024
                                    to 3/31/2024&quot;
                                  </li>
                                  <li>
                                    • Single dates: &quot;Due Date: after
                                    3/15/2024&quot;
                                  </li>
                                </ul>
                              </div>
                              <div>
                                <h4 className="font-semibold text-white mb-2">
                                  Set Filters
                                </h4>
                                <ul className="space-y-1 text-sm text-gray-400">
                                  <li>
                                    • Multiple values: &quot;Status: In
                                    Progress, Testing&quot;
                                  </li>
                                  <li>
                                    • Single values: &quot;Category:
                                    Development&quot;
                                  </li>
                                </ul>
                              </div>
                              <div>
                                <h4 className="font-semibold text-white mb-2">
                                  Text Filters
                                </h4>
                                <ul className="space-y-1 text-sm text-gray-400">
                                  <li>• Simple text: &quot;Name: john&quot;</li>
                                  <li>
                                    • With operators: &quot;Amount: &gt;
                                    500&quot;
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div>
                          <AnchorHeading level={3} id="active-filters-styling">
                            Styling & Customization
                          </AnchorHeading>
                          <p className="text-gray-400 mb-4">
                            The ActiveFilters component can be styled using CSS
                            classes, CSS variables, or the className prop.
                          </p>

                          <div className="mb-6">
                            <h4 className="text-lg font-semibold text-gray-200 mb-3">
                              Available CSS Classes
                            </h4>
                            <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
                              <ul className="space-y-2 text-sm text-gray-400">
                                <li>
                                  <code className="text-blue-400">
                                    .agrc-active-filters
                                  </code>{" "}
                                  - Container wrapper
                                </li>
                                <li>
                                  <code className="text-blue-400">
                                    .agrc-active-filters__pill
                                  </code>{" "}
                                  - Individual filter pill
                                </li>
                                <li>
                                  <code className="text-blue-400">
                                    .agrc-active-filters__label
                                  </code>{" "}
                                  - Column name in pill
                                </li>
                                <li>
                                  <code className="text-blue-400">
                                    .agrc-active-filters__value
                                  </code>{" "}
                                  - Filter value in pill
                                </li>
                                <li>
                                  <code className="text-blue-400">
                                    .agrc-active-filters__remove
                                  </code>{" "}
                                  - X button for removal
                                </li>
                                <li>
                                  <code className="text-blue-400">
                                    .agrc-active-filters__clear-all
                                  </code>{" "}
                                  - Clear all button
                                </li>
                              </ul>
                            </div>
                          </div>

                          <div className="mb-6">
                            <h4 className="text-lg font-semibold text-gray-200 mb-3">
                              Customization Examples
                            </h4>
                            <CodeBlock
                              code={`// Using className prop
<ActiveFilters
  api={gridApi}
  filterModel={filterModel}
  className="my-custom-filters"
/>

// Custom pill styles
.agrc-active-filters__pill {
  background-color: #dbeafe;
  color: #1e40af;
  border-radius: 9999px;
  padding: 0.25rem 0.75rem;
}

// Colorful pills based on column
.agrc-active-filters__pill[data-column="status"] {
  background-color: #dbeafe;
  color: #1e40af;
}

.agrc-active-filters__pill[data-column="priority"] {
  background-color: #fef3c7;
  color: #92400e;
}

// Dark theme
.dark .agrc-active-filters {
  background: rgba(0, 0, 0, 0.5);
  border-radius: 8px;
  padding: 1rem;
}

// Important: Use rgb() notation for alpha values
.agrc-active-filters__pill {
  background-color: rgb(99, 102, 241, 0.1);
  /* NOT rgba() or rgb(99 102 241 / 0.1) */
}`}
                              language="css"
                            />
                          </div>

                          <div>
                            <h4 className="text-lg font-semibold text-gray-200 mb-3">
                              Styling Notes
                            </h4>
                            <div className="bg-yellow-900/20 border border-yellow-700 rounded-lg p-4">
                              <p className="text-yellow-400 text-sm">
                                <strong>Important:</strong> This component uses
                                CSS Modules. When using alpha transparency, use
                                the legacy <code>rgb()</code> notation with
                                decimal values (e.g.,{" "}
                                <code>rgb(99, 102, 241, 0.1)</code>) to satisfy
                                stylelint rules. Avoid <code>rgba()</code> or
                                modern space-separated syntax.
                              </p>
                            </div>
                          </div>
                        </div>

                        <div>
                          <AnchorHeading
                            level={3}
                            id="active-filters-integration-example"
                          >
                            Full Integration Example
                          </AnchorHeading>
                          <CodeBlock
                            code={`import React, { useState, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react';
import {
  DateFilter,
  QuickFilterDropdown,
  ActiveFilters,
  DATE_FILTER_PRESETS
} from 'ag-grid-react-components';

function FilterableGrid() {
  const [gridApi, setGridApi] = useState(null);
  const [filterModel, setFilterModel] = useState({});

  const onGridReady = useCallback((params) => {
    setGridApi(params.api);
  }, []);

  const onFilterChanged = useCallback(() => {
    if (gridApi) {
      setFilterModel(gridApi.getFilterModel());
    }
  }, [gridApi]);

  const columnDefs = [
    {
      field: 'date',
      filter: DateFilter,
      floatingFilter: true
    },
    {
      field: 'status',
      filter: 'agSetColumnFilter'
    }
  ];

  return (
    <div className="grid-container">
      {/* Toolbar with quick filters and active filters */}
      <div className="toolbar">
        <div className="quick-filters">
          <QuickFilterDropdown
            api={gridApi}
            columnId="date"
            options={DATE_FILTER_PRESETS}
            placeholder="Time period"
          />
        </div>

        {/* Active filters display */}
        {gridApi && Object.keys(filterModel).length > 0 && (
          <div className="active-filters-container">
            <ActiveFilters
              api={gridApi}
              filterModel={filterModel}
            />
          </div>
        )}
      </div>

      {/* Grid */}
      <div className="ag-theme-quartz" style={{ height: 500 }}>
        <AgGridReact
          columnDefs={columnDefs}
          onGridReady={onGridReady}
          onFilterChanged={onFilterChanged}
          rowData={rowData}
        />
      </div>
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

                {/* Filter Presets Section */}
                {activeDocSection === "filterpresets" && (
                  <div className="space-y-8">
                    <div>
                      <AnchorHeading level={1} id="filter-presets">
                        Filter Presets
                      </AnchorHeading>
                      <p className="text-gray-300 mb-6">
                        Save, load, and share filter configurations with the
                        powerful Filter Presets feature. Enable your users to
                        create custom filter views, share them with teammates,
                        and restore their favorite configurations instantly.
                      </p>

                      <div className="bg-indigo-900/20 border border-indigo-600/30 rounded-lg p-4 mb-6">
                        <p className="text-indigo-400 font-semibold mb-2">
                          🎉 New Feature
                        </p>
                        <p className="text-gray-300">
                          Filter Presets is a new feature that integrates
                          seamlessly with QuickFilterDropdown and other
                          components. Check out the{" "}
                          <Link
                            to="/demo"
                            onClick={() => setActiveDemoTab("presets")}
                            className="text-indigo-400 hover:text-indigo-300"
                          >
                            interactive showcase
                          </Link>{" "}
                          to see it in action!
                        </p>
                      </div>

                      <div className="space-y-8">
                        <div>
                          <AnchorHeading level={3} id="preset-features">
                            Key Features
                          </AnchorHeading>
                          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                            <ul className="space-y-3 text-gray-300">
                              <li className="flex items-start">
                                <span className="text-indigo-400 mr-2">•</span>
                                <div>
                                  <strong>Save Filter States:</strong> Users can
                                  save their current filter configuration with a
                                  custom name
                                </div>
                              </li>
                              <li className="flex items-start">
                                <span className="text-indigo-400 mr-2">•</span>
                                <div>
                                  <strong>System Presets:</strong> Provide
                                  pre-configured filters for common use cases
                                </div>
                              </li>
                              <li className="flex items-start">
                                <span className="text-indigo-400 mr-2">•</span>
                                <div>
                                  <strong>User Presets:</strong> Allow users to
                                  create and manage their own presets
                                </div>
                              </li>
                              <li className="flex items-start">
                                <span className="text-indigo-400 mr-2">•</span>
                                <div>
                                  <strong>URL Sharing:</strong> Share filter
                                  configurations via URL with automatic
                                  compression
                                </div>
                              </li>
                              <li className="flex items-start">
                                <span className="text-indigo-400 mr-2">•</span>
                                <div>
                                  <strong>Import/Export:</strong> Transfer
                                  presets between users or systems
                                </div>
                              </li>
                              <li className="flex items-start">
                                <span className="text-indigo-400 mr-2">•</span>
                                <div>
                                  <strong>Cross-Tab Sync:</strong> Automatically
                                  sync presets across browser tabs
                                </div>
                              </li>
                              <li className="flex items-start">
                                <span className="text-indigo-400 mr-2">•</span>
                                <div>
                                  <strong>Custom UI:</strong> Fully customizable
                                  UI components or bring your own
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>

                        <div>
                          <AnchorHeading level={3} id="preset-quick-start">
                            Quick Start
                          </AnchorHeading>
                          <CodeBlock
                            code={`// Enable presets with QuickFilterDropdown
import { QuickFilterDropdown } from 'ag-grid-react-components';

const MyGrid = () => {
  const systemPresets = [
    {
      id: 'recent',
      name: 'Recent Orders',
      gridState: {
        filters: {
          date: {
            type: 'after',
            mode: 'relative',
            expressionFrom: 'Today-7d'
          }
        }
      }
    }
  ];

  return (
    <QuickFilterDropdown
      api={gridApi}
      columnId="date"
      enablePresets={{
        systemPresets,
        allowUserPresets: true,
        allowSharing: true,
        allowExport: true
      }}
    />
  );
};`}
                            language="tsx"
                          />
                        </div>

                        <div>
                          <AnchorHeading level={3} id="preset-api">
                            Programmatic API
                          </AnchorHeading>
                          <p className="text-gray-300 mb-4">
                            Use the useFilterPresets hook for full programmatic
                            control:
                          </p>
                          <CodeBlock
                            code={`import { useFilterPresets } from 'ag-grid-react-components';

const MyComponent = () => {
  const {
    presets,
    savePreset,
    loadPreset,
    deletePreset,
    setDefaultPreset,
    exportPresets,
    importPresets,
    sharePreset
  } = useFilterPresets({
    storageKey: 'myApp.filterPresets',
    maxPresets: 20,
    enableCompression: true
  });

  // Save current state
  const handleSave = async () => {
    const preset = await savePreset({
      name: 'My Filter',
      description: 'Q4 Analysis',
      isDefault: true
    });
  };

  // Share via URL
  const handleShare = async (presetId) => {
    const shareUrl = await sharePreset(presetId);
    navigator.clipboard.writeText(shareUrl);
  };
};`}
                            language="tsx"
                          />
                        </div>

                        <div>
                          <AnchorHeading level={3} id="preset-storage">
                            Storage & Performance
                          </AnchorHeading>
                          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                            <h4 className="text-lg font-semibold text-gray-200 mb-3">
                              Storage Configuration
                            </h4>
                            <table className="w-full text-sm">
                              <thead>
                                <tr className="border-b border-gray-700">
                                  <th className="text-left py-2 text-gray-300">
                                    Option
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
                                  <td className="py-3">maxStorageSize</td>
                                  <td className="py-3">5MB</td>
                                  <td className="py-3">
                                    Maximum storage per domain
                                  </td>
                                </tr>
                                <tr className="border-b border-gray-800">
                                  <td className="py-3">compressionEnabled</td>
                                  <td className="py-3">true</td>
                                  <td className="py-3">
                                    Enable LZ compression
                                  </td>
                                </tr>
                                <tr className="border-b border-gray-800">
                                  <td className="py-3">compressionThreshold</td>
                                  <td className="py-3">1KB</td>
                                  <td className="py-3">
                                    Compress if larger than
                                  </td>
                                </tr>
                                <tr className="border-b border-gray-800">
                                  <td className="py-3">autoCleanup</td>
                                  <td className="py-3">true</td>
                                  <td className="py-3">Remove old presets</td>
                                </tr>
                                <tr>
                                  <td className="py-3">maxAge</td>
                                  <td className="py-3">90 days</td>
                                  <td className="py-3">Preset expiration</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>

                        <div>
                          <AnchorHeading level={3} id="preset-examples">
                            See It In Action
                          </AnchorHeading>
                          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                            <p className="text-gray-300 mb-4">
                              Explore the Filter Presets feature with
                              interactive examples:
                            </p>
                            <div className="flex gap-4">
                              <Link
                                to="/demo"
                                onClick={() => {
                                  navigate("/demo");
                                  setTimeout(
                                    () => setActiveDemoTab("presets"),
                                    100,
                                  );
                                }}
                                className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
                              >
                                View Showcase
                                <svg
                                  className="w-4 h-4 ml-2"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5l7 7-7 7"
                                  />
                                </svg>
                              </Link>
                            </div>
                          </div>
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
                                  • 10,000 realistic software development
                                  records
                                </li>
                                <li>• Multiple column types and renderers</li>
                                <li>
                                  • Sorting, filtering, and infinite scroll
                                </li>
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
                            The demo uses 10,000 rows of realistic software
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
                                code={`cellRenderer: (params) => {
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
                                column filter and try &quot;Today-7d&quot;
                              </div>
                            </li>
                            <li className="flex items-start">
                              <span className="text-indigo-400 font-semibold mr-2">
                                2.
                              </span>
                              <div>
                                <strong>Quick Filters:</strong> Use the dropdown
                                to apply &quot;Last 7 Days&quot;
                              </div>
                            </li>
                            <li className="flex items-start">
                              <span className="text-indigo-400 font-semibold mr-2">
                                3.
                              </span>
                              <div>
                                <strong>Combined Filters:</strong> Try
                                &quot;High Value Recent&quot; to see
                                multi-column filtering
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
                        A powerful feature that automatically synchronizes your
                        entire grid state (filters, columns, sorting, grouping)
                        with the browser URL. Create shareable links, support
                        browser history navigation, and persist user preferences
                        - all with optional compression for smaller URLs.
                      </p>

                      <div className="space-y-8">
                        <div>
                          <AnchorHeading level={3} id="url-state-basic-usage">
                            Basic Usage
                          </AnchorHeading>
                          <CodeBlock
                            code={`import { setupGridStatePersistence } from 'ag-grid-react-components';

const onGridReady = (params) => {
  // Full grid state persistence with compression
  const cleanup = setupGridStatePersistence(params.api, {
    useCompression: true,
    onStateLoad: (state) => {
      console.log('Grid state loaded:', state);
    },
    onStateSave: (state) => {
      console.log('Grid state saved:', state);
    }
  });

  return cleanup;
};

// Or use the filter-only version for lightweight persistence
import { setupFilterStatePersistence } from 'ag-grid-react-components';`}
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
                                  <td className="py-3">includeFilters</td>
                                  <td className="py-3">boolean</td>
                                  <td className="py-3">No</td>
                                  <td className="py-3">true</td>
                                  <td className="py-3">Include filter state</td>
                                </tr>
                                <tr className="border-b border-gray-800">
                                  <td className="py-3">includeColumns</td>
                                  <td className="py-3">boolean</td>
                                  <td className="py-3">No</td>
                                  <td className="py-3">true</td>
                                  <td className="py-3">
                                    Include column state (visibility, order,
                                    width, pinning)
                                  </td>
                                </tr>
                                <tr className="border-b border-gray-800">
                                  <td className="py-3">includeSort</td>
                                  <td className="py-3">boolean</td>
                                  <td className="py-3">No</td>
                                  <td className="py-3">true</td>
                                  <td className="py-3">Include sort state</td>
                                </tr>
                                <tr className="border-b border-gray-800">
                                  <td className="py-3">includeRowGrouping</td>
                                  <td className="py-3">boolean</td>
                                  <td className="py-3">No</td>
                                  <td className="py-3">true</td>
                                  <td className="py-3">
                                    Include row grouping state (Enterprise)
                                  </td>
                                </tr>
                                <tr className="border-b border-gray-800">
                                  <td className="py-3">useCompression</td>
                                  <td className="py-3">boolean</td>
                                  <td className="py-3">No</td>
                                  <td className="py-3">true</td>
                                  <td className="py-3">
                                    Use LZ-String compression for shorter URLs
                                  </td>
                                </tr>
                                <tr className="border-b border-gray-800">
                                  <td className="py-3">maxUrlLength</td>
                                  <td className="py-3">number</td>
                                  <td className="py-3">No</td>
                                  <td className="py-3">2000</td>
                                  <td className="py-3">
                                    Warn when URL exceeds this length
                                  </td>
                                </tr>
                                <tr className="border-b border-gray-800">
                                  <td className="py-3">paramName</td>
                                  <td className="py-3">string</td>
                                  <td className="py-3">No</td>
                                  <td className="py-3">
                                    &apos;gridState&apos;
                                  </td>
                                  <td className="py-3">URL parameter name</td>
                                </tr>
                                <tr className="border-b border-gray-800">
                                  <td className="py-3">onStateLoad</td>
                                  <td className="py-3">function</td>
                                  <td className="py-3">No</td>
                                  <td className="py-3">-</td>
                                  <td className="py-3">
                                    Called when state is loaded from URL
                                  </td>
                                </tr>
                                <tr>
                                  <td className="py-3">onStateSave</td>
                                  <td className="py-3">function</td>
                                  <td className="py-3">No</td>
                                  <td className="py-3">-</td>
                                  <td className="py-3">
                                    Called when state is saved to URL
                                  </td>
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
import { setupGridStatePersistence } from 'ag-grid-react-components';

function MyGrid() {
  const [gridState, setGridState] = useState({});

  const onGridReady = useCallback((params) => {
    // Set up full grid state persistence with compression
    const cleanup = setupGridStatePersistence(params.api, {
      useCompression: true,
      includeFilters: true,
      includeColumns: true,
      includeSort: true,
      includeRowGrouping: true,
      maxUrlLength: 2000,
      onStateLoad: (state) => {
        console.log('Grid state loaded:', state);
        setGridState(state);

        // Log compression statistics
        const url = new URL(window.location.href);
        const compressed = url.searchParams.get('gridState');
        if (compressed) {
          console.log(\`URL length: \${url.toString().length} chars\`);
          console.log(\`Compressed state: \${compressed.length} chars\`);
        }
      },
      onStateSave: (state) => {
        console.log('Grid state saved:', state);
        setGridState(state);
      }
    });

    // Return cleanup function
    return cleanup;
  }, []);

  return (
    <div>
      <div className="state-info">
        <h4>Current State:</h4>
        <pre>{JSON.stringify(gridState, null, 2)}</pre>
      </div>
      <AgGridReact
        onGridReady={onGridReady}
        columnDefs={columnDefs}
        rowData={rowData}
      />
    </div>
  );
}`}
                            language="tsx"
                          />
                        </div>

                        <div>
                          <AnchorHeading
                            level={3}
                            id="url-state-current-support"
                          >
                            What&apos;s Currently Supported
                          </AnchorHeading>
                          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                            <p className="text-gray-300 mb-4">
                              The{" "}
                              <code className="text-blue-400">
                                setupGridStatePersistence
                              </code>{" "}
                              function provides{" "}
                              <strong>real-time URL state persistence</strong>.
                              Every change you make to the grid is instantly
                              saved to the URL:
                            </p>
                            <ul className="space-y-2 text-gray-400">
                              <li className="flex items-start">
                                <span className="text-green-400 mr-2">✓</span>
                                <span>
                                  <strong>Filters:</strong> All column filters
                                  (date, text, number, set filters)
                                </span>
                              </li>
                              <li className="flex items-start">
                                <span className="text-green-400 mr-2">✓</span>
                                <span>
                                  <strong>Column State:</strong>
                                  <ul className="ml-6 mt-1 space-y-1 text-sm">
                                    <li>
                                      • Column width (when you resize columns)
                                    </li>
                                    <li>
                                      • Column order (when you drag columns)
                                    </li>
                                    <li>
                                      • Column visibility (show/hide columns)
                                    </li>
                                    <li>• Column pinning (pin left/right)</li>
                                    <li>• Column aggregation functions</li>
                                  </ul>
                                </span>
                              </li>
                              <li className="flex items-start">
                                <span className="text-green-400 mr-2">✓</span>
                                <span>
                                  <strong>Sort State:</strong> Single and
                                  multi-column sorting
                                </span>
                              </li>
                              <li className="flex items-start">
                                <span className="text-green-400 mr-2">✓</span>
                                <span>
                                  <strong>Row Grouping:</strong> Group columns
                                  and pivot (Enterprise)
                                </span>
                              </li>
                              <li className="flex items-start">
                                <span className="text-green-400 mr-2">✓</span>
                                <span>
                                  <strong>URL Compression:</strong> LZ-String
                                  compression for 50-90% smaller URLs
                                </span>
                              </li>
                              <li className="flex items-start">
                                <span className="text-green-400 mr-2">✓</span>
                                <span>
                                  <strong>Browser Navigation:</strong> Full
                                  back/forward support
                                </span>
                              </li>
                              <li className="flex items-start">
                                <span className="text-green-400 mr-2">✓</span>
                                <span>
                                  <strong>Shareable URLs:</strong> Copy and
                                  share complete grid configurations
                                </span>
                              </li>
                            </ul>
                          </div>
                        </div>

                        <div>
                          <AnchorHeading level={3} id="url-state-not-supported">
                            What&apos;s Not Persisted
                          </AnchorHeading>
                          <div className="bg-yellow-900/20 border border-yellow-700 rounded-lg p-6">
                            <p className="text-yellow-400 mb-4">
                              Some state is intentionally not persisted to keep
                              URLs manageable:
                            </p>
                            <ul className="space-y-2 text-gray-300">
                              <li className="flex items-start">
                                <span className="text-yellow-400 mr-2">○</span>
                                <span>
                                  <strong>Row Selection:</strong> Selected rows
                                  are session-specific
                                </span>
                              </li>
                              <li className="flex items-start">
                                <span className="text-yellow-400 mr-2">○</span>
                                <span>
                                  <strong>Scroll Position:</strong> Would be
                                  disorienting when sharing
                                </span>
                              </li>
                              <li className="flex items-start">
                                <span className="text-yellow-400 mr-2">○</span>
                                <span>
                                  <strong>Expanded Groups:</strong> Group
                                  expansion state is not saved
                                </span>
                              </li>
                              <li className="flex items-start">
                                <span className="text-yellow-400 mr-2">○</span>
                                <span>
                                  <strong>Cell Focus:</strong> Focused cell
                                  position
                                </span>
                              </li>
                            </ul>
                          </div>
                        </div>

                        <div>
                          <AnchorHeading level={3} id="try-url-persistence">
                            Try It Yourself
                          </AnchorHeading>
                          <div className="bg-indigo-900/20 border border-indigo-600/30 rounded-lg p-6">
                            <p className="text-gray-300 mb-4">
                              Watch the URL in your browser as you:
                            </p>
                            <ol className="space-y-2 text-gray-300">
                              <li className="flex items-start">
                                <span className="text-indigo-400 font-semibold mr-2">
                                  1.
                                </span>
                                <span>
                                  <strong>Resize a column</strong> - The width
                                  is saved instantly
                                </span>
                              </li>
                              <li className="flex items-start">
                                <span className="text-indigo-400 font-semibold mr-2">
                                  2.
                                </span>
                                <span>
                                  <strong>Apply a filter</strong> - Filter state
                                  appears in the URL
                                </span>
                              </li>
                              <li className="flex items-start">
                                <span className="text-indigo-400 font-semibold mr-2">
                                  3.
                                </span>
                                <span>
                                  <strong>Sort a column</strong> - Sort
                                  direction is preserved
                                </span>
                              </li>
                              <li className="flex items-start">
                                <span className="text-indigo-400 font-semibold mr-2">
                                  4.
                                </span>
                                <span>
                                  <strong>Hide columns</strong> - Via the column
                                  menu or sidebar
                                </span>
                              </li>
                              <li className="flex items-start">
                                <span className="text-indigo-400 font-semibold mr-2">
                                  5.
                                </span>
                                <span>
                                  <strong>Copy the URL</strong> - Share it or
                                  bookmark it!
                                </span>
                              </li>
                            </ol>
                            <p className="text-sm text-gray-400 mt-4">
                              💡 <strong>Tip:</strong> Use the browser
                              back/forward buttons to undo/redo grid changes!
                            </p>
                          </div>
                        </div>

                        <div>
                          <AnchorHeading level={3} id="url-state-compression">
                            Compression Effectiveness
                          </AnchorHeading>
                          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                            <p className="text-gray-300 mb-4">
                              LZ-String compression dramatically reduces URL
                              length:
                            </p>
                            <div className="space-y-4">
                              <div className="bg-gray-800 p-4 rounded">
                                <h4 className="font-semibold text-blue-400 mb-2">
                                  Example: Simple Filter State
                                </h4>
                                <ul className="space-y-1 text-sm text-gray-400">
                                  <li>• Original JSON: 156 characters</li>
                                  <li>• URL encoded: 312 characters</li>
                                  <li>
                                    • Compressed: 88 characters{" "}
                                    <span className="text-green-400">
                                      (72% reduction)
                                    </span>
                                  </li>
                                </ul>
                              </div>

                              <div className="bg-gray-800 p-4 rounded">
                                <h4 className="font-semibold text-blue-400 mb-2">
                                  Example: Complex Grid State
                                </h4>
                                <ul className="space-y-1 text-sm text-gray-400">
                                  <li>• Original JSON: 1,245 characters</li>
                                  <li>• URL encoded: 2,890 characters</li>
                                  <li>
                                    • Compressed: 342 characters{" "}
                                    <span className="text-green-400">
                                      (88% reduction)
                                    </span>
                                  </li>
                                </ul>
                              </div>

                              <p className="text-sm text-gray-400 mt-4">
                                <strong>Note:</strong> Compression is most
                                effective with repetitive data like column
                                definitions. The more complex your grid state,
                                the better the compression ratio.
                              </p>
                            </div>
                          </div>
                        </div>

                        <div>
                          <AnchorHeading
                            level={3}
                            id="url-state-implementation"
                          >
                            Advanced Usage
                          </AnchorHeading>
                          <p className="text-gray-400 mb-4">
                            You can selectively choose which state to persist:
                          </p>
                          <CodeBlock
                            code={`// Persist only specific state
const cleanup = setupGridStatePersistence(gridApi, {
  includeFilters: true,     // Include filters
  includeColumns: true,     // Include column state
  includeSort: true,        // Include sorting
  includeRowGrouping: false // Exclude grouping
});

// Or capture/apply state manually
import { captureGridState, applyGridState } from 'ag-grid-react-components';

// Capture current state
const state = captureGridState(gridApi, {
  includeFilters: true,
  includeColumns: true
});

// Apply state later
applyGridState(gridApi, state);

// Custom state handling
const customSave = () => {
  const state = captureGridState(gridApi);
  localStorage.setItem('gridState', JSON.stringify(state));
};

const customLoad = () => {
  const saved = localStorage.getItem('gridState');
  if (saved) {
    const state = JSON.parse(saved);
    applyGridState(gridApi, state);
  }
};`}
                            language="typescript"
                          />
                        </div>

                        <div>
                          <AnchorHeading level={3} id="url-state-length">
                            URL Length Considerations
                          </AnchorHeading>
                          <div className="space-y-4">
                            <p className="text-gray-400">
                              URLs have practical length limits that vary by
                              browser and server:
                            </p>
                            <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
                              <ul className="space-y-2 text-sm text-gray-400">
                                <li>
                                  <strong className="text-gray-300">
                                    Chrome/Firefox:
                                  </strong>{" "}
                                  ~2,000 characters (safe limit)
                                </li>
                                <li>
                                  <strong className="text-gray-300">
                                    Safari:
                                  </strong>{" "}
                                  ~80,000 characters
                                </li>
                                <li>
                                  <strong className="text-gray-300">
                                    IE11:
                                  </strong>{" "}
                                  ~2,083 characters
                                </li>
                                <li>
                                  <strong className="text-gray-300">
                                    Most web servers:
                                  </strong>{" "}
                                  8,192 characters default
                                </li>
                              </ul>
                            </div>

                            <div>
                              <h4 className="font-semibold text-gray-200 mb-2">
                                Strategies for Long State
                              </h4>
                              <div className="space-y-3">
                                <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
                                  <h5 className="font-semibold text-blue-400 mb-1">
                                    1. LZ-String Compression (Default)
                                  </h5>
                                  <p className="text-sm text-gray-400">
                                    LZ-String compression is enabled by default
                                    when using setupGridStatePersistence. It
                                    reduces URLs by 50-90%, making it the
                                    recommended approach for most applications.
                                  </p>
                                  <CodeBlock
                                    code={`// Compression is enabled by default
setupGridStatePersistence(gridApi, {
  useCompression: true, // Default: true
  // LZ-String is automatically used
});`}
                                    language="javascript"
                                  />
                                </div>

                                <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
                                  <h5 className="font-semibold text-blue-400 mb-1">
                                    2. Server-side Storage
                                  </h5>
                                  <p className="text-sm text-gray-400">
                                    For very large states that exceed URL limits
                                    even with compression, store state
                                    server-side and use a short ID in the URL.
                                    <span className="block mt-2 text-blue-300">
                                      Note: We plan to provide a reference
                                      implementation of a server-side service in
                                      the future.
                                    </span>
                                  </p>
                                  <CodeBlock
                                    code={`// Store state and get ID
const stateId = await storeGridState(fullState);
window.history.pushState({}, '', \`?state=\${stateId}\`);`}
                                    language="javascript"
                                  />
                                </div>

                                <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
                                  <h5 className="font-semibold text-blue-400 mb-1">
                                    3. Selective Persistence
                                  </h5>
                                  <p className="text-sm text-gray-400">
                                    Only persist the most important state
                                  </p>
                                  <CodeBlock
                                    code={`// Only save filters and critical column state
const minimalState = {
  filters: gridApi.getFilterModel(),
  hiddenColumns: gridApi.getColumnState()
    .filter(col => col.hide)
    .map(col => col.colId)
};`}
                                    language="javascript"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
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
                          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                            <p className="text-gray-300 mb-4">
                              The DateFilter uses a comprehensive model
                              structure that supports both absolute dates and
                              relative expressions.
                            </p>
                            <ul className="space-y-2 text-gray-300">
                              <li>
                                • <strong>DateFilterModel</strong>: Main
                                interface with mode, type, and date/expression
                                fields
                              </li>
                              <li>
                                • <strong>Mode</strong>: 'absolute' for specific
                                dates or 'relative' for expressions
                              </li>
                              <li>
                                • <strong>Type</strong>: Filter operations like
                                equals, before, after, inRange, blank, notBlank
                              </li>
                              <li>
                                • <strong>Date Fields</strong>: dateFrom/dateTo
                                for absolute mode
                              </li>
                              <li>
                                • <strong>Expression Fields</strong>:
                                expressionFrom/expressionTo for relative mode
                              </li>
                            </ul>
                            <p className="text-sm text-gray-400 mt-4">
                              View full type definitions in{" "}
                              <a
                                href="https://github.com/ryanrozich/ag-grid-react-components/blob/main/src/components/DateFilter/types/index.ts"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-indigo-400 hover:text-indigo-300"
                              >
                                src/components/DateFilter/types/index.ts
                              </a>
                            </p>
                          </div>
                        </div>

                        <div>
                          <AnchorHeading
                            level={3}
                            id="quick-filter-dropdown-types"
                          >
                            QuickFilterDropdown Types
                          </AnchorHeading>
                          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                            <p className="text-gray-300 mb-4">
                              The QuickFilterDropdown uses a flexible
                              option-based interface for defining predefined
                              filters.
                            </p>
                            <ul className="space-y-2 text-gray-300">
                              <li>
                                • <strong>QuickFilterOption</strong>: Defines
                                each dropdown option with id, label, icon, and
                                filter model
                              </li>
                              <li>
                                • <strong>QuickFilterDropdownProps</strong>:
                                Component props including api, columnId, and
                                options array
                              </li>
                              <li>
                                • <strong>Filter Model</strong>: Column-specific
                                filter configuration or custom onSelect handler
                              </li>
                              <li>
                                • <strong>UI Options</strong>: Support for
                                icons, descriptions, and custom styling
                              </li>
                            </ul>
                            <p className="text-sm text-gray-400 mt-4">
                              View type definitions in{" "}
                              <a
                                href="https://github.com/ryanrozich/ag-grid-react-components/blob/main/src/components/QuickFilterDropdown/types.ts"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-indigo-400 hover:text-indigo-300"
                              >
                                src/components/QuickFilterDropdown/types.ts
                              </a>
                            </p>
                          </div>
                        </div>

                        <div>
                          <AnchorHeading
                            level={3}
                            id="grid-state-persistence-types"
                          >
                            Grid State Persistence Types
                          </AnchorHeading>
                          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                            <p className="text-gray-300 mb-4">
                              The grid state persistence utilities provide
                              comprehensive type definitions for saving and
                              restoring grid configurations.
                            </p>
                            <ul className="space-y-2 text-gray-300">
                              <li>
                                • <strong>GridStateOptions</strong>:
                                Configuration for what state to include
                                (filters, columns, sort, etc.)
                              </li>
                              <li>
                                • <strong>GridState</strong>: The complete state
                                object with all grid configuration
                              </li>
                              <li>
                                • <strong>setupGridStatePersistence</strong>:
                                Main function with options for compression and
                                callbacks
                              </li>
                              <li>
                                • <strong>Compression Support</strong>: Optional
                                adapter interface for URL compression
                              </li>
                            </ul>
                            <p className="text-sm text-gray-400 mt-4">
                              View type definitions in{" "}
                              <a
                                href="https://github.com/ryanrozich/ag-grid-react-components/blob/main/src/utils/gridStateUtils.ts"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-indigo-400 hover:text-indigo-300"
                              >
                                src/utils/gridStateUtils.ts
                              </a>
                            </p>
                          </div>
                        </div>

                        <div>
                          <AnchorHeading level={3} id="date-expression-types">
                            Date Expression Types
                          </AnchorHeading>
                          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                            <p className="text-gray-300 mb-4">
                              The date expression parser uses well-defined types
                              for anchors, units, and validation.
                            </p>
                            <ul className="space-y-2 text-gray-300">
                              <li>
                                • <strong>DateAnchor</strong>: Type union of
                                valid anchors (Today, Now, StartOfWeek, etc.)
                              </li>
                              <li>
                                • <strong>TimeUnit</strong>: Valid time units
                                (d, w, M, y, h, m)
                              </li>
                              <li>
                                • <strong>ParseResult</strong>: Structured
                                result with anchor, operator, value, and unit
                              </li>
                              <li>
                                • <strong>Validation Functions</strong>:
                                Type-safe expression validation and parsing
                              </li>
                            </ul>
                            <p className="text-sm text-gray-400 mt-4">
                              View type definitions in{" "}
                              <a
                                href="https://github.com/ryanrozich/ag-grid-react-components/blob/main/src/utils/dateExpressionParser.ts"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-indigo-400 hover:text-indigo-300"
                              >
                                src/utils/dateExpressionParser.ts
                              </a>
                            </p>
                          </div>
                        </div>

                        <div>
                          <AnchorHeading
                            level={3}
                            id="ag-grid-integration-types"
                          >
                            AG Grid Integration Types
                          </AnchorHeading>
                          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                            <p className="text-gray-300 mb-4">
                              Our components implement AG Grid's filter
                              interfaces with full type safety.
                            </p>
                            <ul className="space-y-2 text-gray-300">
                              <li>
                                • <strong>IFilter Implementation</strong>: All
                                required AG Grid filter methods
                              </li>
                              <li>
                                • <strong>Filter Params</strong>: Extended
                                interfaces for configuration options
                              </li>
                              <li>
                                • <strong>Grid API Types</strong>: Full typing
                                for AG Grid API interactions
                              </li>
                              <li>
                                • <strong>Event Handlers</strong>: Type-safe
                                callback definitions
                              </li>
                            </ul>
                            <p className="text-sm text-gray-400 mt-4">
                              These types ensure seamless integration with AG
                              Grid's TypeScript definitions.
                            </p>
                          </div>
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
                        Understanding how the DateFilter handles different date
                        formats and time components.
                      </p>

                      <div className="space-y-6">
                        <div>
                          <AnchorHeading level={3} id="date-handling">
                            Date Handling
                          </AnchorHeading>
                          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                            <p className="text-gray-300 mb-4">
                              The DateFilter intelligently handles both
                              date-only and timestamp values:
                            </p>
                            <ul className="space-y-3 text-gray-300">
                              <li className="flex items-start">
                                <span className="text-indigo-400 mr-2">•</span>
                                <div>
                                  <strong>Date-only values:</strong> Compared at
                                  midnight (00:00:00)
                                  <div className="text-sm text-gray-400 mt-1">
                                    Example: &quot;2024-03-15&quot; is treated
                                    as &quot;2024-03-15T00:00:00&quot;
                                  </div>
                                </div>
                              </li>
                              <li className="flex items-start">
                                <span className="text-indigo-400 mr-2">•</span>
                                <div>
                                  <strong>Timestamp values:</strong> Compared
                                  with full precision
                                  <div className="text-sm text-gray-400 mt-1">
                                    Example: &quot;2024-03-15T14:30:00Z&quot;
                                    preserves the exact time
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
                                    &quot;2024-03-15&quot; matches any time on
                                    that day
                                  </td>
                                </tr>
                                <tr className="border-b border-gray-800">
                                  <td className="py-3">Before</td>
                                  <td className="py-3">
                                    Exclusive of the date
                                  </td>
                                  <td className="py-3">
                                    &lt; &quot;2024-03-15&quot; means before
                                    midnight
                                  </td>
                                </tr>
                                <tr className="border-b border-gray-800">
                                  <td className="py-3">After</td>
                                  <td className="py-3">
                                    Exclusive of the date
                                  </td>
                                  <td className="py-3">
                                    &gt; &quot;2024-03-15&quot; means after
                                    23:59:59
                                  </td>
                                </tr>
                                <tr>
                                  <td className="py-3">In Range</td>
                                  <td className="py-3">
                                    Inclusive of both dates
                                  </td>
                                  <td className="py-3">
                                    &quot;2024-03-01&quot; to
                                    &quot;2024-03-31&quot; includes entire March
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
                                  <strong>Date-only data:</strong> Use
                                  &quot;Today&quot; for current date comparisons
                                </div>
                              </li>
                              <li className="flex items-start">
                                <span className="text-indigo-400 mr-2">💡</span>
                                <div>
                                  <strong>Timestamp data:</strong> Use
                                  &quot;Now&quot; for precise time comparisons
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
  filter: DateFilter,
  valueFormatter: (params) => {
    // Display date only
    return new Date(params.value).toLocaleDateString();
  }
};

// Configure column for timestamp filtering
const timestampColumn = {
  field: 'createdAt',
  filter: DateFilter,
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
import { DateFilter } from '../DateFilter';

describe('DateFilter', () => {
  it('should toggle between absolute and relative modes', async () => {
    const user = userEvent.setup();
    const mockApi = createMockGridApi();

    render(
      <DateFilter
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
import { themeQuartz } from 'ag-grid-community';
import {
  DateFilter,
  QuickFilterDropdown,
  setupFilterStatePersistence,
  DATE_FILTER_PRESETS
} from 'ag-grid-react-components';

// Create a custom theme (no CSS imports needed)
const myTheme = themeQuartz.withParams({
  accentColor: '#6366f1',
  browserColorScheme: 'dark'
});

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
      filter: DateFilter,
      floatingFilter: true,
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
            dropdownClassName="!overflow-visible"
          />
        </div>
      )}

      <div style={{ height: 400, width: '100%' }}>
        <AgGridReact
          theme={myTheme}
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
    description: "Active items with today's date",
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

                        <div>
                          <AnchorHeading level={3} id="filter-presets-example">
                            Filter Presets Example
                          </AnchorHeading>
                          <p className="text-gray-300 mb-4">
                            Enable users to save and manage their frequently
                            used filter configurations:
                          </p>
                          <CodeBlock
                            code={`import React, { useState, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react';
import {
  QuickFilterDropdown,
  DATE_FILTER_PRESETS
} from 'ag-grid-react-components';

function GridWithPresets() {
  const [gridApi, setGridApi] = useState(null);

  // Local storage adapter for saving presets
  const presetStorage = {
    load: async () => {
      const saved = localStorage.getItem('filter-presets');
      return saved ? JSON.parse(saved) : [];
    },
    save: async (presets) => {
      localStorage.setItem('filter-presets', JSON.stringify(presets));
    },
    remove: async (id) => {
      const presets = await presetStorage.load();
      const filtered = presets.filter(p => p.id !== id);
      await presetStorage.save(filtered);
    },
    getStorageInfo: async () => {
      const data = localStorage.getItem('filter-presets') || '';
      return {
        used: new Blob([data]).size,
        available: 5 * 1024 * 1024, // 5MB limit
        quota: 5 * 1024 * 1024
      };
    }
  };

  // System presets that are always available
  const systemPresets = [
    {
      id: 'recent-items',
      name: 'Recent Items',
      description: 'Items from the last 7 days',
      filterModel: {
        date: {
          mode: 'relative',
          type: 'after',
          expressionFrom: 'Today-7d'
        }
      },
      isSystem: true
    },
    {
      id: 'this-month',
      name: 'This Month',
      description: 'All items from current month',
      filterModel: {
        date: {
          mode: 'relative',
          type: 'inRange',
          expressionFrom: 'StartOfMonth',
          expressionTo: 'EndOfMonth'
        }
      },
      isSystem: true
    }
  ];

  const handlePresetChange = useCallback((preset) => {
    console.log('Preset selected:', preset);
  }, []);

  const handleManagePresets = useCallback(() => {
    // Open your preset management UI
    console.log('Opening preset manager...');
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
            enablePresets={{
              storage: presetStorage,
              systemPresets: systemPresets,
              onPresetChange: handlePresetChange,
              allowSave: true,
              allowManage: true,
              onManageClick: handleManagePresets,
              maxPresets: 20
            }}
          />
        </div>
      )}

      <div style={{ height: 400, width: '100%' }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          onGridReady={(params) => setGridApi(params.api)}
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
                          <AnchorHeading level={3} id="preset-manager-example">
                            Preset Manager Component
                          </AnchorHeading>
                          <p className="text-gray-300 mb-4">
                            Use the PresetManager component for a full
                            management interface:
                          </p>
                          <CodeBlock
                            code={`import { PresetManager, usePresets } from 'ag-grid-react-components';

function PresetManagementUI() {
  const presets = usePresets({
    storage: presetStorage,
    systemPresets: systemPresets
  });

  return (
    <PresetManager
      presets={[...systemPresets, ...presets.presets]}
      activePresetId={presets.activePresetId}
      onSetDefault={presets.setDefaultPreset}
      onEdit={(preset) => {
        // Open edit dialog for preset
        console.log('Editing preset:', preset);
      }}
      onDelete={presets.deletePresets}
      onExport={presets.exportPresets}
      onImport={presets.importPresets}
      renderPresetItem={(props) => (
        // Custom preset item rendering
        <div className="custom-preset-item">
          <h4>{props.preset.name}</h4>
          {props.preset.description && <p>{props.preset.description}</p>}
          <div className="preset-actions">
            {!props.preset.isSystem && (
              <>
                <button onClick={() => props.onSetDefault()}>
                  {props.preset.isDefault ? '★' : '☆'}
                </button>
                <button onClick={() => props.onEdit()}>Edit</button>
                <button onClick={() => props.onDelete()}>Delete</button>
              </>
            )}
            <button onClick={() => props.onExport()}>Export</button>
          </div>
        </div>
      )}
    />
  );
}`}
                            language="tsx"
                            showLineNumbers
                          />
                        </div>

                        <div>
                          <AnchorHeading
                            level={3}
                            id="save-preset-dialog-example"
                          >
                            Save Preset Dialog
                          </AnchorHeading>
                          <p className="text-gray-300 mb-4">
                            Let users save their current filter state as a
                            reusable preset:
                          </p>
                          <CodeBlock
                            code={`import { SavePresetDialog, usePresets } from 'ag-grid-react-components';

function FilterToolbar({ gridApi }) {
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const presets = usePresets({ storage: presetStorage });

  const handleSavePreset = useCallback((name, description, tags) => {
    const currentFilterModel = gridApi.getFilterModel();
    const newPreset = {
      id: \`user-\${Date.now()}\`,
      name,
      description,
      tags,
      filterModel: currentFilterModel,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    presets.addPreset(newPreset);
    setShowSaveDialog(false);
  }, [gridApi, presets]);

  return (
    <>
      <button onClick={() => setShowSaveDialog(true)}>
        Save Current Filters
      </button>

      <SavePresetDialog
        isOpen={showSaveDialog}
        onClose={() => setShowSaveDialog(false)}
        onSave={handleSavePreset}
        existingNames={presets.presets.map(p => p.name)}
        currentFilterModel={gridApi?.getFilterModel()}
        storageInfo={presets.storageInfo}
        renderContent={(form, actions) => (
          // Custom dialog content
          <div className="custom-save-dialog">
            <h2>Save Filter Preset</h2>
            {form}
            <div className="dialog-actions">
              {actions}
            </div>
          </div>
        )}
      />
    </>
  );
}`}
                            language="tsx"
                            showLineNumbers
                          />
                        </div>

                        <div>
                          <AnchorHeading level={3} id="interactive-examples">
                            Interactive Examples
                          </AnchorHeading>
                          <p className="text-gray-300 mb-6">
                            Try out the components directly in your browser with
                            our StackBlitz examples. Each example is a complete,
                            working project that you can edit and experiment
                            with.
                          </p>

                          <div className="grid gap-6">
                            <StackBlitzExample
                              component="DateFilter"
                              title="DateFilter - Natural Language Example"
                              description="Try natural language date filtering with expressions like 'last 30 days', 'this week', or 'yesterday'. The filter automatically updates as time passes."
                            />

                            <StackBlitzExample
                              component="QuickFilterDropdown"
                              title="QuickFilterDropdown - Custom Presets"
                              description="Create custom filter presets for common queries. Mix multiple columns, save filter combinations, and provide one-click access to complex filters."
                            />

                            <StackBlitzExample
                              component="ActiveFilters"
                              title="ActiveFilters - Interactive Pills"
                              description="Display all active filters as interactive pills. Users can see at a glance what filters are applied and remove them with a single click."
                            />
                          </div>

                          <div className="mt-8 bg-gray-900 rounded-lg p-6 border border-gray-800">
                            <h4 className="text-base font-semibold text-white mb-3">
                              Tips for Using StackBlitz Examples
                            </h4>
                            <ul className="space-y-2 text-sm text-gray-300">
                              <li className="flex items-start">
                                <span className="text-indigo-400 mr-2">•</span>
                                <span>
                                  Click "Open in StackBlitz" to launch the
                                  example in a new tab
                                </span>
                              </li>
                              <li className="flex items-start">
                                <span className="text-indigo-400 mr-2">•</span>
                                <span>
                                  Fork the project to save your changes and
                                  create your own version
                                </span>
                              </li>
                              <li className="flex items-start">
                                <span className="text-indigo-400 mr-2">•</span>
                                <span>
                                  All examples use the latest version of
                                  ag-grid-react-components
                                </span>
                              </li>
                              <li className="flex items-start">
                                <span className="text-indigo-400 mr-2">•</span>
                                <span>
                                  Examples include sample data and are ready to
                                  run immediately
                                </span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Known Issues - AG Grid Bugs */}
                {activeDocSection === "ag-grid-bugs" && (
                  <div className="space-y-8">
                    <div>
                      <AnchorHeading level={1} id="known-issues">
                        Known Issues
                      </AnchorHeading>
                      <p className="text-gray-300 mb-6">
                        This section documents known issues with AG Grid and
                        their workarounds.
                      </p>

                      <div className="space-y-8">
                        <div>
                          <AnchorHeading level={3} id="setfiltermodel-bug">
                            AG Grid v33 setFilterModel Bug
                          </AnchorHeading>

                          <div className="bg-red-900/20 border border-red-600/30 rounded-lg p-6 mb-6">
                            <div className="flex items-start gap-3">
                              <span className="text-red-400 text-xl">⚠️</span>
                              <div>
                                <h4 className="text-red-400 font-semibold mb-2">
                                  Critical Issue
                                </h4>
                                <p className="text-gray-300 text-sm">
                                  When calling{" "}
                                  <code className="bg-gray-800 px-2 py-1 rounded">
                                    api.setFilterModel()
                                  </code>{" "}
                                  programmatically on custom React filter
                                  components, the filter doesn&apos;t properly
                                  initialize. The component receives the model
                                  in props but doesn&apos;t apply it to internal
                                  state, causing filters to not work.
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-6">
                            <div>
                              <AnchorHeading level={4} id="affected-versions">
                                Affected Versions
                              </AnchorHeading>
                              <ul className="space-y-1 text-gray-300">
                                <li className="flex items-start">
                                  <span className="text-red-400 mr-2">•</span>
                                  AG Grid v33.x (all versions)
                                </li>
                                <li className="flex items-start">
                                  <span className="text-red-400 mr-2">•</span>
                                  Custom React filter components only
                                </li>
                                <li className="flex items-start">
                                  <span className="text-red-400 mr-2">•</span>
                                  Built-in filters work correctly
                                </li>
                              </ul>
                            </div>

                            <div>
                              <AnchorHeading
                                level={4}
                                id="related-github-issues"
                              >
                                Related GitHub Issues
                              </AnchorHeading>
                              <div className="grid md:grid-cols-3 gap-4">
                                <a
                                  href="https://github.com/ag-grid/ag-grid/issues/2256"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="bg-gray-900 rounded-lg p-4 border border-gray-800 hover:border-indigo-600 transition-colors"
                                >
                                  <div className="text-indigo-400 font-mono text-sm mb-1">
                                    #2256
                                  </div>
                                  <div className="text-gray-300 text-sm">
                                    setFilterModel doesn&apos;t initialize
                                    custom filters
                                  </div>
                                </a>
                                <a
                                  href="https://github.com/ag-grid/ag-grid/issues/2709"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="bg-gray-900 rounded-lg p-4 border border-gray-800 hover:border-indigo-600 transition-colors"
                                >
                                  <div className="text-indigo-400 font-mono text-sm mb-1">
                                    #2709
                                  </div>
                                  <div className="text-gray-300 text-sm">
                                    Custom filter state not synced
                                  </div>
                                </a>
                                <a
                                  href="https://github.com/ag-grid/ag-grid/issues/4870"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="bg-gray-900 rounded-lg p-4 border border-gray-800 hover:border-indigo-600 transition-colors"
                                >
                                  <div className="text-indigo-400 font-mono text-sm mb-1">
                                    #4870
                                  </div>
                                  <div className="text-gray-300 text-sm">
                                    React hooks lifecycle issues
                                  </div>
                                </a>
                              </div>
                            </div>

                            <div>
                              <AnchorHeading level={4} id="workaround">
                                Workaround
                              </AnchorHeading>

                              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-6">
                                <div className="flex gap-3">
                                  <svg
                                    className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                    />
                                  </svg>
                                  <div className="flex-1">
                                    <h4 className="font-semibold text-red-400 mb-2">
                                      ⚠️ Critical Workaround Required
                                    </h4>
                                    <p className="text-sm text-gray-300 mb-3">
                                      This is a <strong>critical bug</strong>{" "}
                                      that affects all custom React filter
                                      components in AG Grid v33.x. Without this
                                      workaround:
                                    </p>
                                    <ul className="list-disc list-inside text-sm text-gray-300 space-y-1 mb-3">
                                      <li>Quick filters will not work</li>
                                      <li>URL filter persistence will fail</li>
                                      <li>
                                        Any programmatic filter changes will be
                                        ignored
                                      </li>
                                      <li>
                                        The filter will appear to update but
                                        won&apos;t actually filter data
                                      </li>
                                    </ul>
                                    <p className="text-sm text-gray-300 mb-3">
                                      <strong>Affected versions:</strong> All AG
                                      Grid v33.x releases (33.0.0 - 33.3.0+)
                                    </p>
                                    <p className="text-sm text-gray-300 mb-3">
                                      <strong>Risk level:</strong>{" "}
                                      <span className="text-red-400 font-semibold">
                                        HIGH
                                      </span>{" "}
                                      - This bug causes silent failures that are
                                      difficult to debug.
                                    </p>
                                    <div className="bg-gray-800/50 rounded p-3 mt-3">
                                      <p className="text-xs text-gray-400 mb-2">
                                        Tracking Issues:
                                      </p>
                                      <div className="flex gap-2 flex-wrap">
                                        <a
                                          href="https://github.com/ag-grid/ag-grid/issues/2256"
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="text-xs bg-gray-700 px-2 py-1 rounded hover:bg-gray-600 transition-colors inline-flex items-center gap-1"
                                        >
                                          <svg
                                            className="w-3 h-3"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                          >
                                            <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                                            <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                                          </svg>
                                          #2256
                                        </a>
                                        <a
                                          href="https://github.com/ag-grid/ag-grid/issues/2709"
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="text-xs bg-gray-700 px-2 py-1 rounded hover:bg-gray-600 transition-colors inline-flex items-center gap-1"
                                        >
                                          <svg
                                            className="w-3 h-3"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                          >
                                            <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                                            <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                                          </svg>
                                          #2709
                                        </a>
                                        <a
                                          href="https://github.com/ag-grid/ag-grid/issues/4870"
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="text-xs bg-gray-700 px-2 py-1 rounded hover:bg-gray-600 transition-colors inline-flex items-center gap-1"
                                        >
                                          <svg
                                            className="w-3 h-3"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                          >
                                            <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                                            <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                                          </svg>
                                          #4870
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <p className="text-sm text-gray-400 mb-4">
                                Use the provided{" "}
                                <code className="bg-gray-800 px-2 py-1 rounded">
                                  applyFilterModelWithWorkaround
                                </code>{" "}
                                function instead of calling{" "}
                                <code className="bg-gray-800 px-2 py-1 rounded">
                                  api.setFilterModel()
                                </code>{" "}
                                directly:
                              </p>
                              <p className="text-gray-300 mb-4">
                                Use the{" "}
                                <code className="bg-gray-800 px-2 py-1 rounded">
                                  applyFilterModelWithWorkaround
                                </code>{" "}
                                function instead of calling{" "}
                                <code className="bg-gray-800 px-2 py-1 rounded">
                                  setFilterModel
                                </code>{" "}
                                directly:
                              </p>

                              <CodeBlock
                                code={`import { applyFilterModelWithWorkaround } from 'ag-grid-react-components';

// Instead of:
api.setFilterModel({ dateColumn: filterModel });

// Use:
await applyFilterModelWithWorkaround(api, 'dateColumn', filterModel);`}
                                language="typescript"
                              />

                              <div className="bg-gray-900 rounded-lg p-4 mt-4 border border-gray-800">
                                <h5 className="text-indigo-400 font-semibold mb-2">
                                  How the workaround works:
                                </h5>
                                <ol className="space-y-2 text-sm text-gray-300">
                                  <li className="flex items-start">
                                    <span className="text-indigo-400 font-semibold mr-2">
                                      1.
                                    </span>
                                    Handles AG Grid v33&apos;s Promise-based
                                    filter instances
                                  </li>
                                  <li className="flex items-start">
                                    <span className="text-indigo-400 font-semibold mr-2">
                                      2.
                                    </span>
                                    Manually calls setModel on the filter
                                    instance after creation
                                  </li>
                                  <li className="flex items-start">
                                    <span className="text-indigo-400 font-semibold mr-2">
                                      3.
                                    </span>
                                    Forces grid refresh to ensure DOM updates
                                  </li>
                                  <li className="flex items-start">
                                    <span className="text-indigo-400 font-semibold mr-2">
                                      4.
                                    </span>
                                    Adds proper timing for React component
                                    lifecycle
                                  </li>
                                </ol>
                              </div>
                            </div>

                            <div>
                              <AnchorHeading
                                level={4}
                                id="full-workaround-example"
                              >
                                Full Example
                              </AnchorHeading>
                              <CodeBlock
                                code={`// In your QuickFilterDropdown or similar component
import { applyFilterModelWithWorkaround } from 'ag-grid-react-components';

const handleFilterSelect = async (option) => {
  if (option && option.filterModel && columnId) {
    // Use the workaround for custom filters
    await applyFilterModelWithWorkaround(api, columnId, option.filterModel);
  } else {
    // For clearing filters or using built-in filters
    api.setFilterModel(currentModel);
    api.onFilterChanged();
  }
};`}
                                language="typescript"
                                showLineNumbers
                              />
                            </div>

                            <div>
                              <AnchorHeading level={4} id="when-to-remove">
                                When to Remove the Workaround
                              </AnchorHeading>
                              <div className="bg-indigo-900/20 border border-indigo-600/30 rounded-lg p-4">
                                <p className="text-gray-300 text-sm">
                                  This workaround should be removed once AG Grid
                                  fixes the underlying issue. Monitor the GitHub
                                  issues above for updates. The fix is expected
                                  in a future v33.x patch or v34 release.
                                </p>
                              </div>
                            </div>
                          </div>
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

  // Demo page - real application layout
  if (currentPage !== "demo") {
    // Return empty div with navigation for non-demo pages
    // This should not happen as hero and docs are handled above
    return (
      <div className="h-screen bg-gray-950 text-white flex flex-col overflow-hidden">
        <Navigation currentPage={currentPage} />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-400">Page not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gray-950 text-white flex flex-col overflow-hidden">
      <Navigation currentPage={currentPage} />

      {/* Main Content - fills remaining height */}
      <div className="flex-1 flex flex-col">
        <div className="flex-1 flex flex-col mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-6">
          {/* Compact Header Section */}
          <div className="mb-4">
            {/* Title Row */}
            <div className="mb-4">
              <h1 className="text-2xl font-semibold text-white">
                Project Tasks
              </h1>
              <p className="text-sm text-gray-400 mt-1">
                Manage and track your team&apos;s progress
              </p>
            </div>

            {/* Demo Tabs */}
            <div className="border-b border-gray-700 mb-4">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setActiveDemoTab("client")}
                  className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeDemoTab === "client"
                      ? "border-indigo-500 text-white"
                      : "border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300"
                  }`}
                >
                  Client-Side Data
                </button>
                <button
                  onClick={() => setActiveDemoTab("server")}
                  className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeDemoTab === "server"
                      ? "border-indigo-500 text-white"
                      : "border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300"
                  }`}
                >
                  Server-Side Data
                  <span className="ml-2 px-2 py-0.5 text-xs bg-indigo-600 text-white rounded-full">
                    API
                  </span>
                </button>
                <button
                  onClick={() => setActiveDemoTab("presets")}
                  className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeDemoTab === "presets"
                      ? "border-indigo-500 text-white"
                      : "border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300"
                  }`}
                >
                  Filter Presets
                  <span className="ml-2 px-2 py-0.5 text-xs bg-green-600 text-white rounded-full">
                    NEW
                  </span>
                </button>
              </nav>
            </div>
          </div>

          {/* Client-Side Demo */}
          {activeDemoTab === "client" && (
            <div key="client-demo" className="flex-1 flex flex-col">
              {/* Integrated Toolbar */}
              <DemoToolbar
                searchPlaceholder="Search tasks..."
                onSearchChange={(value) => {
                  if (gridApi) {
                    gridApi.setGridOption("quickFilterText", value);
                  }
                }}
              >
                {/* Quick Filters */}
                {gridApi && (
                  <>
                    <QuickFilterDropdown
                      key={`${activeDemoTab}-date-filter`}
                      api={gridApi}
                      columnId="dueDate"
                      options={dateQuickFilters}
                      placeholder="Time period"
                      showDescriptions={false}
                      className="min-w-[140px]"
                      usePortal="always"
                    />
                    <QuickFilterDropdown
                      key={`${activeDemoTab}-task-filter`}
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

              {/* Active Filters Row and Filter Preset Actions */}
              {gridApi && (
                <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-800 rounded-lg mt-3">
                  <div className="border-t border-gray-700/50 bg-gray-800/20 p-3">
                    <div className="flex items-center justify-between gap-4 flex-wrap">
                      {Object.keys(filterModel).length > 0 && (
                        <ActiveFilters
                          api={gridApi}
                          filterModel={filterModel}
                        />
                      )}
                      <FilterPresetManager
                        api={gridApi}
                        gridId="client-side-demo"
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
                {/* Hero Stats Bar */}
                <StatsBar stats={stats} />

                {/* AG Grid - fills remaining height */}
                <div
                  className="flex-1 relative overflow-hidden"
                  style={{ minHeight: "400px", height: "100%" }}
                >
                  <AgGridReact
                    theme={darkTheme}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    rowData={rowData}
                    animateRows={true}
                    pagination={false}
                    suppressMenuHide={true}
                    cellSelection={true}
                    grandTotalRow="bottom"
                    rowSelection={{
                      mode: "multiRow",
                      enableClickSelection: false,
                    }}
                    suppressCellFocus={false}
                    statusBar={getStatusBarConfig(false)}
                    enableCellTextSelection={true}
                    ensureDomOrder={true}
                    getRowStyle={(params) => {
                      if (params.node.footer) {
                        return {
                          fontWeight: "bold",
                          backgroundColor: "rgba(59, 130, 246, 0.1)",
                        };
                      }
                      return undefined;
                    }}
                    onGridReady={onGridReady}
                    domLayout="normal"
                    components={components}
                    sideBar={sideBarConfig}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Server-Side Demo */}
          {activeDemoTab === "server" && (
            <div className="flex-1 flex flex-col">
              <ServerSideDemo />
            </div>
          )}

          {/* Filter Presets Showcase */}
          {activeDemoTab === "presets" && (
            <div className="flex-1 flex flex-col">
              <SimpleFilterPresetsDemo />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
