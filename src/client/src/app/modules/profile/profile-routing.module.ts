import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {ProfileComponent} from '~app/modules/profile/profile.component';
import {SettingsModule} from '~app/modules/profile/modules/settings/settings.module';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    children: [
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
