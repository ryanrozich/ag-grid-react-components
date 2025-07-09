/* eslint-env browser */
// Simple data generator without external dependencies

function generateSimpleData(count) {
  const rows = [];
  const statuses = ["Todo", "In Progress", "Done", "Blocked"];
  const priorities = ["Low", "Medium", "High", "Critical"];
  const categories = ["Feature", "Bug", "Documentation", "Testing"];

  for (let i = 0; i < count; i++) {
    rows.push({
      id: `TASK-${i + 1}`,
      name: `Task ${i + 1}`,
      description: `Description for task ${i + 1}`,
      status: statuses[i % statuses.length],
      priority: priorities[i % priorities.length],
      category: categories[i % categories.length],
      assignee: `User ${(i % 5) + 1}`,
      reporter: `User ${((i + 2) % 5) + 1}`,
      createdDate: new Date(
        Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000,
      ).toISOString(),
      startDate: new Date(
        Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000,
      ).toISOString(),
      dueDate: new Date(
        Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000,
      ).toISOString(),
      completedDate: i % 3 === 0 ? new Date().toISOString() : null,
      estimatedHours: Math.floor(Math.random() * 40) + 1,
      actualHours: Math.floor(Math.random() * 50),
      percentDelivered: Math.floor(Math.random() * 100),
      value: Math.floor(Math.random() * 50000) + 1000,
      amountDelivered: Math.floor(Math.random() * 25000),
      remaining: 0,
      tags: ["tag1", "tag2"],
      comments: Math.floor(Math.random() * 25),
      attachments: Math.floor(Math.random() * 10),
      watchers: Math.floor(Math.random() * 15),
      votes: Math.floor(Math.random() * 50),
      lastUpdated: new Date().toISOString(),
    });
  }

  // Fix remaining calculation
  rows.forEach((row) => {
    row.remaining = row.value - row.amountDelivered;
  });

  return rows;
}

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

    try {
      const url = new URL(request.url);
      const path = url.pathname.replace(/^.*\/api/, "/api");

      // Health check
      if (path === "/api/health" || path === "/health") {
        return new Response(
          JSON.stringify({
            status: "healthy",
            timestamp: new Date().toISOString(),
            totalRecords: 10000,
          }),
          { headers },
        );
      }

      // Tasks endpoint
      if (path === "/api/tasks" || path === "/tasks") {
        const body = request.method === "POST" ? await request.json() : {};
        const { startRow = 0, endRow = 100 } = body;

        // Generate simple data
        const allData = generateSimpleData(10000);
        const rows = allData.slice(startRow, endRow);

        return new Response(
          JSON.stringify({
            rows,
            lastRow: allData.length,
            success: true,
          }),
          { headers },
        );
      }

      // Stats endpoint
      if (path === "/api/stats" || path === "/stats") {
        const allData = generateSimpleData(10000);
        const totalBudget = allData.reduce((sum, task) => sum + task.value, 0);
        const totalSpent = allData.reduce(
          (sum, task) => sum + task.amountDelivered,
          0,
        );
        const avgProgress = Math.round(
          allData.reduce((sum, task) => sum + task.percentDelivered, 0) /
            allData.length,
        );

        return new Response(
          JSON.stringify({
            totalTasks: allData.length,
            totalBudget,
            totalSpent,
            averageProgress: avgProgress,
            statusBreakdown: {
              Todo: 2500,
              "In Progress": 2500,
              Done: 2500,
              Blocked: 2500,
            },
            priorityBreakdown: {
              Low: 2500,
              Medium: 2500,
              High: 2500,
              Critical: 2500,
            },
            categoryBreakdown: {
              Feature: 2500,
              Bug: 2500,
              Documentation: 2500,
              Testing: 2500,
            },
          }),
          { headers },
        );
      }

      // 404
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
    } catch (error) {
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
