import {Action, State, StateContext, StateToken} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {EditAccountData, SetAccountData, SetLoading} from '~app/modules/profile/store/profile.actions';
import {AccountTariffs} from '~app/typings/account.enums';
import {AccountData} from '~app/typings/account.types';
import {Gender} from '~app/typings/user.enums';
import {ProfileService} from '~app/services/profile/profile.service';
import {Observable, tap} from 'rxjs';
import {City, Region} from '~app/typings/toponymy.enums';

export interface ProfileStateModel {
  accountData: AccountData;
  loading: boolean;
}

const PROFILE_STATE = new StateToken<ProfileStateModel>('profile');

@State({
  name: PROFILE_STATE,
  defaults: {
    // Here is the mix of account data for client, entrepreneur, business tariffs
    accountData: {
      // Base
      tariff: AccountTariffs.None,
      thumbnail: '',
      description: '',
      phone_number_1: '',
      phone_number_2: '',
      phone_number_3: '',
      whatsapp_number: '',
      viber_number: '',
      telegram_username: '',
      // Client & Entrepreneur
      first_name: '',
      middle_name: '',
      last_name: '',
      gender: Gender.None,
      birth_date: '',
      // Entrepreneur & Business
      website: '',
      facebook_username: '',
      twitter_username: '',
      instagram_username: '',
      offsite_work: false,
      region: Region.None,
      city: City.None,
      google_maps: '',
      paid_at: '',
      // Business
      name: '',
    },
    loading: false,
  },
})
@Injectable()
export class ProfileState {
  public constructor(private readonly profileService: ProfileService) {}

  @Action(SetLoading) private setLoading(context: StateContext<ProfileStateModel>, action: SetLoading): void {
    context.setState((state) => ({
      ...state,
      loading: action.payload,
    }));
  }

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

  @Action(EditAccountData) private editAccountData(
    context: StateContext<ProfileStateModel>,
    action: EditAccountData,
  ): Observable<unknown> {
    return this.profileService.editProfile(action.payload).pipe(
      tap(() => {
        context.setState((state) => ({
          ...state,
          accountData: {
            ...state.accountData,
            ...action.payload,
          },
        }));
      }),
    );
  }
}
