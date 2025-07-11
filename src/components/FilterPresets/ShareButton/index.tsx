import React, { useState, useRef, useEffect, useCallback } from "react";
import { createShareableUrl } from "../../../utils/presetSharing";
import type {
  FilterPreset,
  ShareOptions,
} from "../../../utils/presetSharing/types";

export interface TriggerProps {
  onClick: () => void;
  isOpen: boolean;
  "aria-expanded": boolean;
  "aria-label": string;
}

export interface ShareButtonProps {
  /** The preset to share */
  preset: FilterPreset;
  /** Base URL for sharing (defaults to current location) */
  baseUrl?: string;
  /** Callback when URL is copied */
  onCopy?: () => void;
  /** Custom render function for the trigger button */
  renderTrigger?: (props: TriggerProps) => React.ReactNode;
}

export function ShareButton({
  preset,
  baseUrl,
  onCopy,
  renderTrigger,
}: ShareButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copiedMode, setCopiedMode] = useState<"embedded" | "reference" | null>(
    null,
  );
  const popoverRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Reset copied state after delay
  useEffect(() => {
    if (copiedMode) {
      const timer = setTimeout(() => {
        setCopiedMode(null);
        setIsOpen(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [copiedMode]);

  // Handle click outside
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
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
        triggerRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  const handleCopy = useCallback(
    async (mode: "embedded" | "reference") => {
      try {
        const options: ShareOptions = {
          mode,
          baseUrl,
          compress: mode === "embedded",
        };

        const result = createShareableUrl(preset, options);

        await navigator.clipboard.writeText(result.url);
        setCopiedMode(mode);
        onCopy?.();
      } catch (error) {
        console.error("[ShareButton] Failed to copy to clipboard:", error);
      }
    },
    [preset, baseUrl, onCopy],
  );

  const handleToggle = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  const triggerProps: TriggerProps = {
    onClick: handleToggle,
    isOpen,
    "aria-expanded": isOpen,
    "aria-label": "Share preset",
  };

  // Calculate sizes for display
  const embeddedOptions: ShareOptions = {
    mode: "embedded",
    baseUrl,
    compress: true,
  };
  const embeddedResult = createShareableUrl(preset, embeddedOptions);
  const embeddedSize = embeddedResult.finalSize;

  return (
    <div className="relative">
      {renderTrigger ? (
        renderTrigger(triggerProps)
      ) : (
        <button
          ref={triggerRef}
          className="px-3 py-1.5 text-sm border rounded hover:bg-gray-50"
          onClick={triggerProps.onClick}
          aria-expanded={triggerProps["aria-expanded"]}
          aria-label={triggerProps["aria-label"]}
        >
          Share
        </button>
      )}

      {isOpen && (
        <div
          ref={popoverRef}
          className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border p-4 z-50"
          role="dialog"
          aria-label="Share options"
        >
          <h3 className="font-medium mb-1">Share Preset</h3>
          <p className="text-sm text-gray-600 mb-4">
            Choose how to share this preset
          </p>

          <div className="space-y-3">
            {/* Embedded option */}
            <button
              className="w-full text-left p-3 border rounded-lg hover:bg-gray-50 transition-colors"
              onClick={() => handleCopy("embedded")}
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-medium">
                    {copiedMode === "embedded" ? "✓ Copied!" : "Copy Link"}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    Full preset data embedded in URL
                  </div>
                </div>
                <div className="text-xs text-gray-500">
                  ~{Math.round(embeddedSize / 100) * 100} bytes
                </div>
              </div>
            </button>

            {/* Reference option */}
            <button
              className="w-full text-left p-3 border rounded-lg hover:bg-gray-50 transition-colors"
              onClick={() => handleCopy("reference")}
            >
              <div>
                <div className="font-medium">
                  {copiedMode === "reference" ? "✓ Copied!" : "Copy Reference"}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Just the preset ID (requires same browser)
                </div>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
