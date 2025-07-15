import React from "react";
import type { GridApi } from "ag-grid-community";
import { QuickFilterDropdown } from "../QuickFilterDropdown";
import type { QuickFilterOption } from "../QuickFilterDropdown/types";

export interface SavedViewsDropdownSimpleProps {
  api: GridApi | null;
  columnId: string;
  placeholder?: string;
  className?: string;
}

export const SavedViewsDropdownSimple: React.FC<
  SavedViewsDropdownSimpleProps
> = ({ api, columnId, placeholder = "My Views", className }) => {
  // Simple static options for testing
  const options: QuickFilterOption[] = [
    {
      id: "clear-filters",
      label: "Clear filters",
      filterModel: {},
      description: "Remove all active filters",
    },
  ];

  const handleFilterChange = (option: QuickFilterOption | null) => {
    if (!option || !api) return;

    if (option.id === "clear-filters") {
      api.setFilterModel(null);
    }
  };

  if (!api) {
    return null;
  }

  return (
    <QuickFilterDropdown
      api={api}
      columnId={columnId}
      options={options}
      placeholder={placeholder}
      onFilterChange={handleFilterChange}
      className={className}
    />
  );
};
