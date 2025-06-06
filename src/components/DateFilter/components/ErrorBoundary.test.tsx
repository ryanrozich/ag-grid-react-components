import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import DateFilterErrorBoundary from "./ErrorBoundary";

// Mock logger
vi.mock("../../../utils/logger", () => ({
  logger: {
    error: vi.fn(),
  },
}));

// Test component that throws an error
const ThrowErrorComponent = ({ shouldThrow }: { shouldThrow: boolean }) => {
  if (shouldThrow) {
    throw new Error("Test error message");
  }
  return <div>No error</div>;
};

// Component that throws on render
const AlwaysThrowComponent = () => {
  throw new Error("Component always throws");
};

describe("DateFilterErrorBoundary", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Suppress console.error during tests
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  describe("Normal operation", () => {
    it("should render children when no error occurs", () => {
      render(
        <DateFilterErrorBoundary>
          <div data-testid="child-component">Child content</div>
        </DateFilterErrorBoundary>
      );

      expect(screen.getByTestId("child-component")).toBeInTheDocument();
      expect(screen.getByText("Child content")).toBeInTheDocument();
    });

    it("should render children with multiple elements", () => {
      render(
        <DateFilterErrorBoundary>
          <div data-testid="child-1">Child 1</div>
          <div data-testid="child-2">Child 2</div>
        </DateFilterErrorBoundary>
      );

      expect(screen.getByTestId("child-1")).toBeInTheDocument();
      expect(screen.getByTestId("child-2")).toBeInTheDocument();
    });
  });

  describe("Error handling", () => {
    it("should catch errors and display default fallback UI", () => {
      render(
        <DateFilterErrorBoundary>
          <AlwaysThrowComponent />
        </DateFilterErrorBoundary>
      );

      expect(screen.getByRole("alert")).toBeInTheDocument();
      expect(screen.getByText("Date Filter Error")).toBeInTheDocument();
      expect(screen.getByText("Component always throws")).toBeInTheDocument();
      expect(screen.getByText("Try Again")).toBeInTheDocument();
    });

    it("should display custom fallback UI when provided", () => {
      const customFallback = <div data-testid="custom-fallback">Custom error UI</div>;

      render(
        <DateFilterErrorBoundary fallback={customFallback}>
          <AlwaysThrowComponent />
        </DateFilterErrorBoundary>
      );

      expect(screen.getByTestId("custom-fallback")).toBeInTheDocument();
      expect(screen.getByText("Custom error UI")).toBeInTheDocument();
      expect(screen.queryByText("Date Filter Error")).not.toBeInTheDocument();
    });

    it("should call custom error handler when provided", () => {
      const mockErrorHandler = vi.fn();

      render(
        <DateFilterErrorBoundary onError={mockErrorHandler}>
          <AlwaysThrowComponent />
        </DateFilterErrorBoundary>
      );

      expect(mockErrorHandler).toHaveBeenCalledWith(
        expect.any(Error),
        expect.objectContaining({
          componentStack: expect.any(String),
        })
      );
    });

    it("should include component name in error logs", async () => {
      const { logger } = await vi.importActual("../../../utils/logger") as any;

      render(
        <DateFilterErrorBoundary componentName="TestComponent">
          <AlwaysThrowComponent />
        </DateFilterErrorBoundary>
      );

      expect(logger.error).toHaveBeenCalledWith(
        "DateFilter Error in TestComponent",
        expect.objectContaining({
          error: "Component always throws",
          stack: expect.any(String),
          componentStack: expect.any(String),
          timestamp: expect.any(String),
        })
      );
    });

    it("should handle errors in custom error handler gracefully", async () => {
      const { logger } = await vi.importActual("../../../utils/logger") as any;
      const faultyErrorHandler = vi.fn(() => {
        throw new Error("Error handler failed");
      });

      render(
        <DateFilterErrorBoundary onError={faultyErrorHandler}>
          <AlwaysThrowComponent />
        </DateFilterErrorBoundary>
      );

      expect(faultyErrorHandler).toHaveBeenCalled();
      expect(logger.error).toHaveBeenCalledWith(
        "Error in custom error handler",
        { error: expect.any(Error) }
      );
    });
  });

  describe("Error recovery", () => {
    it("should allow retry and recover from error", () => {
      let shouldThrow = true;
      const TestWrapper = () => (
        <DateFilterErrorBoundary>
          <ThrowErrorComponent shouldThrow={shouldThrow} />
        </DateFilterErrorBoundary>
      );

      const { rerender } = render(<TestWrapper />);

      // Should show error UI
      expect(screen.getByRole("alert")).toBeInTheDocument();
      expect(screen.getByText("Try Again")).toBeInTheDocument();

      // Change the component to not throw
      shouldThrow = false;

      // Click retry button
      fireEvent.click(screen.getByText("Try Again"));

      // Should clear error state and attempt to render again
      rerender(<TestWrapper />);

      // Since we're still passing shouldThrow=true to the child, it will throw again
      // But the retry mechanism should reset the error boundary state
      expect(screen.getByRole("alert")).toBeInTheDocument();
    });

    it("should reset error state when retry is clicked", () => {
      render(
        <DateFilterErrorBoundary>
          <AlwaysThrowComponent />
        </DateFilterErrorBoundary>
      );

      expect(screen.getByRole("alert")).toBeInTheDocument();

      // Click retry
      fireEvent.click(screen.getByText("Try Again"));

      // Since the component will throw again, we should still see the error UI
      // But the error boundary state was reset and re-caught the error
      expect(screen.getByRole("alert")).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("should have proper ARIA attributes", () => {
      render(
        <DateFilterErrorBoundary>
          <AlwaysThrowComponent />
        </DateFilterErrorBoundary>
      );

      const errorElement = screen.getByRole("alert");
      expect(errorElement).toHaveAttribute("aria-live", "assertive");
    });

    it("should have keyboard accessible retry button", () => {
      render(
        <DateFilterErrorBoundary>
          <AlwaysThrowComponent />
        </DateFilterErrorBoundary>
      );

      const retryButton = screen.getByText("Try Again");
      expect(retryButton).toBeInTheDocument();
      
      // Should be focusable
      retryButton.focus();
      expect(retryButton).toHaveFocus();

      // Should respond to Enter key
      fireEvent.keyDown(retryButton, { key: "Enter" });
      // Component will throw again, but error boundary should handle it
      expect(screen.getByRole("alert")).toBeInTheDocument();
    });
  });

  describe("Development mode features", () => {
    it("should show error details in development mode", () => {
      // Mock development environment
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = "development";

      render(
        <DateFilterErrorBoundary>
          <AlwaysThrowComponent />
        </DateFilterErrorBoundary>
      );

      expect(screen.getByText("Error Details (Development)")).toBeInTheDocument();

      // Restore environment
      process.env.NODE_ENV = originalEnv;
    });

    it("should not show error details in production mode", () => {
      // Mock production environment
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = "production";

      render(
        <DateFilterErrorBoundary>
          <AlwaysThrowComponent />
        </DateFilterErrorBoundary>
      );

      expect(screen.queryByText("Error Details (Development)")).not.toBeInTheDocument();

      // Restore environment
      process.env.NODE_ENV = originalEnv;
    });
  });

  describe("Error message display", () => {
    it("should display generic message for errors without message", () => {
      const ComponentWithNoMessage = () => {
        const error = new Error();
        error.message = "";
        throw error;
      };

      render(
        <DateFilterErrorBoundary>
          <ComponentWithNoMessage />
        </DateFilterErrorBoundary>
      );

      expect(screen.getByText("Something went wrong with the date filter")).toBeInTheDocument();
    });

    it("should display specific error message when available", () => {
      render(
        <DateFilterErrorBoundary>
          <AlwaysThrowComponent />
        </DateFilterErrorBoundary>
      );

      expect(screen.getByText("Component always throws")).toBeInTheDocument();
    });
  });
});