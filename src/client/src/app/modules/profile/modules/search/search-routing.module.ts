import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {SearchResultsModule} from '~app/modules/profile/modules/search/modules/search-results/search-results.module';
import {SearchComponent} from '~app/modules/profile/modules/search/search.component';

const routes: Routes = [
  {
    path: '',
    component: SearchComponent,
  },
  {
    path: 'results',
    loadChildren: (): Promise<SearchResultsModule> =>
      import('~app/modules/profile/modules/search/modules/search-results/search-results.module').then(
        (m) => m.SearchResultsModule,
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchRoutingModule {}
