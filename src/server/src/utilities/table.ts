import {AccountTariffs} from '../typings/account.enums';
import {ClientAccountsTable} from '../data/tables/client-accounts';
import {EntrepreneurAccountsTable} from '../data/tables/entrepreneur-accounts';
import {BusinessAccountsTable} from '../data/tables/business-accounts';

export const getAccountTableName = (tariff: AccountTariffs): string => {
  if (tariff === AccountTariffs.Client) return ClientAccountsTable.name;
  if (tariff === AccountTariffs.Entrepreneur) return EntrepreneurAccountsTable.name;

  return BusinessAccountsTable.name;
};
