import {gql} from 'apollo-angular';

export const ACCOUNT_DATA = gql`
  query {
    accountData {
      first_name
      middle_name
      last_name
      paid_at
    }
  }
`;
