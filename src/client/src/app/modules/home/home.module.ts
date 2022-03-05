import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeRoutingModule} from '~app/modules/home/home-routing.module';
import {SharedModule} from '~app/shared/shared.module';
import {HomeComponent} from '~app/modules/home/home.component';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, HomeRoutingModule, SharedModule],
})
export class HomeModule {}
