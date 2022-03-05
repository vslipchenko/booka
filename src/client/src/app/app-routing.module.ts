import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeModule} from '~app/modules/home/home.module';
import {PageNotFoundModule} from '~app/modules/page-not-found/page-not-found.module';
import {AccountModule} from '~app/modules/account/account.module';

const routes: Routes = [
  {
    path: '',
    loadChildren: (): Promise<string | typeof HomeModule> =>
      import('~app/modules/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'account',
    loadChildren: (): Promise<string | typeof AccountModule> =>
      import('~app/modules/account/account.module').then((m) => m.AccountModule),
  },
  {
    path: '**',
    loadChildren: (): Promise<string | typeof PageNotFoundModule> =>
      import('~app/modules/page-not-found/page-not-found.module').then((m) => m.PageNotFoundModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
