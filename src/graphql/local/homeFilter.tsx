import {gql} from '@apollo/client';

export const GET_HOME_FILTER = gql`
  query getHomeFilter {
    homeFilter @client {
      selected
    }
  }
`;
