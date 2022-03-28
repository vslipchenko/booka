import {SignInFailReason} from '~app/typings/authentication.enums';
import {AccountTariffs} from '~app/typings/account.enums';
import {LanguageCode} from '~app/typings/i18n.enums';

export interface SignInQueryResult {
  signIn: {
    accessToken: string;
    refreshToken: string;
    reason: SignInFailReason;
  };
}

export interface SignIn {
  email: string;
  password: string;
}

export interface AccessTokenByRefreshTokenQueryResult {
  refreshAccessToken: string;
}

export interface AccessTokenData {
  userId: string;
  tariff: AccountTariffs;
  language: LanguageCode;
}
