/**
 * Deployment detection utilities for dynamic URL generation
 */

interface DeploymentContext {
  type: "main" | "pr-preview" | "feature-branch" | "local";
  branch: string;
  githubBaseUrl: string;
  stackblitzBaseUrl: string;
}

/**
 * Detects the current deployment context based on environment and URL
 */
export function getDeploymentContext(): DeploymentContext {
  // Check if we're running in a browser
  if (typeof window === "undefined") {
    return {
      type: "local",
      branch: "main",
      githubBaseUrl:
        "https://github.com/ryanrozich/ag-grid-react-components/tree/main",
      stackblitzBaseUrl:
        "https://stackblitz.com/github/ryanrozich/ag-grid-react-components/tree/main",
    };
  }

  const hostname = window.location.hostname;

  // Local development
  if (hostname === "localhost" || hostname === "127.0.0.1") {
    // Try to get branch from meta tag or environment variable
    let branch = "main";
    try {
      const branchMeta = document.querySelector('meta[name="git-branch"]');
      if (branchMeta) {
        branch = branchMeta.getAttribute("content") || "main";
      }
    } catch {
      // Document might not be available in tests
    }

    return {
      type: "local",
      branch,
      githubBaseUrl: `https://github.com/ryanrozich/ag-grid-react-components/tree/${branch}`,
      stackblitzBaseUrl: `https://stackblitz.com/github/ryanrozich/ag-grid-react-components/tree/${branch}`,
    };
  }

  // Vercel PR preview deployment
  if (hostname.includes("vercel.app") && hostname.includes("-git-")) {
    // Extract branch name from Vercel preview URL
    // Format: ag-grid-react-components-git-[branch-name]-[username].vercel.app
    const parts = hostname.split("-git-")[1]?.split(".vercel.app")[0];
    if (parts) {
      // Remove the username suffix (last part after last dash)
      const branchParts = parts.split("-");
      const branchName = branchParts.slice(0, -1).join("-");
      const branch = branchName.replace(/-/g, "/");

      return {
        type: "pr-preview",
        branch,
        githubBaseUrl: `https://github.com/ryanrozich/ag-grid-react-components/tree/${branch}`,
        stackblitzBaseUrl: `https://stackblitz.com/github/ryanrozich/ag-grid-react-components/tree/${branch}`,
      };
    }
  }

  // Production deployment on main branch
  if (
    hostname === "ag-grid-react-components.vercel.app" ||
    hostname === "ag-grid-react-components.com"
  ) {
    return {
      type: "main",
      branch: "main",
      githubBaseUrl:
        "https://github.com/ryanrozich/ag-grid-react-components/tree/main",
      stackblitzBaseUrl:
        "https://stackblitz.com/github/ryanrozich/ag-grid-react-components/tree/main",
    };
  }

  // Feature branch deployment
  if (hostname.includes("vercel.app")) {
    // Try to extract branch from URL or use fallback
    const branchMeta = document.querySelector('meta[name="git-branch"]');
    const branch = branchMeta?.getAttribute("content") || "main";

    return {
      type: "feature-branch",
      branch,
      githubBaseUrl: `https://github.com/ryanrozich/ag-grid-react-components/tree/${branch}`,
      stackblitzBaseUrl: `https://stackblitz.com/github/ryanrozich/ag-grid-react-components/tree/${branch}`,
    };
  }

  // Default fallback
  return {
    type: "main",
    branch: "main",
    githubBaseUrl:
      "https://github.com/ryanrozich/ag-grid-react-components/tree/main",
    stackblitzBaseUrl:
      "https://stackblitz.com/github/ryanrozich/ag-grid-react-components/tree/main",
  };
}

/**
 * Generates a GitHub URL for a specific path
 */
export function getGitHubUrl(path: string): string {
  const context = getDeploymentContext();
  return `${context.githubBaseUrl}${path}`;
}

/**
 * Generates a StackBlitz URL for a specific example
 */
export function getStackBlitzUrl(examplePath: string): string {
  const context = getDeploymentContext();
  return `${context.stackblitzBaseUrl}${examplePath}`;
}

/**
 * Checks if a branch exists on GitHub (async)
 */
export async function branchExists(branch: string): Promise<boolean> {
  try {
    const response = await fetch(
      `https://api.github.com/repos/ryanrozich/ag-grid-react-components/branches/${branch}`,
      { method: "HEAD" },
    );
    return response.ok;
  } catch {
    return false;
  }
}

/**
 * Gets a safe branch URL with fallback to main if branch doesn't exist
 */
export async function getSafeBranchUrl(
  preferredBranch: string,
): Promise<string> {
  const exists = await branchExists(preferredBranch);
  return exists ? preferredBranch : "main";
}
