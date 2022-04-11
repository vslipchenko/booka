import {gql} from 'apollo-angular';

export const ADD_EMPLOYEE = gql`
  mutation ($email: String!) {
    addEmployee(email: $email) {
      id
      thumbnail
      email
      first_name
      middle_name
      last_name
      reason
    }
  }
`;
