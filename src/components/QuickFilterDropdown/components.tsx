import React, { forwardRef } from "react";
import ReactDOM from "react-dom";
import { useQuickFilterDropdownContext } from "./context";
import type { QuickFilterOption } from "./types";

// Root container component
export const Root = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, ...props }, ref) => {
  const { containerRef } = useQuickFilterDropdownContext();

  return (
    <div
      ref={(node) => {
        // Handle both refs
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
        (containerRef as any).current = node;
      }}
      data-testid="quick-filter-dropdown"
      {...props}
    >
      {children}
    </div>
  );
});
Root.displayName = "QuickFilterDropdown.Root";

// Trigger button component
export const Trigger = forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ children, onClick, ...props }, ref) => {
  const {
    triggerRef,
    state,
    setState,
    placeholder,
    triggerContent,
    ariaLabel,
    handleKeyDown,
    shouldUsePortal,
    calculateDropdownPosition,
    setDropdownPosition,
  } = useQuickFilterDropdownContext();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!state.isOpen && shouldUsePortal) {
      const position = calculateDropdownPosition();
      setDropdownPosition(position);
    }
    setState((prev) => ({
      ...prev,
      isOpen: !prev.isOpen,
      highlightedIndex: -1,
    }));
    onClick?.(e);
  };

  return (
    <button
      ref={(node) => {
        // Handle both refs
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
        (triggerRef as any).current = node;
      }}
      type="button"
      data-component="quick-filter-trigger"
      data-active={state.selectedOption ? "true" : "false"}
      data-open={state.isOpen ? "true" : "false"}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      aria-label={ariaLabel}
      aria-expanded={state.isOpen}
      aria-haspopup="listbox"
      aria-controls="quick-filter-dropdown"
      {...props}
    >
      {children ||
        (triggerContent ? (
          triggerContent(state.selectedOption)
        ) : (
          <>
            <span>{state.selectedOption?.label || placeholder}</span>
            <ChevronDownIcon data-open={state.isOpen ? "true" : "false"} />
          </>
        ))}
    </button>
  );
});
Trigger.displayName = "QuickFilterDropdown.Trigger";

// Dropdown container component
export const Dropdown = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, ...props }, ref) => {
  const {
    dropdownRef,
    state,
    shouldUsePortal,
    dropdownPosition,
    position,
    ariaLabel,
  } = useQuickFilterDropdownContext();

  if (!state.isOpen) return null;

  const dropdownContent = (
    <div
      ref={(node) => {
        // Handle both refs
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
        (dropdownRef as any).current = node;
      }}
      id="quick-filter-dropdown"
      data-component="quick-filter-dropdown"
      data-position={position}
      data-open={state.isOpen ? "true" : "false"}
      role="listbox"
      aria-label={ariaLabel}
      {...props}
      style={
        shouldUsePortal && dropdownPosition
          ? {
              position: "fixed",
              top: dropdownPosition.top,
              left: dropdownPosition.left,
              zIndex: 99999,
              ...props.style,
            }
          : props.style
      }
    >
      {children}
    </div>
  );

  if (shouldUsePortal && dropdownPosition) {
    return ReactDOM.createPortal(dropdownContent, document.body);
  }

  return dropdownContent;
});
Dropdown.displayName = "QuickFilterDropdown.Dropdown";

// Search input component
export const SearchInput = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ onChange, onKeyDown, ...props }, ref) => {
  const { searchInputRef, state, setState, handleKeyDown } =
    useQuickFilterDropdownContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((prev) => ({
      ...prev,
      searchQuery: e.target.value,
      highlightedIndex: 0,
    }));
    onChange?.(e);
  };

  const handleLocalKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    handleKeyDown(e);
    onKeyDown?.(e);
  };

  return (
    <div data-component="quick-filter-search-container">
      <input
        ref={(node) => {
          // Handle both refs
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
          (searchInputRef as any).current = node;
        }}
        type="text"
        placeholder="Search filters..."
        value={state.searchQuery}
        onChange={handleChange}
        onKeyDown={handleLocalKeyDown}
        aria-label="Search filters"
        data-testid="quick-filter-search"
        data-component="quick-filter-search-input"
        {...props}
      />
    </div>
  );
});
SearchInput.displayName = "QuickFilterDropdown.SearchInput";

// Options list container
export const OptionsList = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, ...props }, ref) => {
  return (
    <div ref={ref} data-component="quick-filter-options-list" {...props}>
      {children}
    </div>
  );
});
OptionsList.displayName = "QuickFilterDropdown.OptionsList";

// Individual option component
interface OptionProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  option: QuickFilterOption;
  index: number;
}

export const Option = forwardRef<HTMLButtonElement, OptionProps>(
  ({ option, index, children, onClick, onMouseEnter, ...props }, ref) => {
    const { optionRefs, state, setState, handleSelectOption } =
      useQuickFilterDropdownContext();

    const isSelected = option.id === state.selectedOption?.id;
    const isHighlighted = index === state.highlightedIndex;

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      handleSelectOption(option);
      onClick?.(e);
    };

    const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
      setState((prev) => ({
        ...prev,
        highlightedIndex: index,
      }));
      onMouseEnter?.(e);
    };

    return (
      <button
        ref={(el) => {
          optionRefs.current[index] = el;
          if (typeof ref === "function") ref(el);
          else if (ref) ref.current = el;
        }}
        type="button"
        data-component="quick-filter-option"
        data-selected={isSelected ? "true" : "false"}
        data-highlighted={isHighlighted ? "true" : "false"}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        role="option"
        aria-selected={isSelected}
        data-testid={`quick-filter-option-${option.id || index}`}
        {...props}
      >
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child as React.ReactElement<any>, {
              option,
            });
          }
          return child;
        })}
      </button>
    );
  },
);
Option.displayName = "QuickFilterDropdown.Option";

// Option label component
interface OptionChildProps extends React.HTMLAttributes<HTMLSpanElement> {
  option?: QuickFilterOption;
}

export const OptionLabel = forwardRef<HTMLSpanElement, OptionChildProps>(
  ({ option, ...props }, ref) => {
    return (
      <span ref={ref} data-component="quick-filter-option-label" {...props}>
        {option?.label}
      </span>
    );
  },
);
OptionLabel.displayName = "QuickFilterDropdown.OptionLabel";

// Option description component
export const OptionDescription = forwardRef<HTMLSpanElement, OptionChildProps>(
  ({ option, ...props }, ref) => {
    if (!option?.description) return null;

    return (
      <span
        ref={ref}
        data-component="quick-filter-option-description"
        {...props}
      >
        {option.description}
      </span>
    );
  },
);
OptionDescription.displayName = "QuickFilterDropdown.OptionDescription";

// Option checkmark component
export const OptionCheckmark = forwardRef<HTMLSpanElement, OptionChildProps>(
  ({ option, ...props }, ref) => {
    const { state } = useQuickFilterDropdownContext();
    const isSelected = option?.id === state.selectedOption?.id;

    if (!isSelected) return null;

    return (
      <span ref={ref} data-component="quick-filter-option-checkmark" {...props}>
        <CheckIcon />
      </span>
    );
  },
);
OptionCheckmark.displayName = "QuickFilterDropdown.OptionCheckmark";

// Empty state component
export const EmptyState = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, ...props }, ref) => {
  return (
    <div ref={ref} data-component="quick-filter-empty-state" {...props}>
      {children || "No matching filters"}
    </div>
  );
});
EmptyState.displayName = "QuickFilterDropdown.EmptyState";

// Chevron down icon component
const ChevronDownIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    width="20"
    height="20"
    {...props}
  >
    <path
      fillRule="evenodd"
      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
      clipRule="evenodd"
    />
  </svg>
);

// Check icon component
const CheckIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    width="16"
    height="16"
    {...props}
  >
    <path
      fillRule="evenodd"
      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
      clipRule="evenodd"
    />
  </svg>
);
