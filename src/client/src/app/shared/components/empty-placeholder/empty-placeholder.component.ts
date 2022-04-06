import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'app-empty-placeholder',
  templateUrl: './empty-placeholder.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmptyPlaceholderComponent {
  @Input() public text = '';
}
