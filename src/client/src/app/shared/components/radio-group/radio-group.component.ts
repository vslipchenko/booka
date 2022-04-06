import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {RadioGroupPosition} from '~app/typings/button.types';
import {ThemePalette} from '@angular/material/core';
import {FormControl} from '@angular/forms';
import {RadioGroupItem} from '~app/typings/button.interfaces';

@Component({
  selector: 'app-radio-group',
  templateUrl: './radio-group.component.html',
  styleUrls: ['./radio-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioGroupComponent {
  @Input() public color: ThemePalette;
  @Input() public items: Array<RadioGroupItem> = [];
  @Input() public position: RadioGroupPosition = 'vertical';
  @Input() public control = new FormControl();
}
