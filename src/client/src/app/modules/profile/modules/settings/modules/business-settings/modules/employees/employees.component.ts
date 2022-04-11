import {ChangeDetectionStrategy, Component} from '@angular/core';
import {EmployeeDialogComponent} from '~app/modules/profile/modules/settings/modules/business-settings/modules/employees/components/employee-dialog/employee-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {InviteEmployeeDialogComponent} from '~app/modules/profile/modules/settings/modules/business-settings/modules/employees/components/invite-employee-dialog/invite-employee-dialog.component';
import {takeUntil} from 'rxjs';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeesComponent {
  public constructor(private readonly dialog: MatDialog) {}

  public addEmployee(): void {
    const dialog = this.dialog.open(EmployeeDialogComponent, {
      autoFocus: 'dialog',
      panelClass: ['dialog', 'narrow-dialog'],
    });

    dialog.componentInstance.inviteUser.pipe(takeUntil(dialog.afterClosed())).subscribe((email) => {
      dialog.close();

      this.dialog.open(InviteEmployeeDialogComponent, {
        autoFocus: 'dialog',
        panelClass: ['dialog', 'narrow-dialog'],
        data: {
          email,
        },
      });
    });
  }
}
