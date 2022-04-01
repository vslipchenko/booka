import {gql} from 'apollo-angular';

// Here is the mix of account data for client, entrepreneur, business tariffs
export const ACCOUNT_DATA = gql`
  query {
    accountData {
      # Base
      thumbnail
      description
      phone_number_1
      phone_number_2
      phone_number_3
      viber_number
      whatsapp_number
      telegram_username

      # Client & Entrepreneur
      first_name
      middle_name
      last_name
      gender
      birth_date

      # Entrepreneur
      # ...

      # Entrepreneur & Business
      business_category
      website
      instagram_username
      facebook_username
      twitter_username
      offsite_work
      region
      city
      google_maps
      paid_at

      # Business
      name
    }
  }
`;
