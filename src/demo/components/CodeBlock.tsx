import React, { useState } from "react";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

// Import only the languages we need
import typescript from "react-syntax-highlighter/dist/esm/languages/prism/typescript";
import javascript from "react-syntax-highlighter/dist/esm/languages/prism/javascript";
import bash from "react-syntax-highlighter/dist/esm/languages/prism/bash";
import json from "react-syntax-highlighter/dist/esm/languages/prism/json";
import tsx from "react-syntax-highlighter/dist/esm/languages/prism/tsx";
import jsx from "react-syntax-highlighter/dist/esm/languages/prism/jsx";
import css from "react-syntax-highlighter/dist/esm/languages/prism/css";

// Register languages
SyntaxHighlighter.registerLanguage("typescript", typescript);
SyntaxHighlighter.registerLanguage("javascript", javascript);
SyntaxHighlighter.registerLanguage("bash", bash);
SyntaxHighlighter.registerLanguage("json", json);
SyntaxHighlighter.registerLanguage("tsx", tsx);
SyntaxHighlighter.registerLanguage("jsx", jsx);
SyntaxHighlighter.registerLanguage("css", css);

interface CodeBlockProps {
  code: string;
  language?:
    | "typescript"
    | "javascript"
    | "bash"
    | "json"
    | "tsx"
    | "jsx"
    | "css";
  showLineNumbers?: boolean;
  showCopyButton?: boolean;
  variant?: "default" | "hero";
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = "typescript",
  showLineNumbers: _showLineNumbers = false,
  showCopyButton = true,
  variant = "default",
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } else {
        throw new Error("Clipboard API not available");
      }
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const trimmedCode = code.trim();

  // Always disable line numbers for now
  const shouldShowLineNumbers = false;

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
          {copied ? (
            <span className="flex items-center gap-1">
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Copied!
            </span>
          ) : (
            <span className="flex items-center gap-1">
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              Copy
            </span>
          )}
        </button>
      )}
      <div
        className={`overflow-x-auto rounded-lg shadow-lg ${
          variant === "hero"
            ? "bg-gray-900/80 border border-gray-700/30"
            : "bg-gray-900/90 border border-gray-700/50"
        }`}
      >
        <div style={{ position: "relative" }}>
          {shouldShowLineNumbers && (
            <div
              style={{
                position: "absolute",
                left: variant === "hero" ? "1.25rem" : "1rem",
                top: variant === "hero" ? "1.25rem" : "1rem",
                color: "#6b7280",
                opacity: 0.6,
                fontFamily:
                  '"Fira Code", Monaco, Consolas, "Courier New", monospace',
                fontSize: variant === "hero" ? "0.9375rem" : "0.875rem",
                lineHeight: 1.7,
                textAlign: "right",
                userSelect: "none",
                width: "2.5rem",
              }}
            >
              {trimmedCode.split("\n").map((_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>
          )}
          <SyntaxHighlighter
            language={language}
            style={vscDarkPlus}
            showLineNumbers={false}
            customStyle={{
              margin: 0,
              padding: variant === "hero" ? "1.25rem" : "1rem",
              paddingRight: variant === "hero" ? "1.25rem" : "3.5rem",
              paddingLeft: shouldShowLineNumbers
                ? "4rem"
                : variant === "hero"
                  ? "1.25rem"
                  : "1rem",
              background: "transparent",
              fontSize: variant === "hero" ? "0.9375rem" : "0.875rem",
              lineHeight: 1.7,
              fontFamily:
                '"Fira Code", Monaco, Consolas, "Courier New", monospace',
            }}
            codeTagProps={{
              style: {
                fontFamily:
                  '"Fira Code", Monaco, Consolas, "Courier New", monospace',
              },
            }}
          >
            {trimmedCode}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  );
};
