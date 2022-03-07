import {Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';
import {AuthenticationService} from '~app/services/authentication/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileCanActivateGuard implements CanActivate {
  public constructor(private readonly authenticationService: AuthenticationService) {}

  public canActivate(): boolean {
    if (!this.authenticationService.accessToken) return false;

    return Boolean(this.authenticationService.getAccessTokenData()?.userId);
  }
}
