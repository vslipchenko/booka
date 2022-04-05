import {Translation} from '@ngneat/transloco';
import {SelectItem} from '~app/typings/select.interfaces';

export const translationToSelectItems = (translation: Translation): Array<SelectItem> => {
  return Object.entries(translation).map(([key, value]) => {
    return {title: value, value: Number(key)};
  });
};
