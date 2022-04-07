import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ServicesComponent} from './services.component';
import {RouterModule} from '@angular/router';
import {SharedModule} from '~app/shared/shared.module';
import {ServiceDialogComponent} from './components/service-dialog/service-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';

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
    MatIconModule,
    MatTooltipModule,
  ],
})
export class ServicesModule {}
