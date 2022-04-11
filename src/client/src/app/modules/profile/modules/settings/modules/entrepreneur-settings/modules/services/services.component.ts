import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ServiceDialogComponent} from '~app/modules/profile/modules/settings/modules/entrepreneur-settings/modules/services/components/service-dialog/service-dialog.component';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServicesComponent {
  public constructor(private readonly dialog: MatDialog) {}

  public addService(): void {
    this.dialog.open(ServiceDialogComponent, {autoFocus: 'dialog', panelClass: ['dialog', 'narrow-dialog']});
  }
}
