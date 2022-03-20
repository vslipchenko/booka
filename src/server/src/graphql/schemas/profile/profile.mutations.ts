import {gql} from 'apollo-server-core';
import {authenticationGuard} from '../../../utilities/guard';
import {accountDataValidator, thumbnailLinkValidator} from './profile.validators';
import {ApolloError} from 'apollo-server-fastify';
import {AccountTariffs} from '../../../typings/account.enums';
import {db} from '../../../data';
import {queryClientAccountEditData, queryClientAccountUpdateThumbnail} from '../../../data/queries/client-account';
import {QueryResult} from 'pg';
import {
  queryEntrepreneurAccountEditData,
  queryEntrepreneurAccountUpdateThumbnail,
} from '../../../data/queries/entrepreneur-account';
import {
  queryBusinessAccountEditData,
  queryBusinessAccountUpdateThumbnail,
} from '../../../data/queries/business-account';
import {AccountData} from '../../../typings/account.types';

export const profileMutationTypeDefinitions = gql`
  type Mutation {
    updateProfileThumbnail(link: String): Success
    editAccountData(input: EditAccountData!): Success
  }
`;

const updateProfileThumbnail = async (
  _: unknown,
  {link}: {link: string},
  {accessToken}: {accessToken: string},
): Promise<{success: boolean} | ApolloError | null> => {
  const {error: validationError} = thumbnailLinkValidator.validate(link);

  if (validationError) return null;

  const {error, tokenData} = authenticationGuard(accessToken);

  if (error) return error;

  let result: QueryResult;

  if (tokenData.tariff === AccountTariffs.Client) {
    result = await db.query(queryClientAccountUpdateThumbnail({userId: tokenData.userId, thumbnail: link}));
  } else if (tokenData.tariff === AccountTariffs.Entrepreneur) {
    result = await db.query(queryEntrepreneurAccountUpdateThumbnail({userId: tokenData.userId, thumbnail: link}));
  } else {
    result = await db.query(queryBusinessAccountUpdateThumbnail({userId: tokenData.userId, thumbnail: link}));
  }

  return {success: Boolean(result.rowCount)};
};

const editAccountData = async (
  _: unknown,
  {input}: {input: AccountData},
  {accessToken}: {accessToken: string},
): Promise<{success: boolean} | ApolloError | null> => {
  const {error: validationError} = accountDataValidator.validate(input);

  if (validationError) return null;

  const {error, tokenData} = authenticationGuard(accessToken);

  if (error) return error;

  let result: QueryResult;

  if (tokenData.tariff === AccountTariffs.Client) {
    result = await db.query(queryClientAccountEditData(input, tokenData.userId));
  } else if (tokenData.tariff === AccountTariffs.Entrepreneur) {
    result = await db.query(queryEntrepreneurAccountEditData(input, tokenData.userId));
  } else {
    result = await db.query(queryBusinessAccountEditData(input, tokenData.userId));
  }

  return null;
};

export const profileMutationResolvers = {
  Mutation: {
    updateProfileThumbnail,
    editAccountData,
  },
};
