import {SignInFailReason} from '~app/typings/authentication.enums';

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
