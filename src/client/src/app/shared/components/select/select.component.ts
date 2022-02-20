import {ChangeDetectionStrategy, Component, Input, TemplateRef} from '@angular/core';
import {FormField} from '~app/typings/form-field.interfaces';
import {FormControl} from '@angular/forms';
import {ThemePalette} from '@angular/material/core';
import {MatFormFieldAppearance} from '@angular/material/form-field/form-field';
import {SelectItem} from '~app/typings/select.interfaces';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectComponent implements FormField {
  @Input() public control = new FormControl();
  @Input() public color: ThemePalette;
  @Input() public appearance: MatFormFieldAppearance = 'standard';
  @Input() public extendClass = '';
  @Input() public label = '';
  @Input() public items: Array<SelectItem> = [];
  @Input() public hint?: TemplateRef<unknown>;
  // @Input() public required = false;
  // @Input() public disabled = false;
}
