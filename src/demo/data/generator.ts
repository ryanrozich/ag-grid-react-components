import { addDays, format, subDays } from "date-fns";
import { RowData } from "./types";
import { CATEGORIES, PRIORITIES, STATUSES } from "./constants";

export const generateData = (count: number): RowData[] => {
  const today = new Date();
  const data: RowData[] = [];

  for (let i = 0; i < count; i++) {
    // Generate a date between 30 days ago and 30 days in the future
    const date = addDays(today, -30 + Math.floor(Math.random() * 61));

    // Create a due date that's after the start date (between 1-14 days later)
    const dueDate = addDays(date, 1 + Math.floor(Math.random() * 14));

    // Create a date string for comparison
    const dateString = format(date, "yyyy-MM-dd");

    // Determine if it's upcoming, today, or past
    const isPast = date < subDays(today, 1);
    const isToday = format(date, "yyyy-MM-dd") === format(today, "yyyy-MM-dd");
    const isUpcoming = !isPast && !isToday;

    // Generate other properties
    const category = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
    const priority = PRIORITIES[Math.floor(Math.random() * PRIORITIES.length)];
    const status = STATUSES[Math.floor(Math.random() * STATUSES.length)];
    const value = Math.floor(Math.random() * 1000);

    data.push({
      id: i,
      name: `${category} ${i + 1}`,
      date,
      dateString,
      dueDate,
      dueDateString: format(dueDate, "yyyy-MM-dd"),
      category,
      priority,
      status,
      isPast,
      isToday,
      isUpcoming,
      value,
    });
  }

  return data;
};
