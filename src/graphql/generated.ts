import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type Group = {
  __typename?: 'Group';
  id: Scalars['ID']['output'];
  members: Array<GroupMember>;
  name: Scalars['String']['output'];
  rooms: Array<Room>;
};

export type GroupMember = {
  __typename?: 'GroupMember';
  createdAt: Scalars['DateTime']['output'];
  group: Group;
  groupId: Scalars['ID']['output'];
  role: GroupRole;
  status: GroupStatus;
  user: User;
  userId: Scalars['ID']['output'];
};

export enum GroupRole {
  Admin = 'ADMIN',
  Editor = 'EDITOR',
  Member = 'MEMBER'
}

export enum GroupStatus {
  Accepted = 'ACCEPTED',
  Invited = 'INVITED',
  Kicked = 'KICKED',
  Rejected = 'REJECTED',
  Unknown = 'UNKNOWN'
}

export enum IconType {
  Antdesign = 'ANTDESIGN',
  Fontawesome = 'FONTAWESOME'
}

export type Mutation = {
  __typename?: 'Mutation';
  addMember: GroupMember;
  createRoom: Room;
  createTaskTemplate: TaskTemplate;
  createTasksFromTemplate: Array<Task>;
  createUser: User;
  deleteRoom: Room;
  deleteTask: Task;
  deleteTaskTemplate: TaskTemplate;
  updateInviteStatus: GroupMember;
  updateRoom: Room;
  updateTaskTemplate: TaskTemplate;
  updateTasksFromTemplate: Array<Task>;
};


export type MutationAddMemberArgs = {
  groupId: Scalars['ID']['input'];
  userEmail: Scalars['String']['input'];
};


export type MutationCreateRoomArgs = {
  color: Scalars['String']['input'];
  groupId: Scalars['ID']['input'];
  iconName: Scalars['String']['input'];
  iconType: IconType;
  name: Scalars['String']['input'];
};


export type MutationCreateTaskTemplateArgs = {
  assignedTo: Array<Scalars['ID']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  endingDate?: InputMaybe<Scalars['DateTime']['input']>;
  randomlyAssign?: InputMaybe<Scalars['Boolean']['input']>;
  room: Scalars['ID']['input'];
  scheduleInterval?: InputMaybe<Scalars['Int']['input']>;
  scheduleType: TaskSchedule;
  startingDate: Scalars['DateTime']['input'];
  title: Scalars['String']['input'];
};


export type MutationCreateTasksFromTemplateArgs = {
  fromTemplate: Scalars['ID']['input'];
};


export type MutationCreateUserArgs = {
  email: Scalars['String']['input'];
  id: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};


export type MutationDeleteRoomArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteTaskArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteTaskTemplateArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdateInviteStatusArgs = {
  groupId: Scalars['ID']['input'];
  newStatus: GroupStatus;
  userId?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationUpdateRoomArgs = {
  color: Scalars['String']['input'];
  iconName: Scalars['String']['input'];
  iconType: IconType;
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
};


export type MutationUpdateTaskTemplateArgs = {
  assignedTo: Array<Scalars['ID']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  endingDate?: InputMaybe<Scalars['DateTime']['input']>;
  id: Scalars['ID']['input'];
  randomlyAssign?: InputMaybe<Scalars['Boolean']['input']>;
  room: Scalars['ID']['input'];
  scheduleInterval?: InputMaybe<Scalars['Int']['input']>;
  scheduleType: TaskSchedule;
  startingDate: Scalars['DateTime']['input'];
  title: Scalars['String']['input'];
};


export type MutationUpdateTasksFromTemplateArgs = {
  fromTemplate: Scalars['ID']['input'];
};

export type Query = {
  __typename?: 'Query';
  getGroupDetails: Group;
  getGroupMembers: Array<GroupMember>;
  getGroups: Array<Group>;
  getInvitations: Array<GroupMember>;
  getMyUser?: Maybe<User>;
  getRoomDetails: Room;
  getRooms: Array<Room>;
  getTaskDetails: Task;
  getTaskTemplateDetails: TaskTemplate;
  getTaskTemplates: Array<TaskTemplate>;
  getTasks: Array<Task>;
  users: Array<User>;
};


export type QueryGetGroupDetailsArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetGroupMembersArgs = {
  fromGroup: Scalars['ID']['input'];
};


export type QueryGetRoomDetailsArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetTaskDetailsArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetTaskTemplateDetailsArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetTaskTemplatesArgs = {
  fromRooms?: InputMaybe<Array<Scalars['ID']['input']>>;
};


export type QueryGetTasksArgs = {
  fromRooms?: InputMaybe<Array<Scalars['ID']['input']>>;
};

export type Room = {
  __typename?: 'Room';
  color: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  group: Group;
  iconName: Scalars['String']['output'];
  iconType: IconType;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  tasks: Array<Task>;
  updatedAt: Scalars['DateTime']['output'];
};

export type ServerStatus = {
  __typename?: 'ServerStatus';
  status: Scalars['String']['output'];
  timestamp: Scalars['DateTime']['output'];
};

export type SubTask = {
  __typename?: 'SubTask';
  completed: Scalars['Boolean']['output'];
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  task: Task;
  updatedAt: Scalars['DateTime']['output'];
};

export type Task = {
  __typename?: 'Task';
  assignedTo: Array<User>;
  completionDate?: Maybe<Scalars['DateTime']['output']>;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  randomlyAssigned: Scalars['Boolean']['output'];
  room: Room;
  scheduleDay?: Maybe<Scalars['DateTime']['output']>;
  scheduleInterval?: Maybe<Scalars['Int']['output']>;
  scheduleType: TaskSchedule;
  subTasks: Array<SubTask>;
  template: TaskTemplate;
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export enum TaskSchedule {
  Daily = 'DAILY',
  Monthly = 'MONTHLY',
  Once = 'ONCE',
  Weekly = 'WEEKLY'
}

export type TaskTemplate = {
  __typename?: 'TaskTemplate';
  assignedTo: Array<User>;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  endingDate?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  randomlyAssigned: Scalars['Boolean']['output'];
  room: Room;
  scheduleInterval?: Maybe<Scalars['Int']['output']>;
  scheduleType: TaskSchedule;
  startingDate: Scalars['DateTime']['output'];
  subTasks: Array<SubTask>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  groupAccess: Array<GroupMember>;
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  profilePhoto?: Maybe<Scalars['String']['output']>;
  tasks: Array<Task>;
  updatedAt: Scalars['DateTime']['output'];
};

export type GetGroupsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetGroupsQuery = { __typename?: 'Query', getGroups: Array<{ __typename?: 'Group', id: string, name: string, rooms: Array<{ __typename?: 'Room', color: string, iconName: string, iconType: IconType, id: string, name: string }>, members: Array<{ __typename?: 'GroupMember', groupId: string, createdAt: any, role: GroupRole, status: GroupStatus, user: { __typename?: 'User', email: string, name?: string | null, id: string, profilePhoto?: string | null } }> }> };

export type AddMemberMutationVariables = Exact<{
  userEmail: Scalars['String']['input'];
  groupId: Scalars['ID']['input'];
}>;


export type AddMemberMutation = { __typename?: 'Mutation', addMember: { __typename?: 'GroupMember', groupId: string, createdAt: any, role: GroupRole, status: GroupStatus, user: { __typename?: 'User', email: string, name?: string | null, id: string, profilePhoto?: string | null } } };

export type GroupFragment = { __typename?: 'Group', id: string, name: string, rooms: Array<{ __typename?: 'Room', color: string, iconName: string, iconType: IconType, id: string, name: string }>, members: Array<{ __typename?: 'GroupMember', groupId: string, createdAt: any, role: GroupRole, status: GroupStatus, user: { __typename?: 'User', email: string, name?: string | null, id: string, profilePhoto?: string | null } }> };

export type RoomFragment = { __typename?: 'Room', color: string, iconName: string, iconType: IconType, id: string, name: string };

export type GroupMemberFragment = { __typename?: 'GroupMember', groupId: string, createdAt: any, role: GroupRole, status: GroupStatus, user: { __typename?: 'User', email: string, name?: string | null, id: string, profilePhoto?: string | null } };

export type GetInvitationsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetInvitationsQuery = { __typename?: 'Query', getInvitations: Array<{ __typename?: 'GroupMember', groupId: string, createdAt: any, role: GroupRole, status: GroupStatus, group: { __typename?: 'Group', id: string, name: string }, user: { __typename?: 'User', email: string, name?: string | null, id: string, profilePhoto?: string | null } }> };

export type GetGroupMembersQueryVariables = Exact<{
  fromGroup: Scalars['ID']['input'];
}>;


export type GetGroupMembersQuery = { __typename?: 'Query', getGroupMembers: Array<{ __typename?: 'GroupMember', status: GroupStatus, user: { __typename?: 'User', id: string, name?: string | null, profilePhoto?: string | null } }> };

export type UpdateInviteStatusMutationVariables = Exact<{
  groupId: Scalars['ID']['input'];
  newStatus: GroupStatus;
  userId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type UpdateInviteStatusMutation = { __typename?: 'Mutation', updateInviteStatus: { __typename?: 'GroupMember', groupId: string, createdAt: any, role: GroupRole, status: GroupStatus, user: { __typename?: 'User', email: string, name?: string | null, id: string, profilePhoto?: string | null } } };

export type GetRoomDetailsQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetRoomDetailsQuery = { __typename?: 'Query', getRoomDetails: { __typename?: 'Room', color: string, iconName: string, iconType: IconType, id: string, name: string } };

export type GetRoomsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetRoomsQuery = { __typename?: 'Query', getRooms: Array<{ __typename?: 'Room', id: string, name: string }> };

export type CreateRoomMutationVariables = Exact<{
  groupId: Scalars['ID']['input'];
  color: Scalars['String']['input'];
  iconName: Scalars['String']['input'];
  iconType: IconType;
  name: Scalars['String']['input'];
}>;


export type CreateRoomMutation = { __typename?: 'Mutation', createRoom: { __typename?: 'Room', color: string, iconName: string, iconType: IconType, id: string, name: string } };

export type UpdateRoomMutationVariables = Exact<{
  color: Scalars['String']['input'];
  iconName: Scalars['String']['input'];
  iconType: IconType;
  name: Scalars['String']['input'];
  id: Scalars['ID']['input'];
}>;


export type UpdateRoomMutation = { __typename?: 'Mutation', updateRoom: { __typename?: 'Room', color: string, iconName: string, iconType: IconType, id: string, name: string, tasks: Array<{ __typename?: 'Task', id: string }> } };

export type DeleteRoomMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteRoomMutation = { __typename?: 'Mutation', deleteRoom: { __typename?: 'Room', id: string } };

export type GetTasksQueryVariables = Exact<{
  fromRooms?: InputMaybe<Array<Scalars['ID']['input']> | Scalars['ID']['input']>;
}>;


export type GetTasksQuery = { __typename?: 'Query', getTasks: Array<{ __typename?: 'Task', completionDate?: any | null, createdAt: any, description?: string | null, id: string, randomlyAssigned: boolean, scheduleDay?: any | null, scheduleInterval?: number | null, scheduleType: TaskSchedule, title: string, assignedTo: Array<{ __typename?: 'User', email: string, id: string, name?: string | null }>, room: { __typename?: 'Room', color: string, iconName: string, iconType: IconType, id: string, name: string }, subTasks: Array<{ __typename?: 'SubTask', completed: boolean, createdAt: any, description: string, id: string }> }> };

export type GetTaskDetailsQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetTaskDetailsQuery = { __typename?: 'Query', getTaskDetails: { __typename?: 'Task', completionDate?: any | null, createdAt: any, description?: string | null, id: string, randomlyAssigned: boolean, scheduleDay?: any | null, scheduleInterval?: number | null, scheduleType: TaskSchedule, title: string, assignedTo: Array<{ __typename?: 'User', email: string, id: string, name?: string | null }>, room: { __typename?: 'Room', color: string, iconName: string, iconType: IconType, id: string, name: string }, subTasks: Array<{ __typename?: 'SubTask', completed: boolean, createdAt: any, description: string, id: string }> } };

export type DeleteTaskMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteTaskMutation = { __typename?: 'Mutation', deleteTask: { __typename?: 'Task', id: string } };

export type TaskFragment = { __typename?: 'Task', completionDate?: any | null, createdAt: any, description?: string | null, id: string, randomlyAssigned: boolean, scheduleDay?: any | null, scheduleInterval?: number | null, scheduleType: TaskSchedule, title: string, assignedTo: Array<{ __typename?: 'User', email: string, id: string, name?: string | null }>, room: { __typename?: 'Room', color: string, iconName: string, iconType: IconType, id: string, name: string }, subTasks: Array<{ __typename?: 'SubTask', completed: boolean, createdAt: any, description: string, id: string }> };

export type CreateTaskTemplateMutationVariables = Exact<{
  assignedTo: Array<Scalars['ID']['input']> | Scalars['ID']['input'];
  room: Scalars['ID']['input'];
  startingDate: Scalars['DateTime']['input'];
  endingDate?: InputMaybe<Scalars['DateTime']['input']>;
  scheduleType: TaskSchedule;
  title: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  randomlyAssign?: InputMaybe<Scalars['Boolean']['input']>;
  scheduleInterval: Scalars['Int']['input'];
}>;


export type CreateTaskTemplateMutation = { __typename?: 'Mutation', createTaskTemplate: { __typename?: 'TaskTemplate', endingDate?: any | null, id: string, randomlyAssigned: boolean, scheduleInterval?: number | null, scheduleType: TaskSchedule, startingDate: any, title: string, description?: string | null, assignedTo: Array<{ __typename?: 'User', email: string, id: string, name?: string | null, profilePhoto?: string | null }>, room: { __typename?: 'Room', color: string, iconName: string, iconType: IconType, id: string, name: string }, subTasks: Array<{ __typename?: 'SubTask', description: string, id: string }> } };

export type GetTaskTemplatesQueryVariables = Exact<{
  fromRooms?: InputMaybe<Array<Scalars['ID']['input']> | Scalars['ID']['input']>;
}>;


export type GetTaskTemplatesQuery = { __typename?: 'Query', getTaskTemplates: Array<{ __typename?: 'TaskTemplate', createdAt: any, description?: string | null, endingDate?: any | null, id: string, randomlyAssigned: boolean, scheduleInterval?: number | null, scheduleType: TaskSchedule, startingDate: any, title: string, subTasks: Array<{ __typename?: 'SubTask', createdAt: any, description: string, id: string }>, assignedTo: Array<{ __typename?: 'User', email: string, id: string, name?: string | null, profilePhoto?: string | null }>, room: { __typename?: 'Room', color: string, iconName: string, iconType: IconType, id: string, name: string } }> };

export type GetTaskTemplateDetailsQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetTaskTemplateDetailsQuery = { __typename?: 'Query', getTaskTemplateDetails: { __typename?: 'TaskTemplate', description?: string | null, endingDate?: any | null, id: string, randomlyAssigned: boolean, scheduleInterval?: number | null, scheduleType: TaskSchedule, startingDate: any, title: string, assignedTo: Array<{ __typename?: 'User', email: string, id: string, name?: string | null, profilePhoto?: string | null }>, room: { __typename?: 'Room', color: string, iconName: string, iconType: IconType, id: string, name: string } } };

export type DeleteTaskTemplateMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteTaskTemplateMutation = { __typename?: 'Mutation', deleteTaskTemplate: { __typename?: 'TaskTemplate', id: string } };

export type UpdateTaskTemplateMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  room: Scalars['ID']['input'];
  title: Scalars['String']['input'];
  randomlyAssign?: InputMaybe<Scalars['Boolean']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  assignedTo: Array<Scalars['ID']['input']> | Scalars['ID']['input'];
  startingDate: Scalars['DateTime']['input'];
  endingDate: Scalars['DateTime']['input'];
  scheduleType: TaskSchedule;
  scheduleInterval: Scalars['Int']['input'];
}>;


export type UpdateTaskTemplateMutation = { __typename?: 'Mutation', updateTaskTemplate: { __typename?: 'TaskTemplate', description?: string | null, endingDate?: any | null, id: string, randomlyAssigned: boolean, scheduleInterval?: number | null, scheduleType: TaskSchedule, startingDate: any, title: string, assignedTo: Array<{ __typename?: 'User', id: string, name?: string | null, email: string, profilePhoto?: string | null }>, room: { __typename?: 'Room', color: string, iconName: string, iconType: IconType, id: string, name: string }, subTasks: Array<{ __typename?: 'SubTask', description: string, id: string }> } };

export type CreateTasksFromTemplateMutationVariables = Exact<{
  fromTemplate: Scalars['ID']['input'];
}>;


export type CreateTasksFromTemplateMutation = { __typename?: 'Mutation', createTasksFromTemplate: Array<{ __typename?: 'Task', description?: string | null, id: string, randomlyAssigned: boolean, scheduleDay?: any | null, scheduleInterval?: number | null, scheduleType: TaskSchedule, title: string, completionDate?: any | null, assignedTo: Array<{ __typename?: 'User', email: string, id: string, name?: string | null, profilePhoto?: string | null }>, room: { __typename?: 'Room', color: string, iconName: string, iconType: IconType, id: string, name: string }, subTasks: Array<{ __typename?: 'SubTask', completed: boolean, description: string, id: string }> }> };

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', name?: string | null, email: string, id: string, updatedAt: any, createdAt: any }> };

export type GetMyUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyUserQuery = { __typename?: 'Query', getMyUser?: { __typename?: 'User', createdAt: any, email: string, id: string, name?: string | null, profilePhoto?: string | null, updatedAt: any } | null };

export type CreateUserMutationVariables = Exact<{
  id: Scalars['String']['input'];
  email: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', createdAt: any, email: string, id: string, name?: string | null, profilePhoto?: string | null, updatedAt: any } };

export const RoomFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"room"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Room"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"iconName"}},{"kind":"Field","name":{"kind":"Name","value":"iconType"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<RoomFragment, unknown>;
export const GroupMemberFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"groupMember"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GroupMember"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"groupId"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"profilePhoto"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]} as unknown as DocumentNode<GroupMemberFragment, unknown>;
export const GroupFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"group"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Group"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"rooms"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"room"}}]}},{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"groupMember"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"room"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Room"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"iconName"}},{"kind":"Field","name":{"kind":"Name","value":"iconType"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"groupMember"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GroupMember"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"groupId"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"profilePhoto"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]} as unknown as DocumentNode<GroupFragment, unknown>;
export const TaskFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"task"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Task"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"assignedTo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"completionDate"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"randomlyAssigned"}},{"kind":"Field","name":{"kind":"Name","value":"room"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"room"}}]}},{"kind":"Field","name":{"kind":"Name","value":"scheduleDay"}},{"kind":"Field","name":{"kind":"Name","value":"scheduleInterval"}},{"kind":"Field","name":{"kind":"Name","value":"scheduleType"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"subTasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"completed"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"room"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Room"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"iconName"}},{"kind":"Field","name":{"kind":"Name","value":"iconType"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<TaskFragment, unknown>;
export const GetGroupsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getGroups"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getGroups"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"group"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"room"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Room"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"iconName"}},{"kind":"Field","name":{"kind":"Name","value":"iconType"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"groupMember"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GroupMember"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"groupId"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"profilePhoto"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"group"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Group"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"rooms"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"room"}}]}},{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"groupMember"}}]}}]}}]} as unknown as DocumentNode<GetGroupsQuery, GetGroupsQueryVariables>;
export const AddMemberDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addMember"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userEmail"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addMember"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userEmail"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userEmail"}}},{"kind":"Argument","name":{"kind":"Name","value":"groupId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"groupMember"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"groupMember"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GroupMember"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"groupId"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"profilePhoto"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]} as unknown as DocumentNode<AddMemberMutation, AddMemberMutationVariables>;
export const GetInvitationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getInvitations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getInvitations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"groupMember"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"groupMember"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GroupMember"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"groupId"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"profilePhoto"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]} as unknown as DocumentNode<GetInvitationsQuery, GetInvitationsQueryVariables>;
export const GetGroupMembersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getGroupMembers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"fromGroup"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getGroupMembers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"fromGroup"},"value":{"kind":"Variable","name":{"kind":"Name","value":"fromGroup"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"profilePhoto"}}]}}]}}]}}]} as unknown as DocumentNode<GetGroupMembersQuery, GetGroupMembersQueryVariables>;
export const UpdateInviteStatusDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateInviteStatus"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"newStatus"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GroupStatus"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateInviteStatus"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"groupId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}}},{"kind":"Argument","name":{"kind":"Name","value":"newStatus"},"value":{"kind":"Variable","name":{"kind":"Name","value":"newStatus"}}},{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"groupMember"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"groupMember"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GroupMember"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"groupId"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"profilePhoto"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]} as unknown as DocumentNode<UpdateInviteStatusMutation, UpdateInviteStatusMutationVariables>;
export const GetRoomDetailsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getRoomDetails"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getRoomDetails"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"room"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"room"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Room"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"iconName"}},{"kind":"Field","name":{"kind":"Name","value":"iconType"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<GetRoomDetailsQuery, GetRoomDetailsQueryVariables>;
export const GetRoomsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getRooms"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getRooms"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<GetRoomsQuery, GetRoomsQueryVariables>;
export const CreateRoomDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createRoom"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"color"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"iconName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"iconType"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IconType"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createRoom"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"color"},"value":{"kind":"Variable","name":{"kind":"Name","value":"color"}}},{"kind":"Argument","name":{"kind":"Name","value":"iconName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"iconName"}}},{"kind":"Argument","name":{"kind":"Name","value":"iconType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"iconType"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"groupId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"room"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"room"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Room"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"iconName"}},{"kind":"Field","name":{"kind":"Name","value":"iconType"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<CreateRoomMutation, CreateRoomMutationVariables>;
export const UpdateRoomDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateRoom"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"color"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"iconName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"iconType"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IconType"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateRoom"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"color"},"value":{"kind":"Variable","name":{"kind":"Name","value":"color"}}},{"kind":"Argument","name":{"kind":"Name","value":"iconName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"iconName"}}},{"kind":"Argument","name":{"kind":"Name","value":"iconType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"iconType"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"room"}},{"kind":"Field","name":{"kind":"Name","value":"tasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"room"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Room"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"iconName"}},{"kind":"Field","name":{"kind":"Name","value":"iconType"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<UpdateRoomMutation, UpdateRoomMutationVariables>;
export const DeleteRoomDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteRoom"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteRoom"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteRoomMutation, DeleteRoomMutationVariables>;
export const GetTasksDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getTasks"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"fromRooms"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getTasks"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"fromRooms"},"value":{"kind":"Variable","name":{"kind":"Name","value":"fromRooms"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"task"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"room"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Room"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"iconName"}},{"kind":"Field","name":{"kind":"Name","value":"iconType"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"task"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Task"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"assignedTo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"completionDate"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"randomlyAssigned"}},{"kind":"Field","name":{"kind":"Name","value":"room"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"room"}}]}},{"kind":"Field","name":{"kind":"Name","value":"scheduleDay"}},{"kind":"Field","name":{"kind":"Name","value":"scheduleInterval"}},{"kind":"Field","name":{"kind":"Name","value":"scheduleType"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"subTasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"completed"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<GetTasksQuery, GetTasksQueryVariables>;
export const GetTaskDetailsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getTaskDetails"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getTaskDetails"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"task"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"room"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Room"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"iconName"}},{"kind":"Field","name":{"kind":"Name","value":"iconType"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"task"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Task"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"assignedTo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"completionDate"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"randomlyAssigned"}},{"kind":"Field","name":{"kind":"Name","value":"room"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"room"}}]}},{"kind":"Field","name":{"kind":"Name","value":"scheduleDay"}},{"kind":"Field","name":{"kind":"Name","value":"scheduleInterval"}},{"kind":"Field","name":{"kind":"Name","value":"scheduleType"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"subTasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"completed"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<GetTaskDetailsQuery, GetTaskDetailsQueryVariables>;
export const DeleteTaskDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteTask"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteTask"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteTaskMutation, DeleteTaskMutationVariables>;
export const CreateTaskTemplateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createTaskTemplate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"assignedTo"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"room"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"startingDate"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTime"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"endingDate"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTime"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"scheduleType"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TaskSchedule"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"title"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"randomlyAssign"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"scheduleInterval"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createTaskTemplate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"assignedTo"},"value":{"kind":"Variable","name":{"kind":"Name","value":"assignedTo"}}},{"kind":"Argument","name":{"kind":"Name","value":"room"},"value":{"kind":"Variable","name":{"kind":"Name","value":"room"}}},{"kind":"Argument","name":{"kind":"Name","value":"scheduleType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"scheduleType"}}},{"kind":"Argument","name":{"kind":"Name","value":"startingDate"},"value":{"kind":"Variable","name":{"kind":"Name","value":"startingDate"}}},{"kind":"Argument","name":{"kind":"Name","value":"endingDate"},"value":{"kind":"Variable","name":{"kind":"Name","value":"endingDate"}}},{"kind":"Argument","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"title"}}},{"kind":"Argument","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}},{"kind":"Argument","name":{"kind":"Name","value":"randomlyAssign"},"value":{"kind":"Variable","name":{"kind":"Name","value":"randomlyAssign"}}},{"kind":"Argument","name":{"kind":"Name","value":"scheduleInterval"},"value":{"kind":"Variable","name":{"kind":"Name","value":"scheduleInterval"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"assignedTo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"profilePhoto"}}]}},{"kind":"Field","name":{"kind":"Name","value":"endingDate"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"randomlyAssigned"}},{"kind":"Field","name":{"kind":"Name","value":"room"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"room"}}]}},{"kind":"Field","name":{"kind":"Name","value":"scheduleInterval"}},{"kind":"Field","name":{"kind":"Name","value":"scheduleType"}},{"kind":"Field","name":{"kind":"Name","value":"startingDate"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"subTasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"room"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Room"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"iconName"}},{"kind":"Field","name":{"kind":"Name","value":"iconType"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<CreateTaskTemplateMutation, CreateTaskTemplateMutationVariables>;
export const GetTaskTemplatesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getTaskTemplates"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"fromRooms"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getTaskTemplates"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"fromRooms"},"value":{"kind":"Variable","name":{"kind":"Name","value":"fromRooms"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"endingDate"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"randomlyAssigned"}},{"kind":"Field","name":{"kind":"Name","value":"scheduleInterval"}},{"kind":"Field","name":{"kind":"Name","value":"scheduleType"}},{"kind":"Field","name":{"kind":"Name","value":"startingDate"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"subTasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"assignedTo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"profilePhoto"}}]}},{"kind":"Field","name":{"kind":"Name","value":"room"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"room"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"room"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Room"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"iconName"}},{"kind":"Field","name":{"kind":"Name","value":"iconType"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<GetTaskTemplatesQuery, GetTaskTemplatesQueryVariables>;
export const GetTaskTemplateDetailsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getTaskTemplateDetails"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getTaskTemplateDetails"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"assignedTo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"profilePhoto"}}]}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"endingDate"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"randomlyAssigned"}},{"kind":"Field","name":{"kind":"Name","value":"scheduleInterval"}},{"kind":"Field","name":{"kind":"Name","value":"scheduleType"}},{"kind":"Field","name":{"kind":"Name","value":"startingDate"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"room"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"room"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"room"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Room"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"iconName"}},{"kind":"Field","name":{"kind":"Name","value":"iconType"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<GetTaskTemplateDetailsQuery, GetTaskTemplateDetailsQueryVariables>;
export const DeleteTaskTemplateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteTaskTemplate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteTaskTemplate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteTaskTemplateMutation, DeleteTaskTemplateMutationVariables>;
export const UpdateTaskTemplateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateTaskTemplate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"room"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"title"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"randomlyAssign"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"assignedTo"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"startingDate"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTime"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"endingDate"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTime"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"scheduleType"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TaskSchedule"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"scheduleInterval"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateTaskTemplate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"assignedTo"},"value":{"kind":"Variable","name":{"kind":"Name","value":"assignedTo"}}},{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"room"},"value":{"kind":"Variable","name":{"kind":"Name","value":"room"}}},{"kind":"Argument","name":{"kind":"Name","value":"scheduleType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"scheduleType"}}},{"kind":"Argument","name":{"kind":"Name","value":"startingDate"},"value":{"kind":"Variable","name":{"kind":"Name","value":"startingDate"}}},{"kind":"Argument","name":{"kind":"Name","value":"endingDate"},"value":{"kind":"Variable","name":{"kind":"Name","value":"endingDate"}}},{"kind":"Argument","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"title"}}},{"kind":"Argument","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}},{"kind":"Argument","name":{"kind":"Name","value":"randomlyAssign"},"value":{"kind":"Variable","name":{"kind":"Name","value":"randomlyAssign"}}},{"kind":"Argument","name":{"kind":"Name","value":"scheduleInterval"},"value":{"kind":"Variable","name":{"kind":"Name","value":"scheduleInterval"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"assignedTo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"profilePhoto"}}]}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"endingDate"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"randomlyAssigned"}},{"kind":"Field","name":{"kind":"Name","value":"room"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"room"}}]}},{"kind":"Field","name":{"kind":"Name","value":"scheduleInterval"}},{"kind":"Field","name":{"kind":"Name","value":"scheduleType"}},{"kind":"Field","name":{"kind":"Name","value":"startingDate"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"subTasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"room"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Room"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"iconName"}},{"kind":"Field","name":{"kind":"Name","value":"iconType"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<UpdateTaskTemplateMutation, UpdateTaskTemplateMutationVariables>;
export const CreateTasksFromTemplateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createTasksFromTemplate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"fromTemplate"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createTasksFromTemplate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"fromTemplate"},"value":{"kind":"Variable","name":{"kind":"Name","value":"fromTemplate"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"assignedTo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"profilePhoto"}}]}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"randomlyAssigned"}},{"kind":"Field","name":{"kind":"Name","value":"room"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"room"}}]}},{"kind":"Field","name":{"kind":"Name","value":"scheduleDay"}},{"kind":"Field","name":{"kind":"Name","value":"scheduleInterval"}},{"kind":"Field","name":{"kind":"Name","value":"scheduleType"}},{"kind":"Field","name":{"kind":"Name","value":"subTasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"completed"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"completionDate"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"room"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Room"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"iconName"}},{"kind":"Field","name":{"kind":"Name","value":"iconType"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<CreateTasksFromTemplateMutation, CreateTasksFromTemplateMutationVariables>;
export const GetUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<GetUsersQuery, GetUsersQueryVariables>;
export const GetMyUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getMyUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getMyUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"profilePhoto"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetMyUserQuery, GetMyUserQueryVariables>;
export const CreateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"profilePhoto"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<CreateUserMutation, CreateUserMutationVariables>;