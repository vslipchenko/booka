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
import {HelpSectionComponent} from './components/help-section/help-section.component';
import {ExpansionPanelComponent} from './components/expansion-panel/expansion-panel.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {AlertComponent} from './components/alert/alert.component';
import {MenuComponent} from './components/menu/menu.component';
import {MatMenuModule} from '@angular/material/menu';
import { IconButtonComponent } from './components/buttons/icon-button/icon-button.component';

@NgModule({
  declarations: [
    InfoSectionComponent,
    FlatButtonComponent,
    HeaderComponent,
    MainComponent,
    MiniFabComponent,
    HelpSectionComponent,
    ExpansionPanelComponent,
    AlertComponent,
    MenuComponent,
    IconButtonComponent,
  ],
  exports: [
    InfoSectionComponent,
    HeaderComponent,
    MainComponent,
    FlatButtonComponent,
    HelpSectionComponent,
    ExpansionPanelComponent,
    AlertComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    RouterModule,
    MatIconModule,
    MatTooltipModule,
    MatExpansionModule,
    MatMenuModule,
  ],
})
export class SharedModule {}
