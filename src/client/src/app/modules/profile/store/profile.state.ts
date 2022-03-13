import {Action, State, StateContext, StateToken} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {AccountTariffs} from '~app/typings/account.enums';
import {SetAccountVitals} from '~app/modules/profile/store/profile.actions';
import {AccountVitals} from '~app/typings/account.interfaces';

export interface ProfileStateModel {
  account: AccountVitals;
}

const PROFILE_STATE = new StateToken<ProfileStateModel>('profile');

@State({
  name: PROFILE_STATE,
  defaults: {
    account: {
      tariff: AccountTariffs.Client,
      first_name: '',
      middle_name: '',
      last_name: '',
      paid_at: '',
    },
  },
})
@Injectable()
export class ProfileState {
  @Action(SetAccountVitals) private setAccountVitals(
    context: StateContext<ProfileStateModel>,
    action: SetAccountVitals,
  ): void {
    context.setState((state) => ({
      ...state,
      account: {
        ...state.account,
        ...action.payload.accountVitals,
      },
    }));
  }
}
