import {gql} from 'apollo-angular';

export const BOOKED_SERVICES_BY_USER_ID = gql`
  query {
    bookedServicesByUserId {
      exists
    }
  }
`;
