import {ChangeDetectionStrategy, Component} from '@angular/core';
import {EmployeeDialogComponent} from '~app/modules/profile/modules/settings/modules/business-settings/modules/employees/components/employee-dialog/employee-dialog.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeesComponent {
  public constructor(private readonly dialog: MatDialog) {}

  public addEmployee(): void {
    this.dialog.open(EmployeeDialogComponent, {autoFocus: 'dialog', panelClass: ['dialog', 'narrow-dialog']});
  }
}
