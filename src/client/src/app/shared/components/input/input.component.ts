import {ChangeDetectionStrategy, Component, Input, TemplateRef} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatFormFieldAppearance} from '@angular/material/form-field/form-field';
import {ThemePalette} from '@angular/material/core';
import {InputType} from '~app/typings/input.types';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent {
  @Input() public type: InputType = 'text';
  @Input() public control = new FormControl();
  @Input() public required = false;
  @Input() public color: ThemePalette;
  @Input() public appearance: MatFormFieldAppearance = 'standard';
  @Input() public extendClass = '';
  @Input() public label = '';
  @Input() public placeholder = '';
  @Input() public hint = '';
  // @Input() public prefix?: TemplateRef<unknown>;
  @Input() public suffix?: TemplateRef<unknown>;

  public hide = true;

  public toggleVisibility(): void {
    if (this.type === 'password') this.hide = !this.hide;
  }

  public get inputType(): InputType {
    return this.type === 'password' && !this.hide ? 'text' : this.type;
  }
}
