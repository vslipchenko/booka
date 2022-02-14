import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {FlatButtonComponent} from './components/buttons/flat-button/flat-button.component';
import {HeaderComponent} from './components/layout/header/header.component';
import {MainComponent} from './components/layout/main/main.component';
import {RouterModule} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MiniFabComponent} from './components/buttons/mini-fab/mini-fab.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import {InfoSectionComponent} from '~app/shared/components/info-section/info-section.component';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [InfoSectionComponent, FlatButtonComponent, HeaderComponent, MainComponent, MiniFabComponent],
  exports: [InfoSectionComponent, HeaderComponent, MainComponent, FlatButtonComponent],
  imports: [CommonModule, MatButtonModule, RouterModule, MatIconModule, MatTooltipModule],
})
export class SharedModule {}
