import {HttpClient} from '@angular/common/http';
import {
  TRANSLOCO_LOADER,
  Translation,
  TranslocoLoader,
  TRANSLOCO_CONFIG,
  translocoConfig,
  TranslocoModule,
} from '@ngneat/transloco';
import {Injectable, NgModule} from '@angular/core';
import {environment} from '~environments/environment';
import {DEFAULT_LOCALE, LOCALES} from '~app/constants/i18n';
import {Observable, of} from 'rxjs';
import {TranslocoLoaderData} from '@ngneat/transloco/lib/transloco.loader';

@Injectable({providedIn: 'root'})
export class TranslocoHttpLoader implements TranslocoLoader {
  public constructor(private readonly http: HttpClient) {}

  public getTranslation(lang: string, data: TranslocoLoaderData): Observable<Translation> {
    if (!data?.scope) return of({}); // Ignore loading /assets/i18n/ root translations (scope is undefined in such case)

    return this.http.get<Translation>(`../assets/i18n/${lang}.json`);
  }
}

@NgModule({
  exports: [TranslocoModule],
  providers: [
    {
      provide: TRANSLOCO_CONFIG,
      useValue: translocoConfig({
        availableLangs: LOCALES,
        defaultLang: DEFAULT_LOCALE,
        // Remove this option if your application doesn't support changing language in runtime.
        reRenderOnLangChange: true,
        prodMode: environment.production,
      }),
    },
    {provide: TRANSLOCO_LOADER, useClass: TranslocoHttpLoader},
  ],
})
export class TranslocoRootModule {}
