import {gql} from 'apollo-server-core';
import {authenticationGuard} from '../../../utilities/guard';
import {ApolloError} from 'apollo-server-fastify';
import {ClientAccountVitals} from '../../../data/queries/client-account';
import {db} from '../../../data';
import {ClientAccount} from '../../../typings/account.interfaces';

export const accountQueryTypeDefinitions = gql`
  type Query {
    accountVitals: AccountVitals
  }
`;

const accountVitals = async (
  _1: unknown,
  _2: unknown,
  {accessToken}: {accessToken: string},
): Promise<ClientAccount | ApolloError | null> => {
  const {error, tokenData} = authenticationGuard(accessToken);

  if (error) return error;

  const result = await db.query<ClientAccount>(ClientAccountVitals(tokenData.userId));

  if (!result.rowCount) return null;

  return result.rows[0];
};

export const accountQueryResolvers = {
  Query: {
    accountVitals,
  },
};
