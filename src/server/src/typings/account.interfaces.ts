import {AccountTariffs} from './account.enums';

export interface ClientAccount {
  tariff: AccountTariffs;
  first_name: string;
  middle_name: string;
  last_name: string;
  paid_at: string;
}
