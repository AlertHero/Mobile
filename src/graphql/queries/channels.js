import gql from 'graphql-tag';

const allChannelsQuery = gql`
  query channels{
    allChannels{
      id
      name
      public
    }
  }
`;
export default allChannelsQuery;
