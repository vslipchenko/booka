import {Injectable} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {REFRESH_ACCESS_TOKEN, SIGN_IN} from '~app/graphql/authentication/authentication.queries';
import {Observable} from 'rxjs';
import {ApolloQueryResult} from '@apollo/client/core';
import {AccessTokenByRefreshTokenQueryResult, SignIn, SignInQueryResult} from '~app/typings/authentication.interfaces';
import jwt_decode from 'jwt-decode';
import {AccountTariffs} from '~app/typings/account.enums';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  public accessToken = '';

  public constructor(private readonly apollo: Apollo, private readonly router: Router) {}

  public signIn(input: SignIn): Observable<ApolloQueryResult<SignInQueryResult>> {
    return this.apollo.query<SignInQueryResult>({
      query: SIGN_IN,
      variables: {input},
      fetchPolicy: 'network-only',
    });
  }

  public refreshAccessToken(): Observable<ApolloQueryResult<AccessTokenByRefreshTokenQueryResult>> {
    return this.apollo.query<AccessTokenByRefreshTokenQueryResult>({
      query: REFRESH_ACCESS_TOKEN,
      variables: {refreshToken: this.getRefreshToken()},
    });
  }

  public getAccessTokenData(): {userId: string; tariff: AccountTariffs} {
    return jwt_decode(this.accessToken);
  }

  public getRefreshToken(): string | null {
    return sessionStorage.getItem('token') || localStorage.getItem('token');
  }

  public setRefreshToken(token: string, session: boolean): void {
    if (session) return sessionStorage.setItem('token', token);
    localStorage.setItem('token', token);
  }

  public resetTokens(): void {
    this.accessToken = '';
    sessionStorage.removeItem('token');
    localStorage.removeItem('token');
  }

  public logout(): void {
    this.resetTokens();
    void this.router.navigate(['/sign-in']);
  }

  public get authenticated(): boolean {
    return Boolean(this.accessToken);
  }
}
