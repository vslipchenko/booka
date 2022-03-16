import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SettingsListComponent} from './settings-list.component';
import {RouterModule} from '@angular/router';

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
  ],
})
export class SettingsListModule {}
