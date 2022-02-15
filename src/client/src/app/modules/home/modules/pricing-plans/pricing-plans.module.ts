import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PricingPlansComponent} from './pricing-plans.component';
import {RouterModule} from '@angular/router';
import {SharedModule} from '~app/shared/shared.module';
import {PlanCardComponent} from './components/plan-card/plan-card.component';

@NgModule({
  declarations: [PricingPlansComponent, PlanCardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: PricingPlansComponent,
      },
    ]),
    SharedModule,
  ],
})
export class PricingPlansModule {}
