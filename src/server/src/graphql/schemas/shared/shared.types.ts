import {gql} from 'apollo-server-core';

export const sharedTypes = gql`
  type Exists {
    exists: Boolean!
  }

  type Success {
    success: Boolean!
  }
`;
