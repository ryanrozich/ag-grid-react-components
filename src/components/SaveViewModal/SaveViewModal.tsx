import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import type { GridApi } from "ag-grid-community";
import { CategorySelector } from "../CategorySelector";

export interface SaveViewModalProps {
  /** Whether modal is open */
  isOpen: boolean;
  /** Callback to close modal */
  onClose: () => void;
  /** AG Grid API instance */
  api: GridApi | null;
  /** Callback when view is saved */
  onSave: (view: {
    label: string;
    saveType: "filters-only" | "full-view";
    category?: string;
    description?: string;
  }) => void;
  /** Available categories */
  categories?: string[];
  /** Portal target ID */
  portalId?: string;
}

export const SaveViewModal: React.FC<SaveViewModalProps> = ({
  isOpen,
  onClose,
  api,
  onSave,
  categories = [],
  portalId = "save-view-modal-portal",
}) => {
  const [viewName, setViewName] = useState("");
  const [saveType, setSaveType] = useState<"filters-only" | "full-view">(
    "filters-only",
  );
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const modalRef = useRef<HTMLDivElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setViewName("");
      setSaveType("filters-only");
      setCategory("");
      setDescription("");

      // Focus name input
      setTimeout(() => {
        nameInputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

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

    // Delay to avoid immediate close
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

  const handleSave = () => {
    if (!viewName.trim()) return;

    onSave({
      label: viewName.trim(),
      saveType,
      category: category || undefined,
      description: description.trim() || undefined,
    });

    onClose();
  };

  const modalContent = (
    <div className="save-view-modal-overlay">
      <div
        ref={modalRef}
        className="save-view-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="save-view-modal-title"
      >
        <div className="save-view-modal-header">
          <h2 id="save-view-modal-title" className="save-view-modal-title">
            Save Current View
          </h2>
          <button
            className="save-view-modal-close"
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

        <div className="save-view-modal-content">
          <div className="save-view-modal-field">
            <label htmlFor="view-name" className="save-view-modal-label">
              View Name <span className="required">*</span>
            </label>
            <input
              ref={nameInputRef}
              id="view-name"
              type="text"
              value={viewName}
              onChange={(e) => setViewName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && viewName.trim()) {
                  handleSave();
                }
              }}
              className="save-view-modal-input"
              placeholder="e.g., High Priority Tasks"
              required
            />
          </div>

          <div className="save-view-modal-field">
            <label className="save-view-modal-label">Save Type</label>
            <div className="save-view-modal-radio-group">
              <label className="save-view-modal-radio-label">
                <input
                  type="radio"
                  name="save-type"
                  value="filters-only"
                  checked={saveType === "filters-only"}
                  onChange={() => setSaveType("filters-only")}
                  className="save-view-modal-radio"
                />
                <span>
                  <strong>Filters Only</strong>
                  <span className="save-view-modal-radio-description">
                    Save only the active filters
                  </span>
                </span>
              </label>
              <label className="save-view-modal-radio-label">
                <input
                  type="radio"
                  name="save-type"
                  value="full-view"
                  checked={saveType === "full-view"}
                  onChange={() => setSaveType("full-view")}
                  className="save-view-modal-radio"
                />
                <span>
                  <strong>Full View</strong>
                  <span className="save-view-modal-radio-description">
                    Save filters, columns, sorting, and grouping
                  </span>
                </span>
              </label>
            </div>
          </div>

          <div className="save-view-modal-field">
            <label htmlFor="view-category" className="save-view-modal-label">
              Category
            </label>
            <CategorySelector
              value={category}
              onChange={setCategory}
              existingCategories={categories}
              className="save-view-modal-category"
              placeholder="Select or create category"
            />
          </div>

          <div className="save-view-modal-field">
            <label htmlFor="view-description" className="save-view-modal-label">
              Description
            </label>
            <textarea
              id="view-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="save-view-modal-textarea"
              placeholder="Optional description of this view"
              rows={3}
            />
          </div>
        </div>

        <div className="save-view-modal-footer">
          <button
            className="save-view-modal-button save-view-modal-button-cancel"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="save-view-modal-button save-view-modal-button-save"
            onClick={handleSave}
            disabled={!viewName.trim() || !api}
          >
            Save View
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(
    modalContent,
    document.getElementById(portalId) || document.body,
  );
};
