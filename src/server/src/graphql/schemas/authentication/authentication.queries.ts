import {SignIn} from '../../../typings/user.interfaces';
import {signInValidator} from './authentication.validators';
import {gql} from 'apollo-server-core';
import {queryUserRefreshAccessToken, queryUserSignIn} from '../../../data/queries/user';
import {db} from '../../../data';
import {SignInFailReason} from '../../../typings/authentication.enums';
import {compareSync} from 'bcrypt';
import {decode, sign, verify} from 'jsonwebtoken';
import {environment} from '../../../environments';
import {JWT_ALGORITHM} from '../../../constants/jwt';
import {ApolloError} from 'apollo-server-fastify';
import {ApolloErrorCode} from '../../../typings/apollo.enums';
import {AccountTariffs} from '../../../typings/account.enums';
import {AccessTokenData} from '../../../typings/authentication.interfaces';
import {Language} from '../../../typings/i18n.types';

export const authenticationQueryTypeDefinitions = gql`
  type Query {
    signIn(input: SignIn!): SignInResult
    refreshAccessToken(refreshToken: String!): String
  }
`;

const signIn = async (
  _: unknown,
  {input}: {input: SignIn},
): Promise<{accessToken: string; refreshToken: string} | {reason: SignInFailReason} | null> => {
  const {error} = signInValidator.validate(input);

  if (error) return null;

  const result = await db.query<{
    id: string;
    access_key: string;
    confirmation_key: string;
    password: string;
    tariff: AccountTariffs;
    language: Language;
    paid_at: Date;
  }>(queryUserSignIn(input.email));

  if (!result.rowCount) return null;

  const row = result.rows[0];

  if (!row.access_key) return {reason: SignInFailReason.Blocked};

  if (row.confirmation_key) return {reason: SignInFailReason.Unconfirmed};

  const correctPassword = compareSync(input.password, row.password);

  if (!correctPassword) return null;

  const accessToken = sign(
    {userId: row.id, tariff: row.tariff, language: row.language, paidAt: row.paid_at.toISOString()},
    environment.ACCESS_TOKEN_SECRET,
    {
      algorithm: JWT_ALGORITHM,
      expiresIn: environment.ACCESS_TOKEN_EXPIRES_IN,
    },
  );
  const refreshToken = sign({userId: row.id}, `${environment.REFRESH_TOKEN_SECRET}${row.access_key}`, {
    algorithm: JWT_ALGORITHM,
    expiresIn: environment.REFRESH_TOKEN_EXPIRES_IN,
  });

  return {accessToken, refreshToken};
};

const refreshAccessToken = async (
  _: unknown,
  {refreshToken}: {refreshToken: string},
): Promise<ApolloError | string> => {
  if (!refreshToken) return new ApolloError('', ApolloErrorCode.EmptyRefreshToken);

  const userId = (decode(refreshToken) as AccessTokenData)?.userId;
  // Invalid user id
  if (!userId) return new ApolloError('', ApolloErrorCode.InvalidRefreshToken);

  const result = await db.query<{
    access_key: string;
    tariff: AccountTariffs;
    language: Language;
    paid_at: Date;
  }>(queryUserRefreshAccessToken(userId));
  // Invalid refresh token data
  if (!result.rowCount) return new ApolloError('', ApolloErrorCode.InvalidRefreshToken);

  const row = result.rows[0];

  if (!row.access_key) return new ApolloError('', ApolloErrorCode.BlockedUser);

  const REFRESH_JWT_SECRET = `${environment.REFRESH_TOKEN_SECRET}${row.access_key}`;

  try {
    verify(refreshToken, REFRESH_JWT_SECRET, {algorithms: [JWT_ALGORITHM]});
  } catch {
    // Token is forged or expired
    return new ApolloError('', ApolloErrorCode.InvalidRefreshToken);
  }

  // Token is valid; issue fresh access token
  return sign(
    {userId, tariff: row.tariff, language: row.language, paidAt: row.paid_at.toISOString()},
    environment.ACCESS_TOKEN_SECRET,
    {
      algorithm: JWT_ALGORITHM,
      expiresIn: environment.ACCESS_TOKEN_EXPIRES_IN,
    },
  );
};

export const authenticationQueryResolvers = {
  Query: {
    signIn,
    refreshAccessToken,
  },
};
