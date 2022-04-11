import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {SnackbarService} from '~app/shared/services/snackbar/snackbar.service';
import {Destroyable} from '~app/typings/component.interfaces';

@Component({
  selector: 'app-invite-employee-dialog',
  templateUrl: './invite-employee-dialog.component.html',
  styleUrls: ['./invite-employee-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InviteEmployeeDialogComponent implements Destroyable {
  public readonly destroy$ = new Subject<void>();
  public readonly loading$ = new BehaviorSubject(false);

  public constructor(
    @Inject(MAT_DIALOG_DATA) public readonly data: {email: string},
    private readonly snackbarService: SnackbarService,
  ) {}

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.loading$.complete();
  }

  public send(): void {
    this.loading$.next(true);
  }
}
