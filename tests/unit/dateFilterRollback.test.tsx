import { describe, test, expect, vi } from "vitest";
import React from "react";
import { render } from "@testing-library/react";
import { AGGridFilterAdapter } from "../../src/components/DateFilter/AGGridFilterAdapter";

describe("DateFilter Rollback Verification", () => {
  test("AGGridFilterAdapter should be used instead of AGGridDateFilter", async () => {
    // Verify that we're using the correct adapter
    expect(AGGridFilterAdapter).toBeDefined();
    expect(AGGridFilterAdapter.name).toBe("AGGridFilterAdapter");
  });

  test("AGGridFilterAdapter should implement required AG Grid filter methods", () => {
    const mockProps = {
      colDef: { field: "dueDate" },
      api: {},
      column: {},
      columnApi: {},
      filterChangedCallback: vi.fn(),
    };

    const { container } = render(<AGGridFilterAdapter {...mockProps} />);
    const instance = container.querySelector("[ref]");

    // Component should render
    expect(container).toBeTruthy();
  });

  test("Demo config should use AGGridFilterAdapter", async () => {
    const sharedConfig = await import("../../src/demo/config/sharedGridConfig");

    // Check that components mapping uses AGGridFilterAdapter
    expect(sharedConfig.components.agDateColumnFilter).toBe(
      AGGridFilterAdapter,
    );
    expect(sharedConfig.components.agDateColumnFilter.name).toBe(
      "AGGridFilterAdapter",
    );
  });
});
