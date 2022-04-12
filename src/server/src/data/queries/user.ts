import {CreateUser} from '../../typings/user.interfaces';
import {QueryConfig} from 'pg';
import {Language} from '../../typings/i18n.types';

export const queryUserCheckExistenceByEmail = (email: string): QueryConfig => ({
  text: `
    SELECT 1
    FROM users
    WHERE email = $1
  `,
  values: [email],
});

export const queryEntrepreneurEmployerByEmail = (email: string): QueryConfig => ({
  text: `
    SELECT t1.user_id, t1.employer_id
    FROM entrepreneur_accounts t1
    INNER JOIN users t2
        ON t2.id = t1.user_id
    WHERE t2.email = $1
  `,
  values: [email],
});

export const queryUserCreate = (
  {
    tariff,
    email,
    password,
    accessKey,
    confirmationKey,
    language,
    paidAt,
  }: CreateUser & {accessKey: string; confirmationKey: string; language: Language; paidAt: Date},
  accountTableName: string,
): QueryConfig => ({
  text: `
   WITH inserted AS (
      INSERT INTO users (tariff, email, password, access_key, confirmation_key, language, paid_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id
    )
    INSERT INTO ${accountTableName} (user_id) VALUES ((SELECT id FROM inserted));
  `,
  values: [tariff, email, password, accessKey, confirmationKey, language, paidAt],
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
    SELECT id, password, access_key, confirmation_key, tariff, language, paid_at
    FROM users
    WHERE email = $1
  `,
  values: [email],
});

export const queryUserRefreshAccessToken = (userId: string): QueryConfig => ({
  text: `
    SELECT access_key, tariff, language, paid_at
    FROM users
    WHERE id = $1
  `,
  values: [userId],
});
