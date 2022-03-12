import {gql} from 'apollo-server-core';
import {authenticationGuard} from '../../../utilities/guard';
import {ApolloError} from 'apollo-server-fastify';
import {AccountVitals} from '../../../data/queries/account';
import {db} from '../../../data';

export const accountQueryTypeDefinitions = gql`
  type Query {
    accountVitals: AccountVitals
  }
`;

const accountVitals = async (
  _1: unknown,
  _2: unknown,
  {accessToken}: {accessToken: string},
): Promise<ApolloError | null> => {
  const {error, tokenData} = authenticationGuard(accessToken);

  if (error) return error;

  const result = await db.query(AccountVitals(tokenData.userId));

  if (!result.rowCount) return null;

  console.log(result);

  return null;
};

export const accountQueryResolvers = {
  Query: {
    accountVitals,
  },
};
