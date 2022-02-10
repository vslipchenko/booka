import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { FlatButtonComponent } from './components/buttons/flat-button/flat-button.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [
    FlatButtonComponent,
    HeaderComponent
  ],
  exports: [],
  imports: [MatButtonModule],
})
export class SharedModule {}
