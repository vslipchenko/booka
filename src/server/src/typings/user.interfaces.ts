import {AccountTypes} from './user.enums';

export interface CreateUser {
  accountType: AccountTypes;
  email: string;
  password: string;
}
