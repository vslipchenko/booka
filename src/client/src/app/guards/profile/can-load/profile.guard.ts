import {Injectable} from '@angular/core';
import {CanLoad} from '@angular/router';
import {AuthenticationService} from '~app/services/authentication/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileCanLoadGuard implements CanLoad {
  public constructor(private readonly authenticationService: AuthenticationService) {}

  public canLoad(): boolean {
    if (!this.authenticationService.accessToken) return false;

    return Boolean(this.authenticationService.getAccessTokenData()?.userId);
  }
}
