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
import {IconButtonComponent} from './components/buttons/icon-button/icon-button.component';
import {MenuItemComponent} from './components/menu/menu-item/menu-item.component';
import {LanguageDialogComponent} from './components/language-dialog/language-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {RadioGroupComponent} from './components/buttons/radio-group/radio-group.component';
import {MatRadioModule} from '@angular/material/radio';
import {ReactiveFormsModule} from '@angular/forms';
import {InputComponent} from './components/input/input.component';
import {MatInputModule} from '@angular/material/input';
import {AuthPageComponent} from '~app/shared/components/layout/auth-page/auth-page.component';
import {ButtonComponent} from './components/buttons/button/button.component';
import {CheckboxComponent} from './components/checkbox/checkbox.component';
import {MatCheckboxModule} from '@angular/material/checkbox';

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
    MenuItemComponent,
    LanguageDialogComponent,
    RadioGroupComponent,
    InputComponent,
    AuthPageComponent,
    ButtonComponent,
    CheckboxComponent,
  ],
  exports: [
    InfoSectionComponent,
    HeaderComponent,
    MainComponent,
    FlatButtonComponent,
    HelpSectionComponent,
    ExpansionPanelComponent,
    AlertComponent,
    InputComponent,
    AuthPageComponent,
    ButtonComponent,
    CheckboxComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    RouterModule,
    MatIconModule,
    MatTooltipModule,
    MatExpansionModule,
    MatMenuModule,
    MatDialogModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCheckboxModule,
  ],
})
export class SharedModule {}
