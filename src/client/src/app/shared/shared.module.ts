import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {FlatButtonComponent} from './components/buttons/flat-button/flat-button.component';
import {HeaderComponent} from './components/layout/header/header.component';
import {MainComponent} from './components/layout/main/main.component';
import {RouterModule} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MiniFabComponent} from './components/buttons/mini-fab/mini-fab.component';
import {MatTooltipModule} from '@angular/material/tooltip';

@NgModule({
  declarations: [FlatButtonComponent, HeaderComponent, MainComponent, MiniFabComponent],
  exports: [HeaderComponent, MainComponent],
  imports: [MatButtonModule, RouterModule, MatIconModule, MatTooltipModule],
})
export class SharedModule {}
