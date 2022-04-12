import {gql} from 'apollo-angular';

export const ADD_EMPLOYER_CONFIRMATION = gql`
  mutation ($email: String!) {
    addEmployerConfirmation(email: $email) {
      success
      reason
    }
  }
`;
