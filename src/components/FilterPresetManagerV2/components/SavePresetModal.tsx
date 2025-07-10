import React, { useState } from "react";
import { createPortal } from "react-dom";
import { CategorySelector } from "../../CategorySelector";
import styles from "../FilterPresetManager.module.css";

interface SavePresetModalProps {
  onSave: (name: string, category?: string, isDefault?: boolean) => void;
  onClose: () => void;
  existingCategories: string[];
}

export const SavePresetModal: React.FC<SavePresetModalProps> = ({
  onSave,
  onClose,
  existingCategories,
}) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [isDefault, setIsDefault] = useState(false);

  const handleSave = () => {
    if (name.trim()) {
      onSave(name.trim(), category || undefined, isDefault);
    }
  };

  return createPortal(
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h3>Save Filter View</h3>
          <button className={styles.closeButton} onClick={onClose}>
            ×
          </button>
        </div>
        <div className={styles.modalBody}>
          <div className={styles.saveForm}>
            <div className={styles.formGroup}>
              <label htmlFor="preset-name" className={styles.label}>
                View Name
              </label>
              <input
                id="preset-name"
                type="text"
                className={styles.input}
                placeholder="Enter view name..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSave()}
                autoFocus
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="preset-category" className={styles.label}>
                Category (Optional)
              </label>
              <CategorySelector
                id="preset-category"
                value={category}
                onChange={setCategory}
                existingCategories={existingCategories}
                placeholder="Select or create category"
                className="relative w-full"
                inputWrapperClassName="relative flex items-center"
                inputClassName="w-full px-3 py-2 pr-8 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                dropdownIconClassName="absolute right-3 pointer-events-none text-xs text-gray-500 dark:text-gray-400"
                dropdownClassName="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg max-h-80 overflow-y-auto z-50"
                optionClassName="px-3 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100"
                createOptionClassName="flex items-center gap-2 border-b border-gray-200 dark:border-gray-700 font-medium text-blue-600 dark:text-blue-400"
                createIconClassName="text-base"
                noResultsClassName="px-3 py-2 text-gray-500 dark:text-gray-400 italic text-sm"
                createFormClassName="p-3"
                createInputClassName="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-2"
                errorMessageClassName="text-red-500 dark:text-red-400 text-xs mb-2"
                createActionsClassName="flex gap-2 justify-end"
                createButtonClassName="px-4 py-1.5 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
                cancelButtonClassName="px-4 py-1.5 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded hover:bg-gray-400 dark:hover:bg-gray-500 text-sm font-medium"
                highlightedClassName="bg-gray-100 dark:bg-gray-700"
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={isDefault}
                  onChange={(e) => setIsDefault(e.target.checked)}
                />
                Set as default view
              </label>
            </div>

            <button
              className={styles.primaryButton}
              onClick={handleSave}
              disabled={!name.trim()}
            >
              Save View
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
};
