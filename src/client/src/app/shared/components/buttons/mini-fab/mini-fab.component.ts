import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {FabButton} from '~app/typings/button.interfaces';
import {ThemePalette} from '@angular/material/core';
import {TooltipPosition} from '@angular/material/tooltip/tooltip';

@Component({
  selector: 'app-mini-fab',
  templateUrl: './mini-fab.component.html',
  styleUrls: ['./mini-fab.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MiniFabComponent implements FabButton {
  @Input() public ariaLabel = '';
  @Input() public color: ThemePalette;
  @Input() public disabled = false;
  @Input() public icon = '';
  @Input() public svgIcon = '';
  @Input() public tooltipText = '';
  @Input() public tooltipPosition: TooltipPosition = 'above';

  @Output() public clicked = new EventEmitter<void>();
}
