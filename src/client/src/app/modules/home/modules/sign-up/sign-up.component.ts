import {ChangeDetectionStrategy, Component} from '@angular/core';
import {SelectItem} from '~app/typings/select.interfaces';
import {FormControl} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Subject, take, takeUntil} from 'rxjs';
import {AccountType} from '~app/typings/account-type.types';
import {AccountTypes} from '~app/typings/account-type.enums';
import {Destroyable} from '~app/typings/component.interfaces';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpComponent implements Destroyable {
  public readonly accountTypes: Array<SelectItem> = [
    {title: 'Клиент', value: AccountTypes.Client},
    {title: 'Предприниматель', value: AccountTypes.Entrepreneur},
    {title: 'Бизнес', value: AccountTypes.Business},
  ];
  public readonly destroy$ = new Subject<void>();
  public readonly account = new FormControl();

  public constructor(private readonly activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams
      .pipe(takeUntil(this.destroy$), take(1))
      .subscribe((params) => this.setAccountValue((params as {account: AccountType}).account));
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public signUp(): void {
    // ...
    console.log('Sign up');
  }

  private setAccountValue(type: AccountType): void {
    switch (type) {
      case 'client':
        this.account.setValue(AccountTypes.Client);
        break;
      case 'entrepreneur':
        this.account.setValue(AccountTypes.Entrepreneur);
        break;
      case 'business':
        this.account.setValue(AccountTypes.Business);
        break;
    }
  }
}
