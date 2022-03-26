import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {SelectItemGroup} from '~app/typings/select.interfaces';
import {FormField} from '~app/typings/form-field.interfaces';
import {FormControl} from '@angular/forms';
import {ThemePalette} from '@angular/material/core';
import {MatFormFieldAppearance} from '@angular/material/form-field/form-field';
import {TranslocoService} from '@ngneat/transloco';
import {Destroyable} from '~app/typings/component.interfaces';
import {BehaviorSubject, Subject, takeUntil} from 'rxjs';
import {sortBy, toPairs} from 'lodash-es';

@Component({
  selector: 'app-region-select',
  templateUrl: './city-select.component.html',
  styleUrls: ['./city-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CitySelectComponent implements FormField, Destroyable {
  @Input() public control = new FormControl();
  @Input() public color: ThemePalette;
  @Input() public appearance: MatFormFieldAppearance = 'standard';
  @Input() public extendClass = '';
  @Input() public label = '';

  public readonly destroy$ = new Subject<void>();

  public readonly regions$ = new BehaviorSubject<Array<SelectItemGroup>>([]);
  private readonly scope = 'shared.cities';

  public constructor(private readonly translocoService: TranslocoService) {
    this.translocoService
      .selectTranslation(this.scope)
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        this.regions$.next(this.formItemGroups(this.getSortedPairs(value)));
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();

    this.regions$.complete();
  }

  private getSortedPairs(value: {[key: number]: string}): Array<[string, string]> {
    return sortBy(toPairs(value), 1);
  }

  private formItemGroups(value: Array<[string, string]>): Array<SelectItemGroup> {
    const result: Array<SelectItemGroup> = [];
    let group = {} as SelectItemGroup;

    value.forEach(([key, value]: [string, string], index) => {
      const name = value[0]; // Name group by the first letter
      const item = {
        title: value,
        value: key,
      };

      if (group.name === name) {
        group.value.push(item);

        return;
      }

      if (index) result.push(group); // Omit pushing empty group object

      group = {
        name,
        value: [item],
      };
    });

    result.push(group);

    return result;
  }
}
