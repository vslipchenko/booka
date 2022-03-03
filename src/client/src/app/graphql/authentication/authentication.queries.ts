import {gql} from 'apollo-angular';

export const SIGN_IN = gql`
  query ($input: SignIn!) {
    signIn(input: $input) {
      accessToken
      refreshToken
      reason
    }
  }
`;
