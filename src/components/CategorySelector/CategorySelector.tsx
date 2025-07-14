import React, { useState, Fragment } from "react";
import { Combobox, Transition } from "@headlessui/react";

// Fallback icon component to avoid @heroicons/react dependency
const ChevronDownIcon: React.FC<{
  className?: string;
  "aria-hidden"?: boolean;
}> = ({ className = "", "aria-hidden": ariaHidden }) => (
  <svg
    className={className}
    aria-hidden={ariaHidden}
    fill="none"
    viewBox="0 0 20 20"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 7l5 5 5-5"
    />
  </svg>
);

export interface CategorySelectorProps {
  /** Current selected category value */
  value: string;
  /** Callback when category changes */
  onChange: (category: string) => void;
  /** List of existing categories */
  existingCategories: string[];
  /** Placeholder text */
  placeholder?: string;
  /** Container className */
  className?: string;
  /** Input className */
  inputClassName?: string;
  /** Button className */
  buttonClassName?: string;
  /** Options className */
  optionsClassName?: string;
  /** Option className */
  optionClassName?: string;
  /** Create option className */
  createOptionClassName?: string;
  /** Empty state className */
  emptyClassName?: string;
  /** Active option className addition */
  activeOptionClassName?: string;
  /** Selected option className addition */
  selectedOptionClassName?: string;
}

export const CategorySelector: React.FC<CategorySelectorProps> = ({
  value,
  onChange,
  existingCategories,
  placeholder = "Select or create category",
  className = "",
  inputClassName = "",
  buttonClassName = "",
  optionsClassName = "",
  optionClassName = "",
  createOptionClassName = "",
  emptyClassName = "",
  activeOptionClassName = "",
  selectedOptionClassName = "",
}) => {
  const [query, setQuery] = useState("");

  // Filter existing categories based on search query
  const filteredCategories =
    query === ""
      ? existingCategories
      : existingCategories.filter((category) =>
          category.toLowerCase().includes(query.toLowerCase()),
        );

  // Check if query matches any existing category exactly
  const exactMatch = existingCategories.some(
    (cat) => cat.toLowerCase() === query.toLowerCase(),
  );

  // Show create option if query doesn't match exactly and isn't empty
  const showCreateOption = query !== "" && !exactMatch;

  return (
    <Combobox value={value} onChange={onChange}>
      <div className={className}>
        <div className="relative">
          <Combobox.Input
            className={inputClassName}
            placeholder={placeholder}
            onChange={(event) => setQuery(event.target.value)}
            displayValue={() => value}
          />
          <Combobox.Button className={buttonClassName}>
            <ChevronDownIcon className="h-5 w-5" aria-hidden={true} />
          </Combobox.Button>
        </div>

        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => setQuery("")}
        >
          <Combobox.Options className={optionsClassName}>
            {filteredCategories.map((category) => (
              <Combobox.Option
                key={category}
                value={category}
                className={({ active, selected }) =>
                  `${optionClassName} ${
                    active ? activeOptionClassName : ""
                  } ${selected ? selectedOptionClassName : ""}`
                }
              >
                {({ selected }) => (
                  <>
                    <span className={selected ? "font-medium" : "font-normal"}>
                      {category}
                    </span>
                  </>
                )}
              </Combobox.Option>
            ))}

            {showCreateOption && (
              <Combobox.Option
                value={query}
                className={({ active }) =>
                  `${createOptionClassName} ${
                    active ? activeOptionClassName : ""
                  }`
                }
              >
                <span className="flex items-center">
                  <span className="mr-2">+</span>
                  Create "{query}"
                </span>
              </Combobox.Option>
            )}

            {filteredCategories.length === 0 && !showCreateOption && (
              <div className={emptyClassName}>No categories found</div>
            )}
          </Combobox.Options>
        </Transition>
      </div>
    </Combobox>
  );
};
