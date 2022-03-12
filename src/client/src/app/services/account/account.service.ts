import {Injectable} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {ACCOUNT_VITALS} from '~app/graphql/account/account.queries';
import {Observable} from 'rxjs';
import {ApolloQueryResult} from '@apollo/client/core';
import {AccountVitalsQueryResult} from '~app/typings/account.interfaces';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  public constructor(private readonly apollo: Apollo) {}

  public getAccountVitals(): Observable<ApolloQueryResult<AccountVitalsQueryResult>> {
    return this.apollo.query<AccountVitalsQueryResult>({
      query: ACCOUNT_VITALS,
    });
  }
}
