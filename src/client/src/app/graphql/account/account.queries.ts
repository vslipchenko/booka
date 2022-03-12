import {gql} from 'apollo-angular';

export const ACCOUNT_VITALS = gql`
  query {
    accountVitals {
      account_type
      first_name
      middle_name
      last_name
      paid_at
    }
  }
`;
