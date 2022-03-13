import {Action, State, StateContext, StateToken} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {AccountTariffs} from '~app/typings/account.enums';
import {SetAccountVitals} from '~app/modules/profile/store/profile.actions';

export interface ProfileStateModel {
  account: {
    tariff: AccountTariffs;
  };
}

const PROFILE_STATE = new StateToken<ProfileStateModel>('profile');

@State({
  name: PROFILE_STATE,
  defaults: {
    account: {
      tariff: AccountTariffs.Client,
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
