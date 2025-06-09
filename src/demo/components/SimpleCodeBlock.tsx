import React, { useState } from "react";

interface SimpleCodeBlockProps {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
  showCopyButton?: boolean;
  variant?: "default" | "hero";
}

export const SimpleCodeBlock: React.FC<SimpleCodeBlockProps> = ({
  code,
  language = "typescript",
  showLineNumbers = false,
  showCopyButton = true,
  variant = "default",
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const trimmedCode = code.trim();
  const lines = trimmedCode.split("\n");

  // Determine if we should show line numbers based on code length and type
  const shouldShowLineNumbers =
    showLineNumbers ||
    (variant !== "hero" && lines.length > 5 && language !== "bash");

  return (
    <div className="relative group">
      {showCopyButton && variant !== "hero" && (
        <button
          onClick={handleCopy}
          className={`absolute top-3 right-3 px-3 py-1 bg-gray-700/50 hover:bg-gray-600/70 backdrop-blur-sm rounded text-xs text-gray-300 border border-gray-600/50 transition-all duration-200 z-10 ${
            copied ? "opacity-100" : "opacity-50 group-hover:opacity-100"
          }`}
          title="Copy code"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      )}
      <div
        className={`overflow-x-auto rounded-lg shadow-lg ${
          variant === "hero"
            ? "bg-gray-900/80 border border-gray-700/30"
            : "bg-gray-900/90 border border-gray-700/50"
        }`}
      >
        <pre
          style={{
            margin: 0,
            padding: variant === "hero" ? "1.25rem" : "1rem",
            paddingRight: variant === "hero" ? "1.25rem" : "3.5rem",
            paddingLeft: shouldShowLineNumbers
              ? "3.5rem"
              : variant === "hero"
                ? "1.25rem"
                : "1rem",
            background: "transparent",
            fontSize: variant === "hero" ? "0.9375rem" : "0.875rem",
            lineHeight: 1.7,
            fontFamily: "Fira Code, Monaco, Consolas, Courier New, monospace",
            color: "#d4d4d4",
            position: "relative",
          }}
        >
          {shouldShowLineNumbers && (
            <div
              style={{
                position: "absolute",
                left: 0,
                top: variant === "hero" ? "1.25rem" : "1rem",
                paddingLeft: "0.5rem",
                width: "2.5rem",
                textAlign: "right",
                color: "#6b7280",
                opacity: 0.6,
                fontFamily:
                  "Fira Code, Monaco, Consolas, Courier New, monospace",
                fontSize: variant === "hero" ? "0.9375rem" : "0.875rem",
                lineHeight: 1.7,
              }}
              aria-hidden="true"
            >
              {lines.map((_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>
          )}
          <code
            style={{
              fontFamily: "Fira Code, Monaco, Consolas, Courier New, monospace",
              fontSize: "inherit",
              color: "inherit",
              background: "none",
              padding: 0,
            }}
          >
            {trimmedCode}
          </code>
        </pre>
      </div>
    </div>
  );
};
