import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {ThemePalette} from '@angular/material/core';

@Component({
  selector: 'app-flat-button',
  templateUrl: './flat-button.component.html',
  styleUrls: ['./flat-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlatButtonComponent {
  @Input() public color: ThemePalette;
  @Input() public text?: string;
  @Input() public disabled?: boolean;
}
