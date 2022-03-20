import {Action, State, StateContext, StateToken} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {SetAccountData} from '~app/modules/profile/store/profile.actions';
import {AccountTariffs} from '~app/typings/account.enums';
import {AccountData} from '~app/typings/account.types';

export interface ProfileStateModel {
  accountData: AccountData;
}

const PROFILE_STATE = new StateToken<ProfileStateModel>('profile');

@State({
  name: PROFILE_STATE,
  defaults: {
    accountData: {
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
      accountData: {
        ...state.accountData,
        ...action.payload,
      },
    }));
  }
}
