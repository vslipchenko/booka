import {LanguageCode} from './i18n.enums';
import {AccountTariffs} from './account.enums';

export interface AccessTokenData {
  userId: string;
  tariff: AccountTariffs;
  language: LanguageCode;
}
