import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-info-section',
  templateUrl: './info-section.component.html',
  styleUrls: ['./info-section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoSectionComponent implements OnInit {
  @Input() public horizontalPosition: 'left' | 'right' = 'left';
  @Input() public imageName = '';
  @Input() public icon = '';
  @Input() public svgIcon = '';
  @Input() public title = '';
  @Input() public description = '';

  public titleClass = '';

  public ngOnInit(): void {
    this.titleClass = this.horizontalPosition === 'left' ? 'ml-2-3' : 'mr-2-3';
  }
}
