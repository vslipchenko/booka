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

export const userCreate: QueryBuilder = ({accountType, email, password}: CreateUser) => ({
  text: `
    INSERT INTO users (account_type, email, password)
    VALUES ($1, $2, $3)
  `,
  values: [accountType, email, password],
});
