import React from "react";

export const DocumentationPanel: React.FC = () => {
  return (
    <div className="documentation-panel">
      <h2 className="doc-title">AG Grid Custom Date Filter Components</h2>

      <section className="doc-section">
        <h3 className="doc-heading">📦 Components Provided</h3>
        <p className="doc-text">
          This package provides two essential date filtering components for AG
          Grid:
        </p>
        <ul className="doc-list">
          <li className="doc-list-item">
            <strong>🔍 RelativeDateFilter</strong> - A powerful date filter that
            supports both absolute date selection via date picker and relative
            date expressions (e.g., "Today+7d"). Accessible through the column
            menu filter icon.
          </li>
          <li className="doc-list-item">
            <strong>🎯 RelativeDateFloatingFilter</strong> - A companion
            floating filter that displays the current filter state in the column
            header and provides quick access to filter modification.
          </li>
        </ul>
      </section>

      <section className="doc-section">
        <h3 className="doc-heading">🏢 Enterprise Features Demonstrated</h3>
        <p className="doc-text">
          This demo showcases several AG Grid Enterprise features (marked with
          (e)):
        </p>
        <ul className="doc-list">
          <li className="doc-list-item">
            <strong>Row Grouping & Aggregation</strong> - Drag columns to the
            "Row Groups" section in the sidebar to group data. See sum and
            average aggregations for numeric columns.
          </li>
          <li className="doc-list-item">
            <strong>Grand Total Row</strong> - View aggregated totals for the
            entire dataset at the bottom of the grid.
          </li>
          <li className="doc-list-item">
            <strong>Filter Tool Panel</strong> - Access all column filters in
            one place via the sidebar's filter tab.
          </li>
          <li className="doc-list-item">
            <strong>Advanced Column Management</strong> - Use the columns tool
            panel to show/hide columns and manage grouping.
          </li>
        </ul>
      </section>

      <section className="doc-section">
        <h3 className="doc-heading">📅 Using Relative Date Expressions</h3>
        <p className="doc-text">
          Click the filter icon on any date column and select "Relative Date"
          mode:
        </p>
        <ul className="doc-list">
          <li className="doc-list-item">
            <code>Today</code> - Current date
          </li>
          <li className="doc-list-item">
            <code>Today+7d</code> - 7 days from today
          </li>
          <li className="doc-list-item">
            <code>Today-3m</code> - 3 months ago
          </li>
          <li className="doc-list-item">
            <code>Today+1y</code> - 1 year from today
          </li>
          <li className="doc-list-item">
            Supported units: <strong>d</strong> (days), <strong>w</strong>{" "}
            (weeks),
            <strong>m</strong> (months), <strong>y</strong> (years)
          </li>
        </ul>
      </section>

      <section className="doc-section">
        <h3 className="doc-heading">⚡ Quick Filter Dropdown</h3>
        <p className="doc-text">
          Use the dropdown above the grid for rapid filtering with expanded
          options:
        </p>
        <ul className="doc-list">
          <li className="doc-list-item">
            <strong>All Items</strong> - Clear all date filters
          </li>
          <li className="doc-list-item">
            <strong>Today</strong> - Filter to today's date only
          </li>
          <li className="doc-list-item">
            <strong>Upcoming</strong> - Show future dates after today
          </li>
          <li className="doc-list-item">
            <strong>Past</strong> - Show past dates before today
          </li>
          <li className="doc-list-item">
            <strong>This Week</strong> - Items in the current week
          </li>
          <li className="doc-list-item">
            <strong>Last Week</strong> - Items from the previous week
          </li>
          <li className="doc-list-item">
            <strong>This Month</strong> - Items in the current month
          </li>
          <li className="doc-list-item">
            <strong>Last Month</strong> - Items from the previous month
          </li>
        </ul>
      </section>

      <section className="doc-section">
        <h3 className="doc-heading">📊 Additional Demo Features</h3>
        <div className="doc-subsection">
          <h4 className="doc-subheading">Visual Enhancements:</h4>
          <ul className="doc-list">
            <li className="doc-list-item">
              Alternating row colors for better readability
            </li>
            <li className="doc-list-item">
              Warm color scheme theme applied to the grid
            </li>
            <li className="doc-list-item">
              Pagination with configurable page sizes (10, 20, 50, 100 rows)
            </li>
            <li className="doc-list-item">
              Fixed height grid (600px) with vertical scrolling
            </li>
            <li className="doc-list-item">
              Grand total row showing sum aggregations at the bottom
            </li>
          </ul>
        </div>
      </section>

      <section className="doc-section">
        <h3 className="doc-heading">💡 Try This:</h3>
        <ol className="doc-list doc-list-numbered">
          <li>
            Use the Quick Filter dropdown to select "This Week" or "Last Month"
          </li>
          <li>
            Click the filter icon on the Date column and switch to "Relative
            Date" mode
          </li>
          <li>Enter "Today-7d" to see items from the past week</li>
          <li>
            Drag the "Category" column to the Row Groups area to group by
            category
          </li>
          <li>
            Use the Filter tool panel tab to see all active filters at once
          </li>
          <li>Notice how the dropdown shows the current filter state</li>
        </ol>
      </section>

      <section className="doc-section doc-note">
        <p className="doc-text">
          <strong>Note on Enterprise Features:</strong> This demo uses AG Grid
          Enterprise to showcase row grouping, aggregation, filter tool panel,
          and grand totals. These features are marked with (e) in the AG Grid
          documentation and require a commercial license for production use.
        </p>
      </section>
    </div>
  );
};
