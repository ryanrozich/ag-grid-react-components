// Export the headless version as the default
export { SavedViewsManager as default } from "./SavedViewsManager";
export { SavedViewsManager } from "./SavedViewsManager";

// Export types
export type {
  SavedView,
  SavedViewCategory,
  SavedViewsManagerProps,
  SavedViewsState,
  ExportData,
} from "./types";

// Export utilities if needed
export {
  generateId,
  exportViews,
  downloadJson,
  validateImportData,
  mergeImportedData,
} from "./utils";
