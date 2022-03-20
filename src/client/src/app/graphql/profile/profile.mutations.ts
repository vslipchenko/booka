import {gql} from 'apollo-angular';

export const UPDATE_PROFILE_THUMBNAIL = gql`
  mutation ($link: String) {
    updateProfileThumbnail(link: $link) {
      success
    }
  }
`;

export const EDIT_PROFILE = gql`
  mutation ($input: EditAccountData!) {
    editAccountData(input: $input) {
      success
    }
  }
`;
