import {ChangeDetectionStrategy, Component} from '@angular/core';
import {SelectItem} from '~app/typings/select.interfaces';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {map, Observable, Subject, take, takeUntil} from 'rxjs';
import {AccountType} from '~app/typings/account-type.types';
import {AccountTypes} from '~app/typings/account-type.enums';
import {Destroyable} from '~app/typings/component.interfaces';
import {AuthenticationService} from '~app/services/authentication/authentication.service';
import {EMAIL_REGEXP, PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH, PASSWORD_REGEXP} from '~app/constants/regexp';
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
  public readonly accountTypes: Array<SelectItem> = [
    {title: 'Клиент', value: AccountTypes.Client},
    {title: 'Предприниматель', value: AccountTypes.Entrepreneur},
    {title: 'Бизнес', value: AccountTypes.Business},
  ];
  public readonly destroy$ = new Subject<void>();

  public readonly signUpForm = this.signUpFormGroup;

  public constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly authenticationService: AuthenticationService,
    private readonly userService: UserService,
    private readonly translocoService: TranslocoService,
    private readonly snackbarService: SnackbarService,
  ) {
    this.activatedRoute.queryParams
      .pipe(takeUntil(this.destroy$), take(1))
      .subscribe((params) => this.setAccountValue((params as {account: AccountType}).account));
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
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
      case 'duplicateEmail' in errors:
        return 'Пользователь с таким email уже существует';
    }
  }

  private createUser(): void {
    // signUpForm.invalid prop values is always false for whatever reason
    if (!this.signUpForm.valid) return;

    this.userService
      .create({...this.signUpForm.value, locale: this.translocoService.getActiveLang()})
      .pipe(takeUntil(this.destroy$))
      .subscribe((result) => {
        if (result.data?.createUser.success) {
          this.snackbarService.open('Регистрация прошла успешно.', 'OK');
        }

        this.snackbarService.open('Что-то пошло не так. Проверьте введенные данные или повторите попытку позже.', 'OK');
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

    this.account.updateValueAndValidity();
    this.email.updateValueAndValidity();
    this.password.updateValueAndValidity();
  }

  private setAccountValue(type: AccountType): void {
    switch (type) {
      case 'client':
        this.account.setValue(AccountTypes.Client);
        break;
      case 'entrepreneur':
        this.account.setValue(AccountTypes.Entrepreneur);
        break;
      case 'business':
        this.account.setValue(AccountTypes.Business);
        break;
    }
  }

  public get signUpFormGroup(): FormGroup {
    return new FormGroup({
      accountType: new FormControl(null, Validators.required),
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

  public get account(): FormControl {
    return this.signUpForm.controls['accountType'] as FormControl;
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
