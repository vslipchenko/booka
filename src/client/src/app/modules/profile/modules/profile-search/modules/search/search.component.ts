import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Params, Router} from '@angular/router';
import {ProfileSearchFilters} from '~app/typings/search.interfaces';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent {
  public constructor(private readonly router: Router) {}

  public search({searchCategory, term, businessCategory, region, city, offsiteWork}: ProfileSearchFilters): void {
    const queryParameters: Params = {
      search: searchCategory,
      category: businessCategory.join(','),
      region,
      city,
      offsite: Number(offsiteWork),
    };

    if (term) queryParameters['term'] = term;

    void this.router.navigate(['/profile/search/results'], {
      queryParams: queryParameters,
    });
  }
}
