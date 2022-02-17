export interface MenuItem {
  title: string;
  routerLink?: string;
}

export interface MenuItemClickEvent {
  item: MenuItem;
  index: number;
}
