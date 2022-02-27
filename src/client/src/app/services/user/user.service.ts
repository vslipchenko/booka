import {Injectable} from '@angular/core';
import {Apollo, MutationResult} from 'apollo-angular';
import {USER_WITH_EMAIL_EXISTS} from '~app/graphql/user/user.queries';
import {Observable} from 'rxjs';
import {ApolloQueryResult} from '@apollo/client/core';
import {CreateUser, CreateUserMutationResult, UserWithEmailExistsQueryResult} from '~app/typings/user.interfaces';
import {CREATE_USER} from '~app/graphql/user/user.mutations';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public constructor(private readonly apollo: Apollo) {}

  public create(input: CreateUser): Observable<MutationResult<CreateUserMutationResult>> {
    return this.apollo.mutate<CreateUserMutationResult>({
      mutation: CREATE_USER,
      variables: {input},
    });
  }

  public checkExistenceByEmail(email: string): Observable<ApolloQueryResult<UserWithEmailExistsQueryResult>> {
    return this.apollo.query<UserWithEmailExistsQueryResult>({
      query: USER_WITH_EMAIL_EXISTS,
      variables: {email},
    });
  }
}
