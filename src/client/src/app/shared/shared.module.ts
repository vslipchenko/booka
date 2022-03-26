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
import {MenuItemsComponent} from './components/menu/menu-items/menu-items.component';
import {LanguageDialogComponent} from './components/language-dialog/language-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {RadioGroupComponent} from './components/buttons/radio-group/radio-group.component';
import {MatRadioModule} from '@angular/material/radio';
import {ReactiveFormsModule} from '@angular/forms';
import {InputComponent} from './components/input/input.component';
import {MatInputModule} from '@angular/material/input';
import {ButtonComponent} from './components/buttons/button/button.component';
import {CheckboxComponent} from './components/checkbox/checkbox.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {InputHideSuffixComponent} from './components/input/suffixes/input-hide-suffix/input-hide-suffix.component';
import {SelectComponent} from './components/select/select.component';
import {MatSelectModule} from '@angular/material/select';
import {ProgressSpinnerComponent} from './components/progress-spinner/progress-spinner.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {NarrowContainerComponent} from '~app/shared/components/layout/narrow-container/narrow-container.component';
import {DatepickerComponent} from './components/datepicker/datepicker.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {TextareaComponent} from './components/textarea/textarea.component';
import {ImageUploaderComponent} from './components/image-uploader/image-uploader.component';
import {ImageUploaderMenuComponent} from '~app/shared/components/image-uploader-menu/image-uploader-menu.component';
import {SettingsListComponent} from './components/settings-list/settings-list.component';
import {ProfileSettingsComponent} from './components/profile-settings/profile-settings.component';
import {CitySelectComponent} from './components/city-select/city-select.component';

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
    MenuItemsComponent,
    LanguageDialogComponent,
    RadioGroupComponent,
    InputComponent,
    NarrowContainerComponent,
    ButtonComponent,
    CheckboxComponent,
    InputHideSuffixComponent,
    SelectComponent,
    ProgressSpinnerComponent,
    DatepickerComponent,
    TextareaComponent,
    ImageUploaderComponent,
    ImageUploaderMenuComponent,
    SettingsListComponent,
    ProfileSettingsComponent,
    CitySelectComponent,
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
    NarrowContainerComponent,
    ButtonComponent,
    CheckboxComponent,
    InputHideSuffixComponent,
    SelectComponent,
    ProgressSpinnerComponent,
    IconButtonComponent,
    MenuComponent,
    DatepickerComponent,
    TextareaComponent,
    ImageUploaderComponent,
    SettingsListComponent,
    ProfileSettingsComponent,
    CitySelectComponent,
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
    MatSelectModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
})
export class SharedModule {}
