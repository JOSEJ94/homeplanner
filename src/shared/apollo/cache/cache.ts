import {InMemoryCache, makeVar} from '@apollo/client';
import {TaskFilter} from '../../models/TaskFilter';
import {RoomFilterDto} from '../../models/RoomFilterDto';
import {
  AddMemberMutation,
  CreateRoomMutation,
  DeleteRoomMutation,
  GetGroupsDocument,
  GetGroupsQuery,
  GetRoomsDocument,
  GetRoomsQuery,
  GroupMemberFragment,
  GroupMemberFragmentDoc,
  RoomFragment,
  RoomFragmentDoc,
} from '../../../graphql/generated';
import {HomeFilterDto} from '../../models/HomeFilterDto';

export const DEFAULT_TASK_FILTER: TaskFilter<RoomFilterDto> = {
  selectedOptions: [{id: '-', name: 'All'}],
};
export const DEFAULT_SELECTED_HOME: HomeFilterDto = {selected: undefined};

export const taskFilterVar =
  makeVar<TaskFilter<RoomFilterDto>>(DEFAULT_TASK_FILTER);
export const selectedHomeGroupVar = makeVar<HomeFilterDto>(
  DEFAULT_SELECTED_HOME,
);

export const cache = new InMemoryCache({
  typePolicies: {
    GroupMember: {
      keyFields: ['user', 'groupId'],
    },
    Query: {
      fields: {
        taskFilter: {
          read() {
            return taskFilterVar();
          },
        },
        homeFilter: {
          read() {
            return selectedHomeGroupVar();
          },
        },
      },
    },
    Mutation: {
      fields: {
        createRoom: {
          merge(_: CreateRoomMutation, incoming: CreateRoomMutation, {cache}) {
            const roomId = cache.identify(incoming);
            const newRoom = cache.readFragment({
              fragment: RoomFragmentDoc,
              id: roomId,
            });

            // Update rooms list in home screen
            const getGroupsQuery = cache.readQuery({
              query: GetGroupsDocument,
            });
            if (getGroupsQuery) {
              const firstGroup = getGroupsQuery.getGroups[0];
              const firstGroupRooms: RoomFragment[] = firstGroup.rooms;
              const updatedQuery: GetGroupsQuery = {
                ...getGroupsQuery,
                getGroups: [
                  {
                    ...firstGroup,
                    rooms: [...firstGroupRooms, newRoom!],
                  },
                ],
              };

              cache.writeQuery({
                query: GetGroupsDocument,
                data: updatedQuery,
              });
            }

            // Update getRoomsQuery
            const getRoomsQuery = cache.readQuery({
              query: GetRoomsDocument,
            });
            if (getRoomsQuery) {
              const updateRoomsQuery: GetRoomsQuery = {
                ...getRoomsQuery,
                getRooms: [...getRoomsQuery.getRooms, newRoom!],
              };
              cache.writeQuery({
                query: GetRoomsDocument,
                data: updateRoomsQuery,
              });
            }

            return incoming;
          },
        },
        deleteRoom: {
          merge(_: DeleteRoomMutation, incoming: DeleteRoomMutation, {cache}) {
            const roomId = cache.identify(incoming);
            const deletedRoom = cache.readFragment({
              fragment: RoomFragmentDoc,
              id: roomId,
            });

            // Remove room from room list in home screen
            const getGroupsQuery = cache.readQuery({
              query: GetGroupsDocument,
            });

            if (getGroupsQuery && deletedRoom) {
              const firstGroup = getGroupsQuery.getGroups[0];
              const firstGroupRooms: RoomFragment[] = firstGroup.rooms;

              const updatedQuery: GetGroupsQuery = {
                ...getGroupsQuery,
                getGroups: [
                  {
                    ...firstGroup,
                    rooms: firstGroupRooms.filter(r => r.id !== deletedRoom.id),
                  },
                ],
              };
              cache.writeQuery({
                query: GetGroupsDocument,
                data: updatedQuery,
              });
            }

            // Remove room from room list in task template filter
            const getRoomsQuery = cache.readQuery({
              query: GetRoomsDocument,
            });
            if (getRoomsQuery && deletedRoom) {
              const updateRoomsQuery: GetRoomsQuery = {
                ...getRoomsQuery,
                getRooms: getRoomsQuery.getRooms.filter(
                  room => room.id !== deletedRoom.id,
                ),
              };
              cache.writeQuery({
                query: GetRoomsDocument,
                data: updateRoomsQuery,
              });
            }

            return incoming;
          },
        },
        addMember: {
          merge(_: AddMemberMutation, incoming: AddMemberMutation, {cache}) {
            const memberId = cache.identify(incoming);
            const invitedMember = cache.readFragment({
              fragment: GroupMemberFragmentDoc,
              id: memberId,
            });

            // Update member list on groups query
            const getGroupsQuery = cache.readQuery({
              query: GetGroupsDocument,
            });
            if (getGroupsQuery && invitedMember) {
              const firstGroup = getGroupsQuery.getGroups[0];
              const firstGroupMembers: GroupMemberFragment[] =
                firstGroup.members;
              const updatedQuery: GetGroupsQuery = {
                ...getGroupsQuery,
                getGroups: [
                  {
                    ...firstGroup,
                    members: [...firstGroupMembers, invitedMember],
                  },
                ],
              };
              cache.writeQuery({
                query: GetGroupsDocument,
                data: updatedQuery,
              });
            }

            return incoming;
          },
        },
      },
    },
  },
});
