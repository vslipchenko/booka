import {ChangeDetectionStrategy, Component} from '@angular/core';
import {UserService} from '~app/services/user/user.service';
import {FormControl, ValidationErrors, Validators} from '@angular/forms';
import {EMAIL_REGEXP} from '~app/constants/validation';
import {BehaviorSubject, finalize, Subject, takeUntil} from 'rxjs';
import {Destroyable} from '~app/typings/component.interfaces';
import {TranslocoService} from '@ngneat/transloco';
import {Locale} from '~app/typings/i18n.types';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecoveryComponent implements Destroyable {
  public readonly destroy$ = new Subject<void>();
  public readonly email = new FormControl(null, [Validators.required, Validators.pattern(EMAIL_REGEXP)]);
  public readonly loading$ = new BehaviorSubject<boolean>(false);
  public submitted = false;
  public success = false;

  public constructor(private readonly userService: UserService, private readonly translocoService: TranslocoService) {}

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.loading$.complete();
  }

  public recoverPassword(): void {
    this.email.markAsTouched();
    this.email.updateValueAndValidity();

    if (!this.email.valid) return;

    this.loading$.next(true);

    this.userService
      .recoverPassword({email: this.email.value, locale: this.translocoService.getActiveLang() as Locale})
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.submitted = true;
          this.loading$.next(false);
        }),
      )
      .subscribe(({data}) => {
        if (data?.recoverPassword.success) {
          this.success = true;
          return;
        }

        this.success = false;
      });
  }

  public errorMessage(errors: ValidationErrors | null): string | void {
    if (!errors) return;

    if ('required' in errors) return 'Обязательное поле';

    return 'Неверный формат';
  }
}
