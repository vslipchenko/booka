import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'app-help-section',
  templateUrl: './help-section.component.html',
  styleUrls: ['./help-section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HelpSectionComponent {
  @Input() public faq = true;
}
