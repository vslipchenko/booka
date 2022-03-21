import {ProfileState, ProfileStateModel} from '~app/modules/profile/store/profile.state';
import {createSelector} from '@ngxs/store';
import {AccountTariffs} from '~app/typings/account.enums';

export class ProfileSelectors {
  public static loading = createSelector([ProfileState], (state: ProfileStateModel) => {
    return state.loading;
  });

  public static accountData = createSelector([ProfileState], (state: ProfileStateModel) => {
    return state.accountData;
  });

  public static needsToBePaid = createSelector([ProfileState], (state: ProfileStateModel) => {
    return state.accountData.tariff !== AccountTariffs.Client && !state.accountData.paid_at; // TODO: || paid_at date exceeds 28 days
  });

  public static requiresAdditionalInfo = createSelector([ProfileState], (state: ProfileStateModel) => {
    if (state.accountData.tariff === AccountTariffs.Client) {
      return !(
        state.accountData.first_name &&
        state.accountData.gender &&
        state.accountData.birth_date &&
        state.accountData.phone_number_1
      );
    }

    return false;
  });
}
