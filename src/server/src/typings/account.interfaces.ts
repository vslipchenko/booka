import {AccountTariffs} from './account.enums';

export interface Account {
  tariff: AccountTariffs;
  first_name: string;
  middle_name: string;
  last_name: string;
  paid_at: string;
}
