import type {
  GridApi,
  FilterModel,
  ColumnState,
  SortModelItem,
} from "ag-grid-community";

export interface GridState {
  filterModel?: FilterModel;
  columnState?: ColumnState[];
  sortModel?: SortModelItem[];
  rowGroupState?: any;
}

export interface CompressionAdapter {
  compress: (data: string) => Promise<string> | string;
  decompress: (data: string) => Promise<string> | string;
}

export interface GridStatePersistenceOptions {
  includeFilters?: boolean;
  includeColumns?: boolean;
  includeSort?: boolean;
  includeRowGrouping?: boolean;
  compressionAdapter?: CompressionAdapter;
  maxUrlLength?: number;
  onStateChange?: (state: GridState) => void;
  onStateLoad?: (state: GridState) => void;
}
