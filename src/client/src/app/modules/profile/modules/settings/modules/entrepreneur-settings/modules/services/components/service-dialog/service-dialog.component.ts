import {ChangeDetectionStrategy, Component} from '@angular/core';
import {HOUR_ITEMS, MINUTE_STEP_ITEMS} from '~app/constants/date';

@Component({
  selector: 'app-service-dialog',
  templateUrl: './service-dialog.component.html',
  styleUrls: ['./service-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceDialogComponent {
  public readonly hourItems = HOUR_ITEMS;
  public readonly minuteStepItems = MINUTE_STEP_ITEMS;
}
