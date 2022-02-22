import {gql} from 'apollo-server-core';

export const userTypes = gql`
  type UserExists {
    exists: Boolean!
  }
`;
