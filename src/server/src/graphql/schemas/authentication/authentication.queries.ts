import {SignIn} from '../../../typings/user.interfaces';
import {signInValidator} from './authentication.validators';
import {gql} from 'apollo-server-core';
import {userByEmail} from '../../../data/queries/user';
import {db} from '../../../data';

export const authenticationQueryTypeDefinitions = gql`
  type Query {
    signIn(input: SignIn!): Tokens
  }
`;

const signIn = async (
  _: unknown,
  {input}: {input: SignIn},
): Promise<{accessToken: string; refreshToken: string} | null> => {
  const {error} = signInValidator.validate(input);

  if (error) return null;

  const result = await db.query(userByEmail(input.email));

  if (!result.rowCount) return null;

  return null;
};

export const authenticationQueryResolvers = {
  Query: {
    signIn,
  },
};
