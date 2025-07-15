import React, { createContext, useContext, useCallback } from "react";
import { GridApi } from "ag-grid-community";

interface ActiveFilter {
  columnId: string;
  columnName: string;
  filter: any;
}

interface ActiveFiltersContextValue {
  api: GridApi;
  filterModel: Record<string, any>;
  activeFilters: ActiveFilter[];
  removeFilter: (columnId: string) => void;
  clearAllFilters: () => void;
}

const ActiveFiltersContext = createContext<
  ActiveFiltersContextValue | undefined
>(undefined);

export interface ActiveFiltersProviderProps {
  api: GridApi;
  filterModel: Record<string, any>;
  activeFilters: ActiveFilter[];
  children: React.ReactNode;
}

export const ActiveFiltersProvider: React.FC<ActiveFiltersProviderProps> = ({
  api,
  filterModel,
  activeFilters,
  children,
}) => {
  const removeFilter = useCallback(
    (columnId: string) => {
      const newFilterModel = { ...filterModel };
      delete newFilterModel[columnId];
      api.setFilterModel(newFilterModel);
    },
    [api, filterModel],
  );

  const clearAllFilters = useCallback(() => {
    api.setFilterModel({});
  }, [api]);

  const value: ActiveFiltersContextValue = {
    api,
    filterModel,
    activeFilters,
    removeFilter,
    clearAllFilters,
  };

  return (
    <ActiveFiltersContext.Provider value={value}>
      {children}
    </ActiveFiltersContext.Provider>
  );
};

export const useActiveFiltersContext = () => {
  const context = useContext(ActiveFiltersContext);
  if (!context) {
    throw new Error(
      "useActiveFiltersContext must be used within ActiveFiltersProvider",
    );
  }
  return context;
};
