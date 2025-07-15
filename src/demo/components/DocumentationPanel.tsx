import React from "react";

export const DocumentationPanel: React.FC = () => {
  return (
    <div className="documentation-panel">
      <h2 className="doc-title">AG Grid Headless React Components</h2>

      <section className="doc-section">
        <h3 className="doc-heading">🔧 Headless UI Architecture</h3>
        <p className="doc-text">
          These components are built using a{" "}
          <strong>headless UI pattern</strong> - they provide all the
          functionality, logic, and accessibility features without any styling.
          This gives you complete control over the appearance while maintaining
          robust behavior.
        </p>
        <div className="doc-subsection">
          <h4 className="doc-subheading">Key Benefits:</h4>
          <ul className="doc-list">
            <li className="doc-list-item">
              <strong>🎨 Full Styling Control</strong> - No CSS conflicts, style
              exactly how you want
            </li>
            <li className="doc-list-item">
              <strong>📦 Smaller Bundle Size</strong> - Only includes the logic
              you need
            </li>
            <li className="doc-list-item">
              <strong>🔄 Framework Agnostic</strong> - Works with any CSS
              framework or approach
            </li>
            <li className="doc-list-item">
              <strong>♿ Built-in Accessibility</strong> - ARIA attributes and
              keyboard navigation included
            </li>
          </ul>
        </div>
      </section>

      <section className="doc-section">
        <h3 className="doc-heading">🏗️ Compound Component Pattern</h3>
        <p className="doc-text">
          Components use a <strong>compound component pattern</strong> where you
          compose the UI from smaller, focused sub-components:
        </p>
        <div className="doc-code-block">
          <pre>
            <code>{`<DateFilter>
  <DateFilter.Root>
    <DateFilter.TypeSelector />
    <DateFilter.ModeToggle />
    <DateFilter.RelativeSection>
      <DateFilter.RelativeInput />
      <DateFilter.RelativePresets />
    </DateFilter.RelativeSection>
    <DateFilter.AbsoluteSection>
      <DateFilter.DatePicker />
    </DateFilter.AbsoluteSection>
  </DateFilter.Root>
</DateFilter>`}</code>
          </pre>
        </div>
        <p className="doc-text">
          Each sub-component handles a specific piece of functionality while
          sharing state through React Context.
        </p>
      </section>

      <section className="doc-section">
        <h3 className="doc-heading">🎯 Styling with Data Attributes</h3>
        <p className="doc-text">
          Components expose styling hooks through <code>data-*</code> attributes
          rather than CSS classes:
        </p>
        <div className="doc-code-block">
          <pre>
            <code>{`/* Target components by data attributes */
[data-component="date-filter-root"] {
  border: 1px solid #ccc;
  border-radius: 4px;
}

[data-component="date-filter-type-selector"] {
  background: #f5f5f5;
}

[data-state="active"] {
  background: #007bff;
  color: white;
}`}</code>
          </pre>
        </div>
        <div className="doc-subsection">
          <h4 className="doc-subheading">Common Data Attributes:</h4>
          <ul className="doc-list">
            <li className="doc-list-item">
              <code>data-component</code> - Identifies the component type
            </li>
            <li className="doc-list-item">
              <code>data-state</code> - Current state (active, disabled, open,
              etc.)
            </li>
            <li className="doc-list-item">
              <code>data-position</code> - Position information (top, bottom,
              left, right)
            </li>
            <li className="doc-list-item">
              <code>data-orientation</code> - Layout orientation (horizontal,
              vertical)
            </li>
          </ul>
        </div>
      </section>

      <section className="doc-section">
        <h3 className="doc-heading">📦 Components Provided</h3>
        <p className="doc-text">
          This package provides essential headless components for AG Grid:
        </p>
        <ul className="doc-list">
          <li className="doc-list-item">
            <strong>🗓️ DateFilter</strong> - A powerful headless date filter
            that supports both absolute date selection via date picker and
            relative date expressions (e.g., "Today+7d"). Accessible through the
            column menu filter icon.
          </li>
          <li className="doc-list-item">
            <strong>⚡ QuickFilterDropdown</strong> - A headless dropdown
            component for quick filter presets with search functionality and
            keyboard navigation.
          </li>
          <li className="doc-list-item">
            <strong>🏷️ ActiveFilters</strong> - A headless component that
            displays currently active filters with remove functionality and
            clear all option.
          </li>
          <li className="doc-list-item">
            <strong>💾 SavedViewsDropdown</strong> - A headless component for
            managing saved filter and column states with create, edit, and
            delete operations.
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
