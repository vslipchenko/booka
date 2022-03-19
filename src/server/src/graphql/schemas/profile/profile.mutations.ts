import {gql} from 'apollo-server-core';
import {authenticationGuard} from '../../../utilities/guard';
import {thumbnailLinkValidator} from './profile.validators';
import {ApolloError} from 'apollo-server-fastify';

export const profileMutationTypeDefinitions = gql`
  type Mutation {
    updateThumbnail(link: String): Success
  }
`;

const updateThumbnail = async (
  _: unknown,
  {link}: {link: string},
  {accessToken}: {accessToken: string},
): Promise<{success: boolean} | ApolloError | null> => {
  const {error: validationError} = thumbnailLinkValidator.validate(link);

  if (validationError) return null;

  const {error, tokenData} = authenticationGuard(accessToken);

  if (error) return error;

  return null;
};

export const profileMutationResolvers = {
  Mutation: {
    updateThumbnail,
  },
};
