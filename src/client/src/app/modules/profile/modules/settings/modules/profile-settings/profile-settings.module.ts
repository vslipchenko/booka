import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProfileSettingsComponent} from './profile-settings.component';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [ProfileSettingsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ProfileSettingsComponent,
      },
    ]),
  ],
})
export class ProfileSettingsModule {}
