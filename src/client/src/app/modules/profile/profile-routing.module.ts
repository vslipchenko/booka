import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {ProfileComponent} from '~app/modules/profile/profile.component';
import {SettingsModule} from '~app/modules/profile/modules/settings/settings.module';
import {ProfileHomeModule} from '~app/modules/profile/modules/profile-home/profile-home.module';
import {ProfileSearchModule} from '~app/modules/profile/modules/search/profile-search.module';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    children: [
      {
        path: '',
        loadChildren: (): Promise<ProfileHomeModule> =>
          import('~app/modules/profile/modules/profile-home/profile-home.module').then((m) => m.ProfileHomeModule),
      },
      {
        path: 'search',
        loadChildren: (): Promise<ProfileSearchModule> =>
          import('~app/modules/profile/modules/search/profile-search.module').then((m) => m.ProfileSearchModule),
      },
      {
        path: 'settings',
        loadChildren: (): Promise<SettingsModule> =>
          import('~app/modules/profile/modules/settings/settings.module').then((m) => m.SettingsModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
