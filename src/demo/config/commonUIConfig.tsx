import React from "react";

// Stats card configuration
export interface StatCard {
  id: string;
  label: string;
  icon: React.ReactNode;
  colorClass: string;
  getValue: (stats: any) => string | number;
  formatValue?: (value: string | number) => string;
}

export const statsCards: StatCard[] = [
  {
    id: "taskCount",
    label: "Number of Tasks",
    icon: (
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
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
        />
      </svg>
    ),
    colorClass: "indigo",
    getValue: (stats) => stats.taskCount || 0,
    formatValue: (value) => value.toLocaleString(),
  },
  {
    id: "totalBudget",
    label: "Total Budget",
    icon: (
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
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    colorClass: "green",
    getValue: (stats) => stats.totalBudget || 0,
    formatValue: (value) => `$${value.toLocaleString()}`,
  },
  {
    id: "avgProgress",
    label: "Average Progress",
    icon: (
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
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        />
      </svg>
    ),
    colorClass: "blue",
    getValue: (stats) => stats.avgProgress || 0,
    formatValue: (value) =>
      `${typeof value === "number" ? value.toFixed(1) : value}%`,
  },
  {
    id: "budgetRemaining",
    label: "Budget Remaining",
    icon: (
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
          d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
        />
      </svg>
    ),
    colorClass: "amber",
    getValue: (stats) => stats.budgetRemaining || 0,
    formatValue: (value) => `$${value.toLocaleString()}`,
  },
];

// Stats card component
export const StatsCard: React.FC<{
  card: StatCard;
  stats: any;
}> = ({ card, stats }) => {
  const value = card.getValue(stats);
  const isLoading = value === "—";
  const formattedValue = isLoading
    ? "—"
    : card.formatValue
      ? card.formatValue(value)
      : value;

  return (
    <div className="px-6 py-5">
      <div className="flex items-center gap-4">
        <div className={`p-2.5 bg-${card.colorClass}-500/10 rounded-lg`}>
          <span className={`text-${card.colorClass}-400`}>{card.icon}</span>
        </div>
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wider">
            {card.label}
          </p>
          <p
            className={`text-2xl font-semibold mt-0.5 ${isLoading ? "text-gray-600" : "text-white"}`}
          >
            {formattedValue}
          </p>
        </div>
      </div>
    </div>
  );
};

// Search bar component
export const SearchBar: React.FC<{
  placeholder?: string;
  onChange: (value: string) => void;
  className?: string;
}> = ({ placeholder = "Search...", onChange, className = "" }) => {
  return (
    <div className={`relative flex-1 min-w-[240px] ${className}`}>
      <input
        type="text"
        placeholder={placeholder}
        className="w-full px-3 py-2 pl-10 bg-gray-800/50 border border-gray-700 rounded-md text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
        onChange={(e) => onChange(e.target.value)}
      />
      <svg
        className="absolute left-3 top-2.5 w-4 h-4 text-gray-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </div>
  );
};

// Toolbar component with search and quick filters
export const DemoToolbar: React.FC<{
  children?: React.ReactNode;
  searchPlaceholder?: string;
  onSearchChange?: (value: string) => void;
}> = ({ children, searchPlaceholder, onSearchChange }) => {
  return (
    <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-800 rounded-lg">
      {/* Search and Quick Filters Row */}
      <div className="p-3">
        <div className="flex items-center gap-3 flex-wrap">
          {/* Search Bar */}
          {onSearchChange && (
            <SearchBar
              placeholder={searchPlaceholder}
              onChange={onSearchChange}
            />
          )}

          {/* Divider */}
          {onSearchChange && children && (
            <div className="h-8 w-px bg-gray-700"></div>
          )}

          {/* Quick Filters and other children */}
          {children}
        </div>
      </div>
    </div>
  );
};

// Stats bar component
export const StatsBar: React.FC<{
  stats: any;
  cards?: StatCard[];
}> = ({ stats, cards = statsCards }) => {
  return (
    <div className="border-b border-gray-700/50 bg-gray-900/30">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-x divide-gray-700/50">
        {cards.map((card) => (
          <StatsCard key={card.id} card={card} stats={stats} />
        ))}
      </div>
    </div>
  );
};
