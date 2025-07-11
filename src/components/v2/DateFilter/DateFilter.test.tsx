import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { DateFilter } from "./index";

describe("DateFilter Headless Component", () => {
  it("renders without any CSS", () => {
    const { container } = render(
      <DateFilter>
        <DateFilter.Root>
          <DateFilter.RelativeInput />
        </DateFilter.Root>
      </DateFilter>,
    );

    // Should not have any style attributes
    const elements = container.querySelectorAll("*");
    elements.forEach((element) => {
      expect(element.getAttribute("style")).toBeNull();
    });
  });

  it("accepts and applies className props", () => {
    render(
      <DateFilter>
        <DateFilter.Root className="test-root">
          <DateFilter.RelativeInput className="test-input" />
          <DateFilter.ApplyButton className="test-button">
            Apply
          </DateFilter.ApplyButton>
        </DateFilter.Root>
      </DateFilter>,
    );

    expect(screen.getByTestId("date-filter")).toHaveClass("test-root");
    expect(screen.getByTestId("date-filter-relative-input")).toHaveClass(
      "test-input",
    );
    expect(screen.getByText("Apply")).toHaveClass("test-button");
  });

  it("exposes state through data attributes", () => {
    render(
      <DateFilter>
        <DateFilter.Root>
          <DateFilter.ModeToggle>
            <DateFilter.ModeButton mode="relative">
              Relative
            </DateFilter.ModeButton>
            <DateFilter.ModeButton mode="absolute">
              Absolute
            </DateFilter.ModeButton>
          </DateFilter.ModeToggle>
        </DateFilter.Root>
      </DateFilter>,
    );

    const relativeButton = screen.getByText("Relative");
    const absoluteButton = screen.getByText("Absolute");

    // Initial state
    expect(relativeButton).toHaveAttribute("data-active", "true");
    expect(relativeButton).toHaveAttribute("data-inactive", "false");
    expect(absoluteButton).toHaveAttribute("data-active", "false");
    expect(absoluteButton).toHaveAttribute("data-inactive", "true");

    // Click absolute button
    fireEvent.click(absoluteButton);

    expect(relativeButton).toHaveAttribute("data-active", "false");
    expect(absoluteButton).toHaveAttribute("data-active", "true");
  });

  it("handles relative date input and validation", () => {
    const handleChange = jest.fn();

    render(
      <DateFilter onChange={handleChange}>
        <DateFilter.Root>
          <DateFilter.RelativeSection>
            <DateFilter.RelativeInput placeholder="Enter date" />
            <DateFilter.ErrorMessage />
          </DateFilter.RelativeSection>
          <DateFilter.ApplyButton>Apply</DateFilter.ApplyButton>
        </DateFilter.Root>
      </DateFilter>,
    );

    const input = screen.getByPlaceholderText("Enter date");
    const applyButton = screen.getByText("Apply");

    // Valid input
    fireEvent.change(input, { target: { value: "-7d" } });
    expect(input).toHaveAttribute("data-invalid", "false");

    // Apply button should be enabled with changes
    expect(applyButton).not.toBeDisabled();
    expect(applyButton).toHaveAttribute("data-disabled", "false");

    // Invalid input
    fireEvent.change(input, { target: { value: "invalid date" } });
    expect(input).toHaveAttribute("data-invalid", "true");
    expect(screen.getByRole("alert")).toBeInTheDocument();

    // Apply button should be disabled with invalid input
    expect(applyButton).toBeDisabled();
    expect(applyButton).toHaveAttribute("data-disabled", "true");
  });

  it("maintains accessibility attributes", () => {
    render(
      <DateFilter>
        <DateFilter.Root>
          <DateFilter.ModeButton mode="relative">
            Relative
          </DateFilter.ModeButton>
          <DateFilter.RelativeInput />
        </DateFilter.Root>
      </DateFilter>,
    );

    const button = screen.getByText("Relative");
    expect(button).toHaveAttribute("aria-pressed", "true");
    expect(button).toHaveAttribute("type", "button");

    // Test invalid state
    const input = screen.getByTestId("date-filter-relative-input");
    fireEvent.change(input, { target: { value: "invalid" } });
    expect(input).toHaveAttribute("aria-invalid", "true");
  });

  it("forwards refs correctly", () => {
    const rootRef = React.createRef<HTMLDivElement>();
    const inputRef = React.createRef<HTMLInputElement>();
    const buttonRef = React.createRef<HTMLButtonElement>();

    render(
      <DateFilter>
        <DateFilter.Root ref={rootRef}>
          <DateFilter.RelativeInput ref={inputRef} />
          <DateFilter.ApplyButton ref={buttonRef}>Apply</DateFilter.ApplyButton>
        </DateFilter.Root>
      </DateFilter>,
    );

    expect(rootRef.current).toBeInstanceOf(HTMLDivElement);
    expect(inputRef.current).toBeInstanceOf(HTMLInputElement);
    expect(buttonRef.current).toBeInstanceOf(HTMLButtonElement);
  });

  it("supports custom props spreading", () => {
    render(
      <DateFilter>
        <DateFilter.Root data-custom="test" role="region">
          <DateFilter.RelativeInput
            data-testid="custom-input"
            autoComplete="off"
          />
        </DateFilter.Root>
      </DateFilter>,
    );

    const root = screen.getByTestId("date-filter");
    expect(root).toHaveAttribute("data-custom", "test");
    expect(root).toHaveAttribute("role", "region");

    const input = screen.getByTestId("custom-input");
    expect(input).toHaveAttribute("autoComplete", "off");
  });
});
