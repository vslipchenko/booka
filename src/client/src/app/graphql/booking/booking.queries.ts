import {gql} from 'apollo-angular';

export const BOOKED_SERVICES_BY_USER_ID = gql`
  query {
    bookedServicesByUserId {
      ...
    }
  }
`;

export const REFRESH_ACCESS_TOKEN = gql`
  query ($refreshToken: String!) {
    refreshAccessToken(refreshToken: $refreshToken)
  }
`;
