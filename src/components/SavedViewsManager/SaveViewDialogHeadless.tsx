import React, { useState, ReactNode } from "react";
import { createPortal } from "react-dom";
import type { SaveViewDialogProps, SavedViewCategory } from "./types";
import { CategorySelector } from "../CategorySelector/index";

interface HeadlessSaveViewDialogProps
  extends Omit<SaveViewDialogProps, "onClose"> {
  onClose: () => void;
  children?: (props: {
    viewName: string;
    setViewName: (name: string) => void;
    viewDescription: string;
    setViewDescription: (desc: string) => void;
    selectedCategory: string;
    selectedCategoryName: string;
    handleCategoryChange: (category: string) => void;
    handleSave: () => void;
    canSave: boolean;
    categories: SavedViewCategory[];
  }) => ReactNode;
  portalId?: string;
  [key: string]: any;
}

export const SaveViewDialog: React.FC<HeadlessSaveViewDialogProps> = ({
  isOpen,
  onClose,
  onSave,
  categories,
  onCreateCategory,
  currentFilterModel,
  currentColumnState,
  currentSortModel,
  children,
  portalId = "saved-views-dialog-portal",
  ...props
}) => {
  const [viewName, setViewName] = useState("");
  const [viewDescription, setViewDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(
    categories[0]?.id || "",
  );
  const [selectedCategoryName, setSelectedCategoryName] = useState(
    categories[0]?.name || "",
  );

  if (!isOpen) return null;

  const handleCategoryChange = (categoryName: string) => {
    const existingCategory = categories.find((c) => c.name === categoryName);

    if (existingCategory) {
      setSelectedCategory(existingCategory.id);
      setSelectedCategoryName(existingCategory.name);
    } else {
      const newCategory: Omit<SavedViewCategory, "id"> = {
        name: categoryName,
        icon: "📁",
        color: "gray",
      };

      onCreateCategory(newCategory);
      setSelectedCategory(categoryName);
      setSelectedCategoryName(categoryName);
    }
  };

  const handleSave = () => {
    if (!viewName.trim() || !selectedCategory) return;

    onSave({
      name: viewName.trim(),
      description: viewDescription.trim(),
      category: selectedCategory,
      filterModel: currentFilterModel,
      columnState: currentColumnState,
      sortModel: currentSortModel,
    });

    // Reset form
    setViewName("");
    setViewDescription("");
    setSelectedCategory(categories[0]?.id || "");
    setSelectedCategoryName(categories[0]?.name || "");
    onClose();
  };

  const canSave = viewName.trim().length > 0 && selectedCategory.length > 0;

  const dialogContent = children ? (
    <div {...props} data-save-view-dialog>
      {children({
        viewName,
        setViewName,
        viewDescription,
        setViewDescription,
        selectedCategory,
        selectedCategoryName,
        handleCategoryChange,
        handleSave,
        canSave,
        categories,
      })}
    </div>
  ) : (
    <div {...props} data-save-view-dialog>
      <div data-dialog-overlay onClick={onClose} />
      <div data-dialog-content>
        <div data-dialog-header>
          <h2 data-dialog-title>Save Current View</h2>
        </div>

        <div data-dialog-body>
          {/* View Name */}
          <div data-form-field>
            <label data-field-label htmlFor="view-name">
              View Name
            </label>
            <input
              id="view-name"
              type="text"
              value={viewName}
              onChange={(e) => setViewName(e.target.value)}
              placeholder="e.g., High Priority Tasks"
              autoFocus
              data-field-input
            />
          </div>

          {/* Description */}
          <div data-form-field>
            <label data-field-label htmlFor="view-description">
              Description (optional)
            </label>
            <textarea
              id="view-description"
              value={viewDescription}
              onChange={(e) => setViewDescription(e.target.value)}
              placeholder="Brief description of this view..."
              rows={2}
              data-field-textarea
            />
          </div>

          {/* Category */}
          <div data-form-field>
            <label data-field-label htmlFor="view-category">
              Category
            </label>
            <CategorySelector
              id="view-category"
              value={selectedCategoryName}
              onChange={handleCategoryChange}
              existingCategories={categories.map((c) => c.name)}
              placeholder="Select or create category"
              usePortal={true}
            />
          </div>
        </div>

        {/* Actions */}
        <div data-dialog-footer>
          <button
            onClick={handleSave}
            disabled={!canSave}
            data-action="save"
            data-primary="true"
          >
            Save View
          </button>
          <button onClick={onClose} data-action="cancel">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  // Create portal root if it doesn't exist
  let portalRoot = document.getElementById(portalId);
  if (!portalRoot) {
    portalRoot = document.createElement("div");
    portalRoot.id = portalId;
    portalRoot.style.position = "relative";
    portalRoot.style.zIndex = "999999";
    document.body.appendChild(portalRoot);
  }

  return createPortal(dialogContent, portalRoot);
};
