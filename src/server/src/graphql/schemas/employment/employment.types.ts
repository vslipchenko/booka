import {gql} from 'apollo-server-core';

export const employmentTypes = gql`
  # Unused
  type EmployeeData {
    id: ID
    thumbnail: String
    email: String
    first_name: String
    middle_name: String
    last_name: String
    reason: Int
  }
`;
