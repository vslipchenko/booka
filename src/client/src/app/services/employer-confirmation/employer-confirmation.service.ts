import {Injectable} from '@angular/core';
import {Apollo, MutationResult} from 'apollo-angular';
import {Observable} from 'rxjs';
import {AddEmployerConfirmationMutationResult} from '~app/typings/employer-confirmation.interfaces';
import {ADD_EMPLOYER_CONFIRMATION} from '~app/graphql/employer-confirmation/employer-confirmation.mutations';

@Injectable({
  providedIn: 'root',
})
export class EmployerConfirmationService {
  public constructor(private readonly apollo: Apollo) {}

  public addEmployerConfirmation(email: string): Observable<MutationResult<AddEmployerConfirmationMutationResult>> {
    return this.apollo.mutate<AddEmployerConfirmationMutationResult>({
      mutation: ADD_EMPLOYER_CONFIRMATION,
      variables: {email},
    });
  }
}
