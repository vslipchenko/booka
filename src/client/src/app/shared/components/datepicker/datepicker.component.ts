import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {FormField} from '~app/typings/form-field.interfaces';
import {FormControl, ValidationErrors} from '@angular/forms';
import {DateAdapter, ThemePalette} from '@angular/material/core';
import {MatFormFieldAppearance} from '@angular/material/form-field/form-field';
import {TranslocoService} from '@ngneat/transloco';
import {Destroyable} from '~app/typings/component.interfaces';
import {Subject, takeUntil} from 'rxjs';
import {Language} from '~app/typings/i18n.types';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatepickerComponent implements FormField, Destroyable {
  @Input() public control = new FormControl();
  @Input() public errorMessage?: (errors: ValidationErrors | null) => string | void;
  // @Input() public required = false;
  // @Input() public disabled = false;
  @Input() public color: ThemePalette;
  @Input() public appearance: MatFormFieldAppearance = 'standard';
  @Input() public extendClass = '';
  @Input() public label = '';
  @Input() public maxDate?: Date;

  public readonly destroy$ = new Subject<void>();

  public constructor(private readonly translocoService: TranslocoService, private readonly _adapter: DateAdapter<any>) {
    // https://material.angular.io/components/datepicker/overview#internationalization
    this.translocoService.langChanges$.pipe(takeUntil(this.destroy$)).subscribe((language) => {
      this._adapter.setLocale(language as Language);
    });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
