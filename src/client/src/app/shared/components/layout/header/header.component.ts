import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MenuItem} from '~app/typings/menu.interfaces';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  public readonly menuItems: Array<MenuItem> = [
    {title: 'Услуги', routerLink: '/services'},
    {title: 'Тарифы', routerLink: '/pricing'},
    {title: 'FAQ', routerLink: '/faq'},
    {title: 'Помощь', routerLink: '/help'},
    {title: 'Обратная связь', routerLink: '/feedback'},
  ];
}
