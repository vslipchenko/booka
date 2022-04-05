import {ChangeDetectionStrategy, Component, EventEmitter, Output} from '@angular/core';
import {TranslocoService} from '@ngneat/transloco';
import {BehaviorSubject, first, Subject, takeUntil} from 'rxjs';
import {SelectItem} from '~app/typings/select.interfaces';
import {Destroyable} from '~app/typings/component.interfaces';
import {FormControl, FormGroup} from '@angular/forms';
import {ProfileSearch} from '~app/typings/search.enums';
import {BusinessCategory} from '~app/typings/business-category.enums';
import {City, Region} from '~app/typings/toponymy.enums';
import {translationToSelectItems} from '~app/shared/utilities/translation';

@Component({
  selector: 'app-profile-search',
  templateUrl: './profile-search.component.html',
  styleUrls: ['./profile-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileSearchComponent implements Destroyable {
  @Output() public search = new EventEmitter<any>();

  public readonly destroy$ = new Subject<void>();
  public readonly searchCategories$ = new BehaviorSubject<Array<SelectItem> | null>(null);
  public readonly businessCategories$ = new BehaviorSubject<Array<SelectItem> | null>(null);
  public readonly form: FormGroup;
  private readonly searchScope = 'profile.search-categories';
  private readonly businessCategoriesScope = 'shared.business-categories';

  public constructor(private readonly translocoService: TranslocoService) {
    this.form = this.profileSearchForm;

    this.translocoService
      .selectTranslation(this.searchScope)
      .pipe(takeUntil(this.destroy$), first())
      .subscribe((translation) => {
        this.searchCategories$.next(translationToSelectItems(translation));
      });

    this.translocoService
      .selectTranslation(this.businessCategoriesScope)
      .pipe(takeUntil(this.destroy$), first())
      .subscribe((translation) => {
        this.businessCategories$.next(translationToSelectItems(translation));
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();

    this.searchCategories$.complete();
    this.businessCategories$.complete();
  }

  public get searchCategory(): FormControl {
    return this.form.controls['searchCategory'] as FormControl;
  }

  public get term(): FormControl {
    return this.form.controls['term'] as FormControl;
  }

  public get businessCategory(): FormControl {
    return this.form.controls['businessCategory'] as FormControl;
  }

  public get region(): FormControl {
    return this.form.controls['region'] as FormControl;
  }
  public get city(): FormControl {
    return this.form.controls['city'] as FormControl;
  }
  public get offsiteWork(): FormControl {
    return this.form.controls['offsiteWork'] as FormControl;
  }

  private get profileSearchForm(): FormGroup {
    return new FormGroup({
      searchCategory: new FormControl(ProfileSearch.All),
      term: new FormControl(''),
      businessCategory: new FormControl([BusinessCategory.None]),
      region: new FormControl(Region.None),
      city: new FormControl(City.None),
      offsiteWork: new FormControl(false),
    });
  }
}
