import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConfirmationComponent} from './confirmation.component';
import {RouterModule} from '@angular/router';
import {SharedModule} from '~app/shared/shared.module';

@NgModule({
  declarations: [ConfirmationComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ConfirmationComponent,
      },
    ]),
    SharedModule,
  ],
})
export class ConfirmationModule {}
