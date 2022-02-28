import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subject, take, takeUntil} from 'rxjs';
import {Destroyable} from '~app/typings/component.interfaces';
import {UUID_REGEXP} from '~app/constants/regexp';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmationComponent implements Destroyable {
  public readonly destroy$ = new Subject<void>();

  public constructor(private readonly activatedRoute: ActivatedRoute, private readonly router: Router) {
    this.activatedRoute.queryParams
      .pipe(takeUntil(this.destroy$), take(1))
      .subscribe((params) => this.activateAccount((params as {key: string}).key));
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private activateAccount(key: string): void {
    const isValidKey = UUID_REGEXP.test(key);

    if (!isValidKey) {
      // Navigate 404 page
      return void this.router.navigate(['**'], {
        skipLocationChange: true,
      });
    }

    // TODO send API request
  }
}
