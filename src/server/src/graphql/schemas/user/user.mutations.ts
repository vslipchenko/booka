import {gql} from 'apollo-server-core';
import {CreateUser, RecoverPassword, ResetPassword} from '../../../typings/user.interfaces';
import {confirmationKeyValidator, createUserValidator, recoverPasswordValidator} from './user.validators';
import {db} from '../../../data';
import {
  UserCheckExistenceByEmail,
  UserConfirmAccount,
  UserCreate,
  UserDeleteByEmail,
  UserResetPassword,
} from '../../../data/queries/user';
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
import {sign, verify} from 'jsonwebtoken';
import {JWT_ALGORITHM} from '../../../constants/jwt';
import {passwordValidator} from '../shared/shared.validators';
import {randomBytes} from 'crypto';

export const userMutationTypeDefinitions = gql`
  type Mutation {
    createUser(input: CreateUser!): Success
    confirmAccount(key: String!): Success
    recoverPassword(input: RecoverPassword!): Success
    resetPassword(input: ResetPassword!): Success
  }
`;

const createUser = async (_: unknown, {input}: {input: CreateUser}): Promise<{success: boolean} | null> => {
  const {error} = createUserValidator.validate(input);

  if (error) return null;

  input.password = hashSync(input.password, 10);

  const confirmationKey = uuidv5(input.email, environment.UUID_BASE);
  const accessKey = randomBytes(18).toString('base64'); // Produces string of 24 char length

  const result = await db.query(
    UserCreate({
      ...input,
      confirmationKey,
      accessKey,
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
    await db.query(UserDeleteByEmail(input.email));

    return {success: false};
  }

  return {success: true};
};

const confirmAccount = async (_: unknown, {key}: {key: string}): Promise<{success: boolean} | null> => {
  const {error} = confirmationKeyValidator.validate(key);

  if (error) return null;

  const result = await db.query(UserConfirmAccount(key));

  return {success: Boolean(result.rowCount)};
};

const recoverPassword = async (_: unknown, {input}: {input: RecoverPassword}): Promise<{success: boolean} | null> => {
  const {error} = recoverPasswordValidator.validate(input);

  if (error) return null;

  const result = await db.query(UserCheckExistenceByEmail(input.email));

  if (!result.rowCount) return {success: false};

  const resetKey = sign({email: input.email}, environment.RECOVERY_SECRET, {
    algorithm: JWT_ALGORITHM,
    expiresIn: environment.RECOVERY_KEY_EXPIRES_IN,
  });

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

const resetPassword = async (_: unknown, {input}: {input: ResetPassword}): Promise<{success: boolean} | null> => {
  // Validate key with the use of jwt lib instead
  const {error} = passwordValidator.validate(input.password);

  if (error) return null;

  try {
    const data = verify(input.key, environment.RECOVERY_SECRET, {algorithms: [JWT_ALGORITHM]}) as {email: string};

    input.password = hashSync(input.password, 10);

    const result = await db.query(UserResetPassword(data.email, input.password));

    return {success: Boolean(result.rowCount)};
  } catch {
    return {success: false};
  }
};

export const userMutationResolvers = {
  Mutation: {
    createUser,
    confirmAccount,
    recoverPassword,
    resetPassword,
  },
};
