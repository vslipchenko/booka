import {ProfileState, ProfileStateModel} from '~app/modules/profile/store/profile.state';
import {createSelector} from '@ngxs/store';
import {AccountTariffs} from '~app/typings/account.enums';

export class ProfileSelectors {
  public static getAccountVitals = createSelector([ProfileState], (state: ProfileStateModel) => {
    return state.account;
  });

  public static needsToBePaid = createSelector([ProfileState], (state: ProfileStateModel) => {
    return state.account.tariff !== AccountTariffs.Client && !state.account.paid_at; // TODO: || paid_at date exceeds 28 days
  });

  public static requiresAdditionalInfo = createSelector([ProfileState], (state: ProfileStateModel) => {
    if (state.account.tariff === AccountTariffs.Client) {
      return !state.account.first_name; // TODO
    }

    return false;
  });
}
