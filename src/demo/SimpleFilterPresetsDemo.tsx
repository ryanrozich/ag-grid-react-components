import React, { useState, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import type {
  GridApi,
  GridReadyEvent,
  FilterChangedEvent,
} from "ag-grid-community";
import { ActiveFilters } from "../components/ActiveFilters";
import { QuickFilterDropdown } from "../components/QuickFilterDropdown";
import styles from "./SimpleFilterPresetsDemo.module.css";

// Sample data
const generateData = () => {
  const categories = ["Electronics", "Clothing", "Food", "Books", "Sports"];
  const statuses = ["Active", "Pending", "Completed", "Cancelled"];

  return Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    name: `Product ${i + 1}`,
    category: categories[Math.floor(Math.random() * categories.length)],
    price: Math.floor(Math.random() * 1000) + 50,
    date: new Date(
      2024,
      Math.floor(Math.random() * 12),
      Math.floor(Math.random() * 28) + 1,
    ),
    status: statuses[Math.floor(Math.random() * statuses.length)],
  }));
};

export const SimpleFilterPresetsDemo: React.FC = () => {
  const [gridApi, setGridApi] = useState<GridApi | null>(null);
  const [filterModel, setFilterModel] = useState({});
  const [lastAppliedPreset, setLastAppliedPreset] = useState<string | null>(
    null,
  );

  const columnDefs = [
    { field: "id", headerName: "ID", width: 80 },
    { field: "name", headerName: "Product Name", flex: 1 },
    {
      field: "category",
      headerName: "Category",
      filter: "agSetColumnFilter",
    },
    {
      field: "price",
      headerName: "Price",
      filter: "agNumberColumnFilter",
      valueFormatter: (params: any) => `$${params.value.toFixed(2)}`,
    },
    {
      field: "date",
      headerName: "Date",
      filter: "DateFilter",
      valueFormatter: (params: any) => params.value.toLocaleDateString(),
    },
    {
      field: "status",
      headerName: "Status",
      filter: "agSetColumnFilter",
    },
  ];

  const onGridReady = useCallback((params: GridReadyEvent) => {
    setGridApi(params.api);
  }, []);

  const onFilterChanged = useCallback((event: FilterChangedEvent) => {
    setFilterModel(event.api.getFilterModel());
  }, []);

  const handlePresetApplied = useCallback((preset: { name: string }) => {
    setLastAppliedPreset(preset.name);
    // Clear the message after 3 seconds
    setTimeout(() => setLastAppliedPreset(null), 3000);
  }, []);

  // Quick filter options for different columns
  const dateFilterOptions = [
    {
      id: "all-dates",
      label: "All Dates",
      filterModel: null,
    },
    {
      id: "last-30-days",
      label: "Last 30 Days",
      filterModel: {
        type: "after",
        mode: "relative",
        expressionFrom: "Today-30d",
      },
    },
    {
      id: "this-month",
      label: "This Month",
      filterModel: {
        type: "inRange",
        mode: "relative",
        expressionFrom: "StartOfMonth",
        expressionTo: "EndOfMonth",
      },
    },
    {
      id: "last-quarter",
      label: "Last Quarter",
      filterModel: {
        type: "inRange",
        mode: "relative",
        expressionFrom: "StartOfLastQuarter",
        expressionTo: "EndOfLastQuarter",
      },
    },
  ];

  const categoryFilterOptions = [
    {
      id: "all-categories",
      label: "All Categories",
      filterModel: null,
    },
    {
      id: "electronics",
      label: "Electronics",
      filterModel: {
        values: ["Electronics"],
      },
    },
    {
      id: "clothing-books",
      label: "Clothing & Books",
      filterModel: {
        values: ["Clothing", "Books"],
      },
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Filter Presets Demo</h2>
        <p className={styles.description}>
          Apply filters using the quick filter dropdowns or column filters, then
          save them as presets for easy reuse.
        </p>
      </div>

      {/* Quick filters */}
      <div className={styles.quickFilters}>
        <QuickFilterDropdown
          api={gridApi!}
          columnId="date"
          options={dateFilterOptions}
          placeholder="Date Range"
          className={styles.filterDropdown}
        />
        <QuickFilterDropdown
          api={gridApi!}
          columnId="category"
          options={categoryFilterOptions}
          placeholder="Category"
          className={styles.filterDropdown}
        />
      </div>

      {/* Active filters with preset management */}
      {gridApi && Object.keys(filterModel).length > 0 && (
        <div className={styles.activeFiltersContainer}>
          <ActiveFilters
            api={gridApi}
            filterModel={filterModel}
            enablePresets={true}
            onPresetApplied={handlePresetApplied}
          />
        </div>
      )}

      {/* Preset applied notification */}
      {lastAppliedPreset && (
        <div className={styles.notification}>
          Applied preset: <strong>{lastAppliedPreset}</strong>
        </div>
      )}

      {/* Grid */}
      <div className={styles.gridContainer}>
        <AgGridReact
          rowData={generateData()}
          columnDefs={columnDefs}
          defaultColDef={{
            filter: true,
            floatingFilter: true,
            sortable: true,
            resizable: true,
          }}
          onGridReady={onGridReady}
          onFilterChanged={onFilterChanged}
          animateRows={true}
          className="ag-theme-material"
          domLayout="normal"
        />
      </div>

      <div className={styles.instructions}>
        <h3>How to use Filter Presets:</h3>
        <ol>
          <li>
            Apply filters using the quick filter dropdowns or column filters
          </li>
          <li>Click the "Save" button that appears next to "Clear all"</li>
          <li>Give your filter preset a name and save it</li>
          <li>Access saved presets anytime via the "Saved Filters" button</li>
          <li>Export/import presets to share with team members</li>
        </ol>
      </div>
    </div>
  );
};
