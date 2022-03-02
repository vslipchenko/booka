import {gql} from 'apollo-server-core';
import {CreateUser, RecoverPassword} from '../../../typings/user.interfaces';
import {confirmationKeyValidator, createUserValidator, recoverPasswordValidator} from './user.validators';
import {db} from '../../../data';
import {userCheckExistenceByEmail, userConfirmAccount, userCreate, userDeleteByEmail} from '../../../data/queries/user';
import {hashSync} from 'bcrypt';
import {v5 as uuidv5} from 'uuid';
import {mailer} from '../../../mailer';
import {
  EMAIL_CONFIRMATION_HTML,
  EMAIL_CONFIRMATION_SUBJECT,
  EMAIL_FROM,
  PASSWORD_RECOVERY_HTML,
  PASSWORD_RECOVERY_SUBJECT,
} from '../../../constants/email';
import {environment} from '../../../environments';
import {imprint} from '../../../utilities/string';

export const userMutationTypeDefinitions = gql`
  type Mutation {
    createUser(input: CreateUser!): Success
    confirmAccount(key: String!): Success
    recoverPassword(input: RecoverPassword!): Success
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
      html: imprint(EMAIL_CONFIRMATION_HTML[input.locale], {confirmationKey, appOrigin: environment.APP_ORIGIN}),
    });
  } catch {
    await db.query(userDeleteByEmail(input.email));

    return {success: false};
  }

  return {success: true};
};

const confirmAccount = async (_: unknown, {key}: {key: string}): Promise<{success: boolean} | null> => {
  const {error} = confirmationKeyValidator.validate(key);

  if (error) return null;

  const result = await db.query(userConfirmAccount(key));

  return {success: Boolean(result.rowCount)};
};

const recoverPassword = async (_: unknown, {input}: {input: RecoverPassword}): Promise<{success: boolean} | null> => {
  const {error} = recoverPasswordValidator.validate(input);

  if (error) return null;

  const result = await db.query(userCheckExistenceByEmail(input.email));

  if (!result.rowCount) return {success: false};

  const resetKey = ''; // TODO token with 10 min expiration

  try {
    await mailer.sendMail({
      from: EMAIL_FROM,
      to: input.email,
      subject: PASSWORD_RECOVERY_SUBJECT[input.locale],
      html: imprint(PASSWORD_RECOVERY_HTML[input.locale], {resetKey, appOrigin: environment.APP_ORIGIN}),
    });

    return {success: true};
  } catch {
    return {success: false};
  }
};

export const userMutationResolvers = {
  Mutation: {
    createUser,
    confirmAccount,
    recoverPassword,
  },
};
