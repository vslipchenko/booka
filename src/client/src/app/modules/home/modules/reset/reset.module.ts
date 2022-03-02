import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ResetComponent} from './reset.component';
import {SharedModule} from '~app/shared/shared.module';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [ResetComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ResetComponent,
      },
    ]),
    SharedModule,
  ],
})
export class ResetModule {}
