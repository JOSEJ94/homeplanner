export interface TaskFilter<T> {
  selectedOptions: T[];
}

export type TaskFilters<T> = TaskFilter<T>[];
