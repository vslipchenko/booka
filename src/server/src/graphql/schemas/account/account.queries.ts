import {gql} from 'apollo-server-core';
import {authenticationGuard} from '../../../utilities/guard';
import {ApolloError} from 'apollo-server-fastify';
import {queryClientAccountData} from '../../../data/queries/client-account';
import {db} from '../../../data';
import {AccountData} from '../../../typings/account.types';

export const accountQueryTypeDefinitions = gql`
  type Query {
    accountData: AccountData
  }
`;

const accountData = async (
  _1: unknown,
  _2: unknown,
  {accessToken}: {accessToken: string},
): Promise<AccountData | ApolloError | null> => {
  const {error, tokenData} = authenticationGuard(accessToken);

  if (error) return error;

  const result = await db.query<AccountData>(queryClientAccountData(tokenData.userId));

  if (!result.rowCount) return null;

  return result.rows[0];
};

export const accountQueryResolvers = {
  Query: {
    accountData,
  },
};
