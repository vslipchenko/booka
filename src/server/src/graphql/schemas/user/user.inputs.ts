import {gql} from 'apollo-server-core';

export const userInputs = gql`
  input CreateUser {
    accountType: Int!
    email: String!
    password: String!
    locale: Locale!
  }
`;
