import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {Button} from '~app/typings/button.interfaces';
import {ThemePalette} from '@angular/material/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent implements Button {
  @Input() public ariaLabel = '';
  @Input() public color: ThemePalette;
  @Input() public text = '';
  @Input() public disabled = false;
  @Input() public icon = '';
  @Input() public svgIcon = '';
  @Input() public extendClass = '';

  @Output() public clicked = new EventEmitter<void>();
}
