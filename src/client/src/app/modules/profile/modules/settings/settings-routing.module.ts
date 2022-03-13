import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SettingsComponent} from '~app/modules/profile/modules/settings/settings.component';
import {SettingsListModule} from '~app/modules/profile/modules/settings/modules/settings-list/settings-list.module';

const routes: Routes = [
  {
    path: '',
    component: SettingsComponent,
    children: [
      {
        path: '',
        loadChildren: (): Promise<SettingsListModule> =>
          import('~app/modules/profile/modules/settings/modules/settings-list/settings-list.module').then(
            (m) => m.SettingsListModule,
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsRoutingModule {}
