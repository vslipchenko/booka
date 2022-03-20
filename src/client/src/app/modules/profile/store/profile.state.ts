import {Action, State, StateContext, StateToken} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {SetAccountData} from '~app/modules/profile/store/profile.actions';
import {AccountData} from '~app/typings/account.interfaces';
import {AccountTariffs} from '~app/typings/account.enums';

export interface ProfileStateModel {
  account: AccountData;
}

const PROFILE_STATE = new StateToken<ProfileStateModel>('profile');

@State({
  name: PROFILE_STATE,
  defaults: {
    account: {
      tariff: AccountTariffs.None,
      first_name: '',
      middle_name: '',
      last_name: '',
      paid_at: '',
    },
  },
})
@Injectable()
export class ProfileState {
  @Action(SetAccountData) private setAccountData(
    context: StateContext<ProfileStateModel>,
    action: SetAccountData,
  ): void {
    context.setState((state) => ({
      ...state,
      account: {
        ...state.account,
        ...action.payload.accountData,
      },
    }));
  }
}
