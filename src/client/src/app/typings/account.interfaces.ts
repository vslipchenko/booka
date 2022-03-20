import {AccountTariffs} from '~app/typings/account.enums';
import {AccountData} from '~app/typings/account.types';

export interface ClientAccountData {
  tariff: AccountTariffs;
  first_name: string;
  middle_name: string;
  last_name: string;
}

export interface EntrepreneurAccountData extends ClientAccountData {
  tariff: AccountTariffs;
  paid_at: string;
}

export interface BusinessAccountData {
  tariff: AccountTariffs;
  paid_at: string;
}

export interface AccountDataQueryResult {
  accountData: Omit<AccountData, 'tariff'>;
}
