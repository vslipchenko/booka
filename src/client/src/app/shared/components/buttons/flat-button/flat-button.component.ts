import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import {ButtonComponent} from '~app/typings/button.interfaces';

@Component({
  selector: 'app-flat-button',
  templateUrl: './flat-button.component.html',
  styleUrls: ['./flat-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlatButtonComponent implements ButtonComponent {
  @Input() public ariaLabel = '';
  @Input() public color: ThemePalette;
  @Input() public text = '';
  @Input() public disabled = false;
  @Input() public icon = '';
  @Input() public svgIcon = '';
}
