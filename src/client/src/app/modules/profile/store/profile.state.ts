import {Action, State, StateContext, StateToken} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {AccountTypes} from '~app/typings/account.enums';
import {SetAccountVitals} from '~app/modules/profile/store/profile.actions';

export interface ProfileStateModel {
  account: {
    account_type: AccountTypes;
  };
}

const PROFILE_STATE = new StateToken<ProfileStateModel>('profile');

@State({
  name: PROFILE_STATE,
  defaults: {
    account: {
      account_type: AccountTypes.Client,
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
