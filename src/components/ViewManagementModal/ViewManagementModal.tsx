import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import type { SavedViewOption } from "../QuickFilterDropdown/loaders/types";
import { CategorySelector } from "../CategorySelector";

export interface ViewManagementModalProps {
  /** Whether the modal is open */
  isOpen: boolean;
  /** Callback to close the modal */
  onClose: () => void;
  /** Array of saved views to manage */
  views: SavedViewOption[];
  /** Array of available categories */
  categories: string[];
  /** Callback when a view is renamed */
  onRename?: (id: string, newName: string) => void;
  /** Callback when a view is deleted */
  onDelete?: (id: string) => void;
  /** Callback when a view's category is changed */
  onChangeCategory?: (id: string, category: string) => void;
  /** Callback when a view is set as default */
  onSetDefault?: (id: string) => void;
  /** Callback when a single view is exported */
  onExportView?: (id: string) => void;
  /** Current default view ID */
  defaultViewId?: string | null;
  /** Portal target ID */
  portalId?: string;
}

interface EditingState {
  viewId: string;
  field: "name" | "category";
  value: string;
}

export const ViewManagementModal: React.FC<ViewManagementModalProps> = ({
  isOpen,
  onClose,
  views,
  categories,
  onRename,
  onDelete,
  onChangeCategory,
  onSetDefault,
  onExportView,
  defaultViewId,
  portalId = "view-management-modal-portal",
}) => {
  const [editingState, setEditingState] = useState<EditingState | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const editInputRef = useRef<HTMLInputElement>(null);

  // Focus input when editing starts
  useEffect(() => {
    if (editingState && editInputRef.current) {
      editInputRef.current.focus();
      editInputRef.current.select();
    }
  }, [editingState]);

  // Handle escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (editingState) {
          setEditingState(null);
        } else if (deleteConfirm) {
          setDeleteConfirm(null);
        } else {
          onClose();
        }
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, editingState, deleteConfirm, onClose]);

  // Handle click outside
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    // Delay to avoid immediate close when opened by click
    const timer = setTimeout(() => {
      document.addEventListener("mousedown", handleClickOutside);
    }, 0);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Create portal root
  useEffect(() => {
    if (!document.getElementById(portalId)) {
      const portalRoot = document.createElement("div");
      portalRoot.id = portalId;
      document.body.appendChild(portalRoot);
    }
  }, [portalId]);

  if (!isOpen) return null;

  const handleSaveEdit = () => {
    if (!editingState) return;

    const { viewId, field, value } = editingState;

    if (field === "name" && value.trim()) {
      onRename?.(viewId, value.trim());
    } else if (field === "category") {
      onChangeCategory?.(viewId, value);
    }

    setEditingState(null);
  };

  const handleDelete = (viewId: string) => {
    onDelete?.(viewId);
    setDeleteConfirm(null);
  };

  const modalContent = (
    <div className="view-management-modal-overlay">
      <div
        ref={modalRef}
        className="view-management-modal"
        role="dialog"
        aria-modal="true"
      >
        <div className="view-management-modal-header">
          <h2 className="view-management-modal-title">Manage Saved Views</h2>
          <button
            className="view-management-modal-close"
            onClick={onClose}
            aria-label="Close modal"
          >
            <svg
              className="w-5 h-5"
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
          </button>
        </div>

        <div className="view-management-modal-content">
          {views.length === 0 ? (
            <div className="view-management-empty">
              <p>No saved views yet</p>
              <p className="text-sm text-gray-500">
                Save your first view from the filter bar
              </p>
            </div>
          ) : (
            <table className="view-management-table">
              <thead>
                <tr>
                  <th>Default</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Type</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {views.map((view) => (
                  <tr key={view.id}>
                    <td>
                      <input
                        type="radio"
                        name="default-view"
                        checked={view.id === defaultViewId}
                        onChange={() => onSetDefault?.(view.id)}
                        className="view-management-radio"
                      />
                    </td>
                    <td>
                      {editingState?.viewId === view.id &&
                      editingState.field === "name" ? (
                        <input
                          ref={editInputRef}
                          type="text"
                          value={editingState.value}
                          onChange={(e) =>
                            setEditingState({
                              ...editingState,
                              value: e.target.value,
                            })
                          }
                          onBlur={handleSaveEdit}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") handleSaveEdit();
                            if (e.key === "Escape") setEditingState(null);
                          }}
                          className="view-management-edit-input"
                        />
                      ) : (
                        <button
                          className="view-management-name-button"
                          onClick={() =>
                            setEditingState({
                              viewId: view.id,
                              field: "name",
                              value: view.label,
                            })
                          }
                        >
                          {view.label}
                        </button>
                      )}
                    </td>
                    <td>
                      {editingState?.viewId === view.id &&
                      editingState.field === "category" ? (
                        <CategorySelector
                          value={editingState.value}
                          onChange={(value) => {
                            handleSaveEdit();
                            onChangeCategory?.(view.id, value);
                          }}
                          existingCategories={categories}
                          className="view-management-category-selector"
                        />
                      ) : (
                        <button
                          className="view-management-category-button"
                          onClick={() =>
                            setEditingState({
                              viewId: view.id,
                              field: "category",
                              value: view.metadata?.category || "",
                            })
                          }
                        >
                          {view.metadata?.category || "Uncategorized"}
                        </button>
                      )}
                    </td>
                    <td>
                      <span className="view-management-type">
                        {view.saveType === "full-view"
                          ? "Full View"
                          : "Filters Only"}
                      </span>
                    </td>
                    <td>
                      <div className="view-management-actions">
                        <button
                          onClick={() => onExportView?.(view.id)}
                          className="view-management-action-button"
                          title="Export this view"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                        </button>
                        {deleteConfirm === view.id ? (
                          <div className="view-management-delete-confirm">
                            <button
                              onClick={() => handleDelete(view.id)}
                              className="view-management-confirm-button"
                            >
                              ✓
                            </button>
                            <button
                              onClick={() => setDeleteConfirm(null)}
                              className="view-management-cancel-button"
                            >
                              ✕
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setDeleteConfirm(view.id)}
                            className="view-management-action-button view-management-delete-button"
                            title="Delete this view"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );

  return createPortal(
    modalContent,
    document.getElementById(portalId) || document.body,
  );
};
