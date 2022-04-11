import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EmployeesComponent} from './employees.component';
import {RouterModule} from '@angular/router';
import {SharedModule} from '~app/shared/shared.module';
import {EmployeeDialogComponent} from './components/employee-dialog/employee-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  declarations: [EmployeesComponent, EmployeeDialogComponent],
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
  ],
})
export class EmployeesModule {}
