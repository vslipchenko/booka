import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormControl, ValidationErrors, Validators} from '@angular/forms';
import {EMAIL_REGEXP} from '~app/constants/validation';
import {EmploymentService} from '~app/services/employment/employment.service';
import {Destroyable} from '~app/typings/component.interfaces';
import {Subject, takeUntil} from 'rxjs';

@Component({
  selector: 'app-employee-dialog',
  templateUrl: './employee-dialog.component.html',
  styleUrls: ['./employee-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeDialogComponent implements Destroyable {
  public readonly destroy$ = new Subject<void>();
  public readonly email = new FormControl('', [Validators.required, Validators.pattern(EMAIL_REGEXP)]);

  public constructor(private readonly employmentService: EmploymentService) {}

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public addEmployee(): void {
    this.email.markAsTouched();
    this.email.updateValueAndValidity();

    if (!this.email.valid) return;

    this.employmentService.addEmployee(this.email.value).pipe(takeUntil(this.destroy$)).subscribe(console.log);
  }

  public errorMessage(errors: ValidationErrors | null): string | void {
    if (!errors) return;

    if ('pattern' in errors) return 'Неверный формат';

    return 'Обязательное поле';
  }
}
