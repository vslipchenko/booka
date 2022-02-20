import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import {Button} from '~app/typings/button.interfaces';

@Component({
  selector: 'app-flat-button',
  templateUrl: './flat-button.component.html',
  styleUrls: ['./flat-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlatButtonComponent implements Button {
  @Input() public ariaLabel = '';
  @Input() public color: ThemePalette;
  @Input() public text = '';
  @Input() public disabled = false;
  @Input() public icon = '';
  @Input() public svgIcon = '';
  @Input() public extendClass = '';

  @Output() public clicked = new EventEmitter<void>();
}
