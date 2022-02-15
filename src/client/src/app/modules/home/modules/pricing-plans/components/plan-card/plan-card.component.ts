import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'app-plan-card',
  templateUrl: './plan-card.component.html',
  styleUrls: ['./plan-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanCardComponent {
  @Input() public imageName = '';
  @Input() public title = '';
  @Input() public services: Array<string> = [];
  @Input() public price = '';
}
