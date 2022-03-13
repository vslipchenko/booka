import {AccountVitalsQueryResult} from '~app/typings/account.interfaces';

export class SetAccountVitals {
  public static readonly type = '[Profile] SetAccountVitals';

  public constructor(public payload: AccountVitalsQueryResult) {}
}
