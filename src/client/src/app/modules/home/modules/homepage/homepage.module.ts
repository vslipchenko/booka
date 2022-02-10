import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomepageComponent} from './homepage.component';
import {RouterModule} from '@angular/router';
import {TRANSLOCO_SCOPE, TranslocoModule} from '@ngneat/transloco';

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
  ],
  providers: [{provide: TRANSLOCO_SCOPE, useValue: 'homepage'}],
})
export class HomepageModule {}
