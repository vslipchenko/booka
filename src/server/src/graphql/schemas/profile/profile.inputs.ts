import {gql} from 'apollo-server-core';

export const profileInputs = gql`
  input EditAccountData {
    # Base
    thumbnail: String
    description: String

    # Client & Entrepreneur
    first_name: String
    middle_name: String
    last_name: String
    gender: Int
    birth_date: String
    whatsapp_number: String
    telegram_username: String

    # Entrepreneur
    # ...

    # Client & Entrepreneur & Business
    phone_number_1: String
    phone_number_2: String
    phone_number_3: String

    # Entrepreneur & Business
    phone_number_4: String
    phone_number_5: String
  }
`;
