import gql from 'graphql-tag';

const USER_QUERY = gql`
  query getUser($id: Int!) {
    getUser(id: $id) {
      firstName
      lastName
      phone
      title
      email
    }
  }
`;

export const USERS_STATS_QUERY = gql`
  query getStats {
    getStats{
      total
      active
    }
  }
`;

export const ALL_USERS_QUERY = gql`
  query allUsers {
    allUsers {
      id
      phone
      firstName
      lastName
      title
      employed
      workingNow
      group {
        id
        name
      }
    }
  }
`;
export default USER_QUERY;
