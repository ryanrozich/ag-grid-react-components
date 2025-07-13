import React, { useState, useEffect, useMemo, useCallback } from "react";
import type { GridApi } from "ag-grid-community";
import { QuickFilterDropdown } from "../QuickFilterDropdown";
import type { QuickFilterOption } from "../QuickFilterDropdown/types";
import type {
  ViewDropdownLoader,
  SavedViewOption,
} from "../QuickFilterDropdown/loaders/types";
import { LocalStorageLoader } from "../QuickFilterDropdown/loaders/LocalStorageLoader";
import { ViewManagementMenu } from "../ViewManagementMenu";
import { ViewManagementModal } from "../ViewManagementModal";
import { SaveViewModal } from "../SaveViewModal";

export interface SavedViewsDropdownProps {
  /** AG Grid API instance */
  api: GridApi | null;
  /** Column ID to apply filters to */
  columnId: string;
  /** View loader instance (defaults to LocalStorageLoader) */
  loader?: ViewDropdownLoader;
  /** Placeholder text for dropdown */
  placeholder?: string;
  /** Custom class name */
  className?: string;
  /** Whether to show view management menu */
  showManagementMenu?: boolean;
  /** Callback when view changes */
  onViewChange?: (view: SavedViewOption | null) => void;
}

export const SavedViewsDropdown: React.FC<SavedViewsDropdownProps> = ({
  api,
  columnId,
  loader: customLoader,
  placeholder = "My Views",
  className,
  showManagementMenu = true,
  onViewChange,
}) => {
  const loader = useMemo(
    () => customLoader || new LocalStorageLoader(),
    [customLoader],
  );

  const [views, setViews] = useState<SavedViewOption[]>([]);
  const [selectedViewId, setSelectedViewId] = useState<string | null>(null);
  const [defaultViewId, setDefaultViewId] = useState<string | null>(null);
  const [isManageModalOpen, setIsManageModalOpen] = useState(false);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);

  // Apply a saved view to the grid - defined early to avoid circular dependency
  const applyView = useCallback(
    (view: SavedViewOption) => {
      if (!api) return;

      try {
        if (view.saveType === "filters-only" && view.filterModel) {
          // Apply only filters
          api.setFilterModel(view.filterModel);
        } else if (view.saveType === "full-view" && view.gridState) {
          // Apply full grid state
          if (view.filterModel) {
            api.setFilterModel(view.filterModel);
          }

          if (view.gridState.columnState) {
            api.applyColumnState({
              state: view.gridState.columnState as unknown[],
              applyOrder: true,
            });
          }

          if (view.gridState.sortModel) {
            if (
              "applySortModel" in api &&
              typeof api.applySortModel === "function"
            ) {
              api.applySortModel(view.gridState.sortModel as unknown[]);
            }
          }

          // Apply other grid state properties as needed
        }

        setSelectedViewId(view.id);
        onViewChange?.(view);
      } catch (error) {
        console.error("Error applying view:", error);
      }
    },
    [api, onViewChange],
  );

  // Load views from the loader
  const loadViews = useCallback(async () => {
    try {
      const loadedViews = await loader.loadOptions();
      setViews(loadedViews);

      // Load default view
      const defaultId = loader.getDefaultViewId
        ? await loader.getDefaultViewId()
        : null;
      setDefaultViewId(defaultId);

      // Apply default view if available and no view is selected
      if (defaultId && !selectedViewId && api) {
        const defaultView = loadedViews.find((v) => v.id === defaultId);
        if (defaultView) {
          applyView(defaultView);
        }
      }
    } catch (error) {
      console.error("Error loading views:", error);
    }
  }, [loader, selectedViewId, api, applyView]);

  // Subscribe to loader changes
  useEffect(() => {
    loadViews();

    if (loader.subscribe) {
      const unsubscribe = loader.subscribe(() => {
        loadViews();
      });
      return unsubscribe;
    }
  }, [loader, loadViews]);

  // Convert saved views to quick filter options
  const quickFilterOptions: QuickFilterOption[] = useMemo(() => {
    // Add "Clear filters" option
    const options: QuickFilterOption[] = [
      {
        id: "clear-filters",
        label: "Clear filters",
        filterModel: {},
        description: "Remove all active filters",
      },
    ];

    // Add all saved views as options in the dropdown
    views.forEach((view) => {
      options.push({
        id: view.id,
        label: view.label,
        filterModel: view.filterModel || {},
        description:
          view.metadata?.description ||
          (view.saveType === "full-view"
            ? "Full view (columns, sort, filters)"
            : "Filters only"),
        icon:
          view.id === defaultViewId
            ? "⭐"
            : view.metadata?.category
              ? "📁"
              : undefined,
      });
    });

    return options;
  }, [views, defaultViewId]);

  // Handle filter change from dropdown
  const handleFilterChange = useCallback(
    (option: QuickFilterOption | null) => {
      if (!option) return;

      if (option.id === "clear-filters") {
        if (api) {
          api.setFilterModel(null);
        }
        setSelectedViewId(null);
        onViewChange?.(null);
      } else {
        const view = views.find((v) => v.id === option.id);
        if (view) {
          applyView(view);
        }
      }
    },
    [api, views, applyView, onViewChange],
  );

  // Save current view
  const handleSaveView = useCallback(() => {
    setIsSaveModalOpen(true);
  }, []);

  // View management handlers
  const handleRename = useCallback(
    async (id: string, newName: string) => {
      await loader.updateOption?.(id, { label: newName });
    },
    [loader],
  );

  const handleDelete = useCallback(
    async (id: string) => {
      await loader.deleteOption?.(id);
      if (selectedViewId === id) {
        setSelectedViewId(null);
      }
    },
    [loader, selectedViewId],
  );

  const handleChangeCategory = useCallback(
    async (id: string, category: string) => {
      const view = views.find((v) => v.id === id);
      if (view) {
        await loader.updateOption?.(id, {
          metadata: { ...view.metadata, category },
        });
      }
    },
    [loader, views],
  );

  const handleSetDefault = useCallback(
    async (id: string) => {
      await loader.setDefaultView?.(id);
      setDefaultViewId(id);
    },
    [loader],
  );

  const handleExportView = useCallback(
    async (id: string) => {
      const view = views.find((v) => v.id === id);
      if (view) {
        const json = JSON.stringify(view, null, 2);
        const blob = new Blob([json], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${view.label.replace(/\s+/g, "-").toLowerCase()}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
    },
    [views],
  );

  const handleExportAll = useCallback(async () => {
    try {
      const json = await loader.exportViews?.();
      if (!json) return;
      const blob = new Blob([json], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "saved-views.json";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error exporting views:", error);
    }
  }, [loader]);

  const handleImport = useCallback(async () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        try {
          const text = await file.text();
          await loader.importViews?.(text);
        } catch (error) {
          console.error("Error importing views:", error);
          alert("Failed to import views. Please check the file format.");
        }
      }
    };
    input.click();
  }, [loader]);

  // Get available categories
  const categories = useMemo(() => {
    const cats = new Set<string>();
    views.forEach((view) => {
      if (view.metadata?.category) {
        cats.add(view.metadata.category);
      }
    });
    return Array.from(cats);
  }, [views]);

  // Don't render until we have the loader initialized
  if (!loader) {
    return null;
  }

  return (
    <div className={`saved-views-dropdown-container ${className || ""}`}>
      <QuickFilterDropdown
        api={api}
        columnId={columnId}
        options={quickFilterOptions}
        placeholder={placeholder}
        onFilterChange={handleFilterChange}
        className="saved-views-dropdown"
      />

      {showManagementMenu && (
        <ViewManagementMenu
          api={api}
          onSaveView={handleSaveView}
          onManageViews={() => setIsManageModalOpen(true)}
          onImport={handleImport}
          onExport={handleExportAll}
          className="saved-views-menu"
        />
      )}

      <ViewManagementModal
        isOpen={isManageModalOpen}
        onClose={() => setIsManageModalOpen(false)}
        views={views}
        categories={categories}
        defaultViewId={defaultViewId}
        onRename={handleRename}
        onDelete={handleDelete}
        onChangeCategory={handleChangeCategory}
        onSetDefault={handleSetDefault}
        onExportView={handleExportView}
      />

      <SaveViewModal
        isOpen={isSaveModalOpen}
        onClose={() => setIsSaveModalOpen(false)}
        api={api}
        categories={categories}
        onSave={async (viewData) => {
          if (!api) return;

          try {
            // Generate unique ID
            const id = `view-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

            // Capture current grid state
            const filterModel = api.getFilterModel();
            let gridState = {};

            if (viewData.saveType === "full-view") {
              // Capture full grid state
              const columnState = api.getColumnState();
              let sortModel: unknown[] = [];
              if (
                "getSortModel" in api &&
                typeof api.getSortModel === "function"
              ) {
                sortModel = api.getSortModel() || [];
              }

              gridState = {
                columnState,
                sortModel,
                // Add other state as needed
              };
            }

            // Create saved view
            const newView: SavedViewOption = {
              id,
              label: viewData.label,
              saveType: viewData.saveType,
              filterModel,
              gridState:
                viewData.saveType === "full-view" ? gridState : undefined,
              metadata: {
                category: viewData.category,
                description: viewData.description,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              },
            };

            // Save through loader
            await loader.saveOption?.(newView);

            // Apply the newly saved view
            applyView(newView);
          } catch (error) {
            console.error("Error saving view:", error);
            alert("Failed to save view. Please try again.");
          }
        }}
      />
    </div>
  );
};
