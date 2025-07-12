import type { FilterModel } from "ag-grid-community";

export interface SavedView {
  id: string;
  name: string;
  description?: string;
  category: string;
  filterModel: FilterModel;
  columnState?: any[]; // AG Grid column state
  sortModel?: any[]; // AG Grid sort model
  createdAt: string;
  updatedAt: string;
  isDefault?: boolean;
}

export interface SavedViewCategory {
  id: string;
  name: string;
  color?: string;
  icon?: string;
}

export interface SavedViewsState {
  views: SavedView[];
  categories: SavedViewCategory[];
  activeViewId: string | null;
}

export interface SaveViewDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (view: Omit<SavedView, "id" | "createdAt" | "updatedAt">) => void;
  categories: SavedViewCategory[];
  onCreateCategory: (category: Omit<SavedViewCategory, "id">) => void;
  currentFilterModel: FilterModel;
  currentColumnState?: any[];
  currentSortModel?: any[];
}

export interface SavedViewsManagerProps {
  api: any; // AG Grid API
  onViewChange?: (view: SavedView | null) => void;
  storageKey?: string;
  maxViews?: number;
  defaultCategories?: SavedViewCategory[];
}

export interface ExportData {
  version: string;
  exportDate: string;
  views: SavedView[];
  categories: SavedViewCategory[];
}
