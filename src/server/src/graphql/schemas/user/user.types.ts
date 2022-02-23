import {gql} from 'apollo-server-core';

export const userTypes = gql`
  # TODO delete
  type UserExists {
    exists: Boolean!
  }
`;
