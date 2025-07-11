import React, { useState, useRef, useEffect, useMemo } from "react";

export interface CategorySelectorProps {
  /** Current selected category value */
  value: string;
  /** Callback when category changes */
  onChange: (category: string) => void;
  /** List of existing categories */
  existingCategories: string[];
  /** Placeholder text for the input */
  placeholder?: string;
  /** Container className */
  className?: string;
  /** Input element id */
  id?: string;
  /** Input field className */
  inputClassName?: string;
  /** Dropdown container className */
  dropdownClassName?: string;
  /** Option item className */
  optionClassName?: string;
  /** Create button className */
  createButtonClassName?: string;
  /** Cancel button className */
  cancelButtonClassName?: string;
  /** Input wrapper className */
  inputWrapperClassName?: string;
  /** Dropdown icon className */
  dropdownIconClassName?: string;
  /** Create option className */
  createOptionClassName?: string;
  /** Create icon className */
  createIconClassName?: string;
  /** No results className */
  noResultsClassName?: string;
  /** Create form className */
  createFormClassName?: string;
  /** Create input className */
  createInputClassName?: string;
  /** Error message className */
  errorMessageClassName?: string;
  /** Create actions className */
  createActionsClassName?: string;
  /** Highlighted option className */
  highlightedClassName?: string;
}

export const CategorySelector: React.FC<CategorySelectorProps> = ({
  value,
  onChange,
  existingCategories,
  placeholder = "Select or create category",
  className = "",
  id,
  inputClassName = "",
  dropdownClassName = "",
  optionClassName = "",
  createButtonClassName = "",
  cancelButtonClassName = "",
  inputWrapperClassName = "",
  dropdownIconClassName = "",
  createOptionClassName = "",
  createIconClassName = "",
  noResultsClassName = "",
  createFormClassName = "",
  createInputClassName = "",
  errorMessageClassName = "",
  createActionsClassName = "",
  highlightedClassName = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [validationError, setValidationError] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const createInputRef = useRef<HTMLInputElement>(null);

  // Filter categories based on search term
  const filteredCategories = useMemo(() => {
    if (!searchTerm) return existingCategories;
    return existingCategories.filter((cat) =>
      cat.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [existingCategories, searchTerm]);

  // Calculate total options for keyboard navigation
  const totalOptions = filteredCategories.length + 1; // +1 for "Create new category"

  // Handle clicks outside the component
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setIsCreating(false);
        setSearchTerm("");
        setHighlightedIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Focus create input when entering create mode
  useEffect(() => {
    if (isCreating && createInputRef.current) {
      createInputRef.current.focus();
    }
  }, [isCreating]);

  // Validate new category name
  useEffect(() => {
    if (newCategoryName.trim()) {
      const isDuplicate = existingCategories.some(
        (cat) => cat.toLowerCase() === newCategoryName.trim().toLowerCase(),
      );
      setValidationError(isDuplicate ? "Category already exists" : "");
    } else {
      setValidationError("");
    }
  }, [newCategoryName, existingCategories]);

  const handleInputFocus = () => {
    setIsOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setIsOpen(true);
    setHighlightedIndex(-1);
  };

  const handleCategorySelect = (category: string) => {
    onChange(category);
    setIsOpen(false);
    setSearchTerm("");
    setHighlightedIndex(-1);
  };

  const handleCreateNew = () => {
    setIsCreating(true);
    setNewCategoryName("");
    setValidationError("");
  };

  const handleCreateCancel = () => {
    setIsCreating(false);
    setNewCategoryName("");
    setValidationError("");
  };

  const handleCreateSubmit = () => {
    const trimmedName = newCategoryName.trim();
    if (trimmedName && !validationError) {
      onChange(trimmedName);
      setIsOpen(false);
      setIsCreating(false);
      setSearchTerm("");
      setNewCategoryName("");
      setHighlightedIndex(-1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === "ArrowDown" || e.key === "Enter") {
        setIsOpen(true);
        e.preventDefault();
      }
      return;
    }

    switch (e.key) {
      case "Escape":
        setIsOpen(false);
        setIsCreating(false);
        setSearchTerm("");
        setHighlightedIndex(-1);
        e.preventDefault();
        break;

      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((prev) => (prev + 1) % totalOptions);
        break;

      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((prev) => (prev - 1 + totalOptions) % totalOptions);
        break;

      case "Enter":
        e.preventDefault();
        if (highlightedIndex === 0) {
          handleCreateNew();
        } else if (
          highlightedIndex > 0 &&
          highlightedIndex <= filteredCategories.length
        ) {
          handleCategorySelect(filteredCategories[highlightedIndex - 1]);
        }
        break;
    }
  };

  const handleCreateKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleCreateSubmit();
    } else if (e.key === "Escape") {
      e.preventDefault();
      handleCreateCancel();
    }
  };

  return (
    <div className={className} ref={containerRef}>
      <div className={inputWrapperClassName}>
        <input
          ref={inputRef}
          id={id}
          type="text"
          className={inputClassName}
          value={searchTerm || value}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={isOpen}
          aria-controls="category-dropdown"
        />
        <span className={dropdownIconClassName} data-testid="dropdown-icon">
          ▼
        </span>
      </div>

      {isOpen && (
        <div
          id="category-dropdown"
          className={dropdownClassName}
          data-testid="category-dropdown"
          role="listbox"
        >
          {!isCreating ? (
            <>
              <div
                className={`${optionClassName} ${createOptionClassName} ${
                  highlightedIndex === 0 ? highlightedClassName : ""
                }`}
                onClick={handleCreateNew}
                onMouseEnter={() => setHighlightedIndex(0)}
                role="option"
                aria-selected={highlightedIndex === 0}
              >
                <span className={createIconClassName}>+</span>
                Create new category
              </div>

              {filteredCategories.length > 0 ? (
                filteredCategories.map((category, index) => (
                  <div
                    key={category}
                    className={`${optionClassName} ${
                      highlightedIndex === index + 1 ? highlightedClassName : ""
                    }`}
                    onClick={() => handleCategorySelect(category)}
                    onMouseEnter={() => setHighlightedIndex(index + 1)}
                    role="option"
                    aria-selected={highlightedIndex === index + 1}
                  >
                    {category}
                  </div>
                ))
              ) : (
                <div className={noResultsClassName}>No matching categories</div>
              )}
            </>
          ) : (
            <div className={createFormClassName}>
              <input
                ref={createInputRef}
                type="text"
                className={createInputClassName}
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                onKeyDown={handleCreateKeyDown}
                placeholder="Enter category name..."
              />
              {validationError && (
                <div className={errorMessageClassName}>{validationError}</div>
              )}
              <div className={createActionsClassName}>
                <button
                  className={createButtonClassName}
                  onClick={handleCreateSubmit}
                  disabled={!newCategoryName.trim() || !!validationError}
                >
                  Create
                </button>
                <button
                  className={cancelButtonClassName}
                  onClick={handleCreateCancel}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
