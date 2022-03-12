import {Injectable} from '@angular/core';
import {Resolve, RouterStateSnapshot, ActivatedRouteSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {AccountService} from '~app/services/account/account.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileResolver implements Resolve<boolean> {
  public constructor(private readonly accountService: AccountService) {}

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return of(true);
  }
}
