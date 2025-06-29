import React, { useState, useRef, useEffect, useCallback } from "react";
import type {
  QuickFilterDropdownProps,
  QuickFilter,
  QuickFilterGroup,
} from "./types";

export const QuickFilterDropdown: React.FC<QuickFilterDropdownProps> = ({
  gridApi,
  columnId,
  filters,
  label,
  className,
  buttonClassName,
  dropdownClassName,
  onChange,
  showClearOption = true,
  clearOptionLabel = "Clear filter",
  placeholder = "Select filter",
  position = "bottom",
  align = "start",
  closeOnSelect = true,
  styles = {},
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<QuickFilter | null>(
    null,
  );
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  const applyFilter = useCallback(
    (filter: QuickFilter | null) => {
      if (!gridApi || !columnId) return;

      if (filter) {
        const filterModel = { [columnId]: filter.filterModel };
        gridApi.setFilterModel(filterModel);
        setSelectedFilter(filter);
      } else {
        gridApi.setFilterModel(null);
        setSelectedFilter(null);
      }

      onChange?.(filter);

      if (closeOnSelect) {
        setIsOpen(false);
      }
    },
    [gridApi, columnId, onChange, closeOnSelect],
  );

  const handleFilterClick = (filter: QuickFilter) => {
    applyFilter(filter);
  };

  const handleClearClick = () => {
    applyFilter(null);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const isQuickFilterGroup = (
    item: QuickFilter | QuickFilterGroup,
  ): item is QuickFilterGroup => {
    return "filters" in item;
  };

  const renderFilterItem = (filter: QuickFilter, index: number) => (
    <button
      key={index}
      className={styles.item || "agrc-quick-filter__item"}
      onClick={() => handleFilterClick(filter)}
      type="button"
    >
      {filter.label}
    </button>
  );

  const renderFilterGroup = (group: QuickFilterGroup, groupIndex: number) => (
    <div
      key={groupIndex}
      className={styles.group || "agrc-quick-filter__group"}
    >
      <div className={styles.groupLabel || "agrc-quick-filter__group-label"}>
        {group.label}
      </div>
      {group.filters.map((filter, filterIndex) =>
        renderFilterItem(filter, `${groupIndex}-${filterIndex}` as any),
      )}
    </div>
  );

  return (
    <div className={className || styles.container || "agrc-quick-filter"}>
      <button
        ref={buttonRef}
        className={
          buttonClassName || styles.button || "agrc-quick-filter__button"
        }
        onClick={toggleDropdown}
        type="button"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {label || selectedFilter?.label || placeholder}
        <span className="agrc-quick-filter__arrow" aria-hidden="true">
          {isOpen ? "▲" : "▼"}
        </span>
      </button>

      {isOpen && (
        <div
          ref={dropdownRef}
          className={
            dropdownClassName ||
            styles.dropdown ||
            `agrc-quick-filter__dropdown agrc-quick-filter__dropdown--${position} agrc-quick-filter__dropdown--${align}`
          }
        >
          {showClearOption && (
            <button
              className={styles.clearOption || "agrc-quick-filter__clear"}
              onClick={handleClearClick}
              type="button"
            >
              {clearOptionLabel}
            </button>
          )}

          {filters.map((item, index) =>
            isQuickFilterGroup(item)
              ? renderFilterGroup(item, index)
              : renderFilterItem(item, index),
          )}
        </div>
      )}
    </div>
  );
};
