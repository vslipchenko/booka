import {gql} from 'apollo-server-core';

export const sharedEnums = gql`
  enum Locale {
    ru
    uk
  }
`;
