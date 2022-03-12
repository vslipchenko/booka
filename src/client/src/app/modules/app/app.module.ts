import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {TranslocoRootModule} from './transloco-root.module';
import {GraphQLModule} from '~app/graphql/graphql.module';
import {AuthenticationInterceptorProvider} from '~app/interceptors/authentication/authentication.interceptor';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {AuthenticationService} from '~app/services/authentication/authentication.service';
import {catchError, Observable, of, tap} from 'rxjs';
import {NgxsModule} from '@ngxs/store';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    GraphQLModule,
    NgxsModule.forRoot([]),
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TranslocoRootModule,
    MatSnackBarModule,
  ],
  providers: [
    AuthenticationInterceptorProvider,
    {
      provide: APP_INITIALIZER,
      useFactory: authenticationFactory,
      deps: [AuthenticationService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

// Could be dropped once any other factory is used that triggers access token refresh
function authenticationFactory(authenticationService: AuthenticationService): () => void | Observable<any> {
  return (): void | Observable<any> => {
    const refreshToken = authenticationService.getRefreshToken();

    if (!refreshToken) return;

    return authenticationService.refreshAccessToken().pipe(
      tap(({data}) => {
        authenticationService.accessToken = data.refreshAccessToken;
      }),
      catchError(() => {
        return of(); // Ignore error; let auth interceptor handle authentication
      }),
    );
  };
}
