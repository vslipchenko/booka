import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {RadioGroupItem} from '~app/typings/button.interfaces';

@Component({
  selector: 'app-language-dialog',
  templateUrl: './language-dialog.component.html',
  styleUrls: ['./language-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguageDialogComponent {
  public readonly languages: Array<RadioGroupItem> = [
    {title: 'Русский', value: 'Русский'},
    {title: 'Украинский (в разработке)', value: 'Украинский', disabled: true},
  ];
  public readonly languageControl = new FormControl(this.languages[0].value); // TODO Replace with user's preferred language
}
