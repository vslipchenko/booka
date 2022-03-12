import {Injectable} from '@angular/core';
import {Apollo} from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  public constructor(private readonly apollo: Apollo) {}
}
