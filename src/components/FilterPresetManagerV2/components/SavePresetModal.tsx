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
