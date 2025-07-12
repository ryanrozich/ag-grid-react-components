import React, { useState, useRef, useEffect } from "react";

interface CategorySelectorProps {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  existingCategories: string[];
  placeholder?: string;
  usePortal?: boolean;
}

export const CategorySelector: React.FC<CategorySelectorProps> = ({
  id,
  value,
  onChange,
  existingCategories,
  placeholder = "Select or create category",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setIsOpen(true);
    onChange(e.target.value);
  };

  const handleCategorySelect = (category: string) => {
    setInputValue(category);
    onChange(category);
    setIsOpen(false);
  };

  const filteredCategories = existingCategories.filter((cat) =>
    cat.toLowerCase().includes(inputValue.toLowerCase()),
  );

  const showCreateOption =
    inputValue.trim() &&
    !existingCategories.some(
      (cat) => cat.toLowerCase() === inputValue.toLowerCase(),
    );

  return (
    <div ref={dropdownRef} style={{ position: "relative" }}>
      <input
        ref={inputRef}
        id={id}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={() => setIsOpen(true)}
        placeholder={placeholder}
        style={{
          width: "100%",
          padding: "0.5rem 0.75rem",
          backgroundColor: "rgb(31 41 55)",
          border: "1px solid rgb(55 65 81)",
          borderRadius: "0.375rem",
          color: "white",
          outline: "none",
        }}
      />

      {isOpen && (filteredCategories.length > 0 || showCreateOption) && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            marginTop: "0.25rem",
            backgroundColor: "rgb(31 41 55)",
            border: "1px solid rgb(55 65 81)",
            borderRadius: "0.375rem",
            maxHeight: "200px",
            overflowY: "auto",
            zIndex: 1000,
          }}
        >
          {filteredCategories.map((category) => (
            <div
              key={category}
              onClick={() => handleCategorySelect(category)}
              style={{
                padding: "0.5rem 0.75rem",
                cursor: "pointer",
                color: "rgb(209 213 219)",
                transition: "background-color 0.15s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "rgb(55 65 81)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              {category}
            </div>
          ))}

          {showCreateOption && (
            <div
              onClick={() => handleCategorySelect(inputValue)}
              style={{
                padding: "0.5rem 0.75rem",
                cursor: "pointer",
                color: "rgb(134 239 172)",
                borderTop:
                  filteredCategories.length > 0
                    ? "1px solid rgb(55 65 81)"
                    : "none",
                transition: "background-color 0.15s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "rgb(55 65 81)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              Create "{inputValue}"
            </div>
          )}
        </div>
      )}
    </div>
  );
};
