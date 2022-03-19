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

export const UserCreate = (
  {tariff, email, password, accessKey, confirmationKey}: CreateUser & {accessKey: string; confirmationKey: string},
  accountTableName: string,
): QueryConfig => ({
  text: `
   WITH inserted AS (
      INSERT INTO users (tariff, email, password, access_key, confirmation_key)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id
    )
    INSERT INTO ${accountTableName} (user_id) VALUES ((SELECT id FROM inserted));
  `,
  values: [tariff, email, password, accessKey, confirmationKey],
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
    SELECT id, password, access_key, confirmation_key, tariff
    FROM users
  `,
  values: [email],
});

export const UserRefreshAccessToken = (userId: string): QueryConfig => ({
  text: `
    SELECT access_key, tariff
    FROM users
  `,
  values: [userId],
});
