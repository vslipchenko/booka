import jwt, {TokenExpiredError} from 'jsonwebtoken';
import {environment} from '../environments';
import {ApolloError} from 'apollo-server-fastify';
import {ApolloErrorCode} from '../typings/apollo.enums';

interface AuthenticationGuardResult {
  error: ApolloError;
  tokenData: {userId: string};
}

export const authenticationGuard = (accessToken: string): AuthenticationGuardResult => {
  if (!accessToken) {
    return {
      error: new ApolloError('', ApolloErrorCode.EmptyAccessToken),
    } as AuthenticationGuardResult;
  }

  try {
    const tokenData = jwt.verify(accessToken, environment.ACCESS_TOKEN_SECRET);
    return {tokenData} as AuthenticationGuardResult;
  } catch (error) {
    // The only legit error
    if (error instanceof TokenExpiredError) {
      return {
        error: new ApolloError('', ApolloErrorCode.ExpiredAccessToken),
      } as AuthenticationGuardResult;
    }

    return {
      error: new ApolloError('', ApolloErrorCode.InvalidAccessToken),
    } as AuthenticationGuardResult;
  }
};
