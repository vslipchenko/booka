import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SettingsRoutingModule} from '~app/modules/profile/modules/settings/settings-routing.module';
import {SharedModule} from '~app/shared/shared.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, SettingsRoutingModule, SharedModule],
})
export class SettingsModule {}
