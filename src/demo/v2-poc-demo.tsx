import React, { useState } from "react";
import { DateFilter } from "../components/v2/DateFilter";
import "./v2-headless-styles.css";

export function V2PocDemo() {
  const [tailwindValue, setTailwindValue] = useState("");
  const [cssModulesValue, setCssModulesValue] = useState("");
  const [plainCssValue, setPlainCssValue] = useState("");
  const [unstyledValue, setUnstyledValue] = useState("");

  // Demo data to show filtering
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>("");
  const demoData = [
    { id: 1, name: "Order #1001", date: new Date("2024-01-15"), amount: 250.0 },
    { id: 2, name: "Order #1002", date: new Date("2024-01-10"), amount: 175.5 },
    { id: 3, name: "Order #1003", date: new Date("2024-01-05"), amount: 320.0 },
    {
      id: 4,
      name: "Order #1004",
      date: new Date("2023-12-28"),
      amount: 450.75,
    },
    { id: 5, name: "Order #1005", date: new Date("2023-12-20"), amount: 180.0 },
    {
      id: 6,
      name: "Order #1006",
      date: new Date("2023-12-15"),
      amount: 290.25,
    },
    { id: 7, name: "Order #1007", date: new Date("2023-11-30"), amount: 520.0 },
    { id: 8, name: "Order #1008", date: new Date("2023-11-15"), amount: 135.5 },
  ];

  const applyFilter = (filterValue: string) => {
    if (!filterValue) {
      setFilteredData([]);
      setActiveFilter("");
      return;
    }

    setActiveFilter(filterValue);

    try {
      // Parse the relative date
      const now = new Date();
      const trimmed = filterValue.trim().toLowerCase();
      let targetDate: Date;

      if (trimmed === "today") {
        targetDate = new Date(now.setHours(0, 0, 0, 0));
      } else if (trimmed === "yesterday") {
        targetDate = new Date(now);
        targetDate.setDate(targetDate.getDate() - 1);
        targetDate.setHours(0, 0, 0, 0);
      } else if (trimmed.match(/^-(\d+)d$/)) {
        const days = parseInt(trimmed.match(/^-(\d+)d$/)![1]);
        targetDate = new Date(now);
        targetDate.setDate(targetDate.getDate() - days);
        targetDate.setHours(0, 0, 0, 0);
      } else if (trimmed.includes("last week")) {
        targetDate = new Date(now);
        targetDate.setDate(targetDate.getDate() - 7);
        targetDate.setHours(0, 0, 0, 0);
      } else if (trimmed.includes("last month")) {
        targetDate = new Date(now);
        targetDate.setMonth(targetDate.getMonth() - 1);
        targetDate.setHours(0, 0, 0, 0);
      } else {
        setFilteredData([]);
        return;
      }

      // Filter data after the target date
      const filtered = demoData.filter((item) => item.date >= targetDate);
      setFilteredData(filtered);
    } catch {
      setFilteredData([]);
    }
  };

  return (
    <div className="p-8 space-y-12">
      <div>
        <h1 className="text-3xl font-bold mb-4">
          V2.0 Headless DateFilter POC
        </h1>
        <p className="text-lg text-gray-600 mb-4">
          This demonstrates the headless DateFilter component - it provides date
          filtering behavior without any built-in styles. The component handles:
        </p>
        <ul className="list-disc list-inside text-gray-600 mb-6 space-y-1">
          <li>Date parsing and validation</li>
          <li>Relative date expressions (e.g., "-7d", "last week")</li>
          <li>Mode switching between relative and absolute dates</li>
          <li>State management and error handling</li>
          <li>Accessibility (ARIA attributes, keyboard navigation)</li>
        </ul>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
          <h3 className="font-semibold text-blue-900 mb-2">
            🎯 Try These Examples:
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <code className="bg-white px-3 py-2 rounded border border-blue-200 text-sm">
              -7d
            </code>
            <code className="bg-white px-3 py-2 rounded border border-blue-200 text-sm">
              today
            </code>
            <code className="bg-white px-3 py-2 rounded border border-blue-200 text-sm">
              yesterday
            </code>
            <code className="bg-white px-3 py-2 rounded border border-blue-200 text-sm">
              last week
            </code>
            <code className="bg-white px-3 py-2 rounded border border-blue-200 text-sm">
              last month
            </code>
            <code className="bg-white px-3 py-2 rounded border border-blue-200 text-sm">
              -30d
            </code>
            <code className="bg-white px-3 py-2 rounded border border-blue-200 text-sm">
              -1w
            </code>
            <code className="bg-white px-3 py-2 rounded border border-blue-200 text-sm text-red-600">
              invalid
            </code>
          </div>
          <p className="text-sm text-blue-700 mt-3">
            Enter one of these in any DateFilter below and click "Apply" to see
            the filtering in action!
          </p>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h3 className="font-semibold text-yellow-900 mb-2">
            💡 What Makes This "Headless"?
          </h3>
          <p className="text-sm text-yellow-800">
            The DateFilter component below provides <strong>zero CSS</strong>.
            All the styling you see is applied by the user through className
            props. The component only handles:
          </p>
          <ul className="list-disc list-inside text-sm text-yellow-800 mt-2 space-y-1">
            <li>State management (active mode, input values, validation)</li>
            <li>Date parsing and filtering logic</li>
            <li>Accessibility attributes (aria-pressed, aria-invalid)</li>
            <li>Event handling (onChange, onClick)</li>
          </ul>
          <p className="text-sm text-yellow-800 mt-2">
            You have complete control over the visual appearance!
          </p>
        </div>
      </div>

      {/* Sample Data Table */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-4">
          Sample Data (Recent Orders)
        </h2>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {demoData.map((item) => (
                <tr
                  key={item.id}
                  className={filteredData.includes(item) ? "bg-blue-50" : ""}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.date.toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${item.amount.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {activeFilter && (
            <div className="bg-blue-100 px-6 py-3 text-sm text-blue-800 flex items-center justify-between">
              <span>
                Showing {filteredData.length} orders matching filter:{" "}
                <strong>{activeFilter}</strong>
              </span>
              <button
                onClick={() => {
                  setFilteredData([]);
                  setActiveFilter("");
                  setTailwindValue("");
                  setCssModulesValue("");
                  setPlainCssValue("");
                  setUnstyledValue("");
                }}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Clear Filter
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Example 1: Tailwind CSS Styling */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">1. Tailwind CSS Styling</h2>
        <p className="text-gray-600 mb-4">
          Using Tailwind's utility classes and data attribute modifiers. This
          example shows a fully-styled component with dark mode support.
        </p>

        <DateFilter
          value={tailwindValue}
          onChange={setTailwindValue}
          onApply={() => applyFilter(tailwindValue)}
          onReset={() => {
            setTailwindValue("");
            setFilteredData([]);
            setActiveFilter("");
          }}
        >
          <DateFilter.Root className="w-full max-w-md">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 space-y-4">
              {/* Mode Toggle */}
              <DateFilter.ModeToggle className="flex gap-1 p-1 bg-gray-100 dark:bg-gray-700 rounded-md">
                <DateFilter.ModeButton
                  mode="relative"
                  className="
                    flex-1 px-3 py-1.5 text-sm font-medium rounded transition-all
                    data-[active=true]:bg-white data-[active=true]:dark:bg-gray-600 
                    data-[active=true]:shadow-sm data-[active=true]:text-gray-900 data-[active=true]:dark:text-white
                    data-[inactive=true]:text-gray-600 data-[inactive=true]:dark:text-gray-400
                  "
                >
                  Relative
                </DateFilter.ModeButton>
                <DateFilter.ModeButton
                  mode="absolute"
                  className="
                    flex-1 px-3 py-1.5 text-sm font-medium rounded transition-all
                    data-[active=true]:bg-white data-[active=true]:dark:bg-gray-600 
                    data-[active=true]:shadow-sm data-[active=true]:text-gray-900 data-[active=true]:dark:text-white
                    data-[inactive=true]:text-gray-600 data-[inactive=true]:dark:text-gray-400
                  "
                >
                  Specific Dates
                </DateFilter.ModeButton>
              </DateFilter.ModeToggle>

              {/* Relative Date Input */}
              <DateFilter.RelativeSection className="space-y-2">
                <DateFilter.RelativeInput
                  className="
                    w-full px-3 py-2 text-sm
                    bg-white dark:bg-gray-900 
                    border border-gray-300 dark:border-gray-600 
                    rounded-md shadow-sm
                    focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none
                    data-[invalid=true]:border-red-500 data-[invalid=true]:focus:ring-red-500
                    placeholder:text-gray-400 dark:placeholder:text-gray-500
                  "
                  placeholder="e.g., -7d, today, last week"
                />
                <DateFilter.HelpText className="text-xs text-gray-500 dark:text-gray-400">
                  Use natural language like "last 30 days" or "-1w"
                </DateFilter.HelpText>
                <DateFilter.ErrorMessage className="text-xs text-red-600 dark:text-red-400" />
              </DateFilter.RelativeSection>

              {/* Absolute Date Inputs */}
              <DateFilter.AbsoluteSection className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Start Date
                  </label>
                  <DateFilter.StartDateInput
                    className="
                      w-full px-3 py-2 text-sm
                      bg-white dark:bg-gray-900 
                      border border-gray-300 dark:border-gray-600 
                      rounded-md shadow-sm
                      focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none
                    "
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    End Date
                  </label>
                  <DateFilter.EndDateInput
                    className="
                      w-full px-3 py-2 text-sm
                      bg-white dark:bg-gray-900 
                      border border-gray-300 dark:border-gray-600 
                      rounded-md shadow-sm
                      focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none
                    "
                  />
                </div>
              </DateFilter.AbsoluteSection>

              {/* Action Buttons */}
              <DateFilter.Actions className="flex gap-2 pt-2">
                <DateFilter.ApplyButton
                  className="
                    flex-1 px-4 py-2 text-sm font-medium
                    bg-blue-600 hover:bg-blue-700 
                    data-[disabled=true]:bg-gray-300 data-[disabled=true]:cursor-not-allowed
                    text-white rounded-md shadow-sm 
                    transition-colors
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                  "
                >
                  Apply Filter
                </DateFilter.ApplyButton>
                <DateFilter.ResetButton
                  className="
                    px-4 py-2 text-sm font-medium
                    bg-white dark:bg-gray-800 
                    hover:bg-gray-50 dark:hover:bg-gray-700
                    border border-gray-300 dark:border-gray-600 
                    text-gray-700 dark:text-gray-300 
                    rounded-md shadow-sm 
                    transition-colors
                    focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2
                  "
                >
                  Reset
                </DateFilter.ResetButton>
              </DateFilter.Actions>
            </div>
          </DateFilter.Root>
        </DateFilter>

        <div className="mt-4 text-sm text-gray-600">
          Current value:{" "}
          <code className="bg-gray-100 px-2 py-1 rounded">
            {tailwindValue || "(empty)"}
          </code>
        </div>
      </section>

      {/* Example 2: CSS Modules Approach */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">2. CSS Modules Approach</h2>
        <p className="text-gray-600 mb-4">
          Using CSS classes defined in separate CSS files. This shows how you'd
          style components with traditional CSS or CSS modules.
        </p>

        <DateFilter
          value={cssModulesValue}
          onChange={setCssModulesValue}
          onApply={() => applyFilter(cssModulesValue)}
          onReset={() => {
            setCssModulesValue("");
            setFilteredData([]);
            setActiveFilter("");
          }}
        >
          <DateFilter.Root className="date-filter-root">
            <DateFilter.ModeToggle className="date-filter-mode-toggle">
              <DateFilter.ModeButton
                mode="relative"
                className="date-filter-mode-button"
              >
                Relative
              </DateFilter.ModeButton>
              <DateFilter.ModeButton
                mode="absolute"
                className="date-filter-mode-button"
              >
                Absolute
              </DateFilter.ModeButton>
            </DateFilter.ModeToggle>

            <DateFilter.RelativeSection className="date-filter-section">
              <DateFilter.RelativeInput
                className="date-filter-input"
                placeholder="Enter relative date"
              />
              <DateFilter.HelpText className="date-filter-help">
                Examples: -7d, last week, yesterday
              </DateFilter.HelpText>
              <DateFilter.ErrorMessage className="date-filter-error" />
            </DateFilter.RelativeSection>

            <DateFilter.AbsoluteSection className="date-filter-date-grid">
              <div className="date-filter-field">
                <label className="date-filter-label">Start Date</label>
                <DateFilter.StartDateInput className="date-filter-input" />
              </div>
              <div className="date-filter-field">
                <label className="date-filter-label">End Date</label>
                <DateFilter.EndDateInput className="date-filter-input" />
              </div>
            </DateFilter.AbsoluteSection>

            <DateFilter.Actions className="date-filter-actions">
              <DateFilter.ApplyButton className="date-filter-button date-filter-button-primary">
                Apply
              </DateFilter.ApplyButton>
              <DateFilter.ResetButton className="date-filter-button date-filter-button-secondary">
                Reset
              </DateFilter.ResetButton>
            </DateFilter.Actions>
          </DateFilter.Root>
        </DateFilter>

        <div className="mt-4 text-sm text-gray-600">
          Current value:{" "}
          <code className="bg-gray-100 px-2 py-1 rounded">
            {cssModulesValue || "(empty)"}
          </code>
        </div>
      </section>

      {/* Example 3: Plain CSS with Data Attributes */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">
          3. Plain CSS with Data Attributes
        </h2>
        <p className="text-gray-600 mb-4">
          Using data attributes for state-based styling. Notice how the active
          state changes button colors based on data-active attribute.
        </p>

        <DateFilter
          value={plainCssValue}
          onChange={setPlainCssValue}
          onApply={() => applyFilter(plainCssValue)}
          onReset={() => {
            setPlainCssValue("");
            setFilteredData([]);
            setActiveFilter("");
          }}
        >
          <DateFilter.Root data-theme="custom">
            <DateFilter.ModeToggle>
              <DateFilter.ModeButton mode="relative">
                Relative
              </DateFilter.ModeButton>
              <DateFilter.ModeButton mode="absolute">
                Absolute
              </DateFilter.ModeButton>
            </DateFilter.ModeToggle>

            <DateFilter.RelativeSection>
              <DateFilter.RelativeInput placeholder="Enter date expression" />
              <DateFilter.HelpText>Use -7d for 7 days ago</DateFilter.HelpText>
              <DateFilter.ErrorMessage />
            </DateFilter.RelativeSection>

            <DateFilter.AbsoluteSection>
              <div>
                <label>From</label>
                <DateFilter.StartDateInput />
              </div>
              <div>
                <label>To</label>
                <DateFilter.EndDateInput />
              </div>
            </DateFilter.AbsoluteSection>

            <DateFilter.Actions>
              <DateFilter.ApplyButton>Apply</DateFilter.ApplyButton>
              <DateFilter.ResetButton>Clear</DateFilter.ResetButton>
            </DateFilter.Actions>
          </DateFilter.Root>
        </DateFilter>

        <div className="mt-4 text-sm text-gray-600">
          Current value:{" "}
          <code className="bg-gray-100 px-2 py-1 rounded">
            {plainCssValue || "(empty)"}
          </code>
        </div>
      </section>

      {/* Example 4: Completely Unstyled */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">4. Completely Unstyled</h2>
        <p className="text-gray-600 mb-4">
          Raw HTML elements with no styling - this shows what you get out of the
          box. All styling is up to you!
        </p>

        <DateFilter
          value={unstyledValue}
          onChange={setUnstyledValue}
          onApply={() => applyFilter(unstyledValue)}
          onReset={() => {
            setUnstyledValue("");
            setFilteredData([]);
            setActiveFilter("");
          }}
        >
          <DateFilter.Root>
            <DateFilter.ModeToggle>
              <DateFilter.ModeButton mode="relative">
                Relative
              </DateFilter.ModeButton>
              <DateFilter.ModeButton mode="absolute">
                Absolute
              </DateFilter.ModeButton>
            </DateFilter.ModeToggle>

            <DateFilter.RelativeSection>
              <DateFilter.RelativeInput placeholder="Enter relative date" />
              <DateFilter.HelpText>
                Format: -7d, today, last week
              </DateFilter.HelpText>
              <DateFilter.ErrorMessage />
            </DateFilter.RelativeSection>

            <DateFilter.AbsoluteSection>
              <div>
                <label>Start Date</label>
                <DateFilter.StartDateInput />
              </div>
              <div>
                <label>End Date</label>
                <DateFilter.EndDateInput />
              </div>
            </DateFilter.AbsoluteSection>

            <DateFilter.Actions>
              <DateFilter.ApplyButton />
              <DateFilter.ResetButton />
            </DateFilter.Actions>
          </DateFilter.Root>
        </DateFilter>

        <div className="mt-4 text-sm text-gray-600">
          Current value:{" "}
          <code className="bg-gray-100 px-2 py-1 rounded">
            {unstyledValue || "(empty)"}
          </code>
        </div>
      </section>
    </div>
  );
}
