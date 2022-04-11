import {RouterModule, Routes} from '@angular/router';
import {SettingsListModule} from '~app/modules/profile/modules/settings/modules/business-settings/modules/settings-list/settings-list.module';
import {ProfileSettingsModule} from '~app/modules/profile/modules/settings/modules/business-settings/modules/profile-settings/profile-settings.module';
import {NgModule} from '@angular/core';
import {EmployeesModule} from '~app/modules/profile/modules/settings/modules/business-settings/modules/employees/employees.module';

const routes: Routes = [
  {
    path: '',
    loadChildren: (): Promise<SettingsListModule> =>
      import(
        '~app/modules/profile/modules/settings/modules/business-settings/modules/settings-list/settings-list.module'
      ).then((m) => m.SettingsListModule),
  },
  {
    path: 'profile',
    loadChildren: (): Promise<ProfileSettingsModule> =>
      import(
        '~app/modules/profile/modules/settings/modules/business-settings/modules/profile-settings/profile-settings.module'
      ).then((m) => m.ProfileSettingsModule),
  },
  {
    path: 'employees',
    loadChildren: (): Promise<EmployeesModule> =>
      import('~app/modules/profile/modules/settings/modules/business-settings/modules/employees/employees.module').then(
        (m) => m.EmployeesModule,
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BusinessSettingsRoutingModule {}
