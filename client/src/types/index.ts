export type TaskStatusType = "Open" | "In-progress" | "Resolved" | "Closed";
export type PriorityType = "Low" | "Medium" | "High";
export type StoryPointType = 1 | 2 | 3 | 5 | 8 | 13 | 21;

export interface TaskItem {
  projectId: string;
  taskId: string;
  title: string;
  description: string;
  taskStatus: TaskStatusType;
  storyPoint: StoryPointType;
  startDate: number;
  dueDate: number;
  priority: PriorityType;
}

interface KanbanColumn {
  label: TaskStatusType;
  table: TaskItem[];
}

export type KanbanBoardType = {
  [status in TaskStatusType]: KanbanColumn;
};
