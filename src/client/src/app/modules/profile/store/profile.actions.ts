import {AccountData, ParticularAccountData} from '~app/typings/account.types';

export class SetLoading {
  public static readonly type = '[Profile] SetLoading';

  public constructor(public payload: boolean) {
  }
}

export class SetAccountData {
  public static readonly type = '[Profile] SetAccountData';

  public constructor(public payload: AccountData) {
  }
}

export class EditAccountData {
  public static readonly type = '[Profile] EditAccountData';

  public constructor(public payload: ParticularAccountData) {
  }
}
