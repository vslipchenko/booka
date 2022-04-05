import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {SearchModule} from '~app/modules/profile/modules/profile-search/modules/search/search.module';
import {SearchResultsModule} from '~app/modules/profile/modules/profile-search/modules/search-results/search-results.module';

const routes: Routes = [
  {
    path: '',
    loadChildren: (): Promise<SearchModule> =>
      import('~app/modules/profile/modules/profile-search/modules/search/search.module').then((m) => m.SearchModule),
  },
  {
    path: 'results',
    loadChildren: (): Promise<SearchResultsModule> =>
      import('~app/modules/profile/modules/profile-search/modules/search-results/search-results.module').then(
        (m) => m.SearchResultsModule,
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileSearchRoutingModule {}
