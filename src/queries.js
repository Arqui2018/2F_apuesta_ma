import gql from 'graphql-tag';

export const CREATE_SESSION = gql`
  mutation createSession($user: UserIntput!) {
    createSession(user: $user) {
      authentication_token
      autentication
    }
  }
`;

export const SESSION_BY_TOKEN = gql`
  query sessionByToken($token: String!) {
    sessionByToken(token: $token) {
      id
      name
      email
      wallet_id
      authentication_token
    }
  }
`;

export const REMOVE_SESSION = gql`
  mutation removeSession($token: String!) {
    removeSession(token: $token) {
      id
    }
  }
`;
