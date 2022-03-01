import {AccountTypes} from '~app/typings/account-type.enums';
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

export interface CreateUser {
  accountType: AccountTypes;
  email: string;
  password: string;
  locale: Locale;
}
