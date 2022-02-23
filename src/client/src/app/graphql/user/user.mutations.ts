import {gql} from 'apollo-angular';

export const CREATE_USER = gql`
  mutation ($input: CreateUser!) {
    createUser(input: $input) {
      _id
    }
  }
`;
