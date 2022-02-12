import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-homepage-section',
  templateUrl: './homepage-section.component.html',
  styleUrls: ['./homepage-section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomepageSectionComponent implements OnInit {
  @Input() public horizontalPosition: 'left' | 'right' = 'left';
  @Input() public imageName = '';
  @Input() public icon = '';
  @Input() public title = '';
  @Input() public description = '';

  public titleClass = '';

  public ngOnInit(): void {
    this.titleClass = this.horizontalPosition === 'left' ? 'ml-2-3' : 'mr-2-3';
  }
}
