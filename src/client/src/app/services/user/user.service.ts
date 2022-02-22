import {Injectable} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {USER_WITH_EMAIL_EXISTS} from '~app/graphql/user/user.queries';
import {Observable} from 'rxjs';
import {ApolloQueryResult} from '@apollo/client/core';
import {UserWithEmailExists} from '~app/typings/user.interfaces';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public constructor(private readonly apollo: Apollo) {}

  public checkExistenceByEmail(email: string): Observable<ApolloQueryResult<UserWithEmailExists>> {
    return this.apollo.query<UserWithEmailExists>({
      query: USER_WITH_EMAIL_EXISTS,
      variables: {email},
    });
  }
}
