import {AccountTypes} from '~app/typings/account-type.enums';

export interface UserWithEmailExists {
  userWithEmailExists: {exists: boolean};
}

export interface CreateUser {
  accountType: AccountTypes;
  email: string;
  password: string;
}
