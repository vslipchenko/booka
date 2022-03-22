import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileSettingsComponent {
  @Input() public tooltipText = '';
  @Input() public imagePlaceholder = '';
  @Input() public thumbnail = new FormControl();
  @Output() public readonly save = new EventEmitter();
}
