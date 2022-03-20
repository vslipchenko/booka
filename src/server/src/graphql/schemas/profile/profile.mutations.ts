import {gql} from 'apollo-server-core';
import {authenticationGuard} from '../../../utilities/guard';
import {accountDataValidator, thumbnailLinkValidator} from './profile.validators';
import {ApolloError} from 'apollo-server-fastify';
import {AccountTariffs} from '../../../typings/account.enums';
import {db} from '../../../data';
import {ClientAccountUpdateThumbnail} from '../../../data/queries/client-account';
import {QueryResult} from 'pg';
import {EntrepreneurAccountUpdateThumbnail} from '../../../data/queries/entrepreneur-account';
import {BusinessAccountUpdateThumbnail} from '../../../data/queries/business-account';

export const profileMutationTypeDefinitions = gql`
  type Mutation {
    updateProfileThumbnail(link: String): Success
    editAccountData(input: EditAccountData!) Success
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
    result = await db.query(ClientAccountUpdateThumbnail({userId: tokenData.userId, thumbnail: link}));
  } else if (tokenData.tariff === AccountTariffs.Entrepreneur) {
    result = await db.query(EntrepreneurAccountUpdateThumbnail({userId: tokenData.userId, thumbnail: link}));
  } else {
    result = await db.query(BusinessAccountUpdateThumbnail({userId: tokenData.userId, thumbnail: link}));
  }

  return {success: Boolean(result.rowCount)};
};

const editAccountData = async (
  _: unknown,
  {input}: {input: any},
  {accessToken}: {accessToken: string},
): Promise<{success: boolean} | ApolloError | null> => {
  const {error: validationError} = accountDataValidator.validate(input);

  if (validationError) return null;

  const {error, tokenData} = authenticationGuard(accessToken);

  if (error) return error;

  let result: QueryResult;

  return null;
};

export const profileMutationResolvers = {
  Mutation: {
    updateProfileThumbnail,
    editAccountData
  },
};
