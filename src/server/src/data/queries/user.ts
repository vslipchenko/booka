import {CreateUser} from '../../typings/user.interfaces';
import {QueryConfig} from 'pg';

export const userCheckExistenceByEmail = (email: string): QueryConfig => ({
  text: `
    SELECT 1
    FROM users
    WHERE email = $1
  `,
  values: [email],
});

export const userCreate = ({
  accountType,
  email,
  password,
  accessKey,
  confirmationKey,
}: CreateUser & {accessKey: string; confirmationKey: string}): QueryConfig => ({
  text: `
    INSERT INTO users (account_type, email, password, access_key, confirmation_key)
    VALUES ($1, $2, $3, $4, $5)
  `,
  values: [accountType, email, password, accessKey, confirmationKey],
});

export const userDeleteByEmail = (email: string): QueryConfig => ({
  text: `
    DELETE FROM users WHERE email = $1
  `,
  values: [email],
});

export const userConfirmAccount = (key: string): QueryConfig => ({
  text: `
    UPDATE users
    SET confirmation_key = NULL
    WHERE confirmation_key = $1
  `,
  values: [key],
});

export const userResetPassword = (email: string, password: string): QueryConfig => ({
  text: `
    UPDATE users
    SET password = $1
    WHERE email = $2
  `,
  values: [password, email],
});

export const userSignIn = (email: string): QueryConfig => ({
  text: `
    SELECT id, password, access_key, confirmation_key
    FROM users
    WHERE email = $1
  `,
  values: [email],
});
