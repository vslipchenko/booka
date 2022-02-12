import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomepageModule} from '~app/modules/home/modules/homepage/homepage.module';
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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
