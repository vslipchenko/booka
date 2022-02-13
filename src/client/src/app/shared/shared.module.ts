import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {FlatButtonComponent} from './components/buttons/flat-button/flat-button.component';
import {HeaderComponent} from './components/layout/header/header.component';
import {MainComponent} from './components/layout/main/main.component';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [FlatButtonComponent, HeaderComponent, MainComponent],
  exports: [HeaderComponent, MainComponent],
  imports: [MatButtonModule, RouterModule],
})
export class SharedModule {}
