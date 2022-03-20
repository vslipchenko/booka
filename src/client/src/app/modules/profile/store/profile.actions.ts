import {AccountData} from '~app/typings/account.interfaces';

export class SetAccountData {
  public static readonly type = '[Profile] SetAccountData';

  public constructor(public payload: AccountData) {}
}
