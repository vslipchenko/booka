import {ChangeDetectionStrategy, Component} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {Destroyable} from '~app/typings/component.interfaces';
import {Select} from '@ngxs/store';
import {ProfileSelectors} from '~app/modules/profile/store/profile.selectors';

@Component({
  selector: 'app-profile-home',
  templateUrl: './profile-home.component.html',
  styleUrls: ['./profile-home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileHomeComponent implements Destroyable {
  @Select(ProfileSelectors.getAccountVitals)
  private readonly account$!: Observable<unknown>;

  public readonly destroy$ = new Subject<void>();
  public readonly loading$ = new BehaviorSubject(false);

  public constructor() {
    this.account$.subscribe(console.log);
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.loading$.complete();
  }
}
