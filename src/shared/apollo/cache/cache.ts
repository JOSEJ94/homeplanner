import {InMemoryCache, makeVar} from '@apollo/client';
import {TaskFilter} from '../../models/TaskFilter';
import {RoomFilterDto} from '../../models/RoomFilterDto';

export const DEFAULT_TASK_FILTER: TaskFilter<RoomFilterDto> = {
  selectedOptions: [{id: '-', name: 'All'}],
};

export const taskFilterVar =
  makeVar<TaskFilter<RoomFilterDto>>(DEFAULT_TASK_FILTER);

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        taskFilter: {
          read() {
            return taskFilterVar();
          },
        },
      },
    },
  },
});
