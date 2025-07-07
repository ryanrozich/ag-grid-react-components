export interface RowData {
  id: string; // Changed from number to string for task IDs like "UI-1234"
  name: string;
  date: Date;
  dateString: string;
  dueDate: Date;
  dueDateString: string;
  category: string;
  priority: string;
  status: string;
  assignee: string;
  isPast: boolean;
  isToday: boolean;
  isUpcoming: boolean;
  value: number;
  percentDelivered: number;
  amountDelivered: number;
}

export type Category =
  | "Bug"
  | "Feature"
  | "Documentation"
  | "Refactor"
  | "Testing"
  | "DevOps"
  | "Security"
  | "Performance";
export type Priority = "Low" | "Medium" | "High" | "Critical";
export type Status =
  | "Backlog"
  | "Todo"
  | "In Progress"
  | "In Review"
  | "Testing"
  | "Done"
  | "Blocked";
