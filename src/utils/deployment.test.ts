import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  getDeploymentContext,
  getGitHubUrl,
  getStackBlitzUrl,
} from "./deployment";

describe("deployment utilities", () => {
  // Store original window object
  const originalWindow = global.window;

  beforeEach(() => {
    // Reset window object before each test
    global.window = {
      location: {
        hostname: "localhost",
        pathname: "/",
      },
      document: {
        querySelector: vi.fn(),
      },
    } as any;
  });

  afterEach(() => {
    global.window = originalWindow;
    global.document = undefined;
    vi.clearAllMocks();
  });

  describe("getDeploymentContext", () => {
    it("detects local development", () => {
      global.window.location.hostname = "localhost";
      const context = getDeploymentContext();

      expect(context.type).toBe("local");
      expect(context.branch).toBe("main");
      expect(context.githubBaseUrl).toBe(
        "https://github.com/ryanrozich/ag-grid-react-components/tree/main",
      );
    });

    it("detects local development with custom branch", () => {
      global.window.location.hostname = "localhost";
      // Mock document.querySelector globally
      global.document = {
        querySelector: vi.fn().mockReturnValue({
          getAttribute: () => "feature/test-branch",
        }),
      } as any;

      const context = getDeploymentContext();

      expect(context.type).toBe("local");
      expect(context.branch).toBe("feature/test-branch");
      expect(context.githubBaseUrl).toBe(
        "https://github.com/ryanrozich/ag-grid-react-components/tree/feature/test-branch",
      );
    });

    it("detects Vercel PR preview", () => {
      global.window.location.hostname =
        "ag-grid-react-components-git-fix-83-stackblitz-integration-ryanrozich.vercel.app";

      const context = getDeploymentContext();

      expect(context.type).toBe("pr-preview");
      expect(context.branch).toBe("fix/83/stackblitz/integration");
      expect(context.stackblitzBaseUrl).toBe(
        "https://stackblitz.com/github/ryanrozich/ag-grid-react-components/tree/fix/83/stackblitz/integration",
      );
    });

    it("detects production deployment", () => {
      global.window.location.hostname = "ag-grid-react-components.vercel.app";

      const context = getDeploymentContext();

      expect(context.type).toBe("main");
      expect(context.branch).toBe("main");
    });

    it("detects custom domain as production", () => {
      global.window.location.hostname = "ag-grid-react-components.com";

      const context = getDeploymentContext();

      expect(context.type).toBe("main");
      expect(context.branch).toBe("main");
    });

    it("falls back to main for unknown hostnames", () => {
      global.window.location.hostname = "unknown-domain.com";

      const context = getDeploymentContext();

      expect(context.type).toBe("main");
      expect(context.branch).toBe("main");
    });
  });

  describe("getGitHubUrl", () => {
    it("generates correct GitHub URL for path", () => {
      global.window.location.hostname = "localhost";

      const url = getGitHubUrl("/examples/datefilter");

      expect(url).toBe(
        "https://github.com/ryanrozich/ag-grid-react-components/tree/main/examples/datefilter",
      );
    });

    it("uses correct branch in URL", () => {
      global.window.location.hostname =
        "ag-grid-react-components-git-feature-awesome-ryanrozich.vercel.app";

      const url = getGitHubUrl("/src/components/DateFilter");

      expect(url).toBe(
        "https://github.com/ryanrozich/ag-grid-react-components/tree/feature/awesome/src/components/DateFilter",
      );
    });
  });

  describe("getStackBlitzUrl", () => {
    it("generates correct StackBlitz URL for example", () => {
      global.window.location.hostname = "localhost";

      const url = getStackBlitzUrl("/examples/datefilter");

      expect(url).toBe(
        "https://stackblitz.com/github/ryanrozich/ag-grid-react-components/tree/main/examples/datefilter",
      );
    });

    it("uses correct branch for PR preview", () => {
      global.window.location.hostname =
        "ag-grid-react-components-git-fix-83-stackblitz-integration-ryanrozich.vercel.app";

      const url = getStackBlitzUrl("/examples/quickfilterdropdown");

      expect(url).toBe(
        "https://stackblitz.com/github/ryanrozich/ag-grid-react-components/tree/fix/83/stackblitz/integration/examples/quickfilterdropdown",
      );
    });
  });
});
