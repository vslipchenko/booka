import {Injectable} from '@angular/core';
import {Apollo, MutationResult} from 'apollo-angular';
import {USER_WITH_EMAIL_EXISTS} from '~app/graphql/user/user.queries';
import {Observable} from 'rxjs';
import {ApolloQueryResult} from '@apollo/client/core';
import {
  ConfirmAccountMutationResult,
  CreateUser,
  CreateUserMutationResult,
  RecoverPassword,
  RecoverPasswordMutationResult,
  ResetPassword,
  ResetPasswordMutationResult,
  UserWithEmailExistsQueryResult,
} from '~app/typings/user.interfaces';
import {CONFIRM_ACCOUNT, CREATE_USER, RECOVER_PASSWORD, RESET_PASSWORD} from '~app/graphql/user/user.mutations';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public constructor(private readonly apollo: Apollo) {}

  public create(input: CreateUser): Observable<MutationResult<CreateUserMutationResult>> {
    return this.apollo.mutate<CreateUserMutationResult>({
      mutation: CREATE_USER,
      variables: {input},
      fetchPolicy: 'network-only',
    });
  }

  public confirmAccount(key: string): Observable<MutationResult<ConfirmAccountMutationResult>> {
    return this.apollo.mutate<ConfirmAccountMutationResult>({
      mutation: CONFIRM_ACCOUNT,
      variables: {key},
    });
  }

  public recoverPassword(input: RecoverPassword): Observable<MutationResult<RecoverPasswordMutationResult>> {
    return this.apollo.mutate<RecoverPasswordMutationResult>({
      mutation: RECOVER_PASSWORD,
      variables: {input},
    });
  }

  public resetPassword(input: ResetPassword): Observable<MutationResult<ResetPasswordMutationResult>> {
    return this.apollo.mutate<ResetPasswordMutationResult>({
      mutation: RESET_PASSWORD,
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
