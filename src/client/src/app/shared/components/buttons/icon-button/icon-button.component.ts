import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import {TooltipPosition} from '@angular/material/tooltip/tooltip';
import {FabButton} from '~app/typings/button.interfaces';

@Component({
  selector: 'app-icon-button',
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconButtonComponent implements FabButton {
  @Input() public ariaLabel = '';
  @Input() public color: ThemePalette;
  @Input() public disabled = false;
  @Input() public icon = '';
  @Input() public svgIcon = '';
  @Input() public tooltipText = '';
  @Input() public tooltipPosition: TooltipPosition = 'above';
}
