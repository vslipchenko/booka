import {AccountTypes} from '~app/typings/account.enums';

export interface AccountVitalsQueryResult {
  accountVitals: {
    account_type: AccountTypes;
    first_name: string;
    middle_name: string;
    last_name: string;
    paid_at: string;
  };
}
