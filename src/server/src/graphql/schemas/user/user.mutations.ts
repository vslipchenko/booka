import {gql} from 'apollo-server-core';
import {CreateUser} from '../../../typings/user.interfaces';
import {createUserValidator} from './user.validators';
import {db} from '../../../data';
import {userCreate, userDeleteByEmail} from '../../../data/queries/user';
import {hashSync} from 'bcrypt';
import {v5 as uuidv5} from 'uuid';
import {mailer} from '../../../mailer';
import {EMAIL_CONFIRMATION_HTML, EMAIL_CONFIRMATION_SUBJECT, EMAIL_FROM} from '../../../constants/email';
import {environment} from '../../../environments';
import {imprint} from '../../../utilities/string';

export const userMutationTypeDefinitions = gql`
  type Mutation {
    createUser(input: CreateUser!): Success
  }
`;

const createUser = async (_: unknown, {input}: {input: CreateUser}): Promise<{success: boolean} | null> => {
  const {error} = createUserValidator.validate(input);

  if (error) return null;

  input.password = hashSync(input.password, 10);

  const confirmationKey = uuidv5(input.email, environment.UUID_BASE);

  const result = await db.query(
    userCreate({
      ...input,
      confirmationKey,
    }),
  );

  if (!result.rowCount) return {success: false};

  try {
    await mailer.sendMail({
      from: EMAIL_FROM,
      to: input.email,
      subject: EMAIL_CONFIRMATION_SUBJECT[input.locale],
      html: imprint(EMAIL_CONFIRMATION_HTML[input.locale], {confirmationKey}),
    });
  } catch (error) {
    console.log(error, EMAIL_CONFIRMATION_HTML[input.locale]);
    await db.query(userDeleteByEmail(input.email));

    return {success: false};
  }

  return {success: true};
};

export const userMutationResolvers = {
  Mutation: {
    createUser,
  },
};
