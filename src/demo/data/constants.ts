import { Category, Priority, Status } from "./types";

export const CATEGORIES: Category[] = [
  "Bug",
  "Feature",
  "Documentation",
  "Refactor",
  "Testing",
  "DevOps",
  "Security",
  "Performance",
];

export const PRIORITIES: Priority[] = ["Low", "Medium", "High", "Critical"];

export const STATUSES: Status[] = [
  "Backlog",
  "Todo",
  "In Progress",
  "In Review",
  "Testing",
  "Done",
  "Blocked",
];

export const ASSIGNEES = [
  "Alex Chen",
  "Sarah Johnson",
  "Marcus Williams",
  "Emma Davis",
  "James Wilson",
  "Maya Patel",
  "Chris Martinez",
  "Olivia Brown",
  "David Lee",
  "Sophia Taylor",
  "Michael Anderson",
  "Isabella Garcia",
  "Ryan Thomas",
  "Priya Sharma",
  "John Robinson",
  "Amanda White",
  "Kevin Zhang",
  "Emily Jackson",
  "Daniel Kim",
  "Jessica Lopez",
];

export const CATEGORY_STYLES = {
  Bug: "bg-red-50 text-red-800",
  Feature: "bg-green-50 text-green-800",
  Documentation: "bg-blue-50 text-blue-800",
  Refactor: "bg-purple-50 text-purple-800",
  Testing: "bg-yellow-50 text-yellow-800",
  DevOps: "bg-gray-50 text-gray-800",
  Security: "bg-orange-50 text-orange-800",
  Performance: "bg-indigo-50 text-indigo-800",
} as const;

export const PRIORITY_STYLES = {
  Low: "text-gray-600",
  Medium: "text-blue-600",
  High: "text-orange-600 font-semibold",
  Critical: "text-red-600 font-bold",
} as const;

export const STATUS_STYLES = {
  Backlog: "text-gray-600",
  Todo: "text-yellow-600",
  "In Progress": "text-blue-600",
  "In Review": "text-purple-600",
  Testing: "text-orange-600",
  Done: "text-green-600",
  Blocked: "text-red-600 font-semibold",
} as const;
