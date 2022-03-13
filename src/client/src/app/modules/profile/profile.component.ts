import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {BookingService} from '~app/services/booking/booking.service';
import {MenuItem} from '~app/typings/menu.interfaces';
import {BehaviorSubject, finalize, Observable, Subject, takeUntil, tap} from 'rxjs';
import {AccountService} from '~app/services/account/account.service';
import {Destroyable} from '~app/typings/component.interfaces';
import {Select, Store} from '@ngxs/store';
import {SetAccountVitals} from '~app/modules/profile/store/profile.actions';
import {ProfileSelectors} from '~app/modules/profile/store/profile.selectors';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnInit, Destroyable {
  @Select(ProfileSelectors.needsToBePaid)
  public readonly needsToBePaid$!: Observable<boolean>;

  @Select(ProfileSelectors.requiresAdditionalInfo)
  public readonly requiresAdditionalInfo$!: Observable<boolean>;

  public readonly destroy$ = new Subject<void>();
  public readonly loading$ = new BehaviorSubject(false);
  public readonly menuItems: Array<MenuItem> = [{title: 'Главная', routerLink: '/', icon: 'web'}];

  public constructor(
    private readonly bookingService: BookingService,
    private readonly accountService: AccountService,
    private readonly store: Store,
  ) {}

  public ngOnInit(): void {
    // this.bookingService.bookedServicesByUserId().subscribe();
    this.loading$.next(true);

    this.accountService
      .getAccountVitals()
      .pipe(
        takeUntil(this.destroy$),
        tap(({data}) => {
          this.store.dispatch(new SetAccountVitals(data));
        }),
        finalize(() => this.loading$.next(false)),
      )
      .subscribe();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.loading$.complete();
  }
}
