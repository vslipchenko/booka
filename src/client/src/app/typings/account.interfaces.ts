import {AccountTariffs} from '~app/typings/account.enums';
import {AccountData} from '~app/typings/account.types';
import {Gender} from '~app/typings/user.enums';
import {BusinessCategory} from '~app/typings/business-category.enums';
import {City, Region} from '~app/typings/toponymy.enums';

interface AccountDataBase {
  tariff: AccountTariffs;
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
  facebook_username: string;
  twitter_username: string;
  instagram_username: string;
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

export interface AccountDataQueryResult {
  accountData: Omit<AccountData, 'tariff'>;
}
