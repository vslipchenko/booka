import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormControl, ValidationErrors, Validators} from '@angular/forms';
import {BehaviorSubject, finalize, Subject, takeUntil} from 'rxjs';
import {Destroyable} from '~app/typings/component.interfaces';
import {AuthenticationService} from '~app/services/authentication/authentication.service';
import {SnackbarService} from '~app/shared/services/snackbar/snackbar.service';
import {EMAIL_REGEXP, PASSWORD_REGEXP} from '~app/constants/regexp';
import {SignInFailReason} from '~app/typings/authentication.enums';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInComponent implements Destroyable {
  public readonly destroy$ = new Subject<void>();
  public readonly loading$ = new BehaviorSubject(false);

  public readonly email = new FormControl(null, Validators.required);
  public readonly password = new FormControl(null, Validators.required);
  public readonly rememberMe = new FormControl();

  public constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly snackbarService: SnackbarService,
    private readonly router: Router,
  ) {}

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.loading$.complete();
  }

  public signIn(): void {
    this.validateFields();

    if (!(this.email.valid && this.password.valid)) return;

    if (this.invalidValues) return this.showErrorSnackbar();

    this.loading$.next(true);

    this.authenticationService
      .signIn({email: this.email.value, password: this.password.value})
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.loading$.next(false)),
      )
      .subscribe(({data}) => {
        if (!data.signIn) return this.showErrorSnackbar();

        if (data.signIn.reason === SignInFailReason.Unconfirmed) {
          return this.snackbarService.open(
            'Аккаунт не активирован. Пожалуйста, воспользуйтесь активационной ссылкой отправленной вам на почту при регистрации.',
            'OK',
          );
        }

        if (data.signIn.reason === SignInFailReason.Blocked) {
          return this.snackbarService.open('Аккаунт заблокирован.', 'OK');
        }

        this.authenticationService.resetTokens(); // Clear active session

        this.authenticationService.accessToken = data.signIn.accessToken;
        this.authenticationService.setRefreshToken(data.signIn.refreshToken, !this.rememberMe.value);
        void this.router.navigate(['/profile']);
      });
  }

  public errorMessage(errors: ValidationErrors | null): string | void {
    if (!errors) return;

    return 'Обязательное поле';
  }

  private validateFields(): void {
    this.email.markAsTouched();
    this.password.markAsTouched();

    this.email.updateValueAndValidity();
    this.password.updateValueAndValidity();
  }

  private showErrorSnackbar(): void {
    this.snackbarService.open(
      'Что-то пошло не так. Проверьте правильность введенных данных или повторите попытку позже.',
      'OK',
    );
  }

  private get invalidValues(): boolean {
    return !EMAIL_REGEXP.test(this.email.value) || !PASSWORD_REGEXP.test(this.password.value);
  }
}
