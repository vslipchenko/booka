import {gql} from 'apollo-server-core';
import {CreateUser} from '../../../typings/user.interfaces';
import {createUserValidator} from './user.validators';
import {db} from '../../../data';
import {userCreate} from '../../../data/queries/user';
import {hashSync} from 'bcrypt';

export const userMutationTypeDefinitions = gql`
  type Mutation {
    createUser(input: CreateUser!): Success
  }
`;

const createUser = async (_: unknown, {input}: {input: CreateUser}): Promise<{success: boolean} | null> => {
  const {error} = createUserValidator.validate(input);

  if (error) return null;

  input.password = hashSync(input.password, 15);
  // TODO add created_at timestamp
  const result = await db.query(userCreate(input));

  return {success: Boolean(result.rowCount)};
};

export const userMutationResolvers = {
  Mutation: {
    createUser,
  },
};
