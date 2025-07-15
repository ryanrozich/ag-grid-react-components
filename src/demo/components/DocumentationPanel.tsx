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
        <h3 className="doc-heading">💾 SavedViewsDropdown</h3>
        <p className="doc-text">
          The SavedViewsDropdown is a powerful headless component that enables
          users to save, manage, and apply custom grid views. It supports saving
          either just filters or the complete grid state including column
          configuration, sorting, and filtering.
        </p>

        <div className="doc-subsection">
          <h4 className="doc-subheading">Overview:</h4>
          <p className="doc-text">
            SavedViewsDropdown provides a complete solution for persisting and
            managing grid configurations:
          </p>
          <ul className="doc-list">
            <li className="doc-list-item">
              <strong>Save Current View</strong> - Capture the current grid
              state as a named view
            </li>
            <li className="doc-list-item">
              <strong>Apply Saved Views</strong> - Quickly switch between saved
              configurations
            </li>
            <li className="doc-list-item">
              <strong>Manage Views</strong> - Rename, delete, categorize, and
              set default views
            </li>
            <li className="doc-list-item">
              <strong>Import/Export</strong> - Share views between users or
              environments
            </li>
            <li className="doc-list-item">
              <strong>Flexible Storage</strong> - Built-in local storage support
              with pluggable architecture for server persistence
            </li>
          </ul>
        </div>

        <div className="doc-subsection">
          <h4 className="doc-subheading">Basic Usage:</h4>
          <div className="doc-code-block">
            <pre>
              <code>{`import { SavedViewsDropdown } from 'ag-grid-react-components';

// Basic usage with local storage
<SavedViewsDropdown
  api={gridApi}
  columnId="_multi"
  placeholder="My Views"
/>

// With all features enabled
<SavedViewsDropdown
  api={gridApi}
  columnId="_multi"
  placeholder="Select a view"
  showManagementMenu={true}
  onViewChange={(view) => console.log('View changed:', view)}
/>`}</code>
            </pre>
          </div>
        </div>

        <div className="doc-subsection">
          <h4 className="doc-subheading">Headless Examples:</h4>
          <p className="doc-text">
            As a headless component, SavedViewsDropdown provides the
            functionality without styling:
          </p>
          <div className="doc-code-block">
            <pre>
              <code>{`// Unstyled - pure functionality
<SavedViewsDropdown
  api={gridApi}
  columnId="_multi"
/>

// With custom styling via data attributes
[data-component="quick-filter-dropdown"] {
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  background: white;
}

[data-component="view-management-menu"] {
  position: relative;
}

[data-component="view-management-menu-button"] {
  padding: 0.5rem;
  border-radius: 0.375rem;
}

[data-component="view-management-menu-button"]:hover {
  background: #f3f4f6;
}`}</code>
            </pre>
          </div>
        </div>

        <div className="doc-subsection">
          <h4 className="doc-subheading">API Documentation:</h4>
          <table className="doc-api-table">
            <thead>
              <tr>
                <th>Prop</th>
                <th>Type</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <code>api</code>
                </td>
                <td>
                  <code>GridApi | null</code>
                </td>
                <td>AG Grid API instance (required)</td>
              </tr>
              <tr>
                <td>
                  <code>columnId</code>
                </td>
                <td>
                  <code>string</code>
                </td>
                <td>Column ID to apply filters to (required)</td>
              </tr>
              <tr>
                <td>
                  <code>loader</code>
                </td>
                <td>
                  <code>ViewDropdownLoader</code>
                </td>
                <td>View loader instance (defaults to LocalStorageLoader)</td>
              </tr>
              <tr>
                <td>
                  <code>placeholder</code>
                </td>
                <td>
                  <code>string</code>
                </td>
                <td>Placeholder text for dropdown (default: "My Views")</td>
              </tr>
              <tr>
                <td>
                  <code>className</code>
                </td>
                <td>
                  <code>string</code>
                </td>
                <td>Custom CSS class name</td>
              </tr>
              <tr>
                <td>
                  <code>showManagementMenu</code>
                </td>
                <td>
                  <code>boolean</code>
                </td>
                <td>Show view management menu (default: true)</td>
              </tr>
              <tr>
                <td>
                  <code>onViewChange</code>
                </td>
                <td>
                  <code>(view: SavedViewOption | null) =&gt; void</code>
                </td>
                <td>Callback when view changes</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="doc-subsection">
          <h4 className="doc-subheading">Local Storage Example:</h4>
          <p className="doc-text">
            By default, SavedViewsDropdown uses local storage to persist views:
          </p>
          <div className="doc-code-block">
            <pre>
              <code>{`import { SavedViewsDropdown, LocalStorageLoader } from 'ag-grid-react-components';

// Uses LocalStorageLoader by default
<SavedViewsDropdown
  api={gridApi}
  columnId="_multi"
/>

// With custom storage key
const loader = new LocalStorageLoader({
  storageKey: 'my-app-saved-views',
  defaultViewKey: 'my-app-default-view'
});

<SavedViewsDropdown
  api={gridApi}
  columnId="_multi"
  loader={loader}
/>`}</code>
            </pre>
          </div>
        </div>

        <div className="doc-subsection">
          <h4 className="doc-subheading">Server Persistence Example:</h4>
          <p className="doc-text">
            Implement a custom loader for server-side persistence:
          </p>
          <div className="doc-code-block">
            <pre>
              <code>{`// Custom server loader implementation
class ServerViewLoader implements ViewDropdownLoader {
  async loadOptions(): Promise<SavedViewOption[]> {
    const response = await fetch('/api/views');
    return response.json();
  }

  async saveOption(option: SavedViewOption): Promise<void> {
    await fetch('/api/views', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(option)
    });
  }

  async deleteOption(id: string): Promise<void> {
    await fetch(\`/api/views/\${id}\`, { method: 'DELETE' });
  }

  async updateOption(id: string, updates: Partial<SavedViewOption>): Promise<void> {
    await fetch(\`/api/views/\${id}\`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });
  }

  // Optional: real-time updates via WebSocket
  subscribe(callback: () => void): () => void {
    const ws = new WebSocket('ws://localhost:3000/views');
    ws.onmessage = () => callback();
    return () => ws.close();
  }
}

// Usage
const serverLoader = new ServerViewLoader();

<SavedViewsDropdown
  api={gridApi}
  columnId="_multi"
  loader={serverLoader}
/>`}</code>
            </pre>
          </div>
        </div>

        <div className="doc-subsection">
          <h4 className="doc-subheading">Advanced Features:</h4>

          <h5 className="doc-subsubheading">Categories:</h5>
          <p className="doc-text">
            Organize views into categories for better management:
          </p>
          <div className="doc-code-block">
            <pre>
              <code>{`// Views are automatically organized by category in the management modal
const viewWithCategory: SavedViewOption = {
  id: 'sales-q4',
  label: 'Q4 Sales Report',
  saveType: 'full-view',
  filterModel: { /* ... */ },
  metadata: {
    category: 'Sales Reports',
    createdAt: new Date().toISOString()
  }
};`}</code>
            </pre>
          </div>

          <h5 className="doc-subsubheading">Custom Icons:</h5>
          <p className="doc-text">Add visual indicators to views:</p>
          <div className="doc-code-block">
            <pre>
              <code>{`// Default views show a star icon
// Categories show a folder icon
// You can also provide custom icons
const viewWithIcon: SavedViewOption = {
  id: 'high-priority',
  label: 'High Priority Items',
  icon: '🔥', // Custom emoji icon
  filterModel: { /* ... */ }
};`}</code>
            </pre>
          </div>

          <h5 className="doc-subsubheading">Save Types:</h5>
          <p className="doc-text">Choose what to save with each view:</p>
          <div className="doc-code-block">
            <pre>
              <code>{`// Save only filters
saveType: 'filters-only'

// Save full grid state (columns, sort, filters)
saveType: 'full-view'

// Full view includes:
// - Column state (order, width, visibility)
// - Sort model
// - Filter model
// - Row grouping (if applicable)`}</code>
            </pre>
          </div>

          <h5 className="doc-subsubheading">Import/Export:</h5>
          <p className="doc-text">
            Share views between users or backup configurations:
          </p>
          <div className="doc-code-block">
            <pre>
              <code>{`// Export all views to JSON file
// Available through the management menu

// Import views from JSON file
// Merges with existing views, avoiding duplicates

// Export format:
{
  "version": "1.0",
  "views": [
    {
      "id": "view-1",
      "label": "My Custom View",
      "saveType": "full-view",
      "filterModel": { /* ... */ },
      "gridState": { /* ... */ }
    }
  ]
}`}</code>
            </pre>
          </div>
        </div>

        <div className="doc-subsection">
          <h4 className="doc-subheading">Complete Example:</h4>
          <div className="doc-code-block">
            <pre>
              <code>{`import React, { useState } from 'react';
import { SavedViewsDropdown } from 'ag-grid-react-components';

function GridWithSavedViews() {
  const [gridApi, setGridApi] = useState(null);
  const [currentView, setCurrentView] = useState(null);

  return (
    <div className="grid-container">
      <div className="toolbar">
        <SavedViewsDropdown
          api={gridApi}
          columnId="_multi"
          placeholder="Select a view"
          showManagementMenu={true}
          onViewChange={(view) => {
            setCurrentView(view);
            console.log('Applied view:', view?.label || 'None');
          }}
        />
        {currentView && (
          <span className="current-view-label">
            Current: {currentView.label}
          </span>
        )}
      </div>
      
      <AgGridReact
        onGridReady={(params) => setGridApi(params.api)}
        // ... other grid props
      />
    </div>
  );
}`}</code>
            </pre>
          </div>
        </div>
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
