import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  public accessToken = '';

  public getRefreshToken(): string | null {
    return sessionStorage.getItem('token') || localStorage.getItem('token');
  }
}
