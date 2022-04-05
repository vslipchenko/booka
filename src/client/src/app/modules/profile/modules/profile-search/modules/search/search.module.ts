import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {SharedModule} from '~app/shared/shared.module';
import {SearchComponent} from '~app/modules/profile/modules/profile-search/modules/search/search.component';

@NgModule({
  declarations: [SearchComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: SearchComponent,
      },
    ]),
    SharedModule,
  ],
})
export class SearchModule {}
