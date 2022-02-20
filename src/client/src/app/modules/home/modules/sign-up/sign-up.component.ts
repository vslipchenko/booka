import {ChangeDetectionStrategy, Component} from '@angular/core';
import {SelectItem} from '~app/typings/select.interfaces';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpComponent {
  public readonly accountTypes: Array<SelectItem> = [
    {title: 'Клиент', value: 1},
    {title: 'Предприниматель', value: 2},
    {title: 'Бизнес', value: 3},
  ];

  public signUp(): void {
    // ...
    console.log('Sign up');
  }
}
