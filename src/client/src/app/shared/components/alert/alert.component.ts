import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertComponent {
  @Input() public type: 'warn' | 'info' | 'success' | 'error' = 'info';

  public get icon(): string {
    if (this.type === 'info') return 'info';
    if (this.type === 'success') return 'check_circle';
    if (this.type === 'error') return 'error';

    return 'warning';
  }

  public get color(): any {
    // ThemePalette & custom colors
    if (this.type === 'info') return 'primary';
    if (this.type === 'success') return 'success';
    return 'warn';
  }

  public get background(): string {
    if (this.type === 'info') return 'primary-light';
    if (this.type === 'success') return 'success';
    if (this.type === 'error') return 'error';

    return 'warn';
  }

  public get label(): string {
    if (this.type === 'info') return 'Примечание';
    if (this.type === 'success') return 'Успех';
    if (this.type === 'error') return 'Ошибка';

    return 'Внимание';
  }
}
