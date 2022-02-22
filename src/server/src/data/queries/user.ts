import {QueryBuilder} from '../../typings/data';

export const UserCheckExistenceByEmail: QueryBuilder = (email: string) => ({
  text: `
    SELECT 1
    FROM users
    WHERE email = $1
  `,
  values: [email],
});
