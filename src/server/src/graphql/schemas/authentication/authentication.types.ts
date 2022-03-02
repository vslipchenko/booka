import {gql} from 'apollo-server-core';

export const authenticationTypes = gql`
  type Tokens {
    accessToken: String!
    refreshToken: String!
  }
`;
