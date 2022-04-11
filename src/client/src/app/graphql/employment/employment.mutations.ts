import {gql} from 'apollo-angular';

export const ADD_EMPLOYEE = gql`
  mutation ($email: String!) {
    addEmployee(email: $email) {
      success
      reason
    }
  }
`;
