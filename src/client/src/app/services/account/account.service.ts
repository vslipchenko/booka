import {Injectable} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {ACCOUNT_VITALS} from '~app/graphql/account/account.queries';
import {Observable} from 'rxjs';
import {ApolloQueryResult} from '@apollo/client/core';
import {AccountDataQueryResult} from '~app/typings/account.interfaces';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  public constructor(private readonly apollo: Apollo) {}

  public getAccountData(): Observable<ApolloQueryResult<AccountDataQueryResult>> {
    return this.apollo.query<AccountDataQueryResult>({
      query: ACCOUNT_VITALS,
    });
  }
}
