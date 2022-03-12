import {AccountTypes} from './account.enums';

export interface Account {
  account_type: AccountTypes;
  first_name: string;
  middle_name: string;
  last_name: string;
  paid_at: string;
}
