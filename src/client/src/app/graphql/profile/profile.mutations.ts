import {gql} from 'apollo-angular';

export const UPDATE_PROFILE_THUMBNAIL = gql`
  mutation ($link: String) {
    updateProfileThumbnail(link: $link) {
      success
    }
  }
`;
