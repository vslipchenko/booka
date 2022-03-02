import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RecoveryComponent} from './recovery.component';
import {RouterModule} from '@angular/router';
import {SharedModule} from '~app/shared/shared.module';

@NgModule({
  declarations: [RecoveryComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: RecoveryComponent,
      },
    ]),
    SharedModule,
  ],
})
export class RecoveryModule {}
