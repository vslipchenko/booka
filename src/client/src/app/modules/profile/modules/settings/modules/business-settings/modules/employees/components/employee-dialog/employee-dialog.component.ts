import {ChangeDetectionStrategy, Component, EventEmitter, Output} from '@angular/core';
import {FormControl, ValidationErrors, Validators} from '@angular/forms';
import {EMAIL_REGEXP} from '~app/constants/validation';
import {Destroyable} from '~app/typings/component.interfaces';
import {BehaviorSubject, finalize, Subject, takeUntil} from 'rxjs';
import {SnackbarService} from '~app/shared/services/snackbar/snackbar.service';
import {AddEmployerConfirmationFailReason} from '~app/typings/employer-confirmation.enums';
import {EmployerConfirmationService} from '~app/services/employer-confirmation/employer-confirmation.service';

@Component({
  selector: 'app-employee-dialog',
  templateUrl: './employee-dialog.component.html',
  styleUrls: ['./employee-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeDialogComponent implements Destroyable {
  @Output() public readonly employeeAdded = new EventEmitter<void>();

  @Output() public readonly inviteUser = new EventEmitter<string>();

  public readonly destroy$ = new Subject<void>();
  public readonly loading$ = new BehaviorSubject(false);
  public readonly email = new FormControl('', [Validators.required, Validators.pattern(EMAIL_REGEXP)]);

  public constructor(
    private readonly employerConfirmationService: EmployerConfirmationService,
    private readonly snackbarService: SnackbarService,
  ) {}

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.loading$.complete();
  }

  public addEmployee(): void {
    this.email.markAsTouched();
    this.email.updateValueAndValidity();

    if (!this.email.valid) return;

    this.loading$.next(true);

    this.employerConfirmationService
      .addEmployerConfirmation(this.email.value)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.loading$.next(false)),
      )
      .subscribe(
        (result) => {
          if (result.data?.addEmployerConfirmation.reason === AddEmployerConfirmationFailReason.UserNotExist) {
            this.inviteUser.emit(this.email.value);
          } else if (result.data?.addEmployerConfirmation.reason === AddEmployerConfirmationFailReason.AlreadyAdded) {
            this.snackbarService.open(
              'Пользователь с указанным имейл уже добавлен, либо еще не подтвердил отправленный запрос.',
              'OK',
            );
          } else if (result.data?.addEmployerConfirmation.reason === AddEmployerConfirmationFailReason.MailingFailure) {
            this.snackbarService.open('Что-то пошло не так. Не удалось отправить письмо с подтверждением.', 'OK');
          } else {
            this.snackbarService.open('Письмо с подтверджением успешно отправлено сотруднику на email.', 'OK');

            this.employeeAdded.emit();
          }
        },
        () => this.snackbarService.open('Что-то пошло не так. Пожалуйста, повторите попытку позже.', 'OK'),
      );
  }

  public errorMessage(errors: ValidationErrors | null): string | void {
    if (!errors) return;

    if ('pattern' in errors) return 'Неверный формат';

    return 'Обязательное поле';
  }
}
