import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileSettingsComponent implements OnInit {
  public thumbnail = new FormControl();

  constructor() {}

  ngOnInit(): void {}

  public save(): void {}
}
