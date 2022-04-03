import {gql} from 'apollo-server-core';

export const accountTypes = gql`
  # Here is the mix of account data for client, entrepreneur, business tariffs
  type AccountData {
    # Base
    thumbnail: String
    description: String
    phone_number_1: String
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
    business_category: Int
    website: String
    instagram_username: String
    facebook_username: String
    twitter_username: String
    offsite_work: Boolean
    region: Int
    city: Int
    google_maps: String

    # Business
    name: String
  }
`;
