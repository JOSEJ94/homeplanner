import {SubtaskDto} from './SubTaskDto';

export interface TaskDto {
  id: string;
  title: string;
  description?: string;
  category?: string;
  categoryId?: string;
  schedule: {
    type: 'once' | 'daily' | 'weekly' | 'monthly'; // Add more options as needed
    interval?: number; // Interval for weekly or monthly tasks
    specificDay?: string; // For tasks scheduled on specific day of week/month
  };
  assignedTo?: string[]; // Array of user IDs assigned to this task
  randomlyAssigned: boolean;
  subtasks?: SubtaskDto[];
  completionDate?: Date;
}
