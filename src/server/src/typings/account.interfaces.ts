import {Gender} from './user.enums';

interface AccountDataBase {
  thumbnail: string;
  description: string;
  phone_number_1: string;
  phone_number_2: string;
  phone_number_3: string;
}

interface PaidAccountDataBase {
  phone_number_4: string;
  phone_number_5: string;
  paid_at: string;
}

export interface ClientAccountData extends AccountDataBase {
  first_name: string;
  middle_name: string;
  last_name: string;
  gender: Gender;
  birth_date: string;
  // TODO consider to move them part of AccountDataBase
  whatsapp_number: string;
  telegram_username: string;
}

export interface EntrepreneurAccountData extends ClientAccountData, PaidAccountDataBase {}

export interface BusinessAccountData extends AccountDataBase, PaidAccountDataBase {}
