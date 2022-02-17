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
    {title: 'Вход', routerLink: '/sign-in', icon: 'login', color: 'primary'},
    {title: 'Регистрация', routerLink: '/sign-up', icon: 'person_add', color: 'accent'},
    {title: 'Услуги', routerLink: '/services', icon: 'receipt_long'},
    {title: 'Тарифы', routerLink: '/pricing', icon: 'local_offer'},
    {title: 'FAQ', routerLink: '/faq', icon: 'help_center'},
    {title: 'Помощь', routerLink: '/help', icon: 'support'},
    {title: 'Обратная связь', routerLink: '/feedback', icon: 'feedback'},
    {title: 'Язык', icon: 'language'},
  ];
}
