import React, { useState, useCallback, useMemo, useEffect } from "react";
import { createPortal } from "react-dom";
import type { GridApi } from "ag-grid-community";
import type { FilterPreset } from "../FilterPresetManager";
import styles from "./SavedFiltersDropdown.module.css";

export interface SavedFiltersDropdownProps {
  api: GridApi;
  presets: FilterPreset[];
  onPresetSelect?: (preset: FilterPreset) => void;
  placeholder?: string;
  className?: string;
}

export const SavedFiltersDropdown: React.FC<SavedFiltersDropdownProps> = ({
  api,
  presets,
  onPresetSelect,
  placeholder = "My Filters",
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState<FilterPreset | null>(
    null,
  );
  const [dropdownPosition, setDropdownPosition] = useState<{
    top: number;
    left: number;
    width: number;
  } | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  // Group presets by category
  const groupedPresets = useMemo(() => {
    const groups: Record<string, FilterPreset[]> = {};

    // Sort presets by order, then by name
    const sortedPresets = [...presets].sort((a, b) => {
      if (a.order !== undefined && b.order !== undefined) {
        return a.order - b.order;
      }
      return a.name.localeCompare(b.name);
    });

    sortedPresets.forEach((preset) => {
      const category = preset.category || "Uncategorized";
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(preset);
    });

    return groups;
  }, [presets]);

  // Filter presets based on search
  const filteredGroups = useMemo(() => {
    if (!searchQuery) return groupedPresets;

    const filtered: Record<string, FilterPreset[]> = {};
    const query = searchQuery.toLowerCase();

    Object.entries(groupedPresets).forEach(([category, presetList]) => {
      const matchingPresets = presetList.filter(
        (preset) =>
          preset.name.toLowerCase().includes(query) ||
          (preset.category?.toLowerCase() || "").includes(query),
      );

      if (matchingPresets.length > 0) {
        filtered[category] = matchingPresets;
      }
    });

    return filtered;
  }, [groupedPresets, searchQuery]);

  // Calculate dropdown position
  const calculateDropdownPosition = useCallback(() => {
    if (!triggerRef.current) return null;

    const rect = triggerRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const spaceBelow = viewportHeight - rect.bottom;
    const spaceAbove = rect.top;
    const dropdownHeight = 320; // Approximate height

    let top = rect.bottom + 4;
    if (spaceBelow < dropdownHeight && spaceAbove > spaceBelow) {
      top = rect.top - dropdownHeight - 4;
    }

    return {
      top,
      left: rect.left,
      width: Math.max(rect.width, 200),
    };
  }, []);

  // Handle preset selection
  const handlePresetSelect = useCallback(
    (preset: FilterPreset) => {
      api.setFilterModel(preset.filterModel);
      setSelectedPreset(preset);
      setIsOpen(false);
      onPresetSelect?.(preset);
    },
    [api, onPresetSelect],
  );

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const isClickInside =
        triggerRef.current?.contains(target) ||
        dropdownRef.current?.contains(target);

      if (!isClickInside) {
        setIsOpen(false);
        setSearchQuery("");
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isOpen]);

  // Update position when dropdown opens
  useEffect(() => {
    if (isOpen) {
      const position = calculateDropdownPosition();
      setDropdownPosition(position);
    }
  }, [isOpen, calculateDropdownPosition]);

  const dropdownContent = (
    <div
      ref={dropdownRef}
      className={styles.dropdown}
      style={
        dropdownPosition
          ? {
              position: "fixed",
              top: `${dropdownPosition.top}px`,
              left: `${dropdownPosition.left}px`,
              width: `${dropdownPosition.width}px`,
              zIndex: 9999,
            }
          : undefined
      }
    >
      <div className={styles.searchContainer}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Search filters..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onClick={(e) => e.stopPropagation()}
        />
      </div>

      <div className={styles.presetList}>
        {Object.keys(filteredGroups).length === 0 ? (
          <div className={styles.emptyMessage}>
            {searchQuery ? "No matching filters" : "No saved filters yet"}
          </div>
        ) : (
          Object.entries(filteredGroups).map(([category, presetList]) => (
            <div key={category} className={styles.categoryGroup}>
              <div className={styles.categoryHeader}>{category}</div>
              {presetList.map((preset) => (
                <button
                  key={preset.id}
                  className={`${styles.presetItem} ${
                    selectedPreset?.id === preset.id ? styles.selected : ""
                  }`}
                  onClick={() => handlePresetSelect(preset)}
                >
                  <span className={styles.presetName}>{preset.name}</span>
                  <span className={styles.presetDate}>
                    {new Date(preset.createdAt).toLocaleDateString()}
                  </span>
                </button>
              ))}
            </div>
          ))
        )}
      </div>
    </div>
  );

  return (
    <>
      <button
        ref={triggerRef}
        className={`${styles.trigger} ${className}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className={styles.triggerText}>
          {selectedPreset ? selectedPreset.name : placeholder}
        </span>
        <svg
          className={`${styles.triggerIcon} ${isOpen ? styles.open : ""}`}
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          stroke="currentColor"
        >
          <path
            d="M3 4.5L6 7.5L9 4.5"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {isOpen &&
        dropdownPosition &&
        createPortal(dropdownContent, document.body)}
    </>
  );
};
