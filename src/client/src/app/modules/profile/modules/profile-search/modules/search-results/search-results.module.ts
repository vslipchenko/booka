import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {SearchResultsComponent} from '~app/modules/profile/modules/profile-search/modules/search-results/search-results.component';

@NgModule({
  declarations: [SearchResultsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: SearchResultsComponent,
      },
    ]),
  ],
})
export class SearchResultsModule {}
