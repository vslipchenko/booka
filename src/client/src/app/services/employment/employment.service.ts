import {Injectable} from '@angular/core';
import {Apollo, MutationResult} from 'apollo-angular';
import {Observable} from 'rxjs';
import {ADD_EMPLOYEE} from '~app/graphql/employment/employment.mutations';
import {AddEmployeeMutationResult} from '~app/typings/employment.interfaces';

@Injectable({
  providedIn: 'root',
})
export class EmploymentService {
  public constructor(private readonly apollo: Apollo) {}

  public addEmployee(email: string): Observable<MutationResult<AddEmployeeMutationResult>> {
    return this.apollo.mutate<AddEmployeeMutationResult>({
      mutation: ADD_EMPLOYEE,
      variables: {email},
    });
  }
}
