import {AccountTariffs} from './account.enums';
import {Language} from './i18n.types';

export interface AccessTokenData {
  userId: string;
  tariff: AccountTariffs;
  language: Language;
  paidAt: string;
}
