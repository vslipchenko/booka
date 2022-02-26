import {QueryBuilder} from '../../typings/data';
import {CreateUser} from '../../typings/user.interfaces';

export const userCheckExistenceByEmail: QueryBuilder = (email: string) => ({
  text: `
    SELECT 1
    FROM users
    WHERE email = $1
  `,
  values: [email],
});

export const userCreate: QueryBuilder = ({
  accountType,
  email,
  password,
  confirmationKey,
}: CreateUser & {confirmationKey: string}) => ({
  text: `
    INSERT INTO users (account_type, email, password, confirmation_key)
    VALUES ($1, $2, $3, $4)
  `,
  values: [accountType, email, password, confirmationKey],
});

export const userDeleteByEmail: QueryBuilder = (email: string) => ({
  text: `
    DELETE FROM users WHERE email = $1
  `,
  values: [email],
});
