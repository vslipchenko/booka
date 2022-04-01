import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Destroyable} from '~app/typings/component.interfaces';
import {FormField} from '~app/typings/form-field.interfaces';
import {first, Subject, takeUntil} from 'rxjs';
import {FormControl, ValidationErrors} from '@angular/forms';
import {ThemePalette} from '@angular/material/core';
import {MatFormFieldAppearance} from '@angular/material/form-field/form-field';
import {Translation, TranslocoService} from '@ngneat/transloco';
import {SelectItem} from '~app/typings/select.interfaces';

@Component({
  selector: 'app-business-category-select',
  templateUrl: './business-category-select.component.html',
  styleUrls: ['./business-category-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BusinessCategorySelectComponent implements FormField, OnInit, Destroyable {
  @Input() public control = new FormControl();
  @Input() public color: ThemePalette;
  @Input() public appearance: MatFormFieldAppearance = 'standard';
  @Input() public extendClass = '';
  @Input() public label = '';
  @Input() public required?: boolean;
  @Input() public errorMessage?: (errors: ValidationErrors | null) => string | void;

  public businessCategories: Array<SelectItem> = [];

  public readonly destroy$ = new Subject<void>();
  private readonly scope = 'shared.business-categories';

  public constructor(private readonly translocoService: TranslocoService) {}

  public ngOnInit(): void {
    this.translocoService
      .selectTranslation(this.scope)
      .pipe(takeUntil(this.destroy$), first())
      .subscribe((translation) => {
        this.businessCategories = this.formItems(translation);
        // Trigger control value reflection
        this.control.updateValueAndValidity();
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private formItems(translation: Translation): Array<SelectItem> {
    // Array items have to be reversed as 'Other' option goes first, but has to appear at the end of select list
    return Object.entries(translation)
      .map(([key, value]) => ({title: value, value: key}))
      .reverse();
  }
}
