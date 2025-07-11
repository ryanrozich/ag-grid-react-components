import React, { useState, useCallback, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import type { PresetMenuProps, FilterPreset } from "../types";
import { SavePresetModal } from "./SavePresetModal";
import { ManagePresetsModal } from "./ManagePresetsModal";
import { ImportExportModal } from "./ImportExportModal";
import styles from "./PresetMenu.module.css";

export const PresetMenu: React.FC<PresetMenuProps> = ({
  api,
  gridId,
  presets,
  onPresetsChange,
  maxPresets = 50,
  allowedCategories,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<
    "save" | "manage" | "import-export" | null
  >(null);
  const [menuPosition, setMenuPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);

  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Check if there are active filters
  const hasActiveFilters = useCallback(() => {
    const filterModel = api.getFilterModel();
    return filterModel && Object.keys(filterModel).length > 0;
  }, [api]);

  // Calculate menu position
  const calculateMenuPosition = useCallback(() => {
    if (!triggerRef.current) return null;

    const rect = triggerRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;
    const menuHeight = 200; // Approximate
    const menuWidth = 200; // Approximate

    let top = rect.bottom + 4;
    let left = rect.left;

    // Adjust for viewport boundaries
    if (top + menuHeight > viewportHeight) {
      top = rect.top - menuHeight - 4;
    }

    if (left + menuWidth > viewportWidth) {
      left = rect.right - menuWidth;
    }

    return { top, left };
  }, []);

  // Update position when menu opens
  useEffect(() => {
    if (isOpen) {
      const position = calculateMenuPosition();
      setMenuPosition(position);
    }
  }, [isOpen, calculateMenuPosition]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const isClickInside =
        triggerRef.current?.contains(target) ||
        menuRef.current?.contains(target);

      if (!isClickInside) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isOpen]);

  // Handle save preset
  const handleSavePreset = useCallback(
    (name: string, category?: string, isDefault?: boolean) => {
      const newPreset: FilterPreset = {
        id: `${gridId}-${Date.now()}`,
        name,
        category,
        filterModel: api.getFilterModel(),
        createdAt: new Date(),
        isDefault,
      };

      // Check max presets limit
      if (presets.length >= maxPresets) {
        alert(
          `Maximum of ${maxPresets} presets reached. Please delete some presets first.`,
        );
        return;
      }

      onPresetsChange([...presets, newPreset]);
      setActiveModal(null);
      setIsOpen(false);
    },
    [api, gridId, presets, onPresetsChange, maxPresets],
  );

  // Handle menu item clicks
  const handleMenuItemClick = useCallback(
    (action: "save" | "manage" | "export" | "import") => {
      setIsOpen(false);

      switch (action) {
        case "save":
          setActiveModal("save");
          break;
        case "manage":
          setActiveModal("manage");
          break;
        case "export":
        case "import":
          setActiveModal("import-export");
          break;
      }
    },
    [],
  );

  const menuContent = (
    <div
      ref={menuRef}
      className={styles.menu}
      style={
        menuPosition
          ? {
              position: "fixed",
              top: `${menuPosition.top}px`,
              left: `${menuPosition.left}px`,
              zIndex: 9999,
            }
          : undefined
      }
    >
      {hasActiveFilters() && (
        <>
          <button
            className={styles.menuItem}
            onClick={() => handleMenuItemClick("save")}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" />
              <polyline points="17 21 17 13 7 13 7 21" />
              <polyline points="7 3 7 8 15 8" />
            </svg>
            Save current view
          </button>
          <div className={styles.divider} />
        </>
      )}

      {presets.length > 0 && (
        <button
          className={styles.menuItem}
          onClick={() => handleMenuItemClick("manage")}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
          </svg>
          Manage saved views
        </button>
      )}

      <button
        className={styles.menuItem}
        onClick={() => handleMenuItemClick("import")}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" />
        </svg>
        Import views...
      </button>

      {presets.length > 0 && (
        <button
          className={styles.menuItem}
          onClick={() => handleMenuItemClick("export")}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
          </svg>
          Export all views...
        </button>
      )}
    </div>
  );

  return (
    <>
      <button
        ref={triggerRef}
        className={`${styles.trigger} ${className}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        title="Filter view options"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <circle cx="12" cy="12" r="1" />
          <circle cx="12" cy="5" r="1" />
          <circle cx="12" cy="19" r="1" />
        </svg>
      </button>

      {isOpen && menuPosition && createPortal(menuContent, document.body)}

      {/* Modals */}
      {activeModal === "save" && (
        <SavePresetModal
          onSave={handleSavePreset}
          onClose={() => setActiveModal(null)}
          existingCategories={
            allowedCategories || [
              ...new Set(
                presets.map((p) => p.category).filter(Boolean) as string[],
              ),
            ]
          }
        />
      )}

      {activeModal === "manage" && (
        <ManagePresetsModal
          presets={presets}
          onPresetsChange={onPresetsChange}
          onClose={() => setActiveModal(null)}
          allowedCategories={allowedCategories}
          api={api}
        />
      )}

      {activeModal === "import-export" && (
        <ImportExportModal
          gridId={gridId}
          presets={presets}
          onPresetsChange={onPresetsChange}
          onClose={() => setActiveModal(null)}
          api={api}
        />
      )}
    </>
  );
};
