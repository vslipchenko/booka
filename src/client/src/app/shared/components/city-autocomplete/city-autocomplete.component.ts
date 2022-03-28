import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {SelectItemGroup} from '~app/typings/select.interfaces';
import {FormField} from '~app/typings/form-field.interfaces';
import {FormControl} from '@angular/forms';
import {ThemePalette} from '@angular/material/core';
import {MatFormFieldAppearance} from '@angular/material/form-field/form-field';
import {BehaviorSubject, firstValueFrom, Subject, takeUntil} from 'rxjs';
import {Translation, TranslocoService} from '@ngneat/transloco';
import {Destroyable} from '~app/typings/component.interfaces';
import {invert, sortBy} from 'lodash-es';

@Component({
  selector: 'app-city-autocomplete',
  templateUrl: './city-autocomplete.component.html',
  styleUrls: ['./city-autocomplete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CityAutocompleteComponent implements FormField, OnInit, Destroyable {
  @Input() public control = new FormControl('13');
  @Input() public color: ThemePalette;
  @Input() public appearance: MatFormFieldAppearance = 'standard';
  @Input() public extendClass = '';
  @Input() public label = '';
  @Input() public itemGroups: Array<SelectItemGroup> = [];

  public readonly destroy$ = new Subject<void>();
  public readonly cityGroups$ = new BehaviorSubject<Array<SelectItemGroup>>([]);
  public readonly inputControl = new FormControl('');
  public cityGroups: Array<SelectItemGroup> = [];

  private readonly scope = 'shared.cities';
  private cities: Translation = {};
  private recentCity = '';

  public constructor(private readonly translocoService: TranslocoService) {}

  public async ngOnInit(): Promise<void> {
    // Load translation file
    const value = await firstValueFrom(
      this.translocoService.selectTranslation(this.scope).pipe(takeUntil(this.destroy$)),
    );

    // Set initial value
    if (this.control.value) {
      this.recentCity = value[this.control.value as string];
      this.inputControl.setValue(value[this.control.value as string]);
    }

    // Prepare & set data
    this.cities = invert(value);
    this.cityGroups = this.formItemGroups(this.sort(this.cities));
    this.cityGroups$.next(this.cityGroups);

    // Update form control with a code value
    this.inputControl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((value: string) => {
      if (!value) {
        this.recentCity = '';
        return this.control.setValue(null);
      }

      if (this.cities[value]) {
        this.recentCity = value;
        this.control.setValue(this.cities[value]);
      }
    });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();

    this.cityGroups$.complete();
  }

  public filter(event: Event): void {
    this.cityGroups$.next(this.filterCities((event.target as HTMLInputElement).value));
  }

  public recoverValue(): void {
    if (this.recentCity !== this.inputControl.value) this.inputControl.setValue(this.recentCity);
  }

  private sort(value: {[key: number]: string}): Array<string> {
    return sortBy(Object.keys(value));
  }

  private formItemGroups(value: Array<string>): Array<SelectItemGroup> {
    const result: Array<SelectItemGroup> = [];
    let group = {} as SelectItemGroup;

    value.forEach((city: string, index) => {
      const name = city[0]; // Name group by the first letter
      const item = {
        title: city,
        value: city,
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

  private filterCities(value: string): Array<SelectItemGroup> {
    if (!value) return this.cityGroups;

    const filterValue = value.toLowerCase();

    return this.cityGroups
      .map((region) => ({
        name: region.name,
        value: region.value.filter((item) => item.title.toLowerCase().includes(filterValue)),
      }))
      .filter((region) => region.value.length);
  }
}
