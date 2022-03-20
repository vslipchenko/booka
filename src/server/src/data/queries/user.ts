import {CreateUser} from '../../typings/user.interfaces';
import {QueryConfig} from 'pg';

export const queryUserCheckExistenceByEmail = (email: string): QueryConfig => ({
  text: `
    SELECT 1
    FROM users
    WHERE email = $1
  `,
  values: [email],
});

export const queryUserCreate = (
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

export const queryUserDeleteByEmail = (email: string): QueryConfig => ({
  text: `
    DELETE FROM users WHERE email = $1
  `,
  values: [email],
});

export const queryUserConfirmAccount = (key: string): QueryConfig => ({
  text: `
    UPDATE users
    SET confirmation_key = NULL
    WHERE confirmation_key = $1
  `,
  values: [key],
});

export const queryUserResetPassword = (email: string, password: string): QueryConfig => ({
  text: `
    UPDATE users
    SET password = $1
    WHERE email = $2
  `,
  values: [password, email],
});

export const queryUserSignIn = (email: string): QueryConfig => ({
  text: `
    SELECT id, password, access_key, confirmation_key, tariff
    FROM users
    WHERE email = $1
  `,
  values: [email],
});

export const queryUserRefreshAccessToken = (userId: string): QueryConfig => ({
  text: `
    SELECT access_key, tariff
    FROM users
    WHERE id = $1
  `,
  values: [userId],
});
