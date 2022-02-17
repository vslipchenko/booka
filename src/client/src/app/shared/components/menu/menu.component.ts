import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {MenuItem} from '~app/typings/menu.interfaces';
import {TooltipPosition} from '@angular/material/tooltip/tooltip';
import {MenuPositionX} from '@angular/material/menu/menu-positions';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent {
  @Input() public icon = '';
  @Input() public svgIcon = '';
  @Input() public tooltipText = '';
  @Input() public tooltipPosition: TooltipPosition = 'above';
  @Input() public xPosition: MenuPositionX = 'before';
  @Input() public items: Array<MenuItem> = [];
  // @Input() public onClick = new EventEmitter<MenuItemClickEvent>();
}
