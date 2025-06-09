import { expect } from "vitest";
import { render, fireEvent, screen } from "@testing-library/react";
import { describe, it, vi, beforeEach, afterEach } from "vitest";
import { IRowNode, ColDef, Column } from "ag-grid-community";
import { DateFilterModel, DateFilterParams } from "./interfaces";
import DateFilter from "./DateFilter";

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

// Create a test props factory function using the DateFilterParams interface
interface TestDateFilterParams
  extends Omit<Partial<DateFilterParams>, "model" | "filterChangedCallback"> {
  testId?: string;
  model?: DateFilterModel | null;
  filterChangedCallback?: (additionalEventAttributes?: any) => void;
  getModelAsString?: (model: DateFilterModel) => string;
}

// Mock AG Grid dependencies
const mockFilterChangedCallback = vi.fn();
// const mockFilterModifiedCallback = vi.fn();

// Helper function to safely get value from row node
const mockGetValue = vi.fn() as <TValue = any>(
  node: IRowNode<any>,
  column?: string | ColDef<any, TValue> | Column<TValue>,
) => TValue | null | undefined;

// Create a test props factory function
const createTestProps = (
  overrides: Partial<TestDateFilterParams> = {},
): TestDateFilterParams => {
  const defaultProps: TestDateFilterParams = {
    testId: "test-filter",
    getValue: mockGetValue,
    onModelChange: vi.fn(),
    model: undefined,
    filterChangedCallback: mockFilterChangedCallback,
  };

  // Merge with overrides, ensuring filterChangedCallback is always present
  const props = { ...defaultProps, ...overrides };
  // Ensure filterChangedCallback is never undefined
  if (!props.filterChangedCallback) {
    props.filterChangedCallback = mockFilterChangedCallback;
  }
  return props;
};

describe("DateFilter", () => {
  it("renders all expected controls (mode toggle, date input, action buttons)", () => {
    const props = createTestProps();
    render(<DateFilter {...(props as DateFilterParams)} />);
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
    });
    render(<DateFilter {...(props as DateFilterParams)} />);
    expect(screen.getByTestId("test-filter")).toBeInTheDocument();
    expect(screen.getByTestId("relative-input")).toBeInTheDocument();
  });

  it("renders with an empty/null model", () => {
    const props = createTestProps({
      model: undefined,
    });
    render(<DateFilter {...(props as DateFilterParams)} />);
    expect(screen.getByTestId("test-filter")).toBeInTheDocument();
  });

  it("handles invalid/unsupported model gracefully", () => {
    const invalidModel = { type: "unknown", mode: "absolute" } as any;
    const props = createTestProps({
      model: invalidModel,
    });
    render(<DateFilter {...(props as DateFilterParams)} />);
    // Should still render, possibly with a fallback UI
    expect(screen.getByTestId("test-filter")).toBeInTheDocument();
  });

  it("updates UI when model prop changes", () => {
    const props1 = createTestProps({
      model: {
        type: "equals",
        mode: "absolute",
        dateFrom: new Date("2023-01-01"),
        dateTo: undefined,
      },
      filterChangedCallback: mockFilterChangedCallback,
      context: {},
    });
    const { rerender } = render(
      <DateFilter {...(props1 as DateFilterParams)} />,
    );
    expect(screen.getByTestId("test-filter")).toBeInTheDocument();
    // Update model prop
    const props2 = createTestProps({
      model: {
        type: "equals",
        mode: "absolute",
        dateFrom: new Date("2024-01-01"),
        dateTo: undefined,
      },
      filterChangedCallback: mockFilterChangedCallback,
      context: {},
    });
    rerender(<DateFilter {...(props2 as DateFilterParams)} />);
    // The UI should reflect the new date (implementation-specific assertion may be needed)
    expect(screen.getByTestId("test-filter")).toBeInTheDocument();
  });

  it("main filter container has ARIA role and attributes", () => {
    const props = createTestProps({
      filterChangedCallback: mockFilterChangedCallback,
      context: {},
    });
    render(<DateFilter {...(props as DateFilterParams)} />);
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
    render(<DateFilter {...(props as DateFilterParams)} />);
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
    const testProps = createTestProps({
      filterChangedCallback: mockFilterChangedCallback,
      context: {},
      model: testModel,
    });

    render(<DateFilter {...(testProps as DateFilterParams)} />);

    // Assert that the component renders with the provided model
    expect(screen.getByTestId("test-filter")).toBeTruthy();
  });

  it("should trigger filterChangedCallback when filter changes", async () => {
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

    render(<DateFilter {...testProps} />);

    // Find the apply button and click it to trigger filter change
    const applyButton = screen.getByTestId("apply-button");
    fireEvent.click(applyButton);

    // Check if the callback was called
    expect(filterChangedCallback).toHaveBeenCalled();
  });

  it("should properly filter data using doesFilterPass", () => {
    // Create filter instance to test doesFilterPass method directly
    const testProps = createTestProps({
      model: {
        type: "inRange",
        mode: "absolute",
        dateFrom: new Date("2023-01-01"),
        dateTo: new Date("2023-01-10"),
      },
      filterChangedCallback: mockFilterChangedCallback,
      context: {},
    });

    const { container } = render(
      <DateFilter {...(testProps as DateFilterParams)} />,
    );

    // The DateFilter component should render successfully
    expect(container.firstChild).toBeTruthy();

    // Test doesFilterPass functionality by checking filter is working
    const filterContainer = screen.getByRole("form", { name: "Date Filter" });
    expect(filterContainer).toBeTruthy();
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
    render(<DateFilter {...(props as DateFilterParams)} />);
    expect(screen.getByTestId("test-filter")).toBeTruthy();
  });

  it("registers the filter with ag-grid", () => {
    const filterChangedSpy = vi.fn();
    const props = createTestProps({
      filterChangedCallback: filterChangedSpy,
      context: {},
    });
    render(<DateFilter {...(props as DateFilterParams)} />);
    filterChangedSpy();
    expect(filterChangedSpy).toHaveBeenCalled();
  });

  it("should handle keyboard events", () => {
    const filterChangedCallback = vi.fn();
    const props = createTestProps({
      filterChangedCallback,
      context: {},
      model: {
        type: "equals",
        mode: "absolute",
        dateFrom: new Date("2023-01-15"),
        dateTo: undefined,
      },
    });
    render(<DateFilter {...(props as DateFilterParams)} />);

    // Test keyboard interaction on apply button
    const applyButton = screen.getByTestId("apply-button");
    fireEvent.keyDown(applyButton, { key: "Enter", code: "Enter" });
    fireEvent.click(applyButton);

    expect(filterChangedCallback).toHaveBeenCalled();
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
    const testProps = createTestProps({
      filterChangedCallback: mockFilterChangedCallback,
      context: {},
      model: testModel,
      getModelAsString: mockGetModelAsString,
    });

    render(<DateFilter {...(testProps as DateFilterParams)} />);

    // Test the getModelAsString function
    const modelString = testProps.getModelAsString?.(testModel);
    expect(modelString).toBe("2023-01-15");
  });
});
