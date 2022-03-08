import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthenticationService} from '~app/services/authentication/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileCanActivateGuard implements CanActivate {
  public constructor(private readonly authenticationService: AuthenticationService, private readonly router: Router) {}

  public canActivate(): boolean {
    if (!this.authenticationService.accessToken) {
      void this.router.navigate(['/sign-in']);
      return false;
    }

    const userIdSet = Boolean(this.authenticationService.getAccessTokenData()?.userId);

    if (!userIdSet) {
      void this.router.navigate(['/sign-in']);
      return false;
    }

    return true;
  }
}
