import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProfileSettingsComponent} from './profile-settings.component';
import {RouterModule} from '@angular/router';
import {SharedModule} from '~app/shared/shared.module';
import {MatIconModule} from '@angular/material/icon';

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
    SharedModule,
    MatIconModule,
  ],
})
export class ProfileSettingsModule {}
