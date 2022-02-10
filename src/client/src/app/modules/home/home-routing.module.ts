import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomepageModule} from '~app/modules/home/modules/homepage/homepage.module';

const routes: Routes = [
  {
    path: '',
    loadChildren: (): Promise<string | typeof HomepageModule> =>
      import('~app/modules/home/modules/homepage/homepage.module').then((m) => m.HomepageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {
}
