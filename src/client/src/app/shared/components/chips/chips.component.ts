import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {FormField} from '~app/typings/form-field.interfaces';
import {FormControl} from '@angular/forms';
import {ThemePalette} from '@angular/material/core';
import {MatFormFieldAppearance} from '@angular/material/form-field/form-field';
import {SelectItem} from '~app/typings/select.interfaces';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {BehaviorSubject, Subject, takeUntil} from 'rxjs';
import {Destroyable} from '~app/typings/component.interfaces';

@Component({
  selector: 'app-chips',
  templateUrl: './chips.component.html',
  styleUrls: ['./chips.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChipsComponent implements OnInit, FormField, Destroyable {
  @Input() public control = new FormControl();
  @Input() public color: ThemePalette;
  @Input() public appearance: MatFormFieldAppearance = 'standard';
  @Input() public extendClass = '';
  @Input() public label = '';
  @Input() public items: Array<SelectItem> = [];

  public readonly destroy$ = new Subject<void>();
  public readonly chips$ = new BehaviorSubject<Array<string>>([]);
  public filteredOptions: Array<SelectItem> = [];

  public ngOnInit(): void {
    this.chips$
      .pipe(takeUntil(this.destroy$))
      .subscribe((chips) => {
        this.filteredOptions = this.items.filter((item) => !chips.includes(item.title));
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public select(event: MatAutocompleteSelectedEvent): void {
    console.log(event);

    const chips = this.chips$.getValue();

    const title = this.items.find((item) => item.value === event.option.value)?.title;

    if (title) this.chips$.next([...chips, title]);
  }
}
