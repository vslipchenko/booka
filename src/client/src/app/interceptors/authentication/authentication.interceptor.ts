import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {AuthenticationService} from '~app/services/authentication/authentication.service';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
  public constructor(private readonly authenticationService: AuthenticationService) {}

  public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.authenticationService.accessToken;

    if (token) {
      // If we have a token, we set it to the header
      request = request.clone({
        setHeaders: {Authorization: `Bearer ${token}`},
      });
    }

    return next.handle(request).pipe(tap(console.log));
  }
}

export const AuthenticationInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthenticationInterceptor,
  multi: true,
};
