import {gql} from 'apollo-server-core';
import {UserCheckExistenceByEmail} from '../../../data/queries/user';
import {db} from '../../../data';

export const userQueryTypeDefinitions = gql`
  type Query {
    userWithEmailExists(email: String!): UserExists
  }
`;

const userWithEmailExists = async (_: unknown, {email}: {email: string}): Promise<{exists: boolean}> => {
  const result = await db.query(UserCheckExistenceByEmail(email));

  return {exists: Boolean(result.rowCount)};
};

export const userQueryResolvers = {
  Query: {
    userWithEmailExists,
  },
};
