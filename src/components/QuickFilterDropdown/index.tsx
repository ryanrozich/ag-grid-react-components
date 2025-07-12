import React, { forwardRef, useState, useEffect, useMemo } from "react";
import { QuickFilterDropdownProvider } from "./context";
import * as Components from "./components";
import type { QuickFilterDropdownProps, DropdownState } from "./types";
import { getActiveFilterOption } from "./utils/filterModelBuilder";

export interface QuickFilterDropdownCompound {
  (props: QuickFilterDropdownProps): React.ReactElement;
  Root: typeof Components.Root;
  Trigger: typeof Components.Trigger;
  Dropdown: typeof Components.Dropdown;
  SearchInput: typeof Components.SearchInput;
  OptionsList: typeof Components.OptionsList;
  Option: typeof Components.Option;
  OptionLabel: typeof Components.OptionLabel;
  OptionDescription: typeof Components.OptionDescription;
  OptionCheckmark: typeof Components.OptionCheckmark;
  EmptyState: typeof Components.EmptyState;
}

const QuickFilterDropdownComponent = forwardRef<
  HTMLDivElement,
  QuickFilterDropdownProps
>(
  (
    {
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
      children,
    },
    ref,
  ) => {
    const [state, setState] = useState<DropdownState>({
      isOpen: false,
      selectedOption: null,
      highlightedIndex: -1,
      searchQuery: "",
    });

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
        console.warn(
          "[QuickFilterDropdown] Error getting active filter:",
          error,
        );
      }
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

    if (!children) {
      // Default structure for backward compatibility
      return (
        <QuickFilterDropdownProvider
          api={api}
          columnId={columnId}
          options={options}
          state={state}
          setState={setState}
          filteredOptions={filteredOptions}
          placeholder={placeholder}
          onFilterChange={onFilterChange}
          position={position}
          showDescriptions={showDescriptions}
          triggerContent={triggerContent}
          ariaLabel={ariaLabel}
          usePortal={usePortal}
        >
          <Components.Root ref={ref} className={className}>
            <Components.Trigger />
            <Components.Dropdown>
              {options.length > 10 && <Components.SearchInput />}
              <Components.OptionsList>
                {filteredOptions.length === 0 ? (
                  <Components.EmptyState />
                ) : (
                  filteredOptions.map((option, index) => (
                    <Components.Option
                      key={option.id || index}
                      option={option}
                      index={index}
                    >
                      <Components.OptionLabel />
                      {showDescriptions && option.description && (
                        <Components.OptionDescription />
                      )}
                      <Components.OptionCheckmark />
                    </Components.Option>
                  ))
                )}
              </Components.OptionsList>
            </Components.Dropdown>
          </Components.Root>
        </QuickFilterDropdownProvider>
      );
    }

    return (
      <QuickFilterDropdownProvider
        api={api}
        columnId={columnId}
        options={options}
        state={state}
        setState={setState}
        filteredOptions={filteredOptions}
        placeholder={placeholder}
        onFilterChange={onFilterChange}
        position={position}
        showDescriptions={showDescriptions}
        triggerContent={triggerContent}
        ariaLabel={ariaLabel}
        usePortal={usePortal}
      >
        <div ref={ref} className={className}>
          {children}
        </div>
      </QuickFilterDropdownProvider>
    );
  },
);

QuickFilterDropdownComponent.displayName = "QuickFilterDropdown";

// Create the compound component
const QuickFilterDropdown =
  QuickFilterDropdownComponent as unknown as QuickFilterDropdownCompound;

// Attach all sub-components
Object.assign(QuickFilterDropdown, {
  Root: Components.Root,
  Trigger: Components.Trigger,
  Dropdown: Components.Dropdown,
  SearchInput: Components.SearchInput,
  OptionsList: Components.OptionsList,
  Option: Components.Option,
  OptionLabel: Components.OptionLabel,
  OptionDescription: Components.OptionDescription,
  OptionCheckmark: Components.OptionCheckmark,
  EmptyState: Components.EmptyState,
});

export default QuickFilterDropdown;
export { QuickFilterDropdown };
export { DATE_FILTER_PRESETS } from "./utils/filterModelBuilder";
export type { QuickFilterOption, QuickFilterDropdownProps } from "./types";
