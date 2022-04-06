import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {RadioGroupItem} from '~app/typings/button.interfaces';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleComponent implements OnInit {
  public readonly scheduleTypes: Array<RadioGroupItem> = [];
  constructor() {}

  ngOnInit(): void {}
}
