import React from "react";

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
  customCode,
}) => {
  // Method 1: Direct GitHub import (most reliable)
  const openGitHubExample = () => {
    const baseUrl =
      "https://stackblitz.com/github/ryanrozich/ag-grid-react-components/tree/main";
    const path = githubPath || `/examples/${component.toLowerCase()}`;
    window.open(`${baseUrl}${path}`, "_blank");
  };

  // Method 2: Fork existing StackBlitz project
  const openStackBlitzProject = () => {
    // You can create these base projects on StackBlitz and save them
    const projectMap: Record<string, string> = {
      datefilter: "ag-grid-datefilter-example",
      quickfilterdropdown: "ag-grid-quickfilter-example",
      activefilters: "ag-grid-activefilters-example",
    };

    const projectId = projectMap[component.toLowerCase()];
    if (projectId) {
      window.open(`https://stackblitz.com/edit/${projectId}`, "_blank");
    }
  };

  // Method 3: Use StackBlitz embed API (for future use)
  const createDynamicProject = async () => {
    // This is where you could use the StackBlitz SDK
    // For now, we'll use the GitHub import method
    openGitHubExample();
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
            href={`https://github.com/ryanrozich/ag-grid-react-components/tree/main/examples/${component.toLowerCase()}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded-lg transition-colors"
          >
            View on GitHub
          </a>
          <button
            onClick={() =>
              navigator.clipboard.writeText(
                `https://stackblitz.com/github/ryanrozich/ag-grid-react-components/tree/main/examples/${component.toLowerCase()}`,
              )
            }
            className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded-lg transition-colors"
          >
            Copy Link
          </button>
        </div>
      </div>
    </div>
  );
};
