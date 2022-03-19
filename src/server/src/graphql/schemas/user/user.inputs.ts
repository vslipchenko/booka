import {gql} from 'apollo-server-core';

export const userInputs = gql`
  input CreateUser {
    tariff: Int!
    email: String!
    password: String!
    locale: Locale!
  }

  input RecoverPassword {
    email: String!
    locale: Locale!
  }

  input ResetPassword {
    password: String!
    key: String!
  }
`;
