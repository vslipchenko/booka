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
  confirmationKey,
}: CreateUser & {confirmationKey: string}): QueryConfig => ({
  text: `
    INSERT INTO users (account_type, email, password, confirmation_key)
    VALUES ($1, $2, $3, $4)
  `,
  values: [accountType, email, password, confirmationKey],
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
