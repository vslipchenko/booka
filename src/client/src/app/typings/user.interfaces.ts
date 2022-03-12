import {AccountTypes} from '~app/typings/account.enums';
import {Locale} from '~app/typings/i18n.types';
import {ExistsResponse, SuccessResponse} from '~app/typings/response.interfaces';

export interface UserWithEmailExistsQueryResult {
  userWithEmailExists: ExistsResponse;
}

export interface CreateUserMutationResult {
  createUser: SuccessResponse;
}

export interface ConfirmAccountMutationResult {
  confirmAccount: SuccessResponse;
}

export interface RecoverPasswordMutationResult {
  recoverPassword: SuccessResponse;
}

export interface ResetPasswordMutationResult {
  resetPassword: SuccessResponse;
}

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

export interface ResetPassword {
  password: string;
  key: string;
}
