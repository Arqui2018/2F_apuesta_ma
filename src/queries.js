import gql from 'graphql-tag';

// user_ms

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
      autentication
    }
  }
`;

export const DESTROY_SESSION = gql`
  mutation destroySession($token: String!) {
    destroySession(token: $token) {
      id
      autentication
    }
  }
`;

// result_ms

export const CREATE_RESULT = gql`
  mutation createResult($result: ResultInput!) {
    createResult(result: $result) {
      user_id
      amount
      date
      g_local
      g_visit
      winner
      match_id
      wallet_id
    }
  }
`;

export const UPDATE_RESULT = gql`
  mutation updateResult($id: Int!, $result: ResultInput!){
    updateResult(id: $id, result: $result) {
      user_id
      amount
      date
      g_local
      g_visit
      winner
      match_id
      wallet_id
    }
  }
`;

export const RESULT_BY_USER = gql`
  query resultByUser($id: Int!) {
    resultByUser(id: $id) {
      id
      amount
      date
      g_local
      g_visit
      winner
      match_id
      wallet_id
    }
  }
`;

export const RESULT_BY_MATCH = gql`
  query resultByMatch($id: Int!) {
    resultByMatch(id: $id) {
      id
      user_id
      amount
      date
      g_local
      g_visit
      winner
      match_id
      wallet_id
    }
  }
`;

export const DELETE_RESULT = gql`
  mutation deleteResult($id: Int!) {
    deleteResult(id: $id) {
      id
      user_id
      amount
      date
      g_local
      g_visit
      winner
      match_id
      wallet_id
    }
  }
`;


// wallet_ms

export const WALLET_BY_ID = gql`
  query walletById($id: Int!) {
    walletById(id: $id) {
      balance
    }
  }
`;

// matches_ms

export const TEAM_BY_ID = gql`
  query teamById($id: Int!) {
    teamById(id: $id) {
      id
      name
    }
  }
`;

export const ALL_MATCHES = gql`
  query {
    allMatches {
      id
      date
      team_local_id
      team_visitor_id
    }
  }
`;


export const MATCH_BY_ID = gql`
  query matchById($id: Int!) {
    matchById(id: $id) {
      id
      team_local_id
      team_visitor_id
      goals_local
      goals_visitor
      date
    }
  }
`;

// wallet_ms

export const UPDATE_WALLET = gql`
  mutation updateWallet($id: Int!, $wallet: WalletInput!){
    updateWallet(id: $id, wallet: $wallet) {
      balance
    }
  }
`;
