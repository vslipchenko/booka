import {Language} from './i18n.types';
import {AccountTariffs} from './account.enums';

export interface CreateUser {
  tariff: AccountTariffs;
  email: string;
  password: string;
  language: Language;
}

export interface RecoverPassword {
  email: string;
  language: Language;
}

export interface ResetPassword {
  password: string;
  key: string;
}

export interface SignIn {
  email: string;
  password: string;
}
