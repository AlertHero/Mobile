import gql from 'graphql-tag';

const LOGIN_MUTATION = gql`
  mutation register($phone: String!) {
    register(phone: $phone) {
      ok
      id
      errors {
        path
        message
      }
    }
  }
`;

export const VERIFY_MUTATION = gql`
  mutation verify2FA($otp: String!, $id: String!) {
    verify2FA(otp: $otp, id: $id) {
      ok
      token
      refreshToken
      errors {
        path
        message
      }
    }
  }
`;

export default LOGIN_MUTATION;