import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormControl, ValidationErrors, Validators} from '@angular/forms';
import {PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH, PASSWORD_REGEXP} from '~app/constants/validation';
import {BehaviorSubject, finalize, Subject, takeUntil} from 'rxjs';
import {Destroyable} from '~app/typings/component.interfaces';
import {UserService} from '~app/services/user/user.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResetComponent implements Destroyable {
  public readonly destroy$ = new Subject<void>();
  public readonly password = new FormControl(null, [
    Validators.required,
    Validators.minLength(PASSWORD_MIN_LENGTH),
    Validators.maxLength(PASSWORD_MAX_LENGTH),
    Validators.pattern(PASSWORD_REGEXP),
  ]);
  public readonly loading$ = new BehaviorSubject<boolean>(false);
  public submitted = false;
  public success = false;

  public constructor(private readonly userService: UserService, private readonly activatedRoute: ActivatedRoute) {}

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.loading$.complete();
  }

  public errorMessage(errors: ValidationErrors | null): string | void {
    if (!errors) return;

    switch (true) {
      case 'required' in errors:
        return 'Обязательное поле';
      case 'minlength' in errors:
        return `Минимум ${PASSWORD_MIN_LENGTH} знаков`;
      case 'maxlength' in errors:
        return `Максимум ${PASSWORD_MAX_LENGTH} знаков`;
      case 'pattern' in errors:
        return 'Пароль должен содержать цифры и латинские буквы. Разрешены символы';
    }
  }

  public resetPassword(): void {
    this.password.markAsTouched();
    this.password.updateValueAndValidity();

    if (!this.password.valid) return;

    this.loading$.next(true);

    const key = this.activatedRoute.snapshot.queryParamMap.get('key') as string;

    this.userService
      .resetPassword({password: this.password.value, key})
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.submitted = true;
          this.loading$.next(false);
        }),
      )
      .subscribe(({data}) => {
        if (data?.resetPassword.success) {
          this.success = true;
          return;
        }

        this.success = false;
      });
  }
}
