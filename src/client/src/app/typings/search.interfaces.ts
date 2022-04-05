import {ProfileSearch} from '~app/typings/search.enums';
import {BusinessCategory} from '~app/typings/business-category.enums';
import {City, Region} from '~app/typings/toponymy.enums';

export interface ProfileSearchFilters {
  searchCategory: ProfileSearch;
  term: string;
  businessCategory: Array<BusinessCategory>;
  region: Region;
  city: City;
  offsiteWork: boolean;
}
