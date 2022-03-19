import {gql} from 'apollo-angular';

export const UPDATE_PROFILE_IMAGE = gql`
  mutation ($link: String) {
    updateProfileImage(link: $link) {
      success
    }
  }
`;
