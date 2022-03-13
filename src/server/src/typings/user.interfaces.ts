import {Locale} from './i18n.types';
import {AccountTariffs} from './account.enums';

export interface CreateUser {
  accountType: AccountTariffs;
  email: string;
  password: string;
  locale: Locale;
}

export interface RecoverPassword {
  email: string;
  locale: Locale;
}

export interface ResetPassword {
  password: string;
  key: string;
}

export interface SignIn {
  email: string;
  password: string;
}
