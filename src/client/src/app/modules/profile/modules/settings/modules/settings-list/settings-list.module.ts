import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SettingsListComponent} from './settings-list.component';
import {RouterModule} from '@angular/router';
import {SharedModule} from '~app/shared/shared.module';

@NgModule({
  declarations: [SettingsListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: SettingsListComponent,
      },
    ]),
    SharedModule,
  ],
})
export class SettingsListModule {}
