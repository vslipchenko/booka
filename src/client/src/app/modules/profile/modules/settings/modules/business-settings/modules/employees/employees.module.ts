import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EmployeesComponent} from './employees.component';
import {RouterModule} from '@angular/router';
import {SharedModule} from '~app/shared/shared.module';
import {EmployeeDialogComponent} from './components/employee-dialog/employee-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {InviteEmployeeDialogComponent} from './components/invite-employee-dialog/invite-employee-dialog.component';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';

@NgModule({
  declarations: [EmployeesComponent, EmployeeDialogComponent, InviteEmployeeDialogComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: EmployeesComponent,
      },
    ]),
    SharedModule,
    MatDialogModule,
    MatIconModule,
    MatTooltipModule,
  ],
})
export class EmployeesModule {}
