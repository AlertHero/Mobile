import gql from 'graphql-tag';

const CODES_QUERY = gql`
  query allCodes{
    allCodes{
      id
      isActive
      color
      desc
    }
  }
`;

export default CODES_QUERY;