import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'app-service-dialog',
  templateUrl: './service-dialog.component.html',
  styleUrls: ['./service-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceDialogComponent {}
