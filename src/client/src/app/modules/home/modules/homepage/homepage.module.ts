import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomepageComponent} from './homepage.component';
import {RouterModule} from '@angular/router';
import {TRANSLOCO_SCOPE, TranslocoModule} from '@ngneat/transloco';
import {MatIconModule} from '@angular/material/icon';
import {SharedModule} from '~app/shared/shared.module';

@NgModule({
  declarations: [HomepageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomepageComponent,
      },
    ]),
    TranslocoModule,
    MatIconModule,
    SharedModule,
  ],
  providers: [{provide: TRANSLOCO_SCOPE, useValue: 'homepage'}],
  exports: [],
})
export class HomepageModule {}
