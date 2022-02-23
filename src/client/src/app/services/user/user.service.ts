import {Injectable} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {USER_WITH_EMAIL_EXISTS} from '~app/graphql/user/user.queries';
import {Observable} from 'rxjs';
import {ApolloQueryResult, FetchResult} from '@apollo/client/core';
import {CreateUser, UserWithEmailExists} from '~app/typings/user.interfaces';
import {CREATE_USER} from '~app/graphql/user/user.mutations';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public constructor(private readonly apollo: Apollo) {}

  public create(input: CreateUser): Observable<FetchResult<unknown>> {
    return this.apollo.mutate({
      mutation: CREATE_USER,
      variables: {input},
    });
  }

  public checkExistenceByEmail(email: string): Observable<ApolloQueryResult<UserWithEmailExists>> {
    return this.apollo.query<UserWithEmailExists>({
      query: USER_WITH_EMAIL_EXISTS,
      variables: {email},
    });
  }
}
