import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileSettingsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
