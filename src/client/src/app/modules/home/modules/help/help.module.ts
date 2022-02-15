import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HelpComponent} from './help.component';
import {RouterModule} from '@angular/router';
import {SharedModule} from '~app/shared/shared.module';

@NgModule({
  declarations: [HelpComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: HelpComponent,
      },
    ]),
    SharedModule,
  ],
})
export class HelpModule {}
