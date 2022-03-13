import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProfileHomeComponent} from './profile-home.component';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [ProfileHomeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ProfileHomeComponent,
      },
    ]),
  ],
})
export class ProfileHomeModule {}
