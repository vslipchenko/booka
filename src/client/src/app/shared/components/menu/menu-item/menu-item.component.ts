import {ChangeDetectionStrategy, Component, Input, ViewChild} from '@angular/core';
import {MenuItem} from '~app/typings/menu.interfaces';
import {MenuPositionX} from '@angular/material/menu/menu-positions';
import {MatMenuPanel} from '@angular/material/menu/menu-panel';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuItemComponent {
  @Input() public items: Array<MenuItem> = [];
  // @Input() public onClick = new EventEmitter<MenuItemClickEvent>();
  @Input() public xPosition: MenuPositionX = 'before';

  @ViewChild('menu', {static: true}) public menu?: MatMenuPanel;
}
