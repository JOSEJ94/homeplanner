import {gql} from '@apollo/client';

export const GET_TASK_FILTER = gql`
  query getTaskFilter {
    taskFilter @client {
      selectedOptions
    }
  }
`;
