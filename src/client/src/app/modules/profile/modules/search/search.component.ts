import {ChangeDetectionStrategy, Component} from '@angular/core';
import {SelectItem} from '~app/typings/select.interfaces';
import {TranslocoService} from '@ngneat/transloco';
import {BehaviorSubject, first, Subject, takeUntil} from 'rxjs';
import {Destroyable} from '~app/typings/component.interfaces';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent implements Destroyable {
  public readonly businessCategories$ = new BehaviorSubject<Array<SelectItem> | null>(null);
  public readonly destroy$ = new Subject<void>();
  private readonly scope = 'shared.business-categories';

  public constructor(private readonly translocoService: TranslocoService) {
    this.translocoService
      .selectTranslation(this.scope)
      .pipe(takeUntil(this.destroy$), first())
      .subscribe((translation) => {
        this.businessCategories$.next(
          Object.entries(translation).map(([key, value]) => {
            return {title: value, value: key};
          }),
        );
        // console.log(this.businessCategories);
        // Trigger control value reflection
        // this.control.updateValueAndValidity();
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
