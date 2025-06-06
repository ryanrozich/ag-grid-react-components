import { Category, Priority, Status } from "./types";

export const CATEGORIES: Category[] = ["Task", "Meeting", "Event", "Reminder", "Deadline"];
export const PRIORITIES: Priority[] = ["Low", "Medium", "High", "Urgent"];
export const STATUSES: Status[] = ["Pending", "In Progress", "Completed", "Cancelled", "Delayed"];

export const CATEGORY_STYLES = {
  Task: "bg-blue-50 text-blue-800",
  Meeting: "bg-purple-50 text-purple-800",
  Event: "bg-green-50 text-green-800",
  Reminder: "bg-yellow-50 text-yellow-800",
  Deadline: "bg-red-50 text-red-800",
} as const;

export const PRIORITY_STYLES = {
  Low: "text-gray-600",
  Medium: "text-blue-600",
  High: "text-orange-600 font-semibold",
  Urgent: "text-red-600 font-bold",
} as const;

export const STATUS_STYLES = {
  Pending: "text-yellow-600",
  "In Progress": "text-blue-600",
  Completed: "text-green-600",
  Cancelled: "text-gray-400 line-through",
  Delayed: "text-red-600",
} as const;