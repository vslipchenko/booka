import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'app-expansion-panel',
  templateUrl: './expansion-panel.component.html',
  styleUrls: ['./expansion-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpansionPanelComponent {
  @Input() public multi = true;
  @Input() public panels: Array<{title: string; body: string}> = [];
}
