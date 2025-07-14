import React, { useCallback, useState } from "react";
import type { GridApi } from "ag-grid-community";
import type { ViewDropdownLoader } from "../QuickFilterDropdown/loaders/types";
import { resetGrid, type ResetType } from "../../utils/gridReset";

export interface GridResetButtonProps {
  /** AG Grid API instance */
  api: GridApi | null;
  /** ID of the default saved view (if any) */
  defaultViewId?: string;
  /** View loader instance for accessing saved views */
  loader?: ViewDropdownLoader;
  /** Whether to require confirmation before resetting */
  confirmReset?: boolean;
  /** Confirmation message to display */
  confirmMessage?: string;
  /** Button label */
  label?: string;
  /** Icon to display before label */
  icon?: React.ReactNode;
  /** Custom className */
  className?: string;
  /** Whether the button should be disabled */
  disabled?: boolean;
  /** Callback after reset completes */
  onReset?: (resetType: ResetType) => void;
  /** Render prop for custom button content */
  children?: React.ReactNode;
}

export const GridResetButton: React.FC<GridResetButtonProps> = ({
  api,
  defaultViewId,
  loader,
  confirmReset = false,
  confirmMessage = "Are you sure you want to reset the grid to defaults?",
  label = "Reset Grid",
  icon,
  className = "",
  disabled = false,
  onReset,
  children,
}) => {
  const [isResetting, setIsResetting] = useState(false);

  const handleReset = useCallback(async () => {
    if (!api) return;

    // Handle confirmation if required
    if (confirmReset && !window.confirm(confirmMessage)) {
      return;
    }

    setIsResetting(true);

    try {
      // Use the shared reset utility
      const resetType = await resetGrid({
        api,
        defaultViewId,
        loader,
      });

      // Call the callback
      onReset?.(resetType);
    } catch (error) {
      console.error("Error resetting grid:", error);
    } finally {
      setIsResetting(false);
    }
  }, [api, defaultViewId, loader, confirmReset, confirmMessage, onReset]);

  const isDisabled = disabled || !api || isResetting;

  // Default icon if none provided
  const defaultIcon = (
    <svg
      className="w-4 h-4 mr-2"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
      />
    </svg>
  );

  return (
    <button
      type="button"
      className={`grid-reset-button ${className}`}
      onClick={handleReset}
      disabled={isDisabled}
      aria-label={label}
      data-testid="grid-reset-button"
    >
      {children || (
        <>
          {icon !== undefined ? icon : defaultIcon}
          <span>{isResetting ? "Resetting..." : label}</span>
        </>
      )}
    </button>
  );
};
