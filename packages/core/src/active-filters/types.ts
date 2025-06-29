import type { GridApi, Column } from "ag-grid-community";

export interface ActiveFiltersProps {
  api: GridApi | null | undefined;
  className?: string;
  pillClassName?: string;
  clearAllClassName?: string;
  onFilterRemoved?: (columnId: string) => void;
  onAllFiltersCleared?: () => void;
  showClearAll?: boolean;
  clearAllLabel?: string;
  formatFilterValue?: (column: Column, filterModel: any) => string;
  styles?: {
    container?: string;
    pill?: string;
    pillLabel?: string;
    pillValue?: string;
    pillRemove?: string;
    clearAll?: string;
  };
}
