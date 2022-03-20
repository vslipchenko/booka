import {AccountData} from '~app/typings/account.types';

export class SetAccountData {
  public static readonly type = '[Profile] SetAccountData';

  public constructor(public payload: AccountData) {}
}

export class EditAccountData {
  public static readonly type = '[Profile] EditAccountData';

  public constructor(public payload: AccountData) {}
}
