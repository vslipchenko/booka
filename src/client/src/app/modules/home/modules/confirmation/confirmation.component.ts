import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BehaviorSubject, finalize, Subject, take, takeUntil} from 'rxjs';
import {Destroyable} from '~app/typings/component.interfaces';
import {UUID_REGEXP} from '~app/constants/regexp';
import {UserService} from '~app/services/user/user.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmationComponent implements Destroyable {
  public readonly destroy$ = new Subject<void>();
  public loading$ = new BehaviorSubject(true);
  public success = false;

  public constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly userService: UserService,
  ) {
    this.activatedRoute.queryParams
      .pipe(takeUntil(this.destroy$), take(1))
      .subscribe((params) => this.confirmAccount((params as {key: string}).key));
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.loading$.complete();
  }

  private confirmAccount(key: string): void {
    const isValidKey = UUID_REGEXP.test(key);

    if (!isValidKey) {
      // Navigate 404 page
      return void this.router.navigate(['**'], {
        skipLocationChange: true,
      });
    }

    this.userService
      .confirmAccount(key)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.loading$.next(false);
        }),
      )
      .subscribe(({data}) => {
        if (data?.confirmAccount.success) this.success = true;
      });
  }
}
