import type { GridApi } from "ag-grid-community";

export interface QuickFilter {
  label: string;
  filterModel: any;
}

export interface QuickFilterGroup {
  label: string;
  filters: QuickFilter[];
}

export interface QuickFilterDropdownProps {
  gridApi: GridApi | null | undefined;
  columnId: string;
  filters: (QuickFilter | QuickFilterGroup)[];
  label?: string;
  className?: string;
  buttonClassName?: string;
  dropdownClassName?: string;
  onChange?: (filter: QuickFilter | null) => void;
  showClearOption?: boolean;
  clearOptionLabel?: string;
  placeholder?: string;
  position?: "bottom" | "top" | "auto";
  align?: "start" | "end" | "center";
  closeOnSelect?: boolean;
  styles?: {
    container?: string;
    button?: string;
    dropdown?: string;
    item?: string;
    group?: string;
    groupLabel?: string;
    clearOption?: string;
  };
}
