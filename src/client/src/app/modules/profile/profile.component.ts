import {ChangeDetectionStrategy, Component} from '@angular/core';
import {BookingService} from '~app/services/booking/booking.service';
import {MenuItem} from '~app/typings/menu.interfaces';
import {BehaviorSubject, filter, finalize, Observable, Subject, takeUntil, tap} from 'rxjs';
import {AccountService} from '~app/services/account/account.service';
import {Destroyable} from '~app/typings/component.interfaces';
import {Select, Store} from '@ngxs/store';
import {SetAccountVitals} from '~app/modules/profile/store/profile.actions';
import {ProfileSelectors} from '~app/modules/profile/store/profile.selectors';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements Destroyable {
  @Select(ProfileSelectors.needsToBePaid)
  public readonly needsToBePaid$!: Observable<boolean>;

  @Select(ProfileSelectors.requiresAdditionalInfo)
  public readonly requiresAdditionalInfo$!: Observable<boolean>;

  public readonly destroy$ = new Subject<void>();
  public readonly loading$ = new BehaviorSubject(true);
  public showContentHeader = false;
  public readonly menuItems: Array<MenuItem> = [
    {title: 'Главная', routerLink: '/', icon: 'web'},
    {title: 'Настройки', routerLink: '/profile/settings', icon: 'settings'},
  ];

  public constructor(
    private readonly bookingService: BookingService,
    private readonly accountService: AccountService,
    private readonly store: Store,
    private readonly router: Router,
  ) {
    this.router.events
      .pipe(
        takeUntil(this.destroy$),
        filter((event) => event instanceof NavigationEnd),
      )
      .subscribe((event) => {
        // Forbid content header banners on certain pages
        const contentHeaderUrlBlacklist = ['/profile/settings', '/profile/settings/profile'];

        if (contentHeaderUrlBlacklist.includes((event as NavigationEnd).url)) {
          this.showContentHeader = false;
          return;
        }

        this.showContentHeader = true;
      });

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
