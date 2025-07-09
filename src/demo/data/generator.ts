import { addDays, format, subDays } from "date-fns";
import { RowData } from "./types";
import { CATEGORIES, PRIORITIES, STATUSES, ASSIGNEES } from "./constants";

// Realistic task name templates for each category
const TASK_TEMPLATES = {
  Bug: [
    "Fix login form validation error",
    "Resolve memory leak in data grid",
    "Debug crash on mobile Safari",
    "Fix date picker timezone issue",
    "Correct CSS overflow in sidebar",
    "Handle null pointer exception in API client",
    "Fix infinite scroll pagination bug",
    "Resolve race condition in state update",
    "Debug WebSocket connection timeout",
    "Fix broken unit tests in CI pipeline",
    "Correct data corruption in cache layer",
    "Fix responsive layout on tablets",
    "Debug performance regression in search",
    "Resolve CORS issue with external API",
    "Fix broken deep links in navigation",
  ],
  Feature: [
    "Implement dark mode toggle",
    "Add export to PDF functionality",
    "Create user profile dashboard",
    "Build real-time notifications system",
    "Implement two-factor authentication",
    "Add drag-and-drop file upload",
    "Create advanced search filters",
    "Build analytics dashboard",
    "Implement social media sharing",
    "Add multi-language support",
    "Create batch operations feature",
    "Build custom report generator",
    "Implement OAuth integration",
    "Add keyboard shortcuts",
    "Create data visualization charts",
  ],
  Documentation: [
    "Update API documentation",
    "Write deployment guide",
    "Document new filter components",
    "Create onboarding tutorial",
    "Update README with examples",
    "Write migration guide for v2",
    "Document error handling patterns",
    "Create architecture overview",
    "Write testing best practices",
    "Update contribution guidelines",
    "Document security protocols",
    "Create troubleshooting guide",
    "Write performance optimization tips",
    "Document component props",
    "Create video tutorials",
  ],
  Refactor: [
    "Migrate to TypeScript strict mode",
    "Extract shared utilities module",
    "Refactor authentication flow",
    "Optimize database queries",
    "Modernize legacy jQuery code",
    "Split monolithic components",
    "Update to React 18 patterns",
    "Refactor state management",
    "Clean up deprecated APIs",
    "Consolidate duplicate code",
    "Migrate to new testing framework",
    "Refactor error handling",
    "Update to ES6 modules",
    "Simplify complex conditionals",
    "Extract business logic layer",
  ],
  Testing: [
    "Write unit tests for auth module",
    "Add E2E tests for checkout flow",
    "Create integration test suite",
    "Test cross-browser compatibility",
    "Add performance benchmarks",
    "Write accessibility tests",
    "Create load testing scenarios",
    "Test error boundary behavior",
    "Add visual regression tests",
    "Write API contract tests",
    "Test offline functionality",
    "Create security penetration tests",
    "Add internationalization tests",
    "Write component snapshot tests",
    "Test mobile responsiveness",
  ],
  DevOps: [
    "Set up CI/CD pipeline",
    "Configure Docker containers",
    "Implement auto-scaling",
    "Set up monitoring alerts",
    "Create backup automation",
    "Configure load balancer",
    "Implement blue-green deployment",
    "Set up log aggregation",
    "Create disaster recovery plan",
    "Configure CDN distribution",
    "Implement secrets management",
    "Set up staging environment",
    "Create deployment rollback",
    "Configure health checks",
    "Set up infrastructure as code",
  ],
  Security: [
    "Implement rate limiting",
    "Add input sanitization",
    "Set up SSL certificates",
    "Implement CSRF protection",
    "Add SQL injection prevention",
    "Configure security headers",
    "Implement API key rotation",
    "Add encryption at rest",
    "Set up vulnerability scanning",
    "Implement session management",
    "Add brute force protection",
    "Configure firewall rules",
    "Implement secure file upload",
    "Add audit logging",
    "Set up penetration testing",
  ],
  Performance: [
    "Optimize bundle size",
    "Implement lazy loading",
    "Add database indexing",
    "Optimize image loading",
    "Implement caching strategy",
    "Reduce API call frequency",
    "Optimize render performance",
    "Add request batching",
    "Implement code splitting",
    "Optimize database queries",
    "Add CDN for static assets",
    "Implement virtual scrolling",
    "Optimize memory usage",
    "Add progressive web app features",
    "Implement service workers",
  ],
};

// Project prefixes for more realistic naming
const PROJECT_PREFIXES = [
  "PROJ",
  "APP",
  "WEB",
  "API",
  "UI",
  "CORE",
  "DATA",
  "AUTH",
  "ADMIN",
  "USER",
  "DASH",
  "MOBILE",
  "BACKEND",
  "FRONTEND",
  "INFRA",
];

// Sprint numbers
const SPRINT_NAMES = [
  "Sprint 23",
  "Sprint 24",
  "Sprint 25",
  "Sprint 26",
  "Sprint 27",
  "Q1 Goals",
  "Q2 Planning",
  "Tech Debt",
  "Security Audit",
  "Performance Sprint",
];

// Helper function to get a random item from an array
const getRandomItem = <T>(arr: T[]): T =>
  arr[Math.floor(Math.random() * arr.length)];

// Helper function to generate task ID (for separate ID column)
const generateTaskId = (index: number): string => {
  const prefix = getRandomItem(PROJECT_PREFIXES);
  const number = 1000 + index;
  return `${prefix}-${number}`;
};

// Helper function to determine status based on date and other factors
const determineStatus = (
  date: Date,
  dueDate: Date,
  category: string,
): string => {
  const today = new Date();
  const isPast = date < subDays(today, 7);
  const isOverdue = dueDate < today;

  // Critical bugs are more likely to be in progress or blocked
  if (category === "Bug" && Math.random() < 0.3) {
    return Math.random() < 0.5 ? "In Progress" : "Blocked";
  }

  // Overdue items are more likely to be blocked or still in progress
  if (isOverdue && Math.random() < 0.7) {
    return Math.random() < 0.5 ? "In Progress" : "Blocked";
  }

  // Past items are more likely to be done
  if (isPast && Math.random() < 0.7) {
    return "Done";
  }

  // Recent items have varied statuses
  if (date > subDays(today, 3)) {
    const rand = Math.random();
    if (rand < 0.3) return "Backlog";
    if (rand < 0.5) return "Todo";
    if (rand < 0.7) return "In Progress";
    if (rand < 0.85) return "In Review";
    return "Testing";
  }

  // Default random status
  return getRandomItem(STATUSES);
};

export const generateData = (count: number): RowData[] => {
  const today = new Date();
  const data: RowData[] = [];

  for (let i = 0; i < count; i++) {
    // Generate dates distributed from 3 months ago to 1 month in the future
    // with higher density around current time
    const daysOffset = Math.floor(
      Math.pow(Math.random(), 2) * 90 -
        80 + // More items in recent past
        Math.random() * 40, // Some items in future
    );
    const date = addDays(today, daysOffset);

    // Create a due date based on task type and priority
    const category = getRandomItem(CATEGORIES);
    const priority = getRandomItem(PRIORITIES);

    // Due date calculation based on priority and category
    let dueDateOffset = 1;
    if (priority === "Critical")
      dueDateOffset = Math.floor(Math.random() * 3) + 1;
    else if (priority === "High")
      dueDateOffset = Math.floor(Math.random() * 7) + 3;
    else if (priority === "Medium")
      dueDateOffset = Math.floor(Math.random() * 14) + 7;
    else dueDateOffset = Math.floor(Math.random() * 30) + 14;

    // Bugs and security issues have shorter deadlines
    if (category === "Bug" || category === "Security") {
      dueDateOffset = Math.floor(dueDateOffset * 0.5);
    }

    const dueDate = addDays(date, dueDateOffset);
    const dateString = format(date, "yyyy-MM-dd");
    const dueDateString = format(dueDate, "yyyy-MM-dd");

    // Determine temporal properties
    const isPast = date < subDays(today, 1);
    const isToday = format(date, "yyyy-MM-dd") === format(today, "yyyy-MM-dd");
    const isUpcoming = !isPast && !isToday;

    // Get task name from templates
    const taskTemplates = TASK_TEMPLATES[category];
    const taskName = getRandomItem(taskTemplates);
    const taskId = generateTaskId(i);

    // Determine status based on various factors
    const status = determineStatus(date, dueDate, category);

    // Assign team member
    const assignee = getRandomItem(ASSIGNEES);

    // Generate a monetary value between $75 and $20,000
    // Use a weighted distribution for more realistic data
    const minAmount = 75;
    const maxAmount = 20000;

    // Create a weighted distribution (more values in lower ranges)
    const random = Math.random();
    let value: number;

    if (random < 0.4) {
      // 40% between $75-$1,000
      value = Math.floor(Math.random() * (1000 - minAmount) + minAmount);
    } else if (random < 0.7) {
      // 30% between $1,000-$5,000
      value = Math.floor(Math.random() * (5000 - 1000) + 1000);
    } else if (random < 0.9) {
      // 20% between $5,000-$10,000
      value = Math.floor(Math.random() * (10000 - 5000) + 5000);
    } else {
      // 10% between $10,000-$20,000
      value = Math.floor(Math.random() * (maxAmount - 10000) + 10000);
    }

    // Round to nearest $25 for cleaner numbers
    value = Math.round(value / 25) * 25;

    // Generate percentDelivered based on status
    let percentDelivered = 0;
    switch (status) {
      case "Done":
        percentDelivered = 100;
        break;
      case "Testing":
        percentDelivered = 80 + Math.floor(Math.random() * 15); // 80-94%
        break;
      case "In Review":
        percentDelivered = 60 + Math.floor(Math.random() * 20); // 60-79%
        break;
      case "In Progress":
        percentDelivered = 20 + Math.floor(Math.random() * 40); // 20-59%
        break;
      case "Todo":
        percentDelivered = 5 + Math.floor(Math.random() * 15); // 5-19%
        break;
      case "Backlog":
        percentDelivered = 0;
        break;
      case "Blocked":
        percentDelivered = 10 + Math.floor(Math.random() * 30); // 10-39%
        break;
    }

    // Calculate amountDelivered
    const amountDelivered = Math.round((value * percentDelivered) / 100);

    // Add sprint information for some items
    const sprint = Math.random() < 0.7 ? getRandomItem(SPRINT_NAMES) : "";

    data.push({
      id: taskId, // Now using the task ID string instead of numeric index
      name: `${taskName}${sprint ? ` (${sprint})` : ""}`, // Just the task name without ID
      date,
      dateString,
      dueDate,
      dueDateString,
      category,
      priority,
      status,
      assignee,
      isPast,
      isToday,
      isUpcoming,
      value,
      percentDelivered,
      amountDelivered,
    });
  }

  // Sort by date descending (most recent first)
  return data.sort((a, b) => b.date.getTime() - a.date.getTime());
};
