import {AccountTypes} from './user.enums';
import {Locale} from './i18n.types';

export interface CreateUser {
  accountType: AccountTypes;
  email: string;
  password: string;
  locale: Locale;
}

export interface RecoverPassword {
  email: string;
  locale: Locale;
}
