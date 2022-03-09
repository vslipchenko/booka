import {CreateUser} from '../../typings/user.interfaces';
import {QueryConfig} from 'pg';

export const UserCheckExistenceByEmail = (email: string): QueryConfig => ({
  text: `
    SELECT 1
    FROM users
    WHERE email = $1
  `,
  values: [email],
});

export const UserCreate = ({
  accountType,
  email,
  password,
  accessKey,
  confirmationKey,
}: CreateUser & {accessKey: string; confirmationKey: string}): QueryConfig => ({
  text: `
    WITH inserted AS (
      INSERT INTO users (email, password, access_key, confirmation_key)
      VALUES ($1, $2, $3, $4)
      RETURNING id
    )
    INSERT INTO accounts (user_id, account_type) VALUES ((SELECT id FROM inserted), $5);
  `,
  values: [email, password, accessKey, confirmationKey, accountType],
});

export const UserDeleteByEmail = (email: string): QueryConfig => ({
  text: `
    DELETE FROM users WHERE email = $1
  `,
  values: [email],
});

export const UserConfirmAccount = (key: string): QueryConfig => ({
  text: `
    UPDATE users
    SET confirmation_key = NULL
    WHERE confirmation_key = $1
  `,
  values: [key],
});

export const UserResetPassword = (email: string, password: string): QueryConfig => ({
  text: `
    UPDATE users
    SET password = $1
    WHERE email = $2
  `,
  values: [password, email],
});

export const UserSignIn = (email: string): QueryConfig => ({
  text: `
    SELECT id, password, access_key, confirmation_key
    FROM users
    WHERE email = $1
  `,
  values: [email],
});

export const UserAccessKeyByUserId = (userId: string): QueryConfig => ({
  text: `
    SELECT access_key
    FROM users
    WHERE id = $1
  `,
  values: [userId],
});
