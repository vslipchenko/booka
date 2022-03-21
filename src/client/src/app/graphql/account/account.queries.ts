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

      # Client & Entrepreneur
      first_name
      middle_name
      last_name
      gender
      birth_date
      whatsapp_number
      telegram_username

      # Entrepreneur
      # ...

      # Entrepreneur & Business
      paid_at
    }
  }
`;
