import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeModule} from '~app/modules/home/home.module';

const routes: Routes = [
  {
    path: '',
    loadChildren: (): Promise<string | typeof HomeModule> =>
      import('~app/modules/home/home.module').then((m) => m.HomeModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
