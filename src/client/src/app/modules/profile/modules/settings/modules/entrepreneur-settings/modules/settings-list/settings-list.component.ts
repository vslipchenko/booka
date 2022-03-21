import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  templateUrl: './settings-list.component.html',
  styleUrls: ['./settings-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsListComponent {}
