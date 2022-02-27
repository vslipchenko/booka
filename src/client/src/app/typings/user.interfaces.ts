import {AccountTypes} from '~app/typings/account-type.enums';
import {Locale} from '~app/typings/i18n.types';

export interface UserWithEmailExists {
  userWithEmailExists: {exists: boolean};
}

export interface CreateUser {
  accountType: AccountTypes;
  email: string;
  password: string;
  locale: Locale;
}
