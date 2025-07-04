import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import ReactDOM from "react-dom";
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
  usePortal = "never",
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

  const [dropdownPosition, setDropdownPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);

  // Detect if we should use portal based on parent overflow
  const shouldUsePortal = useMemo(() => {
    if (usePortal === "always") return true;
    if (usePortal === "never") return false;

    // Auto-detect: Check if any parent has overflow hidden/auto/scroll
    // This is a simplified check - in production you might want more sophisticated detection
    return false; // For now, default to false for 'auto' mode
  }, [usePortal]);

  // Get the currently active filter from AG Grid
  useEffect(() => {
    // Skip if API is not available or invalid
    if (!api || typeof api.getFilterModel !== "function") {
      return;
    }

    try {
      const activeOption = getActiveFilterOption(api, columnId, options);
      setState((prev) => ({ ...prev, selectedOption: activeOption }));
    } catch (error) {
      console.warn("[QuickFilterDropdown] Error getting active filter:", error);
    }
  }, [api, columnId, options]);

  // Calculate dropdown position (only used when portal is enabled)
  const calculateDropdownPosition = useCallback(() => {
    if (!triggerRef.current || !shouldUsePortal) return null;

    const rect = triggerRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const dropdownHeight = 400; // Approximate height

    let top = rect.bottom + 4;
    let left = rect.left;

    // Flip to top if not enough space below
    if (top + dropdownHeight > viewportHeight && rect.top > dropdownHeight) {
      top = rect.top - dropdownHeight - 4;
    }

    // Ensure dropdown doesn't go off-screen horizontally
    const dropdownWidth = 320; // Approximate width
    if (left + dropdownWidth > window.innerWidth) {
      left = window.innerWidth - dropdownWidth - 10;
    }

    return { top, left };
  }, [shouldUsePortal]);

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
    async (option: QuickFilterOption | null) => {
      // Check if API is still valid before applying filter
      if (!api || typeof api.getFilterModel !== "function") {
        console.warn("[QuickFilterDropdown] API is invalid or destroyed");
        return;
      }

      try {
        await applyQuickFilter(api, columnId, option);
        setState((prev) => ({
          ...prev,
          selectedOption: option,
          isOpen: false,
          searchQuery: "",
          highlightedIndex: -1,
        }));
        setDropdownPosition(null);
        onFilterChange?.(option);
        triggerRef.current?.focus();
      } catch (error) {
        console.error("[QuickFilterDropdown] Error applying filter:", error);
      }
    },
    [api, columnId, onFilterChange],
  );

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const isClickInside =
        containerRef.current?.contains(target) ||
        (shouldUsePortal &&
          document.getElementById("quick-filter-dropdown")?.contains(target));

      if (!isClickInside) {
        setState((prev) => ({
          ...prev,
          isOpen: false,
          searchQuery: "",
          highlightedIndex: -1,
        }));
        setDropdownPosition(null);
      }
    };

    if (state.isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [state.isOpen, shouldUsePortal]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      const key = event.key as NavigationKey;

      switch (key) {
        case NavigationKey.ArrowDown:
          event.preventDefault();
          if (!state.isOpen) {
            if (shouldUsePortal) {
              const position = calculateDropdownPosition();
              setDropdownPosition(position);
            }
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
            if (shouldUsePortal) {
              const position = calculateDropdownPosition();
              setDropdownPosition(position);
            }
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
          setDropdownPosition(null);
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
    [
      state.isOpen,
      state.highlightedIndex,
      filteredOptions,
      handleSelectOption,
      calculateDropdownPosition,
      shouldUsePortal,
    ],
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

  // Update position on window resize (only when using portal)
  useEffect(() => {
    if (!state.isOpen || !shouldUsePortal) return;

    const handleResize = () => {
      const position = calculateDropdownPosition();
      setDropdownPosition(position);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleResize, true);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleResize, true);
    };
  }, [state.isOpen, shouldUsePortal, calculateDropdownPosition]);

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
      data-testid="quick-filter-dropdown"
    >
      <button
        ref={triggerRef}
        type="button"
        className={`${styles.trigger} ${
          state.selectedOption ? styles.triggerActive : ""
        }`}
        onClick={() => {
          if (!state.isOpen && shouldUsePortal) {
            const position = calculateDropdownPosition();
            setDropdownPosition(position);
          }
          setState((prev) => ({
            ...prev,
            isOpen: !prev.isOpen,
            highlightedIndex: -1,
          }));
        }}
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

      {state.isOpen &&
        shouldUsePortal &&
        dropdownPosition &&
        ReactDOM.createPortal(
          <div
            ref={dropdownRef}
            id="quick-filter-dropdown"
            className={`${styles.dropdown} ${positionClass} ${
              state.isOpen ? styles.dropdownOpen : ""
            }`}
            style={{
              position: "fixed",
              top: dropdownPosition.top,
              left: dropdownPosition.left,
              zIndex: 99999,
            }}
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
                  data-testid="quick-filter-search"
                />
              </div>
            )}

            <div className={styles.optionsList}>
              {filteredOptions.length === 0 ? (
                <div className={styles.emptyState}>No matching filters</div>
              ) : (
                filteredOptions.map((option, index) => {
                  const isSelected = option.id === state.selectedOption?.id;
                  const isHighlighted = index === state.highlightedIndex;

                  return (
                    <button
                      key={option.id || index}
                      ref={(el) => {
                        optionRefs.current[index] = el;
                      }}
                      type="button"
                      className={`${styles.option} ${
                        isSelected ? styles.optionSelected : ""
                      } ${isHighlighted ? styles.optionHighlighted : ""}`}
                      onClick={() => handleSelectOption(option)}
                      onMouseEnter={() =>
                        setState((prev) => ({
                          ...prev,
                          highlightedIndex: index,
                        }))
                      }
                      role="option"
                      aria-selected={isSelected}
                      data-testid={`quick-filter-option-${option.id || index}`}
                    >
                      <div className={styles.optionContent}>
                        <span className={styles.optionLabel}>
                          {option.label}
                        </span>
                        {showDescriptions && option.description && (
                          <span className={styles.optionDescription}>
                            {option.description}
                          </span>
                        )}
                      </div>
                      {isSelected && (
                        <span className={styles.optionCheckmark}>
                          <CheckIcon className={styles.checkIcon} />
                        </span>
                      )}
                    </button>
                  );
                })
              )}
            </div>
          </div>,
          document.body,
        )}

      {/* Non-portal dropdown (default) */}
      {state.isOpen && !shouldUsePortal && (
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
                data-testid="quick-filter-search"
              />
            </div>
          )}

          <div className={styles.optionsList}>
            {filteredOptions.length === 0 ? (
              <div className={styles.emptyState}>No matching filters</div>
            ) : (
              filteredOptions.map((option, index) => {
                const isSelected = option.id === state.selectedOption?.id;
                const isHighlighted = index === state.highlightedIndex;

                return (
                  <button
                    key={option.id || index}
                    ref={(el) => {
                      optionRefs.current[index] = el;
                    }}
                    type="button"
                    className={`${styles.option} ${
                      isSelected ? styles.optionSelected : ""
                    } ${isHighlighted ? styles.optionHighlighted : ""}`}
                    onClick={() => handleSelectOption(option)}
                    onMouseEnter={() =>
                      setState((prev) => ({
                        ...prev,
                        highlightedIndex: index,
                      }))
                    }
                    role="option"
                    aria-selected={isSelected}
                    data-testid={`quick-filter-option-${option.id || index}`}
                  >
                    <div className={styles.optionContent}>
                      <span className={styles.optionLabel}>{option.label}</span>
                      {showDescriptions && option.description && (
                        <span className={styles.optionDescription}>
                          {option.description}
                        </span>
                      )}
                    </div>
                    {isSelected && (
                      <span className={styles.optionCheckmark}>
                        <CheckIcon className={styles.checkIcon} />
                      </span>
                    )}
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
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

// Check icon component
const CheckIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className={className}
  >
    <path
      fillRule="evenodd"
      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
      clipRule="evenodd"
    />
  </svg>
);

// Export additional utilities
export { DATE_FILTER_PRESETS } from "./utils/filterModelBuilder";
export type { QuickFilterOption, QuickFilterDropdownProps } from "./types";
