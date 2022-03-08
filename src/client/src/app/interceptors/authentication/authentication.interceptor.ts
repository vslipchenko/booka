import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
  HttpResponse,
} from '@angular/common/http';
import {finalize, first, Observable, of, Subject, switchMap} from 'rxjs';
import {AuthenticationService} from '~app/services/authentication/authentication.service';
import {GraphQLError} from 'graphql';
import {ApolloErrorCode} from '~app/typings/apollo.enums';
import {Router} from '@angular/router';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
  private readonly freshAccessToken$ = new Subject<string>();
  private refreshingAccessToken = false;

  public constructor(private readonly authenticationService: AuthenticationService, private readonly router: Router) {}

  private static attachAccessToken(request: HttpRequest<unknown>, accessToken: string): HttpRequest<unknown> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.authenticationService.accessToken;

    if (token) {
      // If we have a token, we set it to the header
      request = AuthenticationInterceptor.attachAccessToken(request, token);
    }

    return next.handle(request).pipe(
      switchMap((response) => {
        if (response instanceof HttpResponse && response.body.errors) {
          const code = (response.body.errors as ReadonlyArray<GraphQLError>)[0].extensions['code'];

          switch (code) {
            case ApolloErrorCode.EmptyAccessToken:
            case ApolloErrorCode.ExpiredAccessToken: {
              // If refresh is in progress return subject that completes once access toke is received & request is fulfilled
              if (this.refreshingAccessToken) {
                return this.freshAccessToken$.pipe(
                  first((value) => Boolean(value)),
                  switchMap((accessToken) => {
                    return next.handle(AuthenticationInterceptor.attachAccessToken(request, accessToken));
                  }),
                );
              }

              const refreshToken = this.authenticationService.getRefreshToken();

              if (!refreshToken) {
                void this.router.navigate(['/sign-in']);
                return of(response);
              }

              this.refreshingAccessToken = true;

              return this.authenticationService.refreshAccessToken().pipe(
                switchMap(({data}) => {
                  this.freshAccessToken$.next(data.refreshAccessToken);
                  return next.handle(AuthenticationInterceptor.attachAccessToken(request, data.refreshAccessToken));
                }),
                finalize(() => {
                  this.refreshingAccessToken = false;
                }),
              );
            }
            case ApolloErrorCode.InvalidAccessToken:
            case ApolloErrorCode.InvalidRefreshToken:
            case ApolloErrorCode.EmptyRefreshToken:
            case ApolloErrorCode.BlockedUser:
              this.authenticationService.resetTokens();
              void this.router.navigate(['/sign-in']);

              return of(response);
          }
        }

        return of(response);
      }),
    );
  }
}

export const AuthenticationInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthenticationInterceptor,
  multi: true,
};
