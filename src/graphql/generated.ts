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
  Date: { input: any; output: any; }
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
  group: Group;
  groupId: Scalars['ID']['output'];
  user: User;
  userId: Scalars['ID']['output'];
};

export enum IconType {
  Antdesign = 'ANTDESIGN',
  Fontawesome = 'FONTAWESOME'
}

export type Mutation = {
  __typename?: 'Mutation';
  createRoom: Room;
  createTask: Task;
  createUser: User;
  deleteRoom: Room;
  updateRoom: Room;
};


export type MutationCreateRoomArgs = {
  color: Scalars['String']['input'];
  groupId: Scalars['ID']['input'];
  iconName: Scalars['String']['input'];
  iconType: IconType;
  name: Scalars['String']['input'];
};


export type MutationCreateTaskArgs = {
  assignedTo: Array<Scalars['ID']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  randomlyAssign?: InputMaybe<Scalars['Boolean']['input']>;
  room: Scalars['ID']['input'];
  scheduleDay: Scalars['Date']['input'];
  scheduleInterval?: InputMaybe<Scalars['Int']['input']>;
  scheduleType: TaskSchedule;
  title: Scalars['String']['input'];
};


export type MutationCreateUserArgs = {
  email: Scalars['String']['input'];
  id: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};


export type MutationDeleteRoomArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdateRoomArgs = {
  color: Scalars['String']['input'];
  iconName: Scalars['String']['input'];
  iconType: IconType;
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  getGroups: Array<Group>;
  getMyUser?: Maybe<User>;
  getRoomDetails: Room;
  getTasks: Array<Task>;
  users: Array<User>;
};


export type QueryGetRoomDetailsArgs = {
  id: Scalars['ID']['input'];
};

export type Room = {
  __typename?: 'Room';
  color: Scalars['String']['output'];
  createdAt: Scalars['Date']['output'];
  group: Group;
  iconName: Scalars['String']['output'];
  iconType: IconType;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  tasks: Array<Task>;
  updatedAt: Scalars['Date']['output'];
};

export type SubTask = {
  __typename?: 'SubTask';
  completed: Scalars['Boolean']['output'];
  createdAt: Scalars['Date']['output'];
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  task: Task;
  updatedAt: Scalars['Date']['output'];
};

export type Task = {
  __typename?: 'Task';
  assignedTo: Array<User>;
  completionDate?: Maybe<Scalars['Date']['output']>;
  createdAt: Scalars['Date']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  randomlyAssigned: Scalars['Boolean']['output'];
  room: Room;
  scheduleDay?: Maybe<Scalars['Date']['output']>;
  scheduleInterval?: Maybe<Scalars['Int']['output']>;
  scheduleType: TaskSchedule;
  subTasks: Array<SubTask>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['Date']['output'];
};

export enum TaskSchedule {
  Daily = 'DAILY',
  Monthly = 'MONTHLY',
  Once = 'ONCE',
  Weekly = 'WEEKLY'
}

export type User = {
  __typename?: 'User';
  createdAt: Scalars['Date']['output'];
  email: Scalars['String']['output'];
  groupAccess: Array<GroupMember>;
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  tasks: Array<Task>;
  updatedAt: Scalars['Date']['output'];
};

export type GetGroupsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetGroupsQuery = { __typename?: 'Query', getGroups: Array<{ __typename?: 'Group', id: string, name: string, rooms: Array<{ __typename?: 'Room', color: string, iconName: string, iconType: IconType, id: string, name: string }> }> };

export type GetRoomDetailsQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetRoomDetailsQuery = { __typename?: 'Query', getRoomDetails: { __typename?: 'Room', color: string, iconName: string, iconType: IconType, id: string, name: string } };

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

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', name?: string | null, email: string, id: string, updatedAt: any, createdAt: any }> };

export type GetMyUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyUserQuery = { __typename?: 'Query', getMyUser?: { __typename?: 'User', createdAt: any, email: string, id: string, name?: string | null, updatedAt: any } | null };

export type CreateUserMutationVariables = Exact<{
  id: Scalars['String']['input'];
  email: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', createdAt: any, email: string, id: string, name?: string | null, updatedAt: any } };


export const GetGroupsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getGroups"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getGroups"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"rooms"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"iconName"}},{"kind":"Field","name":{"kind":"Name","value":"iconType"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<GetGroupsQuery, GetGroupsQueryVariables>;
export const GetRoomDetailsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getRoomDetails"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getRoomDetails"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"iconName"}},{"kind":"Field","name":{"kind":"Name","value":"iconType"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<GetRoomDetailsQuery, GetRoomDetailsQueryVariables>;
export const CreateRoomDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createRoom"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"color"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"iconName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"iconType"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IconType"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createRoom"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"color"},"value":{"kind":"Variable","name":{"kind":"Name","value":"color"}}},{"kind":"Argument","name":{"kind":"Name","value":"iconName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"iconName"}}},{"kind":"Argument","name":{"kind":"Name","value":"iconType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"iconType"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"groupId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"iconName"}},{"kind":"Field","name":{"kind":"Name","value":"iconType"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<CreateRoomMutation, CreateRoomMutationVariables>;
export const UpdateRoomDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateRoom"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"color"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"iconName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"iconType"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IconType"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateRoom"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"color"},"value":{"kind":"Variable","name":{"kind":"Name","value":"color"}}},{"kind":"Argument","name":{"kind":"Name","value":"iconName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"iconName"}}},{"kind":"Argument","name":{"kind":"Name","value":"iconType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"iconType"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"iconName"}},{"kind":"Field","name":{"kind":"Name","value":"iconType"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateRoomMutation, UpdateRoomMutationVariables>;
export const DeleteRoomDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteRoom"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteRoom"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteRoomMutation, DeleteRoomMutationVariables>;
export const GetUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<GetUsersQuery, GetUsersQueryVariables>;
export const GetMyUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getMyUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getMyUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetMyUserQuery, GetMyUserQueryVariables>;
export const CreateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<CreateUserMutation, CreateUserMutationVariables>;