import {gql} from 'apollo-server-core';
import {authenticationGuard} from '../../../utilities/guard';
import {ApolloError} from 'apollo-server-fastify';
import {queryClientAccountData} from '../../../data/queries/client-account';
import {db} from '../../../data';
import {AccountData} from '../../../typings/account.types';
import {AccountTariffs} from '../../../typings/account.enums';
import {
  queryEntrepreneurAccountData,
} from '../../../data/queries/entrepreneur-account';
import {queryBusinessAccountData} from '../../../data/queries/business-account';
import {QueryResult} from 'pg';

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

  let result: QueryResult;

  if (tokenData.tariff === AccountTariffs.Client) {
    result = await db.query(queryClientAccountData(tokenData.userId));
  } else if (tokenData.tariff === AccountTariffs.Entrepreneur) {
    result = await db.query(queryEntrepreneurAccountData(tokenData.userId));
  } else {
    result = await db.query(queryBusinessAccountData(tokenData.userId));
  }

  if (!result.rowCount) return null;

  return result.rows[0];
};

export const accountQueryResolvers = {
  Query: {
    accountData,
  },
};
