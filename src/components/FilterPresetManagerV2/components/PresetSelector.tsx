import React, {
  useState,
  useCallback,
  useMemo,
  useEffect,
  useRef,
} from "react";
import { createPortal } from "react-dom";
import type { PresetSelectorProps, FilterPreset } from "../types";
import styles from "./PresetSelector.module.css";

export const PresetSelector: React.FC<PresetSelectorProps> = ({
  api,
  presets,
  onPresetSelect,
  placeholder = "My Views",
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPresetId, setSelectedPresetId] = useState<string | null>(null);
  const [dropdownPosition, setDropdownPosition] = useState<{
    top: number;
    left: number;
    width: number;
  } | null>(null);

  const triggerRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Group presets by category
  const groupedPresets = useMemo(() => {
    const groups: Record<string, FilterPreset[]> = {};

    const sortedPresets = [...presets].sort((a, b) => {
      // Default presets first
      if (a.isDefault && !b.isDefault) return -1;
      if (!a.isDefault && b.isDefault) return 1;

      // Then by order
      if (a.order !== undefined && b.order !== undefined) {
        return a.order - b.order;
      }

      // Then by name
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
    const dropdownHeight = 320;

    let top = rect.bottom + 4;
    if (spaceBelow < dropdownHeight && spaceAbove > spaceBelow) {
      top = rect.top - dropdownHeight - 4;
    }

    return {
      top,
      left: rect.left,
      width: Math.max(rect.width, 240),
    };
  }, []);

  // Handle preset selection
  const handlePresetSelect = useCallback(
    (preset: FilterPreset) => {
      api.setFilterModel(preset.filterModel);
      setSelectedPresetId(preset.id);
      setIsOpen(false);
      setSearchQuery("");
      onPresetSelect(preset);
    },
    [api, onPresetSelect],
  );

  // Handle clear filters
  const handleClearFilters = useCallback(() => {
    api.setFilterModel(null);
    setSelectedPresetId(null);
    setIsOpen(false);
    setSearchQuery("");
    onPresetSelect({
      id: "clear",
      name: "Clear all filters",
      filterModel: {},
      createdAt: new Date(),
    });
  }, [api, onPresetSelect]);

  // Update position when dropdown opens
  useEffect(() => {
    if (isOpen) {
      const position = calculateDropdownPosition();
      setDropdownPosition(position);
    }
  }, [isOpen, calculateDropdownPosition]);

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

  // Get display text
  const displayText = useMemo(() => {
    if (selectedPresetId) {
      const preset = presets.find((p) => p.id === selectedPresetId);
      return preset?.name || placeholder;
    }
    return placeholder;
  }, [selectedPresetId, presets, placeholder]);

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
          placeholder="Search views..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onClick={(e) => e.stopPropagation()}
          autoFocus
        />
      </div>

      <div className={styles.presetList}>
        {/* Clear filters option */}
        <button
          className={`${styles.clearButton} ${
            !selectedPresetId ? styles.active : ""
          }`}
          onClick={handleClearFilters}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M15 9l-6 6M9 9l6 6" />
          </svg>
          Clear all filters
        </button>

        {/* Divider */}
        {Object.keys(filteredGroups).length > 0 && (
          <div className={styles.divider} />
        )}

        {/* Grouped presets */}
        {Object.keys(filteredGroups).length === 0 ? (
          <div className={styles.emptyMessage}>
            {searchQuery ? "No matching views" : "No saved views yet"}
          </div>
        ) : (
          Object.entries(filteredGroups).map(([category, presetList]) => (
            <div key={category} className={styles.categoryGroup}>
              <div className={styles.categoryHeader}>{category}</div>
              {presetList.map((preset) => (
                <button
                  key={preset.id}
                  className={`${styles.presetItem} ${
                    selectedPresetId === preset.id ? styles.selected : ""
                  }`}
                  onClick={() => handlePresetSelect(preset)}
                >
                  <span className={styles.presetName}>
                    {preset.isDefault && "⭐ "}
                    {preset.name}
                  </span>
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
        <svg
          className={styles.triggerIcon}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path d="M3 4h18M3 8h12M3 12h12M3 16h18M3 20h12" strokeWidth="2" />
        </svg>
        <span className={styles.triggerText}>{displayText}</span>
        <svg
          className={`${styles.triggerChevron} ${isOpen ? styles.open : ""}`}
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
