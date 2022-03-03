import {SignIn} from '../../../typings/user.interfaces';
import {signInValidator} from './authentication.validators';
import {gql} from 'apollo-server-core';
import {userSignIn} from '../../../data/queries/user';
import {db} from '../../../data';
import {SignInFailReason} from '../../../typings/authentication.enums';
import {compareSync} from 'bcrypt';
import {sign} from 'jsonwebtoken';
import {environment} from '../../../environments';
import {JWT_ALGORITHM} from '../../../constants/jwt';

export const authenticationQueryTypeDefinitions = gql`
  type Query {
    signIn(input: SignIn!): SignInResult
  }
`;

const signIn = async (
  _: unknown,
  {input}: {input: SignIn},
): Promise<{accessToken: string; refreshToken: string} | {reason: SignInFailReason} | null> => {
  const {error} = signInValidator.validate(input);

  if (error) return null;

  const result = await db.query(userSignIn(input.email));

  if (!result.rowCount) return null;

  const row = result.rows[0];

  if (!row.access_key) return {reason: SignInFailReason.Blocked};

  if (row.confirmation_key) return {reason: SignInFailReason.Unconfirmed};

  const correctPassword = compareSync(input.password, row.password);

  if (!correctPassword) return null;

  const accessToken = sign({userId: row.id}, environment.ACCESS_TOKEN_SECRET, {
    algorithm: JWT_ALGORITHM,
    expiresIn: environment.ACCESS_TOKEN_EXPIRES_IN,
  });
  const refreshToken = sign({userId: row.id}, `${environment.REFRESH_TOKEN_SECRET}${row.access_key}`, {
    algorithm: JWT_ALGORITHM,
    expiresIn: environment.REFRESH_TOKEN_EXPIRES_IN,
  });

  return {accessToken, refreshToken};
};

export const authenticationQueryResolvers = {
  Query: {
    signIn,
  },
};
