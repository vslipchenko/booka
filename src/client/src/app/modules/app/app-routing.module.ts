import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeModule} from '~app/modules/home/home.module';
import {PageNotFoundModule} from '~app/modules/page-not-found/page-not-found.module';
import {ProfileModule} from '~app/modules/profile/profile.module';
import {ProfileCanActivateGuard} from '~app/guards/profile/can-activate/profile.guard';
import {ProfileCanLoadGuard} from '~app/guards/profile/can-load/profile.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: (): Promise<string | typeof HomeModule> =>
      import('~app/modules/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'profile',
    canActivate: [ProfileCanActivateGuard],
    canLoad: [ProfileCanLoadGuard],
    loadChildren: (): Promise<string | typeof ProfileModule> =>
      import('~app/modules/profile/profile.module').then((m) => m.ProfileModule),
  },
  {
    path: '**',
    loadChildren: (): Promise<string | typeof PageNotFoundModule> =>
      import('~app/modules/page-not-found/page-not-found.module').then((m) => m.PageNotFoundModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: false, enableTracing: false})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
