export interface RowData {
  id: number;
  name: string;
  date: Date;
  dateString: string;
  dueDate: Date;
  dueDateString: string;
  category: string;
  priority: string;
  status: string;
  isPast: boolean;
  isToday: boolean;
  isUpcoming: boolean;
  value: number;
}

export type Category = "Task" | "Meeting" | "Event" | "Reminder" | "Deadline";
export type Priority = "Low" | "Medium" | "High" | "Urgent";
export type Status =
  | "Pending"
  | "In Progress"
  | "Completed"
  | "Cancelled"
  | "Delayed";
