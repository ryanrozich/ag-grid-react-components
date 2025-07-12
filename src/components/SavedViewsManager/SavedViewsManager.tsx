import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
  ReactNode,
} from "react";
import { createPortal } from "react-dom";
import type {
  SavedViewsManagerProps,
  SavedView,
  SavedViewCategory,
  SavedViewsState,
} from "./types";
import { SavedViewsList } from "./SavedViewsListHeadless";
import { SaveViewDialog } from "./SaveViewDialogHeadless";
import {
  DEFAULT_CATEGORIES,
  generateId,
  exportViews,
  downloadJson,
  validateImportData,
  mergeImportedData,
} from "./utils";

// Context for compound components
interface SavedViewsContextValue {
  state: SavedViewsState;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  showSaveDialog: boolean;
  setShowSaveDialog: (show: boolean) => void;
  applyView: (view: SavedView) => void;
  saveView: (view: Omit<SavedView, "id" | "createdAt" | "updatedAt">) => void;
  deleteView: (viewId: string) => void;
  setDefaultView: (viewId: string) => void;
  createCategory: (category: Omit<SavedViewCategory, "id">) => void;
  handleExport: () => void;
  handleImport: (event: React.ChangeEvent<HTMLInputElement>) => void;
  getCurrentState: () => any;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  categories: SavedViewCategory[];
}

const SavedViewsContext = createContext<SavedViewsContextValue | null>(null);

const useSavedViewsContext = () => {
  const context = useContext(SavedViewsContext);
  if (!context) {
    throw new Error(
      "SavedViewsManager compound components must be used within SavedViewsManager",
    );
  }
  return context;
};

// Main component with compound components
interface SavedViewsManagerComponent
  extends React.FC<SavedViewsManagerProps & { children: ReactNode }> {
  Trigger: React.FC<TriggerProps>;
  Panel: React.FC<PanelProps>;
  CloseButton: React.FC<CloseButtonProps>;
  Title: React.FC<TitleProps>;
  Actions: React.FC<ActionsProps>;
  List: React.FC<ListProps>;
  Dialog: React.FC<DialogProps>;
}

const SavedViewsManagerBase: React.FC<
  SavedViewsManagerProps & { children: ReactNode }
> = ({
  api,
  onViewChange,
  storageKey = "ag-grid-saved-views",
  maxViews = 50,
  defaultCategories = DEFAULT_CATEGORIES,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize state from localStorage
  const [state, setState] = useState<SavedViewsState>(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        return {
          views: parsed.views || [],
          categories: parsed.categories || defaultCategories,
          activeViewId: parsed.activeViewId || null,
        };
      }
    } catch (error) {
      console.error("Error loading saved views:", error);
    }

    return {
      views: [],
      categories: defaultCategories,
      activeViewId: null,
    };
  });

  // Save state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(state));
    } catch (error) {
      console.error("Error saving views to localStorage:", error);
    }
  }, [state, storageKey]);

  // Apply default view on mount
  useEffect(() => {
    const defaultView = state.views.find((v) => v.isDefault);
    if (defaultView && api) {
      applyView(defaultView);
    }
  }, []); // Only on mount

  const applyView = useCallback(
    (view: SavedView) => {
      if (!api) return;

      // Apply filter model
      api.setFilterModel(view.filterModel);

      // Apply column state if available
      if (view.columnState) {
        api.applyColumnState({ state: view.columnState });
      }

      // Apply sort model if available
      if (view.sortModel) {
        api.applyColumnState({ state: view.columnState, applyOrder: true });
      }

      // Update active view
      setState((prev) => ({ ...prev, activeViewId: view.id }));

      // Notify parent
      onViewChange?.(view);
    },
    [api, onViewChange],
  );

  const saveView = useCallback(
    (viewData: Omit<SavedView, "id" | "createdAt" | "updatedAt">) => {
      if (state.views.length >= maxViews) {
        alert(
          `Maximum number of saved views (${maxViews}) reached. Please delete some views first.`,
        );
        return;
      }

      // Handle case where category is passed as a name (for newly created categories)
      let categoryId = viewData.category;
      const categoryByName = state.categories.find(
        (c) => c.name === viewData.category,
      );
      if (categoryByName) {
        categoryId = categoryByName.id;
      }

      const newView: SavedView = {
        ...viewData,
        category: categoryId,
        id: generateId(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      setState((prev) => ({
        ...prev,
        views: [...prev.views, newView],
      }));
    },
    [state.views.length, state.categories, maxViews],
  );

  const deleteView = useCallback((viewId: string) => {
    setState((prev) => ({
      ...prev,
      views: prev.views.filter((v) => v.id !== viewId),
      activeViewId: prev.activeViewId === viewId ? null : prev.activeViewId,
    }));
  }, []);

  const setDefaultView = useCallback((viewId: string) => {
    setState((prev) => ({
      ...prev,
      views: prev.views.map((v) => ({
        ...v,
        isDefault: v.id === viewId,
      })),
    }));
  }, []);

  const createCategory = useCallback(
    (category: Omit<SavedViewCategory, "id">) => {
      const newCategory: SavedViewCategory = {
        ...category,
        id: generateId(),
      };

      setState((prev) => ({
        ...prev,
        categories: [...prev.categories, newCategory],
      }));
    },
    [],
  );

  const handleExport = useCallback(() => {
    const jsonData = exportViews(state.views, state.categories);
    const filename = `saved-views-${new Date().toISOString().split("T")[0]}.json`;
    downloadJson(jsonData, filename);
  }, [state.views, state.categories]);

  const handleImport = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const content = e.target?.result as string;
          const data = JSON.parse(content);
          const validData = validateImportData(data);

          if (!validData) {
            alert("Invalid import file format");
            return;
          }

          const merged = mergeImportedData(
            state.views,
            state.categories,
            validData,
          );
          setState((prev) => ({
            ...prev,
            views: merged.views.slice(0, maxViews),
            categories: merged.categories,
          }));

          alert(`Successfully imported ${validData.views.length} views`);
        } catch (error) {
          console.error("Error importing views:", error);
          alert("Error importing views. Please check the file format.");
        }
      };

      reader.readAsText(file);

      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    },
    [state.views, state.categories, maxViews],
  );

  const getCurrentState = useCallback(() => {
    if (!api) return null;

    return {
      filterModel: api.getFilterModel(),
      columnState: api.getColumnState(),
      sortModel: api.getColumnState()?.filter((col: any) => col.sort !== null),
    };
  }, [api]);

  const contextValue: SavedViewsContextValue = {
    state,
    isOpen,
    setIsOpen,
    showSaveDialog,
    setShowSaveDialog,
    applyView,
    saveView,
    deleteView,
    setDefaultView,
    createCategory,
    handleExport,
    handleImport,
    getCurrentState,
    fileInputRef,
    categories: state.categories,
  };

  return (
    <SavedViewsContext.Provider value={contextValue}>
      {children}
    </SavedViewsContext.Provider>
  );
};

// Trigger Button Component
interface TriggerProps {
  children?: ReactNode;
  [key: string]: any;
}

const Trigger: React.FC<TriggerProps> = ({
  children,
  ...props
}: TriggerProps) => {
  const { isOpen, setIsOpen, state } = useSavedViewsContext();

  return (
    <button
      {...props}
      onClick={() => setIsOpen(!isOpen)}
      data-saved-views-trigger
      data-active={state.activeViewId ? "true" : "false"}
      aria-expanded={isOpen}
    >
      {children || (
        <>
          <svg
            data-icon
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
            />
          </svg>
          <span data-label>Saved Views</span>
          {state.activeViewId && <span data-indicator />}
        </>
      )}
    </button>
  );
};

// Panel Component with Portal
interface PanelProps {
  children: ReactNode;
  portalId?: string;
  [key: string]: any;
}

const Panel: React.FC<PanelProps> = ({
  children,
  portalId = "saved-views-panel-portal",
  ...props
}: PanelProps) => {
  const { isOpen } = useSavedViewsContext();
  const [position, setPosition] = useState<{
    top: number;
    right: number;
  } | null>(null);

  useEffect(() => {
    if (isOpen) {
      const trigger = document.querySelector("[data-saved-views-trigger]");
      if (trigger) {
        const rect = trigger.getBoundingClientRect();
        setPosition({
          top: rect.bottom + 8,
          right: window.innerWidth - rect.right,
        });
      }
    }
  }, [isOpen]);

  if (!isOpen || !position) return null;

  const panelContent = (
    <div
      {...props}
      data-saved-views-panel
      style={{
        position: "fixed",
        top: `${position.top}px`,
        right: `${position.right}px`,
        zIndex: 999999,
        ...props.style,
      }}
    >
      {children}
    </div>
  );

  // Create portal root if it doesn't exist
  let portalRoot = document.getElementById(portalId);
  if (!portalRoot) {
    portalRoot = document.createElement("div");
    portalRoot.id = portalId;
    document.body.appendChild(portalRoot);
  }

  return createPortal(panelContent, portalRoot);
};

// Close Button Component
interface CloseButtonProps {
  children?: ReactNode;
  [key: string]: any;
}

const CloseButton: React.FC<CloseButtonProps> = ({
  children,
  ...props
}: CloseButtonProps) => {
  const { setIsOpen } = useSavedViewsContext();

  return (
    <button
      {...props}
      onClick={() => setIsOpen(false)}
      data-saved-views-close
      aria-label="Close saved views"
    >
      {children || (
        <svg
          width="20"
          height="20"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      )}
    </button>
  );
};

// Title Component
interface TitleProps {
  children?: ReactNode;
  [key: string]: any;
}

const Title: React.FC<TitleProps> = ({ children, ...props }: TitleProps) => {
  return (
    <h3 {...props} data-saved-views-title>
      {children || "Saved Views"}
    </h3>
  );
};

// Actions Container Component
interface ActionsProps {
  children?: ReactNode;
  [key: string]: any;
}

const Actions: React.FC<ActionsProps> = ({
  children,
  ...props
}: ActionsProps) => {
  const { setShowSaveDialog, handleExport, handleImport, fileInputRef, state } =
    useSavedViewsContext();

  // Handle clicks on action buttons
  const handleActionClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    const button = target.closest("[data-action]") as HTMLElement;

    if (button) {
      const action = button.getAttribute("data-action");

      switch (action) {
        case "save":
          setShowSaveDialog(true);
          break;
        case "export":
          if (state.views.length > 0) {
            handleExport();
          }
          break;
        case "import":
          fileInputRef.current?.click();
          break;
      }
    }
  };

  return (
    <div {...props} data-saved-views-actions onClick={handleActionClick}>
      {children || (
        <>
          <button data-action="save">Save Current</button>
          <button
            disabled={state.views.length === 0}
            data-action="export"
            title="Export all views"
          >
            <svg
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
              />
            </svg>
          </button>
          <button data-action="import" title="Import views">
            <svg
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
          </button>
        </>
      )}
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleImport}
        style={{ display: "none" }}
      />
    </div>
  );
};

// List Component
interface ListProps {
  children?: ReactNode;
  [key: string]: any;
}

const List: React.FC<ListProps> = ({ children, ...props }: ListProps) => {
  const { state, applyView, deleteView, setDefaultView } =
    useSavedViewsContext();

  return (
    <SavedViewsList
      {...props}
      views={state.views}
      categories={state.categories}
      activeViewId={state.activeViewId}
      onSelectView={applyView}
      onDeleteView={deleteView}
      onSetDefault={setDefaultView}
    >
      {children}
    </SavedViewsList>
  );
};

// Dialog Component
interface DialogProps {
  children?: ReactNode;
  portalId?: string;
  [key: string]: any;
}

const Dialog: React.FC<DialogProps> = ({
  children,
  portalId,
  ...props
}: DialogProps) => {
  const {
    showSaveDialog,
    setShowSaveDialog,
    saveView,
    createCategory,
    getCurrentState,
    state,
  } = useSavedViewsContext();
  const currentState = getCurrentState();

  if (!currentState) return null;

  return (
    <SaveViewDialog
      {...props}
      isOpen={showSaveDialog}
      onClose={() => setShowSaveDialog(false)}
      onSave={saveView}
      categories={state.categories}
      onCreateCategory={createCategory}
      currentFilterModel={currentState.filterModel || {}}
      currentColumnState={currentState.columnState}
      currentSortModel={currentState.sortModel}
      portalId={portalId}
    >
      {children}
    </SaveViewDialog>
  );
};

// Create the compound component
export const SavedViewsManager =
  SavedViewsManagerBase as SavedViewsManagerComponent;

// Assign compound components
SavedViewsManager.Trigger = Trigger;
SavedViewsManager.Panel = Panel;
SavedViewsManager.CloseButton = CloseButton;
SavedViewsManager.Title = Title;
SavedViewsManager.Actions = Actions;
SavedViewsManager.List = List;
SavedViewsManager.Dialog = Dialog;

// Set display names
SavedViewsManager.Trigger.displayName = "SavedViewsManager.Trigger";
SavedViewsManager.Panel.displayName = "SavedViewsManager.Panel";
SavedViewsManager.CloseButton.displayName = "SavedViewsManager.CloseButton";
SavedViewsManager.Title.displayName = "SavedViewsManager.Title";
SavedViewsManager.Actions.displayName = "SavedViewsManager.Actions";
SavedViewsManager.List.displayName = "SavedViewsManager.List";
SavedViewsManager.Dialog.displayName = "SavedViewsManager.Dialog";
