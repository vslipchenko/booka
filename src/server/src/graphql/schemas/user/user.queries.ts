import {gql} from 'apollo-server-core';
import {userCheckExistenceByEmail} from '../../../data/queries/user';
import {db} from '../../../data';
import {emailValidator} from '../shared/shared.validators';

export const userQueryTypeDefinitions = gql`
  type Query {
    userWithEmailExists(email: String!): Exists
  }
`;

const userWithEmailExists = async (_: unknown, {email}: {email: string}): Promise<{exists: boolean} | null> => {
  const {error} = emailValidator.validate(email);

  if (error) return null;

  const result = await db.query(userCheckExistenceByEmail(email));

  return {exists: Boolean(result.rowCount)};
};

export const userQueryResolvers = {
  Query: {
    userWithEmailExists,
  },
};
