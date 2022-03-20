import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {Observable, tap} from 'rxjs';
import {SetAccountData} from '~app/modules/profile/store/profile.actions';
import {AccountService} from '~app/services/account/account.service';
import {Store} from '@ngxs/store';
import {ApolloQueryResult} from '@apollo/client/core';
import {AuthenticationService} from '~app/services/authentication/authentication.service';
import {AccountDataQueryResult} from '~app/typings/account.interfaces';

@Injectable({
  providedIn: 'root',
})
export class ProfileResolver implements Resolve<ApolloQueryResult<AccountDataQueryResult>> {
  public constructor(
    private readonly accountService: AccountService,
    private readonly store: Store,
    private readonly authenticationService: AuthenticationService,
  ) {}

  public resolve(): Observable<ApolloQueryResult<AccountDataQueryResult>> {
    return this.accountService.getAccountData().pipe(
      tap(({data}) => {
        this.store.dispatch(
          new SetAccountData({...data.accountData, tariff: this.authenticationService.getAccessTokenData().tariff}),
        );
      }),
    );
  }
}
