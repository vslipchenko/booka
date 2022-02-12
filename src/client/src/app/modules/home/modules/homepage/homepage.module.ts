import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomepageComponent} from './homepage.component';
import {RouterModule} from '@angular/router';
import {TRANSLOCO_SCOPE, TranslocoModule} from '@ngneat/transloco';
import {HomepageSectionComponent} from './components/homepage-section/homepage-section.component';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [HomepageComponent, HomepageSectionComponent],
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
  ],
  providers: [{provide: TRANSLOCO_SCOPE, useValue: 'homepage'}],
})
export class HomepageModule {}
