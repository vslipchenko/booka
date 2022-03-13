import {AccountTariffs} from '~app/typings/account.enums';

export interface AccountVitals {
  tariff: AccountTariffs;
  first_name: string;
  middle_name: string;
  last_name: string;
  paid_at: string;
}

export interface AccountVitalsQueryResult {
  accountVitals: AccountVitals;
}
