import {gql} from 'apollo-angular';

export const CREATE_USER = gql`
  mutation ($input: CreateUser!) {
    createUser(input: $input) {
      success
    }
  }
`;

export const CONFIRM_ACCOUNT = gql`
  mutation ($key: String!) {
    confirmAccount(key: $key) {
      success
    }
  }
`;
