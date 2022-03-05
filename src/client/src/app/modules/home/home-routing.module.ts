import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomepageModule} from '~app/modules/home/modules/homepage/homepage.module';
import {PricingPlansModule} from '~app/modules/home/modules/pricing-plans/pricing-plans.module';
import {FaqModule} from '~app/modules/home/modules/faq/faq.module';
import {HelpModule} from '~app/modules/home/modules/help/help.module';
import {FeedbackModule} from '~app/modules/home/modules/feedback/feedback.module';
import {ServicesModule} from '~app/modules/home/modules/services/services.module';
import {SignInModule} from '~app/modules/home/modules/sign-in/sign-in.module';
import {SignUpModule} from '~app/modules/home/modules/sign-up/sign-up.module';
import {RecoveryModule} from '~app/modules/home/modules/recovery/recovery.module';
import {ConfirmationModule} from '~app/modules/home/modules/confirmation/confirmation.module';
import {ResetModule} from '~app/modules/home/modules/reset/reset.module';
import {HomeComponent} from '~app/modules/home/home.component';

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
        path: 'help',
        loadChildren: (): Promise<HelpModule> =>
          import('~app/modules/home/modules/help/help.module').then((m) => m.HelpModule),
      },
      {
        path: 'reset',
        loadChildren: (): Promise<ResetModule> =>
          import('~app/modules/home/modules/reset/reset.module').then((m) => m.ResetModule),
      },
      {
        path: 'pricing',
        loadChildren: (): Promise<PricingPlansModule> =>
          import('~app/modules/home/modules/pricing-plans/pricing-plans.module').then((m) => m.PricingPlansModule),
      },
      {
        path: 'sign-in',
        loadChildren: (): Promise<SignInModule> =>
          import('~app/modules/home/modules/sign-in/sign-in.module').then((m) => m.SignInModule),
      },
      {
        path: 'sign-up',
        loadChildren: (): Promise<SignUpModule> =>
          import('~app/modules/home/modules/sign-up/sign-up.module').then((m) => m.SignUpModule),
      },
      {
        path: 'recovery',
        loadChildren: (): Promise<RecoveryModule> =>
          import('~app/modules/home/modules/recovery/recovery.module').then((m) => m.RecoveryModule),
      },
      {
        path: 'services',
        loadChildren: (): Promise<ServicesModule> =>
          import('~app/modules/home/modules/services/services.module').then((m) => m.ServicesModule),
      },
      {
        path: 'feedback',
        loadChildren: (): Promise<FeedbackModule> =>
          import('~app/modules/home/modules/feedback/feedback.module').then((m) => m.FeedbackModule),
      },
      {
        path: 'confirmation',
        loadChildren: (): Promise<ConfirmationModule> =>
          import('~app/modules/home/modules/confirmation/confirmation.module').then((m) => m.ConfirmationModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
