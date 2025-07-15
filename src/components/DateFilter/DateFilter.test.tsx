import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import DateFilter from "./index";
import type { IFilterParams } from "ag-grid-community";

describe("DateFilter", () => {
  const mockOnFilterChanged = vi.fn();
  const mockApi = {
    onFilterChanged: mockOnFilterChanged,
  };

  const defaultParams: IFilterParams = {
    api: mockApi as any,
    column: { getColId: () => "date" } as any,
    colDef: {} as any,
    rowModel: {} as any,
    filterChangedCallback: vi.fn(),
    filterModifiedCallback: vi.fn(),
    valueGetter: vi.fn(),
    doesRowPassOtherFilter: vi.fn(),
    suppressFilterDropdown: false,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Basic Rendering", () => {
    it("renders without crashing", () => {
      render(<DateFilter {...defaultParams} />);
      expect(screen.getByRole("combobox")).toBeInTheDocument();
    });

    it("displays filter type selector", () => {
      render(<DateFilter {...defaultParams} />);
      const typeSelector = screen.getByRole("combobox");
      expect(typeSelector).toHaveValue("equals");
    });

    it("displays mode toggle button", () => {
      render(<DateFilter {...defaultParams} />);
      const modeToggle = screen.getByRole("button", { name: /relative/i });
      expect(modeToggle).toBeInTheDocument();
    });
  });

  describe("Relative Mode", () => {
    it("shows relative input by default", () => {
      render(<DateFilter {...defaultParams} />);
      const input = screen.getByPlaceholderText(/e\.g\./i);
      expect(input).toBeInTheDocument();
    });

    it("validates relative date expressions", async () => {
      render(<DateFilter {...defaultParams} />);
      const input = screen.getByPlaceholderText(/e\.g\./i);

      fireEvent.change(input, { target: { value: "-7d" } });
      await waitFor(() => {
        expect(screen.queryByText(/invalid/i)).not.toBeInTheDocument();
      });
    });

    it("shows error for invalid expressions", async () => {
      render(<DateFilter {...defaultParams} />);
      const input = screen.getByPlaceholderText(/e\.g\./i);

      fireEvent.change(input, { target: { value: "invalid" } });
      await waitFor(() => {
        expect(
          screen.getByText(/invalid date expression/i),
        ).toBeInTheDocument();
      });
    });
  });

  describe("Absolute Mode", () => {
    it("switches to date picker when mode is toggled", async () => {
      render(<DateFilter {...defaultParams} />);
      const modeToggle = screen.getByRole("button", { name: /relative/i });

      fireEvent.click(modeToggle);

      await waitFor(() => {
        expect(
          screen.getByRole("button", { name: /absolute/i }),
        ).toBeInTheDocument();
        expect(screen.getByLabelText(/select date/i)).toBeInTheDocument();
      });
    });
  });

  describe("Filter Types", () => {
    it("shows single input for basic operators", () => {
      render(<DateFilter {...defaultParams} />);
      const inputs = screen.getAllByRole("textbox");
      expect(inputs).toHaveLength(1);
    });

    it("shows two inputs for inRange operator", async () => {
      render(<DateFilter {...defaultParams} />);
      const typeSelector = screen.getByRole("combobox");

      fireEvent.change(typeSelector, { target: { value: "inRange" } });

      await waitFor(() => {
        const inputs = screen.getAllByRole("textbox");
        expect(inputs).toHaveLength(2);
      });
    });
  });

  describe("Filter Application", () => {
    it("calls filterChangedCallback when filter is applied", async () => {
      const filterChangedCallback = vi.fn();
      render(
        <DateFilter
          {...defaultParams}
          filterChangedCallback={filterChangedCallback}
        />,
      );

      const input = screen.getByPlaceholderText(/e\.g\./i);
      fireEvent.change(input, { target: { value: "today" } });

      await waitFor(() => {
        expect(filterChangedCallback).toHaveBeenCalled();
      });
    });
  });

  describe("AG Grid Integration", () => {
    it("implements getModel correctly", () => {
      const ref = React.createRef<any>();
      render(<DateFilter {...defaultParams} ref={ref} />);

      const model = ref.current?.getModel();
      expect(model).toBeDefined();
    });

    it("implements setModel correctly", () => {
      const ref = React.createRef<any>();
      render(<DateFilter {...defaultParams} ref={ref} />);

      const model = {
        type: "after",
        mode: "relative",
        expressionFrom: "-7d",
      };

      ref.current?.setModel(model);
      expect(ref.current?.getModel()).toEqual(model);
    });

    it("implements doesFilterPass correctly", () => {
      const ref = React.createRef<any>();
      render(<DateFilter {...defaultParams} ref={ref} />);

      ref.current?.setModel({
        type: "equals",
        mode: "relative",
        expressionFrom: "today",
      });

      const today = new Date();
      const params = {
        data: { date: today.toISOString() },
        node: {} as any,
      };

      expect(ref.current?.doesFilterPass(params)).toBe(true);
    });
  });
});
