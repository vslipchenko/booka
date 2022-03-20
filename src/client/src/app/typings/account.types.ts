import {BusinessAccountData, ClientAccountData, EntrepreneurAccountData} from '~app/typings/account.interfaces';

export type AccountTariff = 'client' | 'entrepreneur' | 'business';

export type AccountData = ClientAccountData & EntrepreneurAccountData & BusinessAccountData;
