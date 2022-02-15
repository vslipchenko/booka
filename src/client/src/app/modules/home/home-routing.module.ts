import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomepageModule} from '~app/modules/home/modules/homepage/homepage.module';
import {HomeComponent} from '~app/modules/home/home.component';
import {PricingPlansModule} from '~app/modules/home/modules/pricing-plans/pricing-plans.module';
import {FaqModule} from '~app/modules/home/modules/faq/faq.module';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        loadChildren: (): Promise<HomepageModule> =>
          import('~app/modules/home/modules/homepage/homepage.module').then((m) => m.HomepageModule),
      },
      {
        path: 'faq',
        loadChildren: (): Promise<FaqModule> =>
          import('~app/modules/home/modules/faq/faq.module').then((m) => m.FaqModule),
      },
      {
        path: 'pricing',
        loadChildren: (): Promise<PricingPlansModule> =>
          import('~app/modules/home/modules/pricing-plans/pricing-plans.module').then((m) => m.PricingPlansModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
