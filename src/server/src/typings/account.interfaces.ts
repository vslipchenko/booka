import {Gender} from './user.enums';
import {BusinessCategory} from './business-category.enums';
import {City, Region} from './toponymy.enums';

interface AccountDataBase {
  thumbnail: string;
  description: string;
  phone_number_1: string;
  phone_number_2: string;
  phone_number_3: string;
  viber_number: string;
  whatsapp_number: string;
  telegram_username: string;
}

interface PaidAccountDataBase {
  business_category: BusinessCategory;
  offsite_work: boolean;
  region: Region;
  city: City;
  google_maps: string;
  website: string;
  instagram_username: string;
  facebook_username: string;
  twitter_username: string;
  paid_at: string;
}

export interface ClientAccountData extends AccountDataBase {
  first_name: string;
  middle_name: string;
  last_name: string;
  gender: Gender;
  birth_date: string;
}

export interface EntrepreneurAccountData extends ClientAccountData, PaidAccountDataBase {}

export interface BusinessAccountData extends AccountDataBase, PaidAccountDataBase {
  name: string;
}
