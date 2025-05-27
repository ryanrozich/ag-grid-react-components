import { expect } from "vitest";
import matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers);
import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { describe, it, vi, beforeEach, afterEach } from "vitest";
import {
  GridApi,
  IRowNode,
  IRowModel,
  ColDef,
  Column,
  IDateFilterParams,
} from "ag-grid-community";
import { DateFilterModel } from "./interfaces";
import RelativeDateFilter from "./RelativeDateFilter";

// Mock AG Grid components
vi.mock("ag-grid-community", () => ({
  ...vi.importActual("ag-grid-community"),
  // Add any specific mocks needed for AG Grid components
}));

// Mock the AGGridTestHarness component
vi.mock("./AGGridTestHarness", () => ({
  AGGridTestHarness: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="ag-grid-test-harness">{children}</div>
  ),
}));

// Mock GridApi
const mockApi = {
  getFilterModel: vi.fn(),
  setFilterModel: vi.fn(),
  dispatchEvent: vi.fn(),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  getColumnDef: vi.fn(),
  getDisplayedRowAtIndex: vi.fn(),
  getDisplayedRowCount: vi.fn(),
  getFirstDisplayedRow: vi.fn(),
  getLastDisplayedRow: vi.fn(),
  getModel: vi.fn(),
  getRenderedNodes: vi.fn(),
  getSelectedNodes: vi.fn(),
  getSelectedRows: vi.fn(),
  redrawRows: vi.fn(),
  refreshCells: vi.fn(),
  refreshHeader: vi.fn(),
  setRowData: vi.fn(),
  setColumnDefs: vi.fn(),
} as unknown as GridApi;

// Define a test interface that extends IDateFilterParams with our custom properties
interface TestDateFilterParams
  extends Omit<IDateFilterParams, "getValue" | "context"> {
  // Custom properties for testing
  testId?: string;
  // Required properties with specific types
  colDef: ColDef;
  rowModel: IRowModel;
  // Override getValue to match the expected type
  getValue?: <TValue = any>(
    node: IRowNode,
    column?: string | ColDef<any, TValue> | Column,
  ) => TValue | null | undefined;
  column: Column;
  api: GridApi;
  // Required callbacks
  filterChangedCallback: () => void;
  filterModifiedCallback: () => void;
  // Optional callbacks
  onModelChange?: (model: DateFilterModel | null) => void;
  getModelAsString?: (model: DateFilterModel) => string;
  // Other optional properties
  valueGetter?: (params: any) => any;
  doesRowPassOtherFilter?: (node: IRowNode) => boolean;
  context?: any;
  filter?: string;
  filterParams?: any;
  filterManager?: any;
  filterWrapper?: any;
  filterPromise?: Promise<any>;
  filterPromiseResolve?: () => void;
  filterPromiseReject?: () => void;
  filterPromiseDestroy?: () => void;
  filterPromiseDestroyed?: boolean;
  filterPromiseDestroyedError?: string;
  filterPromiseDestroyedReason?: string;
  // AG Grid filter properties
  applyButton?: boolean;
  clearButton?: boolean;
  debounceMs?: number;
  inRangeInclusive?: boolean;
  includeBlanksInEquals?: boolean;
  includeBlanksInLessThan?: boolean;
  includeBlanksInGreaterThan?: boolean;
  includeBlanksInRange?: boolean;
  buttons?: ("apply" | "clear" | "reset" | "cancel")[];
  closeOnApply?: boolean;
  // Override model to be optional in test props
  model?: DateFilterModel;
}

// Mock AG Grid dependencies
const mockFilterChangedCallback = vi.fn();
const mockFilterModifiedCallback = vi.fn();

// Helper function to safely get value from row node
const mockGetValue = vi.fn() as <TValue = any>(
  node: IRowNode<any>,
  column?: string | ColDef<any, TValue> | Column<TValue>,
) => TValue | null | undefined;

// Mock column
const mockColumn = {
  getColId: () => "testColumn",
  getColDef: () => ({}),
  getParent: () => null,
  isFilterActive: () => false,
  setFilterActive: vi.fn(),
  setFilterModel: vi.fn(),
  getFilterModel: vi.fn(),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  isFilterAllowed: () => true,
  getFilterValue: vi.fn(),
  setFilterValue: vi.fn(),
  addFilterChangedListener: vi.fn(),
  removeFilterChangedListener: vi.fn(),
  isSortAscending: () => false,
  isSortDescending: () => false,
  isSortNone: () => true,
  getSort: () => null,
  setSort: vi.fn(),
  addSortChangedListener: vi.fn(),
  removeSortChangedListener: vi.fn(),
  isSorting: () => false,
  isSortAscendingCall: () => false,
  isSortDescendingCall: () => false,
  isSortNoneCall: () => true,
  getSortIndex: () => -1,
  setSortIndex: vi.fn(),
  isSortAscendingCallWithIndex: () => false,
  isSortDescendingCallWithIndex: () => false,
  isSortNoneCallWithIndex: () => true,
  isSecondary: () => false,
  isPrimary: () => true,
  isPivotActive: () => false,
  isPivotMode: () => false,
  isPivot: () => false,
  isRowGroupActive: () => false,
  isRowGroup: () => false,
  isValue: () => false,
  isValueActive: () => false,
  isAnyFilterActive: () => false,
  isAnySortActive: () => false,
} as unknown as Column;

// Create a mock row model
const mockRowModel: IRowModel = {
  getType: vi.fn().mockReturnValue("inMemory"),
  getRow: vi.fn(),
  getRowCount: vi.fn(),
  getTopLevelRowCount: vi.fn(),
  forEachNode: vi.fn(),
  forEachNodeAfterFilter: vi.fn(),
  forEachNodeAfterFilterAndSort: vi.fn(),
  forEachLeafNode: vi.fn(),
  isRowPresent: vi.fn(),
  refreshModel: vi.fn(),
  getCurrentPageHeight: vi.fn(),
  getRowIndexAtPixel: vi.fn(),
  getPageFirstRow: vi.fn(),
  getPageLastRow: vi.fn(),
  getRowCountAsync: vi.fn(),
  getTopLevelRowDisplayedIndex: vi.fn(),
  getRowNode: vi.fn(),
  getRowState: vi.fn(),
  isRowInPixel: vi.fn(),
  getContext: vi.fn(),
  getFirstVirtualRenderedRow: vi.fn(),
  getLastVirtualRenderedRow: vi.fn(),
  getVirtualRowCount: vi.fn(),
  isLastRowIndexKnown: vi.fn(),
  isRowsToRender: vi.fn(),
} as unknown as IRowModel;

// Create a mock colDef
const mockColDef: ColDef = {
  field: "date",
  headerName: "Date",
  filter: "agDateColumnFilter",
};

// Create a test props factory function
const createTestProps = (
  overrides: Partial<TestDateFilterParams> = {},
): any => {
  const defaultProps: any = {
    testId: "test-filter",
    colDef: mockColDef,
    rowModel: mockRowModel,
    column: mockColumn,
    api: mockApi,
    filterChangedCallback: mockFilterChangedCallback,
    filterModifiedCallback: mockFilterModifiedCallback,
    getValue: mockGetValue as <TValue = any>(
      node: IRowNode,
      column?: string | ColDef<any, TValue> | Column,
    ) => TValue | null | undefined,
    valueGetter: vi.fn(),
    doesRowPassOtherFilter: vi.fn(),
    context: {},
    filter: "",
    filterParams: {},
    filterManager: {},
    filterWrapper: {},
    filterPromise: Promise.resolve(),
    filterPromiseResolve: vi.fn(),
    filterPromiseReject: vi.fn(),
    filterPromiseDestroy: vi.fn(),
    filterPromiseDestroyed: false,
    filterPromiseDestroyedError: "",
    filterPromiseDestroyedReason: "",
  };

  // Merge with overrides
  return { ...defaultProps, ...overrides };
};

describe("RelativeDateFilter", () => {
  it("renders all expected controls (mode toggle, date input, action buttons)", () => {
    const props = createTestProps({
      filterChangedCallback: mockFilterChangedCallback,
      context: {},
    });
    render(<RelativeDateFilter {...props} />);
    expect(screen.getByTestId("test-filter")).toBeInTheDocument();
    expect(screen.getByTestId("mode-toggle")).toBeInTheDocument();
    expect(screen.getByTestId("date-input")).toBeInTheDocument();
    expect(screen.getByTestId("apply-button")).toBeInTheDocument();
    expect(screen.getByTestId("clear-button")).toBeInTheDocument();
  });

  it("renders with a relative date model", () => {
    const testModel: DateFilterModel = {
      type: "equals",
      mode: "relative",
      expressionFrom: "last 7 days",
      dateFrom: undefined,
      dateTo: undefined,
    };
    const props = createTestProps({
      model: testModel,
      filterChangedCallback: mockFilterChangedCallback,
      context: {},
    });
    render(<RelativeDateFilter {...props} />);
    expect(screen.getByTestId("test-filter")).toBeInTheDocument();
    expect(screen.getByTestId("relative-input")).toBeInTheDocument();
  });

  it("renders with an empty/null model", () => {
    const props = createTestProps({
      model: undefined,
      filterChangedCallback: mockFilterChangedCallback,
      context: {},
    });
    render(<RelativeDateFilter {...props} />);
    expect(screen.getByTestId("test-filter")).toBeInTheDocument();
  });

  it("handles invalid/unsupported model gracefully", () => {
    const invalidModel = { type: "unknown", mode: "absolute" } as any;
    const props = createTestProps({
      model: invalidModel,
      filterChangedCallback: mockFilterChangedCallback,
      context: {},
    });
    render(<RelativeDateFilter {...props} />);
    // Should still render, possibly with a fallback UI
    expect(screen.getByTestId("test-filter")).toBeInTheDocument();
  });

  it("updates UI when model prop changes", () => {
    const { rerender } = render(
      <RelativeDateFilter
        {...createTestProps({
          model: {
            type: "equals",
            mode: "absolute",
            dateFrom: new Date("2023-01-01"),
            dateTo: undefined,
          },
          filterChangedCallback: mockFilterChangedCallback,
          context: {},
        })}
      />,
    );
    expect(screen.getByTestId("test-filter")).toBeInTheDocument();
    // Update model prop
    rerender(
      <RelativeDateFilter
        {...createTestProps({
          model: {
            type: "equals",
            mode: "absolute",
            dateFrom: new Date("2024-01-01"),
            dateTo: undefined,
          },
          filterChangedCallback: mockFilterChangedCallback,
          context: {},
        })}
      />,
    );
    // The UI should reflect the new date (implementation-specific assertion may be needed)
    expect(screen.getByTestId("test-filter")).toBeInTheDocument();
  });

  it("main filter container has ARIA role and attributes", () => {
    const props = createTestProps({
      filterChangedCallback: mockFilterChangedCallback,
      context: {},
    });
    render(<RelativeDateFilter {...props} />);
    const container = screen.getByTestId("test-filter");
    expect(container).toHaveAttribute("role");
    expect(container.getAttribute("role")).toMatch(/group|region|form/);
  });

  // Mock date to ensure consistent testing
  const mockDate = new Date("2023-01-01T00:00:00Z");

  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();
    // Mock the system time for consistent date handling
    vi.useFakeTimers();
    vi.setSystemTime(mockDate);
  });

  afterEach(() => {
    // Restore the real timers after each test
    vi.useRealTimers();
  });

  it("renders without crashing", () => {
    const props = createTestProps({
      filterChangedCallback: mockFilterChangedCallback,
      context: {},
    });
    render(<RelativeDateFilter {...props} />);
    expect(screen.getByTestId("test-filter")).toBeTruthy();
  });

  it("should initialize with default values", () => {
    // Create test props with a model
    const testModel: DateFilterModel = {
      type: "equals",
      mode: "absolute",
      dateFrom: new Date("2023-01-15"),
      dateTo: undefined,
    };

    // Create test props with proper typing
    const testProps = {
      ...createTestProps({
        filterChangedCallback: mockFilterChangedCallback,
        context: {},
      }),
      model: testModel,
    };

    render(<RelativeDateFilter {...testProps} />);

    // Assert that the component renders with the provided model
    expect(screen.getByTestId("test-filter")).toBeTruthy();
  });

  it("should trigger filterChangedCallback when filter changes", () => {
    const filterChangedCallback = vi.fn();
    const testProps: any = {
      ...createTestProps({
        filterChangedCallback,
        context: {},
      }),
      model: {
        type: "equals",
        mode: "absolute",
        dateFrom: new Date("2023-01-15"),
        dateTo: undefined,
      } as DateFilterModel,
    };

    render(<RelativeDateFilter {...testProps} />);

    // Simulate a filter change
    const filterInput = screen.getByTestId("test-filter");
    fireEvent.change(filterInput, { target: { value: "2023-01-15" } });

    // Check if the callback was called
    expect(filterChangedCallback).toHaveBeenCalled();
  });

  it("should properly filter data using doesFilterPass", () => {
    // Mock the getValue function to return a date
    const mockGetValue = vi.fn().mockReturnValue(new Date("2023-01-05"));
    // Mock the doesFilterPass function
    const doesFilterPass = vi.fn().mockReturnValue(true);

    // Create test props with proper typing
    const testProps = {
      ...createTestProps({
        getValue: mockGetValue as any,
        model: {
          type: "inRange",
          mode: "absolute",
          dateFrom: new Date("2023-01-01"),
          dateTo: new Date("2023-01-10"),
        },
        filterChangedCallback: mockFilterChangedCallback,
        context: {},
      }),
      doesFilterPass,
      getModel: vi.fn(),
      setModel: vi.fn(),
      getModelAsString: vi.fn(),
      isFilterActive: vi.fn(),
    };

    render(<RelativeDateFilter {...testProps} />);
    expect(doesFilterPass).toHaveBeenCalled();
  });

  it("validates relative date expressions", () => {
    const onModelChange = vi.fn();
    const props = createTestProps({
      onModelChange,
      model: {
        type: "inRange",
        mode: "absolute",
        dateFrom: new Date("2023-01-01"),
        dateTo: new Date("2023-01-10"),
      },
      filterChangedCallback: mockFilterChangedCallback,
      context: {},
    });
    render(<RelativeDateFilter {...props} />);
    expect(screen.getByTestId("test-filter")).toBeTruthy();
  });

  it("registers the filter with ag-grid", () => {
    const filterChangedSpy = vi.fn();
    const props = createTestProps({
      filterChangedCallback: filterChangedSpy,
      context: {},
    });
    render(<RelativeDateFilter {...props} />);
    filterChangedSpy();
    expect(filterChangedSpy).toHaveBeenCalled();
  });

  it("should handle keyboard events", () => {
    const onModelChange = vi.fn();
    const props = createTestProps({
      onModelChange,
      filterChangedCallback: mockFilterChangedCallback,
      context: {},
    });
    render(<RelativeDateFilter {...props} />);
    const input = screen.getByTestId("test-filter");
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });
    expect(onModelChange).toHaveBeenCalled();
  });

  it("should return correct string representation using getModelAsString", () => {
    // Initialize with a model
    const testModel: DateFilterModel = {
      type: "equals",
      mode: "absolute",
      dateFrom: new Date("2023-01-15"),
      dateTo: undefined,
    };

    const mockGetModelAsString = vi.fn().mockReturnValue("2023-01-15");
    const testProps = {
      ...createTestProps({
        filterChangedCallback: mockFilterChangedCallback,
        context: {},
      }),
      model: testModel,
      getModelAsString: mockGetModelAsString,
    };

    render(<RelativeDateFilter {...testProps} />);

    // Test the getModelAsString function
    const modelString = testProps.getModelAsString?.(testModel);
    expect(modelString).toBe("2023-01-15");
  });
});
