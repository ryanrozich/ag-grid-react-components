import React from "react";
import { getStackBlitzUrl, getGitHubUrl } from "../../utils/deployment";

interface StackBlitzExampleProps {
  component: string;
  title: string;
  description: string;
  githubPath?: string;
  customCode?: string;
}

export const StackBlitzExample: React.FC<StackBlitzExampleProps> = ({
  component,
  title,
  description,
  githubPath,
}) => {
  // Method 1: Direct GitHub import (most reliable)
  const openGitHubExample = () => {
    const path = githubPath || `/examples/${component.toLowerCase()}`;
    const url = getStackBlitzUrl(path);
    window.open(url, "_blank");
  };

  return (
    <div className="border border-gray-700 rounded-lg bg-gray-800/50 p-6">
      <h4 className="text-lg font-semibold text-white mb-2">{title}</h4>
      <p className="text-gray-400 mb-4">{description}</p>

      <div className="space-y-3">
        {/* Primary action - Open from GitHub */}
        <button
          onClick={openGitHubExample}
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
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
          Open in StackBlitz
        </button>

        {/* Secondary actions */}
        <div className="flex gap-2">
          <a
            href={getGitHubUrl(`/examples/${component.toLowerCase()}`)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded-lg transition-colors"
          >
            View on GitHub
          </a>
          <button
            onClick={() => {
              const path = `/examples/${component.toLowerCase()}`;
              const url = getStackBlitzUrl(path);
              navigator.clipboard.writeText(url);
            }}
            className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded-lg transition-colors"
          >
            Copy Link
          </button>
        </div>
      </div>
    </div>
  );
};
