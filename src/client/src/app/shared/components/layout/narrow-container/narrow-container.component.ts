import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'app-narrow-container',
  templateUrl: './narrow-container.component.html',
  styleUrls: ['./narrow-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NarrowContainerComponent {}
