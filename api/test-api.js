/* eslint-env browser */
// Test API to verify Cloudflare Worker functionality

export default {
  async fetch(request) {
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Content-Type": "application/json",
    };

    // Handle CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, { headers });
    }

    const url = new URL(request.url);

    // Simple test endpoint
    if (url.pathname === "/test") {
      return new Response(JSON.stringify({ message: "API is working!" }), {
        headers,
      });
    }

    // Health check
    if (url.pathname.endsWith("/health")) {
      return new Response(
        JSON.stringify({
          status: "healthy",
          timestamp: new Date().toISOString(),
        }),
        { headers },
      );
    }

    // 404 for unknown routes
    return new Response(
      JSON.stringify({
        error: "Not found",
        path: url.pathname,
      }),
      {
        status: 404,
        headers,
      },
    );
  },
};
