import {gql} from 'apollo-server-core';
import {authenticationGuard} from '../../../utilities/guard';
import {ApolloError} from 'apollo-server-fastify';

export const bookingQueryTypeDefinitions = gql`
  type Query {
    bookedServicesByUserId: Exists
  }
`;

const bookedServicesByUserId = async (
  _1: unknown,
  _2: unknown,
  {accessToken}: {accessToken: string},
): Promise<ApolloError | null> => {
  const {error, tokenData} = authenticationGuard(accessToken);

  if (error) return error;

  // TODO

  return null;
};

export const bookingQueryResolvers = {
  Query: {
    bookedServicesByUserId,
  },
};
