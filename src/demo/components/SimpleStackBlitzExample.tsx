import React from "react";
import { getGitHubUrl } from "../../utils/deployment";

interface SimpleStackBlitzExampleProps {
  componentName: string;
  exampleTitle: string;
  description: string;
}

export const SimpleStackBlitzExample: React.FC<
  SimpleStackBlitzExampleProps
> = ({ componentName, exampleTitle, description }) => {
  const handleOpenExample = () => {
    // Create a simple working example URL
    const baseUrl = "https://stackblitz.com/edit/";

    // For now, let's use a pre-configured StackBlitz project
    // This opens a simple template that users can fork
    const url = `${baseUrl}vitejs-vite-xhfqgv?file=src%2FApp.tsx&title=${encodeURIComponent(exampleTitle)}`;

    window.open(url, "_blank");
  };

  return (
    <div className="border border-gray-700 rounded-lg bg-gray-800/50 p-6">
      <h4 className="text-lg font-semibold text-white mb-2">{exampleTitle}</h4>
      <p className="text-gray-400 mb-4">{description}</p>
      <div className="flex gap-4">
        <button
          onClick={handleOpenExample}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2L2 7L12 12L22 7L12 2Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2 17L12 22L22 17"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2 12L12 17L22 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Try it on StackBlitz
        </button>
        <a
          href={getGitHubUrl(`/src/components/${componentName}`)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
        >
          View Source
        </a>
      </div>
    </div>
  );
};
