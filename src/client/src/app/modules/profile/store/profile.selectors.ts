import {ProfileState, ProfileStateModel} from '~app/modules/profile/store/profile.state';
import {createSelector} from '@ngxs/store';
import {AccountTariffs} from '~app/typings/account.enums';
import {dayDifference} from '~app/shared/utilities/date';
import {PAID_PLAN_DAY_DURATION} from '~app/constants/date';

export class ProfileSelectors {
  public static loading = createSelector([ProfileState], (state: ProfileStateModel) => {
    return state.loading;
  });

  public static accountData = createSelector([ProfileState], (state: ProfileStateModel) => {
    return state.accountData;
  });

  public static needsToBePaid = createSelector([ProfileState], (state: ProfileStateModel) => {
    if (state.accountData.tariff === AccountTariffs.Client) return false;

    return dayDifference(new Date(Number(state.accountData.paid_at)), new Date()) > PAID_PLAN_DAY_DURATION;
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

    if (state.accountData.tariff === AccountTariffs.Entrepreneur) {
      return !(
        state.accountData.first_name &&
        state.accountData.last_name &&
        state.accountData.gender &&
        state.accountData.birth_date &&
        state.accountData.business_category &&
        state.accountData.phone_number_1
      );
    }

    return !(state.accountData.name && state.accountData.business_category && state.accountData.phone_number_1);
  });
}
