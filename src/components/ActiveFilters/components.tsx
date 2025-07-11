import React, { forwardRef } from "react";
import { useActiveFiltersContext } from "./context";
import { formatFilterValue } from "./utils";

// Root container component
export const Root = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, ...props }, ref) => {
  return (
    <div ref={ref} data-testid="active-filters" {...props}>
      {children}
    </div>
  );
});
Root.displayName = "ActiveFilters.Root";

// List container for filter items
export const List = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, ...props }, ref) => {
  return (
    <div ref={ref} data-component="active-filters-list" {...props}>
      {children}
    </div>
  );
});
List.displayName = "ActiveFilters.List";

// Individual filter item
interface ItemProps extends React.HTMLAttributes<HTMLDivElement> {
  columnId: string;
}

export const Item = forwardRef<HTMLDivElement, ItemProps>(
  ({ columnId, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-component="active-filters-item"
        data-column-id={columnId}
        {...props}
      >
        {children}
      </div>
    );
  },
);
Item.displayName = "ActiveFilters.Item";

// Column name display
export const ColumnName = forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ children, ...props }, ref) => {
  return (
    <span ref={ref} data-component="active-filters-column-name" {...props}>
      {children}:
    </span>
  );
});
ColumnName.displayName = "ActiveFilters.ColumnName";

// Filter value display
interface FilterValueProps extends React.HTMLAttributes<HTMLSpanElement> {
  filter: any;
}

export const FilterValue = forwardRef<HTMLSpanElement, FilterValueProps>(
  ({ filter, ...props }, ref) => {
    const formattedValue = formatFilterValue(filter);

    return (
      <span ref={ref} data-component="active-filters-value" {...props}>
        {formattedValue}
      </span>
    );
  },
);
FilterValue.displayName = "ActiveFilters.FilterValue";

// Remove button for individual filters
interface RemoveButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  columnId: string;
}

export const RemoveButton = forwardRef<HTMLButtonElement, RemoveButtonProps>(
  ({ columnId, children, onClick, ...props }, ref) => {
    const { removeFilter, activeFilters } = useActiveFiltersContext();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      removeFilter(columnId);
      onClick?.(e);
    };

    // Get the column name from activeFilters to maintain the same casing
    const filter = activeFilters.find((f) => f.columnId === columnId);
    const columnName = filter?.columnName || columnId;

    return (
      <button
        ref={ref}
        type="button"
        aria-label={`Remove ${columnName} filter`}
        data-component="active-filters-remove-button"
        onClick={handleClick}
        {...props}
      >
        {children || "×"}
      </button>
    );
  },
);
RemoveButton.displayName = "ActiveFilters.RemoveButton";

// Clear all button
export const ClearAllButton = forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ children, onClick, ...props }, ref) => {
  const { clearAllFilters } = useActiveFiltersContext();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    clearAllFilters();
    onClick?.(e);
  };

  return (
    <button
      ref={ref}
      type="button"
      aria-label="Clear all filters"
      data-component="active-filters-clear-all"
      onClick={handleClick}
      {...props}
    >
      {children || "Clear all"}
    </button>
  );
});
ClearAllButton.displayName = "ActiveFilters.ClearAllButton";
