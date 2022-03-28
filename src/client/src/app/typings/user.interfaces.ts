import {AccountTariffs} from '~app/typings/account.enums';
import {Language} from '~app/typings/i18n.types';
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
