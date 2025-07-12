import React, { forwardRef, useMemo } from "react";
import { GridApi } from "ag-grid-community";
import { ActiveFiltersProvider } from "./context";
import * as Components from "./components";

export interface ActiveFiltersProps {
  api: GridApi;
  filterModel: Record<string, any>;
  className?: string;
  children?: React.ReactNode;
}

export interface ActiveFiltersCompound {
  (props: ActiveFiltersProps): React.ReactElement | null;
  Root: typeof Components.Root;
  List: typeof Components.List;
  Item: typeof Components.Item;
  ColumnName: typeof Components.ColumnName;
  FilterValue: typeof Components.FilterValue;
  RemoveButton: typeof Components.RemoveButton;
  ClearAllButton: typeof Components.ClearAllButton;
}

const ActiveFiltersComponent = forwardRef<HTMLDivElement, ActiveFiltersProps>(
  ({ api, filterModel, className, children }, ref) => {
    // Calculate active filters
    const activeFilters = useMemo(() => {
      return Object.entries(filterModel || {}).map(([columnId, filter]) => ({
        columnId,
        filter,
        columnName:
          api.getColumn(columnId)?.getColDef()?.headerName || columnId,
      }));
    }, [filterModel, api]);

    // Don't render if no filters
    if (activeFilters.length === 0) {
      return null;
    }

    if (!children) {
      // Default structure for backward compatibility
      return (
        <ActiveFiltersProvider
          api={api}
          filterModel={filterModel}
          activeFilters={activeFilters}
        >
          <Components.Root ref={ref} className={className}>
            <Components.List>
              {activeFilters.map(({ columnId, columnName, filter }) => (
                <Components.Item key={columnId} columnId={columnId}>
                  <Components.ColumnName>{columnName}</Components.ColumnName>
                  <Components.FilterValue filter={filter} />
                  <Components.RemoveButton columnId={columnId} />
                </Components.Item>
              ))}
            </Components.List>
            <Components.ClearAllButton />
          </Components.Root>
        </ActiveFiltersProvider>
      );
    }

    return (
      <ActiveFiltersProvider
        api={api}
        filterModel={filterModel}
        activeFilters={activeFilters}
      >
        <div ref={ref} className={className}>
          {children}
        </div>
      </ActiveFiltersProvider>
    );
  },
);

ActiveFiltersComponent.displayName = "ActiveFilters";

// Create the compound component
const ActiveFilters =
  ActiveFiltersComponent as unknown as ActiveFiltersCompound;

// Attach all sub-components
Object.assign(ActiveFilters, {
  Root: Components.Root,
  List: Components.List,
  Item: Components.Item,
  ColumnName: Components.ColumnName,
  FilterValue: Components.FilterValue,
  RemoveButton: Components.RemoveButton,
  ClearAllButton: Components.ClearAllButton,
});

export default ActiveFilters;
export { ActiveFilters };
