import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {BUSINESS_PROFILE_IMAGE_PLACEHOLDER} from '~app/constants/images';

@Component({
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileSettingsComponent implements OnInit {
  public thumbnail = new FormControl();
  public readonly imagePlaceholder = BUSINESS_PROFILE_IMAGE_PLACEHOLDER;

  constructor() {}

  ngOnInit(): void {}

  public save(): void {}
}
