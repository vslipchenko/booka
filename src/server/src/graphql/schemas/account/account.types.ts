import {gql} from 'apollo-server-core';

export const accountTypes = gql`
  type AccountData {
    paid_at: String
    first_name: String
    middle_name: String
    last_name: String
  }
`;
