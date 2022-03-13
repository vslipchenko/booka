import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProfileComponent} from './profile.component';
import {SharedModule} from '~app/shared/shared.module';
import {ProfileRoutingModule} from '~app/modules/profile/profile-routing.module';
import {NgxsModule} from '@ngxs/store';
import {ProfileState} from '~app/modules/profile/store/profile.state';

@NgModule({
  declarations: [ProfileComponent],
  imports: [CommonModule, NgxsModule.forFeature([ProfileState]), ProfileRoutingModule, SharedModule],
})
export class ProfileModule {}
