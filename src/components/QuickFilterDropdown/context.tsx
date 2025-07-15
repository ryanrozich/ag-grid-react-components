import React, {
  createContext,
  useContext,
  useCallback,
  useRef,
  useEffect,
  useMemo,
} from "react";
import type { GridApi } from "ag-grid-community";
import type {
  QuickFilterDropdownProps,
  QuickFilterOption,
  DropdownState,
} from "./types";
import { NavigationKey } from "./types";
import { applyQuickFilter } from "./utils/filterModelBuilder";

interface QuickFilterDropdownContextValue {
  api: GridApi;
  columnId: string;
  options: QuickFilterOption[];
  state: DropdownState;
  setState: React.Dispatch<React.SetStateAction<DropdownState>>;
  filteredOptions: QuickFilterOption[];
  placeholder: string;
  onFilterChange?: QuickFilterDropdownProps["onFilterChange"];
  position: QuickFilterDropdownProps["position"];
  showDescriptions: boolean;
  triggerContent?: QuickFilterDropdownProps["triggerContent"];
  ariaLabel: string;
  usePortal: QuickFilterDropdownProps["usePortal"];

  // Refs
  containerRef: React.RefObject<HTMLDivElement | null>;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  dropdownRef: React.RefObject<HTMLDivElement | null>;
  searchInputRef: React.RefObject<HTMLInputElement | null>;
  optionRefs: React.MutableRefObject<(HTMLButtonElement | null)[]>;

  // Computed values
  shouldUsePortal: boolean;
  dropdownPosition: { top: number; left: number } | null;
  setDropdownPosition: React.Dispatch<
    React.SetStateAction<{ top: number; left: number } | null>
  >;

  // Methods
  handleSelectOption: (option: QuickFilterOption | null) => Promise<void>;
  handleKeyDown: (event: React.KeyboardEvent) => void;
  calculateDropdownPosition: () => { top: number; left: number } | null;
}

const QuickFilterDropdownContext = createContext<
  QuickFilterDropdownContextValue | undefined
>(undefined);

export interface QuickFilterDropdownProviderProps
  extends Omit<QuickFilterDropdownProps, "children" | "className"> {
  state: DropdownState;
  setState: React.Dispatch<React.SetStateAction<DropdownState>>;
  filteredOptions: QuickFilterOption[];
  children: React.ReactNode;
}

export const QuickFilterDropdownProvider: React.FC<
  QuickFilterDropdownProviderProps
> = ({
  api,
  columnId,
  options,
  state,
  setState,
  filteredOptions,
  placeholder,
  onFilterChange,
  position = "bottom-left",
  showDescriptions,
  triggerContent,
  ariaLabel,
  usePortal = "never",
  children,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const [dropdownPosition, setDropdownPosition] = React.useState<{
    top: number;
    left: number;
  } | null>(null);

  // Detect if we should use portal
  const shouldUsePortal = useMemo(() => {
    if (usePortal === "always") return true;
    if (usePortal === "never") return false;
    // Auto-detect: simplified for now
    return false;
  }, [usePortal]);

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
    [api, columnId, onFilterChange, setState],
  );

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
      setState,
    ],
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
  }, [state.isOpen, shouldUsePortal, setState]);

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

  const value: QuickFilterDropdownContextValue = {
    api,
    columnId,
    options,
    state,
    setState,
    filteredOptions,
    placeholder: placeholder!,
    onFilterChange,
    position: position!,
    showDescriptions: showDescriptions!,
    triggerContent,
    ariaLabel: ariaLabel!,
    usePortal: usePortal!,
    containerRef,
    triggerRef,
    dropdownRef,
    searchInputRef,
    optionRefs,
    shouldUsePortal,
    dropdownPosition,
    setDropdownPosition,
    handleSelectOption,
    handleKeyDown,
    calculateDropdownPosition,
  };

  return (
    <QuickFilterDropdownContext.Provider value={value}>
      {children}
    </QuickFilterDropdownContext.Provider>
  );
};

export const useQuickFilterDropdownContext = () => {
  const context = useContext(QuickFilterDropdownContext);
  if (!context) {
    throw new Error(
      "useQuickFilterDropdownContext must be used within QuickFilterDropdownProvider",
    );
  }
  return context;
};
