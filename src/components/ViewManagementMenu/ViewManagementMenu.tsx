import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import type { GridApi } from "ag-grid-community";

export interface ViewManagementMenuProps {
  /** AG Grid API instance */
  api: GridApi | null;
  /** Callback when save view is clicked */
  onSaveView?: () => void;
  /** Callback when manage views is clicked */
  onManageViews?: () => void;
  /** Callback when import is clicked */
  onImport?: () => void;
  /** Callback when export is clicked */
  onExport?: () => void;
  /** Custom className for the trigger button */
  className?: string;
  /** Portal target ID */
  portalId?: string;
}

export const ViewManagementMenu: React.FC<ViewManagementMenuProps> = ({
  api,
  onSaveView,
  onManageViews,
  onImport,
  onExport,
  className = "",
  portalId = "view-management-menu-portal",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [menuPosition, setMenuPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);

  // Calculate menu position
  useEffect(() => {
    if (!isOpen || !buttonRef.current) {
      setMenuPosition(null);
      return;
    }

    const rect = buttonRef.current.getBoundingClientRect();
    const menuWidth = 200; // Approximate menu width
    const menuHeight = 200; // Approximate menu height

    // Calculate position to avoid viewport edges
    let top = rect.bottom + 4;
    let left = rect.left;

    // Check if menu would go off right edge
    if (left + menuWidth > window.innerWidth) {
      left = rect.right - menuWidth;
    }

    // Check if menu would go off bottom edge
    if (top + menuHeight > window.innerHeight) {
      top = rect.top - menuHeight - 4;
    }

    setMenuPosition({ top, left });
  }, [isOpen]);

  // Handle clicks outside
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        !buttonRef.current?.contains(event.target as Node) &&
        !menuRef.current?.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  const handleMenuItemClick = (callback?: () => void) => {
    setIsOpen(false);
    callback?.();
  };

  const menuContent = (
    <div
      ref={menuRef}
      className="view-management-menu-dropdown"
      data-testid="view-management-menu"
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
      <button
        className="view-management-menu-item"
        onClick={() => handleMenuItemClick(onSaveView)}
        disabled={!api}
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
            d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V2"
          />
        </svg>
        Save current view...
      </button>

      <button
        className="view-management-menu-item"
        onClick={() => handleMenuItemClick(onManageViews)}
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
            d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
          />
        </svg>
        Manage saved views...
      </button>

      <div className="view-management-menu-divider" />

      <button
        className="view-management-menu-item"
        onClick={() => handleMenuItemClick(onImport)}
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
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
          />
        </svg>
        Import views...
      </button>

      <button
        className="view-management-menu-item"
        onClick={() => handleMenuItemClick(onExport)}
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
        Export all views...
      </button>
    </div>
  );

  // Create portal root if needed
  useEffect(() => {
    if (!document.getElementById(portalId)) {
      const portalRoot = document.createElement("div");
      portalRoot.id = portalId;
      document.body.appendChild(portalRoot);
    }
  }, [portalId]);

  return (
    <>
      <button
        ref={buttonRef}
        className={`view-management-menu-trigger ${className}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="View management menu"
        aria-expanded={isOpen}
        aria-haspopup="true"
        data-testid="view-management-menu-trigger"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
        </svg>
      </button>

      {isOpen &&
        menuPosition &&
        createPortal(
          menuContent,
          document.getElementById(portalId) || document.body,
        )}
    </>
  );
};
