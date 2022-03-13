import {ProfileState, ProfileStateModel} from '~app/modules/profile/store/profile.state';
import {createSelector} from '@ngxs/store';

export class ProfileSelectors {
  public static getAccountVitals = createSelector([ProfileState], (state: ProfileStateModel) => {
    return state;
  });
}
