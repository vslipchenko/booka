import {ChangeDetectionStrategy, Component, Input, OnInit, TemplateRef} from '@angular/core';
import {TranslocoService} from '@ngneat/transloco';
import {first, Subject, takeUntil} from 'rxjs';
import {Destroyable} from '~app/typings/component.interfaces';
import {FormField} from '~app/typings/form-field.interfaces';
import {FormControl} from '@angular/forms';
import {ThemePalette} from '@angular/material/core';
import {MatFormFieldAppearance} from '@angular/material/form-field/form-field';
import {SelectItemGroup} from '~app/typings/select.interfaces';
import {sortBy, toPairs} from 'lodash-es';
import {Region} from '~app/typings/toponymy.enums';

@Component({
  selector: 'app-region-select',
  templateUrl: './region-select.component.html',
  styleUrls: ['./region-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegionSelectComponent implements FormField, OnInit, Destroyable {
  @Input() public control = new FormControl();
  @Input() public color: ThemePalette;
  @Input() public appearance: MatFormFieldAppearance = 'standard';
  @Input() public extendClass = '';
  @Input() public label = '';
  @Input() public hint?: TemplateRef<unknown>;

  public regionGroups: Array<SelectItemGroup> = [];

  public readonly destroy$ = new Subject<void>();
  private readonly scope = 'shared.regions';

  public constructor(private readonly translocoService: TranslocoService) {}

  public ngOnInit(): void {
    this.translocoService
      .selectTranslation(this.scope)
      .pipe(takeUntil(this.destroy$), first())
      .subscribe((translation) => {
        this.regionGroups = this.formItemGroups(this.sort(translation));
        // Trigger control value reflection
        this.control.updateValueAndValidity();
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private sort(value: {[key: number]: string}): Array<[string, string]> {
    return sortBy(toPairs(value), 1);
  }

  private formItemGroups(sorted: Array<[string, string]>): Array<SelectItemGroup> {
    const result: Array<SelectItemGroup> = [];
    let group = {
      name: '—',
      value: [
        {
          title: '',
          value: Region.None,
        },
      ],
    } as SelectItemGroup;

    sorted.forEach(([key, value]: [string, string]) => {
      const name = value[0]; // Name group by the first letter
      const item = {
        title: value,
        value: Number(key),
      };

      if (group.name === name) {
        group.value.push(item);

        return;
      }

      result.push(group);

      group = {
        name,
        value: [item],
      };
    });
    // Push last group
    result.push(group);

    return result;
  }
}
