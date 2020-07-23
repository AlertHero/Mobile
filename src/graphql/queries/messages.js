import gql from 'graphql-tag';

const MESSAGES_QUERY = gql`
  query Messages($channelId: Int!, $last: Int!, $first: Int, $after: String) {
    messagesRelay(channelId: $channelId, last: $last, first: $first, after: $after){
      edges{
        node{
          id
          text
          createdAt
          channel {
            name
          }
          code {
            desc
            color
          }
          user {
            id
            firstName
            lastName
          }
          comments {
            id
            text
          }
          reaction {
            upvotes
            downvotes
          }
        }
        cursor
      }
      pageInfo {
        hasNextPage
      }
    }
  }
`;

export const MESSAGES_CODES_QUERY = gql`
  query codesOfMessages {
    codesOfMessages {
      severe
      elevated
      low
    }
  }
`;

export const ALL_MESSAGES_QUERY = gql`
  query messages {
    messages {
      id
      text
      createdAt
      channel {
        name
      }
      code {
        desc
        color
      }
      user {
        id
        firstName
        lastName
      }
    }
  }
`;
export default MESSAGES_QUERY;
