import {RouterModule, Routes} from '@angular/router';
import {SettingsListModule} from '~app/modules/profile/modules/settings/modules/entrepreneur-settings/modules/settings-list/settings-list.module';
import {ProfileSettingsModule} from '~app/modules/profile/modules/settings/modules/entrepreneur-settings/modules/profile-settings/profile-settings.module';
import {NgModule} from '@angular/core';
import {ScheduleModule} from '~app/modules/profile/modules/settings/modules/entrepreneur-settings/modules/schedule/schedule.module';
import {ServicesModule} from '~app/modules/profile/modules/settings/modules/entrepreneur-settings/modules/services/services.module';

const routes: Routes = [
  {
    path: '',
    loadChildren: (): Promise<SettingsListModule> =>
      import(
        '~app/modules/profile/modules/settings/modules/entrepreneur-settings/modules/settings-list/settings-list.module'
      ).then((m) => m.SettingsListModule),
  },
  {
    path: 'profile',
    loadChildren: (): Promise<ProfileSettingsModule> =>
      import(
        '~app/modules/profile/modules/settings/modules/entrepreneur-settings/modules/profile-settings/profile-settings.module'
      ).then((m) => m.ProfileSettingsModule),
  },
  {
    path: 'schedule',
    loadChildren: (): Promise<ScheduleModule> =>
      import(
        '~app/modules/profile/modules/settings/modules/entrepreneur-settings/modules/schedule/schedule.module'
      ).then((m) => m.ScheduleModule),
  },
  {
    path: 'services',
    loadChildren: (): Promise<ServicesModule> =>
      import(
        '~app/modules/profile/modules/settings/modules/entrepreneur-settings/modules/services/services.module'
      ).then((m) => m.ServicesModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EntrepreneurSettingsRoutingModule {}
