import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import styles from "./QuickFilterDropdown.module.css";
import type {
  DropdownState,
  QuickFilterDropdownProps,
  QuickFilterOption,
} from "./types";
import { NavigationKey } from "./types";
import {
  applyQuickFilter,
  getActiveFilterOption,
} from "./utils/filterModelBuilder";

/**
 * A reusable dropdown component for applying quick filters to AG Grid columns
 */
export const QuickFilterDropdown: React.FC<QuickFilterDropdownProps> = ({
  api,
  columnId,
  options,
  placeholder = "Select filter",
  className,
  onFilterChange,
  position = "bottom-left",
  showDescriptions = true,
  triggerContent,
  ariaLabel = "Quick filter options",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const [state, setState] = useState<DropdownState>({
    isOpen: false,
    selectedOption: null,
    highlightedIndex: -1,
    searchQuery: "",
  });

  // Get the currently active filter from AG Grid
  useEffect(() => {
    const activeOption = getActiveFilterOption(api, columnId, options);
    setState((prev) => ({ ...prev, selectedOption: activeOption }));
  }, [api, columnId, options]);

  // Filter options based on search query
  const filteredOptions = useMemo(() => {
    if (!state.searchQuery) return options;

    const query = state.searchQuery.toLowerCase();
    return options.filter(
      (option) =>
        option.label.toLowerCase().includes(query) ||
        option.description?.toLowerCase().includes(query),
    );
  }, [options, state.searchQuery]);

  // Handle option selection
  const handleSelectOption = useCallback(
    (option: QuickFilterOption | null) => {
      applyQuickFilter(api, columnId, option);
      setState((prev) => ({
        ...prev,
        selectedOption: option,
        isOpen: false,
        searchQuery: "",
        highlightedIndex: -1,
      }));
      onFilterChange?.(option);
      triggerRef.current?.focus();
    },
    [api, columnId, onFilterChange],
  );

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setState((prev) => ({
          ...prev,
          isOpen: false,
          searchQuery: "",
          highlightedIndex: -1,
        }));
      }
    };

    if (state.isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [state.isOpen]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      const key = event.key as NavigationKey;

      switch (key) {
        case NavigationKey.ArrowDown:
          event.preventDefault();
          if (!state.isOpen) {
            setState((prev) => ({ ...prev, isOpen: true }));
          } else {
            setState((prev) => ({
              ...prev,
              highlightedIndex: Math.min(
                prev.highlightedIndex + 1,
                filteredOptions.length - 1,
              ),
            }));
          }
          break;

        case NavigationKey.ArrowUp:
          event.preventDefault();
          setState((prev) => ({
            ...prev,
            highlightedIndex: Math.max(prev.highlightedIndex - 1, 0),
          }));
          break;

        case NavigationKey.Enter:
        case NavigationKey.Space:
          event.preventDefault();
          if (state.isOpen && state.highlightedIndex >= 0) {
            handleSelectOption(filteredOptions[state.highlightedIndex]);
          } else if (!state.isOpen) {
            setState((prev) => ({ ...prev, isOpen: true }));
          }
          break;

        case NavigationKey.Escape:
          event.preventDefault();
          setState((prev) => ({
            ...prev,
            isOpen: false,
            searchQuery: "",
            highlightedIndex: -1,
          }));
          triggerRef.current?.focus();
          break;

        case NavigationKey.Home:
          event.preventDefault();
          setState((prev) => ({ ...prev, highlightedIndex: 0 }));
          break;

        case NavigationKey.End:
          event.preventDefault();
          setState((prev) => ({
            ...prev,
            highlightedIndex: filteredOptions.length - 1,
          }));
          break;

        default:
          // Allow typing for search
          if (state.isOpen && event.key.length === 1) {
            searchInputRef.current?.focus();
          }
      }
    },
    [state.isOpen, state.highlightedIndex, filteredOptions, handleSelectOption],
  );

  // Scroll highlighted option into view
  useEffect(() => {
    if (
      state.highlightedIndex >= 0 &&
      optionRefs.current[state.highlightedIndex]
    ) {
      optionRefs.current[state.highlightedIndex]?.scrollIntoView({
        block: "nearest",
        behavior: "smooth",
      });
    }
  }, [state.highlightedIndex]);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (state.isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [state.isOpen]);

  const positionClass =
    styles[
      `position${position
        .split("-")
        .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
        .join("")}` as keyof typeof styles
    ];

  return (
    <div
      ref={containerRef}
      className={`${styles.container} ${className || ""}`}
    >
      <button
        ref={triggerRef}
        type="button"
        className={`${styles.trigger} ${
          state.selectedOption ? styles.triggerActive : ""
        }`}
        onClick={() =>
          setState((prev) => ({
            ...prev,
            isOpen: !prev.isOpen,
            highlightedIndex: -1,
          }))
        }
        onKeyDown={handleKeyDown}
        aria-label={ariaLabel}
        aria-expanded={state.isOpen}
        aria-haspopup="listbox"
        aria-controls="quick-filter-dropdown"
      >
        {triggerContent ? (
          triggerContent(state.selectedOption)
        ) : (
          <>
            <span>{state.selectedOption?.label || placeholder}</span>
            <span
              className={`${styles.triggerIcon} ${
                state.isOpen ? styles.triggerIconOpen : ""
              }`}
            >
              <ChevronDownIcon className={styles.chevron} />
            </span>
          </>
        )}
      </button>

      <div
        ref={dropdownRef}
        id="quick-filter-dropdown"
        className={`${styles.dropdown} ${positionClass} ${
          state.isOpen ? styles.dropdownOpen : ""
        }`}
        role="listbox"
        aria-label={ariaLabel}
      >
        {options.length > 10 && (
          <div className={styles.searchContainer}>
            <input
              ref={searchInputRef}
              type="text"
              className={styles.searchInput}
              placeholder="Search filters..."
              value={state.searchQuery}
              onChange={(e) =>
                setState((prev) => ({
                  ...prev,
                  searchQuery: e.target.value,
                  highlightedIndex: 0,
                }))
              }
              onKeyDown={handleKeyDown}
              aria-label="Search filters"
            />
          </div>
        )}

        <div className={styles.optionsList}>
          {filteredOptions.length === 0 ? (
            <div className={styles.emptyState}>No matching filters</div>
          ) : (
            filteredOptions.map((option, index) => {
              const isSelected = state.selectedOption?.id === option.id;
              const isHighlighted = state.highlightedIndex === index;

              return (
                <button
                  key={option.id}
                  ref={(el) => {
                    optionRefs.current[index] = el;
                  }}
                  type="button"
                  className={`${styles.option} ${
                    isSelected ? styles.optionSelected : ""
                  } ${isHighlighted ? styles.optionHighlighted : ""}`}
                  onClick={() => handleSelectOption(option)}
                  onMouseEnter={() =>
                    setState((prev) => ({ ...prev, highlightedIndex: index }))
                  }
                  role="option"
                  aria-selected={isSelected}
                >
                  {option.icon && (
                    <span className={styles.optionIcon}>{option.icon}</span>
                  )}
                  <div className={styles.optionContent}>
                    <span className={styles.optionLabel}>{option.label}</span>
                    {showDescriptions && option.description && (
                      <span className={styles.optionDescription}>
                        {option.description}
                      </span>
                    )}
                  </div>
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

// Chevron down icon component
const ChevronDownIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className={className}
  >
    <path
      fillRule="evenodd"
      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
      clipRule="evenodd"
    />
  </svg>
);

// Export additional utilities
export { DATE_FILTER_PRESETS } from "./utils/filterModelBuilder";
export type { QuickFilterOption, QuickFilterDropdownProps } from "./types";
