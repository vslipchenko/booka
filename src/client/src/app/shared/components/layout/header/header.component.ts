import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MenuItem} from '~app/typings/menu.interfaces';
import {MatDialog} from '@angular/material/dialog';
import {LanguageDialogComponent} from '~app/shared/components/language-dialog/language-dialog.component';
import {AuthenticationService} from '~app/services/authentication/authentication.service';

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
    {title: 'Язык', icon: 'language', click: this.openLanguageDialog.bind(this)},
  ];

  public constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly dialog: MatDialog,
  ) {
    if (this.authenticationService.authenticated)
      this.menuItems.unshift({title: 'Профиль', routerLink: '/profile', icon: 'person'});
  }

  public openLanguageDialog(): void {
    this.dialog.open(LanguageDialogComponent, {autoFocus: 'dialog'});
  }
}
