import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-language-dialog',
  templateUrl: './language-dialog.component.html',
  styleUrls: ['./language-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguageDialogComponent {
  public constructor(public dialog: MatDialog) {}
}
