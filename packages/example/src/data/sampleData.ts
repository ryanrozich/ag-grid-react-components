export interface Task {
  id: number;
  title: string;
  status: string;
  priority: string;
  dueDate: Date;
  assignee: string;
  progress: number;
  budget: number;
}

export const generateTasks = (count: number = 100): Task[] => {
  const statuses = ["Todo", "In Progress", "In Review", "Done", "Blocked"];
  const priorities = ["Low", "Medium", "High", "Critical"];
  const assignees = [
    "John Doe",
    "Jane Smith",
    "Bob Johnson",
    "Alice Brown",
    "Charlie Wilson",
  ];

  const tasks: Task[] = [];
  const today = new Date();

  for (let i = 0; i < count; i++) {
    const daysOffset = Math.floor(Math.random() * 180) - 90; // -90 to +90 days
    const dueDate = new Date(today);
    dueDate.setDate(today.getDate() + daysOffset);

    tasks.push({
      id: i + 1,
      title: `Task ${i + 1}: ${getRandomTaskTitle()}`,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      priority: priorities[Math.floor(Math.random() * priorities.length)],
      dueDate,
      assignee: assignees[Math.floor(Math.random() * assignees.length)],
      progress: Math.floor(Math.random() * 101),
      budget: Math.floor(Math.random() * 50000) + 1000,
    });
  }

  return tasks;
};

function getRandomTaskTitle(): string {
  const titles = [
    "Update documentation",
    "Fix bug in production",
    "Implement new feature",
    "Code review",
    "Write unit tests",
    "Optimize performance",
    "Update dependencies",
    "Deploy to staging",
    "Customer support ticket",
    "Team meeting",
    "Sprint planning",
    "Database migration",
    "Security audit",
    "API integration",
    "UI improvements",
  ];

  return titles[Math.floor(Math.random() * titles.length)];
}
