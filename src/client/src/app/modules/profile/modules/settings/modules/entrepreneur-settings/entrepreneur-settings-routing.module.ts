import {RouterModule, Routes} from '@angular/router';
import {SettingsListModule} from '~app/modules/profile/modules/settings/modules/entrepreneur-settings/modules/settings-list/settings-list.module';
import {ProfileSettingsModule} from '~app/modules/profile/modules/settings/modules/entrepreneur-settings/modules/profile-settings/profile-settings.module';
import {NgModule} from '@angular/core';

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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EntrepreneurSettingsRoutingModule {}
