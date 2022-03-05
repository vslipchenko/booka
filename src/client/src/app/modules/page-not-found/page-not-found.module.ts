import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {PageNotFoundComponent} from '~app/modules/page-not-found/page-not-found.component';
import {SharedModule} from '~app/shared/shared.module';

@NgModule({
  declarations: [PageNotFoundComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: PageNotFoundComponent,
      },
    ]),
    SharedModule,
  ],
})
export class PageNotFoundModule {}
