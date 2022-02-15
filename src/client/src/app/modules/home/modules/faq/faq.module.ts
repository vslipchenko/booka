import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FaqComponent} from './faq.component';
import {RouterModule} from '@angular/router';
import {SharedModule} from '~app/shared/shared.module';

@NgModule({
  declarations: [FaqComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: FaqComponent,
      },
    ]),
    SharedModule,
  ],
})
export class FaqModule {}
