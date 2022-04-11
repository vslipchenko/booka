import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormControl, ValidationErrors, Validators} from '@angular/forms';
import {EMAIL_REGEXP} from '~app/constants/validation';
import {EmploymentService} from '~app/services/employment/employment.service';
import {Destroyable} from '~app/typings/component.interfaces';
import {BehaviorSubject, finalize, Subject, takeUntil} from 'rxjs';
import {SnackbarService} from '~app/shared/services/snackbar/snackbar.service';
import {AddEmployeeFailReason} from '~app/typings/employment.enums';

@Component({
  selector: 'app-employee-dialog',
  templateUrl: './employee-dialog.component.html',
  styleUrls: ['./employee-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeDialogComponent implements Destroyable {
  public readonly destroy$ = new Subject<void>();
  public readonly loading$ = new BehaviorSubject(false);
  public readonly email = new FormControl('', [Validators.required, Validators.pattern(EMAIL_REGEXP)]);

  public constructor(
    private readonly employmentService: EmploymentService,
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

    this.employmentService
      .addEmployee(this.email.value)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.loading$.next(false)),
      )
      .subscribe(
        (result) => {
          console.log(result);

          if (result.data?.addEmployee.reason === AddEmployeeFailReason.UserNotExist)
            this.snackbarService.open('Похоже, что пользователь с указанным email не зарегистрирован.', 'OK');

          if (result.data?.addEmployee.reason === AddEmployeeFailReason.AlreadyAdded)
            this.snackbarService.open(
              'Пользователь с указанным имейл уже добавлен, либо еще не подтвердил запрос.',
              'OK',
            );

          if (result.data?.addEmployee.reason === AddEmployeeFailReason.MailingFailure)
            this.snackbarService.open('Что-то пошло не так. Не удалось отправить письмо с подтверждением.', 'OK');
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
