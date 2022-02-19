import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'app-pricing-plans',
  templateUrl: './pricing-plans.component.html',
  styleUrls: ['./pricing-plans.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PricingPlansComponent {}
