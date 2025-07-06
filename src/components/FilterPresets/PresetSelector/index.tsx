import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import type { PresetSelectorProps, FilterPreset, TriggerProps } from "../types";

export function PresetSelector({
  presets,
  activePresetId,
  onPresetSelect,
  renderTrigger,
  renderOption,
  className,
  disabled = false,
}: PresetSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listboxRef = useRef<HTMLUListElement>(null);
  const optionRefs = useRef<(HTMLLIElement | null)[]>([]);

  const activePreset = useMemo(
    () => presets.find((p) => p.id === activePresetId),
    [presets, activePresetId],
  );

  const handleToggle = useCallback(() => {
    if (!disabled) {
      setIsOpen((prev) => !prev);
      setHighlightedIndex(-1);
    }
  }, [disabled]);

  const handleSelect = useCallback(
    (preset: FilterPreset) => {
      if (preset.id !== activePresetId) {
        onPresetSelect(preset);
        setIsOpen(false);
      }
    },
    [activePresetId, onPresetSelect],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setHighlightedIndex((prev) => (prev + 1) % presets.length);
          break;
        case "ArrowUp":
          e.preventDefault();
          setHighlightedIndex(
            (prev) => (prev - 1 + presets.length) % presets.length,
          );
          break;
        case "Enter":
          e.preventDefault();
          if (highlightedIndex >= 0 && highlightedIndex < presets.length) {
            handleSelect(presets[highlightedIndex]);
          }
          break;
        case "Tab":
          e.preventDefault();
          setIsOpen(false);
          triggerRef.current?.focus();
          break;
        case "Escape":
          e.preventDefault();
          setIsOpen(false);
          triggerRef.current?.focus();
          break;
      }
    },
    [isOpen, presets, highlightedIndex, handleSelect],
  );

  // Handle click outside
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        !triggerRef.current?.contains(target) &&
        !listboxRef.current?.contains(target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Scroll highlighted option into view
  useEffect(() => {
    if (highlightedIndex >= 0 && optionRefs.current[highlightedIndex]) {
      const element = optionRefs.current[highlightedIndex];
      if (element && "scrollIntoView" in element) {
        element.scrollIntoView({
          block: "nearest",
          behavior: "smooth",
        });
      }
    }
  }, [highlightedIndex]);

  const triggerProps: TriggerProps = {
    isOpen,
    onToggle: handleToggle,
    activePreset,
  };

  return (
    <div className="preset-selector" onKeyDown={handleKeyDown}>
      {renderTrigger ? (
        renderTrigger(triggerProps)
      ) : (
        <button
          ref={triggerRef}
          type="button"
          onClick={handleToggle}
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          className={className}
        >
          {presets.length === 0
            ? "No presets"
            : activePreset?.name || "Select preset"}
        </button>
      )}

      {isOpen && presets.length > 0 && (
        <ul
          ref={listboxRef}
          role="listbox"
          aria-label="Select a preset"
          className="preset-selector__dropdown"
        >
          {presets.map((preset, index) => {
            const isActive = preset.id === activePresetId;
            const isHighlighted = index === highlightedIndex;

            return (
              <li
                key={preset.id}
                ref={(el) => {
                  optionRefs.current[index] = el;
                }}
                role="option"
                id={`preset-option-${preset.id}`}
                aria-selected={isActive}
                aria-label={`${preset.name}${preset.isSystem ? " (System preset)" : ""}${
                  preset.isDefault ? " (Default)" : ""
                }${isActive ? " (Currently active)" : ""}`}
                data-system={preset.isSystem || undefined}
                data-default={preset.isDefault || undefined}
                data-highlighted={isHighlighted || undefined}
                onClick={() => handleSelect(preset)}
                onMouseEnter={() => setHighlightedIndex(index)}
                className="preset-selector__option"
              >
                {renderOption ? (
                  renderOption(preset)
                ) : (
                  <div className="preset-selector__option-content">
                    <span className="preset-selector__option-name">
                      {preset.name}
                    </span>
                    {preset.description && (
                      <span className="preset-selector__option-description">
                        {preset.description}
                      </span>
                    )}
                    <div className="preset-selector__option-badges">
                      {preset.isSystem && (
                        <span className="preset-selector__badge preset-selector__badge--system">
                          System
                        </span>
                      )}
                      {preset.isDefault && (
                        <span className="preset-selector__badge preset-selector__badge--default">
                          Default
                        </span>
                      )}
                      {isActive && (
                        <span className="preset-selector__badge preset-selector__badge--active">
                          Active
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

PresetSelector.displayName = "PresetSelector";
