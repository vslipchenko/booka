import {NgModule} from '@angular/core';
import {LoadChildren, RouterModule, ROUTES, Routes} from '@angular/router';
import {AuthenticationService} from '~app/services/authentication/authentication.service';
import {AccountTariffs} from '~app/typings/account.enums';
import {ClientSettingsModule} from '~app/modules/profile/modules/settings/modules/client-settings/client-settings.module';
import {EntrepreneurSettingsModule} from '~app/modules/profile/modules/settings/modules/entrepreneur-settings/entrepreneur-settings.module';
import {BusinessSettingsModule} from '~app/modules/profile/modules/settings/modules/business-settings/business-settings.module';

function routesFactory(authenticationService: AuthenticationService): Routes {
  const {tariff} = authenticationService.getAccessTokenData();

  let loadChildren: LoadChildren;

  if (tariff === AccountTariffs.Client)
    loadChildren = (): Promise<ClientSettingsModule> =>
      import(`~app/modules/profile/modules/settings/modules/client-settings/client-settings.module`).then(
        (m) => m.ClientSettingsModule,
      );

  if (tariff === AccountTariffs.Entrepreneur)
    loadChildren = (): Promise<EntrepreneurSettingsModule> =>
      import(`~app/modules/profile/modules/settings/modules/entrepreneur-settings/entrepreneur-settings.module`).then(
        (m) => m.EntrepreneurSettingsModule,
      );

  if (tariff === AccountTariffs.Business)
    loadChildren = (): Promise<BusinessSettingsModule> =>
      import(`~app/modules/profile/modules/settings/modules/business-settings/business-settings.module`).then(
        (m) => m.BusinessSettingsModule,
      );

  return [
    {
      path: '',
      // @ts-expect-error
      loadChildren,
    },
  ];
}

@NgModule({
  providers: [
    {
      provide: ROUTES,
      useFactory: routesFactory,
      multi: true,
      deps: [AuthenticationService],
    },
  ],
  exports: [RouterModule],
})
export class SettingsRoutingModule {}
