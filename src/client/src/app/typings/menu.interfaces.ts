import {ThemePalette} from '@angular/material/core';

export interface MenuItem {
  title: string;
  icon?: string;
  color?: ThemePalette;
  routerLink?: string;
}

export interface MenuItemClickEvent {
  item: MenuItem;
  index: number;
}
