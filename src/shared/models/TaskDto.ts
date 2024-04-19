import {TaskSchedule} from '../../graphql/generated';
import {RoomDto} from './RoomDto';
import {SubtaskDto} from './SubTaskDto';

export interface TaskDto {
  id: string;
  title: string;
  description?: string | null;
  scheduleType: TaskSchedule;
  assignedTo?: any[];
  randomlyAssigned: boolean;
  subtasks?: SubtaskDto[];
  completionDate?: Date;
  room: RoomDto;
}
