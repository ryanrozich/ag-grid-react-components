import React, { ComponentType, ErrorInfo } from "react";
import DateFilterErrorBoundary from "../components/ErrorBoundary";

interface WithErrorBoundaryOptions {
  fallback?: React.ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  componentName?: string;
}

/**
 * Higher-order component that wraps a component with an error boundary
 */
export function withErrorBoundary<P extends object>(
  WrappedComponent: ComponentType<P>,
  options: WithErrorBoundaryOptions = {},
) {
  const displayName =
    WrappedComponent.displayName || WrappedComponent.name || "Component";

  const WithErrorBoundaryComponent = (props: P) => {
    return (
      <DateFilterErrorBoundary
        fallback={options.fallback}
        onError={options.onError}
        componentName={options.componentName || displayName}
      >
        <WrappedComponent {...props} />
      </DateFilterErrorBoundary>
    );
  };

  WithErrorBoundaryComponent.displayName = `withErrorBoundary(${displayName})`;

  return WithErrorBoundaryComponent;
}

/**
 * Hook for handling errors in functional components
 */
export function useErrorHandler() {
  const [error, setError] = React.useState<Error | null>(null);

  const handleError = React.useCallback((error: Error) => {
    setError(error);
  }, []);

  const clearError = React.useCallback(() => {
    setError(null);
  }, []);

  // Throw error to be caught by error boundary
  if (error) {
    throw error;
  }

  return { handleError, clearError };
}

/**
 * Safe wrapper for async operations that might fail
 */
export async function safeAsync<T>(
  operation: () => Promise<T>,
  onError?: (error: Error) => void,
): Promise<T | null> {
  try {
    return await operation();
  } catch (error) {
    if (onError) {
      onError(error as Error);
    } else {
      console.error("Async operation failed:", error);
    }
    return null;
  }
}

/**
 * Safe wrapper for synchronous operations that might fail
 */
export function safeSync<T>(
  operation: () => T,
  defaultValue: T,
  onError?: (error: Error) => void,
): T {
  try {
    return operation();
  } catch (error) {
    if (onError) {
      onError(error as Error);
    } else {
      console.error("Synchronous operation failed:", error);
    }
    return defaultValue;
  }
}

/**
 * Error boundary wrapper for immediate use without HOC
 */
export const ErrorBoundaryWrapper: React.FC<{
  children: React.ReactNode;
  fallback?: React.ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  componentName?: string;
}> = ({ children, fallback, onError, componentName }) => {
  return (
    <DateFilterErrorBoundary
      fallback={fallback}
      onError={onError}
      componentName={componentName}
    >
      {children}
    </DateFilterErrorBoundary>
  );
};
