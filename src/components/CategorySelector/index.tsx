import React, { useState, useRef, useEffect, useMemo } from "react";
import styles from "./CategorySelector.module.css";

export interface CategorySelectorProps {
  /** Current selected category value */
  value: string;
  /** Callback when category changes */
  onChange: (category: string) => void;
  /** List of existing categories */
  existingCategories: string[];
  /** Placeholder text for the input */
  placeholder?: string;
  /** Additional CSS class name */
  className?: string;
  /** Input element id */
  id?: string;
}

export const CategorySelector: React.FC<CategorySelectorProps> = ({
  value,
  onChange,
  existingCategories,
  placeholder = "Select or create category",
  className = "",
  id,
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
    <div className={`${styles.container} ${className}`} ref={containerRef}>
      <div className={styles.inputWrapper}>
        <input
          ref={inputRef}
          id={id}
          type="text"
          className={styles.input}
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
        <span className={styles.dropdownIcon} data-testid="dropdown-icon">
          ▼
        </span>
      </div>

      {isOpen && (
        <div
          id="category-dropdown"
          className={styles.dropdown}
          data-testid="category-dropdown"
          role="listbox"
        >
          {!isCreating ? (
            <>
              <div
                className={`${styles.option} ${styles.createOption} ${
                  highlightedIndex === 0 ? styles.highlighted : ""
                }`}
                onClick={handleCreateNew}
                onMouseEnter={() => setHighlightedIndex(0)}
                role="option"
                aria-selected={highlightedIndex === 0}
              >
                <span className={styles.createIcon}>+</span>
                Create new category
              </div>

              {filteredCategories.length > 0 ? (
                filteredCategories.map((category, index) => (
                  <div
                    key={category}
                    className={`${styles.option} ${
                      highlightedIndex === index + 1 ? styles.highlighted : ""
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
                <div className={styles.noResults}>No matching categories</div>
              )}
            </>
          ) : (
            <div className={styles.createForm}>
              <input
                ref={createInputRef}
                type="text"
                className={`${styles.createInput} ${
                  validationError ? styles.error : ""
                }`}
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                onKeyDown={handleCreateKeyDown}
                placeholder="Enter category name..."
              />
              {validationError && (
                <div className={styles.errorMessage}>{validationError}</div>
              )}
              <div className={styles.createActions}>
                <button
                  className={styles.createButton}
                  onClick={handleCreateSubmit}
                  disabled={!newCategoryName.trim() || !!validationError}
                >
                  Create
                </button>
                <button
                  className={styles.cancelButton}
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
