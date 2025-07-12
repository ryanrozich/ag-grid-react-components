import { Component, ErrorInfo, ReactNode } from "react";
import { logger } from "../../../utils/logger";

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  componentName?: string;
}

class DateFilterErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log the error details
    logger.error(
      `DateFilter Error in ${this.props.componentName || "Unknown Component"}`,
      {
        error: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack,
        timestamp: new Date().toISOString(),
      },
    );

    // Call custom error handler if provided
    if (this.props.onError) {
      try {
        this.props.onError(error, errorInfo);
      } catch (handlerError) {
        logger.error("Error in custom error handler", { error: handlerError });
      }
    }

    // Update state with error details
    this.setState({
      errorInfo,
    });
  }

  private handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default fallback UI
      return (
        <div
          className="date-filter-error-boundary"
          role="alert"
          aria-live="assertive"
          style={{
            padding: "1rem",
            border: "1px solid #ef4444",
            borderRadius: "0.375rem",
            backgroundColor: "#fef2f2",
            color: "#991b1b",
            textAlign: "center",
            minWidth: "300px",
          }}
        >
          <div
            style={{
              fontSize: "0.875rem",
              fontWeight: "600",
              marginBottom: "0.5rem",
            }}
          >
            Date Filter Error
          </div>
          <div
            style={{
              fontSize: "0.75rem",
              marginBottom: "1rem",
              color: "#7f1d1d",
            }}
          >
            {this.state.error?.message ||
              "Something went wrong with the date filter"}
          </div>
          <button
            onClick={this.handleRetry}
            style={{
              padding: "0.5rem 1rem",
              fontSize: "0.75rem",
              backgroundColor: "#dc2626",
              color: "white",
              border: "none",
              borderRadius: "0.25rem",
              cursor: "pointer",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = "#b91c1c";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "#dc2626";
            }}
          >
            Try Again
          </button>
          {typeof process !== "undefined" &&
            process.env?.NODE_ENV === "development" &&
            this.state.errorInfo && (
              <details
                style={{
                  marginTop: "1rem",
                  padding: "0.5rem",
                  backgroundColor: "#fee2e2",
                  borderRadius: "0.25rem",
                  fontSize: "0.625rem",
                  textAlign: "left",
                }}
              >
                <summary style={{ cursor: "pointer", fontWeight: "600" }}>
                  Error Details (Development)
                </summary>
                <pre
                  style={{
                    marginTop: "0.5rem",
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                  }}
                >
                  {this.state.error?.stack}
                </pre>
                <pre
                  style={{
                    marginTop: "0.5rem",
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                  }}
                >
                  {this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default DateFilterErrorBoundary;
