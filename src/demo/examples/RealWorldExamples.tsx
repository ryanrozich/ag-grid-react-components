import React, { useState, useEffect, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import ActiveFilters from "../../components/ActiveFilters";
import { QuickFilterDropdown } from "../../components/QuickFilterDropdown";
import styles from "./Examples.module.css";
import "./RealWorld.css";

// Sales Dashboard Example
const SalesDashboard: React.FC = () => {
  const [gridApi, setGridApi] = useState<any>(null);
  const [salesData] = useState(() => generateSalesData(200));
  const [_selectedQuarter, setSelectedQuarter] = useState<string>("");
  const [kpiData, setKpiData] = useState<any>({});

  const columnDefs: ColDef[] = [
    { field: "orderId", headerName: "Order ID", width: 100 },
    { field: "customerName", headerName: "Customer", flex: 1 },
    { field: "product", headerName: "Product", width: 150 },
    { field: "region", headerName: "Region", width: 120 },
    {
      field: "orderDate",
      headerName: "Date",
      width: 120,
      filter: "agDateColumnFilter",
      valueFormatter: (params) => new Date(params.value).toLocaleDateString(),
    },
    {
      field: "amount",
      headerName: "Amount",
      width: 120,
      filter: "agNumberColumnFilter",
      valueFormatter: (params) => `$${params.value.toLocaleString()}`,
    },
    { field: "status", headerName: "Status", width: 120 },
    { field: "salesRep", headerName: "Sales Rep", width: 150 },
  ];

  const quarterlyPresets = [
    {
      id: "q1-2024",
      label: "Q1 2024",
      filterModel: {
        orderDate: {
          type: "inRange",
          mode: "absolute",
          dateFrom: new Date("2024-01-01"),
          dateTo: new Date("2024-03-31"),
          filterType: "date",
        },
      },
    },
    {
      id: "q2-2024",
      label: "Q2 2024",
      filterModel: {
        orderDate: {
          type: "inRange",
          mode: "absolute",
          dateFrom: new Date("2024-04-01"),
          dateTo: new Date("2024-06-30"),
          filterType: "date",
        },
      },
    },
    {
      id: "q3-2024",
      label: "Q3 2024",
      filterModel: {
        orderDate: {
          type: "inRange",
          mode: "absolute",
          dateFrom: new Date("2024-07-01"),
          dateTo: new Date("2024-09-30"),
          filterType: "date",
        },
      },
    },
    {
      id: "q4-2024",
      label: "Q4 2024",
      filterModel: {
        orderDate: {
          type: "inRange",
          mode: "absolute",
          dateFrom: new Date("2024-10-01"),
          dateTo: new Date("2024-12-31"),
          filterType: "date",
        },
      },
    },
  ];

  const regionPresets = [
    {
      id: "north-america",
      label: "North America",
      filterModel: { region: { type: "equals", filter: "North America" } },
    },
    {
      id: "europe",
      label: "Europe",
      filterModel: { region: { type: "equals", filter: "Europe" } },
    },
    {
      id: "asia-pacific",
      label: "Asia Pacific",
      filterModel: { region: { type: "equals", filter: "Asia Pacific" } },
    },
    {
      id: "latin-america",
      label: "Latin America",
      filterModel: { region: { type: "equals", filter: "Latin America" } },
    },
  ];

  const updateKPIs = useCallback(() => {
    if (!gridApi) return;

    let totalRevenue = 0;
    let orderCount = 0;
    let completedOrders = 0;

    gridApi.forEachNodeAfterFilter((node: any) => {
      totalRevenue += node.data.amount;
      orderCount++;
      if (node.data.status === "Completed") {
        completedOrders++;
      }
    });

    setKpiData({
      totalRevenue,
      orderCount,
      avgOrderValue: orderCount > 0 ? totalRevenue / orderCount : 0,
      completionRate: orderCount > 0 ? (completedOrders / orderCount) * 100 : 0,
    });
  }, [gridApi]);

  useEffect(() => {
    if (gridApi) {
      updateKPIs();
    }
  }, [gridApi, updateKPIs]);

  const onGridReady = (params: any) => {
    setGridApi(params.api);
  };

  const onFilterChanged = () => {
    updateKPIs();
  };

  return (
    <div className="sales-dashboard">
      <div className="dashboard-header">
        <h3>Sales Performance Dashboard</h3>
        <div className="preset-filters">
          <QuickFilterDropdown
            columnId="orderDate"
            options={quarterlyPresets}
            api={gridApi}
            placeholder="Select Quarter"
            onFilterChange={(option: any) =>
              setSelectedQuarter(option?.value || "")
            }
          />
          <QuickFilterDropdown
            columnId="region"
            options={regionPresets}
            api={gridApi}
            placeholder="Select Region"
          />
        </div>
      </div>

      <div className="kpi-section">
        <div className="kpi-card">
          <h4>Total Revenue</h4>
          <div className="kpi-value">
            ${kpiData.totalRevenue?.toLocaleString() || "0"}
          </div>
          <div className="kpi-trend positive">↑ 12.5%</div>
        </div>
        <div className="kpi-card">
          <h4>Orders</h4>
          <div className="kpi-value">{kpiData.orderCount || 0}</div>
          <div className="kpi-trend positive">↑ 8.3%</div>
        </div>
        <div className="kpi-card">
          <h4>Avg Order Value</h4>
          <div className="kpi-value">
            ${Math.round(kpiData.avgOrderValue || 0).toLocaleString()}
          </div>
          <div className="kpi-trend negative">↓ 2.1%</div>
        </div>
        <div className="kpi-card">
          <h4>Completion Rate</h4>
          <div className="kpi-value">
            {(kpiData.completionRate || 0).toFixed(1)}%
          </div>
          <div className="kpi-trend positive">↑ 5.7%</div>
        </div>
      </div>

      {gridApi && (
        <ActiveFilters api={gridApi} filterModel={gridApi.getFilterModel()} />
      )}

      <div
        className="ag-theme-alpine"
        style={{ height: 400, width: "100%", marginTop: "1rem" }}
      >
        <AgGridReact
          rowData={salesData}
          columnDefs={columnDefs}
          onGridReady={onGridReady}
          onFilterChanged={onFilterChanged}
          animateRows={true}
          defaultColDef={{
            sortable: true,
            resizable: true,
            filter: true,
          }}
        />
      </div>
    </div>
  );
};

// Task Manager Example
const TaskManager: React.FC = () => {
  const [gridApi, setGridApi] = useState<any>(null);
  const [tasksData] = useState(() => generateTasksData(150));
  const [viewMode, setViewMode] = useState<"list" | "kanban">("list");

  const columnDefs: ColDef[] = [
    {
      field: "taskId",
      headerName: "ID",
      width: 80,
      cellClass: "task-id-cell",
    },
    {
      field: "title",
      headerName: "Task Title",
      flex: 1,
      cellRenderer: (params: any) => {
        const priorityClass = `priority-${params.data.priority.toLowerCase()}`;
        return `<div class="task-title ${priorityClass}">${params.value}</div>`;
      },
    },
    { field: "assignee", headerName: "Assignee", width: 150 },
    { field: "priority", headerName: "Priority", width: 100 },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      cellRenderer: (params: any) => {
        const statusClass = `status-${params.value.toLowerCase().replace(" ", "-")}`;
        return `<span class="status-badge ${statusClass}">${params.value}</span>`;
      },
    },
    {
      field: "dueDate",
      headerName: "Due Date",
      width: 120,
      filter: "agDateColumnFilter",
      valueFormatter: (params) => new Date(params.value).toLocaleDateString(),
      cellClass: (params) => {
        const dueDate = new Date(params.value);
        const today = new Date();
        const diffDays = Math.ceil(
          (dueDate.getTime() - today.getTime()) / (1000 * 3600 * 24),
        );
        if (diffDays < 0) return "overdue";
        if (diffDays <= 3) return "due-soon";
        return "";
      },
    },
    {
      field: "tags",
      headerName: "Tags",
      width: 200,
      cellRenderer: (params: any) => {
        if (!params.value) return "";
        return params.value
          .map((tag: string) => `<span class="task-tag">${tag}</span>`)
          .join(" ");
      },
    },
  ];

  const taskPresets = [
    {
      id: "my-tasks",
      label: "My Tasks",
      filterModel: { assignee: { type: "equals", filter: "Current User" } },
    },
    {
      id: "overdue",
      label: "Overdue",
      filterModel: {
        dueDate: {
          type: "before",
          mode: "relative",
          expressionFrom: "Today",
          filterType: "date",
        },
        status: { type: "notEqual", filter: "Completed" },
      },
    },
    {
      id: "high-priority",
      label: "High Priority",
      filterModel: { priority: { type: "equals", filter: "High" } },
    },
    {
      id: "in-progress",
      label: "In Progress",
      filterModel: { status: { type: "equals", filter: "In Progress" } },
    },
    {
      id: "due-this-week",
      label: "Due This Week",
      filterModel: {
        dueDate: {
          type: "inRange",
          mode: "relative",
          expressionFrom: "Today",
          expressionTo: "Today+7d",
          filterType: "date",
        },
      },
    },
  ];

  const onGridReady = (params: any) => {
    setGridApi(params.api);
  };

  const getTaskStats = () => {
    if (!gridApi) return { todo: 0, inProgress: 0, completed: 0, overdue: 0 };

    const stats = { todo: 0, inProgress: 0, completed: 0, overdue: 0 };
    const today = new Date();

    gridApi.forEachNodeAfterFilter((node: any) => {
      switch (node.data.status) {
        case "To Do":
          stats.todo++;
          break;
        case "In Progress":
          stats.inProgress++;
          break;
        case "Completed":
          stats.completed++;
          break;
      }

      if (
        new Date(node.data.dueDate) < today &&
        node.data.status !== "Completed"
      ) {
        stats.overdue++;
      }
    });

    return stats;
  };

  const stats = getTaskStats();

  return (
    <div className="task-manager">
      <div className="task-header">
        <h3>Task Management System</h3>
        <div className="task-controls">
          <QuickFilterDropdown
            columnId="multiple"
            options={taskPresets}
            api={gridApi}
            placeholder="Quick Filters"
          />
          <div className="view-toggle">
            <button
              className={viewMode === "list" ? "active" : ""}
              onClick={() => setViewMode("list")}
            >
              List View
            </button>
            <button
              className={viewMode === "kanban" ? "active" : ""}
              onClick={() => setViewMode("kanban")}
            >
              Kanban View
            </button>
          </div>
        </div>
      </div>

      <div className="task-stats">
        <div className="stat-card">
          <span className="stat-label">To Do</span>
          <span className="stat-value">{stats.todo}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">In Progress</span>
          <span className="stat-value">{stats.inProgress}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Completed</span>
          <span className="stat-value">{stats.completed}</span>
        </div>
        <div className="stat-card overdue">
          <span className="stat-label">Overdue</span>
          <span className="stat-value">{stats.overdue}</span>
        </div>
      </div>

      {gridApi && (
        <ActiveFilters api={gridApi} filterModel={gridApi.getFilterModel()} />
      )}

      {viewMode === "list" ? (
        <div
          className="ag-theme-alpine"
          style={{ height: 400, width: "100%", marginTop: "1rem" }}
        >
          <AgGridReact
            rowData={tasksData}
            columnDefs={columnDefs}
            onGridReady={onGridReady}
            animateRows={true}
            defaultColDef={{
              sortable: true,
              resizable: true,
              filter: true,
            }}
          />
        </div>
      ) : (
        <div className="kanban-view">
          <div className="kanban-column">
            <h4>To Do</h4>
            <div className="kanban-cards">
              {tasksData
                .filter((t) => t.status === "To Do")
                .slice(0, 5)
                .map((task) => (
                  <div key={task.taskId} className="kanban-card">
                    <div className="task-title">{task.title}</div>
                    <div className="task-meta">
                      <span>{task.assignee}</span>
                      <span
                        className={`priority-${task.priority.toLowerCase()}`}
                      >
                        {task.priority}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className="kanban-column">
            <h4>In Progress</h4>
            <div className="kanban-cards">
              {tasksData
                .filter((t) => t.status === "In Progress")
                .slice(0, 5)
                .map((task) => (
                  <div key={task.taskId} className="kanban-card">
                    <div className="task-title">{task.title}</div>
                    <div className="task-meta">
                      <span>{task.assignee}</span>
                      <span
                        className={`priority-${task.priority.toLowerCase()}`}
                      >
                        {task.priority}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className="kanban-column">
            <h4>Completed</h4>
            <div className="kanban-cards">
              {tasksData
                .filter((t) => t.status === "Completed")
                .slice(0, 5)
                .map((task) => (
                  <div key={task.taskId} className="kanban-card completed">
                    <div className="task-title">{task.title}</div>
                    <div className="task-meta">
                      <span>{task.assignee}</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Analytics Platform Example
const AnalyticsPlatform: React.FC = () => {
  const [gridApi, setGridApi] = useState<any>(null);
  const [analyticsData] = useState(() => generateAnalyticsData(500));
  const [selectedMetric, setSelectedMetric] = useState<string>("pageViews");

  const columnDefs: ColDef[] = [
    {
      field: "date",
      headerName: "Date",
      width: 120,
      filter: "agDateColumnFilter",
      valueFormatter: (params) => new Date(params.value).toLocaleDateString(),
    },
    { field: "source", headerName: "Traffic Source", width: 150 },
    { field: "campaign", headerName: "Campaign", width: 180 },
    { field: "device", headerName: "Device", width: 100 },
    { field: "country", headerName: "Country", width: 120 },
    {
      field: "pageViews",
      headerName: "Page Views",
      width: 120,
      filter: "agNumberColumnFilter",
      valueFormatter: (params) => params.value.toLocaleString(),
    },
    {
      field: "sessions",
      headerName: "Sessions",
      width: 100,
      filter: "agNumberColumnFilter",
      valueFormatter: (params) => params.value.toLocaleString(),
    },
    {
      field: "conversionRate",
      headerName: "Conv. Rate",
      width: 120,
      filter: "agNumberColumnFilter",
      valueFormatter: (params) => `${params.value.toFixed(2)}%`,
      cellClass: (params) => {
        if (params.value > 5) return "high-conversion";
        if (params.value < 2) return "low-conversion";
        return "";
      },
    },
    {
      field: "revenue",
      headerName: "Revenue",
      width: 120,
      filter: "agNumberColumnFilter",
      valueFormatter: (params) => `$${params.value.toLocaleString()}`,
    },
  ];

  const analyticsPresets = [
    {
      id: "last-7-days",
      label: "Last 7 Days",
      filterModel: {
        date: {
          type: "after",
          mode: "relative",
          expressionFrom: "Today-7d",
          filterType: "date",
        },
      },
    },
    {
      id: "last-30-days",
      label: "Last 30 Days",
      filterModel: {
        date: {
          type: "after",
          mode: "relative",
          expressionFrom: "Today-30d",
          filterType: "date",
        },
      },
    },
    {
      id: "high-converting",
      label: "High Converting",
      filterModel: {
        conversionRate: {
          filterType: "number",
          type: "greaterThan",
          filter: 5,
        },
      },
    },
    {
      id: "mobile-traffic",
      label: "Mobile Traffic",
      filterModel: {
        device: { type: "equals", filter: "Mobile" },
      },
    },
    {
      id: "paid-campaigns",
      label: "Paid Campaigns",
      filterModel: {
        source: { type: "contains", filter: "paid" },
      },
    },
  ];

  const onGridReady = (params: any) => {
    setGridApi(params.api);
  };

  const getMetricTotals = () => {
    if (!gridApi) return {};

    const totals: any = {
      pageViews: 0,
      sessions: 0,
      revenue: 0,
      avgConversionRate: 0,
    };

    let rowCount = 0;
    let totalConversionRate = 0;

    gridApi.forEachNodeAfterFilter((node: any) => {
      totals.pageViews += node.data.pageViews;
      totals.sessions += node.data.sessions;
      totals.revenue += node.data.revenue;
      totalConversionRate += node.data.conversionRate;
      rowCount++;
    });

    totals.avgConversionRate =
      rowCount > 0 ? totalConversionRate / rowCount : 0;

    return totals;
  };

  const metrics = getMetricTotals();

  return (
    <div className="analytics-platform">
      <div className="analytics-header">
        <h3>Web Analytics Platform</h3>
        <div className="analytics-controls">
          <QuickFilterDropdown
            columnId="multiple"
            options={analyticsPresets}
            api={gridApi}
            placeholder="Date Range & Segments"
          />
          <select
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e.target.value)}
            className="metric-selector"
          >
            <option value="pageViews">Page Views</option>
            <option value="sessions">Sessions</option>
            <option value="conversionRate">Conversion Rate</option>
            <option value="revenue">Revenue</option>
          </select>
        </div>
      </div>

      <div className="metrics-summary">
        <div className="metric-card primary">
          <h4>Total Page Views</h4>
          <div className="metric-value">
            {metrics.pageViews?.toLocaleString() || "0"}
          </div>
          <div className="metric-chart">📊</div>
        </div>
        <div className="metric-card">
          <h4>Sessions</h4>
          <div className="metric-value">
            {metrics.sessions?.toLocaleString() || "0"}
          </div>
          <div className="metric-change positive">+15.3%</div>
        </div>
        <div className="metric-card">
          <h4>Avg Conversion Rate</h4>
          <div className="metric-value">
            {(metrics.avgConversionRate || 0).toFixed(2)}%
          </div>
          <div className="metric-change positive">+2.1%</div>
        </div>
        <div className="metric-card accent">
          <h4>Total Revenue</h4>
          <div className="metric-value">
            ${metrics.revenue?.toLocaleString() || "0"}
          </div>
          <div className="metric-change positive">+23.7%</div>
        </div>
      </div>

      {gridApi && (
        <ActiveFilters api={gridApi} filterModel={gridApi.getFilterModel()} />
      )}

      <div
        className="ag-theme-alpine"
        style={{ height: 400, width: "100%", marginTop: "1rem" }}
      >
        <AgGridReact
          rowData={analyticsData}
          columnDefs={columnDefs}
          onGridReady={onGridReady}
          animateRows={true}
          defaultColDef={{
            sortable: true,
            resizable: true,
            filter: true,
          }}
        />
      </div>
    </div>
  );
};

// Helper functions to generate realistic data
function generateSalesData(count: number) {
  const products = [
    "Laptop Pro",
    "Smartphone X",
    "Tablet Plus",
    "Smart Watch",
    "Wireless Earbuds",
  ];
  const regions = ["North America", "Europe", "Asia Pacific", "Latin America"];
  const salesReps = [
    "John Smith",
    "Sarah Johnson",
    "Mike Chen",
    "Emily Davis",
    "Carlos Rodriguez",
  ];
  const statuses = ["Pending", "In Progress", "Completed", "Cancelled"];

  return Array.from({ length: count }, (_, i) => ({
    orderId: `ORD-${String(i + 1).padStart(5, "0")}`,
    customerName: `Customer ${i + 1}`,
    product: products[Math.floor(Math.random() * products.length)],
    region: regions[Math.floor(Math.random() * regions.length)],
    orderDate: new Date(
      2024,
      Math.floor(Math.random() * 12),
      Math.floor(Math.random() * 28) + 1,
    ),
    amount: Math.floor(Math.random() * 50000) + 1000,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    salesRep: salesReps[Math.floor(Math.random() * salesReps.length)],
  }));
}

function generateTasksData(count: number) {
  const priorities = ["Low", "Medium", "High"];
  const statuses = ["To Do", "In Progress", "Completed", "On Hold"];
  const assignees = [
    "Current User",
    "Jane Doe",
    "Bob Wilson",
    "Alice Brown",
    "Tom Harris",
  ];
  const tags = [
    "frontend",
    "backend",
    "bug",
    "feature",
    "documentation",
    "testing",
  ];

  return Array.from({ length: count }, (_, i) => ({
    taskId: `T-${String(i + 1).padStart(4, "0")}`,
    title: `Task ${i + 1}: ${["Implement feature", "Fix bug", "Update documentation", "Write tests"][Math.floor(Math.random() * 4)]}`,
    assignee: assignees[Math.floor(Math.random() * assignees.length)],
    priority: priorities[Math.floor(Math.random() * priorities.length)],
    status: statuses[Math.floor(Math.random() * statuses.length)],
    dueDate: new Date(
      Date.now() + (Math.random() - 0.3) * 30 * 24 * 60 * 60 * 1000,
    ),
    tags: Array.from(
      { length: Math.floor(Math.random() * 3) + 1 },
      () => tags[Math.floor(Math.random() * tags.length)],
    ),
  }));
}

function generateAnalyticsData(count: number) {
  const sources = [
    "Organic",
    "Paid Search",
    "Social Media",
    "Direct",
    "Referral",
    "Email",
  ];
  const campaigns = [
    "Summer Sale",
    "Black Friday",
    "New Product Launch",
    "Brand Awareness",
    "Retargeting",
  ];
  const devices = ["Desktop", "Mobile", "Tablet"];
  const countries = [
    "USA",
    "UK",
    "Canada",
    "Germany",
    "France",
    "Japan",
    "Australia",
  ];

  return Array.from({ length: count }, () => ({
    date: new Date(
      Date.now() - Math.floor(Math.random() * 90) * 24 * 60 * 60 * 1000,
    ),
    source: sources[Math.floor(Math.random() * sources.length)],
    campaign: campaigns[Math.floor(Math.random() * campaigns.length)],
    device: devices[Math.floor(Math.random() * devices.length)],
    country: countries[Math.floor(Math.random() * countries.length)],
    pageViews: Math.floor(Math.random() * 10000) + 100,
    sessions: Math.floor(Math.random() * 5000) + 50,
    conversionRate: Math.random() * 10,
    revenue: Math.floor(Math.random() * 100000) + 1000,
  }));
}

const RealWorldExamples: React.FC = () => {
  return (
    <div className={styles.exampleContainer}>
      <Tabs>
        <TabList>
          <Tab>Sales Dashboard</Tab>
          <Tab>Task Manager</Tab>
          <Tab>Analytics Platform</Tab>
        </TabList>

        <TabPanel>
          <SalesDashboard />
        </TabPanel>

        <TabPanel>
          <TaskManager />
        </TabPanel>

        <TabPanel>
          <AnalyticsPlatform />
        </TabPanel>
      </Tabs>

      <div className={styles.features} style={{ marginTop: "2rem" }}>
        <h4>Real-World Implementation Features</h4>
        <ul>
          <li>✅ Industry-specific preset configurations</li>
          <li>✅ KPI tracking with live filter updates</li>
          <li>✅ Multiple view modes (List/Kanban)</li>
          <li>✅ Visual indicators for data insights</li>
          <li>✅ Responsive dashboard layouts</li>
          <li>✅ Performance-optimized for large datasets</li>
          <li>✅ Cross-functional filter presets</li>
          <li>✅ Export-ready analytics data</li>
        </ul>
      </div>
    </div>
  );
};

export default RealWorldExamples;
