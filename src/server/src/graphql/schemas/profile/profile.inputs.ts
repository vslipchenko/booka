import {gql} from 'apollo-server-core';

export const profileInputs = gql`
  input EditAccountData {
    # Base
    description: String
    phone_number_1: String!
    phone_number_2: String
    phone_number_3: String
    viber_number: String
    whatsapp_number: String
    telegram_username: String

    # Client & Entrepreneur
    first_name: String
    middle_name: String
    last_name: String
    gender: Int
    birth_date: String

    # Entrepreneur
    # ...

    # Entrepreneur & Business
    website: String
    instagram_username: String
    facebook_username: String
    twitter_username: String
  }
`;
