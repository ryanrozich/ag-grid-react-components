/* eslint-env browser */
/* global Response */
// Cloudflare Worker for AG Grid Demo API
import { processDataRequest, getStats } from "./data-generator.js";

// CORS headers based on environment
function getCorsHeaders(env) {
  const origin =
    env.ENVIRONMENT === "production" ? "https://demo.rozich.net" : "*"; // Allow all origins for PR previews

  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
  };
}

// Main worker handler
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const headers = getCorsHeaders(env);

    // Handle CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, { headers });
    }

    try {
      // Extract the API path by removing the base path
      // Handle both /api/tasks and /ag-grid-react-components/api/tasks formats
      const apiPath = url.pathname.replace(/^.*\/api/, "/api");

      // Route: /api/tasks - Server-side data for AG Grid
      if (apiPath === "/api/tasks" || apiPath === "/tasks") {
        if (request.method === "POST") {
          const body = await request.json();
          const { startRow, endRow, filterModel, sortModel } = body;

          // Simulate network delay (optional)
          if (url.searchParams.get("delay")) {
            await new Promise((resolve) => setTimeout(resolve, 500));
          }

          const result = processDataRequest({
            startRow: startRow || 0,
            endRow: endRow || 100,
            filterModel: filterModel || {},
            sortModel: sortModel || [],
          });

          return new Response(JSON.stringify(result), { headers });
        }

        // GET method for simple queries
        if (request.method === "GET") {
          const startRow = parseInt(url.searchParams.get("startRow") || "0");
          const endRow = parseInt(url.searchParams.get("endRow") || "100");
          const filterModel = JSON.parse(
            url.searchParams.get("filterModel") || "{}",
          );
          const sortModel = JSON.parse(
            url.searchParams.get("sortModel") || "[]",
          );

          const result = processDataRequest({
            startRow,
            endRow,
            filterModel,
            sortModel,
          });

          return new Response(JSON.stringify(result), { headers });
        }
      }

      // Route: /api/stats - Aggregated statistics
      if (apiPath === "/api/stats" || apiPath === "/stats") {
        const filterModel =
          request.method === "POST"
            ? (await request.json()).filterModel
            : JSON.parse(url.searchParams.get("filterModel") || "{}");

        const stats = getStats(filterModel);
        return new Response(JSON.stringify(stats), { headers });
      }

      // Route: /api/health - Health check
      if (apiPath === "/api/health" || apiPath === "/health") {
        return new Response(
          JSON.stringify({
            status: "healthy",
            environment: env.ENVIRONMENT || "development",
            timestamp: new Date().toISOString(),
            totalRecords: 10000,
          }),
          { headers },
        );
      }

      // Route: / - API documentation
      if (apiPath === "/" || apiPath === "/api" || apiPath === "/api/") {
        const docs = {
          name: "AG Grid Demo API",
          version: "1.0.0",
          environment: env.ENVIRONMENT || "development",
          endpoints: {
            "/api/tasks": {
              methods: ["GET", "POST"],
              description: "Server-side data source for AG Grid",
              parameters: {
                startRow: "number - Starting row index (default: 0)",
                endRow: "number - Ending row index (default: 100)",
                filterModel: "object - AG Grid filter model",
                sortModel: "array - AG Grid sort model",
              },
              example: {
                url: "/api/tasks",
                method: "POST",
                body: {
                  startRow: 0,
                  endRow: 50,
                  filterModel: {
                    status: { values: ["In Progress", "Todo"] },
                    dueDate: {
                      type: "inRange",
                      dateFrom: "2024-01-01",
                      dateTo: "2024-12-31",
                    },
                  },
                  sortModel: [{ colId: "dueDate", sort: "asc" }],
                },
              },
            },
            "/api/stats": {
              methods: ["GET", "POST"],
              description: "Get aggregated statistics with optional filtering",
              parameters: {
                filterModel: "object - AG Grid filter model (optional)",
              },
            },
            "/api/health": {
              methods: ["GET"],
              description: "Health check endpoint",
            },
          },
        };

        return new Response(JSON.stringify(docs, null, 2), { headers });
      }

      // 404 for unknown routes
      return new Response(
        JSON.stringify({
          error: "Not found",
          message: `Route ${url.pathname} not found`,
          availableRoutes: ["/api/tasks", "/api/stats", "/api/health", "/api"],
        }),
        {
          status: 404,
          headers,
        },
      );
    } catch (error) {
      console.error("API Error:", error);
      return new Response(
        JSON.stringify({
          error: "Internal server error",
          message: error.message,
        }),
        {
          status: 500,
          headers,
        },
      );
    }
  },
};
