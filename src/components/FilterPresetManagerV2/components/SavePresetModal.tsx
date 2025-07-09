import React, { useState } from "react";
import { createPortal } from "react-dom";
import styles from "../FilterPresetManager.module.css";

interface SavePresetModalProps {
  onSave: (name: string, category?: string, isDefault?: boolean) => void;
  onClose: () => void;
  existingCategories: string[];
}

export const SavePresetModal: React.FC<SavePresetModalProps> = ({
  onSave,
  onClose,
}) => {
  const [name, setName] = useState("");

  const handleSave = () => {
    if (name.trim()) {
      onSave(name.trim());
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
            <input
              type="text"
              className={styles.input}
              placeholder="View name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSave()}
              autoFocus
            />
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
