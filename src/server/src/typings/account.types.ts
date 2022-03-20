import {BusinessAccountData, ClientAccountData, EntrepreneurAccountData} from './account.interfaces';

export type AccountData = ClientAccountData & EntrepreneurAccountData & BusinessAccountData;
