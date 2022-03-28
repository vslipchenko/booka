import {ChangeDetectionStrategy, Component} from '@angular/core';
import {SelectItem} from '~app/typings/select.interfaces';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {BehaviorSubject, finalize, map, Observable, Subject, take, takeUntil} from 'rxjs';
import {AccountTariff} from '~app/typings/account.types';
import {AccountTariffs} from '~app/typings/account.enums';
import {Destroyable} from '~app/typings/component.interfaces';
import {AuthenticationService} from '~app/services/authentication/authentication.service';
import {EMAIL_REGEXP, PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH, PASSWORD_REGEXP} from '~app/constants/validation';
import {UserService} from '~app/services/user/user.service';
import {TranslocoService} from '@ngneat/transloco';
import {SnackbarService} from '~app/shared/services/snackbar/snackbar.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpComponent implements Destroyable {
  public readonly accountTariffs: Array<SelectItem> = [
    {title: 'Клиент', value: AccountTariffs.Client},
    {title: 'Предприниматель', value: AccountTariffs.Entrepreneur},
    {title: 'Бизнес', value: AccountTariffs.Business},
  ];
  public readonly destroy$ = new Subject<void>();
  public readonly loading$ = new BehaviorSubject(false);

  private readonly signUpForm = this.signUpFormGroup;

  public constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly authenticationService: AuthenticationService,
    private readonly userService: UserService,
    private readonly translocoService: TranslocoService,
    private readonly snackbarService: SnackbarService,
  ) {
    this.activatedRoute.queryParams
      .pipe(takeUntil(this.destroy$), take(1))
      .subscribe((params) => this.setAccountValue((params as {account: AccountTariff}).account));
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.loading$.complete();
  }

  public signUp(): void {
    this.validateForm();

    setTimeout(this.createUser.bind(this));
  }

  public emailErrorMessage(errors: ValidationErrors | null): string | void {
    if (!errors) return;

    switch (true) {
      case 'required' in errors:
        return this.requiredMessage;
      case 'pattern' in errors:
        return 'Неверный формат';
      case 'duplicateEmail' in errors:
        return 'Пользователь с таким email уже существует';
    }
  }

  public errorMessage(errors: ValidationErrors | null): string | void {
    if (!errors) return;

    switch (true) {
      case 'required' in errors:
        return this.requiredMessage;
      case 'minlength' in errors:
        return `Минимум ${PASSWORD_MIN_LENGTH} знаков`;
      case 'maxlength' in errors:
        return `Максимум ${PASSWORD_MAX_LENGTH} знаков`;
      case 'pattern' in errors:
        return 'Пароль должен содержать цифры и латинские буквы. Разрешены символы';
    }
  }

  private createUser(): void {
    // signUpForm.invalid prop values is always false for whatever reason
    if (!this.signUpForm.valid) return;

    this.loading$.next(true);

    this.userService
      .create({...this.signUpForm.value, language: this.translocoService.getActiveLang()})
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.loading$.next(false)),
      )
      .subscribe((result) => {
        if (!result.data?.createUser.success) {
          // Fail
          this.snackbarService.open(
            'Что-то пошло не так. Проверьте введенные данные или повторите попытку позже.',
            'OK',
          );
          return;
        }
        // Success
        this.snackbarService.open('Успешно. Письмо с подтверждением отправлено Вам на почту.', 'OK');
        this.signUpForm.reset();
      });
  }

  private duplicateEmailValidator(control: AbstractControl): Observable<null | ValidationErrors> {
    const email = control.value;

    return this.userService.checkExistenceByEmail(email).pipe(
      map(({data}) => {
        return data.userWithEmailExists.exists ? {duplicateEmail: true} : null;
      }),
    );
  }

  private validateForm(): void {
    this.signUpForm.markAllAsTouched();
  }

  private setAccountValue(type: AccountTariff): void {
    switch (type) {
      case 'client':
        this.tariff.setValue(AccountTariffs.Client);
        break;
      case 'entrepreneur':
        this.tariff.setValue(AccountTariffs.Entrepreneur);
        break;
      case 'business':
        this.tariff.setValue(AccountTariffs.Business);
        break;
    }
  }

  public get signUpFormGroup(): FormGroup {
    return new FormGroup({
      tariff: new FormControl(null, Validators.required),
      email: new FormControl(null, {
        validators: [Validators.required, Validators.pattern(EMAIL_REGEXP)],
        asyncValidators: this.duplicateEmailValidator.bind(this),
        updateOn: 'blur', // Make API call on blur
      }),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(PASSWORD_MIN_LENGTH),
        Validators.maxLength(PASSWORD_MAX_LENGTH),
        Validators.pattern(PASSWORD_REGEXP),
      ]),
    });
  }

  public get tariff(): FormControl {
    return this.signUpForm.controls['tariff'] as FormControl;
  }

  public get email(): FormControl {
    return this.signUpForm.controls['email'] as FormControl;
  }

  public get password(): FormControl {
    return this.signUpForm.controls['password'] as FormControl;
  }

  private get requiredMessage(): string {
    return 'Обязательное поле';
  }
}
