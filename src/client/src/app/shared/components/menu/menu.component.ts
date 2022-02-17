import {ChangeDetectionStrategy, Component, EventEmitter, Input} from '@angular/core';
import {MenuItem, MenuItemClickEvent} from '~app/typings/menu.interfaces';
import {TooltipPosition} from '@angular/material/tooltip/tooltip';

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
  @Input() public items: Array<MenuItem> = [];
  @Input() public onClick = new EventEmitter<MenuItemClickEvent>();
}
