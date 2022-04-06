import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ServicesComponent} from './services.component';
import {RouterModule} from '@angular/router';
import {SharedModule} from '~app/shared/shared.module';
import {ServiceDialogComponent} from './components/service-dialog/service-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  declarations: [ServicesComponent, ServiceDialogComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ServicesComponent,
      },
    ]),
    SharedModule,
    MatDialogModule,
  ],
})
export class ServicesModule {}
