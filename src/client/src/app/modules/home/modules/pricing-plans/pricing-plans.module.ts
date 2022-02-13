import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PricingPlansComponent} from './pricing-plans.component';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [PricingPlansComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: PricingPlansComponent,
      },
    ]),
  ],
})
export class PricingPlansModule {}
