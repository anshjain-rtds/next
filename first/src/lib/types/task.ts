// lib/types/task.ts
export enum TaskStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}

export interface CreateTaskData {
  title: string;
  description: string;
}

export interface UpdateTaskData {
  title?: string;
  description?: string;
  status?: TaskStatus;
}